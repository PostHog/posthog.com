import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Link from 'components/Link'
import { IconRewindPlay, IconBolt, IconNotebook, IconPullRequest, IconCheckCircle, IconTrends } from '@posthog/icons'

/**
 * SelfDrivingLoop
 *
 * The animated explainer for PostHog's self-improving loop. It replaces the static Mermaid
 * diagram on the self-driving docs: a horizontal stepper walks the loop's six stages, featuring
 * the most recent real pull request the loop opened. It auto-plays, pauses on hover so a step
 * can be read, and each stage is clickable to explore at your own pace.
 *
 * Scope: this is the loop diagram ONLY. The live "real PRs the loop opened" rail lives in a
 * separate component (SelfDrivingPRRail) so it can be placed independently.
 *
 * Data (build-time, no runtime calls): reads the `SelfDrivingPullRequest` GraphQL nodes produced
 * by sourceSelfDrivingPRs() in gatsby/sourceNodes.ts and features the most recently opened one.
 * Only the Pull request / You review / Measured stages have real per-PR data from GitHub; the
 * earlier stages describe the loop generically (that provenance isn't in GitHub's API). With no
 * nodes it falls back to a fully generic story and still renders.
 *
 * Design notes:
 * - Static-first / SSR-safe: the full layout renders with no JS; the progress animation is
 *   progressive enhancement. Relative timestamps are computed client-side (fresh between deploys).
 * - Stage colors are component-local constants (not project tokens); structural theming uses
 *   var-backed tokens that flip with the theme, so light and dark both work.
 * - Responsiveness uses @container queries, never media queries – the docs render in a resizable window.
 */

// Per-stage color. Signals keeps the diagram's amber; Report uses the `teal` brand token so the
// two adjacent "data" stages read as distinct. Same in light and dark.
const COLOR = {
    source: '#1490E8', // signal sources (blue)
    signals: '#FFA81C', // signals (amber)
    report: '#29DBBB', // report (teal brand token)
    agent: '#A737D2', // pull request (purple)
    human: '#47C861', // review / merge (green)
    outcome: '#FF474D', // measured (red)
} as const

type Stage = {
    key: string
    label: string
    Icon: React.ComponentType<{ className?: string }>
    color: string
}

// The six loop stages, in order.
const STAGES: Stage[] = [
    { key: 'source', label: 'Signal source', Icon: IconRewindPlay, color: COLOR.source },
    { key: 'signals', label: 'Signals', Icon: IconBolt, color: COLOR.signals },
    { key: 'report', label: 'Report', Icon: IconNotebook, color: COLOR.report },
    { key: 'pr', label: 'Pull request', Icon: IconPullRequest, color: COLOR.agent },
    { key: 'review', label: 'You review', Icon: IconCheckCircle, color: COLOR.human },
    { key: 'measured', label: 'Measured', Icon: IconTrends, color: COLOR.outcome },
]

type SelfDrivingPR = {
    prNumber: number
    summary: string
    type: string
    scope: string
    url: string
    state: string | null
    openedAt: string | null
    mergedAt: string | null
}

// Short, human "N ago" – computed in the browser so it stays fresh between rebuilds.
const timeAgo = (iso: string | null): string => {
    if (!iso) return ''
    const then = new Date(iso).getTime()
    if (Number.isNaN(then)) return ''
    const seconds = Math.max(0, (Date.now() - then) / 1000)
    const days = Math.floor(seconds / 86400)
    if (days >= 7) return `${Math.floor(days / 7)}w ago`
    if (days >= 1) return `${days}d ago`
    const hours = Math.floor(seconds / 3600)
    if (hours >= 1) return `${hours}h ago`
    const minutes = Math.floor(seconds / 60)
    return minutes >= 1 ? `${minutes}m ago` : 'just now'
}

type Beat = { when: string; text: React.ReactNode }

// Per-stage narration for the featured PR. The first three stages are generic (GitHub can't tell
// us which signal fired or how it was grouped); the last three use the PR's real data. Falls back
// to a fully generic story when there's no PR.
const buildJourney = (hero: SelfDrivingPR | null): Beat[] => {
    const merged = hero?.state === 'merged'
    const prTag = hero ? <b className="font-mono">#{hero.prNumber}</b> : <b>a pull request</b>
    return [
        {
            when: 'continuously',
            text: (
                <>
                    Signal sources and scouts watch your product around the clock – session replays, errors, health
                    checks, and more – flagging what&apos;s worth a closer look.
                </>
            ),
        },
        {
            when: 'as they arrive',
            text: (
                <>
                    The signals that matter are raised into the inbox, where PostHog deduplicates them and lines up the
                    related ones.
                </>
            ),
        },
        {
            when: 'grouped & ranked',
            text: (
                <>
                    Related signals cluster into a single <b>report</b>, ranked by how much impact fixing it would have.
                </>
            ),
        },
        {
            when: hero ? `opened ${timeAgo(hero.openedAt)}` : 'when actionable',
            text: hero ? (
                <>
                    A research agent investigated the report and opened {prTag}: {hero.summary}
                </>
            ) : (
                <>When a report is actionable, a research agent opens {prTag} with the fix.</>
            ),
        },
        {
            when: merged ? `merged ${timeAgo(hero?.mergedAt ?? null)}` : 'awaiting review',
            text: merged ? (
                <>
                    You reviewed {prTag} and merged it. <b>Nothing ships without you.</b>
                </>
            ) : (
                <>
                    The draft is waiting for a human to review and merge. <b>Nothing ships without you.</b>
                </>
            ),
        },
        {
            when: merged ? 'after merge' : 'after it ships',
            text: (
                <>PostHog measures whether the change actually worked, and feeds the result back in as new signals.</>
            ),
        },
    ]
}

const STEP_MS = 5000 // dwell time per stage while animating – slow enough to read each one

// Flowing-dashes animation for the connecting track: dashes march left→right so the line reads as
// data moving through the pipeline. Color comes from `currentColor` (set to the grey border token
// on the element), and the flow freezes under prefers-reduced-motion.
const FLOW_CSS = `
@keyframes sdlFlow { to { background-position: 15px 0; } }
.sdl-flow {
  background-image: repeating-linear-gradient(90deg, currentColor 0 9px, transparent 9px 15px);
  animation: sdlFlow 0.9s linear infinite;
}
@media (prefers-reduced-motion: reduce) { .sdl-flow { animation: none; } }
`

const SelfDrivingLoop = (): JSX.Element => {
    const data = useStaticQuery(graphql`
        query SelfDrivingLoopHero {
            allSelfDrivingPullRequest {
                nodes {
                    prNumber
                    summary
                    type
                    scope
                    url
                    state
                    openedAt
                    mergedAt
                }
            }
        }
    `)

    // Feature the most recently opened PR (the freshest thing the loop has done).
    const hero: SelfDrivingPR | null = React.useMemo(() => {
        const nodes: SelfDrivingPR[] = data?.allSelfDrivingPullRequest?.nodes ?? []
        if (nodes.length === 0) return null
        return [...nodes].sort((a, b) => new Date(b.openedAt || 0).getTime() - new Date(a.openedAt || 0).getTime())[0]
    }, [data])

    const journey = React.useMemo(() => buildJourney(hero), [hero])

    const [active, setActive] = React.useState(0)
    const [motionOK, setMotionOK] = React.useState(true)
    const parkedRef = React.useRef(false) // user clicked a stage – took manual control, stop auto-advance
    const hoverRef = React.useRef(false) // pointer/focus is over the loop – pause so it can be read

    // Respect reduced-motion: stop auto-advancing and park on the "Pull request" beat (the punchline).
    React.useEffect(() => {
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) {
            setMotionOK(false)
            setActive(3)
        }
    }, [])

    React.useEffect(() => {
        if (!motionOK) return
        const id = window.setInterval(() => {
            if (!parkedRef.current && !hoverRef.current) {
                setActive((i) => (i + 1) % STAGES.length)
            }
        }, STEP_MS)
        return () => window.clearInterval(id)
    }, [motionOK])

    // Clicking a stage parks the runner there so a reader can step through at their own pace.
    const selectStage = (i: number) => {
        parkedRef.current = true
        setActive(i)
    }

    const setHover = (v: boolean) => {
        hoverRef.current = v
    }

    const current = STAGES[active]

    return (
        <div className="not-prose @container my-6 text-primary">
            {/* Keyframes for the flowing-dashes track. Scoped by class; kept in-component so it
                doesn't touch the global Tailwind config. Freezes under reduced-motion. */}
            <style>{FLOW_CSS}</style>
            <div className="rounded-2xl border border-primary bg-primary px-5 py-6 shadow-sm @[600px]:px-8 @[600px]:py-7">
                {/* Header: which PR, and the live source */}
                <div className="mb-7 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span className="text-[13px] font-semibold text-primary">
                        {hero ? (
                            <>
                                Watch{' '}
                                <Link
                                    to={hero.url}
                                    external
                                    externalNoIcon
                                    className="font-mono text-red hover:underline"
                                >
                                    PR #{hero.prNumber}
                                </Link>{' '}
                                move through the loop
                            </>
                        ) : (
                            'Watch a pull request move through the loop'
                        )}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-secondary">
                        <span className="relative flex size-2">
                            {motionOK && (
                                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green opacity-60" />
                            )}
                            <span className="relative inline-flex size-2 rounded-full bg-green" />
                        </span>
                        Live from github.com/PostHog/posthog
                    </span>
                </div>

                {/* Stepper: 3 cols on narrow screens → single row of 6 at @[600px]. The flowing
                    connecting track is the single-row treatment. */}
                <div
                    className="relative grid grid-cols-3 gap-y-7 @[600px]:grid-cols-6 @[600px]:gap-y-0"
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onFocusCapture={() => setHover(true)}
                    onBlurCapture={() => setHover(false)}
                >
                    {/* Connecting track: a single thin grey line whose dashes flow left→right, so
                        data reads as moving through the pipeline. No base line, no stage tint.
                        Freezes under reduced-motion (single-row layout only). */}
                    <div
                        className="absolute left-[8.33%] right-[8.33%] top-[22px] hidden h-px overflow-hidden @[600px]:block"
                        aria-hidden
                    >
                        <div className="sdl-flow absolute inset-0" style={{ color: 'rgb(var(--border))' }} />
                    </div>

                    {STAGES.map((stage, i) => {
                        const isActive = i === active
                        const done = i <= active
                        const { Icon } = stage
                        return (
                            <button
                                key={stage.key}
                                type="button"
                                onClick={() => selectStage(i)}
                                aria-pressed={isActive}
                                aria-label={stage.label}
                                className="group relative z-10 flex cursor-pointer flex-col items-center gap-2.5 px-1 text-center"
                            >
                                <span
                                    className="relative flex size-11 items-center justify-center rounded-full bg-primary transition-all duration-300"
                                    style={{
                                        transform: isActive ? 'scale(1.08)' : 'scale(1)',
                                        boxShadow: isActive ? `0 0 0 4px ${stage.color}2e` : 'none',
                                    }}
                                    aria-hidden
                                >
                                    {/* Opaque color fill so the connecting track never shows through the
                                        badge. Full color once reached, a pale tint while still upcoming. */}
                                    <span
                                        className="absolute inset-0 rounded-full transition-opacity duration-300"
                                        style={{ backgroundColor: stage.color, opacity: done ? 1 : 0.12 }}
                                    />
                                    <span className="relative" style={{ color: done ? '#ffffff' : stage.color }}>
                                        <Icon className="size-[22px]" />
                                    </span>
                                </span>
                                <span
                                    className="text-[12.5px] font-semibold leading-tight transition-colors duration-300"
                                    style={{ color: isActive ? stage.color : undefined }}
                                >
                                    {stage.label}
                                </span>
                            </button>
                        )
                    })}
                </div>

                {/* Loop-back caption – only on the final (Measured) step, where the outcome
                    feeds back to the start and closes the cycle. Sits right under the loop row. */}
                {active === STAGES.length - 1 && (
                    <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11.5px] text-secondary">
                        <span aria-hidden>↻</span>
                        the outcome feeds back in as new signals
                    </p>
                )}

                {/* Narration for the active stage */}
                <div
                    className="mt-4 flex flex-col gap-1 rounded-xl bg-accent p-4 @[520px]:flex-row @[520px]:gap-4"
                    style={{ boxShadow: `inset 3px 0 0 ${current.color}` }}
                >
                    <span
                        className="shrink-0 pt-px font-mono text-[11.5px] text-secondary @[520px]:min-w-[104px]"
                        suppressHydrationWarning
                    >
                        {journey[active].when}
                    </span>
                    <span className="text-sm leading-relaxed">
                        <span
                            className="mb-0.5 block text-[11px] font-bold uppercase tracking-wide"
                            style={{ color: current.color }}
                        >
                            {current.label}
                        </span>
                        {journey[active].text}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SelfDrivingLoop
export { SelfDrivingLoop }
