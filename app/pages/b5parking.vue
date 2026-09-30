<script setup lang="ts">
import {
  BUS_STOPS,
  CAR_PARKS,
  CHECKED,
  CYCLE,
  ROADS,
  STATION,
  STATUS_ORDER,
  appleDirectionsUrl,
  directionsUrl,
  legendLabel,
  modeNow,
  shortLabel,
  statusOf,
  statusTitle,
  walkMinutes,
  whenSentence,
  type Mode
} from '~/data/b5parking'

definePageMeta({ layout: 'bare' })

// Not for search engines or LLMs. robots.txt, X-Robots-Tag and the server
// guard say the same thing; this is the in-page copy of it.
useHead({
  title: 'Parking near Hillingdon Ambulance Station',
  htmlAttrs: { lang: 'en-GB' },
  meta: [
    { name: 'robots', content: 'noindex, nofollow, noarchive, nosnippet, noimageai, noai' },
    { name: 'googlebot', content: 'noindex, nofollow, noarchive, nosnippet' },
    { name: 'description', content: 'Where to park near Hillingdon Ambulance Station on Royal Lane, UB8 3QX.' }
  ]
})

// useState so the server's London-time answer is what the browser hydrates with.
const mode = useState<Mode>('b5-mode', () => modeNow())
const clockMode = useState<Mode>('b5-clock-mode', () => modeNow())
const when = useState<string>('b5-when', () => whenSentence())
const picked = ref(false)

const selectedId = ref<string | null>(null)
const query = ref('')
const allOpen = ref(false)
const located = ref('')
const mapRef = ref<{ reset: () => void, locate: () => void } | null>(null)
const mapSection = ref<HTMLElement>()

function refreshClock() {
  clockMode.value = modeNow()
  when.value = whenSentence()
  if (!picked.value) mode.value = clockMode.value
}

onMounted(() => {
  refreshClock()
  document.addEventListener('visibilitychange', refreshClock)
})
onBeforeUnmount(() => document.removeEventListener('visibilitychange', refreshClock))

function setMode(m: Mode) {
  picked.value = m !== clockMode.value
  mode.value = m
}

const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches

function pick(id: string | null) {
  selectedId.value = id
  if (id && mapSection.value) {
    mapSection.value.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' })
  }
}

// Map taps shouldn't scroll the page, so they set the selection directly.
function fromMap(id: string | null) {
  selectedId.value = id
}

function openAll() {
  allOpen.value = true
  nextTick(() => document.getElementById('all-roads')?.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' }))
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

const roads = computed(() => ROADS.map(r => ({ ...r, status: statusOf(r.cat, mode.value), title: statusTitle(r.cat, mode.value) })))
const free = computed(() => roads.value.filter(r => r.status === 'free'))
const closest = computed(() => free.value.slice(0, 3))
const selected = computed(() => roads.value.find(r => r.id === selectedId.value) ?? null)
const shown = computed(() => {
  const q = query.value.trim().toLowerCase().replace(/[^a-z ]/g, '')
  return q ? roads.value.filter(r => r.name.toLowerCase().replace(/[^a-z ]/g, '').includes(q)) : roads.value
})
const legend = computed(() => STATUS_ORDER.filter(s => roads.value.some(r => r.status === s)))

const selectedNote = computed(() => {
  const r = selected.value
  if (!r) return ''
  if (mode.value === 'off' && (r.cat === 'hh' || r.cat === 'c')) {
    const zone = r.note.match(/Zone (?:HH|C\d)/)?.[0] ?? 'The permit'
    return `${zone} bays only apply Mon\u2013Fri 9am\u20135pm, so anyone can park here now.`
  }
  return r.note
})

const about = (m: number) => Math.round(m / 10) * 10
const gmaps = directionsUrl(STATION.lat, STATION.lon)
const amaps = appleDirectionsUrl(STATION.lat, STATION.lon)
const tflStop = (naptan: string) => `https://tfl.gov.uk/bus/stop/${naptan}/`
const nearestCycle = CYCLE.find(c => c.spaces >= 10 && !c.covered)
const coveredCycle = CYCLE.find(c => c.covered && !c.locked)
const lockedCycle = CYCLE.find(c => c.locked)
</script>

<template>
  <main class="pk">
    <header class="pk-head">
      <h1 class="text-h1">
        Where to park near Hillingdon Ambulance Station
      </h1>
      <p class="pk-sub">
        {{ STATION.address }}, {{ STATION.postcode }}. Every named road within half a mile, checked against Hillingdon Council&rsquo;s parking orders.
      </p>
      <p class="pk-go">
        <span>Directions to the station:</span>
        <a
          :href="gmaps"
          rel="noopener"
        >Google Maps</a>
        <a
          :href="amaps"
          rel="noopener"
        >Apple Maps</a>
      </p>
    </header>

    <section
      class="pk-block"
      aria-labelledby="pk-when-h"
    >
      <h2
        id="pk-when-h"
        class="sr-only"
      >
        When are you parking?
      </h2>
      <p
        class="pk-when"
        aria-live="polite"
      >
        {{ when }}
      </p>
      <div
        class="pk-seg"
        role="group"
        aria-label="When are you parking?"
      >
        <button
          type="button"
          :aria-pressed="mode === 'day'"
          @click="setMode('day')"
        >
          Mon&ndash;Fri, 9am&ndash;5pm
          <span
            v-if="clockMode === 'day'"
            class="pk-tag"
          >now</span>
        </button>
        <button
          type="button"
          :aria-pressed="mode === 'off'"
          @click="setMode('off')"
        >
          Evenings &amp; weekends
          <span
            v-if="clockMode === 'off'"
            class="pk-tag"
          >now</span>
        </button>
      </div>
    </section>

    <section
      class="pk-section"
      aria-labelledby="pk-closest-h"
    >
      <h2
        id="pk-closest-h"
        class="text-h2"
      >
        {{ mode === 'day' ? 'Closest roads with no permit scheme' : 'Closest roads you can park on now' }}
      </h2>
      <ol class="pk-rows">
        <li
          v-for="r in closest"
          :key="r.id"
        >
          <button
            type="button"
            class="pk-row"
            :aria-current="selectedId === r.id"
            @click="pick(r.id)"
          >
            <ParkingLineKey :status="r.status" />
            <span class="pk-row__main">
              <span class="pk-row__name">{{ r.name }}</span>
              <span
                v-if="r.cat !== 'free'"
                class="pk-row__sub"
              >{{ r.title }}</span>
            </span>
            <span class="pk-num">{{ r.d }}&nbsp;m &middot; {{ walkMinutes(r.d) }}&nbsp;min</span>
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
      </ol>
      <p class="pk-more">
        <button
          type="button"
          class="pk-link"
          @click="openAll"
        >
          Search all {{ ROADS.length }} roads
        </button>
      </p>
    </section>

    <section
      id="pk-map"
      ref="mapSection"
      class="pk-section pk-section--map"
      aria-labelledby="pk-map-h"
    >
      <h2
        id="pk-map-h"
        class="text-h2"
      >
        On the map
      </h2>
      <div class="pk-mapwrap">
        <ClientOnly>
          <ParkingStationMap
            ref="mapRef"
            :mode="mode"
            :selected-id="selectedId"
            @select="fromMap"
            @located="onLocated"
          />
          <template #fallback>
            <div class="pk-mapfallback">
              <p>Loading the map&hellip; The lists on this page work without it.</p>
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
        class="pk-detail"
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
          <p>{{ selectedNote }}</p>
          <p class="pk-num pk-detail__meta">
            {{ selected.d }}&nbsp;m &middot; {{ walkMinutes(selected.d) }}&nbsp;min walk
            <template v-if="selected.facts?.length">
              &middot; {{ selected.facts.join(' · ') }}
            </template>
          </p>
          <p>
            <a
              :href="directionsUrl(selected.anchor[0], selected.anchor[1])"
              rel="noopener"
            >Directions to this road</a>
          </p>
        </template>
        <template v-else>
          <h3 class="pk-detail__name">
            Tap a road
          </h3>
          <p>Or pick one from the lists on this page. On a phone, use two fingers to move the map.</p>
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
          <span>{{ legendLabel(s, mode) }}</span>
        </li>
      </ul>
      <p class="pk-fine">
        Boxed <strong>P</strong> is a hospital car park. The black square is a bus stop. The dotted ring is half a mile.
      </p>
    </section>

    <section
      class="pk-section"
      aria-labelledby="pk-hosp-h"
    >
      <h2
        id="pk-hosp-h"
        class="text-h2"
      >
        Hospital car parks
      </h2>
      <p class="pk-prose">
        Hillingdon Hospital has five car parks off Pield Heath Road. The hospital trust describes them as being for visitors and Blue Badge holders, and charges apply. Car Parks B and E are tagged as paying on OpenStreetMap; check the machine at the others.
      </p>
      <ul class="pk-rows pk-rows--static">
        <li
          v-for="cp in CAR_PARKS"
          :key="cp.id"
          class="pk-item"
        >
          <span class="pk-item__main">
            <span class="pk-row__name">{{ cp.name }}</span>
            <span class="pk-row__sub">{{ cp.fee ? 'Pay and display' : 'Check the machine' }}</span>
          </span>
          <span class="pk-num">{{ cp.d }}&nbsp;m &middot; {{ walkMinutes(cp.d) }}&nbsp;min</span>
          <a
            class="pk-item__link"
            :href="directionsUrl(cp.centre[0], cp.centre[1])"
            rel="noopener"
          >
            Directions<span class="sr-only"> to {{ cp.name }}</span>
          </a>
        </li>
      </ul>
      <p class="pk-fine">
        Tariffs and free-parking rules are on the trust&rsquo;s
        <a
          href="https://thh.nhs.uk/getting-here/"
          rel="noopener"
        >getting here page</a>
        (last updated September 2025).
      </p>

      <h3 class="pk-h3">
        Blue Badge holders
      </h3>
      <p class="pk-prose">
        Hillingdon Council lets you park free, for as long as you need, in its pay and display bays and its own car parks. On single or double yellow lines the national rule is up to three hours, but never where there&rsquo;s a loading ban. Display the badge and your clock.
        <a
          href="https://www.hillingdon.gov.uk/blue-badges"
          rel="noopener"
        >Council Blue Badge page</a>.
      </p>
    </section>

    <section
      class="pk-section"
      aria-labelledby="pk-get-h"
    >
      <h2
        id="pk-get-h"
        class="text-h2"
      >
        Getting here without a car
      </h2>
      <dl class="pk-defs">
        <div>
          <dt>By bus</dt>
          <dd>
            The Hillingdon Hospital stops are on Royal Lane, about {{ about(BUS_STOPS[0]?.d ?? 300) }}&nbsp;m away (a {{ walkMinutes(BUS_STOPS[0]?.d ?? 300) }}&nbsp;minute walk). Routes
            <span class="pk-num">{{ BUS_STOPS[0]?.routes.join(', ') }}</span>
            stop here. Stop HA (shelter, live times board) is for Uxbridge, Ruislip and Brunel University. Stop HB is for Hayes, Heathrow and West Drayton. U2 to U5 and U7 all reach Uxbridge, which has the Tube.
            Live times:
            <template
              v-for="(bs, i) in BUS_STOPS"
              :key="bs.id"
            >
              <a
                :href="tflStop(bs.naptan)"
                rel="noopener"
              >stop {{ bs.id }}</a><template v-if="i < BUS_STOPS.length - 1">
                or
              </template>
            </template>
            on TfL.
          </dd>
        </div>
        <div>
          <dt>By bike</dt>
          <dd>
            <template v-if="nearestCycle">
              {{ nearestCycle.spaces }} cycle stands about {{ about(nearestCycle.d) }}&nbsp;m from the station.
            </template>
            <template v-if="coveredCycle">
              Covered stands for {{ coveredCycle.spaces }} at {{ about(coveredCycle.d) }}&nbsp;m.
            </template>
            <template v-if="lockedCycle">
              A lockable shed for {{ lockedCycle.spaces }} at {{ about(lockedCycle.d) }}&nbsp;m, though it&rsquo;s worth checking who it&rsquo;s for.
            </template>
          </dd>
        </div>
        <div>
          <dt>Nearest shops</dt>
          <dd>
            Tesco Express, McColl&rsquo;s and Colham Green Post Office are all on Pield Heath Road, about 430&nbsp;m away (5 to 6 minutes on foot). Opening hours vary, so check before you rely on them.
          </dd>
        </div>
      </dl>
    </section>

    <section
      class="pk-section"
      aria-labelledby="pk-signs-h"
    >
      <h2
        id="pk-signs-h"
        class="text-h2"
      >
        Signs and rules to watch for
      </h2>
      <dl class="pk-defs">
        <div>
          <dt>The station itself</dt>
          <dd>Ambulances leave in a hurry. Please don&rsquo;t stop across the gates or the kerb outside them, even for a minute.</dd>
        </div>
        <div>
          <dt>Zone HH and Cowley zones C1, C2</dt>
          <dd>Permit holders only, Monday to Friday 9am to 5pm. Outside those hours anyone can use the bays. Copperfield Avenue is the exception: permit-only 9am to 10pm, every day.</dd>
        </div>
        <div>
          <dt>&ldquo;Permit holders past this point&rdquo;</dt>
          <dd>The whole road is permit-only in those hours. That&rsquo;s Heather Close, Myrtle Close and Moorcroft Lane.</dd>
        </div>
        <div>
          <dt>Pay and display</dt>
          <dd>Usually Monday to Saturday, 8am to 6.30pm, and free outside operating hours, on Sundays and on bank holidays. The machine on the day sets the price and the maximum stay.</dd>
        </div>
        <div>
          <dt>Yellow lines</dt>
          <dd>Double yellow means no waiting at any time. Single yellow means read the nearby plate for the hours. Yellow ticks on the kerb mean loading is restricted too.</dd>
        </div>
        <div>
          <dt>Private roads</dt>
          <dd>Crispin Way, Kirby Way and Morton Close are marked private. Don&rsquo;t park without permission.</dd>
        </div>
        <div>
          <dt>Speed limits and humps</dt>
          <dd>20&nbsp;mph on Royal Lane beyond the Pield Heath Road junction, and on Chestnut Avenue, Old School Road, Rutherford Close and Stilwell Drive. Falling Lane and Park View Road are 30&nbsp;mph. Expect speed humps on Royal Lane and most estate roads.</dd>
        </div>
        <div>
          <dt>One-way and closed</dt>
          <dd>Royal Close is one-way. Moorcroft Lane is closed to motor vehicles beyond its barrier, so it isn&rsquo;t a through route.</dd>
        </div>
      </dl>
    </section>

    <section
      id="all-roads"
      class="pk-section"
      aria-labelledby="pk-all-h"
    >
      <h2
        id="pk-all-h"
        class="text-h2"
      >
        All {{ ROADS.length }} roads
      </h2>
      <details
        :open="allOpen"
        class="pk-all"
        @toggle="allOpen = ($event.target as HTMLDetailsElement).open"
      >
        <summary>Search or browse, nearest first</summary>
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
        <ul
          v-if="shown.length"
          class="pk-rows"
        >
          <li
            v-for="r in shown"
            :key="r.id"
          >
            <button
              type="button"
              class="pk-row"
              :aria-current="selectedId === r.id"
              @click="pick(r.id)"
            >
              <ParkingLineKey :status="r.status" />
              <span class="pk-row__main">
                <span class="pk-row__name">{{ r.name }}</span>
                <span class="pk-row__sub">{{ shortLabel(r.status, mode) }}</span>
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
        <p
          v-else
          class="pk-empty"
        >
          Nothing called &ldquo;{{ query }}&rdquo; within half a mile. Try the first word of the name.
        </p>
      </details>
    </section>

    <section
      class="pk-section"
      aria-labelledby="pk-caveat-h"
    >
      <h2
        id="pk-caveat-h"
        class="text-h2"
      >
        Before you rely on this
      </h2>
      <p class="pk-prose">
        &ldquo;No permit scheme found&rdquo; means the road isn&rsquo;t in any of the council&rsquo;s parking management scheme orders. Yellow lines can still apply, especially at junctions and bends, and the council can suspend bays for roadworks with three days&rsquo; notice. Bank holidays aren&rsquo;t covered above, so read the sign. The signs and road markings on the day are what&rsquo;s legally binding. Residents of Apple Tree Avenue and Birch Avenue have petitioned for a permit scheme, so look for new signs there.
      </p>
      <p class="pk-fine">
        Sources: the Hillingdon Hospital (HH) Zones Order 2025 and the Cowley (C) Zones Order 2025, from Hillingdon Council&rsquo;s parking and traffic improvement schemes pages; the council&rsquo;s parking management schemes map (V.30.03.26); Hillingdon Council&rsquo;s Blue Badge and pay and display pages; The Hillingdon Hospitals NHS Foundation Trust; and road geometry, speed limits, car parks, bus stops and cycle stands from OpenStreetMap contributors (ODbL). Roads and permit rules checked {{ CHECKED }}. Distances are straight-line from the station and walking times assume 80&nbsp;metres a minute.
      </p>
      <p class="pk-fine">
        Spotted something out of date? <a href="mailto:kirsty@kirsty.dev?subject=b5parking">kirsty@kirsty.dev</a>.
      </p>
    </section>

    <footer class="pk-foot">
      <p><strong>If someone needs an ambulance, call 999.</strong> This page is only about parking.</p>
      <p class="pk-fine">
        Made by <NuxtLink to="/">Kirsty Wright</NuxtLink>.
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
  padding: calc(1.5rem + env(safe-area-inset-top, 0px)) 1rem calc(4rem + env(safe-area-inset-bottom, 0px));
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

.pk-sub {
  margin: 1rem 0 0;
  max-width: 60ch;
  color: var(--color-ink-soft);
  font-size: 1.0625rem;
  line-height: 1.5;
  text-wrap: pretty;
}

.pk-go a {
  display: inline-block;
  padding-block: 0.5rem;
  white-space: nowrap;
}

.pk-go {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0 1.25rem;
  margin: 0.5rem 0 0;
  font-size: 0.9375rem;
  color: var(--pk-quiet);
}

.pk-block {
  margin-top: 2rem;
}

.pk-when {
  margin: 0 0 1rem;
  max-width: 60ch;
  font-size: 1.125rem;
  line-height: 1.45;
  text-wrap: pretty;
}

.pk-seg {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid var(--color-ink);
}

.pk-seg button {
  min-height: 3.5rem;
  padding: 0.5rem 0.75rem;
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

.pk-seg button:hover {
  background: #fff;
}

.pk-seg button[aria-pressed="true"] {
  background: var(--color-ink);
  color: var(--color-bg);
}

.pk-tag {
  display: block;
  margin-top: 0.125rem;
  font: 400 0.75rem/1 var(--font-mono);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  opacity: 0.8;
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
  white-space: nowrap;
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
  min-height: 3.75rem;
  margin-inline: -0.5rem;
  width: calc(100% + 1rem);
  padding: 0.5rem 0.5rem;
  border: 0;
  border-bottom: 1px solid var(--color-rule);
  background: none;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color 150ms ease-out;
}

.pk-row:hover,
.pk-row[aria-current="true"] {
  background: rgb(17 17 17 / 0.045);
}

.pk-row:hover .pk-row__name {
  text-decoration-color: var(--color-brand);
  text-decoration-thickness: 2px;
}

.pk-row__main,
.pk-item__main {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
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

.pk-more {
  margin: 1rem 0 0;
}

.pk-action {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  font-weight: 600;
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

/* map: full bleed on phones */
.pk-mapwrap {
  margin-inline: -1rem;
  border-block: 1px solid var(--color-ink);
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
  height: clamp(340px, 58svh, 580px);
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
  transition: background-color 150ms ease-out;
}

.pk-btn:hover {
  background: #fff;
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
  margin-top: 1.5rem;
  padding-block: 1.25rem;
  border-block: 1px solid var(--color-ink);
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

.pk-prose {
  margin: 0 0 1.25rem;
  max-width: 65ch;
  text-wrap: pretty;
}

.pk-h3 {
  margin: 2.5rem 0 0.75rem;
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: -0.01em;
}

/* static list rows (car parks) */
.pk-item {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  min-height: 3.75rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--color-rule);
}

.pk-item__link {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  padding-inline: 0.25rem;
  font-size: 0.9375rem;
}

/* definition lists */
.pk-defs {
  margin: 0;
  border-top: 1px solid var(--color-rule);
}

.pk-defs > div {
  display: grid;
  gap: 0.25rem 2rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-rule);
}

@media (min-width: 42rem) {
  .pk-defs > div {
    grid-template-columns: 11rem 1fr;
  }
}

.pk-defs dt {
  font-weight: 600;
}

.pk-defs dd {
  margin: 0;
  max-width: 62ch;
  color: var(--color-ink-soft);
  text-wrap: pretty;
}

/* all roads */
.pk-all summary {
  display: flex;
  align-items: center;
  min-height: 3.5rem;
  padding: 0;
  border-block: 1px solid var(--color-ink);
  font-weight: 600;
  cursor: pointer;
}

.pk-all[open] summary {
  border-bottom-color: var(--color-rule);
}

.pk-search {
  display: grid;
  gap: 0.375rem;
  margin: 1.25rem 0;
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
  margin: 1rem 0 0;
  color: var(--color-ink-soft);
}

.pk-foot {
  margin-top: var(--pk-gap);
  padding-top: 1.75rem;
  border-top: 1px solid var(--color-ink);
}

.pk-foot p {
  margin: 0;
}

@media (prefers-reduced-motion: reduce) {
  .pk * {
    scroll-behavior: auto !important;
  }
}
</style>
