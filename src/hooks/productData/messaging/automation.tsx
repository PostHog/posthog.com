import React from 'react'
import { IconDecisionTree, IconSend, IconSparkles } from '@posthog/icons'
import { LabeledList } from 'components/Products/ReaderViewProduct/helpers'
import type { CarouselSlide } from 'components/Products/ReaderViewProduct/types'

/**
 * Copy on these slides is checked against contents/docs/workflows/{email-drip-campaign,workflow-builder,ai-tasks,configure-channels}.mdx.
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

export const automations: CarouselSlide[] = [
    {
        ...slideStyle,
        slug: 'drip-campaigns',
        label: 'Drip campaigns',
        icon: <IconDecisionTree className="size-5" />,
        progressBar: 'bg-teal',
        layout: 'float',
        heading: 'Build a drip campaign from what people do',
        description: (
            <>
                <p>
                    Send a welcome email at sign-up, then a nudge a day later to people who haven't finished onboarding.
                    You build it on a canvas, and branches use the same events and properties as your insights.
                </p>
                {list([
                    {
                        label: 'Start from what PostHog knows',
                        description:
                            'Start from an event, a cohort, or a schedule, once per person or every time, with a conversion goal and exit conditions.',
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
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/workflows_drip_overview_light_74796bb39a.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/workflows_drip_overview_dark_384b529650.png',
            alt: 'A drip campaign that sends a welcome email, waits for an upload, then sends a nudge',
        },
    },
    {
        ...slideStyle,
        slug: 'complex-automations',
        label: 'Complex automations',
        icon: <IconSparkles className="size-5" />,
        progressBar: 'bg-purple',
        layout: 'float',
        heading: 'Build automations as complex as you need',
        description: (
            <>
                <p>
                    The same canvas runs more than email. Chain branches, waits, and actions, and hand a step to an
                    agent when it needs judgment instead of a rule.
                </p>
                {list([
                    {
                        label: 'Build it with your agent',
                        description:
                            'Describe the automation in Claude Code, Cursor, or another AI tool. Over the PostHog MCP, it makes a draft, tests it without real recipients, and publishes it.',
                    },
                    {
                        label: 'Branch and wait',
                        description:
                            'Branch on properties, events, or a random split, and wait until a person does something before you continue.',
                    },
                    {
                        label: 'AI steps',
                        description:
                            'Start an AI task, or have Replay Vision watch the session behind the event and score it. Branch on the result.',
                    },
                    {
                        label: 'Draft, test, then publish',
                        description:
                            'A workflow stays a draft until you enable it. Test it against a real person and read the logs of each run.',
                    },
                ])}
            </>
        ),
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/workflows_complex_canvas_light_6ffea9518c.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/workflows_complex_canvas_dark_b696c34697.png',
            alt: 'A workflow with branches and steps on the canvas',
        },
    },
    {
        ...slideStyle,
        slug: 'any-destination',
        label: 'Any destination',
        icon: <IconSend className="size-5" />,
        progressBar: 'bg-yellow',
        layout: 'float',
        heading: 'Send to any destination from any step',
        description: (
            <>
                <p>
                    A step can send an email, or post to Slack, call a webhook, or update another tool. All of it uses
                    the same person and event data.
                </p>
                {list([
                    {
                        label: 'Email, SMS, push, and WhatsApp',
                        description: 'Reach a person on the channel that fits the message.',
                    },
                    {
                        label: 'In-app messages',
                        description:
                            'Set a person property, then target a feature flag or a popover survey at it to show a banner or a pop-up the next time they open your app.',
                    },
                    {
                        label: 'Slack and webhooks',
                        description: 'Tell your team about a signup, or call your own API with the event.',
                    },
                    {
                        label: '35+ integrations',
                        description: 'ClickUp, Discord, GitHub, GitLab, Google Ads, Google Cloud Storage, and more.',
                    },
                ])}
            </>
        ),
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/pp_destinations_picker_light_663523e7cc.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/pp_destinations_picker_dark_9bb8f235ea.png',
            alt: 'The step picker with email, SMS, Slack, webhook, push, and more destinations',
        },
    },
]
