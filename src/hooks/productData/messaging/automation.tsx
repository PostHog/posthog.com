import React from 'react'
import { IconBolt, IconDecisionTree } from '@posthog/icons'
import { LabeledList } from 'components/Products/ReaderViewProduct/helpers'
import type { CarouselSlide } from 'components/Products/ReaderViewProduct/types'

/**
 * Copy on these slides is checked against contents/docs/workflows/{email-drip-campaign,workflow-builder}.mdx.
 * Keep it in line with them when either changes.
 */
const slideStyle = {
    color: 'bg-light dark:bg-dark',
    activeText: 'text-primary',
}

const list = (items: { label: string; description: React.ReactNode }[]) => (
    <div className="@container">
        <LabeledList items={items} />
    </div>
)

export const automation: CarouselSlide[] = [
    {
        ...slideStyle,
        slug: 'drip-campaigns',
        label: 'Drip campaigns',
        icon: <IconDecisionTree className="size-5" />,
        progressBar: 'bg-teal',
        layout: 'stack',
        heading: 'Build a drip campaign from what people do',
        description: (
            <>
                <p>
                    Send a welcome email at sign-up, then a nudge a day later to people who haven't finished onboarding.
                    You build it on a canvas, and branches use the same events and properties as your insights.
                </p>
                {list([
                    {
                        label: 'Trigger on an event',
                        description:
                            'Start the drip campaign from any event PostHog captures, once per person or every time, with a conversion goal and exit conditions.',
                    },
                    {
                        label: 'Wait for the right moment',
                        description:
                            "Add a delay, or wait until a person does something (or doesn't) and branch on the result.",
                    },
                    {
                        label: 'Split the audience',
                        description:
                            'Branch on a property, or split at random to A/B test the message, and compare the metrics for each path.',
                    },
                ])}
            </>
        ),
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_drip_overview_light_74796bb39a.png',
            srcDark:
                'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_drip_overview_dark_384b529650.png',
            alt: 'A drip campaign that sends a welcome email, waits for an upload, then sends a nudge',
        },
    },
    {
        ...slideStyle,
        slug: 'triggers',
        label: 'Triggers',
        icon: <IconBolt className="size-5" />,
        progressBar: 'bg-yellow',
        layout: 'stack',
        heading: 'Start from an event, a cohort, or a schedule',
        description: (
            <>
                <p>
                    A drip campaign starts from something PostHog already knows: an event someone just did, a cohort
                    they joined, or a schedule you set.
                </p>
                {list([
                    {
                        label: 'Events',
                        description:
                            'Any event from any PostHog SDK, filtered by its properties. The person enters the moment it happens.',
                    },
                    {
                        label: 'Audiences',
                        description:
                            'Run a drip campaign for everyone who matches person properties, cohorts, or distinct IDs, with a live estimate of the reach.',
                    },
                    {
                        label: 'Schedules',
                        description:
                            'Daily, weekly, monthly, or yearly, in a timezone you pick, with the next occurrences shown before you enable it.',
                    },
                ])}
            </>
        ),
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_trigger_panel_light_65045a7652.png',
            srcDark:
                'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_trigger_panel_dark_bf54d41ffd.png',
            alt: 'The trigger panel of a drip campaign, set to the signed_up event',
            maxWidth: 'max-w-lg',
        },
    },
]
