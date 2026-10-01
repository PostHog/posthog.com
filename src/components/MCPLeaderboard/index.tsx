import React, { memo, useEffect, useMemo, useState } from 'react'
import { IconCheck, IconPlug } from '@posthog/icons'
import { useAppActions, useAppSettings } from '../../context/App'
import { useWindow } from '../../context/Window'
import SEO from 'components/seo'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import ReaderView from 'components/ReaderView'
import MCPInstallCTA from 'components/MCPInstallCTA'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import { CARD_H3, InlineCode, SectionHeading } from 'components/Products/ReaderViewProduct/helpers'
import { LineChart, ShareBars, SplitBar } from './charts'
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
    formatDay,
    formatPct,
    getPeriods,
    groupedSeries,
    knownShare,
    labShades,
    modelVendor,
    rankByAverage,
    topSeries,
    totalSeries,
    vendorColor,
    weekShares,
} from './data'

const VENDORS = ['Anthropic', 'OpenAI', 'xAI', 'Google', 'Open weights', 'Cursor', 'Other']
const MODEL_AGNOSTIC_CLIENTS = ['Cursor', 'opencode', 'Other']
// First-party apps that ship with their maker's model, shown small for contrast.
const FIRST_PARTY_CLIENTS = ['Claude Code', 'OpenAI Codex']
const TOP_MODELS = 10
const LIST_LENGTH = 12

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

const MEDALS = ['🥇', '🥈', '🥉']

function Scoreboard({ rows, weeks, metric }: { rows: LeaderboardRow[]; weeks: string[]; metric: Metric }) {
    const week = weeks[weeks.length - 1]
    const series = groupedSeries(rows, 'model_vendor', weeks)
    const shares = weekShares(rows, 'model_vendor', week, metric, { dropUnknown: true })
    const cards = VENDORS.filter((vendor) => vendor !== 'Other')
        .map((vendor) => ({
            vendor,
            value: shares.find((share) => share.label === vendor)?.value ?? 0,
            change: metric === 'calls_pct' ? delta(series.get(vendor) ?? []) : null,
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 3)
    return (
        <div className="grid grid-cols-1 @xl/reader-content:grid-cols-3 gap-3">
            {cards.map((card, i) => (
                <div
                    key={card.vendor}
                    className="border border-primary rounded p-4 bg-primary"
                    style={{ borderTop: `4px solid ${vendorColor(card.vendor, 'light')}` }}
                >
                    <div className="flex items-baseline justify-between">
                        <span className="text-sm font-semibold text-secondary">
                            {MEDALS[i]} {card.vendor}
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
    modelWeeks,
    metric,
    setMetric,
}: {
    rows: LeaderboardRow[]
    modelWeeks: string[]
    metric: Metric
    setMetric: (metric: Metric) => void
}) {
    const week = modelWeeks[modelWeeks.length - 1]
    const reported = knownShare(rows, 'model_vendor', week)
    return (
        <section id="overview" className="not-prose flex flex-col gap-6">
            <header>
                <p className="text-sm font-semibold uppercase tracking-wide text-secondary m-0 mb-2">MCP leaderboard</p>
                <h1 className="text-4xl @3xl/reader-content:text-5xl font-bold !leading-[1.12] !m-0 tracking-tight">
                    Which AI is{' '}
                    <span className="bg-red/10 dark:bg-yellow/20 text-red dark:text-yellow rounded-md px-1 whitespace-nowrap">
                        winning?
                    </span>
                </h1>
                <p className="text-lg text-secondary leading-relaxed mt-4 mb-0 max-w-prose">
                    Agents call the{' '}
                    <Link to="/mcp" className="font-semibold underline">
                        PostHog MCP server
                    </Link>{' '}
                    millions of times a week. Each call says which client sent it, and most say which model is driving.
                    This page counts them, and rebuilds every time posthog.com deploys.
                </p>
            </header>
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-bold m-0">Week of {formatDay(week)}, by model lab</h2>
                <MetricToggle metric={metric} onChange={setMetric} />
            </div>
            <Scoreboard rows={rows} weeks={modelWeeks} metric={metric} />
            <p className="text-xs text-muted m-0 -mt-3">
                {metric === 'calls_pct'
                    ? `Share of tool calls that named a model. ${formatPct(reported, 0)} of calls did.`
                    : "Share of weekly users who called with a model from that lab. People switch models, so this doesn't add up to 100%."}
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
    const vendors = weekShares(rows, 'model_vendor', week, 'calls_pct', { dropUnknown: true })
    const share = (vendor: string) => formatPct(vendors.find((v) => v.label === vendor)?.value ?? 0, 0)

    return (
        <section id="models" className="not-prose">
            <SectionHeading
                lede={
                    models[0]
                        ? `${models[0].label} leads with ${formatPct(
                              models[0].value,
                              0
                          )} of calls. By lab, Anthropic has ${share('Anthropic')} and OpenAI has ${share(
                              'OpenAI'
                          )}. Everyone else shares the rest.`
                        : undefined
                }
            >
                The model race
            </SectionHeading>
            <div className="grid grid-cols-1 @3xl/reader-content:grid-cols-5 gap-3">
                <Card title="Daily share of tool calls, by model" className="@3xl/reader-content:col-span-3">
                    <LineChart periods={days} series={series} theme={theme} height={420} stacked />
                    <Note>
                        Shades of one color are models from the same lab. Calls that didn't name a model are left out,
                        so each day adds up to 100%. We started recording models on {formatDay(days[0])}.
                    </Note>
                </Card>
                <Card title={`Top models, week of ${formatDay(week)}`} className="@3xl/reader-content:col-span-2">
                    <ShareBars items={models} />
                    <Note>
                        {metricLabel[metric]}. Agents report their own model, so a few report a family, like{' '}
                        <InlineCode>claude</InlineCode>, instead of a version.
                    </Note>
                </Card>
            </div>
        </section>
    )
}

function ClientRace({
    rows,
    weeks,
    theme,
    metric,
}: {
    rows: LeaderboardRow[]
    weeks: string[]
    theme: Theme
    metric: Metric
}) {
    const week = weeks[weeks.length - 1]
    const byMaker = groupedSeries(rows, 'client', weeks, clientMaker)
    const series = topSeries(byMaker, 8, (label) => vendorColor(label, theme))
    const clients = weekShares(rows, 'client', week, metric, { dropUnknown: true, dropOther: true, limit: 15 }).map(
        (share) => ({ ...share, color: clientColor(share.label, theme) })
    )
    const callShares = weekShares(rows, 'client', week, 'calls_pct', { dropUnknown: true })
    const leader = callShares.find((share) => share.label !== 'Other')
    const anthropicApps = byMaker.get('Anthropic')?.slice(-1)[0]

    return (
        <section id="clients" className="not-prose">
            <SectionHeading
                lede={
                    leader
                        ? `${leader.label} sent ${formatPct(
                              leader.value,
                              0
                          )} of calls last week. Anthropic's apps together sent ${formatPct(anthropicApps ?? null, 0)}.`
                        : undefined
                }
            >
                The client race
            </SectionHeading>
            <div className="grid grid-cols-1 @3xl/reader-content:grid-cols-5 gap-3">
                <Card title="Weekly share of tool calls, by client maker" className="@3xl/reader-content:col-span-3">
                    <LineChart periods={weeks} series={series} theme={theme} height={420} stacked />
                    <Note>
                        Calls from clients we can't identify are left out. "Custom code" means an agent built straight
                        on an MCP SDK or an HTTP library, like <InlineCode>python-httpx</InlineCode> or the Vercel AI
                        SDK.
                    </Note>
                </Card>
                <Card title={`Top clients, week of ${formatDay(week)}`} className="@3xl/reader-content:col-span-2">
                    <ShareBars items={clients} />
                    <Note>{metricLabel[metric]}.</Note>
                </Card>
            </div>
        </section>
    )
}

function ClientModels({
    rows,
    client,
    week,
    theme,
}: {
    rows: LeaderboardRow[]
    client: string
    week: string
    theme: Theme
}) {
    const shares = weekShares(rows, 'model_vendor_by_client', week, 'calls_pct', {
        grp: client,
        dropUnknown: true,
    }).map((share) => ({ ...share, color: vendorColor(share.label, theme) }))
    const reported = knownShare(rows, 'model_vendor_by_client', week, client)
    return (
        <div>
            <h3 className="text-sm font-bold text-primary m-0 mb-1.5">{displayLabel('client', client)}</h3>
            <SplitBar items={shares} caption={`${formatPct(reported, 0)} of this client's calls named a model.`} />
        </div>
    )
}

const BringYourOwnModel = memo(function BringYourOwnModel({
    rows,
    week,
    theme,
}: {
    rows: LeaderboardRow[]
    week: string
    theme: Theme
}) {
    const hasData = (client: string) => knownShare(rows, 'model_vendor_by_client', week, client) > 0
    return (
        <section id="byom" className="not-prose">
            <SectionHeading lede="Claude Code runs Claude and Codex runs GPT, so the fairest test is a client where the user picks the model. Here is what they pick.">
                Bring your own model
            </SectionHeading>
            <Card>
                <div className="grid grid-cols-1 @2xl/reader-content:grid-cols-2 gap-x-8 gap-y-5 pb-5 mb-5 border-b border-primary">
                    {FIRST_PARTY_CLIENTS.filter(hasData).map((client) => (
                        <ClientModels key={client} rows={rows} client={client} week={week} theme={theme} />
                    ))}
                </div>
                <div className="flex flex-col gap-5">
                    {MODEL_AGNOSTIC_CLIENTS.filter(hasData).map((client) => (
                        <ClientModels key={client} rows={rows} client={client} week={week} theme={theme} />
                    ))}
                </div>
                <Note>Share of tool calls in the week of {formatDay(week)}, among calls that named a model.</Note>
            </Card>
        </section>
    )
})

const Growth = memo(function Growth({ rows, weeks, theme }: { rows: LeaderboardRow[]; weeks: string[]; theme: Theme }) {
    const calls = totalSeries(rows, weeks, 'calls_index')
    const users = totalSeries(rows, weeks, 'users_index')
    const lastCalls = (calls[calls.length - 1] ?? 100) / 100
    const lastUsers = (users[users.length - 1] ?? 100) / 100
    const since = formatDay(weeks[0])
    return (
        <section id="growth" className="not-prose">
            <SectionHeading
                lede={
                    lastCalls > lastUsers
                        ? `Tool calls are up ${lastCalls.toFixed(
                              1
                          )}x since the week of ${since}. Users are up ${lastUsers.toFixed(
                              1
                          )}x. Calls grow faster than users, so each user's agent does more every week.`
                        : `Users are up ${lastUsers.toFixed(
                              1
                          )}x since the week of ${since}, and tool calls are up ${lastCalls.toFixed(1)}x.`
                }
            >
                Growth
            </SectionHeading>
            <Card title={`Growth since the week of ${since} (1x is that week)`}>
                <LineChart
                    periods={weeks}
                    theme={theme}
                    format="multiple"
                    series={[
                        { label: 'Tool calls', color: PALETTE.red, data: calls },
                        { label: 'Weekly users', color: PALETTE.blue, data: users },
                    ]}
                />
                <Note>
                    Since August 17, 2026, every call says which surface sent it, so we can drop PostHog's own agents
                    exactly. Before that date we drop them by their client header, which catches nearly all of them.
                </Note>
            </Card>
        </section>
    )
})

const HOOD_FACETS: { facet: string; title: string; note: string }[] = [
    {
        facet: 'auth_method',
        title: 'How agents sign in',
        note: 'OAuth is the one-click connector flow. The rest paste a personal API key.',
    },
    {
        facet: 'region',
        title: 'Cloud region',
        note: 'Which PostHog Cloud served the call.',
    },
    {
        facet: 'model_source',
        title: 'How we know the model',
        note: 'Most agents name their model when asked. A few clients send it in their request metadata.',
    },
]

const UnderTheHood = memo(function UnderTheHood({
    rows,
    weeks,
    theme,
}: {
    rows: LeaderboardRow[]
    weeks: string[]
    theme: Theme
}) {
    const week = weeks[weeks.length - 1]
    // Newest spec first, so the newest version always gets the same color.
    const protocolSeries = topSeries(groupedSeries(rows, 'protocol_version', weeks), 5, () => '')
        .sort((a, b) => (a.label === 'Other' ? 1 : b.label === 'Other' ? -1 : b.label.localeCompare(a.label)))
        .map((s, i) => ({ ...s, color: categoricalColor(s.label, i) }))
    const newest = protocolSeries[0]
    return (
        <section id="protocol" className="not-prose">
            <SectionHeading
                lede={
                    newest
                        ? newest.data[0] < 1
                            ? `The ${newest.label} spec revision went from nothing to ${formatPct(
                                  newest.data[newest.data.length - 1],
                                  0
                              )} of calls since the week of ${formatDay(weeks[0])}. Clients ship spec updates fast.`
                            : `The newest spec revision, ${newest.label}, carries ${formatPct(
                                  newest.data[newest.data.length - 1],
                                  0
                              )} of calls.`
                        : undefined
                }
            >
                Under the hood
            </SectionHeading>
            <div className="flex flex-col gap-3">
                <Card title="MCP spec version, weekly share of tool calls">
                    <LineChart periods={weeks} series={protocolSeries} theme={theme} height={260} stacked />
                    <Note>Calls with an unknown version are left out.</Note>
                </Card>
                <div className="grid grid-cols-1 @2xl/reader-content:grid-cols-3 gap-3">
                    {HOOD_FACETS.map(({ facet, title, note }) => (
                        <Card key={facet} title={title}>
                            <SplitBar
                                items={weekShares(rows, facet, week, 'calls_pct').map((share, i) => ({
                                    ...share,
                                    label: displayLabel(facet, share.label),
                                    color: categoricalColor(share.label, i),
                                }))}
                                caption={note}
                            />
                        </Card>
                    ))}
                </div>
                <Note>Share of tool calls in the week of {formatDay(week)}.</Note>
            </div>
        </section>
    )
})

function WhatAgentsDo({ rows, week, metric }: { rows: LeaderboardRow[]; week: string; metric: Metric }) {
    const named = (facet: string, by: Metric) =>
        weekShares(rows, facet, week, by, { dropOther: true, limit: LIST_LENGTH })
    const categories = named('tool_category', metric).map((share) => ({ ...share, color: PALETTE.blue }))
    const tools = named('tool', 'users_pct').map((share) => ({ ...share, color: PALETTE.yellow }))
    const topTool = named('tool', 'calls_pct')[0]
    return (
        <section id="tools" className="not-prose">
            <SectionHeading
                lede={
                    topTool
                        ? `The server has hundreds of tools, and ${topTool.label} gets ${formatPct(
                              topTool.value,
                              0
                          )} of calls on its own. Given the choice, agents write their own query.`
                        : undefined
                }
            >
                What agents do
            </SectionHeading>
            <div className="grid grid-cols-1 @2xl/reader-content:grid-cols-2 gap-3">
                <Card title="Tool categories">
                    <ShareBars items={categories} />
                    <Note>{metricLabel[metric]}.</Note>
                </Card>
                <Card title="Most popular tools">
                    <ShareBars items={tools} />
                    <Note>Share of weekly users who called the tool at least once.</Note>
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
            <SectionHeading
                lede={`${formatPct(
                    withIntent,
                    0
                )} of tool calls come with a reason. A tool name says what ran. The reason says what the user wanted.`}
            >
                Agents say why
            </SectionHeading>
            <div className="grid grid-cols-1 @3xl/reader-content:grid-cols-2 gap-3">
                <Card title="How it works">
                    <ol className="m-0 p-0 list-none flex flex-col gap-2 text-sm text-secondary leading-relaxed">
                        <li>
                            <strong className="text-primary">1.</strong> MCP analytics adds a{' '}
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
                    <Note>
                        <Link to="/docs/mcp-analytics/intent" className="font-semibold underline">
                            Read how intent capture works
                        </Link>
                    </Note>
                </Card>
                <Card title="What one looks like">
                    <div className="rounded border border-primary bg-accent p-3 font-mono text-sm text-primary leading-relaxed">
                        <span className="text-muted">$mcp_intent: </span>"Comparing signup conversion before and after
                        Tuesday's pricing change"
                    </div>
                    <Note>
                        An illustrative example. Intents describe real people's work, so we don't publish ours. If an
                        agent skips the argument, the server can derive an intent from the tool and its arguments
                        instead.
                    </Note>
                </Card>
            </div>
        </section>
    )
})

const Reliability = memo(function Reliability({
    rows,
    weeks,
    theme,
}: {
    rows: LeaderboardRow[]
    weeks: string[]
    theme: Theme
}) {
    const week = weeks[weeks.length - 1]
    const errorRate = totalSeries(rows, weeks, 'error_rate_pct')
    const p95 = totalSeries(rows, weeks, 'p95_ms')
    const p50 = totalSeries(rows, weeks, 'p50_ms')
    const clients = weekShares(rows, 'client', week, 'calls_pct', { dropUnknown: true, dropOther: true, limit: 10 })
        .map((share) => ({ ...share, value: share.errorRate ?? 0, color: clientColor(share.label, theme) }))
        .sort((a, b) => b.value - a.value)
    const errorTypes = weekShares(rows, 'error_type', week, 'calls_pct').map((share, i) => ({
        ...share,
        color: categoricalColor(share.label, i),
    }))
    const first = errorRate.find((rate) => rate !== null)
    const last = errorRate[errorRate.length - 1]
    return (
        <section id="reliability" className="not-prose">
            <SectionHeading
                lede={
                    last != null && first != null
                        ? `${formatPct(last)} of calls failed last week${
                              last < first
                                  ? `, down from ${formatPct(first)} in the week of ${formatDay(weeks[0])}`
                                  : ''
                          }. ${errorTypes[0] ? `Most failures are "${errorTypes[0].label}" errors.` : ''}`
                        : undefined
                }
            >
                Reliability
            </SectionHeading>
            <div className="grid grid-cols-1 @2xl/reader-content:grid-cols-2 gap-3">
                <Card title="Error rate, all calls">
                    <LineChart
                        periods={weeks}
                        theme={theme}
                        height={220}
                        format="rate"
                        series={[{ label: 'Error rate', color: PALETTE.red, data: errorRate }]}
                    />
                    <h4 className="text-sm font-bold text-primary mt-4 mb-1.5">Why calls fail</h4>
                    <SplitBar items={errorTypes} caption="Share of failed calls by error type, last week." />
                </Card>
                <Card title="Latency, all calls">
                    <LineChart
                        periods={weeks}
                        theme={theme}
                        height={300}
                        format="seconds"
                        series={[
                            { label: 'p50', color: PALETTE.green, data: p50 },
                            { label: 'p95', color: PALETTE.yellow, data: p95 },
                        ]}
                    />
                </Card>
                <Card
                    title={`Error rate by client, week of ${formatDay(week)}`}
                    className="@2xl/reader-content:col-span-2"
                >
                    <ShareBars
                        items={clients}
                        detail={(item) => (item.p95 ? `p95 ${(item.p95 / 1000).toFixed(1)}s` : null)}
                    />
                    <Note>The ten clients with the most calls.</Note>
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

const RULES: React.ReactNode[] = [
    <>Customer calls only. PostHog's own agents, cloud tasks, Slack bot, and wizard are out.</>,
    <>
        Complete periods only. Single-tool clients wrap every call in <InlineCode>exec</InlineCode>, and we count the
        inner call once.
    </>,
    <>Agents report their own model. Treat it as a strong hint, not proof.</>,
    <>Client labels match the MCP analytics product, plus a few open-source agents it doesn't name yet.</>,
    <>No raw counts leave PostHog. The endpoints return percentages, rates, and latency only.</>,
]

const HowItWorks = memo(function HowItWorks({ fetchedAt }: { fetchedAt: string | null }) {
    return (
        <section id="how-it-works" className="not-prose">
            <SectionHeading lede="PostHog events, two PostHog endpoints, one static page.">
                How this page works
            </SectionHeading>
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
            <h3 className="text-base font-bold text-primary mt-6 mb-2">What we count</h3>
            <ul className="m-0 p-0 list-none flex flex-col gap-1 text-sm text-secondary leading-relaxed">
                {RULES.map((rule, i) => (
                    <li key={i} className="flex gap-2">
                        <span aria-hidden className="text-muted">
                            •
                        </span>
                        <span>{rule}</span>
                    </li>
                ))}
            </ul>
            {fetchedAt && (
                <p className="text-xs text-muted mt-4 mb-0">Data fetched {new Date(fetchedAt).toUTCString()}.</p>
            )}
        </section>
    )
})

// A house ad for MCP analytics: the product this page is built with.
function MCPAnalyticsAd() {
    const features = [
        'The clients and models your users bring',
        'Intents, grouped into themes',
        'Failing tools, with the error and the session',
        "Capabilities agents asked for that you don't have",
    ]
    return (
        <aside aria-label="MCP analytics" className="not-prose">
            <div className="relative border border-primary rounded bg-accent p-5 @2xl/reader-content:p-6">
                <span className="absolute top-3 right-3 text-[11px] font-semibold uppercase tracking-wide text-muted border border-primary rounded px-1.5 py-px">
                    Ad, sort of
                </span>
                <div className="flex items-center gap-2 text-blue mb-2">
                    <IconPlug className="size-6" />
                    <span className="font-bold">MCP analytics</span>
                </div>
                <h2 className="text-2xl font-bold text-primary m-0 mb-2 pr-20">
                    Run an MCP server? Get this page for it.
                </h2>
                <p className="text-secondary leading-relaxed m-0 mb-4 max-w-prose">
                    Everything above comes from MCP analytics running on our server. Install it on yours and you get the
                    same breakdowns for your users, plus the parts we keep private: every session's tool calls and the
                    intent behind each one.
                </p>
                <ul className="list-none m-0 p-0 mb-5 grid grid-cols-1 @2xl/reader-content:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-primary">
                    {features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                            <IconCheck className="size-4 shrink-0 text-green mt-0.5" />
                            {feature}
                        </li>
                    ))}
                </ul>
                <p className="text-sm text-secondary m-0 mb-4">
                    One command instruments a TypeScript or Python server:{' '}
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
        </aside>
    )
}

function CTA() {
    return (
        <section id="get-started" className="not-prose mb-20">
            <SectionHeading lede="Connect your agent and next week's numbers include you.">
                Join the leaderboard
            </SectionHeading>
            <MCPInstallCTA className="max-w-md" showDesktopLink={false} />
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
    // Models were first recorded on September 9, 2026, so the model charts start there.
    const modelWeeks = useMemo(() => weeks.filter((week) => knownShare(rows, 'model_vendor', week) > 0), [rows, weeks])
    const days = useMemo(
        () => getPeriods(rows, 'model_daily').filter((day) => knownShare(rows, 'model_daily', day) > 0),
        [rows]
    )
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
                    {weeks.length === 0 || modelWeeks.length === 0 || days.length === 0 ? (
                        <Unavailable />
                    ) : (
                        <>
                            <Header rows={rows} modelWeeks={modelWeeks} metric={metric} setMetric={setMetric} />
                            <div className="not-prose flex flex-col divide-y divide-primary [&>*]:py-8 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0">
                                <ModelRace rows={rows} days={days} week={latest} theme={theme} metric={metric} />
                                <ClientRace rows={rows} weeks={weeks} theme={theme} metric={metric} />
                                <BringYourOwnModel rows={rows} week={latest} theme={theme} />
                                <Growth rows={rows} weeks={weeks} theme={theme} />
                                <UnderTheHood rows={rows} weeks={weeks} theme={theme} />
                                <WhatAgentsDo rows={rows} week={latest} metric={metric} />
                                <Intent rows={rows} week={latest} />
                                <MCPAnalyticsAd />
                                <Reliability rows={rows} weeks={weeks} theme={theme} />
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
