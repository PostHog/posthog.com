import React from 'react'
import {
    IconDatabase,
    IconWarning,
    IconFlask,
    IconGraph,
    IconMessage,
    IconRewindPlay,
    IconToggle,
    IconFunnels,
    IconTrends,
    IconLifecycle,
    IconUserPaths,
    IconCorrelationAnalysis,
    IconRetention,
    IconStickiness,
    IconDashboard,
    IconHogQL,
    IconGanttChart,
} from '@posthog/icons'
import { IconJavaScript, IconApple, IconAndroid, IconFlutter, IconReactNative } from 'components/OSIcons/Icons'
import { allProductsData } from 'components/Pricing/Pricing'
import { calculatePrice } from 'components/Pricing/PricingSlider/pricingSliderLogic'
import { FIFTY_MILLION, MAX_PRODUCT_ANALYTICS, MILLION, TEN_MILLION } from 'components/Pricing/pricingLogic'
import { useStaticQuery, graphql } from 'gatsby'
import { useMemo, useState } from 'react'
import OSButton from 'components/OSButton'
import Link from 'components/Link'
import CodeBlock from 'components/Home/CodeBlock'
import CloudinaryImage from 'components/CloudinaryImage'

function SnippetRenderer() {
    const data = useStaticQuery(graphql`
        {
            mdx(slug: { eq: "docs/integrate/snippet" }) {
                rawBody
            }
        }
    `)

    if (!data?.mdx?.rawBody) {
        return null
    }

    // Extract the code from the markdown (removing the ```html and ``` markers)
    const rawContent = data.mdx.rawBody
    const codeMatch = rawContent.match(/```html\n([\s\S]*?)\n```/)
    const snippetCode = codeMatch ? codeMatch[1] : rawContent

    return (
        <div className="max-w-4xl mx-auto overflow-x-auto overflow-y-hidden">
            <CodeBlock code={snippetCode} language="html" hideNumbers={false} lineNumberStart={1} tooltips={[]} />
        </div>
    )
}

const initialProducts = [
    {
        Icon: IconGraph,
        name: 'Analytics',
        type: 'product_analytics',
        color: 'blue',
        slider: {
            marks: [0, MILLION, TEN_MILLION, FIFTY_MILLION, MAX_PRODUCT_ANALYTICS],
            min: 0,
            max: MAX_PRODUCT_ANALYTICS,
        },
        sharesFreeTier: 'web_analytics',
        worksWith: ['session_replay', 'feature_flags', 'surveys'],
        slug: '/product-analytics',
        customers: {
            ycombinator: {
                headline: 'gathers 30% more data than with Google Analytics',
                description: 'We could autocapture... events using the JS snippet and... configure custom events.',
            },
            hasura: {
                headline: 'improved conversion rates by 10-20%',
                description: 'we observed drop-offs at very particular stages of our onboarding flow.',
            },
            contra: {
                headline: 'increased registrations by 30%',
                description: 'From [funnels], we could easily jump to session replays to see the drop-off point.',
            },
            speakeasy: {
                headline: 'manages features and developer relations',
                description: '...top-to-bottom view of conversion rates and user paths, without... extra setup time.',
            },
        },
        features: [
            {
                title: 'Funnels',
                headline: 'Find drop-off across a series of actions',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Products/Slider/images/funnel-basic.png',
                        alt: 'Basic funnel visualization',
                    },
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Products/Slider/images/funnel-grouped.png',
                        alt: 'Grouped funnel visualization',
                    },
                ],
                features: [
                    {
                        title: 'Filtering',
                        description:
                            'Set filters for individual steps – or the entire funnel – by person property, group or cohort, or event property',
                    },
                    {
                        title: 'Graph types',
                        description:
                            "Track user progression between steps, conversion time between each step, and how a funnel's conversion rate changes over time",
                    },
                    {
                        title: 'Step ordering',
                        description:
                            'Choose between a sequential series of steps, a strict order, or any order of steps that lead to conversion',
                    },
                    {
                        title: 'Granular controls',
                        description:
                            'Set conversion window limit, add exclusionary steps, set attribution type, and see the relative conversion rate between each step',
                    },
                ],
                icon: <IconFunnels />,
                color: 'blue',
            },
            {
                title: 'Graph & trends',
                headline: 'Visualize user data with graphs, tables, charts, maps, and more',
                icon: <IconTrends />,
                color: 'yellow',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/ProductAnalytics/images/screenshot-trend-bar.png',
                        alt: 'Trend bar visualization',
                    },
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/ProductAnalytics/images/screenshot-trend-multiple-sparklines.png',
                        alt: 'Multiple sparklines visualization',
                    },
                ],
                features: [
                    {
                        title: 'Trends',
                        description:
                            'Plot any event over time, such as a feature being used. You can even do math and multiple series.',
                    },
                    {
                        title: 'Advanced filtering',
                        description:
                            'Apply however many filters you need to or breakdown by any event, user or group property with advanced logic.',
                    },
                    {
                        title: 'Breakout tables',
                        description: 'Break out your trends by any event property.',
                    },
                    {
                        title: 'Sampling',
                        description: 'Speed up long running queries across large datasets in one click.',
                    },
                ],
            },
            {
                title: 'Lifecycle',
                headline: 'Track user engagement patterns over time',
                description:
                    'Discover how your active users break down, highlighting those who have recently stopped being active or those who have just become active for the first time.',
                icon: <IconLifecycle />,
                color: 'purple',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/ProductAnalytics/images/screenshot-lifecycle.png',
                        alt: 'Lifecycle visualization',
                    },
                ],
                features: [
                    {
                        title: 'User categories',
                        description:
                            'Track new, returning, resurrecting, and dormant users to understand engagement patterns',
                    },
                    {
                        title: 'Time-based analysis',
                        description:
                            "Configure intervals (hour, day, week, month) to match your product's natural usage patterns",
                    },
                    {
                        title: 'Detailed breakdowns',
                        description:
                            'View individual users in each category and analyze their behavior through session recordings',
                    },
                    {
                        title: 'Integration',
                        description:
                            'Works with cohorts, feature flags, and other PostHog features for comprehensive analysis',
                    },
                ],
            },
            {
                title: 'User Paths',
                headline: 'Understand user navigation patterns',
                description:
                    "Track how users navigate through your product, identify where they get stuck, and discover why they aren't finding new features.",
                icon: <IconUserPaths />,
                color: 'green',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/user-guides/paths/example-light-mode.png',
                        alt: 'User paths visualization',
                    },
                ],
                features: [
                    {
                        title: 'Path visualization',
                        description: 'See the most common paths users take through your product',
                    },
                    {
                        title: 'Drop-off analysis',
                        description: 'Identify where users are getting stuck or abandoning their journey',
                    },
                    {
                        title: 'Session recordings',
                        description: 'View recordings of user sessions to understand their behavior',
                    },
                    {
                        title: 'Cohort creation',
                        description: 'Create cohorts of users who follow specific paths for further analysis',
                    },
                ],
            },
            {
                title: 'Correlation Analysis',
                headline: 'Discover factors affecting conversion',
                description:
                    'Automatically identify significant factors that impact user behavior and conversion rates.',
                icon: <IconCorrelationAnalysis />,
                color: 'red',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1716387676/posthog.com/contents/Screenshot_2024-05-22_at_3.20.17_PM.png',
                        alt: 'Correlation analysis visualization',
                    },
                ],
                features: [
                    {
                        title: 'Automatic detection',
                        description: 'Automatically highlight significant factors affecting conversion',
                    },
                    {
                        title: 'Property analysis',
                        description: 'Analyze how different user properties impact behavior',
                    },
                    {
                        title: 'Event correlation',
                        description: 'Discover which events are most strongly correlated with success',
                    },
                    {
                        title: 'Cohort creation',
                        description: 'Create cohorts based on correlation analysis results',
                    },
                ],
            },
            {
                title: 'Retention',
                headline: 'Track user return rates',
                description:
                    'Measure how many users come back to your product over time and compare retention between different user segments.',
                icon: <IconRetention />,
                color: 'blue',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/retention_light_805120c74c.png',
                        alt: 'Retention visualization',
                    },
                ],
                features: [
                    {
                        title: 'Cohort analysis',
                        description: 'Compare retention rates between different user cohorts',
                    },
                    {
                        title: 'Time-based tracking',
                        description: 'Track retention over hours, days, weeks, or months',
                    },
                    {
                        title: 'First-time vs recurring',
                        description: 'Analyze both first-time and recurring user retention',
                    },
                    {
                        title: 'Detailed breakdowns',
                        description: 'Break down retention by user properties and segments',
                    },
                ],
            },
            {
                title: 'Stickiness',
                headline: 'Measure user engagement depth',
                description:
                    'Track how frequently users engage with your product and identify your most engaged users.',
                icon: <IconStickiness />,
                color: 'yellow',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1716289464/posthog.com/contents/stickiness-light.png',
                        alt: 'Stickiness visualization',
                    },
                ],
                features: [
                    {
                        title: 'Engagement frequency',
                        description: 'Track how many times users perform specific actions',
                    },
                    {
                        title: 'User segmentation',
                        description: 'Identify your most engaged users and their characteristics',
                    },
                    {
                        title: 'Feature analysis',
                        description: 'Determine which features drive the most engagement',
                    },
                    {
                        title: 'Time-based analysis',
                        description: 'Analyze engagement patterns over different time periods',
                    },
                ],
            },
            {
                title: 'Dashboards',
                headline: 'Create custom analytics dashboards',
                description: 'Build and customize dashboards to monitor key metrics and share insights with your team.',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/web_analytics_top_light_mode_2024_10_be53cf5325.png',
                        alt: 'Dashboard visualization',
                    },
                ],
                features: [
                    {
                        title: 'Custom layouts',
                        description: 'Arrange insights in custom layouts to tell your data story',
                    },
                    {
                        title: 'Real-time updates',
                        description: 'See your metrics update in real-time as new data comes in',
                    },
                    {
                        title: 'Sharing',
                        description: 'Share dashboards with team members and stakeholders',
                    },
                    {
                        title: 'Templates',
                        description: 'Use pre-built templates for common analytics needs',
                    },
                ],
            },
            {
                title: 'SQL',
                headline: 'Write custom SQL queries',
                description:
                    'Create custom insights using SQL to analyze your data in ways that go beyond standard insights.',
                icon: <IconHogQL />,
                color: 'purple',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/ProductAnalytics/images/screenshot-sql.png',
                        alt: 'SQL query visualization',
                    },
                ],
                features: [
                    {
                        title: 'Custom queries',
                        description: 'Write SQL queries to analyze your data in any way you need',
                    },
                    {
                        title: 'Advanced analysis',
                        description: 'Perform complex calculations and data transformations',
                    },
                    {
                        title: 'Data export',
                        description: 'Export query results for further analysis',
                    },
                    {
                        title: 'Query templates',
                        description: 'Save and reuse common queries',
                    },
                ],
            },
        ],
    },
    {
        Icon: IconRewindPlay,
        name: 'Session replay',
        type: 'session_replay',
        title: 'Watch people use your product',
        description:
            'Play back sessions to diagnose UI issues, improve support, and get context on nuanced user behavior in your product, website, or mobile app.',
        answersDescription: 'Understand user behavior, identify friction points, and improve your product experience',
        color: 'yellow',
        screenshots: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/replay_screenshot_de8cb3a4ed.jpg',
                alt: 'Session replay screenshot',
            },
        ],
        hog: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/replay_hog_20fc000c14.png',
            alt: 'A hedgehog watching some session recordings',
        },
        slider: {
            marks: [5000, 25000, 120000, 500000],
            min: 5000,
            max: 500000,
        },
        volume: 5000,
        slug: '/session-replay',
        customers: {
            hasura: {
                headline: 'improved conversion rates by 10-20%',
                description: "We wouldn't have noticed that needed fixing without PostHog's session replays.",
            },
            elevenlabs: {
                headline: 'uses replays and surveys when testing ideas',
                description:
                    'We watch lots of replays when testing a feature, and love how easy it is to launch surveys',
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

                // features: [
                //     {
                //         title: 'Filtering',
                //         description:
                //             'Set filters for individual steps – or the entire funnel – by person property, group or cohort, or event property',
                //     },
                //     {
                //         title: 'Graph types',
                //         description:
                //             "Track user progression between steps, conversion time between each step, and how a funnel's conversion rate changes over time",
                //     },
                //     {
                //         title: 'Step ordering',
                //         description:
                //             'Choose between a sequential series of steps, a strict order, or any order of steps that lead to conversion',
                //     },
                //     {
                //         title: 'Granular controls',
                //         description:
                //             'Set conversion window limit, add exclusionary steps, set attribution type, and see the relative conversion rate between each step',
                //     },
                // ],
            },
            {
                title: 'Console logs',
                headline: 'Console logs',
                children: (
                    <>
                        <p className="leading-tight">
                            Console logs are useful for debugging and can be enabled by passing{' '}
                            <code>enable_recording_console_logs: true</code> or in your project's settings.
                        </p>
                        <div className="flex lg:flex-row lg:gap-x-6 flex-col">
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
                title: 'Capture form inputs',
                headline: 'Capture form inputs',
                description:
                    "Capture sessions without extra code. If you're already using PostHog.js for analytics, there's nothing else to install.",
                children: (
                    <>
                        <p className="leading-tight">
                            <code>input</code> fields are masked by default. But if you'd like to see what users are
                            typing into a form, set <code>maskAllInputs</code> to <code>false</code>. (Password fields
                            will still remain masked.)
                        </p>
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
                    'Inspect the DOM as it was at this moment in the session. Analyze the structure and elements captured during the recording.',
                images: [
                    {
                        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/SessionReplay/images/network.png',
                        alt: 'DOM explorer',
                    },
                ],
            },
            {
                title: 'Record by feature flag',
                headline: 'Record by feature flag',
                description:
                    "If you don't want to record all user sessions, you can choose to only enable it when a user is opted in to a feature flag. You can also use feature flags to record only a specific volume of randomized traffic.",
                children: (
                    <div>
                        <h4 className="text-lg">Your code</h4>
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
                                variant="ghost"
                                icon={<IconJavaScript className="size-8" />}
                                size="xl"
                                className="!text-xl text-primary font-semibold"
                                to="/docs/libraries/js"
                                state={{
                                    newWindow: true,
                                }}
                            >
                                <span>JavaScript</span>
                            </OSButton>
                        </fieldset>
                        <fieldset className="bg-primary">
                            <legend className="text-lg font-semibold">Mobile</legend>
                            <OSButton
                                asLink
                                variant="ghost"
                                icon={<IconApple className="size-8" />}
                                size="xl"
                                className="!text-xl text-primary font-semibold"
                                to="/docs/libraries/ios"
                                state={{
                                    newWindow: true,
                                }}
                            >
                                <span>iOS</span>
                            </OSButton>
                            <OSButton
                                asLink
                                variant="ghost"
                                icon={<IconAndroid className="size-8" />}
                                size="xl"
                                className="!text-xl text-primary font-semibold"
                                to="/docs/libraries/android"
                                state={{
                                    newWindow: true,
                                }}
                            >
                                <span>Android</span>
                            </OSButton>
                        </fieldset>
                        <fieldset className="bg-primary">
                            <legend className="text-lg font-semibold">Cross-platform</legend>
                            <OSButton
                                asLink
                                variant="ghost"
                                icon={<IconReactNative className="size-8" />}
                                size="xl"
                                className="!text-xl text-primary font-semibold"
                                to="/docs/libraries/ios"
                                state={{
                                    newWindow: true,
                                }}
                            >
                                <span>React Native</span>
                            </OSButton>
                            <OSButton
                                asLink
                                variant="ghost"
                                icon={<IconFlutter className="size-8" />}
                                size="xl"
                                className="!text-xl text-primary font-semibold"
                                to="/docs/libraries/android"
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
                        title: 'Filter by event',
                        description: 'Filter by events to quickly find relevant recordings',
                    },
                    {
                        title: 'Filter by people',
                        description: 'Filter by person properties to quickly find relevant recordings',
                    },
                    {
                        title: 'Block sensitive data',
                        description:
                            'Disable capturing data from any DOM element with HTML attributes or a customizable config',
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
                        description: 'Restrict the percentage of sessions that will be recorded',
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
                question: 'What is a user’s First Contentful Paint time',
                url: '/tutorials/performance-metrics#1-first-contentful-paint',
            },
            {
                question: 'What is a user’s Dom Interactive time',
                url: '/tutorials/performance-metrics#2-dom-interactive',
            },
            { question: 'What is a user’s Page Loaded time', url: '/tutorials/performance-metrics#3-page-loaded' },
            {
                question: 'How do I optimize site performance?',
                url: '/tutorials/performance-metrics#optimization-cheat-sheet',
            },
            {
                question: 'How can I improve customer support with screen recordings?',
                url: '/tutorials/session-recordings-for-support',
            },
        ],
        comparison: {
            summary: {
                them: [
                    {
                        title: 'Error tracking',
                        subtitle: 'In progress!',
                        subtitleUrl: 'https://github.com/PostHog/posthog/issues/23400',
                    },
                    {
                        title: 'Alerting',
                        subtitle: 'In progress!',
                        subtitleUrl: 'https://github.com/PostHog/posthog/issues/14331',
                    },
                ],
                us: [
                    {
                        title: 'Interlinking with feature flags and insights',
                        subtitle: 'Jump between them easily',
                    },
                    {
                        title: 'Collaboration, sharing, and embedding exporting recordings',
                    },
                    {
                        title: 'No limits on how many recordings captured',
                    },
                ],
            },
            features: [
                {
                    feature: 'Single-page app support',
                    companies: {
                        Hotjar: true,
                        LogRocket: true,
                        Matomo: true,
                        FullStory: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'iOS recordings',
                    companies: {
                        Hotjar: false,
                        LogRocket: true,
                        Matomo: false,
                        FullStory: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Android recordings',
                    companies: {
                        Hotjar: false,
                        LogRocket: true,
                        Matomo: false,
                        FullStory: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'React Native recordings',
                    companies: {
                        Hotjar: false,
                        LogRocket: true,
                        Matomo: false,
                        FullStory: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Flutter recordings',
                    companies: {
                        Hotjar: false,
                        LogRocket: false,
                        Matomo: false,
                        FullStory: false,
                        PostHog: '<a href="https://github.com/PostHog/posthog-flutter/issues/69">In beta</a>',
                    },
                },
                {
                    feature: 'Identity detection',
                    companies: {
                        Hotjar: false,
                        LogRocket: true,
                        Matomo: true,
                        FullStory: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Target recordings by URL',
                    companies: {
                        Hotjar: true,
                        LogRocket: true,
                        Matomo: true,
                        FullStory: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Target by sample size',
                    companies: {
                        Hotjar: true,
                        LogRocket: false,
                        Matomo: true,
                        FullStory: false,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Filter recordings by user or event',
                    companies: {
                        Hotjar: true,
                        LogRocket: true,
                        Matomo: true,
                        FullStory: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Rage-click detection',
                    companies: {
                        Hotjar: true,
                        LogRocket: true,
                        Matomo: false,
                        FullStory: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Privacy masking for sensitive content',
                    companies: {
                        Hotjar: true,
                        LogRocket: true,
                        Matomo: true,
                        FullStory: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Export recordings',
                    companies: {
                        Hotjar: true,
                        LogRocket: false,
                        Matomo: true,
                        FullStory: true,
                        PostHog: true,
                    },
                },
                {
                    feature: 'Recording retention policy',
                    companies: {
                        Hotjar: '12 months',
                        LogRocket: '1 month',
                        Matomo: '24 months',
                        FullStory: '1 month',
                        PostHog: 'Up to 3 months',
                    },
                },
            ],
        },
        pairsWith: [
            {
                slug: '/product-analytics',
                description: 'Jump into a playlist of session recordings directly from any time series in a graph',
            },
            {
                slug: '/feature-flags',
                description: "See which feature flags are enabled for a user's session",
            },
            {
                slug: '/experiments',
                description:
                    'Generate a playlist of recordings limited to an A/B test or specific group within a multivariate experiment.',
            },
        ],
    },
    {
        Icon: IconToggle,
        name: 'Feature flags',
        type: 'feature_flags',
        color: 'green',
        slider: {
            marks: [1000000, 10000000, 100000000, 1000000000],
            min: 1000000,
            max: 1000000000,
        },
        volume: 1000000,
        slug: '/feature-flags',
    },
    {
        Icon: IconFlask,
        name: 'Experiments',
        type: 'feature_flags',
        color: 'purple',
        billedWith: 'Feature flags',
        slug: '/experiments',
    },
    {
        Icon: IconMessage,
        name: 'Surveys',
        type: 'surveys',
        color: 'red',
        slider: {
            marks: [250, 2000, 15000, 100000],
            min: 250,
            max: 100000,
        },
        volume: 250,
        slug: '/surveys',
    },
    {
        Icon: IconDatabase,
        name: 'Data warehouse',
        type: 'data_warehouse',
        color: 'purple',
        slider: {
            marks: [1000000, 10000000, 100000000, 1000000000],
            min: 1000000,
            max: 1000000000,
        },
        volume: 1000000,
        slug: '/data-warehouse',
    },
    {
        Icon: IconWarning,
        name: 'Error tracking',
        type: 'error_tracking',
        color: 'orange',
        slider: {
            marks: [100000, 1000000, 10000000, 50000000],
            min: 100000,
            max: 50000000,
        },
        volume: 100000,
        slug: '/error-tracking',
    },
]

export default function useProducts() {
    const {
        allProductData: {
            nodes: [{ products: billingProducts }],
        },
    } = useStaticQuery(allProductsData)

    const [products, setProducts] = useState(
        initialProducts.map((product) => {
            const billingData = billingProducts.find((billingProduct: any) => billingProduct.type === product.type)
            const paidPlan = billingData?.plans.find((plan: any) => plan.tiers)
            const startsAt = paidPlan?.tiers?.find((tier: any) => tier.unit_amount_usd !== '0')?.unit_amount_usd
            const freeLimit = paidPlan?.tiers?.find((tier: any) => tier.unit_amount_usd === '0')?.up_to
            const unit = billingData?.unit
            return {
                ...product,
                cost: 0,
                billingData,
                costByTier: calculatePrice(product.volume || 0, paidPlan?.tiers).costByTier,
                freeLimit,
                startsAt: startsAt.length <= 3 ? Number(startsAt).toFixed(2) : startsAt,
                unit,
            }
        })
    )

    const monthlyTotal = useMemo(() => products.reduce((acc, product) => acc + product.cost, 0), [products])

    const setProduct = (type: string, data: any) => {
        setProducts((products) =>
            products.map((product) => {
                if (product.type === type && !product.billedWith) {
                    return {
                        ...product,
                        ...data,
                    }
                }
                return product
            })
        )
    }

    const setVolume = (type: string, volume: number) => {
        const rounded = Math.round(volume)
        const product = products.find((product) => product.type === type)
        const { total, costByTier } = calculatePrice(
            rounded,
            product?.billingData.plans.find((plan: any) => plan.tiers)?.tiers
        )
        setProduct(type, {
            volume: rounded,
            cost: total,
            costByTier,
        })
    }

    return { products, setVolume, setProduct, monthlyTotal }
}
