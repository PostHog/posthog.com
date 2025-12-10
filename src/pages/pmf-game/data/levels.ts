import { LevelData } from './types'

export const LEVELS: LevelData[] = [
    {
        id: 'level1',
        name: 'Product Market Fit Valley',
        theme: 'Finding your first users and validating the problem',
        description: 'Begin your journey by setting up the foundations for understanding your users.',
        illustration:
            'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Untitled_Artwork_295_1_edf203e3b0.png',
        quest: {
            id: 'install-posthog',
            title: 'Install PostHog with the Wizard',
            description:
                'Install PostHog in seconds with our wizard by running this command in your project directory with your terminal (it also works for LLM coding agents like Cursor and Bolt):',
            command: 'npx -y @posthog/wizard@latest --region us',
            completed: false,
        },
        resources: [
            {
                id: 'pmf-game-blog',
                type: 'blog',
                title: 'The Product-Market Fit Game',
                description:
                    'In a startup, the only objective that matters before you have product-market fit, is finding product-market fit.',
                url: '/blog/product-market-fit-game',
            },
            {
                id: 'first-time-founders',
                type: 'blog',
                title: 'How first-time founders fail',
                description:
                    "PostHog and Statsig both offer A/B testing and feature flags, but they're different in two important ways: Statsig is a dedicated tes...",
                url: '/blog/first-time-founders-fail',
            },
            {
                id: 'not-boring',
                type: 'blog',
                title: 'How not to be boring',
                description:
                    "The world would be more fun if most startups hadn't undergone a personality bypass. But, sadly, most software companies look an...",
                url: '/blog/how-not-to-be-boring',
            },
            {
                id: 'defining-icp',
                type: 'blog',
                title: 'Defining our ICP is the most important thing we ever did',
                description:
                    "Defining our ideal customer profile (ICP) is one of the most important things we've ever done. We wish we'd done it sooner. M...",
                url: '/blog/defining-icp',
            },
            {
                id: 'ycombinator-story',
                type: 'customer-story',
                title: 'gathers 30% more data than with Google Analytics',
                company: 'Y Combinator',
                quote: '"We could autocapture... events using the JS snippet and... configure custom events."',
                description: 'Read the story',
                url: '/customers/ycombinator',
            },
            {
                id: 'hasura-story',
                type: 'customer-story',
                title: 'improved conversion rates by 10-20%',
                company: 'Hasura',
                quote: '"we observed drop-offs at very particular stages of our onboarding flow."',
                description: 'Read the story',
                url: '/customers/hasura',
            },
            {
                id: 'natural-language-video',
                type: 'video',
                title: 'Querying data with natural language - How PostHog uses PostHog AI',
                description:
                    "Defining our ideal customer profile (ICP) is one of the most important things we've ever done. We wish we'd done it sooner. M...",
                url: '/tutorials/natural-language-queries',
            },
        ],
        checklistItems: [
            { id: 'pmf-valley', label: 'Product market fit valley', completed: false },
            { id: 'data-docks', label: 'Data docks', completed: false },
            { id: 'conversion-cove', label: 'Conversion cove', completed: false },
            { id: 'tourist-island', label: 'Tourist island', completed: false },
            { id: 'churn-mountain', label: 'Churn mountain', completed: false },
            { id: 'product-velocity', label: 'Product velocity river', completed: false },
            { id: 'other-thing', label: 'Other thing', completed: false },
            { id: 'hyper-growth', label: 'Hyper growth castle', completed: false },
        ],
        maxWisdom: 'some little piece of wisdom from Max',
    },
    {
        id: 'level2',
        name: 'Data Docks',
        theme: 'Setting up analytics and understanding user behavior',
        description: 'Learn to collect and organize the data that will guide your product decisions.',
        quest: {
            id: 'create-dashboard',
            title: 'Set up your first dashboard',
            description:
                'Create a dashboard to track your key metrics and understand how users interact with your product.',
            completed: false,
        },
        resources: [],
        checklistItems: [
            { id: 'setup-events', label: 'Set up custom events', completed: false },
            { id: 'create-dashboard', label: 'Create your first dashboard', completed: false },
            { id: 'identify-users', label: 'Identify your users', completed: false },
        ],
        maxWisdom: 'Data without action is just trivia.',
    },
    {
        id: 'level3',
        name: 'Conversion Cove',
        theme: 'Optimizing funnels and improving conversion rates',
        description: 'Master the art of understanding where users drop off and how to improve your conversion rates.',
        quest: {
            id: 'create-funnel',
            title: 'Create a funnel analysis',
            description: 'Build your first funnel to understand where users drop off in your product flow.',
            completed: false,
        },
        resources: [],
        checklistItems: [
            { id: 'identify-funnel', label: 'Identify your main funnel', completed: false },
            { id: 'analyze-dropoff', label: 'Analyze drop-off points', completed: false },
            { id: 'run-experiment', label: 'Run your first A/B test', completed: false },
        ],
        maxWisdom: 'Every step in your funnel is a chance to lose or delight a user.',
    },
    {
        id: 'level4',
        name: 'Tourist Island',
        theme: 'Understanding different user segments',
        description: 'Discover who your users really are and what makes each segment unique.',
        quest: {
            id: 'define-segments',
            title: 'Define user segments',
            description: 'Create cohorts to understand different types of users and their behaviors.',
            completed: false,
        },
        resources: [],
        checklistItems: [
            { id: 'create-cohort', label: 'Create your first cohort', completed: false },
            { id: 'compare-segments', label: 'Compare segment behaviors', completed: false },
            { id: 'find-power-users', label: 'Identify power users', completed: false },
        ],
        maxWisdom: 'Not all users are created equal. Find the ones who love you most.',
    },
    {
        id: 'level5',
        name: 'Hyper Growth Castle',
        theme: 'Scaling and achieving true PMF',
        description: 'Reach the ultimate goal: true product-market fit and the path to hyper growth.',
        quest: {
            id: 'pmf-survey',
            title: 'Achieve 40% "very disappointed" score',
            description:
                'Run the PMF survey and achieve the magic 40% threshold of users who would be very disappointed without your product.',
            completed: false,
        },
        resources: [],
        checklistItems: [
            { id: 'run-pmf-survey', label: 'Run PMF survey', completed: false },
            { id: 'analyze-responses', label: 'Analyze survey responses', completed: false },
            { id: 'iterate-product', label: 'Iterate based on feedback', completed: false },
        ],
        maxWisdom: "40% very disappointed isn't the finish line - it's where the real journey begins.",
    },
]

export const getLevelById = (levelId: string): LevelData | undefined => {
    return LEVELS.find((level) => level.id === levelId)
}

export const getInitialLevelProgress = () => {
    const progress: Record<
        string,
        {
            unlocked: boolean
            completed: boolean
            progress: number
            checklistItems: { id: string; label: string; completed: boolean }[]
        }
    > = {}
    LEVELS.forEach((level) => {
        progress[level.id] = {
            unlocked: true, // All levels unlocked
            completed: false,
            progress: 0,
            checklistItems: level.checklistItems.map((item) => ({ ...item })),
        }
    })
    return progress
}
