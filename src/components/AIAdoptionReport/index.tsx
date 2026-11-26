import React, { useState } from 'react'
import { colors } from '@posthog/brand/colors'
import { HedgehogRobot } from '@posthog/brand/hoggies'
import { Logo } from '@posthog/brand/logo'
import { IconCheck, IconLlmAnalytics } from '@posthog/icons'
import { DefaultTooltip, useChartLayout } from '@posthog/quill-charts'
import type { TooltipContext } from '@posthog/quill-charts'
import { labColor, labShades } from 'components/MCPLeaderboard/data'
import { useAppSettings } from '../../context/App'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import OSButton from 'components/OSButton'
import { InlineCode, SectionHeading } from 'components/Products/ReaderViewProduct/helpers'
import Stickers from 'components/Stickers/Index'
import { StickerAi, StickerCrown, StickerRobot, StickerServers } from 'components/Stickers/Stickers'
import { Accordion } from 'components/UI/Accordion'
import { BarChart, LineChart, Sparkline } from 'components/UI/Chart'
import { Table } from 'components/UI/Table'
import { modelLab, rowLogo } from './rowLogo'

const sections = {
    model: {
        question: 'May the best model win',
        sticker: StickerAi,
        heading: 'Model',
        plural: 'models',
        caption: 'Model adoption',
    },
    lab: {
        question: 'AI labs battle it out',
        sticker: StickerRobot,
        heading: 'Lab',
        plural: 'labs',
        caption: 'Model adoption by lab',
    },
    provider_diversity: {
        question: 'How many model providers do teams use?',
        sticker: StickerServers,
        heading: 'Providers',
        plural: 'provider groups',
        caption: 'Number of providers per organization',
    },
    framework: {
        question: 'Framework and agent tool popularity contest',
        sticker: StickerCrown,
        heading: 'Framework or tool',
        plural: 'frameworks and tools',
        caption: 'Framework and agent tool adoption',
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
const previousMonth = (month: string) =>
    new Date(Date.UTC(Number(month.slice(0, 4)), Number(month.slice(5, 7)) - 2, 1)).toISOString().slice(0, 10)
const percent = (share: number | null | undefined) =>
    share != null && Number.isFinite(share) ? `${share.toFixed(1)}%` : '—'
function percentagePointChange(current: number | null | undefined, prior: number | null | undefined): string | null {
    if (current == null || prior == null || !Number.isFinite(current) || !Number.isFinite(prior)) return null
    const change = Number((current - prior).toFixed(1))
    return `${change > 0 ? '+' : ''}${change.toFixed(1)} pp`
}

function shareWithChange(value: number, change?: string | null) {
    return change ? `${percent(value)} (${change})` : percent(value)
}

const chartConfig = {
    legend: { show: true },
    yTickFormatter: (v: number) => `${v}%`,
}
const modelChartLimit = 15
const mainLabs = new Set(['anthropic', 'openai', 'google', 'xai'])
const otherLabColors = [
    colors.purple.core,
    colors.coral.core,
    colors.lime.core,
    colors.violet.core,
    colors.tangerine.core,
]

// The monthly values belong in the tooltip. Hit-test the line between those months at the pointer's x.
function SeriesTooltip({
    point,
    stacked,
    onFocus,
    changes,
}: {
    point: TooltipContext
    stacked: boolean
    onFocus: (key: string | null) => void
    changes: Map<string, (string | null)[]>
}) {
    const { scales, labels } = useChartLayout()
    const { dataIndex, hoverPosition, position, seriesData } = point
    let focused = point.hoveredSeriesKey ?? null
    if (!stacked && hoverPosition) {
        const adjacent = dataIndex + (hoverPosition.x < position.x ? -1 : 1)
        const nextX = scales.x(labels[adjacent])
        let closest = 8 // Hit tolerance in CSS pixels.
        for (const { series, yPixel } of seriesData) {
            if (yPixel == null) continue
            let distance = Math.hypot(hoverPosition.x - position.x, hoverPosition.y - yPixel)
            if (nextX != null && nextX !== position.x && Number.isFinite(series.data[adjacent])) {
                const dx = nextX - position.x
                const dy = scales.y(series.data[adjacent]) - yPixel
                const t = Math.max(
                    0,
                    Math.min(
                        1,
                        ((hoverPosition.x - position.x) * dx + (hoverPosition.y - yPixel) * dy) / (dx * dx + dy * dy)
                    )
                )
                distance = Math.hypot(hoverPosition.x - position.x - t * dx, hoverPosition.y - yPixel - t * dy)
            }
            if (distance <= closest) {
                closest = distance
                focused = series.key
            }
        }
    }
    React.useEffect(() => {
        onFocus(focused)
        return () => onFocus(null)
    }, [focused, onFocus])
    return (
        <DefaultTooltip
            {...point}
            seriesData={focused ? seriesData.filter(({ series }) => series.key === focused) : seriesData}
            valueFormatter={(value, { series }) => shareWithChange(value, changes.get(series.key)?.[dataIndex])}
        />
    )
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
    const [focused, setFocused] = useState<string | null>(null)
    const { siteSettings } = useAppSettings()
    const theme = siteSettings.theme === 'dark' ? 'dark' : 'light'
    const { question, sticker: Sticker, heading, plural, caption } = sections[section]
    const rows = series
        .filter(
            (row) =>
                row.facet === section &&
                row.label !== 'Other models' &&
                row.label !== 'Not reported' &&
                row.points.some(({ month: date }) => date >= history[0] && date <= month)
        )
        .map((row) => {
            const values = new Map(row.points.map((point) => [point.month, point.share]))
            const share = values.get(month)
            const changes = history.map((date) =>
                percentagePointChange(values.get(date), values.get(previousMonth(date)))
            )
            return {
                key: row.label,
                label: displayNames[row.label] ?? row.label,
                share,
                changes,
                data: history.map((value) => values.get(value) ?? NaN),
            }
        })
        .sort((a, b) =>
            section === 'provider_diversity'
                ? a.label.localeCompare(b.label)
                : (b.share ?? -1) - (a.share ?? -1) || a.label.localeCompare(b.label)
        )
    const chartRows = rows.filter((row) => row.share != null).slice(0, section === 'model' ? modelChartLimit : 5)
    const expandedRow = rows.find((row) => row.key === expanded)
    if (expandedRow && !chartRows.includes(expandedRow)) chartRows.push(expandedRow)
    const vendors = chartRows.flatMap(({ key }) => {
        const lab = section === 'model' ? modelLab(key) : section === 'lab' ? key : undefined
        return lab && mainLabs.has(lab) ? [{ label: key, vendor: displayNames[lab] }] : []
    })
    const palette =
        section === 'model'
            ? labShades(vendors, theme)
            : new Map(vendors.map(({ label, vendor }) => [label, labColor(vendor, theme)]))
    let fallback = 0
    const chartSeries = chartRows.map((row) => {
        const color =
            palette.get(row.key) ??
            (section === 'model' || section === 'lab' ? otherLabColors[fallback++ % otherLabColors.length] : undefined)
        return {
            ...row,
            color: focused && focused !== row.key ? 'rgba(128, 128, 128, 0.4)' : color,
            points: history.length === 1 ? { radius: 4 } : undefined,
        }
    })
    const changes = new Map(chartRows.map((row) => [row.key, row.changes]))
    const tooltip = (point: TooltipContext) => (
        <SeriesTooltip
            point={point}
            stacked={section === 'provider_diversity'}
            onFocus={setFocused}
            changes={changes}
        />
    )
    const dates = history.map((value) => monthName(value))

    return (
        <section
            aria-labelledby={`ai-adoption-${section}`}
            className="border-t border-primary px-1 py-8 @lg:px-4 @lg:py-12"
        >
            {/* Same sticker heading as the MCP leaderboard's StickerHeading. */}
            <SectionHeading>
                <span id={`ai-adoption-${section}`} className="inline-flex items-center gap-2.5">
                    <Sticker className="size-8 shrink-0 -rotate-3" />
                    {question}
                </span>
            </SectionHeading>
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
                            series={chartSeries}
                            tooltip={tooltip}
                            config={{
                                ...chartConfig,
                                barLayout: 'stacked',
                                bars: { valueDomain: { min: 0, max: 100 } },
                            }}
                        />
                    ) : (
                        <LineChart
                            className={section === 'model' ? 'h-[28rem] @md:h-96' : 'h-64'}
                            labels={dates}
                            series={chartSeries}
                            tooltip={tooltip}
                            config={{ ...chartConfig, curve: 'linear' }}
                        />
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
                                            height={38}
                                            labels={dates}
                                            tooltip={(point) => (
                                                <DefaultTooltip
                                                    {...point}
                                                    labelRenderer={() => row.label}
                                                    valueFormatter={(value) =>
                                                        shareWithChange(value, row.changes[point.dataIndex])
                                                    }
                                                />
                                            )}
                                        />
                                    </Table.Cell>
                                    <Table.Cell align="end">{percent(row.share)}</Table.Cell>
                                    <Table.Cell align="end" className="whitespace-nowrap">
                                        {row.changes[row.changes.length - 1] ?? '—'}
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

function reportMonths(series: AdoptionSeries[]): string[] {
    const months = series.flatMap((row) => row.points.map((point) => point.month)).sort()
    const history: string[] = []
    for (
        let month = months[months.length - 1];
        month && month >= months[0] && history.length < 12;
        month = previousMonth(month)
    ) {
        history.unshift(month)
    }
    return history
}

const reportQuestions = (period: string) => [
    {
        question: 'Which months does the report cover?',
        answer: period
            ? `The charts show up to 12 complete calendar months in UTC, covering ${period}. We refresh the data when we rebuild this site.`
            : 'No monthly data is available yet.',
    },
    {
        question: 'What’s the difference between a lab and a provider?',
        answer: 'A lab makes the model. A provider gives you access to it. If you use Claude through Amazon Bedrock, Anthropic is the lab and Amazon Bedrock is the provider. We identify the lab from the model name and the provider from the events.',
    },
    {
        question: 'Which models, labs, and tools appear on the line charts?',
        answer: `The model chart follows the ${modelChartLimit} models with the highest shares in the latest month. The lab and tool charts each follow the top five. Select another name in a table to add its line.`,
    },
    {
        question: 'What does “pp” mean?',
        answer: 'It stands for percentage points. If a model’s share rises from 10% in one month to 12% the next, the change is +2.0 pp. A dash means we don’t have enough data to compare the two months.',
    },
]

// A house ad for AI observability, with the same card as the MCP leaderboard's MCPAnalyticsAd.
function AIObservabilityAd() {
    const features = [
        'Users, traces, generations, cost, and latency, all on one dashboard',
        'Cost per customer, per model, and in total',
        'Online evals that score live traffic with LLM judges or code',
        'Offline evals in CI, so you catch regressions before you ship',
    ]
    return (
        <aside aria-label="AI observability" className="not-prose mb-8">
            <div className="relative border border-primary rounded bg-accent p-5 @2xl/reader-content:p-6 @2xl/reader-content:grid @2xl/reader-content:grid-cols-[minmax(0,1fr)_auto] @2xl/reader-content:gap-2">
                <span className="block w-fit ml-auto mb-3 @2xl/reader-content:mb-0 @2xl/reader-content:absolute @2xl/reader-content:top-3 @2xl/reader-content:right-3 text-[11px] font-semibold uppercase tracking-wide text-muted border border-primary rounded px-1.5 py-px">
                    Yes, sorry, this is an ad
                </span>
                <div className="min-w-0">
                    <div className="flex items-center gap-2 text-blue mb-2">
                        <IconLlmAnalytics className="size-6" />
                        <span className="font-bold">AI Observability</span>
                    </div>
                    <h2 className="text-2xl font-bold text-primary m-0 mb-4">
                        Have an agent of your own? See what it really does
                    </h2>
                    {/* Two independent columns, so an item never stretches to match the row beside it. */}
                    <ul className="list-none m-0 p-0 mb-5 gap-x-6 text-sm text-primary @2xl/reader-content:columns-2">
                        {features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2 mb-1.5 break-inside-avoid">
                                <IconCheck className="size-4 shrink-0 text-green mt-0.5" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                    <p className="text-sm text-secondary m-0 mb-4">
                        Run this command to install: <InlineCode>npx @posthog/wizard ai-observability</InlineCode>
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <OSButton asLink to="https://app.posthog.com/signup" variant="primary" size="md">
                            Get started
                        </OSButton>
                        <OSButton asLink to="/docs/ai-observability/start-here" variant="secondary" size="md">
                            Read the docs
                        </OSButton>
                    </div>
                </div>
                <HedgehogRobot
                    title="A robot hedgehog"
                    className="hidden @2xl/reader-content:block justify-self-end self-center pt-8 w-44 @4xl/reader-content:w-52"
                />
            </div>
        </aside>
    )
}

export default function AIAdoptionReport({ series }: { series: AdoptionSeries[] }): JSX.Element {
    const history = reportMonths(series)
    const month = history[history.length - 1]
    const period =
        history.length > 1
            ? `${monthName(history[0], longDateFormat)} through ${monthName(month, longDateFormat)}`
            : month && monthName(month, longDateFormat)

    return (
        <article className="@container mx-auto max-w-4xl text-primary">
            {/* Same hero as the MCP leaderboard. */}
            <header className="not-prose">
                <h1 className="text-4xl @3xl/reader-content:text-5xl font-bold !leading-[1.12] !m-0 tracking-tight">
                    <Logo
                        layout="logomark"
                        variant="gradient"
                        className="inline-block h-[0.8em] w-auto mr-3 align-baseline dark:hidden"
                    />
                    <Logo
                        layout="logomark"
                        variant="mono"
                        className="hidden h-[0.8em] w-auto mr-3 align-baseline dark:inline-block"
                    />
                    PostHog's <span className="whitespace-nowrap">AI Observability</span>{' '}
                    <span className="bg-red/10 dark:bg-yellow/20 text-red dark:text-yellow rounded-md px-1 whitespace-nowrap">
                        Leaderboard
                    </span>
                    <Stickers
                        name="StickerTrophy"
                        label="1"
                        className="inline-block size-12 ml-2 align-middle rotate-6 [&_text]:-translate-x-[1.5px]"
                    />
                </h1>
                <p className="text-lg text-secondary leading-relaxed mt-4 mb-0 max-w-prose">
                    We popped the hood on our AI observability metrics so you can see{' '}
                    <RoughAnnotation
                        type="highlight"
                        color="rgba(247, 165, 1, 0.15)"
                        strokeWidth={1}
                        padding={2}
                        multiline
                    >
                        agents battling it out
                    </RoughAnnotation>
                    .
                </p>
                <p className="text-lg text-secondary leading-relaxed mt-4 mb-0 max-w-prose">
                    This page looks at organizations that sent at least 100 AI generation or embedding events to PostHog
                    Cloud in a given month. An organization that sends a million events counts just as much as one that
                    sends 100.
                </p>
            </header>
            {month ? (
                <>
                    <p className="my-5 text-sm font-semibold">Latest rankings · {monthName(month, longDateFormat)}</p>
                    {(Object.keys(sections) as Section[]).map((section) => (
                        <ReportSection key={section} section={section} series={series} history={history} />
                    ))}
                </>
            ) : (
                <p role="status" className="py-5">
                    The monthly report is not available yet.
                </p>
            )}
            <AIObservabilityAd />
            <section aria-labelledby="ai-adoption-faq" className="border-t border-primary px-1 py-8 @lg:px-4 @lg:py-12">
                <h2 id="ai-adoption-faq" className="m-0 mb-4 text-2xl @lg:text-3xl">
                    Frequently asked questions
                </h2>
                <Accordion.Root>
                    {reportQuestions(period).map(({ question, answer }) => (
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
