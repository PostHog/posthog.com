import React from 'react'
import { IconBolt, IconMagic, IconRewindPlay } from '@posthog/icons'
import { LabeledList } from 'components/Products/ReaderViewProduct/helpers'
import type { CarouselSlide } from 'components/Products/ReaderViewProduct/types'

/**
 * What an email-only tool can't do, because it has no product data.
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

export const standout: CarouselSlide[] = [
    {
        ...slideStyle,
        slug: 'what-happened-next',
        label: 'What happened next',
        icon: <IconRewindPlay className="size-5" />,
        progressBar: 'bg-yellow',
        layout: 'stack',
        heading: 'See what each person did around your email',
        description: (
            <>
                <p>
                    An email tool tells you an email was opened. PostHog shows what the person did before and after it,
                    because the email and the product share one set of events.
                </p>
                {list([
                    {
                        label: 'Before and after',
                        description:
                            'Open any send and see what the recipient did in the 7 days before and after it, with the page and session of each event.',
                    },
                    {
                        label: 'Watch the session',
                        description: 'Jump from a click in an email to the session replay that followed it.',
                    },
                    {
                        label: 'Ask your agent',
                        description:
                            'The same activity is on the MCP, so your agent can check if a reset email got someone back in.',
                    },
                ])}
            </>
        ),
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/pp_recipient_activity_light_228eeaada5.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/pp_recipient_activity_dark_93b1987f6e.png',
            alt: "One send of a transactional email, with the recipient's events before and after it",
        },
    },
    {
        ...slideStyle,
        slug: 'self-driving',
        label: 'Self-driving',
        icon: <IconMagic className="size-5" />,
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: 'Let PostHog suggest how to improve each email',
        description: (
            <>
                <p>
                    Turn on suggestions for a drip campaign. PostHog reads the results of each email step and suggests
                    one change at a time. Nothing changes until you approve it.
                </p>
                {list([
                    {
                        label: 'Based on results',
                        description: 'Suggestions come from the opens, clicks, and conversions of each email version.',
                    },
                    {
                        label: 'You decide',
                        description: 'Each suggestion waits for you. Approve it, or reject it and say why.',
                    },
                    {
                        label: 'Knows when to stop',
                        description:
                            "When bounces or complaints go up, PostHog doesn't suggest new copy. It tells you to fix delivery first.",
                    },
                ])}
            </>
        ),
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/pp_workflow_suggestions_light_d19e4b909a.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/pp_workflow_suggestions_dark_cac81e45da.png',
            alt: 'A change that PostHog suggests for a drip campaign subject line, waiting for review',
        },
    },
    {
        ...slideStyle,
        slug: 'send-from-context',
        label: 'Send from anywhere',
        icon: <IconBolt className="size-5" />,
        progressBar: 'bg-green',
        layout: 'stack',
        heading: 'Send the email when the moment happens',
        description: (
            <>
                <p>
                    PostHog offers to send the email at the moment it matters, from the product where it happened, to
                    the people it affected.
                </p>
                {list([
                    {
                        label: 'Error resolved',
                        description: "Resolve an error, and tell the people it hit that it's fixed.",
                    },
                    {
                        label: 'Flag goes live',
                        description: 'Roll a flag out to everyone, and tell people the feature is live.',
                    },
                    {
                        label: 'Cohort saved',
                        description: 'Save a cohort, and send it a broadcast straight from the cohort.',
                    },
                ])}
            </>
        ),
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/pp_error_resolved_page_light_b0c88aa41f.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/pp_error_resolved_page_dark_37edd7009a.png',
            alt: "A resolved error tracking issue with the Tell them it's fixed button",
        },
    },
]
