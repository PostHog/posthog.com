import React from 'react'
import type { ChartProps } from '../charts'
import ActivationTrend, { ACTIVATION_AVERAGES, ACTIVATION_LIFT } from './ActivationTrend'
import ErrorsByRevenue, { TOP_ERROR, TOP_ERROR_VOLUME_RANK, formatRevenue } from './ErrorsByRevenue'
import RetentionByPlan, { PlanLegend, RETENTION_MULTIPLE } from './RetentionByPlan'
import RevenueRetention from './RevenueRetention'
import TrialFunnel, { TRIAL_FUNNEL_WORST_DROP } from './TrialFunnel'

export type Asker = 'posthog-ai' | 'mcp'

export interface Insight {
    key: string
    title: string
    meta: React.ReactNode
    question: string
    asker: Asker
    sources: string
    duration: string
    takeaway: React.ReactNode
    Chart: React.ComponentType<ChartProps>
    chartHeight: number
    className?: string
}

const ordinal = (value: number): string => `${value}${['th', 'st', 'nd', 'rd'][value] ?? 'th'}`

export const INSIGHTS: Insight[] = [
    {
        key: 'funnel',
        title: 'Trial to paid',
        meta: 'last 30 days',
        question: 'Where do trial users drop off before they pay?',
        asker: 'posthog-ai',
        sources: 'events',
        duration: '284 ms',
        takeaway: (
            <>
                <strong className="text-primary">
                    {TRIAL_FUNNEL_WORST_DROP} of teams stall before connecting Stripe.
                </strong>{' '}
                It&apos;s the biggest leak in the funnel, so fix it first.
            </>
        ),
        Chart: TrialFunnel,
        chartHeight: 200,
        className: '@2xl:col-span-2',
    },
    {
        key: 'revenue-retention',
        title: 'Net revenue retention',
        meta: 'trailing 12 months',
        question: 'How is net revenue retention trending?',
        asker: 'posthog-ai',
        sources: 'stripe.invoices',
        duration: '143 ms',
        takeaway: (
            <>
                <strong className="text-primary">Expansion is outrunning churn.</strong> Usage-based upgrades drove most
                of the gain.
            </>
        ),
        Chart: RevenueRetention,
        chartHeight: 150,
    },
    {
        key: 'activation',
        title: 'Weekly activation',
        meta: ACTIVATION_AVERAGES,
        question: 'Did the new onboarding move activation?',
        asker: 'posthog-ai',
        sources: 'events ⋈ annotations',
        duration: '198 ms',
        takeaway: (
            <>
                <strong className="text-primary">
                    Activation is up {ACTIVATION_LIFT} since v2 onboarding shipped.
                </strong>{' '}
                Keep it.
            </>
        ),
        Chart: ActivationTrend,
        chartHeight: 150,
    },
    {
        key: 'retention',
        title: 'Retention by plan',
        meta: <PlanLegend />,
        question: 'Which plan keeps customers around longest?',
        asker: 'mcp',
        sources: 'events ⋈ persons',
        duration: '356 ms',
        takeaway: (
            <>
                <strong className="text-primary">Team accounts retain {RETENTION_MULTIPLE} better than Free.</strong>{' '}
                Nudge new teams to invite early.
            </>
        ),
        Chart: RetentionByPlan,
        chartHeight: 150,
    },
    {
        key: 'errors',
        title: 'Errors by revenue at risk',
        meta: 'volume → MRR',
        question: 'Which errors cost us the most revenue?',
        asker: 'mcp',
        sources: 'exceptions ⋈ stripe.subscriptions',
        duration: '412 ms',
        takeaway: (
            <>
                <strong className="text-primary">
                    One checkout error puts {formatRevenue(TOP_ERROR.revenue)} MRR at risk.
                </strong>{' '}
                By volume, it ranks {ordinal(TOP_ERROR_VOLUME_RANK)}.
            </>
        ),
        Chart: ErrorsByRevenue,
        chartHeight: 150,
    },
]

export const ASK_ORDER = ['funnel', 'errors', 'activation', 'retention', 'revenue-retention']
