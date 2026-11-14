export const SNAPSHOT_DAY = 'Tuesday, November 10, 2026'

const dayLabels = [
    'Oct 12',
    'Oct 13',
    'Oct 14',
    'Oct 15',
    'Oct 16',
    'Oct 17',
    'Oct 18',
    'Oct 19',
    'Oct 20',
    'Oct 21',
    'Oct 22',
    'Oct 23',
    'Oct 24',
    'Oct 25',
    'Oct 26',
    'Oct 27',
    'Oct 28',
    'Oct 29',
    'Oct 30',
    'Oct 31',
    'Nov 1',
    'Nov 2',
    'Nov 3',
    'Nov 4',
    'Nov 5',
    'Nov 6',
    'Nov 7',
    'Nov 8',
    'Nov 9',
    'Nov 10',
]

export type MetricKey = 'rowsRead' | 'mcp' | 'logs' | 'flags'

export type Metric = {
    key: MetricKey
    name: string
    noun: string
    yesterday: number
    unit: number
    unitLabel: string
    series: number[]
    aside: string
}

export const days = dayLabels

export const metrics: Record<MetricKey, Metric> = {
    rowsRead: {
        key: 'rowsRead',
        name: 'Rows read by queries',
        noun: 'rows read',
        yesterday: 166.7e12,
        unit: 1e12,
        unitLabel: 'trillion',
        series: [
            170.9, 175.3, 173.4, 182.2, 170.1, 126.4, 144.6, 194.2, 214.8, 229.6, 226.5, 139.2, 107.3, 51.1, 144.2,
            146.9, 170.5, 152.8, 152.8, 119.3, 117.0, 154.1, 154.2, 168.3, 158.0, 150.9, 125.5, 132.0, 159.1, 166.7,
        ],
        aside: 'Every insight, dashboard, and SQL query somebody ran.',
    },
    mcp: {
        key: 'mcp',
        name: 'MCP tool calls',
        noun: 'MCP tool calls',
        yesterday: 19.95e6,
        unit: 1e6,
        unitLabel: 'million',
        series: [
            11.12, 11.13, 11.0, 11.03, 10.98, 8.49, 8.57, 12.41, 12.36, 12.22, 12.35, 11.66, 9.01, 9.49, 13.39, 13.78,
            14.46, 14.21, 13.82, 10.41, 10.59, 14.88, 16.54, 18.48, 18.87, 17.4, 13.36, 13.29, 18.51, 19.95,
        ],
        aside: 'Agents asking PostHog for things, instead of people.',
    },
    logs: {
        key: 'logs',
        name: 'Log records',
        noun: 'log records',
        yesterday: 20.76e9,
        unit: 1e9,
        unitLabel: 'billion',
        series: [
            14.55, 15.23, 15.25, 15.28, 14.56, 10.67, 10.55, 14.3, 14.74, 15.23, 15.75, 14.09, 10.83, 10.74, 19.41,
            21.9, 21.95, 21.81, 20.58, 15.18, 15.19, 21.57, 22.29, 21.33, 20.64, 19.84, 14.74, 14.3, 19.87, 20.76,
        ],
        aside: 'Mostly somebody else’s stack traces.',
    },
    flags: {
        key: 'flags',
        name: 'Feature flag requests',
        noun: 'flag requests',
        yesterday: 1.401e9,
        unit: 1e9,
        unitLabel: 'billion',
        series: [
            1.297, 1.506, 1.424, 1.444, 1.242, 1.091, 1.089, 1.312, 1.447, 1.483, 1.373, 1.225, 1.189, 0.995, 1.228,
            1.467, 1.321, 1.565, 1.302, 1.178, 1.036, 1.413, 1.428, 1.432, 1.415, 1.349, 1.027, 0.984, 1.353, 1.401,
        ],
        aside: 'Each one decides what a user sees.',
    },
}

export const metricOrder: MetricKey[] = ['rowsRead', 'logs', 'flags', 'mcp']

export const eventsYesterday = 8.03e9

export const reports = {
    yesterday: 11838,
    signalsYesterday: 17170,
    lastWeek: 69684,
    lastWeekLabel: 'Nov 2 to 8',
    signalsLastWeek: 156812,
    weeks: [
        'Aug 3',
        'Aug 10',
        'Aug 17',
        'Aug 24',
        'Aug 31',
        'Sep 7',
        'Sep 14',
        'Sep 21',
        'Sep 28',
        'Oct 5',
        'Oct 12',
        'Oct 19',
        'Oct 26',
        'Nov 2',
    ],
    counts: [28015, 25840, 22766, 27474, 32348, 33779, 37066, 39512, 37413, 34070, 49928, 52233, 58610, 69684],
}

export type UptimeRow = { component: string; product: ProductKey; us: number; eu: number }

export type ProductKey =
    | 'app'
    | 'ingestion'
    | 'flags'
    | 'replay'
    | 'queries'
    | 'warehouse'
    | 'pipelines'
    | 'logs'
    | 'ai'
    | 'errors'

export const UPTIME_WINDOW = 'Aug 14 to Nov 11, 2026'

export const uptime: UptimeRow[] = [
    { component: 'App (web and desktop)', product: 'app', us: 99.995, eu: 100 },
    { component: 'Event ingestion success', product: 'ingestion', us: 100, eu: 100 },
    { component: 'Event ingestion lag', product: 'ingestion', us: 100, eu: 100 },
    { component: 'Feature flags API', product: 'flags', us: 100, eu: 100 },
    { component: 'Session replay ingestion', product: 'replay', us: 100, eu: 100 },
    { component: 'Query API endpoints', product: 'queries', us: 100, eu: 100 },
    { component: 'Logs', product: 'logs', us: 100, eu: 100 },
    { component: 'Error tracking ingestion lag', product: 'errors', us: 100, eu: 100 },
    { component: 'Data warehouse sources', product: 'warehouse', us: 100, eu: 100 },
    { component: 'Destinations (realtime)', product: 'pipelines', us: 99.963, eu: 99.963 },
    { component: 'Destinations (batch exports)', product: 'pipelines', us: 100, eu: 100 },
    { component: 'Workflows', product: 'pipelines', us: 99.973, eu: 99.973 },
    { component: 'Cloud AI agents', product: 'ai', us: 99.977, eu: 100 },
    { component: 'MCP server', product: 'ai', us: 100, eu: 100 },
]

export const products: { key: ProductKey; name: string; match: RegExp }[] = [
    { key: 'ingestion', name: 'Event ingestion', match: /event ingestion|geoip|events? missing/i },
    { key: 'flags', name: 'Feature flags', match: /flag/i },
    { key: 'replay', name: 'Session replay', match: /replay|recording/i },
    { key: 'queries', name: 'Queries and insights', match: /quer|insight|analytics/i },
    { key: 'warehouse', name: 'Data warehouse', match: /warehouse|sync/i },
    { key: 'pipelines', name: 'Destinations and workflows', match: /destination|workflow/i },
    { key: 'ai', name: 'AI agents and MCP', match: /\bai\b|mcp|agents?|cloud (runs|tasks)|scout/i },
    { key: 'app', name: 'App', match: /^application|failing to load/i },
]

export type Stop = { value: number; label: string; note: string; ours: boolean }

export const stops: Stop[] = [
    { value: 1, label: 'Times the Earth turned', note: 'One day. Everything here happens in it.', ours: false },
    {
        value: 11838,
        label: 'Self-driving reports',
        note: 'Each one is PostHog telling a team what to fix.',
        ours: true,
    },
    { value: 86363, label: 'Survey responses', note: 'People do answer, if you ask nicely.', ours: true },
    { value: 100000, label: 'Beats of your heart', note: 'Uptime: so far, 100%.', ours: false },
    { value: 712078, label: 'Workflow emails sent', note: 'We are sorry about some of them.', ours: true },
    { value: 8.6e6, label: 'Lightning strikes on Earth', note: 'About a hundred every second.', ours: false },
    { value: 8.83e6, label: 'API queries', note: 'More than lightning. Less dramatic.', ours: true },
    { value: 19.95e6, label: 'MCP tool calls', note: 'Agents, not humans, asking for data.', ours: true },
    { value: 27.5e6, label: 'Session recordings', note: 'Somebody rage-clicked in most of them.', ours: true },
    { value: 45.6e6, label: 'Exceptions captured', note: 'Other people’s bugs. Mostly.', ours: true },
    { value: 55e6, label: 'Hot dogs eaten in the US', note: 'More hot dogs than exceptions. Barely.', ours: false },
    { value: 130.4e6, label: 'AI events', note: 'Models talking. We keep the receipts.', ours: true },
    { value: 1e9, label: 'Hours of YouTube watched', note: 'Mostly not our demo video.', ours: false },
    { value: 1.401e9, label: 'Feature flag requests', note: 'About 16,000 a second.', ours: true },
    { value: 2.25e9, label: 'Cups of coffee drunk', note: 'Several of them by our on-call engineer.', ours: false },
    { value: 6.19e9, label: 'Warehouse rows synced', note: 'Your Stripe data, on its way in.', ours: true },
    { value: 8.03e9, label: 'Events ingested', note: 'Nearly one for every person alive.', ours: true },
    { value: 11.08e9, label: 'Pipeline function calls', note: 'Events on their way somewhere else.', ours: true },
    { value: 13.7e9, label: 'Google searches', note: 'A slow Tuesday of logs beats it.', ours: false },
    { value: 20.76e9, label: 'Log records', note: 'Mostly somebody else’s stack traces.', ours: true },
    { value: 330e9, label: 'Cells your body replaces', note: 'You are a rolling deploy.', ours: false },
    {
        value: 166.7e12,
        label: 'Rows read by queries',
        note: 'Every insight, dashboard, and SQL query somebody ran.',
        ours: true,
    },
    { value: 180e12, label: 'Breaths taken by all of humanity', note: 'We are 13 trillion rows behind.', ours: false },
]

const scales: [number, string][] = [
    [1e15, 'quadrillion'],
    [1e12, 'trillion'],
    [1e9, 'billion'],
    [1e6, 'million'],
]

export function formatLong(value: number): string {
    for (const [size, name] of scales) {
        if (value >= size) {
            const scaled = value / size
            return `${scaled >= 100 ? Math.round(scaled) : Number(scaled.toFixed(scaled >= 10 ? 1 : 2))} ${name}`
        }
    }
    return Math.round(value).toLocaleString('en-US')
}

export function formatFull(value: number): string {
    return Math.round(value).toLocaleString('en-US')
}

export function perSecond(value: number): number {
    return value / 86400
}

export type CompareKey =
    | 'product_analytics'
    | 'session_replay'
    | 'feature_flags'
    | 'error_tracking'
    | 'logs'
    | 'data_warehouse'
    | 'ai_observability'

export type CompareProduct = {
    key: CompareKey
    name: string
    perDay: number
    uptimeRows: string[]
    parts: [string, number][]
}

const ingestionRows = ['Event ingestion success', 'Event ingestion lag']

function withRest(perDay: number, label: string, parts: [string, number][]): [string, number][] {
    const rest = perDay - parts.reduce((sum, [, value]) => sum + value, 0)
    return [...parts, [label, rest] as [string, number]].sort((first, second) => second[1] - first[1])
}

export const compareProducts: CompareProduct[] = [
    {
        key: 'logs',
        name: 'Logs',
        perDay: 20.76e9,
        uptimeRows: ['Logs'],
        parts: withRest(20.76e9, 'Servers and other', [
            ['Web', 116.6e6],
            ['iOS', 54.5e6],
            ['Ruby', 15.4e6],
            ['React Native', 12.3e6],
            ['Android', 7.0e6],
        ]),
    },
    {
        key: 'product_analytics',
        name: 'Events',
        perDay: 8.03e9,
        uptimeRows: ingestionRows,
        parts: withRest(8.03e9, 'Other', [
            ['Web', 3.872e9],
            ['Node', 1.201e9],
            ['React Native', 807e6],
            ['Python', 560e6],
            ['iOS', 327e6],
            ['Go', 227e6],
            ['Android', 207e6],
            ['Flutter', 197e6],
        ]),
    },
    {
        key: 'data_warehouse',
        name: 'Warehouse rows',
        perDay: 6.19e9,
        uptimeRows: ['Data warehouse sources'],
        parts: [],
    },
    {
        key: 'feature_flags',
        name: 'Flag requests',
        perDay: 1.526e9,
        uptimeRows: ['Feature flags API'],
        parts: [
            ['Remote evaluation', 1.401e9],
            ['Local evaluation polls', 124.9e6],
        ],
    },
    {
        key: 'ai_observability',
        name: 'AI events',
        perDay: 130.4e6,
        uptimeRows: ingestionRows,
        parts: withRest(130.4e6, 'Other SDKs and OpenTelemetry', [
            ['PostHog AI SDK (JS)', 16.8e6],
            ['PostHog AI SDK (Python)', 7.8e6],
            ['Langfuse', 7.8e6],
        ]),
    },
    {
        key: 'error_tracking',
        name: 'Exceptions',
        perDay: 45.6e6,
        uptimeRows: ['Error tracking ingestion lag'],
        parts: withRest(45.6e6, 'Other', [
            ['Web', 19.8e6],
            ['Python', 9.0e6],
            ['Node', 8.7e6],
            ['Go', 2.7e6],
            ['React Native', 2.1e6],
        ]),
    },
    {
        key: 'session_replay',
        name: 'Recordings',
        perDay: 33.1e6,
        uptimeRows: ['Session replay ingestion'],
        parts: [
            ['Web', 27.6e6],
            ['Mobile', 5.5e6],
        ],
    },
]

export const DAYS_PER_MONTH = 30

export type Usage = Partial<Record<CompareKey, number>>

const shortScales: [number, string][] = [
    [1e12, 'T'],
    [1e9, 'B'],
    [1e6, 'M'],
    [1e3, 'K'],
]

export function formatShort(value: number): string {
    for (const [size, suffix] of shortScales) {
        if (value >= size) {
            return `${Number((value / size).toPrecision(3))}${suffix}`
        }
    }
    return String(Math.round(value))
}

export function formatRatio(ratio: number): string {
    if (ratio >= 1e6) {
        return formatLong(ratio)
    }
    return ratio >= 10 ? formatFull(ratio) : ratio.toFixed(1)
}

export function tightestFit(usage: Usage): { product: CompareProduct; ratio: number } | null {
    let tightest: { product: CompareProduct; ratio: number } | null = null
    for (const product of compareProducts) {
        const own = usage[product.key]
        if (!own) {
            continue
        }
        const ratio = product.perDay / own
        if (!tightest || ratio < tightest.ratio) {
            tightest = { product, ratio }
        }
    }
    return tightest
}
