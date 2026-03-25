import React, { useState } from 'react'
import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'
import { Accordion } from 'components/RadixUI/Accordion'
import { RadioGroup } from 'components/RadixUI/RadioGroup'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import CloudinaryImage from 'components/CloudinaryImage'
import {
    IconGitBranch,
    IconBolt,
    IconCode,
    IconCloud,
    IconLaptop,
    IconMagicWand,
    IconListCheck,
    IconSparkles,
} from '@posthog/icons'
import { getLogo, type LogoKey } from 'constants/logos'
import { AutonomousBuildingCapability, CodeCapabilities } from './CodeCapabilities'
import { BuildModePipelineHeader, MaintenanceModePipelineHeader } from './SignalsInboxFlow'

const HOG_HERO = 'https://res.cloudinary.com/dmukukwp6/image/upload/code_hero_image_6feaee4045.png'
const HOG_FAST = 'https://res.cloudinary.com/dmukukwp6/image/upload/Code_fast_97de1bbc27.png'
const HOG_BUILD = 'https://res.cloudinary.com/dmukukwp6/image/upload/Code_build_3e19fb38f5.png'
const CODE_INTEGRATIONS = 'https://res.cloudinary.com/dmukukwp6/image/upload/code_integrations_9862a03308.png'
const HOG_GROUP = 'https://res.cloudinary.com/dmukukwp6/image/upload/Code_group_6585f20d72.png'
const HOG_VIBES = 'https://res.cloudinary.com/dmukukwp6/image/upload/Code_vibes_ec21263650.png'
const HOG_SIGN = 'https://res.cloudinary.com/dmukukwp6/image/upload/Code_sign_77c93a843c.png'

/** Square favicons for “Ask …” CTAs (Google favicon cache, 64px). */
const ASK_AI_FAVICONS = {
    chatgpt: 'https://www.google.com/s2/favicons?domain=chatgpt.com&sz=64',
    claude: 'https://www.google.com/s2/favicons?domain=claude.ai&sz=64',
    gemini: 'https://www.google.com/s2/favicons?domain=gemini.google.com&sz=64',
} as const

/** Matches teams / reader patterns: 12-col grid inside @container/reader-content */
const grid12 = 'grid @lg/reader-content:grid-cols-12 @lg/reader-content:gap-x-10 @lg/reader-content:gap-y-8 gap-y-8'
const span7 = 'col-span-12 @lg/reader-content:col-span-7'
const span5 = 'col-span-12 @lg/reader-content:col-span-5'

/** Body copy rhythm used across PostHog Code marketing sections. */
const bodyComfort = 'text-[15px] leading-relaxed text-secondary'
const hogImageMax = 'w-full max-w-[280px] @lg/reader-content:max-w-[320px]'
const hogInboxShell = 'w-full max-w-60 @md:max-w-64 @lg:max-w-72'

/** Matches inbox lead-in (“AI without context…”) for section eyebrows. */
const sectionLeadIn = 'text-lg font-medium leading-snug text-secondary @md/reader-content:text-xl'

const sectionY = 'py-10 @md/reader-content:py-14'
const sectionBorder = 'border-b border-input'

const HERO_OVERVIEW_LINES: { label: string; Icon: typeof IconBolt }[] = [
    { label: 'Multi-model agent orchestration – use Claude Code and Codex in one place', Icon: IconMagicWand },
    { label: 'Product signals inbox – triage issues and prioritize product work', Icon: IconListCheck },
    { label: 'Agentic development environment – build features as fast as your roadmap', Icon: IconCode },
]

const INBOX_WORK_MODE_LINES: { title: string; description: string; Icon: typeof IconGitBranch }[] = [
    {
        title: 'Worktree',
        description: 'Create a copy of your local project to work in parallel',
        Icon: IconGitBranch,
    },
    {
        title: 'Local',
        description: 'Edits your repo directly on current branch',
        Icon: IconLaptop,
    },
    {
        title: 'Cloud',
        description: 'Runs in isolated sandbox',
        Icon: IconCloud,
    },
]

function HeroOverviewLabel({ label }: { label: string }) {
    const parts = label.split(' – ')
    if (parts.length < 2) {
        return <span className="text-sm font-medium text-primary">{label}</span>
    }

    const [head, ...tailParts] = parts
    const tail = tailParts.join(' – ')

    return (
        <>
            <span className="text-sm font-medium text-primary">{head}</span>
            <span className="text-sm text-secondary"> – {tail}</span>
        </>
    )
}

const Section = ({ id, children, className = '' }: { id: string; children: React.ReactNode; className?: string }) => (
    <section id={id} className={`scroll-mt-20 ${className}`}>
        {children}
    </section>
)

function Hog({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
    return (
        <div className={`flex items-end justify-center ${className}`}>
            <img src={src} alt={alt} className={hogImageMax} loading="lazy" />
        </div>
    )
}

function AskAiCta({ href, label, iconSrc }: { href: string; label: string; iconSrc: string }) {
    return (
        <CallToAction type="secondary" size="md" href={href} externalNoIcon>
            <span className="inline-flex items-center justify-center gap-2">
                <img
                    src={iconSrc}
                    alt=""
                    width={16}
                    height={16}
                    className="size-4 shrink-0 object-contain"
                    loading="lazy"
                />
                {label}
            </span>
        </CallToAction>
    )
}

const MODEL_LOGOS: LogoKey[] = ['cohere', 'mistral', 'azureOpenAI', 'togetherAI', 'deepseek']

const NOT_CARDS: {
    heading: string
    body: string
    link?: { href: string; label: string }
    modelRow?: boolean
    searchPlaceholder?: string
}[] = [
    {
        heading: 'not another dashboard',
        body: 'Skip straight to product analytics that drive code changes—not another dashboard you scroll past instead of shipping.',
        link: { href: '/docs', label: 'Show me dashboarding' },
    },
    {
        heading: 'not a model harness',
        body: 'We are the engine that powers the agent—context in, prioritized work out—not a thin harness on a single model vendor.',
        modelRow: true,
    },
    {
        heading: 'not a one-size fits all',
        body: 'Built for engineers: open source, forkable, and meant to fit how your team ships—not a rigid hosted black box.',
        link: { href: 'https://github.com/PostHog/posthog', label: 'See open source repo' },
        searchPlaceholder: 'Search everything…',
    },
]

const FAQ_ITEMS = [
    {
        trigger: 'Why is PostHog building a code editor?',
        content: (
            <p className="m-0">
                We&apos;re connecting product data to how code ships: an inbox and agent surface grounded in real usage,
                with PRs as the handoff—not a generic IDE replacement.
            </p>
        ),
    },
    {
        trigger: 'Is my data safe?',
        content: (
            <p className="m-0">
                PostHog takes infrastructure and privacy seriously. See{' '}
                <Link to="/privacy" className="font-semibold underline">
                    Privacy
                </Link>{' '}
                and{' '}
                <Link to="/dpa" className="font-semibold underline">
                    DPA
                </Link>{' '}
                for how we handle customer data.
            </p>
        ),
    },
    {
        trigger: 'Does PostHog Code replace Cursor, Copilot or Claude Code?',
        content: (
            <p className="m-0">
                No. Those tools excel at editing in your IDE. PostHog Code prioritizes work from product signals and
                turns it into reviewable PRs. Many teams will use both.
            </p>
        ),
    },
    {
        trigger: 'Can I modify my training configuration?',
        content: (
            <p className="m-0">
                PostHog Code is model-agnostic. You choose providers and bring your own API keys; configuration is yours
                to adjust.
            </p>
        ),
    },
    {
        trigger: "What if I don't use PostHog yet?",
        content: (
            <p className="m-0">
                Sign up for PostHog and join the waitlist. PostHog Code is built on the same project and permissions
                model as the rest of the platform.
            </p>
        ),
    },
    {
        trigger: 'Can it make its own decisions?',
        content: (
            <p className="m-0">
                Agents propose plans and diffs; you stay in the loop to approve, edit, or reject. Nothing merges without
                your review.
            </p>
        ),
    },
    {
        trigger: 'Is my code used in PostHog?',
        content: (
            <p className="m-0">
                Your repository stays yours. How we process product and integration data is described in our{' '}
                <Link to="/privacy" className="font-semibold underline">
                    Privacy
                </Link>{' '}
                policy—talk to us if you need a deeper review.
            </p>
        ),
    },
    {
        trigger: 'How much does PostHog Code cost?',
        content: (
            <p className="m-0">
                Pricing is still being finalized for general availability. Check{' '}
                <Link to="/pricing" className="font-semibold underline">
                    Pricing
                </Link>{' '}
                for current PostHog plans and watch this page for Code-specific details.
            </p>
        ),
    },
]

function NotCard({ heading, body, link, modelRow, searchPlaceholder }: (typeof NOT_CARDS)[number]) {
    return (
        <div className="flex h-full flex-col overflow-hidden rounded-md border border-primary">
            <div className="flex flex-1 flex-col px-5 py-4 @md/reader-content:px-5 @md/reader-content:py-5">
                <h3 className="m-0 mb-2 text-[10px] font-semibold uppercase tracking-wide text-secondary">{heading}</h3>
                <p className="m-0 flex-1 text-sm leading-relaxed text-secondary">{body}</p>
                {link ? (
                    <Link
                        to={link.href}
                        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                        external={link.href.startsWith('http')}
                    >
                        {link.label}
                        <span aria-hidden>→</span>
                    </Link>
                ) : null}
            </div>
            {modelRow ? (
                <div className="border-t border-primary bg-accent px-5 py-4">
                    <div className="flex flex-wrap items-center gap-2">
                        {MODEL_LOGOS.map((key) => {
                            const src = getLogo(key)
                            if (!src) return null
                            return (
                                <div
                                    key={key}
                                    className="flex size-8 items-center justify-center rounded-sm border border-primary bg-primary p-1.5"
                                >
                                    <CloudinaryImage
                                        src={src as `https://res.cloudinary.com/${string}`}
                                        alt={key}
                                        className="max-h-4 max-w-full object-contain"
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            ) : null}
            {searchPlaceholder ? (
                <div className="border-t border-primary px-5 py-4">
                    <div
                        className="rounded-sm border border-primary bg-accent px-3 py-2 font-code text-[11px] text-secondary"
                        aria-hidden
                    >
                        {searchPlaceholder}
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default function PostHogCodePageContent() {
    const [waitlistAudience, setWaitlistAudience] = useState('already_posthog')
    const [maintenanceBuildMode, setMaintenanceBuildMode] = useState<'maintenance' | 'build'>('maintenance')
    const [signalsSourceMode, setSignalsSourceMode] = useState<'products' | 'integrations'>('products')
    const mcpIntegrationLogos: LogoKey[] = ['sentry', 'slack', 'linear', 'github']

    return (
        <div className="not-prose w-full pb-8">
            {/* OVERVIEW */}
            <Section
                id="overview"
                className={`${sectionBorder} pb-10 @md/reader-content:pb-14 pt-3 @md/reader-content:pt-5`}
            >
                <div className={grid12}>
                    <div className={span7}>
                        <h1 className="m-0 mb-4 text-3xl font-bold leading-tight text-primary @md/reader-content:text-4xl @lg/reader-content:text-[2.5rem]">
                            Switch on self-driving development for your product
                        </h1>
                        <p className={`m-0 mb-6 max-w-xl ${bodyComfort}`}>
                            Imagine a product that builds itself. PostHog Code is an agentic development environment
                            that understands your product signals, reasons about user behavior, and ships PRs without
                            you needing to steer.
                        </p>
                        <ul className="m-0 mb-6 list-none space-y-3 p-0">
                            {HERO_OVERVIEW_LINES.map(({ label, Icon }) => (
                                <li key={label} className="flex items-center gap-2.5">
                                    <span className="flex size-8 shrink-0 items-center justify-center rounded-sm border border-input bg-accent">
                                        <Icon className="size-4 text-brown" aria-hidden />
                                    </span>
                                    <HeroOverviewLabel label={label} />
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-wrap items-center gap-2">
                            <CallToAction type="primary" size="sm" href="https://app.posthog.com/signup">
                                Get early access
                            </CallToAction>
                            <CallToAction
                                type="secondary"
                                size="sm"
                                href="https://github.com/PostHog/posthog"
                                externalNoIcon
                            >
                                View our source code
                            </CallToAction>
                        </div>
                    </div>
                    <div className={`${span5} flex @lg/reader-content:justify-end`}>
                        <Hog src={HOG_HERO} alt="PostHog Code" className="mt-4 @lg/reader-content:mt-0" />
                    </div>
                </div>

                <div className="mt-8 grid gap-6 @md/reader-content:mt-10 @md/reader-content:grid-cols-3">
                    {NOT_CARDS.map((card) => (
                        <NotCard key={card.heading} {...card} />
                    ))}
                </div>

                <div
                    id="inbox-centric"
                    className="scroll-mt-20 mt-10 border-t border-input pt-10 @md/reader-content:mt-12 @md/reader-content:pt-12"
                >
                    <div className={grid12}>
                        <div className={span7}>
                            <div className="mb-3 flex flex-col gap-2 @md/reader-content:mb-4 @md/reader-content:gap-3">
                                <p className={`m-0 ${sectionLeadIn}`}>
                                    AI without context is just{' '}
                                    <span className="relative inline-flex items-baseline gap-0.5 rounded-sm border border-input bg-accent px-2 py-0.5 font-code text-base font-medium text-primary @md/reader-content:text-lg">
                                        autocomplete
                                        <span
                                            className="mb-px inline-block h-3 w-px shrink-0 animate-pulse bg-blue"
                                            aria-hidden
                                        />
                                    </span>
                                </p>
                                <h2 className="m-0 text-2xl font-bold leading-tight text-primary @md/reader-content:text-3xl">
                                    PostHog Code is a more intuitive way to build a software product
                                </h2>
                            </div>
                            <p className={`m-0 mb-5 ${bodyComfort}`}>
                                The biggest limit to productivity today is context. PostHog Code is where you get it.
                                Orchestrate context signals across our database and ship code tailored for performance.
                                You stay in the loop, but not in the weeds.
                            </p>
                            <ul className="m-0 list-none space-y-3 p-0">
                                {INBOX_WORK_MODE_LINES.map(({ title, description, Icon }) => (
                                    <li key={title} className="flex items-center gap-2.5">
                                        <span className="flex size-8 shrink-0 items-center justify-center rounded-sm border border-input bg-accent">
                                            <Icon className="size-4 text-blue" aria-hidden />
                                        </span>
                                        <p className="m-0 text-sm leading-relaxed">
                                            <span className="font-semibold text-primary">{title}</span>
                                            <span className="text-secondary"> – {description}</span>
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={`${span5} flex justify-center`}>
                            <div className={`mt-6 @md/reader-content:mt-0 ${hogInboxShell}`}>
                                <Hog src={HOG_HERO} alt="PostHog Code" className="w-full" />
                            </div>
                        </div>
                    </div>
                </div>

                <CodeCapabilities />
            </Section>

            {/* SIGNALS */}
            <Section id="signals" className={`${sectionBorder} ${sectionY}`}>
                <div className={grid12}>
                    <div className={span7}>
                        <h2 className="m-0 mb-3 text-2xl font-bold leading-tight text-primary @md/reader-content:text-3xl">
                            Pull signals from tools your team already uses
                        </h2>
                        <p className={`m-0 ${bodyComfort}`}>
                            PostHog Code combines first-party product data and external integrations into one ranked
                            stream of work, so agents can act with context instead of guesswork.
                        </p>
                        <div className="mt-5 max-w-xl">
                            <ToggleGroup
                                title="Signal source mode"
                                hideTitle
                                className="w-full"
                                options={[
                                    { label: 'PostHog products', value: 'products' },
                                    { label: 'External integrations', value: 'integrations' },
                                ]}
                                value={signalsSourceMode}
                                onValueChange={(v) => {
                                    if (v === 'products' || v === 'integrations') setSignalsSourceMode(v)
                                }}
                            />
                        </div>
                        <div className="mt-4 rounded-sm border border-input bg-accent p-4">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-3">
                                    <div className="flex size-8 shrink-0 items-center justify-center rounded-sm border border-input bg-primary">
                                        <IconSparkles className="size-4 text-yellow" aria-hidden />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="m-0 text-sm font-semibold text-primary">
                                            {signalsSourceMode === 'products'
                                                ? 'Native sources inside PostHog'
                                                : 'External sources via MCP'}
                                        </p>
                                        <p className="m-0 mt-1 text-sm leading-relaxed text-secondary">
                                            {signalsSourceMode === 'products'
                                                ? 'PostHog turns product behavior into signals agents can act on.'
                                                : 'MCP connects tools once, then normalizes results into the same task schema.'}
                                        </p>
                                    </div>
                                </div>
                                <span
                                    className={`shrink-0 rounded-sm border px-2 py-1 text-[11px] font-semibold ${
                                        signalsSourceMode === 'products'
                                            ? 'border-orange/40 bg-orange/10 text-orange'
                                            : 'border-blue/40 bg-blue/10 text-blue'
                                    }`}
                                >
                                    {signalsSourceMode === 'products' ? 'PostHog' : 'MCP'}
                                </span>
                            </div>

                            <div className="mt-3 rounded-sm border border-input bg-primary/10 p-3">
                                {signalsSourceMode === 'products' ? (
                                    <>
                                        <p className="m-0 text-[11px] font-semibold uppercase tracking-wide text-orange">
                                            What agents already get
                                        </p>
                                        <ul className="mt-2 space-y-1.5">
                                            {[
                                                'Product analytics',
                                                'Session replay',
                                                'Experiments',
                                                'Error tracking',
                                            ].map((label) => (
                                                <li key={label} className="flex items-center gap-2">
                                                    <span className="size-2 rounded-sm bg-brown" aria-hidden />
                                                    <span className="text-sm text-secondary">{label}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center justify-between gap-3">
                                            <p className="m-0 text-[11px] font-semibold uppercase tracking-wide text-secondary">
                                                Possible via MCP
                                            </p>
                                            <div className="flex items-center gap-2">
                                                {mcpIntegrationLogos.map((key) => {
                                                    const src = getLogo(key)
                                                    if (!src) return null
                                                    return (
                                                        <div
                                                            key={key}
                                                            className="flex size-8 items-center justify-center rounded-sm border border-input bg-primary p-1.5"
                                                        >
                                                            <CloudinaryImage
                                                                src={src as `https://res.cloudinary.com/${string}`}
                                                                alt={key}
                                                                className="max-h-4 max-w-full object-contain"
                                                            />
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <ul className="mt-2 space-y-1.5">
                                            {['Alerts & incidents', 'Support and CRM notes', 'Repo context'].map(
                                                (label) => (
                                                    <li key={label} className="flex items-center gap-2">
                                                        <span className="size-2 rounded-sm bg-brown" aria-hidden />
                                                        <span className="text-sm text-secondary">{label}</span>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </>
                                )}

                                <div className="mt-3 flex items-start gap-2">
                                    <IconGitBranch className="mt-0.5 size-4 text-brown" aria-hidden />
                                    <p className="m-0 text-sm leading-relaxed text-secondary">
                                        Same signals pipeline, same task schema, same agent workflow.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`${span5} flex justify-center @lg/reader-content:justify-end @lg/reader-content:pt-1`}
                    >
                        <div className="w-full max-w-xs p-5 @md/reader-content:max-w-sm @md/reader-content:p-6 @lg/reader-content:max-w-md @lg/reader-content:p-8">
                            <img src={CODE_INTEGRATIONS} alt="" className="w-full object-contain" loading="lazy" />
                        </div>
                    </div>
                </div>
            </Section>

            <div className={`${sectionBorder} ${sectionY}`}>
                <AutonomousBuildingCapability />
            </div>

            {/* MAINTENANCE VS BUILD */}
            <Section id="maintenance-and-build" className={`${sectionBorder} ${sectionY}`}>
                <div className="flex flex-col">
                    <div className={grid12}>
                        <div className={span7}>
                            <div className="mb-6 max-w-lg">
                                <ToggleGroup
                                    title="Maintenance or build mode"
                                    hideTitle
                                    className="w-full"
                                    options={[
                                        { label: 'Maintenance mode', value: 'maintenance' },
                                        { label: 'Build mode', value: 'build' },
                                    ]}
                                    value={maintenanceBuildMode}
                                    onValueChange={(v) => {
                                        if (v === 'maintenance' || v === 'build') setMaintenanceBuildMode(v)
                                    }}
                                />
                            </div>
                            {maintenanceBuildMode === 'maintenance' ? (
                                <>
                                    <h2 className="m-0 mb-3 text-2xl font-bold leading-tight text-primary @md/reader-content:text-3xl">
                                        Maintenance mode
                                    </h2>
                                    <p className="m-0 mb-4 text-sm font-medium text-secondary">
                                        When the product tells you something is wrong—errors, funnel drops, regressions,
                                        noisy experiments—you want a clear queue, not another tab to babysit.
                                    </p>
                                    <p className={`m-0 ${bodyComfort}`}>
                                        PostHog Code ranks those signals into an inbox so you see impact before you pick
                                        what to unblock. Agents pull replay, stack traces, and usage context into
                                        reviewable PRs; you stay in approve-and-ship mode instead of re-explaining the
                                        same incident in chat. It&apos;s the loop you already run for production health,
                                        with less manual glue between analytics and engineering.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h2 className="m-0 mb-3 text-2xl font-bold leading-tight text-primary @md/reader-content:text-3xl">
                                        Build mode
                                    </h2>
                                    <p className="m-0 mb-4 text-sm font-medium text-secondary">
                                        When you&apos;re not firefighting, you&apos;re still shipping: roadmap bets,
                                        polish, refactors, and net-new capability your team already prioritized.
                                    </p>
                                    <p className={`m-0 ${bodyComfort}`}>
                                        The same task and PR workflow applies, but the work starts from your specs and
                                        ideas—not from an alert. Tasks break into shippable chunks; instrumentation,
                                        flags, and experiments ride along when you care about safe rollout or proof of
                                        impact. Maintenance mode reacts to what the product surface is screaming about;
                                        build mode is how you clear the backlog you chose before anything broke.
                                    </p>
                                </>
                            )}
                        </div>
                        <div className={`${span5} flex justify-center @lg/reader-content:justify-end`}>
                            <div className="w-full max-w-xs @lg/reader-content:max-w-none" key={maintenanceBuildMode}>
                                <Hog
                                    src={maintenanceBuildMode === 'maintenance' ? HOG_FAST : HOG_BUILD}
                                    alt={
                                        maintenanceBuildMode === 'maintenance'
                                            ? 'Maintenance mode: triage and ship fixes from product data'
                                            : 'Build mode: ship prioritized product work from your backlog'
                                    }
                                    className="mt-6 @lg/reader-content:mt-0"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 w-full @md/reader-content:mt-5" key={maintenanceBuildMode}>
                        {maintenanceBuildMode === 'maintenance' ? (
                            <MaintenanceModePipelineHeader />
                        ) : (
                            <BuildModePipelineHeader />
                        )}
                    </div>
                </div>
            </Section>

            {/* GET STARTED */}
            <Section id="get-started" className="pt-10 pb-4 @md/reader-content:pt-14 @md/reader-content:pb-5">
                <div className="grid items-start @lg/reader-content:grid-cols-12 @lg/reader-content:gap-x-10 @lg/reader-content:gap-y-8 gap-y-2">
                    <div className={span7}>
                        <h2 className="m-0 mb-3 text-2xl font-bold leading-tight text-primary @md/reader-content:text-3xl">
                            Waking up to three crisp PRs for paper cuts that would have derailed your day? ah,
                            that&apos;s bliss.
                        </h2>
                        <p className={`m-0 mb-5 ${bodyComfort}`}>
                            Cursor and Claude Code are great in the editor. PostHog Code keeps identifying product
                            issues from live usage and proposing improvements—so work keeps surfacing without you
                            stitching context together by hand.
                        </p>
                        <p className="m-0 mb-5 text-sm font-semibold text-primary @md/reader-content:mb-6">
                            Not sure if PostHog Code is right for you?
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                            <AskAiCta
                                href="https://chatgpt.com"
                                label="Ask ChatGPT"
                                iconSrc={ASK_AI_FAVICONS.chatgpt}
                            />
                            <AskAiCta href="https://claude.ai" label="Ask Claude" iconSrc={ASK_AI_FAVICONS.claude} />
                            <AskAiCta
                                href="https://gemini.google.com/app"
                                label="Ask Gemini"
                                iconSrc={ASK_AI_FAVICONS.gemini}
                            />
                        </div>
                    </div>
                    <div className={`${span5} flex @lg/reader-content:justify-end`}>
                        <Hog src={HOG_VIBES} alt="" className="mt-3 @lg/reader-content:mt-0" />
                    </div>
                </div>
            </Section>

            {/* Final CTA — window-style card (matches in-page demos) */}
            <div className={`${sectionBorder} pt-4 pb-10 @md/reader-content:pt-5 @md/reader-content:pb-14`}>
                <div className="overflow-hidden rounded-md border border-input bg-primary shadow-xl dark:shadow-2xl">
                    <div className="flex h-9 min-h-9 shrink-0 items-center gap-3 border-b border-input bg-accent px-3">
                        <span className="flex shrink-0 items-center gap-1.5" aria-hidden>
                            <span className="size-2.5 rounded-full bg-red" />
                            <span className="size-2.5 rounded-full bg-yellow" />
                            <span className="size-2.5 rounded-full bg-seagreen" />
                        </span>
                        <span className="min-w-0 truncate font-code text-[11px] font-medium text-muted">
                            Get early access
                        </span>
                    </div>
                    <div className={`${grid12} items-stretch gap-y-0`}>
                        <div className={`${span7} p-6 @md/reader-content:p-8`}>
                            <h2 className="m-0 mb-3 text-xl font-bold leading-tight text-primary @md/reader-content:text-2xl">
                                If you&apos;re looking for a sign, this is it: try PostHog Code.
                            </h2>
                            <p className="m-0 mb-3 text-sm leading-relaxed text-secondary">
                                PostHog Code is designed for experienced product engineers who already use AI coding
                                tools regularly. We&apos;re explicitly not targeting non-technical &ldquo;vibe
                                coders&rdquo; or hobbyist users.
                            </p>
                            <p className="m-0 mb-5 text-sm leading-relaxed text-secondary">
                                Our initial customer profile is early-stage startups with 2&ndash;10 engineers and
                                hundreds to low thousands of users.
                            </p>
                            <div className="mb-5">
                                <RadioGroup
                                    title="PostHog experience"
                                    value={waitlistAudience}
                                    onValueChange={setWaitlistAudience}
                                    options={[
                                        {
                                            label: "Already using PostHog? Yes, I'm ready for the future.",
                                            value: 'already_posthog',
                                        },
                                        {
                                            label: 'Just getting started? Answer a few quick questions.',
                                            value: 'getting_started',
                                        },
                                    ]}
                                />
                            </div>
                            <CallToAction type="primary" href="https://app.posthog.com/signup">
                                Join the waitlist
                            </CallToAction>
                        </div>
                        <div
                            className={`${span5} flex h-full min-h-0 flex-col border-t border-input bg-accent/25 @lg/reader-content:border-l @lg/reader-content:border-t-0`}
                        >
                            <div className="mt-auto flex w-full justify-center px-6 pt-8 @md/reader-content:px-8 @md/reader-content:pt-10">
                                <div className="leading-none">
                                    <img
                                        src={HOG_SIGN}
                                        alt=""
                                        className="block w-full max-w-52 object-contain object-bottom @md/reader-content:max-w-64"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ */}
            <Section id="faq" className={`${sectionBorder} ${sectionY}`}>
                <div className={grid12}>
                    <div className="col-span-12 @lg/reader-content:col-span-4">
                        <p className={`m-0 mb-2 @md/reader-content:mb-3 ${sectionLeadIn}`}>FAQ</p>
                        <h2 className="m-0 mb-4 text-2xl font-bold leading-tight text-primary @md/reader-content:text-3xl">
                            Questions we actually get asked
                        </h2>
                        <Hog
                            src={HOG_GROUP}
                            alt=""
                            className="hidden @lg/reader-content:mt-8 @lg/reader-content:flex @lg/reader-content:justify-start"
                        />
                    </div>
                    <div className="col-span-12 @lg/reader-content:col-span-8">
                        <Accordion
                            type="single"
                            skin={true}
                            items={FAQ_ITEMS}
                            triggerClassName="!px-3 !py-2 @md/reader-content:!px-4"
                            contentClassName="!px-3 !py-2.5 @md/reader-content:!px-4 @md/reader-content:!py-3"
                        />
                    </div>
                </div>
            </Section>
        </div>
    )
}
