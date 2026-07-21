import React from 'react'
import { IconLlmPromptEvaluation, IconEye, IconWarning, IconSparkles, IconPeople } from '@posthog/icons'
import OldWaySection from 'components/ReplayVision/OldWaySection'
import PostHogWaySection from 'components/ReplayVision/PostHogWaySection'

export const replayVision = {
    Icon: IconLlmPromptEvaluation,
    name: 'Replay Vision',
    handle: 'replay_vision',
    slug: 'replay-vision',
    color: 'yellow',
    colorSecondary: '[#B56C00]',
    category: 'product_engineering',
    status: 'beta',
    shortDescription: 'Let AI watch your session replays for you',
    seo: {
        title: 'Replay Vision - PostHog',
        description:
            'It reads through a filtered set of replays, tells you in plain language what went wrong, and – when the cause is clear – opens a pull request with the fix. The problem surfaces itself, and so does the patch. You just hit merge.',
    },
    /**
     * Sections rendered on the Product surface (`/replay-vision`). Each entry
     * resolves to a section template via `templateRegistry[item.template ?? item.slug]`.
     * Only the hero (`overview`) is shipped for now – more sections get added here.
     */
    productMenu: [
        { slug: 'overview', name: 'Overview', icon: <IconEye className="size-4" /> },
        {
            slug: 'old-way',
            name: 'The old way',
            component: OldWaySection,
            icon: <IconWarning className="size-4" />,
        },
        {
            slug: 'posthog-way',
            name: 'The PostHog way',
            component: PostHogWaySection,
            icon: <IconSparkles className="size-4" />,
        },
        { slug: 'use-cases', name: 'Who is it for?', icon: <IconPeople className="size-4" /> },
    ],
    overview: {
        title: "You'll never watch 10,000 sessions. Replay Vision will.",
        description:
            'It reads through a filtered set of replays, tells you in plain language what went wrong, and – when the cause is clear – opens a pull request with the fix. The problem surfaces itself, and so does the patch. You just hit merge.',
        textColor: 'text-black', // tw
    },
    screenshots: {
        home: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Group_2_4_8e09fa75cc.png',
            alt: 'Replay Vision scanner observations',
        },
    },
    useCases: {
        intro: 'Replay Vision is used across teams depending on your role.',
        rows: [
            ['Product Engineers', "Scan sessions in bulk for the failure you can't reproduce locally"],
            ['PMs & Designers', 'Score friction and spot dead ends across a release without watching a replay'],
            ['Growth', 'Find where users bleed out of onboarding and signup funnels'],
            ['Support & UX Research', 'Classify what users were actually trying to do, at scale'],
            ['Founders', 'Skim a one-line summary of every session instead of spending hours watching them'],
        ],
    },
}
