import { runEndpoint } from './runEndpoint'
import type { EndpointRow as Row } from './runEndpoint'

const STATUS_URL = 'https://www.posthogstatus.com/api/metrics/us'
const ROW_LIMIT = 1000
const SERIES_DAYS = 30
const DAY_MS = 86_400_000

type StatusPoint = [number, number]
type StatusChart = { name: string; windows: Record<string, { series: { label: string; data: StatusPoint[] }[] }> }

const isWeekday = (day: string): boolean => {
    const weekday = new Date(`${day}T00:00:00Z`).getUTCDay()
    return weekday >= 1 && weekday <= 5
}

const round1 = (value: number): number => Math.round(value * 10) / 10

function statusSeries(charts: StatusChart[], name: string, label: string): StatusPoint[] {
    const series = charts.find((chart) => chart.name === name)?.windows['24h']?.series.find((s) => s.label === label)
    if (!series) throw new Error(`Status page has no ${name} ${label} series`)
    return series.data
}

function latency(charts: StatusChart[], name: string) {
    const median = statusSeries(charts, name, 'p50').slice(1)
    const p99 = statusSeries(charts, name, 'p99').slice(1)
    return {
        hours: median.map(([time]) => `${new Date(time * 1000).toISOString().slice(11, 13)}:00`),
        median: median.map(([, value]) => round1(value)),
        p99: p99.map(([, value]) => round1(value)),
    }
}

async function fetchStatus() {
    const response = await fetch(STATUS_URL)
    if (response.status !== 200) throw new Error(`Status page returned ${response.status}`)
    const { charts, polled_at }: { charts: StatusChart[]; polled_at: string } = await response.json()
    return {
        polledAt: `${polled_at.slice(0, 10)} ${polled_at.slice(11, 16)} UTC`,
        captureErrorPeakPercent: Math.max(...statusSeries(charts, 'capture_5xx_rate', '5xx').map(([, value]) => value)),
        eventLag: latency(charts, 'e2e_events_to_clickhouse_lag'),
        flagResponse: latency(charts, 'feature_flags_response_time'),
    }
}

export async function fetchScaleData(apiKey: string) {
    const [totals, durations, logSizes, mcpClients, status] = await Promise.all([
        runEndpoint('scale_daily_totals', apiKey, ROW_LIMIT),
        runEndpoint('scale_query_durations', apiKey, ROW_LIMIT),
        runEndpoint('scale_log_org_sizes', apiKey, ROW_LIMIT),
        runEndpoint('scale_mcp_clients_daily', apiKey, ROW_LIMIT),
        fetchStatus(),
    ])

    const daysIn = (rows: Row[]) => new Set(rows.map((row) => String(row.day)))
    const otherDays = [daysIn(durations), daysIn(logSizes), daysIn(mcpClients)]
    const completeDays = totals.filter((row) => Number(row.complete) === 1)
    const day = completeDays
        .map((row) => String(row.day))
        .filter((candidate) => isWeekday(candidate) && otherDays.every((days) => days.has(candidate)))
        .sort()
        .pop()
    if (!day) throw new Error('No complete weekday is available in every scale endpoint')

    const dayTotals = completeDays.find((row) => row.day === day) as Row
    const dayDurations = durations.find((row) => row.day === day) as Row
    const dayLogSizes = logSizes.find((row) => row.day === day) as Row
    const date = new Date(`${day}T00:00:00Z`)
    const yesterday = new Date(Date.now() - DAY_MS).toISOString().slice(0, 10)

    return {
        dayLabel: date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC',
        }),
        relativeDay:
            day === yesterday
                ? 'Yesterday'
                : `On ${date.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' })}`,
        totals: {
            rowsRead: Number(dayTotals.rows_read),
            events: Number(dayTotals.events),
            logs: Number(dayTotals.log_records),
            flags: Number(dayTotals.flag_requests),
            mcp: Number(dayTotals.mcp_tool_calls),
            reports: Number(dayTotals.self_driving_reports),
            salesCalls: 0,
        },
        rowsReadSeries: completeDays
            .filter((row) => String(row.day) <= day)
            .sort((a, b) => String(a.day).localeCompare(String(b.day)))
            .slice(-SERIES_DAYS)
            .map((row) => Number(row.rows_read)),
        queryDurations: {
            queries: Number(dayDurations.queries),
            medianMs: Number(dayDurations.median_ms),
            shareUnderOneSecond: Number(dayDurations.share_under_1s),
            counts: (dayDurations.counts as unknown[]).map(Number),
        },
        logOrgSizes: {
            orgs: Number(dayLogSizes.orgs),
            shares: (dayLogSizes.shares as unknown[]).map(Number),
        },
        mcpClients: mcpClients
            .filter((row) => row.day === day)
            .sort((a, b) => Number(a.rank) - Number(b.rank))
            .map((row) => ({ label: String(row.label), share: Number(row.share) })),
        status,
    }
}
