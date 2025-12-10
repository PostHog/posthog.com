import { LevelData } from './types'

export const LEVELS: LevelData[] = [
    {
        id: 'level1',
        name: 'Looking for Product-Market Fit',
        theme: 'Finding your first users and validating the problem',
        description:
            'Your CEO is panicking about runway. Convince them PMF is out there to be found if you can focus on building the right things.',
        illustration:
            'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Untitled_Artwork_295_1_edf203e3b0.png',
        quest: {
            id: 'install-posthog',
            title: 'Starting your search',
            description: `<p>In a startup, the only objective that matters before you have product-market fit, is <em>finding</em> product-market fit.</p>

<p>Knowing when you've found it is easy – there's no shortage of descriptions of how it feels to have product-market fit, or how to measure product-market fit. How you find it is much harder, hence this guide.</p>

<p>Finding product-market fit is a bit like playing snakes and ladders. There are numerous traps, winning takes a little luck, and the only certainty is it's never a straight line to the finish.</p>

<p>This guide is based on what our co-founders and co-CEOs at PostHog have learned through 6 pivots, eventually finding product-market fit, growing revenue to $MM, and onboarding more than 20k customers. It also incorporates what we've seen from ~50 Y Combinator startups we've consulted with on this topic.</p>`,
            completed: false,
        },
        products: [
            {
                id: 'product-analytics',
                type: 'product',
                title: 'Product Analytics',
                icon: 'IconGraph',
                iconColor: 'text-blue',
                description: `See if anyone is actually using what you built.
                <ul class="list-disc pl-4 space-y-1 mt-2">
                    <li>Track signups, activation, and where users drop off</li>
                    <li>Find out which features get used vs ignored</li>
                    <li>Stop guessing - see actual user behavior</li>
                </ul>`,
                url: '/product-analytics',
            },
            {
                id: 'feature-flags',
                type: 'product',
                title: 'Feature Flags',
                icon: 'IconToggle',
                iconColor: 'text-seagreen',
                description: `Ship to 10 users before you ship to 10,000.
                <ul class="list-disc pl-4 space-y-1 mt-2">
                    <li>Release to beta users first, expand when it works</li>
                    <li>Kill a broken feature instantly without a deploy</li>
                    <li>Test two versions and see which one wins</li>
                </ul>`,
                url: '/feature-flags',
            },
            {
                id: 'session-replay',
                type: 'product',
                title: 'Session Replay',
                icon: 'IconRewindPlay',
                iconColor: 'text-yellow',
                description: `Watch a real user try your product. Cringe. Fix it.
                <ul class="list-disc pl-4 space-y-1 mt-2">
                    <li>See exactly where users get confused and give up</li>
                    <li>Watch the signup flow - is it actually easy?</li>
                    <li>Find the bugs users hit but never reported</li>
                </ul>`,
                url: '/session-replay',
            },
            {
                id: 'error-tracking',
                type: 'product',
                title: 'Error Tracking',
                icon: 'IconWarning',
                iconColor: 'text-orange',
                description: `Find out your app is broken before your users tell you.
                <ul class="list-disc pl-4 space-y-1 mt-2">
                    <li>Get alerted when errors spike after a deploy</li>
                    <li>See which errors affect the most users</li>
                    <li>Watch the session replay of the user who hit the bug</li>
                </ul>`,
                url: '/error-tracking',
            },
        ],
        resources: [
            {
                id: 'pmf-game-blog',
                type: 'blog',
                title: 'The Product-Market Fit Game',
                description:
                    'In a startup, the only objective that matters before you have product-market fit, is finding product-market fit.',
                url: '/blog/product-market-fit-game',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/pmf-game-guide/pmf-guide.png',
            },
            {
                id: 'first-time-founders',
                type: 'blog',
                title: 'How first-time founders fail',
                description:
                    'Why do so many first-time founders fail? They confuse activity with progress, growth with product-market fit, and fall prey to ego.',
                url: '/newsletter/first-time-founders',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1713521535/posthog.com/contents/blog/evolution-of-founders.jpg',
            },
            {
                id: 'not-boring',
                type: 'blog',
                title: 'How not to be boring',
                description:
                    "The world would be more fun if most startups hadn't undergone a personality bypass. But, sadly, most software companies look alike.",
                url: '/blog/brand',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/brand_startup_1aa2b151d6.png',
            },
            {
                id: 'defining-icp',
                type: 'blog',
                title: 'How we found our Ideal Customer Profile',
                description:
                    "Defining our ideal customer profile (ICP) is one of the most important things we've ever done. We wish we'd done it sooner.",
                url: '/founders/creating-ideal-customer-profile',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-ceo-diary-blog.png',
            },
            {
                id: 'ycombinator-story',
                type: 'customer-story',
                title: 'gathers 30% more data than with Google Analytics',
                company: 'Y Combinator',
                quote: '"We could autocapture... events using the JS snippet and... configure custom events."',
                description: 'Read the story',
                url: '/customers/ycombinator',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog_YC_68ed8fa1bb.png',
            },
            {
                id: 'hasura-story',
                type: 'customer-story',
                title: 'improved conversion rates by 10-20%',
                company: 'Hasura',
                quote: '"we observed drop-offs at very particular stages of our onboarding flow."',
                description: 'Read the story',
                url: '/customers/hasura',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hasura_posthog_efc51e8a25.png',
            },
            {
                id: 'natural-language-video',
                type: 'video',
                title: 'Querying data with natural language - How PostHog uses PostHog AI',
                description:
                    'Learn how to use natural language queries in PostHog to ask questions about your data using AI.',
                url: 'https://www.youtube.com/watch?v=WPjJLpNxI6s',
                image: 'https://img.youtube.com/vi/WPjJLpNxI6s/maxresdefault.jpg',
            },
        ],
        checklistItems: [
            { id: 'product-analytics', label: 'Product Analytics', completed: false },
            { id: 'feature-flags', label: 'Feature Flags', completed: false },
            { id: 'session-replay', label: 'Session Replay', completed: false },
            { id: 'error-tracking', label: 'Error Tracking', completed: false },
            { id: 'read-resources', label: 'Read resources', completed: false },
        ],
        maxWisdom: `Uh oh. It looks like you need to find some PMF... like <em>ASAP</em>! But don't panic. It's out there.`,
        hoverCharacter: {
            image: '/images/pmf-game/sweaty.png',
            dialogue: "We need to find PMF before we run out of runway! Let's figure out what our users actually want.",
        },
    },
    {
        id: 'level2',
        name: 'Finding signal in your product',
        theme: 'Setting up analytics and understanding user behavior',
        description:
            'The team wants to launch 5 campaigns at once. Help them understand which product metrics actually matter before they burn through the budget.',
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
        name: 'Shipping fast',
        theme: 'Optimizing funnels and improving conversion rates',
        description:
            'Your PM keeps adding "one more thing" to the roadmap. Show them how feature flags and quick experiments can validate ideas before building everything.',
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
        name: 'Iterating on what works',
        theme: 'Understanding different user segments',
        description:
            'A senior engineer wants to rewrite everything from scratch. Convince them to use data to double down on what users actually love instead.',
        illustration: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/game_4_8d799b7547.png',
        quest: {
            id: 'define-segments',
            title: 'Double down on what works',
            description: `<p>You have users. Some love you, some churn. The difference between success and failure is figuring out <em>why</em> - then doing more of what works.</p>

<p>The trap most startups fall into: building new features instead of improving existing ones. The senior engineer wants to rewrite everything. The PM has 47 ideas. But your best users are trying to tell you exactly what they need - if you listen.</p>

<p>This level is about segmentation: splitting your users into groups and understanding what makes retained users different from churned ones. What do power users do in their first week that others don't? What's the "aha moment" that predicts retention?</p>

<p>Find the pattern, then make it easier for everyone to follow that path.</p>`,
            completed: false,
        },
        products: [
            {
                id: 'product-analytics-cohorts',
                type: 'product',
                title: 'Product Analytics',
                icon: 'IconGraph',
                iconColor: 'text-blue',
                description: `Find what retained users do differently from churned users.
                <ul class="list-disc pl-4 space-y-1 mt-2">
                    <li>Compare Day 1 behavior of retained vs churned users</li>
                    <li>Find which features correlate with long-term retention</li>
                    <li>Build a cohort of "users who did X in first week" and track them</li>
                </ul>`,
                url: '/product-analytics',
            },
            {
                id: 'session-replay-segments',
                type: 'product',
                title: 'Session Replay',
                icon: 'IconRewindPlay',
                iconColor: 'text-yellow',
                description: `Watch a power user's session, then a churned user's. Spot the difference.
                <ul class="list-disc pl-4 space-y-1 mt-2">
                    <li>Filter replays to "users who converted" vs "users who didn't"</li>
                    <li>See exactly where confused users give up</li>
                    <li>Find the moment retained users "get it"</li>
                </ul>`,
                url: '/session-replay',
            },
            {
                id: 'surveys-feedback',
                type: 'product',
                title: 'Surveys',
                icon: 'IconMessage',
                iconColor: 'text-red',
                description: `Ask your best users what would make them recommend you to a friend.
                <ul class="list-disc pl-4 space-y-1 mt-2">
                    <li>Survey users right after they complete a key action</li>
                    <li>Ask churned users why they left (before it's too late)</li>
                    <li>Find the words your best users use to describe your product</li>
                </ul>`,
                url: '/surveys',
            },
            {
                id: 'experiments-iterate',
                type: 'product',
                title: 'A/B Testing',
                icon: 'IconFlask',
                iconColor: 'text-purple',
                description: `Test if making X easier actually improves retention.
                <ul class="list-disc pl-4 space-y-1 mt-2">
                    <li>A/B test onboarding changes and measure 7-day retention</li>
                    <li>Test removing friction vs adding features</li>
                    <li>Prove (or disprove) your intuition with data</li>
                </ul>`,
                url: '/ab-testing',
            },
        ],
        resources: [
            {
                id: 'feedback-loops',
                type: 'blog',
                title: 'How I learned to love feedback loops (and make better products)',
                description:
                    'How feedback loops between each stage lead to much better decisions, and how to actively seek iterative gains from these loops.',
                url: '/blog/feedback-loops',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-engineering-blog.png',
            },
            {
                id: 'measuring-feature-success',
                type: 'blog',
                title: 'How we build features users love (really fast)',
                description:
                    "A successful new feature solves a real user problem and is actually used. Here's how we measure feature success at PostHog.",
                url: '/product-engineers/measuring-feature-success',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/green-blog-image.jpg',
            },
            {
                id: 'dogfooding',
                type: 'blog',
                title: 'How we do dogfooding at PostHog (with examples)',
                description:
                    'Dogfooding helps you get fast feedback, ship a higher-quality product, and maintain customer empathy.',
                url: '/product-engineers/dogfooding',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/dogfood_531145ada2.jpg',
            },
            {
                id: 'product-at-posthog',
                type: 'blog',
                title: "What's the true role of a product team at an engineering-led organization?",
                description:
                    "We don't have PMs dictating a roadmap - it all comes from engineering. Here's how product development works at PostHog.",
                url: '/founders/product-at-posthog',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/product-at-posthog.png',
            },
            {
                id: '50-product-learnings',
                type: 'blog',
                title: "50 things we've learned about building successful products",
                description:
                    'To celebrate 50k subscribers to Product for Engineers, here are the 50 most important lessons about building successful products.',
                url: '/newsletter/50-product-learnings',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/50k2_d6698f08c5.png',
            },
        ],
        checklistItems: [
            { id: 'retained-vs-churned', label: 'Compare retained vs churned users', completed: false },
            { id: 'find-aha-moment', label: 'Find your "aha moment"', completed: false },
            { id: 'watch-sessions', label: 'Watch power user sessions', completed: false },
            { id: 'survey-power-users', label: 'Survey your best users', completed: false },
            { id: 'test-improvement', label: 'A/B test an activation change', completed: false },
        ],
        maxWisdom: `It's okay to have favorites. Find the users who love (and pay) you the most.`,
    },
    {
        id: 'level5',
        name: 'Hyper growth & 10x-ing',
        theme: 'Scaling and achieving true PMF',
        description:
            'The board wants 10x growth yesterday. Rally your whole team around your product improvements and prove you can scale.',
        illustration: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/game_5_2e6f486bc3.png',
        quest: {
            id: 'scale-growth',
            title: 'To the moon',
            description: `<p>You found product-market fit. Users love you. Now the board wants 10x growth. This is where most startups fail - not because they can't grow, but because they break what made them special in the first place.</p>

<p>Hyper-growth requires different muscles: you need dashboards the whole team can rally around, not just metrics you check alone. You need to connect revenue data to product data so you know which users actually pay. You need to find which acquisition channels produce customers who stick, not just signups who churn.</p>

<p>The PMF survey isn't about proving you have PMF anymore - it's about making sure you <em>keep</em> it as you scale. Run it regularly. If "very disappointed" drops below 40%, you're growing faster than you're delivering value.</p>

<p>This level is about building the systems, dashboards, and habits that let you 10x without losing the magic.</p>`,
            completed: false,
        },
        products: [
            {
                id: 'surveys-pmf',
                type: 'product',
                title: 'Surveys',
                icon: 'IconMessage',
                iconColor: 'text-red',
                description: `Track your PMF score as you scale - make sure growth doesn't outpace value.
                <ul class="list-disc pl-4 space-y-1 mt-2">
                    <li>Run the PMF survey regularly - if "very disappointed" drops below 40%, you're growing too fast</li>
                    <li>Find which new user segments love you vs just tolerate you</li>
                    <li>Catch PMF erosion before it becomes churn</li>
                </ul>`,
                url: '/surveys',
            },
            {
                id: 'product-analytics-scale',
                type: 'product',
                title: 'Product Analytics',
                icon: 'IconGraph',
                iconColor: 'text-blue',
                description: `Build the growth dashboard your whole team rallies around.
                <ul class="list-disc pl-4 space-y-1 mt-2">
                    <li>Track weekly active users, not vanity metrics</li>
                    <li>Monitor retention curves - are new cohorts retaining better?</li>
                    <li>Set up Slack alerts when activation rate drops</li>
                </ul>`,
                url: '/product-analytics',
            },
            {
                id: 'data-warehouse',
                type: 'product',
                title: 'Data Warehouse',
                icon: 'IconDatabase',
                iconColor: 'text-seagreen',
                description: `Calculate real revenue per user by combining Stripe + product data.
                <ul class="list-disc pl-4 space-y-1 mt-2">
                    <li>Join Stripe revenue data with product usage</li>
                    <li>Find which user behaviors predict upgrade to paid</li>
                    <li>Calculate real LTV by cohort, not guesswork</li>
                </ul>`,
                url: '/data-warehouse',
            },
            {
                id: 'web-analytics-growth',
                type: 'product',
                title: 'Web Analytics',
                icon: 'IconPieChart',
                iconColor: 'text-purple',
                description: `Find which acquisition channels actually convert to paying users.
                <ul class="list-disc pl-4 space-y-1 mt-2">
                    <li>Track signups by source - organic, paid, referral?</li>
                    <li>Find your best converting landing pages</li>
                    <li>See where visitors drop off before signing up</li>
                </ul>`,
                url: '/web-analytics',
            },
        ],
        resources: [
            {
                id: 'startup-that-scales',
                type: 'blog',
                title: "32 things we've learned about building a startup that scales",
                description:
                    "I joined PostHog when we were 11 people and had sold nothing. 5 years later, we're now over 150 people and $$$ ARR. Here are 32 things I've learned.",
                url: '/newsletter/building-a-startup-that-scales',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/learning_f933d64857.png',
            },
            {
                id: 'startups-lose-edge',
                type: 'blog',
                title: 'How startups lose their edge',
                description:
                    "You stop doing the things that got you ahead in the first place. You're no longer playing to win, you're playing not to lose.",
                url: '/newsletter/how-startups-lose-their-edge',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/preventd_4592de12f6.jpg',
            },
            {
                id: 'small-teams',
                type: 'blog',
                title: 'The magic of small engineering teams',
                description:
                    'Startups ship more per person than big companies. Small teams are speedy, innovative, and autonomous - enabling you to scale while retaining startup speed.',
                url: '/newsletter/small-teams',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/345390691_746f2b83_6290_4d68_b612_dd9360b43515_20e0f385a7.jpg',
            },
            {
                id: 'bad-behaviors',
                type: 'blog',
                title: 'Non-obvious behaviors that will kill your startup',
                description:
                    'Teams that praise highly visible contributions more than day-to-day excellence foster resentment, cynicism, and success theater.',
                url: '/newsletter/bad-behaviors',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/glengarry_glen_hog_b952c1fc80.jpg',
            },
        ],
        checklistItems: [
            { id: 'setup-pmf-monitoring', label: 'Set up recurring PMF survey', completed: false },
            { id: 'segment-responses', label: 'Segment users by PMF score', completed: false },
            { id: 'build-dashboard', label: 'Build a team growth dashboard', completed: false },
            { id: 'connect-revenue', label: 'Connect revenue to product data', completed: false },
            { id: 'identify-channels', label: 'Find best acquisition channels', completed: false },
        ],
        maxWisdom: "10x-ing once isn't the finish line - it's where the real journey begins. Time to do it again.",
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
