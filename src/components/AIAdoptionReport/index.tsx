import React, { useState } from 'react'
import { HedgehogChart } from '@posthog/brand/hoggies'
import { DefaultTooltip } from '@posthog/quill-charts'
import { Accordion } from 'components/UI/Accordion'
import { BarChart, LineChart, Sparkline } from 'components/UI/Chart'
import { Table } from 'components/UI/Table'
import { rowLogo } from './rowLogo'

const sections = {
    model: [
        'Models',
        'Which models are teams using?',
        'Model',
        'Share of qualifying organizations that used each model. An organization can use several models in a month, so the percentages can add up to more than 100%.',
    ],
    lab: [
        'Labs',
        'Which labs do teams use?',
        'Lab',
        'Share of qualifying organizations that used a model from each lab. An organization can use models from several labs in a month, so the percentages can add up to more than 100%.',
    ],
    provider_diversity: [
        'Provider diversity',
        'How many providers does one team use?',
        'Providers',
        'Each organization that reported a provider falls into one group. A router counts as one provider.',
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
const percent = (share: number | null | undefined) =>
    share != null && Number.isFinite(share) ? `${share.toFixed(1)}%` : '—'
const chartConfig = {
    legend: { show: true },
    yTickFormatter: (v: number) => `${v}%`,
    tooltip: { valueFormatter: percent },
}

function ReportSection({
    section,
    series,
    history,
}: {
    section: Section
    series: AdoptionSeries[]
    history: string[]
}) {
    const [showAll, setShowAll] = useState(false)
    const [expanded, setExpanded] = useState('')
    const month = history[history.length - 1]
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
        <section
            aria-labelledby={`ai-adoption-${section}`}
            className="border-t border-primary px-1 py-8 @lg:px-4 @lg:py-12"
        >
            <h2 id={`ai-adoption-${section}`} className="m-0 text-2xl @lg:text-3xl">
                {question}
            </h2>
            <p className="my-2 text-sm text-secondary">
                {description}{' '}
                {coverage != null && `Reporting coverage: ${percent(coverage)} of qualifying organizations.`}
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
                        <LineChart className="h-64" labels={dates} series={chartRows} config={chartConfig} />
                    )}
                </figure>
            )}
            {rows.length > 0 ? (
                <Table.Root
                    appearance="plain"
                    aria-label={`${sections[section][0]} in ${monthName(month)}`}
                    className="not-prose table-fixed tabular-nums"
                >
                    <Table.Header>
                        <Table.Row>
                            <Table.Head>{heading}</Table.Head>
                            {/* Keep all four columns in the grid so an expanded row spans the same width on mobile. */}
                            <Table.Head className="invisible w-0 !px-0 @md:visible @md:w-24 @md:!px-3 @2xl:w-1/5">
                                <span className="hidden @md:inline">Trend</span>
                            </Table.Head>
                            <Table.Head align="end" className="w-[5.5rem] whitespace-nowrap @md:w-24 @2xl:w-1/6">
                                Org share
                            </Table.Head>
                            <Table.Head align="end" className="w-20 whitespace-nowrap @md:w-24 @2xl:w-1/6">
                                <abbr title="Change from the previous month, in percentage points">Change</abbr>
                            </Table.Head>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {(showAll ? rows : rows.slice(0, 5)).map((row) => (
                            <React.Fragment key={row.key}>
                                <Table.Row>
                                    <Table.Head scope="row">
                                        <button
                                            type="button"
                                            className="flex max-w-full items-center gap-2 text-start hover:underline"
                                            aria-expanded={expanded === row.key}
                                            onClick={() => setExpanded(expanded === row.key ? '' : row.key)}
                                        >
                                            {rowLogo(section, row.key)}
                                            <span className="min-w-0 break-words">{row.label}</span>
                                        </button>
                                    </Table.Head>
                                    <Table.Cell className="invisible !px-0 @md:visible @md:!px-3">
                                        <Sparkline
                                            className="hidden max-w-24 @md:flex"
                                            data={row.data}
                                            height={24}
                                            labels={dates}
                                            tooltip={(point) => (
                                                <DefaultTooltip
                                                    {...point}
                                                    labelRenderer={() => row.label}
                                                    valueFormatter={percent}
                                                />
                                            )}
                                        />
                                    </Table.Cell>
                                    <Table.Cell align="end">{percent(row.share)}</Table.Cell>
                                    <Table.Cell align="end" className="whitespace-nowrap">
                                        {row.change === null
                                            ? '—'
                                            : `${row.change > 0 ? '+' : ''}${row.change.toFixed(1)} pp`}
                                    </Table.Cell>
                                </Table.Row>
                                {expanded === row.key && (
                                    <Table.Row>
                                        <Table.Cell colSpan={4}>
                                            <dl className="my-1 flex flex-wrap gap-3 rounded bg-accent p-3">
                                                {history.map((date, i) => (
                                                    <div key={date}>
                                                        <dt className="text-xs">{monthName(date)}</dt>
                                                        <dd className="m-0">{percent(row.data[i])}</dd>
                                                    </div>
                                                ))}
                                            </dl>
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </React.Fragment>
                        ))}
                    </Table.Body>
                </Table.Root>
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
    )
}

const questions = [
    {
        question: 'Which organizations are included?',
        answer: 'We count organizations that send at least 100 AI generation or embedding events to PostHog Cloud in a calendar month. Months use UTC.',
    },
    {
        question: 'How are models and labs counted?',
        answer: 'Each organization counts once per model it uses in a month. We infer the lab from the model name. If an organization uses two models from the same lab, it counts once for that lab.',
    },
    {
        question: 'What does the change column show?',
        answer: 'It shows the difference from the previous month in percentage points. A rise from 10% to 12% is a change of +2 percentage points.',
    },
]

export default function AIAdoptionReport({ series }: { series: AdoptionSeries[] }): JSX.Element {
    const months = Array.from(new Set(series.flatMap((row) => row.points.map((point) => point.month)))).sort()
    const [selected, setSelected] = useState('')
    const month = months.includes(selected) ? selected : months[months.length - 1]
    const history = months.filter((value) => value <= month)

    return (
        <article className="@container mx-auto max-w-4xl text-primary">
            <header className="flex items-center justify-between gap-3 rounded-lg border border-primary bg-gradient-to-r from-primary to-light-purple p-4 dark:to-purple-2-dark @lg:p-8">
                <div className="min-w-0">
                    <p className="m-0 font-mono text-xs">AI Observability · Monthly report</p>
                    <h1 className="my-2 text-4xl tracking-tight @lg:text-5xl">How teams use AI</h1>
                    <p className="m-0 max-w-prose">
                        Which models, labs, and tools show up in the AI events teams send to PostHog? Each team counts
                        once per model, lab, or tool, whether it sends a hundred events or a million.
                    </p>
                </div>
                <HedgehogChart aria-hidden="true" className="size-20 shrink-0 @md:size-32 @lg:size-40" />
            </header>
            {month ? (
                <>
                    <label className="my-5 flex items-center gap-2 text-sm font-semibold @lg:mx-4">
                        Report month
                        <select
                            className="rounded border border-input bg-primary py-1 pl-2 pr-10 text-primary"
                            value={month}
                            onChange={(event) => setSelected(event.target.value)}
                        >
                            {[...months].reverse().map((value) => (
                                <option key={value} value={value}>
                                    {monthName(value)}
                                </option>
                            ))}
                        </select>
                    </label>
                    {(Object.keys(sections) as Section[]).map((section) => (
                        <ReportSection key={section} section={section} series={series} history={history} />
                    ))}
                </>
            ) : (
                <p role="status" className="py-5">
                    The monthly report is not available yet.
                </p>
            )}
            <section aria-labelledby="ai-adoption-faq" className="border-t border-primary px-1 py-8 @lg:px-4 @lg:py-12">
                <h2 id="ai-adoption-faq" className="m-0 mb-4 text-2xl @lg:text-3xl">
                    Frequently asked questions
                </h2>
                <Accordion.Root>
                    {questions.map(({ question, answer }) => (
                        <Accordion.Item key={question} value={question}>
                            <Accordion.Header>
                                <Accordion.Trigger>{question}</Accordion.Trigger>
                            </Accordion.Header>
                            <Accordion.Panel>{answer}</Accordion.Panel>
                        </Accordion.Item>
                    ))}
                </Accordion.Root>
            </section>
        </article>
    )
}
