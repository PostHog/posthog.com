import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '../../../../utils'
import { IOS_SPRING } from '../Ingest/session'
import { transform, useEventClock } from '../timeline'
import AgentWindow, { AGENT_THEMES, AgentTheme } from './AgentWindow'
import { TRACE_BOUNDARIES, TRACE_LOOP_MS, TRACE_RESTING_MOMENT } from './trace'

const DECK_STEP_PX = 22
const DECK_SCALE_STEP = 0.05
const DEAL_STAGGER_S = 0.3
const UNDEALT = { opacity: 0, transform: transform({ y: 56, scale: 0.9 }) }

function useLoopCount(elapsed: number): number {
    const [loops, setLoops] = useState(0)
    const previous = useRef(elapsed)
    useEffect(() => {
        if (elapsed < previous.current) setLoops((count) => count + 1)
        previous.current = elapsed
    }, [elapsed])
    return loops
}

const Deck = ({
    front,
    elapsed,
    onSelect,
}: {
    front: AgentTheme
    elapsed: number
    onSelect: (theme: AgentTheme) => void
}) => {
    const deckRef = useRef<HTMLDivElement>(null)
    const inView = useInView(deckRef, { once: true, amount: 0.3 })
    const [dealt, setDealt] = useState(false)
    const frontIndex = AGENT_THEMES.findIndex(({ key }) => key === front)
    return (
        <div ref={deckRef} className="grid pt-12">
            {AGENT_THEMES.map(({ key, label }, index) => {
                const depth = (index - frontIndex + AGENT_THEMES.length) % AGENT_THEMES.length
                const dealDelay = dealt ? 0 : (AGENT_THEMES.length - 1 - depth) * DEAL_STAGGER_S
                return (
                    <motion.div
                        key={key}
                        className={cn('origin-top [grid-area:1/1]', depth > 0 && 'cursor-pointer')}
                        style={{ zIndex: AGENT_THEMES.length - depth }}
                        initial={UNDEALT}
                        animate={
                            inView
                                ? {
                                      transform: transform({
                                          y: depth * -DECK_STEP_PX,
                                          scale: 1 - depth * DECK_SCALE_STEP,
                                      }),
                                      opacity: depth === 2 ? 0.55 : 1,
                                  }
                                : UNDEALT
                        }
                        transition={{
                            ...IOS_SPRING,
                            delay: dealDelay,
                            opacity: { duration: 0.35, ease: 'easeOut', delay: dealDelay },
                        }}
                        onAnimationComplete={() => inView && depth === 0 && setDealt(true)}
                        onClick={() => depth > 0 && onSelect(key)}
                        title={depth > 0 ? `Show ${label}` : undefined}
                    >
                        <AgentWindow theme={key} elapsed={depth === 0 ? elapsed : TRACE_RESTING_MOMENT} />
                    </motion.div>
                )
            })}
        </div>
    )
}

export default function QueryStep({
    index,
    title,
    description,
}: {
    index: number
    title: string
    description: React.ReactNode
}): JSX.Element {
    const containerRef = useRef<HTMLDivElement>(null)
    const elapsed = useEventClock(containerRef, {
        loopMs: TRACE_LOOP_MS,
        boundaries: TRACE_BOUNDARIES,
        restingMs: TRACE_RESTING_MOMENT,
    })
    const loops = useLoopCount(elapsed)
    const [pinned, setPinned] = useState<AgentTheme | null>(null)
    const theme = pinned ?? AGENT_THEMES[loops % AGENT_THEMES.length].key

    return (
        <div className="@container mt-16">
            <div
                ref={containerRef}
                className="relative mx-auto grid max-w-[58rem] gap-6 @3xl:grid-cols-12 @3xl:items-center @3xl:gap-x-8"
            >
                <div className="@3xl:col-span-5">
                    <h3 className="!mt-0">
                        {index + 1}. {title}
                    </h3>
                    <p>{description}</p>
                    <p className="text-sm text-secondary">Works in Claude Code, Codex, and PostHog Desktop.</p>
                </div>
                <div className="@3xl:col-span-7">
                    <Deck front={theme} elapsed={elapsed} onSelect={setPinned} />
                </div>
            </div>
        </div>
    )
}
