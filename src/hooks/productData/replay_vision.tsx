import React from 'react'
import { getWizardFrameworkRows } from 'constants/installation-taxonomy'
import {
    IconEye,
    IconWarning,
    IconSparkles,
    IconPeople,
    IconCursorClick,
    IconList,
    IconChat,
    IconConfetti,
    IconNewspaper,
    IconMessage,
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
import { PricingTLDR, PricingPlans, PricingCredits } from 'components/ReplayVision/PricingSections'
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
        'Choose the shape of the output rather than taking a single fixed job.'
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
        'friction_score_trained',
        'Vendor-trained friction score',
        'A trained, benchmarked numeric score for each session, out of the box.'
    ),
    feature(
        'friction_score_custom',
        'Score sessions on your own criteria',
        'Define what gets scored and on what scale, rather than taking a vendor-defined score.'
    ),
    feature(
        'theme_summary',
        'Cross-session theme summary',
        'Roll many sessions up into the recurring themes and patterns across them.'
    ),
    feature(
        'nl_search',
        'Natural-language search over recordings',
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
        'Chart scanner output values over time',
        "Chart and monitor the scanner's own output values, not just the underlying behavioural signals."
    ),
    feature(
        'feed_experiments',
        'Feed experiments and cohorts with scanner output values',
        "Build cohorts from a scanner's output values and measure them in experiments."
    ),
    feature(
        'proactive_alerts',
        'Proactive alerts / anomaly detection',
        "Get notified when a scanner's output spikes or crosses a threshold."
    ),
    { type: 'header' as const, label: 'Access and agents' },
    feature('mcp_access', 'MCP / agent access', 'Author, run, and read AI analyses of recordings from any MCP client.'),
    feature('rest_api', 'REST API for AI output', 'Pull scanner observations programmatically over a REST API.'),
    feature(
        'self_driving',
        'Feeds the self-driving loop',
        'Findings from recordings raise signals that agents can research and turn into a pull request.'
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

// Platforms the `replay-vision` wizard accepts. It aborts on anything Session
// Replay cannot record – pure backend targets and KMP – so the install CTAs
// must not offer them. Mirrors REPLAY_VISION_SUPPORTED in PostHog/wizard.
const WIZARD_PLATFORM_SLUGS = new Set([
    'web',
    'react',
    'nextjs',
    'nuxt',
    'vue',
    'angular',
    'astro',
    'svelte',
    'react-router',
    'tanstack-start',
    'django',
    'flask',
    'fastapi',
    'rails',
    'laravel',
    'react-native',
    'android',
    'ios',
    'flutter',
])

const wizardSupports = getWizardFrameworkRows().filter((row) => WIZARD_PLATFORM_SLUGS.has(row.slug))

export const replayVision = {
    Icon: IconEye,
    name: 'Replay Vision',
    description: 'AI-powered session replay analysis that watches recordings for you',
    handle: 'replay_vision',
    type: 'replay_vision',
    slug: 'replay-vision',
    // Built by the same team as Session Replay, so changelog / questions pull
    // from the same sources.
    teamSlug: 'replay',
    forumTopicId: 377,
    // Forum topic 377 lives under Session Replay's slug – there is no
    // /questions/topic/replay-vision page – so community links point there.
    forumTopicSlug: sessionReplay.slug,
    color: 'yellow',
    colorSecondary: '[#B56C00]',
    wizardSupport: true,
    // Wizard subcommand appended to `npx @posthog/wizard` in the hero and Get
    // started install CTAs – the bare wizard installs the SDK without creating
    // any scanners.
    wizardCommand: 'replay-vision',
    wizardSupports,
    category: 'product_engineering',
    shortDescription: 'Let AI watch your session recordings for you',
    seo: {
        title: 'Replay Vision - PostHog',
        description:
            'Replay Vision reads through a filtered set of recordings, tells you in plain language what went wrong, and opens a pull request with the fix. The problem fixes itself for you. You just hit merge.',
    },
    /**
     * Sections rendered on the Product surface (`/replay-vision`). Each entry
     * resolves to a section template via `templateRegistry[item.template ?? item.slug]`,
     * so the slug doubles as the lookup key when no explicit `template` is set.
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
        { slug: 'changelog', name: 'Changelog', icon: <IconNewspaper className="size-4" /> },
        { slug: 'community', name: 'Questions?', icon: <IconMessage className="size-4" /> },
        { slug: 'installation', name: 'Install', icon: <IconCode className="size-4" /> },
        { slug: 'getting-started', name: 'Get started', icon: <IconRocket className="size-4" /> },
    ],
    /**
     * Sections rendered on the Pricing surface (`/replay-vision/pricing`). These
     * use Replay Vision's own credit-denominated components rather than the shared
     * calculator template. On the shared `/pricing` calculator the tab UI comes from
     * `productTabs.replay_vision` in `Pricing/PricingCalculator/Tabbed.tsx`, which
     * shares the same estimator (`ReplayVision/PricingEstimator.tsx`); `slider` and
     * `volume` below seed that calculator's shared state.
     */
    pricingMenu: [
        {
            slug: 'pricing-tldr',
            name: 'TL;DR',
            component: PricingTLDR,
            icon: <IconInfo className="size-4" />,
        },
        {
            slug: 'plans',
            name: 'Plans',
            component: PricingPlans,
            icon: <IconCheckCircle className="size-4" />,
        },
        {
            slug: 'calculator',
            name: 'Pricing calculator',
            component: PricingCredits,
            icon: <IconPieChart className="size-4" />,
        },
        { slug: 'comparison-summary', name: 'PostHog vs...', icon: <IconList className="size-4" /> },
        { slug: 'feature-comparison', name: 'Feature comparison', icon: <IconGraph className="size-4" /> },
        { slug: 'pricing-cta', name: 'Get started', hideFromNav: true, component: PricingFooterCTASection },
    ],
    overview: {
        title: 'Your product, watching itself',
        description:
            'Replay Vision reads through a filtered set of recordings, tells you in plain language what went wrong, and opens a pull request with the fix. The problem fixes itself for you. You just hit merge.',
        textColor: 'text-black', // tw
    },
    screenshots: {
        home: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Group_9_69b51af8fd.png',
            alt: 'Replay Vision scanner observations',
        },
    },
    useCases: {
        intro: 'Replay Vision is used across teams depending on your role.',
        rows: [
            ['Product Engineers', "Scan sessions in bulk for the failure you can't reproduce locally"],
            ['PMs & Designers', 'Score friction and spot dead ends across a release without watching a replay'],
            ['Growth Engineers', 'Find where users bleed out of onboarding and signup funnels'],
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
                { title: 'You want a dedicated UX-research tool with targeted clip capture and studies' },
                { title: "You're not on PostHog and don't want to move session replay here" },
            ],
            us: [
                {
                    title: 'Point AI at any slice of recordings on a schedule and write the prompt yourself',
                },
                {
                    title: 'Findings land as queryable observations next to your analytics, funnels, flags, experiments, and errors',
                },
                {
                    title: 'What AI sees in your recordings becomes queryable data and signals that feed the self-driving loop, in the same platform as your analytics, flags, and experiments.',
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
    // Values in credits. `volume` seeds the shared /pricing calculator state (the tab
    // itself renders via `productTabs.replay_vision` in Tabbed.tsx); `slider` is only the
    // fallback the generic tab block needs if that registration ever goes away. min doubles
    // as the "first N credits free" copy, so it tracks the free allocation.
    slider: {
        marks: [2500, 10000, 50000, 100000],
        min: 2500,
        max: 100000,
    },
    volume: 2500,
}
