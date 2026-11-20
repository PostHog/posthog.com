import { createContext, useContext } from 'react'

export type LineKey = 'events' | 'rowsRead' | 'logs' | 'flags' | 'mcp' | 'reports' | 'salesCalls'

export type ReceiptLine = {
    key: LineKey
    item: string
    note: (value: number) => string
    verb: string
    noun: string
}

export type Latency = { hours: string[]; median: number[]; p99: number[] }

export type ScaleData = {
    dayLabel: string
    relativeDay: string
    totals: Record<LineKey, number>
    rowsReadSeries: number[]
    queryDurations: { queries: number; medianMs: number; shareUnderOneSecond: number; counts: number[] }
    logOrgSizes: { orgs: number; shares: number[] }
    mcpClients: { label: string; share: number }[]
    status: { polledAt: string; eventLag: Latency; flagResponse: Latency; captureErrorPeakPercent: number } | null
}

const SECONDS_PER_DAY = 86_400
const WORLD_POPULATION = 8.2e9

function perPerson(events: number): string {
    const ratio = Math.round((events / WORLD_POPULATION) * 10) / 10
    return ratio === 1 ? 'about one per human on Earth' : `about ${ratio} per human on Earth`
}

export const lines: ReceiptLine[] = [
    {
        key: 'rowsRead',
        item: 'Rows read by queries',
        note: () => 'every dashboard, insight, and query',
        verb: 'read',
        noun: 'rows',
    },
    {
        key: 'events',
        item: 'Events ingested',
        note: perPerson,
        verb: 'ingested',
        noun: 'events',
    },
    {
        key: 'logs',
        item: 'Log records',
        note: () => 'mostly somebody else’s stack traces',
        verb: 'stored',
        noun: 'log records',
    },
    {
        key: 'flags',
        item: 'Feature flag requests',
        note: () => 'each one decides what a user sees',
        verb: 'served',
        noun: 'flag requests',
    },
    {
        key: 'mcp',
        item: 'MCP tool calls',
        note: () => 'agents asking instead of people',
        verb: 'answered',
        noun: 'MCP tool calls',
    },
    {
        key: 'reports',
        item: 'Self-driving reports',
        note: (reports) => `one every ${Math.round(SECONDS_PER_DAY / reports)} seconds`,
        verb: 'wrote',
        noun: 'self-driving reports',
    },
    {
        key: 'salesCalls',
        item: 'Quick calls required',
        note: () => 'the product did the talking',
        verb: 'needed',
        noun: 'quick calls',
    },
]

export const lineByKey = Object.fromEntries(lines.map((line) => [line.key, line])) as Record<LineKey, ReceiptLine>

const scales: [number, string][] = [
    [1e12, 'trillion'],
    [1e9, 'billion'],
    [1e6, 'million'],
]

export function formatCount(value: number): string {
    for (const [size, name] of scales) {
        if (value >= size) {
            const scaled = value / size
            return `${scaled >= 100 ? Math.round(scaled) : Number(scaled.toFixed(scaled >= 10 ? 1 : 2))} ${name}`
        }
    }
    return Math.round(value).toLocaleString('en-US')
}

export function inSentence(relativeDay: string): string {
    return relativeDay.charAt(0).toLowerCase() + relativeDay.slice(1)
}

export const ScaleDataContext = createContext<ScaleData | null>(null)

export function useScaleData(): ScaleData {
    const data = useContext(ScaleDataContext)
    if (!data) {
        throw new Error('useScaleData needs a ScaleDataContext provider')
    }
    return data
}
