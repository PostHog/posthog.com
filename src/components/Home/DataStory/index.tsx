import React from 'react'

const STEPS = [
    {
        title: 'Get the data in',
        description:
            'PostHog collects events, replays, errors, surveys, and logs from your product, and aggregates revenue, CRM, and support data from Stripe, HubSpot, Zendesk, and 900+ other tools.',
    },
    {
        title: 'Query the data with your agent',
        description:
            'Every source attaches to the same person. Ask PostHog AI or your own agent why a customer churned, and it follows the trail from the refund to the error to the replay.',
    },
    {
        title: 'Give the data to your agent to act on',
        description:
            'Scouts watch your data overnight and file reports in your Inbox. Each report carries the replays, errors, and revenue behind it, so your agent can pick it up and start.',
    },
    {
        title: 'Let PostHog self-drive',
        description:
            'PostHog writes the PR, ships it behind a feature flag, and measures it with an experiment. The results go back into step 1, and the loop starts again.',
    },
]

export const ProblemSection = (): JSX.Element => (
    <section>
        <h2>Knowing what users want is now the hardest part of building software</h2>
        <p>Most users never tell you. Don't believe us? Tell us one thing PostHog should fix.</p>
    </section>
)

export const StepsSection = (): JSX.Element => (
    <section>
        <h2>How to build a usage-informed product with PostHog</h2>
        {STEPS.map(({ title, description }, index) => (
            <div key={title}>
                <h3>
                    {index + 1}. {title}
                </h3>
                <p>{description}</p>
            </div>
        ))}
    </section>
)
