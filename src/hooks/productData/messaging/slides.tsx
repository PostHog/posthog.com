import React from 'react'
import {
    IconBolt,
    IconBrowser,
    IconDecisionTree,
    IconGraph,
    IconMegaphone,
    IconPencil,
    IconPeople,
    IconSend,
    IconToggle,
} from '@posthog/icons'
import Link from 'components/Link'
import PlatformInstall from 'components/PlatformInstall'
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

export const applications: CarouselSlide[] = [
    {
        ...slideStyle,
        slug: 'broadcasts',
        label: 'Broadcasts',
        icon: <IconMegaphone className="size-5" />,
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'One email to an audience, once or on a schedule',
        description: (
            <>
                <p>
                    Announcements, product updates, a weekly digest. Pick who gets it, write it, choose when, and
                    launch. Five steps, and PostHog saves a draft as you go.
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
        image: { ref: 'broadcasts' },
    },
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
                    Welcome email on sign-up. A day later, a nudge, but only to the people who haven’t finished
                    onboarding. Build it on a canvas from the events and properties you already track.
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
                            'Add a delay, or wait until a person does something (or doesn’t) and branch on the result.',
                    },
                    {
                        label: 'Split the audience',
                        description:
                            'Branch on a property, or split at random to A/B test the message, and compare the metrics for each path.',
                    },
                ])}
            </>
        ),
        image: { ref: 'dripCampaign' },
    },
    {
        ...slideStyle,
        slug: 'editor-mcp',
        label: 'Editor / MCP',
        icon: <IconBrowser className="size-5" />,
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: 'Describe the campaign, get the workflow',
        description: (
            <>
                <p>
                    With the PostHog MCP server in Cursor, Claude Code, or any MCP-compatible agent, describe the
                    trigger, the emails, and the waits, and get a draft workflow and its templates to review.
                </p>
                <div className="@container">
                    <LabeledList
                        className="mb-8"
                        items={[
                            {
                                label: 'Build a sequence',
                                description:
                                    'The agent creates the workflow with its trigger, delays, conditions, and email steps, as a draft you enable.',
                            },
                            {
                                label: 'Write the emails',
                                description:
                                    'Templates for each step, in your brand, with the merge tags your data supports.',
                            },
                            {
                                label: 'Read the results',
                                description:
                                    'Ask which step people drop off at, or how a broadcast converted, and get the numbers.',
                            },
                        ]}
                    />
                    <PlatformInstall />
                </div>
            </>
        ),
    },
]

export const keyFeatures: CarouselSlide[] = [
    {
        ...slideStyle,
        slug: 'triggers',
        label: 'Triggers',
        icon: <IconBolt className="size-5" />,
        progressBar: 'bg-yellow',
        layout: 'stack',
        heading: 'Start from product data, not a CSV',
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
        image: { ref: 'trigger' },
    },
    {
        ...slideStyle,
        slug: 'email-editor',
        label: 'Email editor',
        icon: <IconPencil className="size-5" />,
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'Design once, reuse everywhere',
        description: (
            <>
                <p>Build emails in the editor or start from a template, then use them in any broadcast or campaign.</p>
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
        image: { ref: 'emailEditor' },
    },
    {
        ...slideStyle,
        slug: 'channels',
        label: 'Channels',
        icon: <IconSend className="size-5" />,
        progressBar: 'bg-orange',
        layout: 'stack',
        heading: 'Email first, then wherever your users are',
        description: (
            <>
                <p>Send from your own verified domain. Add push, Slack, and webhooks as steps in the same sequence.</p>
                {list([
                    {
                        label: 'Email',
                        description:
                            'Verified sending domains, a suppression list, and bounce and complaint rates per domain.',
                    },
                    {
                        label: 'Push',
                        description:
                            'Native mobile push through FCM and APNs, with device tokens registered by the PostHog mobile SDKs.',
                    },
                    {
                        label: 'Slack and webhooks',
                        description:
                            'Post to a channel or call your own endpoint from the same workflow, so the team hears about it too.',
                    },
                ])}
            </>
        ),
        image: { ref: 'channels' },
    },
    {
        ...slideStyle,
        slug: 'opt-outs',
        label: 'Opt-outs',
        icon: <IconToggle className="size-5" />,
        progressBar: 'bg-red',
        layout: 'stack',
        heading: 'Opt-outs by category, not all or nothing',
        description: (
            <>
                <p>
                    Someone can decline your newsletter and still get a receipt. Message categories keep the two apart,
                    and PostHog enforces them on every send.
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
        image: { ref: 'optOuts' },
    },
    {
        ...slideStyle,
        slug: 'results',
        label: 'Results',
        icon: <IconGraph className="size-5" />,
        progressBar: 'bg-green',
        layout: 'stack',
        heading: 'Measure the conversion, not the open rate',
        description: (
            <>
                <p>
                    Opens and clicks are table stakes. Every message also lands on the person as an event, so you can
                    see what they did next, in the same funnels and replays as everything else.
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
        image: { ref: 'results' },
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
                    The people you message are the people in your analytics. Nothing to upload, nothing to sync, and
                    nothing goes stale.
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
        image: { ref: 'audience' },
    },
]
