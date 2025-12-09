import {
    IconGraph,
    IconRewindPlay,
    IconToggle,
    IconFlask,
    IconMessage,
    IconTrends,
    IconFunnels,
    IconPerson,
    IconDatabase,
    IconDecisionTree,
} from '@posthog/icons'

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface ChecklistItem {
    id: string
    text: string
    required: boolean
    order: number
    helpText?: string
}

export interface Resource {
    id: string
    type: 'docs' | 'tutorial' | 'template' | 'blog' | 'video'
    title: string
    url: string
    description?: string
    duration?: string
}

export interface Product {
    id: string
    name: string
    color: string
}

export interface ContentSection {
    id: string
    title: string
    content: string // markdown
    order: number
    type?: 'concept' | 'tutorial' | 'example'
}

export interface SpaceContent {
    introduction: string // markdown
    posthogAIContext: string
    sections: ContentSection[]
}

export interface Space {
    id: string
    regionId: string
    title: string
    description: string
    order: number
    difficulty: 1 | 2 | 3 | 4 | 5
    timeEstimate: string
    isCamp?: boolean
    isBoss?: boolean
    content: SpaceContent
    products: Product[]
    resources: Resource[]
    checklistItems: ChecklistItem[]
}

export interface SvgCoordinates {
    x: number
    y: number
    width: number
    height: number
    pathData?: string
}

export interface Region {
    id: string
    name: string
    tagline: string
    description: string
    color: string
    theme: string
    iconName: string
    iconColor: string
    svgCoordinates: SvgCoordinates
    order: number
    spaces: Space[]
}

// =============================================================================
// ICON MAPPING
// =============================================================================

export const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    IconGraph,
    IconRewindPlay,
    IconToggle,
    IconFlask,
    IconMessage,
    IconTrends,
    IconFunnels,
    IconPerson,
    IconDatabase,
    IconDecisionTree,
}

// =============================================================================
// PRODUCT DEFINITIONS (reusable across spaces)
// =============================================================================

export const products = {
    productAnalytics: {
        id: 'product-analytics',
        name: 'Product analytics',
        color: 'blue',
    },
    sessionReplay: {
        id: 'session-replay',
        name: 'Session replay',
        color: 'yellow',
    },
    featureFlags: {
        id: 'feature-flags',
        name: 'Feature flags',
        color: 'teal',
    },
    experiments: {
        id: 'experiments',
        name: 'Experiments',
        color: 'purple',
    },
    surveys: {
        id: 'surveys',
        name: 'Surveys',
        color: 'salmon',
    },
    dataWarehouse: {
        id: 'data-warehouse',
        name: 'Data warehouse',
        color: 'lilac',
    },
    cdp: {
        id: 'cdp',
        name: 'CDP',
        color: 'orange',
    },
}

// =============================================================================
// REGION DATA
// =============================================================================

export const regions: Region[] = [
    // -------------------------------------------------------------------------
    // REGION 1: Product-market fit valley
    // -------------------------------------------------------------------------
    {
        id: 'product-market-fit',
        name: 'Product-market fit valley',
        tagline: 'Find your ideal customers',
        description:
            'The foundation of every successful startup. Learn to identify who your users are, what they need, and whether your product delivers real value.',
        color: 'blue',
        theme: 'valley',
        iconName: 'IconGraph',
        iconColor: 'blue',
        svgCoordinates: { x: 50, y: 400, width: 200, height: 150 },
        order: 1,
        spaces: [
            {
                id: 'pmf-understand-users',
                regionId: 'product-market-fit',
                title: 'Understanding your users',
                description: 'Learn to identify your most engaged users and understand what makes them stick around.',
                order: 1,
                difficulty: 2,
                timeEstimate: '15 min',
                isCamp: true,
                content: {
                    introduction: 'Placeholder introduction for understanding your users.',
                    posthogAIContext:
                        'This space covers user identification, cohort creation, and understanding user behavior patterns in PostHog.',
                    sections: [
                        {
                            id: 'pmf-1-s1',
                            title: 'Identifying power users',
                            content: 'Placeholder content for identifying power users.',
                            order: 1,
                            type: 'concept',
                        },
                        {
                            id: 'pmf-1-s2',
                            title: 'Setting up user identification',
                            content: 'Placeholder content for setting up user identification.',
                            order: 2,
                            type: 'tutorial',
                        },
                    ],
                },
                products: [products.productAnalytics, products.sessionReplay],
                resources: [
                    {
                        id: 'pmf-1-r1',
                        type: 'docs',
                        title: 'Identifying users',
                        url: '/docs/product-analytics/identify',
                    },
                    {
                        id: 'pmf-1-r2',
                        type: 'tutorial',
                        title: 'How to identify users',
                        url: '/tutorials/how-to-identify-users',
                    },
                ],
                checklistItems: [
                    {
                        id: 'pmf-1-c1',
                        text: 'Set up user identification in your app',
                        required: true,
                        order: 1,
                    },
                    {
                        id: 'pmf-1-c2',
                        text: 'Create a cohort of your most active users',
                        required: true,
                        order: 2,
                    },
                    {
                        id: 'pmf-1-c3',
                        text: 'Add custom user properties',
                        required: false,
                        order: 3,
                        helpText: 'Properties like plan type, role, or company size',
                    },
                ],
            },
            {
                id: 'pmf-measure-engagement',
                regionId: 'product-market-fit',
                title: 'Measuring engagement',
                description: 'Track how users interact with your product and identify your core value metrics.',
                order: 2,
                difficulty: 2,
                timeEstimate: '20 min',
                content: {
                    introduction: 'Placeholder introduction for measuring engagement.',
                    posthogAIContext:
                        'This space covers event tracking, engagement metrics, and building dashboards to monitor user activity.',
                    sections: [
                        {
                            id: 'pmf-2-s1',
                            title: 'Defining your north star metric',
                            content: 'Placeholder content for defining your north star metric.',
                            order: 1,
                            type: 'concept',
                        },
                        {
                            id: 'pmf-2-s2',
                            title: 'Building an engagement dashboard',
                            content: 'Placeholder content for building an engagement dashboard.',
                            order: 2,
                            type: 'tutorial',
                        },
                    ],
                },
                products: [products.productAnalytics],
                resources: [
                    {
                        id: 'pmf-2-r1',
                        type: 'docs',
                        title: 'Creating dashboards',
                        url: '/docs/product-analytics/dashboards',
                    },
                ],
                checklistItems: [
                    {
                        id: 'pmf-2-c1',
                        text: 'Define your north star metric',
                        required: true,
                        order: 1,
                    },
                    {
                        id: 'pmf-2-c2',
                        text: 'Create an engagement dashboard',
                        required: true,
                        order: 2,
                    },
                ],
            },
            {
                id: 'pmf-validate-fit',
                regionId: 'product-market-fit',
                title: 'Validating product-market fit',
                description: 'Use surveys and data to determine if you have achieved product-market fit.',
                order: 3,
                difficulty: 3,
                timeEstimate: '25 min',
                isBoss: true,
                content: {
                    introduction: 'Placeholder introduction for validating product-market fit.',
                    posthogAIContext:
                        'This space covers PMF surveys, the Sean Ellis test, and using data to validate product-market fit.',
                    sections: [
                        {
                            id: 'pmf-3-s1',
                            title: 'The Sean Ellis test',
                            content: 'Placeholder content for the Sean Ellis test.',
                            order: 1,
                            type: 'concept',
                        },
                        {
                            id: 'pmf-3-s2',
                            title: 'Running a PMF survey',
                            content: 'Placeholder content for running a PMF survey.',
                            order: 2,
                            type: 'tutorial',
                        },
                    ],
                },
                products: [products.surveys, products.productAnalytics],
                resources: [
                    {
                        id: 'pmf-3-r1',
                        type: 'docs',
                        title: 'Creating surveys',
                        url: '/docs/surveys/creating-surveys',
                    },
                    {
                        id: 'pmf-3-r2',
                        type: 'tutorial',
                        title: 'Measure product-market fit',
                        url: '/tutorials/measure-product-market-fit',
                    },
                ],
                checklistItems: [
                    {
                        id: 'pmf-3-c1',
                        text: 'Create and deploy a PMF survey',
                        required: true,
                        order: 1,
                    },
                    {
                        id: 'pmf-3-c2',
                        text: 'Analyze survey results',
                        required: true,
                        order: 2,
                    },
                    {
                        id: 'pmf-3-c3',
                        text: 'Document your PMF score',
                        required: false,
                        order: 3,
                    },
                ],
            },
        ],
    },

    // -------------------------------------------------------------------------
    // REGION 2: Tourist island
    // -------------------------------------------------------------------------
    {
        id: 'tourist-island',
        name: 'Tourist island',
        tagline: 'Understand visitor behavior',
        description:
            'Most of your traffic comes from visitors who never sign up. Learn to understand who they are, where they come from, and what makes them convert.',
        color: 'teal',
        theme: 'island',
        iconName: 'IconPerson',
        iconColor: 'teal',
        svgCoordinates: { x: 300, y: 350, width: 180, height: 140 },
        order: 2,
        spaces: [
            {
                id: 'tourist-track-visitors',
                regionId: 'tourist-island',
                title: 'Tracking anonymous visitors',
                description: 'Set up tracking to understand visitor behavior before they sign up.',
                order: 1,
                difficulty: 1,
                timeEstimate: '10 min',
                isCamp: true,
                content: {
                    introduction: 'Placeholder introduction for tracking anonymous visitors.',
                    posthogAIContext:
                        'This space covers anonymous user tracking, autocapture, and understanding pre-signup behavior.',
                    sections: [
                        {
                            id: 'tourist-1-s1',
                            title: 'How anonymous tracking works',
                            content: 'Placeholder content for anonymous tracking.',
                            order: 1,
                            type: 'concept',
                        },
                    ],
                },
                products: [products.productAnalytics, products.sessionReplay],
                resources: [
                    {
                        id: 'tourist-1-r1',
                        type: 'docs',
                        title: 'Anonymous vs identified users',
                        url: '/docs/product-analytics/identify#anonymous-vs-identified-events',
                    },
                ],
                checklistItems: [
                    {
                        id: 'tourist-1-c1',
                        text: 'Verify autocapture is working',
                        required: true,
                        order: 1,
                    },
                    {
                        id: 'tourist-1-c2',
                        text: 'Set up key pageview events',
                        required: true,
                        order: 2,
                    },
                ],
            },
            {
                id: 'tourist-analyze-sources',
                regionId: 'tourist-island',
                title: 'Analyzing traffic sources',
                description: 'Understand where your visitors come from and which channels perform best.',
                order: 2,
                difficulty: 2,
                timeEstimate: '15 min',
                content: {
                    introduction: 'Placeholder introduction for analyzing traffic sources.',
                    posthogAIContext:
                        'This space covers UTM tracking, referrer analysis, and understanding marketing attribution.',
                    sections: [
                        {
                            id: 'tourist-2-s1',
                            title: 'UTM parameters and attribution',
                            content: 'Placeholder content for UTM parameters.',
                            order: 1,
                            type: 'concept',
                        },
                    ],
                },
                products: [products.productAnalytics],
                resources: [
                    {
                        id: 'tourist-2-r1',
                        type: 'tutorial',
                        title: 'Track marketing attribution',
                        url: '/tutorials/track-marketing-attribution',
                    },
                ],
                checklistItems: [
                    {
                        id: 'tourist-2-c1',
                        text: 'Set up UTM tracking',
                        required: true,
                        order: 1,
                    },
                    {
                        id: 'tourist-2-c2',
                        text: 'Create a traffic sources breakdown',
                        required: true,
                        order: 2,
                    },
                ],
            },
            {
                id: 'tourist-watch-sessions',
                regionId: 'tourist-island',
                title: 'Watching visitor sessions',
                description: 'Use session replay to see exactly how visitors interact with your site.',
                order: 3,
                difficulty: 2,
                timeEstimate: '20 min',
                isBoss: true,
                content: {
                    introduction: 'Placeholder introduction for watching visitor sessions.',
                    posthogAIContext:
                        'This space covers session replay setup, filtering recordings, and identifying UX issues.',
                    sections: [
                        {
                            id: 'tourist-3-s1',
                            title: 'Setting up session replay',
                            content: 'Placeholder content for session replay setup.',
                            order: 1,
                            type: 'tutorial',
                        },
                    ],
                },
                products: [products.sessionReplay],
                resources: [
                    {
                        id: 'tourist-3-r1',
                        type: 'docs',
                        title: 'Session replay',
                        url: '/docs/session-replay',
                    },
                ],
                checklistItems: [
                    {
                        id: 'tourist-3-c1',
                        text: 'Enable session replay',
                        required: true,
                        order: 1,
                    },
                    {
                        id: 'tourist-3-c2',
                        text: 'Watch 5 visitor sessions',
                        required: true,
                        order: 2,
                    },
                    {
                        id: 'tourist-3-c3',
                        text: 'Document one UX insight',
                        required: false,
                        order: 3,
                    },
                ],
            },
        ],
    },

    // -------------------------------------------------------------------------
    // REGION 3: Conversion cove
    // -------------------------------------------------------------------------
    {
        id: 'conversion-cove',
        name: 'Conversion cove',
        tagline: 'Turn visitors into users',
        description:
            'The journey from visitor to paying customer is full of drop-offs. Learn to build and optimize funnels that convert.',
        color: 'green',
        theme: 'cove',
        iconName: 'IconFunnels',
        iconColor: 'green',
        svgCoordinates: { x: 520, y: 280, width: 190, height: 160 },
        order: 3,
        spaces: [
            {
                id: 'conversion-build-funnels',
                regionId: 'conversion-cove',
                title: 'Building conversion funnels',
                description: 'Create funnels to track how users move through your signup and activation flows.',
                order: 1,
                difficulty: 2,
                timeEstimate: '20 min',
                isCamp: true,
                content: {
                    introduction: 'Placeholder introduction for building conversion funnels.',
                    posthogAIContext:
                        'This space covers funnel creation, conversion tracking, and identifying drop-off points.',
                    sections: [
                        {
                            id: 'conv-1-s1',
                            title: 'Designing your funnel',
                            content: 'Placeholder content for designing funnels.',
                            order: 1,
                            type: 'concept',
                        },
                    ],
                },
                products: [products.productAnalytics],
                resources: [
                    {
                        id: 'conv-1-r1',
                        type: 'docs',
                        title: 'Funnels',
                        url: '/docs/product-analytics/funnels',
                    },
                ],
                checklistItems: [
                    {
                        id: 'conv-1-c1',
                        text: 'Create a signup funnel',
                        required: true,
                        order: 1,
                    },
                    {
                        id: 'conv-1-c2',
                        text: 'Identify your biggest drop-off point',
                        required: true,
                        order: 2,
                    },
                ],
            },
            {
                id: 'conversion-experiment',
                regionId: 'conversion-cove',
                title: 'Running conversion experiments',
                description: 'Use A/B tests to improve your conversion rates with statistical confidence.',
                order: 2,
                difficulty: 3,
                timeEstimate: '30 min',
                content: {
                    introduction: 'Placeholder introduction for running conversion experiments.',
                    posthogAIContext: 'This space covers A/B testing, experiment design, and statistical significance.',
                    sections: [
                        {
                            id: 'conv-2-s1',
                            title: 'Designing an experiment',
                            content: 'Placeholder content for experiment design.',
                            order: 1,
                            type: 'concept',
                        },
                    ],
                },
                products: [products.experiments, products.featureFlags],
                resources: [
                    {
                        id: 'conv-2-r1',
                        type: 'docs',
                        title: 'Creating experiments',
                        url: '/docs/experiments/creating-an-experiment',
                    },
                ],
                checklistItems: [
                    {
                        id: 'conv-2-c1',
                        text: 'Create your first experiment',
                        required: true,
                        order: 1,
                    },
                    {
                        id: 'conv-2-c2',
                        text: 'Wait for statistical significance',
                        required: true,
                        order: 2,
                    },
                ],
            },
            {
                id: 'conversion-optimize',
                regionId: 'conversion-cove',
                title: 'Optimizing the full funnel',
                description: 'Systematically improve conversion at every stage of your funnel.',
                order: 3,
                difficulty: 4,
                timeEstimate: '25 min',
                isBoss: true,
                content: {
                    introduction: 'Placeholder introduction for optimizing the full funnel.',
                    posthogAIContext:
                        'This space covers full-funnel optimization, correlation analysis, and conversion best practices.',
                    sections: [
                        {
                            id: 'conv-3-s1',
                            title: 'Full-funnel analysis',
                            content: 'Placeholder content for full-funnel analysis.',
                            order: 1,
                            type: 'concept',
                        },
                    ],
                },
                products: [products.productAnalytics, products.experiments, products.sessionReplay],
                resources: [
                    {
                        id: 'conv-3-r1',
                        type: 'tutorial',
                        title: 'Improve conversion rates',
                        url: '/tutorials/improve-conversion-rates',
                    },
                ],
                checklistItems: [
                    {
                        id: 'conv-3-c1',
                        text: 'Map your complete conversion funnel',
                        required: true,
                        order: 1,
                    },
                    {
                        id: 'conv-3-c2',
                        text: 'Run correlation analysis on converters',
                        required: true,
                        order: 2,
                    },
                    {
                        id: 'conv-3-c3',
                        text: 'Document 3 optimization opportunities',
                        required: false,
                        order: 3,
                    },
                ],
            },
        ],
    },

    // -------------------------------------------------------------------------
    // REGION 4: Churn mountain
    // -------------------------------------------------------------------------
    {
        id: 'churn-mountain',
        name: 'Churn mountain',
        tagline: 'Conquer user retention',
        description:
            'Users leaving? Climb Churn Mountain to learn retention strategies, identify at-risk users, and build features that keep people coming back.',
        color: 'salmon',
        theme: 'mountain',
        iconName: 'IconTrends',
        iconColor: 'salmon',
        svgCoordinates: { x: 750, y: 200, width: 200, height: 180 },
        order: 4,
        spaces: [
            {
                id: 'churn-retention-basics',
                regionId: 'churn-mountain',
                title: 'Retention analysis fundamentals',
                description: 'Learn to measure and visualize how well your product retains users over time.',
                order: 1,
                difficulty: 3,
                timeEstimate: '20 min',
                isCamp: true,
                content: {
                    introduction: 'Placeholder introduction for retention analysis fundamentals.',
                    posthogAIContext:
                        'This space covers retention charts, cohort analysis, and understanding retention benchmarks.',
                    sections: [
                        {
                            id: 'churn-1-s1',
                            title: 'What is retention?',
                            content: 'Placeholder content for retention concepts.',
                            order: 1,
                            type: 'concept',
                        },
                    ],
                },
                products: [products.productAnalytics],
                resources: [
                    {
                        id: 'churn-1-r1',
                        type: 'docs',
                        title: 'Retention insights',
                        url: '/docs/product-analytics/retention',
                    },
                ],
                checklistItems: [
                    {
                        id: 'churn-1-c1',
                        text: 'Create a retention insight',
                        required: true,
                        order: 1,
                    },
                    {
                        id: 'churn-1-c2',
                        text: 'Compare retention across cohorts',
                        required: true,
                        order: 2,
                    },
                ],
            },
            {
                id: 'churn-identify-risk',
                regionId: 'churn-mountain',
                title: 'Identifying at-risk users',
                description: 'Build cohorts and alerts to catch users before they churn.',
                order: 2,
                difficulty: 3,
                timeEstimate: '25 min',
                content: {
                    introduction: 'Placeholder introduction for identifying at-risk users.',
                    posthogAIContext:
                        'This space covers churn prediction, at-risk cohorts, and proactive retention strategies.',
                    sections: [
                        {
                            id: 'churn-2-s1',
                            title: 'Defining churn signals',
                            content: 'Placeholder content for churn signals.',
                            order: 1,
                            type: 'concept',
                        },
                    ],
                },
                products: [products.productAnalytics, products.cdp],
                resources: [
                    {
                        id: 'churn-2-r1',
                        type: 'tutorial',
                        title: 'Predict user churn',
                        url: '/tutorials/predict-user-churn',
                    },
                ],
                checklistItems: [
                    {
                        id: 'churn-2-c1',
                        text: 'Define your churn criteria',
                        required: true,
                        order: 1,
                    },
                    {
                        id: 'churn-2-c2',
                        text: 'Create an at-risk users cohort',
                        required: true,
                        order: 2,
                    },
                ],
            },
            {
                id: 'churn-win-back',
                regionId: 'churn-mountain',
                title: 'Win-back strategies',
                description: 'Implement data-driven strategies to re-engage churned users.',
                order: 3,
                difficulty: 4,
                timeEstimate: '30 min',
                isBoss: true,
                content: {
                    introduction: 'Placeholder introduction for win-back strategies.',
                    posthogAIContext:
                        'This space covers win-back campaigns, re-engagement experiments, and measuring win-back success.',
                    sections: [
                        {
                            id: 'churn-3-s1',
                            title: 'Designing win-back campaigns',
                            content: 'Placeholder content for win-back campaigns.',
                            order: 1,
                            type: 'concept',
                        },
                    ],
                },
                products: [products.experiments, products.surveys, products.cdp],
                resources: [
                    {
                        id: 'churn-3-r1',
                        type: 'tutorial',
                        title: 'Re-engage churned users',
                        url: '/tutorials/re-engage-churned-users',
                    },
                ],
                checklistItems: [
                    {
                        id: 'churn-3-c1',
                        text: 'Design a win-back experiment',
                        required: true,
                        order: 1,
                    },
                    {
                        id: 'churn-3-c2',
                        text: 'Set up re-engagement automation',
                        required: true,
                        order: 2,
                    },
                    {
                        id: 'churn-3-c3',
                        text: 'Measure win-back success rate',
                        required: false,
                        order: 3,
                    },
                ],
            },
        ],
    },

    // -------------------------------------------------------------------------
    // REGION 5: Hyper-growth castle
    // -------------------------------------------------------------------------
    {
        id: 'hyper-growth-castle',
        name: 'Hyper-growth castle',
        tagline: 'Scale with confidence',
        description:
            'You have product-market fit, solid retention, and growing conversions. Now it is time to scale. Learn to manage data at scale and build the infrastructure for hyper-growth.',
        color: 'purple',
        theme: 'castle',
        iconName: 'IconDatabase',
        iconColor: 'purple',
        svgCoordinates: { x: 950, y: 100, width: 220, height: 200 },
        order: 5,
        spaces: [
            {
                id: 'growth-data-infrastructure',
                regionId: 'hyper-growth-castle',
                title: 'Data infrastructure at scale',
                description: 'Set up your data warehouse and pipelines to handle growth.',
                order: 1,
                difficulty: 4,
                timeEstimate: '30 min',
                isCamp: true,
                content: {
                    introduction: 'Placeholder introduction for data infrastructure at scale.',
                    posthogAIContext:
                        'This space covers data warehouse setup, external data sources, and querying at scale.',
                    sections: [
                        {
                            id: 'growth-1-s1',
                            title: 'Why you need a data warehouse',
                            content: 'Placeholder content for data warehouse concepts.',
                            order: 1,
                            type: 'concept',
                        },
                    ],
                },
                products: [products.dataWarehouse],
                resources: [
                    {
                        id: 'growth-1-r1',
                        type: 'docs',
                        title: 'Data warehouse setup',
                        url: '/docs/data-warehouse/setup',
                    },
                ],
                checklistItems: [
                    {
                        id: 'growth-1-c1',
                        text: 'Connect an external data source',
                        required: true,
                        order: 1,
                    },
                    {
                        id: 'growth-1-c2',
                        text: 'Run a cross-source query',
                        required: true,
                        order: 2,
                    },
                ],
            },
            {
                id: 'growth-data-pipelines',
                regionId: 'hyper-growth-castle',
                title: 'Building data pipelines',
                description: 'Send PostHog data to your other tools and keep your stack in sync.',
                order: 2,
                difficulty: 4,
                timeEstimate: '25 min',
                content: {
                    introduction: 'Placeholder introduction for building data pipelines.',
                    posthogAIContext:
                        'This space covers CDP destinations, real-time data routing, and integration best practices.',
                    sections: [
                        {
                            id: 'growth-2-s1',
                            title: 'Real-time data routing',
                            content: 'Placeholder content for data routing.',
                            order: 1,
                            type: 'concept',
                        },
                    ],
                },
                products: [products.cdp, products.dataWarehouse],
                resources: [
                    {
                        id: 'growth-2-r1',
                        type: 'docs',
                        title: 'CDP destinations',
                        url: '/docs/cdp',
                    },
                ],
                checklistItems: [
                    {
                        id: 'growth-2-c1',
                        text: 'Set up a CDP destination',
                        required: true,
                        order: 1,
                    },
                    {
                        id: 'growth-2-c2',
                        text: 'Verify data is flowing correctly',
                        required: true,
                        order: 2,
                    },
                ],
            },
            {
                id: 'growth-advanced-analytics',
                regionId: 'hyper-growth-castle',
                title: 'Advanced analytics mastery',
                description: 'Combine all PostHog products to build a complete analytics operation.',
                order: 3,
                difficulty: 5,
                timeEstimate: '45 min',
                isBoss: true,
                content: {
                    introduction: 'Placeholder introduction for advanced analytics mastery.',
                    posthogAIContext:
                        'This space covers advanced analytics workflows, combining products, and building a data-driven culture.',
                    sections: [
                        {
                            id: 'growth-3-s1',
                            title: 'The complete analytics stack',
                            content: 'Placeholder content for complete analytics stack.',
                            order: 1,
                            type: 'concept',
                        },
                    ],
                },
                products: [
                    products.productAnalytics,
                    products.sessionReplay,
                    products.experiments,
                    products.dataWarehouse,
                ],
                resources: [
                    {
                        id: 'growth-3-r1',
                        type: 'template',
                        title: 'Executive dashboard template',
                        url: '/templates/executive-dashboard',
                    },
                ],
                checklistItems: [
                    {
                        id: 'growth-3-c1',
                        text: 'Build an executive dashboard',
                        required: true,
                        order: 1,
                    },
                    {
                        id: 'growth-3-c2',
                        text: 'Set up automated reporting',
                        required: true,
                        order: 2,
                    },
                    {
                        id: 'growth-3-c3',
                        text: 'Document your analytics playbook',
                        required: false,
                        order: 3,
                    },
                ],
            },
        ],
    },
]

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export const getTotalSpaces = (): number => {
    return regions.reduce((total, region) => total + region.spaces.length, 0)
}

export const getRegionById = (id: string): Region | undefined => {
    return regions.find((region) => region.id === id)
}

export const getSpaceById = (spaceId: string): Space | undefined => {
    for (const region of regions) {
        const space = region.spaces.find((s) => s.id === spaceId)
        if (space) return space
    }
    return undefined
}

export const getSpacesByRegionId = (regionId: string): Space[] => {
    const region = getRegionById(regionId)
    return region?.spaces ?? []
}

export const getRegionForSpace = (spaceId: string): Region | undefined => {
    for (const region of regions) {
        if (region.spaces.some((s) => s.id === spaceId)) {
            return region
        }
    }
    return undefined
}
