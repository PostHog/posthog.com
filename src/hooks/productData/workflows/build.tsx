import React from 'react'
import { IconBolt, IconGraph, IconPencil, IconToggle } from '@posthog/icons'
import Link from 'components/Link'
import { InlineCode, LabeledList } from 'components/Products/ReaderViewProduct/helpers'
import type { CarouselSlide } from 'components/Products/ReaderViewProduct/types'
import { keyFeatures } from './slides'

/**
 * Copy on these slides is checked against contents/docs/workflows/{workflow-builder,configure-channels,library,opt-outs,engagement-events,broadcasts}.mdx.
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

const docsLink = (to: string, children: React.ReactNode) => (
    <Link to={to} className="font-bold underline" state={{ newWindow: true }}>
        {children}
    </Link>
)

const cloudinary = (name: string) => `https://res.cloudinary.com/dmukukwp6/image/upload/${name}.png`

export const build: CarouselSlide[] = [
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
                    A workflow starts from something PostHog already knows: an event someone just did, a cohort they
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
    ...keyFeatures.filter((slide) => slide.slug === 'channels'),
    {
        ...slideStyle,
        slug: 'email-editor',
        label: 'Editor',
        icon: <IconPencil className="size-5" />,
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'Write emails with templates and merge tags',
        description: (
            <>
                <p>
                    Build emails in the editor or start from a template, then reuse them in any broadcast or workflow.
                </p>
                {list([
                    {
                        label: 'Templates',
                        description:
                            'A library of email and workflow templates, yours and ours, to start from instead of a blank page.',
                    },
                    {
                        label: 'Merge tags and Liquid',
                        description: (
                            <>
                                Personalize with <InlineCode>{'{{ person.properties.first_name }}'}</InlineCode>, event
                                properties, and Liquid logic for defaults and conditions.
                            </>
                        ),
                    },
                    {
                        label: 'Test sends',
                        description:
                            'Send the email to yourself with real person data before anyone in the audience sees it.',
                    },
                ])}
            </>
        ),
        image: {
            src: cloudinary('broadcasts_docs_content_light_44734105fd'),
            srcDark: cloudinary('broadcasts_docs_content_dark_a59e59442c'),
            alt: 'The email editor inside a broadcast',
        },
    },
    {
        ...slideStyle,
        slug: 'results',
        label: 'Results',
        icon: <IconGraph className="size-5" />,
        progressBar: 'bg-green',
        layout: 'stack',
        heading: 'See who converted after a broadcast',
        description: (
            <>
                <p>
                    Every send is an event on the person, so you can see who upgraded after the email in a funnel, the
                    same way you check any other step.
                </p>
                {list([
                    {
                        label: 'Conversion goals',
                        description:
                            'Pick an event or a property, such as purchase completed or plan is growth, and see the conversion rate per broadcast and per workflow step.',
                    },
                    {
                        label: 'Engagement events',
                        description: (
                            <>
                                Sent, delivered, opened, clicked, bounced, and unsubscribed as{' '}
                                {docsLink('/docs/workflows/engagement-events', 'standard PostHog events')}, for funnels,
                                cohorts, and dashboards.
                            </>
                        ),
                    },
                    {
                        label: 'Per-step metrics',
                        description:
                            'See how many people reached each step of a workflow and where they dropped off, with the run log for any one person.',
                    },
                ])}
            </>
        ),
        image: {
            src: cloudinary('broadcasts_docs_results_light_9a00756ef5'),
            srcDark: cloudinary('broadcasts_docs_results_dark_5aba53c8ef'),
            alt: 'A sent broadcast with delivery, open, click, and conversion numbers',
        },
    },
    {
        ...slideStyle,
        slug: 'opt-outs',
        label: 'Opt-outs',
        icon: <IconToggle className="size-5" />,
        progressBar: 'bg-red',
        layout: 'stack',
        heading: 'Let people opt out of one category at a time',
        description: (
            <>
                <p>
                    Someone can turn off your newsletter and still get their receipts. Message categories keep the two
                    apart, and PostHog checks them on every send.
                </p>
                {list([
                    {
                        label: 'Message categories',
                        description:
                            'Marketing or transactional, with a public description recipients see on the preferences page. Pick one per message step.',
                    },
                    {
                        label: 'Unsubscribe built in',
                        description: (
                            <>
                                One-click unsubscribe from the mail client, and a preferences page behind{' '}
                                <InlineCode>{'{{ unsubscribe_url }}'}</InlineCode>. Each opt-out is an event you can
                                query.
                            </>
                        ),
                    },
                    {
                        label: 'Bring your lists',
                        description: (
                            <>
                                Moving from Customer.io, Braze, Brevo, or anywhere else?{' '}
                                {docsLink('/docs/workflows/opt-outs', 'Import your opt-out and suppression lists')} and
                                keep them in sync, so nobody hears from you twice after you switch.
                            </>
                        ),
                    },
                ])}
            </>
        ),
    },
]
