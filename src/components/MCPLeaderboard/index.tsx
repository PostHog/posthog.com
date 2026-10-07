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
    PALETTE,
    Series,
    Theme,
    categoricalColor,
    clientColor,
    clientMaker,
    delta,
    displayLabel,
    formatPct,
    getPeriods,
    groupedSeries,
    labShades,
    modelVendor,
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
    children,
}: {
    sticker: React.ComponentType<{ className?: string }>
    children: React.ReactNode
}) {
    return (
        <SectionHeading>
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

function Scoreboard({
    rows,
    week,
    byLab,
    metric,
}: {
    rows: LeaderboardRow[]
    week: string
    byLab: Map<string, number[]>
    metric: Metric
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
                change: metric === 'calls_pct' ? delta(calls) : null,
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
                    style={{ borderTop: `4px solid ${vendorColor(card.vendor, 'light')}` }}
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
    labWeeks,
    byLab,
    metric,
    setMetric,
}: {
    rows: LeaderboardRow[]
    labWeeks: string[]
    byLab: Map<string, number[]>
    metric: Metric
    setMetric: (metric: Metric) => void
}) {
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
                        keeping score in real time
                    </RoughAnnotation>{' '}
                    for our <s>internal</s> purposes and your viewing pleasure.
                </p>
            </header>
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-bold m-0">This week*</h2>
                <MetricToggle metric={metric} onChange={setMetric} />
            </div>
            <Scoreboard rows={rows} week={labWeeks[labWeeks.length - 1]} byLab={byLab} metric={metric} />
            <p className="text-xs text-muted m-0 -mt-3">
                {metric === 'users_pct' &&
                    "Share of weekly users who called with a model from that lab. People switch models, so this doesn't add up to 100%. "}
                * Agents self-report their model, except Codex, which sends it in its request metadata.
            </p>
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
    theme,
    metric,
}: {
    rows: LeaderboardRow[]
    days: string[]
    week: string
    theme: Theme
    metric: Metric
}) {
    const series = modelRaceSeries(rows, days, theme)
    const colorOf = (model: string) =>
        series.find((s) => s.label === model)?.color ?? vendorColor(modelVendor(model), theme)
    const models = weekShares(rows, 'model', week, metric, { dropUnknown: true, dropOther: true, limit: 15 }).map(
        (share) => ({ ...share, color: colorOf(share.label) })
    )

    return (
        <section id="models" className="not-prose">
            <StickerHeading sticker={StickerAi}>May the best model win</StickerHeading>
            <div className="grid grid-cols-1 @3xl/reader-content:grid-cols-5 gap-3">
                <Card title="Daily tool calls by model" className="@3xl/reader-content:col-span-3">
                    <LineChart periods={days} series={series} theme={theme} height={420} stacked />
                </Card>
                <Card title="Top models this week" className="@3xl/reader-content:col-span-2">
                    <ShareBars items={models} icon={(item) => <BrandLogo name={modelVendor(item.label)} />} />
                </Card>
            </div>
        </section>
    )
}

function ClientRace({
    rows,
    labWeeks,
    byLab,
    week,
    theme,
    metric,
}: {
    rows: LeaderboardRow[]
    labWeeks: string[]
    byLab: Map<string, number[]>
    week: string
    theme: Theme
    metric: Metric
}) {
    const series = topSeries(byLab, 8, (label) => vendorColor(label, theme))
    const clients = weekShares(rows, 'client', week, metric, { dropUnknown: true, dropOther: true, limit: 15 }).map(
        (share) => ({ ...share, color: clientColor(share.label, theme) })
    )

    return (
        <section id="clients" className="not-prose">
            <StickerHeading sticker={StickerRobot}>AI players battle it out</StickerHeading>
            <div className="grid grid-cols-1 @3xl/reader-content:grid-cols-5 gap-3">
                <Card title="Weekly tool calls by AI lab" className="@3xl/reader-content:col-span-3">
                    <LineChart periods={labWeeks} series={series} theme={theme} height={420} stacked />
                </Card>
                <Card title="Top harnesses this week" className="@3xl/reader-content:col-span-2">
                    <ShareBars
                        items={clients}
                        icon={(item) => <BrandLogo name={item.label} fallback={clientMaker(item.label)} />}
                    />
                </Card>
            </div>
        </section>
    )
}

const HOOD_FACETS: { facet: string; title: string }[] = [
    { facet: 'auth_method', title: 'How agents sign in' },
    { facet: 'model_source', title: 'How we know the model' },
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
    // Newest spec first, so the newest version always gets the same color.
    const protocolSeries = topSeries(groupedSeries(rows, 'protocol_version_daily', days), 5, () => '')
        .sort((a, b) => (a.label === 'Other' ? 1 : b.label === 'Other' ? -1 : b.label.localeCompare(a.label)))
        .map((s, i) => ({ ...s, color: categoricalColor(s.label, i) }))
    return (
        <section id="protocol" className="not-prose">
            <StickerHeading sticker={StickerTombstone}>The rise and fall of MCP spec versions</StickerHeading>
            <div className="flex flex-col gap-3">
                <Card title="MCP spec version, daily share of tool calls">
                    <LineChart periods={days} series={protocolSeries} theme={theme} height={260} stacked />
                </Card>
                <div className="grid grid-cols-1 @2xl/reader-content:grid-cols-2 gap-3">
                    {HOOD_FACETS.map(({ facet, title }) => {
                        const items = weekShares(rows, facet, week, 'calls_pct').map((share, i) => ({
                            ...share,
                            label: displayLabel(facet, share.label),
                            color: categoricalColor(share.label, i),
                        }))
                        // Same labels and colors as the bar, and unknown labels stay, like in the bar.
                        const colors = new Map(items.map((item) => [item.label, item.color]))
                        const series = topSeries(
                            groupedSeries(rows, `${facet}_daily`, days, (label) => displayLabel(facet, label), false),
                            5,
                            (label, i) => colors.get(label) ?? categoricalColor(label, i)
                        )
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
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
})

function WhatAgentsDo({ rows, week, metric }: { rows: LeaderboardRow[]; week: string; metric: Metric }) {
    const named = (facet: string, by: Metric) =>
        weekShares(rows, facet, week, by, { dropOther: true, limit: LIST_LENGTH })
    const categories = named('tool_category', metric).map((share) => ({ ...share, color: PALETTE.blue }))
    const tools = named('tool', 'users_pct').map((share) => ({ ...share, color: PALETTE.yellow }))
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
                Agents tell us 'why' {formatPct(withIntent, 0)} of times
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
    const clients = weekShares(rows, 'client', week, 'calls_pct', { dropUnknown: true, dropOther: true, limit: 10 })
        .map((share) => ({ ...share, value: share.errorRate ?? 0, color: clientColor(share.label, theme) }))
        .sort((a, b) => b.value - a.value)
    const errorTypes = weekShares(rows, 'error_type', week, 'calls_pct').map((share, i) => ({
        ...share,
        color: categoricalColor(share.label, i),
    }))
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
                        series={[{ label: 'Error rate', color: PALETTE.red, data: errorRate }]}
                    />
                    <h4 className="text-sm font-bold text-primary mt-4 mb-1.5">Why calls fail</h4>
                    <SplitBar items={errorTypes} />
                </Card>
                <Card title="Latency">
                    <LineChart
                        periods={days}
                        theme={theme}
                        height={300}
                        format="seconds"
                        series={[
                            { label: 'p50', color: PALETTE.green, data: p50 },
                            { label: 'p95', color: PALETTE.yellow, data: p95 },
                        ]}
                    />
                </Card>
                <Card title="Error rate by client this week" className="@2xl/reader-content:col-span-2">
                    <ShareBars
                        items={clients}
                        icon={(item) => <BrandLogo name={item.label} fallback={clientMaker(item.label)} />}
                        detail={(item) => (item.p95 ? `p95 ${(item.p95 / 1000).toFixed(1)}s` : null)}
                    />
                    <Note>Top ten clients with the most calls.</Note>
                </Card>
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
    // The weeks that overlap that window, for the weekly lab chart.
    const labWeeks = useMemo(() => {
        if (days.length === 0) return []
        const cutoff = new Date(Date.parse(days[0]) - 6 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
        return weeks.filter((week) => week >= cutoff)
    }, [weeks, days])
    // Calls share per model lab and week. The scoreboard and the weekly lab chart both read this, so
    // they always show the same numbers.
    const byLab = useMemo(() => groupedSeries(rows, 'model_vendor', labWeeks), [rows, labWeeks])
    const latest = weeks[weeks.length - 1]

    return (
        <>
            <SEO
                title="MCP leaderboard – Which AI is winning? – PostHog"
                description="Which models and clients agents use with the PostHog MCP server: Anthropic, OpenAI, open weights, and more, from our own data."
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
                    {weeks.length === 0 || labWeeks.length === 0 || days.length === 0 ? (
                        <Unavailable />
                    ) : (
                        <>
                            <Header
                                rows={rows}
                                labWeeks={labWeeks}
                                byLab={byLab}
                                metric={metric}
                                setMetric={setMetric}
                            />
                            <div className="not-prose flex flex-col divide-y divide-primary [&>*]:py-8 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0">
                                <ModelRace rows={rows} days={days} week={latest} theme={theme} metric={metric} />
                                <ClientRace
                                    rows={rows}
                                    labWeeks={labWeeks}
                                    byLab={byLab}
                                    week={latest}
                                    theme={theme}
                                    metric={metric}
                                />
                                <UnderTheHood rows={rows} week={latest} days={days} theme={theme} />
                                <WhatAgentsDo rows={rows} week={latest} metric={metric} />
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
