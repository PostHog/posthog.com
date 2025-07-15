import React from 'react'
import { IconPieChart } from '@posthog/icons'

export const webAnalytics = {
    Icon: IconPieChart,
    name: 'Web Analytics',
    handle: 'web_analytics',
    type: 'product_analytics',
    slug: 'web-analytics',
    color: 'green-2',
    colorSecondary: '[#36C46F]',
    category: 'analytics',
    billedWith: 'Product analytics',
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
    seo: {
        title: 'Web analytics - PostHog',
        description:
            'Privacy-focused web analytics with pre-built dashboards, real-time data, and no sampling. Built for people who really liked GA3...',
    },
    answersDescription: 'Monitor your website traffic',
    overview: {
        title: 'Privacy-focused web analytics',
        description:
            'Track visitors, pageviews, and conversions with a pre-built dashboard. No cookies required, no complex setup, real-time data, and privacy-focused. Built for people who really liked GA3...',
        textColor: 'text-[#063619]', // tw
    },
    screenshots: [
        {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_web_analytics_2a101a8558.png',
            alt: 'Screenshot of web analytics in PostHog',
            classes: '',
        },
    ],
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
                    stylized: true,
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
                    stylized: true,
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
            title: 'Advanced analytics',
            headline: 'Go beyond basic metrics with powerful insights',
            description: 'Track scroll depth, web vitals, conversions, and revenue directly in your web analytics.',
            features: [
                {
                    title: 'Scroll depth tracking',
                    description: 'See how far users scroll and what content they actually read',
                },
                {
                    title: 'Web vitals (LCP, FCP, INP, CLS)',
                    description: 'Monitor Core Web Vitals for performance optimization',
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
                    stylized: true,
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
            question: 'How many visitors have I had this week?',
        },
        {
            question: "What's my average bounce rate?",
        },
        {
            question: 'Where in the world are my visitors coming from?',
        },
        {
            question: 'Are my users mostly on mobile, tablet, or desktop?',
        },
        {
            question: "What's my most popular blog post from the last month?",
        },
        {
            question: 'What other websites are sending me the most traffic?',
        },
        {
            question: 'How many visitors are coming back to my site regularly?',
        },
        {
            question: 'Which marketing campaigns drive the most conversions?',
        },
        {
            question: 'How far are users scrolling on my landing pages?',
        },
        {
            question: "What's my site's Core Web Vitals performance?",
        },
        {
            question: 'How much revenue is each traffic source generating?',
        },
        {
            question: 'When are my users most active during the day?',
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
        features: [
            {
                feature: 'Pre-configured dashboards',
                companies: {
                    Matomo: true,
                    GA4: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Visitor and view tracking',
                companies: {
                    Matomo: true,
                    GA4: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Session and duration tracking',
                companies: {
                    Matomo: true,
                    GA4: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Bounce rate tracking',
                companies: {
                    Matomo: true,
                    GA4: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Breakdown by GeoIP',
                companies: {
                    Matomo: true,
                    GA4: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Breakdown by device and browser',
                companies: {
                    Matomo: true,
                    GA4: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Web Vitals reporting',
                companies: {
                    Matomo: true,
                    GA4: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Revenue tracking',
                companies: {
                    Matomo: true,
                    GA4: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Real-time reporting',
                companies: {
                    Matomo: true,
                    GA4: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Open source',
                companies: {
                    Matomo: true,
                    GA4: false,
                    PostHog: true,
                },
            },
            {
                feature: '1st party cookies',
                companies: {
                    Matomo: true,
                    GA4: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Cookieless tracking',
                companies: {
                    Matomo: true,
                    GA4: true,
                    PostHog: true,
                },
            },
            {
                feature: 'HIPAA compliance',
                companies: {
                    Matomo: true,
                    GA4: false,
                    PostHog: true,
                },
            },
            {
                feature: 'GDPR compliance',
                companies: {
                    Matomo: true,
                    GA4: false,
                    PostHog: true,
                },
            },
            {
                feature: 'No data sampling',
                companies: {
                    Matomo: true,
                    GA4: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Scroll depth tracking',
                companies: {
                    Matomo: false,
                    GA4: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Custom channel types',
                companies: {
                    Matomo: false,
                    GA4: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Integrated product analytics',
                companies: {
                    Matomo: false,
                    GA4: false,
                    PostHog: true,
                },
            },
            {
                feature: 'Revenue attribution',
                companies: {
                    Matomo: false,
                    GA4: true,
                    PostHog: true,
                },
            },
            {
                feature: 'Ad blocker resilient',
                companies: {
                    Matomo: false,
                    GA4: false,
                    PostHog: true,
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
}
