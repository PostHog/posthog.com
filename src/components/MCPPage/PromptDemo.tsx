import React, { useEffect, useRef, useState } from 'react'
import { IconArrowRight } from '@posthog/icons'
import { useReducedMotion } from 'framer-motion'
import usePostHog from 'hooks/usePostHog'
import { cn } from '../../utils'
import { ClaudeTerminal } from '../Home/DataStory/Query/AgentWindow'
import { ANSWER_MS_PER_CHAR, SourceIcon, TOOL_RUN_MS, Trace, defineTrace } from '../Home/DataStory/Query/trace'
import { useEventClock } from '../Home/DataStory/timeline'
import { PromptFlow, flows } from './promptDemo.data'

const SUBMIT_AT = 400
const FIRST_CALL_DELAY_MS = 700
const CALL_GAP_MS = 300
const ANSWER_DELAY_MS = 500
const HOLD_MS = 5000

interface Demo extends PromptFlow {
    trace: Trace
    doneAt: number
}

const buildDemo = (flow: PromptFlow): Demo => {
    const callAt = (index: number) => SUBMIT_AT + FIRST_CALL_DELAY_MS + index * (TOOL_RUN_MS + CALL_GAP_MS)
    const answerAt = callAt(flow.calls.length - 1) + TOOL_RUN_MS + ANSWER_DELAY_MS
    const answerDoneAt = answerAt + flow.answer.length * ANSWER_MS_PER_CHAR
    const doneAt = answerDoneAt + HOLD_MS
    return {
        ...flow,
        doneAt,
        trace: defineTrace({
            question: flow.prompt,
            intro: flow.intro,
            submittedAt: SUBMIT_AT,
            calls: flow.calls.map((call, index) => ({
                ...call,
                id: String(index),
                label: call.mcpTool,
                at: callAt(index),
            })),
            answer: flow.answer,
            answerAt,
            restingMs: answerDoneAt,
            loopMs: doneAt + 1,
            moments: [doneAt],
        }),
    }
}

const demos = flows.map(buildDemo)

const Run = ({ demo, next, onNext, onDone }: { demo: Demo; next: Demo; onNext: () => void; onDone?: () => void }) => {
    const ref = useRef<HTMLDivElement>(null)
    const elapsed = useEventClock(ref, { ...demo.trace, loop: false })
    const answered = elapsed >= demo.trace.restingMs
    const done = elapsed >= demo.doneAt
    useEffect(() => {
        if (done) onDone?.()
    }, [done, onDone])
    return (
        <div ref={ref} className="@container @2xl/reader-content:absolute @2xl/reader-content:inset-0">
            <ClaudeTerminal
                state={demo.trace.stateAt(elapsed)}
                className="h-80 rounded @2xl/reader-content:h-full"
                lightSize={10}
                cwd="~/hogflix"
                suggestion={answered ? { prompt: next.prompt, onRun: onNext } : undefined}
            />
        </div>
    )
}

export default function PromptDemo(): JSX.Element {
    const posthog = usePostHog()
    const [activeIndex, setActiveIndex] = useState(0)
    const [runId, setRunId] = useState(0)
    const [picked, setPicked] = useState(false)
    const buttons = useRef<(HTMLButtonElement | null)[]>([])
    const layoutRef = useRef<HTMLDivElement>(null)
    const terminalRef = useRef<HTMLDivElement>(null)
    const shouldReduceMotion = useReducedMotion()

    const play = (index: number) => {
        setActiveIndex(index)
        setRunId((id) => id + 1)
    }

    const pick = (index: number, trigger: 'list' | 'terminal') => {
        const { title, prompt } = demos[index]
        setPicked(true)
        play(index)
        // The terminal button unmounts when the run starts, so keep keyboard focus on the picked prompt.
        if (trigger === 'terminal') buttons.current[index]?.focus({ preventScroll: true })
        // In one column the terminal is below all the prompts, so bring it into view. In two columns it's already visible.
        const singleColumn =
            layoutRef.current && getComputedStyle(layoutRef.current).gridTemplateColumns.split(' ').length === 1
        if (trigger === 'list' && singleColumn) {
            terminalRef.current?.scrollIntoView({ block: 'nearest', behavior: shouldReduceMotion ? 'auto' : 'smooth' })
        }
        posthog?.capture('ai_prompt_selected', { group: title, prompt, placement: 'mcp_page', trigger })
    }

    const nextIndex = (activeIndex + 1) % demos.length

    return (
        <div>
            <div
                ref={layoutRef}
                className="grid gap-x-8 gap-y-4 @2xl/reader-content:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
            >
                <div>
                    <ul className="m-0 list-none p-0">
                        {demos.map(({ title, prompt, calls }, index) => {
                            const active = index === activeIndex
                            const sources = Array.from(new Set(calls.map(({ source }) => source)))
                            return (
                                <li key={title} className="border-b border-primary last:border-b-0">
                                    <button
                                        ref={(element) => {
                                            buttons.current[index] = element
                                        }}
                                        type="button"
                                        aria-pressed={active}
                                        onClick={() => pick(index, 'list')}
                                        className={cn(
                                            'flex w-full cursor-pointer flex-col border-0 bg-transparent py-4 text-left text-primary transition-opacity',
                                            active ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                                        )}
                                    >
                                        <span className="text-base font-bold leading-snug">“{prompt}”</span>
                                        <span aria-hidden className="mt-2 flex items-center gap-1">
                                            {sources.map((source, sourceIndex) => (
                                                <React.Fragment key={source}>
                                                    {sourceIndex > 0 && (
                                                        <IconArrowRight className="size-3 text-secondary" />
                                                    )}
                                                    <SourceIcon source={source} className="size-4 shrink-0" />
                                                </React.Fragment>
                                            ))}
                                        </span>
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div ref={terminalRef} className="relative @2xl/reader-content:min-h-80">
                    <Run
                        key={runId}
                        demo={demos[activeIndex]}
                        next={demos[nextIndex]}
                        onNext={() => pick(nextIndex, 'terminal')}
                        onDone={picked ? undefined : () => play(nextIndex)}
                    />
                </div>
            </div>
        </div>
    )
}
