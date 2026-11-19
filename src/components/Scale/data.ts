export const SNAPSHOT_DAY = 'Wednesday, November 18, 2026'

export type LineKey = 'events' | 'rowsRead' | 'logs' | 'flags' | 'mcp' | 'reports' | 'salesCalls'

export type ReceiptLine = {
    key: LineKey
    item: string
    note: string
    yesterday: number
    verb: string
    noun: string
}

export const lines: ReceiptLine[] = [
    {
        key: 'rowsRead',
        item: 'Rows read by queries',
        note: 'every dashboard, insight, and query',
        yesterday: 156.18e12,
        verb: 'read',
        noun: 'rows',
    },
    {
        key: 'events',
        item: 'Events ingested',
        note: 'about one per human on Earth',
        yesterday: 8.237e9,
        verb: 'ingested',
        noun: 'events',
    },
    {
        key: 'logs',
        item: 'Log records',
        note: 'mostly somebody else’s stack traces',
        yesterday: 21.742e9,
        verb: 'stored',
        noun: 'log records',
    },
    {
        key: 'flags',
        item: 'Feature flag requests',
        note: 'each one decides what a user sees',
        yesterday: 1.5796e9,
        verb: 'served',
        noun: 'flag requests',
    },
    {
        key: 'mcp',
        item: 'MCP tool calls',
        note: 'agents asking instead of people',
        yesterday: 21.664e6,
        verb: 'answered',
        noun: 'MCP tool calls',
    },
    {
        key: 'reports',
        item: 'Self-driving reports',
        note: 'one every eight seconds',
        yesterday: 11214,
        verb: 'wrote',
        noun: 'self-driving reports',
    },
    {
        key: 'salesCalls',
        item: 'Quick calls required',
        note: 'the product did the talking',
        yesterday: 0,
        verb: 'needed',
        noun: 'quick calls',
    },
]

export const rowsReadSeries = [
    214.79, 229.59, 226.55, 139.21, 107.28, 51.06, 144.17, 146.93, 170.54, 152.76, 152.81, 119.25, 117.01, 154.1,
    154.18, 168.28, 158.01, 150.9, 125.46, 131.96, 159.15, 166.75, 169.06, 170.25, 160.76, 131.99, 136.49, 166.73,
    125.93, 156.18,
]

export const lineByKey = Object.fromEntries(lines.map((line) => [line.key, line])) as Record<LineKey, ReceiptLine>

export const mcpClients: { week: string; shares: [string, number][] } = {
    week: 'November 9',
    shares: [
        ['Claude Code', 28.7],
        ['OpenAI', 14.27],
        ['Cursor', 11.25],
        ['Cowork', 7.49],
        ['Claude artifacts', 6.55],
        ['Claude Desktop', 4.23],
        ['OpenAI Codex', 3.0],
        ['Claude Agent SDK', 2.03],
        ['Claude.ai', 1.75],
        ['Claude Code (VS Code)', 1.24],
    ],
}

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

export const bytesScanned = 56.14e15

export const queryHours = 6629

export const WIKIPEDIA_HISTORY_BYTES = 28_593e9

export const logPatterns = 185_040_433

export const STATUS_POLLED = '2026-11-19 22:22 UTC'

export const eventLag = {
    hours: [
        '23:00',
        '00:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
    ],
    medianSeconds: [
        26.1, 25.4, 45.5, 24.1, 22.8, 20.5, 20.1, 19.3, 19.5, 19.7, 20.5, 22.0, 21.8, 24.8, 28.0, 48.1, 35.4, 35.6,
        36.5, 34.2, 33.5, 31.7, 30.4, 29.1,
    ],
    p99Seconds: [
        32.5, 33.1, 86.0, 44.5, 46.1, 25.9, 25.3, 27.2, 25.3, 25.5, 26.1, 33.4, 25.5, 30.4, 34.0, 77.6, 40.5, 41.0,
        41.9, 50.4, 44.6, 40.5, 42.3, 40.3,
    ],
}

export const captureErrorPeakPercent = 0.00010909071074416227

export const flagResponse = {
    times: [
        'Nov 12 22:00',
        'Nov 13 04:00',
        'Nov 13 10:00',
        'Nov 13 16:00',
        'Nov 13 22:00',
        'Nov 14 04:00',
        'Nov 14 10:00',
        'Nov 14 16:00',
        'Nov 14 22:00',
        'Nov 15 04:00',
        'Nov 15 10:00',
        'Nov 15 16:00',
        'Nov 15 22:00',
        'Nov 16 04:00',
        'Nov 16 10:00',
        'Nov 16 16:00',
        'Nov 16 22:00',
        'Nov 17 04:00',
        'Nov 17 10:00',
        'Nov 17 16:00',
        'Nov 17 22:00',
        'Nov 18 04:00',
        'Nov 18 10:00',
        'Nov 18 16:00',
        'Nov 18 22:00',
        'Nov 19 04:00',
        'Nov 19 10:00',
        'Nov 19 16:00',
        'Nov 19 22:00',
    ],
    medianMs: [
        5.4, 4.9, 5.6, 6.3, 5.0, 4.7, 4.7, 5.0, 4.9, 4.7, 4.8, 4.7, 4.5, 4.5, 4.7, 5.7, 6.1, 4.8, 4.9, 5.2, 5.6, 5.1,
        5.1, 5.6, 5.5, 4.9, 5.1, 6.5, 5.4,
    ],
    p99Ms: [
        38.5, 31.1, 30.8, 41.6, 35.4, 31.2, 28.0, 35.8, 34.0, 28.1, 29.2, 34.1, 31.8, 26.1, 27.5, 41.3, 32.5, 24.9,
        24.8, 35.4, 30.8, 24.8, 24.9, 36.9, 30.0, 24.7, 24.8, 36.4, 29.4,
    ],
}
