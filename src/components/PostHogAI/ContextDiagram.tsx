import React from 'react'
import { useReducedMotion } from 'framer-motion'
import TabbedCarousel from 'components/TabbedCarousel'
import ThreadMockup, { type ThreadScenario } from 'components/PostHogAI/ThreadMockup'

const scenarios: { value: string; label: string; scenario: ThreadScenario }[] = [
    {
        value: 'conversion',
        label: 'Conversion',
        scenario: {
            question: 'Why did upgrades drop after the billing redesign?',
            toolCalls: 7,
            calls: [
                {
                    tool: 'execute-sql',
                    detail: 'Comparing upgrade rate by billing page layout and plan toggle',
                },
            ],
            table: {
                head: ['Layout', 'Viewed', 'Upgraded', 'Rate'],
                rows: [
                    ['Old page', '5,120', '410', '8.0%'],
                    ['New, annual first', '3,980', '175', '4.4%'],
                    ['New, monthly', '1,280', '117', '9.1%'],
                ],
            },
            intro: 'The redesign cost you about a quarter of upgrades. Here’s what I found:',
            bullets: [
                { lead: 'Upgrades fell from 8.0% to 5.9%.', text: 'The drop starts with the new page.' },
                { lead: 'Annual is the new default.', text: 'Switchers to monthly convert at 9.1%.' },
                { lead: 'Replays show price shock.', text: '9 of 12 left within 20 seconds.' },
            ],
            ending: {
                type: 'notebook',
                recommendation: 'Default to monthly, then test annual as a toggle.',
                notebook: 'Billing page upgrade drop after the annual-first redesign',
            },
            summary:
                'Illustrative conversation: PostHog AI investigates a drop in billing page upgrades using SQL, the data schema, and session replays. It finds that an annual-first default hurts conversion, recommends a change, and offers to save the work as a notebook. All findings are sample data.',
        },
    },
    {
        value: 'activation',
        label: 'Activation',
        scenario: {
            question: 'Is the new onboarding ready for more users?',
            toolCalls: 5,
            calls: [
                { tool: 'experiment-results-get', detail: 'Reading results for the new_onboarding experiment' },
                { tool: 'query-error-tracking-issues', detail: 'Comparing errors between control and test' },
                { tool: 'feature-flag-get-definition', detail: 'Checking the rollout of new-onboarding' },
            ],
            insight: {
                title: 'Created a first project, by variant',
                legend: [
                    { label: 'Control', value: '31.2%' },
                    { label: 'Test', value: '34.1%' },
                ],
                series: [
                    [29.1, 30.4, 29.8, 30.9, 30.2, 31.0, 30.7, 31.4, 30.9, 31.5, 31.0, 31.3, 31.1, 31.2],
                    [29.6, 31.2, 31.0, 32.4, 32.1, 33.0, 32.6, 33.5, 33.1, 33.9, 33.6, 34.0, 33.8, 34.1],
                ],
            },
            intro: 'The test variant looks ready. Here’s what I found:',
            bullets: [
                {
                    lead: 'Activation is up.',
                    text: '34.1% made a first project, up from 31.2%.',
                },
                { lead: 'The variant adds no errors.', text: 'The error rate matches control.' },
                {
                    lead: 'The rollout is small.',
                    text: 'The flag is live for 20% of new users.',
                },
            ],
            ending: {
                type: 'offer',
                recommendation: 'Raise the rollout to 50%.',
                offer: 'Should I schedule that for Monday, with an error rate alert?',
            },
            summary:
                'Illustrative conversation: PostHog AI checks a feature flag rollout using experiment results, error tracking, and the flag definition. It finds higher activation with no new errors, recommends a larger rollout, and offers to schedule it with an alert. All findings are sample data.',
        },
    },
    {
        value: 'churn',
        label: 'Churn',
        scenario: {
            question: 'Which renewing accounts need a closer look?',
            toolCalls: 3,
            calls: [
                { tool: 'read-data-warehouse-schema', detail: 'Listing Stripe and Zendesk tables' },
                { tool: 'read-data-schema', detail: 'Checking usage events by account' },
            ],
            table: {
                source: 'Schema',
                head: ['Source', 'Field', 'Holds'],
                rows: [
                    ['Stripe', 'current_period_end', 'Plan renewal'],
                    ['Stripe', 'cancel_at', 'Set cancellation'],
                    ['Zendesk', 'status', 'Ticket state'],
                    ['Zendesk', 'updated_at', 'Last contact'],
                ],
            },
            intro: 'The data’s here, but “closer look” is open. I need four details:',
            bullets: [
                { lead: 'Which renewal date?', text: 'Stripe has two to pick from.' },
                { lead: 'What’s a risk signal?', text: 'Falling usage, open tickets, or both.' },
                { lead: 'Which accounts?', text: 'All of them, or only plans above a set price.' },
                { lead: 'How far ahead?', text: 'Renewals in the next 30, 60, or 90 days.' },
            ],
            ending: { type: 'ask', closing: 'Reply with these and I’ll build the list.' },
            summary:
                'Illustrative conversation: PostHog AI looks at the Stripe, Zendesk, and usage data it can reach. The question is open, so it asks which renewal date, which risk signal, which accounts, and how far ahead to look before it runs a query.',
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
        content: <ThreadMockup scenario={scenario} />,
    }))

    return (
        <figure className="m-0 min-w-0">
            <figcaption className="sr-only">Three sample conversations · illustrative data</figcaption>
            {/* Long enough to read a whole conversation before the next one appears */}
            <TabbedCarousel
                tabs={tabs}
                slideDuration={15000}
                paused={!!reducedMotion}
                pauseOnFocus
                variant="flush"
                showActiveBg={false}
            />
        </figure>
    )
}
