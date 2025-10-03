import React from 'react'
import { IconFlask } from '@posthog/icons'
import Link from 'components/Link'

export const experiments = {
    Icon: IconFlask,
    name: 'Experiments',
    handle: 'experiments',
    type: 'feature_flags',
    billedWith: 'Feature flags',
    sharesFreeTier: 'feature_flags',
    slug: 'experiments',
    color: 'purple',
    colorSecondary: 'lilac',
    category: 'product_engineering',
    seo: {
        title: 'Experiments - PostHog',
        description: 'Run statistically-significant multivariate tests and robust targeting & exclusion rules.',
    },
    overview: {
        title: 'Test changes with statistical significance',
        description: (
            <>
                Run statistically rigorous experiments, use precise targeting and exclusion rules, and analyze your
                groups with{' '}
                <Link to="/session-replay" className="font-bold underline" state={{ newWindow: true }}>
                    Session Replay
                </Link>
                .
            </>
        ),
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
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_experiments_result_light_465bac8937.png',
            srcDark:
                'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_experiments_result_dark_399c2187ea.png',
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
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/hogs/ab-testing-hog.png',
        alt: 'Hedgehog experimenting',
        classes: 'absolute bottom-0 right-0 max-w-md',
    },
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
    features: [
        {
            title: 'Experiment types',
            headline: 'Choose the right metric for your goal and track side effects across your product.',
            description: 'Supports conversion funnels, count-based trends, value-based metrics, and custom metrics',
            features: [
                {
                    title: 'Funnel metrics',
                    description: 'Track conversion rates across multi-step journeys, like signup flows or checkout.',
                },
                {
                    title: 'Count & value metrics',
                    description:
                        'Measure totals such as pageviews or clicks, or capture values like revenue, order size, or time spent.',
                },
                {
                    title: 'Ratio metrics',
                    description: 'Test ratios such as percentage of positive feedback to capture deeper insights.',
                },
                {
                    title: 'Primary & secondary metrics',
                    description: 'Monitor main goals while watching for negative side effects',
                },
                {
                    title: 'Shared metrics library',
                    description:
                        'Create reusable metrics across experiments for consistency and easy experiment setup.',
                },
            ],
        },
        {
            title: 'Supported tests',
            headline: 'Run a variety of tests depending on your needs',
            features: [
                {
                    title: 'A/B testing',
                    description:
                        'Compare two versions of a feature or flow using count, value, funnel, or ratio metrics. The standard way to see what works best.',
                },
                {
                    title: 'A/A testing',
                    description:
                        'Test identical variants to validate your setup and ensure results aren’t biased by random chance.',
                },
                {
                    title: 'A/B/N testing',
                    description:
                        'Run experiments with three or more variants to quickly identify the best-performing option.',
                },
                {
                    title: 'Holdout testing',
                    description:
                        'Reserve a group of users who don’t see any changes, so you can measure long-term impact against a true baseline.',
                },
                {
                    title: 'Fake door testing',
                    description:
                        'Measure interest in a potential feature by exposing users to a “coming soon” entry point before building it.',
                },
                {
                    title: 'Redirect testing',
                    description:
                        'Send users to different versions of a page or flow (like a signup path) to test changes at the navigation level.',
                },
            ],
        },
        {
            title: 'Targeting rules',
            headline: 'Target by user properties, cohorts, geographic location, or custom conditions',
            layout: 'columns',
            features: [
                {
                    title: 'Cohort integration',
                    description: 'Target specific user segments or behavioral cohorts.',
                },
                {
                    title: 'Geographic targeting',
                    description: 'Limit experiments to certain countries or regions to account for local differences.',
                },
                {
                    title: 'Percentage rollouts',
                    description:
                        'Start with a small slice of users (e.g. 5%) and gradually expand once results look good.',
                },
                {
                    title: 'Group-level experiments',
                    description: 'Run tests at the organization, account, or team level – ideal for B2B products.',
                },
                {
                    title: 'Holdouts',
                    description:
                        'Set aside a random group of users who never see the change, giving you a clean baseline for long-term measurement.',
                },
            ],
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/us_posthog_com_project_2_feature_flags_160557_cc3f425138.png',
                    alt: 'Targeting rules',
                    // stylize: true,
                    shadow: true,
                },
            ],
        },
        {
            title: 'Customizable metrics',
            headline: 'Customizable metrics',
            description:
                'Conversion funnels or trends, secondary metrics, and range for statistical significance. You can also use a primary or secondary metric from a data warehouse table.',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_09_09_at_11_59_57_265b164241.png',
                    alt: 'Customizable metrics',
                    // stylize: true,
                    shadow: true,
                },
            ],
        },
        // {
        //     title: 'Auto recommendations',
        //     headline: 'Built-in guidance for successful experiments',
        //     description:
        //         'Get automatic recommendations for sample size, test duration, and minimum detectable effects based on your data',
        //     layout: 'columns',
        //     images: [
        //         {
        //             src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/AbTesting/images/recommendations.png',
        //             alt: 'Smart recommendations',
        //             stylize: true,
        //             shadow: true,
        //         },
        //     ],
        //     features: [
        //         {
        //             title: 'Sample size calculator',
        //             description: 'Know how many users you need based on your minimum detectable effect',
        //         },
        //         {
        //             title: 'Duration estimates',
        //             description: 'Get recommendations on how long to run your test',
        //         },
        //         {
        //             title: 'Pre-launch checklist',
        //             description: 'Ensure your experiment is set up correctly before launch',
        //         },
        //         {
        //             title: 'Health monitoring',
        //             description: 'Automatic alerts for sample ratio mismatch and other issues',
        //         },
        //     ],
        // },
        {
            title: 'Developer-friendly implementation',
            headline: 'Simple integration with powerful capabilities',
            description: 'Built on our feature flag infrastructure with all major SDKs supported',
            features: [
                {
                    title: 'Feature flag foundation',
                    description:
                        'Experiments run on PostHog’s battle-tested feature flag infrastructure, with full support across all major SDKs.',
                },
                {
                    title: 'JSON payloads',
                    description:
                        'Pass structured data to variants, letting you dynamically configure and change user experiences without redeploys.',
                },
                {
                    title: 'Multivariate testing',
                    description:
                        'Run tests with up to 9 variants plus a control, giving you the flexibility to explore multiple approaches at once.',
                },
                {
                    title: 'Local evaluation',
                    description: 'Zero latency with flag values evaluated on your server.',
                },
                {
                    title: 'Cross-platform SDKs',
                    description:
                        'Web, mobile, backend, and server-side SDKs make it easy to run consistent experiments anywhere in your stack.',
                },
            ],
        },
    ],
    postHogOnPostHog: {
        title: 'How PostHog uses experiments',
        benefits: [
            {
                title: 'A/B tests',
                description: 'to compare one idea against another',
            },
            {
                title: 'A/A tests',
                description: 'to test one idea against itself',
            },
            {
                title: 'A/B/N tests',
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
                name: 'PostHog',
                key: 'posthog',
            },
        ],
        features: [
            {
                feature: 'Unlimited experiments',
                companies: {
                    amplitude: true,
                    optimizely: true,
                    pendo: false,
                    vwo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Multivariate experiments',
                companies: {
                    amplitude: true,
                    optimizely: true,
                    pendo: false,
                    vwo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Secondary metrics',
                companies: {
                    amplitude: true,
                    optimizely: true,
                    pendo: false,
                    vwo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Minimum metrics',
                companies: {
                    amplitude: true,
                    optimizely: true,
                    pendo: false,
                    vwo: false,
                    posthog: true,
                },
            },
            {
                feature: 'Duration prediction',
                companies: {
                    amplitude: false,
                    optimizely: false,
                    pendo: false,
                    vwo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Cross-domain experiments',
                companies: {
                    amplitude: false,
                    optimizely: true,
                    pendo: false,
                    vwo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Traffic allocation',
                companies: {
                    amplitude: false,
                    optimizely: true,
                    pendo: false,
                    vwo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Target by cohort',
                companies: {
                    amplitude: true,
                    optimizely: true,
                    pendo: true,
                    vwo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Target by person property',
                companies: {
                    amplitude: true,
                    optimizely: true,
                    pendo: true,
                    vwo: false,
                    posthog: true,
                },
            },
            {
                feature: 'Bayesian statistics',
                companies: {
                    amplitude: false,
                    optimizely: false,
                    vwo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Check results anytime',
                companies: {
                    amplitude: false,
                    optimizely: false,
                    vwo: false,
                    posthog: true,
                },
            },
            {
                feature: 'Group-level experiments',
                companies: {
                    amplitude: false,
                    optimizely: false,
                    vwo: false,
                    posthog: true,
                },
            },
            {
                feature: 'Integrated session replay',
                companies: {
                    amplitude: false,
                    optimizely: false,
                    vwo: false,
                    posthog: true,
                },
            },
            {
                feature: 'Shared metrics library',
                companies: {
                    amplitude: false,
                    optimizely: true,
                    vwo: true,
                    posthog: true,
                },
            },
        ],
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
            'Y Combinator tested small changes systematically and saw a 40% engagement boost. ResearchGate runs experiments on 25 million users. Vendasta tested "insignificant" ideas and got 30% more registrations. They all move fast because they\'re not waiting weeks for "significance".',
        features:
            '<strong>Experiments:</strong> Pick a metric. Test funnels, clicks, revenue, whatever. Add secondary metrics to catch side effects (like signups up but activation down).<br /><br /><strong>Statistical analysis:</strong> Check results day 1, day 3, or day 30 - it won\'t mess up your stats. (Other tools punish you for "peeking".) We let <em>you</em> decide when you have enough evidence.<br /><br /><strong>Bayesian statistical engine:</strong> You can make better data decisions with statistically-significant probability. For example, "95% probability on variant B is better by 5-10%" vs. not null hypothesis rejection nonsense. See the likely impact range so you can weigh improvement vs implementation cost.<br /><br /><strong>Flexible experiment types:</strong> Test anything - conversion rates, average order value, session time, feature depth. Shared metrics library means define once, use them across PostHog.<br /><br /><strong>Smart recommendations:</strong> We analyze your data and give you accurate predictions: "5% improvement with high variance? 6 weeks." "50% improvement on stable metric? 1 week." It also catches sample ratio mismatch (ie: your randomization is broken).<br /><br /><strong>Advanced targeting:</strong> For example, test pricing for US users who joined after Jan 1st. Or enterprise features for 100+ employee companies. B2B? Run group-level experiments so everyone at a company sees the same thing.<br /><br /><strong>Developer-friendly implementation:</strong> Every experiment is just a feature flag but with a powerful engine on top. Same SDKs, same infrastructure. Local evaluation, bootstrapping, JSON payloads - all included.',
        // answers:
        // "These questions reflect real decisions teams face every day. Testing a new onboarding flow? Set up a funnel experiment measuring completion rates. Geographic differences matter—our automatic IP resolution lets you analyze results by region without manual setup. For B2B products, group-level experiments ensure everyone at a company sees the same experience, avoiding the confusion of user-level randomization. Revenue experiments need special care—make sure you're tracking the full customer journey, not just the purchase event. And yes, you should test that social proof—we've seen it increase conversions by 20-40% for many teams.",
        pricing:
            'Experiments are billed as feature flag requests since that\'s what they are under the hood. You get 1 million requests free per month, then pay-as-you-go after that. This is radically different from tools like Optimizely that can run 5-figures annually for experimentation. With PostHog, a typical B2C app running 5-10 experiments might use 10-20 million requests per month. That\'s a few hundred dollars, not tens of thousands. And you get all features—no "enterprise" tier needed for basic functionality like API access or custom metrics. And the best part: get it all without "jumping on a quick call with sales!"',
        'comparison-summary':
            "The experimentation landscape has three camps: dedicated tools like Optimizely, analytics add-ons like Amplitude, and integrated platforms like PostHog. Optimizely is powerful but expensive and complex. Amplitude requires you to already use Amplitude. PostHog gives you experimentation as part of a complete platform. Our Bayesian engine is genuinely differentiated – most tools still use frequentist statistics that don't let you check results early. We also uniquely support group-level experiments for B2B products and integrate deeply with session replay for qualitative insights.",
        'feature-comparison':
            "This comparison highlights our unique strengths. PostHog Experiments is the only tool that lets you check results anytime without statistical penalties – a huge advantage for fast-moving teams. Group-level experiments are exclusive to PostHog, critical for B2B products. The integrated session replay means you can watch users in each variant to understand the 'why' behind the numbers. Our shared metrics library ensures consistency across experiments.",
        docs: "Our experimentation docs go deep into the statistical methodology because we believe you should understand the tools you're using. We explain Bayesian vs. frequentist approaches, sequential testing, and why we've made certain choices. But we also keep it practical with guides on common patterns: testing pricing changes, optimizing onboarding funnels, and measuring long-term impact.",
        'pairs-with':
            "PostHog Experiments truly shine when combined with our other products. Start with an experiment on a new feature, then use product analytics to dive deeper than your primary metric—maybe conversion increased but time-to-convert also increased. Watch session recordings of users in each variant to see exactly how they interact differently. If the experiment wins, roll it out gradually using the same feature flag. This integrated workflow means you're not jumping between tools or trying to match user IDs across systems. It's one platform where everything connects.",
        'getting-started':
            "If you don't have a ton of experience running tests, here's an idea to get you going: your first experiment should be something simple with a clear metric. Maybe test a new button color (yes, they can matter especially at scale in B2C apps) or headline text. Create the experiment, which automatically creates a feature flag. Implement the flag check in your code – usually 5-10 lines (and AI is really good at helping with this!). Launch to 50% of users and within days, you'll see initial results with probability estimates.<br /><br />The key is starting simple and building confidence. Once you see how easy it is, you'll naturally progress to more complex experiments. Before long, you'll be testing everything, and your metrics (and investors) will thank you for it.",
    },
}
