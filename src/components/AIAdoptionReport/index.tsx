import React, { useState } from 'react'
import { BarChart, LineChart, Sparkline } from 'components/UI/Chart'
import CloudinaryImage from 'components/CloudinaryImage'
import BrandLogo from 'components/MCPLeaderboard/BrandLogo'
import { modelVendor } from 'components/MCPLeaderboard/data'
import { getLogo, getDarkClassForLogo } from '../../constants/logos'
import langchainMark from '../../../contents/images/docs/llms/langchain.svg'

const sections = {
    model: [
        'Models',
        'Which models are teams using?',
        'Model',
        'Share of qualifying organizations that used each model. A team can use several models.',
    ],
    lab: [
        'Labs',
        'Which labs do teams use?',
        'Lab',
        'Share of qualifying organizations that used a model from each lab. Each team counts once per lab.',
    ],
    provider_diversity: [
        'Provider diversity',
        'How many providers does one team use?',
        'Providers',
        'Share of organizations that reported a provider. A router counts as one provider.',
    ],
    framework: [
        'Frameworks & tools',
        'Which frameworks and agent tools show up?',
        'Framework or tool',
        'Share of organizations that reported a framework or agent tool. A team can use several tools.',
    ],
} as const
type Section = keyof typeof sections
export interface AdoptionSeries {
    facet: Section | 'coverage'
    label: string
    points: { month: string; share: number | null }[]
}

const displayNames: Record<string, string> = {
    openai: 'OpenAI',
    anthropic: 'Anthropic',
    google: 'Google',
    xai: 'xAI',
    kimi: 'Moonshot AI (Kimi)',
    deepseek: 'DeepSeek',
    meta: 'Meta',
    qwen: 'Alibaba (Qwen)',
    mistral: 'Mistral',
    zai: 'Z.ai (GLM)',
    perplexity: 'Perplexity',
    minimax: 'MiniMax',
    xiaomi: 'Xiaomi (MiMo)',
    nvidia: 'NVIDIA',
    bytedance: 'ByteDance',
    amazon: 'Amazon',
    elevenlabs: 'ElevenLabs',
    cohere: 'Cohere',
    liquid: 'Liquid AI',
    baai: 'BAAI',
    voyage: 'Voyage AI',
    inception: 'Inception',
    stepfun: 'StepFun',
    other: 'Unmatched model names',
    vercel: 'Vercel AI SDK',
    langchain: 'LangChain',
    'claude-code': 'Claude Code',
    'openai-agents': 'OpenAI Agents SDK',
    openclaw: 'OpenClaw',
    pi: 'Pi',
    'claude-agent-sdk': 'Claude Agent SDK',
}
const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })
const monthName = (month: string) => dateFormat.format(new Date(month + 'T00:00:00Z'))
const percent = (share: number | null | undefined) => (share == null ? '—' : `${share.toFixed(1)}%`)
const chartConfig = {
    legend: { show: true },
    yTickFormatter: (v: number) => `${v}%`,
    tooltip: { valueFormatter: percent },
}

function rowLogo(section: Section, key: string, label: string) {
    if (section === 'provider_diversity') return null
    const family = section === 'model' ? key.split('-')[0] : key
    const logo = family === 'langchain' ? langchainMark : getLogo(family)
    if (logo) {
        const darkClass = family === 'langchain' || family === 'vercel' ? 'dark:invert' : getDarkClassForLogo(logo)
        return (
            <img src={logo} className={`size-4 shrink-0 object-contain ${darkClass}`} width={16} height={16} alt="" />
        )
    }
    return <BrandLogo name={label} fallback={modelVendor(key)} />
}

export default function AIAdoptionReport({
    series,
    isPreview,
}: {
    series: AdoptionSeries[]
    isPreview?: boolean
}): JSX.Element {
    const months = Array.from(new Set(series.flatMap((row) => row.points.map((point) => point.month)))).sort()
    const [selected, setSelected] = useState('')
    const [section, setSection] = useState<Section>('model')
    const [showAll, setShowAll] = useState(false)
    const [expanded, setExpanded] = useState('')
    const month = months.includes(selected) ? selected : months[months.length - 1]
    const history = months.filter((value) => value <= month)
    const previous =
        month &&
        new Date(Date.UTC(Number(month.slice(0, 4)), Number(month.slice(5, 7)) - 2, 1)).toISOString().slice(0, 10)
    const [, question, heading, description] = sections[section]
    const rows = series
        .filter((row) => row.facet === section && row.label !== 'Other models' && row.label !== 'Not reported')
        .map((row) => {
            const values = new Map(row.points.map((point) => [point.month, point.share]))
            const share = values.get(month)
            const prior = values.get(previous)
            return {
                key: row.label,
                label: displayNames[row.label] ?? row.label,
                share,
                change: share == null || prior == null ? null : Number((share - prior).toFixed(1)),
                data: history.map((value) => values.get(value) ?? NaN),
            }
        })
        .sort((a, b) =>
            section === 'provider_diversity'
                ? a.label.localeCompare(b.label)
                : (b.share ?? -1) - (a.share ?? -1) || a.label.localeCompare(b.label)
        )
    const chartRows = rows.filter((row) => row.share != null).slice(0, 5)
    const expandedRow = rows.find((row) => row.key === expanded)
    if (expandedRow && !chartRows.includes(expandedRow)) chartRows.push(expandedRow)
    const coverageLabel =
        section === 'framework' ? 'Framework reported' : section === 'provider_diversity' ? 'Provider reported' : ''
    const coverage = series
        .find((row) => row.facet === 'coverage' && row.label === coverageLabel)
        ?.points.find((point) => point.month === month)?.share
    const dates = history.map(monthName)

    return (
        <div className="@container mx-auto max-w-4xl text-primary">
            <header className="flex items-center justify-between gap-4 rounded-t-lg border border-primary bg-gradient-to-r from-primary to-light-purple dark:to-purple-2-dark p-5 @lg:p-8">
                <div>
                    <p className="m-0 font-mono text-xs">AI Observability · Monthly report</p>
                    <h1 className="my-2 text-4xl @lg:text-5xl tracking-tight">How teams use AI</h1>
                    {isPreview && <p className="mb-2 font-semibold">Design preview with synthetic data</p>}
                    <p className="m-0 max-w-prose">
                        Which models, labs, and tools show up in the AI events teams send to PostHog? Each team counts
                        once, whether it sends a hundred events or a million.
                    </p>
                </div>
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/detective_hog_9b2bb1da51.png"
                    alt=""
                    className="hidden @md:block w-28 shrink-0"
                />
            </header>
            {!month ? (
                <p role="status" className="rounded-b-lg border border-t-0 border-primary p-5">
                    The monthly report is not available yet.
                </p>
            ) : (
                <>
                    <div
                        role="group"
                        aria-label="Report section"
                        className="flex flex-wrap gap-1 border-x border-b border-primary p-2"
                    >
                        {(Object.keys(sections) as Section[]).map((key) => (
                            <button
                                key={key}
                                type="button"
                                aria-pressed={key === section}
                                className="rounded px-3 py-2 text-sm font-semibold hover:bg-accent aria-pressed:bg-accent aria-pressed:underline"
                                onClick={() => {
                                    setSection(key)
                                    setExpanded('')
                                    setShowAll(false)
                                }}
                            >
                                {sections[key][0]}
                            </button>
                        ))}
                    </div>
                    <section className="px-1 py-5 @lg:px-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <h2 className="m-0 text-2xl">{question}</h2>
                            <label className="flex items-center gap-2 text-sm font-semibold">
                                Month{' '}
                                <select
                                    className="rounded border border-input bg-primary px-2 py-1 text-primary"
                                    value={month}
                                    onChange={(event) => {
                                        setSelected(event.target.value)
                                        setExpanded('')
                                    }}
                                >
                                    {[...months].reverse().map((value) => (
                                        <option key={value} value={value}>
                                            {monthName(value)}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <p className="my-2 text-sm text-secondary">
                            {description}{' '}
                            {coverage != null &&
                                `Reporting coverage: ${percent(coverage)} of qualifying organizations.`}
                        </p>
                        {chartRows.length > 0 && (
                            <figure className="my-4 rounded-md border border-primary p-3 @lg:p-5">
                                <figcaption className="mb-2 font-semibold">
                                    {sections[section][0]} by month{' '}
                                    <span className="text-sm font-normal text-secondary">
                                        {' '}
                                        · {dates[0]}
                                        {dates.length > 1 && ` – ${dates[dates.length - 1]}`}
                                    </span>
                                </figcaption>
                                {section === 'provider_diversity' ? (
                                    <BarChart
                                        className="h-64"
                                        labels={dates}
                                        series={chartRows}
                                        config={{
                                            ...chartConfig,
                                            barLayout: 'stacked',
                                            bars: { valueDomain: { min: 0, max: 100 } },
                                        }}
                                    />
                                ) : (
                                    <LineChart
                                        className="h-64"
                                        labels={dates}
                                        series={chartRows}
                                        config={chartConfig}
                                    />
                                )}
                            </figure>
                        )}
                        {rows.length > 0 ? (
                            <table className="w-full text-sm tabular-nums">
                                <thead className="border-b border-primary text-right">
                                    <tr>
                                        <th scope="col" className="py-2 text-left">
                                            {heading}
                                        </th>
                                        <th scope="col" className="hidden text-left @md:table-cell">
                                            Trend
                                        </th>
                                        <th scope="col">Org share</th>
                                        <th scope="col">
                                            <abbr title="Change from the previous month, in percentage points">
                                                Change
                                            </abbr>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(showAll ? rows : rows.slice(0, 5)).map((row) => (
                                        <React.Fragment key={row.key}>
                                            <tr className="border-b border-primary">
                                                <th scope="row" className="max-w-36 break-words py-2 text-left">
                                                    <button
                                                        type="button"
                                                        className="inline-flex max-w-full items-center gap-2 text-left hover:underline"
                                                        aria-expanded={expanded === row.key}
                                                        onClick={() => setExpanded(expanded === row.key ? '' : row.key)}
                                                    >
                                                        {rowLogo(section, row.key, row.label)}
                                                        <span className="min-w-0">{row.label}</span>
                                                    </button>
                                                </th>
                                                <td className="hidden w-24 pr-4 @md:table-cell">
                                                    <Sparkline data={row.data} height={24} labels={dates} />
                                                </td>
                                                <td className="text-right">{percent(row.share)}</td>
                                                <td className="text-right">
                                                    {row.change === null
                                                        ? '—'
                                                        : `${row.change > 0 ? '+' : ''}${row.change.toFixed(1)} pp`}
                                                </td>
                                            </tr>
                                            {expanded === row.key && (
                                                <tr>
                                                    <td colSpan={4}>
                                                        <dl className="my-1 flex flex-wrap gap-3 rounded bg-accent p-3">
                                                            {history.map((date, i) => (
                                                                <div key={date}>
                                                                    <dt className="text-xs">{monthName(date)}</dt>
                                                                    <dd className="m-0">
                                                                        {Number.isFinite(row.data[i])
                                                                            ? percent(row.data[i])
                                                                            : '—'}
                                                                    </dd>
                                                                </div>
                                                            ))}
                                                        </dl>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No data for this section.</p>
                        )}
                        {rows.length > 5 && (
                            <button
                                className="my-3 text-sm font-semibold underline"
                                type="button"
                                onClick={() => setShowAll(!showAll)}
                            >
                                {showAll ? 'Show top 5' : `Show all ${rows.length} rows`}
                            </button>
                        )}
                    </section>
                </>
            )}
            <details className="border-t border-primary py-3 text-sm">
                <summary className="cursor-pointer font-semibold">How we count</summary>
                <p className="mt-2">
                    We count organizations that send at least 100 AI generation or embedding events to PostHog Cloud in
                    a calendar month. Months use UTC. Each organization counts once per model, lab, or tool it reports.
                    We infer labs from model names.
                </p>
            </details>
        </div>
    )
}
