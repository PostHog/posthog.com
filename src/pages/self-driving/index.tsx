import React from 'react'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import CloudinaryImage from 'components/CloudinaryImage'
import { TreeMenu } from 'components/TreeMenu'
import { productOSNav } from 'hooks/useProductOSNavigation'
import { Accordion } from 'components/RadixUI/Accordion'
import TabbedCarousel from 'components/TabbedCarousel'
import type { TabbedCarouselTab } from 'components/TabbedCarousel'
import Link from 'components/Link'
import WizardCommand from 'components/WizardCommand'
import {
    IconArrowRight,
    IconBolt,
    IconCheck,
    IconClock,
    IconCode,
    IconGraph,
    IconPeople,
    IconRefresh,
    IconShield,
    IconShuffle,
    IconWarning,
} from '@posthog/icons'
import { SignalsCallout } from 'components/Code/SignalsCallout'

type IconComponent = React.ComponentType<{ className?: string }>

const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="bg-highlight p-0.5 font-bold text-red dark:text-yellow">{children}</span>
)

const LeftSidebarContent = () => <TreeMenu items={productOSNav.children} />

type Report = {
    priority: string
    priorityClass: string
    source: string
    title: string
    rootCause: string
    reviewer: string
    reviewerInitials: string
    reviewerColor: string
    reviewerWhy: string
    meta: string
    time: string
}

const reports: Report[] = [
    {
        priority: 'P0',
        priorityClass: 'bg-red text-white',
        source: 'Error tracking',
        title: 'Checkout fails for users without a saved card',
        rootCause: 'billing_manager.py:142 – query missing a null check',
        reviewer: 'Sam Chen',
        reviewerInitials: 'SC',
        reviewerColor: 'bg-red',
        reviewerWhy: 'owns billing',
        meta: '1,240 users · 18 paid',
        time: '15m ago',
    },
    {
        priority: 'P1',
        priorityClass: 'bg-orange text-white',
        source: 'Zendesk',
        title: 'Sessions merge is running against a dropped staging table',
        rootCause: 'migrations/0042.py – references staging_sessions',
        reviewer: 'Priya Nair',
        reviewerInitials: 'PN',
        reviewerColor: 'bg-purple',
        reviewerWhy: 'wrote this migration',
        meta: 'blocks 3 customers',
        time: '2h ago',
    },
    {
        priority: 'P2',
        priorityClass: 'bg-yellow text-black',
        source: 'Session replay',
        title: 'Attach CORS headers and Retry-After to 503 responses',
        rootCause: 'gateway/middleware.ts:88 – headers dropped on the error path',
        reviewer: 'Diego Ruiz',
        reviewerInitials: 'DR',
        reviewerColor: 'bg-blue',
        reviewerWhy: 'owns the gateway',
        meta: 'spikes on deploys',
        time: '14h ago',
    },
    {
        priority: 'P3',
        priorityClass: 'bg-blue text-white',
        source: 'Conversations',
        title: 'Clean up stale feature flags from the onboarding rollout',
        rootCause: '12 flags fully rolled out for 30+ days',
        reviewer: 'Mei Lin',
        reviewerInitials: 'ML',
        reviewerColor: 'bg-green',
        reviewerWhy: 'ran the rollout',
        meta: 'low risk',
        time: 'yesterday',
    },
]

const ReportInbox = (): JSX.Element => {
    const [selected, setSelected] = React.useState(0)
    const report = reports[selected]
    return (
        <div className="not-prose my-6 overflow-hidden rounded-md border border-primary bg-primary shadow-sm">
            <div className="flex items-center gap-1 border-b border-primary bg-accent px-2">
                <span className="-mb-px border-b-2 border-red px-3 py-2 text-sm font-bold text-primary">Reports</span>
                <span className="px-3 py-2 text-sm text-secondary">Pull requests</span>
            </div>
            <ul className="m-0 list-none divide-y divide-primary p-0">
                {reports.map((r, i) => (
                    <li key={r.title}>
                        <button
                            type="button"
                            onClick={() => setSelected(i)}
                            className={`flex w-full items-center gap-3 border-l-2 px-3 py-2.5 text-left transition-colors ${
                                selected === i ? 'border-red bg-accent' : 'border-transparent hover:bg-accent'
                            }`}
                        >
                            <span className={`shrink-0 rounded-sm px-1.5 py-0.5 text-xs font-bold ${r.priorityClass}`}>
                                {r.priority}
                            </span>
                            <span className="min-w-0 flex-1 truncate text-sm font-semibold text-primary">
                                {r.title}
                            </span>
                            <span className="hidden shrink-0 text-xs text-secondary @md/reader-content:inline">
                                {r.source}
                            </span>
                            <span className="shrink-0 text-xs text-secondary">{r.time}</span>
                        </button>
                    </li>
                ))}
            </ul>
            <div className="space-y-3 border-t border-primary bg-accent p-4">
                <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-sm px-1.5 py-0.5 text-xs font-bold ${report.priorityClass}`}>
                        {report.priority}
                    </span>
                    <span className="rounded-sm border border-green px-1.5 py-0.5 text-[11px] font-bold text-green">
                        Actionable
                    </span>
                    <span className="text-xs text-secondary">{report.source}</span>
                </div>
                <h5 className="m-0 text-base font-bold text-primary">{report.title}</h5>
                <div>
                    <span className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-secondary">
                        Root cause
                    </span>
                    <code className="inline-block rounded border border-primary bg-primary px-2 py-1 font-mono text-xs text-primary">
                        {report.rootCause}
                    </code>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-secondary">
                    <span>{report.meta}</span>
                    <span className="inline-flex items-center gap-1.5">
                        <span
                            className={`flex size-5 items-center justify-center rounded-full text-[10px] font-bold text-white ${report.reviewerColor}`}
                        >
                            {report.reviewerInitials}
                        </span>
                        Reviewer: {report.reviewer} – {report.reviewerWhy}
                    </span>
                </div>
            </div>
        </div>
    )
}

const signalParts: { label: string; copy: string; color: string }[] = [
    { label: 'The finding', copy: 'What’s happening, stated concretely.', color: 'bg-red' },
    { label: 'The evidence', copy: 'The data that backs it up.', color: 'bg-yellow' },
    { label: 'A suggested action', copy: 'What could be done about it.', color: 'bg-green' },
]

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

type LoopStep = {
    value: string
    label: string
    color: string
    activeText: string
    progressBar: string
    dot: string
    headline: string
    description: string
    chips: string[]
    image: string
    alt: string
}

const loopSteps: LoopStep[] = [
    {
        value: 'signal',
        label: 'Catch the signal',
        color: 'bg-blue',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        dot: 'bg-blue',
        headline: 'Everything worth knowing, in one stream',
        description:
            'Scouts watch your data on a schedule, and your products emit signals directly – error spikes, frustration in replays, failing health checks – while Zendesk, Linear, and GitHub Issues feed in. One real problem throws off a dozen signals at once.',
        chips: ['Scouts on a schedule', 'Errors & replays', 'Health checks', 'Zendesk, Linear, GitHub'],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/1_inbox_d7dc489a6e.png',
        alt: 'Signals clustering into a report in the PostHog inbox',
    },
    {
        value: 'report',
        label: 'Triage by impact',
        color: 'bg-yellow',
        activeText: 'text-black',
        progressBar: 'bg-black/70 shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
        dot: 'bg-yellow',
        headline: 'Noise becomes one ranked report',
        description:
            'Related signals dedupe and cluster into a single report, graded by code importance, user impact, and severity – not by how often an error fires. P0s and P1s often have a PR open before you’ve even seen them.',
        chips: ['Code importance', 'User impact', 'Severity', 'P0–P4 priority'],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/2_report_0256ec0da2.png',
        alt: 'A PostHog report with the evidence behind it',
    },
    {
        value: 'pr',
        label: 'Open a PR',
        color: 'bg-green',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        dot: 'bg-green',
        headline: 'An agent writes the fix',
        description:
            'Hand a report to an agent. It clones into a sandbox, traces the root cause, makes the change, and opens a pull request with an AI-written summary – then babysits CI, rerunning flaky jobs until the PR is actually mergeable.',
        chips: ['Sandboxed', 'Root cause', 'Babysits CI', 'AI-written PR'],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/3_code_7b33dd8a80.png',
        alt: 'An agent writing code to fix a report in a sandbox',
    },
    {
        value: 'instrument',
        label: 'Measure the fix',
        color: 'bg-red',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        dot: 'bg-red',
        headline: 'It instruments what it ships',
        description:
            'Every change comes with the events, flags, and experiments needed to measure it. You merge, then PostHog re-checks the metric that triggered the work to see whether it actually moved.',
        chips: ['Events added', 'Flags & experiments', 'You merge', 'Metric re-checked'],
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/4_merge_ffb549df4a.png',
        alt: 'Merging the pull request that came from a report',
    },
]

const loopTabs: TabbedCarouselTab[] = loopSteps.map(
    ({ value, label, color, activeText, progressBar, dot, headline, description, chips, image, alt }) => ({
        value,
        label,
        color,
        activeText,
        progressBar,
        content: (
            <div className="rounded pt-4 px-4 bg-primary">
                <h2 className="mt-0 mb-2 text-2xl font-bold">{headline}</h2>
                <p className="text-secondary text-sm m-0">{description}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                    {chips.map((chip) => (
                        <span
                            key={chip}
                            className="inline-flex items-center gap-1.5 rounded-full border border-primary bg-accent px-2.5 py-1 text-xs font-semibold text-primary"
                        >
                            <span className={`size-1.5 shrink-0 rounded-full ${dot}`} />
                            {chip}
                        </span>
                    ))}
                </div>
                <div className="-mx-4 mt-4 leading-[0]">
                    <CloudinaryImage src={image} alt={alt} imgClassName="w-full" />
                </div>
            </div>
        ),
    })
)

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

const guardrails: { icon: IconComponent; color: string; title: string; copy: React.ReactNode }[] = [
    {
        icon: IconShield,
        color: 'text-green',
        title: 'It can’t merge itself',
        copy: 'Agents draft changes as pull requests. Nothing reaches production until a human hits merge.',
    },
    {
        icon: IconCode,
        color: 'text-blue',
        title: 'Stuck in a sandbox',
        copy: 'Work happens away from production and comes back as a PR – your branch protections, CI, and review rules apply like they would to any teammate.',
    },
    {
        icon: IconWarning,
        color: 'text-yellow',
        title: 'You draw the line',
        copy: 'Watching, raising signals, and re-checking shipped work run on their own. Which reports to act on, the review, and the merge are yours.',
    },
    {
        icon: IconGraph,
        color: 'text-purple',
        title: 'Blind until you opt in',
        copy: 'Self-driving only runs once you’ve opted in to AI data processing. You control which sources feed the loop and who can change the config.',
    },
]

const faqItems = [
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
        trigger: 'How does pricing work?',
        content: (
            <p>
                You pay for work done: the unit is a pull request – real, reviewable work an agent has finished.
                Findings that aren’t actionable stay free, there are no per-seat fees, and you’re not paying for tokens.
                If a pass doesn’t produce something worth shipping, it doesn’t cost you anything. See{' '}
                <Link to="/pricing" state={{ newWindow: true }}>
                    pricing
                </Link>{' '}
                for the current numbers.
            </p>
        ),
    },
    {
        trigger: 'What actually opens the pull requests?',
        content: (
            <p>
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
                </Link>
                . It works in a sandbox, instruments the change as it goes, and babysits CI until the PR is mergeable.
            </p>
        ),
    },
    {
        trigger: 'How long does setup take?',
        content: (
            <p>
                Most teams are set up in a few minutes. Install PostHog so it’s capturing events, then run the wizard –
                it turns on your signal sources, connects GitHub, and sets up your first scouts. Reports start landing
                once data is flowing.
            </p>
        ),
    },
    {
        trigger: 'Do I have to let it run on its own?',
        content: (
            <p>
                You set the line per project. The watch-and-propose stages run continuously; anything that changes your
                product waits for your review. See{' '}
                <Link to="/docs/start-here/guardrails" state={{ newWindow: true }}>
                    guardrails
                </Link>{' '}
                for the full breakdown.
            </p>
        ),
    },
]

export default function SelfDrivingPage(): JSX.Element {
    return (
        <>
            <SEO
                title="Self-driving products"
                description="PostHog makes your product self-driving. It pairs all the context needed to build a successful product with agents that find opportunities and ship fixes."
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

                    <h3>
                        Skip the ticket, <Highlight>get the PR</Highlight>
                    </h3>
                    <p>
                        PostHog makes your product self-driving. It pairs all the context needed to build a successful
                        product with agents that find opportunities and ship fixes.
                    </p>

                    <div className="not-prose bg-accent border border-primary rounded-md p-4 @md/reader-content:p-5 mb-8 flex gap-3">
                        <IconBolt className="size-5 shrink-0 text-yellow mt-0.5" />
                        <p className="m-0 text-base text-primary">
                            When someone reports a problem here, the reply is increasingly a pull request, not a ticket
                            number. Self-driving is how – it collapses the distance between "users are struggling here"
                            and a fix that’s ready to merge.
                        </p>
                    </div>

                    <h3>
                        It all starts with a <Highlight>signal</Highlight>
                    </h3>
                    <p>
                        A signal is a structured finding: something worth knowing, with the evidence behind it and a
                        suggested action. Signals are the raw material of the{' '}
                        <Link to="/docs/start-here/autonomy-loop" state={{ newWindow: true }}>
                            autonomy loop
                        </Link>{' '}
                        – everything self-driving does starts from one. A signal isn’t just an alert. It carries:
                    </p>
                    <ul className="not-prose my-6 space-y-2 list-none pl-0">
                        {signalParts.map(({ label, copy, color }) => (
                            <li key={label} className="flex gap-2.5">
                                <span className={`mt-2 size-2 shrink-0 rounded-full ${color}`} />
                                <span className="text-base">
                                    <strong className="text-primary">{label}</strong>{' '}
                                    <span className="text-secondary">– {copy}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                    <p>Best of all, it runs on the data you already have.</p>
                    <p>
                        Signals come from two places: agents that go looking, and the products and tools already feeding
                        PostHog.
                    </p>
                    <div className="not-prose grid @lg/reader-content:grid-cols-[1fr_auto] gap-6 items-center my-6">
                        <ul className="m-0 p-0 list-none space-y-3 text-base">
                            <li className="relative pl-6">
                                <IconBolt className="absolute left-0 top-1 size-4 text-yellow" />
                                <span className="font-semibold text-primary">Connected sources</span> – error tracking,
                                session replay, and health checks inside PostHog, plus external tools like Zendesk,
                                GitHub Issues, and Linear.
                            </li>
                            <li className="relative pl-6">
                                <IconClock className="absolute left-0 top-1 size-4 text-blue" />
                                <Link to="/docs/start-here/scouts" state={{ newWindow: true }}>
                                    Scouts
                                </Link>{' '}
                                that watch your PostHog data on a schedule.
                            </li>
                        </ul>
                        <SignalsCallout className="max-w-xs mx-auto @lg/reader-content:mx-0" />
                    </div>

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

                    <h3>
                        Inside the <Highlight>inbox</Highlight>
                    </h3>
                    <p>
                        The inbox is the command center. Every signal gets researched into a <strong>report</strong>;
                        reports that can be fixed in code become <strong>pull requests</strong>. Here’s what that
                        actually looks like.
                    </p>

                    <h4 className="mt-8">What a report looks like</h4>
                    <p>
                        A report isn’t a raw error. It’s a researched finding – graded by priority, root-caused, and
                        assigned a reviewer. Click through a few:
                    </p>
                    <ReportInbox />

                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/inbox_prs_cloud_full_9c9dbb504c.png"
                        alt="The PostHog inbox with researched reports and open pull requests"
                        className="w-full !block m-0"
                        imgClassName="w-full !block"
                    />
                    <hr className="border-t border-primary m-0 mb-6" />

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

                    <h3>
                        See the whole <Highlight>loop</Highlight>
                    </h3>
                    <p>
                        The parts connect end to end: scouts and sources spot a problem, noise becomes one report, an
                        agent opens a pull request, and PostHog checks whether the fix actually worked – then feeds the
                        result into the next pass.
                    </p>
                    <div className="not-prose my-6">
                        <TabbedCarousel tabs={loopTabs} />
                    </div>

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

                    <h3>
                        Autonomy from instructions, not from <Highlight>engineers</Highlight>
                    </h3>
                    <p>
                        Self-driving proposes work without waiting to be asked, but never gets a side door around the
                        controls you already trust.
                    </p>
                    <div className="not-prose grid @md/reader-content:grid-cols-2 gap-3 my-6">
                        {guardrails.map(({ icon: Icon, color, title, copy }) => (
                            <div
                                key={title}
                                className="flex gap-3 border border-primary rounded-md p-3 bg-primary hover:border-secondary transition-colors"
                            >
                                <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent">
                                    <Icon className={`size-4 ${color}`} />
                                </div>
                                <div>
                                    <h4 className="m-0 text-sm font-bold text-primary">{title}</h4>
                                    <p className="m-0 mt-0.5 text-sm text-secondary">{copy}</p>
                                </div>
                            </div>
                        ))}
                    </div>

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
