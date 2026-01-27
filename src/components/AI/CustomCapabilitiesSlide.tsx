import React from 'react'
import Tabs from 'components/RadixUI/Tabs'
import ScrollArea from 'components/RadixUI/ScrollArea'
import CloudinaryImage from 'components/CloudinaryImage'
import { IconMap, IconRewindPlay, IconSearch, IconSparkles } from '@posthog/icons'

const modes = [
    {
        id: 'session-summaries',
        name: 'Session summaries',
        icon: <IconRewindPlay />,
        color: 'blue',
        tagline: 'Computer vision for your product',
        description:
            "Session replay, but make it AI. PostHog AI watches the videos so you don't have to – and actually understands what's happening on screen.",
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/session_summaries_mode_f3d76a34e9.png',
        features: [
            {
                title: 'Reads your UI like a human',
                description:
                    'Extracts not just what the user did, but metadata on labels and events as they appeared on the page.',
            },
            {
                title: 'Find patterns at scale',
                description:
                    'Search sessions, analyze paths, and spot issues across thousands of recordings without watching a single one.',
            },
            {
                title: 'Skip to the good part',
                description:
                    'Get a sizzle reel of user behavior – errors, rage clicks, dead ends – ranked by severity with clips ready to investigate.',
            },
        ],
    },
    {
        id: 'plan-mode',
        name: 'Plan mode',
        icon: <IconMap />,
        color: 'green',
        tagline: 'Think before you act',
        description:
            'Plan mode is for when you want to explore schemas, map out your approach, and plot your next five moves before diving in.',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Plan_mode_3c619089b6.png',
        features: [
            {
                title: 'Explore your data schema',
                description: 'Understand your events, properties, and sample values before building anything.',
            },
            {
                title: 'Search across everything',
                description: 'Find insights, dashboards, cohorts, experiments, flags, notebooks, and more.',
            },
            {
                title: 'Switch modes on the fly',
                description:
                    'Automatically jumps to SQL, session replay, or analytics mode when the plan calls for it.',
            },
        ],
    },
    {
        id: 'research-mode',
        name: 'Research mode',
        icon: <IconSearch />,
        color: 'purple',
        tagline: 'Deep analysis for complex problems',
        description:
            'For when you need a deeper explanation – not just a dashboard. Research mode uses a more powerful model and can spawn multiple agents to tackle different parts of the task.',
        features: [
            {
                title: 'Investigates like a human would',
                description:
                    "Explores events, flags, recordings, and errors in parallel – and throws out theories it can't back with data.",
            },
            {
                title: 'Builds the case as it goes',
                description:
                    'Weak theories get deleted, strong ones get sharper, and new investigation loops spin up if needed.',
            },
            {
                title: 'Tells you what to do next',
                description:
                    'Get a structured report with findings, evidence, and recommendations to move the needle on retention, conversion, or whatever metric matters.',
            },
        ],
    },
]

export default function CustomCapabilitiesSlide(): JSX.Element {
    return (
        <div className="h-full">
            <Tabs.Root
                className="h-full bg-accent text-primary @2xl:flex-row"
                defaultValue={modes[0].id}
                orientation="horizontal"
                size="lg"
            >
                {/* Sidebar navigation */}
                <div
                    data-scheme="secondary"
                    className="w-full @2xl:w-64 @2xl:h-full bg-primary border-b border-primary @2xl:border-b-0"
                >
                    <ScrollArea className="overflow-y-hidden @2xl:overflow-y-auto">
                        <Tabs.List className="flex flex-col" aria-label="Advanced modes">
                            <Tabs.Label>
                                <div className="flex items-center gap-1 mb-2 font-semibold">
                                    <IconSparkles className="size-6" />
                                    <span>Advanced modes</span>
                                </div>
                                <p className="text-sm text-secondary leading-snug mb-1">
                                    PostHog AI auto-switches basic modes based on your query. Activate advanced modes in
                                    the chat for more powerful analysis.
                                </p>
                            </Tabs.Label>
                            <div className="flex @2xl:flex-col @2xl:gap-0.5">
                                {modes.map((mode) => (
                                    <Tabs.Trigger key={mode.id} value={mode.id} icon={mode.icon} color={mode.color}>
                                        {mode.name}
                                    </Tabs.Trigger>
                                ))}
                            </div>
                        </Tabs.List>
                    </ScrollArea>
                </div>

                {/* Content panels */}
                {modes.map((mode) => (
                    <Tabs.Content
                        key={mode.id}
                        value={mode.id}
                        className="flex-1 bg-primary @2xl:border-l border-primary grow outline-none h-full overflow-auto"
                    >
                        <div className="h-full flex flex-col @2xl:flex-row">
                            {/* Left: Text content */}
                            <div className="@2xl:flex-1 p-6 @2xl:p-8">
                                <div className={`flex items-center gap-2 text-${mode.color} mb-4`}>
                                    <span className="size-8 [&>svg]:size-8">{mode.icon}</span>
                                    <span className="text-2xl @2xl:text-3xl font-bold">{mode.name}</span>
                                </div>

                                <p className="text-xl @2xl:text-2xl font-medium text-primary mb-2">{mode.tagline}</p>
                                <p className="text-lg @2xl:text-xl text-secondary mb-8 leading-relaxed">
                                    {mode.description}
                                </p>

                                {/* Features list */}
                                <div className="space-y-6">
                                    {mode.features.map((feature, index) => (
                                        <div key={index} className="flex gap-4">
                                            <div
                                                className={`shrink-0 size-8 rounded-full bg-${mode.color}/20 text-${mode.color} flex items-center justify-center text-base font-bold`}
                                            >
                                                {index + 1}
                                            </div>
                                            <div>
                                                <h4 className="text-xl @2xl:text-lg font-semibold text-primary mb-1">
                                                    {feature.title}
                                                </h4>
                                                <p className="text-lg @2xl:text-base text-secondary leading-snug">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Media */}
                            <div className="@2xl:w-[45%] p-6 @2xl:p-8 flex items-center justify-center">
                                {mode.image ? (
                                    <CloudinaryImage
                                        src={mode.image as `https://res.cloudinary.com/${string}`}
                                        alt={mode.name}
                                        imgClassName="rounded border border-primary"
                                    />
                                ) : (
                                    <div className="w-full h-full min-h-[250px] bg-accent rounded border border-primary flex flex-col items-center justify-center p-8">
                                        <div
                                            className={`size-16 rounded-xl bg-${mode.color}/20 flex items-center justify-center mb-4`}
                                        >
                                            <span className={`text-${mode.color} size-8 [&>svg]:size-8`}>
                                                {mode.icon}
                                            </span>
                                        </div>
                                        <span className="text-lg font-medium text-primary mb-1">{mode.name}</span>
                                        <span className="text-sm text-secondary">[Video / Screenshot placeholder]</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Tabs.Content>
                ))}
            </Tabs.Root>
        </div>
    )
}
