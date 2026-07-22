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
import PricingFooterCTASection from 'components/ReplayVision/PricingFooterCTASection'
import { sessionReplay } from './session_replay'
import { topFeatures } from './replay_vision/slides'

// Feature-comparison rows. Header rows group the table; feature rows carry the
// row label and pull each competitor's value from `products.replay_vision.features`
// in the competitor data files (competitorData/*).
const feature = (key: string, label: string, description: string) => ({
    type: 'feature' as const,
    product: 'replay_vision',
    feature: key,
    label,
    description,
})

const featureComparisonRows = [
    { type: 'header' as const, label: 'AI scanners' },
    feature(
        'point_scanner',
        'Point a scanner at a filtered recording set',
        'Run AI analysis across a whole slice of sessions, not one recording at a time.'
    ),
    feature(
        'configurable_types',
        'Configurable scanner types',
        'Choose how a scanner works – monitor, classifier, scorer, or summarizer – instead of a fixed job.'
    ),
    feature(
        'custom_prompt',
        'Custom prompt per analysis',
        'Describe exactly what to look for in your own words for each scanner.'
    ),
    feature(
        'yes_no_monitors',
        'Yes/no monitors (did this happen?)',
        'Get a simple did-this-happen verdict on every session a scanner watches.'
    ),
    feature(
        'classify_tag',
        'Classify / tag sessions',
        'Automatically bucket sessions by intent, outcome, or any label you define.'
    ),
    feature(
        'friction_score',
        'Numeric friction / struggle score',
        'Rate how much friction each session hit on a scale you control.'
    ),
    feature(
        'theme_summary',
        'Cross-session theme summary',
        'Roll many sessions up into the recurring themes and patterns across them.'
    ),
    feature(
        'nl_search',
        'Natural-language search over sessions',
        'Find the recordings you need by describing them in plain language.'
    ),
    feature(
        'scheduled_runs',
        'Scheduled / continuous runs',
        'Scanners keep running on new sessions automatically, not just on demand.'
    ),
    feature(
        'sampling_controls',
        'Sampling / coverage controls',
        'Dial how much matching traffic gets scanned so cost stays predictable.'
    ),
    feature(
        'deep_link_citations',
        'Deep-link citations to the exact moment',
        'Every finding links straight to the timestamp in the recording so you can verify it.'
    ),
    feature(
        'mobile_replay_ai',
        'Mobile replay AI',
        'Run the same AI analysis over native iOS and Android session recordings.'
    ),
    { type: 'header' as const, label: 'Results as data' },
    feature(
        'findings_events',
        'Findings become queryable events',
        'Each observation is emitted as an event you can query alongside the rest of your data.'
    ),
    feature(
        'insights_dashboards',
        'Build insights / dashboards on AI output',
        'Chart and monitor what scanners find like any other product metric.'
    ),
    feature(
        'feed_experiments',
        'Feed experiments / cohorts',
        'Use scanner output to build cohorts and measure it in experiments.'
    ),
    feature(
        'proactive_alerts',
        'Proactive alerts / anomaly detection',
        "Get notified when a scanner's output spikes or crosses a threshold."
    ),
    { type: 'header' as const, label: 'Access and agents' },
    feature(
        'mcp_access',
        'MCP / agent access',
        'Author, run, and read scanners from any MCP client via the PostHog MCP.'
    ),
    feature('rest_api', 'REST API for AI output', 'Pull scanner observations programmatically over a REST API.'),
    feature(
        'self_driving',
        'Feeds the self-driving loop',
        'Findings raise signals that agents can research and turn into a pull request.'
    ),
    { type: 'header' as const, label: 'Recordings and platform' },
    feature('share_recordings', 'Share recordings', 'Share a link to any recording with your team.'),
    feature('embed_recordings', 'Embed recordings', 'Embed recordings in docs, dashboards, or other tools.'),
    feature('export_recordings', 'Export recordings', 'Export recordings out of the platform when you need to.'),
    feature(
        'flag_interlinking',
        'Feature-flag interlinking',
        'Jump between recordings and the feature flags and experiments they hit.'
    ),
    feature(
        'product_analytics_platform',
        'Product analytics in same platform',
        'Analytics, replays, and AI findings all live in one product, not stitched together.'
    ),
    feature('pii_redaction', 'PII redaction / masking', 'Mask sensitive content before it is ever recorded.'),
    { type: 'header' as const, label: 'Pricing' },
    feature('ai_pricing', 'AI pricing model', 'How the AI analysis is billed.'),
]

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
            'It reads through a filtered set of replays, tells you in plain language what went wrong, and opens a pull request with the fix. The problem surfaces itself, and so does the patch. You just hit merge.',
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
        { slug: 'feature-comparison', name: 'Feature comparison', icon: <IconGraph className="size-4" /> },
        { slug: 'pricing-cta', name: 'Get started', hideFromNav: true, component: PricingFooterCTASection },
    ],
    overview: {
        title: "You'll never watch 10,000 sessions. Replay Vision will.",
        description:
            'It reads through a filtered set of replays, tells you in plain language what went wrong, and opens a pull request with the fix. The problem surfaces itself, and so does the patch. You just hit merge.',
        textColor: 'text-black', // tw
    },
    screenshots: {
        home: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Group_3_1_44abff4569.png',
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
        companies: [
            { name: 'FullStory', key: 'fullstory', link: '/blog/posthog-vs-fullstory' },
            { name: 'Contentsquare', key: 'contentsquare' },
            { name: 'Datadog', key: 'datadog' },
            { name: 'Mixpanel', key: 'mixpanel', link: '/blog/posthog-vs-mixpanel' },
            { name: 'PostHog', key: 'posthog' },
        ],
        rows: featureComparisonRows,
        // Feature pages don't render platform sections; our rows are already scoped.
        excluded_sections: ['platform'],
    },
}
