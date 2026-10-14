import React, { useEffect, useRef, useState } from 'react'
import { Logo } from '@posthog/brand/logo'
import { HedgehogChart } from '@posthog/brand/hoggies'
import { IconMCP } from 'components/OSIcons'
import { usePrefersReducedMotion } from 'components/Code/usePrefersReducedMotion'
import ProductChips from '../ProductChips'
import StepIntro from '../StepIntro'
import { useElementSize, useHasBeenSeen, useInView } from '../hooks'
import { ASK_ORDER, INSIGHTS } from './insights'
import type { Asker, Insight } from './insights'
import '../animations.css'

type AskPhase = 'typing' | 'querying' | 'answered'

const PRODUCT_HANDLES = ['posthog_ai', 'product_analytics', 'web_analytics', 'data_warehouse', 'endpoints']
const TYPE_CHAR_MS = 28
const TYPE_SETTLE_MS = 350
const QUERY_MS = 1200
const ANSWER_DWELL_MS = 5200
const SEEN_VISIBILITY = 0.25
const RUNNING_VISIBILITY = 0.1

const typingMs = (question: string): number => question.length * TYPE_CHAR_MS + TYPE_SETTLE_MS
const insightByKey = (key: string): Insight => INSIGHTS.find((insight) => insight.key === key) ?? INSIGHTS[0]

function AskerChip({ asker }: { asker: Asker }): JSX.Element {
    return (
        <span className="flex items-center gap-1.5 whitespace-nowrap rounded bg-accent px-1.5 py-0.5 text-xs font-semibold text-primary [grid-area:1/1]">
            {asker === 'posthog-ai' ? (
                <>
                    <Logo.Logomark size={14} className="dark:hidden" />
                    <Logo.Logomark size={14} variant="mono" className="hidden dark:block" />
                    <span className="hidden @md:inline">PostHog AI</span>
                </>
            ) : (
                <>
                    <IconMCP className="size-3.5" />
                    <span className="hidden @md:inline">Your agent via MCP</span>
                </>
            )}
        </span>
    )
}

function useTypedText(text: string, isTyping: boolean): string {
    const [progress, setProgress] = useState({ text, length: isTyping ? 0 : text.length })
    const length = progress.text === text ? progress.length : isTyping ? 0 : text.length

    useEffect(() => {
        if (!isTyping) {
            setProgress({ text, length: text.length })
            return
        }
        setProgress((current) => (current.text === text ? current : { text, length: 0 }))
        const timer = window.setInterval(
            () =>
                setProgress((current) => ({
                    text,
                    length: Math.min(text.length, (current.text === text ? current.length : 0) + 1),
                })),
            TYPE_CHAR_MS
        )
        return () => window.clearInterval(timer)
    }, [text, isTyping])

    return text.slice(0, length)
}

function QueryBar({ insight, phase, isTyping }: { insight: Insight; phase: AskPhase; isTyping: boolean }): JSX.Element {
    const typed = useTypedText(insight.question, isTyping)
    return (
        <div className="relative min-w-0 flex-1 overflow-hidden rounded-md border border-primary bg-primary shadow-sm">
            <div className="flex items-center gap-3 px-3 py-2.5">
                <span className="grid shrink-0">
                    <span className="invisible flex [grid-area:1/1]">
                        <AskerChip asker="mcp" />
                    </span>
                    <AskerChip asker={insight.asker} />
                </span>
                <span className="grid min-w-0 flex-1 text-sm font-semibold leading-snug text-primary">
                    {INSIGHTS.map(({ key, question }) => (
                        <span key={key} aria-hidden className="invisible [grid-area:1/1]">
                            {question}
                        </span>
                    ))}
                    <span className="[grid-area:1/1]" aria-live="polite">
                        <span className={phase === 'typing' ? 'data-story-caret pr-px' : undefined}>{typed}</span>
                    </span>
                </span>
                <span className="hidden shrink-0 font-mono text-[11px] leading-4 text-muted @2xl:grid">
                    {INSIGHTS.map(({ key, sources, duration }) => (
                        <span key={key} aria-hidden className="invisible whitespace-nowrap [grid-area:1/1]">
                            {sources} · {duration}
                        </span>
                    ))}
                    <span className="whitespace-nowrap text-right [grid-area:1/1]">
                        {phase === 'querying' && <>querying {insight.sources}…</>}
                        {phase === 'answered' && (
                            <>
                                {insight.sources} · <span className="text-secondary">{insight.duration}</span>
                            </>
                        )}
                    </span>
                </span>
            </div>
            <span
                className="absolute bottom-0 left-0 h-0.5 bg-orange ease-out"
                style={{
                    width: phase === 'typing' ? '0%' : '100%',
                    opacity: phase === 'answered' ? 0 : 1,
                    transition:
                        phase === 'querying'
                            ? `width ${QUERY_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`
                            : 'opacity 600ms ease-out 300ms',
                }}
            />
        </div>
    )
}

function InsightTile({
    insight,
    isDrawn,
    isFocused,
    isQuerying,
    isAnswered,
    isStatic,
    replay,
}: {
    insight: Insight
    isDrawn: boolean
    isFocused: boolean
    isQuerying: boolean
    isAnswered: boolean
    isStatic: boolean
    replay: number
}): JSX.Element {
    const chartRef = useRef<HTMLDivElement>(null)
    const size = useElementSize(chartRef)
    const { Chart } = insight
    return (
        <article
            className={`relative flex flex-col rounded-md border border-primary bg-primary p-4 ${
                insight.className ?? ''
            }`}
        >
            <span
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-md border-2 border-orange transition-opacity duration-500"
                style={{ opacity: isFocused ? 1 : 0 }}
            />
            <header className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h3 className="m-0 text-sm font-semibold leading-tight text-primary">{insight.title}</h3>
                <span className="font-mono text-[10px] leading-4 text-muted">{insight.meta}</span>
            </header>
            <div ref={chartRef} className="relative mt-4 flex-1" style={{ minHeight: insight.chartHeight }}>
                {isDrawn && size && (
                    <div
                        className="absolute inset-0 transition-opacity duration-300"
                        style={{ opacity: isQuerying ? 0.2 : 1 }}
                    >
                        <Chart
                            key={replay}
                            width={size.width}
                            height={size.height}
                            isAnswered={isAnswered}
                            isStatic={isStatic}
                        />
                    </div>
                )}
                {isQuerying && size && (
                    <span
                        aria-hidden
                        className="data-story-scan absolute inset-y-0 left-0 w-px bg-orange"
                        style={{ ['--scan-distance' as string]: `${size.width}px` }}
                    />
                )}
            </div>
            <p className="m-0 mt-4 text-[13px] leading-snug text-secondary">{insight.takeaway}</p>
        </article>
    )
}

export default function QueryStep(): JSX.Element {
    const boardRef = useRef<HTMLDivElement>(null)
    const isStatic = usePrefersReducedMotion()
    const isDrawn = useHasBeenSeen(boardRef, SEEN_VISIBILITY)
    const inView = useInView(boardRef, RUNNING_VISIBILITY)
    const [isHovered, setIsHovered] = useState(false)
    const [turn, setTurn] = useState(0)
    const [phase, setPhase] = useState<AskPhase>('typing')
    const [answers, setAnswers] = useState<Record<string, number>>({})
    const asked = insightByKey(ASK_ORDER[turn % ASK_ORDER.length])
    const isRunning = isDrawn && inView && !isHovered && !isStatic

    useEffect(() => {
        if (!isRunning) {
            return
        }
        const delay = phase === 'typing' ? typingMs(asked.question) : phase === 'querying' ? QUERY_MS : ANSWER_DWELL_MS
        const timer = window.setTimeout(() => {
            if (phase === 'typing') {
                setPhase('querying')
            } else if (phase === 'querying') {
                setAnswers((current) => ({ ...current, [asked.key]: (current[asked.key] ?? 0) + 1 }))
                setPhase('answered')
            } else {
                setTurn((current) => current + 1)
                setPhase('typing')
            }
        }, delay)
        return () => window.clearTimeout(timer)
    }, [isRunning, phase, asked])

    return (
        <section id="query-the-data" className="relative">
            <StepIntro step={2} title="Query the data with your agent">
                Ask a question in plain English, in PostHog AI or from your own agent over MCP. It writes the SQL across
                your events, replays, errors, and synced tables like Stripe, then answers with a chart you can act on.
            </StepIntro>
            <div
                ref={boardRef}
                className="not-prose mt-8 @container"
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
            >
                <div className="flex items-end gap-4">
                    <QueryBar
                        insight={isStatic ? INSIGHTS[0] : asked}
                        phase={isStatic || !isDrawn ? 'answered' : phase}
                        isTyping={isRunning && phase === 'typing'}
                    />
                    <HedgehogChart className="-mb-2 hidden size-24 shrink-0 @3xl:block" />
                </div>
                <div className="mt-4 grid gap-4 @2xl:grid-cols-2 @4xl:grid-cols-3">
                    {INSIGHTS.map((insight) => {
                        const isFocused = !isStatic && isDrawn && insight.key === asked.key
                        return (
                            <InsightTile
                                key={insight.key}
                                insight={insight}
                                isDrawn={isDrawn}
                                isFocused={isFocused}
                                isQuerying={isFocused && phase === 'querying'}
                                isAnswered={isStatic || (answers[insight.key] ?? 0) > 0}
                                isStatic={isStatic}
                                replay={answers[insight.key] ?? 0}
                            />
                        )
                    })}
                </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 @3xl:flex-row @3xl:items-center @3xl:justify-between">
                <p className="m-0 text-sm text-secondary">
                    Demo data. Hover a chart to pause the questions and read the numbers.
                </p>
                <ProductChips handles={PRODUCT_HANDLES} />
            </div>
        </section>
    )
}
