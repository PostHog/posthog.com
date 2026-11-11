export type MetricKey = 'latency' | 'inputTokens' | 'outputTokens' | 'cost'

export type MetricSamples = Record<MetricKey, number>

export interface Metric {
    key: MetricKey
    label: string
    color: string
    format: (value: number) => string
}

export interface BoxSummary {
    p25: number
    median: number
    mean: number
    p75: number
    whiskerMin: number
    whiskerMax: number
}

export const AI_MODEL = 'gpt-5.6-luna'
const INPUT_USD_PER_TOKEN = 0.2 / 1_000_000
const OUTPUT_USD_PER_TOKEN = 1.25 / 1_000_000
const CENTS_PER_DOLLAR = 100
const TUKEY_FENCE = 1.5
const NICE_STEPS = [1, 2, 2.5, 5, 10]

const formatCents = (usd: number): string => {
    const cents = usd * CENTS_PER_DOLLAR
    if (cents === 0) return '0¢'
    return `${cents.toPrecision(cents < 0.01 ? 1 : 2).replace(/\.?0+$/, '')}¢`
}

export const METRICS: Metric[] = [
    {
        key: 'latency',
        label: 'Latency',
        color: '#1d4aff',
        format: (seconds) => (seconds === 0 ? '0s' : `${seconds.toFixed(seconds < 10 ? 1 : 0)}s`),
    },
    {
        key: 'inputTokens',
        label: 'Input tokens',
        color: '#7f26d9',
        format: (tokens) => Math.round(tokens).toLocaleString('en-US'),
    },
    {
        key: 'outputTokens',
        label: 'Output tokens',
        color: '#42827e',
        format: (tokens) => Math.round(tokens).toLocaleString('en-US'),
    },
    {
        key: 'cost',
        label: 'Cost',
        color: '#ce0e74',
        format: formatCents,
    },
]

const standardNormal = (): number => {
    const u = 1 - Math.random()
    const v = Math.random()
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

const logNormal = (median: number, spread: number): number => median * Math.exp(spread * standardNormal())

export const generationCost = (inputTokens: number, outputTokens: number): number =>
    inputTokens * INPUT_USD_PER_TOKEN + outputTokens * OUTPUT_USD_PER_TOKEN

export const sampleGeneration = (): MetricSamples => {
    const inputTokens = Math.round(logNormal(420, 0.3))
    const outputTokens = Math.round(logNormal(52, 0.4))
    return {
        latency: logNormal(1.4, 0.3),
        inputTokens,
        outputTokens,
        cost: generationCost(inputTokens, outputTokens),
    }
}

const quantile = (sorted: number[], q: number): number => {
    const position = (sorted.length - 1) * q
    const below = Math.floor(position)
    const above = Math.ceil(position)
    return sorted[below] + (sorted[above] - sorted[below]) * (position - below)
}

export const summarize = (samples: number[]): BoxSummary | null => {
    if (samples.length === 0) return null
    const sorted = [...samples].sort((a, b) => a - b)
    const p25 = quantile(sorted, 0.25)
    const p75 = quantile(sorted, 0.75)
    const fence = (p75 - p25) * TUKEY_FENCE
    const inside = sorted.filter((value) => value >= p25 - fence && value <= p75 + fence)
    return {
        p25,
        median: quantile(sorted, 0.5),
        mean: sorted.reduce((total, value) => total + value, 0) / sorted.length,
        p75,
        whiskerMin: inside[0] ?? p25,
        whiskerMax: inside[inside.length - 1] ?? p75,
    }
}

export const niceCeiling = (value: number): number => {
    if (value <= 0) return 1
    const magnitude = 10 ** Math.floor(Math.log10(value))
    const step = NICE_STEPS.find((candidate) => candidate * magnitude >= value) ?? 10
    return step * magnitude
}
