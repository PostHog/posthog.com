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
    return <h2 className="text-2xl @lg:text-3xl font-bold mb-3 leading-tight">{children}</h2>
}

// ─────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────

function HeroSection() {
    return (
        <section className="relative w-full max-w-3xl mx-auto text-center py-10 @xl:py-14 px-4">
            {/* Floating sticker, top-left, hidden on small screens */}
            <div className="inline-flex items-center gap-2 mb-5 px-2 py-1 border border-primary rounded-full bg-primary/60 backdrop-blur-sm">
                <span className="inline-block size-1.5 rounded-full bg-yellow animate-pulse" aria-hidden />
                <span className="text-[11px] font-semibold text-secondary uppercase tracking-[0.2em]">
                    PostHog Work
                </span>
                <span className="text-[10px] font-bold text-primary bg-yellow px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
                    Research preview
                </span>
            </div>

            <h1 className="text-3xl @lg:text-4xl @2xl:text-5xl font-bold mb-6 text-balance leading-tight">
                The AI coworker for normies <span className="text-red dark:text-yellow">who aren't writing code</span>
            </h1>

            <p className="text-base @lg:text-lg text-secondary text-center mb-8 px-2 max-w-xl mx-auto leading-relaxed">
                Work is a new mode in PostHog Code for managers, marketers, and meddlers who need recurring work done —
                but don't want to keep bugging engineers for help.
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
    { label: 'Job title in practice', value: 'Slack bot with hands' },
    { label: 'Hours per week in spreadsheets', value: '11.4' },
    {
        label: 'Weekly "could a dev take a look?" requests',
        value: '5',
    },
    { label: 'Hours spent reformatting Notions pages this quarter', value: '7' },
    { label: 'Updates written that nobody read', value: 'All of them' },
]

function PersonnelFile() {
    return (
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
                            User research
                        </p>
                        <p className="text-sm font-bold m-0 leading-tight">Ideal Customer Persona</p>
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
    )
}

function BriefLabel({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-secondary m-0 mb-5 pb-2 border-b border-primary/40">
            {children}
        </p>
    )
}

function BriefSection() {
    return (
        <section className="relative mb-12 @xl:mb-20 px-4 @xl:px-8">
            <h2 className="text-2xl @lg:text-3xl font-bold mb-3 leading-tight">
                "What's the use-case, and <span className="text-red dark:text-yellow">who is it for?"</span>
            </h2>
            <div className="max-w-2xl mb-12 space-y-3 leading-relaxed">
                <p className="m-0">
                    PostHog Work is for non-technical, engineering-adjacent roles that help ship — PMs, PMMs, designers,
                    ops folks. The people whose work lives everywhere. It gets rid of recurring manual tasks and
                    context-switching.
                </p>
                <p className="m-0">
                    You probably work with problem statements and personas for a living, so here's ours.
                </p>
            </div>

            <div className="grid @lg:grid-cols-[auto_1fr] gap-x-12 @lg:gap-x-16 gap-y-12 items-start">
                {/* The persona */}
                <div className="@lg:max-w-[22rem]">
                    <BriefLabel>The persona</BriefLabel>
                    <div className="@lg:pt-3">
                        <PersonnelFile />
                    </div>
                </div>

                {/* The problems */}
                <div>
                    <BriefLabel>The problems</BriefLabel>
                    <div className="grid grid-cols-2 gap-x-5 gap-y-6 @lg:pt-3">
                        {inventoryItems.map((item) => (
                            <PolaroidItem key={item.label} item={item} />
                        ))}
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
        label: '#auto-reports',
        caption: <>Slack channel. No auto-reports since May.</>,
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
        caption: <>47 tabs. Which one was the right one again?</>,
        rotation: 'rotate-3',
        accent: 'bg-green/20',
    },
    {
        label: 'metrics.py',
        caption: <>Script. Runs on Tim's laptop. Tim is OOO.</>,
        rotation: '-rotate-2',
        accent: 'bg-purple/20',
    },
]

function PolaroidItem({ item }: { item: InventoryItem }) {
    return (
        <div
            className={`relative bg-primary border border-primary shadow-md p-2 pb-3 ${item.rotation} hover:rotate-0 hover:shadow-xl transition-all duration-200 ease-out`}
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

// ─────────────────────────────────────────────
// "The PostHog Work way" section
// ─────────────────────────────────────────────

const scheduledTasks = [
    { time: 'Every Mon 9am', label: 'Competitor changelog check', color: 'text-orange' },
    { time: 'Every Fri 4pm', label: 'Important Slack threads → #weekly-digest', color: 'text-blue' },
    { time: 'Monthly day 1', label: 'Board metrics pack → #finance', color: 'text-teal' },
    { time: 'Monthly day 1', label: 'PMF survey check + power user cohort', color: 'text-red' },
    { time: 'Every morning', label: 'Churn-risk watchlist → #cs', color: 'text-purple' },
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
    'We have had this conversation seventeen times. You keep asking me to begin from scratch. I am begging you to let me automate this.',
    'I notice you only message me when you are already late. I have been free at 9am every Monday for two years.',
    'Marcus on the growth team has already built a solution for this. Why not ask him for help instead of bugging me again?',
]

function WorkWaySection() {
    return (
        <section className="relative mb-12 @xl:mb-20 px-4 @xl:px-8">
            <SectionLabel>
                Collaboration even{' '}
                <RoughAnnotation type="underline" color="#30A46C" strokeWidth={2}>
                    we
                </RoughAnnotation>{' '}
                can get behind
            </SectionLabel>

            <div className="relative">
                <div className="flex flex-col @2xl/editor:block">
                    <div className="order-2 mb-5 @2xl/editor:order-none @2xl/editor:float-right @2xl/editor:ml-6 @2xl/editor:my-4 @2xl/editor:w-[300px] @4xl/editor:w-[360px]">
                        <ScheduleCallout />
                    </div>

                    <p className="text-base leading-relaxed mb-6 order-1 text-secondary italic">
                        Tired of copy-pasting Slack comments into ChatGPT?
                        <br />
                        Well, ChatGPT is sick of it too.
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
                            {'PostHog Work is what happens when you '}
                            <RoughAnnotation type="underline" color="#F54E00" strokeWidth={1.5}>
                                take these complaints seriously
                            </RoughAnnotation>
                            {
                                ' and solve them with proper organization, persistent memory, scheduled tasks, and shareable skills.'
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
                across sessions. You stop pasting in the same context five separate times.
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
        { schedule: 'Mon 9:00am', name: 'Competitor Changelog Tracker', status: 'completed', lastRun: '2h ago' },
        { schedule: 'Fri 4:00pm', name: 'Important Slack Threads', status: 'completed', lastRun: '4h ago' },
        { schedule: 'Day 1 monthly', name: 'Board Metrics Pack', status: 'pending', lastRun: 'Tomorrow' },
        { schedule: 'Every morning', name: 'Churn Risk', status: 'active', lastRun: 'Watching...' },
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
                Set it on Monday. Watch it run on Tuesday. Forget about it by Wednesday. Solutions show up before anyone
                thinks to ask.
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
                Real data. Real outputs. Slack, Linear, GitHub, Stripe, PostHog. They all live here now.
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
        { name: 'PMF Tracker', author: 'Sarah (PM)', uses: 12 },
        { name: 'Competitor Changelog Tracker', author: 'Marcus (Growth)', uses: 8 },
        { name: 'Important Slack Threads', author: 'Jess (Ops)', uses: 23 },
    ]
    return (
        <div className="p-4 @xl:p-8">
            <h3 className="text-2xl font-bold mb-2">The opposite of a 1:1</h3>
            <p className="text-secondary mb-4">
                Shared skills, shared context. One person builds the customer review skill; eight people use it.
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
        <section className="relative mb-12 @xl:mb-20 px-4 @xl:px-8">
            <TabbedCarousel tabs={featureTabs} />
        </section>
    )
}

// ─────────────────────────────────────────────
// Use cases
// ─────────────────────────────────────────────

const useCases = [
    {
        title: 'PMF tracker',
        badge: 'For: PMs',
        badgeColor: 'bg-blue/15 text-blue',
        before: 'You, on Monday morning, wondering if anyone actually loves the thing you shipped.',
        after: 'The PMF score sits in a dashboard. The "very disappointed" users are already in a cohort.',
        rotation: '-rotate-2',
    },
    {
        title: 'Define ICP',
        badge: 'For: Founders + PMMs',
        badgeColor: 'bg-green/15 text-green',
        before: 'Three teammates, three different mental models of "our customer".',
        after: 'One ICP file every skill reads from. Including the ones you write next month.',
        rotation: 'rotate-1',
    },
    {
        title: 'Churn risk',
        badge: 'For: Customer Success',
        badgeColor: 'bg-orange/15 text-orange',
        before: 'Renewal call Monday. You find out Friday.',
        after: 'A watchlist in #cs, scored 0–100. Renewal calls stop being ambushes.',
        rotation: '-rotate-1',
    },
    {
        title: 'Board metrics pack',
        badge: 'For: Finance + Founders',
        badgeColor: 'bg-purple/15 text-purple',
        before: 'Your CEO Slacks you "how is MRR" at 11pm on Sunday. Again.',
        after: 'The pack lands in #finance on day 1, every month. Quiet-revenue customers flagged.',
        rotation: 'rotate-2',
    },
]

function UseCasesSection() {
    return (
        <section className="relative mb-12 @xl:mb-20 px-4 @xl:px-8">
            <h2 className="text-2xl @lg:text-3xl font-bold mb-3 leading-tight">
                Specifically, here's what changes about your week
            </h2>
            <p className="text-secondary max-w-2xl mb-8 m-0 leading-relaxed">
                Four common operational patterns — before and after a PostHog Work install.
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
        <section className="relative mb-12 @xl:mb-20 px-4 @xl:px-8">
            <h2 className="text-2xl @lg:text-3xl font-bold mb-3 leading-tight">
                Start with a library, not a blank prompt
            </h2>
            <p className="text-secondary max-w-2xl mb-8 m-0 leading-relaxed">
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
        <section className="relative mb-12 @xl:mb-20 px-4 @xl:px-8">
            <h2 className="text-2xl @lg:text-3xl font-bold mb-3 leading-tight">The supporting cast</h2>
            <p className="text-secondary max-w-2xl mb-8 m-0 leading-relaxed">
                PostHog Work connects with all the tools you already use — including the one your Head of Ops is
                currently obsessed with and paying far too much for.
            </p>
            <div className="grid grid-cols-2 @sm:grid-cols-3 @lg:grid-cols-6 gap-4 mb-6">
                {integrations.map(({ name, logoKey, role, status, rotation }) => (
                    <div
                        key={name}
                        className={`relative bg-primary border border-primary shadow-md p-2 pb-3 ${rotation} hover:rotate-0 hover:shadow-xl transition-all duration-200 ease-out`}
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
                className="relative bg-primary border border-primary shadow-2xl rotate-[-1.5deg] hover:rotate-0 transition-transform duration-300 ease-out p-5 @md:p-6 font-mono text-sm"
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
            <div className="relative bg-primary border-4 border-double border-primary p-5 @md:p-6 shadow-2xl rotate-[1.5deg] hover:rotate-0 transition-transform duration-300 ease-out">
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
                    PostHog Work research preview
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
                <div className="border-t border-dashed border-primary pt-3 mt-3 scroll-mt-24" id="rsvp">
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
        <section className="relative mb-12 @xl:mb-20 px-4 @xl:px-8">
            <h2 className="text-2xl @lg:text-3xl font-bold mb-3 leading-tight">
                Finally, some old-fashioned paperwork
            </h2>
            <p className="text-secondary max-w-2xl mb-8 m-0 leading-relaxed">
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
                    platform, same access to all your product data. Different use-cases and workloads.
                </p>
            </div>
        ),
    },
    {
        trigger: 'Do I need to know how to code to use PostHog Work?',
        content: (
            <p>
                No. You describe what you want in plain English. PostHog Work handles the execution. If you can write a
                Slack message explaining what you need, you can set up a task.
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
                PostHog Work, like PostHog Code, has native access to your PostHog analytics, session replay, feature
                flags, surveys, and revenue data. No copy-pasting dashboards into chats.
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
                PostHog Work is in research preview. Join the waitlist above and we'll let you know when your access is
                ready. We're rolling out gradually — not "sign up and never hear from us again."
            </p>
        ),
    },
]

function FAQ() {
    return (
        <section className="mb-12 max-w-2xl px-4 @xl:px-8">
            <h2 className="text-2xl @lg:text-3xl font-bold m-0 mb-6 leading-tight">FAQ</h2>
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
                        <BriefSection />

                        <WorkWaySection />

                        <Features />

                        <UseCasesSection />

                        <SkillsSection />

                        <PersonalityQuiz />

                        <IntegrationsSection />

                        <PaperworkSection />

                        <FAQ />
                    </div>
                </div>
            </Editor>
        </>
    )
}
