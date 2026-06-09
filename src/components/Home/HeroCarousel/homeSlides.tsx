import React from 'react'
import { IconArrowRight, IconChat, IconCheck, IconCoffee, IconSparkles } from '@posthog/icons'

// Slides for the homepage "agentic" carousel (Slack-first). The left image area
// is left blank for now — screenshots get dropped in later. The "Explore" CTAs
// are non-linking until their destinations exist.
// Note: @posthog/icons has no Slack/robot glyph, so IconChat is a placeholder.

export const SlackSlide = () => (
    <div className="@container rounded p-4 @md:p-6 h-full">
        <div className="grid grid-cols-1 @2xl:grid-cols-[1.4fr_1fr] gap-6 @2xl:gap-8 items-center h-full">
            <div className="bg-accent border border-primary rounded-md min-h-[220px] @2xl:min-h-[320px]" />
            <div className="flex flex-col gap-3">
                <p className="flex items-center gap-1.5 text-secondary text-sm font-semibold m-0">
                    <IconChat className="size-4" /> PostHog Bot
                </p>
                <h2 className="text-2xl @lg:text-3xl font-bold m-0">Create pull requests in Slack</h2>
                <p className="text-secondary m-0">
                    Tag @PostHog in a thread to analyze customer behavior or create a PR &mdash; all without ever
                    leaving Slack. Triage and build with your team in your existing tools.
                </p>
                <span className="inline-flex items-center gap-2 w-fit bg-dark text-white dark:bg-white dark:text-dark font-semibold text-sm px-4 py-2.5 rounded-md">
                    <IconChat className="size-4" /> Explore PostHog Slackbot <IconArrowRight className="size-4" />
                </span>
            </div>
        </div>
    </div>
)

export const FixBugsSlide = () => (
    <div className="@container rounded p-4 @md:p-6 h-full">
        <div className="grid grid-cols-1 @2xl:grid-cols-[1.4fr_1fr] gap-6 @2xl:gap-8 items-center h-full">
            <div className="bg-accent border border-primary rounded-md min-h-[220px] @2xl:min-h-[320px]" />
            <div className="flex flex-col gap-3">
                <p className="flex items-center gap-1.5 text-secondary text-sm font-semibold m-0">
                    <IconCoffee className="size-4" /> PostHog Code
                </p>
                <h2 className="text-2xl @lg:text-3xl font-bold m-0">Fix bugs automatically</h2>
                <p className="text-secondary m-0">
                    <strong>PostHog Code</strong>, our AI code editor:
                </p>
                <ul className="list-none p-0 m-0 space-y-1.5">
                    <li className="flex items-center gap-2 text-secondary">
                        <IconCheck className="size-5 text-green shrink-0" /> Identifies product usage patterns
                    </li>
                    <li className="flex items-center gap-2 text-secondary">
                        <IconCheck className="size-5 text-green shrink-0" /> Triages bugs and errors
                    </li>
                    <li className="flex items-center gap-2 text-secondary">
                        <IconCheck className="size-5 text-green shrink-0" /> Creates pull requests automatically
                    </li>
                </ul>
                <span className="inline-flex items-center gap-2 w-fit bg-dark text-white dark:bg-white dark:text-dark font-semibold text-sm px-4 py-2.5 rounded-md">
                    <IconCoffee className="size-4" /> Explore PostHog Code <IconArrowRight className="size-4" />
                </span>
            </div>
        </div>
    </div>
)

export const AskAnythingSlide = () => (
    <div className="@container rounded p-4 @md:p-6 h-full">
        <div className="grid grid-cols-1 @2xl:grid-cols-[1.4fr_1fr] gap-6 @2xl:gap-8 items-center h-full">
            <div className="bg-accent border border-primary rounded-md min-h-[220px] @2xl:min-h-[320px]" />
            <div className="flex flex-col gap-3">
                <p className="flex items-center gap-1.5 text-secondary text-sm font-semibold m-0">
                    <IconSparkles className="size-4" /> PostHog AI
                </p>
                <h2 className="text-2xl @lg:text-3xl font-bold m-0">Ask PostHog anything</h2>
                <p className="text-secondary m-0">
                    PostHog has 250+ data and analysis tools that are stitched together on-the-fly to answer any
                    customer usage or data question you have.
                </p>
                <p className="text-secondary m-0">
                    Pipe in third party data to analyze alongside customer usage data for a more complete picture of
                    product usage.
                </p>
                <span className="inline-flex items-center gap-2 w-fit bg-dark text-white dark:bg-white dark:text-dark font-semibold text-sm px-4 py-2.5 rounded-md">
                    <IconSparkles className="size-4" /> Explore PostHog AI <IconArrowRight className="size-4" />
                </span>
            </div>
        </div>
    </div>
)
