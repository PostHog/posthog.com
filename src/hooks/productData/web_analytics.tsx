import React from 'react'
import { IconPieChart } from '@posthog/icons'
import Link from 'components/Link'

export const webAnalytics = {
    Icon: IconPieChart,
    name: 'Web Analytics',
    handle: 'web_analytics',
    type: 'product_analytics',
    slug: 'web-analytics',
    color: 'green-2',
    colorSecondary: '[#37945D]',
    category: 'analytics',
    billedWith: 'Product analytics',
    seo: {
        title: 'Web Analytics – Track and measure traffic with PostHog',
        description:
            'Track traffic, funnels, and performance with Web Analytics. Get privacy-friendly insights, pre-built dashboards, real-time data, and no sampling.',
    },
    overview: {
        title: 'Privacy-focused web analytics',
        description:
            'Track visitors, pageviews, and conversions with a pre-built dashboard. No cookies required, no complex setup, real-time data, and privacy-focused. Built for people who really liked GA3...',
        textColor: 'text-[#063619]', // tw
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
    },
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
    features: [
        {
            title: 'Core metrics',
            headline: 'Track visitors. Cookies not required.',
            description:
                "If you're privacy-focused, our cookieless option means you don't need to add a cookie banner just for your web analytics.",
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/web_analytics_top_light_mode_2024_10_be53cf5325.png',
                    alt: 'Web analytics dashboard',
                    stylize: true,
                    shadow: true,
                },
            ],
            features: [
                {
                    title: 'Visitors & pageviews',
                    description: 'Track unique visitors and total page views with real-time updates',
                },
                {
                    title: 'Sessions & duration',
                    description: 'Monitor visit frequency and how long users stay engaged',
                },
                {
                    title: 'Bounce rate',
                    description: 'See what percentage of users leave after viewing one page',
                },
                {
                    title: 'Entry & exit paths',
                    description: 'Understand where users start and end their journeys',
                },
            ],
        },
        {
            title: 'Traffic sources',
            headline: 'Check your sources',
            description:
                'Track channels, referrers, UTMs, and create custom attribution channels for comprehensive source analysis.',
            images: [
                {
                    src: '/images/products/web-analytics/top-referrers.jpg',
                    alt: 'Traffic sources',
                    shadow: true,
                },
            ],
            imagesClasses: '-mr-8',
            layout: 'columns',
            features: [
                {
                    title: 'Channel attribution',
                    description: 'Automatic categorization into Direct, Organic, Paid, Social, etc.',
                },
                {
                    title: 'Referrer tracking',
                    description: 'See which websites send you the most valuable traffic',
                },
                {
                    title: 'UTM parameters',
                    description: 'Full support for campaign, source, medium, content, and term',
                },
                {
                    title: 'Custom channels',
                    description: 'Define your own channels like AI, partners, or affiliates',
                },
                {
                    title: 'Session explorer',
                    description: 'Deep dive into individual session attribution details',
                },
            ],
        },
        {
            title: 'Core Web Vitals',
            headline: 'Monitor Core Web Vitals',
            description: (
                <>
                    Track LCP, FCP, INP, and CLS for performance optimization. Also available in PostHog Toolbar.{' '}
                    <div className="text-base">
                        <Link state={{ newWindow: true }} to="/docs/web-analytics/web-vitals">
                            What do all these silly acronyms mean?
                        </Link>
                    </div>
                </>
            ),
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/w_1000,c_limit,q_auto,f_auto/web_vitals_4704da6644.png',
                    alt: 'Web vitals',
                    shadow: true,
                },
            ],
            features: [
                {
                    title: 'Graph changes over time',
                    description: 'Monitor changes to your performance optimization metrics',
                },
                {
                    title: 'Find which paths have good and bad performance',
                    description: 'See paths broken down by load time',
                },
                {
                    title: 'Filtering options',
                    description: 'Analyze by domain, path, device type, and user properties',
                },
                {
                    title: 'Analyze by performance percentile',
                    description: 'Start with p90 or optimize even further',
                },
            ],
        },
        {
            title: 'Advanced analytics',
            headline: 'Go beyond basic metrics with powerful insights',
            description: 'Track scroll depth, conversions, and revenue directly in your web analytics.',
            features: [
                {
                    title: 'Scroll depth tracking',
                    description: 'See how far users scroll and what content they actually read',
                },
                {
                    title: 'Conversion goals',
                    description: 'Set up and track multiple conversion events',
                },
                {
                    title: 'Revenue tracking',
                    description: 'Connect revenue data from events or payment platforms',
                },
                {
                    title: 'Active hours heatmap',
                    description: 'Visualize when your users are most active',
                },
            ],
        },
        {
            title: 'Privacy & compliance',
            headline: 'Analytics that respects user privacy',
            description:
                'GDPR compliant, cookieless options, and ad blocker resilient tracking for better data coverage.',
            features: [
                {
                    title: 'Cookieless tracking',
                    description: 'Option to track without cookies for strict privacy requirements',
                },
                {
                    title: 'Anonymous mode',
                    description: 'Significantly reduce costs with anonymous visitor tracking',
                },
                {
                    title: 'GDPR compliant',
                    description: 'Built with privacy regulations in mind from the start',
                },
                {
                    title: 'Ad blocker resilient',
                    description: 'Reverse proxy option reduces blocking by 70%+',
                },
                {
                    title: 'Data residency',
                    description: 'Choose between US and EU cloud hosting',
                },
            ],
        },
        {
            title: 'Device & demographics',
            headline: 'Know your audience',
            description: 'Break down traffic by device, browser, OS, and location to optimize for your users.',
            images: [
                {
                    src: '/images/products/web-analytics/world-map.jpg',
                    alt: 'Demographics',
                    shadow: true,
                },
            ],
            imagesClasses: '-mr-8',
            layout: 'columns',
            features: [
                {
                    title: 'Device types',
                    description: 'Desktop vs mobile vs tablet breakdown',
                },
                {
                    title: 'Browsers & OS',
                    description: 'See which browsers and operating systems to support',
                },
                {
                    title: 'Geographic data',
                    description: 'Country and city-level visitor location data',
                },
                {
                    title: 'Screen sizes',
                    description: 'Optimize for your most common screen resolutions',
                },
                {
                    title: 'Bot detection',
                    description: 'Automatic filtering of crawler and bot traffic',
                },
            ],
        },
        {
            title: 'Works with product analytics',
            headline: 'More than just web analytics',
            description: 'Seamlessly switch between web and product analytics, all in one platform.',
            features: [
                {
                    title: 'Unified platform',
                    description: 'Web analytics + product analytics + session replay + more',
                },
                {
                    title: 'Shared events',
                    description: 'Same events power multiple features, no duplicate tracking',
                },
                {
                    title: 'Cross-domain tracking',
                    description: 'Track users across multiple domains and subdomains',
                },
                {
                    title: 'Backend integration',
                    description: 'Connect server-side events with frontend sessions',
                },
                {
                    title: 'Cost efficient',
                    description: 'No additional cost beyond event usage',
                },
            ],
        },
    ],
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
                    // subtitle: 'Most tools have delays or limited real-time capabilities',
                },
                {
                    title: 'You actually really like GA4 🤡',
                    subtitle: 'We recommend seeking medical attention.',
                },
            ],
            us: [
                {
                    title: 'You want to do more than just web analytics',
                    subtitle: 'Web Analytics integrates with the entire Product OS ecosystem.',
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
        features: [
            {
                feature: 'Pre-configured dashboards',
                companies: {
                    ga4: true,
                    matomo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Visitor and view tracking',
                companies: {
                    ga4: true,
                    matomo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Session and duration tracking',
                companies: {
                    ga4: true,
                    matomo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Bounce rate tracking',
                companies: {
                    ga4: true,
                    matomo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Breakdown by GeoIP',
                companies: {
                    ga4: true,
                    matomo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Breakdown by device and browser',
                companies: {
                    ga4: true,
                    matomo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Web Vitals reporting',
                companies: {
                    ga4: true,
                    matomo: '<a href="https://matomo.org/guide/reports/seo-web-vitals/" target="_blank" rel="noopener noreferrer">On-premise only</a>',
                    posthog: true,
                },
            },
            {
                feature: 'Revenue tracking',
                companies: {
                    ga4: true,
                    matomo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Real-time reporting',
                companies: {
                    ga4: true,
                    matomo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Open source',
                companies: {
                    ga4: false,
                    matomo: true,
                    posthog: true,
                },
            },
            {
                feature: '1st party cookies',
                companies: {
                    ga4: true,
                    matomo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Cookieless tracking',
                companies: {
                    ga4: true,
                    matomo: true,
                    posthog: true,
                },
            },
            {
                feature: 'HIPAA compliance',
                companies: {
                    ga4: false,
                    matomo: true,
                    posthog: true,
                },
            },
            {
                feature: 'GDPR compliance',
                companies: {
                    ga4: false,
                    matomo: true,
                    posthog: true,
                },
            },
            {
                feature: 'No data sampling',
                companies: {
                    ga4: false,
                    matomo: true,
                    posthog: true,
                },
            },
            {
                feature: 'Scroll depth tracking',
                companies: {
                    ga4: false,
                    matomo: false,
                    posthog: true,
                },
            },
            {
                feature: 'Custom channel types',
                companies: {
                    ga4: false,
                    matomo: false,
                    posthog: true,
                },
            },
            {
                feature: 'Integrated product analytics',
                companies: {
                    ga4: false,
                    matomo: false,
                    posthog: true,
                },
            },
            {
                feature: 'Revenue attribution',
                companies: {
                    ga4: true,
                    matomo: false,
                    posthog: true,
                },
            },
            {
                feature: 'Ad blocker resilient',
                companies: {
                    ga4: false,
                    matomo: false,
                    posthog: true,
                },
            },
        ],
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
                <Link state={{ newWindow: true }} to="/events">
                    Learn about the difference between anonymous events and identified events.
                </Link>
                ) Most sites never pay anything. Even high-traffic sites pay way less than GA 360.
            </>
        ),
        'comparison-summary':
            "GA4 is free but also really hard to use. Matomo is privacy-focused but limited. We're privacy-focused AND powerful. Plus we're not just web analytics - it's integrated with everything else. If you liked GA3, you'll love this. If you like GA4, please seek medical attention immediately. (But spoiler: doctors orders will likely be to try PostHog Web Analytics.)",
        'feature-comparison':
            "We have mostly everything the others have plus: scroll depth, custom channels, no sampling, ad blocker resilience, and integrated product analytics. You're welcome.",
        docs: "Setup takes minutes. Add our snippet, see data. We document every metric clearly. Common questions like 'unique vs returning visitors' explained simply. Migration guides from GA4 and others included.",
        'pairs-with':
            "See traffic spike? Click through to session replays of those visitors. Run surveys on specific traffic sources. Build custom analytics beyond the dashboard. It all connects because it's one platform.",
        'getting-started':
            "Add our snippet. Data flows immediately. The pre-built dashboard has everything most people need. Later, customize with product analytics if you want deeper insights. But if you're just looking for a web analytics, the defaults are probably enough.",
    },
}
