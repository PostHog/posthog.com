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
                url: '/founders/product-market-fit-game',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/posthog_ceo_diary_blog_aa51e82530.png',
            },
            {
                id: 'measure-pmf',
                type: 'blog',
                title: 'How to measure product-market fit',
                description:
                    'The most common ways to measure PMF, from surveys to retention metrics, and how to use them effectively.',
                url: '/founders/measure-product-market-fit',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/posthog_ceo_diary_blog_aa51e82530.png',
            },
            {
                id: 'first-time-founders',
                type: 'blog',
                title: 'How first-time founders fail',
                description:
                    'Why do so many first-time founders fail? They confuse activity with progress, growth with product-market fit, and fall prey to ego.',
                url: '/newsletter/first-time-founders',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/posthog_array_blog_0b966bd09c.png',
            },
            {
                id: 'first-1000-users',
                type: 'blog',
                title: 'How to get your first 1,000 users',
                description:
                    'Practical strategies for acquiring your earliest users and building momentum for your startup.',
                url: '/founders/first-1000-users',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/math_meme_8b0013533e.jpg',
            },
            {
                id: 'icp-framework',
                type: 'blog',
                title: 'The ideal customer profile framework',
                description:
                    'How to define and find your ideal customers - the ones who will love your product and pay for it.',
                url: '/newsletter/ideal-customer-profile-framework',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/posthog_ceo_diary_blog_aa51e82530.png',
            },
            {
                id: 'making-something-people-want',
                type: 'blog',
                title: 'Making something people want',
                description:
                    "The hardest part of building a startup isn't the technology - it's finding something people actually want.",
                url: '/founders/making-something-people-want',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/posthog_ceo_diary_blog_aa51e82530.png',
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
        ],
        checklistItems: [
            { id: 'read-pmf-guide', label: 'Read the PMF guide', completed: false },
            { id: 'define-icp', label: 'Define your ideal customer', completed: false },
            { id: 'talk-to-users', label: 'Talk to 5 potential users', completed: false },
            { id: 'install-posthog', label: 'Install PostHog', completed: false },
            { id: 'apply-startup-program', label: 'Apply for startup program', completed: false },
        ],
        maxWisdom: `Uh oh. It looks like you need to find some PMF... like <em>ASAP</em>! But don't panic. It's out there.`,
        hoverCharacter: {
            image: '/images/pmf-game/sweaty.png',
            name: 'Sweaty CEO',
            dialogue: 'Where is the PMF?!!',
        },
    },
    {
        id: 'level2',
        name: 'Finding signal in your product',
        theme: 'Setting up analytics and understanding user behavior',
        description:
            'The team wants to launch 5 campaigns at once. Help them understand which product metrics actually matter before they burn through the budget.',
        illustration: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/game_2_859ba69ffa.png',
        quest: {
            id: 'create-dashboard',
            title: 'Find your signal',
            description: `<p>You've got users. Now what? The difference between startups that find PMF and those that don't often comes down to one thing: <em>understanding what your users actually do</em>.</p>

<p>Activation is the moment a user first experiences value. Retention is whether they come back. Revenue is whether they'll pay. These three metrics will tell you if you're on the right track - or building something nobody wants.</p>

<p>This level is about setting up the systems to track what matters. Not vanity metrics like pageviews, but the actions that predict success: signups, activation events, and the behaviors that separate retained users from churned ones.</p>`,
            completed: false,
        },
        products: [
            {
                id: 'product-analytics-signal',
                type: 'product',
                title: 'Product Analytics',
                icon: 'IconGraph',
                iconColor: 'text-blue',
                description: `Track the metrics that actually matter for finding PMF.
                <ul class="list-disc pl-4 space-y-1 mt-2">
                    <li>Set up activation, retention, and revenue tracking</li>
                    <li>Build funnels to see where users drop off</li>
                    <li>Compare behavior of retained vs churned users</li>
                </ul>`,
                url: '/product-analytics',
            },
            {
                id: 'session-replay-signal',
                type: 'product',
                title: 'Session Replay',
                icon: 'IconRewindPlay',
                iconColor: 'text-yellow',
                description: `See exactly what users do - not just the numbers.
                <ul class="list-disc pl-4 space-y-1 mt-2">
                    <li>Watch users navigate your product in real-time</li>
                    <li>Find the moments of confusion and delight</li>
                    <li>Understand the "why" behind your metrics</li>
                </ul>`,
                url: '/session-replay',
            },
            {
                id: 'surveys-signal',
                type: 'product',
                title: 'Surveys',
                icon: 'IconMessage',
                iconColor: 'text-red',
                description: `Ask users directly what they think - at the right moment.
                <ul class="list-disc pl-4 space-y-1 mt-2">
                    <li>Trigger surveys after key actions</li>
                    <li>Run NPS surveys to track satisfaction over time</li>
                    <li>Ask churned users why they left</li>
                </ul>`,
                url: '/surveys',
            },
        ],
        hoverCharacter: {
            image: '/images/pmf-game/yes.png',
            name: 'Marketing Bro',
            dialogue: 'Hey buddy. Quick call?',
        },
        resources: [
            {
                id: 'wtf-is-activation',
                type: 'blog',
                title: 'WTF is activation?',
                description:
                    'Activation is one of the most important metrics for any product. But what is it, and how do you measure it?',
                url: '/newsletter/wtf-is-activation',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/welcome_1f16459e2b.png',
            },
            {
                id: 'churn-rate-tutorial',
                type: 'blog',
                title: 'How to calculate and reduce churn rate',
                description:
                    'A practical guide to measuring churn, understanding why users leave, and building features that make them stay.',
                url: '/tutorials/churn-rate',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/posthog_ceo_diary_blog_aa51e82530.png',
            },
            {
                id: 'customer-retention-metrics',
                type: 'blog',
                title: 'Customer retention metrics 101',
                description:
                    'The essential retention metrics every product team should track, and how to improve them.',
                url: '/product-engineers/customer-retention-metrics',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/lovehog_be749b577f.jpg',
            },
            {
                id: 'session-metrics',
                type: 'blog',
                title: 'Understanding session metrics',
                description:
                    'How to use session data to understand user behavior and identify opportunities for improvement.',
                url: '/tutorials/session-metrics',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/posthog_array_blog_0b966bd09c.png',
            },
            {
                id: 'natural-language-video',
                type: 'video',
                title: 'How content team uses product analytics to track metrics',
                description:
                    'Learn how to use natural language queries in PostHog to ask questions about your data using AI.',
                url: 'https://www.youtube.com/watch?v=WPjJLpNxI6s',
                image: 'https://img.youtube.com/vi/WPjJLpNxI6s/maxresdefault.jpg',
            },
            {
                id: 'surveys-feedback-video',
                type: 'video',
                title: 'How product uses surveys to gather feedback and NPS',
                description:
                    'See how PostHog uses surveys to collect user feedback and measure NPS across the product.',
                url: 'https://www.youtube.com/watch?v=y03z1v_uvQ4',
                image: 'https://img.youtube.com/vi/y03z1v_uvQ4/maxresdefault.jpg',
            },
        ],
        checklistItems: [
            { id: 'define-activation', label: 'Define your activation metric', completed: false },
            { id: 'setup-retention', label: 'Set up retention tracking', completed: false },
            { id: 'create-dashboard', label: 'Create your first dashboard', completed: false },
            { id: 'watch-sessions', label: 'Watch 10 session recordings', completed: false },
            { id: 'run-nps-survey', label: 'Run your first NPS survey', completed: false },
        ],
        maxWisdom: "Data without action is just trivia. But data with action? That's how you find PMF.",
    },
    {
        id: 'level3',
        name: 'Shipping fast',
        theme: 'Moving quickly and learning from mistakes',
        description:
            'Your PM keeps adding "one more thing" to the roadmap. Show them how feature flags and quick experiments can validate ideas before building everything.',
        illustration: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/game_3_8819399bbd.png',
        quest: {
            id: 'ship-fast',
            title: 'Speed is a feature',
            description: `<p>The startups that win aren't the ones with the best ideas - they're the ones that learn fastest. And you can't learn fast if you're not shipping fast.</p>

<p>Feature flags let you ship code without shipping features. You can deploy to production, test with 10 users, and kill it instantly if it breaks. No rollbacks, no hotfixes, no waiting for the next deploy window.</p>

<p>This level is about building the muscle of rapid iteration. Ship something small. Watch what happens. Fix what breaks. Repeat. The goal isn't perfection - it's learning.</p>`,
            completed: false,
        },
        products: [
            {
                id: 'feature-flags-ship',
                type: 'product',
                title: 'Feature Flags',
                icon: 'IconToggle',
                iconColor: 'text-seagreen',
                description: `Ship to 10 users before you ship to 10,000.
                <ul class="list-disc pl-4 space-y-1 mt-2">
                    <li>Release to beta users first, expand when it works</li>
                    <li>Kill a broken feature instantly without a deploy</li>
                    <li>Run A/B tests to validate ideas before building</li>
                </ul>`,
                url: '/feature-flags',
            },
            {
                id: 'error-tracking-ship',
                type: 'product',
                title: 'Error Tracking',
                icon: 'IconWarning',
                iconColor: 'text-orange',
                description: `Find out your app is broken before your users tell you.
                <ul class="list-disc pl-4 space-y-1 mt-2">
                    <li>Get alerted when errors spike after a deploy</li>
                    <li>See which errors affect the most users</li>
                    <li>Jump straight to the session replay of the error</li>
                </ul>`,
                url: '/error-tracking',
            },
            {
                id: 'session-replay-ship',
                type: 'product',
                title: 'Session Replay',
                icon: 'IconRewindPlay',
                iconColor: 'text-yellow',
                description: `Debug issues by watching exactly what happened.
                <ul class="list-disc pl-4 space-y-1 mt-2">
                    <li>Watch the session that led to an error</li>
                    <li>See the user's frustration in real-time</li>
                    <li>Find bugs users hit but never reported</li>
                </ul>`,
                url: '/session-replay',
            },
        ],
        resources: [
            {
                id: 'learnings-from-elon',
                type: 'blog',
                title: 'Learnings from Elon',
                description:
                    'What we can learn about shipping fast from one of the most controversial (and successful) founders.',
                url: '/founders/learnings-from-elon',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/posthog_ceo_diary_blog_aa51e82530.png',
            },
            {
                id: 'why-not-shipping',
                type: 'blog',
                title: "This is why you're not shipping",
                description: 'The hidden blockers that slow teams down, and how to remove them.',
                url: '/newsletter/this-is-why-youre-not-shipping',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/bellcurve_meme_19c509edff.jpg',
            },
            {
                id: 'pivot-startup',
                type: 'blog',
                title: 'When to pivot your startup',
                description:
                    "How to know when it's time to change direction, and how to do it without losing momentum.",
                url: '/newsletter/pivot-your-startup',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/posthog_array_blog_0b966bd09c.png',
            },
            {
                id: 'cofounder-breakup',
                type: 'blog',
                title: 'How to not break up with your cofounder',
                description: 'The common pitfalls that tear founding teams apart, and how to avoid them.',
                url: '/newsletter/how-to-not-breakup-with-your-cofounder',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/james_and_tim_8d5006785b.png',
            },
            {
                id: 'feature-flag-mistakes',
                type: 'blog',
                title: 'Feature flag mistakes to avoid',
                description: 'Common mistakes teams make with feature flags, and how to use them effectively.',
                url: '/newsletter/feature-flag-mistakes',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/maxachu_6b6bcc0983.png',
            },
            {
                id: 'exa-story',
                type: 'customer-story',
                title: 'ships faster with feature flags',
                company: 'Exa',
                quote: '"Feature flags let us ship confidently and roll back instantly if something goes wrong."',
                description: 'Read the story',
                url: '/customers/exa',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/exa_c102c1d824.jpg',
            },
            {
                id: 'error-tracking-video',
                type: 'video',
                title: 'How batch imports uses error tracking to solve issues',
                description: 'See how the batch imports team uses error tracking to identify and fix issues quickly.',
                url: 'https://www.youtube.com/watch?v=IJJKLxhcsIA',
                image: 'https://img.youtube.com/vi/IJJKLxhcsIA/maxresdefault.jpg',
            },
            {
                id: 'session-replay-debug-video',
                type: 'video',
                title: 'How support uses session replay to debug issues',
                description: 'Watch how the support team uses session replay to understand and resolve user issues.',
                url: 'https://www.youtube.com/watch?v=ALR9iuXQVqg',
                image: 'https://img.youtube.com/vi/ALR9iuXQVqg/maxresdefault.jpg',
            },
        ],
        checklistItems: [
            { id: 'create-feature-flag', label: 'Create your first feature flag', completed: false },
            { id: 'setup-error-tracking', label: 'Set up error tracking', completed: false },
            { id: 'ship-to-beta', label: 'Ship a feature to beta users', completed: false },
            { id: 'fix-error', label: 'Fix an error found in production', completed: false },
            { id: 'run-experiment', label: 'Run your first A/B test', completed: false },
        ],
        hoverCharacter: {
            image: '/images/pmf-game/this-is-fine.png',
            name: 'Product (Micro) Manager',
            dialogue: 'Did you see my tickets?',
        },
        maxWisdom: 'Every step in your funnel is a chance to lose or delight a user. Ship fast, fix fast.',
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
            {
                id: 'feature-flags-iterate',
                type: 'product',
                title: 'Feature Flags',
                icon: 'IconToggle',
                iconColor: 'text-seagreen',
                description: `Roll out changes to specific user segments.
                <ul class="list-disc pl-4 space-y-1 mt-2">
                    <li>Target features to power users first</li>
                    <li>Test new UIs with specific cohorts</li>
                    <li>Gradually roll out based on user behavior</li>
                </ul>`,
                url: '/feature-flags',
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
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/posthog_array_blog_0b966bd09c.png',
            },
            {
                id: 'measuring-feature-success',
                type: 'blog',
                title: 'How we build features users love (really fast)',
                description:
                    "A successful new feature solves a real user problem and is actually used. Here's how we measure feature success at PostHog.",
                url: '/product-engineers/measuring-feature-success',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/posthog_array_blog_0b966bd09c.png',
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
                id: 'think-like-growth-engineer',
                type: 'blog',
                title: 'How to think like a growth engineer',
                description:
                    'Growth engineering is about finding leverage - small changes that have outsized impact on your metrics.',
                url: '/newsletter/think-like-a-growth-engineer',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/growth_think_905cd0fa65.png',
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
            {
                id: 'ab-testing-examples',
                type: 'blog',
                title: 'A/B testing examples from real companies',
                description:
                    "Real examples of A/B tests that worked (and didn't) from companies like Airbnb, Netflix, and PostHog.",
                url: '/product-engineers/ab-testing-examples',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/posthog_ceo_diary_blog_aa51e82530.png',
            },
            {
                id: 'feature-flags-video',
                type: 'video',
                title: 'How dev ex uses feature flags to roll out new UIs',
                description:
                    'See how the developer experience team uses feature flags to safely roll out new interfaces.',
                url: 'https://www.youtube.com/watch?v=1X2gha80fsA',
                image: 'https://img.youtube.com/vi/1X2gha80fsA/maxresdefault.jpg',
            },
            {
                id: 'experiments-video',
                type: 'video',
                title: 'How growth uses experiments to test new ideas',
                description:
                    'Watch how the growth team designs and runs experiments to validate ideas before building.',
                url: 'https://www.youtube.com/watch?v=WyYPPSyKmXo',
                image: 'https://img.youtube.com/vi/WyYPPSyKmXo/maxresdefault.jpg',
            },
        ],
        checklistItems: [
            { id: 'retained-vs-churned', label: 'Compare retained vs churned users', completed: false },
            { id: 'find-aha-moment', label: 'Find your "aha moment"', completed: false },
            { id: 'watch-sessions', label: 'Watch power user sessions', completed: false },
            { id: 'run-ab-test', label: 'Run an A/B test on activation', completed: false },
            { id: 'double-down', label: 'Double down on what works', completed: false },
        ],
        maxWisdom: `It's okay to have favorites. Find the users who love (and pay) you the most.`,
        hoverCharacter: {
            image: '/images/pmf-game/shocked.png',
            name: 'Burnt Out Engineer',
            dialogue: 'I think we should refactor...',
        },
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
            {
                id: 'product-led-growth',
                type: 'blog',
                title: 'Product-led growth: what it is and why it matters',
                description: 'How to build a product that sells itself, and why PLG is the future of B2B software.',
                url: '/founders/product-led-growth',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/posthog_ceo_diary_blog_aa51e82530.png',
            },
            {
                id: 'llm-analytics-video',
                type: 'video',
                title: 'How the PostHog AI team uses LLM analytics to track cost and performance',
                description:
                    'See how the AI team monitors LLM costs, latency, and quality to build better AI features.',
                url: 'https://www.youtube.com/watch?v=wonEbaSnzOI',
                image: 'https://img.youtube.com/vi/wonEbaSnzOI/maxresdefault.jpg',
            },
            {
                id: 'web-analytics-video',
                type: 'video',
                title: 'How demand gen uses web analytics to track ad performance',
                description:
                    'Watch how the marketing team uses web analytics to optimize ad spend and find the best channels.',
                url: 'https://www.youtube.com/watch?v=joDbdgtFJBc',
                image: 'https://img.youtube.com/vi/joDbdgtFJBc/maxresdefault.jpg',
            },
        ],
        checklistItems: [
            { id: 'setup-pmf-monitoring', label: 'Set up recurring PMF survey', completed: false },
            { id: 'build-dashboard', label: 'Build a team growth dashboard', completed: false },
            { id: 'connect-revenue', label: 'Connect revenue to product data', completed: false },
            { id: 'identify-channels', label: 'Find best acquisition channels', completed: false },
            { id: 'celebrate', label: 'Celebrate your wins!', completed: false },
        ],
        maxWisdom: "10x-ing once isn't the finish line - it's where the real journey begins. Time to do it again.",
        hoverCharacter: {
            image: '/images/pmf-game/money.png',
            name: 'VC Investor',
            dialogue: 'Ready to talk Series B?',
        },
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
