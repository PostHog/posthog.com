import type { ChannelResult } from './types'

const TIER_LABELS: Record<string, string> = {
    yes: 'Great',
    'yes-but': 'Good',
    maybe: 'OK',
    no: 'Bad',
}

const RED_FLAG_LABELS: Record<string, string> = {
    dead_audience: 'Dead audience',
    long_gap: 'Long gap',
    spiky_views: 'Spiky views',
    comment_anomaly: 'Comment anomaly',
}

export function exportToCSV(results: ChannelResult[]): void {
    const headers = [
        'Channel',
        'Channel ID',
        'Subscribers',
        'Median views',
        'Sub%',
        'Median likes',
        'Median comments',
        'Engagement %',
        'View CV%',
        'Comment/Like',
        'Max gap (days)',
        'Typical gap (days)',
        'View trend',
        'Uploads/month',
        'Rate used ($)',
        'CPM',
        'CPV',
        'Tier',
        'Red flags',
    ]
    const rows = results.map((r) => [
        r.title,
        r.channelId,
        r.subscriberCount,
        r.medianViews,
        r.subscriberCount > 0 ? r.subToViewPct.toFixed(1) : '',
        r.medianLikes,
        r.medianComments,
        r.engagementRatePct.toFixed(2),
        r.viewCV > 0 ? r.viewCV.toFixed(0) : '',
        r.medianLikes > 0 ? r.commentToLikeRatio.toFixed(2) : '',
        r.maxGapDays > 0 ? Math.round(r.maxGapDays) : '',
        r.avgGapDays > 0 ? r.avgGapDays.toFixed(1) : '',
        r.viewTrend,
        r.uploadsPerMonth > 0 ? r.uploadsPerMonth.toFixed(1) : '',
        r.rateUsed,
        r.cpm.toFixed(2),
        r.medianViews > 0 ? r.cpv.toFixed(4) : '',
        TIER_LABELS[r.tier] ?? r.tier,
        (r.redFlags ?? []).map((f) => RED_FLAG_LABELS[f] ?? f).join('; '),
    ])
    const escape = (v: string | number) => {
        const s = String(v)
        return s.includes(',') || s.includes('"') || s.includes('\n') ? `"${s.replace(/"/g, '""')}"` : s
    }
    const csv = [headers.map(escape).join(','), ...rows.map((r) => r.map(escape).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `hogcheck-3000-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
}
