import React from 'react'
import { useReducedMotion } from 'framer-motion'
import { IconCheck } from '@posthog/icons'
import TabbedCarousel from 'components/TabbedCarousel'
import ProductIcon from 'components/PostHogAI/ProductIcon'
import useProduct from 'hooks/useProduct'
import { LOGOS } from 'constants/logos'

const workflows = [
    {
        value: 'checkout',
        label: 'Checkout',
        question: 'Why are people leaving checkout?',
        definition: 'Completed checkout = payment within 24 hours of starting',
        steps: [
            {
                handle: 'product_analytics',
                evidence: 'checkout_started → order_completed · by browser',
            },
            {
                handle: 'error_tracking',
                evidence: 'Payment form exceptions · mobile Safari',
            },
            {
                handle: 'session_replay',
                evidence: 'Repeated submit clicks, with no order confirmation',
            },
            {
                handle: 'github',
                evidence: 'CheckoutForm.tsx · submit handler and recent changes',
            },
        ],
        query: `SELECT properties.$browser AS browser,
    uniq(person_id) AS affected_users
FROM events
WHERE event = 'checkout_error'
  AND timestamp >= now() - INTERVAL 7 DAY
GROUP BY browser
ORDER BY affected_users DESC`,
        action: 'Review the error and replay evidence. Prepare a fix for review if the code confirms the cause.',
    },
    {
        value: 'renewals',
        label: 'Renewals',
        question: 'Which renewing accounts need a closer look?',
        definition: 'Active team = at least 3 members using the product each week',
        steps: [
            {
                handle: 'data_warehouse',
                evidence: 'Stripe subscriptions + HubSpot account records',
            },
            {
                handle: 'product_analytics',
                evidence: 'Weekly active members · this month vs. last month',
            },
            {
                handle: 'surveys',
                evidence: 'Survey responses linked to the same accounts',
            },
            {
                handle: 'notebooks',
                evidence: 'Account list + usage trends + source responses',
            },
        ],
        query: `SELECT properties.account_id AS account,
    uniq(person_id) AS active_members
FROM events
WHERE timestamp >= now() - INTERVAL 7 DAY
GROUP BY account
HAVING active_members < 3
ORDER BY active_members ASC`,
        action: 'Review accounts with falling usage and their feedback. A quiet account is a reason to ask, not a churn prediction.',
    },
    {
        value: 'rollout',
        label: 'Rollouts',
        question: 'Is the new onboarding ready for more users?',
        definition: 'Activated = first project created within 7 days of signup',
        steps: [
            {
                handle: 'feature_flags',
                evidence: 'new_onboarding · variants and rollout conditions',
            },
            {
                handle: 'experiments',
                evidence: 'Signup → first project · uncertainty included',
            },
            {
                handle: 'error_tracking',
                evidence: 'Exceptions linked to the new onboarding variant',
            },
            {
                handle: 'github',
                evidence: 'Onboarding.tsx · flag checks and changed paths',
            },
        ],
        query: `SELECT properties.$feature_flag_response AS variant,
    uniq(person_id) AS exposed_users
FROM events
WHERE event = '$feature_flag_called'
  AND properties.$feature_flag = 'new_onboarding'
  AND timestamp >= now() - INTERVAL 7 DAY
GROUP BY variant`,
        action: 'Review the experiment results and affected sessions before changing exposure. The flag stays in your hands.',
    },
]

export default function ContextDiagram(): JSX.Element {
    const products = useProduct()
    const reducedMotion = useReducedMotion()
    const tabs = workflows.map(({ value, label, question, definition, steps, query, action }) => ({
        value,
        label,
        color: 'bg-accent',
        activeText: 'text-primary',
        progressBar: 'bg-red dark:bg-yellow',
        triggerClassName: '!min-w-0 !order-none !px-2',
        content: (
            <div className="flex h-full flex-col">
                <div className="border-b border-primary px-5 py-4 pr-14">
                    <h3 className="m-0 text-xl font-bold leading-snug">“{question}”</h3>
                </div>
                <div className="flex flex-1 flex-col px-5 pb-4 pt-3">
                    <div className="flex items-start gap-2 border-b border-primary pb-3 text-sm">
                        <IconCheck className="mt-0.5 size-4 shrink-0 text-green" />
                        <p className="m-0">{definition}</p>
                    </div>
                    <ol className="my-4 list-none p-0">
                        {steps.map(({ handle, evidence }, index) => {
                            const product = Array.isArray(products)
                                ? products.find((item) => item.handle === handle)
                                : null
                            return (
                                <li key={handle} className="relative flex gap-3 pb-3 last:pb-0">
                                    {index < steps.length - 1 && (
                                        <span
                                            aria-hidden="true"
                                            className="absolute bottom-0 left-4 top-8 border-l border-dashed border-primary"
                                        />
                                    )}
                                    <span className="relative flex size-8 shrink-0 items-center justify-center rounded border border-primary bg-primary">
                                        {handle === 'github' ? (
                                            <img src={LOGOS.github} alt="" className="size-5 dark:invert" />
                                        ) : (
                                            <ProductIcon product={product} className="size-5" />
                                        )}
                                    </span>
                                    <div className="min-w-0">
                                        <p className="m-0 text-sm font-semibold">
                                            {handle === 'github' ? 'GitHub' : product?.name}
                                        </p>
                                        <p className="mb-0 mt-0.5 text-xs text-secondary">{evidence}</p>
                                    </div>
                                </li>
                            )
                        })}
                    </ol>
                    <details className="border-t border-primary py-2 text-xs">
                        <summary className="cursor-pointer font-semibold">
                            Show SQL <span className="font-normal text-secondary">· sample data</span>
                        </summary>
                        <pre className="mb-0 overflow-x-auto text-xs">
                            <code>{query}</code>
                        </pre>
                    </details>
                    <p className="mb-0 mt-auto border-t border-primary pt-3 text-sm text-secondary">{action}</p>
                </div>
            </div>
        ),
    }))

    return (
        <figure
            aria-label="Product context workflows"
            className="m-0 flex h-full min-w-0 flex-col rounded-md border border-primary bg-primary"
        >
            <figcaption className="sr-only">Three sample workflows · illustrative data</figcaption>
            <TabbedCarousel
                tabs={tabs}
                slideDuration={10000}
                paused={!!reducedMotion}
                pauseOnFocus
                showActiveBg={false}
                className="flex-1 [&>div]:h-full [&>div>div:last-child]:flex-1"
                slideClassName="!min-h-0 !p-0 [&>div]:!shadow-none"
            />
        </figure>
    )
}
