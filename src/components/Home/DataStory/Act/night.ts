import { SERIES } from '../charts'
import type { Series } from '../charts'

export type Lane = 'scouts' | 'errors' | 'replay' | 'support' | 'billing'

export interface Signal {
    lane: Lane
    minute: number
    label: string
    report?: number
}

export interface Report {
    title: string
    impact: string
    series: Series
    formedAt: number
}

export const NIGHT_START_HOUR = 18
export const NIGHT_MINUTES = 15 * 60

const atClock = (hour: number, minute: number): number =>
    (((hour - NIGHT_START_HOUR + 24) % 24) * 60 + minute) % (24 * 60)

export const LANES: { lane: Lane; label: string; singular: string; plural: string }[] = [
    { lane: 'scouts', label: 'Scouts', singular: 'scout finding', plural: 'scout findings' },
    { lane: 'errors', label: 'Errors', singular: 'error', plural: 'errors' },
    { lane: 'replay', label: 'Replays', singular: 'replay', plural: 'replays' },
    { lane: 'support', label: 'Support', singular: 'ticket', plural: 'tickets' },
    { lane: 'billing', label: 'Stripe', singular: 'failed payment', plural: 'failed payments' },
]

export const REPORTS: Report[] = [
    {
        title: 'Checkout throws a 500 for saved EU cards',
        impact: '41 users blocked · $3.2k MRR at risk',
        series: SERIES.blue,
        formedAt: atClock(22, 0),
    },
    {
        title: 'Annual renewals fail when the saved card has expired',
        impact: '7 accounts · $11k ARR due this week',
        series: SERIES.orange,
        formedAt: atClock(3, 5),
    },
    {
        title: 'Mobile signups stall at the CSV import step',
        impact: 'Mobile signups down 18% since v2.4',
        series: SERIES.purple,
        formedAt: atClock(7, 5),
    },
]

export const SCOUT_RUNS = Array.from({ length: 14 }, (_, index) => atClock(19 + index, 0))

export const SIGNALS: Signal[] = [
    { lane: 'errors', minute: atClock(19, 40), label: '500 on POST /checkout', report: 0 },
    { lane: 'errors', minute: atClock(20, 10), label: '500 on POST /checkout', report: 0 },
    { lane: 'billing', minute: atClock(20, 15), label: 'Refund issued' },
    { lane: 'replay', minute: atClock(20, 30), label: 'Rage clicks on Pay', report: 0 },
    { lane: 'errors', minute: atClock(21, 5), label: '500 on POST /checkout', report: 0 },
    { lane: 'support', minute: atClock(21, 50), label: '"My card keeps failing"', report: 0 },
    { lane: 'errors', minute: atClock(22, 40), label: 'ResizeObserver loop limit' },
    { lane: 'replay', minute: atClock(23, 30), label: 'Slow page load on /settings' },
    { lane: 'billing', minute: atClock(0, 20), label: 'Renewal failed: card expired', report: 1 },
    { lane: 'billing', minute: atClock(1, 10), label: 'Renewal failed: card expired', report: 1 },
    { lane: 'support', minute: atClock(1, 30), label: 'Feature request: dark mode' },
    { lane: 'support', minute: atClock(2, 5), label: '"Why was I downgraded?"', report: 1 },
    { lane: 'billing', minute: atClock(2, 40), label: 'Renewal failed: card expired', report: 1 },
    { lane: 'scouts', minute: atClock(3, 0), label: 'Renewal failures up 4× week over week', report: 1 },
    { lane: 'replay', minute: atClock(4, 10), label: 'Dead clicks on Import CSV', report: 2 },
    { lane: 'errors', minute: atClock(4, 30), label: 'ChunkLoadError: settings.js' },
    { lane: 'replay', minute: atClock(5, 20), label: 'Dead clicks on Import CSV', report: 2 },
    { lane: 'errors', minute: atClock(5, 50), label: 'CSVParseError on iOS Safari', report: 2 },
    { lane: 'support', minute: atClock(6, 10), label: 'Password reset question' },
    { lane: 'replay', minute: atClock(6, 35), label: 'Dead clicks on Import CSV', report: 2 },
    { lane: 'scouts', minute: atClock(7, 0), label: 'Mobile signup conversion down 18%', report: 2 },
    { lane: 'replay', minute: atClock(8, 5), label: 'Rage click on Settings' },
]

export const evidenceFor = (report: number): string =>
    LANES.map(({ lane, singular, plural }) => {
        const count = SIGNALS.filter((signal) => signal.report === report && signal.lane === lane).length
        return count === 0 ? null : `${count} ${count === 1 ? singular : plural}`
    })
        .filter(Boolean)
        .join(' · ')

export function formatClock(minute: number): string {
    const totalMinutes = (NIGHT_START_HOUR * 60 + Math.round(minute)) % (24 * 60)
    const hour = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    const meridiem = hour >= 12 ? 'pm' : 'am'
    const displayHour = hour % 12 === 0 ? 12 : hour % 12
    return minutes === 0
        ? `${displayHour} ${meridiem}`
        : `${displayHour}:${String(minutes).padStart(2, '0')} ${meridiem}`
}
