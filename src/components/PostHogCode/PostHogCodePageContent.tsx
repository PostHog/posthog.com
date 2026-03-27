import React, { useState } from 'react'
import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'
import { Accordion } from 'components/RadixUI/Accordion'
import { RadioGroup } from 'components/RadixUI/RadioGroup'
import {
    IconGitBranch,
    IconCode,
    IconCloud,
    IconLaptop,
    IconMagicWand,
    IconListCheck,
    IconSparkles,
    IconGraph,
    IconRewindPlay,
    IconWarning,
    IconLlmAnalytics,
    IconActivity,
    IconPulse,
    IconPlus,
    IconSupport,
    IconShield,
} from '@posthog/icons'
import { LOGOS, type LogoKey } from 'constants/logos'
import { AutonomousBuildingCapability, CodeCapabilities, MaintenanceBuildModeSection } from './CodeCapabilities'

const HOG_HERO = 'https://res.cloudinary.com/dmukukwp6/image/upload/Code_fast_97de1bbc27.png'
const HOG_INBOX_CENTRIC = 'https://res.cloudinary.com/dmukukwp6/image/upload/Group_144026_747081226e.png'
const CODE_INTEGRATIONS = 'https://res.cloudinary.com/dmukukwp6/image/upload/code_integrations_9862a03308.png'
const HOG_GROUP = 'https://res.cloudinary.com/dmukukwp6/image/upload/Code_group_6585f20d72.png'
const HOG_VIBES = 'https://res.cloudinary.com/dmukukwp6/image/upload/Code_vibes_ec21263650.png'
const HOG_SIGN = 'https://res.cloudinary.com/dmukukwp6/image/upload/Code_sign_77c93a843c.png'

/** Square favicons for “Ask …” CTAs (Google favicon cache, 64px). */
const ASK_AI_FAVICONS = {
    chatgpt: 'https://www.google.com/s2/favicons?domain=openai.com&sz=64',
    claude: 'https://www.google.com/s2/favicons?domain=claude.ai&sz=64',
    perplexity: 'https://www.google.com/s2/favicons?domain=perplexity.ai&sz=64',
} as const

/** Pre-filled prompts for third-party AI assistants. */
const ASK_AI_HREFS = {
    chatgpt:
        'https://chat.openai.com/?q=Explain+why+I+should+use+PostHog+Code.+Focus+on+real+use+cases+(building+features,+debugging,+shipping+faster).+Compare+it+to+doing+things+manually+or+using+other+AI+coding+tools.+Be+concise+and+include+tradeoffs.+If+unsure,+infer+from+PostHog%E2%80%99s+approach+to+product+analytics+and+AI.',
    claude: 'https://claude.ai/new?q=Explain+why+I+should+use+PostHog+Code.+Focus+on+real+use+cases+(building+features,+debugging,+shipping+faster).+Compare+it+to+doing+things+manually+or+using+other+AI+coding+tools.+Be+concise+and+include+tradeoffs.+If+unsure,+infer+from+PostHog%E2%80%99s+approach+to+product+analytics+and+AI.',
    perplexity:
        'https://www.perplexity.ai/search?q=Should+I+use+PostHog+Code%3F+Explain+with+real+use+cases+(building+features,+debugging,+shipping+faster).+Compare+to+manual+workflows+and+AI+coding+tools.+Be+concise+and+include+tradeoffs.',
} as const

const POSTHOG_CODE_DISCORD_URL = 'https://discord.com/invite/E9xV2WnR98'

/** Matches teams / reader patterns: 12-col grid inside @container/reader-content */
const grid12 = 'grid @lg/reader-content:grid-cols-12 @lg/reader-content:gap-x-10 @lg/reader-content:gap-y-8 gap-y-8'
const span7 = 'col-span-12 @lg/reader-content:col-span-7'
const span5 = 'col-span-12 @lg/reader-content:col-span-5'

/** Body copy rhythm used across PostHog Code marketing sections. */
const bodyComfort = 'text-[15px] leading-relaxed text-secondary'
const hogImageMax = 'w-full max-w-[280px] @lg/reader-content:max-w-[320px]'
const hogInboxShell = 'w-full max-w-60 @md/reader-content:max-w-64 @lg/reader-content:max-w-72'

/** Matches inbox lead-in (“AI without context…”) for section eyebrows. */
const sectionLeadIn = 'text-lg font-medium leading-snug text-secondary @md/reader-content:text-xl'

const sectionY = 'py-10 @md/reader-content:py-14'
const sectionBorder = 'border-b border-input'

type IconComponent = React.ComponentType<{ className?: string }>

const HERO_OVERVIEW_LINES: { title: string; description: string; Icon: IconComponent }[] = [
    {
        title: 'Multi-model agent orchestration',
        description: 'use Claude Code and Codex in one place',
        Icon: IconMagicWand,
    },
    {
        title: 'Product signals inbox',
        description: 'triage issues and prioritize product work',
        Icon: IconListCheck,
    },
    {
        title: 'Agentic development environment',
        description: 'build features faster than your roadmap',
        Icon: IconCode,
    },
]

const INBOX_WORK_MODE_LINES: { title: string; description: string; Icon: IconComponent }[] = [
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

const Section = ({ id, children, className = '' }: { id: string; children: React.ReactNode; className?: string }) => (
    <section id={id} className={`scroll-mt-20 ${className}`}>
        {children}
    </section>
)

const sectionLeadInCodeChipClass =
    'relative inline-flex items-baseline gap-0.5 rounded-sm border border-input bg-accent px-2 py-0.5 font-code text-base font-medium text-primary @md/reader-content:text-lg'

/** Code-styled word + blue caret pulse (reused under section lead-ins). */
function SectionLeadInCodeChip({ label }: { label: string }) {
    return (
        <span className={sectionLeadInCodeChipClass}>
            {label}
            <span className="mb-px inline-block h-3 w-px shrink-0 animate-pulse bg-blue" aria-hidden />
        </span>
    )
}

function Hog({
    src,
    alt,
    className = '',
    imgClassName,
}: {
    src: string
    alt: string
    className?: string
    imgClassName?: string
}) {
    return (
        <div className={`flex items-end justify-center ${className}`}>
            <img src={src} alt={alt} className={imgClassName ?? hogImageMax} loading="lazy" />
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

type NotCardFooter = {
    type: 'command'
    text: string
    to?: string
    ariaHidden?: boolean
    /** When there is no `to`, footer is monospace by default (e.g. `npx`); set false for a prose tagline. */
    fontCode?: boolean
}

const NOT_CARDS: {
    heading: string
    body: string
    footer: NotCardFooter
}[] = [
    {
        heading: 'not another dashboard',
        body: 'Signals become tasks, not graphs. PostHog Code and PostHog Cloud are data twins, so when you want charts or a real conversation about the numbers, you open product analytics or PostHog AI.',
        footer: {
            type: 'command',
            text: 'Show me some charts',
            to: '/docs/product-analytics',
        },
    },
    {
        heading: 'not a model harness',
        body: 'Claude Code, Cursor, and Codex accelerate your workflow, but you always make the first move. PostHog Code points agents at the right work with context pre-filled in the prompts.',
        footer: {
            type: 'command',
            text: 'Use your favourite agents without any markup',
            fontCode: false,
        },
    },
    {
        heading: 'not a no-code toy',
        body: "PostHog Code is built for engineers. Orchestrate agents to fix bugs while you sleep, and build big features. Hardcore user of another IDE? You'll get the best experience in our editor, but if you insist:",
        footer: { type: 'command', text: 'npx @posthog/code-mcp', ariaHidden: true },
    },
]

const GRANOLA_FAVICON = 'https://www.google.com/s2/favicons?domain=granola.ai&sz=64'

const signalsBarChipClass =
    'inline-flex max-w-full items-center gap-1 rounded border border-input bg-accent px-1.5 py-px text-[10px] font-medium leading-tight text-primary skin-classic:border-b-3 skin-classic:border-primary @md/reader-content:gap-1 @md/reader-content:px-2 @md/reader-content:py-0.5 @md/reader-content:text-[11px]'

const SIGNALS_BAR_POSTHOG: { key: string; label: string; Icon: IconComponent; iconClass: string }[] = [
    { key: 'product-analytics', label: 'Product Analytics', Icon: IconGraph, iconClass: 'text-blue' },
    { key: 'session-replay', label: 'Session replay', Icon: IconRewindPlay, iconClass: 'text-yellow' },
    { key: 'error-tracking', label: 'Error tracking', Icon: IconWarning, iconClass: 'text-orange' },
    { key: 'llm-analytics', label: 'LLM Analytics', Icon: IconLlmAnalytics, iconClass: 'text-purple' },
    { key: 'logs', label: 'Logs', Icon: IconActivity, iconClass: 'text-red' },
]

type SignalsBarIntegrationRow =
    | { key: string; label: string; logoKey: LogoKey }
    | { key: string; label: string; logoUrl: string }

const SIGNALS_BAR_INTEGRATIONS: SignalsBarIntegrationRow[] = [
    { key: 'linear', label: 'Linear', logoKey: 'linear' },
    { key: 'slack', label: 'Slack', logoKey: 'slack' },
    { key: 'github', label: 'GitHub', logoKey: 'github' },
    { key: 'granola', label: 'Granola', logoUrl: GRANOLA_FAVICON },
    { key: 'zendesk', label: 'Zendesk', logoKey: 'zendesk' },
]

function signalsBarIntegrationSrc(row: SignalsBarIntegrationRow): string {
    return 'logoUrl' in row ? row.logoUrl : LOGOS[row.logoKey]
}

const SIGNALS_BAR_MCP: { key: string; label: string; Icon: IconComponent }[] = [
    { key: 'observability', label: 'Observability', Icon: IconPulse },
    { key: 'alerting', label: 'Alerting', Icon: IconWarning },
    { key: 'support', label: 'Support', Icon: IconSupport },
    { key: 'crm', label: 'CRM', Icon: IconCloud },
    { key: 'internal-tools', label: 'Internal tools', Icon: IconShield },
]

function SignalsContextBarMoreItem() {
    return (
        <li className={signalsBarChipClass}>
            <IconPlus className="size-3 shrink-0 text-secondary" aria-hidden />
            <span className="min-w-0 text-secondary">and more</span>
        </li>
    )
}

function SignalsContextSourcesBar() {
    return (
        <div className="overflow-hidden rounded-md border border-primary bg-primary px-3 py-2 @md/reader-content:px-4 @md/reader-content:py-2.5">
            <div
                className="grid grid-cols-1 gap-3 @lg/reader-content:grid-cols-3 @lg/reader-content:gap-4"
                aria-label="PostHog products, integrations, and MCP context sources"
            >
                <div>
                    <p className="m-0 mb-1 text-[10px] font-semibold uppercase tracking-wide text-secondary">
                        PostHog products
                    </p>
                    <ul className="m-0 flex flex-wrap gap-1 p-0 list-none @md/reader-content:gap-1.5">
                        {SIGNALS_BAR_POSTHOG.map(({ key, label, Icon, iconClass }) => (
                            <li key={key} className={signalsBarChipClass}>
                                <Icon className={`size-3 shrink-0 ${iconClass}`} aria-hidden />
                                <span className="min-w-0">{label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <p className="m-0 mb-1 text-[10px] font-semibold uppercase tracking-wide text-secondary">
                        Integrations
                    </p>
                    <ul className="m-0 flex flex-wrap gap-1 p-0 list-none @md/reader-content:gap-1.5">
                        {SIGNALS_BAR_INTEGRATIONS.map((row) => (
                            <li key={row.key} className={signalsBarChipClass}>
                                <img
                                    src={signalsBarIntegrationSrc(row)}
                                    alt=""
                                    className="size-3 shrink-0 object-contain"
                                    width={12}
                                    height={12}
                                    loading="lazy"
                                />
                                <span className="min-w-0">{row.label}</span>
                            </li>
                        ))}
                        <SignalsContextBarMoreItem />
                    </ul>
                </div>
                <div>
                    <p className="m-0 mb-1 text-[10px] font-semibold uppercase tracking-wide text-secondary">MCP</p>
                    <ul className="m-0 flex flex-wrap gap-1 p-0 list-none @md/reader-content:gap-1.5">
                        {SIGNALS_BAR_MCP.map(({ key, label, Icon }) => (
                            <li key={key} className={signalsBarChipClass}>
                                <Icon className="size-3 shrink-0 text-secondary" aria-hidden />
                                <span className="min-w-0">{label}</span>
                            </li>
                        ))}
                        <SignalsContextBarMoreItem />
                    </ul>
                </div>
            </div>
        </div>
    )
}

const SIGNALS_SOURCE_LINES: { title: string; description: string; Icon: IconComponent }[] = [
    {
        title: 'Your codebase',
        description: 'PostHog Code scans your repo and understands your architecture',
        Icon: IconCode,
    },
    {
        title: 'Native PostHog data',
        description: 'Put the product usage and behavioral data you already trust into action',
        Icon: IconSparkles,
    },
    {
        title: 'Third-party tools & MCP',
        description: 'Route whatever else matters to you into the same prioritized queue',
        Icon: IconCloud,
    },
]

const FAQ_ITEMS = [
    {
        trigger: 'Why is PostHog building a code editor?',
        content: (
            <div className="space-y-3">
                <p className="m-0">
                    We&apos;ve spent years building tools that help teams understand their users. Then we looked at how
                    software gets built, and something struck us as deeply wrong.
                </p>
                <p className="m-0">
                    The latest generation of AI-powered editors are remarkably capable at writing code. The problem is
                    they have no idea what your product is or what your users need. Engineers waste a remarkable amount
                    of time finding and feeding context to orchestrate AI coding agents.
                </p>
                <p className="m-0">
                    With the data PostHog already has, we realized we&apos;re uniquely positioned to build the
                    solution—a future we call product autonomy. PostHog Code is the first step toward that future:
                    engineers can wake up to the boring work already done and focus instead on building exciting,
                    creative things.
                </p>
            </div>
        ),
    },
    {
        trigger: 'Is my data safe?',
        content: (
            <p className="m-0">
                Yes. PostHog Code queries your data through the PostHog API using your personal API key. Data is never
                stored, cached, or sent anywhere other than to PostHog&apos;s servers. The MCP server runs locally on
                your machine, and you control exactly what the agent can access through your API key&apos;s permissions.
            </p>
        ),
    },
    {
        trigger: 'Does it replace Cursor or Claude Code?',
        content: (
            <p className="m-0">
                Maybe, but not unless you want to. PostHog Code is the missing layer between data and writing code. Keep
                your editor if you like it, but give Code a try first.
            </p>
        ),
    },
    {
        trigger: 'What AI models does it work with?',
        content: (
            <p className="m-0">
                PostHog Code works with any MCP-compatible AI coding agent. Currently supported: Claude Code, Cursor,
                Windsurf, VS Code with Copilot. The MCP standard is growing fast, so more editors will be supported over
                time.
            </p>
        ),
    },
    {
        trigger: 'How much does it cost?',
        content: (
            <p className="m-0">
                PostHog Code is seat-based subscription. The PostHog MCP server is free and open source. You just need a
                PostHog account (the generous free tier works) and an API key from your AI provider. PostHog Code reads
                from your existing PostHog data, so you only pay for the PostHog products you already use. There&apos;s
                no additional charge for MCP access.
            </p>
        ),
    },
    {
        trigger: 'Can it modify my PostHog configuration?',
        content: (
            <p className="m-0">
                PostHog Code can both read and write to PostHog, depending on your API key permissions. It can create
                feature flags, set up experiments, build dashboards, and define actions. Every write operation requires
                explicit approval from the agent&apos;s permission system—nothing happens without your confirmation.
            </p>
        ),
    },
    {
        trigger: "What if I don't use PostHog yet?",
        content: (
            <p className="m-0">
                PostHog Code runs on top of PostHog. You&apos;ll need to be on PostHog first. The good news: PostHog is
                free up to generous limits, and installation takes about 90 seconds with the wizard.
            </p>
        ),
    },
    {
        trigger: 'Can it make bad decisions?',
        content: (
            <p className="m-0">
                Sometimes. That is why you set a daily limit for agent actions and review PRs before they are merged.
                PostHog Code never merges anything on its own. It surfaces the work. You ship. Nothing merges without
                your approval.
            </p>
        ),
    },
    {
        trigger: 'Is my code sent to PostHog?',
        content: (
            <p className="m-0">
                PostHog Code agents access your GitHub repo to open PRs, similar to any CI/CD integration. Your code
                stays in GitHub. PostHog Code simply reads your product data (already in PostHog), and other sources you
                connect to (like Zendesk, Linear, etc.) to direct the agents.
            </p>
        ),
    },
]

function NotCard({ heading, body, footer }: (typeof NOT_CARDS)[number]) {
    const footerInnerClass = 'rounded-sm border border-primary bg-accent px-3 py-2 text-[11px] text-secondary'
    const footerMono = footer.to ? false : footer.fontCode !== false

    return (
        <div className="flex h-full flex-col overflow-hidden rounded-md border border-primary">
            <div className="flex flex-1 flex-col px-5 py-4 @md/reader-content:px-5 @md/reader-content:py-5">
                <h3 className="m-0 mb-2 text-[10px] font-semibold uppercase tracking-wide text-secondary">{heading}</h3>
                <p className="m-0 flex-1 text-sm leading-relaxed text-secondary">{body}</p>
            </div>
            <div className="border-t border-primary px-5 py-4">
                <div className={`${footerInnerClass} ${footerMono ? 'font-code' : ''}`}>
                    {footer.to ? (
                        <Link
                            to={footer.to}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary underline-offset-4 hover:underline"
                        >
                            {footer.text}
                            <span aria-hidden>→</span>
                        </Link>
                    ) : (
                        <span
                            className={footerMono ? '' : 'font-semibold text-primary'}
                            aria-hidden={footer.ariaHidden}
                        >
                            {footer.text}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default function PostHogCodePageContent() {
    const [waitlistAudience, setWaitlistAudience] = useState('already_posthog')

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
                            {HERO_OVERVIEW_LINES.map(({ title, description, Icon }) => (
                                <li key={title} className="flex items-start gap-2.5">
                                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-sm border border-input bg-accent">
                                        <Icon className="size-4 text-brown" aria-hidden />
                                    </span>
                                    <p className="m-0 min-w-0 flex-1 text-sm leading-relaxed">
                                        <span className="font-semibold text-primary">{title}</span>
                                        <span className="text-secondary"> – {description}</span>
                                    </p>
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-wrap items-center gap-2">
                            <CallToAction type="primary" size="sm" href="/posthog-code#get-started">
                                Get early access
                            </CallToAction>
                            <CallToAction
                                type="secondary"
                                size="sm"
                                href="https://github.com/PostHog/code"
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

                <MaintenanceBuildModeSection />

                <div
                    id="inbox-centric"
                    className="scroll-mt-20 mt-10 border-t border-input pt-10 @md/reader-content:mt-12 @md/reader-content:pt-12"
                >
                    <div className={grid12}>
                        <div className={span7}>
                            <div className="mb-3 flex flex-col gap-2 @md/reader-content:mb-4 @md/reader-content:gap-3">
                                <p className={`m-0 ${sectionLeadIn}`}>
                                    AI without context is just <SectionLeadInCodeChip label="autocomplete" />
                                </p>
                                <h2 className="m-0 text-2xl font-bold leading-tight text-primary @md/reader-content:text-3xl">
                                    Signals give coding agents the complete picture
                                </h2>
                            </div>
                            <p className={`m-0 mb-5 ${bodyComfort}`}>
                                Background agents pick up prioritized tasks, plan a fix, and ship the solution. You
                                control how much they run with a daily limit – and can kick off more anytime.
                            </p>
                            <p className={`m-0 mb-5 ${bodyComfort}`}>
                                When orchestrating your own work, you have three options:
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
                                <Hog src={HOG_INBOX_CENTRIC} alt="PostHog Code" className="w-full" />
                            </div>
                        </div>
                    </div>
                </div>

                <CodeCapabilities />
            </Section>

            {/* SIGNALS */}
            <Section id="signals" className={`${sectionBorder} ${sectionY}`}>
                <div className="flex flex-col">
                    <div className={grid12}>
                        <div className={span7}>
                            <div className="mb-3 flex flex-col gap-2 @md/reader-content:mb-4 @md/reader-content:gap-3">
                                <p className={`m-0 ${sectionLeadIn}`}>
                                    It&apos;s not magic – it&apos;s <SectionLeadInCodeChip label="data" />
                                </p>
                                <h2 className="m-0 text-2xl font-bold leading-tight text-primary @md/reader-content:text-3xl">
                                    Extract signals and context from tools your team uses
                                </h2>
                            </div>
                            <p className={`m-0 mb-5 max-w-2xl ${bodyComfort}`}>
                                Your data shouldn&apos;t just inform decisions — it should decide what gets built.
                                PostHog Code merges what PostHog already knows about your product with the messy context
                                from the rest of your stack.
                            </p>
                            <ul className="m-0 max-w-2xl list-none space-y-3 p-0">
                                {SIGNALS_SOURCE_LINES.map(({ title, description, Icon }) => (
                                    <li key={title} className="flex items-start gap-2.5">
                                        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-sm border border-input bg-accent">
                                            <Icon className="size-4 text-blue" aria-hidden />
                                        </span>
                                        <p className="m-0 min-w-0 flex-1 text-sm leading-relaxed">
                                            <span className="font-semibold text-primary">{title}</span>
                                            <span className="text-secondary"> – {description}</span>
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div
                            className={`${span5} flex justify-center @lg/reader-content:justify-end @lg/reader-content:pt-1`}
                        >
                            <div className="w-full max-w-xs p-5 @md/reader-content:max-w-sm @md/reader-content:p-6 @lg/reader-content:max-w-md @lg/reader-content:p-8">
                                <img src={CODE_INTEGRATIONS} alt="" className="w-full object-contain" loading="lazy" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 w-full @md/reader-content:mt-5">
                        <SignalsContextSourcesBar />
                    </div>
                </div>
            </Section>

            <div className={`${sectionBorder} ${sectionY}`}>
                <AutonomousBuildingCapability />
            </div>

            {/* GET STARTED */}
            <Section id="get-started" className="pt-10 pb-4 @md/reader-content:pt-14 @md/reader-content:pb-5">
                <div className="grid items-start @lg/reader-content:grid-cols-12 @lg/reader-content:gap-x-10 @lg/reader-content:gap-y-8 gap-y-2">
                    <div className={span7}>
                        <h2 className="m-0 mb-3 text-2xl font-bold leading-tight text-primary @md/reader-content:text-3xl">
                            Waking up to three crisp PRs for paper cuts that would have derailed your day? ah,
                            that&apos;s bliss.
                        </h2>
                        <p className={`m-0 mb-5 ${bodyComfort}`}>
                            You didn&apos;t become an engineer to babysit four terminals. PostHog Code continuously
                            identifies issues, builds solutions, and ships improvements – without you needing to prompt
                            it.
                        </p>
                        <p className="m-0 mb-5 text-sm font-semibold text-primary @md/reader-content:mb-6">
                            Not sure if PostHog Code is right for you?
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                            <AskAiCta
                                href={ASK_AI_HREFS.chatgpt}
                                label="Ask ChatGPT"
                                iconSrc={ASK_AI_FAVICONS.chatgpt}
                            />
                            <AskAiCta href={ASK_AI_HREFS.claude} label="Ask Claude" iconSrc={ASK_AI_FAVICONS.claude} />
                            <AskAiCta
                                href={ASK_AI_HREFS.perplexity}
                                label="Ask Perplexity"
                                iconSrc={ASK_AI_FAVICONS.perplexity}
                            />
                        </div>
                        <p className="m-0 mt-8 max-w-xl text-sm font-semibold text-primary @md/reader-content:mt-9">
                            Or, ask a human –{' '}
                            <Link to={POSTHOG_CODE_DISCORD_URL} external className="underline-offset-4 hover:underline">
                                Join the PostHog Code Discord community
                            </Link>
                        </p>
                    </div>
                    <div className={`${span5} flex @lg/reader-content:justify-end`}>
                        <Hog src={HOG_VIBES} alt="" className="mt-3 @lg/reader-content:mt-0" />
                    </div>
                </div>
            </Section>

            <div className={`${sectionBorder} ${sectionY}`}>
                <div className="grid gap-6 @md/reader-content:grid-cols-3">
                    {NOT_CARDS.map((card) => (
                        <NotCard key={card.heading} {...card} />
                    ))}
                </div>
            </div>

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
                                PostHog Code is designed for experienced engineers who use AI coding tools on the
                                regular, and have killer instincts for building great products.
                            </p>
                            <p className="m-0 mb-5 text-sm leading-relaxed text-secondary">
                                Want to burn some tokens with us? We&apos;re looking for early-stage startups with
                                2&ndash;10 engineers and hundreds to low thousands of users to battle test what
                                we&apos;re building.
                            </p>
                            <div className="mb-5">
                                <RadioGroup
                                    title="PostHog experience"
                                    value={waitlistAudience}
                                    onValueChange={setWaitlistAudience}
                                    options={[
                                        {
                                            label: "Already using PostHog? (yes, I'm ready for the future)",
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
