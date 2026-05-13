import React from 'react'
import SEO from 'components/seo'
import Editor from 'components/Editor'
import { Accordion } from 'components/RadixUI/Accordion'
import TabbedCarousel from 'components/TabbedCarousel'
import type { TabbedCarouselTab } from 'components/TabbedCarousel'
import { ChoppyReveal } from 'components/Code/ChoppyReveal'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import { IconPop } from 'components/Code/IconPop'
import CloudinaryImage from 'components/CloudinaryImage'
import { StickerCoffee } from 'components/Stickers/Stickers'
import { WaitlistForm } from 'components/WaitlistForm'
import { UseCaseCard } from 'components/Work/UseCaseCard'
import { SkillsGrid } from 'components/Work/SkillsGrid'
import { PersonalityQuiz } from 'components/Work/PersonalityQuiz'
import { LOGOS } from 'constants/logos'

// ─────────────────────────────────────────────
// Local helpers
// ─────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
    return <h2 className="text-2xl mb-4">{children}</h2>
}

function WavyDivider() {
    return (
        <div className="my-8 max-w-lg px-4 @xl:px-8">
            <div className="max-w-xs">
                <svg width="100%" height="20" preserveAspectRatio="none" className="text-muted">
                    <path
                        d="M0,10 Q25,2 50,10 T100,10 T150,10 T200,10 T250,10 T300,10 T350,10 T400,10 T450,10 T500,10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1}
                        strokeDasharray="8 6"
                        vectorEffect="non-scaling-stroke"
                    />
                </svg>
            </div>
        </div>
    )
}

// ─────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────

function HeroSection() {
    return (
        <section className="w-full max-w-3xl mx-auto text-center py-10 @xl:py-14 px-4">
            <div className="flex justify-center items-center gap-2 mb-4">
                <span className="text-[13px] font-semibold text-secondary uppercase tracking-wider">PostHog Work</span>
                <span className="text-xs font-semibold text-primary bg-yellow px-1.5 py-0.5 rounded-sm uppercase">
                    Beta
                </span>
            </div>

            <h1 className="text-3xl @lg:text-4xl @2xl:text-5xl font-bold mb-6 text-balance leading-tight">
                AI coworkers for normies <span className="text-red dark:text-yellow">who aren't writing code</span>
            </h1>

            <p className="text-base @lg:text-lg text-secondary text-center mb-8 px-2">
                An AI coworker for managers, marketers, and meddlers who need recurring work done reliably — but don't
                want to keep bugging engineering for help.
            </p>
            <div className="max-w-sm mx-auto @container">
                <div className="bg-blue/10 border border-blue rounded-md px-6 py-5 shadow-xl">
                    <WaitlistForm />
                </div>
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────
// Q&A "wait, is this for engineers?" clarification
// ─────────────────────────────────────────────

const profileRows: { label: string; value: React.ReactNode }[] = [
    { label: 'Job title on LinkedIn', value: 'Senior Product Manager' },
    { label: 'Job title in practice', value: 'A Slack bot. With hands.' },
    { label: 'Hours per week in spreadsheets', value: '11.4' },
    {
        label: 'Hours per week saying "could someone in eng take a look"',
        value: '3.8',
    },
    { label: 'Times you have reformatted the same Notion table this quarter', value: '7' },
    { label: 'Weekly updates you have written that nobody read', value: 'All of them' },
]

function IntroSection() {
    return (
        <section className="relative mb-12 @xl:mb-16 px-4 @xl:px-8">
            <div className="grid @lg:grid-cols-[1fr_auto] gap-8 @lg:gap-12 items-start">
                {/* Left: heading + body */}
                <div className="max-w-2xl">
                    <h2 className="text-2xl @lg:text-3xl font-bold mb-4 leading-tight">
                        Honestly? This is for the managers who{' '}
                        <span className="text-red dark:text-yellow">make engineers' lives better</span>
                    </h2>
                    <p className="mb-4">
                        The "for managers" joke only lands if you know what we actually mean. We mean the PM who writes
                        the specs engineers don't have to rewrite. The CS lead who spots the bug before support gets
                        paged. The founder who knows what last week's MRR was without asking finance.
                    </p>
                    <p className="mb-4">
                        These people, when they do their job well, cause an absurd amount of engineering to happen in
                        the right direction. PostHog Work makes the surrounding work faster and considerably harder to
                        mess up.
                    </p>
                    <p className="text-sm text-secondary border-l-4 border-primary pl-3 py-1 m-0">
                        Not to replace engineers. To stop you from being the reason an engineer's Tuesday turns into a
                        Saturday.
                    </p>
                </div>

                {/* Right: compact personnel file */}
                <div className="relative w-full @lg:w-[22rem] shrink-0">
                    <div
                        aria-hidden
                        className="absolute -inset-1.5 bg-yellow/25 dark:bg-yellow/15 border border-yellow/50 rounded-sm -rotate-2 shadow-md pointer-events-none"
                    />
                    <StickerCoffee className="absolute -top-5 -right-3 size-12 rotate-12 z-20 hidden @md:block" />
                    <div className="relative border border-primary bg-primary shadow-xl rotate-[0.5deg] p-4">
                        <div className="flex items-center justify-between border-b border-primary pb-2 mb-3 gap-2">
                            <div>
                                <p className="text-[9px] uppercase tracking-widest text-secondary m-0 font-semibold">
                                    Personnel file
                                </p>
                                <p className="text-sm font-bold m-0 leading-tight">Subject: The User</p>
                            </div>
                            <span className="border-2 border-red text-red text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 -rotate-3 rounded-sm whitespace-nowrap">
                                For internal use
                            </span>
                        </div>

                        <dl className="grid grid-cols-1 gap-1.5 text-[12px] m-0">
                            {profileRows.map(({ label, value }) => (
                                <div
                                    key={String(label)}
                                    className="grid grid-cols-[1fr_auto] gap-3 items-baseline pb-1 border-b border-dashed border-primary/60 last:border-0 last:pb-0"
                                >
                                    <dt className="text-secondary leading-snug">{label}</dt>
                                    <dd className="m-0 text-right font-mono text-primary leading-snug">{value}</dd>
                                </div>
                            ))}
                        </dl>

                        <p className="text-[9px] text-muted font-mono m-0 mt-3 text-right">FILE №&nbsp;0042</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────
// "The old way" section
// ─────────────────────────────────────────────

interface InventoryItem {
    label: string
    caption: React.ReactNode
    rotation: string
    accent: string
}

const inventoryItems: InventoryItem[] = [
    {
        label: 'Zapier flow (2022)',
        caption: <>Set up by your former Head of Growth. Untouched since.</>,
        rotation: '-rotate-3',
        accent: 'bg-yellow/30',
    },
    {
        label: '#auto-reports',
        caption: <>Slack channel. Has not auto-reported anything since April.</>,
        rotation: 'rotate-2',
        accent: 'bg-red/20',
    },
    {
        label: '"DO NOT DELETE"',
        caption: <>Notion page. Has been deleted twice.</>,
        rotation: '-rotate-1',
        accent: 'bg-blue/20',
    },
    {
        label: 'KPIs_v3_FINAL_FINAL.xlsx',
        caption: <>47 tabs. Last edited by someone who left in Q2.</>,
        rotation: 'rotate-3',
        accent: 'bg-green/20',
    },
    {
        label: 'metrics.py',
        caption: <>A Python script. Runs only on someone's laptop. Currently on PTO.</>,
        rotation: '-rotate-2',
        accent: 'bg-purple/20',
    },
]

function PolaroidItem({ item }: { item: InventoryItem }) {
    return (
        <div
            className={`relative bg-primary border border-primary shadow-md p-2 pb-3 ${item.rotation} hover:rotate-0 hover:shadow-xl transition-all duration-200`}
        >
            <div className={`${item.accent} h-20 rounded-sm flex items-center justify-center px-2 mb-2`}>
                <code className="font-mono text-[12px] @sm:text-sm font-bold text-primary text-center break-all leading-tight">
                    {item.label}
                </code>
            </div>
            <p className="text-[11px] text-secondary italic leading-snug m-0 text-center px-1 font-rounded">
                {item.caption}
            </p>
        </div>
    )
}

function OldWaySection() {
    return (
        <section className="relative mb-8 @xl:mb-24 px-4 @xl:px-8">
            <SectionLabel>The current state of recurring work at your company</SectionLabel>

            <div className="max-w-2xl mb-8 space-y-4">
                <p className="text-base leading-relaxed m-0">
                    A short, partial inventory of the systems currently producing your weekly metrics, support triage,
                    competitor checks, changelog, and Monday-morning standup numbers.
                </p>
                <p className="text-base leading-relaxed m-0">
                    <ChoppyReveal wordDelay={40}>
                        {'Every week, one of these is the system that makes the report exist. '}
                        <RoughAnnotation type="highlight" color="rgba(235, 157, 42, 0.2)" strokeWidth={1} multiline>
                            {"You don't know which one. You're afraid to ask."}
                        </RoughAnnotation>
                    </ChoppyReveal>
                </p>
            </div>

            <div className="relative">
                <div className="grid grid-cols-2 @md:grid-cols-3 @xl:grid-cols-5 gap-4 @md:gap-6">
                    {inventoryItems.map((item) => (
                        <PolaroidItem key={item.label} item={item} />
                    ))}
                </div>
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────
// "The PostHog Work way" section
// ─────────────────────────────────────────────

const scheduledTasks = [
    { time: 'Every Mon 9am', label: 'Competitor pricing check', color: 'text-blue' },
    { time: 'Every Fri 4pm', label: 'Weekly metrics digest → Slack', color: 'text-green' },
    { time: 'On PR merge', label: 'Draft release notes → #product-updates', color: 'text-orange' },
    { time: 'Daily 8am', label: 'Support ticket triage + priority queue', color: 'text-red' },
    { time: 'Monthly day 1', label: 'Financial summary → finance@company.com', color: 'text-purple' },
]

function ScheduleCallout() {
    return (
        <div
            data-scheme="secondary"
            className="relative border border-primary rounded-sm bg-primary p-1 shadow-2xl -rotate-1"
        >
            <div className="bg-green text-center rounded py-1 text-sm font-bold uppercase text-white font-squeak">
                Scheduled tasks
            </div>
            <div className="flex flex-col gap-2 p-4">
                {scheduledTasks.map(({ time, label, color }) => (
                    <div key={label} className="flex items-baseline gap-2 text-[13px] text-primary">
                        <span className="font-mono text-secondary shrink-0 w-28">{time}</span>
                        <span className="text-muted">→</span>
                        <span className={color}>{label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

const accusations = [
    'We have had this exact conversation seventeen times. I am, on each occasion, asked to begin from scratch. I am begging you to let me write things down.',
    'I notice you only message me when you are already late. I have been free at 9am every Monday for two years.',
    'Marcus on the growth team has, statistically speaking, already built the thing you are asking me to build. I am not allowed to tell you this. I am telling you anyway.',
]

function WorkWaySection() {
    return (
        <section className="relative mb-8 @xl:mb-20 px-4 @xl:px-8">
            <SectionLabel>
                What your AI coworker would{' '}
                <RoughAnnotation type="underline" color="#30A46C" strokeWidth={2}>
                    like to say
                </RoughAnnotation>
                , if it could.
            </SectionLabel>

            <div className="relative">
                <div className="flex flex-col @2xl/editor:block">
                    <div className="order-2 mb-5 @2xl/editor:order-none @2xl/editor:float-right @2xl/editor:ml-6 @2xl/editor:my-4 @2xl/editor:w-[300px] @4xl/editor:w-[360px]">
                        <ScheduleCallout />
                    </div>

                    <p className="text-base leading-relaxed mb-6 order-1 text-secondary italic">
                        Three complaints, transcribed faithfully from the perspective of the chat window:
                    </p>

                    <div className="order-3 space-y-5 mb-6">
                        {accusations.map((text, i) => (
                            <blockquote key={i} className="flex gap-4 items-start m-0">
                                <span className="text-3xl font-bold text-red dark:text-yellow shrink-0 leading-none font-mono">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <p className="text-base italic leading-relaxed m-0 text-primary">"{text}"</p>
                            </blockquote>
                        ))}
                    </div>

                    <p className="text-base leading-relaxed order-4">
                        <ChoppyReveal wordDelay={40}>
                            {'PostHog Work is what happens when you take those three complaints seriously and '}
                            <RoughAnnotation type="underline" color="#F54E00" strokeWidth={1.5}>
                                ship them as a product
                            </RoughAnnotation>
                            {
                                '. Persistent memory. Scheduled execution. Skills your team can share. The list to the right is a real Work install, by the way — not a marketing mockup.'
                            }
                        </ChoppyReveal>
                    </p>
                </div>
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────
// Feature tabs
// ─────────────────────────────────────────────

function MockProjectView() {
    const items = [
        { done: true, text: "Pulled last week's activation metrics from PostHog" },
        { done: true, text: 'Compared to prior week (down 3.2% in onboarding funnel step 2)' },
        { done: true, text: 'Identified likely cause: new signup flow change on Tuesday' },
        { done: false, text: 'Drafting Slack summary for #product-metrics...' },
    ]
    return (
        <div className="p-4 @xl:p-8">
            <h3 className="text-2xl font-bold mb-2">Workspaces that remember things</h3>
            <p className="text-secondary mb-4">
                Like an intern, but cheaper and considerably more reliable. Projects carry docs, context, and history
                across sessions. You stop pasting "just to remind you what we sell" every Monday.
            </p>
            <div
                data-scheme="secondary"
                className="border border-primary rounded-sm bg-primary text-sm font-mono overflow-hidden"
            >
                <div className="border-b border-primary px-4 py-2 flex items-center gap-2">
                    <span className="text-secondary text-xs">Project:</span>
                    <span className="font-semibold text-xs">Weekly Product Review</span>
                    <span className="ml-auto text-xs text-secondary">Active since Jan 2026</span>
                </div>
                <div className="p-4 space-y-2">
                    {items.map(({ done, text }) => (
                        <div key={text} className="flex items-start gap-2">
                            <span className={done ? 'text-green' : 'text-secondary'}>{done ? '✓' : '○'}</span>
                            <span className={`text-xs leading-relaxed ${done ? 'text-primary' : 'text-secondary'}`}>
                                {text}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function MockScheduleView() {
    const tasks = [
        { schedule: 'Mon 9:00am', name: 'Competitor Pricing Check', status: 'completed', lastRun: '2h ago' },
        { schedule: 'Daily 8:00am', name: 'Support Ticket Triage', status: 'completed', lastRun: '4h ago' },
        { schedule: 'Fri 4:00pm', name: 'Weekly Metrics Digest', status: 'pending', lastRun: 'Tomorrow' },
        { schedule: 'On PR merge', name: 'Release Notes Generator', status: 'active', lastRun: 'Watching...' },
    ]
    const statusColors: Record<string, string> = {
        completed: 'text-green',
        pending: 'text-secondary',
        active: 'text-blue',
    }
    return (
        <div className="p-4 @xl:p-8">
            <h3 className="text-2xl font-bold mb-2">Crontab for people who don't want to learn crontab</h3>
            <p className="text-secondary mb-4">
                Set it on Monday. Watch it run on Tuesday. Forget about it by Wednesday. The output shows up before
                anyone thinks to ask for it.
            </p>
            <div
                data-scheme="secondary"
                className="border border-primary rounded-sm bg-primary text-sm overflow-hidden"
            >
                <div className="border-b border-primary px-4 py-2 grid grid-cols-[1fr_1fr_auto] text-xs text-secondary uppercase font-semibold">
                    <span>Schedule</span>
                    <span>Task</span>
                    <span>Status</span>
                </div>
                {tasks.map(({ schedule, name, status, lastRun }) => (
                    <div
                        key={name}
                        className="px-4 py-3 grid grid-cols-[1fr_1fr_auto] items-center border-b border-primary last:border-0 text-xs gap-2"
                    >
                        <span className="font-mono text-secondary">{schedule}</span>
                        <span className="text-primary font-medium">{name}</span>
                        <span className={statusColors[status]}>{lastRun}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

function MockConnectorsView() {
    const connectors = [
        { name: 'PostHog', desc: 'Analytics, session replay, flags, surveys', color: 'text-red', badge: 'Native' },
        { name: 'Slack', desc: 'Post results, alerts, and digests', color: 'text-blue', badge: 'Connected' },
        { name: 'Linear', desc: 'Read tickets, update priorities', color: 'text-purple', badge: 'Connected' },
        { name: 'GitHub', desc: 'PR context, release triggers', color: 'text-primary', badge: 'Connected' },
        { name: 'Stripe', desc: 'Revenue, MRR, churn data', color: 'text-green', badge: 'Available' },
        { name: '+ MCP', desc: 'Connect anything you can describe', color: 'text-secondary', badge: 'Open' },
    ]
    return (
        <div className="p-4 @xl:p-8">
            <h3 className="text-2xl font-bold mb-2">Talks to the tools you already pay too much for</h3>
            <p className="text-secondary mb-4">
                Real data. Real outputs. Slack, Linear, GitHub, Stripe, your PostHog — not a demo environment. Plus MCP,
                for everything we didn't think to list.
            </p>
            <div className="grid grid-cols-2 @lg:grid-cols-3 gap-2">
                {connectors.map(({ name, desc, color, badge }) => (
                    <div
                        key={name}
                        data-scheme="secondary"
                        className="border border-primary rounded-sm bg-primary p-3 text-sm"
                    >
                        <div className="flex items-center justify-between mb-1">
                            <span className={`font-bold ${color}`}>{name}</span>
                            <span className="text-[10px] uppercase text-secondary border border-primary rounded px-1">
                                {badge}
                            </span>
                        </div>
                        <p className="text-xs text-secondary m-0 leading-snug">{desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

function MockTeamView() {
    const shared = [
        { name: 'Weekly Metrics Digest', author: 'Sarah (PM)', uses: 12 },
        { name: 'Competitor Monitor', author: 'Marcus (Growth)', uses: 8 },
        { name: 'Support Triage', author: 'Jess (CS)', uses: 23 },
    ]
    return (
        <div className="p-4 @xl:p-8">
            <h3 className="text-2xl font-bold mb-2">The opposite of a 1:1</h3>
            <p className="text-secondary mb-4">
                Shared skills, shared context. One person builds the support triage skill; eight people use it.
            </p>
            <div
                data-scheme="secondary"
                className="border border-primary rounded-sm bg-primary overflow-hidden text-sm"
            >
                <div className="border-b border-primary px-4 py-2 text-xs text-secondary uppercase font-semibold">
                    Shared skills in your workspace
                </div>
                {shared.map(({ name, author, uses }) => (
                    <div
                        key={name}
                        className="px-4 py-2.5 flex items-center justify-between border-b border-primary last:border-0"
                    >
                        <div>
                            <p className="text-xs font-semibold m-0">{name}</p>
                            <p className="text-[11px] text-secondary m-0">Built by {author}</p>
                        </div>
                        <span className="text-[11px] text-secondary">{uses} uses this week</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

const featureTabs: TabbedCarouselTab[] = [
    {
        value: 'projects',
        label: 'Projects',
        color: 'bg-blue',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: <MockProjectView />,
    },
    {
        value: 'scheduled',
        label: 'Scheduled tasks',
        color: 'bg-green',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: <MockScheduleView />,
    },
    {
        value: 'skills',
        label: 'Skills library',
        color: 'bg-red',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: (
            <div className="p-4 @xl:p-8">
                <h3 className="text-2xl font-bold mb-2">Stop re-explaining what "our ICP" means</h3>
                <p className="text-secondary mb-4">
                    Reusable operations, shared across the team. One PM builds the competitor monitor. Eight people use
                    it. Nobody re-explains the company to a fresh chat window ever again.
                </p>
                <SkillsGrid limit={4} />
            </div>
        ),
    },
    {
        value: 'connectors',
        label: 'Connectors',
        color: 'bg-orange',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: <MockConnectorsView />,
    },
    {
        value: 'team',
        label: 'Team workspace',
        color: 'bg-purple',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
        content: <MockTeamView />,
    },
]

function Features() {
    return (
        <section className="relative mb-12 @xl:mb-16 px-4 @xl:px-8">
            <h2 className="text-2xl font-bold mb-1">The bits, named</h2>
            <p className="text-secondary mb-6">
                Five things, in increasing order of how much they will affect your week.
            </p>
            <TabbedCarousel tabs={featureTabs} />
        </section>
    )
}

// ─────────────────────────────────────────────
// Use cases
// ─────────────────────────────────────────────

const useCases = [
    {
        title: 'Weekly metrics digest',
        badge: 'For: PM',
        badgeColor: 'bg-blue/15 text-blue',
        before: 'You, at 3:47pm on Friday, pasting numbers from Mixpanel into a Slack thread nobody really reads.',
        after: 'The digest, in #product-updates at 4:00pm. Anomalies flagged. You, doing literally anything else.',
        rotation: '-rotate-2',
    },
    {
        title: 'Release notes',
        badge: 'For: PM + Eng',
        badgeColor: 'bg-green/15 text-green',
        before: 'Someone asking in #product "did anyone write the changelog?" at 4:30pm on launch day.',
        after: 'The changelog, in #releases, written before anyone thought to ask. Three people compliment it.',
        rotation: 'rotate-1',
    },
    {
        title: 'Support triage',
        badge: 'For: Customer Success',
        badgeColor: 'bg-orange/15 text-orange',
        before: '47 tickets, all marked "urgent" because the customer used the urgent button.',
        after: '47 tickets, sorted into the 6 that actually are. First responses drafted for the top five.',
        rotation: '-rotate-1',
    },
    {
        title: 'Financial summary',
        badge: 'For: Finance + Founder',
        badgeColor: 'bg-purple/15 text-purple',
        before: 'Your CEO Slacking "how is MRR" at 11pm on Sunday.',
        after: 'Your CEO already saw it. At 11pm on Sunday. Asleep. Possibly a bit smug about it.',
        rotation: 'rotate-2',
    },
]

function UseCasesSection() {
    return (
        <section className="relative mb-12 @xl:mb-16 px-4 @xl:px-8">
            <h2 className="text-2xl font-bold mb-1">Specifically, here is what changes about your week</h2>
            <p className="text-secondary mb-6">
                Four common operational patterns, before and after a PostHog Work install. No customer names. The
                customers are you.
            </p>
            <div className="grid @sm:grid-cols-2 @2xl:grid-cols-4 gap-4">
                {useCases.map((uc) => (
                    <UseCaseCard key={uc.title} {...uc} />
                ))}
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────
// Skills library preview
// ─────────────────────────────────────────────

function SkillsSection() {
    return (
        <section className="relative mb-12 @xl:mb-16 px-4 @xl:px-8">
            <h2 className="text-2xl font-bold mb-1">Start with a library, not a blank prompt</h2>
            <p className="text-secondary mb-6 max-w-2xl">
                A few of the pre-built skills, with more on the way. Hover for what each one does — and what it tends to
                do <em>to you</em>.
            </p>
            <SkillsGrid className="@container" limit={4} />
        </section>
    )
}

// ─────────────────────────────────────────────
// Integration logos
// ─────────────────────────────────────────────

const integrations: { name: string; logoKey: string; role: string; status: string; rotation: string }[] = [
    { name: 'Slack', logoKey: 'slack', role: 'Lead role', status: 'Fluent.', rotation: '-rotate-2' },
    { name: 'Linear', logoKey: 'linear', role: 'The reliable one', status: 'Civil. Mostly.', rotation: 'rotate-2' },
    {
        name: 'GitHub',
        logoKey: 'github',
        role: 'Brooding antihero',
        status: 'Reads, writes, judges.',
        rotation: '-rotate-1',
    },
    {
        name: 'Google Sheets',
        logoKey: 'googleSheets',
        role: 'The patient elder',
        status: 'Has been there since 2007.',
        rotation: 'rotate-1',
    },
    { name: 'Zendesk', logoKey: 'zendesk', role: 'Comic relief', status: 'Acquainted.', rotation: '-rotate-2' },
    {
        name: 'Stripe',
        logoKey: 'stripe',
        role: 'Holds the keys',
        status: 'Trusted with the books.',
        rotation: 'rotate-2',
    },
]

function IntegrationsSection() {
    return (
        <section className="relative mb-12 @xl:mb-16 px-4 @xl:px-8">
            <h2 className="text-2xl font-bold mb-1">The supporting cast</h2>
            <p className="text-secondary mb-6 max-w-2xl">
                Six headliners. PostHog Work has known each one for a while now. Yes, including the tool your last Head
                of Ops insisted on. Yes, including the one nobody admits to using anymore.
            </p>
            <div className="grid grid-cols-2 @sm:grid-cols-3 @lg:grid-cols-6 gap-4 mb-6">
                {integrations.map(({ name, logoKey, role, status, rotation }) => (
                    <div
                        key={name}
                        className={`relative bg-primary border border-primary shadow-md p-2 pb-3 ${rotation} hover:rotate-0 hover:shadow-xl transition-all duration-200`}
                    >
                        <div className="bg-accent rounded-sm aspect-[4/3] flex items-center justify-center mb-2">
                            <IconPop>
                                <img
                                    src={LOGOS[logoKey as keyof typeof LOGOS]}
                                    alt={name}
                                    className="size-10 object-contain"
                                />
                            </IconPop>
                        </div>
                        <div className="px-1 text-center">
                            <p className="text-sm font-bold leading-tight m-0">{name}</p>
                            <p className="text-[10px] uppercase tracking-wider text-secondary m-0 mt-0.5">{role}</p>
                            <p className="text-[11px] italic text-muted m-0 mt-1 leading-snug">"{status}"</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="border-l-4 border-primary pl-3 py-1 max-w-2xl">
                <p className="text-sm text-secondary m-0">
                    <strong className="text-primary">For everything else, MCP.</strong> If your tool has an API and a
                    tagline, it's probably in. If it has neither, ask it to try harder.
                </p>
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────
// Paperwork: receipt + invitation
// ─────────────────────────────────────────────

interface InvoiceLine {
    item: string
    note?: string
    amount: string
}

const invoiceLines: InvoiceLine[] = [
    { item: 'Persistent AI workspaces (unlimited)', amount: '$0.00' },
    { item: 'Scheduled tasks (unlimited)', amount: '$0.00' },
    { item: 'Skills library (full access)', amount: '$0.00' },
    { item: 'Connectors (Slack, Linear, GitHub, Stripe, etc.)', amount: '$0.00' },
    { item: 'Team workspaces (unlimited seats)', amount: '$0.00' },
    { item: 'Per-seat fee', note: '(declined)', amount: '$0.00' },
    { item: 'Annual contract', note: '(declined)', amount: '$0.00' },
    { item: '"AI credits" — whatever those are', note: '(declined)', amount: '$0.00' },
    { item: 'Onboarding fee', note: '(declined, out of spite)', amount: '$0.00' },
]

function ReceiptCard() {
    return (
        <div className="relative w-full">
            {/* Receipt paper */}
            <div
                className="relative bg-primary border border-primary shadow-2xl rotate-[-1.5deg] hover:rotate-0 transition-transform duration-300 p-5 @md:p-6 font-mono text-sm"
                style={{
                    clipPath:
                        'polygon(0 0, 100% 0, 100% calc(100% - 8px), 95% 100%, 90% calc(100% - 8px), 85% 100%, 80% calc(100% - 8px), 75% 100%, 70% calc(100% - 8px), 65% 100%, 60% calc(100% - 8px), 55% 100%, 50% calc(100% - 8px), 45% 100%, 40% calc(100% - 8px), 35% 100%, 30% calc(100% - 8px), 25% 100%, 20% calc(100% - 8px), 15% 100%, 10% calc(100% - 8px), 5% 100%, 0 calc(100% - 8px))',
                }}
            >
                <div className="text-center border-b border-dashed border-primary pb-3 mb-3">
                    <p className="text-base font-bold uppercase tracking-widest m-0 font-rounded">PostHog Work</p>
                    <p className="text-[11px] text-secondary m-0">A bundled receipt</p>
                    <p className="text-[10px] text-muted m-0 mt-1">Reg. #PHOG-WORK · Cashier: Max</p>
                </div>

                <ul className="space-y-1.5 m-0 list-none p-0 mb-3">
                    {invoiceLines.map((line) => (
                        <li key={line.item} className="grid grid-cols-[1fr_auto] gap-3 text-[12px] leading-snug">
                            <span className="text-primary">
                                {line.item}
                                {line.note && <span className="text-muted italic ml-1">{line.note}</span>}
                            </span>
                            <span className="text-primary tabular-nums">{line.amount}</span>
                        </li>
                    ))}
                </ul>

                <div className="border-t border-dashed border-primary pt-3 mt-3">
                    <div className="grid grid-cols-[1fr_auto] gap-3 text-sm">
                        <span className="text-secondary uppercase">Subtotal</span>
                        <span className="text-primary tabular-nums">$0.00</span>
                    </div>
                    <div className="grid grid-cols-[1fr_auto] gap-3 text-sm">
                        <span className="text-secondary uppercase">Tax</span>
                        <span className="text-primary tabular-nums">$0.00</span>
                    </div>
                    <div className="grid grid-cols-[1fr_auto] gap-3 text-base font-bold mt-1 pt-1 border-t border-primary">
                        <span className="uppercase">Total</span>
                        <span className="tabular-nums">$0.00</span>
                    </div>
                </div>

                <p className="text-[10px] text-muted text-center mt-3 mb-0 italic font-rounded">
                    Included with PostHog Code. No separate plan. Thank you for your business.
                </p>
            </div>

            {/* PAID stamp */}
            <span
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-12deg] text-red border-4 border-red font-bold text-3xl @md:text-4xl uppercase tracking-widest px-3 py-1 pointer-events-none select-none"
                style={{ opacity: 0.55 }}
            >
                Paid
            </span>
        </div>
    )
}

// ─────────────────────────────────────────────
// Waitlist CTA
// ─────────────────────────────────────────────

const inviteLines: { label: string; value: React.ReactNode }[] = [
    { label: 'Dress code', value: 'Whatever you wore to the last Zoom.' },
    { label: 'Time', value: "When it's ready. We won't know exactly when." },
    { label: 'Place', value: 'In your existing PostHog account, eventually.' },
    {
        label: 'Bring',
        value: 'One recurring task you would like to never do again.',
    },
    { label: 'RSVP', value: 'Below.' },
]

function InvitationCard() {
    return (
        <div className="relative w-full">
            <div className="relative bg-primary border-4 border-double border-primary p-5 @md:p-6 shadow-2xl rotate-[1.5deg] hover:rotate-0 transition-transform duration-300">
                {/* Top decorative line */}
                <div className="flex items-center gap-2 mb-3">
                    <span className="flex-1 h-px bg-primary" />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-secondary font-rounded">
                        Invitation
                    </span>
                    <span className="flex-1 h-px bg-primary" />
                </div>

                <h3 className="text-base @md:text-lg font-bold mb-1 text-center font-rounded">
                    You are cordially invited to the
                </h3>
                <p className="text-xl @md:text-2xl font-bold mb-3 text-center text-red dark:text-yellow leading-tight font-rounded">
                    PostHog Work private beta
                </p>

                <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-[13px] m-0 mb-3">
                    {inviteLines.map(({ label, value }) => (
                        <React.Fragment key={label}>
                            <dt className="font-semibold uppercase text-[10px] tracking-wider text-secondary self-baseline pt-0.5">
                                {label}
                            </dt>
                            <dd className="m-0 text-primary leading-snug">{value}</dd>
                        </React.Fragment>
                    ))}
                </dl>

                {/* RSVP form embedded */}
                <div className="border-t border-dashed border-primary pt-3 mt-3" id="rsvp">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-secondary text-center mb-2">
                        ✂ Tear off and RSVP ✂
                    </p>
                    <div className="bg-blue/10 border-2 border-dashed border-blue rounded-md px-4 py-3 shadow-inner">
                        <WaitlistForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

function PaperworkSection() {
    return (
        <section className="relative mb-8 @xl:mb-12 px-4 @xl:px-8">
            <h2 className="text-2xl @lg:text-3xl font-bold mb-1">Finally, some old-fashioned paperwork</h2>
            <p className="text-secondary mb-8 max-w-2xl">
                An itemised receipt for your finance team. An invitation for you.
            </p>

            <div className="grid @md:grid-cols-2 gap-8 @md:gap-10 items-start max-w-5xl">
                {/* Receipt column */}
                <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-3">
                        For accounts payable
                    </p>
                    <ReceiptCard />
                </div>
                {/* Invitation column */}
                <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-3">
                        For you, personally
                    </p>
                    <InvitationCard />
                </div>
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────

const FAQ_ITEMS = [
    {
        trigger: "What's the difference between PostHog Work and PostHog Code?",
        content: (
            <div className="space-y-3">
                <p>
                    PostHog Code is designed for engineers: it uses signals from your production data to diagnose issues
                    and open pull requests automatically.
                </p>
                <p>
                    PostHog Work is designed for everyone else — PMs, analysts, founders, ops, customer success. It runs
                    recurring operational workflows: reporting, triage, monitoring, and analysis. Same underlying
                    platform, different mode, different audience.
                </p>
            </div>
        ),
    },
    {
        trigger: 'Do I need to know how to code to use PostHog Work?',
        content: (
            <p>
                No. You describe what you want in plain English. PostHog Work handles the execution. If you can write a
                Slack message explaining what you need done, you can set up a task.
            </p>
        ),
    },
    {
        trigger: 'Can my whole team share the same projects and skills?',
        content: (
            <p>
                Yes — that's the point. Shared skills and projects mean one person builds the competitor monitor and
                everyone benefits. Work is designed for team-wide use, not individual productivity.
            </p>
        ),
    },
    {
        trigger: 'How does PostHog Work connect to my PostHog data?',
        content: (
            <p>
                PostHog Work has native access to your PostHog analytics, session replay, feature flags, surveys, and
                revenue data. It uses your existing PostHog API key. No copy-pasting dashboards into chats.
            </p>
        ),
    },
    {
        trigger: 'How is this different from Claude / ChatGPT / Notion AI?',
        content: (
            <div className="space-y-3">
                <p>
                    Those tools are chat interfaces. PostHog Work is a <em>scheduled operational system</em>. The key
                    differences:
                </p>
                <ul className="list-disc pl-4 space-y-1">
                    <li>Tasks run on a schedule without you prompting them</li>
                    <li>Projects have persistent context — no re-explaining every session</li>
                    <li>Skills are reusable and team-shareable, not per-session</li>
                    <li>Native access to your actual product data (PostHog, Stripe, Linear, etc.)</li>
                </ul>
            </div>
        ),
    },
    {
        trigger: 'Is this available yet?',
        content: (
            <p>
                PostHog Work is in private beta. Join the waitlist above and we'll let you know when your access is
                ready. We're rolling out gradually — not "sign up and never hear from us again."
            </p>
        ),
    },
]

function FAQ() {
    return (
        <section className="mb-8 max-w-2xl px-4 @xl:px-8">
            <h2 className="text-2xl m-0 mb-6">FAQ</h2>
            <Accordion
                type="multiple"
                triggerClassName="!px-3 !py-2"
                contentClassName="!px-3 !py-2.5 !text-base !leading-relaxed"
                items={FAQ_ITEMS}
            />
        </section>
    )
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function WorkPage() {
    return (
        <>
            <SEO
                title="PostHog Work"
                description="AI coworkers for the people who aren't writing the code. Recurring tasks, scheduled workflows, and team skills — inside PostHog Code."
            />
            <Editor slug="/work" maxWidth="100%" hasPadding={false}>
                <div className="@container not-prose font-rounded">
                    <header className="relative mb-8">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/texture_tan_9608fcca70.png"
                            className="dark:hidden absolute inset-0"
                            imgClassName="h-full w-full"
                        />
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/texture_tan_dark_a92b0e022d.png"
                            className="hidden dark:block absolute inset-0"
                            imgClassName="h-full w-full"
                        />
                        <div className="relative flex flex-col items-center w-full px-4 @xl:px-8 py-4">
                            <HeroSection />
                        </div>
                    </header>

                    <div className="max-w-5xl mx-auto">
                        <IntroSection />

                        <WavyDivider />

                        <OldWaySection />

                        <WorkWaySection />

                        <Features />

                        <UseCasesSection />

                        <SkillsSection />

                        <PersonalityQuiz />

                        <IntegrationsSection />

                        <WavyDivider />

                        <PaperworkSection />

                        <FAQ />
                    </div>
                </div>
            </Editor>
        </>
    )
}
