import React from 'react'
import { IconBolt, IconDecisionTree } from '@posthog/icons'
import { LabeledList } from 'components/Products/ReaderViewProduct/helpers'
import type { CarouselSlide } from 'components/Products/ReaderViewProduct/types'
import { keyFeatures } from './slides'

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

const cloudinary = (name: string) => `https://res.cloudinary.com/dmukukwp6/image/upload/${name}.png`

export const automation: CarouselSlide[] = [
    {
        ...slideStyle,
        slug: 'drip-campaigns',
        label: 'Drip campaigns',
        icon: <IconDecisionTree className="size-5" />,
        progressBar: 'bg-teal',
        layout: 'stack',
        heading: 'Sequences that follow what a person does',
        description: (
            <>
                <p>
                    A welcome email when someone signs up, then a nudge a day later for the ones who haven't finished
                    onboarding. You build it on a canvas, and the branches use the same events and properties as your
                    insights.
                </p>
                {list([
                    {
                        label: 'Trigger on an event',
                        description:
                            'Start the sequence from any event PostHog captures, once per person or every time, with a conversion goal and exit conditions.',
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
            src: cloudinary('email_drip_overview_light_a84567a8f9'),
            srcDark: cloudinary('email_drip_overview_dark_2bb57406d6'),
            alt: 'A drip campaign on the workflow canvas',
        },
    },
    {
        ...slideStyle,
        slug: 'triggers',
        label: 'Triggers',
        icon: <IconBolt className="size-5" />,
        progressBar: 'bg-yellow',
        layout: 'stack',
        heading: 'Triggers: an event, a cohort, or a schedule',
        description: (
            <>
                <p>
                    Every message starts from something PostHog already knows: an event a person just did, a cohort they
                    joined, or a schedule you set.
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
                            'Run a workflow for everyone who matches person properties, cohorts, or distinct IDs, with a live estimate of the reach.',
                    },
                    {
                        label: 'Schedules',
                        description:
                            'Daily, weekly, monthly, or yearly, in a timezone you pick, with the next occurrences shown before you enable it.',
                    },
                ])}
            </>
        ),
    },
    ...keyFeatures.filter((slide) => slide.slug !== 'messaging'),
]
