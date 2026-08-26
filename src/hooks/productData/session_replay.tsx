import React from 'react'
import {
    IconChat,
    IconCheckCircle,
    IconCode,
    IconConfetti,
    IconCursorClick,
    IconEye,
    IconInfo,
    IconList,
    IconMagic,
    IconMessage,
    IconArrowUpRight,
    IconPieChart,
    IconRewindPlay,
    IconRocket,
    IconSparkles,
} from '@posthog/icons'
import Link from 'components/Link'
import { features } from './session_replay/features'
import { applications, topFeatures } from './session_replay/slides'
import { getTool } from '../../data/tools'

export const sessionReplay = {
    ...getTool('session_replay'),
    Icon: IconRewindPlay,
    label: 'Web recordings',
    type: 'session_replay',
    teamSlug: 'replay',
    forumTopicId: 377,
    color: 'yellow',
    colorSecondary: '[#B56C00]',
    wizardSupport: true,
    includeAddonRates: true,
    shortDescription: 'Watch people use your product',
    pricingDescription:
        'Web session recordings capture clicks, scrolls, console logs, and network calls so you can replay exactly what users did in your product.',
    seo: {
        title: 'Session Replay – Debug and analyze sessions with PostHog',
        description:
            'Watch exactly why something happened so the fix is obvious – the session context agents use to debug and ship. One of the tools that makes your product self-driving.',
    },
    /**
     * Sections rendered on the Product surface (`/session-replay`). Each entry
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
     * Sections rendered on the Pricing surface (`/session-replay/pricing`).
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
        title: 'See how people use your product',
        description:
            'Session Replay is one of the tools that makes your product self-driving: play back sessions to see exactly why something happened so the fix is obvious. The context agents use to debug UI issues and nuanced user behavior in your product, website, or mobile app.',
        eli5: "Session Replay records what happens in a user's session – clicks, scrolls, form inputs, page views, network requests, console logs – and plays it back like video. It's like watching a user's screen over their shoulder – it gives the nuance context you only get when you're actually watching them experience your product.",
        textColor: 'text-black', // tw
    },
    screenshots: {
        overview: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/replay_screenshot_de8cb3a4ed.jpg',
            alt: 'Session replay screenshot',
            imgClasses:
                'absolute bottom-0 left-0 max-w-[95%] @2xl:max-w-[525px] rounded-tr-md overflow-hidden shadow-2xl',
            // Named annotation sets for <ImageAnnotations.FromProduct />. Coordinates are
            // percentages, authored via the internal tool at /image-annotator.
            annotations: {
                'dev-tools': {
                    type: 'numbered',
                    items: [
                        { x: 27.2, y: 9.8, title: 'Debug views' },
                        { x: 48.9, y: 7.8, title: 'DevTools' },
                        { x: 32.6, y: 21.6, title: 'Event timeline' },
                        {
                            x: 33.7,
                            y: 41,
                            title: 'Timeline entries',
                            description:
                                'Custom events, DOM autocapture, network calls, console logs, web vitals, errors, PostHog activity',
                        },
                    ],
                },
            },
        },
        'player-overview': {
            // Store the bare delivery URL: CloudinaryImage falls back to a plain <img> for any
            // src containing a comma, and that branch drops `className` – which is where the
            // dark/light toggle lives, so an inline-transformation URL renders both variants.
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/replay_player_overview_light_902aadff54.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/replay_player_overview_dark_d03f1adf30.png',
            alt: 'The session replay page: the list of recordings on the left, the player in the middle, the event list on the right',
            // 2578x1300. The light and dark variants show different sessions but the same three
            // panels at the same size, so one set of panel-level coordinates holds for both.
            // The pocket guide annotates this inline – see contents/pocket-guides/session-replay/101.
        },
        'player-inspector': {
            // Cropped to the player and the inspector beside it, 3649x2074 at source. The
            // transformations are carried inline on purpose – `<ScreenshotFigure>` puts the
            // dark/light toggle on a wrapper, so CloudinaryImage's comma fallback is harmless.
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/player_light_d95c9f5cd8.png',
            srcDark:
                'https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/player_dark_227437debc.png',
            alt: "A session playing back on the left, with the inspector's event list and its five views on the right",
            // Both variants are the same screen at the same size, so one set of coordinates holds.
            // The pocket guide annotates this inline – see contents/pocket-guides/session-replay/101.
        },
        'issue-recordings': {
            // Cropped to the issue's right-hand pane, where both ways into a replay sit. Source
            // is 2608x1570; the crop and the resize are carried inline, which is safe because
            // `<ScreenshotFigure>` puts the dark/light toggle on a wrapper rather than the image.
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/c_crop,x_1043,y_20,w_1565,h_1550/w_1600,c_limit,q_auto,f_auto/session_from_error_light_056bf99ba7.png',
            srcDark:
                'https://res.cloudinary.com/dmukukwp6/image/upload/c_crop,x_1043,y_20,w_1565,h_1550/w_1600,c_limit,q_auto,f_auto/session_from_error_dark_8efab34ebd.png',
            alt: 'An Error Tracking issue, with the button for every recording of the issue above and the Recording tab for this one exception below',
            // Both variants are the same screen at the same size, so one set of coordinates holds.
            // The pocket guide annotates this inline – see contents/pocket-guides/session-replay/finding-replays.
        },
        'player-controls': {
            // The foot of the player, recropped from the same 3649x2074 source as
            // `player-inspector` – the controls are worth their own figure, the recording above
            // them is not. Shown in the pinned layout, which is what the crop makes legible.
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/c_crop,x_0,y_1440,w_1752,h_634/w_1600,c_limit,q_auto,f_auto/player_light_d95c9f5cd8.png',
            srcDark:
                'https://res.cloudinary.com/dmukukwp6/image/upload/c_crop,x_0,y_1440,w_1752,h_634/w_1600,c_limit,q_auto,f_auto/player_dark_227437debc.png',
            alt: 'The bottom of the replay player: the seek bar, the transport controls, and the row of capture and comment buttons',
            // Both variants are the same screen at the same size, so one set of coordinates holds.
            // The pocket guide annotates this inline – see contents/pocket-guides/session-replay/watching-replays.
        },
        home: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_replay_timeline_light_9225f869dc.jpg',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_replay_timeline_dark_f5371a996f.png',
            alt: 'Session replay screenshot',
            classes: 'justify-start items-end pr-4 @lg:pr-6',
            imgClasses: 'rounded-tr-md shadow-2xl',
            // 1110x640, measured against the light variant – the dark one is the same screen at
            // the same size, so coordinates hold for both.
            // The pocket guide annotates this inline – see contents/pocket-guides/session-replay/101.
            playlist: {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/recording_list_light_5919aed63e.png',
                srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/recording_list_dark_169d60d6fb.png',
                annotations: {
                    playlist: {
                        type: 'numbered',
                        items: [
                            {
                                x: 3.7,
                                y: 2.6,
                                title: 'Filter panel',
                                description: 'Open the filter panel to find more recordings',
                            },
                            {
                                x: 76.8,
                                y: 2.6,
                                title: 'Ask PostHog AI',
                                description: "Find the recordings you're looking for",
                            },
                            {
                                x: 5.7,
                                y: 12.7,
                                title: 'Limit recordings',
                                description:
                                    'Choose whether to see all recordings, or to hide ones you or other people have watched',
                            },
                            {
                                x: 71.5,
                                y: 12.7,
                                title: 'Timestamp display',
                                description:
                                    'Switch time display between "relative" (seconds in recording), UTC, or project timezone',
                            },
                            {
                                x: 31.3,
                                y: 19.2,
                                title: 'Sorting',
                                description: 'Order recordings by timestamp, activity, errors, and more',
                            },
                            {
                                x: 67.5,
                                y: 19.1,
                                title: 'Autoplay',
                                description:
                                    'Change the autoplay mode for the playlist. Switch it off, or automatically play the next newest or oldest recording.',
                            },
                            {
                                x: 64.5,
                                y: 29.2,
                                title: 'Recording details',
                                description: 'User, browser and OS details, click and keystroke count, initial URL',
                            },
                        ],
                    },
                },
            },
        },
        filters: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/filters_light_020d186555.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/filters_dark_6f3e65501b.png',
        },
        'technical-context': {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/technical_content_desktop_light_a9c7516f43.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/technical_content_desktop_dark_67abc27556.png',
            srcMobile:
                'https://res.cloudinary.com/dmukukwp6/image/upload/technical_content_mobile_light_bcf6de0102.png',
            srcMobileDark:
                'https://res.cloudinary.com/dmukukwp6/image/upload/technical_content_mobile_dark_12b7c6f51b.png',
            alt: 'Technical context in session replay',
        },
        chat: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/chat_light_9efd89f586.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/chat_dark_ecac24fa87.png',
        },
        recordings: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/recordings_light_90e389a4fa.png',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/recordings_dark_6a8ebd989f.png',
        },
    },
    hog: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/FooterCTA/images/surprised-hog.png',
        alt: 'A surprised hedgehog',
        footerClasses: 'max-w-[240px]',
        classes: 'absolute bottom-0 right-0 max-w-[698px]',
    },
    hogs: {
        default: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/replay_hog_20fc000c14.png',
        },
        mobileHog: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/SESSION_REPLAY_a3ca565731.png',
            alt: 'A hedgehog film director with a clapperboard',
        },
    },
    slider: {
        marks: [5000, 25000, 120000, 500000],
        min: 5000,
        max: 500000,
    },
    volume: 5000,
    addonSliders: [
        {
            key: 'mobile_replay',
            label: 'Mobile recordings',
            pricingDescription:
                'Replay native iOS, Android, React Native, and Flutter sessions. Billed separately from web recordings with its own free tier.',
            sliderConfig: {
                marks: [2500, 10000, 50000, 150000, 500000],
                min: 2500,
                max: 500000,
            },
            volume: 2500,
            unit: 'mobile recording',
        },
    ],
    useCases: {
        intro: 'Session Replay is used across teams depending on your role.',
        rows: [
            ['Product Engineers', "Debug production issues that can't be reproduced locally"],
            ['Support', 'Pinpoint the source of issues with visual verification and console logs'],
            ['PMs & Designers', 'Spot friction, dead ends, and rage clicks'],
            ['Growth', 'Investigate funnel drop-off and onboarding bleed'],
            ['QA', 'Validating releases by watching real users instead of staged flows'],
        ],
    },
    useCaseRamp: {
        intro: 'Session Replay works at three levels. You can watch recordings yourself, ask an agent to find and summarize them for you, or let PostHog work proactively with your data.',
        scenario: 'Users keep rage-clicking (why though?)',
        columns: [
            {
                level: 'Do it yourself',
                surfaces: ['web'],
                scenario: {
                    icon: 'IconRewindPlay',
                    steps: [
                        'Clicks are piling up on one button, so you pull up a handful of recordings to see what users are up to',
                        "Turns out they're trying to expand a section that looks clickable but isn't",
                        'You sketch a fix and file it, with a better feel for that page than you had an hour ago. But now you need to prompt an agent (or write the code yourself)',
                    ],
                },
                points: [
                    {
                        title: "Turns out, there's more",
                        icon: 'IconHandwave',
                        body: "Watching a handful of sessions like this is how you build a real feel for your product. Filters in PostHog Web help sort ones worth watching. That feel doesn't scale past your free time for playback.",
                    },
                    {
                        title: 'Point an agent at it instead',
                        icon: 'IconSparkles',
                        body: 'PostHog AI can watch and summarize hundreds of sessions, not just the handful you had time for, turning the same kind of hunch into a pattern you can prove.',
                    },
                ],
            },
            {
                level: 'Ask an agent',
                surfaces: ['ai', 'slack', 'mcp', 'cli'],
                scenario: {
                    icon: 'IconMagicWand',
                    steps: [
                        'You ask PostHog AI what people are doing right before they rage click that button, across every session this week',
                        "It summarizes the pattern across hundreds of matching recordings: most are trying to expand a section that looks clickable but isn't",
                        'You watch two or three to confirm the read, then share the evidence with your team',
                    ],
                },
                points: [
                    {
                        title: "Turns out, there's more",
                        icon: 'IconSearch',
                        body: "It can slice that same pattern by who's affected, too – ask whether it's your free users or your highest-paying accounts hitting this, and you'll know whether it's a nice-to-fix or a today problem.",
                    },
                    {
                        title: 'No prompt required',
                        icon: 'IconMessage',
                        body: 'Replay Vision watches every session for the same kind of pattern continuously, no prompt required, turning what it sees into queryable data instead of a one-off answer.',
                    },
                ],
            },
            {
                level: 'Ship with PostHog',
                surfaces: ['inbox', 'slack', 'desktop'],
                scenario: {
                    icon: 'IconSearch',
                    steps: [
                        "A Replay Vision scanner watches that page's sessions continuously",
                        'The pattern lands as a signal, and it groups with an error tracking signal on the same page into one report',
                        'The combined evidence is enough to write the fix: a cursor style and a real click target',
                        'The pull request ships with a summary attached, so you log the "why" along with the diff',
                    ],
                },
                points: [
                    {
                        title: 'It watches the video, not just the clicks',
                        icon: 'IconEye',
                        body: (
                            <>
                                <Link to="/docs/replay-vision" state={{ newWindow: true }} className="underline">
                                    Replay Vision
                                </Link>{' '}
                                watches each session's actual video alongside the click and pageview events, catching
                                hesitation and where someone's attention drifts – visual cues no event stream captures
                                on its own.
                            </>
                        ),
                    },
                    {
                        title: 'Context for the fix, not the whole story',
                        icon: 'IconBrain',
                        body: "When there's a clear code fix, that combined evidence from signal sources rides along in the pull request generated in your inbox. When a replay only shows the symptom, it routes to whoever owns that page instead.",
                    },
                ],
            },
        ],
    },
    features,
    mcp: {
        title: 'MCP',
        headline: 'Search replays from your editor',
        description:
            'Find session recordings from Cursor, Claude Code, VS Code, or any MCP-compatible agent. Filter by events, user properties, and frustration signals.',
    },
    installation: {
        title: 'Install',
        headline: 'Install',
        description: "No matter how you build, we've probably got a way to install it.",
        productSlug: 'session-replay',
        categories: ['web', 'mobile', 'no-code'],
    },
    postHogOnPostHog: {
        title: 'How PostHog uses Session Replay',
        benefits: [
            {
                title: 'Gather context',
                description: 'by seeing what led to each rageclick',
            },
            {
                title: 'Debug issues',
                description: 'by watching the prelude to each bug',
            },
            {
                title: 'Assess performance',
                description: 'by measuring first contentful paint and load time',
            },
            {
                title: 'Resolve experiments',
                description: 'by seeing how users interact with new features',
            },
            {
                title: 'Build user empathy',
                description: 'by watching their entire product journey',
            },
            {
                title: 'Improve conversion',
                description: 'by using context to solve stubborn problems',
            },
        ],
    },
    questions: [
        {
            question: 'Why are users dropping off in my funnel?',
            url: '/tutorials/explore-insights-session-recordings#watching-users-through-funnels',
        },
        { question: 'How do I figure out how to lower churn?', url: '/tutorials/churn-rate#session-recordings' },
        {
            question: 'How can I understand what my power users are doing?',
            url: '/tutorials/explore-insights-session-recordings#find-and-analyze-outliers-in-trend-graphs',
        },
        { question: 'How do I see where errors happen?', url: '/tutorials/session-recordings-for-support' },
        { question: 'Which screens are loading slowly?', url: '/tutorials/performance-metrics' },
        {
            question: 'How do I understand sources of friction in my app?',
            url: '/tutorials/filter-session-recordings',
        },
        {
            question: "What is a user's First Contentful Paint time",
            url: '/tutorials/performance-metrics#1-first-contentful-paint',
        },
        {
            question: "What is a user's Dom Interactive time",
            url: '/tutorials/performance-metrics#2-dom-interactive',
        },
        {
            question: "What is a user's Page Loaded time",
            url: '/tutorials/performance-metrics#3-page-loaded',
        },
        {
            question: 'How do I optimize site performance?',
            url: '/tutorials/performance-metrics#optimization-cheat-sheet',
        },
        {
            question: 'How can I improve customer support with screen recordings?',
            url: '/tutorials/session-recordings-for-support',
        },
        {
            question: 'How do I control which sessions are being captured?',
            url: '/docs/session-replay/how-to-control-which-sessions-you-record',
        },
    ],
    comparison: {
        summary: {
            them: [
                {
                    title: 'You want self-hosting or more strict data residency',
                    // subtitle: 'In progress!',
                    // subtitleUrl: 'https://github.com/PostHog/posthog/issues/23400',
                },
                {
                    title: 'You have strong security requirements that require more robust PII redaction',
                    // subtitle: 'In progress!',
                    // subtitleUrl: 'https://github.com/PostHog/posthog/issues/14331',
                },
            ],
            us: [
                {
                    title: 'Agents can search replays and act on what they see – the context that powers self-driving',
                },
                {
                    title: 'Interlinking with feature flags and insights',
                    subtitle: 'Jump between them easily',
                },
                {
                    title: 'Collaboration, sharing, embedding, and exporting recordings',
                },
                {
                    title: 'No limits on how many recordings captured',
                },
            ],
        },
        companies: [
            {
                name: 'FullStory',
                key: 'fullstory',
                link: '/blog/posthog-vs-fullstory',
            },
            {
                name: 'Hotjar',
                key: 'hotjar',
                link: '/blog/posthog-vs-hotjar',
            },
            // {
            //     name: 'Matomo',
            //     key: 'matomo',
            //     link: '/blog/posthog-vs-matomo',
            // },
            {
                name: 'LogRocket',
                key: 'logrocket',
                link: '/blog/posthog-vs-logrocket',
            },
            {
                name: 'Clarity',
                key: 'clarity',
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
        rows: ['session_replay', 'heatmaps'],
        excluded_sections: ['platform.integrations', 'platform.libraries', 'platform.developer', 'platform.security'],
    },
    pairsWith: [
        {
            slug: 'product-analytics',
            description: 'Jump into a playlist of session recordings directly from any time series in a graph',
        },
        {
            slug: 'feature-flags',
            description: "See which feature flags are enabled for a user's session",
        },
        {
            slug: 'experiments',
            description:
                'Generate a playlist of recordings limited to an A/B test or specific group within a multivariate experiment.',
        },
    ],
    ai: {
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/replay_mobile_hog_03d948364a.png',
        imageAlt: 'A hedgehog filming and a hedgehog peeking around a phone showing session replay',
        intro: 'Ask PostHog AI to find a specific session or summarize a group of them.',
        groups: [
            {
                title: 'Find',
                tool: 'query-session-recordings-list',
                prompts: [
                    'Find sessions where users dropped off during checkout',
                    'Show me sessions from yesterday with rage clicks on /pricing',
                    'Find replays where the signup form was abandoned',
                    'Show enterprise users who hit a 500 error in the last 24 hours',
                    'Find mobile sessions longer than 5 minutes from this week',
                    "Pull replays where users clicked the upgrade button but didn't convert",
                ],
            },
            {
                title: 'Summarize',
                tool: 'session-recording-summarize',
                prompts: [
                    'Summarize what this user did in their last session',
                    'What happened in the session for ticket #4821?',
                    'Walk me through what tina@acme.com did before opening this support ticket',
                    'Tell me where users typically get stuck in onboarding',
                ],
            },
            {
                title: 'Cluster + investigate',
                prompts: [
                    "What's the most common reason users rage click on /settings?",
                    "Cluster yesterday's checkout drop-offs and tell me what they have in common",
                    'What are the top 3 patterns in sessions that ended on the pricing page?',
                    'Find the funniest thing a user did this week',
                ],
            },
            {
                title: 'Build a playlist',
                tool: 'session-recording-playlist-create',
                prompts: [
                    'Make a playlist of every session where someone hit our new pricing page',
                    'Save a playlist of replays from users in the experiment B variant',
                    'Create a playlist of sessions where users abandoned the signup flow',
                ],
            },
            {
                title: 'Debug a specific user',
                prompts: [
                    'Show me what acme.com users did this week',
                    'Pull every replay from user_id 12345 in the last 7 days',
                    'Find sessions where this user hit a JS error',
                ],
            },
        ],
    },
    presenterNotes: {
        overview:
            "<strong>Presenter notes:</strong> Session Replay lets you see exactly how users interact with your app. You're watching their real session – what they clicked, where they got stuck, what broke. This isn't just for debugging; it's for building empathy. You can see what's intuitive and what isn't, and how it feels to actually use your product. It's often the fastest way to uncover small issues that analytics alone won't catch. Everything is captured automatically—no manual tagging needed.",
        ai: 'MCP hands the same session replay capabilities to your coding agent. Investigate user-reported bugs, understand how users interact with features, and find specific sessions – without switching to the PostHog app.',
        features:
            "<strong>Event timeline:</strong> The timeline brings together everything from DOM load timing and API calls to console logs and user actions. It gives you full visibility into what happened, when it happened, and what else was going on at the time. You're not flipping between separate tools to reconstruct a bug. It's one unified view, scoped to the exact user session. For teams who care about real- world performance, this is a fast way to correlate frontend behavior with actual user impact. <br /><br /><strong>Console logs:</strong>  One of the most useful parts of replay is being able to see console logs alongside the session. You get full visibility into warnings and errors as they happen. If you're using Sentry, those errors are linked—so you can jump from an exception to a full session replay showing exactly how the error occurred. This shortens the loop between support, product, and engineering. You're not asking users what browser they were using or what they clicked. You just watch it. <br /><br /><strong>Network monitor:</strong> Network requests are captured as part of the session and shown with timing, method, and status code. You can see how slow requests affected load time, whether a backend error disrupted the experience, or which endpoints were called at each step. It's especially helpful when tracking down flakiness that only happens in edge cases or under real - world latency. <br /><br /><strong>Autocapture:</strong> PostHog automatically tracks clicks, form interactions, page views, and other key events without requiring manual instrumentation. You can get up and running quickly and still have meaningful data to explore. When you need more control, you can layer in custom events or define your own capture rules. The point is: you don't have to do everything upfront to start getting value. <br /><br /><strong>Capture form inputs:</strong> Form input capture is turned off by default, but you can opt in to capture specific fields—useful when diagnosing friction in onboarding flows or payment forms. It's granular, so you're not logging everything—only what's needed. And since it integrates with our privacy masking features, sensitive fields can be excluded with a simple config update. <br /><br /><strong>DOM explorer:</strong> During a replay, you can inspect the live DOM snapshot at any point in the session. This helps validate that what the user saw matches your expectations, especially in dynamic apps where the UI may shift based on state or timing. It's helpful for spotting layout shifts, broken styles, or elements that weren't visible when they should've been. <br /><br /><strong>Record by feature flag:</strong> You can choose to only record sessions from users who have a specific feature flag enabled. This is useful for rollout testing, debugging experiments, or validating behavior changes in staging versus production environments. It gives your team a way to focus on just the relevant slice of users without recording everyone. <br /><br /><strong>Supported platforms:</strong> Session replay works across web, iOS, Android, React Native, and Flutter. And we don't treat mobile support as an afterthought—it includes gesture tracking, scrolls, taps, and replay stability that's ready for production. All SDKs are open source, and setup is consistent across environments. This means you can build a single mental model that works whether your app is on the web or mobile. <br /><br /><strong>More features:</strong> <br /><br /><strong>Filter by event:</strong> Narrow down recordings to sessions where specific events or actions were triggered. This is helpful for tracking down bugs related to a new feature or analyzing how people interact with a particular UI element. <br /><br /><strong>Filter by people:</strong> Filter sessions by person properties—country, browser, custom property, even specific users. This becomes really useful when debugging reports from a single customer or testing behavior across user segments. <br /><br /><strong>Block sensitive data:</strong> Sensitive data capture is opt -in and customizable. You can redact fields using simple HTML attributes or define masking rules at the app level. This is especially useful in production environments where you want to balance visibility with privacy. <br /><br /><strong>Minimum duration filter:</strong> You can ignore very short sessions—like bounces or accidental visits—by setting a minimum duration threshold. This keeps your recordings useful and your volume under control. <br /><br /><strong>Sample recorded sessions:</strong> Reduce the percentage of sessions being recorded without losing signal. This is one of the most effective ways to manage costs while still catching meaningful patterns. <br /><br /><strong>Share & embed:</strong> You can share a replay via URL or embed it directly into a support ticket, Slack thread, or internal dashboard.This makes collaboration between support and engineering much faster—especially when you're working across time zones.",
        answers:
            "Funnels are great for showing you <em>where</em> users drop off, but not <em>why</em>. That's where session replay helps. You can jump straight from a funnel drop-off to a real session recording from one of those users. No assumptions—just facts. We also let you filter sessions by the events that matter to your funnel, so you're not digging through noise. It's a good way to stop over-optimizing things that aren't actually causing problems and focus on what is.",
        pricing:
            "You get 5,000 recordings per month for free – this is <em>significantly</em> more than other replay products. After that, it's metered by usage. No lock-ins, no guessing what tier you need. You pay only for what you record. The more you use, the cheaper it gets. And unlike some other tools, you're not paying for seats or stuck in an enterprise contract just to unlock basic features. This lets both small teams and large ones get the same level of insight, with pricing that's scalable. And you can also control which sessions you want to keep costs down and set billing limits so you never end up with a surprise bill.<br /><br />There's also that time <a href='/blog/session-replay-pricing'>we reduced pricing for everyone across the board</a>, and we're planning on doing it again soon.",
        'comparison-summary':
            "<strong>TL;DR:</strong> If you want a replay product that deeply integrates with other analytics tools, use PostHog. Because it's one system, agents can search recordings and act on what they see – it's not just playback, it's the context that makes your product self-driving. We're always shipping code to get to feature parity with any competing product, so even if we don't have what you need yet, there's a good chance we'll have it soon. Plus you can follow along with this product's roadmap and see what the Replay Team is shipping next.",
        'feature-comparison':
            "We don't have it all (yet) but we're working on it. We hope this comparison chart adds some Clarity for you.",
        docs: "We put a lot of effort into our documentation because we know that for most teams, this is your first real experience using PostHog. And we don't outsource it. The people writing the docs are the same engineers building the product. That means what you're reading is usually up to date, technically accurate, and written by someone who knows what it's like to implement this stuff in production.<br /><br />We treat the docs like a product of their own. Our team actively monitors GitHub issues, community Slack, forums, and feedback that comes through the site. So if something's unclear, we try to fix it quickly.<br /><br />We also understand that getting things configured properly is only part of the job. If your team is concerned about session replay costs, sampling strategy, just reach out – we're happy to suggest optimizations and help you get the right setup for your use case, even if it means we make less money. We want you to get the most out of PostHog without surprises.",
        'pairs-with':
            "One big difference with PostHog is that replay isn't bolted on. It's part of the full product suite. That means it connects directly to analytics, feature flags, experiments, and surveys. If you're running an A/B test and a user drops out, you can jump into their replay and see why. Or you can filter recordings by flag variant. You're not exporting data between tools – it's already connected. That makes it easier to find patterns and actually act on them.<br /><br />Of course, we integrate with third-party tools and data warehouses too – but if you you're not using them, you have everything you need right inside PostHog.",
        'getting-started':
            "So to sum up, Session Replay gives you the context behind your metrics. It's not trying to replace your charts – it's there to make them actionable. If a number looks off, you can dig in and see what happened. (It's also <em>extremely valuable</em> in a support context where you're trying to understand what went wrong for a specific customer.) And because it's part of a single platform, it fits into your workflow instead of adding another tool to maintain. It's flexible, it scales, and it gives you real visibility without having to guess what your users were doing.",
    },
}
