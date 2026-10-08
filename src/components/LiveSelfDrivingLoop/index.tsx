import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Link from 'components/Link'
import { IconRewindPlay, IconBolt, IconNotebook, IconPullRequest, IconCheckCircle, IconTrends } from '@posthog/icons'

/**
 * LiveSelfDrivingLoop
 *
 * The animated explainer for PostHog's self-improving loop. It replaces the static Mermaid
 * diagram on the self-driving docs: the six stages, with a real merged pull request travelling
 * through them, and a return arrow closing the cycle (Measured → new signals → Signal source).
 * It auto-plays, pauses on hover so a step can be read, and each stage is clickable to explore –
 * it rejoins the loop on its own after a short idle.
 *
 * Data (build-time, no runtime calls): reads the `SelfDrivingPullRequest` GraphQL nodes produced
 * by sourceSelfDrivingPRs() in gatsby/sourceNodes.ts and features one recent *merged* PR. Merged-
 * only is the vetting mechanism: a human already reviewed and merged each, so the public diagram
 * can't surface a half-baked draft. Which PR is featured rotates on each page load, so a refresh
 * gets a fresh one. Only the Pull request / You review / Measured stages have real per-PR data
 * from GitHub; the earlier stages describe the loop generically. With no nodes it falls back to a
 * generic story and still renders.
 *
 * Design notes:
 * - Static-first / SSR-safe: the full layout renders with no JS; animation is progressive.
 * - Wide (@[600px]): a horizontal row with a flowing connector + a curved return arrow beneath.
 *   Narrow: a vertical stepper with a flowing vertical connector. Both via @container queries.
 * - Stage colors are component-local constants; structural theming uses var-backed tokens.
 */

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

type Beat = { text: React.ReactNode }

// Per-stage narration for the featured PR. The first three stages are generic (GitHub can't tell
// us which signal fired or how it was grouped); the last three use the PR's real data. Falls back
// to a fully generic story when there's no PR.
const buildJourney = (hero: SelfDrivingPR | null): Beat[] => {
    const prTag = hero ? <b className="font-mono">#{hero.prNumber}</b> : <b>a pull request</b>
    return [
        {
            text: (
                <>
                    Signal sources and scouts watch your product around the clock – session replays, errors, health
                    checks, and more – flagging what&apos;s worth a closer look.
                </>
            ),
        },
        {
            text: (
                <>
                    The signals that matter are raised into the inbox, where PostHog deduplicates them and lines up the
                    related ones.
                </>
            ),
        },
        {
            text: (
                <>
                    Related signals cluster into a single <b>report</b>, ranked by how much impact fixing it would have.
                </>
            ),
        },
        {
            text: hero ? (
                <>
                    A research agent investigated the report and opened {prTag}: {hero.summary}
                </>
            ) : (
                <>When a report is actionable, a research agent opens {prTag} with the fix.</>
            ),
        },
        {
            text: (
                <>
                    You reviewed {prTag} and merged it. <b>Nothing ships without you.</b>
                </>
            ),
        },
        {
            text: (
                <>PostHog measures whether the change actually worked, and feeds the result back in as new signals.</>
            ),
        },
    ]
}

const STEP_MS = 5000 // dwell time per stage while animating – slow enough to read each one
const RESUME_MS = 1800 // a parked loop rejoins the animation after this long with no further clicks

// Flowing-dashes connector: dashes march along the track so data reads as moving through the
// pipeline. Horizontal on wide, vertical on narrow; both freeze under prefers-reduced-motion.
const FLOW_CSS = `
@keyframes sdlFlow { to { background-position: 15px 0; } }
@keyframes sdlFlowV { to { background-position: 0 15px; } }
.sdl-flow { background-image: repeating-linear-gradient(90deg, currentColor 0 9px, transparent 9px 15px); animation: sdlFlow 0.9s linear infinite; }
.sdl-flow-v { background-image: repeating-linear-gradient(180deg, currentColor 0 9px, transparent 9px 15px); animation: sdlFlowV 0.9s linear infinite; }
@media (prefers-reduced-motion: reduce) { .sdl-flow, .sdl-flow-v { animation: none; } }
`

// One stage badge – shared by both layouts. `done` = reached; `active` = current.
const StageBadge = ({ stage, done, active }: { stage: Stage; done: boolean; active: boolean }): JSX.Element => {
    const { Icon } = stage
    return (
        <span
            className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-primary transition-all duration-300"
            style={{
                transform: active ? 'scale(1.08)' : 'scale(1)',
                boxShadow: active ? `0 0 0 4px ${stage.color}2e` : 'none',
            }}
            aria-hidden
        >
            <span
                className="absolute inset-0 rounded-full transition-opacity duration-300"
                style={{ backgroundColor: stage.color, opacity: done ? 1 : 0.12 }}
            />
            <span className="relative" style={{ color: done ? '#ffffff' : stage.color }}>
                <Icon className="size-[22px]" />
            </span>
        </span>
    )
}

const LiveSelfDrivingLoop = (): JSX.Element => {
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

    // Recent MERGED PRs only (merged = human-reviewed = vetted). We rotate which one is featured
    // on each page load, so a refresh surfaces a fresh PR.
    const featured: SelfDrivingPR[] = React.useMemo(() => {
        const nodes: SelfDrivingPR[] = data?.allSelfDrivingPullRequest?.nodes ?? []
        return nodes
            .filter((n) => n.state === 'merged')
            .sort((a, b) => new Date(b.mergedAt || 0).getTime() - new Date(a.mergedAt || 0).getTime())
            .slice(0, 8)
    }, [data])

    const [featuredIndex, setFeaturedIndex] = React.useState(0)
    const [active, setActive] = React.useState(0)
    const [motionOK, setMotionOK] = React.useState(true)
    const [paused, setPaused] = React.useState(false) // reader clicked a stage – took manual control
    const [hovered, setHovered] = React.useState(false) // pointer/focus over the loop – gentle pause

    const hero: SelfDrivingPR | null = featured[featuredIndex] ?? null
    const journey = React.useMemo(() => buildJourney(hero), [hero])

    // Rotate the featured PR per page load (persisted so each refresh advances to the next one).
    React.useEffect(() => {
        if (featured.length === 0) return
        let next = 0
        try {
            const prev = parseInt(window.localStorage.getItem('sdl-featured') ?? '', 10)
            next = ((Number.isFinite(prev) ? prev : -1) + 1) % featured.length
            window.localStorage.setItem('sdl-featured', String(next))
        } catch {
            next = 0
        }
        setFeaturedIndex(next)
    }, [featured.length])

    // Respect reduced-motion: no autoplay, park on the "Pull request" beat (the punchline).
    React.useEffect(() => {
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) {
            setMotionOK(false)
            setActive(3)
        }
    }, [])

    // Auto-play one stage per tick, looping back to the start after Measured.
    React.useEffect(() => {
        if (!motionOK || paused || hovered) return
        const id = window.setTimeout(() => setActive((i) => (i + 1) % STAGES.length), STEP_MS)
        return () => window.clearTimeout(id)
    }, [motionOK, paused, hovered, active])

    // Once parked by a click, rejoin the loop after a short idle. Keyed on `active` so each click
    // resets the countdown.
    React.useEffect(() => {
        if (!paused) return
        const id = window.setTimeout(() => setPaused(false), RESUME_MS)
        return () => window.clearTimeout(id)
    }, [paused, active])

    const selectStage = (i: number) => {
        setPaused(true)
        setActive(i)
    }

    const current = STAGES[active]
    const hoverProps = {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
        onFocusCapture: () => setHovered(true),
        onBlurCapture: () => setHovered(false),
    }

    return (
        <div className="not-prose @container my-6 text-primary">
            <style>{FLOW_CSS}</style>
            <div className="rounded-2xl border border-primary bg-primary px-5 py-6 shadow-sm @[600px]:px-8 @[600px]:py-7">
                <div {...hoverProps}>
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
                                {motionOK && !paused && (
                                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-green opacity-60" />
                                )}
                                <span className="relative inline-flex size-2 rounded-full bg-green" />
                            </span>
                            Live from github.com/PostHog/posthog
                        </span>
                    </div>

                    {/* ---------- Wide layout: horizontal row + flowing line + curved return arrow ---------- */}
                    <div className="hidden @[600px]:block">
                        <div className="relative grid grid-cols-6">
                            {/* forward flowing connector */}
                            <div
                                className="absolute left-[8.33%] right-[8.33%] top-[22px] h-px overflow-hidden"
                                aria-hidden
                            >
                                <div className="sdl-flow absolute inset-0" style={{ color: 'rgb(var(--border))' }} />
                            </div>
                            {STAGES.map((stage, i) => (
                                <button
                                    key={stage.key}
                                    type="button"
                                    onClick={() => selectStage(i)}
                                    aria-pressed={i === active}
                                    aria-label={stage.label}
                                    className="group relative z-10 flex cursor-pointer flex-col items-center gap-2.5 px-1 text-center"
                                >
                                    <StageBadge stage={stage} done={i <= active} active={i === active} />
                                    <span
                                        className="text-[12.5px] font-semibold leading-tight transition-colors duration-300"
                                        style={{ color: i === active ? stage.color : undefined }}
                                    >
                                        {stage.label}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Return arrow: the outcome loops back to Signal source as new signals. A smooth
                            shallow U beneath the row, arrowhead up into the first stage, labelled in the middle. */}
                        <div className="relative mx-[8.33%] mt-2 h-9" aria-hidden>
                            <div className="absolute inset-x-0 top-0 bottom-[14px] rounded-b-[36px] border-x border-b border-input" />
                            <span
                                className="absolute left-0 top-0 size-0 border-x-[5px] border-b-[7px] border-x-transparent"
                                style={{
                                    borderBottomColor: 'rgb(var(--input-border))',
                                    // Center the 10px-wide head on the 1px line (center ≈0.5px) and seat its
                                    // base on the line's top so the body meets the arrowhead squarely.
                                    transform: 'translate(calc(-50% + 0.5px), -100%)',
                                }}
                            />
                            <span className="absolute bottom-[14px] left-1/2 -translate-x-1/2 translate-y-1/2 bg-primary px-2 text-[11px] text-secondary">
                                the outcome becomes new signals
                            </span>
                        </div>
                    </div>

                    {/* ---------- Narrow layout: vertical stepper + flowing vertical line ---------- */}
                    <div className="@[600px]:hidden">
                        <div className="relative flex flex-col gap-4">
                            {/* forward flowing connector (vertical, behind the badges) */}
                            <div className="absolute left-[22px] top-5 bottom-5 w-px overflow-hidden" aria-hidden>
                                <div className="sdl-flow-v absolute inset-0" style={{ color: 'rgb(var(--border))' }} />
                            </div>
                            {STAGES.map((stage, i) => (
                                <button
                                    key={stage.key}
                                    type="button"
                                    onClick={() => selectStage(i)}
                                    aria-pressed={i === active}
                                    aria-label={stage.label}
                                    className="group relative z-10 flex cursor-pointer items-center gap-3 text-left"
                                >
                                    <StageBadge stage={stage} done={i <= active} active={i === active} />
                                    <span
                                        className="text-[13.5px] font-semibold leading-tight transition-colors duration-300"
                                        style={{ color: i === active ? stage.color : undefined }}
                                    >
                                        {stage.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                        <p className="mt-4 flex items-center gap-1.5 pl-[6px] text-[11.5px] text-secondary">
                            <span aria-hidden>↻</span> the outcome becomes new signals
                        </p>
                    </div>

                    {/* Narration for the active stage */}
                    <div
                        className="mt-6 rounded-xl bg-accent p-4"
                        style={{ boxShadow: `inset 3px 0 0 ${current.color}` }}
                    >
                        <span
                            className="mb-0.5 block text-[11px] font-bold uppercase tracking-wide"
                            style={{ color: current.color }}
                        >
                            {current.label}
                        </span>
                        <span className="text-sm leading-relaxed">{journey[active].text}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LiveSelfDrivingLoop
export { LiveSelfDrivingLoop }
