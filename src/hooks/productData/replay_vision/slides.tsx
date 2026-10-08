import React from 'react'
import {
    IconCode,
    IconWarning,
    IconDocument,
    IconMagic,
    IconTrending,
    IconCheckCircle,
    IconTerminal,
    IconBrowser,
    IconGraph,
    IconBell,
    IconEye,
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
        layout: 'float',
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
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Replay_Vision_Cowork_mockup_33b6517a42.png',
            // Drop the float layout's default border; the asset already has a window chrome.
            frameless: true,
        },
    },
    {
        slug: 'in-the-app',
        label: 'In the app',
        icon: <IconBrowser className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
        layout: 'float',
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
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_07_22_at_16_53_55_2x_042bd6369d.png',
            srcDark:
                'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_07_22_at_16_58_56_2x_292863671d.png',
        },
    },
    {
        slug: 'query-alert',
        label: 'Query & alert',
        icon: <IconGraph className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-green',
        layout: 'float',
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
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_07_22_at_16_56_27_2x_1fedaa73d8.png',
            srcDark:
                'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_07_22_at_16_57_50_2x_720995e1f8.png',
        },
    },
    {
        slug: 'inbox-self-driving',
        label: 'Self-driving',
        icon: <IconBell className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-yellow',
        layout: 'float',
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
        image: {
            src: 'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_07_22_at_17_03_10_2x_1_4c236ec771.png',
            srcDark:
                'https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2026_07_22_at_17_02_08_2x_1_eb56d67e29.png',
        },
    },
]

// The six built-in scanner types shown in the "What it looks for" tab.
const scannerCards: {
    Icon: React.ComponentType<{ className?: string }>
    color: string
    title: string
    type?: string
    description: string
}[] = [
    {
        Icon: IconCode,
        color: 'text-purple',
        title: 'Create from scratch',
        description: 'Build a fully custom scanner – pick a type and write your own prompt and config.',
    },
    {
        Icon: IconWarning,
        color: 'text-red',
        title: 'Dead ends',
        type: 'Monitor',
        description: 'Catch the moment someone hits a wall: scrolling, hovering with no CTA, then rage-quitting.',
    },
    {
        Icon: IconDocument,
        color: 'text-green',
        title: 'Session summary',
        type: 'Summarizer',
        description: "The TL;DR of the session, so you don't sit through 14 minutes of someone scrolling.",
    },
    {
        Icon: IconMagic,
        color: 'text-blue',
        title: 'User intent',
        type: 'Classifier',
        description: 'Classify the session by what the user appeared to be trying to do.',
    },
    {
        Icon: IconTrending,
        color: 'text-yellow',
        title: 'Frustration score',
        type: 'Scorer',
        description: 'Rate how much friction a page caused, on a scale you define.',
    },
    {
        Icon: IconCheckCircle,
        color: 'text-teal',
        title: 'Session outcome',
        type: 'Classifier',
        description: 'Tag what actually happened – task completed, abandoned, errored, and so on.',
    },
]

// Top features for Replay Vision – how scanners look, get configured, and run.
export const topFeatures: CarouselSlide[] = [
    {
        slug: 'what-it-looks-for',
        label: 'Scanners',
        icon: <IconEye className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
        layout: 'stack',
        heading: 'What it looks for',
        description: (
            <>
                <p>
                    Replay Vision runs <strong>scanners</strong> – AI probes you configure and point at your sessions.
                    Pick a type, describe what to look for, and it produces structured output on each session it scans.
                    Start from a built-in template or from scratch.
                </p>
                <div className="@container">
                    <div className="grid @md:grid-cols-2 @2xl:grid-cols-3 gap-4 my-6">
                        {scannerCards.map(({ Icon, color, title, type, description }) => (
                            <div key={title} className="rounded-md border border-primary p-4 bg-primary">
                                <div className="flex items-baseline gap-2 mb-2">
                                    <Icon className={`size-5 shrink-0 self-center ${color}`} />
                                    <h4 className="text-[15px] font-bold m-0">
                                        {title}
                                        {type && (
                                            <span className="font-normal italic text-secondary text-sm"> ({type})</span>
                                        )}
                                    </h4>
                                </div>
                                <p className="text-sm text-secondary m-0">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <p className="text-sm text-secondary italic">
                    Every observation comes with a confidence score and citations that link straight to the exact moment
                    in the recording, so you can verify it in one click.
                </p>
            </>
        ),
    },
    {
        slug: 'how-it-runs',
        label: 'Investigation',
        icon: <IconTrending className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-green',
        layout: 'stack',
        heading: 'How it runs',
        description: (
            <>
                <p>
                    Once enabled, a scanner works in the background – and you can also run it by hand whenever you're
                    investigating.
                </p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'Continuous sweep',
                                description:
                                    'Enabled scanners pick up new matching recordings every few minutes and queue an observation.',
                            },
                            {
                                label: 'Scan on demand',
                                description:
                                    'Run a scanner against a single recording straight from the replay player – no schedule needed.',
                            },
                            {
                                label: 'Bulk scan',
                                description:
                                    'Select recordings in the list and scan them all at once; great for backfilling after you widen filters.',
                            },
                            {
                                label: 'Run from your editor',
                                description: (
                                    <>
                                        Trigger a scan via the <InlineCode>vision-scanners-scan-session</InlineCode> MCP
                                        tool without leaving your IDE.
                                    </>
                                ),
                            },
                            {
                                label: 'Never double-counts',
                                description:
                                    'Each scanner observes a given session only once, so re-sweeping never duplicates work or cost.',
                            },
                            {
                                label: "Skips what it can't judge",
                                description:
                                    'Too-short, idle, or recording-less sessions come back "ineligible" – and don\'t count against your quota.',
                            },
                        ]}
                    />
                </div>
            </>
        ),
    },
    {
        slug: 'what-you-get-back',
        label: 'Observations',
        icon: <IconDocument className="size-5" />,
        color: 'bg-light dark:bg-dark',
        activeText: 'text-primary',
        progressBar: 'bg-yellow',
        layout: 'stack',
        heading: 'What you get back',
        description: (
            <>
                <p>
                    Each scan produces a <strong>structured observation</strong> – and it doesn't just sit in a table.
                </p>
                <div className="@container">
                    <LabeledList
                        items={[
                            {
                                label: 'Structured output',
                                description:
                                    'A verdict, tags, a score, or a summary – whatever the scanner type defines.',
                            },
                            {
                                label: 'Confidence on everything',
                                description:
                                    "Each observation carries the model's self-reported certainty, so you can filter to high-confidence results.",
                            },
                            {
                                label: 'Citations to the moment',
                                description:
                                    "The reasoning links to exact timestamps in the recording – click to jump there and check the model's work.",
                            },
                            {
                                label: 'Queryable as events',
                                description: (
                                    <>
                                        Observations land as <InlineCode>$recording_observed</InlineCode> events, so you
                                        can chart, break down, and alert on them next to the rest of your data.
                                    </>
                                ),
                            },
                            {
                                label: 'Hand off to Responder agents',
                                description:
                                    'Flip a toggle and a scanner also flags concrete product issues as signals to the self-driving Inbox, where agents research them and can open a PR.',
                            },
                        ]}
                    />
                </div>
            </>
        ),
    },
]
