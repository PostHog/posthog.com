import React from 'react'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import CloudinaryImage from 'components/CloudinaryImage'
import { CallToAction } from 'components/CallToAction'
import { TreeMenu } from 'components/TreeMenu'
import { productOSNav } from 'hooks/useProductOSNavigation'
import { Accordion } from 'components/RadixUI/Accordion'
import TabbedCarousel from 'components/TabbedCarousel'
import type { TabbedCarouselTab } from 'components/TabbedCarousel'
import Tabs from 'components/RadixUI/Tabs'
import Link from 'components/Link'
import WizardCommand from 'components/WizardCommand'
import { SignalsCallout } from 'components/Code/SignalsCallout'
import {
    IconArrowRight,
    IconBolt,
    IconChat,
    IconCheck,
    IconCheckCircle,
    IconCode,
    IconEye,
    IconGraph,
    IconPeople,
    IconPlug,
    IconPullRequest,
    IconRefresh,
    IconSearch,
    IconShieldLock,
    IconShuffle,
    IconSparkles,
    IconStar,
    IconTarget,
    IconWarning,
} from '@posthog/icons'

type IconComponent = React.ComponentType<{ className?: string }>

const HEADER_IMAGE = 'https://res.cloudinary.com/dmukukwp6/image/upload/inbox_prs_cloud_full_9c9dbb504c.png'
const BUILD_MODE_IMAGE = 'https://res.cloudinary.com/dmukukwp6/image/upload/evolution_of_build_mode_0bdd109b00.png'
const LOOP_SIGNALS_IMAGE = 'https://res.cloudinary.com/dmukukwp6/image/upload/sources_modal_5badfc44b6.png'
const LOOP_SCOUTS_IMAGE = 'https://res.cloudinary.com/dmukukwp6/image/upload/scout_modal_4c95317f12.png'
const LOOP_INBOX_IMAGE = 'https://res.cloudinary.com/dmukukwp6/image/upload/inbox_reports_80b35211c4.png'
const LOOP_MERGE_IMAGE = 'https://res.cloudinary.com/dmukukwp6/image/upload/4_merge_ffb549df4a.png'

const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="bg-highlight p-0.5 font-bold text-red dark:text-yellow">{children}</span>
)

const Badge = ({ children }: { children: React.ReactNode }) => (
    <span className="rounded-sm bg-highlight py-0.5 px-1 text-xs font-bold text-red dark:text-yellow">{children}</span>
)

const LeftSidebarContent = () => <TreeMenu items={productOSNav.children} />

const DottedList = ({ items, bulletClass }: { items: React.ReactNode[]; bulletClass: string }) => (
    <ul className="mt-3 mb-0 space-y-1 text-sm text-secondary list-none pl-0">
        {items.map((item, index) => (
            <li key={index} className="relative pl-5">
                <span className={`absolute left-1 top-2 size-1.5 rounded-full ${bulletClass}`} />
                {item}
            </li>
        ))}
    </ul>
)

// Icon + text rows for enriching carousel slides (à la the Slack app carousel).
const IconList = ({ items }: { items: { Icon: IconComponent; color: string; text: React.ReactNode }[] }) => (
    <ul className="mt-3 mb-0 list-none space-y-2 pl-0">
        {items.map(({ Icon, color, text }, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-secondary">
                <Icon className={`size-4 shrink-0 mt-0.5 ${color}`} />
                <span>{text}</span>
            </li>
        ))}
    </ul>
)

const Callout = ({ children }: { children: React.ReactNode }) => (
    <div className="mt-3 rounded border border-yellow bg-yellow/10 px-3 py-2 text-sm text-secondary">{children}</div>
)

const TabPanel = ({
    eyebrow,
    title,
    children,
    image,
    bleed,
}: {
    eyebrow: string
    title: string
    children: React.ReactNode
    image: string
    bleed?: boolean
}) => (
    <div className="rounded bg-primary p-4 @xl:p-6">
        <p className="m-0 mb-1 text-xs font-bold uppercase tracking-wide text-secondary">{eyebrow}</p>
        <h2 className="mt-0 mb-2 text-2xl font-bold">{title}</h2>
        <div className="text-secondary text-sm">{children}</div>
        {bleed ? (
            <div className="-mx-4 -mb-4 mt-4 overflow-hidden rounded-b leading-[0] @xl:-mx-6 @xl:-mb-6">
                <CloudinaryImage
                    src={image as `https://res.cloudinary.com/${string}`}
                    alt={title}
                    imgClassName="w-full block"
                />
            </div>
        ) : (
            <img
                src={image}
                alt={title}
                className="mt-4 w-full rounded-md border border-primary shadow-xl select-none"
            />
        )}
    </div>
)

// Side-by-side layout for squarish images (modals), inspired by the homepage carousel slides.
const SplitPanel = ({
    eyebrow,
    title,
    image,
    children,
}: {
    eyebrow: string
    title: string
    image: string
    children: React.ReactNode
}) => (
    <div className="@container rounded bg-primary p-4 @xl:p-6">
        <div className="grid grid-cols-1 items-center gap-6 @md:grid-cols-2">
            <div>
                <p className="m-0 mb-1 text-xs font-bold uppercase tracking-wide text-secondary">{eyebrow}</p>
                <h2 className="mt-0 mb-2 text-2xl font-bold">{title}</h2>
                <div className="text-secondary text-sm">{children}</div>
            </div>
            <div className="flex justify-center @md:order-last">
                <CloudinaryImage
                    src={image as `https://res.cloudinary.com/${string}`}
                    alt={title}
                    className="w-full max-w-xs @md:max-w-sm"
                    imgClassName="w-full rounded-md border border-primary shadow-lg"
                />
            </div>
        </div>
    </div>
)

const scoutRunFlow: string[] = ['On a schedule', 'Reads one slice', 'Decides what matters', 'Emits a signal']

const scoutControls: { label: string; copy: string; color: string }[] = [
    {
        label: 'Out of the box',
        copy: 'PostHog ships with scouts for the patterns most products hit.',
        color: 'bg-blue',
    },
    {
        label: 'On or off per project',
        copy: 'Toggle each scout so a project only runs what’s relevant to it.',
        color: 'bg-yellow',
    },
    {
        label: 'Bring your own',
        copy: 'Teams add scouts for the patterns specific to their product.',
        color: 'bg-green',
    },
]

const loopTabs: TabbedCarouselTab[] = [
    {
        value: 'signals',
        label: 'Signals',
        color: 'bg-red',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <SplitPanel
                eyebrow="Step 1 · Sense"
                title="Something breaks, and PostHog notices"
                image={LOOP_SIGNALS_IMAGE}
            >
                <p className="m-0">
                    A new error, a one-star support reply, a rage-click replay — each becomes a <strong>signal</strong>{' '}
                    the moment it happens.
                </p>
                <IconList
                    items={[
                        {
                            Icon: IconBolt,
                            color: 'text-yellow',
                            text: 'Errors, logs, and session replays from PostHog',
                        },
                        { Icon: IconChat, color: 'text-sky-blue', text: 'Support tickets and conversations' },
                        { Icon: IconCode, color: 'text-blue', text: 'GitHub and Linear issues' },
                    ]}
                />
            </SplitPanel>
        ),
    },
    {
        value: 'scouts',
        label: 'Scouts',
        color: 'bg-blue',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <SplitPanel eyebrow="Step 2 · Patrol" title="Scouts go looking on their own" image={LOOP_SCOUTS_IMAGE}>
                <p className="m-0">
                    Scheduled agents dig for the slow leaks no single event reveals — then surface only what's worth
                    your time.
                </p>
                <IconList
                    items={[
                        { Icon: IconTarget, color: 'text-red', text: 'A conversion rate sliding week over week' },
                        {
                            Icon: IconSearch,
                            color: 'text-blue',
                            text: 'A flag still burning evaluations after rollout',
                        },
                        { Icon: IconEye, color: 'text-purple', text: 'Rage-clicks pooling on one button' },
                    ]}
                />
                <Callout>
                    A fleet of <strong className="text-primary">35</strong> runs on PostHog itself — most stay quiet on
                    purpose.
                </Callout>
            </SplitPanel>
        ),
    },
    {
        value: 'inbox',
        label: 'The Inbox',
        color: 'bg-yellow',
        activeText: 'text-black',
        progressBar: 'bg-black/70 shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
        content: (
            <TabPanel eyebrow="Step 3 · Triage" title="One worklist, already sorted" image={LOOP_INBOX_IMAGE} bleed>
                <p className="m-0">
                    Everything that surfaces lands in one place — clustered into real issues and researched down to the
                    file and line.
                </p>
                <IconList
                    items={[
                        {
                            Icon: IconTarget,
                            color: 'text-red',
                            text: (
                                <>
                                    <strong className="text-primary">Ranked by impact</strong> — P0–P4 by how many users
                                    it hits, whether they pay, and how core the code is. Not how loud the log is.
                                </>
                            ),
                        },
                        {
                            Icon: IconStar,
                            color: 'text-yellow',
                            text: (
                                <>
                                    <strong className="text-primary">Routed to the right person</strong> — it suggests
                                    reviewers by tracing who wrote the code. If your name's on it, it floats to the top.
                                </>
                            ),
                        },
                        {
                            Icon: IconPullRequest,
                            color: 'text-green',
                            text: (
                                <>
                                    <strong className="text-primary">Fix attached</strong> — actionable reports arrive
                                    with a pull request already open.
                                </>
                            ),
                        },
                    ]}
                />
            </TabPanel>
        ),
    },
    {
        value: 'pull-requests',
        label: 'Pull requests',
        color: 'bg-green',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <TabPanel eyebrow="Step 4 · Fix & ship" title="The fix, already written" image={LOOP_MERGE_IMAGE} bleed>
                <p className="m-0">
                    When the fix is clear, an agent writes it in a sandbox, runs your tests, and opens a real pull
                    request.
                </p>
                <IconList
                    items={[
                        { Icon: IconShieldLock, color: 'text-purple', text: 'Sandboxed, scoped to one repo' },
                        { Icon: IconCheckCircle, color: 'text-green', text: 'Tests run before it’s ever proposed' },
                        { Icon: IconStar, color: 'text-yellow', text: 'Your name suggested as reviewer' },
                    ]}
                />
                <Callout>Nothing merges without you — you read the diff and hit merge.</Callout>
            </TabPanel>
        ),
    },
]

const fighterOptions: {
    icon: IconComponent
    iconColor: string
    label: React.ReactNode
    copy: React.ReactNode
}[] = [
    {
        icon: IconSparkles,
        iconColor: 'text-blue',
        label: (
            <Link to="/ai" state={{ newWindow: true }} className="font-bold text-primary">
                PostHog AI
            </Link>
        ),
        copy: "When you're already in the app staring at data – ask it to write the SQL, build the dashboard, or explain what you're looking at.",
    },
    {
        icon: IconCode,
        iconColor: 'text-brown dark:text-brown-dark',
        label: (
            <Link to="/code" state={{ newWindow: true }} className="font-bold text-primary">
                PostHog Code
            </Link>
        ),
        copy: 'The desktop cockpit. Drive the agents hands-on, run them in parallel, and review every diff before it ships.',
    },
    {
        icon: IconChat,
        iconColor: 'text-sky-blue',
        label: (
            <Link to="/slack" state={{ newWindow: true }} className="font-bold text-primary">
                Slack app
            </Link>
        ),
        copy: 'Where the team already is. Drop a report in a thread, tag a teammate, and investigate together – the agent answers inline.',
    },
    {
        icon: IconPlug,
        iconColor: 'text-purple',
        label: (
            <Link to="/mcp" state={{ newWindow: true }} className="font-bold text-primary">
                PostHog MCP
            </Link>
        ),
        copy: 'Wire the same product context into the editor or agent you already use, so your tools know your users too.',
    },
]

type WorkMode = {
    tag: string
    tagClass: string
    title: string
    copy: string
    guard: { icon: IconComponent; color: string; label: string; copy: string }
}

const workModes: WorkMode[] = [
    {
        tag: 'Prompted',
        tagClass: 'bg-blue/15 text-blue',
        title: 'You start it',
        copy: 'You ask, it works. Prompt a task in PostHog Code’s orchestrator, or ask PostHog AI a question and grab the sparkle right where you’re working.',
        guard: {
            icon: IconCheckCircle,
            color: 'text-green',
            label: 'Merge is the gate',
            copy: 'Nothing ships until you approve the diff.',
        },
    },
    {
        tag: 'Reactive',
        tagClass: 'bg-orange/15 text-orange',
        title: 'It responds',
        copy: 'Something happens — a new error, a support ticket, a rage-click replay — and a researched report lands in the Inbox, often with a pull request already attached.',
        guard: {
            icon: IconEye,
            color: 'text-blue',
            label: 'Replayable agent log',
            copy: 'Every step is logged — audit the path before you trust it.',
        },
    },
    {
        tag: 'Proactive',
        tagClass: 'bg-red/15 text-red',
        title: 'It goes looking',
        copy: 'Scouts wake on a schedule and dig for the slow leaks no single event reveals, then surface only what’s worth your time.',
        guard: {
            icon: IconShieldLock,
            color: 'text-purple',
            label: 'Sandboxed and scoped',
            copy: 'Isolated sandbox, one repo; your data stays in PostHog.',
        },
    },
]

const humanRoles: { heading: string; copy: string; image: string; alt: string }[] = [
    {
        heading: 'You call the shots',
        copy: 'You decide what matters and where to point it. Strategy stays human.',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hog_head_point_b6a2ffb400.png',
        alt: 'A hedgehog gesturing toward the work',
    },
    {
        heading: 'Grab the popcorn',
        copy: 'Reports research themselves and PRs land in your inbox while you do literally anything else.',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hog_head_popcorn_82aa11ea69.png',
        alt: 'A hedgehog eating popcorn',
    },
    {
        heading: 'Nothing hits prod alone',
        copy: 'Sandboxed work, and every change is a PR you merge. No 3am incident from a rogue agent.',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hog_head_safety_e1a8daa592.png',
        alt: 'A hedgehog in a hi-vis safety vest',
    },
]

type AutonomyLevel = {
    level: number
    title: string
    blurb: React.ReactNode
    nodeClass: string
    youAreHere?: boolean
    destination?: boolean
    capabilities?: { term: string; desc: React.ReactNode }[]
}

const autonomyLevels: AutonomyLevel[] = [
    {
        level: 1,
        title: 'Assisted',
        blurb: 'A coding assistant writes snippets and answers questions when you ask. It speeds you up, but you frame every input and make every call. The cruise control and lane assist of building software.',
        nodeClass: 'bg-accent text-secondary border border-border',
    },
    {
        level: 2,
        title: 'Self-fixing',
        blurb: 'The product holds its own line. When the software drifts — a regression slips in, a flag breaks, a bug hits production — it catches it and corrects back to where things should be.',
        nodeClass: 'bg-blue text-white',
        capabilities: [
            {
                term: 'Localization',
                desc: 'Knows what state it’s in — which users do what, which features are healthy, what shipped yesterday.',
            },
            {
                term: 'Feedback',
                desc: 'Checks whether a change worked. Did engagement go up? Did latency drop? Did the tooltip matter?',
            },
        ],
    },
    {
        level: 3,
        title: 'Self-improving',
        blurb: 'It stops just correcting and starts making moves — improving what’s there, taking the turns on its own. You still approve every pull request, and anything genuinely complex still comes to you.',
        nodeClass: 'bg-red text-white ring-4 ring-red/20',
        youAreHere: true,
        capabilities: [
            {
                term: 'Perception',
                desc: 'Curates its own context — support tickets connect to session replays, Slack threads to code changes.',
            },
            {
                term: 'Planning',
                desc: 'Decides what to do — a fix, an experiment, a doc — and, just as important, what not to do.',
            },
            {
                term: 'Control',
                desc: 'Has what it needs to act without asking: skills to ship a flag, permission to merge to master.',
            },
            {
                term: 'Learning',
                desc: 'Updates the next decision on what it learns. If the fix flopped, it tries something else. If you said no em dashes, it listens.',
            },
        ],
    },
    {
        level: 4,
        title: 'Self-driving',
        blurb: 'It can handle every part of the job, under the right conditions. You set the direction and step in for the hard or high-stakes calls — the obvious work just disappears. Takes long, multi-week loops and steerable swarms of agents.',
        nodeClass: 'bg-highlight text-red dark:text-yellow border-2 border-dashed border-red dark:border-yellow',
        destination: true,
        capabilities: [
            {
                term: 'Prediction',
                desc: 'Holds a working model of what’s about to happen — this cohort is about to churn, this feature could go viral.',
            },
        ],
    },
    {
        level: 5,
        title: 'Product autonomy',
        blurb: 'No human in the loop, on anything. The product sets its own direction and runs the whole show. That’s AGI — not here, and not the thing we’re building toward.',
        nodeClass: 'bg-accent text-secondary border border-dashed border-border',
        capabilities: [
            {
                term: 'Direction',
                desc: 'Sets its own goals and priorities — the one thing a human still held at level 4, handed over.',
            },
        ],
    },
]

const faqItems = [
    {
        trigger: 'What is a self-driving product?',
        content: (
            <p>
                A product that improves itself without waiting to be told to. PostHog watches how people actually use
                your product, finds what's broken or worth changing, writes the fix, and opens a pull request. You
                review and merge. The "self" is autonomy from <em>instruction</em> – it doesn't need you to spot the
                problem first – not autonomy from <em>you</em>. You're still the one who ships.
            </p>
        ),
    },
    {
        trigger: 'We’re a tiny team – is this overkill?',
        content: (
            <p>
                The opposite. The whole point is that a small team can ship like a much bigger one – Midjourney did
                $200M in revenue with 40 people; Cursor hit $100M ARR in under a year with fewer than 20. Self-driving
                keeps that fix-it-today, founder-mode energy at any ARR: it handles detection, instrumentation, and
                low-risk iteration, so your best people stay on the few things that decide whether you make it. The
                hands-on part scales; the judgment stays yours.
            </p>
        ),
    },
    {
        trigger: 'Won’t it just flood my codebase with AI slop?',
        content: (
            <p>
                That’s the failure mode – a pile of code chasing thin signal. What stops it is keeping a small team on
                strategy: self-driving handles detection, instrumentation, and low-risk iteration, but every change is a
                pull request a human reviews and merges. Nothing ships on the agent’s say-so.
            </p>
        ),
    },
    {
        trigger: 'Why can’t I just run this in Cursor, Claude Code, or Devin?',
        content: (
            <p>
                Those are great at the coding half, but they start from a ticket and see only your codebase – no funnel,
                no replay, no experiment result. They can’t originate work from "users are struggling here."
                Self-driving can, because the signals live in your product data. You can still bring that context into
                your own agent via{' '}
                <Link to="/docs/model-context-protocol" state={{ newWindow: true }}>
                    PostHog MCP
                </Link>
                .
            </p>
        ),
    },
    {
        trigger: 'How is this different from PostHog Code and PostHog AI?',
        content: (
            <p>
                Same brain, different doors.{' '}
                <Link to="/ai" state={{ newWindow: true }} className="text-red dark:text-yellow font-semibold">
                    PostHog AI
                </Link>{' '}
                answers data questions inside the app.{' '}
                <Link to="/code" state={{ newWindow: true }} className="text-red dark:text-yellow font-semibold">
                    PostHog Code
                </Link>{' '}
                is the desktop coding agent you drive hands-on. Self-driving is what happens when you point that agent
                at your product data and let it work on its own – the Inbox is the autopilot, Code is where you take the
                wheel.
            </p>
        ),
    },
    {
        trigger: 'What are signal sources and Scouts?',
        content: (
            <p>
                The two ways work shows up in your Inbox. <strong>Signal sources</strong> are the inputs – a new error,
                a support ticket, a session replay, a GitHub or Linear issue – that flag something the moment it
                happens. <strong>Scouts</strong> are proactive agents that wake on a schedule and go looking for the
                slow leaks no single event reveals, like a retention curve sliding or rage-clicks piling up on one
                button. Both feed the Inbox.
            </p>
        ),
    },
    {
        trigger: 'Does it really open pull requests on its own?',
        content: (
            <p>
                Yes. When a fix is clear,{' '}
                <Link
                    to="/code"
                    state={{ newWindow: true }}
                    className="text-red dark:text-yellow font-semibold hover:underline"
                >
                    PostHog Code
                </Link>{' '}
                – the same coding agent behind the{' '}
                <Link
                    to="/slack"
                    state={{ newWindow: true }}
                    className="text-red dark:text-yellow font-semibold hover:underline"
                >
                    Slack app
                </Link>{' '}
                – clones your repo into a sandbox, makes the change, runs your tests, and opens a real PR with a written
                description and a suggested reviewer. It even babysits CI until the PR is mergeable. What it doesn't do
                is merge it. That part's yours.
            </p>
        ),
    },
    {
        trigger: 'Will it merge anything without me?',
        content: (
            <p>
                No. Nothing ships without a human hitting merge. The watch-and-propose stages run continuously, but
                anything that changes your product waits for your review – you set the guardrails, you read the diff,
                and every step the agent took is logged so you can check its reasoning before you trust it. See{' '}
                <Link to="/docs/start-here/guardrails" state={{ newWindow: true }}>
                    guardrails
                </Link>{' '}
                for the full breakdown.
            </p>
        ),
    },
    {
        trigger: 'What does it cost?',
        content: (
            <p>
                Self-driving is in open paid beta. Scouts, reports, and the Inbox are all included – there's no separate
                subscription for the agents doing the watching. You pay per pull request, priced by how serious the
                issue is – a critical production fix costs more than a tidy-up. Reports without a fix are free, and
                there's a free tier to start. You're paying for outcomes, not tokens: if it doesn't ship you something
                worth merging, you don't pay for it. See{' '}
                <Link to="/pricing" state={{ newWindow: true }} className="text-red dark:text-yellow font-semibold">
                    pricing
                </Link>{' '}
                for the latest.
            </p>
        ),
    },
    {
        trigger: 'What can it watch, and can I control it?',
        content: (
            <p>
                Anything you already send to PostHog – errors, session replays, logs, funnels, flags, experiments,
                revenue – plus external sources like GitHub issues, Linear, Zendesk, and your support inbox. The more of
                your product PostHog can see, the better the fixes get. You choose which sources are connected and tune
                what the agents pay attention to. If something's noise, tell it once and it remembers.
            </p>
        ),
    },
    {
        trigger: 'Is my code safe?',
        content: (
            <p>
                Your code stays in your repo and your data stays in PostHog. Agents work in isolated sandboxes, and you
                can read the full log of everything they did before you merge a thing.
            </p>
        ),
    },
]

export default function SelfDrivingPage(): JSX.Element {
    return (
        <>
            <SEO
                title="PostHog self-driving"
                description="PostHog watches your product, finds what's worth fixing, writes the code, and opens the pull request. You review and merge. A product that develops itself – now in open beta."
                image="/images/og/default.png"
            />
            <ReaderView leftSidebar={<LeftSidebarContent />} title="self-driving.md" hideTitle={true}>
                <div className="max-w-2xl mx-auto">
                    {/* Hero: heading sits over the empty left half of the hogzilla banner */}
                    <div className="not-prose relative mb-4">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/self_driving_banner_fde531c7fb.png"
                            alt="A hog driving a flaming car – your product, self-driving"
                            className="w-full !block m-0"
                            imgClassName="w-full !block"
                        />
                        <div className="absolute inset-y-0 left-0 flex flex-col justify-start gap-2 @md/reader-content:gap-3 pt-1 @md/reader-content:pt-2 @lg/reader-content:pt-4 w-3/5 @md/reader-content:w-[55%] pl-1 @md/reader-content:pl-3">
                            <h1 className="text-left text-base @md/reader-content-container:text-2xl @lg/reader-content:text-3xl font-bold m-0 leading-tight text-primary">
                                Make your product
                                <br />
                                <Highlight>self-driving</Highlight>
                            </h1>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                <WizardCommand />
                            </div>
                        </div>
                    </div>

                    <hr className="border-t border-primary m-0 mb-6" />

                    {/* Lead: your product just opened a pull request */}
                    <div className="text-center mb-4">
                        <h2 className="text-3xl @md/reader-content-container:text-4xl font-bold m-0 mb-3">
                            Your product just opened a <Highlight>pull request</Highlight>
                        </h2>
                        <p className="text-secondary text-base @md/reader-content-container:text-lg max-w-xl mx-auto m-0">
                            While you slept, PostHog read every new error, session replay, and support ticket, found the
                            handful that actually mattered, wrote the fixes, and left the pull requests waiting for you.
                            You review. You merge. You get back to building.
                        </p>
                    </div>
                    <div className="not-prose flex flex-wrap items-center justify-center gap-3 mb-6">
                        <CallToAction to="/docs/posthog-code/inbox" state={{ newWindow: true }} size="sm">
                            Set up your Inbox
                        </CallToAction>
                        <Link to="#how" className="text-sm font-semibold">
                            See how it works
                        </Link>
                    </div>
                    <img
                        src={HEADER_IMAGE}
                        alt="The Inbox surfacing reports and pull requests across PostHog Code and the cloud"
                        className="m-0 block w-full select-none"
                    />
                    <hr className="border-t border-primary m-0 mb-6" />

                    {/* Gradient quote */}
                    <p className="my-6 text-center text-2xl font-bold @md/reader-content:text-3xl">
                        A few good people behind the wheel,{' '}
                        <em className="text-gradient not-italic">outrunning teams ten times the size.</em>
                    </p>

                    {/* It runs on the data you already have */}
                    <h3>
                        It runs on the data you <Highlight>already have</Highlight>
                    </h3>
                    <p>
                        You've been feeding PostHog errors, replays, flags, and funnels this whole time. Self-driving
                        just puts that data to work — and it all lands in one place: the{' '}
                        <Link to="/data-warehouse" state={{ newWindow: true }}>
                            data warehouse
                        </Link>
                        , soon the <strong>context warehouse</strong>. The more context PostHog can see, the sharper the
                        fixes get.
                    </p>
                    <div className="not-prose my-6 flex justify-center">
                        <SignalsCallout className="max-w-md" />
                    </div>

                    {/* Scouts watch your data */}
                    <h3>
                        <Highlight>Scouts</Highlight> watch your data
                    </h3>
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/2_underwater_scout_hogs_fb36b86eb8.png"
                        alt="PostHog scout hogs exploring your product data"
                        className="@lg/reader-content:float-right @lg/reader-content:max-w-[240px] @lg/reader-content:ml-6 mb-4 mt-2"
                        imgClassName="w-full"
                    />
                    <p>
                        A scout runs on a schedule. Each run, it looks at one slice of your data, decides whether
                        anything is worth surfacing, and if so emits a{' '}
                        <Link to="/docs/start-here/signals" state={{ newWindow: true }}>
                            signal
                        </Link>{' '}
                        – a structured finding with the evidence behind it and a suggested action.
                    </p>
                    <div className="not-prose flex flex-wrap items-center gap-2 my-6">
                        {scoutRunFlow.map((step, i) => (
                            <React.Fragment key={step}>
                                {i > 0 && <IconArrowRight className="size-4 shrink-0 text-secondary" />}
                                <span className="inline-flex items-center rounded-md border border-primary bg-primary px-2.5 py-1 text-sm font-semibold text-primary">
                                    {step}
                                </span>
                            </React.Fragment>
                        ))}
                    </div>
                    <p>
                        Scouts sit on top of your product data, so the pattern itself is the prompt. They watch the
                        products you’ve turned on, like error tracking and session replay, and the loop pulls in
                        external sources too: Zendesk, GitHub Issues, and Linear. The more data you capture, the more a
                        scout has to work with.
                    </p>
                    <div className="clear-both" />
                    <div className="not-prose grid @md/reader-content:grid-cols-3 gap-4 my-6">
                        {scoutControls.map(({ label, copy, color }) => (
                            <div key={label} className="border border-primary rounded-md p-4 bg-primary">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`size-2.5 rounded-full ${color}`} />
                                    <span className="font-bold text-primary">{label}</span>
                                </div>
                                <p className="m-0 text-sm text-secondary">{copy}</p>
                            </div>
                        ))}
                    </div>

                    {/* How a product develops itself */}
                    <h3 id="how">
                        How a product <Highlight>develops itself</Highlight>
                    </h3>
                    <p>Four steps, start to finish. You only show up for the last one.</p>
                    <div className="not-prose my-6">
                        <TabbedCarousel tabs={loopTabs} />
                    </div>

                    {/* …then it loops */}
                    <div className="not-prose my-8 rounded-md border border-primary bg-accent p-4 @md/reader-content:p-6">
                        <div className="flex items-center gap-2 mb-2">
                            <IconRefresh className="size-5 shrink-0 text-purple" />
                            <h3 className="m-0 text-xl font-bold text-primary">…then it loops</h3>
                        </div>
                        <p className="m-0 text-base text-secondary">
                            If the metric didn’t move, the result becomes a new signal. Scouts remember what they’ve
                            already seen and what worked, so the loop sharpens every cycle instead of repeating itself.
                        </p>
                        <ul className="mt-4 grid grid-cols-1 @md/reader-content:grid-cols-2 gap-x-6 gap-y-2 list-none p-0">
                            {['Outcome → new signal', 'Scout memory', 'No repeat work', 'Sharper next pass'].map(
                                (item) => (
                                    <li key={item} className="relative pl-6 text-sm text-primary">
                                        <IconCheck className="absolute left-0 top-0.5 size-4 text-purple" />
                                        {item}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    {/* Steer it from Slack */}
                    <h3>
                        Steer it from Slack with <span className="bg-blue/10 p-0.5 font-bold text-blue">@PostHog</span>
                    </h3>
                    <p>
                        Self-driving isn’t only autonomous. The{' '}
                        <Link to="/slack" state={{ newWindow: true }}>
                            PostHog Slack app
                        </Link>{' '}
                        puts the same agent in any thread – tag <code>@PostHog</code> and it picks up the work, right
                        where your team already talks.
                    </p>
                    <div className="not-prose grid @md/reader-content:grid-cols-2 gap-4 my-6">
                        <div className="border border-primary rounded-md p-4 bg-primary">
                            <div className="flex items-center gap-2 mb-2">
                                <IconShuffle className="size-5 shrink-0 text-blue" />
                                <h4 className="m-0 text-base font-bold">Routed to the right channel</h4>
                            </div>
                            <p className="m-0 text-sm text-secondary">
                                Route reports into the Slack channels each team already watches – autotagged based on
                                the product areas they own.
                            </p>
                        </div>
                        <div className="border border-primary rounded-md p-4 bg-primary">
                            <div className="flex items-center gap-2 mb-2">
                                <IconPeople className="size-5 shrink-0 text-purple" />
                                <h4 className="m-0 text-base font-bold">Solve it together, in situ</h4>
                            </div>
                            <p className="m-0 text-sm text-secondary">
                                Work through a report or PR with collaborators in a thread. Add context, steer the
                                agent, and decide what ships.
                            </p>
                        </div>
                    </div>
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/Inbox_in_slack_229d1d3693.png"
                        alt="Steering an agent from a Slack thread"
                        className="w-full !block m-0"
                        imgClassName="w-full !block"
                    />
                    <hr className="border-t border-primary m-0 mb-6" />

                    {/* Autopilot, or hands on the wheel */}
                    <h3>
                        Autopilot, or <Highlight>hands on the wheel</Highlight>
                    </h3>
                    <p>
                        Self-driving isn't a black box. Whenever you want to steer, the same product context is one
                        message away — reach it from whichever surface you already live in.
                    </p>
                    <div className="not-prose grid @md/reader-content:grid-cols-2 gap-x-6 gap-y-4 my-6">
                        {fighterOptions.map(({ icon: Icon, iconColor, label, copy }, index) => (
                            <div key={index}>
                                <p className="m-0 inline-flex items-center gap-2 font-bold text-base">
                                    <Icon className={`size-5 shrink-0 ${iconColor}`} />
                                    {label}
                                </p>
                                <p className="m-0 mt-1 text-sm text-secondary">{copy}</p>
                            </div>
                        ))}
                    </div>

                    {/* Autonomy from instruction, not from you */}
                    <h3>
                        Autonomy from <Highlight>instruction</Highlight>, not from you
                    </h3>
                    <p>
                        Self-driving means your product is never idle. It doesn't wait for permission to improve – only
                        for permission to ship. You set the guardrails, you're the one who hits merge, and every move an
                        agent makes is logged.
                    </p>
                    <div className="not-prose my-6">
                        <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-wide text-secondary">
                            <span>You prompt it</span>
                            <span>It works on its own</span>
                        </div>
                        <div className="mb-4 h-1 rounded-full bg-gradient-to-r from-blue to-red" />
                        <div className="grid gap-3 @md/reader-content:grid-cols-3">
                            {workModes.map((mode) => {
                                const GuardIcon = mode.guard.icon
                                return (
                                    <div
                                        key={mode.title}
                                        className="flex flex-col rounded-md border border-primary bg-primary p-4"
                                    >
                                        <span
                                            className={`inline-block self-start rounded-full px-2 py-0.5 text-xs font-bold ${mode.tagClass}`}
                                        >
                                            {mode.tag}
                                        </span>
                                        <p className="m-0 mt-2 text-base font-bold">{mode.title}</p>
                                        <p className="m-0 mt-1 text-sm text-secondary">{mode.copy}</p>
                                        <p className="m-0 mt-3 flex items-start gap-1.5 border-t border-primary pt-3 text-xs text-secondary">
                                            <GuardIcon className={`size-3.5 shrink-0 mt-px ${mode.guard.color}`} />
                                            <span>
                                                <strong className="text-primary">{mode.guard.label}</strong> —{' '}
                                                {mode.guard.copy}
                                            </span>
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* A product line that gets 1% better every day */}
                    <h3>
                        A product line that gets <Highlight>1% better</Highlight> every day
                    </h3>
                    <p>
                        Toyota didn't win on one big idea. They won on <em>kaizen</em> — thousands of tiny improvements,
                        made every day, by everyone, forever. No fix too small to be worth making. That compounding is
                        how an assembly line outruns a factory ten times its size.
                    </p>
                    <p>
                        Self-driving runs your product the same way. Not a feature factory chasing the next big launch —
                        a production line where the small stuff gets fixed quietly, continuously, in the background. One
                        percent at a time.
                    </p>
                    <div className="not-prose grid @lg/reader-content:grid-cols-2 gap-4 my-6">
                        <div className="rounded-md border border-primary bg-accent p-5 opacity-90">
                            <p className="m-0 mb-2 inline-flex items-center gap-2 font-bold text-lg text-secondary">
                                <IconWarning className="size-5 shrink-0 text-orange" />
                                The feature factory
                            </p>
                            <p className="m-0 text-sm text-secondary">
                                Ship the big thing, move on, never look back. The small stuff — the bugs, the rough
                                edges, the slow leaks — piles up in a backlog nobody gets to.
                            </p>
                            <DottedList
                                items={[
                                    'Big launches, then silence',
                                    'Paper cuts age out',
                                    'Improvement waits for headcount',
                                ]}
                                bulletClass="bg-orange"
                            />
                        </div>
                        <div className="rounded-md border border-primary bg-primary p-5 ring-1 ring-red/20 dark:ring-yellow/20">
                            <p className="m-0 mb-2 inline-flex items-center gap-2 font-bold text-lg">
                                <IconGraph className="size-5 shrink-0 text-green" />
                                The production line
                            </p>
                            <p className="m-0 text-sm text-secondary">
                                Kaizen, but for software. Every bug, paper cut, and conversion leak becomes a pull
                                request — small fixes landing continuously, compounding while you build.
                            </p>
                            <DottedList
                                items={['1% better, every day', 'Nothing too small to fix', 'Improvement runs itself']}
                                bulletClass="bg-green"
                            />
                        </div>
                    </div>
                    <p className="my-6 text-center text-2xl font-bold @md/reader-content:text-3xl">
                        PostHog isn't a feature factory.{' '}
                        <em className="text-gradient not-italic">It's a production line that never stops improving.</em>
                    </p>

                    {/* So, what's left for you? */}
                    <h3>
                        So, what’s <Highlight>left for you?</Highlight>
                    </h3>
                    <div className="not-prose grid grid-cols-1 @md/reader-content:grid-cols-3 gap-4 my-6">
                        {humanRoles.map(({ heading, copy, image, alt }) => (
                            <div
                                key={heading}
                                className="flex flex-col overflow-hidden rounded-md border border-primary bg-primary"
                            >
                                <div className="p-4">
                                    <h4 className="m-0 text-base font-bold text-primary">{heading}</h4>
                                    <p className="m-0 mt-1 text-sm text-secondary">{copy}</p>
                                </div>
                                <div className="mt-auto px-6 @md/reader-content:px-8">
                                    <CloudinaryImage
                                        src={image}
                                        alt={alt}
                                        className="w-full !block"
                                        imgClassName="w-full !block"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* The road to self-driving products */}
                    <img
                        src={BUILD_MODE_IMAGE}
                        alt="The evolution of build mode – a hog going from crawling, to caveman, to suit, to hunched 996 coder, to standing upright and free"
                        className="not-prose mb-6 h-auto w-full select-none"
                    />
                    <h3>
                        The road to <Highlight>self-driving</Highlight> products
                    </h3>
                    <p>
                        Like a Waymo, a self-driving product doesn't decide where you're going – it just makes getting
                        there easier. Product autonomy arrives on a scale, the same way it does for cars.
                    </p>
                    <div className="not-prose my-6">
                        <Tabs.Root orientation="horizontal" defaultValue="3" className="w-full">
                            <Tabs.List
                                orientation="horizontal"
                                className="w-full !min-w-0 rounded-md border border-primary bg-primary"
                            >
                                {autonomyLevels.map((lvl) => (
                                    <Tabs.Trigger
                                        key={lvl.level}
                                        value={String(lvl.level)}
                                        className="flex-col !h-auto !justify-center !gap-1.5 !px-1 !py-2"
                                    >
                                        <span
                                            className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${lvl.nodeClass}`}
                                        >
                                            {lvl.level}
                                        </span>
                                        <span className="text-center text-[11px] font-semibold leading-tight text-secondary">
                                            {lvl.youAreHere
                                                ? 'You are here'
                                                : lvl.destination
                                                ? 'The goal'
                                                : `Level ${lvl.level}`}
                                        </span>
                                    </Tabs.Trigger>
                                ))}
                            </Tabs.List>
                            {autonomyLevels.map((lvl) => (
                                <Tabs.Content
                                    key={lvl.level}
                                    value={String(lvl.level)}
                                    className="mt-3 w-full rounded-md border border-primary bg-primary p-4 focus-visible:outline-none"
                                >
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-[11px] font-bold uppercase tracking-wide text-secondary">
                                            Level {lvl.level}
                                        </span>
                                        <h4 className="m-0 text-lg font-bold">{lvl.title}</h4>
                                        {lvl.youAreHere && <Badge>You are here</Badge>}
                                        {lvl.destination && (
                                            <span className="rounded-sm border border-dashed border-red px-1 py-0.5 text-[11px] font-bold uppercase tracking-wide text-red dark:border-yellow dark:text-yellow">
                                                The goal
                                            </span>
                                        )}
                                    </div>
                                    <p className="m-0 mt-2 text-sm text-secondary">{lvl.blurb}</p>
                                    {lvl.capabilities && (
                                        <>
                                            <p className="m-0 mt-3 text-xs font-bold uppercase tracking-wide text-secondary">
                                                What this unlocks
                                            </p>
                                            <ul className="m-0 mt-1.5 list-none space-y-1.5 pl-0">
                                                {lvl.capabilities.map(({ term, desc }) => (
                                                    <li key={String(term)} className="text-sm text-secondary">
                                                        <strong className="text-primary">{term}</strong> — {desc}
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </Tabs.Content>
                            ))}
                        </Tabs.Root>
                    </div>

                    {/* CTA */}
                    <div className="not-prose relative overflow-hidden bg-accent border border-primary rounded-md p-4 @md/reader-content:p-6 my-6">
                        <div className="grid @lg/reader-content:grid-cols-[1fr_170px] gap-6 items-end">
                            <div>
                                <h3 className="mt-0 mb-2 text-2xl font-bold">Get your product driving</h3>
                                <p className="mt-0 mb-4 text-secondary">
                                    Install PostHog, then run the wizard – it turns on your signal sources, connects
                                    GitHub, and sets up your scouts. Your first reports start landing within minutes.
                                </p>
                                <WizardCommand />
                                <p className="mt-4 mb-0 text-sm text-secondary">
                                    New to all this?{' '}
                                    <Link to="/docs/start-here" state={{ newWindow: true }}>
                                        Start here
                                    </Link>
                                    , or read how{' '}
                                    <Link to="/docs/start-here/autonomy-loop" state={{ newWindow: true }}>
                                        the autonomy loop
                                    </Link>{' '}
                                    works.
                                </p>
                            </div>
                            <div className="hidden @lg/reader-content:block self-end -mb-4 @md/reader-content:-mb-6">
                                <CloudinaryImage
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/hog_hanging_from_sign_83184d5f0a.png"
                                    alt="A hog clinging to a signpost"
                                    className="w-full !block"
                                    imgClassName="w-full !block"
                                />
                            </div>
                        </div>
                    </div>

                    {/* FAQ */}
                    <h3>FAQ</h3>
                    <div className="not-prose mt-4">
                        <Accordion
                            type="multiple"
                            triggerClassName="!px-3 !py-2"
                            contentClassName="!px-3 !py-2.5 !text-base !leading-relaxed"
                            items={faqItems}
                        />
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
