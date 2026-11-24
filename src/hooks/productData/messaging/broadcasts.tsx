import React from 'react'
import { IconGraph, IconMegaphone, IconPencil, IconToggle } from '@posthog/icons'
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

export const broadcasts: CarouselSlide[] = [
    {
        ...slideStyle,
        slug: 'broadcasts',
        label: 'Broadcasts',
        icon: <IconMegaphone className="size-5" />,
        progressBar: 'bg-blue',
        layout: 'float',
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
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/broadcasts_schedule_light_5a2d626aff.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/broadcasts_schedule_dark_d66e222027.png',
            alt: 'The Schedule step of a broadcast with a weekly recurring schedule',
        },
    },
    {
        ...slideStyle,
        slug: 'email-editor',
        label: 'Email editor',
        icon: <IconPencil className="size-5" />,
        progressBar: 'bg-blue',
        layout: 'float',
        heading: 'Write emails with templates and merge tags',
        description: (
            <>
                <p>
                    Build emails in the editor or start from a template, then reuse them in any broadcast or drip
                    campaign.
                </p>
                {list([
                    {
                        label: 'Templates',
                        description:
                            'A library of email and drip campaign templates, yours and ours, to start from instead of a blank page.',
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
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/broadcasts_content_light_cd1d4ba1a1.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/broadcasts_content_dark_6b6f0f6e94.png',
            alt: 'The email editor inside a broadcast',
        },
    },
    {
        ...slideStyle,
        slug: 'opt-outs',
        label: 'Opt-outs',
        icon: <IconToggle className="size-5" />,
        progressBar: 'bg-red',
        layout: 'float',
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
                                {docsLink('/docs/messaging/opt-outs', 'Import your opt-out and suppression lists')} and
                                keep them in sync, so nobody hears from you twice after you switch.
                            </>
                        ),
                    },
                ])}
            </>
        ),
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/opt_outs_categories_light_8ffe0244a4.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/opt_outs_categories_dark_f0182f29ef.png',
            alt: 'Message categories and the marketing opt-out list',
        },
    },
    {
        ...slideStyle,
        slug: 'results',
        label: 'Results',
        icon: <IconGraph className="size-5" />,
        progressBar: 'bg-green',
        layout: 'float',
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
                            'Pick an event or a property, such as purchase completed or plan is growth, and see the conversion rate per broadcast and per drip campaign step.',
                    },
                    {
                        label: 'Engagement events',
                        description: (
                            <>
                                Sent, delivered, opened, clicked, bounced, and unsubscribed as{' '}
                                {docsLink('/docs/messaging/engagement-events', 'standard PostHog events')}, for funnels,
                                cohorts, and dashboards.
                            </>
                        ),
                    },
                    {
                        label: 'Per-step metrics',
                        description:
                            'See how many people reached each step of a drip campaign and where they dropped off, with the run log for any one person.',
                    },
                ])}
            </>
        ),
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/broadcasts_results_light_3c9d91807b.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/broadcasts_results_dark_d76c887897.png',
            alt: 'A sent broadcast with delivery, open, click, and conversion numbers',
        },
    },
]
