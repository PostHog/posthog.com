import React from 'react'
import {
    IconMessage,
    IconApps,
    IconTarget,
    IconBrowser,
    IconDecisionTree,
    IconExternal,
    IconCode,
    IconPhone,
    IconPeople,
    IconPlug,
} from '@posthog/icons'
import { IconJavaScript, IconApple, IconReactNative, IconFlutter } from 'components/OSIcons'
import OSButton from 'components/OSButton'
import Link from 'components/Link'
import MCPInstall from 'components/Products/MCPInstall'

export const features = {
    question_types: {
        title: 'Question types',
        headline: 'Question types',
        description: 'Multiple choice, multi-select, numerical rating, emoji reaction, embedded links',
        icon: <IconMessage />,
        color: 'salmon',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/Surveys/images/question-types.png',
                alt: 'Question types',
            },
        ],
    },
    templates: {
        title: 'Templates',
        headline: 'Templates',
        description: 'Choose from the library or start from scratch',
        icon: <IconApps />,
        color: 'blue',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/Surveys/images/templates.png',
                alt: 'Templates',
                stylize: true,
            },
        ],
    },
    display_conditions: {
        title: 'Display conditions',
        headline: 'Display conditions',
        description:
            'Display surveys based on URL, person property, or feature flag when used with Feature Flags. You can also trigger a survey to open when an event occurs – either every time the event is sent or just once.',
        icon: <IconTarget />,
        color: 'yellow',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_05_27_at_11_31_42_2x_98d85d5b3f.jpg',
                srcDark:
                    'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_05_27_at_11_30_53_2x_03ab445fae.jpg',
                alt: 'Display conditions',
                stylize: true,
                shadow: true,
            },
        ],
    },
    presentation_options: {
        title: 'Presentation options',
        headline: 'Presentation options',
        description:
            'Surveys can be displayed in your app as a popover (like one that sits in the bottom corner of the screen) or a feedback button. You can also get a shareable URL for a hosted survey or create a completely custom experience using the API.',
        icon: <IconBrowser />,
        color: 'purple',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_08_04_at_11_38_32_2x_87293a9164.jpg',
                srcDark:
                    'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_08_04_at_11_38_19_2x_13141dad74.jpg',
                alt: 'Presentation options',
                stylize: true,
                shadow: true,
            },
        ],
    },
    multi_step: {
        title: 'Multi-step surveys',
        headline: 'Multi-step surveys',
        description: (
            <>
                Define the next step based on the response received for <em>single choice</em> and <em>rating</em>{' '}
                questions.
            </>
        ),
        icon: <IconDecisionTree />,
        color: 'orange',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/surveys_branching_singlechoice_8053dd1700.png',
                srcDark:
                    'https://res.cloudinary.com/dmukukwp6/image/upload/surveys_branching_singlechoice_dark_0ec63f974a.png',
                alt: 'Multi-step surveys',
                stylize: true,
                shadow: true,
            },
        ],
    },
    link_somewhere: {
        title: 'Link somewhere',
        headline: 'Link somewhere',
        description: 'Send users to a webpage or invite them to book a meeting with a calendar invite',
        icon: <IconExternal />,
        color: 'seagreen',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/Surveys/images/link-scheduler.png',
                alt: 'Link somewhere',
            },
        ],
    },
    no_code_api: {
        title: 'No-code and API',
        headline: 'No-code? Yes. API? Also yes.',
        description:
            'Using PostHog.js? No more code required. But want to create your own UI? Check out the Surveys API.',
        icon: <IconCode />,
        color: 'blue',
        images: [
            {
                src: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/Surveys/images/api.png',
                alt: 'No-code and API',
                stylize: true,
                shadow: true,
            },
        ],
    },
    supported_platforms: {
        title: 'Supported platforms',
        headline: 'Supported platforms',
        description: 'Survey users across web and mobile..',
        icon: <IconPhone />,
        color: 'salmon',
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
                        to="/docs/surveys/installation/web"
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
                        icon={<IconApple />}
                        iconClassName="size-8 relative -top-px"
                        size="xl"
                        className="!text-xl mr-1"
                        to="/docs/surveys/installation/ios"
                        state={{
                            newWindow: true,
                        }}
                    >
                        <span>iOS</span>
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
                        to="/docs/surveys/installation/react-native"
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
                        to="/docs/surveys/installation/flutter"
                        state={{
                            newWindow: true,
                        }}
                    >
                        <span>Flutter</span>
                    </OSButton>
                </fieldset>
            </div>
        ),
    },
    more_features: {
        title: 'More features',
        headline: 'More features',
        icon: <IconPeople />,
        color: 'blue',
        features: [
            {
                title: 'Hosted surveys',
                description:
                    'Get a shareable URL to a survey that you can send directly to your users or embed in your website using an iframe',
            },
            {
                title: 'Capture partial responses',
                description:
                    'Log responses to individual questions as they are received, rather than waiting for the survey to complete',
            },
            {
                title: 'Completion conditions',
                description: 'Configure the survey to repeat on a schedule or when the display conditions are met',
            },
            {
                title: 'Customizable wait periods',
                description: 'Set a delay before a survey opens',
            },
            {
                title: 'Aggregated results',
                description: 'See feedback summarized and broken down per response',
            },
            {
                title: 'Send responses to Slack',
                description: 'Send realtime survey responses to a Slack channel',
            },
            {
                title: 'Send responses to CDP destinations',
                description: (
                    <>
                        {'Browse our '}
                        <Link to="/cdp?type=destination" state={{ newWindow: true }}>
                            {'destination library'}
                        </Link>
                        {' to explore the possibilities'}
                    </>
                ),
            },
        ],
    },
    mcp: {
        title: 'MCP',
        headline: 'Manage surveys from your editor',
        description:
            'Create, update, and analyze surveys from Cursor, Claude Code, VS Code, or any MCP-compatible agent.',
        icon: <IconPlug />,
        color: 'salmon',
        features: [
            {
                title: 'Create surveys',
                description: 'Spin up a new in-app survey without switching to the PostHog UI.',
            },
            {
                title: 'Check survey performance',
                description: 'Pull response rates, completion stats, and results for any survey.',
            },
            {
                title: 'Iterate on live surveys',
                description: 'Update questions, targeting, or appearance of surveys without leaving your editor.',
            },
            {
                title: 'Global stats',
                description: 'Get all surveys in the project, view aggregated response statistics, or apply filters.',
            },
        ],
        children: <MCPInstall />,
    },
}
