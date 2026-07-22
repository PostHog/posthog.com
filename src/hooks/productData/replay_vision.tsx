import React from 'react'
import {
    IconLlmPromptEvaluation,
    IconEye,
    IconWarning,
    IconSparkles,
    IconPeople,
    IconCursorClick,
    IconList,
    IconChat,
    IconConfetti,
    IconMap,
    IconNewspaper,
    IconMessage,
    IconShieldPeople,
    IconCode,
    IconRocket,
    IconInfo,
    IconCheckCircle,
    IconPieChart,
    IconGraph,
} from '@posthog/icons'
import OldWaySection from 'components/ReplayVision/OldWaySection'
import PostHogWaySection from 'components/ReplayVision/PostHogWaySection'
import HowToUseSection from 'components/ReplayVision/HowToUseSection'
import AIPromptsSection from 'components/ReplayVision/AIPromptsSection'
import WorksWithSection from 'components/ReplayVision/WorksWithSection'
import PlaceholderSection from 'components/ReplayVision/PlaceholderSection'
import { sessionReplay } from './session_replay'
import { topFeatures } from './replay_vision/slides'

export const replayVision = {
    Icon: IconLlmPromptEvaluation,
    name: 'Replay Vision',
    handle: 'replay_vision',
    slug: 'replay-vision',
    // Built by the same team as Session Replay, so the team-driven sections
    // (roadmap, changelog, questions, team) pull from the same sources.
    teamSlug: 'replay',
    forumTopicId: 377,
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
        {
            slug: 'how-to-use',
            name: 'How to use it',
            component: HowToUseSection,
            icon: <IconCursorClick className="size-4" />,
        },
        {
            slug: 'top-features',
            name: 'Top features',
            icon: <IconList className="size-4" />,
            props: { slides: topFeatures },
        },
        {
            slug: 'ai-prompts',
            name: 'AI prompts',
            component: AIPromptsSection,
            icon: <IconChat className="size-4" />,
        },
        {
            slug: 'works-with',
            name: 'Works with...',
            component: WorksWithSection,
            icon: <IconConfetti className="size-4" />,
        },
        { slug: 'roadmap', name: 'Roadmap', icon: <IconMap className="size-4" /> },
        { slug: 'changelog', name: 'Changelog', icon: <IconNewspaper className="size-4" /> },
        { slug: 'community', name: 'Questions?', icon: <IconMessage className="size-4" /> },
        { slug: 'team', name: 'Team', icon: <IconShieldPeople className="size-4" /> },
        { slug: 'installation', name: 'Install', icon: <IconCode className="size-4" /> },
        { slug: 'getting-started', name: 'Get started', icon: <IconRocket className="size-4" /> },
    ],
    /**
     * Sections rendered on the Pricing surface (`/replay-vision/pricing`).
     * Replay Vision isn't priced yet, so the pricing-specific sections (TL;DR,
     * plans, calculator, feature comparison) are placeholders. Only the
     * "Replay Vision vs..." comparison is built out.
     */
    pricingMenu: [
        {
            slug: 'pricing-tldr',
            name: 'TL;DR',
            component: PlaceholderSection,
            props: { title: 'Pricing TL;DR' },
            icon: <IconInfo className="size-4" />,
        },
        {
            slug: 'plans',
            name: 'Plans',
            component: PlaceholderSection,
            props: { title: 'Plans' },
            icon: <IconCheckCircle className="size-4" />,
        },
        {
            slug: 'calculator',
            name: 'Pricing calculator',
            component: PlaceholderSection,
            props: { title: 'Pricing calculator' },
            icon: <IconPieChart className="size-4" />,
        },
        { slug: 'comparison-summary', name: 'PostHog vs...', icon: <IconList className="size-4" /> },
        {
            slug: 'feature-comparison',
            name: 'Feature comparison',
            component: PlaceholderSection,
            props: { title: 'Feature comparison' },
            icon: <IconGraph className="size-4" />,
        },
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
    // Same install surface as Session Replay – pulls from the same source.
    installation: sessionReplay.installation,
    comparison: {
        summary: {
            them: [
                { title: 'You want self-hosting or more strict data residency' },
                { title: 'You have strong security requirements that need more robust PII redaction' },
                { title: 'You want a dedicated UX-research tool with targeted clip capture and studies' },
                { title: "You're not on PostHog and don't want to move session replay here" },
            ],
            us: [
                {
                    title: 'You want to ask any question of any slice of recordings on a schedule – not pick from a fixed menu of AI jobs',
                },
                {
                    title: 'Findings land as queryable observations next to your analytics, funnels, flags, experiments, and errors',
                },
                {
                    title: "Agents can search and act on what's in your replays via the MCP – the context that powers self-driving",
                },
                { title: "You'd rather keep sessions on PostHog than pay a second tool to scrape them out" },
            ],
        },
    },
}
