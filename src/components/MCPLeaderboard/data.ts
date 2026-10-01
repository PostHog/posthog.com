// Selectors and label maps for the rows sourced from the `mcp_public_leaderboard_weekly` and
// `mcp_public_leaderboard_daily` endpoints (see gatsby/sourceNodes.ts). Every value is already a
// percentage, so this file only slices and regroups them. See README.md for the row shape.

export interface LeaderboardRow {
    // Monday of the week for weekly facets, the day itself for `*_daily` facets.
    week: string
    facet: string
    grp: string | null
    label: string
    calls_pct: number | null
    users_pct: number | null
    error_rate_pct: number | null
    p50_ms: number | null
    p95_ms: number | null
    calls_index: number | null
    users_index: number | null
}

export type Metric = 'calls_pct' | 'users_pct'
export type Theme = 'light' | 'dark'

export interface Series {
    label: string
    color: string
    data: (number | null)[]
}

export interface Share {
    label: string
    value: number
    color?: string
    errorRate?: number | null
    p95?: number | null
}

// Labels that mean "we don't know", which the charts drop before they renormalize.
const UNKNOWN_LABELS = new Set(['Unknown', 'unknown', 'Unidentified', 'Not reported', 'None', 'Unspecified'])

// Hex values of the Tailwind tokens named in the comments. Chart.js paints a canvas, so it needs
// the values, not the classes. Anthropic and OpenAI use their brand colors, like the MCP analytics
// dashboard does.
export const PALETTE = {
    anthropic: '#D97757',
    openai: '#74AA9C',
    blue: '#2F80FA',
    green: '#6AA84F',
    lilac: '#8567FF',
    seagreen: '#30ABC6',
    yellow: '#F7A501',
    purple: '#B62AD9',
    red: '#F54E00',
    gray: '#8F8F8C',
}

const CATEGORICAL = [
    PALETTE.blue,
    PALETTE.yellow,
    PALETTE.green,
    PALETTE.purple,
    PALETTE.seagreen,
    PALETTE.red,
    PALETTE.lilac,
]

// Colors for labels that have no lab or maker: gray for unknown and "Other", otherwise the next
// categorical color.
export const categoricalColor = (label: string, i: number): string =>
    UNKNOWN_LABELS.has(label) || label === 'Other' ? PALETTE.gray : CATEGORICAL[i % CATEGORICAL.length]

const VENDOR_COLORS: Record<string, string> = {
    Anthropic: PALETTE.anthropic,
    OpenAI: PALETTE.openai,
    Google: PALETTE.blue,
    'Open weights': PALETTE.green,
    'Open source': PALETTE.green,
    Cursor: PALETTE.lilac,
    Microsoft: PALETTE.seagreen,
    'Custom code': PALETTE.yellow,
    'Other apps': PALETTE.purple,
}

// xAI and Grok use a monochrome mark, like the MCP analytics dashboard, so the color follows the theme.
export const vendorColor = (vendor: string, theme: Theme): string =>
    vendor === 'xAI' ? (theme === 'dark' ? '#EEEFE9' : '#4D4F46') : VENDOR_COLORS[vendor] ?? PALETTE.gray

// Mixes a hex color toward white (amount > 0) or black (amount < 0).
const shade = (hex: string, amount: number): string => {
    const target = amount > 0 ? 255 : 0
    const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
    return `#${channels
        .map((c) => Math.round(c + (target - c) * Math.abs(amount)))
        .map((c) => c.toString(16).padStart(2, '0'))
        .join('')}`
}

// Gives each series its lab's color, stepping from dark to light within a lab, so a lab's models
// read as one family and each model stays distinguishable. Pass entries in display order.
export const labShades = (entries: { label: string; vendor: string }[], theme: Theme): Map<string, string> => {
    const byVendor = new Map<string, string[]>()
    entries.forEach(({ label, vendor }) => {
        if (!byVendor.has(vendor)) byVendor.set(vendor, [])
        byVendor.get(vendor)?.push(label)
    })
    const colors = new Map<string, string>()
    byVendor.forEach((labels, vendor) => {
        const base = vendorColor(vendor, theme)
        labels.forEach((label, i) => {
            const step = labels.length > 1 ? i / (labels.length - 1) : 0
            colors.set(label, shade(base, -0.25 + step * 0.75))
        })
    })
    return colors
}

// Who makes each client. The labels come from the endpoint, which mirrors the harness labels in
// PostHog's MCP analytics product.
const CLIENT_MAKER: Record<string, string> = {
    'Claude Code': 'Anthropic',
    'Claude Code (VS Code)': 'Anthropic',
    'Claude Agent SDK': 'Anthropic',
    'Claude Desktop': 'Anthropic',
    'Claude.ai': 'Anthropic',
    'Anthropic API': 'Anthropic',
    Cowork: 'Anthropic',
    'Claude Design': 'Anthropic',
    ChatGPT: 'OpenAI',
    OpenAI: 'OpenAI',
    'OpenAI Codex': 'OpenAI',
    'OpenAI Agent Builder': 'OpenAI',
    'OpenAI Responses API': 'OpenAI',
    Grok: 'xAI',
    Antigravity: 'Google',
    Cursor: 'Cursor',
    'VS Code': 'Microsoft',
    'GitHub Copilot': 'Microsoft',
    opencode: 'Open source',
    LibreChat: 'Open source',
    Zed: 'Open source',
    Pi: 'Open source',
    OpenClaw: 'Open source',
    'Desktop Commander': 'Open source',
    'Custom code': 'Custom code',
}

// Display names for raw labels. Labels without an entry show as they come from the endpoint.
const DISPLAY_LABELS: Record<string, Record<string, string>> = {
    auth_method: { oauth: 'OAuth', personal_api_key: 'Personal API key' },
    region: { us: 'US', eu: 'EU' },
    model_source: { self_reported: 'Agent said so', client_metadata: 'Client metadata' },
    client: { Other: 'Other agents' },
}

export const displayLabel = (facet: string, label: string): string => DISPLAY_LABELS[facet]?.[label] ?? label

export const clientMaker = (client: string): string => {
    if (client === 'Other') return 'Other'
    return CLIENT_MAKER[client] ?? 'Other apps'
}

export const clientColor = (client: string, theme: Theme): string => vendorColor(clientMaker(client), theme)

// Mirrors the vendor `multiIf` in the endpoint query.
export const modelVendor = (model: string): string => {
    const m = model.toLowerCase()
    if (/gpt-oss|deepseek|glm|kimi|qwen|llama|mistral|minimax|gemma|nemotron|olmo|devstral|codestral|mimo|^phi/.test(m))
        return 'Open weights'
    if (/claude|opus|sonnet|haiku|fable|anthropic/.test(m)) return 'Anthropic'
    if (/gpt|^o[1-9]|codex|openai|chatgpt/.test(m)) return 'OpenAI'
    if (/gemini|google/.test(m)) return 'Google'
    if (/grok|xai/.test(m)) return 'xAI'
    if (/composer/.test(m)) return 'Cursor'
    return 'Other'
}

// Rows grouped by facet and group once per rows array, so the selectors below don't rescan every row.
const facetIndex = new WeakMap<LeaderboardRow[], Map<string, LeaderboardRow[]>>()

const facetRows = (rows: LeaderboardRow[], facet: string, grp = ''): LeaderboardRow[] => {
    let index = facetIndex.get(rows)
    if (!index) {
        const built = new Map<string, LeaderboardRow[]>()
        rows.forEach((row) => {
            const key = `${row.facet}|${row.grp ?? ''}`
            if (!built.has(key)) built.set(key, [])
            built.get(key)?.push(row)
        })
        facetIndex.set(rows, built)
        index = built
    }
    return index.get(`${facet}|${grp}`) ?? []
}

export const getPeriods = (rows: LeaderboardRow[], facet: string): string[] =>
    Array.from(new Set(facetRows(rows, facet).map((row) => row.week))).sort()

// One period of a facet, as shares. With `dropUnknown`, unknown labels are removed and the calls
// shares renormalize to 100, which answers "among the agents that told us".
export const weekShares = (
    rows: LeaderboardRow[],
    facet: string,
    week: string,
    metric: Metric,
    {
        grp = '',
        dropUnknown = false,
        dropOther = false,
        limit,
    }: { grp?: string; dropUnknown?: boolean; dropOther?: boolean; limit?: number } = {}
): Share[] => {
    const shares = facetRows(rows, facet, grp)
        .filter((row) => row.week === week && row[metric] !== null)
        .filter((row) => !dropUnknown || !UNKNOWN_LABELS.has(row.label))
        .map((row) => ({
            label: row.label,
            value: row[metric] as number,
            errorRate: row.error_rate_pct,
            p95: row.p95_ms,
        }))
    const total = shares.reduce((sum, share) => sum + share.value, 0)
    if (dropUnknown && metric === 'calls_pct' && total > 0) {
        shares.forEach((share) => (share.value = (share.value / total) * 100))
    }
    return shares
        .sort((a, b) => b.value - a.value)
        .filter((share) => !dropOther || share.label !== 'Other')
        .slice(0, limit)
}

// One value of the `total` facet for each week, for the growth and reliability charts.
export const totalSeries = (
    rows: LeaderboardRow[],
    weeks: string[],
    key: 'calls_index' | 'users_index' | 'error_rate_pct' | 'p50_ms' | 'p95_ms'
): (number | null)[] => {
    const byWeek = new Map(facetRows(rows, 'total').map((row) => [row.week, row[key]]))
    return weeks.map((week) => byWeek.get(week) ?? null)
}

// Share of a facet that is known, so a chart can say "62% of calls reported a model".
export const knownShare = (rows: LeaderboardRow[], facet: string, week: string, grp = ''): number =>
    facetRows(rows, facet, grp)
        .filter((row) => row.week === week && !UNKNOWN_LABELS.has(row.label))
        .reduce((sum, row) => sum + (row.calls_pct ?? 0), 0)

// Calls share per group and period, summed over the labels that `groupOf` maps into each group.
// Calls shares add up within a period, so grouping (for example clients into makers) is exact.
export const groupedSeries = (
    rows: LeaderboardRow[],
    facet: string,
    periods: string[],
    groupOf: (label: string) => string = (label) => label
): Map<string, number[]> => {
    const byGroup = new Map<string, number[]>()
    const known = facetRows(rows, facet).filter((row) => !UNKNOWN_LABELS.has(row.label))
    periods.forEach((period, i) => {
        const periodRows = known.filter((row) => row.week === period)
        const total = periodRows.reduce((sum, row) => sum + (row.calls_pct ?? 0), 0)
        periodRows.forEach((row) => {
            const group = groupOf(row.label)
            if (total <= 0) return
            // A group missing from a period is a real zero, because the facet has data that period.
            if (!byGroup.has(group)) byGroup.set(group, Array(periods.length).fill(0))
            const values = byGroup.get(group) as number[]
            values[i] += ((row.calls_pct ?? 0) / total) * 100
        })
    })
    return byGroup
}

const average = (values: number[]): number => values.reduce((sum, value) => sum + value, 0) / (values.length || 1)

// Group labels other than "Other", largest average share first.
export const rankByAverage = (byGroup: Map<string, number[]>): string[] =>
    Array.from(byGroup.keys())
        .filter((label) => label !== 'Other')
        .sort((a, b) => average(byGroup.get(b) as number[]) - average(byGroup.get(a) as number[]))

// Keeps the `limit` largest groups and folds the rest into "Other".
export const topSeries = (
    byGroup: Map<string, number[]>,
    limit: number,
    colorOf: (label: string, i: number) => string
): Series[] => {
    const ranked = rankByAverage(byGroup)
    const series = ranked
        .slice(0, limit)
        .map((label, i) => ({ label, color: colorOf(label, i), data: byGroup.get(label) as number[] }))
    const folded = [...ranked.slice(limit), 'Other'].filter((label) => byGroup.has(label))
    if (folded.length > 0) {
        const length = (byGroup.get(folded[0]) as number[]).length
        series.push({
            label: 'Other',
            color: colorOf('Other', series.length),
            data: Array.from({ length }, (_, i) =>
                folded.reduce((sum, label) => sum + (byGroup.get(label) as number[])[i], 0)
            ),
        })
    }
    return series
}

// Percentage-point change between the last two periods.
export const delta = (values: number[]): number | null =>
    values.length >= 2 ? values[values.length - 1] - values[values.length - 2] : null

export const formatDay = (day: string): string =>
    new Date(`${day}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })

export const formatPct = (value: number | null | undefined, digits = 1): string =>
    value === null || value === undefined ? '–' : `${value < 0.1 && value > 0 ? '<0.1' : value.toFixed(digits)}%`
