import React, { useState } from 'react'
import type { ChannelResult } from 'lib/hogwatch/types'

const HEADER_TOOLTIPS: Record<string, string> = {
    Channel: 'Channel name and avatar from YouTube.',
    Subs: 'Total subscriber count reported by the channel.',
    'Median views': 'Median view count across the last 20 videos (middle value, less skewed by one viral hit).',
    Sub: 'Subscriber-to-view ratio: (median views ÷ subscribers) × 100. What % of subs watch a typical video. Low = many inactive subs.',
    'Median likes': 'Median like count across the last 20 videos.',
    'Median comments': 'Median comment count across the last 20 videos.',
    'Eng. %':
        'Engagement rate: (median likes + median comments) ÷ median views × 100. How much the audience interacts per view.',
    'View CV%':
        'View consistency: coefficient of variation (stdDev/mean × 100). High = spiky performance (huge spikes then drops).',
    'Comment/Like':
        'Comment-to-like ratio (median comments ÷ median likes). Unusual values can indicate bot engagement.',
    'Max gap':
        'Largest gap in days between consecutive uploads in the last 20 videos. Long gaps = inconsistent posting.',
    'Typical gap':
        'Average days between consecutive uploads (last 20 videos). Low = consistent schedule; high = irregular.',
    Trend: 'View trend: ↑ = recent 10 videos get more views than older 10; ↓ = fewer; → = roughly flat.',
    'Rate ($)':
        'Rate used for CPM: your default $ per video, or the override you set for this channel (click to edit).',
    CPM: 'Cost per 1,000 views: (rate ÷ median views) × 1000. What you pay per 1k views at this rate.',
    CPV: 'Cost per view: rate ÷ median views. What you pay per single view at this rate.',
    Tier: 'Tier from your CPM benchmark: Great ≤50, Good 50–70, OK 70–100, Bad >100.',
    Flags: 'Red flags: Dead audience (low Sub%), Long gap (>30 days), Spiky views (high CV), Comment anomaly (unusual comment/like ratio).',
}

function TableHeader({
    label,
    align = 'right',
    tooltipKey,
    sortKey,
    sortBy,
    sortDir,
    onSort,
}: {
    label: string
    align?: 'left' | 'right' | 'center'
    tooltipKey: string
    sortKey?: string
    sortBy?: string | null
    sortDir?: 'asc' | 'desc'
    onSort?: (key: string) => void
}) {
    const text = HEADER_TOOLTIPS[tooltipKey] ?? ''
    const alignClass = align === 'left' ? 'text-left' : align === 'center' ? 'text-center' : 'text-right'
    const isSorted = sortKey && sortBy === sortKey
    return (
        <th
            className={`group relative cursor-help border border-primary px-4 py-2 font-semibold tracking-posthog-tight text-primary ${alignClass} ${
                sortKey ? 'cursor-pointer select-none' : ''
            }`}
            title={text}
            onClick={sortKey ? () => onSort?.(sortKey) : undefined}
        >
            <span className="inline-flex items-center gap-0.5 border-b border-transparent group-hover:border-primary/40">
                {label}
                {isSorted && <span className="text-red">{sortDir === 'asc' ? ' ↑' : ' ↓'}</span>}
            </span>
            {text ? (
                <span
                    className="pointer-events-none absolute left-1/2 top-full z-[100] mt-1.5 max-w-[280px] -translate-x-1/2 rounded border border-primary bg-accent px-3 py-2 text-left text-xs font-normal leading-snug text-primary opacity-0 shadow-xl transition-opacity duration-150 group-hover:opacity-100"
                    role="tooltip"
                >
                    {text}
                </span>
            ) : null}
        </th>
    )
}

const TIER_STYLES: Record<string, string> = {
    yes: 'bg-accent text-green border-primary',
    'yes-but': 'bg-accent text-yellow border-primary',
    maybe: 'bg-accent text-orange border-primary',
    no: 'bg-accent text-red border-primary',
}

const TIER_LABELS: Record<string, string> = {
    yes: 'Great',
    'yes-but': 'Good',
    maybe: 'OK',
    no: 'Bad',
}

const TREND_SYMBOLS: Record<string, string> = {
    up: '↑',
    down: '↓',
    flat: '→',
}

const RED_FLAG_LABELS: Record<string, string> = {
    dead_audience: 'Dead audience',
    long_gap: 'Long gap',
    spiky_views: 'Spiky views',
    comment_anomaly: 'Comment anomaly',
}

type SortKey =
    | 'title'
    | 'subscriberCount'
    | 'medianViews'
    | 'subToViewPct'
    | 'engagementRatePct'
    | 'viewCV'
    | 'commentToLikeRatio'
    | 'maxGapDays'
    | 'avgGapDays'
    | 'cpm'
    | 'cpv'

function getSortValue(r: ChannelResult, key: SortKey): number | string {
    switch (key) {
        case 'title':
            return r.title
        case 'subscriberCount':
            return r.subscriberCount
        case 'medianViews':
            return r.medianViews
        case 'subToViewPct':
            return r.subToViewPct
        case 'engagementRatePct':
            return r.engagementRatePct
        case 'viewCV':
            return r.viewCV
        case 'commentToLikeRatio':
            return r.commentToLikeRatio
        case 'maxGapDays':
            return r.maxGapDays
        case 'avgGapDays':
            return r.avgGapDays
        case 'cpm':
            return r.cpm
        case 'cpv':
            return r.cpv
        default:
            return 0
    }
}

interface Props {
    results: ChannelResult[]
    defaultRate: number
    rateOverrides: Record<string, number>
    onRateOverride: (channelId: string, rate: number) => void
    onReRun: (overrides: Record<string, number>) => void
}

export function ComparisonTable({ results, defaultRate, rateOverrides, onRateOverride, onReRun }: Props) {
    const [editingRate, setEditingRate] = useState<string | null>(null)
    const [overrideValue, setOverrideValue] = useState('')
    const [minEngagement, setMinEngagement] = useState<string>('')
    const [minMedianViews, setMinMedianViews] = useState<string>('')
    const [tierFilter, setTierFilter] = useState<string>('all')
    const [sortBy, setSortBy] = useState<SortKey | null>('cpm')
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

    const filtered = results.filter((r) => {
        if (r.error) return true
        const eng = Number(minEngagement)
        if (!Number.isNaN(eng) && eng > 0 && r.engagementRatePct < eng) return false
        const views = Number(minMedianViews)
        if (!Number.isNaN(views) && views > 0 && r.medianViews < views) return false
        if (tierFilter !== 'all' && r.tier !== tierFilter) return false
        return true
    })

    const displayed = [...filtered].sort((a, b) => {
        if (!sortBy) return 0
        const va = getSortValue(a, sortBy)
        const vb = getSortValue(b, sortBy)
        if (typeof va === 'string' && typeof vb === 'string') {
            const c = va.localeCompare(vb)
            return sortDir === 'asc' ? c : -c
        }
        const n = Number(va) - Number(vb)
        return sortDir === 'asc' ? n : -n
    })

    function handleSort(key: string) {
        const k = key as SortKey
        if (sortBy === k) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
        else {
            setSortBy(k)
            setSortDir('asc')
        }
    }

    function startEdit(r: ChannelResult) {
        setEditingRate(r.channelId)
        setOverrideValue(String(r.rateUsed))
    }

    function submitOverride(channelId: string) {
        const n = Number(overrideValue)
        if (!Number.isNaN(n) && n > 0) {
            onRateOverride(channelId, n)
            onReRun({ ...rateOverrides, [channelId]: n })
        }
        setEditingRate(null)
    }

    return (
        <>
            <div className="flex flex-wrap items-center gap-3 border-b border-primary pb-3 mb-3">
                <span className="text-xs font-semibold text-muted">Filter:</span>
                <label className="flex items-center gap-1.5 text-sm">
                    <span className="text-muted">Eng. % ≥</span>
                    <input
                        type="number"
                        min={0}
                        step={0.5}
                        placeholder="—"
                        value={minEngagement}
                        onChange={(e) => setMinEngagement(e.target.value)}
                        className="w-16 rounded border border-primary bg-primary px-2 py-1 text-right text-sm text-primary"
                    />
                </label>
                <label className="flex items-center gap-1.5 text-sm">
                    <span className="text-muted">Median views ≥</span>
                    <input
                        type="number"
                        min={0}
                        step={1000}
                        placeholder="—"
                        value={minMedianViews}
                        onChange={(e) => setMinMedianViews(e.target.value)}
                        className="w-24 rounded border border-primary bg-primary px-2 py-1 text-right text-sm text-primary"
                    />
                </label>
                <label className="flex items-center gap-1.5 text-sm">
                    <span className="text-muted">Tier</span>
                    <select
                        value={tierFilter}
                        onChange={(e) => setTierFilter(e.target.value)}
                        className="rounded border border-primary bg-primary px-2 py-1 text-sm text-primary"
                    >
                        <option value="all">All</option>
                        <option value="yes">Great</option>
                        <option value="yes-but">Good</option>
                        <option value="maybe">OK</option>
                        <option value="no">Bad</option>
                    </select>
                </label>
                <span className="text-xs text-muted">
                    {displayed.length} of {results.length} channels
                </span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-primary text-sm">
                    <thead>
                        <tr className="bg-accent">
                            <TableHeader
                                label="Channel"
                                align="left"
                                tooltipKey="Channel"
                                sortKey="title"
                                sortBy={sortBy}
                                sortDir={sortDir}
                                onSort={handleSort}
                            />
                            <TableHeader
                                label="Subs"
                                tooltipKey="Subs"
                                sortKey="subscriberCount"
                                sortBy={sortBy}
                                sortDir={sortDir}
                                onSort={handleSort}
                            />
                            <TableHeader
                                label="Median views"
                                tooltipKey="Median views"
                                sortKey="medianViews"
                                sortBy={sortBy}
                                sortDir={sortDir}
                                onSort={handleSort}
                            />
                            <TableHeader
                                label="Sub%"
                                tooltipKey="Sub"
                                sortKey="subToViewPct"
                                sortBy={sortBy}
                                sortDir={sortDir}
                                onSort={handleSort}
                            />
                            <TableHeader label="Median likes" tooltipKey="Median likes" />
                            <TableHeader label="Median comments" tooltipKey="Median comments" />
                            <TableHeader
                                label="Eng. %"
                                tooltipKey="Eng. %"
                                sortKey="engagementRatePct"
                                sortBy={sortBy}
                                sortDir={sortDir}
                                onSort={handleSort}
                            />
                            <TableHeader
                                label="View CV%"
                                tooltipKey="View CV%"
                                sortKey="viewCV"
                                sortBy={sortBy}
                                sortDir={sortDir}
                                onSort={handleSort}
                            />
                            <TableHeader
                                label="Comment/Like"
                                tooltipKey="Comment/Like"
                                sortKey="commentToLikeRatio"
                                sortBy={sortBy}
                                sortDir={sortDir}
                                onSort={handleSort}
                            />
                            <TableHeader
                                label="Max gap"
                                tooltipKey="Max gap"
                                sortKey="maxGapDays"
                                sortBy={sortBy}
                                sortDir={sortDir}
                                onSort={handleSort}
                            />
                            <TableHeader
                                label="Typical gap"
                                tooltipKey="Typical gap"
                                sortKey="avgGapDays"
                                sortBy={sortBy}
                                sortDir={sortDir}
                                onSort={handleSort}
                            />
                            <TableHeader label="Trend" align="center" tooltipKey="Trend" />
                            <TableHeader label="Rate ($)" tooltipKey="Rate ($)" />
                            <TableHeader
                                label="CPM"
                                tooltipKey="CPM"
                                sortKey="cpm"
                                sortBy={sortBy}
                                sortDir={sortDir}
                                onSort={handleSort}
                            />
                            <TableHeader
                                label="CPV"
                                tooltipKey="CPV"
                                sortKey="cpv"
                                sortBy={sortBy}
                                sortDir={sortDir}
                                onSort={handleSort}
                            />
                            <TableHeader label="Tier" align="left" tooltipKey="Tier" />
                            <TableHeader label="Flags" align="left" tooltipKey="Flags" />
                        </tr>
                    </thead>
                    <tbody>
                        {displayed.map((r) => (
                            <tr key={r.channelId} className="hover:bg-accent">
                                <td className="border border-primary px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        {r.thumbnailUrl ? (
                                            <img
                                                src={r.thumbnailUrl}
                                                alt=""
                                                className="h-8 w-8 rounded-full object-cover"
                                            />
                                        ) : null}
                                        <div>
                                            <span className="font-medium text-primary">{r.title}</span>
                                            {r.error ? <span className="block text-xs text-red">{r.error}</span> : null}
                                        </div>
                                    </div>
                                </td>
                                <td className="border border-primary px-4 py-2 text-right text-muted">
                                    {r.subscriberCount.toLocaleString()}
                                </td>
                                <td className="border border-primary px-4 py-2 text-right text-primary">
                                    {r.medianViews.toLocaleString()}
                                </td>
                                <td className="border border-primary px-4 py-2 text-right text-muted">
                                    {r.subscriberCount > 0 ? `${r.subToViewPct.toFixed(1)}%` : '—'}
                                </td>
                                <td className="border border-primary px-4 py-2 text-right text-primary">
                                    {r.medianLikes.toLocaleString()}
                                </td>
                                <td className="border border-primary px-4 py-2 text-right text-primary">
                                    {r.medianComments.toLocaleString()}
                                </td>
                                <td className="border border-primary px-4 py-2 text-right text-primary">
                                    {r.engagementRatePct.toFixed(2)}%
                                </td>
                                <td className="border border-primary px-4 py-2 text-right text-muted">
                                    {r.viewCV > 0 ? `${r.viewCV.toFixed(0)}%` : '—'}
                                </td>
                                <td className="border border-primary px-4 py-2 text-right text-muted">
                                    {r.medianLikes > 0 ? r.commentToLikeRatio.toFixed(2) : '—'}
                                </td>
                                <td className="border border-primary px-4 py-2 text-right text-muted">
                                    {r.maxGapDays > 0 ? Math.round(r.maxGapDays) : '—'}
                                </td>
                                <td className="border border-primary px-4 py-2 text-right text-muted">
                                    {r.avgGapDays > 0 ? r.avgGapDays.toFixed(1) : '—'}
                                </td>
                                <td className="border border-primary px-4 py-2 text-center text-muted">
                                    {TREND_SYMBOLS[r.viewTrend]}
                                </td>
                                <td className="border border-primary px-4 py-2 text-right">
                                    {editingRate === r.channelId ? (
                                        <div className="flex items-center justify-end gap-1">
                                            <input
                                                type="number"
                                                min={1}
                                                value={overrideValue}
                                                onChange={(e) => setOverrideValue(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') submitOverride(r.channelId)
                                                    if (e.key === 'Escape') setEditingRate(null)
                                                }}
                                                className="w-20 rounded border border-primary bg-primary px-2 py-1 text-right text-sm text-primary focus:border-red focus:outline-none focus:ring-1 focus:ring-red"
                                                autoFocus
                                            />
                                            <button
                                                type="button"
                                                onClick={() => submitOverride(r.channelId)}
                                                className="text-sm font-semibold text-red hover:underline"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => startEdit(r)}
                                            className="text-primary hover:text-red hover:underline"
                                            title="Override rate for this channel"
                                        >
                                            {r.rateUsed === defaultRate ? (
                                                <span>{r.rateUsed}</span>
                                            ) : (
                                                <span className="font-semibold text-red">{r.rateUsed} *</span>
                                            )}
                                        </button>
                                    )}
                                </td>
                                <td className="border border-primary px-4 py-2 text-right font-semibold text-primary">
                                    {r.cpm.toFixed(1)}
                                </td>
                                <td className="border border-primary px-4 py-2 text-right text-muted">
                                    {r.medianViews > 0 ? `$${r.cpv.toFixed(4)}` : '—'}
                                </td>
                                <td className="border border-primary px-4 py-2">
                                    <span
                                        className={`inline-flex rounded border px-2 py-0.5 text-xs font-semibold ${
                                            TIER_STYLES[r.tier] ?? 'bg-accent text-primary border-primary'
                                        }`}
                                    >
                                        {TIER_LABELS[r.tier] ?? r.tier}
                                    </span>
                                </td>
                                <td className="border border-primary px-4 py-2">
                                    {r.redFlags?.length ? (
                                        <span className="flex flex-wrap gap-0.5">
                                            {r.redFlags.map((f) => (
                                                <span
                                                    key={f}
                                                    className="inline-flex rounded border border-primary bg-accent px-1.5 py-0.5 text-xs text-red"
                                                    title={RED_FLAG_LABELS[f] ?? f}
                                                >
                                                    {RED_FLAG_LABELS[f] ?? f}
                                                </span>
                                            ))}
                                        </span>
                                    ) : (
                                        <span className="text-muted">—</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="mt-2 text-xs text-muted">
                Click a rate to override for that channel; we'll re-run CPM and tier.
            </p>
        </>
    )
}
