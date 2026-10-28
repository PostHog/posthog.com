import React from 'react'
import AgentPromptsPage from 'components/PocketGuides/AgentPromptsPage'
import { normalizeUrl } from 'components/PocketGuides/bookModel'
import { useSkillFiles } from 'components/PocketGuides/useSkillFile'
import ScoutFile from 'components/SelfDrivingInbox/ScoutFile'

const chapterPrompts = [
    {
        title: 'Capture exceptions',
        prompt: `Teach me PostHog Error Tracking using the exceptions in my app. Explain how exceptions become issues, and how grouping and source maps decide what I see. Help me check that my exceptions reach PostHog with readable stack traces, and fix any issues that are grouped wrong.`,
    },
    {
        title: 'Query and measure impact',
        prompt: `Teach me how to query PostHog exceptions alongside the rest of my data. Explain the keys that join an exception to people, sessions, and accounts. Help me find which issues hit my most valuable accounts, and which ones stop people from finishing what they started.`,
    },
    {
        title: 'Triage, alerts, and scouts',
        prompt: `Teach me how to automate PostHog Error Tracking. Explain assignment rules, alerts, and the scouts that report on errors. Help me route issues to the team that owns each part of my code, alert on regressions and spikes, and turn on the error scouts.`,
    },
]

const examplePrompts = [
    {
        title: 'Revenue at risk',
        prompt: `Rank my error tracking issues from the last 7 days by the total MRR of the accounts that hit them, with the exceptions, accounts, and affected users for each. Then tell me which issue to fix first and why. If my accounts don't have an MRR property, rank the issues by affected accounts instead and tell me how to add MRR with warehouse properties.`,
    },
    {
        title: 'Session drop-off',
        prompt: `Build me a funnel over the last 7 days, counted by unique sessions, with a 1-minute conversion window. Step 1 is $exception where $lib is web. Step 2 is either a $pageview or an $autocapture event. Break it down by $exception_issue_id. Then tell me which issues have the highest drop-off among issues with at least 100 sessions.`,
    },
    {
        title: 'Session replays',
        prompt: `Find session recordings from the last 7 days that include a $exception event from the error tracking issue named [issue name]. List the 5 most recent with links, and tell me what the person did just before the error.`,
    },
    {
        title: "A customer's errors",
        prompt: `List the error tracking issues that hit users in the account [account name] in the last 30 days. For each issue, show how many of their users it hit and how many exceptions it fired, sorted by users.`,
    },
    {
        title: 'Support tickets',
        prompt: `Use my synced support tickets table to find tickets from the last 30 days that contain a PostHog replay link. Take the session ID from each link and check whether that session had a $exception event. List the tickets that did, with the exception type and message.`,
    },
    {
        title: 'People who hit the error',
        prompt: `List the people who hit the error tracking issue named [issue name] in the last 30 days, with each person's email and how many exceptions they had.`,
    },
    {
        title: 'Experiments',
        prompt: `Build a trend over the last 14 days, counted by unique sessions. Series A is $exception and series B is $pageview. Set the formula to A / B * 100 and break it down by $feature/my-flag-key. Tell me whether any variant has a higher error rate than control.`,
    },
    {
        title: 'Crash-free sessions',
        prompt: `Build a trend over the last 30 days, counted by unique sessions. Series A is all events. Series B is $exception where $exception_level is fatal. Set the formula to (A - B) / A * 100 to show the share of sessions that didn't crash, and tell me which days were lowest.`,
    },
]

// Each skill lives beside the chapter that teaches it, as that chapter's `SKILL.md`.
const skills = [
    { title: 'Fix misgrouped issues', chapter: 'issue-grouping' },
    { title: 'Quiet noisy issues', chapter: 'reduce-noise' },
    { title: 'Rank errors by revenue', chapter: 'querying-exceptions' },
]

function Skills(): JSX.Element {
    const files = useSkillFiles()
    return (
        <section id="skills" className="min-w-0 border-t border-primary pt-6">
            <h2 className="mt-0 mb-4 text-xl font-semibold">Skills</h2>
            <p className="mt-0 mb-4 leading-relaxed">Give your agent one of these skills:</p>
            <div className="flex flex-col gap-6">
                {skills.map(({ title, chapter }) => {
                    const skill = files.get(normalizeUrl(`/learn/error-tracking/pocket-guide/${chapter}`))
                    return skill?.raw ? (
                        <div key={chapter} className="min-w-0">
                            <h3 className="mt-0 mb-3 text-base font-semibold">{title}</h3>
                            <ScoutFile
                                scout={{ name: skill.name ?? '', description: skill.description ?? '', raw: skill.raw }}
                            />
                        </div>
                    ) : null
                })}
            </div>
        </section>
    )
}

const mcpTools = [
    { tool: 'query-error-tracking-issues-list', use: 'Listing, filtering, and sorting issues' },
    {
        tool: 'query-error-tracking-issue',
        use: "One issue's details and impact, including the pages and browsers it happens on",
    },
    { tool: 'query-error-tracking-issue-events', use: 'Sample exceptions, with stack traces and session IDs' },
    { tool: 'query-session-recordings-list', use: 'The session replays for those session IDs' },
    { tool: 'execute-sql', use: 'Joining exceptions to people, accounts, sessions, and synced sources' },
    { tool: 'read-data-schema', use: 'Checking which events and properties exist before it queries' },
    { tool: 'metric-list', use: 'Finding governed metrics, like MRR, in your semantic layer' },
]

export default function ErrorTrackingAgentTeaching(): JSX.Element {
    return (
        <AgentPromptsPage
            productHandle="error_tracking"
            productName="Error Tracking"
            docsSlug="error-tracking"
            focus="issues, grouping, queries, and alerts"
            chapterPrompts={chapterPrompts}
            examplePrompts={examplePrompts}
        >
            <Skills />
            <section className="min-w-0 border-t border-primary pt-6">
                <h2 className="mt-0 mb-4 text-xl font-semibold">Available MCP tools</h2>
                <p className="mt-0 mb-2 leading-relaxed">You can query exceptions using these MCP tools:</p>
                <ul className="m-0 space-y-2 pl-5 marker:text-primary [&>li]:!list-disc">
                    {mcpTools.map(({ tool, use }) => (
                        <li key={tool}>
                            <code>{tool}</code>: {use}
                        </li>
                    ))}
                </ul>
            </section>
        </AgentPromptsPage>
    )
}
