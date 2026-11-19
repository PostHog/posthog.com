import type { ToolCall } from '../Home/DataStory/Query/trace'

export interface PromptFlow {
    title: string
    prompt: string
    intro: string
    calls: Pick<ToolCall, 'source' | 'mcpTool' | 'argName' | 'args' | 'result'>[]
    answer: string
}

// Each mcpTool must be a real PostHog MCP tool and each argName a real parameter of it.
// promptDemo.test.ts checks the tool names against src/data/mcp-tools.json.
export const flows: PromptFlow[] = [
    {
        title: 'Find what broke signups, then turn it off',
        prompt: 'Find out why signups fell yesterday, and turn off whatever broke it.',
        intro: "I'll look for a recent change, then check what it broke.",
        calls: [
            {
                source: 'flags',
                mcpTool: 'feature-flag-get-all',
                argName: 'search',
                args: 'signup',
                result: 'new-signup-form went to 100% yesterday',
            },
            {
                source: 'analytics',
                mcpTool: 'query-trends',
                argName: 'breakdownFilter',
                args: '$feature/new-signup-form',
                result: 'Only the new form lost signups',
            },
            {
                source: 'errors',
                mcpTool: 'query-error-tracking-issues-list',
                argName: 'searchQuery',
                args: 'signup',
                result: 'New TypeError in EmailStep.tsx',
            },
            {
                source: 'flags',
                mcpTool: 'feature-flag-disable',
                argName: 'id',
                args: '4127',
                result: 'new-signup-form is off',
            },
        ],
        answer: '`new-signup-form` broke the email step when it went to 100%. I turned it off, so the old form is back. Fix `EmailStep.tsx` before you turn it on again.',
    },
    {
        title: 'See why checkout fails',
        prompt: 'Show me what happened in the checkout sessions that failed today.',
        intro: "I'll find the checkout errors, then review the sessions and the payments.",
        calls: [
            {
                source: 'errors',
                mcpTool: 'query-error-tracking-issues-list',
                argName: 'searchQuery',
                args: 'checkout',
                result: '/api/pay timeout · 38 sessions today',
            },
            {
                source: 'errors',
                mcpTool: 'query-error-tracking-issue-events',
                argName: 'issueId',
                args: '0196f2a4-7c1e-7d3b-9a52-3e8f1b6c2d90',
                result: '20 recent events, each with a session ID',
            },
            {
                source: 'vision',
                mcpTool: 'vision-scanners-inline-scan',
                argName: 'prompt',
                args: 'What did users do before they left?',
                result: 'Scan started on 20 sessions',
            },
            {
                source: 'vision',
                mcpTool: 'vision-scanners-observations-list',
                argName: 'scanner_id',
                args: '0196f2b1-3d8a-7e44-b1c9-5a7d2e9f4c13',
                result: '17 of 20 wait on a spinner, then leave',
            },
            {
                source: 'stripe',
                mcpTool: 'execute-sql',
                argName: 'query',
                args: "select count() from stripe_charges where status = 'failed' and created >= today()",
                result: '31 failed charges today',
            },
        ],
        answer: '`/api/pay` timed out in 38 sessions today. Most users wait on a spinner, then leave, and Stripe has 31 failed charges. Fix the timeout first.',
    },
    {
        title: 'Build a launch dashboard',
        prompt: 'Make me a dashboard to track the pricing page we launched last week.',
        intro: "I'll check traffic and signups, then save them to a dashboard.",
        calls: [
            {
                source: 'web',
                mcpTool: 'query-web-stats',
                argName: 'breakdownBy',
                args: 'Page',
                result: '/pricing · 18.2k visitors · 41% bounce',
            },
            {
                source: 'analytics',
                mcpTool: 'query-trends',
                argName: 'series',
                args: 'user signed up',
                result: 'Signups from /pricing up 24%',
            },
            {
                source: 'dashboards',
                mcpTool: 'dashboard-create',
                argName: 'name',
                args: 'Pricing page launch',
                result: 'Dashboard created',
            },
            {
                source: 'dashboards',
                mcpTool: 'insight-create',
                argName: 'name',
                args: 'Signups from /pricing',
                result: 'Added to Pricing page launch',
            },
        ],
        answer: '`Pricing page launch` is ready, with a signups insight on it. /pricing had 18.2k visitors, and signups from it are up 24% since launch.',
    },
    {
        title: 'Check on your AI feature',
        prompt: "How's our AI chat assistant doing this week?",
        intro: "I'll check its cost, traces, evals, and errors.",
        calls: [
            {
                source: 'llm',
                mcpTool: 'get-llm-total-costs-for-project',
                argName: 'days',
                args: '7',
                result: '$1,240 this week',
            },
            {
                source: 'llm',
                mcpTool: 'query-llm-traces-list',
                argName: 'dateRange',
                args: '-7d',
                result: '3,180 traces · 128 with errors',
            },
            {
                source: 'evals',
                mcpTool: 'execute-sql',
                argName: 'query',
                args: "select * from events where event = '$ai_evaluation'",
                result: 'Helpfulness eval · 82% pass',
            },
            {
                source: 'errors',
                mcpTool: 'query-error-tracking-issues-list',
                argName: 'searchQuery',
                args: 'openai',
                result: 'RateLimitError · 104 occurrences',
            },
        ],
        answer: '3,180 chats cost $1,240 this week, and 82% pass the helpfulness eval. Most of the 128 errors are OpenAI rate limits, so add a retry with backoff.',
    },
]
