import React from 'react'
import { cn } from '../../../../utils'
import { EXTERNAL_SOURCES, ProductIcon, SourceKey } from '../Ingest/session'
import { ticks, wordStream } from '../timeline'
import { SCENE_SIZE } from '../sceneScale'

const TOOL_RUN_MS = 1000
const TYPING_STARTS_AT = 600
const TYPING_MS_PER_CHAR = 55
const SUBMIT_PAUSE_MS = 500
const ANSWER_MS_PER_CHAR = 16
const SECOND_MS = 1000

export interface ToolCall {
    id: string
    source: SourceKey
    label: string
    mcpTool: string
    argName: string
    args: string
    result: string
    at: number
}

export const codexArguments = ({ argName, args }: ToolCall): string => `{"${argName}":"${args}"}`

interface CallState {
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

export interface Trace {
    loopMs: number
    restingMs: number
    boundaries: number[]
    stateAt: (elapsed: number) => TraceState
}

export const defineTrace = ({
    question,
    calls,
    answer,
    answerAt,
    loopMs,
    restingMs,
    moments = [],
    submittedAt,
}: {
    question: string
    calls: ToolCall[]
    answer: string
    answerAt: number
    loopMs: number
    restingMs: number
    moments?: number[]
    submittedAt?: number
}): Trace => {
    const typingStops =
        submittedAt === undefined
            ? ticks(TYPING_STARTS_AT, TYPING_STARTS_AT + question.length * TYPING_MS_PER_CHAR, TYPING_MS_PER_CHAR)
            : []
    const submitAt = submittedAt ?? TYPING_STARTS_AT + question.length * TYPING_MS_PER_CHAR + SUBMIT_PAUSE_MS
    const answerDoneAt = answerAt + answer.length * ANSWER_MS_PER_CHAR
    const answerStream = wordStream(answer, answerAt, ANSWER_MS_PER_CHAR)
    return {
        loopMs,
        restingMs,
        boundaries: [
            ...typingStops,
            submitAt,
            ...calls.flatMap(({ at }) => [at, at + TOOL_RUN_MS]),
            ...answerStream.stops,
            answerDoneAt,
            ...ticks(submitAt, answerDoneAt, SECOND_MS),
            ...moments,
        ],
        stateAt: (elapsed) => {
            const submitted = elapsed >= submitAt
            const typedChars = Math.floor(Math.max(0, elapsed - TYPING_STARTS_AT) / TYPING_MS_PER_CHAR)
            return {
                question,
                typed: submitted ? '' : question.slice(0, typedChars),
                submitted,
                calls: calls
                    .filter(({ at }) => elapsed >= at)
                    .map((call) => ({ call, done: elapsed >= call.at + TOOL_RUN_MS })),
                working: submitted && elapsed < answerDoneAt,
                answer: answerStream.textAt(elapsed),
                secondsWorking: Math.max(0, Math.floor((Math.min(elapsed, answerDoneAt) - submitAt) / SECOND_MS)),
            }
        },
    }
}

export const TERMINAL_TRACE = defineTrace({
    question: "What's causing the latest errors in checkout?",
    loopMs: 19000,
    restingMs: 16000,
    answerAt: 10600,
    answer: '`checkout.tsx` reads `plan` before pricing loads, so Pro upgrades throw. Acme hit it: Jo rage-clicked Pay, the charge failed, and the deal is now at risk. Fix: guard `plan`.',
    calls: [
        {
            id: 'error',
            source: 'errors',
            label: 'Searched error tracking',
            mcpTool: 'query-error-tracking-issues-list',
            argName: 'search',
            args: 'checkout',
            result: "TypeError in checkout.tsx · reading 'plan'",
            at: 3700,
        },
        {
            id: 'replay',
            source: 'replay',
            label: 'Watched session replays',
            mcpTool: 'query-session-recordings-list',
            argName: 'person',
            args: 'jo@acme.com',
            result: 'Rage-clicked "Pay $49" 4 times',
            at: 5000,
        },
        {
            id: 'payment',
            source: 'stripe',
            label: 'Checked Stripe charges',
            mcpTool: 'execute-sql',
            argName: 'query',
            args: 'select status from stripe.charges',
            result: 'payment_failed · $49.00 · Pro monthly',
            at: 6300,
        },
        {
            id: 'ticket',
            source: 'zendesk',
            label: 'Read Zendesk tickets',
            mcpTool: 'execute-sql',
            argName: 'query',
            args: 'select subject from zendesk.tickets',
            result: '#4821 "Can\'t upgrade my plan"',
            at: 7600,
        },
        {
            id: 'deal',
            source: 'hubspot',
            label: 'Searched HubSpot deals',
            mcpTool: 'execute-sql',
            argName: 'query',
            args: 'select stage from hubspot.deals',
            result: 'Acme Corp moved to At risk · $588 ARR',
            at: 8900,
        },
    ],
})

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

export const SourceIcon = ({
    source,
    className = `${SCENE_SIZE[14]} shrink-0`,
}: {
    source: SourceKey
    className?: string
}) => {
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
