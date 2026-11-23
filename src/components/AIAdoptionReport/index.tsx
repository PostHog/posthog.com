import React, { useState } from 'react'
import { HedgehogChart } from '@posthog/brand/hoggies'
import { DefaultTooltip } from '@posthog/quill-charts'
import { Accordion } from 'components/UI/Accordion'
import { BarChart, LineChart, Sparkline } from 'components/UI/Chart'
import { Table } from 'components/UI/Table'
import { rowLogo } from './rowLogo'

const sections = {
    model: {
        question: 'Which AI models do teams use?',
        heading: 'Model',
        plural: 'models',
        caption: 'Model adoption',
        description:
            'Each percentage is the share of organizations in the report that used that model that month. An organization can use several models, so the percentages can add up to more than 100%.',
    },
    lab: {
        question: 'Who makes the models teams use?',
        heading: 'Lab',
        plural: 'labs',
        caption: 'Model adoption by lab',
        description:
            'Each percentage is the share of organizations in the report that used at least one model from that lab that month. An organization can use models from several labs, so the percentages can add up to more than 100%.',
    },
    provider_diversity: {
        question: 'How many model providers do teams use?',
        heading: 'Providers',
        plural: 'provider groups',
        caption: 'Number of providers per organization',
        description:
            'We count providers for organizations whose events named at least one that month. A routing service counts as one provider, even if a team uses it to access several models.',
    },
    framework: {
        question: 'Which frameworks and agent tools do teams use?',
        heading: 'Framework or tool',
        plural: 'frameworks and tools',
        caption: 'Framework and agent tool adoption',
        description:
            'We calculate each month’s percentages using only organizations that named a tool. An organization that named two tools counts toward both.',
    },
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
    other: 'Models we couldn’t match to a lab',
    'Other reported integrations': 'Other frameworks and tools',
    vercel: 'Vercel AI SDK',
    langchain: 'LangChain',
    'claude-code': 'Claude Code',
    'openai-agents': 'OpenAI Agents SDK',
    openclaw: 'OpenClaw',
    pi: 'Pi',
    'claude-agent-sdk': 'Claude Agent SDK',
}
const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })
const longDateFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })
const monthName = (month: string, format = dateFormat) => format.format(new Date(month + 'T00:00:00Z'))
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
    const { question, heading, plural, caption, description } = sections[section]
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
    const dates = history.map((value) => monthName(value))

    return (
        <section
            aria-labelledby={`ai-adoption-${section}`}
            className="border-t border-primary px-1 py-8 @lg:px-4 @lg:py-12"
        >
            <h2 id={`ai-adoption-${section}`} className="m-0 text-2xl @lg:text-3xl">
                {question}
            </h2>
            <p className="my-2 text-sm text-secondary">
                {coverage != null &&
                    `In ${monthName(month, longDateFormat)}, ${Number(
                        coverage.toFixed(1)
                    )}% of organizations in the report sent events that named ${
                        section === 'framework' ? 'a framework or agent tool' : 'a model provider'
                    }. `}
                {description}
            </p>
            {chartRows.length > 0 && (
                <figure className="my-4 rounded-md border border-primary p-3 @lg:p-5">
                    <figcaption className="mb-2 font-semibold">
                        {caption}{' '}
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
                    aria-label={`${caption} in ${monthName(month)}`}
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
                                Share
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
                <p>
                    No data available for {plural} in {monthName(month)}.
                </p>
            )}
            {rows.length > 5 && (
                <button
                    className="my-3 text-sm font-semibold underline"
                    type="button"
                    onClick={() => setShowAll(!showAll)}
                >
                    {showAll ? 'Show fewer' : `Show all ${rows.length} ${plural}`}
                </button>
            )}
        </section>
    )
}

const questions = [
    {
        question: 'Which months does the report cover?',
        answer: 'We use complete calendar months in UTC. Choose a month to see its rankings and the trends up to that month.',
    },
    {
        question: 'What’s the difference between a lab and a provider?',
        answer: 'A lab makes the model. A provider gives you access to it. If you use Claude through Amazon Bedrock, Anthropic is the lab and Amazon Bedrock is the provider. We identify the lab from the model name and the provider from the events.',
    },
    {
        question: 'Which models, labs, and tools appear on the line charts?',
        answer: 'Each chart starts with the top five in the selected month and shows their shares over time. Select another name in the table to see its monthly shares on the chart.',
    },
    {
        question: 'What does “pp” mean in the Change column?',
        answer: 'It stands for percentage points. If a model’s share rises from 10% in one month to 12% the next, the table shows +2.0 pp. A dash means we don’t have enough data to compare the two months.',
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
                        Each month, we look at organizations that sent at least 100 AI generation or embedding events to
                        PostHog Cloud. An organization that sends a million events counts just as much as one that sends
                        100.
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
