import React, { useRef, useState } from 'react'
import SEO from 'components/seo'
import Editor from 'components/Editor'
import { IconPeople } from '@posthog/icons'
import OSButton from 'components/OSButton'
import { CallToAction } from 'components/CallToAction'
import { Accordion } from 'components/RadixUI/Accordion'
import TabbedCarousel from 'components/TabbedCarousel'
import type { TabbedCarouselTab } from 'components/TabbedCarousel'
import { ChoppyReveal } from 'components/Code/ChoppyReveal'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import { IconPop } from 'components/Code/IconPop'
import { DottedConnection } from 'components/Code/DottedConnection'
import CloudinaryImage from 'components/CloudinaryImage'
import Link from 'components/Link'
import { WaitlistForm } from 'components/WaitlistForm'
import { WorkFragmentDiagram } from 'components/Work/WorkFragmentDiagram'
import { UseCaseCard } from 'components/Work/UseCaseCard'
import { SkillsGrid } from 'components/Work/SkillsGrid'
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

            <h1 className="text-3xl @lg:text-4xl @2xl:text-5xl font-bold mb-3 text-balance leading-tight">
                AI coworkers for the people{' '}
                <span className="text-red dark:text-yellow">who aren't writing the code</span>
            </h1>

            <p className="text-base @lg:text-lg text-secondary text-center mb-2 px-2">
                (Which, for the record, is most of your company)
            </p>

            <p className="text-base leading-relaxed text-primary mb-8 max-w-xl mx-auto px-4">
                PostHog Work is a mode inside PostHog Code for PMs, analysts, founders, and ops people who need
                recurring work done reliably — without bugging engineering about it. Schedule tasks. Build reusable
                skills. Stop being the person who copy-pastes things into Notion.
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

const qaRows = [
    { q: 'Is this for non-technical people?', a: 'Yes.' },
    { q: 'Do I need to know how to code?', a: 'No.' },
    { q: 'Will engineers make fun of me for using it?', a: 'Probably.' },
    {
        q: 'Will you care once your reports run themselves?',
        a: 'No.',
    },
    { q: 'Is it the same as PostHog Code?', a: "No, but it's inside it." },
    {
        q: 'Will this replace engineers?',
        a: 'Absolutely not. Engineers build the thing. You run the thing.',
    },
]

function QASection() {
    return (
        <section className="relative mb-12 @xl:mb-16 px-4 @xl:px-8">
            <SectionLabel>But wait — isn't this for engineers?</SectionLabel>
            <p className="mb-4 text-secondary">Fair question. Here's the honest FAQ:</p>
            <div className="inline-grid grid-cols-[1fr_auto] text-sm border border-primary divide-y divide-border dark:divide-border-dark max-w-lg">
                {qaRows.map(({ q, a }) => (
                    <React.Fragment key={q}>
                        <strong className="p-3 border-r border-primary font-medium">{q}</strong>
                        <span className="p-3 text-secondary">{a}</span>
                    </React.Fragment>
                ))}
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────
// "The old way" section
// ─────────────────────────────────────────────

function OldWaySection() {
    const [p1Done, setP1Done] = useState(false)

    return (
        <section className="relative mb-8 @xl:mb-24 px-4 @xl:px-8">
            <SectionLabel>The old way to run a product team</SectionLabel>

            <WorkFragmentDiagram className="mb-5 hidden @xl:block float-right ml-8 w-[320px]" />

            <p className="text-base leading-loose mb-5">
                <ChoppyReveal wordDelay={40} onComplete={() => setP1Done(true)}>
                    {
                        "You've built a beautiful system out of six Slack bots, fourteen Notion templates, and a guy named "
                    }
                    <RoughAnnotation type="underline" color="currentColor" strokeWidth={1.5}>
                        <em>Kevin</em>
                    </RoughAnnotation>
                    {'.'}
                </ChoppyReveal>
            </p>

            <WorkFragmentDiagram className="mb-5 @xl:hidden" />

            <p className="text-base leading-loose">
                <ChoppyReveal wordDelay={40} initialDelay={p1Done ? 0 : 999999}>
                    {
                        'Every week, someone has to write the metrics Slack post. Someone has to check if competitors changed their pricing. Someone has to triage the support queue. Someone has to remember to send the NPS results. '
                    }
                    <RoughAnnotation type="highlight" color="rgba(235, 157, 42, 0.2)" strokeWidth={1} multiline>
                        {'That someone is usually you. Or Kevin.'}
                    </RoughAnnotation>
                </ChoppyReveal>
            </p>
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

function WorkWaySection({ onComplete }: { onComplete?: () => void }) {
    const [p1Done, setP1Done] = useState(false)
    const [p2Done, setP2Done] = useState(false)
    const scheduleBoxRef = useRef<HTMLDivElement>(null)
    const sectionRef = useRef<HTMLDivElement>(null)

    return (
        <section ref={sectionRef} className="relative mb-8 @xl:mb-20 px-4 @xl:px-8">
            <SectionLabel>
                Recurring work,{' '}
                <RoughAnnotation type="underline" color="#30A46C" strokeWidth={2}>
                    actually
                </RoughAnnotation>{' '}
                delegated.
            </SectionLabel>

            <div className="relative">
                <div className="flex flex-col @2xl/editor:block">
                    <div
                        ref={scheduleBoxRef}
                        className="order-2 mb-5 @2xl/editor:order-none @2xl/editor:float-right @2xl/editor:ml-6 @2xl/editor:my-4 @2xl/editor:w-[300px] @4xl/editor:w-[360px]"
                    >
                        <ScheduleCallout />
                    </div>

                    <p className="text-base leading-loose mb-5 order-1">
                        <ChoppyReveal wordDelay={40} onComplete={() => setP1Done(true)}>
                            {'Give your AI coworker a '}
                            <RoughAnnotation
                                type="highlight"
                                color="rgba(48, 164, 108, 0.15)"
                                strokeWidth={1}
                                multiline
                            >
                                <strong>persistent project workspace</strong>
                            </RoughAnnotation>
                            {
                                ' — with docs, context, and history. It remembers what you told it last week. (Unlike some people.)'
                            }
                        </ChoppyReveal>
                    </p>

                    <p className="text-base leading-loose mb-5 order-3">
                        <ChoppyReveal
                            wordDelay={40}
                            initialDelay={p1Done ? 0 : 999999}
                            onComplete={() => setP2Done(true)}
                        >
                            {'Work runs on a '}
                            <RoughAnnotation type="box" color="#2F80FA" strokeWidth={1.5}>
                                <strong>cadence without you asking</strong>
                            </RoughAnnotation>
                            {
                                '. Every Monday. Every morning. Every time a PR merges. You decide the trigger. Work decides how to do it.'
                            }
                        </ChoppyReveal>
                    </p>

                    <p className="text-base leading-loose order-4">
                        <ChoppyReveal wordDelay={40} initialDelay={p2Done ? 0 : 999999} onComplete={onComplete}>
                            {'Build a '}
                            <RoughAnnotation type="underline" color="#F54E00" strokeWidth={1.5}>
                                <strong>skill once</strong>
                            </RoughAnnotation>
                            {
                                ', use it everywhere. Share it with your team. Stop re-explaining the same thing to a chat window.'
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
            <h3 className="text-2xl font-bold mb-2">Persistent project workspaces</h3>
            <p className="text-secondary mb-4">
                Not a chat window that forgets you. Projects carry context, history, and docs across sessions — so your
                AI coworker already knows the backstory.
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
            <h3 className="text-2xl font-bold mb-2">Scheduled tasks</h3>
            <p className="text-secondary mb-4">
                Cron jobs, but the output is useful. Set the schedule on Monday. Get the result every Monday. No nudging
                required.
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
            <h3 className="text-2xl font-bold mb-2">Connectors</h3>
            <p className="text-secondary mb-4">
                Real data. Real outputs. Work connects to the tools your team already uses — not a demo environment.
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
            <h3 className="text-2xl font-bold mb-2">Team workspace</h3>
            <p className="text-secondary mb-4">
                Shared skills. Shared context. One PM builds a competitor monitor — everyone uses it. Your AI coworkers
                know what the whole team has already figured out.
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
                        className="px-4 py-3 flex items-center justify-between border-b border-primary last:border-0"
                    >
                        <div>
                            <p className="text-xs font-semibold m-0">{name}</p>
                            <p className="text-[11px] text-secondary m-0">Built by {author}</p>
                        </div>
                        <span className="text-[11px] text-secondary">{uses} uses this week</span>
                    </div>
                ))}
                <div className="px-4 py-2 text-xs text-secondary text-center bg-accent/50">
                    + 14 more skills in your team library
                </div>
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
                <h3 className="text-2xl font-bold mb-2">Skills library</h3>
                <p className="text-secondary mb-4">
                    Composable, reusable operations — not one-off prompts. Build a skill once and share it with
                    everyone. Or start from a template.
                </p>
                <SkillsGrid />
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
            <h2 className="text-2xl font-bold mb-2">How it works</h2>
            <p className="text-secondary mb-6">
                Projects, schedules, skills, and connectors — the four things that make recurring work actually work.
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
        description: 'Stop writing the Friday update by hand. Your AI coworker already knows the numbers.',
        taskSnippet:
            'Every Friday at 4pm:\nPull key product metrics from PostHog.\nCompare to last week. Flag anomalies.\nPost summary to #product-updates.',
    },
    {
        title: 'Release notes',
        badge: 'For: PM + Eng',
        badgeColor: 'bg-green/15 text-green',
        description: 'Every time main gets a merge, draft release notes before anyone asks.',
        taskSnippet:
            'On every merge to main:\nSummarize PRs by type.\nDraft external-facing changelog.\nPost to #releases.\nEmail to subscribers.',
    },
    {
        title: 'Support ticket triage',
        badge: 'For: Customer Success',
        badgeColor: 'bg-orange/15 text-orange',
        description: 'Read the overnight queue. Draft responses. Escalate the scary ones.',
        taskSnippet:
            'Every morning at 8am:\nRead overnight Intercom tickets.\nCategorize by urgency + type.\nDraft first responses for top 5.\nFlag escalations immediately.',
    },
    {
        title: 'Financial analysis',
        badge: 'For: Finance + Founder',
        badgeColor: 'bg-purple/15 text-purple',
        description: 'Pull the revenue numbers, compare to last month, explain what changed.',
        taskSnippet:
            'First of every month:\nPull Stripe MRR, revenue, churn.\nCompare to prior month.\nSummarize in plain English.\nSend to finance@company.com.',
    },
]

function UseCasesSection() {
    return (
        <section className="relative mb-12 @xl:mb-16 px-4 @xl:px-8">
            <h2 className="text-2xl font-bold mb-1">Obviously it handles your recurring work</h2>
            <p className="text-secondary mb-6">
                Also, some actual examples so you have something to copy into your company Slack.
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
            <p className="text-secondary mb-6">
                Eight pre-built skill templates to get you started. More coming. Hover to see what each one does.
            </p>
            <SkillsGrid className="@container" />
        </section>
    )
}

// ─────────────────────────────────────────────
// Integration logos
// ─────────────────────────────────────────────

const integrations: { name: string; logoKey: string }[] = [
    { name: 'Slack', logoKey: 'slack' },
    { name: 'Linear', logoKey: 'linear' },
    { name: 'GitHub', logoKey: 'github' },
    { name: 'Google Sheets', logoKey: 'googleSheets' },
    { name: 'Zendesk', logoKey: 'zendesk' },
    { name: 'Stripe', logoKey: 'stripe' },
]

function IntegrationsSection() {
    return (
        <section className="relative mb-12 @xl:mb-16 px-4 @xl:px-8">
            <h2 className="text-2xl font-bold mb-1">Connects to your whole stack</h2>
            <p className="text-secondary mb-6">Native PostHog access. Plus the tools your team already lives in.</p>
            <div className="flex flex-wrap gap-4 items-center mb-4">
                {integrations.map(({ name, logoKey }) => (
                    <div
                        key={name}
                        className="flex items-center gap-2 border border-primary rounded-sm px-3 py-2 text-sm"
                    >
                        <IconPop>
                            <img
                                src={LOGOS[logoKey as keyof typeof LOGOS]}
                                alt={name}
                                className="size-5 object-contain"
                                aria-hidden
                            />
                        </IconPop>
                        <span className="font-medium">{name}</span>
                    </div>
                ))}
            </div>
            <p className="text-sm text-secondary">
                <strong>More via MCP</strong> — connect anything you can describe. If it has an API, Work can use it.
            </p>
        </section>
    )
}

// ─────────────────────────────────────────────
// Story / positioning
// ─────────────────────────────────────────────

function StorySection() {
    return (
        <section className="relative mb-12 @xl:mb-16 bg-accent dark:bg-accent-dark border-y border-primary py-10 px-4 @xl:px-8">
            <div className="max-w-2xl">
                <h2 className="text-2xl @lg:text-3xl font-bold mb-4">
                    Honestly? This is for the managers who{' '}
                    <span className="text-red dark:text-yellow">make engineers' lives better</span>
                </h2>
                <p className="mb-4">
                    The joke about it being "for managers" only lands if you realize what we actually mean: the PM who
                    writes the best specs, the CS lead who knows the product cold, the founder who understands the
                    numbers.
                </p>
                <p className="mb-4">
                    These people do a ton of operational work <em>around</em> engineering — and that work determines
                    whether the team ships the right thing. When that work is done well, engineers aren't interrupted
                    every hour by questions that didn't need to be questions.
                </p>
                <p className="mb-4">
                    PostHog Work makes that surrounding work faster and more reliable. Not to replace engineers — to
                    show up to every sprint planning already having done the homework.
                </p>
                <p className="text-sm text-secondary border-l-4 border-primary pl-3 py-1">
                    Engineers can use it too. We won't tell anyone.
                </p>
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────
// Pricing callout
// ─────────────────────────────────────────────

function PricingSection() {
    return (
        <section className="relative mb-8 @xl:mb-12 px-4 @xl:px-8">
            <div data-scheme="secondary" className="border border-primary rounded-sm bg-primary px-6 py-5 max-w-lg">
                <p className="font-bold text-lg mb-1">PostHog Work is included with PostHog Code.</p>
                <p className="text-secondary text-sm mb-0">
                    No separate plan. No seat fees. No negotiating with your manager about the budget.
                    <br />
                    <em className="text-muted">(Ironic, given who this is for.)</em>
                </p>
            </div>
        </section>
    )
}

// ─────────────────────────────────────────────
// Waitlist CTA
// ─────────────────────────────────────────────

function TLDR() {
    return (
        <section className="relative mb-8 @xl:mb-12 px-4 @xl:px-8">
            <h2 className="text-2xl font-bold mb-1">Join the waitlist</h2>
            <p className="text-secondary mb-4">
                PostHog Work is in private beta. We'll email when it's ready — and you won't have to schedule a reminder
                to check.
            </p>
            <div className="max-w-sm @container">
                <div className="bg-blue/10 border border-blue rounded-md px-6 py-5 shadow-xl">
                    <WaitlistForm />
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
    const [workWayDone, setWorkWayDone] = useState(false)

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
                        <QASection />

                        <WavyDivider />

                        <OldWaySection />

                        <WorkWaySection onComplete={() => setWorkWayDone(true)} />

                        <Features />

                        <UseCasesSection />

                        <SkillsSection />

                        <IntegrationsSection />

                        <StorySection />

                        <WavyDivider />

                        <PricingSection />

                        <TLDR />

                        <FAQ />
                    </div>
                </div>
            </Editor>
        </>
    )
}
