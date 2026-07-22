import React from 'react'
import {
    IconCode,
    IconWarning,
    IconDocument,
    IconCursorClick,
    IconTrending,
    IconCheckCircle,
    IconTerminal,
    IconBrowser,
    IconGraph,
    IconBell,
} from '@posthog/icons'
import type { CarouselSlide } from 'components/Products/ReaderViewProduct/types'
import { LabeledList, InlineCode } from 'components/Products/ReaderViewProduct/helpers'
import PlatformInstall, { wizardInstallSchema } from 'components/PlatformInstall'

// The "How do I use it?" carousel – four ways to put Replay Vision to work.
export const applications: CarouselSlide[] = [
    {
        slug: 'editor-mcp',
        label: 'Editor / MCP',
        icon: <IconTerminal className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: 'Author, run, and read scanners without leaving your editor',
        description: (
            <>
                <p>
                    Your AI coding agent can call Replay Vision directly through the PostHog MCP – in Cursor, Claude
                    Code, Codex, VS Code, or any MCP client.
                </p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'Author a scanner',
                                description:
                                    'Describe what to look for in plain language; the agent drafts the config, projects the monthly volume, and creates it.',
                            },
                            {
                                label: 'Investigate a session',
                                description:
                                    "Scan a specific recording on demand and pull the result – plus the model's reasoning – straight into context.",
                            },
                            {
                                label: 'Research before coding',
                                description:
                                    "Read a scanner's recent observations to see how users actually behave before you change anything.",
                            },
                            {
                                label: 'Audit a scanner',
                                description:
                                    'List recent observations to decide whether the prompt or filters need tuning.',
                            },
                        ]}
                    />
                </div>
                <div className="@container mt-6">
                    <PlatformInstall />
                </div>
            </>
        ),
    },
    {
        slug: 'in-the-app',
        label: 'In the app',
        icon: <IconBrowser className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'Describe it once, let it run',
        description: (
            <>
                <p>
                    Build a scanner in the wizard – prompt, scanner type, recording filters, and sampling rate – and it
                    runs continuously on every matching session.
                </p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'Pick a scanner type',
                                description: 'Summarize, classify intent, score frustration, or monitor for dead ends.',
                            },
                            {
                                label: 'Scope it',
                                description: 'Filter to the sessions that matter – a page, a cohort, a release.',
                            },
                            {
                                label: 'Set sampling',
                                description:
                                    'Choose how much of the matching traffic to scan, so cost stays predictable.',
                            },
                            {
                                label: 'Let it run',
                                description:
                                    'No chat box, no watching. You describe it once and the observations pile up.',
                            },
                        ]}
                    />
                </div>
            </>
        ),
    },
    {
        slug: 'query-alert',
        label: 'Query & alert',
        icon: <IconGraph className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-green',
        layout: 'stack',
        heading: 'Sessions become data you can work with',
        description: (
            <>
                <p>
                    Every observation is emitted as a <InlineCode>$recording_observed</InlineCode> event, so what Replay
                    Vision sees lives right next to the rest of your product data.
                </p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'Chart it',
                                description: 'Trend frustration scores, dead ends, or intent buckets over time.',
                            },
                            {
                                label: 'Put it on a dashboard',
                                description: 'Sit session insights beside your funnels, flags, and errors.',
                            },
                            {
                                label: 'Alert on it',
                                description: "Get notified when a scanner's output crosses a threshold.",
                            },
                            {
                                label: 'Slice it',
                                description: 'Break observations down by any property – release, device, cohort.',
                            },
                        ]}
                    />
                </div>
            </>
        ),
    },
    {
        slug: 'inbox-self-driving',
        label: 'Inbox / self-driving',
        icon: <IconBell className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-yellow',
        layout: 'stack',
        heading: 'From observation to open PR, while you sleep',
        description: (
            <>
                <p>
                    An observation doesn't just sit in a dashboard – it can raise a <strong>signal</strong> into your
                    Inbox, where signals are clustered into a prioritized <strong>report</strong>, and the actionable
                    ones come back as a <strong>pull request</strong> with the fix attached.
                </p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'Observation → signal',
                                description:
                                    'A scanner flags the friction – a dead end, a spike in frustration – and raises it as a signal.',
                            },
                            {
                                label: 'Signal → report',
                                description: 'Related signals are grouped into one report, tagged P0–P4 by impact.',
                            },
                            {
                                label: 'Report → pull request',
                                description:
                                    'Actionable reports come back as a PR, built in a sandbox against your branch rules.',
                            },
                            {
                                label: 'You → merge',
                                description: (
                                    <>
                                        Nothing ships on autopilot. You review, hit <InlineCode>Merge ↵</InlineCode>,
                                        and the loop measures whether the metric moved.
                                    </>
                                ),
                            },
                        ]}
                    />
                </div>
                <div className="@container mt-6">
                    <PlatformInstall schema={wizardInstallSchema} selfDriving />
                </div>
            </>
        ),
    },
]

// Top features for Replay Vision, adapted from the "How it works" scanner cards
// into the shared TabbedCarousel format. Prose-only for now – add screenshots
// per slide via the `image` field once they exist.
export const topFeatures: CarouselSlide[] = [
    {
        slug: 'create-from-scratch',
        label: 'Create from scratch',
        icon: <IconCode className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: 'Create from scratch',
        description: 'Build a fully custom scanner with your own prompt and configuration.',
    },
    {
        slug: 'dead-ends',
        label: 'Dead ends',
        icon: <IconWarning className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-red',
        layout: 'stack',
        heading: 'Dead ends',
        description: 'Catch the moment someone hits a wall, stares at it, and rage-quits.',
    },
    {
        slug: 'session-summary',
        label: 'Session summary',
        icon: <IconDocument className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-green',
        layout: 'stack',
        heading: 'Session summary',
        description: "The TL;DR of the session, so you don't have to sit through 14 minutes of someone scrolling.",
    },
    {
        slug: 'user-intent',
        label: 'User intent',
        icon: <IconCursorClick className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'stack',
        heading: 'User intent',
        description: 'Classify the session by what the user appeared to be trying to do.',
    },
    {
        slug: 'frustration-score',
        label: 'Frustration score',
        icon: <IconTrending className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-yellow',
        layout: 'stack',
        heading: 'Frustration score',
        description: 'Rate how mad the page made someone, from mild sigh to keyboard-smash.',
    },
    {
        slug: 'session-outcome',
        label: 'Session outcome',
        icon: <IconCheckCircle className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-teal',
        layout: 'stack',
        heading: 'Session outcome',
        description: 'Tag each session with what actually happened – task completed, abandoned, errored, etc.',
    },
]
