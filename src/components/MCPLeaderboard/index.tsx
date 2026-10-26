import React, { memo, useEffect, useMemo, useState } from 'react'
import { IconArrowUpRight, IconCheck, IconPlug } from '@posthog/icons'
import { Logo } from '@posthog/brand/logo'
import { HedgehogHotPopcorn } from '@posthog/brand/hoggies'
import { useAppActions, useAppSettings } from '../../context/App'
import { useWindow } from '../../context/Window'
import SEO from 'components/seo'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import ReaderView from 'components/ReaderView'
import MCPInstallCTA from 'components/MCPInstallCTA'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import useProduct from 'hooks/useProduct'
import { CARD_H3, InlineCode, SectionHeading } from 'components/Products/ReaderViewProduct/helpers'
import { LineChart, ShareBars, SplitBar } from './charts'
import BrandLogo from './BrandLogo'
import CampfireHog from './CampfireHog'
import { CATEGORIES } from './categories'
import {
    StickerAi,
    StickerBulb,
    StickerCloudCross,
    StickerCrown,
    StickerMicroscope,
    StickerRobot,
    StickerTerminal,
    StickerTombstone,
} from 'components/Stickers/Stickers'
import Stickers from 'components/Stickers/Index'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import {
    LeaderboardRow,
    Metric,
    Series,
    Share,
    Theme,
    clientColor,
    clientMaker,
    dataColor,
    delta,
    displayLabel,
    errorColor,
    errorRampColors,
    formatDay,
    formatPct,
    formatWeek,
    getPeriods,
    groupedSeries,
    growthSeries,
    labColor,
    labShades,
    modelCoverage,
    modelVendor,
    rampColors,
    rankByAverage,
    topSeries,
    totalSeries,
    vendorColor,
    weekShares,
} from './data'

const VENDORS = ['Anthropic', 'OpenAI', 'xAI', 'Google', 'Open weights', 'Cursor', 'Other']
const TOP_MODELS = 10
const LIST_LENGTH = 12

// Every chart covers at most this many days, so they all share one window.
const MAX_DAYS = 60

// Changes from the week before hide when the share of calls with a known model moves by this many
// points or more. Then a change says more about which agents started reporting a model than about
// which models gained.
const MAX_COVERAGE_SHIFT = 5

const metricLabel: Record<Metric, string> = {
    calls_pct: 'Tool calls',
    users_pct: 'Users',
}

function Card({
    title,
    children,
    className = '',
}: {
    title?: React.ReactNode
    children: React.ReactNode
    className?: string
}) {
    return (
        <div className={`border border-primary rounded p-4 bg-primary ${className}`}>
            {title && <h3 className={`${CARD_H3} mb-3`}>{title}</h3>}
            {children}
        </div>
    )
}

// A section heading with a sticker in front, like the sections on /desktop.
function StickerHeading({
    sticker: Sticker,
    lede,
    children,
}: {
    sticker: React.ComponentType<{ className?: string }>
    lede?: React.ReactNode
    children: React.ReactNode
}) {
    return (
        <SectionHeading lede={lede} className="[&>p]:!mb-4">
            <span className="inline-flex items-center gap-2.5">
                <Sticker className="size-8 shrink-0 -rotate-3" />
                {children}
            </span>
        </SectionHeading>
    )
}

function Note({ children }: { children: React.ReactNode }) {
    return <p className="text-xs text-muted leading-relaxed m-0 mt-3">{children}</p>
}

function MetricToggle({ metric, onChange }: { metric: Metric; onChange: (metric: Metric) => void }) {
    return (
        <ToggleGroup
            title="Metric"
            hideTitle
            size="sm"
            className="shrink-0"
            value={metric}
            onValueChange={(value) => value && onChange(value as Metric)}
            options={(Object.keys(metricLabel) as Metric[]).map((option) => ({
                label: <span className="whitespace-nowrap">{metricLabel[option]}</span>,
                value: option,
            }))}
        />
    )
}

// Adds each share's change from the same list a week earlier. A label that wasn't in last week's
// list gets null, which shows as "new". Without last week's list, shares get no change at all.
const withChanges = (shares: Share[], previous: Share[]): Share[] =>
    previous.length === 0
        ? shares
        : shares.map((share) => {
              const before = previous.find((item) => item.label === share.label)
              return { ...share, change: before ? share.value - before.value : null }
          })

const formatChange = (item: Share): string | null => {
    if (item.change === undefined) return null
    if (item.change === null) return 'new'
    if (Math.abs(item.change) < 0.05) return 'no change'
    return `${item.change > 0 ? '▲' : '▼'} ${Math.abs(item.change).toFixed(1)} pts`
}

function Scoreboard({
    rows,
    week,
    byLab,
    metric,
    showChange,
    theme,
}: {
    rows: LeaderboardRow[]
    week: string
    byLab: Map<string, number[]>
    metric: Metric
    showChange: boolean
    theme: Theme
}) {
    const users = weekShares(rows, 'model_vendor', week, 'users_pct', { dropUnknown: true })
    const cards = VENDORS.filter((vendor) => vendor !== 'Other')
        .map((vendor) => {
            const calls = byLab.get(vendor) ?? []
            return {
                vendor,
                value:
                    metric === 'calls_pct'
                        ? calls[calls.length - 1] ?? 0
                        : users.find((share) => share.label === vendor)?.value ?? 0,
                change: metric === 'calls_pct' && showChange ? delta(calls) : null,
            }
        })
        .sort((a, b) => b.value - a.value)
        .slice(0, 3)
    return (
        <div className="grid grid-cols-1 @xl/reader-content:grid-cols-3 gap-3">
            {cards.map((card, i) => (
                <div
                    key={card.vendor}
                    className="relative border border-primary rounded p-4 bg-primary"
                    style={{ borderTop: `4px solid ${labColor(card.vendor, theme)}` }}
                >
                    {i === 0 && <StickerCrown className="absolute -top-6 -right-3 size-10 rotate-12" />}
                    <div className="flex items-baseline justify-between">
                        <span className="flex items-center gap-1.5 text-sm font-semibold text-secondary">
                            <BrandLogo name={card.vendor} className="size-4 text-primary" /> {card.vendor}
                        </span>
                        {card.change !== null && (
                            <span className="text-xs tabular-nums text-muted">
                                {card.change >= 0 ? '▲' : '▼'} {Math.abs(card.change).toFixed(1)} pts vs. last week
                            </span>
                        )}
                    </div>
                    <div className="text-4xl font-bold tabular-nums text-primary mt-1">{formatPct(card.value)}</div>
                </div>
            ))}
        </div>
    )
}

function Header({
    rows,
    weeks,
    byLab,
    metric,
    setMetric,
    coverage,
    coverageShift,
    fetchedAt,
    theme,
}: {
    rows: LeaderboardRow[]
    weeks: string[]
    byLab: Map<string, number[]>
    metric: Metric
    setMetric: (metric: Metric) => void
    coverage: number
    coverageShift: number
    fetchedAt: string | null
    theme: Theme
}) {
    const week = weeks[weeks.length - 1]
    const showChange = coverageShift < MAX_COVERAGE_SHIFT
    return (
        <section id="overview" className="not-prose flex flex-col gap-6">
            <header>
                <h1 className="text-4xl @3xl/reader-content:text-5xl font-bold !leading-[1.12] !m-0 tracking-tight">
                    {/* The color mark, and a single-color one in dark mode, like the home page's AI demo. */}
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
                    PostHog MCP{' '}
                    <span className="bg-red/10 dark:bg-yellow/20 text-red dark:text-yellow rounded-md px-1 whitespace-nowrap">
                        Leaderboard
                    </span>
                    <Stickers
                        name="StickerTrophy"
                        label="1"
                        className="inline-block size-12 ml-2 align-middle rotate-6"
                    />
                </h1>
                <p className="text-lg text-secondary leading-relaxed mt-4 mb-0 max-w-prose">
                    Who's calling{' '}
                    <Link to="/mcp" className="font-semibold underline">
                        PostHog's MCP server
                    </Link>{' '}
                    the most? We're {/* Same hand-drawn highlight as the home page hero. */}
                    <RoughAnnotation
                        type="highlight"
                        color="rgba(247, 165, 1, 0.15)"
                        strokeWidth={1}
                        padding={2}
                        multiline
                    >
                        keeping score every day
                    </RoughAnnotation>{' '}
                    for our <s>internal purposes</s> and your viewing pleasure.
                </p>
            </header>
            <div className="flex flex-wrap items-end justify-between gap-2">
                <div>
                    <h2 className="text-lg font-bold m-0">
                        Last week* <span className="font-normal text-secondary">{formatWeek(week)}</span>
                    </h2>
                    {fetchedAt && <p className="text-xs text-muted m-0">Updated {formatDay(fetchedAt.slice(0, 10))}</p>}
                </div>
                <MetricToggle metric={metric} onChange={setMetric} />
            </div>
            <Scoreboard rows={rows} week={week} byLab={byLab} metric={metric} showChange={showChange} theme={theme} />
            <p className="text-xs text-muted leading-relaxed m-0 -mt-3">
                {metric === 'calls_pct'
                    ? `Share of last week's tool calls, out of the ${formatPct(coverage, 0)} where we know the model.`
                    : "Share of last week's users who made at least one call with a model from that lab. People switch models, so this doesn't add up to 100%."}
                <br />
                {metric === 'calls_pct' &&
                    !showChange &&
                    `We hid the change from the week before: the share of calls with a known model moved by ${Math.round(
                        coverageShift
                    )} points, so the change would mostly show which agents started telling us. `}
                * Agents name their own model, except Codex, which sends it in its request metadata. We can't check it,
                and models sometimes get their own version wrong.
            </p>
            <Card title={`Growth since ${formatDay(weeks[0])}`}>
                <LineChart
                    periods={weeks}
                    theme={theme}
                    height={200}
                    format="multiple"
                    series={[
                        {
                            label: 'Weekly tool calls',
                            color: dataColor(theme, -0.12),
                            data: growthSeries(rows, weeks, 'calls_index'),
                        },
                        {
                            label: 'Weekly users',
                            color: dataColor(theme, 0.12),
                            data: growthSeries(rows, weeks, 'users_index'),
                        },
                    ]}
                />
                <Note>Each week as a multiple of the baseline week, June 22, 2026.</Note>
            </Card>
        </section>
    )
}

// Daily calls share per model: the top models get their own series, and the rest of each lab's
// models fold into one series per lab. Series are ordered by lab so a lab's shades stack together.
function modelRaceSeries(rows: LeaderboardRow[], days: string[], theme: Theme): Series[] {
    const byModel = groupedSeries(rows, 'model_daily', days)
    const ranked = rankByAverage(byModel)
    const top = new Set(ranked.slice(0, TOP_MODELS))
    const groups = new Map<string, { vendor: string; data: number[] }>()
    byModel.forEach((data, label) => {
        const vendor = label === 'Other' ? 'Other' : modelVendor(label)
        const group = top.has(label) ? label : vendor === 'Other' ? 'Other models' : `Other ${vendor} models`
        const existing = groups.get(group)
        groups.set(group, {
            vendor,
            data: existing ? existing.data.map((value, i) => value + data[i]) : [...data],
        })
    })
    const ordered = Array.from(groups.entries()).sort(
        ([a, ga], [b, gb]) =>
            VENDORS.indexOf(ga.vendor) - VENDORS.indexOf(gb.vendor) ||
            Number(a.startsWith('Other')) - Number(b.startsWith('Other')) ||
            ranked.indexOf(a) - ranked.indexOf(b)
    )
    const colors = labShades(
        ordered.map(([label, group]) => ({ label, vendor: group.vendor })),
        theme
    )
    return ordered.map(([label, group]) => ({ label, color: colors.get(label) as string, data: group.data }))
}

function ModelRace({
    rows,
    days,
    week,
    previousWeek,
    theme,
    metric,
    showChange,
}: {
    rows: LeaderboardRow[]
    days: string[]
    week: string
    previousWeek: string
    theme: Theme
    metric: Metric
    showChange: boolean
}) {
    const series = modelRaceSeries(rows, days, theme)
    const colorOf = (model: string) =>
        series.find((s) => s.label === model)?.color ?? vendorColor(modelVendor(model), theme)
    const options = { dropUnknown: true, dropOther: true }
    const models = withChanges(
        weekShares(rows, 'model', week, metric, { ...options, limit: 15 }),
        showChange ? weekShares(rows, 'model', previousWeek, metric, options) : []
    ).map((share) => ({ ...share, color: colorOf(share.label) }))

    return (
        <section id="models" className="not-prose">
            <StickerHeading
                sticker={StickerAi}
                lede={'Which models agents run when they call our tools. Think of it as a popularity contest.'}
            >
                May the best model win
            </StickerHeading>
            <div className="grid grid-cols-1 @3xl/reader-content:grid-cols-5 gap-3">
                <Card title="Daily share of tool calls by model" className="@3xl/reader-content:col-span-3">
                    <LineChart periods={days} series={series} theme={theme} height={420} stacked />
                    <Note>
                        Top 10 models with the most calls get their own band, and each lab's other models share one.
                        Calls without a known model are left out.
                    </Note>
                </Card>
                <Card title="Top models last week" className="@3xl/reader-content:col-span-2">
                    <ShareBars
                        items={models}
                        icon={(item) => <BrandLogo name={modelVendor(item.label)} />}
                        detail={formatChange}
                    />
                    <Note>
                        {metric === 'calls_pct'
                            ? "Share of last week's calls with a known model."
                            : "Share of last week's users who called with the model at least once."}
                        {showChange && ' Changes are against the week before.'}
                    </Note>
                </Card>
            </div>
        </section>
    )
}

function ClientRace({
    rows,
    days,
    week,
    previousWeek,
    theme,
    metric,
}: {
    rows: LeaderboardRow[]
    days: string[]
    week: string
    previousWeek: string
    theme: Theme
    metric: Metric
}) {
    const series = topSeries(groupedSeries(rows, 'model_vendor_daily', days), 8, (label) => labColor(label, theme))
    const options = { dropUnknown: true, dropOther: true }
    // "Custom code" is scripts and SDKs that only name their HTTP library, so it isn't an app to rank.
    // The note gives its share, and the share of "Other", instead.
    const listed = (period: string) =>
        weekShares(rows, 'client', period, metric, options).filter((share) => share.label !== 'Custom code')
    const clients = withChanges(listed(week).slice(0, 15), listed(previousWeek)).map((share) => ({
        ...share,
        color: clientColor(share.label, theme),
    }))
    const callsShare = (label: string) =>
        weekShares(rows, 'client', week, 'calls_pct', { dropUnknown: true }).find((share) => share.label === label)
            ?.value

    return (
        <section id="clients" className="not-prose">
            <StickerHeading sticker={StickerRobot}>AI players battle it out</StickerHeading>
            <div className="grid grid-cols-1 @3xl/reader-content:grid-cols-5 gap-3">
                <Card title="Daily share of tool calls by AI lab" className="@3xl/reader-content:col-span-3">
                    <LineChart periods={days} series={series} theme={theme} height={420} stacked />
                    <Note>The lab behind each call's model. Calls without a model are left out.</Note>
                </Card>
                <Card title="Top harnesses last week" className="@3xl/reader-content:col-span-2">
                    <ShareBars
                        items={clients}
                        icon={(item) => <BrandLogo name={item.label} fallback={clientMaker(item.label)} />}
                        labelOf={(item) => displayLabel('client', item.label)}
                        detail={formatChange}
                    />
                    <Note>
                        The app the agent runs in, colored by who makes it. Not listed: custom code (
                        {formatPct(callsShare('Custom code'))} of calls), meaning scripts and SDKs that only tell us
                        their HTTP library, like Python's httpx, and apps with fewer than 25 users each (
                        {formatPct(callsShare('Other'))}). Our own CLI isn't counted at all.
                    </Note>
                </Card>
            </div>
        </section>
    )
}

const HOOD_FACETS: { facet: string; title: string; note: React.ReactNode }[] = [
    {
        facet: 'auth_method',
        title: 'How agents sign in',
        note: (
            <>
                OAuth means the user signed in through the browser when they added the server. <br />A personal API key
                means they made a key in PostHog and pasted it into their config.
            </>
        ),
    },
    {
        facet: 'model_source',
        title: 'How we know the model',
        note: (
            <>
                Our server adds an <InlineCode>llm_model</InlineCode> argument to every tool, and "Agent said so" means
                the agent filled it in. "Client metadata" means the app sent the model with the request. "Not reported"
                means neither, so we don't know the model.
            </>
        ),
    },
]

const UnderTheHood = memo(function UnderTheHood({
    rows,
    week,
    days,
    theme,
}: {
    rows: LeaderboardRow[]
    week: string
    days: string[]
    theme: Theme
}) {
    // Newest spec first, so the newest version is always the darkest shade.
    const protocolOrdered = topSeries(groupedSeries(rows, 'protocol_version_daily', days), 5, () => '').sort((a, b) =>
        a.label === 'Other' ? 1 : b.label === 'Other' ? -1 : b.label.localeCompare(a.label)
    )
    const protocolColors = rampColors(
        protocolOrdered.map((s) => s.label),
        theme
    )
    const protocolSeries = protocolOrdered.map((s) => ({ ...s, color: protocolColors.get(s.label) as string }))
    return (
        <section id="protocol" className="not-prose">
            <StickerHeading sticker={StickerTombstone}>The rise and fall of MCP spec versions</StickerHeading>
            <div className="flex flex-col gap-3">
                <Card title="MCP spec version, daily share of tool calls">
                    <LineChart periods={days} series={protocolSeries} theme={theme} height={260} stacked />
                    <Note>
                        The revision of the MCP spec the client and our server agreed on when they connected. A client
                        moves to a newer one when it updates, so old versions fade out slowly.
                    </Note>
                </Card>
                <div className="grid grid-cols-1 @2xl/reader-content:grid-cols-2 gap-3">
                    {HOOD_FACETS.map(({ facet, title, note }) => {
                        const shares = weekShares(rows, facet, week, 'calls_pct').map((share) => ({
                            ...share,
                            label: displayLabel(facet, share.label),
                        }))
                        // Unknown labels stay, like in the bar. One color map covers every label in the
                        // bar and the chart, so a label has the same color in both.
                        const byLabel = groupedSeries(
                            rows,
                            `${facet}_daily`,
                            days,
                            (label) => displayLabel(facet, label),
                            false
                        )
                        const colors = rampColors(
                            [
                                ...shares.map((share) => share.label),
                                ...topSeries(byLabel, 5, () => '').map((s) => s.label),
                            ],
                            theme
                        )
                        const items = shares.map((share) => ({ ...share, color: colors.get(share.label) }))
                        const series = topSeries(byLabel, 5, (label) => colors.get(label) as string)
                        return (
                            <Card key={facet} title={title}>
                                <SplitBar items={items} />
                                <div className="mt-3">
                                    <LineChart
                                        periods={days}
                                        series={series}
                                        theme={theme}
                                        height={140}
                                        stacked
                                        legend={false}
                                    />
                                </div>
                                <Note>{note}</Note>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
})

function WhatAgentsDo({
    rows,
    week,
    metric,
    theme,
}: {
    rows: LeaderboardRow[]
    week: string
    metric: Metric
    theme: Theme
}) {
    const named = (facet: string, by: Metric) =>
        weekShares(rows, facet, week, by, { dropOther: true, limit: LIST_LENGTH }).map((share) => ({
            ...share,
            color: dataColor(theme),
        }))
    const categories = named('tool_category', metric)
    const tools = named('tool', 'users_pct')
    const products = useProduct() as {
        handle: string
        Icon?: React.ComponentType<{ className?: string }>
        color?: string
    }[]
    // A category's icon is its product's icon and color, or its own icon and color.
    const categoryIcon = (category: string) => {
        const meta = CATEGORIES[category]
        const product = meta?.product ? products.find((p) => p.handle === meta.product) : undefined
        const Icon = product?.Icon ?? meta?.Icon
        return Icon ? <Icon className={`size-4 text-${product?.color ?? meta?.color}`} /> : null
    }
    return (
        <section id="tools" className="not-prose">
            <StickerHeading sticker={StickerTerminal}>What agents are up to</StickerHeading>
            <div className="grid grid-cols-1 @2xl/reader-content:grid-cols-2 gap-3">
                <Card title="Tool categories">
                    <ShareBars
                        items={categories}
                        icon={(item) => categoryIcon(item.label)}
                        href={(item) => CATEGORIES[item.label]?.docs}
                        labelOf={(item) => displayLabel('tool_category', item.label)}
                    />
                    <Note>
                        {metric === 'calls_pct'
                            ? "Share of last week's tool calls, by the PostHog product the tool belongs to."
                            : "Share of last week's users who called at least one tool in the category."}
                    </Note>
                </Card>
                <Card
                    title={
                        <span className="flex items-center justify-between gap-2">
                            Most popular tools
                            <Link
                                to="/docs/model-context-protocol/tools"
                                state={{ newWindow: true }}
                                aria-label="All PostHog MCP tools"
                                className="text-secondary hover:text-primary"
                            >
                                <IconArrowUpRight className="size-4" />
                            </Link>
                        </span>
                    }
                >
                    <ShareBars items={tools} labelClassName="font-mono text-[0.92em]" />
                    <Note>
                        Share of last week's users who called the tool at least once. Agents call lots of tools, so this
                        doesn't add up to 100%.
                    </Note>
                </Card>
            </div>
        </section>
    )
}

const Intent = memo(function Intent({ rows, week }: { rows: LeaderboardRow[]; week: string }) {
    const withIntent = weekShares(rows, 'intent_source', week, 'calls_pct')
        .filter((share) => share.label !== 'None')
        .reduce((sum, share) => sum + share.value, 0)
    return (
        <section id="intent" className="not-prose">
            <StickerHeading sticker={StickerBulb}>
                Agents tell us 'why' {formatPct(withIntent, 0)} of the time
            </StickerHeading>
            <div className="grid grid-cols-1 @3xl/reader-content:grid-cols-2 gap-3">
                <Card title="How intent works">
                    <ol className="m-0 p-0 list-none flex flex-col gap-2 text-sm text-secondary leading-relaxed">
                        <li>
                            <strong className="text-primary">1.</strong> PostHog's MCP analytics adds a{' '}
                            <InlineCode>context</InlineCode> argument to every tool's schema: "Why are you calling this
                            tool? Briefly describe the user's goal."
                        </li>
                        <li>
                            <strong className="text-primary">2.</strong> The agent fills it in on each call. The SDK
                            strips it before your handler runs, so your tools never see it.
                        </li>
                        <li>
                            <strong className="text-primary">3.</strong> PostHog stores it as{' '}
                            <InlineCode>$mcp_intent</InlineCode> and groups similar intents into themes, so you see the
                            jobs people bring to your server and which ones fail.
                        </li>
                    </ol>
                </Card>
                <Card title="What they look like">
                    <div className="rounded border border-primary bg-accent p-3 font-mono text-sm text-primary leading-relaxed">
                        <span className="text-muted">$mcp_intent: </span>"Comparing signup conversion before and after
                        Tuesday's pricing change"
                    </div>
                    <Note>
                        If an agent skips the argument, the server can derive an intent from the tool and its arguments
                        instead.
                    </Note>
                </Card>
            </div>
        </section>
    )
})

// What each failure type means, for the types big enough to show up in the split bar.
const ERROR_TYPES: Record<string, string> = {
    validation:
        "Our server rejected the call before running it: a missing parameter, a wrong type, or a value the tool doesn't take.",
    internal: "The tool ran and something broke. That's either our bug or a query that couldn't run.",
    api_4xx: "The PostHog API turned the request down, for example because the thing it asked for doesn't exist.",
    permission: "The user's key or role doesn't allow it.",
    api_5xx: 'The PostHog API had an error of its own.',
}

const Reliability = memo(function Reliability({
    rows,
    week,
    days,
    theme,
}: {
    rows: LeaderboardRow[]
    week: string
    days: string[]
    theme: Theme
}) {
    const errorRate = totalSeries(rows, days, 'error_rate_pct')
    const p95 = totalSeries(rows, days, 'p95_ms')
    const p50 = totalSeries(rows, days, 'p50_ms')
    const errorShares = weekShares(rows, 'error_type', week, 'calls_pct')
    const errorColors = errorRampColors(
        errorShares.map((share) => share.label),
        theme
    )
    const errorTypes = errorShares.map((share) => ({
        ...share,
        label: displayLabel('error_type', share.label),
        color: errorColors.get(share.label),
    }))
    // `model_validation` has the same rows as `model`, except that its error rate only counts calls
    // rejected for bad arguments. The model's own row has the rate for every failure.
    const allErrors = new Map(
        weekShares(rows, 'model', week, 'calls_pct').map((share) => [share.label, share.errorRate])
    )
    const badArguments = weekShares(rows, 'model_validation', week, 'calls_pct', {
        dropUnknown: true,
        dropOther: true,
        limit: 10,
    })
        .map((share) => ({ ...share, value: share.errorRate ?? 0, color: errorColor(theme) }))
        .sort((a, b) => b.value - a.value)
    return (
        <section id="reliability" className="not-prose">
            <StickerHeading sticker={StickerCloudCross}>Reliability</StickerHeading>
            <div className="grid grid-cols-1 @2xl/reader-content:grid-cols-2 gap-3">
                <Card title="Error rate">
                    <LineChart
                        periods={days}
                        theme={theme}
                        height={220}
                        format="rate"
                        series={[{ label: 'Error rate', color: errorColor(theme, -0.08), data: errorRate }]}
                    />
                    <Note>Share of each day's tool calls that came back with an error.</Note>
                    <h4 className="text-sm font-bold text-primary mt-4 mb-1.5">Why calls failed last week</h4>
                    <SplitBar items={errorTypes} />
                    <dl className="m-0 mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs leading-relaxed">
                        {errorShares
                            .filter((share) => share.value >= 1 && ERROR_TYPES[share.label])
                            .map((share) => (
                                <React.Fragment key={share.label}>
                                    <dt className="font-semibold text-primary">
                                        {displayLabel('error_type', share.label)}
                                    </dt>
                                    <dd className="m-0 text-secondary">{ERROR_TYPES[share.label]}</dd>
                                </React.Fragment>
                            ))}
                    </dl>
                </Card>
                <Card title="How long a tool call takes">
                    <LineChart
                        periods={days}
                        theme={theme}
                        height={300}
                        format="seconds"
                        series={[
                            { label: 'p50', color: dataColor(theme, -0.12), data: p50 },
                            { label: 'p95', color: dataColor(theme, 0.12), data: p95 },
                        ]}
                    />
                    <Note>
                        From when our server gets the call to when it sends the result back, which is mostly PostHog
                        running a query. It doesn't include the model's thinking time or the network.
                    </Note>
                </Card>
                {badArguments.length > 0 && (
                    <Card title="Bad arguments by model, last week" className="@2xl/reader-content:col-span-2">
                        <ShareBars
                            items={badArguments}
                            icon={(item) => <BrandLogo name={modelVendor(item.label)} />}
                            detail={(item) => `all errors ${formatPct(allErrors.get(item.label))}`}
                        />
                        <Note>
                            Share of each model's calls that our server rejected because the arguments didn't match the
                            tool's schema, for the ten models with the most calls. This indicates how well a model can
                            follow the MCP protocol: tool discovery, and argument validation.
                        </Note>
                    </Card>
                )}
            </div>
        </section>
    )
})

const STEPS: React.ReactNode[] = [
    <>
        Our MCP server runs{' '}
        <Link to="/docs/mcp-analytics" className="font-semibold underline">
            MCP analytics
        </Link>{' '}
        on itself. Every tool call lands in PostHog as a <InlineCode>$mcp_tool_call</InlineCode> event.
    </>,
    <>
        Two HogQL queries turn those events into shares, one by week and one by day. Any label with fewer than 25 users
        in a period folds into "Other".
    </>,
    <>
        Each query is a PostHog{' '}
        <Link to="/docs/endpoints" className="font-semibold underline">
            endpoint
        </Link>{' '}
        that refreshes daily.
    </>,
    <>When posthog.com builds, Gatsby calls both endpoints and bakes the results into this page.</>,
]

const HowItWorks = memo(function HowItWorks({ fetchedAt }: { fetchedAt: string | null }) {
    return (
        <section id="how-it-works" className="not-prose">
            <StickerHeading sticker={StickerMicroscope}>How this page works</StickerHeading>
            <div className="grid grid-cols-1 @2xl/reader-content:grid-cols-2 @4xl/reader-content:grid-cols-4 gap-3">
                {STEPS.map((step, i) => (
                    <Card key={i}>
                        <span className="inline-flex items-center justify-center size-6 rounded-full bg-accent border border-primary text-xs font-bold text-primary mb-2">
                            {i + 1}
                        </span>
                        <p className="text-sm text-secondary leading-relaxed m-0">{step}</p>
                    </Card>
                ))}
            </div>
            {fetchedAt && (
                <p className="text-xs text-muted mt-4 mb-0">Data fetched {new Date(fetchedAt).toUTCString()}.</p>
            )}
        </section>
    )
})

// A house ad for MCP analytics: the product this page is built with.
function MCPAnalyticsAd() {
    const features = [
        'Clients and models your users bring',
        'Intents, grouped into clusters',
        'Failing tools, with errors and sessions',
        "Capabilities agents asked for that you don't have",
    ]
    return (
        <aside aria-label="MCP analytics" className="not-prose">
            <div className="relative border border-primary rounded bg-accent p-5 @2xl/reader-content:p-6 @2xl/reader-content:grid @2xl/reader-content:grid-cols-[minmax(0,1fr)_auto] @2xl/reader-content:gap-2">
                <span className="block w-fit ml-auto mb-3 @2xl/reader-content:mb-0 @2xl/reader-content:absolute @2xl/reader-content:top-3 @2xl/reader-content:right-3 text-[11px] font-semibold uppercase tracking-wide text-muted border border-primary rounded px-1.5 py-px">
                    Yeah, sorry, this is an ad
                </span>
                <div className="min-w-0">
                    <div className="flex items-center gap-2 text-blue mb-2">
                        <IconPlug className="size-6" />
                        <span className="font-bold">MCP analytics</span>
                    </div>
                    <h2 className="text-2xl font-bold text-primary m-0 mb-4">Run an MCP server? See your own stats</h2>
                    <ul className="list-none m-0 p-0 mb-5 grid grid-cols-1 @2xl/reader-content:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-primary">
                        {features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2">
                                <IconCheck className="size-4 shrink-0 text-green mt-0.5" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                    <p className="text-sm text-secondary m-0 mb-4">
                        Run this in your MCP server's project:{' '}
                        <InlineCode>npx -y @posthog/wizard@latest mcp-analytics</InlineCode>
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <OSButton asLink to="/docs/mcp-analytics/start-here" variant="primary" size="md">
                            Get started
                        </OSButton>
                        <OSButton asLink to="/docs/mcp-analytics" variant="secondary" size="md">
                            Read the docs
                        </OSButton>
                    </div>
                </div>
                <HedgehogHotPopcorn
                    title="A hedgehog eating popcorn, watching the leaderboard"
                    className="hidden @2xl/reader-content:block justify-self-end self-center pt-8 w-44 @4xl/reader-content:w-52"
                />
            </div>
        </aside>
    )
}

function CTA() {
    return (
        <section
            id="get-started"
            className="not-prose mt-9 mb-20 grid grid-cols-1 items-center gap-x-8 gap-y-4 @2xl/reader-content:gap-y-2 @2xl/reader-content:grid-cols-[minmax(0,1fr)_auto] @5xl/reader-content:grid-cols-[minmax(0,1fr)_minmax(0,24rem)_auto]"
        >
            {/* One column on small screens, without the hog. Two columns from @2xl: the heading over the
                install box, and the hog beside both. Three columns from @5xl: heading, install box, hog. */}
            <SectionHeading lede="Not a fan of our UI? Install the PostHog MCP." className="!mb-0 [&>p]:!mb-0">
                Let{' '}
                <span className="bg-red/10 dark:bg-yellow/20 text-red dark:text-yellow rounded-md px-1">
                    your agent
                </span>{' '}
                use PostHog too
            </SectionHeading>
            <MCPInstallCTA
                className="max-w-md @5xl/reader-content:col-start-2 @5xl/reader-content:row-start-1"
                showDesktopLink={false}
            />
            <div className="hidden @2xl/reader-content:block @2xl/reader-content:col-start-2 @2xl/reader-content:row-start-1 @2xl/reader-content:row-span-2 @5xl/reader-content:col-start-3 @5xl/reader-content:row-span-1">
                <CampfireHog />
            </div>
        </section>
    )
}

function Unavailable() {
    return (
        <div className="not-prose border border-primary rounded p-6 text-center">
            <h2 className="text-xl font-bold m-0 mb-2">No data in this build</h2>
            <p className="text-secondary m-0">
                This build couldn't reach the PostHog endpoints behind this page. The next deploy tries again.
            </p>
        </div>
    )
}

export default function MCPLeaderboard({
    rows,
    fetchedAt,
}: {
    rows: LeaderboardRow[]
    fetchedAt: string | null
}): JSX.Element {
    const { appWindow } = useWindow()
    const { setWindowTitle } = useAppActions()
    const { siteSettings } = useAppSettings()
    const theme: Theme = siteSettings.theme === 'dark' ? 'dark' : 'light'
    const [metric, setMetric] = useState<Metric>('calls_pct')

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'MCP leaderboard')
        }
    }, [])

    const weeks = useMemo(() => getPeriods(rows, 'total'), [rows])
    // Every chart covers the last MAX_DAYS days, so they all share one window. Models were first
    // recorded on September 9, 2026, so the model charts have a gap before that day.
    const days = useMemo(() => getPeriods(rows, 'total_daily').slice(-MAX_DAYS), [rows])
    // Calls share per model lab and week. The scoreboard reads the last two weeks.
    const byLab = useMemo(() => groupedSeries(rows, 'model_vendor', weeks), [rows, weeks])
    const latest = weeks[weeks.length - 1]
    const previous = weeks[weeks.length - 2] ?? ''
    const coverage = useMemo(() => modelCoverage(rows, 'model_vendor', latest), [rows, latest])
    const coverageShift = useMemo(
        () => Math.abs(coverage - modelCoverage(rows, 'model_vendor', previous)),
        [rows, coverage, previous]
    )

    return (
        <>
            <SEO
                title="MCP leaderboard – Which AI is winning? – PostHog"
                description="The models, agents, and MCP spec versions people use with PostHog's MCP server, with error rates and growth. Updated daily from our own data."
                image="/images/og/default.png"
            />
            <ReaderView
                title="MCP leaderboard"
                hideTitle
                hideLeftSidebar
                hideRightSidebar
                hideMarkdownActions
                proseSize="lg"
                showQuestions={false}
            >
                <div className="flex flex-col gap-12 max-w-5xl mx-auto w-full">
                    {weeks.length === 0 || days.length === 0 ? (
                        <Unavailable />
                    ) : (
                        <>
                            <Header
                                rows={rows}
                                weeks={weeks}
                                byLab={byLab}
                                metric={metric}
                                setMetric={setMetric}
                                coverage={coverage}
                                coverageShift={coverageShift}
                                fetchedAt={fetchedAt}
                                theme={theme}
                            />
                            <div className="not-prose flex flex-col divide-y divide-primary [&>*]:py-8 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0">
                                <ModelRace
                                    rows={rows}
                                    days={days}
                                    week={latest}
                                    previousWeek={previous}
                                    theme={theme}
                                    metric={metric}
                                    showChange={coverageShift < MAX_COVERAGE_SHIFT}
                                />
                                <ClientRace
                                    rows={rows}
                                    days={days}
                                    week={latest}
                                    previousWeek={previous}
                                    theme={theme}
                                    metric={metric}
                                />
                                <UnderTheHood rows={rows} week={latest} days={days} theme={theme} />
                                <WhatAgentsDo rows={rows} week={latest} metric={metric} theme={theme} />
                                <Intent rows={rows} week={latest} />
                                <MCPAnalyticsAd />
                                <Reliability rows={rows} week={latest} days={days} theme={theme} />
                                <HowItWorks fetchedAt={fetchedAt} />
                            </div>
                        </>
                    )}
                    <CTA />
                </div>
            </ReaderView>
        </>
    )
}
