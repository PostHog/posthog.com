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
export const UNKNOWN_LABELS = new Set(['Unknown', 'unknown', 'Unidentified', 'Not reported', 'None', 'Unspecified'])

// Hex values of the Tailwind tokens named in the comments. Chart.js paints a canvas, so it needs
// the values, not the classes. Anthropic and OpenAI use their brand colors, like the MCP analytics
// dashboard does.
const PALETTE = {
    anthropic: '#D97757',
    openai: '#74AA9C',
    google: '#2F80FA', // blue
    openWeights: '#6AA84F', // green
    cursor: '#8567FF', // lilac
    microsoft: '#30ABC6', // seagreen
    custom: '#F7A501', // yellow
    apps: '#B62AD9', // purple
    posthog: '#F54E00', // red
    other: '#8F8F8C', // gray
}

export const CATEGORICAL = [
    PALETTE.google,
    PALETTE.custom,
    PALETTE.openWeights,
    PALETTE.apps,
    PALETTE.microsoft,
    PALETTE.posthog,
    PALETTE.cursor,
]

// xAI and Grok use a monochrome mark, like the MCP analytics dashboard, so the color follows the theme.
const monochrome = (theme: Theme): string => (theme === 'dark' ? '#EEEFE9' : '#4D4F46')

export const vendorColor = (vendor: string, theme: Theme): string => {
    switch (vendor) {
        case 'Anthropic':
            return PALETTE.anthropic
        case 'OpenAI':
            return PALETTE.openai
        case 'Google':
            return PALETTE.google
        case 'xAI':
            return monochrome(theme)
        case 'Open weights':
        case 'Open source':
            return PALETTE.openWeights
        case 'Cursor':
            return PALETTE.cursor
        case 'Microsoft':
            return PALETTE.microsoft
        case 'Custom code':
            return PALETTE.custom
        case 'Other apps':
            return PALETTE.apps
        case 'PostHog':
            return PALETTE.posthog
        default:
            return PALETTE.other
    }
}

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
    entries.forEach(({ label, vendor }) => byVendor.set(vendor, [...(byVendor.get(vendor) ?? []), label]))
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
    'PostHog CLI': 'PostHog',
}

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

// Rows grouped by facet once per rows array, so the selectors below don't rescan every row.
const facetIndex = new WeakMap<LeaderboardRow[], Map<string, LeaderboardRow[]>>()

export const facetRows = (rows: LeaderboardRow[], facet: string, grp = ''): LeaderboardRow[] => {
    let index = facetIndex.get(rows)
    if (!index) {
        index = new Map()
        rows.forEach((row) => index?.set(row.facet, [...(index.get(row.facet) ?? []), row]))
        facetIndex.set(rows, index)
    }
    return (index.get(facet) ?? []).filter((row) => (row.grp ?? '') === grp)
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
    { grp = '', dropUnknown = false }: { grp?: string; dropUnknown?: boolean } = {}
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
    return shares.sort((a, b) => b.value - a.value)
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
    groupOf: (label: string) => string | null
): Map<string, number[]> => {
    const byGroup = new Map<string, number[]>()
    const known = facetRows(rows, facet).filter((row) => !UNKNOWN_LABELS.has(row.label))
    periods.forEach((period, i) => {
        const periodRows = known.filter((row) => row.week === period)
        const total = periodRows.reduce((sum, row) => sum + (row.calls_pct ?? 0), 0)
        periodRows.forEach((row) => {
            const group = groupOf(row.label)
            if (!group || total <= 0) return
            // A group missing from a period is a real zero, because the facet has data that period.
            if (!byGroup.has(group)) byGroup.set(group, Array(periods.length).fill(0))
            const values = byGroup.get(group) as number[]
            values[i] += ((row.calls_pct ?? 0) / total) * 100
        })
    })
    return byGroup
}

// Keeps the `limit` largest groups (by average share) and folds the rest into "Other".
export const topSeries = (
    byGroup: Map<string, number[]>,
    limit: number,
    colorOf: (label: string) => string
): Series[] => {
    const average = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / (values.length || 1)
    const ranked = Array.from(byGroup.entries())
        .filter(([label]) => label !== 'Other')
        .sort((a, b) => average(b[1]) - average(a[1]))
    const kept = ranked.slice(0, limit)
    const folded = [...ranked.slice(limit), ...(byGroup.has('Other') ? [['Other', byGroup.get('Other')]] : [])] as [
        string,
        number[]
    ][]
    const series: Series[] = kept.map(([label, data]) => ({ label, color: colorOf(label), data }))
    if (folded.length > 0) {
        series.push({
            label: 'Other',
            color: colorOf('Other'),
            data: folded[0][1].map((_, i) => folded.reduce((sum, [, values]) => sum + values[i], 0)),
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
