import { pressCursorBoundaries } from '../PressCursor'
import { defineTrace } from './trace'

export const CLAUDE_TRENDS_AT = 7600
export const CLAUDE_PICKER_PRESS_AT = 9800
export const CLAUDE_BAR_PRESS_AT = 11300
export const CLAUDE_BAR_AT = CLAUDE_BAR_PRESS_AT + 200
export const CLAUDE_BAR_HOVER_AT = CLAUDE_BAR_PRESS_AT - 250
export const CLAUDE_ERROR_CARD_AT = 13800

export const CLAUDE_APP_TRACE = defineTrace({
    question: 'Why did Pro checkout errors spike? Show me.',
    loopMs: 23000,
    restingMs: 20500,
    answerAt: 15200,
    answer: 'Errors spiked only on Pro, starting Oct 17. `checkout.tsx` reads `plan` before pricing loads, so every Pro upgrade throws on line 142. Guard `plan` and the spike stops.',
    moments: [
        CLAUDE_TRENDS_AT,
        ...pressCursorBoundaries(CLAUDE_PICKER_PRESS_AT),
        ...pressCursorBoundaries(CLAUDE_BAR_PRESS_AT),
        CLAUDE_BAR_AT,
        CLAUDE_ERROR_CARD_AT,
    ],
    calls: [
        {
            id: 'issues',
            source: 'errors',
            label: 'Found checkout errors',
            mcpTool: 'query-error-tracking-issues-list',
            argName: 'search',
            args: 'checkout',
            result: 'TypeError in checkout.tsx · 96 events',
            at: 4200,
        },
        {
            id: 'trends',
            source: 'analytics',
            label: 'Charted errors by plan',
            mcpTool: 'query-trends',
            argName: 'breakdown',
            args: 'plan',
            result: '$exception · last 14 days',
            at: 5200,
        },
        {
            id: 'stack',
            source: 'errors',
            label: 'Read the stack trace',
            mcpTool: 'query-error-tracking-issue-events',
            argName: 'include',
            args: 'stacktrace',
            result: "checkout.tsx:142 · reading 'plan'",
            at: 6200,
        },
    ],
})

export const CHATGPT_FUNNEL_AT = 8200

export const CHATGPT_TRACE = defineTrace({
    question: 'Where are Pro upgrades dropping off in checkout?',
    loopMs: 18500,
    restingMs: 16000,
    answerAt: 10000,
    answer: 'Most Pro upgrades fail after Pay: only 21 of 52 finish. All 31 drop-offs match a failed Stripe charge and a checkout TypeError, Acme included. Guarding `plan` recovers about $1.5K in upgrades a week.',
    moments: [CHATGPT_FUNNEL_AT],
    calls: [
        {
            id: 'funnel',
            source: 'analytics',
            label: 'Built the checkout funnel',
            mcpTool: 'query-funnel',
            argName: 'steps',
            args: 'pricing → checkout → pay → upgraded',
            result: '640 → 214 → 52 → 21',
            at: 4500,
        },
        {
            id: 'actors',
            source: 'analytics',
            label: 'Found who dropped off',
            mcpTool: 'query-funnel-actors',
            argName: 'step',
            args: 'pay',
            result: '31 people dropped after Pay',
            at: 5700,
        },
        {
            id: 'charges',
            source: 'stripe',
            label: 'Checked Stripe charges',
            mcpTool: 'execute-sql',
            argName: 'query',
            args: 'select status from stripe.charges',
            result: '31 Pro charges failed this week',
            at: 6900,
        },
    ],
})

export const CURSOR_READ_AT = 6900
export const CURSOR_BUG_AT = 7600
export const CURSOR_LENS_PRESS_AT = 9200
export const CURSOR_SESSIONS_AT = CURSOR_LENS_PRESS_AT + 250
export const CURSOR_WATCH_PRESS_AT = 11300
export const CURSOR_REPLAY_AT = CURSOR_WATCH_PRESS_AT + 250
export const CURSOR_REPLAY_CLICKS = [12700, 13200, 13700, 14200]
export const CURSOR_REPLAY_ERROR_AT = 14700
export const CURSOR_DIFF_AT = 18600
export const CURSOR_REPLAY_TICK_MS = 1000
const CURSOR_REPLAY_TICKS = Array.from(
    { length: Math.floor((CURSOR_DIFF_AT - CURSOR_REPLAY_AT) / CURSOR_REPLAY_TICK_MS) },
    (_, tick) => CURSOR_REPLAY_AT + (tick + 1) * CURSOR_REPLAY_TICK_MS
)

export const CURSOR_TRACE = defineTrace({
    question: "Why is Pro checkout throwing? Show me Jo's session.",
    loopMs: 24500,
    restingMs: 22000,
    answerAt: 15400,
    answer: "Line 142 reads `plan` before pricing loads. Jo's replay shows four Pay clicks and no charge. I guarded `plan` in `checkout.tsx`. Review the diff.",
    moments: [
        CURSOR_READ_AT,
        CURSOR_BUG_AT,
        ...pressCursorBoundaries(CURSOR_LENS_PRESS_AT),
        CURSOR_SESSIONS_AT,
        ...pressCursorBoundaries(CURSOR_WATCH_PRESS_AT),
        CURSOR_REPLAY_AT,
        ...CURSOR_REPLAY_TICKS,
        ...CURSOR_REPLAY_CLICKS,
        CURSOR_REPLAY_ERROR_AT,
        CURSOR_DIFF_AT,
    ],
    calls: [
        {
            id: 'issues',
            source: 'errors',
            label: 'Found checkout errors',
            mcpTool: 'query-error-tracking-issues-list',
            argName: 'search',
            args: 'checkout',
            result: 'TypeError in checkout.tsx',
            at: 4700,
        },
        {
            id: 'stack',
            source: 'errors',
            label: 'Read the stack trace',
            mcpTool: 'query-error-tracking-issue-events',
            argName: 'include',
            args: 'stacktrace',
            result: 'checkout.tsx:142:23',
            at: 5800,
        },
    ],
})
