import React from 'react'
import {
    IconPieChart,
    IconEye,
    IconSparkles,
    IconList,
    IconConfetti,
    IconRocket,
    IconCheckCircle,
    IconInfo,
    IconCursorClick,
    IconMagic,
    IconChat,
    IconCode,
    IconMessage,
    IconNewspaper,
} from '@posthog/icons'
import { FIFTY_MILLION, MAX_PRODUCT_ANALYTICS, MILLION, TEN_MILLION } from 'components/Pricing/pricingLogic'
import Link from 'components/Link'
import { features } from './web_analytics/features'
import { applications, topFeatures } from './web_analytics/slides'

export const webAnalytics = {
    Icon: IconPieChart,
    name: 'Web Analytics',
    handle: 'web_analytics',
    type: 'product_analytics',
    // Billed as product analytics events – Plans/calculator resolve against this billing product.
    billingType: 'product_analytics',
    slug: 'web-analytics',
    teamSlug: 'web-analytics',
    forumTopicId: 348,
    color: 'green-2',
    colorSecondary: '[#37945D]',
    category: 'analytics',
    wizardSupport: true,
    billedWith: 'Product Analytics',
    billedWithSlug: 'product-analytics',
    shortDescription: 'Privacy-focused web analytics',
    pricingDescription:
        'Web Analytics is billed as Product Analytics events, so you get access to both products for the same price. 1 million events free monthly. Anonymous events cost 10x less than identified. Most sites never pay anything. Even high-traffic sites pay way less than GA 360.',
    pricingLead:
        'Web Analytics is billed as Product Analytics events, so you get access to both products for the same price.',
    pricingHighlights: [
        '1 million events free every month',
        'Anonymous events cost 10x less than identified',
        'Most sites never pay anything',
    ],
    pricingFooter: 'Even high-traffic sites pay way less than GA 360.',
    seo: {
        title: 'Web Analytics – Track and measure traffic with PostHog',
        description:
            'Track traffic and performance with Web Analytics – the lightweight measurement layer that feeds your agents the context to make your product self-driving.',
    },
    /**
     * Sections rendered on the Product surface (`/web-analytics`). Each entry
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
        { slug: 'pairs-with', name: 'Pairs with...', hideFromNav: true, icon: <IconConfetti className="size-4" /> },
        { slug: 'changelog', name: 'Changelog', group: 'divided', icon: <IconNewspaper className="size-4" /> },
        { slug: 'community', name: 'Questions?', group: 'divided', icon: <IconMessage className="size-4" /> },
        {
            slug: 'feature-comparison',
            name: 'Feature comparison',
            group: 'divided',
            icon: <IconList className="size-4" />,
        },
        {
            slug: 'installation',
            name: 'Install',
            group: 'divided',
            icon: <IconCode className="size-4" />,
        },
        { slug: 'getting-started', name: 'Get started', group: 'divided', icon: <IconRocket className="size-4" /> },
    ],
    /**
     * Sections rendered on the Pricing surface (`/web-analytics/pricing`).
     * Same shape as `productMenu`. Plans/calculator use Product Analytics
     * billing via `billingType` + `pricingDescription`.
     */
    pricingMenu: [
        { slug: 'plans', name: 'Plans', icon: <IconCheckCircle className="size-4" /> },
        { slug: 'calculator', name: 'Pricing calculator', icon: <IconPieChart className="size-4" /> },
        { slug: 'comparison-summary', name: 'PostHog vs...', icon: <IconList className="size-4" /> },
        // Hidden footer CTA rendered at the bottom of the Pricing surface.
        { slug: 'pricing-cta', name: 'Get started', hideFromNav: true },
    ],
    overview: {
        title: 'Privacy-focused web analytics',
        description:
            'Web analytics is one of the tools that makes your product self-driving: the lightweight measurement layer that feeds agents traffic context. Built to natively work with session replay, feature flags, experiments, and surveys.',
        eli5: 'Web Analytics is a pre-built dashboard for website traffic – visitors, pageviews, sessions, bounce rate, referrers, UTMs, and Core Web Vitals – without the GA4 maze. Drop in a snippet (or use a no-code install), get real-time data, and optionally skip cookies entirely. Same events power product analytics and session replay when you want to go deeper.',
        textColor: 'text-[#063619]', // tw
    },
    videos: {
        overview: {
            wistia: '092mo7cump',
        },
    },
    screenshots: {
        overview: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_web_analytics_2a101a8558.png',
            alt: 'Screenshot of web analytics in PostHog',
            classes: '',
        },
        home: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_web_analytics_dashboard_light_313729cacc.png',
            srcDark:
                'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_web_analytics_dashboard_dark_20eb61e4b2.png',
            alt: 'Web analytics dashboard',
            classes: 'justify-end items-end pl-4 @lg:pl-6',
            imgClasses: 'rounded-tl-md shadow-2xl',
        },
        referrers: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1711580002/posthog.com/contents/images/docs/web-analytics/dashboard/referrers-light.png',
            srcDark:
                'https://res.cloudinary.com/dmukukwp6/image/upload/v1711580002/posthog.com/contents/images/docs/web-analytics/dashboard/referrers-dark.png',
            alt: 'Traffic sources and referrers',
        },
        paths: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1711580005/posthog.com/contents/images/docs/web-analytics/dashboard/paths-light.png',
            srcDark:
                'https://res.cloudinary.com/dmukukwp6/image/upload/v1711580004/posthog.com/contents/images/docs/web-analytics/dashboard/paths-dark.png',
            alt: 'Top paths in web analytics',
        },
    },
    hog: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/Slider/images/web-analytics-hog.png',
        alt: 'A hedgehog looking at web analytics',
        classes: 'absolute bottom-0 right-0 max-w-md',
        footerClasses: 'max-w-[240px]',
    },
    hogs: {
        default: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/Slider/images/web-analytics-hog.png',
            alt: 'A hedgehog looking at web analytics',
        },
        mobileHog: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/web_cursor_hog_2e5fec02ad.png',
            alt: 'A hedgehog with a web analytics cursor',
        },
    },
    // Same event volume slider as product analytics (web analytics is billed with it).
    slider: {
        marks: [MILLION, TEN_MILLION, FIFTY_MILLION, MAX_PRODUCT_ANALYTICS],
        min: MILLION,
        max: MAX_PRODUCT_ANALYTICS,
    },
    volume: MILLION,
    customers: {
        ycombinator: {
            headline: 'gets 30% more data than with GA4',
            description: 'Other platforms we looked at dropped data due to adblockers and third-party cookies.',
        },
        significa: {
            headline: 'switched from Plausible',
            description:
                'PostHog is way more powerful and insightful than Plausible. We have more info than we used to have.',
        },
        creatify: {
            headline: 'switched from Google Analytics',
            description: 'Web analytics gives us all the metrics we really care about. It is so much better than GA4.',
        },
    },
    useCases: {
        intro: 'Web Analytics is used across teams depending on your role.',
        rows: [
            ['Growth Marketers', 'See which channels, UTMs, and landing pages drive visits and conversions'],
            ['Founders', 'Check traffic health on a pre-built dashboard without waiting on a data team'],
            ['Product Engineers', 'Validate deploys – did pageviews, bounce rate, or Web Vitals move after ship?'],
            ['Growth Engineers', 'Find high-bounce pages, scroll drop-off, and campaign paths worth fixing'],
            ['Content & SEO', 'Rank pages by entrances, bounce, and conversion to prioritize what to rewrite'],
        ],
    },
    features,
    mcp: {
        title: 'MCP',
        headline: 'Query traffic from your editor',
        description:
            'Check traffic, investigate anomalies, and build traffic dashboards from Cursor, Claude Code, VS Code, or any MCP-compatible agent.',
    },
    installation: {
        title: 'Install',
        headline: 'Install',
        description:
            'Add a snippet, SDK, or no-code install – then open the pre-built dashboard. Autocapture handles pageviews; cookieless mode is optional.',
        productSlug: 'web-analytics',
        categories: ['web', 'mobile', 'no-code'],
    },
    postHogOnPostHog: {
        title: 'How PostHog uses Web Analytics',
        benefits: [
            {
                title: 'Track pageviews, visitors,',
                description: 'and other essential web metrics',
            },
            {
                title: 'Gauge site performance',
                description: 'using bounce rates and Core Web Vitals',
            },
            {
                title: 'Protect user privacy',
                description: 'with cookieless tracking and anonymous mode',
            },
            {
                title: 'Monitor ad performance',
                description: 'by focusing on landing page conversions',
            },
            {
                title: 'Understand users',
                description: 'by looking at device types and demographics',
            },
        ],
    },
    answersHeadline: "Here's what you can do with Web Analytics",
    answersDescription: 'Plus some helpful reading for no-code platforms',
    questions: [
        {
            question: 'Find broken links (404s)',
            url: '/tutorials/broken-link-checker',
        },
        {
            question: 'Analytics without cookies',
            url: '/tutorials/cookieless-tracking',
        },
        {
            question: 'Cross-domain tracking',
            url: '/tutorials/cross-domain-tracking',
        },
        {
            question: 'How to capture paths from hash-based routing',
            url: '/tutorials/hash-based-routing',
        },
        {
            question: 'What are Core Web Vitals?',
            url: '/docs/web-analytics/web-vitals',
        },
        {
            question: 'Identifying users',
            url: '/tutorials/identifying-users-guide',
        },
        {
            question: 'Squarespace analytics',
            url: '/tutorials/squarespace-analytics',
        },
        {
            question: 'Framer analytics',
            url: '/tutorials/framer-analytics',
        },
        {
            question: 'Ghost CMS analytics',
            url: '/tutorials/ghost-analytics',
        },
        {
            question: 'A non-technical guide to PostHog data',
            url: '/tutorials/non-technical-guide-to-data',
        },
    ],
    comparison: {
        summary: {
            them: [
                {
                    title: 'You only need web analytics, nothing else',
                },
                {
                    title: "You don't need any integrations other than with Google",
                },
                {
                    title: 'You need to migrate data from GA4',
                },
                {
                    title: 'You actually really like GA4 🤡',
                    subtitle: 'We recommend seeking medical attention.',
                },
            ],
            us: [
                {
                    title: 'Agents can query your traffic and act on it – the context that powers self-driving',
                },
                {
                    title: 'You want to do more than just web analytics',
                    subtitle: 'Web Analytics integrates with the entire PostHog ecosystem.',
                },
                {
                    title: "You don't want to spend weeks setting up dashboards",
                },
                {
                    title: 'You need to comply with HIPAA',
                },
                {
                    title: "It's not GA4...",
                },
            ],
        },
        companies: [
            {
                name: 'GA4',
                key: 'ga4',
                link: '/blog/posthog-vs-ga4',
            },
            {
                name: 'Matomo',
                key: 'matomo',
                link: '/blog/posthog-vs-matomo',
            },
            {
                name: 'PostHog',
                key: 'posthog',
            },
        ],
        rows: ['web_analytics'],
        excluded_sections: ['platform.libraries', 'platform.developer', 'platform.integrations'],
    },
    pairsWith: [
        {
            slug: 'product-analytics',
            description: 'Go deeper than a dashboard by building your own insights and SQL queries from scratch.',
        },
        {
            slug: 'session-replay',
            description:
                "Get more context by watching what users actually do on your site. Spot the nuances that quantifiable data doesn't tell you.",
        },
        {
            slug: 'surveys',
            description:
                'Get even more context by sending surveys to users. Arrange interviews. Ask questions. Serve pop-ups.',
        },
    ],
    ai: {
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/web_analytics_92791a9d9b.png',
        imageAlt: 'PostHog AI and web analytics',
        imageClasses: 'w-96',
        // Reshaped from presenterNotes.ai (existing MCP blurb)
        intro: 'Query web analytics data to check traffic trends, investigate anomalies, and build dashboards.',
        mcpFeatures: ['web_analytics', 'insights', 'product_analytics', 'dashboards'],
        skills: [
            'Filters web traffic by path, geography, device, or referrer',
            'Investigates traffic spikes, dips, and other anomalies',
            'Analyzes Core Web Vitals to identify performance bottlenecks',
        ],
        // Reshaped from existing ai.prompts + contents/docs/web-analytics/query-traffic-mcp.mdx examples.
        // Tool names verified against src/data/mcp-tools.json.
        groups: [
            {
                title: 'Traffic overview',
                tool: 'query-web-overview',
                prompts: [
                    'How many pageviews did we get today vs yesterday?',
                    'There was an odd traffic spike yesterday – find the root cause',
                    'Which countries are driving the most traffic?',
                ],
            },
            {
                title: 'Breakdowns',
                tool: 'query-web-stats',
                prompts: [
                    'Which landing pages have the highest bounce rate this month?',
                    'What are the top landing pages by traffic this week?',
                    'Show me traffic broken down by referral source for the past 30 days.',
                    "What's the bounce rate on /pricing compared to /docs?",
                ],
            },
            {
                title: 'Web vitals',
                tool: 'query-web-vitals',
                prompts: [
                    'Which pages have the worst LCP at p75 this week?',
                    'Where is CLS poor on the marketing site?',
                    'Audit Core Web Vitals and list the pages in the poor band for INP',
                    "Which paths need LCP improvements after yesterday's deploy?",
                ],
            },
            {
                title: 'Build & save',
                tool: 'insight-create',
                prompts: [
                    'Create a dashboard showing web traffic by source and campaign',
                    'Create a dashboard showing daily pageviews, top pages, and traffic by source.',
                ],
            },
            {
                title: 'Weekly digest',
                tool: 'web-analytics-weekly-digest',
                prompts: [
                    'Write me a Monday exec digest: growth, retention, errors, and what shipped',
                    'Summarize last week across the business into one notebook',
                    'What moved this week and what should I worry about?',
                ],
            },
        ],
    },
    presenterNotes: {
        overview:
            "<strong>Presenter notes:</strong> Google took something great (GA3) and made it worse. So we built what GA3 should have evolved into - simple, privacy-focused, no sampling. Works out of the box. Plus it's part of the whole PostHog platform, so you can jump from a traffic spike to watching recordings of those exact sessions. And no cookies required if you don't want them.",
        customers:
            "Y Combinator gets 30% more data than GA4 because you can create a reverse proxy which privacy tools can't block. Significa ditched Plausible for us - more powerful, same privacy focus. Creatify summed it up: 'It's so much better than GA4.' These aren't edge cases. PostHog Web Analytics can't replace *everything* in GA4 (yet) like advanced attribution features, but we're getting there.",
        features:
            "<strong>Core metrics:</strong> Everything you expect: visitors, pageviews, sessions, bounce rate. Real-time. No sampling. Cookieless option means no cookie banner needed.<br /><br /><strong>Traffic sources:</strong> Auto-categorizes into channels (Direct, Organic, Paid, Social). Full UTM support. Create custom channels like 'AI' or 'Partners'. See exactly which sites send traffic.<br /><br /><strong>Core Web Vitals:</strong> You can monitor all of Google's webpage UX metrics and find specific insights you can use to improve pages across your site. You can filter to individual pages or use wildcard rules to analyze something like a particular subpath.<br /><br /><strong>Advanced analytics:</strong> Scroll depth shows how far people actually read. Web Vitals (LCP, FCP, INP, CLS) for Core Web Vitals tracking. Set conversion goals. Track revenue. See when users are active.<br /><br /><strong>Privacy & compliance:</strong> GDPR compliant. Optional cookieless tracking. Anonymous mode cuts costs dramatically. Reverse proxy reduces ad blocker impact by 70%+. Choose US or EU hosting.<br /><br /><strong>Device & demographics:</strong> Device types, browsers, OS, screen sizes. Country and city data. Automatic bot filtering. Everything you need to know your audience.<br /><br /><strong>Works with product analytics:</strong> Same events power both. No duplicate tracking. Cross-domain support. Connect backend events to frontend sessions. No extra cost beyond events.",
        answers: '',
        pricing: (
            <>
                PostHog's Web Analytics is billed as Product Analytics events, which means you get access to both
                products for the same price. 1 million events free monthly. Anonymous events cost 10x less than
                identified. (
                <Link state={{ newWindow: true }} to="/docs/data/anonymous-vs-identified-events">
                    Learn about the difference between anonymous events and identified events.
                </Link>
                ) Most sites never pay anything. Even high-traffic sites pay way less than GA 360.
            </>
        ),
        'comparison-summary':
            "GA4 is free but also really hard to use. Matomo is privacy-focused but limited. We're privacy-focused AND powerful. Plus we're not just web analytics – it's integrated with everything else, so agents can act on your traffic context directly rather than just reading a dashboard. That's what makes your product self-driving. If you liked GA3, you'll love this. If you like GA4, please seek medical attention immediately. (But spoiler: doctors orders will likely be to try PostHog Web Analytics.)",
        'feature-comparison':
            "We have mostly everything the others have plus: scroll depth, custom channels, no sampling, ad blocker resilience, and integrated product analytics. You're welcome.",
        docs: "Setup takes minutes. Add our snippet, see data. We document every metric clearly. Common questions like 'unique vs returning visitors' explained simply. Migration guides from GA4 and others included.",
        'pairs-with':
            "See traffic spike? Click through to session replays of those visitors. Run surveys on specific traffic sources. Build custom analytics beyond the dashboard. It all connects because it's one platform.",
        'getting-started':
            "Add our snippet. Data flows immediately. The pre-built dashboard has everything most people need. Later, customize with product analytics if you want deeper insights. But if you're just looking for a web analytics, the defaults are probably enough.",
        ai: 'The PostHog MCP server lets your AI coding agent query web analytics data directly from your code editor. Check traffic trends, investigate anomalies, and build dashboards – without switching to the PostHog app.',
    },
}
