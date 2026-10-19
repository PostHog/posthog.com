import React from 'react'
import { cn } from '../../../../utils'
import { EXTERNAL_SOURCES, ProductIcon, SourceKey } from '../Ingest/session'
import { wordStream } from '../timeline'

export const TRACE_LOOP_MS = 19000
export const TRACE_RESTING_MOMENT = 16000

export const QUESTION = "What's causing the latest errors in checkout?"
const TYPING_STARTS_AT = 600
const TYPING_MS_PER_CHAR = 55
export const SUBMIT_AT = TYPING_STARTS_AT + QUESTION.length * TYPING_MS_PER_CHAR + 500
export const TOOL_RUN_MS = 1000

export const ANSWER_AT = 10600
const ANSWER_MS_PER_CHAR = 16
export const ANSWER =
    '`checkout.tsx` reads `plan` before pricing loads, so Pro upgrades throw. Acme hit it: Jo rage-clicked Pay, the charge failed, and the deal is now at risk. Fix: guard `plan`.'
export const ANSWER_DONE_AT = ANSWER_AT + ANSWER.length * ANSWER_MS_PER_CHAR
const SECOND_MS = 1000

const ANSWER_STREAM = wordStream(ANSWER, ANSWER_AT, ANSWER_MS_PER_CHAR)

export interface ToolCall {
    id: string
    source: SourceKey
    label: string
    mcpTool: string
    args: string
    result: string
    at: number
}

export const codexArguments = ({ args }: ToolCall): string => `{"source":"${args}"}`

export const TOOL_CALLS: ToolCall[] = [
    {
        id: 'error',
        source: 'errors',
        label: 'Searched error tracking',
        mcpTool: 'error-tracking-issues',
        args: 'jo@acme.com',
        result: "TypeError in checkout.tsx · reading 'plan'",
        at: 3700,
    },
    {
        id: 'replay',
        source: 'replay',
        label: 'Watched session replays',
        mcpTool: 'session-recordings',
        args: 'jo@acme.com',
        result: 'Rage-clicked "Pay $49" 4 times',
        at: 5000,
    },
    {
        id: 'payment',
        source: 'stripe',
        label: 'Checked Stripe charges',
        mcpTool: 'execute-sql',
        args: 'stripe.charges',
        result: 'payment_failed · $49.00 · Pro monthly',
        at: 6300,
    },
    {
        id: 'ticket',
        source: 'zendesk',
        label: 'Read Zendesk tickets',
        mcpTool: 'execute-sql',
        args: 'zendesk.tickets',
        result: '#4821 "Can\'t upgrade my plan"',
        at: 7600,
    },
    {
        id: 'deal',
        source: 'hubspot',
        label: 'Searched HubSpot deals',
        mcpTool: 'execute-sql',
        args: 'hubspot.deals',
        result: 'Acme Corp moved to At risk · $588 ARR',
        at: 8900,
    },
]

export interface CallState {
    call: ToolCall
    done: boolean
}

export interface TraceState {
    question: string
    typed: string
    submitted: boolean
    calls: CallState[]
    working: boolean
    answer: string
    secondsWorking: number
}

export const traceAt = (elapsed: number): TraceState => {
    const submitted = elapsed >= SUBMIT_AT
    const typedChars = Math.floor(Math.max(0, elapsed - TYPING_STARTS_AT) / TYPING_MS_PER_CHAR)
    return {
        question: QUESTION,
        typed: submitted ? '' : QUESTION.slice(0, typedChars),
        submitted,
        calls: TOOL_CALLS.filter(({ at }) => elapsed >= at).map((call) => ({
            call,
            done: elapsed >= call.at + TOOL_RUN_MS,
        })),
        working: submitted && elapsed < ANSWER_DONE_AT,
        answer: ANSWER_STREAM.textAt(elapsed),
        secondsWorking: Math.max(0, Math.floor((Math.min(elapsed, ANSWER_DONE_AT) - SUBMIT_AT) / 1000)),
    }
}

export const finishedCalls = (elapsed: number): ToolCall[] => TOOL_CALLS.filter(({ at }) => elapsed >= at + TOOL_RUN_MS)

export const TRACE_BOUNDARIES: number[] = [
    ...Array.from({ length: QUESTION.length }, (_, index) => TYPING_STARTS_AT + (index + 1) * TYPING_MS_PER_CHAR),
    SUBMIT_AT,
    ...TOOL_CALLS.flatMap(({ at }) => [at, at + TOOL_RUN_MS]),
    ...ANSWER_STREAM.stops,
    ANSWER_DONE_AT,
    ...Array.from(
        { length: Math.floor((ANSWER_DONE_AT - SUBMIT_AT) / SECOND_MS) },
        (_, second) => SUBMIT_AT + (second + 1) * SECOND_MS
    ),
]

const TRAILING_PUNCTUATION = /^[.,:;!?)]+/

export const InlineCode = ({ text, codeClassName }: { text: string; codeClassName?: string }) => {
    const segments = text.split('`')
    return (
        <>
            {segments.map((segment, index) => {
                if (index % 2 === 0) {
                    const previousIsCode = index > 0
                    const punctuation = previousIsCode ? segment.match(TRAILING_PUNCTUATION)?.[0] ?? '' : ''
                    return <React.Fragment key={index}>{segment.slice(punctuation.length)}</React.Fragment>
                }
                const punctuation = segments[index + 1]?.match(TRAILING_PUNCTUATION)?.[0] ?? ''
                return (
                    <span key={index} className="whitespace-nowrap">
                        <code className={cn('!border-0 !bg-transparent !p-0 !text-[inherit] font-code', codeClassName)}>
                            {segment}
                        </code>
                        {punctuation}
                    </span>
                )
            })}
        </>
    )
}

export const SourceIcon = ({ source, className = 'size-3.5' }: { source: SourceKey; className?: string }) => {
    const external = EXTERNAL_SOURCES.find(({ key }) => key === source)
    if (!external) return <ProductIcon source={source as 'errors' | 'replay' | 'analytics'} className={className} />
    return (
        <img
            src={external.logo}
            alt=""
            className={cn(
                'object-contain',
                className,
                external.wide && 'w-auto',
                source === 'zendesk' && 'dark:invert'
            )}
        />
    )
}
