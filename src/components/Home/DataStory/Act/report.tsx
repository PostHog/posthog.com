import { pressCursorBoundaries } from '../PressCursor'
import { SourceKey, ToolCall, defineTrace } from '../Query/trace'

export const REPORT_LOOP_MS = 15500
export const REPORT_RESTING_MOMENT = 13000

const REPORT_AT = 3200
export const PRESS_AT = 4900
export const HANDOFF_AT = 5300
const ANSWER_AT = 8800

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
        argName: 'report',
        args: `#${REPORT.number}`,
        result: 'Checkout TypeError · 23 replays · 31 failed charges · 4 tickets',
        at: 5800,
    },
    {
        id: 'replays',
        source: 'replay',
        label: 'Watched session replays',
        mcpTool: 'query-session-recordings-list',
        argName: 'person',
        args: 'jo@acme.com',
        result: 'Pay throws before the redirect',
        at: 6800,
    },
    {
        id: 'trace',
        source: 'errors',
        label: 'Read the stack trace',
        mcpTool: 'query-error-tracking-issue-events',
        argName: 'include',
        args: 'stacktrace',
        result: 'plan is undefined at checkout.tsx:142',
        at: 7800,
    },
]

export const HANDOFF_TRACE = defineTrace({
    question: CODEX_PROMPT,
    calls: CODEX_CALLS,
    answer: "`plan` is undefined when checkout loads before pricing. I'll guard it in `checkout.tsx`, add a test, and open a PR.",
    answerAt: ANSWER_AT,
    loopMs: REPORT_LOOP_MS,
    restingMs: REPORT_RESTING_MOMENT,
    submittedAt: HANDOFF_AT,
})

export const REPORT_BOUNDARIES: number[] = [
    ...OVERNIGHT_REPORTS.map(({ at }) => at ?? 0),
    REPORT_AT,
    ...pressCursorBoundaries(PRESS_AT),
    ...HANDOFF_TRACE.boundaries,
]
