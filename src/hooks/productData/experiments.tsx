import React from 'react'
import { getTool } from '../../data/tools'
import {
    IconChat,
    IconCheckCircle,
    IconCode,
    IconConfetti,
    IconCursorClick,
    IconEye,
    IconFlask,
    IconInfo,
    IconList,
    IconMagic,
    IconMessage,
    IconPieChart,
    IconRocket,
    IconSparkles,
    IconToggle,
} from '@posthog/icons'
import { features } from './experiments/features'
import { applications, topFeatures } from './experiments/slides'

export const experiments = {
    ...getTool('experiments'),
    Icon: IconFlask,
    type: 'feature_flags',
    sharesFreeTier: 'feature_flags',
    // Billed as feature flag requests – Plans/calculator resolve against this billing product.
    billingType: 'feature_flags',
    slug: 'experiments',
    teamSlug: 'experiments',
    forumTopicId: 350,
    color: 'purple',
    colorSecondary: 'lilac',
    wizardSupport: 'In development',
    billedWith: 'Feature Flags',
    billedWithSlug: 'feature-flags',
    shortDescription: 'Test changes with statistical significance',
    // Bundled-with-flags copy from the previous custom pricing slide – not a separate pricing story.
    pricingDescription:
        'Experiments are bundled with Feature Flags and share volume limits. First 1 million requests every month are free (access to both products); after that, usage is billed through Feature Flags requests with Experiments at no additional cost.',
    pricingLead:
        'Experiments are bundled with Feature Flags and share volume limits, so you get access to both products for the same price.',
    pricingHighlights: [
        '1 million requests free every month',
        'Usage billed as Feature Flags requests after the free tier',
        'Experiments at no additional cost',
    ],
    pricingFooter: 'Same request meter as Feature Flags – no separate Experiments SKU.',
    pricingEventsLink: false,
    seo: {
        title: 'Experiments – Run tests and validate ideas with PostHog',
        description:
            'Run A/B tests, multivariate tests, and other experiments to see if a change worked – the results agents use to validate impact and make your product self-driving.',
    },
    /**
     * Sections rendered on the Product surface (`/experiments`). Each entry
     * resolves to a section template via `templateRegistry[item.template ?? item.slug]`,
     * so the slug doubles as the lookup key when no explicit `template` is set.
     * `props` is passed straight to the resolved section component (used here to
     * feed the carousel templates their slide arrays).
     */
    productMenu: [
        { slug: 'overview', name: 'Overview', icon: <IconEye className="size-4" /> },
        {
            slug: 'eli5',
            name: 'What does it do?',
            hideFromNav: true,
            group: 'divided',
            icon: <IconInfo className="size-4" />,
        },
        {
            slug: 'use-cases',
            name: 'Who is it for?',
            hideFromNav: true,
            group: 'divided',
            icon: <IconMagic className="size-4" />,
        },
        {
            slug: 'applications',
            name: 'How do I use it?',
            group: 'divided',
            icon: <IconCursorClick className="size-4" />,
            props: { slides: applications },
        },
        {
            slug: 'top-features',
            name: 'Top features',
            group: 'divided',
            icon: <IconSparkles className="size-4" />,
            props: { slides: topFeatures },
        },
        {
            slug: 'ask-anything',
            name: 'AI prompts',
            group: 'divided',
            icon: <IconChat className="size-4" />,
        },
        {
            slug: 'installation',
            name: 'Install',
            group: 'divided',
            icon: <IconCode className="size-4" />,
        },
        {
            slug: 'feature-comparison',
            name: 'Feature comparison',
            group: 'divided',
            icon: <IconList className="size-4" />,
        },
        { slug: 'community', name: 'Questions?', group: 'divided', icon: <IconMessage className="size-4" /> },
        { slug: 'pairs-with', name: 'Pairs with...', hideFromNav: true, icon: <IconConfetti className="size-4" /> },
        { slug: 'getting-started', name: 'Get started', group: 'divided', icon: <IconRocket className="size-4" /> },
    ],
    /**
     * Sections rendered on the Pricing surface (`/experiments/pricing`).
     * Plans/calculator use Feature Flags billing via `billingType` + pricing copy
     * (same pattern as Web Analytics → Product Analytics).
     */
    pricingMenu: [
        { slug: 'billed-with', name: 'Billed with Feature Flags', icon: <IconToggle className="size-4" /> },
        { slug: 'plans', name: 'Plans', icon: <IconCheckCircle className="size-4" /> },
        { slug: 'calculator', name: 'Pricing calculator', icon: <IconPieChart className="size-4" /> },
        { slug: 'comparison-summary', name: 'PostHog vs...', icon: <IconList className="size-4" /> },
        // Hidden footer CTA rendered at the bottom of the Pricing surface.
        { slug: 'pricing-cta', name: 'Get started', hideFromNav: true },
    ],
    overview: {
        title: 'Test changes with statistical significance',
        description:
            'Experiments is one of the tools that makes your product self-driving: the evaluation that proves a change actually worked. Built to natively work with product analytics, session replay, feature flags, and surveys.',
        eli5: 'Experiments let you run A/B, A/B/n, holdout, fake door, and redirect tests with statistical significance. Create an experiment (which creates a feature flag), pick primary and secondary metrics, target cohorts or geographies, then launch variants. Bayesian and frequentist engines tell you what won – and you can watch session replays for each variant when you need the why.',
        textColor: 'text-white', // tw
    },
    screenshots: {
        overview: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_09_09_at_11_26_18_350dc26349.png',
            alt: 'Screenshot of managing an experiment in PostHog',
            classes: 'px-8',
            imgClasses: 'rounded-t-md shadow-2xl',
        },
        home: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2026_04_01_at_14_21_27_96d1375a92.png',
            srcDark:
                'https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2026_04_01_at_14_24_58_04e669df5a.png',
            alt: 'Experiment results',
            classes: 'justify-center items-end px-4 @lg:px-6',
            imgClasses: 'rounded-t-md shadow-2xl',
        },
    },
    videos: {
        overview: {
            // youtube: '',
            wistia: 'tg7d3aw5af',
        },
    },
    hog: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/sales/celebration.png',
        alt: 'Hedgehogs celebrating a shipped experiment',
        footerClasses: 'max-w-[420px]',
        classes: 'absolute bottom-0 right-0 max-w-md',
    },
    hogs: {
        default: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/hogs/ab-testing-hog.png',
            alt: 'Hedgehog experimenting',
        },
        mobileHog: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/EXPERIMENTS_f9f880f1b2.png',
            alt: 'Hedgehog experimenting',
        },
    },
    // Same request volume slider as feature flags (experiments is billed with it).
    slider: {
        marks: [1000000, 10000000, 100000000, 1000000000],
        min: 1000000,
        max: 1000000000,
    },
    volume: 1000000,
    customers: {
        ycombinator: {
            headline: 'boosted community engagement by 40%',
            description:
                "Y Combinator uses PostHog's experiments to try new ideas, which has led to significant improvements.",
        },
        researchgate: {
            headline: 'tests product changes for over 25M users',
            description:
                'Our data scientists are able to rapidly and autonomously iterate on the data models that power our home feed.',
        },
        vendasta: {
            headline: 'increased registrations by 30%',
            description:
                "This experiment cuts drop-off in half – that's a 50% improvement without a single user complaining!",
        },
        assemblyai: {
            headline: 'switched from Mixpanel for a leaner stack',
            description: 'I feel like, every single week, we discover something new that makes a difference.',
        },
    },
    useCases: {
        intro: 'Experiments is used across teams depending on your role.',
        rows: [
            [
                'Product Engineers',
                'Ship a change behind a flag, run an A/B test, and roll out the winner without a separate release pipeline',
            ],
            [
                'Product Managers',
                'Validate onboarding, pricing, or UI changes with primary and secondary metrics before committing',
            ],
            [
                'Growth Engineers',
                'Target cohorts or geographies, run multivariate tests, and watch session replays for each variant',
            ],
            [
                'Data Scientists',
                'Run Bayesian or frequentist analysis with shared metrics, holdouts, and warehouse-backed metrics',
            ],
            ['B2B product teams', 'Run group-level experiments so everyone at a company sees the same variant'],
        ],
    },
    features,
    mcp: {
        title: 'MCP',
        headline: 'Run experiments from your editor',
        description:
            'Create A/B tests, check statistical significance, and manage the full experiment lifecycle from Cursor, Claude Code, VS Code, or any MCP-compatible agent.',
    },
    installation: {
        title: 'Install',
        headline: 'Install',
        description: 'Built on feature flags – SDKs for web, mobile, and backend, plus no-code platforms.',
        productSlug: 'experiments',
        categories: ['web', 'mobile', 'backend-languages', 'backend-frameworks', 'no-code'],
    },
    postHogOnPostHog: {
        title: 'How PostHog uses Experiments',
        benefits: [
            {
                title: 'A/B tests',
                description: 'to compare one idea against another',
            },
            {
                title: 'A/A tests',
                description: 'to verify our experiment setup produces no false positives',
            },
            {
                title: 'A/B/n tests',
                description: 'to test lots of ideas at once',
            },
            {
                title: 'Holdout tests',
                description: 'to test ideas over a long period',
            },
            {
                title: 'Fake door tests',
                description: 'to test an idea before building it',
            },
        ],
    },
    questions: [
        {
            question: 'Does this new onboarding flow increase conversion?',
        },
        {
            question: 'How does this affect adoption in Europe?',
        },
        {
            question: 'Will enterprise customers like this new feature?',
        },
        {
            question: 'Which pricing model generates more revenue?',
        },
        {
            question: 'Does simplifying our signup form reduce drop-off?',
        },
        {
            question: 'Will this UI change improve user engagement?',
        },
        {
            question: 'Should we show social proof on the landing page?',
        },
        {
            question: 'Does the new checkout flow reduce cart abandonment?',
        },
    ],
    comparison: {
        summary: {
            them: [
                {
                    title: 'No-code experiments or CMS capabilities',
                    subtitle:
                        "You'll still need a designer/engineer to create experiments – but we're working on no-code A/B testing!",
                },
                {
                    title: 'No integration with Google Ads',
                    subtitle:
                        "PostHog can't run ad experiments, or target users into an experiment based on an ad variant engagement.",
                },
                {
                    title: 'Personalization',
                    subtitle:
                        "Of course, you could set up personalization yourself, but we don't have pre-built components or templates for this.",
                },
            ],
            us: [
                {
                    title: 'Agents can read experiment results and act on them – the evaluation that powers self-driving',
                    subtitle:
                        'Results are part of one platform, so an agent can check whether a change actually worked and ship the winner.',
                },
                {
                    title: 'Integration with other PostHog products',
                    subtitle:
                        'Attach surveys to experiments or view replays for a test group. Analyze results beyond your initial hypothesis or goal metric.',
                },
                {
                    title: 'Group-level experiments for B2B',
                    subtitle:
                        'Test features at the organization level to avoid contamination between users in the same company',
                },
                {
                    title: 'Shared metrics library',
                    subtitle: 'Create consistent, reusable metrics across all experiments',
                },
            ],
        },
        companies: [
            {
                name: 'Optimizely',
                key: 'optimizely',
                link: '/blog/posthog-vs-optimizely',
            },
            {
                name: 'Amplitude',
                key: 'amplitude',
                link: '/blog/posthog-vs-amplitude',
            },
            // {
            //     name: 'Pendo',
            //     key: 'pendo',
            //     link: '/blog/posthog-vs-pendo',
            // },
            {
                name: 'VWO',
                key: 'vwo',
            },
            {
                name: 'Statsig',
                key: 'statsig',
                link: '/blog/posthog-vs-statsig',
            },
            {
                name: 'PostHog',
                key: 'posthog',
            },
        ],
        rows: ['experiments'],
        require_complete_data: true,
    },
    pairsWith: [
        {
            slug: 'product-analytics',
            description: 'Run analysis based on the value of a test, or build a cohort of users from a test variant',
        },
        {
            slug: 'session-replay',
            description:
                "Watch recordings of users in a variant to discover nuances in why they did or didn't complete the goal",
        },
        {
            slug: 'feature-flags',
            description:
                'Make changes to the feature flag the experiment uses - including JSON payload for each variant',
        },
    ],
    presenterNotes: {
        overview:
            '<strong>Presenter notes:</strong> Test product changes and measure their true impact. Run experiments on funnels like a signup flow, on single events such as revenue, or on advanced metrics like ratios. Track unlimited metrics to see how experiments affect other parts of your app and user journeys. Our Bayesian and frequentist engines provide clear, statistically rigorous results so you can make confident, data-backed decisions.',
        customers:
            'Y Combinator tested small changes systematically and saw a 40% engagement boost. ResearchGate runs experiments on 25 million users. Vendasta tested "insignificant" ideas and got 30% more registrations.',
        features:
            '<strong>Experiments:</strong> Pick a metric. Test funnels, clicks, revenue, whatever. Add secondary metrics to catch side effects (like signups up but activation down).<br /><br /><strong>Bayesian statistical engine:</strong> Get results as probabilities — e.g. "95% chance variant B improves conversion by 5-10%." See the likely impact range so you can weigh improvement vs implementation cost.<br /><br /><strong>Flexible experiment types:</strong> Test anything - conversion rates, average order value, session time, feature depth. Shared metrics library means define once, use them across PostHog.<br /><br /><strong>Smart recommendations:</strong> We analyze your data and give you accurate predictions: "5% improvement with high variance? 6 weeks." "50% improvement on stable metric? 1 week." It also catches sample ratio mismatch (ie: your randomization is broken).<br /><br /><strong>Advanced targeting:</strong> For example, test pricing for US users who joined after Jan 1st. Or enterprise features for 100+ employee companies. B2B? Run group-level experiments so everyone at a company sees the same thing.<br /><br /><strong>Developer-friendly implementation:</strong> Every experiment is just a feature flag but with a powerful engine on top. Same SDKs, same infrastructure. Local evaluation, bootstrapping, JSON payloads - all included.',
        // answers:
        // "These questions reflect real decisions teams face every day. Testing a new onboarding flow? Set up a funnel experiment measuring completion rates. Geographic differences matter—our automatic IP resolution lets you analyze results by region without manual setup. For B2B products, group-level experiments ensure everyone at a company sees the same experience, avoiding the confusion of user-level randomization. Revenue experiments need special care—make sure you're tracking the full customer journey, not just the purchase event. And yes, you should test that social proof—we've seen it increase conversions by 20-40% for many teams.",
        pricing:
            'Experiments are billed as feature flag requests since that\'s what they are under the hood. You get 1 million requests free per month, then pay-as-you-go after that. This is radically different from tools like Optimizely that can run 5-figures annually for experimentation. With PostHog, a typical B2C app running 5-10 experiments might use 10-20 million requests per month. That\'s a few hundred dollars, not tens of thousands. And you get all features—no "enterprise" tier needed for basic functionality like API access or advanced metrics. And the best part: get it all without "jumping on a quick call with sales!"',
        'comparison-summary':
            "The experimentation landscape has three camps: dedicated tools like Optimizely, analytics add-ons like Amplitude, and integrated platforms like PostHog. Optimizely is powerful but expensive and complex. Amplitude requires you to already use Amplitude. PostHog gives you experimentation as part of a complete platform with both Bayesian and frequentist engines. Because results live in one platform, agents can read them directly and act on what actually worked – it's the evaluation that makes your product self-driving. We also support group-level experiments for B2B products and integrate deeply with session replay for qualitative insights.",
        'feature-comparison':
            "This comparison highlights our unique strengths. Group-level experiments are exclusive to PostHog, critical for B2B products. The integrated session replay means you can watch users in each variant to understand the 'why' behind the numbers. Our shared metrics library ensures consistency across experiments.",
        docs: "Our experimentation docs go deep into the statistical methodology because we believe you should understand the tools you're using. We explain Bayesian vs. frequentist approaches, sequential testing, and why we've made certain choices. But we also keep it practical with guides on common patterns: testing pricing changes, optimizing onboarding funnels, and measuring long-term impact.",
        'pairs-with':
            "PostHog Experiments truly shine when combined with our other products. Start with an experiment on a new feature, then use product analytics to dive deeper than your primary metric—maybe conversion increased but time-to-convert also increased. Watch session recordings of users in each variant to see exactly how they interact differently. If the experiment wins, roll it out gradually using the same feature flag. This integrated workflow means you're not jumping between tools or trying to match user IDs across systems. It's one platform where everything connects.",
        'getting-started':
            "If you don't have a ton of experience running tests, here's an idea to get you going: your first experiment should be something simple with a clear metric. Maybe test a new button color (yes, they can matter especially at scale in B2C apps) or headline text. Create the experiment, which automatically creates a feature flag. Implement the flag check in your code – usually 5-10 lines (and AI is really good at helping with this!). Launch to 50% of users and within days, you'll see initial results with probability estimates.<br /><br />The key is starting simple and building confidence. Once you see how easy it is, you'll naturally progress to more complex experiments. Before long, you'll be testing everything, and your metrics (and investors) will thank you for it.",
        ai: 'The PostHog MCP server lets your AI coding agent create and manage Experiments directly from your code editor. Set up A/B tests, check results, and manage Experiment lifecycle – without switching to the PostHog app.',
    },
    ai: {
        // Flask mascot from the PostHog AI page – deliberately different art from
        // `hogs.mobileHog` (header) and `hogs.default` (use cases).
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/experiments_f90ed26268.png',
        imageAlt: 'PostHog AI and experiments',
        description: 'set up experiments, read the results, and ship the winner',
        intro: 'Ask PostHog AI to set up experiments, read the results, and ship the winner.',
        mcpFeatures: ['experiments'],
        skills: [
            'Configures experiments and variants from natural language',
            'Summarizes results, identifies likely winners, and suggests ideas for follow-up tests',
            'Spots common setup problems that would skew your statistics',
        ],
        // Prompts drawn from existing product copy + skillsData; tools verified in mcp-tools.json.
        groups: [
            {
                title: 'Create',
                tool: 'experiment-create',
                prompts: [
                    'Set up an A/B test with a 70/30 split for a new red button on the homepage',
                    'Set up and launch a homepage hero A/B test with signup as the primary metric',
                    'Create a simple A/B test to confirm experiments work end to end',
                ],
            },
            {
                title: 'Launch',
                tool: 'experiment-launch',
                prompts: [
                    'Launch my first experiment and show results',
                    'Launch a pricing-page A/B test and watch signup conversion',
                ],
            },
            {
                title: 'Results',
                tool: 'experiment-results-get',
                prompts: [
                    'Summarize experiment results for my latest feature rollout',
                    'Is the new hero winning yet? Pull the experiment results',
                    'Did the new pricing layout hurt conversion? Pull results',
                ],
            },
            {
                title: 'Stats',
                tool: 'experiment-stats',
                prompts: [
                    'Is this experiment actually significant, or are we fooling ourselves?',
                    'Check the stats and time series before we call this a win',
                    'Confirm this test is valid before we ship',
                ],
            },
            {
                title: 'Timeseries',
                tool: 'experiment-timeseries-results',
                prompts: [
                    'Show daily results for this experiment – is the lift a novelty effect?',
                    'Plot the experiment over time, not just the summary',
                ],
            },
            {
                title: 'Ship winner',
                tool: 'experiment-ship-variant',
                prompts: ['Ship the winner and stop the rest'],
            },
            {
                title: 'End losers',
                tool: 'experiment-end',
                prompts: [
                    'Which running experiments are clearly losing? End them',
                    'Review all experiments and clean up the dead ones',
                ],
            },
            {
                title: 'Duplicate',
                tool: 'experiment-duplicate',
                prompts: [
                    'That pricing test won – clone it for the mobile flow and launch',
                    'Duplicate this experiment onto the signup page',
                ],
            },
            {
                title: 'Archive',
                tool: 'experiment-archive',
                prompts: [
                    'Archive every experiment older than 90 days that’s already shipped or stopped',
                    'Clean up our experiments list',
                ],
            },
            {
                title: 'Find',
                tool: 'experiment-list',
                prompts: [
                    'Where would an experiment move the needle most given our traffic and conversion?',
                    'Suggest the next high-leverage test to run',
                ],
            },
            {
                title: 'Shared metrics',
                tool: 'experiment-saved-metrics-create',
                prompts: ['Create shared saved metrics so every experiment measures activation the same way'],
            },
        ],
    },
}
