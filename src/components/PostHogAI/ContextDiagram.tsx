import React from 'react'
import { useReducedMotion } from 'framer-motion'
import TabbedCarousel from 'components/TabbedCarousel'
import AskAnythingDemo, { type DemoScenario } from 'components/Home/HeroCarousel/AskAnythingDemo'

const scenarios: { value: string; label: string; scenario: DemoScenario }[] = [
    {
        value: 'conversion',
        label: 'Conversion',
        scenario: {
            question: 'Why are people leaving checkout?',
            intro: 'I’ll compare the funnel, errors, and replays, then check the code.',
            tools: [
                {
                    handle: 'product_analytics',
                    label: 'Product analytics',
                    action: 'Compare checkout_started to order_completed',
                    result: 'Drop-off on mobile Safari',
                },
                {
                    handle: 'error_tracking',
                    label: 'Error tracking',
                    action: 'Find errors in the payment form',
                    result: 'Exceptions on submit, mobile Safari',
                },
                {
                    handle: 'session_replay',
                    label: 'Session replay',
                    action: 'Watch the affected sessions',
                    result: 'Repeated submit clicks, no confirmation',
                },
                {
                    slug: 'github',
                    label: 'GitHub',
                    action: 'Review recent checkout changes',
                    result: 'The submit handler changed last week',
                },
            ],
            conclusion: {
                title: 'Mobile Safari users cannot submit payment.',
                body: 'A recent change to the submit handler throws an error on mobile Safari.',
                next: 'Fix the submit handler.',
            },
            summary:
                'Illustrative demo: PostHog AI investigates checkout drop-off using funnels, errors, session replays, and GitHub changes. It finds that a recent submit handler change fails on mobile Safari. All findings are sample data.',
        },
    },
    {
        value: 'activation',
        label: 'Activation',
        scenario: {
            question: 'Is the new onboarding ready for more users?',
            intro: 'I’ll check the flag, the experiment, and errors in the new variant.',
            tools: [
                {
                    handle: 'feature_flags',
                    label: 'Feature flags',
                    action: 'Check the new_onboarding rollout',
                    result: 'Live for 20% of new users',
                },
                {
                    handle: 'experiments',
                    label: 'Experiments',
                    action: 'Read the experiment results',
                    result: 'More signups reach a first project',
                },
                {
                    handle: 'error_tracking',
                    label: 'Error tracking',
                    action: 'Look for errors in the new variant',
                    result: 'No new exceptions',
                },
                {
                    slug: 'github',
                    label: 'GitHub',
                    action: 'Review the flag checks in code',
                    result: 'The flag guards every new step',
                },
            ],
            conclusion: {
                title: 'The new onboarding looks ready for more users.',
                body: 'Activation is up, and the variant adds no new errors.',
                next: 'Raise the rollout to 50%.',
            },
            summary:
                'Illustrative demo: PostHog AI checks a feature flag rollout using the flag, experiment results, error tracking, and GitHub code. It finds higher activation with no new errors. All findings are sample data.',
        },
    },
    {
        value: 'churn',
        label: 'Churn',
        scenario: {
            question: 'Which renewing accounts need a closer look?',
            intro: 'I’ll join billing, usage, and support data by account.',
            tools: [
                {
                    slug: 'stripe',
                    label: 'Stripe',
                    action: 'Find subscriptions that renew in 30 days',
                    result: '14 accounts renew this month',
                },
                {
                    handle: 'product_analytics',
                    label: 'Product analytics',
                    action: 'Compare weekly active members',
                    result: '5 use it less than last month',
                },
                {
                    slug: 'zendesk',
                    label: 'Zendesk',
                    action: 'Check open support tickets',
                    result: '3 have unresolved tickets',
                },
                {
                    slug: 'hubspot',
                    label: 'HubSpot',
                    action: 'Check the last contact date',
                    result: '2 have had no contact in 60 days',
                },
            ],
            conclusion: {
                title: 'Three accounts need attention before renewal.',
                body: 'Their usage is down and they have open support tickets.',
                next: 'Send the list to the account owners.',
            },
            summary:
                'Illustrative demo: PostHog AI reviews renewing accounts using Stripe subscriptions, product usage, Zendesk tickets, and HubSpot contact dates. It finds three accounts with falling usage and open tickets. All findings are sample data.',
        },
    },
]

export default function ContextDiagram(): JSX.Element {
    const reducedMotion = useReducedMotion()
    const tabs = scenarios.map(({ value, label, scenario }) => ({
        value,
        label,
        color: 'bg-accent',
        activeText: 'text-primary',
        progressBar: 'bg-red dark:bg-yellow',
        triggerClassName: '!min-w-0 !order-none !px-2',
        content: <AskAnythingDemo scenario={scenario} />,
    }))

    return (
        <figure
            aria-label="Product context workflows"
            className="m-0 min-w-0 [&_.ai-demo-chat-heading>span:last-child]:!mr-[9cqw]"
        >
            <figcaption className="sr-only">Three sample workflows · illustrative data</figcaption>
            {/* The demo runs 20 seconds, so each slide stays up for 22 */}
            <TabbedCarousel
                tabs={tabs}
                slideDuration={22000}
                paused={!!reducedMotion}
                pauseOnFocus
                showActiveBg={false}
                slideClassName="!min-h-0 !p-0 [&>div]:!shadow-none"
            />
        </figure>
    )
}
