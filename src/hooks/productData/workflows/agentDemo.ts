import type { PromptFlow } from 'components/MCPPage/promptDemo.data'

// The agent demo in the "Your agent" slide on /workflows. Same rules as the /mcp demo: each mcpTool is a real PostHog
// MCP tool and each argName a real parameter of it. promptDemo.test.ts checks them.
export const emailFlows: PromptFlow[] = [
    {
        title: 'Build onboarding emails',
        prompt: "Set up onboarding: a welcome, a day-3 nudge if they haven't uploaded a file, and a day-15 win-back.",
        intro: "I'll build each one as a draft, then test the welcome.",
        calls: [
            {
                source: 'workflows',
                mcpTool: 'workflows-create',
                argName: 'name',
                args: 'Welcome',
                result: 'Draft: signed up → email',
            },
            {
                source: 'workflows',
                mcpTool: 'workflows-create',
                argName: 'name',
                args: 'Day-3 upload nudge',
                result: 'Draft: wait 3d → no upload? → email',
            },
            {
                source: 'workflows',
                mcpTool: 'workflows-create',
                argName: 'name',
                args: 'Day-15 win-back',
                result: 'Draft: wait 15d → still inactive? → email',
            },
            {
                source: 'workflows',
                mcpTool: 'workflows-test-run',
                argName: 'id',
                args: '01a2f7c4',
                result: 'Welcome email rendered for a test person',
            },
        ],
        answer: 'The 3 onboarding automations are drafts, so nothing sends yet. The welcome passed its test run with a sample signup, and the nudge skips anyone who already uploaded. Want me to turn all 3 on?',
    },
    {
        title: 'Check a launch email',
        prompt: "How did last week's launch email do, and did people actually use the feature?",
        intro: "I'll find the email, then follow the people who clicked into the product.",
        calls: [
            {
                source: 'workflows',
                mcpTool: 'workflows-list',
                argName: 'search',
                args: 'shared folders',
                result: 'Broadcast "New: shared folders", sent Dec 9',
            },
            {
                source: 'analytics',
                mcpTool: 'query-trends',
                argName: 'series',
                args: 'email opened, link clicked',
                result: '41% opened, 6.2% clicked',
            },
            {
                source: 'analytics',
                mcpTool: 'query-funnel',
                argName: 'series',
                args: 'link clicked → folder shared',
                result: '212 clickers shared a folder within 7 days',
            },
        ],
        answer: 'A solid launch: 41% opened and 6.2% clicked. The email did its job too, because 212 people who clicked went on to share a folder within a week.',
    },
    {
        title: 'Reuse last year’s sale',
        prompt: "Turn last year's holiday sale email into a broadcast for free-plan users who were active this month.",
        intro: "I'll find last year's email, draft a broadcast from it, then find a free day.",
        calls: [
            {
                source: 'workflows',
                mcpTool: 'workflows-list',
                argName: 'search',
                args: 'holiday sale',
                result: 'Found "Holiday sale 2025", 38% opened',
            },
            {
                source: 'workflows',
                mcpTool: 'broadcasts-create',
                argName: 'name',
                args: 'Holiday sale 2026',
                result: 'Draft for 31,400 free-plan users active this month',
            },
            {
                source: 'workflows',
                mcpTool: 'workflows-list',
                argName: 'broadcast_status',
                args: 'scheduled',
                result: 'December changelog goes to all users on Dec 16',
            },
        ],
        answer: 'The holiday sale is a draft with last year’s design and this year’s dates. The December changelog reaches the same people on Dec 16, and your cap allows 1 marketing email every 2 days, so I’d send this on Friday, Dec 18 at 10 AM. Want me to schedule it?',
    },
    {
        title: 'Move from Resend',
        prompt: 'Move our email from Resend to PostHog.',
        intro: "I'll import what Resend has, then check what's left before the switch.",
        calls: [
            {
                source: 'workflows',
                mcpTool: 'provider-imports-create',
                argName: 'provider',
                args: 'resend',
                result: 'Import started: templates, suppressions, unsubscribes',
            },
            {
                source: 'workflows',
                mcpTool: 'provider-imports-get',
                argName: 'id',
                args: 'imp_2f9c',
                result: '12 templates, 1,204 suppressions, 38 unsubscribes',
            },
            {
                source: 'workflows',
                mcpTool: 'workflows-list-email-templates',
                argName: 'transactional',
                args: 'true',
                result: '12 transactional templates, ready to send',
            },
        ],
        answer: 'Your Resend templates, suppressions, and unsubscribes are in PostHog, and nothing sends until you say so. Add the DNS records from Channels, then I can swap `resend.emails.send` for `posthog.emails.send` in the 4 files that call it.',
    },
]
