import React from 'react'
import { IconGraph, IconMegaphone, IconPencil, IconPeople, IconToggle } from '@posthog/icons'
import Link from 'components/Link'
import { InlineCode, LabeledList } from 'components/Products/ReaderViewProduct/helpers'
import type { CarouselSlide } from 'components/Products/ReaderViewProduct/types'

/**
 * Copy on these slides is checked against contents/docs/workflows/{broadcasts,email-drip-campaign,workflow-builder,opt-outs,library,engagement-events,configure-channels}.mdx.
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

export const broadcasts: CarouselSlide[] = [
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
                    {
                        label: 'Goal',
                        description:
                            'Set a conversion goal, such as a sign-up or a purchase, and the broadcast page counts the recipients who did it.',
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
        slug: 'audiences',
        label: 'Audiences',
        icon: <IconPeople className="size-5" />,
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: 'Target the people you already track',
        description: (
            <>
                <p>
                    You email the same people you see in your analytics, so there's no list to upload and no sync job to
                    keep running.
                </p>
                {list([
                    {
                        label: 'Person properties',
                        description:
                            'Plan, sign-up date, company, or anything you set with identify(), as an audience filter or a branch condition.',
                    },
                    {
                        label: 'Events',
                        description:
                            'Start a campaign from an event, filtered by its properties, the moment it happens.',
                    },
                    {
                        label: 'Cohorts',
                        description:
                            'The cohorts you built in PostHog, as a broadcast audience or a cohort branch inside a campaign.',
                    },
                ])}
            </>
        ),
    },
    {
        ...slideStyle,
        slug: 'email-editor',
        label: 'Email editor',
        icon: <IconPencil className="size-5" />,
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'Write emails with templates and merge tags',
        description: (
            <>
                <p>
                    Build emails in the editor or start from a template, then reuse them in any broadcast or sequence.
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
                            'Pick an event or a property, such as purchase completed or plan is growth, and see the conversion rate per campaign and per step.',
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
                            'See how many people reached each step of a campaign and where they dropped off, with the run log for any one person.',
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
]
