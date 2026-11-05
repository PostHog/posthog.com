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
    change?: number | null
}

// Labels that mean "we don't know", which the charts drop before they renormalize.
const UNKNOWN_LABELS = new Set(['Unknown', 'unknown', 'Unidentified', 'Not reported', 'None', 'Unspecified'])

// OKLCH is a perceptual color space: equal steps in lightness, chroma, or hue look equally different,
// which HSL does not give (a yellow and a blue with the same HSL lightness look very different). Every
// color on the page is built in OKLCH and converted to hex, because Chart.js paints a canvas and needs
// values, not Tailwind classes.
const toSrgb = (x: number): number => (x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055)

const oklchToLinearRgb = (l: number, c: number, h: number): [number, number, number] => {
    const radians = (h * Math.PI) / 180
    const [a, b] = [c * Math.cos(radians), c * Math.sin(radians)]
    const lms = [
        (l + 0.3963377774 * a + 0.2158037573 * b) ** 3,
        (l - 0.1055613458 * a - 0.0638541728 * b) ** 3,
        (l - 0.0894841775 * a - 1.291485548 * b) ** 3,
    ]
    return [
        4.0767416621 * lms[0] - 3.3077115913 * lms[1] + 0.2309699292 * lms[2],
        -1.2684380046 * lms[0] + 2.6097574011 * lms[1] - 0.3413193965 * lms[2],
        -0.0041960863 * lms[0] - 0.7034186147 * lms[1] + 1.707614701 * lms[2],
    ]
}

// An OKLCH color as hex. A color outside sRGB loses chroma until it fits, so its hue and lightness,
// which carry the meaning here, stay exact.
export const oklch = (l: number, c: number, h: number): string => {
    let chroma = c
    let rgb = oklchToLinearRgb(l, chroma, h)
    while (chroma > 0 && rgb.some((x) => x < -0.0005 || x > 1.0005)) {
        chroma = Math.max(0, chroma - 0.005)
        rgb = oklchToLinearRgb(l, chroma, h)
    }
    return `#${rgb
        .map((x) => Math.round(Math.min(1, Math.max(0, toSrgb(x))) * 255))
        .map((x) => x.toString(16).padStart(2, '0'))
        .join('')}`
}

// The base lightness and the chroma for every color. Labs shift their lightness from the base (see
// LAB_LIGHTNESS). Dark mode is a little lighter, so colors stay clear of the dark background.
const LIGHTNESS: Record<Theme, number> = { light: 0.68, dark: 0.76 }
const CHROMA = 0.12

// A color at a hue, shifted darker (below 0) or lighter (above 0) from the theme's lightness. Without a
// hue, it's gray.
const shade = (hue: number | undefined, theme: Theme, lightnessOffset = 0): string => {
    const lightness = Math.min(0.95, Math.max(0.3, LIGHTNESS[theme] + lightnessOffset))
    return hue === undefined ? oklch(lightness, 0, 0) : oklch(lightness, CHROMA, hue)
}

// Color means one of three things on this page: a lab (LAB_HUES), a failure (ERROR_HUE), or anything
// else (DATA_HUE): tool categories, spec versions, latency, growth. A chart with several labels that
// aren't labs uses shades of one hue, so it never looks like it's about a lab.
const DATA_HUE = 265
const ERROR_HUE = 20
export const dataColor = (theme: Theme, lightnessOffset = 0): string => shade(DATA_HUE, theme, lightnessOffset)
export const errorColor = (theme: Theme, lightnessOffset = 0): string => shade(ERROR_HUE, theme, lightnessOffset)

// Lab hues, spread around the wheel from two anchors: Anthropic's orange (39 degrees) and OpenAI's
// blue-green (175 degrees, set to 180 to stay clear of green). The other labs fill the gaps 50 to 80
// degrees apart, and labs next to each other in a stacked chart are at least 55 degrees apart. Makers
// that are not labs take the hues between them.
const LAB_HUES: Record<string, number> = {
    Anthropic: 40,
    xAI: 100,
    OpenAI: 180,
    Google: 230,
    Cursor: 280,
    'Open weights': 335,
    'Open source': 335,
    'Custom code': 140,
    Microsoft: 255,
    'Other apps': 310,
}

// Each lab's lightness, as an offset from the theme's lightness. Hue alone separates neighbors weakly,
// so labs next to each other in a stacked chart alternate darker and lighter: they differ in both hue
// and lightness. Yellow (xAI) sits light and blue (Google) dark, where those hues look natural.
const LAB_LIGHTNESS: Record<string, number> = {
    Anthropic: -0.04,
    OpenAI: 0.1,
    xAI: 0.18,
    Google: -0.1,
    'Open weights': 0.08,
    'Open source': 0.08,
    Cursor: -0.06,
    Other: 0.14,
}

// A lab's or maker's color. `lightnessOffset` shades it darker (below 0) or lighter (above 0) at the
// same hue. "Other" and anything without a hue are gray.
export const vendorColor = (vendor: string, theme: Theme, lightnessOffset = 0): string =>
    shade(LAB_HUES[vendor], theme, (LAB_LIGHTNESS[vendor] ?? 0) + lightnessOffset)

// The one color a lab or maker gets wherever it is a single fill: the scoreboard, the lab chart, and
// the harness bars. It's a little darker than the base, so the bands read as strongly as the model
// chart, whose leading models start at the dark end of each lab's shades.
export const labColor = (vendor: string, theme: Theme): string => vendorColor(vendor, theme, -0.08)

// The lightness offset of item `i` out of `count`, from dark to light in even steps. The steps are
// wide, so neighbors stay apart even at the light end, where chroma has to drop.
const rampOffset = (i: number, count: number): number => -0.18 + (count > 1 ? i / (count - 1) : 0.5) * 0.38

// Shades of one hue for labels that aren't labs, such as spec versions or sign-in methods, darkest
// first, in the order given. Unknown labels and "Other" are gray. Pass every label the bar and the
// chart show, so both use the same color for a label.
export const rampColors = (labels: string[], theme: Theme, hue = DATA_HUE): Map<string, string> => {
    const named = Array.from(new Set(labels)).filter((label) => !UNKNOWN_LABELS.has(label) && label !== 'Other')
    const colors = new Map<string, string>()
    named.forEach((label, i) => colors.set(label, shade(hue, theme, rampOffset(i, named.length))))
    labels.forEach((label) => colors.has(label) || colors.set(label, shade(undefined, theme)))
    return colors
}

export const errorRampColors = (labels: string[], theme: Theme): Map<string, string> =>
    rampColors(labels, theme, ERROR_HUE)

// Gives each series a shade of its lab's color, in the same steps as `rampColors`, so a lab's models
// read as one family, each model stays distinguishable, and no shade drifts into another lab's color
// or into gray. Pass entries in display order.
export const labShades = (entries: { label: string; vendor: string }[], theme: Theme): Map<string, string> => {
    const byVendor = new Map<string, string[]>()
    entries.forEach(({ label, vendor }) => {
        if (!byVendor.has(vendor)) byVendor.set(vendor, [])
        byVendor.get(vendor)?.push(label)
    })
    const colors = new Map<string, string>()
    byVendor.forEach((labels, vendor) => {
        labels.forEach((label, i) => colors.set(label, vendorColor(vendor, theme, rampOffset(i, labels.length))))
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
    'Claude artifacts': 'Anthropic',
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
    model_source: { self_reported: 'Agent said so', client_metadata: 'Client metadata' },
    // "OpenAI" is OpenAI's MCP connector when it doesn't say which OpenAI app it runs in.
    client: { Other: 'Other agents', OpenAI: 'OpenAI (app not named)' },
    error_type: {
        validation: 'Bad arguments',
        internal: 'Tool failed',
        api_4xx: 'API said no (4xx)',
        api_5xx: 'API error (5xx)',
        permission: 'No permission',
        rate_limited: 'Rate limited',
        missing_context: 'Missing context',
        memory_limit: 'Memory limit',
        timeout: 'Timed out',
    },
    // Short enough to fit the narrowest bar list. The full name shows on hover.
    tool_category: { 'Organization & project management': 'Project management' },
}

export const displayLabel = (facet: string, label: string): string => DISPLAY_LABELS[facet]?.[label] ?? label

export const clientMaker = (client: string): string => {
    if (client === 'Other') return 'Other'
    return CLIENT_MAKER[client] ?? 'Other apps'
}

export const clientColor = (client: string, theme: Theme): string => labColor(clientMaker(client), theme)

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

// One value of the `total_daily` facet for each day, for the reliability charts.
export const totalSeries = (
    rows: LeaderboardRow[],
    days: string[],
    key: 'error_rate_pct' | 'p50_ms' | 'p95_ms'
): (number | null)[] => {
    const byDay = new Map(facetRows(rows, 'total_daily').map((row) => [row.week, row[key]]))
    return days.map((day) => byDay.get(day) ?? null)
}

// Calls share per group and period, summed over the labels that `groupOf` maps into each group.
// Calls shares add up within a period, so grouping (for example clients into makers) is exact.
// With `dropUnknown` (the default), unknown labels are removed and each period renormalizes to 100.
export const groupedSeries = (
    rows: LeaderboardRow[],
    facet: string,
    periods: string[],
    groupOf: (label: string) => string = (label) => label,
    dropUnknown = true
): Map<string, number[]> => {
    const byGroup = new Map<string, number[]>()
    const known = facetRows(rows, facet).filter((row) => !dropUnknown || !UNKNOWN_LABELS.has(row.label))
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

// Share of a period's calls where we know the model: everything except the unknown labels.
export const modelCoverage = (
    rows: LeaderboardRow[],
    facet: 'model_vendor' | 'model_vendor_daily',
    period: string
): number =>
    100 -
    facetRows(rows, facet)
        .filter((row) => row.week === period && UNKNOWN_LABELS.has(row.label))
        .reduce((sum, row) => sum + (row.calls_pct ?? 0), 0)

// One value of the `total` facet for each week, for the growth chart.
export const growthSeries = (
    rows: LeaderboardRow[],
    weeks: string[],
    key: 'calls_index' | 'users_index'
): (number | null)[] => {
    const byWeek = new Map(facetRows(rows, 'total').map((row) => [row.week, row[key]]))
    return weeks.map((week) => byWeek.get(week) ?? null)
}

export const addDays = (day: string, days: number): string =>
    new Date(Date.parse(`${day}T00:00:00Z`) + days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)

export const formatDay = (day: string): string =>
    new Date(`${day}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })

// A week as "Oct 5–11", or "Sep 28–Oct 4" when it crosses a month.
export const formatWeek = (week: string): string => {
    const [start, end] = [formatDay(week), formatDay(addDays(week, 6))]
    return start.split(' ')[0] === end.split(' ')[0] ? `${start}–${end.split(' ')[1]}` : `${start}–${end}`
}

export const formatPct = (value: number | null | undefined, digits = 1): string =>
    value === null || value === undefined ? '–' : `${value < 0.1 && value > 0 ? '<0.1' : value.toFixed(digits)}%`
