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
import Link from 'components/Link'
import WizardCommand from 'components/WizardCommand'
import { SignalsCallout } from 'components/Code/SignalsCallout'
import {
    IconArrowRight,
    IconAtSign,
    IconBolt,
    IconBrowser,
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
    IconStack,
    IconStar,
    IconTarget,
    IconWarning,
} from '@posthog/icons'

type IconComponent = React.ComponentType<{ className?: string }>

const HEADER_IMAGE = 'https://res.cloudinary.com/dmukukwp6/image/upload/inbox_prs_cloud_full_9c9dbb504c.png'
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
                                    <strong className="text-primary">Ranked by impact</strong> — P1–P3 by how many users
                                    it hits, whether they pay, and how core the code is. Not how loud the log is.
                                </>
                            ),
                        },
                        {
                            Icon: IconStar,
                            color: 'text-yellow',
                            text: (
                                <>
                                    <strong className="text-primary">Routed to the right person</strong> — it suggests a
                                    reviewer from git blame, whoever last touched that code. If your name's on it, it
                                    floats to the top.
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
                    request – with its receipts attached.
                </p>
                <IconList
                    items={[
                        {
                            Icon: IconStack,
                            color: 'text-blue',
                            text: (
                                <>
                                    <strong className="text-primary">Carries its receipts</strong> — the source it came
                                    from, an evidence bundle, and why PostHog acted, all on the PR.
                                </>
                            ),
                        },
                        { Icon: IconShieldLock, color: 'text-purple', text: 'Sandboxed, scoped to one repo' },
                        { Icon: IconCheckCircle, color: 'text-green', text: 'Tests run before it’s ever proposed' },
                    ]}
                />
                <Callout>
                    Nothing merges without you — archive it, mark it as needing input, or merge. You only pay for PRs,
                    never reports.
                </Callout>
            </TabPanel>
        ),
    },
]

const slackReports: { label: string; src: string }[] = [
    { label: 'P0', src: 'https://res.cloudinary.com/dmukukwp6/image/upload/P0_report_in_slack_21ed6fa69a.png' },
    {
        label: 'P1 · Replay',
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/P1_report_in_slack_replay_5fcf5aac7d.png',
    },
    {
        label: 'P1 · Zendesk',
        src: 'https://res.cloudinary.com/dmukukwp6/image/upload/P1_report_in_slack_zendesk_316671edcb.png',
    },
    { label: 'P2', src: 'https://res.cloudinary.com/dmukukwp6/image/upload/P2_report_in_slack_b35af9738a.png' },
    { label: 'P3', src: 'https://res.cloudinary.com/dmukukwp6/image/upload/P3_report_in_slack_97d9c6d8d4.png' },
    { label: 'P4', src: 'https://res.cloudinary.com/dmukukwp6/image/upload/P4_report_in_slack_7119174383.png' },
]

// Scattered, tilted report screenshots you can scroll through – like the PostHog AI prompt cards.
const SlackReportsRow = (): JSX.Element => {
    const railRef = React.useRef<HTMLDivElement>(null)
    const scrollByCards = (dir: number) => railRef.current?.scrollBy({ left: dir * 280, behavior: 'smooth' })
    return (
        <div className="not-prose relative">
            <div ref={railRef} className="flex snap-x gap-8 overflow-x-auto scroll-smooth px-4 pb-8 pt-8">
                {slackReports.map(({ label, src }) => (
                    <CloudinaryImage
                        key={label}
                        src={src as `https://res.cloudinary.com/${string}`}
                        alt={`A ${label} self-driving report delivered to a Slack channel`}
                        className="w-[280px] flex-shrink-0 snap-center odd:-rotate-3 even:rotate-3 @lg/reader-content:w-[320px]"
                        imgClassName="w-full rounded shadow-md"
                    />
                ))}
            </div>
            <button
                type="button"
                aria-label="Previous report"
                onClick={() => scrollByCards(-1)}
                className="absolute left-1 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-primary bg-primary shadow-md hover:bg-accent"
            >
                <IconArrowRight className="size-4 rotate-180 text-primary" />
            </button>
            <button
                type="button"
                aria-label="Next report"
                onClick={() => scrollByCards(1)}
                className="absolute right-1 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-primary bg-primary shadow-md hover:bg-accent"
            >
                <IconArrowRight className="size-4 text-primary" />
            </button>
        </div>
    )
}

const fighterOptions: {
    icon: IconComponent
    iconColor: string
    label: React.ReactNode
    copy: React.ReactNode
    cta?: React.ReactNode
}[] = [
    {
        icon: IconBrowser,
        iconColor: 'text-blue',
        label: <span className="font-bold text-primary">PostHog web app</span>,
        copy: 'The main way in. Review reports, open and merge pull requests, and manage your scouts – all from the Inbox in the PostHog app.',
        cta: (
            <Link to="https://app.posthog.com/signup" external className="text-secondary font-semibold underline">
                Sign up free
            </Link>
        ),
    },
    {
        icon: IconCode,
        iconColor: 'text-brown dark:text-brown-dark',
        label: (
            <span className="inline-flex items-center gap-2">
                <Link to="/code" state={{ newWindow: true }} className="font-bold text-primary">
                    PostHog Code
                </Link>
                <span className="inline-flex items-center rounded-sm bg-yellow/15 px-1 py-0.5 text-xs font-bold text-yellow">
                    Waitlist
                </span>
            </span>
        ),
        copy: 'The same Inbox on the desktop, for driving agents hands-on. Still rolling out from a waitlist, so not everyone has access yet.',
        cta: (
            <Link to="/code" state={{ newWindow: true }} className="text-secondary font-semibold underline">
                Join the waitlist
            </Link>
        ),
    },
    {
        icon: IconAtSign,
        iconColor: 'text-sky-blue',
        label: (
            <Link to="/slack" state={{ newWindow: true }} className="font-bold text-primary">
                PostHog Slack app
            </Link>
        ),
        copy: 'Route reports into the Slack channels each team already watches – autotagged based on the product areas they own.',
    },
    {
        icon: IconPlug,
        iconColor: 'text-purple',
        label: (
            <Link to="/mcp" state={{ newWindow: true }} className="font-bold text-primary">
                PostHog MCP
            </Link>
        ),
        copy: 'Look ma, no hands! Pull self-driving context into other tools, and pull context from your other tools into self-driving.',
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
        heading: 'You’re (still) the driver',
        copy: "Like a Waymo, a self-driving product doesn't decide where you're going (it just makes getting there easier). You pick which problems are worth solving and where the product goes next.",
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hog_head_point_b6a2ffb400.png',
        alt: 'A hedgehog gesturing toward the work',
    },
    {
        heading: 'Watch your product improve',
        copy: 'Scouts sit on top of your product data, so the pattern itself is the prompt. A leak found today has a PR tomorrow – which has quietly become my favourite show.',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hog_head_popcorn_82aa11ea69.png',
        alt: 'A hedgehog eating popcorn',
    },
    {
        heading: 'You stay in build mode',
        copy: 'Founder mode for your whole product (sweating the details), because you’re in build mode. The paper cuts a founder would obsess over on launch week get that attention every week.',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hog_head_laptop_2afc8d8955.png',
        alt: 'A hedgehog working at a laptop',
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
        trigger: 'How does setup work, and what does the wizard do?',
        content: (
            <p>
                Setup is a single command. The wizard reads your codebase and product, detects the services you run, and
                enables only the sources and scouts relevant to what it finds. It checks your GitHub connection, that
                the PostHog SDK is installed, and that AI data processing is approved, then hands back a setup report
                showing exactly what was and wasn't enabled, and why. Your first reports land in ~20–30 minutes – just
                enough time to build the cache and ingest from your first sources.
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
                                <WizardCommand command="self-driving" />
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
                        A scout is a small agent that watches one corner of your product for you. It looks for a pattern
                        worth flagging – a conversion rate slipping, rage-clicks piling up on a button, a new error
                        spiking – and when it spots one, raises a{' '}
                        <Link to="/docs/start-here/signals" state={{ newWindow: true }}>
                            signal
                        </Link>{' '}
                        for the loop to pick up.
                    </p>
                    <p>You don’t have to wire any of this up:</p>
                    <DottedList
                        items={[
                            <>
                                <strong className="text-primary">~20 out of the box</strong> – scouts for the patterns
                                most products hit, running from day one.
                            </>,
                            <>
                                <strong className="text-primary">On or off per project</strong> – each one only runs
                                where it’s relevant to you.
                            </>,
                            <>
                                <strong className="text-primary">Make your own</strong> – describe what to watch and an
                                agent builds the scout alongside you.
                            </>,
                            <>
                                <strong className="text-primary">Not just code</strong> – UI confusion or a pricing
                                complaint gets surfaced for product, no PR attached.
                            </>,
                        ]}
                        bulletClass="bg-blue"
                    />
                    <div className="clear-both" />

                    {/* How a product develops itself */}
                    <p id="how" className="my-6 text-center text-2xl font-bold @md/reader-content:text-3xl">
                        How a product <em className="text-gradient not-italic">develops itself</em>
                    </p>
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

                    {/* Where you work with it */}
                    <h3>
                        Where you <Highlight>work with it</Highlight>
                    </h3>
                    <p>
                        Self-driving runs on its own, but you stay in control. The same Inbox and agent show up across
                        four surfaces – use whichever fits how you work.
                    </p>
                    <div className="not-prose grid @md/reader-content:grid-cols-2 gap-x-6 gap-y-4 my-6">
                        {fighterOptions.map(({ icon: Icon, iconColor, label, copy, cta }, index) => (
                            <div key={index}>
                                <p className="m-0 inline-flex items-center gap-2 font-bold text-base">
                                    <Icon className={`size-5 shrink-0 ${iconColor}`} />
                                    {label}
                                </p>
                                <p className="m-0 mt-1 text-sm text-secondary">{copy}</p>
                                {cta && <p className="m-0 mt-1.5 text-sm">{cta}</p>}
                            </div>
                        ))}
                    </div>

                    {/* Steer it from Slack */}
                    <h3>
                        The opposite of a <Highlight>quick call</Highlight>
                    </h3>
                    <p>
                        Self-driving isn’t only autonomous. Some fixes are better hashed out by three people in a
                        thread.
                    </p>
                    <div className="not-prose grid @md/reader-content:grid-cols-2 gap-4 my-6">
                        <div className="border border-primary rounded-md p-4 bg-primary">
                            <div className="flex items-center gap-2 mb-2">
                                <IconPeople className="size-5 shrink-0 text-purple" />
                                <span className="font-bold text-primary">Solve it together</span>
                            </div>
                            <p className="m-0 text-sm text-secondary">
                                Work through a report or PR with collaborators in a thread. Add context, steer the
                                agent, and decide what ships.
                            </p>
                        </div>
                        <div className="border border-primary rounded-md p-4 bg-primary">
                            <div className="flex items-center gap-2 mb-2">
                                <IconTarget className="size-5 shrink-0 text-red" />
                                <span className="font-bold text-primary">Sorted by priority</span>
                            </div>
                            <p className="m-0 text-sm text-secondary">
                                Each report arrives tagged P0–P4 by impact, so the channel sees what needs attention now
                                and what can wait.
                            </p>
                        </div>
                    </div>
                    <SlackReportsRow />
                    <p className="my-6 text-center text-2xl font-bold @md/reader-content:text-3xl">
                        <em className="text-gradient not-italic">Suspiciously chill</em> for how much it's doing.
                    </p>
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/Inbox_in_slack_229d1d3693.png"
                        alt="Steering a self-driving report from a Slack thread"
                        className="w-full !block m-0"
                        imgClassName="w-full !block"
                    />
                    <hr className="border-t border-primary m-0 mb-6" />

                    {/* 1% better every day */}
                    <h3>
                        <Highlight>1% better</Highlight> every day
                    </h3>
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog_ai_hogs_d4c45b4550.png"
                        alt="PostHog hogs calmly working the long tail of product fixes"
                        className="@lg/reader-content:float-right @lg/reader-content:max-w-[320px] @lg/reader-content:ml-6 mb-4 mt-2"
                        imgClassName="w-full"
                    />
                    <p>
                        The big features get all the attention. It's the small stuff that quietly caps your numbers (the
                        signup edge case, the confusing empty state, the flag nobody deleted), and none of it ever wins
                        a prioritization fight. Self-driving keeps chipping away at it in the background, so the product
                        gets a little better every day.
                    </p>
                    <div className="clear-both" />
                    <div className="not-prose grid @lg/reader-content:grid-cols-2 gap-4 my-6">
                        <div className="rounded-md border border-primary bg-accent p-5 opacity-90">
                            <p className="m-0 mb-2 inline-flex items-center gap-2 font-bold text-lg text-secondary">
                                <IconWarning className="size-5 shrink-0 text-orange" />
                                Without it
                            </p>
                            <p className="m-0 text-sm text-secondary">
                                The small stuff that moves activation and retention loses every prioritization fight to
                                the roadmap.
                            </p>
                            <DottedList
                                items={[
                                    'Small bugs sit in the backlog for quarters',
                                    'A conversion leak goes unnoticed until QBR',
                                    'Every fix waits on scarce engineering time',
                                ]}
                                bulletClass="bg-orange"
                            />
                        </div>
                        <div className="rounded-md border border-primary bg-primary p-5 ring-1 ring-red/20 dark:ring-yellow/20">
                            <p className="m-0 mb-2 inline-flex items-center gap-2 font-bold text-lg">
                                <IconGraph className="size-5 shrink-0 text-green" />
                                With self-driving
                            </p>
                            <p className="m-0 text-sm text-secondary">
                                The long tail gets worked continuously, so the metrics those paper cuts were quietly
                                draining start to recover.
                            </p>
                            <DottedList
                                items={[
                                    'A leak found today has a PR tomorrow',
                                    'Improvements ship without booking a sprint',
                                    'You spend your time on the big bets',
                                ]}
                                bulletClass="bg-green"
                            />
                        </div>
                    </div>

                    {/* So, what's left for you? */}
                    <h3>
                        So, what’s <Highlight>left for you?</Highlight>
                    </h3>
                    <p>
                        Work lands while you sleep. You wake up to diffs and reports waiting for review. And then what?
                    </p>
                    <div className="not-prose grid grid-cols-1 @md/reader-content:grid-cols-3 gap-4 my-6">
                        {humanRoles.map(({ heading, copy, image, alt }) => (
                            <div
                                key={heading}
                                className="flex flex-col overflow-hidden rounded-md border border-primary bg-primary"
                            >
                                <div className="p-4">
                                    <p className="m-0 text-base font-bold text-primary">{heading}</p>
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

                    {/* CTA */}
                    <div className="not-prose relative overflow-hidden bg-accent border border-primary rounded-md p-4 @md/reader-content:p-6 my-6">
                        <div className="grid @lg/reader-content:grid-cols-[1fr_170px] gap-6 items-end">
                            <div>
                                <h3 className="mt-0 mb-3 inline-flex items-center gap-2 text-2xl font-bold">
                                    Set up your Inbox
                                    <Badge>Beta</Badge>
                                </h3>
                                <p className="mt-0 mb-4 text-secondary">
                                    Install PostHog, then run the wizard – it turns on your signal sources, connects
                                    GitHub, and sets up your scouts. Your first reports start landing in ~20–30 minutes.
                                </p>
                                <WizardCommand command="self-driving" />
                                <p className="mt-4 mb-0 text-sm text-secondary">
                                    New to all this? Read the{' '}
                                    <Link
                                        to="/docs/self-driving"
                                        state={{ newWindow: true }}
                                        className="text-red dark:text-yellow font-semibold underline"
                                    >
                                        self-driving docs
                                    </Link>
                                    .
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
