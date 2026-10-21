import { EventKind } from './eventKinds'
import { SPOTLIGHT_SOURCES, STRIPE } from './sources'
import { Order, STICKER_PRICE, formatDollars } from './StoreWindow'

export const TICK_MS = 1000
export const CHART_SECONDS = 30
export const YOU = 'you'

export const STICKER_PATH = '/stickers/hogzilla'
export const CHECKOUT_PATH = '/checkout'
const ADD_TO_CART = 'clicked "Add to cart"'
const VISIBLE_ROWS = 9
const SEED_ROWS = 6
const SEED_SPACING_MS = 2600
const SEED_REVENUE = 1284
const SEED_PAYMENT_CHANCE = 0.12
const MAX_STICKERS = 5
export const BIG_ORDER_DELAY_MS = 5000
const BIG_SPENDER = 'dana@initech.com'
const BIG_ORDER_STICKERS = 120
const START_CHANCE = 0.5
const ADVANCE_CHANCE = 0.55
const CONTINUE_CHANCE = 0.62
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
    amount?: number
}

export type NewRow = Omit<BoardRow, 'id'>

export interface Bin {
    second: number
    revenue: number
}

export interface Board {
    rows: BoardRow[]
    bins: Bin[]
    now: number
    nextId: number
    revenue: number
}

type BoardAction = { type: 'seed'; board: Board } | { type: 'add'; row: NewRow } | { type: 'tick'; now: number }

const FILLERS: { kind: EventKind; weight: number; details: string[] }[] = [
    { kind: 'pageview', weight: 3, details: ['/pricing', '/docs', '/'] },
    { kind: 'autocapture', weight: 4, details: ['clicked "Holo"', 'clicked "Glossy"', 'changed "Qty"'] },
    { kind: 'snapshot', weight: 4, details: ['scrolled', 'typed', 'recording'] },
    { kind: 'copy', weight: 1, details: ['copied "HOGZILLA"'] },
    { kind: 'rageclick', weight: 1, details: ['clicked "Pay" 4 times'] },
]
const FILLER_POOL = FILLERS.flatMap((filler) => Array.from({ length: filler.weight }, () => filler))

export const pick = <T>(items: T[]): T => items[Math.floor(Math.random() * items.length)]
const eventRow = (kind: EventKind, detail: string, person: string, at: number): NewRow => ({
    at,
    origin: { type: 'event', kind },
    detail,
    person,
})

export const paymentRow = (person: string, at: number, { stickers, amount }: Order): NewRow => ({
    at,
    origin: { type: 'source', source: STRIPE },
    detail: `Paid ${formatDollars(amount)} · ${stickers.toLocaleString('en-US')} sticker${stickers === 1 ? '' : 's'}`,
    person,
    amount,
})

const randomOrder = (): Order => {
    const stickers = 1 + Math.floor(Math.random() * MAX_STICKERS)
    return { stickers, amount: stickers * STICKER_PRICE }
}

const payment = (person: string, at: number): NewRow => paymentRow(person, at, randomOrder())

const JOURNEY: ((person: string, at: number) => NewRow)[] = [
    (person, at) => eventRow('pageview', STICKER_PATH, person, at),
    (person, at) => eventRow('autocapture', ADD_TO_CART, person, at),
    (person, at) => eventRow('pageview', CHECKOUT_PATH, person, at),
    payment,
]

const fillerRow = (person: string, at: number): NewRow => {
    const { kind, details } = pick(FILLER_POOL)
    return eventRow(kind, pick(details), person, at)
}

export class AmbientShoppers {
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
        ? payment(pick(VISITORS), at)
        : {
              at,
              origin: { type: 'source', source },
              detail: pick(SPOTLIGHT_SOURCES[source].profileFacts),
              person: pick(VISITORS),
          }

export const emptyBoard = (): Board => ({
    rows: [],
    bins: Array.from({ length: CHART_SECONDS }, (_, second) => ({ second, revenue: 0 })),
    now: 0,
    nextId: 0,
    revenue: 0,
})

export const seedBoard = (shoppers: AmbientShoppers, now: number): BoardAction => {
    const rows = Array.from({ length: SEED_ROWS }, (_, index) =>
        shoppers.next(now - (SEED_ROWS - index) * SEED_SPACING_MS)
    ).reverse()
    return {
        type: 'seed',
        board: {
            rows: rows.map((row, id) => ({ ...row, id })),
            bins: Array.from({ length: CHART_SECONDS }, (_, second) => ({
                second,
                revenue: Math.random() < SEED_PAYMENT_CHANCE ? randomOrder().amount : 0,
            })),
            now,
            nextId: rows.length,
            revenue: SEED_REVENUE,
        },
    }
}

export const reduceBoard = (board: Board, action: BoardAction): Board => {
    if (action.type === 'seed') return action.board
    if (action.type === 'tick') {
        const last = board.bins[board.bins.length - 1]
        return {
            ...board,
            now: action.now,
            bins: [...board.bins.slice(1), { second: last.second + 1, revenue: 0 }],
        }
    }
    const { row } = action
    const amount = row.amount ?? 0
    const lastIndex = board.bins.length - 1
    return {
        ...board,
        bins: board.bins.map((bin, index) => (index === lastIndex ? { ...bin, revenue: bin.revenue + amount } : bin)),
        rows: [{ ...row, id: board.nextId }, ...board.rows].slice(0, VISIBLE_ROWS),
        nextId: board.nextId + 1,
        revenue: board.revenue + amount,
    }
}

export const bigOrderRow = (at: number): NewRow =>
    paymentRow(BIG_SPENDER, at, { stickers: BIG_ORDER_STICKERS, amount: BIG_ORDER_STICKERS * STICKER_PRICE })
