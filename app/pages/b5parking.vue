<script setup lang="ts">
import {
  CHECKED,
  OFFICIAL_PARKING,
  ROADS,
  SHIFTS,
  STATUS_ORDER,
  defaultShift,
  directionsUrl,
  legendLabel,
  roadNote,
  rowLabel,
  statusOf,
  statusTitle,
  walkMinutes,
  type Shift
} from '~/data/b5parking'

definePageMeta({ layout: 'bare' })

// Not for search engines or LLMs. robots.txt, X-Robots-Tag and the server
// guard say the same thing; this is the in-page copy of it.
useHead({
  title: 'B5 Parking Options',
  htmlAttrs: { lang: 'en-GB' },
  meta: [
    { name: 'robots', content: 'noindex, nofollow, noarchive, nosnippet, noimageai, noai' },
    { name: 'googlebot', content: 'noindex, nofollow, noarchive, nosnippet' },
    { name: 'description', content: 'Official parking and which roads have restrictions near Hillingdon Ambulance Station, by shift.' },
    { property: 'og:title', content: 'B5 Parking Options' },
    { property: 'og:description', content: 'Official parking, and which roads have restrictions, by shift.' }
  ]
})

// Deliberately not remembered between visits: someone back on days must never
// open this to a stale "night" and park in a permit bay.
const shift = useState<Shift>('b5-shift', () => defaultShift())
const shiftRule = computed(() => SHIFTS.find(s => s.id === shift.value)?.rule ?? '')

const selectedId = ref<string | null>(null)
const query = ref('')
const located = ref('')
const showAll = reactive<Record<string, boolean>>({})
const mapRef = ref<{ reset: () => void, locate: () => void } | null>(null)
const mapWrap = ref<HTMLElement>()
const detail = ref<HTMLElement>()

const LIMIT = 8
const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches

const roads = computed(() => ROADS.map(r => ({
  ...r,
  status: statusOf(r.cat, shift.value),
  title: statusTitle(r.cat, shift.value),
  label: rowLabel(r.cat, shift.value),
  text: roadNote(r, shift.value)
})))

const selected = computed(() => roads.value.find(r => r.id === selectedId.value) ?? null)
const legend = computed(() => STATUS_ORDER.filter(s => roads.value.some(r => r.status === s)))

const searching = computed(() => query.value.trim().length > 0)
const matches = computed(() => {
  const q = query.value.trim().toLowerCase().replace(/[^a-z ]/g, '')
  return q ? roads.value.filter(r => r.name.toLowerCase().replace(/[^a-z ]/g, '').includes(q)) : roads.value
})

const groups = computed(() => {
  const def = [
    { key: 'ok', title: shift.value === 'day' ? 'No permit scheme' : 'Fine to park', test: (s: string) => s === 'free' },
    { key: 'permit', title: 'Permit only', test: (s: string) => s === 'permit' || s === 'late' },
    { key: 'check', title: 'Check the signs', test: (s: string) => s === 'check' },
    { key: 'private', title: 'Private roads', test: (s: string) => s === 'private' }
  ]
  return def
    .map(g => ({ ...g, all: matches.value.filter(r => g.test(r.status)) }))
    .filter(g => g.all.length)
    .map(g => ({
      ...g,
      items: searching.value || showAll[g.key] ? g.all : g.all.slice(0, LIMIT)
    }))
})

function pick(id: string) {
  selectedId.value = id
  nextTick(() => {
    mapWrap.value?.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' })
    detail.value?.focus({ preventScroll: true })
  })
}

// Map taps shouldn't scroll the page.
function fromMap(id: string | null) {
  selectedId.value = id
}

function backToList() {
  const id = selectedId.value
  if (!id) return
  const row = document.getElementById(`row-${id}`)
  row?.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'center' })
  row?.focus({ preventScroll: true })
}

function onLocated(d: number | null) {
  if (d === null) {
    located.value = 'Couldn’t get your location. Check that location is allowed for this page.'
  }
  else if (d < 40) {
    located.value = 'You’re at the station.'
  }
  else {
    located.value = `You’re ${d < 1000 ? `${d} m` : `${(d / 1000).toFixed(1)} km`} from the station.`
  }
}
</script>

<template>
  <main class="pk">
    <header class="pk-head">
      <h1 class="text-h1">
        B5 Parking Options
      </h1>
    </header>

    <section
      v-for="o in OFFICIAL_PARKING"
      :key="o.id"
      class="pk-official"
      :aria-labelledby="`pk-${o.id}-h`"
    >
      <h2
        :id="`pk-${o.id}-h`"
        class="text-h2"
      >
        {{ o.name }}
      </h2>
      <p>
        {{ o.where }} 15&nbsp;min walk. Check the email from the Hillingdon LGM, or LASConnect, for how to use it.
      </p>
      <p>
        <a
          class="pk-action"
          :href="directionsUrl(o.lat, o.lon)"
          rel="noopener"
        >Directions</a>
      </p>
    </section>

    <section
      class="pk-block"
      aria-labelledby="pk-shift-h"
    >
      <h2
        id="pk-shift-h"
        class="text-h2"
      >
        Parking on the road? Pick your shift
      </h2>
      <div
        class="pk-seg"
        role="group"
        aria-labelledby="pk-shift-h"
      >
        <button
          v-for="s in SHIFTS"
          :key="s.id"
          type="button"
          :aria-pressed="shift === s.id"
          @click="shift = s.id"
        >
          {{ s.label }}
        </button>
      </div>
      <p
        class="pk-when"
        aria-live="polite"
      >
        {{ shiftRule }}
      </p>
    </section>

    <section
      class="pk-mapsec"
      aria-labelledby="pk-map-h"
    >
      <h2
        id="pk-map-h"
        class="sr-only"
      >
        Map
      </h2>
      <div
        ref="mapWrap"
        class="pk-mapwrap"
      >
        <ClientOnly>
          <ParkingStationMap
            ref="mapRef"
            :shift="shift"
            :selected-id="selectedId"
            @select="fromMap"
            @located="onLocated"
          />
          <template #fallback>
            <div class="pk-mapfallback">
              <p>Loading the map&hellip; The road list below works without it.</p>
            </div>
          </template>
        </ClientOnly>
      </div>

      <div class="pk-tools">
        <button
          type="button"
          class="pk-btn"
          @click="mapRef?.locate()"
        >
          Show where I am
        </button>
        <button
          type="button"
          class="pk-btn"
          @click="mapRef?.reset()"
        >
          Reset map
        </button>
      </div>
      <p
        v-if="located"
        class="pk-located"
        role="status"
      >
        {{ located }} Your location stays on your phone.
      </p>

      <div
        ref="detail"
        class="pk-detail"
        tabindex="-1"
        aria-live="polite"
      >
        <template v-if="selected">
          <h3 class="pk-detail__name">
            {{ selected.name }}
          </h3>
          <p class="pk-detail__status">
            <ParkingLineKey :status="selected.status" />
            <strong>{{ selected.title }}</strong>
          </p>
          <p>{{ selected.text }}</p>
          <p class="pk-num pk-detail__meta">
            {{ selected.d }}&nbsp;m from the station &middot; {{ walkMinutes(selected.d) }}&nbsp;min walk
            <template v-if="selected.facts?.length">
              &middot; {{ selected.facts.join(' · ') }}
            </template>
          </p>
          <p class="pk-detail__actions">
            <a
              class="pk-action"
              :href="directionsUrl(selected.anchor[0], selected.anchor[1])"
              rel="noopener"
            >Directions</a>
            <button
              type="button"
              class="pk-link"
              @click="backToList"
            >
              Back to the list
            </button>
            <button
              type="button"
              class="pk-link"
              @click="selectedId = null"
            >
              Clear
            </button>
          </p>
        </template>
        <template v-else>
          <h3 class="pk-detail__name">
            Tap a road
          </h3>
          <p>Or pick one from the list below. On a phone, use two fingers to move the map.</p>
        </template>
      </div>

      <ul
        class="pk-legend"
        aria-label="Map key"
      >
        <li
          v-for="s in legend"
          :key="s"
        >
          <ParkingLineKey :status="s" />
          <span>{{ legendLabel(s, shift) }}</span>
        </li>
      </ul>
    </section>

    <section
      class="pk-section"
      aria-labelledby="pk-list-h"
    >
      <h2
        id="pk-list-h"
        class="text-h2"
      >
        Every road, nearest first
      </h2>
      <label class="pk-search">
        <span>Find a road</span>
        <input
          v-model="query"
          type="search"
          inputmode="search"
          enterkeyhint="search"
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
          placeholder="e.g. Apple Tree"
        >
      </label>

      <div
        v-for="g in groups"
        :key="g.key"
        class="pk-group"
      >
        <h3 class="pk-h3">
          {{ g.title }} <span class="pk-count">{{ g.all.length }}</span>
        </h3>
        <ul class="pk-rows">
          <li
            v-for="r in g.items"
            :key="r.id"
          >
            <button
              :id="`row-${r.id}`"
              type="button"
              class="pk-row"
              :aria-current="selectedId === r.id ? 'true' : undefined"
              @click="pick(r.id)"
            >
              <ParkingLineKey :status="r.status" />
              <span class="pk-row__main">
                <span class="pk-row__name">{{ r.name }}</span>
                <span
                  v-if="r.label"
                  class="pk-row__sub"
                >{{ r.label }}</span>
              </span>
              <span class="pk-num">{{ r.d }}&nbsp;m</span>
              <svg
                class="pk-chev"
                width="8"
                height="14"
                viewBox="0 0 8 14"
                aria-hidden="true"
              ><path
                d="M1 1l6 6-6 6"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              /></svg>
            </button>
          </li>
        </ul>
        <button
          v-if="!searching && g.all.length > LIMIT"
          type="button"
          class="pk-link pk-more"
          @click="showAll[g.key] = !showAll[g.key]"
        >
          {{ showAll[g.key] ? 'Show fewer' : `Show all ${g.all.length}` }}
        </button>
      </div>
      <p
        v-if="!groups.length"
        class="pk-empty"
      >
        Nothing called &ldquo;{{ query }}&rdquo; within half a mile. Try the first word of the name.
      </p>
    </section>

    <section
      class="pk-section"
      aria-label="Sources"
    >
      <p class="pk-fine">
        Roads checked against the council&rsquo;s orders on {{ CHECKED }}. Distances are straight-line from the station; walking times assume 80&nbsp;metres a minute.
      </p>
      <details class="pk-sources">
        <summary>Sources</summary>
        <p class="pk-fine">
          The Hillingdon Hospital (HH) Zones Order 2025 and the Cowley (C) Zones Order 2025, from Hillingdon Council&rsquo;s parking and traffic improvement schemes pages; the council&rsquo;s parking management schemes map (V.30.03.26); and road geometry, speed limits and one-way tags from OpenStreetMap contributors (ODbL).
        </p>
      </details>
    </section>

    <footer class="pk-foot">
      <p class="pk-fine">
        Restrictions incorrect? <a href="mailto:kirsty@kirsty.dev?subject=b5parking">kirsty@kirsty.dev</a>. Made by <NuxtLink to="/">Kirsty Wright</NuxtLink>.
      </p>
    </footer>
  </main>
</template>

<style>
.pk {
  --pk-gap: 3.5rem;
  --pk-quiet: #5b5b57;
  max-width: 42rem;
  margin: 0 auto;
  padding: calc(1.25rem + env(safe-area-inset-top, 0px)) 1rem calc(3rem + env(safe-area-inset-bottom, 0px));
}

@media (min-width: 48rem) {
  .pk {
    --pk-gap: 5rem;
    padding-top: 3rem;
  }
}

/* two-tone ring: ink for contrast, brand green as the accent */
.pk :focus-visible {
  outline: 2px solid var(--color-ink);
  outline-offset: 2px;
  box-shadow: 0 0 0 5px var(--color-brand);
  border-radius: 1px;
}

.pk h1,
.pk h2,
.pk h3 {
  text-wrap: balance;
}

.pk-head .text-h1 {
  margin: 0;
}

/* the official answer: ruled off, not boxed */
.pk-official {
  margin-top: 1.75rem;
  padding-block: 1.25rem;
  border-block: 1px solid var(--color-ink);
}

.pk-official > h2 {
  margin: 0 0 0.75rem;
}

.pk-official p {
  margin: 0.5rem 0 0;
  max-width: 60ch;
  text-wrap: pretty;
}

.pk-block {
  margin-top: 2.5rem;
}

.pk-block > h2 {
  margin: 0 0 0.875rem;
}

.pk-seg {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid var(--color-ink);
}

.pk-seg button {
  min-height: 3.5rem;
  padding: 0.5rem 0.5rem;
  border: 0;
  background: var(--color-bg);
  color: var(--color-ink);
  font: 600 0.9375rem/1.25 var(--font-sans);
  cursor: pointer;
  transition: background-color 150ms ease-out, color 150ms ease-out;
}

.pk-seg button + button {
  border-left: 1px solid var(--color-ink);
}

@media (hover: hover) {
  .pk-seg button:hover {
    background: #fff;
  }
}

.pk-seg button[aria-pressed="true"] {
  background: var(--color-ink);
  color: var(--color-bg);
}

.pk-when {
  margin: 0.875rem 0 0;
  max-width: 60ch;
  font-size: 1rem;
  line-height: 1.5;
  text-wrap: pretty;
}

.pk-section {
  margin-top: var(--pk-gap);
  padding-top: 1.75rem;
  border-top: 1px solid var(--color-rule);
}

.pk-section > h2 {
  margin: 0 0 1.25rem;
}

.pk-num {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-variant-numeric: tabular-nums;
  text-align: right;
}

/* rows: hairlines, not cards */
.pk-rows {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--color-rule);
}

.pk-row {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  width: calc(100% + 1rem);
  min-height: 3.5rem;
  margin-inline: -0.5rem;
  padding: 0.5rem;
  border: 0;
  border-bottom: 1px solid var(--color-rule);
  background: none;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}

@media (hover: hover) {
  .pk-row:hover {
    background: rgb(17 17 17 / 0.045);
  }

  .pk-row:hover .pk-row__name {
    text-decoration-color: var(--color-brand);
    text-decoration-thickness: 2px;
  }
}

.pk-row[aria-current="true"] {
  background: rgb(17 17 17 / 0.06);
}

.pk-row__main {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  overflow-wrap: anywhere;
}

.pk-row__name {
  font-weight: 600;
  line-height: 1.3;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 0.2em;
  transition: text-decoration-color 150ms ease-out;
}

.pk-row__sub {
  color: var(--pk-quiet);
  font-size: 0.875rem;
  line-height: 1.3;
}

.pk-chev {
  flex: none;
  color: var(--pk-quiet);
}

.pk-group {
  margin-top: 2rem;
}

.pk-h3 {
  margin: 0 0 0.75rem;
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: -0.01em;
}

.pk-count {
  margin-left: 0.25rem;
  color: var(--pk-quiet);
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-variant-numeric: tabular-nums;
}

.pk-link {
  min-height: 2.75rem;
  padding: 0.5rem 0;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: var(--color-brand);
  text-decoration-thickness: 1px;
  text-underline-offset: 0.2em;
  cursor: pointer;
}

.pk-link:hover {
  text-decoration-thickness: 2px;
}

.pk-more {
  margin-top: 0.5rem;
}

/* map: full bleed on phones */
.pk-mapsec {
  margin-top: 1.75rem;
}

.pk-mapwrap {
  margin-inline: -1rem;
  border-block: 1px solid var(--color-ink);
  scroll-margin-top: 0.75rem;
}

@media (min-width: 42rem) {
  .pk-mapwrap {
    margin-inline: 0;
    border: 1px solid var(--color-ink);
  }
}

.pk-mapfallback {
  display: grid;
  place-items: center;
  height: clamp(300px, 46svh, 520px);
  padding: 1rem;
  background: var(--color-rule);
  color: var(--color-ink-soft);
  text-align: center;
}

.pk-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.pk-btn {
  min-height: 3rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-ink);
  background: var(--color-bg);
  color: var(--color-ink);
  font: 600 0.9375rem/1.2 var(--font-sans);
  cursor: pointer;
}

@media (hover: hover) {
  .pk-btn:hover {
    background: #fff;
  }
}

.pk-btn:active {
  background: var(--color-ink);
  color: var(--color-bg);
}

.pk-located {
  margin: 0.75rem 0 0;
  color: var(--color-ink-soft);
  font-size: 0.9375rem;
}

.pk-detail {
  margin-top: 1.25rem;
  padding-block: 1.25rem;
  border-block: 1px solid var(--color-ink);
}

.pk-detail:focus {
  outline: none;
}

.pk-detail p {
  margin: 0.5rem 0 0;
  max-width: 60ch;
  text-wrap: pretty;
}

.pk-detail__name {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.2;
}

.pk-detail__status {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.pk-detail__meta {
  color: var(--pk-quiet);
  text-align: left;
}

.pk-detail__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0 1.5rem;
}

.pk-action {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  font-weight: 600;
}

.pk-legend {
  display: grid;
  gap: 0.625rem 1.5rem;
  margin: 1.5rem 0 0;
  padding: 0;
  list-style: none;
  font-size: 0.9375rem;
}

@media (min-width: 30rem) {
  .pk-legend {
    grid-template-columns: 1fr 1fr;
  }
}

.pk-legend li {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.pk-fine {
  margin: 1rem 0 0;
  max-width: 65ch;
  color: var(--pk-quiet);
  font-size: 0.875rem;
  line-height: 1.55;
  text-wrap: pretty;
}

.pk-fine a {
  display: inline-block;
  padding-block: 0.5rem;
}

.pk-prose {
  margin: 0 0 1.25rem;
  max-width: 65ch;
  text-wrap: pretty;
}

.pk-sources summary {
  display: flex;
  align-items: center;
  min-height: 2.75rem;
  font-weight: 600;
  cursor: pointer;
}

.pk-search {
  display: grid;
  gap: 0.375rem;
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 600;
}

.pk-search input {
  min-height: 3rem;
  padding: 0 0.75rem;
  border: 1px solid var(--color-ink);
  border-radius: 0;
  background: #fff;
  color: var(--color-ink);
  caret-color: var(--color-ink);
  font: 400 1rem/1.2 var(--font-sans);
}

.pk-search input::placeholder {
  color: var(--pk-quiet);
}

.pk-empty {
  margin: 1.5rem 0 0;
  color: var(--color-ink-soft);
}

.pk-foot {
  margin-top: 2rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--color-ink);
}
</style>
