<script setup lang="ts">
import type * as Leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  OFFICIAL_PARKING,
  RADIUS_M,
  ROADS,
  STATION,
  STATUS_STYLE,
  statusOf,
  type LatLon,
  type Shift,
  type Status
} from '~/data/b5parking'

const props = defineProps<{
  shift: Shift
  selectedId: string | null
}>()

const emit = defineEmits<{
  select: [id: string | null]
  located: [distanceM: number | null]
  ready: []
}>()

type Geometry = { roads: Record<string, LatLon[][]> }

const el = ref<HTMLDivElement>()
const hint = ref(false)

let L: typeof Leaflet
let map: Leaflet.Map
let roadLayers: Record<string, { group: Leaflet.FeatureGroup, lines: Leaflet.Polyline[], casings: Leaflet.Polyline[], hits: Leaflet.Polyline[], label: LatLon }> = {}
let labelTip: Leaflet.Tooltip | null = null
let youLayer: Leaflet.LayerGroup | null = null
let hintTimer: ReturnType<typeof setTimeout> | undefined

const stationLL: LatLon = [STATION.lat, STATION.lon]

/** Line width by zoom: thin when zoomed out so parallel roads don't merge. */
function weightFor(zoom: number) {
  if (zoom <= 14.5) return 3
  if (zoom <= 15.5) return 4.5
  if (zoom <= 16.5) return 6.5
  if (zoom <= 17.5) return 9
  return 12
}

function midpoint(polys: LatLon[][]): LatLon {
  // walk the longest polyline to its halfway point
  const len = (p: LatLon[]) => p.reduce((s, pt, i) => i ? s + Math.hypot(pt[0] - p[i - 1]![0], pt[1] - p[i - 1]![1]) : 0, 0)
  const longest = polys.reduce((a, b) => len(b) > len(a) ? b : a)
  let half = len(longest) / 2
  for (let i = 1; i < longest.length; i++) {
    const a = longest[i - 1]!
    const b = longest[i]!
    const seg = Math.hypot(b[0] - a[0], b[1] - a[1])
    if (half <= seg) {
      const t = half / seg
      return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
    }
    half -= seg
  }
  return longest[0]!
}

function icon(html: string, size: number, className = '') {
  return L.divIcon({ html, className: `pk-pin ${className}`, iconSize: [size, size], iconAnchor: [size / 2, size / 2] })
}

/** A classic map pin: the tip sits on the spot. */
function pinIcon(html: string, width: number) {
  const height = Math.round(width * 32 / 24)
  return L.divIcon({ html, className: 'pk-pin', iconSize: [width, height], iconAnchor: [width / 2, height] })
}

const PARK = '<svg viewBox="0 0 26 26" width="100%" height="100%" aria-hidden="true"><rect x="1" y="1" width="24" height="24" rx="5" fill="#fff" stroke="#111" stroke-width="2.5"/><path d="M9.5 19V7h5a3.5 3.5 0 0 1 0 7h-5" fill="none" stroke="#111" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
const PIN = '<svg viewBox="0 0 24 32" width="100%" height="100%" aria-hidden="true"><path d="M12 1.5C6.6 1.5 2.5 5.6 2.5 10.9c0 6.9 9.5 19.6 9.5 19.6s9.5-12.7 9.5-19.6C21.5 5.6 17.4 1.5 12 1.5z" fill="#111" stroke="#fff" stroke-width="2"/><circle cx="12" cy="11" r="3.6" fill="#fff"/></svg>'

// Draw order: private / check first, so the answer (free roads) sits on top.
const STACK: Status[] = ['private', 'check', 'late', 'permit', 'free']

function styleRoads() {
  const w = weightFor(map.getZoom())
  const anySelected = props.selectedId !== null
  let selectedGroup: Leaflet.FeatureGroup | undefined
  const stacked = [...ROADS].sort((a, b) => STACK.indexOf(statusOf(a.cat, props.shift)) - STACK.indexOf(statusOf(b.cat, props.shift)))
  for (const road of stacked) {
    const layer = roadLayers[road.id]
    if (!layer) continue
    const s = STATUS_STYLE[statusOf(road.cat, props.shift)]
    const selected = road.id === props.selectedId
    const dim = anySelected && !selected
    const width = selected ? w + 3 : w
    for (const line of layer.lines) {
      line.setStyle({ color: s.colour, weight: width, opacity: dim ? 0.35 : 1, dashArray: s.dash ?? undefined })
    }
    for (const c of layer.casings) {
      c.setStyle({ weight: width + 3, opacity: dim ? 0.25 : 0.95 })
    }
    layer.group.bringToFront()
    if (selected) selectedGroup = layer.group
  }
  selectedGroup?.bringToFront()
}

function showLabel() {
  labelTip?.remove()
  labelTip = null
  const road = ROADS.find(r => r.id === props.selectedId)
  const layer = road && roadLayers[road.id]
  if (!road || !layer) return
  labelTip = L.tooltip({ permanent: true, direction: 'top', offset: [0, -8], className: 'pk-label', interactive: false })
    .setLatLng(layer.label)
    .setContent(road.name)
    .addTo(map)
}

function focusRoad() {
  const layer = props.selectedId ? roadLayers[props.selectedId] : null
  if (!layer) return
  const bounds = layer.group.getBounds().extend(stationLL)
  map.flyToBounds(bounds, { padding: [36, 36], maxZoom: 17, duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 0.6 })
}

function reset() {
  const bounds = L.latLng(stationLL).toBounds((RADIUS_M + 40) * 2)
  for (const o of OFFICIAL_PARKING) bounds.extend([o.lat, o.lon])
  map.fitBounds(bounds, { padding: [8, 8], animate: false })
}

function locate() {
  map.locate({ enableHighAccuracy: true, timeout: 12000, maximumAge: 30000 })
}

onMounted(async () => {
  L = (await import('leaflet')).default
  const geometry = (await import('~/data/b5parking/geometry.json')).default as unknown as Geometry
  if (!el.value) return

  const coarse = matchMedia('(pointer: coarse)').matches
  map = L.map(el.value, {
    zoomControl: false,
    minZoom: 13.5,
    maxZoom: 19,
    zoomSnap: 0.25,
    zoomDelta: 0.5,
    // On phones one finger scrolls the page; two fingers move the map.
    dragging: !coarse,
    maxBounds: L.latLng(stationLL).toBounds(4400),
    maxBoundsViscosity: 0.8
  })
  map.attributionControl.setPrefix(false)
  L.control.zoom({ position: 'topright', zoomInTitle: 'Zoom in', zoomOutTitle: 'Zoom out' }).addTo(map)

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)

  reset()

  // half-mile ring
  L.circle(stationLL, { radius: RADIUS_M, color: '#111', weight: 1.5, opacity: 0.55, dashArray: '2 6', fill: false, interactive: false }).addTo(map)

  // roads (stacking order is applied in styleRoads)
  for (const road of ROADS) {
    const polys = geometry.roads[road.id]
    if (!polys) continue
    const group = L.featureGroup()
    const casings = polys.map(p => L.polyline(p, { color: '#fff', lineCap: 'round', lineJoin: 'round', interactive: false }))
    const lines = polys.map(p => L.polyline(p, { lineCap: 'round', lineJoin: 'round', interactive: false }))
    const hits = polys.map(p => L.polyline(p, { color: '#000', opacity: 0, weight: 26, lineCap: 'round', bubblingMouseEvents: false }))
    for (const h of hits) {
      h.on('click', () => emit('select', road.id))
    }
    casings.forEach(c => group.addLayer(c))
    lines.forEach(l => group.addLayer(l))
    hits.forEach(h => group.addLayer(h))
    group.addTo(map)
    roadLayers[road.id] = { group, lines, casings, hits, label: midpoint(polys) }
  }

  // official parking
  for (const o of OFFICIAL_PARKING) {
    L.marker([o.lat, o.lon], { icon: icon(PARK, 30), keyboard: true, title: o.name, alt: o.name })
      .bindTooltip(o.name, { permanent: true, direction: 'right', offset: [16, 0], className: 'pk-label' })
      .addTo(map)
  }

  // station, on top of everything
  L.marker(stationLL, { icon: pinIcon(PIN, 30), zIndexOffset: 1000, keyboard: true, title: STATION.name, alt: STATION.name })
    .bindTooltip('Station', { permanent: true, direction: 'top', offset: [0, -42], className: 'pk-label pk-label--station' })
    .addTo(map)

  map.on('click', () => emit('select', null))
  map.on('zoomend', styleRoads)
  map.on('locationfound', (e: Leaflet.LocationEvent) => {
    youLayer?.remove()
    youLayer = L.layerGroup([
      L.circle(e.latlng, { radius: e.accuracy, color: '#2d4fb8', weight: 1, fillOpacity: 0.08, interactive: false }),
      L.circleMarker(e.latlng, { radius: 7, color: '#fff', weight: 3, fillColor: '#2d4fb8', fillOpacity: 1, interactive: false })
    ]).addTo(map)
    const dist = Math.round(map.distance(e.latlng, stationLL))
    if (dist < 2500) map.fitBounds(L.latLngBounds([e.latlng, stationLL]), { padding: [56, 56], maxZoom: 17 })
    emit('located', dist)
  })
  map.on('locationerror', () => emit('located', null))

  // Touch: one finger scrolls the page, so say how to move the map.
  if (coarse) {
    el.value.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) {
        hint.value = true
        clearTimeout(hintTimer)
        hintTimer = setTimeout(() => (hint.value = false), 1600)
      }
      else {
        hint.value = false
      }
    }, { passive: true })
  }

  styleRoads()
  emit('ready')
})

watch(() => props.shift, () => map && styleRoads())
watch(() => props.selectedId, () => {
  if (!map) return
  styleRoads()
  showLabel()
  focusRoad()
})

onBeforeUnmount(() => {
  clearTimeout(hintTimer)
  map?.remove()
  roadLayers = {}
})

defineExpose({ reset, locate })
</script>

<template>
  <div class="pk-map">
    <div
      ref="el"
      class="pk-map__canvas"
      role="region"
      aria-label="Map of roads within half a mile, coloured by parking status. The lists below carry the same information."
    />
    <p
      v-if="hint"
      class="pk-map__hint"
      role="status"
    >
      Use two fingers to move the map
    </p>
  </div>
</template>

<style>
.pk-map {
  position: relative;
}

.pk-map__canvas {
  height: clamp(300px, 46svh, 520px);
  background: var(--color-rule);
  font-family: var(--font-sans);
}

/* Quiet the basemap so the status colours are the loudest thing on it. */
.pk-map__canvas .leaflet-tile-pane {
  filter: grayscale(0.92) sepia(0.12) contrast(0.94) brightness(1.05);
}

.pk-map__hint {
  position: absolute;
  inset: auto 0.75rem 2rem 0.75rem;
  margin: 0;
  padding: 0.6rem 0.9rem;
  background: var(--color-ink);
  color: var(--color-bg);
  font-size: 0.9375rem;
  text-align: center;
  pointer-events: none;
}

.pk-pin {
  background: none;
  border: 0;
}

.pk-pin svg {
  display: block;
  filter: drop-shadow(0 1px 1.5px rgb(0 0 0 / 0.35));
}

.leaflet-tooltip.pk-label {
  background: var(--color-bg);
  color: var(--color-ink);
  border: 1px solid var(--color-ink);
  border-radius: 0;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.25);
  font: 600 0.8125rem/1.2 var(--font-sans);
  padding: 0.25rem 0.5rem;
  white-space: nowrap;
}

.leaflet-tooltip.pk-label::before {
  display: none;
}

.leaflet-tooltip.pk-label--station {
  background: var(--color-ink);
  color: var(--color-bg);
}

.pk-map .leaflet-bar {
  border: 1px solid var(--color-ink);
  border-radius: 0;
  box-shadow: none;
}

.pk-map .leaflet-bar a {
  width: 44px;
  height: 44px;
  line-height: 42px;
  font-size: 1.375rem;
  background: var(--color-bg);
  color: var(--color-ink);
  border-bottom-color: var(--color-rule);
}

.pk-map .leaflet-bar a:hover {
  background: #fff;
  color: var(--color-ink);
}

.pk-map .leaflet-bar a:first-child,
.pk-map .leaflet-bar a:last-child {
  border-radius: 0;
}

.pk-map .leaflet-control-attribution {
  background: rgb(250 250 247 / 0.9);
  color: var(--color-ink-soft);
  font-size: 0.75rem;
}

.pk-map .leaflet-control-attribution a {
  color: inherit;
  text-decoration-color: var(--color-brand);
}

.pk-map .leaflet-marker-icon:focus-visible,
.pk-map .leaflet-bar a:focus-visible {
  outline: 2px solid var(--color-ink);
  box-shadow: 0 0 0 5px var(--color-brand);
  outline-offset: 1px;
}
</style>
