import React from 'react'
import { IconDecisionTree, IconMegaphone, IconNotification } from '@posthog/icons'
import Link from 'components/Link'
import { LabeledList } from 'components/Products/ReaderViewProduct/helpers'
import type { CarouselSlide } from 'components/Products/ReaderViewProduct/types'

/**
 * Copy on these slides is checked against contents/docs/workflows/{email-drip-campaign,broadcasts,workflow-builder}.mdx,
 * contents/docs/surveys/creating-surveys.mdx, and contents/docs/feature-flags/creating-feature-flags.mdx.
 * Keep it in line with them when any of them changes.
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

const docsLink = (to: string, children: React.ReactNode) => (
    <Link to={to} className="font-bold underline" state={{ newWindow: true }}>
        {children}
    </Link>
)

const cloudinary = (name: string) => `https://res.cloudinary.com/dmukukwp6/image/upload/${name}.png`

export const campaigns: CarouselSlide[] = [
    {
        ...slideStyle,
        slug: 'drip-campaigns',
        label: 'Campaigns',
        icon: <IconDecisionTree className="size-5" />,
        progressBar: 'bg-teal',
        layout: 'stack',
        heading: 'Build a workflow from what people do',
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
                            'Start the workflow from any event PostHog captures, once per person or every time, with a conversion goal and exit conditions.',
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
        slug: 'broadcasts',
        label: 'Broadcasts',
        icon: <IconMegaphone className="size-5" />,
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'Send to an audience now, later, or every week',
        description: (
            <>
                <p>
                    Pick the audience, write the email, and choose when it goes. PostHog saves a draft as you go, and a
                    recurring broadcast covers a weekly digest.
                </p>
                {list([
                    {
                        label: 'Recipients',
                        description:
                            'Filter by person properties, cohorts, or distinct IDs, and see how many people it reaches before you send. One email per address, even when two people share it.',
                    },
                    {
                        label: 'Schedule',
                        description:
                            'Send now, send later, or recur. Type "every Monday at 9am" and check the next occurrences before you launch. Spread a big send with a sending rate limit.',
                    },
                ])}
            </>
        ),
        image: {
            src: cloudinary('broadcasts_docs_schedule_light_d4b64d361c'),
            srcDark: cloudinary('broadcasts_docs_schedule_dark_92d125a904'),
            alt: 'The Schedule step of a broadcast with a weekly recurring schedule',
        },
    },
    {
        ...slideStyle,
        slug: 'in-app-messaging',
        label: 'In-app messaging',
        icon: <IconNotification className="size-5" />,
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: 'Change what people see in your app',
        description: (
            <>
                <p>
                    A workflow step can{' '}
                    {docsLink('/docs/workflows/workflow-builder#posthog-actions', 'set a person property')}. Target a
                    feature flag or a survey at that property, and the person sees the change the next time they open
                    your app.
                </p>
                {list([
                    {
                        label: 'Pop-ups',
                        description: (
                            <>
                                Target a{' '}
                                {docsLink('/docs/surveys/creating-surveys#display-conditions', 'popover survey')} at the
                                property. A Link/Notification question shows your message and a button in the corner of
                                the screen.
                            </>
                        ),
                    },
                    {
                        label: 'Alerts',
                        description:
                            'Target a feature flag at the property. When the flag is on, your app shows the alert, such as a banner about a failed payment.',
                    },
                    {
                        label: 'Beta features',
                        description: (
                            <>
                                Add the property to the{' '}
                                {docsLink('/docs/feature-flags/creating-feature-flags', 'release conditions')} of the
                                beta's feature flag. The beta turns on for each person when the workflow reaches that
                                step.
                            </>
                        ),
                    },
                ])}
            </>
        ),
    },
]
