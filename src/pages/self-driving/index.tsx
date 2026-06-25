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
    IconCheckCircle,
    IconCode,
    IconEye,
    IconLock,
    IconPeople,
    IconPlug,
    IconPullRequest,
    IconRefresh,
    IconSearch,
    IconShieldLock,
    IconSparkles,
    IconStack,
    IconStar,
    IconTarget,
} from '@posthog/icons'

type IconComponent = React.ComponentType<{ className?: string }>
type CloudinarySrc = `https://res.cloudinary.com/${string}`

const HEADER_IMAGE: CloudinarySrc =
    'https://res.cloudinary.com/dmukukwp6/image/upload/inbox_prs_cloud_full_9c9dbb504c.png'
const LOOP_SCOUTS_IMAGE: CloudinarySrc = 'https://res.cloudinary.com/dmukukwp6/image/upload/scout_modal_4c95317f12.png'
const LOOP_INBOX_IMAGE: CloudinarySrc = 'https://res.cloudinary.com/dmukukwp6/image/upload/inbox_reports_80b35211c4.png'
const LOOP_MERGE_IMAGE: CloudinarySrc = 'https://res.cloudinary.com/dmukukwp6/image/upload/4_merge_ffb549df4a.png'

const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="bg-highlight p-0.5 font-bold text-red dark:text-yellow">{children}</span>
)

const Badge = ({ children }: { children: React.ReactNode }) => (
    <span className="rounded-sm bg-highlight py-0.5 px-1 text-xs font-bold text-red dark:text-yellow">{children}</span>
)

const LeftSidebarContent = () => <TreeMenu items={productOSNav.children} />

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

// Row of icon + label chips, like the Slack app carousel slides.
const IconChipRow = ({ items }: { items: { Icon: IconComponent; color: string; name: string }[] }) => (
    <div className="mt-3 grid grid-cols-1 gap-x-1 @sm:grid-cols-2 @2xl:grid-cols-4">
        {items.map(({ Icon, color, name }) => (
            <span
                key={name}
                className="inline-flex items-center gap-1.5 whitespace-nowrap p-2 text-sm font-semibold text-primary"
            >
                <Icon className={`size-4 shrink-0 ${color}`} />
                {name}
            </span>
        ))}
    </div>
)

const TabPanel = ({ title, children, image }: { title: string; children: React.ReactNode; image: CloudinarySrc }) => (
    <div className="rounded bg-primary p-4 @xl:p-6">
        <h2 className="mt-0 mb-2 text-2xl font-bold">{title}</h2>
        <div className="text-secondary text-sm">{children}</div>
        <div className="-mx-4 -mb-4 mt-4 overflow-hidden rounded-b leading-[0] @xl:-mx-6 @xl:-mb-6">
            <CloudinaryImage src={image} alt={title} imgClassName="w-full block" />
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
            <TabPanel title="Something breaks, and PostHog notices" image={LOOP_INBOX_IMAGE}>
                <p className="m-0">
                    A new error, a one-star support reply, a rage-click replay – each becomes a <strong>signal</strong>{' '}
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
            </TabPanel>
        ),
    },
    {
        value: 'scouts',
        label: 'Scouts',
        color: 'bg-blue',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <TabPanel title="Scouts go looking on their own" image={LOOP_SCOUTS_IMAGE}>
                <p className="m-0">
                    Scheduled agents dig for the slow leaks no single event reveals – then surface only what's worth
                    your time.
                </p>
                <Callout>
                    <strong className="text-primary">~20</strong> ship out of the box, and you can spin up your own just
                    by describing what to watch. They flag non-code issues too – UI or pricing gripes go to product, no
                    PR attached.
                </Callout>
                <IconChipRow
                    items={[
                        { Icon: IconTarget, color: 'text-red', name: 'Conversion dips' },
                        { Icon: IconSearch, color: 'text-blue', name: 'Stale flags' },
                        { Icon: IconEye, color: 'text-purple', name: 'Rage-clicks' },
                        { Icon: IconBolt, color: 'text-yellow', name: 'Error spikes' },
                    ]}
                />
            </TabPanel>
        ),
    },
    {
        value: 'inbox',
        label: 'The Inbox',
        color: 'bg-yellow',
        activeText: 'text-black',
        progressBar: 'bg-black/70 shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
        content: (
            <TabPanel title="One worklist, already sorted" image={LOOP_INBOX_IMAGE}>
                <p className="m-0">
                    Everything that surfaces lands in one place – clustered into real issues and researched down to the
                    file and line.
                </p>
                <IconList
                    items={[
                        {
                            Icon: IconTarget,
                            color: 'text-red',
                            text: (
                                <>
                                    <strong className="text-primary">Ranked by impact</strong> – P1–P3 by how many users
                                    it hits, whether they pay, and how core the code is. Not how loud the log is.
                                </>
                            ),
                        },
                        {
                            Icon: IconStar,
                            color: 'text-yellow',
                            text: (
                                <>
                                    <strong className="text-primary">Routed to the right person</strong> – it suggests a
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
                                    <strong className="text-primary">Fix attached</strong> – actionable reports arrive
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
            <TabPanel title="The fix, already written" image={LOOP_MERGE_IMAGE}>
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
                                    <strong className="text-primary">Carries its receipts</strong> – the source it came
                                    from, an evidence bundle, and why PostHog acted, all on the PR.
                                </>
                            ),
                        },
                        { Icon: IconShieldLock, color: 'text-purple', text: 'Sandboxed, scoped to one repo' },
                        { Icon: IconCheckCircle, color: 'text-green', text: 'Tests run before it’s ever proposed' },
                    ]}
                />
                <Callout>
                    Nothing merges without you – archive it, mark it as needing input, or merge. You only pay for PRs,
                    never reports.
                </Callout>
            </TabPanel>
        ),
    },
]

const slackReports: { label: string; src: CloudinarySrc }[] = [
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

// Scattered, tilted report screenshots in an infinite, centered loop – like the PostHog AI prompt cards.
const SlackReportsRow = (): JSX.Element => {
    const railRef = React.useRef<HTMLDivElement>(null)
    // Three copies so the user can scroll endlessly in either direction.
    const loopReports = [...slackReports, ...slackReports, ...slackReports]

    const copyWidth = (rail: HTMLDivElement): number => {
        const cards = rail.children
        if (cards.length <= slackReports.length) return 0
        return (cards[slackReports.length] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft
    }

    const centerCard = (rail: HTMLDivElement, index: number) => {
        const card = rail.children[index] as HTMLElement | undefined
        if (card) rail.scrollLeft = card.offsetLeft - (rail.clientWidth - card.clientWidth) / 2
    }

    React.useEffect(() => {
        const rail = railRef.current
        if (rail) centerCard(rail, slackReports.length)
    }, [])

    const recenter = () => {
        const rail = railRef.current
        if (!rail) return
        const one = copyWidth(rail)
        if (!one) return
        if (rail.scrollLeft < one * 0.5) rail.scrollLeft += one
        else if (rail.scrollLeft > one * 1.5) rail.scrollLeft -= one
    }

    const scrollByCards = (dir: number) => {
        const rail = railRef.current
        if (!rail) return
        // Measure one card + gap rather than hard-coding a width that breaks at the @lg card size.
        const stride =
            rail.children.length > 1
                ? (rail.children[1] as HTMLElement).offsetLeft - (rail.children[0] as HTMLElement).offsetLeft
                : rail.clientWidth
        rail.scrollBy({ left: dir * stride, behavior: 'smooth' })
    }

    return (
        <div className="not-prose relative">
            <div ref={railRef} onScroll={recenter} className="flex snap-x gap-8 overflow-x-auto pb-8 pt-8">
                {loopReports.map(({ label, src }, i) => (
                    <CloudinaryImage
                        key={`${label}-${i}`}
                        src={src}
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
        title: 'You point it at something',
        copy: 'Hand it a problem you’ve spotted – a report, a flaky page, a metric that dipped – and it investigates, writes the fix, and opens the PR.',
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
        copy: 'A signal fires on its own – a new error, a support ticket, a rage-click replay – and a researched report lands in your Inbox, often with a PR already attached.',
        guard: {
            icon: IconEye,
            color: 'text-blue',
            label: 'Replayable log',
            copy: 'Every step it took is logged, so you can audit the path before you trust it.',
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
            copy: 'Work happens in an isolated sandbox, one repo; your data stays in PostHog.',
        },
    },
]

const humanRoles: { heading: string; copy: string; image: string; alt: string }[] = [
    {
        heading: 'You’re (still) the driver',
        copy: "Like a Waymo, a self-driving product doesn't decide where you're going (it just makes getting there easier). You choose where the product goes next.",
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hog_head_point_b6a2ffb400.png',
        alt: 'A hedgehog gesturing toward the work',
    },
    {
        heading: 'Skip to the good part',
        copy: 'Now streaming: every problem in your product (don’t worry, each episode ends well). Scouts sit on top of your product data, so the pattern itself is the prompt to PR.',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/hog_head_popcorn_82aa11ea69.png',
        alt: 'A hedgehog eating popcorn',
    },
    {
        heading: 'Ship like crazy',
        copy: 'Self-driving puts the product maintenance on autopilot and leaves build mode to you. A few good people behind the wheel can outship companies 10x the size.',
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
            <ReaderView leftSidebar={<LeftSidebarContent />} title="self-driving.md" hideTitle>
                <div className="max-w-2xl mx-auto">
                    {/* Hero: heading sits over the empty left half of the hogzilla banner */}
                    <div className="not-prose relative mb-4">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/self_driving_banner_fde531c7fb.png"
                            alt="A hog driving a flaming car – your product, self-driving"
                            className="w-full !block m-0"
                            imgClassName="w-full !block"
                        />
                        <div className="absolute inset-y-0 left-0 flex flex-col justify-start gap-3 @md/reader-content:gap-5 @lg/reader-content:gap-7 pt-1 @md/reader-content:pt-2 @lg/reader-content:pt-4 w-3/5 @md/reader-content:w-[55%] pl-1 @md/reader-content:pl-3">
                            <h1 className="text-left text-base @md/reader-content:text-2xl @lg/reader-content:text-3xl font-bold m-0 leading-tight text-primary">
                                Shift your product into
                                <br />
                                <Highlight>self-driving</Highlight>
                            </h1>
                            <div className="flex flex-col items-start gap-1.5">
                                <CallToAction to="/docs/posthog-code/inbox" state={{ newWindow: true }} size="sm">
                                    Set up your Inbox
                                </CallToAction>
                                <span className="text-sm text-secondary">
                                    Not using PostHog?{' '}
                                    <Link to="https://app.posthog.com/signup" external>
                                        Sign up
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Lead: your product just opened a pull request */}
                    <CloudinaryImage
                        src={HEADER_IMAGE}
                        alt="The Inbox surfacing reports and pull requests across PostHog Code and the cloud"
                        className="m-0 w-full !block select-none"
                        imgClassName="w-full !block"
                    />
                    <hr className="border-t border-primary m-0" />
                    <div className="text-center mt-6">
                        <p className="text-secondary text-sm @md/reader-content:text-base max-w-xl mx-auto m-0">
                            Your product just opened a <Highlight>pull request</Highlight>. Yep, really.
                            <br />
                            While you slept, PostHog dug through your product data, found what was worth fixing, and had
                            agents do the work.
                        </p>
                        <div className="not-prose mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-semibold">
                            <Link
                                to="/docs/self-driving/pricing"
                                state={{ newWindow: true }}
                                className="inline-flex items-center gap-1.5 text-primary hover:text-red dark:hover:text-yellow"
                            >
                                <IconSparkles className="size-4 shrink-0 text-purple" />3 free PRs/month
                            </Link>
                            <Link
                                to="/docs/self-driving/inbox"
                                state={{ newWindow: true }}
                                className="inline-flex items-center gap-1.5 text-primary hover:text-red dark:hover:text-yellow"
                            >
                                <IconSparkles className="size-4 shrink-0 text-purple" />
                                Unlimited reports
                            </Link>
                            <Link
                                to="/docs/self-driving/pricing"
                                state={{ newWindow: true }}
                                className="inline-flex items-center gap-1.5 text-primary hover:text-red dark:hover:text-yellow"
                            >
                                <IconSparkles className="size-4 shrink-0 text-purple" />
                                Outcome-based pricing
                            </Link>
                        </div>
                    </div>
                    <hr className="border-t border-primary m-0 mt-6" />

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
                            <IconRefresh className="size-4 shrink-0 text-purple" />
                            <h3 className="m-0 text-base font-bold text-primary">…then it loops</h3>
                        </div>
                        <p className="m-0 text-sm text-secondary">
                            Every change ships with the instrumentation to measure it – the agent adds the events,
                            feature flags, and experiments as it goes. After it merges, PostHog checks whether the
                            metric actually moved. If it didn’t, that’s a new signal (and the change can be rolled
                            back).
                        </p>
                        <Link
                            to="/docs/self-driving/self-improving-loop"
                            state={{ newWindow: true }}
                            className="mt-4 inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold"
                        >
                            {['Signal', 'Report', 'Ship', 'Measure'].map((step, i) => (
                                <React.Fragment key={step}>
                                    {i > 0 && <IconArrowRight className="size-4 shrink-0 text-secondary" />}
                                    <span className="text-primary">{step}</span>
                                </React.Fragment>
                            ))}
                            <IconArrowRight className="size-4 shrink-0 text-secondary" />
                            <span className="text-red underline dark:text-yellow">the self-improving loop</span>
                        </Link>
                    </div>

                    {/* Self-driving is autonomy from instruction, not from you */}
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/transformer_hedgehog_2a379334d7.png"
                        alt="A hedgehog transforming into a self-driving machine"
                        className="@lg/reader-content:float-right @lg/reader-content:max-w-[220px] @lg/reader-content:ml-6 mb-4 mt-2"
                        imgClassName="w-full"
                    />
                    <h3>
                        Self-driving is autonomy from <Highlight>instruction</Highlight>, not from you
                    </h3>
                    <p>PostHog agents run on their own, but don't run wild:</p>
                    <IconList
                        items={[
                            {
                                Icon: IconShieldLock,
                                color: 'text-purple',
                                text: (
                                    <>
                                        <strong className="text-primary">It's stuck in a sandbox.</strong> Work happens
                                        in the cloud, nowhere near your repo. Agents follow your branch protections, CI,
                                        and review rules.
                                    </>
                                ),
                            },
                            {
                                Icon: IconPullRequest,
                                color: 'text-red dark:text-yellow',
                                text: (
                                    <>
                                        <strong className="text-primary">The work can't merge itself.</strong> Nothing
                                        reaches production until a human clicks merge. Robots don't touch the big green
                                        button.
                                    </>
                                ),
                            },
                            {
                                Icon: IconStack,
                                color: 'text-blue',
                                text: (
                                    <>
                                        <strong className="text-primary">PRs {'>'} Issues.</strong> Raw signals are
                                        deduped and clustered into reports. Actionable ones become PRs. You only pay for
                                        real work completed.
                                    </>
                                ),
                            },
                            {
                                Icon: IconLock,
                                color: 'text-green',
                                text: (
                                    <>
                                        <strong className="text-primary">Your secrets are safe.</strong> Literally, and
                                        so is your code. Private repos stay private, and so does your data. (We're
                                        training AI models, but{' '}
                                        <Link to="/blog/training-ai-models" state={{ newWindow: true }}>
                                            not on your code
                                        </Link>
                                        .)
                                    </>
                                ),
                            },
                        ]}
                    />
                    <div className="clear-both" />

                    {/* It runs on the data you already have */}
                    <h3>
                        It runs on the data you <Highlight>already have</Highlight>
                    </h3>
                    <p>
                        Your product is a context goldmine. Self-driving just puts that data to work. The more sources
                        PostHog can see, the sharper the fixes get.
                    </p>
                    <div className="not-prose mt-6 mb-12 flex justify-center">
                        <SignalsCallout className="max-w-md" />
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
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/Inbox_in_slack_229d1d3693.png"
                        alt="Steering a self-driving report from a Slack thread"
                        className="w-full !block m-0"
                        imgClassName="w-full !block"
                    />
                    <hr className="border-t border-primary m-0 mb-6" />
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
                                Work through a report or PR with collaborators in Slack. Add context, steer the agent,
                                and decide what ships.
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
                        <em className="text-gradient not-italic">Suspiciously chill</em> for how much it's doing
                    </p>

                    {/* You prompt it → it works on its own */}
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
                                                <strong className="text-primary">{mode.guard.label}</strong> –{' '}
                                                {mode.guard.copy}
                                            </span>
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* So, what's left for you? */}
                    <h3>
                        So, what’s <Highlight>left for you?</Highlight>
                    </h3>
                    <p>
                        Work lands while you sleep. You wake up to diffs and reports waiting for review. <em>Then</em>{' '}
                        what?
                    </p>
                    <div className="not-prose grid grid-cols-1 @md/reader-content:grid-cols-3 gap-3 my-6">
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
