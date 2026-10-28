import { EventKind } from './eventKinds'
import { METRICS, MetricKey, MetricSamples, sampleGeneration } from './metrics'
import { SPOTLIGHT_SOURCES, STRIPE } from './sources'

export const TICK_MS = 1000

const RIDE_PATH = '/ride'
const ASK_FETCH = 'clicked "Ask Fetch"'
const BOOK_RIDE = 'clicked "Book ride"'
const VISIBLE_ROWS = 16
const SEED_ROWS = 6
const SEED_SPACING_MS = 2600
const SAMPLE_WINDOW = 60
const SEED_SAMPLES = 40
const MIN_FARE = 9
const FARE_SPREAD = 24
const START_CHANCE = 0.5
const ADVANCE_CHANCE = 0.55
const CONTINUE_CHANCE = 0.62
const DESTINATIONS = ['the dog park', 'the vet', 'the airport', 'the beach', 'the office']
const VISITORS = [
    'sam@globex.io',
    'priya@initech.com',
    'alex@hooli.dev',
    'mia@umbrella.co',
    'lee@acme.com',
    'noor@stark.dev',
    'ben@wayne.co',
    'kai@cyberdyne.io',
]

export type Origin = { type: 'event'; kind: EventKind } | { type: 'source'; source: number }

export interface BoardRow {
    id: number
    at: number
    origin: Origin
    detail: string
    person: string
    samples?: MetricSamples
}

type NewRow = Omit<BoardRow, 'id'>

export interface Board {
    rows: BoardRow[]
    now: number
    nextId: number
    samples: Record<MetricKey, number[]>
}

export type BoardAction =
    | { type: 'seed'; board: Board }
    | { type: 'add'; row: NewRow }
    | { type: 'tick'; now: number }
    | { type: 'generation'; samples: MetricSamples }

const FILLERS: { kind: EventKind; weight: number; details: string[] }[] = [
    { kind: 'pageview', weight: 3, details: ['/', '/drivers', '/pricing', '/safety'] },
    {
        kind: 'autocapture',
        weight: 4,
        details: ['clicked "Meet the drivers"', 'clicked "Add treats tip"', 'clicked "Request ride"'],
    },
    { kind: 'snapshot', weight: 4, details: ['scrolled', 'typed', 'recording'] },
    { kind: 'copy', weight: 1, details: ['copied "WALKIES"'] },
    { kind: 'rageclick', weight: 1, details: ['clicked "Where is my driver" 5 times'] },
]
const FILLER_POOL = FILLERS.flatMap((filler) => Array.from({ length: filler.weight }, () => filler))

export const pick = <T>(items: T[]): T => items[Math.floor(Math.random() * items.length)]

export const eventRow = (
    kind: EventKind,
    detail: string,
    person: string,
    at: number,
    samples?: MetricSamples
): NewRow => ({
    at,
    origin: { type: 'event', kind },
    detail,
    person,
    samples,
})

export const formatFare = (fare: number): string =>
    fare.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })

export const ridePaymentRow = (person: string, at: number, fare: number, destination: string): NewRow => ({
    at,
    origin: { type: 'source', source: STRIPE },
    detail: `Paid ${formatFare(fare)} · ride to ${destination}`,
    person,
})

const randomFare = (): number => Math.round((MIN_FARE + Math.random() * FARE_SPREAD) * 100) / 100

const JOURNEY: ((person: string, at: number) => NewRow)[] = [
    (person, at) => eventRow('pageview', RIDE_PATH, person, at),
    (person, at) => eventRow('autocapture', ASK_FETCH, person, at, sampleGeneration()),
    (person, at) => eventRow('autocapture', BOOK_RIDE, person, at, sampleGeneration()),
    (person, at) => ridePaymentRow(person, at, randomFare(), pick(DESTINATIONS)),
]

const fillerRow = (person: string, at: number): NewRow => {
    const { kind, details } = pick(FILLER_POOL)
    return eventRow(kind, pick(details), person, at)
}

export class AmbientRiders {
    private readonly journeys = new Map<string, number>()

    next(at: number): NewRow {
        const active = Array.from(this.journeys)
        if (active.length > 0 && Math.random() < ADVANCE_CHANCE) {
            const [person, step] = pick(active)
            if (Math.random() > CONTINUE_CHANCE) {
                this.journeys.delete(person)
                return fillerRow(person, at)
            }
            if (step + 1 < JOURNEY.length) this.journeys.set(person, step + 1)
            else this.journeys.delete(person)
            return JOURNEY[step](person, at)
        }
        const idle = VISITORS.filter((visitor) => !this.journeys.has(visitor))
        const person = pick(idle.length > 0 ? idle : VISITORS)
        if (Math.random() < START_CHANCE && !this.journeys.has(person)) {
            this.journeys.set(person, 1)
            return JOURNEY[0](person, at)
        }
        return fillerRow(person, at)
    }
}

export const sourceRecord = (source: number, at: number): NewRow =>
    source === STRIPE
        ? ridePaymentRow(pick(VISITORS), at, randomFare(), pick(DESTINATIONS))
        : {
              at,
              origin: { type: 'source', source },
              detail: pick(SPOTLIGHT_SOURCES[source].profileFacts),
              person: pick(VISITORS),
          }

const metricRecord = (value: (key: MetricKey) => number[]): Record<MetricKey, number[]> =>
    Object.fromEntries(METRICS.map(({ key }) => [key, value(key)])) as Record<MetricKey, number[]>

const appendSamples = (
    samples: Record<MetricKey, number[]>,
    added: MetricSamples | undefined
): Record<MetricKey, number[]> =>
    added ? metricRecord((key) => [...samples[key], added[key]].slice(-SAMPLE_WINDOW)) : samples

export const emptyBoard = (): Board => ({
    rows: [],
    now: 0,
    nextId: 0,
    samples: metricRecord(() => []),
})

export const seedBoard = (riders: AmbientRiders, now: number): BoardAction => {
    const rows = Array.from({ length: SEED_ROWS }, (_, index) =>
        riders.next(now - (SEED_ROWS - index) * SEED_SPACING_MS)
    ).reverse()
    const seeded = Array.from({ length: SEED_SAMPLES }, sampleGeneration)
    return {
        type: 'seed',
        board: {
            rows: rows.map((row, id) => ({ ...row, id })),
            now,
            nextId: rows.length,
            samples: metricRecord((key) => seeded.map((generation) => generation[key])),
        },
    }
}

export const reduceBoard = (board: Board, action: BoardAction): Board => {
    if (action.type === 'seed') return action.board
    if (action.type === 'tick') return { ...board, now: action.now }
    if (action.type === 'generation')
        return {
            ...board,
            samples: appendSamples(board.samples, action.samples),
        }
    const { row } = action
    return {
        ...board,
        rows: [{ ...row, id: board.nextId }, ...board.rows].slice(0, VISIBLE_ROWS),
        nextId: board.nextId + 1,
        samples: appendSamples(board.samples, row.samples),
    }
}
