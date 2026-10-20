import React from 'react'
import OSButton from 'components/OSButton'
import { IconClaudeCode, LogomarkCodex } from 'components/OSIcons'

export const AGENT_TEACHING_PROMPT = `Teach me PostHog Product Analytics using my own product and PostHog project.

Inspect its existing PostHog instrumentation, then create a custom learning path based on its real events, properties, funnels, and gaps. Teach one concept at a time and give me small, safe exercises.

Use the PostHog Product Analytics docs at https://posthog.com/docs/product-analytics.md as the source of truth.

Don’t change the project unless I explicitly ask. If you can’t access the project, tell me what context you need.`

const codexPromptUrl = (prompt: string): string => `codex://new?prompt=${encodeURIComponent(prompt)}`
const claudeCodePromptUrl = (prompt: string): string => `claude-cli://open?q=${encodeURIComponent(prompt)}`

/** Shared launch controls; page copy and layouts belong to their respective pages. */
export default function AgentTeachingActions({ prompt = AGENT_TEACHING_PROMPT }: { prompt?: string }): JSX.Element {
    return (
        <div className="mt-5 flex flex-wrap gap-3">
            <OSButton
                type="button"
                variant="primary"
                size="md"
                icon={<IconClaudeCode className="[&_path]:!fill-current" />}
                onClick={() => window.location.assign(claudeCodePromptUrl(prompt))}
            >
                Open in Claude Code
            </OSButton>
            <OSButton
                type="button"
                variant="primary"
                size="md"
                icon={<LogomarkCodex className="[&_path]:!fill-current" />}
                onClick={() => window.location.assign(codexPromptUrl(prompt))}
            >
                Open in Codex
            </OSButton>
        </div>
    )
}
