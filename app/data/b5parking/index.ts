import roadData from './roads.json'

export type Cat = 'free' | 'hh' | 'c' | 'late' | 'part' | 'main' | 'private'
/** Which part of the week the car will be sitting there. */
export type Shift = 'day' | 'night' | 'weekend'
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

export const ROADS = roadData as Road[]

// Centre of OSM way 97638188 (London Ambulance Service, Hillingdon Hospital)
export const STATION = {
  name: 'Hillingdon Ambulance Station',
  lat: 51.52473,
  lon: -0.46447
}
export const RADIUS_M = 805

/** Official parking for station staff. Rules and access are in the LGM email / LASConnect. */
export const OFFICIAL_PARKING = [
  {
    id: 'brunel',
    name: 'Brunel University car park',
    // from the shared Google Maps pin
    lat: 51.532235,
    lon: -0.468106,
    // straight-line metres from the station
    d: 870,
    where: 'On the Brunel campus, off Kingston Lane.'
  }
]
export const CHECKED = '30 September 2026'

export const SHIFTS: { id: Shift, label: string, rule: string }[] = [
  {
    id: 'day',
    label: 'Weekday day',
    rule: 'Any shift that overlaps Mon–Fri 9am–5pm. Permit bays are enforced in those hours, so a car left in one from 7am is ticketable from 9am. Stick to the green roads.'
  },
  {
    id: 'night',
    label: 'Night',
    rule: 'On the road after 5pm and gone by 9am. Permit bays are open overnight, but on weekday mornings move the car before 9am. Copperfield Avenue is permit-only until 10pm.'
  },
  {
    id: 'weekend',
    label: 'Weekend',
    rule: 'Any shift on a Saturday or Sunday. Permit bays only apply Mon–Fri, so they’re open. Copperfield Avenue is permit-only 9am–10pm, every day.'
  }
]

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

/** Permit zones (Mon–Fri 9am–5pm) only bite on a weekday day shift. */
export function statusOf(cat: Cat, shift: Shift): Status {
  switch (cat) {
    case 'free': return 'free'
    case 'hh':
    case 'c': return shift === 'day' ? 'permit' : 'free'
    case 'late': return 'late'
    case 'part':
    case 'main': return 'check'
    case 'private': return 'private'
  }
}

export function statusTitle(cat: Cat, shift: Shift): string {
  switch (statusOf(cat, shift)) {
    case 'free':
      if (cat === 'free') return 'No permit scheme'
      return shift === 'night' ? 'Permit bays, open overnight' : 'Permit bays, open at weekends'
    case 'permit': return 'Permit holders only'
    case 'late': return 'Permit only until 10pm daily'
    case 'check': return cat === 'main' ? 'Busy road: expect yellow lines' : 'Mixed: check the signs'
    case 'private': return 'Private road'
  }
}

/** The per-road explanation, worded for the selected shift. */
export function roadNote(road: Road, shift: Shift): string {
  const zone = road.note.match(/Zone (?:HH|C\d)/)?.[0] ?? 'Permit'
  if (road.cat === 'hh' || road.cat === 'c') {
    if (shift === 'day') return road.note
    if (shift === 'night') return `${zone} bays only apply Mon–Fri 9am–5pm. Fine overnight, but on weekday mornings be gone by 9am.`
    return `${zone} bays only apply Mon–Fri 9am–5pm, so they’re open all weekend.`
  }
  if (road.cat === 'late') {
    return shift === 'day'
      ? road.note
      : `${road.note} Only OK if you arrive after 10pm and are gone by 9am.`
  }
  return road.note
}

export function legendLabel(s: Status, shift: Shift): string {
  const labels: Record<Status, string> = {
    free: shift === 'day' ? 'No permit scheme found' : 'Fine to park (check signs)',
    permit: 'Permit holders only',
    late: 'Permit only, 9am to 10pm every day',
    check: 'Mixed or busy: check the signs',
    private: 'Private road'
  }
  return labels[s]
}

/** Short label for dense lists; empty when the group heading already says it. */
export function rowLabel(cat: Cat, shift: Shift): string {
  if (cat === 'free') return ''
  return statusTitle(cat, shift)
}

export function walkMinutes(d: number): number {
  return Math.max(1, Math.round(d / 80))
}

export function directionsUrl(lat: number, lon: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=driving`
}

/**
 * Where to start. Never guesses a night shift: a night-shifter opening the link
 * for a day shift must not see "night" pre-selected, so anything but a London
 * weekend starts on the strictest option.
 */
export function defaultShift(date = new Date()): Shift {
  const weekday = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', weekday: 'long' }).format(date)
  return weekday === 'Saturday' || weekday === 'Sunday' ? 'weekend' : 'day'
}
