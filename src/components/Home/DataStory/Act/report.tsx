import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { transform, wordStream } from '../timeline'
import { CodexTerminal } from '../Query/AgentWindow'
import { TOOL_RUN_MS, ToolCall, TraceState } from '../Query/trace'
import { SourceKey } from '../Ingest/session'

export const REPORT_LOOP_MS = 15500
export const REPORT_RESTING_MOMENT = 13000

export const REPORT_AT = 3200
export const PRESS_AT = 4900
export const HANDOFF_AT = 5300
const ANSWER_AT = 8800
const ANSWER_MS_PER_CHAR = 16
const SECOND_MS = 1000
const CURSOR_LEAD_MS = 900
const PRESS_HOLD_MS = 160
const CURSOR_LINGER_MS = 600
const CURSOR_ARRIVES_BEFORE_MS = 250

export type Priority = 'P1' | 'P2' | 'P3'

export type ReportSource = SourceKey | 'scout'

export interface InboxReport {
    id: string
    priority: Priority
    scope: string
    title: string
    description: string
    sources: ReportSource[]
    sourceLabel: string
    age: string
    users?: number
    at?: number
}

export const REPORT: InboxReport & { number: number } = {
    id: 'checkout',
    number: 12,
    priority: 'P1',
    scope: 'fix(checkout)',
    title: 'Guard plan before pricing loads',
    description: 'Pro upgrades throw a TypeError when checkout loads before pricing, and 31 charges failed this week.',
    sources: ['errors', 'replay', 'stripe'],
    sourceLabel: 'Error tracking + 2',
    age: 'just now',
    users: 12,
    at: REPORT_AT,
}

export const OVERNIGHT_REPORTS: InboxReport[] = [
    {
        id: 'safari',
        priority: 'P2',
        scope: 'fix(signup)',
        title: "Safari users can't submit the signup form",
        description: 'The submit button sits under the cookie banner on Safari 17, so 8% fewer signups finish.',
        sources: ['scout'],
        sourceLabel: 'Scout · Signup funnel',
        age: '2 hours ago',
        users: 41,
        at: 900,
    },
    {
        id: 'template',
        priority: 'P3',
        scope: 'feat(dashboards)',
        title: 'Suggest a template after the first dashboard',
        description: 'Teams who build one dashboard rarely build a second, and most stop at the empty state.',
        sources: ['replay'],
        sourceLabel: 'Session replay',
        age: '1 hour ago',
        at: 2000,
    },
]

export const EARLIER_REPORTS: InboxReport[] = [
    {
        id: 'search',
        priority: 'P3',
        scope: 'fix(docs)',
        title: 'Return results for "flags" in docs search',
        description: 'Searches for "flags" return nothing, so readers open a support ticket instead.',
        sources: ['zendesk', 'scout'],
        sourceLabel: 'Zendesk + 1',
        age: '2 days ago',
    },
    {
        id: 'price',
        priority: 'P3',
        scope: 'feat(billing)',
        title: 'Show the plan price on the upgrade button',
        description: 'Customers hover the upgrade button to find the price, then leave to check the pricing page.',
        sources: ['analytics'],
        sourceLabel: 'Product analytics',
        age: '4 days ago',
        users: 27,
    },
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
        at: 5800,
    },
    {
        id: 'replays',
        source: 'replay',
        label: 'Watched session replays',
        mcpTool: 'session-recordings',
        args: `report #${REPORT.number}`,
        result: 'Pay throws before the redirect',
        at: 6800,
    },
    {
        id: 'trace',
        source: 'errors',
        label: 'Read the stack trace',
        mcpTool: 'error-tracking-issues',
        args: `report #${REPORT.number}`,
        result: 'plan is undefined at checkout.tsx:142',
        at: 7800,
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
    ...OVERNIGHT_REPORTS.map(({ at }) => at ?? 0),
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
