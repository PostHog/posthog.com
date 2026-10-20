import React from 'react'
import OSButton from 'components/OSButton'
import { IconClaudeCode, LogomarkCodex } from 'components/OSIcons'
import usePostHog from 'hooks/usePostHog'

/** The starter prompt: a learning path built from what the project already has. */
export const agentTeachingPrompt = (productName: string, docsSlug: string, focus: string): string =>
    `Teach me PostHog ${productName} using my own product and PostHog project.

Inspect its existing PostHog instrumentation, then create a custom learning path based on its real ${focus}. Teach one concept at a time and give me small, safe exercises.

Use the PostHog ${productName} docs at https://posthog.com/docs/${docsSlug}.md as the source of truth.

Don’t change the project unless I explicitly ask. If you can’t access the project, tell me what context you need.`

export const AGENT_TEACHING_PROMPT = agentTeachingPrompt(
    'Product Analytics',
    'product-analytics',
    'events, properties, funnels, and gaps'
)

const codexPromptUrl = (prompt: string): string => `codex://new?prompt=${encodeURIComponent(prompt)}`
const claudeCodePromptUrl = (prompt: string): string => `claude-cli://open?q=${encodeURIComponent(prompt)}`

/** Shared launch controls; page copy and layouts belong to their respective pages. */
export default function AgentTeachingActions({
    prompt = AGENT_TEACHING_PROMPT,
    volume,
}: {
    prompt?: string
    /** Volume id for `learn_resource_selected`. */
    volume?: string
}): JSX.Element {
    const posthog = usePostHog()
    const open = (option: string, url: string) => {
        posthog?.capture('learn_resource_selected', { volume, resource: 'agent_teacher', option })
        window.location.assign(url)
    }
    return (
        <div className="mt-5 flex flex-wrap gap-3">
            <OSButton
                type="button"
                variant="primary"
                size="md"
                icon={<IconClaudeCode className="[&_path]:!fill-current" />}
                onClick={() => open('claude_code', claudeCodePromptUrl(prompt))}
            >
                Open in Claude Code
            </OSButton>
            <OSButton
                type="button"
                variant="primary"
                size="md"
                icon={<LogomarkCodex className="[&_path]:!fill-current" />}
                onClick={() => open('codex', codexPromptUrl(prompt))}
            >
                Open in Codex
            </OSButton>
        </div>
    )
}
