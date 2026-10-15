import React from 'react'
import { SingleCodeBlock } from 'components/CodeBlock'
import OSButton from 'components/OSButton'
import { IconClaudeCode, LogomarkCodex } from 'components/OSIcons'
import WizardCommand from 'components/WizardCommand'

const DASHBOARD_PROMPT = `Inspect this project's events from the last 30 days. Find a meaningful user action with data and create a daily trend of unique users who did it. If there is a clear next action, add a two-step funnel. Save the insights to a dashboard named Product journey overview, reusing it if it exists. Summarize one result and one question to investigate next. If data is missing, tell me what to track first. Don't invent events.`

const maxPromptUrl = `https://app.posthog.com/#panel=max:!${encodeURIComponent(DASHBOARD_PROMPT)}`
const codexPromptUrl = `codex://new?prompt=${encodeURIComponent(DASHBOARD_PROMPT)}`
const claudeCodePromptUrl = `claude-cli://open?q=${encodeURIComponent(DASHBOARD_PROMPT)}`

export default function ProductAnalyticsDashboardNextSteps(): JSX.Element {
    return (
        <div className="not-prose mt-5 min-w-0 @container">
            <div className="min-w-0 [&_.code-block]:mt-0 [&_.min-w-fit]:min-w-0 [&_.whitespace-pre]:whitespace-pre-wrap [&_.whitespace-pre]:break-words">
                <SingleCodeBlock
                    language="text"
                    label="Prompt"
                    showLabel
                    showCopy
                    showLineNumbers={false}
                    showAskAI={false}
                >
                    {DASHBOARD_PROMPT}
                </SingleCodeBlock>
            </div>
            <div className="mt-5 grid gap-4 @2xl:grid-cols-2">
                <section className="flex min-w-0 flex-col rounded border border-primary bg-accent p-4 dark:bg-accent-dark">
                    <h3 className="m-0 text-lg font-semibold">PostHog AI</h3>
                    <p className="mb-5 mt-2 text-secondary">Run this prompt in your PostHog project.</p>
                    <OSButton asLink to={maxPromptUrl} external hideExternalIcon variant="primary" size="md">
                        Build with PostHog AI
                    </OSButton>
                </section>
                <section className="flex min-w-0 flex-col rounded border border-primary bg-accent p-4 dark:bg-accent-dark">
                    <h3 className="m-0 text-lg font-semibold">PostHog MCP</h3>
                    <p className="mb-5 mt-2 text-secondary">Open this prompt in your editor.</p>
                    <div className="flex flex-wrap gap-3">
                        <OSButton
                            type="button"
                            variant="primary"
                            size="md"
                            icon={<IconClaudeCode className="[&_path]:!fill-current" />}
                            onClick={() => window.location.assign(claudeCodePromptUrl)}
                        >
                            Open in Claude Code
                        </OSButton>
                        <OSButton
                            type="button"
                            variant="primary"
                            size="md"
                            icon={<LogomarkCodex className="[&_path]:!fill-current" />}
                            onClick={() => window.location.assign(codexPromptUrl)}
                        >
                            Open in Codex
                        </OSButton>
                    </div>
                    <div className="mt-5 min-w-0">
                        <p className="mb-2 text-sm text-secondary">Need to connect PostHog MCP?</p>
                        <WizardCommand command="mcp add" slim />
                    </div>
                </section>
            </div>
        </div>
    )
}
