import React from 'react'
import Tabs from 'components/RadixUI/Tabs'
import ScrollArea from 'components/RadixUI/ScrollArea'
import CloudinaryImage from 'components/CloudinaryImage'
import { IconMap, IconRewindPlay, IconSearch, IconSparkles } from '@posthog/icons'

const modes = [
    {
        id: 'plan-mode',
        name: 'Plan mode',
        icon: <IconMap />,
        color: 'green',
        tagline: 'Think twice, ship once',
        description:
            'For complex queries without clear solutions, ask PostHog AI to map out the approach. Plot the next five moves before diving in.',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/Plan_mode_ebaace2a2c.png',
        features: [
            {
                title: 'Clarify the mission',
                description:
                    "Time period? Segments? Success criteria? The agent asks upfront (it's like a standup, but useful).",
            },
            {
                title: 'Approve the battle plan',
                description:
                    'No need to burn tokens on the wrong approach. See exactly what the agent wants to do. Tweak it. Reject it. Or let it rip.',
            },
            {
                title: 'Watch it execute',
                description:
                    'Once a plan is approved, PostHog AI builds to spec. Dashboards, SQL queries, and insights – delivered as specified (no scope creep).',
            },
        ],
    },
    {
        id: 'research-mode',
        name: 'Research mode',
        icon: <IconSearch />,
        color: 'purple',
        tagline: 'For questions without quick answers',
        description:
            '"Why is churn increasing?" is a rabbit hole. Research mode runs a more powerful model with extended thinking to correlate metrics, test hypotheses, and find the answer.',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/research_mode_dc98608a04.png',
        features: [
            {
                title: 'Review the plan before it runs',
                description:
                    "You approve the research plan first: which segments to look at, which time periods matter. Point it at the problems you're ready to fix.",
            },
            {
                title: 'Parallel subagents do the legwork',
                description:
                    'Subagents spawn across analytics, SQL, and replay to build a complete picture. Weak theories get deleted, strong ones get sharper.',
            },
            {
                title: 'Get a report you can act on',
                description:
                    'Findings land in a shareable PostHog notebook with evidence and recommendations (handy for winning architecture debates).',
            },
        ],
    },
    {
        id: 'session-summaries',
        name: 'Session summaries',
        icon: <IconRewindPlay />,
        color: 'blue',
        tagline: 'Computer vision for your product',
        description:
            "Session replay, but make it AI. PostHog AI watches hundreds of recordings so you don't have to – and actually understands what's happening on screen.",
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/session_summaries_mode_3be9f6ebde.png',
        features: [
            {
                title: 'Enrich autocapture with OCR',
                description:
                    'Vision AI extracts button labels, form fields, and error messages as they appeared on screen to users.',
            },
            {
                title: 'Query recordings by what users saw',
                description:
                    'Use natural language to find and filter sessions by metadata, labels, events on page, or instances where users performed a specific action.',
            },
            {
                title: 'Fast forward to the blooper reel',
                description:
                    'Get the highlights (and lowlights) of user behavior including errors, rage clicks and dead ends – ranked by severity with clips to investigate.',
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
                                                className={`shrink-0 size-8 rounded-full bg-${mode.color}/10 text-${mode.color} flex items-center justify-center text-base font-bold`}
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
                                    <div className="w-full h-full min-h-[250px] bg-accent rounded border flex flex-col items-center justify-center p-8">
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
