import React from 'react'
import Editor from 'components/Editor'
import SEO from 'components/seo'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import WizardCommand from 'components/WizardCommand'
import { ZoomImage } from 'components/ZoomImage'
import ElevenLabsLogo from 'components/CustomerLogos/ElevenLabsLogo'
import JuiceboxLogo from 'components/CustomerLogos/JuiceboxLogo'
import ExaLogo from 'components/CustomerLogos/ExaLogo'
import useProduct from 'hooks/useProduct'
import explorerHog from '../../../images/explorer-hog.png'
import opportunityMiner from '../../../images/replay-vision-opportunity-miner.png'
import { IconWarning, IconDocument, IconCursorClick, IconTrending, IconCheckCircle, IconCode } from '@posthog/icons'

// Existing copy and imagery, with the approved hero adaptation. See the adjacent README.
const scanners = [
    {
        title: 'User intent',
        description: 'Classify the session by what the user appeared to be trying to do.',
        output: 'One or more tags from a vocabulary you define',
        Icon: IconCursorClick,
        color: 'text-blue',
    },
    {
        title: 'Session outcome',
        description: 'Tag what actually happened – task completed, abandoned, errored, and so on.',
        output: 'One or more tags from a vocabulary you define',
        Icon: IconCheckCircle,
        color: 'text-teal',
    },
    {
        title: 'Session summary',
        description: "The TL;DR of the session, so you don't sit through 14 minutes of someone scrolling.",
        output: 'A title and prose summary',
        Icon: IconDocument,
        color: 'text-seagreen',
    },
    {
        title: 'Dead ends',
        description: 'Catch the moment someone hits a wall: scrolling, hovering with no CTA, then rage-quitting.',
        output: 'A yes / no verdict, with reasoning',
        Icon: IconWarning,
        color: 'text-red',
    },
    {
        title: 'Frustration score',
        description: 'Rate how much friction a page caused, on a scale you define.',
        output: 'A numeric score on a scale you define',
        Icon: IconTrending,
        color: 'text-yellow',
    },
    {
        title: 'Create from scratch',
        description: 'Build a fully custom scanner – pick a type and write your own prompt and config.',
        output: null,
        Icon: IconCode,
        color: 'text-purple',
    },
]

const reading = [
    { label: 'Docs', title: 'Getting started with Replay Vision', to: '/docs/replay-vision/start-here' },
    {
        label: 'Engineering',
        title: 'Our session replays are opening their own pull requests',
        to: '/blog/session-replays-opening-pull-requests',
    },
    { label: 'Docs', title: 'MCP', to: '/docs/replay-vision/mcp' },
]

const prompts = [
    {
        title: 'Read observations',
        prompt: `List the last 20 observations from my "Frustration score" scanner and summarize what's driving high scores.`,
    },
    {
        title: 'Impact and cohorts',
        prompt: `How many users did my "[Website] Opportunity miner" monitor affect in the last 14 days? Save them as a cohort.`,
    },
    {
        title: 'Create a scanner',
        prompt: 'Create a Replay Vision scanner that flags sessions where users get stuck on the /checkout page, narrow to enterprise customers, and start at 25% sampling. Estimate the cost first.',
    },
]

export default function ReplayVisionLandingPage(): JSX.Element {
    const product = useProduct({ handle: 'replay_vision' })

    // Keep same-page navigation inside this Editor's scroll container.
    const navigateToSection = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
        const link = (event.target as HTMLElement).closest('a')
        const hash = link?.getAttribute('href')
        if (!hash?.startsWith('#')) return
        const target = document.getElementById(hash.slice(1))
        if (!target || !event.currentTarget.contains(target)) return
        event.preventDefault()
        event.stopPropagation()
        target.scrollIntoView({ block: 'start', behavior: 'auto' })
    }

    return (
        <>
            <SEO
                title="Session replay that does the watching for you – Replay Vision"
                description={product.description}
                noindex
            />
            <Editor slug="/r/replay-vision" maxWidth="100%" hasPadding={false} hideToolbar>
                <div
                    data-scheme="primary"
                    className="@container bg-primary text-primary not-prose font-rounded"
                    onClickCapture={navigateToSection}
                >
                    <header className="relative border-b-2 border-primary overflow-hidden">
                        <div
                            className="absolute inset-0 opacity-30 pointer-events-none"
                            style={{
                                backgroundImage:
                                    'linear-gradient(rgb(var(--border) / .3) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--border) / .3) 1px, transparent 1px)',
                                backgroundSize: '32px 32px',
                            }}
                        />
                        <div className="relative max-w-6xl mx-auto px-5 @xl:px-10 pt-6 pb-10 @3xl:pb-14">
                            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary pb-4 mb-8">
                                <div className="font-mono text-xs flex items-center gap-2">
                                    <span className="size-2 rounded-full bg-orange" />
                                    <span>Session Replay</span>
                                    <span aria-hidden="true">/</span>
                                    <strong>Replay Vision</strong>
                                </div>
                                <Link
                                    to="/docs/replay-vision"
                                    state={{ newWindow: true }}
                                    className="text-sm font-semibold"
                                >
                                    Docs ↗
                                </Link>
                            </div>
                            <div className="grid @3xl:grid-cols-[1.4fr_1fr] items-center gap-6">
                                <div>
                                    <h1 className="!m-0 text-4xl @xl:text-5xl @4xl:text-6xl font-bold tracking-tight leading-[1.02]">
                                        Session replay that does the watching{' '}
                                        <span className="whitespace-nowrap decoration-orange underline decoration-[5px] underline-offset-4">
                                            for you.
                                        </span>
                                    </h1>
                                    <p className="text-lg leading-relaxed mt-6 mb-6 max-w-xl">
                                        Record how people use your product, then let <strong>Replay Vision</strong>{' '}
                                        watch the recordings for you: flagging bugs, scoring frustration, tagging
                                        behavior, and summarizing what happened. You get the findings, while Replay
                                        Vision does the homework.
                                    </p>
                                    <div className="flex flex-wrap gap-3 items-center">
                                        <CallToAction type="primary" size="lg" to="https://app.posthog.com/signup">
                                            Get started free
                                        </CallToAction>
                                        <CallToAction type="secondary" size="lg" to="#how-it-works">
                                            How it works ↓
                                        </CallToAction>
                                    </div>
                                    <p className="text-sm font-semibold mt-4 mb-0">
                                        You get the first 2,500 credits free every month
                                    </p>
                                </div>
                                <div className="relative max-w-[360px] @3xl:max-w-none mx-auto w-full">
                                    <div className="overflow-hidden">
                                        <img
                                            src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/magnifying_glass_019bc5b2d4.png"
                                            alt=""
                                            className="w-full block scale-150"
                                        />
                                    </div>
                                    <div className="font-mono text-xs text-center -mt-4 @3xl:-mt-8 rotate-[-3deg]">
                                        <span className="inline-block border border-primary bg-yellow/20 px-3 py-2">
                                            Your product, watching itself
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 border-t border-dashed border-primary pt-5 flex flex-col @3xl:flex-row @3xl:items-center gap-4 @3xl:gap-6">
                                <span className="text-sm font-semibold">Install with AI</span>
                                <WizardCommand command="replay-vision" variant="bordered" slim />
                                <Link to="#mcp" className="text-sm font-semibold @3xl:ml-auto">
                                    PostHog MCP →
                                </Link>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
                                <Link to="#setup">In the app →</Link>
                                <Link to="#credits">Pricing →</Link>
                            </div>
                        </div>
                    </header>

                    <div className="max-w-6xl mx-auto px-5 @xl:px-10">
                        <section className="py-7 border-b border-primary flex flex-col @2xl:flex-row gap-6 @2xl:gap-10 @2xl:items-center">
                            <p className="text-xs text-secondary !m-0 @2xl:max-w-[200px]">
                                These are some of our paying customers.
                            </p>
                            <div className="flex flex-wrap gap-x-10 gap-y-5 items-center">
                                <ElevenLabsLogo className="fill-current h-6 w-auto" />
                                <JuiceboxLogo className="fill-current h-6 w-auto" />
                                <ExaLogo className="h-6 w-auto" />
                            </div>
                        </section>

                        <nav
                            aria-label="Contents"
                            className="flex flex-wrap gap-x-6 gap-y-3 py-4 border-b border-primary text-xs font-mono"
                        >
                            <Link to="#how-it-works">01 / How it works</Link>
                            <Link to="#findings">02 / Observations</Link>
                            <Link to="#scanners">03 / Scanners</Link>
                            <Link to="#setup">04 / Getting started</Link>
                            <Link to="#mcp">05 / MCP</Link>
                        </nav>

                        <section id="how-it-works" className="py-10 @3xl:py-14 scroll-mt-6">
                            <p className="font-mono text-xs uppercase tracking-widest text-secondary mb-3">
                                01 / How it works
                            </p>
                            <h2 className="text-3xl @3xl:text-4xl tracking-tight font-bold mt-0 mb-5">
                                What does it do?
                            </h2>
                            <p className="text-lg leading-relaxed max-w-3xl mb-8">
                                Replay Vision uses AI to automatically watch your session recordings and turn what it
                                sees into structured, queryable data.
                            </p>
                            <div className="grid @2xl:grid-cols-3 border-y-2 border-primary">
                                <div className="py-6 @2xl:pr-6 border-b @2xl:border-b-0 @2xl:border-r border-primary">
                                    <p className="font-mono text-xs text-secondary mb-3">INPUT →</p>
                                    <h3 className="text-xl font-bold mt-0 mb-3">Session recordings</h3>
                                    <p className="text-sm text-secondary leading-relaxed m-0">
                                        Session Replay records what happens in a user's session – clicks, scrolls, form
                                        inputs, page views, network requests, console logs – and plays it back like
                                        video.
                                    </p>
                                </div>
                                <div className="py-6 @2xl:px-6 border-b @2xl:border-b-0 @2xl:border-r border-primary">
                                    <p className="font-mono text-xs text-secondary mb-3">SCANNER →</p>
                                    <h3 className="text-xl font-bold mt-0 mb-3">Scanners</h3>
                                    <p className="text-sm text-secondary leading-relaxed m-0">
                                        There are two ways a scanner produces observations: automatically in the
                                        background as new recordings come in, or on-demand against recordings you pick.
                                    </p>
                                </div>
                                <div className="py-6 @2xl:pl-6">
                                    <p className="font-mono text-xs text-secondary mb-3">OUTPUT ↴</p>
                                    <h3 className="text-xl font-bold mt-0 mb-3">Observations</h3>
                                    <p className="text-sm text-secondary leading-relaxed m-0">
                                        Each observation runs the scanner against that session and produces a structured
                                        result that's persisted and emitted as a queryable{' '}
                                        <code>$recording_observed</code> event.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section id="findings" className="pb-12 @3xl:pb-16 scroll-mt-6">
                            <div className="flex flex-col @2xl:flex-row @2xl:items-end justify-between gap-4 mb-6">
                                <div>
                                    <p className="font-mono text-xs uppercase tracking-widest text-secondary mb-3">
                                        02 / Observations
                                    </p>
                                    <h2 className="text-3xl @3xl:text-4xl tracking-tight font-bold !m-0">
                                        Confidence and citations
                                    </h2>
                                </div>
                                <span className="font-mono text-xs text-secondary shrink-0">
                                    [Website] Opportunity miner
                                </span>
                            </div>
                            <p className="max-w-3xl text-secondary leading-relaxed mb-6">
                                Each scanner has an <strong>Observations</strong> tab listing every observation it's
                                produced.
                            </p>
                            <figure className="m-0 border-2 border-primary rounded-sm overflow-hidden bg-accent/30">
                                <div className="border-b border-primary px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                                    <span>Replay Vision / [Website] Opportunity miner / Observation</span>
                                </div>
                                <div className="p-2 @xl:p-5 bg-accent/40">
                                    <ZoomImage>
                                        <img
                                            src={opportunityMiner}
                                            alt="The [Website] Opportunity miner scanner returns a Yes verdict, with timestamped reasoning showing a visitor searching for the changelog RSS feed"
                                            className="w-full block"
                                            loading="lazy"
                                        />
                                    </ZoomImage>
                                </div>
                                <figcaption className="grid @2xl:grid-cols-3 border-t border-primary text-sm">
                                    <p className="@2xl:col-span-3 !m-0 p-5 border-b border-primary">
                                        [Website] Opportunity miner: Yes verdict, 90% confidence. This observation
                                        became a{' '}
                                        <Link to="https://github.com/PostHog/posthog.com/pull/20192">
                                            merged PR the same day
                                        </Link>
                                        .
                                    </p>
                                    <div className="p-5 border-b @2xl:border-b-0 @2xl:border-r border-primary">
                                        <strong className="block mb-2">1. Verdict</strong>
                                        <span className="text-secondary">
                                            A yes/no verdict with a confidence score.
                                        </span>
                                    </div>
                                    <div className="p-5 border-b @2xl:border-b-0 @2xl:border-r border-primary">
                                        <strong className="block mb-2">2. Reasoning</strong>
                                        <span className="text-secondary">
                                            The model's reasoning, with clickable citations that jump the embedded
                                            player to the relevant moment.
                                        </span>
                                    </div>
                                    <div className="p-5">
                                        <strong className="block mb-2">3. Prompt</strong>
                                        <span className="text-secondary">
                                            The prompt that produced this result – the exact text Gemini saw, frozen
                                            even if you edit the scanner afterwards.
                                        </span>
                                    </div>
                                </figcaption>
                            </figure>
                        </section>
                    </div>

                    <section id="scanners" className="border-y-2 border-primary bg-accent/30 scroll-mt-6">
                        <div className="max-w-6xl mx-auto px-5 @xl:px-10 py-10 @3xl:py-14">
                            <p className="font-mono text-xs uppercase tracking-widest text-secondary mb-3">
                                03 / Scanners
                            </p>
                            <h2 className="text-3xl @3xl:text-4xl tracking-tight font-bold mt-0 mb-5">
                                What it looks for
                            </h2>
                            <p className="text-secondary leading-relaxed max-w-3xl mb-8">
                                Instead of manually reviewing hundreds of replays to spot a pattern, you describe what
                                matters once and let it run continuously.
                            </p>
                            <div className="grid @2xl:grid-cols-2 border-t border-l border-primary">
                                {scanners.map(({ title, description, output, Icon, color }) => (
                                    <div
                                        key={title}
                                        className="bg-primary border-r border-b border-primary p-5 @3xl:p-6 flex items-start gap-4"
                                    >
                                        <Icon className={`size-7 shrink-0 ${color}`} />
                                        <div>
                                            <h3 className="text-lg font-bold mt-0 mb-2">{title}</h3>
                                            <p className="text-sm text-secondary leading-relaxed mb-4">{description}</p>
                                            {output && (
                                                <span className="inline-block font-mono text-xs border border-primary rounded-sm px-2 py-1">
                                                    {output}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link
                                to="/docs/replay-vision/scanner-types"
                                state={{ newWindow: true }}
                                className="inline-block font-semibold text-sm mt-6"
                            >
                                Scanner types →
                            </Link>
                        </div>
                    </section>

                    <div className="max-w-6xl mx-auto px-5 @xl:px-10">
                        <section id="setup" className="py-10 @3xl:py-14 border-b border-primary scroll-mt-6">
                            <p className="font-mono text-xs uppercase tracking-widest text-secondary mb-3">
                                04 / Getting started
                            </p>
                            <h2 className="text-3xl @3xl:text-4xl tracking-tight font-bold mt-0 mb-8">
                                Install with AI in a single prompt
                            </h2>
                            <div className="grid @3xl:grid-cols-[1.1fr_1fr] gap-8 @3xl:gap-12">
                                <div>
                                    <h3 className="text-xl font-bold mt-0 mb-4">Install with the PostHog Wizard</h3>
                                    <p className="text-secondary leading-relaxed mb-6">
                                        Run it in your project directory and it reads your codebase, installs the
                                        PostHog SDK if you don't have it yet, turns Session Replay on, and creates three
                                        scanners written for your product: one that watches your key flow for breakage,
                                        one that watches for user frustration, and one that summarizes sessions.
                                    </p>
                                    <WizardCommand command="replay-vision" variant="bordered" slim />
                                    <p className="text-sm text-secondary leading-relaxed my-6">
                                        The scanners it creates are ordinary scanners. You can edit the prompt, filters,
                                        and sampling rate afterwards, or delete them and start over.
                                    </p>
                                    <Link
                                        to="/docs/replay-vision/start-here"
                                        state={{ newWindow: true }}
                                        className="text-sm font-semibold"
                                    >
                                        Getting started →
                                    </Link>
                                </div>
                                <div className="border-2 border-primary bg-accent/30 p-6">
                                    <p className="font-mono text-xs uppercase tracking-widest text-secondary mb-3">
                                        In the app
                                    </p>
                                    <h3 className="text-xl font-bold mt-0 mb-4">
                                        Open Replay Vision and pick a template
                                    </h3>
                                    <p className="text-secondary leading-relaxed mb-5">
                                        Open Replay Vision from the side menu, then click New scanner. You'll land on
                                        the templates picker.
                                    </p>
                                    <p className="text-sm text-secondary leading-relaxed mb-6">
                                        You should already have Session Replay recording sessions for your project.
                                        Replay Vision watches those recordings – without them there's nothing to scan.
                                    </p>
                                    <CallToAction type="secondary" to="/docs/replay-vision/start-here">
                                        Getting started →
                                    </CallToAction>
                                </div>
                            </div>
                        </section>

                        <section id="mcp" className="py-10 @3xl:py-14 scroll-mt-6">
                            <p className="font-mono text-xs uppercase tracking-widest text-secondary mb-3">05 / MCP</p>
                            <h2 className="text-3xl @3xl:text-4xl tracking-tight font-bold mt-0 mb-5">
                                Without leaving your editor.
                            </h2>
                            <p className="text-secondary text-lg leading-relaxed max-w-3xl mb-8">
                                The PostHog MCP server exposes Replay Vision through a set of tools your AI coding agent
                                can call directly – author scanners, trigger observations on demand, and read results
                                without leaving your editor.
                            </p>
                            <div className="grid @3xl:grid-cols-[1.3fr_1fr] gap-8">
                                <div className="border-2 border-primary rounded-sm overflow-hidden min-w-0">
                                    <div className="flex items-center gap-2 px-4 py-3 bg-accent border-b border-primary font-mono text-xs">
                                        <IconCode className="size-4" /> Example prompts
                                    </div>
                                    {prompts.map(({ title, prompt }) => (
                                        <details
                                            key={title}
                                            className="border-t border-primary bg-purple/5 p-5 @xl:p-6"
                                        >
                                            <summary className="font-semibold cursor-pointer">{title}</summary>
                                            <blockquote className="!m-0 !mt-4 !border-0 !p-0 font-mono text-sm leading-relaxed">
                                                {prompt}
                                            </blockquote>
                                        </details>
                                    ))}
                                    <div className="p-5 border-t border-primary">
                                        <WizardCommand command="mcp add" variant="bordered" slim />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold mt-0 mb-4">What you can do</h3>
                                    <ul className="!p-0 space-y-5 text-sm text-secondary leading-relaxed list-none">
                                        <li className="flex items-start gap-3">
                                            <IconCode className="size-5 shrink-0 mt-0.5" aria-hidden="true" />
                                            <div>
                                                <strong className="text-primary">
                                                    Author a scanner from your editor
                                                </strong>{' '}
                                                – describe what to look for in natural language and have the agent draft
                                                the scanner config, project the per-month volume, and create it.
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <IconCursorClick className="size-5 shrink-0 mt-0.5" aria-hidden="true" />
                                            <div>
                                                <strong className="text-primary">
                                                    Trigger an observation on demand
                                                </strong>{' '}
                                                – scan a specific session you're investigating without switching to the
                                                app.
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <IconDocument className="size-5 shrink-0 mt-0.5" aria-hidden="true" />
                                            <div>
                                                <strong className="text-primary">
                                                    Read observations as part of a coding task
                                                </strong>{' '}
                                                – pull the structured result and the model's reasoning into context as
                                                the agent works.
                                            </div>
                                        </li>
                                    </ul>
                                    <Link
                                        to="/docs/replay-vision/mcp"
                                        state={{ newWindow: true }}
                                        className="inline-block text-sm font-semibold mt-5"
                                    >
                                        MCP →
                                    </Link>
                                </div>
                            </div>
                            <p className="mt-6 mb-0 font-mono text-xs text-secondary">
                                This works in any MCP client – Cursor, Codex, Claude Code, Windsurf, VS Code, and
                                others.
                            </p>
                        </section>

                        <section className="border-y border-primary py-10">
                            <p className="font-mono text-xs uppercase tracking-widest text-secondary mb-3">
                                06 / Questions
                            </p>
                            <h2 className="text-3xl font-bold mt-0 mb-6">Questions?</h2>
                            <details className="border-t border-primary py-5">
                                <summary className="font-bold cursor-pointer">Session Replay</summary>
                                <p className="text-secondary leading-relaxed mt-4 mb-0 max-w-3xl">
                                    You should already have Session Replay recording sessions for your project. Replay
                                    Vision watches those recordings – without them there's nothing to scan. An
                                    organization admin needs to approve AI data processing in the organization settings.
                                </p>
                            </details>
                            <details className="border-t border-primary py-5">
                                <summary className="font-bold cursor-pointer">
                                    Wiring observations into the rest of PostHog
                                </summary>
                                <p className="text-secondary leading-relaxed mt-4 mb-0 max-w-3xl">
                                    Every successful observation is captured as a <code>$recording_observed</code> event
                                    in your project, so you can build insights, dashboards, and alerts on top of Replay
                                    Vision output using PostHog's SQL.{' '}
                                    <Link to="/docs/replay-vision/observations" state={{ newWindow: true }}>
                                        Observations →
                                    </Link>
                                </p>
                                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
                                    <Link to="/docs/replay-vision/calibration" state={{ newWindow: true }}>
                                        Calibration →
                                    </Link>
                                    <Link
                                        to="/docs/replay-vision/observations#scanner-impact-and-cohorts"
                                        state={{ newWindow: true }}
                                    >
                                        Scanner impact and cohorts →
                                    </Link>
                                </div>
                            </details>
                            <details id="credits" className="border-t border-primary py-5 scroll-mt-6">
                                <summary className="font-bold cursor-pointer">Get started – free</summary>
                                <p className="text-secondary leading-relaxed mt-4 mb-0">
                                    You get the first 2,500 credits free every month, then pricing starts at
                                    $0.01/credit and reduces with volume.
                                </p>
                                <p className="text-sm text-secondary leading-relaxed mt-3 mb-0">
                                    Every successful observation costs a fixed number of credits that depends on the
                                    model the scanner uses – newer models tend to produce higher-quality observations
                                    but cost more per observation.{' '}
                                    <Link to="/docs/replay-vision/quota-and-limits" state={{ newWindow: true }}>
                                        Quota and limits →
                                    </Link>
                                </p>
                                <p className="text-sm font-semibold mt-3 mb-0">
                                    <Link to="/docs/replay-vision/start-here" state={{ newWindow: true }}>
                                        Estimate your usage first →
                                    </Link>
                                </p>
                            </details>
                            <details className="border-t border-primary py-5">
                                <summary className="font-bold cursor-pointer">Daily digest</summary>
                                <p className="text-secondary leading-relaxed mt-4 mb-0">
                                    A daily summary of what this scanner found, and the sessions worth watching.
                                </p>
                                <p className="text-sm text-secondary leading-relaxed mt-3 mb-0">
                                    Scouts run only on projects with self-driving enabled. Scout runs are billed as part
                                    of self-driving, separately from the credits a scanner spends on observations.{' '}
                                    <Link to="/docs/replay-vision/scouts" state={{ newWindow: true }}>
                                        Scouts →
                                    </Link>
                                </p>
                            </details>
                            <div className="border-t border-primary pt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
                                <Link to="/docs/session-replay/mobile" state={{ newWindow: true }}>
                                    Mobile session replay →
                                </Link>
                                <Link to="/docs/session-replay/privacy" state={{ newWindow: true }}>
                                    Privacy controls →
                                </Link>
                                <Link to="/docs/replay-vision/troubleshooting" state={{ newWindow: true }}>
                                    Troubleshooting →
                                </Link>
                            </div>
                        </section>

                        <section className="py-10 @3xl:py-12">
                            <h2 className="text-2xl font-bold mt-0 mb-6">Further reading</h2>
                            <div className="grid @2xl:grid-cols-3 gap-6">
                                {reading.map(({ label, title, to }) => (
                                    <Link
                                        key={to}
                                        to={to}
                                        state={{ newWindow: true }}
                                        className="block border-t-2 border-primary pt-4 hover:border-orange"
                                    >
                                        <p className="font-mono text-xs text-secondary mb-3">{label}</p>
                                        <h3 className="text-base font-bold mt-0 mb-3">{title} ↗</h3>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </div>

                    <footer className="border-t-2 border-primary bg-yellow/10">
                        <div className="max-w-6xl mx-auto px-5 @xl:px-10 py-10 flex flex-col @2xl:flex-row items-center gap-8">
                            <img src={explorerHog} alt="" className="w-36 shrink-0" loading="lazy" />
                            <div className="flex-1">
                                <h2 className="text-3xl @3xl:text-4xl font-bold tracking-tight mt-0 mb-3">
                                    Your product, watching itself
                                </h2>
                                <p className="text-sm mb-5">You get the first 2,500 credits free every month</p>
                                <div className="flex flex-wrap gap-3">
                                    <CallToAction type="primary" size="lg" to="https://app.posthog.com/signup">
                                        Get started free
                                    </CallToAction>
                                    <CallToAction type="secondary" size="lg" to="#setup">
                                        Install with AI
                                    </CallToAction>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </Editor>
        </>
    )
}
