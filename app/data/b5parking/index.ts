import roadData from './roads.json'
import placeData from './places.json'

export type Cat = 'free' | 'hh' | 'c' | 'late' | 'part' | 'main' | 'private'
export type Mode = 'day' | 'off'
export type Status = 'free' | 'permit' | 'late' | 'check' | 'private'
export type LatLon = [number, number]

export interface Road {
  id: string
  name: string
  cat: Cat
  /** straight-line metres from the station to the nearest point of the road */
  d: number
  /** the vertex of the road nearest the station, used for directions */
  anchor: LatLon
  note: string
  facts?: string[]
}

export interface CarPark {
  id: string
  name: string
  d: number
  centre: LatLon
  fee: boolean | null
}

export interface BusStop {
  id: string
  name: string
  d: number
  at: LatLon
  routes: string[]
  shelter: boolean
  naptan: string
}

export const ROADS = roadData as Road[]
export const CAR_PARKS = placeData.carparks as CarPark[]
export const BUS_STOPS = placeData.busStops as BusStop[]
export const CYCLE = placeData.cycle as { d: number, spaces: number, covered: boolean, locked: boolean, at: LatLon }[]

// Centre of OSM way 97638188 (London Ambulance Service, Hillingdon Hospital)
export const STATION = {
  name: 'Hillingdon Ambulance Station',
  lat: 51.52473,
  lon: -0.46447,
  address: 'Royal Lane, Hillingdon',
  postcode: 'UB8 3QX'
}
export const RADIUS_M = 805
export const CHECKED = '30 September 2026'

/**
 * Status colours are data encoding, not decoration. Each also differs in line
 * style (solid / dashed / dotted) so nothing relies on colour alone.
 * All pass 4.5:1 on the paper background.
 */
export const STATUS_STYLE: Record<Status, { colour: string, dash: string | null }> = {
  free: { colour: '#177a30', dash: null },
  permit: { colour: '#2d4fb8', dash: null },
  late: { colour: '#b8242f', dash: null },
  check: { colour: '#9a5300', dash: '9 6' },
  private: { colour: '#5f5f5f', dash: '2 7' }
}

export const STATUS_ORDER: Status[] = ['free', 'permit', 'late', 'check', 'private']

const META: Record<Cat, Record<Mode, [Status, string]>> = {
  free: { day: ['free', 'Free to park (no scheme found)'], off: ['free', 'Free to park (no scheme found)'] },
  hh: { day: ['permit', 'Permit holders only'], off: ['free', 'Open to anyone now'] },
  c: { day: ['permit', 'Permit holders only'], off: ['free', 'Open to anyone now'] },
  late: { day: ['late', 'Permit only until 10pm daily'], off: ['late', 'Permit only until 10pm daily'] },
  part: { day: ['check', 'Mixed: check the signs'], off: ['check', 'Mixed: check the signs'] },
  main: { day: ['check', 'Busier road: expect yellow lines'], off: ['check', 'Busier road: expect yellow lines'] },
  private: { day: ['private', 'Private road'], off: ['private', 'Private road'] }
}

export function statusOf(cat: Cat, mode: Mode): Status {
  return META[cat][mode][0]
}

export function statusTitle(cat: Cat, mode: Mode): string {
  return META[cat][mode][1]
}

export function legendLabel(s: Status, mode: Mode): string {
  const labels: Record<Status, string> = {
    free: mode === 'day' ? 'No permit scheme found' : 'Free to park now (check signs)',
    permit: 'Permit holders only',
    late: 'Permit only, 9am to 10pm every day',
    check: 'Mixed or busy: check the signs',
    private: 'Private road'
  }
  return labels[s]
}

/** Short label for dense lists. */
export function shortLabel(s: Status, mode: Mode): string {
  const labels: Record<Status, string> = {
    free: mode === 'day' ? 'No scheme' : 'Free now',
    permit: 'Permit',
    late: 'Permit to 10pm',
    check: 'Check signs',
    private: 'Private'
  }
  return labels[s]
}

export function walkMinutes(d: number): number {
  return Math.max(1, Math.round(d / 80))
}

export function directionsUrl(lat: number, lon: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=driving`
}

export function appleDirectionsUrl(lat: number, lon: number): string {
  return `https://maps.apple.com/?daddr=${lat},${lon}&dirflg=d`
}

/** London wall-clock parts, so a visitor's phone timezone can't skew permit hours. */
export function londonClock(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(date)
  const get = (t: string) => parts.find(p => p.type === t)?.value ?? ''
  const weekday = get('weekday')
  const hour = Number(get('hour'))
  return { weekday, hour, time: `${get('hour')}:${get('minute')}` }
}

export function modeNow(date = new Date()): Mode {
  const { weekday, hour } = londonClock(date)
  const weekend = weekday === 'Saturday' || weekday === 'Sunday'
  return !weekend && hour >= 9 && hour < 17 ? 'day' : 'off'
}

/** One plain sentence about what the clock means for permit bays. */
export function whenSentence(date = new Date()): string {
  const { weekday, hour, time } = londonClock(date)
  const stamp = `${weekday}, ${time}`
  if (modeNow(date) === 'day') {
    return `${stamp}. Permit bays are enforced until 5pm, so the green roads are your best bet.`
  }
  const weekend = weekday === 'Saturday' || weekday === 'Sunday'
  const friEve = weekday === 'Friday' && hour >= 17
  const until = weekend || friEve ? '9am on Monday' : hour >= 17 ? '9am tomorrow' : '9am'
  return `${stamp}. Permit bays are open to anyone until ${until}, except Copperfield Avenue, which stays permit-only until 10pm.`
}
