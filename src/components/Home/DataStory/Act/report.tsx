import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { transform, wordStream } from '../timeline'
import { CodexTerminal } from '../Query/AgentWindow'
import { TOOL_RUN_MS, ToolCall, TraceState } from '../Query/trace'

export const REPORT_LOOP_MS = 15500
export const REPORT_RESTING_MOMENT = 13000

export const NIGHT_ENDS_AT = 4400
export const NIGHT_HOURS = [11, 12, 1, 2, 3, 4, 5, 6]
export const REPORT_AT = 4400
export const PRESS_AT = 6100
export const HANDOFF_AT = 6500
const ANSWER_AT = 10000
const ANSWER_MS_PER_CHAR = 16
const SECOND_MS = 1000
const CURSOR_LEAD_MS = 900
const PRESS_HOLD_MS = 160
const CURSOR_LINGER_MS = 600
const CURSOR_ARRIVES_BEFORE_MS = 250

export const REPORT = {
    number: 12,
    scout: 'Revenue scout',
    title: 'Checkout TypeError is blocking Pro upgrades',
}

export const OTHER_REPORTS = [
    { scout: 'Retention scout', title: 'Weekly actives up 12% after the new onboarding', at: 1100 },
    { scout: 'Funnel scout', title: 'Safari signups dropped 8% after the redesign', at: 2200 },
    { scout: 'Product scout', title: 'Docs search returns nothing for "flags"', at: 3300 },
]

const CODEX_PROMPT = `Fix report #${REPORT.number} from my PostHog inbox`

const CODEX_CALLS: ToolCall[] = [
    {
        id: 'report',
        source: 'analytics',
        label: 'Read the report',
        mcpTool: 'inbox-reports-get',
        args: `report #${REPORT.number}`,
        result: 'Checkout TypeError · 23 replays · 31 failed charges · 4 tickets',
        at: 7000,
    },
    {
        id: 'replays',
        source: 'replay',
        label: 'Watched session replays',
        mcpTool: 'session-recordings',
        args: `report #${REPORT.number}`,
        result: 'Pay throws before the redirect',
        at: 8000,
    },
    {
        id: 'trace',
        source: 'errors',
        label: 'Read the stack trace',
        mcpTool: 'error-tracking-issues',
        args: `report #${REPORT.number}`,
        result: 'plan is undefined at checkout.tsx:142',
        at: 9000,
    },
]

const ANSWER =
    "`plan` is undefined when checkout loads before pricing. I'll guard it in `checkout.tsx`, add a test, and open a PR."
const ANSWER_DONE_AT = ANSWER_AT + ANSWER.length * ANSWER_MS_PER_CHAR
const ANSWER_STREAM = wordStream(ANSWER, ANSWER_AT, ANSWER_MS_PER_CHAR)

const codexStateAt = (elapsed: number): TraceState => ({
    question: CODEX_PROMPT,
    typed: '',
    submitted: true,
    calls: CODEX_CALLS.filter(({ at }) => elapsed >= at).map((call) => ({
        call,
        done: elapsed >= call.at + TOOL_RUN_MS,
    })),
    working: elapsed < ANSWER_DONE_AT,
    answer: ANSWER_STREAM.textAt(elapsed),
    secondsWorking: Math.max(0, Math.floor((Math.min(elapsed, ANSWER_DONE_AT) - HANDOFF_AT) / SECOND_MS)),
})

export const pressCursorBoundaries = (pressAt: number): number[] => [
    pressAt - CURSOR_LEAD_MS,
    pressAt - CURSOR_ARRIVES_BEFORE_MS,
    pressAt,
    pressAt + PRESS_HOLD_MS,
    pressAt + CURSOR_LINGER_MS,
]

export const PressCursor = ({
    elapsed,
    pressAt,
    children,
}: {
    elapsed: number
    pressAt: number
    children: React.ReactNode
}) => {
    const visible = elapsed >= pressAt - CURSOR_LEAD_MS && elapsed < pressAt + CURSOR_LINGER_MS
    const arrived = elapsed >= pressAt - CURSOR_ARRIVES_BEFORE_MS
    const pressing = elapsed >= pressAt && elapsed < pressAt + PRESS_HOLD_MS
    return (
        <div className="relative">
            <motion.div
                initial={false}
                animate={{ transform: transform({ scale: pressing ? 0.95 : 1 }) }}
                transition={
                    pressing ? { duration: 0.12, ease: 'easeOut' } : { type: 'spring', stiffness: 500, damping: 14 }
                }
            >
                {children}
            </motion.div>
            <AnimatePresence>
                {visible && (
                    <motion.div
                        key="cursor"
                        className="pointer-events-none absolute left-1/2 top-1/2 h-5 w-4 drop-shadow"
                        initial={{ opacity: 0, transform: transform({ x: 60, y: 48 }) }}
                        animate={{
                            opacity: 1,
                            transform: transform({
                                x: arrived ? 0 : 60,
                                y: arrived ? 0 : 48,
                                scale: pressing ? 0.85 : 1,
                            }),
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 110, damping: 18 }}
                    >
                        <svg viewBox="0 0 16 20" className="block size-full">
                            <path
                                d="M1 1 L1 16 L5 12 L8 19 L11 18 L8 11 L14 11 Z"
                                fill="black"
                                stroke="white"
                                strokeWidth="1.4"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export const HandoffAgent = ({ elapsed, className }: { elapsed: number; className?: string }) => (
    <CodexTerminal state={codexStateAt(elapsed)} className={className} />
)

export const REPORT_BOUNDARIES: number[] = [
    ...OTHER_REPORTS.map(({ at }) => at),
    REPORT_AT,
    ...pressCursorBoundaries(PRESS_AT),
    HANDOFF_AT,
    ...CODEX_CALLS.flatMap(({ at }) => [at, at + TOOL_RUN_MS]),
    ...ANSWER_STREAM.stops,
    ANSWER_DONE_AT,
    ...Array.from(
        { length: Math.floor((ANSWER_DONE_AT - HANDOFF_AT) / SECOND_MS) },
        (_, second) => HANDOFF_AT + (second + 1) * SECOND_MS
    ),
]
