import React from 'react'
import {
    IconWarning,
    IconEye,
    IconSparkles,
    IconList,
    IconConfetti,
    IconRocket,
    IconPieChart,
    IconCheckCircle,
    IconInfo,
    IconCursorClick,
    IconMagic,
    IconChat,
    IconCode,
    IconMessage,
    IconArrowUpRight,
} from '@posthog/icons'
import { features } from './error_tracking/features'
import { applications, topFeatures } from './error_tracking/slides'
import { getTool } from '../../data/tools'

export const errorTracking = {
    ...getTool('error_tracking'),
    Icon: IconWarning,
    type: 'error_tracking',
    teamSlug: 'error-tracking',
    forumTopicId: 389,
    color: 'orange',
    colorSecondary: 'red',
    wizardSupport: true,
    shortDescription: 'Catch and fix issues with full context',
    pricingDescription:
        'Error Tracking is billed on $exception events ingested. You get 100k free every month, then pay for what you use – no per-seat charges.',
    seo: {
        title: 'Error Tracking – Catch and fix issues faster with PostHog',
        description:
            'Capture, monitor, and resolve exceptions with error tracking. Connect Product Analytics and Session Replay to ship confidently with full context.',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/error_tracking_ae1263a1b8.jpg',
    },
    /**
     * Sections rendered on the Product surface (`/error-tracking`). Each entry
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
            slug: 'use-case-ramp',
            name: 'Ramp to self-driving',
            template: 'use-case-ramp',
            group: 'divided',
            icon: <IconArrowUpRight className="size-4" />,
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
     * Sections rendered on the Pricing surface (`/error-tracking/pricing`).
     * Same shape as `productMenu`.
     */
    pricingMenu: [
        { slug: 'plans', name: 'Plans', icon: <IconCheckCircle className="size-4" /> },
        { slug: 'calculator', name: 'Pricing calculator', icon: <IconPieChart className="size-4" /> },
        { slug: 'comparison-summary', name: 'PostHog vs...', icon: <IconList className="size-4" /> },
        // Hidden footer CTA rendered at the bottom of the Pricing surface.
        { slug: 'pricing-cta', name: 'Get started', hideFromNav: true },
    ],
    overview: {
        title: 'Track errors and resolve issues',
        description:
            'Error tracking is one of the tools that makes your product self-driving: every exception is tied to the user who hit it, so agents have the context to ship the fix. Built to natively work with product analytics, session replay, and feature flags.',
        eli5: "Error Tracking captures exceptions from across your stack and turns them into issues you can prioritize, assign, and resolve. Because PostHog already knows what's happening in your product, every issue comes with the affected user's session replay, events, and properties attached – so you can see what went wrong instead of trying to reproduce it.",
        textColor: 'text-black', // tw
    },
    screenshots: {
        overview: {
            // TODO: we should update this as the UI has changed a lot since
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_error_tracking_0f93eb652d.png',
            alt: 'Screenshot of the PostHog error tracking',
            classes: '',
        },
        home: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_error_tracking_light_93bfa1393d.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_error_tracking_dark_ef481dc7a5.png',
            alt: 'Error tracking screenshot',
            classes: 'justify-end items-end pl-4 @lg:pl-6',
            imgClasses: 'rounded-tl-md shadow-2xl',
        },
        errorsCropped: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/errors_cropped_light_dd2fda0b57.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/errors_cropped_dark_26efc088f5.png',
            alt: 'Error tracking screenshot',
            classes: '',
            imgClasses: '',
        },
        impact: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/error_tracking_impact_light_2c8fd5ef48.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/error_tracking_impact_dark_586d389b43.png',
            alt: 'Error impact',
        },
    },
    videos: {
        overview: {
            youtube: '',
            wistia: 'scuzsr1rcz',
        },
    },
    hog: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/error_hog_c2eff84e29.png',
        alt: 'Just another hedgehog',
        classes: 'absolute bottom-0 right-0 max-w-[250px]',
    },
    hogs: {
        default: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/error_hog_c2eff84e29.png',
            alt: 'Just another hedgehog',
        },
        // Reuses the Error Tracking AI hog art (same pattern as feature flags / product analytics).
        mobileHog: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/ERROR_TRACKING_2f807c123b.png',
            alt: 'A hedgehog investigating an error',
        },
    },
    slider: {
        marks: [100000, 1000000, 10000000, 50000000],
        min: 100000,
        max: 50000000,
    },
    volume: 100000,
    customers: {
        zealot: {
            headline: 'switched from BugSnag and Amplitude',
            description:
                'In two clicks, I can see who had an error, then their replays. The more of PostHog you use, the more powerful it becomes.',
        },
        squadsventures: {
            headline: 'consolidated three separate tools into one platform',
            description:
                "We ditched our previous error tracking SaaS so we could manage errors, see session replays, and do analytics all in one place. It's exactly what we were looking for.",
        },
    },
    useCases: {
        intro: 'Error Tracking is used across teams depending on your role.',
        rows: [
            [
                'Product & Growth Engineers',
                'Get notified when new issues happen, identify impact, and have the context to ship the fix',
            ],
            [
                'Founders',
                'Know when early users hit any exception – especially valuable when shipping multiple times a week',
            ],
            [
                'Support Engineers',
                'Pull quick context on user-reported errors to triage severity and share details with product engineers',
            ],
            ['DevOps / SRE', 'Control cost, track releases, and group high-volume exceptions (coverage still growing)'],
        ],
    },
    useCaseRamp: {
        intro: 'Error tracking works at three levels. You can triage exceptions yourself, ask an agent to investigate one for you, or let PostHog code.',
        scenario: 'A deploy starts throwing an error nobody has seen before',
        columns: [
            {
                level: 'Do it yourself',
                surfaces: ['web'],
                driver: 'You watch the issue list, decide which exceptions are worth your time, and read the stack traces yourself.',
                scenario: {
                    icon: 'IconBug',
                    surfaces: ['web'],
                    steps: [
                        'An alert tells you a new issue is spiking, and you open it in the issue list',
                        'The stack trace points at a file, and the session replay attached to it shows what the user did to trigger it',
                        'You write the fix, ship it, and mark the issue resolved',
                    ],
                    outcome:
                        'You had everything you needed to fix it. Noticing it in the first place was still on you.',
                },
                points: [
                    {
                        title: 'Triage is on you',
                        icon: 'IconHandwave',
                        body: 'Every exception lands in one list, and you decide which of them are worth an afternoon. A rare crash that breaks checkout for your biggest customer looks a lot like noise until somebody reads it.',
                    },
                    {
                        title: 'Point an agent at your exceptions instead',
                        icon: 'IconSparkles',
                        body: 'Every exception you capture becomes something PostHog can act on, stack trace and affected user included. Point an agent at your issue list and it will read all of them, and it can already tell which file to open.',
                    },
                ],
            },
            {
                level: 'Ask an agent',
                surfaces: ['ai', 'slack', 'mcp', 'cli'],
                driver: 'You describe the error you care about, and an agent finds it, explains the cause, and drafts the fix.',
                scenario: {
                    icon: 'IconMagicWand',
                    surfaces: ['mcp', 'slack'],
                    steps: [
                        'From your editor you ask which errors are new since the last deploy',
                        'It pulls the stack trace, explains the likely cause, and writes the fix in the file you already have open',
                        'Once it ships, you tag @PostHog in Slack to mark the issue resolved',
                    ],
                    outcome: 'You never left your editor, but you still had to ask which errors were new.',
                },
                points: [
                    {
                        title: 'Agents read the trace and the user',
                        icon: 'IconSearch',
                        body: 'An agent gets the same stack trace, session replay, and person properties you would, so it can name the line rather than guess at the cause.',
                    },
                    {
                        title: 'The full prompt list is below',
                        icon: 'IconMessage',
                        body: 'AI prompts, right below this section, lists everything you can ask: finding errors, inspecting traces, changing status, and routing issues to the right team.',
                    },
                ],
            },
            {
                level: 'Ship with PostHog',
                surfaces: ['inbox', 'desktop'],
                driver: 'Every exception feeds the loop as it happens, and a scout decides which ones are worth acting on. When the trace points at one file, it writes the fix itself.',
                scenario: {
                    icon: 'IconPullRequest',
                    surfaces: ['inbox', 'desktop'],
                    steps: [
                        'Exceptions enter the loop the moment they are captured, so nobody has to notice the new error first',
                        'An error tracking scout ties it to the deploy that introduced it and confirms it is hitting many people, rather than one client retrying',
                        'The stack trace names a file in a repo PostHog knows, so it opens a draft pull request with the fix and a regression test',
                        'You review and merge. Errors that need a judgment call land as a report in your Inbox instead',
                    ],
                    outcome: 'PostHog got from exception to pull request without anyone asking it to.',
                },
                points: [
                    {
                        title: 'A stack trace is the clearest place to start',
                        icon: 'IconBrain',
                        body: 'Most reports need a person to decide what to do about them. An exception is unusual: it names a file, a line, and the user who hit it, which is enough for PostHog to write a fix and let you check its work.',
                    },
                    {
                        title: 'It catches fixes that did not hold',
                        icon: 'IconRefresh',
                        body: 'When an issue you marked resolved starts firing again, the scout raises it as a regression instead of filing it as something new. That check is also how PostHog verifies its own pull requests worked.',
                    },
                ],
            },
        ],
    },
    features,
    mcp: {
        title: 'MCP',
        headline: 'Debug errors from your editor',
        description:
            'Triage issues, inspect stack traces, and generate fixes from Cursor, Claude Code, VS Code, or any MCP-compatible agent.',
    },
    installation: {
        title: 'Install',
        headline: 'Install',
        description: 'SDKs for web, mobile, and backend – then upload source maps so stack traces stay readable.',
        productSlug: 'error-tracking',
        categories: ['web', 'mobile', 'backend-languages', 'backend-frameworks'],
    },
    postHogOnPostHog: {
        title: 'How PostHog uses Error Tracking',
        benefits: [
            {
                title: 'Track errors',
                description: 'and identify spikes in exception events',
            },
            {
                title: 'Investigate root causes',
                description: 'using stack traces and session replays',
            },
            {
                title: 'Triage issues',
                description: 'by filtering based on severity and impact',
            },
            {
                title: 'Find out when things go wrong',
                description: 'by setting up alerts for critical errors',
            },
            {
                title: 'Dodge blame',
                description: 'by assigning errors to someone else',
            },
        ],
    },
    answersDescription: 'Track and resolve errors and exceptions in your application',
    questions: [
        {
            question: 'How can I analyze error patterns?',
            url: '/docs/error-tracking/monitoring',
        },
        {
            question: 'How do I set up error alerts?',
            url: '/docs/error-tracking/alerts',
        },
        {
            question: 'How do I manage and resolve issues?',
            url: '/docs/error-tracking/managing-issues',
        },
        {
            question: 'How can I reduce error tracking costs?',
            url: '/docs/error-tracking/pricing',
        },
        {
            question: 'How do stack traces work?',
            url: '/docs/error-tracking/stack-traces',
        },
    ],
    comparison: {
        summary: {
            them: [
                {
                    title: 'Uptime monitoring',
                    subtitle: "We don't have uptime monitoring. Yet.",
                },
                {
                    title: 'Advanced alerting',
                    subtitle: 'We currently only support Slack and email alerts on custom criteria.',
                },
                {
                    title: 'Advanced error grouping systems',
                },
                {
                    title: 'Better mobile support',
                    subtitle: 'Even our team thinks Sentry is better if you need mobile support. For now!',
                },
            ],
            us: [
                {
                    title: 'Agents can act on every error and the user who hit it – the context that powers self-driving',
                },
                {
                    title: 'Integration with other PostHog tools',
                },
                {
                    title: 'Feature flags for error recovery',
                    subtitle: 'Quickly roll back features that cause errors.',
                },
                {
                    title: 'Simple, transparent pricing',
                },
            ],
        },
        companies: [
            {
                name: 'Bugsnag',
                key: 'bugsnag',
            },
            {
                name: 'Datadog',
                key: 'datadog',
            },
            {
                name: 'Glitchtip',
                key: 'glitchtip',
            },
            {
                name: 'LogRocket',
                key: 'logrocket',
                link: '/blog/posthog-vs-logrocket',
            },
            {
                name: 'PostHog',
                key: 'posthog',
            },
            {
                name: 'Rollbar',
                key: 'rollbar',
            },
            {
                name: 'Sentry',
                key: 'sentry',
                link: '/blog/posthog-vs-sentry',
            },
            {
                name: 'Signoz',
                key: 'signoz',
            },
        ],
        rows: ['error_tracking'],
        excluded_sections: ['platform.libraries'],
    },
    integrations: ['ab_experiments', 'product_analytics', 'session_replays'],
    pairsWith: [
        {
            slug: 'session-replay',
            description: 'Watch exactly how an error occurred for a specific user',
        },
        {
            slug: 'product-analytics',
            description: 'Analyze trends over time and get alerts when things go wrong',
        },
        {
            slug: 'feature-flags',
            description: 'Roll back features that cause errors, or test fixes with slow rollouts',
        },
    ],
    ai: {
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/ERROR_TRACKING_2f807c123b.png',
        imageAlt: 'PostHog AI and error tracking',
        description: 'investigate the exception and ship the fix',
        intro: 'Ask PostHog AI to find issues, inspect stack traces, and help ship the fix.',
        mcpFeatures: ['error_tracking'],
        skills: [
            'Finds specific errors and affected users with natural language',
            'Summarizes stack traces, explains likely causes (and likely fixes)',
            'Surfaces exceptions worth prioritizing based on impact and downstream metrics',
        ],
        // Prompts from product data + /docs/error-tracking/surfaces/mcp.
        // Tool names verified against mcp-tools.json.
        groups: [
            {
                title: 'Find',
                tool: 'query-error-tracking-issues-list',
                prompts: [
                    'Find the most common frontend errors this week',
                    'Show me my most common errors.',
                    'Which errors impact user sign-ups the most?',
                    'Which error is causing the most crashes in production?',
                    'Summarize new issues introduced after the latest release',
                ],
            },
            {
                title: 'Inspect',
                tool: 'query-error-tracking-issue-events',
                prompts: [
                    "What's the full stack trace for the most recent error?",
                    'Create a fix and show me how to reproduce the error with the highest severity.',
                ],
            },
            {
                title: 'Update status',
                tool: 'error-tracking-issues-partial-update',
                prompts: ['Mark this issue as resolved.', 'Set all high-severity errors from today to suppressed.'],
            },
            {
                title: 'Assignment rules',
                tool: 'error-tracking-assignment-rules-create',
                prompts: ['Create an assignment rule that assigns all TypeError exceptions to the backend team.'],
            },
            {
                title: 'Grouping rules',
                tool: 'error-tracking-grouping-rules-update',
                prompts: ['Update the filters on my grouping rule to also match NullPointerException errors.'],
            },
            {
                title: 'External issues',
                tool: 'error-tracking-external-references-create',
                prompts: ['Create a Jira issue for the top error and link it to the PostHog issue.'],
            },
        ],
    },
    presenterNotes: {
        // TODO: hopefully we have issue autofix and revenue analytics ordering by time this launches
        overview:
            "<strong>Presenter notes:</strong> Error tracking lets you monitor, investigate, and resolve any issues your users encounter within your app – so you can ship with confidence and debug faster. It's uniquely connected to PostHog's customer infrastructure products. <em>Watch session replays</em> to see exactly what happened. <em>Create product analytics</em> to discover how  errors are impacting trends, funnels, or retention. <em>Use feature flags</em> to roll back instantly and target affected users.",
        customers: `Zealot switched from BugSnag and Amplitude. SquadS Ventures ditched three separate tools and consolidated everything into one platform. (That'd be PostHog, if you weren't <em>tracking...</em> 🥁). Why? It's all about getting all the context they need in one place, reducing the friction of debugging and fixing errors faster than their legacy workflows. 
            <br /> <br />
            There are health benefits too. The head of engineering at SquadS Ventures shared, "My smartwatch indicates a <em>20% increase</em> in sleep quality after using PostHog's error tracking."`,
        product_os_benefits:
            "In case we haven't driven the point home by now, here's a slide all about it: PostHog Error Tracking is connected to all other PostHog products. It makes it faster to debug because you can see the full event log of what happened leading up to an error. You can watch a session recording to visualize it. You can see which feature flags were enabled at the time. And if you need to run a complex query, use the SQL editor or write a query directly from the PostHog Data Warehouse.",
        features:
            "<strong>Alerts:</strong> Get notified via email, Slack, or webhooks when new errors appear. Set custom thresholds. You don't have to wait for a spike in support tickets to know what issues users are facing. (This is also important because only a fraction of them are motivated enough to actually message you!)<br /><br /><strong>Triage:</strong> Assign errors to people or teams. Track status. Know who's fixing what. Basic but essential.<br /><br /><strong>Organize and prioritize:</strong> Merge similar errors, sort by frequency or recency, search by error message.<br /><br /><strong>Stack traces:</strong> Full stack traces with source maps. See exactly where errors happen. Works with all major frameworks. Even when minified.<br /><br /><strong>And then there's the convergence:</strong><br /><br /><strong>Session Replay:</strong> Watch the user's session leading up to the error. No more \"can't reproduce\" tickets.<br /><br /><strong>Product Analytics:</strong> Graph error rates over time. Break down by user properties. Find patterns.<br /><br /><strong>Feature Flags:</strong> Error in production? Turn off the feature instantly. Test fixes on small groups first.<br /><br /><strong>User Profiles:</strong> See all errors for a specific user in their dedicated activity timeline. Check their feature flags at error time.",
        answers:
            'Here are some guides about how to use Error Tracking. Some of the things you can do: Analyze patterns by graphing errors over time, set up alerts so you know before users complain, manage issues with assignment and status tracking, and reduce costs by sampling or filtering non-critical errors. And our stack traces work with source maps for minified code.',
        pricing:
            "Log up to 100k errors without even entering a credit card. You also get the monthly free tier even if you <em>have</em> added a card. Beyond that, it's simple, usage-based pricing. Compare that to Sentry who charges per seat <em>plus</em> usage. No surprise bills when you add developers, and you can set a billing limit so you never pay more than expected.",
        'comparison-summary':
            "Sentry is the 800-pound gorilla. They're <em>exception</em>ally good at pure error tracking. But errors don't happen in isolation. PostHog gives you the full context – what the user did, which flags were on, and the related session recording. Because it's all one system, agents can act on that context directly – it's what makes your product self-driving, not just another dashboard. For mobile-heavy apps, Sentry's still better (though we're actively working on that). For everything else, context wins.",
        'feature-comparison':
            "We have the core features. For now, we're missing a few things like uptime monitoring, advanced alert rules, and our mobile SDKs are in active development. But what we uniquely have: deep integration with analytics, replays, and feature flags. Choose according to your stage of growth, and keep in mind PostHog is designed to grow <em>with</em> you, so even if we don't have all the features you need, we likely will soon!",
        docs: 'Setup guides for all major languages and frameworks. Source map upload instructions. Common patterns like error boundaries and custom grouping. Written by engineers who actually built (and use) this stuff themselves!',
        'pairs-with':
            "Error happens → watch the replay → see the user's journey → check their feature flags → roll back if needed. This workflow is impossible with standalone tools. Everything connects because it's all in one platform.",
        'getting-started':
            'Add our SDK(s) and errors start flowing immediately. Set up Slack alerts for critical errors and start identifying core problems faster – and at a fraction of the cost vs. the big players!',
        ai: "The PostHog MCP server exposes function calling tools to any MCP client, enabling AI agents to interact with PostHog's API via the MCP protocol. When combining our MCP server with Error Tracking, your AI agents can take actions based on PostHog data which unlocks powerful, autonomous debugging capabilities.",
    },
}
