import React from 'react'
import { IconRewindPlay } from '@posthog/icons'
import { IconJavaScript, IconApple, IconAndroid, IconFlutter, IconReactNative } from 'components/OSIcons/Icons'
import OSButton from 'components/OSButton'
import Link from 'components/Link'
import CodeBlock from 'components/Home/CodeBlock'
import CloudinaryImage from 'components/CloudinaryImage'
import SnippetRenderer from 'components/SnippetRenderer'
import { True } from 'components/ComparisonTable/row'

export const sessionReplay = {
    Icon: IconRewindPlay,
    name: 'Session Replay',
    handle: 'session_replay',
    type: 'session_replay',
    slug: 'session-replay',
    color: 'yellow',
    colorSecondary: '[#B56C00]',
    category: 'product_engineering',
    shortDescription: 'Watch people use your product',
    seo: {
        title: 'Session replay - PostHog',
        description: 'Watch people use your product to diagnose issues and understand user behavior',
    },
    overview: {
        title: 'Watch people use your product',
        description:
            'Play back sessions to diagnose UI issues, improve support, and get context on nuanced user behavior in your product, website, or mobile app.',
        textColor: 'text-black', // tw
    },
    screenshots: {
        overview: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/replay_screenshot_de8cb3a4ed.jpg',
            alt: 'Session replay screenshot',
            imgClasses:
                'absolute bottom-0 left-0 max-w-[95%] @2xl:max-w-[525px] rounded-tr-md overflow-hidden shadow-2xl',
        },
        home: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_replay_timeline_light_9225f869dc.jpg',
            srcDark: 'https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_replay_timeline_dark_f5371a996f.png',
            alt: 'Session replay screenshot',
            classes: 'justify-start items-end pr-4 @lg:pr-6',
            imgClasses: 'rounded-tr-md shadow-2xl',
        },
    },
    hog: {
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/replay_hog_20fc000c14.png',
        alt: 'A hedgehog watching some session recordings',
        classes: 'absolute bottom-0 right-0 max-w-[698px]',
    },
    slider: {
        marks: [5000, 25000, 120000, 500000],
        min: 5000,
        max: 500000,
    },
    volume: 5000,
    customers: {
        hasura: {
            headline: 'improved conversion rates by 10-20%',
            description: "We wouldn't have noticed that needed fixing without PostHog's session replays.",
        },
        elevenlabs: {
            headline: 'uses replays and surveys when testing ideas',
            description: 'We watch lots of replays when testing a feature, and love how easy it is to launch surveys',
        },
        netdata: {
            headline: 'reduced back-and-forth in community support',
            description: 'Session replay in PostHog is so much better than Smartlook, which we used to use.',
        },
        pry: {
            headline: 'improved registrations by 20-30%',
            description: "We've improved our whole onboarding flow by about 5% too, which is great.",
        },
    },
    features: [
        {
            title: 'Event timeline',
            headline: 'Event timeline',
            description:
                "See the history of everything that happened in a user's session, including clicks, scrolls, and more.",
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/SessionReplay/images/timeline.png',
                    alt: 'Timeline',
                },
            ],
        },
        {
            title: 'Console logs',
            headline: 'Console logs',
            description: (
                <>
                    Console logs are useful for debugging and can be enabled by passing{' '}
                    <code>enable_recording_console_logs: true</code> or in your project's settings.
                </>
            ),
            children: (
                <>
                    <div className="flex @lg:flex-row @lg:gap-x-6 flex-col">
                        <div className="shrink">
                            <h4 className="text-lg">Your code</h4>
                            <CodeBlock
                                code={`posthog.init('<ph_project_api_key>', {
  api_host: '<ph_client_api_host>',
  defaults: '<ph_posthog_js_defaults>',
  enable_recording_console_log: true,
});`}
                                language="js"
                            />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-lg">Console logs in a session replay</h4>
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/CodeBlocks/SessionReplay/console-logs.png"
                                alt="Console logs in PostHog"
                                placeholder="blurred"
                            />
                        </div>
                    </div>
                </>
            ),
        },
        {
            title: 'Network monitor',
            headline: 'Network monitor',
            description: 'Analyze performance and network calls',
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/SessionReplay/images/network.png',
                    alt: 'Network monitor',
                    stylize: true,
                    shadow: true,
                },
            ],
        },
        {
            title: 'Autocapture',
            headline: 'Autocapture',
            description:
                "Capture sessions without extra code. If you're already using PostHog.js for analytics, there's nothing else to install.",
            children: <SnippetRenderer />,
        },
        {
            title: 'Capture form data',
            headline: 'Capture form data',
            description: (
                <>
                    HTML <code>input</code> fields are masked by default. But if you'd like to see what users are typing
                    into a form, set <code>maskAllInputs</code> to <code>false</code>. (Password fields will still
                    remain masked.)
                </>
            ),
            children: (
                <>
                    <div className="flex flex-col md:flex-row gap-x-6">
                        <div className="shrink">
                            <h4 className="text-lg">Your code</h4>
                            <CodeBlock
                                code={`posthog.init('<YourPostHogKey>', {
    session_recording: {
        maskAllInputs: false
    }
})`}
                                language="js"
                            />
                            <div className="pt-4">
                                <CodeBlock
                                    code={`<label>Name</label>
<input type="text" />

<label>Email</label>
<input type="email" />

<label>Password</label>
<input type="password" />`}
                                    language="html"
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-lg">Session replay</h4>
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/CodeBlocks/SessionReplay/session-replay.png"
                                alt="A screenshot of a session replay"
                                placeholder="blurred"
                            />
                        </div>
                    </div>
                </>
            ),
        },
        // {
        //     title: 'Canvas recording',
        //     headline: 'Canvas recording',
        //     description:
        //         "Capture canvas elements from your application. It works in both 2D and WebGL environments.",
        //     children: <OSButton asLink to="/docs/session-replay/canvas-recording" state={{ newWindow: true }}>Read the docs</OSButton>,
        // },
        // {
        //     title: 'Collections',
        //     headline: 'Collections',
        //     description:
        //         'Create a dynamic playlist of sessions to watch based on visitor activity, user properties, or cohort',
        //     images: [
        //         {
        //             src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/SessionReplay/images/network.png',
        //             alt: 'Playlist',
        //         },
        //     ],
        // },
        {
            title: 'DOM explorer',
            headline: 'DOM explorer',
            description:
                "Inspect the DOM of the user's browser at any moment in the recording. This lets you see the exact HTML and CSS that was rendered at that point in time – useful for debugging.",
            images: [
                {
                    src: 'https://res.cloudinary.com/dmukukwp6/image/upload/inspect_dom_e9376c469a.png',
                    alt: 'DOM explorer',
                },
            ],
        },
        {
            title: 'Recording rules',
            headline: 'Recording rules',
            description:
                'You can limit the sessions that are recorded to a percentage of randomized traffic, or based on triggered events, user properties, or browsing behavior. You can also manually enable recording in your code when a user is opted in to a feature flag.',
            children: (
                <div>
                    <h4 className="text-lg">Manually enable recording when a visitor is enrolled in a feature flag</h4>
                    <CodeBlock
                        code={`posthog.init('<ph_project_api_key>', {
  api_host: '<ph_client_api_host>',
  defaults: '<ph_posthog_js_defaults>',
  disable_session_recording: true,
});
window.posthog.onFeatureFlags(function () {
  if (window.posthog.isFeatureEnabled('your-feature-flag')) {
    window.posthog.startSessionRecording();
  }
});
`}
                        language="js"
                    />
                </div>
            ),
        },
        {
            title: 'Supported platforms',
            headline: 'Supported platforms',
            description:
                "Works with PostHog.js on the web. If you're already using product analytics, there's no separate installation.",
            children: (
                <div className="max-w-xl mx-auto">
                    <fieldset className="bg-primary">
                        <legend className="text-lg font-semibold">Web</legend>
                        <OSButton
                            asLink
                            icon={<IconJavaScript />}
                            iconClassName="size-8 relative -top-px"
                            size="xl"
                            className="!text-xl mr-1"
                            to="/docs/libraries/js"
                            state={{
                                newWindow: true,
                            }}
                        >
                            <span>JavaScript</span>
                        </OSButton>
                    </fieldset>
                    <fieldset className="bg-primary">
                        <legend className="text-lg font-semibold">Mobile*</legend>
                        <OSButton
                            asLink
                            icon={<IconApple />}
                            iconClassName="size-8 relative -top-px"
                            size="xl"
                            className="!text-xl mr-1"
                            to="/docs/libraries/ios"
                            state={{
                                newWindow: true,
                            }}
                        >
                            <span>iOS</span>
                        </OSButton>
                        <OSButton
                            asLink
                            icon={<IconAndroid />}
                            iconClassName="size-8 relative -top-px"
                            size="xl"
                            className="!text-xl mr-1"
                            to="/docs/libraries/android"
                            state={{
                                newWindow: true,
                            }}
                        >
                            <span>Android</span>
                        </OSButton>
                    </fieldset>
                    <fieldset className="bg-primary">
                        <legend className="text-lg font-semibold">Cross-platform*</legend>
                        <OSButton
                            asLink
                            icon={<IconReactNative />}
                            iconClassName="size-8 relative -top-px"
                            size="xl"
                            className="!text-xl mr-1"
                            to="/docs/libraries/react-native"
                            state={{
                                newWindow: true,
                            }}
                        >
                            <span>React Native</span>
                        </OSButton>
                        <OSButton
                            asLink
                            icon={<IconFlutter />}
                            iconClassName="size-8 relative -top-px"
                            size="xl"
                            className="!text-xl mr-1"
                            to="/docs/libraries/flutter"
                            state={{
                                newWindow: true,
                            }}
                        >
                            <span>Flutter</span>
                        </OSButton>
                    </fieldset>
                    <p className="">
                        *Mobile and cross-platform libraries available as an{' '}
                        <Link to="/addons" state={{ newWindow: true }}>
                            add-on
                        </Link>
                        .
                    </p>
                </div>
            ),
        },
        {
            title: 'More features',
            headline: 'More features',
            features: [
                {
                    title: 'Canvas recording',
                    description:
                        'Capture canvas elements from your application. It works in both 2D and WebGL environments.',
                },
                {
                    title: 'Filter by event',
                    description: 'Limit to recordings where users performed a specific event or action',
                },
                {
                    title: 'Filter by people',
                    description:
                        'Use person properties (like country, custom property, or even email address) to quickly find relevant recordings',
                },
                {
                    title: 'Saved filters',
                    description: 'Find important recordings faster with saved filters',
                },
                {
                    title: 'Collections',
                    description:
                        'Create a dynamic playlist of sessions to watch based on visitor activity, user properties, or cohort',
                },
                {
                    title: 'Block sensitive data',
                    description:
                        'Limit the data you capture from the DOM with HTML attributes or a customizable config within the PostHog app',
                },
                {
                    title: 'Share & embed',
                    description: 'Share recordings directly by URL or embed via iframe',
                },
                {
                    title: 'Minimum duration filter',
                    description: 'Only record sessions longer than a specified duration',
                },
                {
                    title: 'Sample recorded sessions',
                    description:
                        'Restrict the percentage of sessions that will be recorded to reduce data collection or cost',
                },
            ],
        },
    ],
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
            {
                name: 'Matomo',
                key: 'matomo',
                link: '/blog/posthog-vs-matomo',
            },
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
                name: 'PostHog',
                key: 'posthog',
            },
        ],
        features: [
            {
                feature: 'AI summaries',
                companies: {
                    hotjar: true,
                    logrocket: true,
                    matomo: false,
                    fullstory: true,
                    clarity: true,
                    posthog: 'In alpha',
                },
            },
            {
                feature: 'Single-page app support',
                companies: {
                    hotjar: true,
                    logrocket: true,
                    matomo: true,
                    fullstory: true,
                    clarity: true,
                    posthog: true,
                },
            },
            {
                feature: 'iOS recordings',
                companies: {
                    hotjar: false,
                    logrocket: true,
                    matomo: false,
                    fullstory: true,
                    clarity: true,
                    posthog: true,
                },
            },
            {
                feature: 'Android recordings',
                companies: {
                    hotjar: false,
                    logrocket: true,
                    matomo: false,
                    fullstory: true,
                    clarity: true,
                    posthog: true,
                },
            },
            {
                feature: 'React Native recordings',
                companies: {
                    hotjar: false,
                    logrocket: true,
                    matomo: false,
                    fullstory: false,
                    clarity: true,
                    posthog: true,
                },
            },
            {
                feature: 'Flutter recordings',
                companies: {
                    hotjar: false,
                    logrocket: false,
                    matomo: false,
                    fullstory: false,
                    clarity: true,
                    posthog: true,
                },
            },
            {
                feature: 'Identity detection',
                companies: {
                    hotjar: false,
                    logrocket: true,
                    matomo: true,
                    fullstory: true,
                    clarity: true,
                    posthog: true,
                },
            },
            {
                feature: 'Target recordings by URL',
                companies: {
                    hotjar: true,
                    logrocket: true,
                    matomo: true,
                    fullstory: true,
                    clarity: true,
                    posthog: true,
                },
            },
            {
                feature: 'Target by sample size',
                companies: {
                    hotjar: true,
                    logrocket: false,
                    matomo: true,
                    fullstory: false,
                    clarity: true,
                    posthog: true,
                },
            },
            {
                feature: 'Filter recordings by user or event',
                companies: {
                    hotjar: true,
                    logrocket: true,
                    matomo: true,
                    fullstory: true,
                    clarity: true,
                    posthog: true,
                },
            },
            {
                feature: 'Search by network request',
                companies: {
                    hotjar: true,
                    logrocket: true,
                    matomo: true,
                    // fullstory: true,
                    clarity: false,
                    posthog: false,
                },
            },
            {
                feature: 'Rage-click detection',
                companies: {
                    hotjar: true,
                    logrocket: true,
                    matomo: false,
                    fullstory: true,
                    clarity: true,
                    posthog: true,
                },
            },
            {
                feature: 'Privacy masking for sensitive content',
                companies: {
                    hotjar: true,
                    logrocket: true,
                    matomo: true,
                    fullstory: true,
                    clarity: true,
                    posthog: true,
                },
            },
            {
                feature: 'Export recordings to JSON',
                companies: {
                    hotjar: true,
                    logrocket: false,
                    matomo: true,
                    fullstory: true,
                    clarity: false,
                    posthog: true,
                },
            },
            {
                feature: 'Export recordings to video',
                companies: {
                    hotjar: false,
                    logrocket: false,
                    matomo: false,
                    fullstory: false,
                    clarity: false,
                    posthog: 'Beta',
                },
            },
            {
                feature: 'Recording retention policy',
                companies: {
                    hotjar: '12 months',
                    logrocket: '1 month',
                    matomo: '24 months',
                    fullstory: '1 month',
                    clarity: '30 days',
                    posthog: 'Up to 3 months',
                },
            },
        ],
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
    presenterNotes: {
        overview:
            "<strong>Presenter notes:</strong> Session Replay lets you see exactly how users interact with your app. You're watching their real session – what they clicked, where they got stuck, what broke. This isn't just for debugging; it's for building empathy. You can see what's intuitive and what isn't, and how it feels to actually use your product. It's often the fastest way to uncover small issues that analytics alone won't catch. Everything is captured automatically—no manual tagging needed.",
        customers:
            "Companies like Hasura, Netdata, and ElevenLabs are already using it to make real improvements. Hasura saw a measurable bump in conversion once they started watching user sessions. Netdata uses it to cut down on back-and-forth with their support team. And ElevenLabs watches replays while testing new ideas to quickly figure out what's working. This is the kind of feedback loop that helps teams move faster without relying only on instinct.",
        features:
            "<strong>Event timeline:</strong> The timeline brings together everything from DOM load timing and API calls to console logs and user actions. It gives you full visibility into what happened, when it happened, and what else was going on at the time. You're not flipping between separate tools to reconstruct a bug. It's one unified view, scoped to the exact user session. For teams who care about real- world performance, this is a fast way to correlate frontend behavior with actual user impact. <br /><br /><strong>Console logs:</strong>  One of the most useful parts of replay is being able to see console logs alongside the session. You get full visibility into warnings and errors as they happen. If you're using Sentry, those errors are linked—so you can jump from an exception to a full session replay showing exactly how the error occurred. This shortens the loop between support, product, and engineering. You're not asking users what browser they were using or what they clicked. You just watch it. <br /><br /><strong>Network monitor:</strong> Network requests are captured as part of the session and shown with timing, method, and status code. You can see how slow requests affected load time, whether a backend error disrupted the experience, or which endpoints were called at each step. It's especially helpful when tracking down flakiness that only happens in edge cases or under real - world latency. <br /><br /><strong>Autocapture:</strong> PostHog automatically tracks clicks, form interactions, page views, and other key events without requiring manual instrumentation. You can get up and running quickly and still have meaningful data to explore. When you need more control, you can layer in custom events or define your own capture rules. The point is: you don't have to do everything upfront to start getting value. <br /><br /><strong>Capture form inputs:</strong> Form input capture is turned off by default, but you can opt in to capture specific fields—useful when diagnosing friction in onboarding flows or payment forms. It's granular, so you're not logging everything—only what's needed. And since it integrates with our privacy masking features, sensitive fields can be excluded with a simple config update. <br /><br /><strong>DOM explorer:</strong> During a replay, you can inspect the live DOM snapshot at any point in the session. This helps validate that what the user saw matches your expectations, especially in dynamic apps where the UI may shift based on state or timing. It's helpful for spotting layout shifts, broken styles, or elements that weren't visible when they should've been. <br /><br /><strong>Record by feature flag:</strong> You can choose to only record sessions from users who have a specific feature flag enabled. This is useful for rollout testing, debugging experiments, or validating behavior changes in staging versus production environments. It gives your team a way to focus on just the relevant slice of users without recording everyone. <br /><br /><strong>Supported platforms:</strong> Session replay works across web, iOS, Android, React Native, and Flutter. And we don't treat mobile support as an afterthought—it includes gesture tracking, scrolls, taps, and replay stability that's ready for production. All SDKs are open source, and setup is consistent across environments. This means you can build a single mental model that works whether your app is on the web or mobile. <br /><br /><strong>More features:</strong> <br /><br /><strong>Filter by event:</strong> Narrow down recordings to sessions where specific events or actions were triggered. This is helpful for tracking down bugs related to a new feature or analyzing how people interact with a particular UI element. <br /><br /><strong>Filter by people:</strong> Filter sessions by person properties—country, browser, custom property, even specific users. This becomes really useful when debugging reports from a single customer or testing behavior across user segments. <br /><br /><strong>Block sensitive data:</strong> Sensitive data capture is opt -in and customizable. You can redact fields using simple HTML attributes or define masking rules at the app level. This is especially useful in production environments where you want to balance visibility with privacy. <br /><br /><strong>Minimum duration filter:</strong> You can ignore very short sessions—like bounces or accidental visits—by setting a minimum duration threshold. This keeps your recordings useful and your volume under control. <br /><br /><strong>Sample recorded sessions:</strong> Reduce the percentage of sessions being recorded without losing signal. This is one of the most effective ways to manage costs while still catching meaningful patterns. <br /><br /><strong>Share & embed:</strong> You can share a replay via URL or embed it directly into a support ticket, Slack thread, or internal dashboard.This makes collaboration between support and engineering much faster—especially when you're working across time zones.",
        answers:
            "Funnels are great for showing you <em>where</em> users drop off, but not <em>why</em>. That's where session replay helps. You can jump straight from a funnel drop-off to a real session recording from one of those users. No assumptions—just facts. We also let you filter sessions by the events that matter to your funnel, so you're not digging through noise. It's a good way to stop over-optimizing things that aren't actually causing problems and focus on what is.",
        pricing:
            "You get 5,000 recordings per month for free – this is <em>significantly</em> more than other replay products. After that, it's metered by usage. No lock-ins, no guessing what tier you need. You pay only for what you record. The more you use, the cheaper it gets. And unlike some other tools, you're not paying for seats or stuck in an enterprise contract just to unlock basic features. This lets both small teams and large ones get the same level of insight, with pricing that's scalable. And you can also control which sessions you want to keep costs down and set billing limits so you never end up with a surprise bill.<br /><br />There's also that time <a href='/blog/session-replay-pricing'>we reduced pricing for everyone across the board</a>, and we're planning on doing it again soon.",
        'comparison-summary':
            "<strong>TL;DR:</strong> If you want a replay product that deeply integrates with other analytics tools, use PostHog. We're always shipping code to get to feature parity with any competing product, so even if we don't have what you need yet, there's a good chance we'll have it soon. Plus you can follow along with this product's roadmap and see what the Replay Team is shipping next.",
        'feature-comparison':
            "We don't have it all (yet) but we're working on it. We hope this comparison chart adds some Clarity for you.",
        docs: "We put a lot of effort into our documentation because we know that for most teams, this is your first real experience using PostHog. And we don't outsource it. The people writing the docs are the same engineers building the product. That means what you're reading is usually up to date, technically accurate, and written by someone who knows what it's like to implement this stuff in production.<br /><br />We treat the docs like a product of their own. Our team actively monitors GitHub issues, community Slack, forums, and feedback that comes through the site. So if something's unclear, we try to fix it quickly.<br /><br />We also understand that getting things configured properly is only part of the job. If your team is concerned about session replay costs, sampling strategy, just reach out – we're happy to suggest optimizations and help you get the right setup for your use case, even if it means we make less money. We want you to get the most out of PostHog without surprises.",
        'pairs-with':
            "One big difference with PostHog is that replay isn't bolted on. It's part of the full product suite. That means it connects directly to analytics, feature flags, experiments, and surveys. If you're running an A/B test and a user drops out, you can jump into their replay and see why. Or you can filter recordings by flag variant. You're not exporting data between tools – it's already connected. That makes it easier to find patterns and actually act on them.<br /><br />Of course, we integrate with third-party tools and data warehouses too – but if you you're not using them, you have everything you need right inside PostHog.",
        'getting-started':
            "So to sum up, Session Replay gives you the context behind your metrics. It's not trying to replace your charts – it's there to make them actionable. If a number looks off, you can dig in and see what happened. (It's also <em>extremely valuable</em> in a support context where you're trying to understand what went wrong for a specific customer.) And because it's part of a single platform, it fits into your workflow instead of adding another tool to maintain. It's flexible, it scales, and it gives you real visibility without having to guess what your users were doing.",
    },
}
