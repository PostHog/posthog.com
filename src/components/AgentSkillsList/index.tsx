import React from 'react'
import Link from 'components/Link'
import { SingleCodeBlock } from 'components/CodeBlock'
import { useAgentSkills } from '../../hooks/skills'

type AgentSkillsListProps = {
    /** Monorepo product folder to list skills for, e.g. "ai_observability" */
    product: string
    /** Skill names (SKILL.md frontmatter `name`) to hide from the list */
    exclude?: string[]
}

const MONOREPO_BASE = 'https://github.com/PostHog/posthog/tree/master'

/**
 * A copyable paste-into-your-agent prompt for installing the listed skills from the
 * skills release zip. Skill names are interpolated from the same build-time data as
 * AgentSkillsList, so the prompt never drifts from the list rendered beside it.
 */
export function AgentSkillsInstallPrompt({ product, exclude = [] }: AgentSkillsListProps): JSX.Element {
    const names = useAgentSkills()
        .filter((skill) => skill.product === product && !exclude.includes(skill.name))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((skill) => skill.name)

    // Local builds without the monorepo clone have no names – point the agent at the live list instead
    const extractLine =
        names.length > 0
            ? `Extract only these skills: ${names.join(', ')}.`
            : `Extract only the AI Observability skills listed at https://posthog.com/docs/ai-observability/skills.`

    const prompt = `Set up PostHog's AI Observability agent skills for me:

1. Download https://github.com/PostHog/posthog/releases/download/agent-skills-latest/skills.zip - a bundle of 100+ PostHog skills, one top-level directory per skill.
2. ${extractLine}
3. Move each extracted directory into your skills directory (Claude Code: .claude/skills/ in this project, or ~/.claude/skills/ for all projects - ask me which; other agents: your equivalent).
4. Delete the zip, verify every installed skill contains a SKILL.md, and list what you installed.

These skills call PostHog MCP tools. If the PostHog MCP server isn't connected yet, tell me and point me to https://posthog.com/docs/model-context-protocol.`

    return (
        <SingleCodeBlock language="text" showCopy={true} showLineNumbers={false} label="Prompt">
            {prompt}
        </SingleCodeBlock>
    )
}

// Descriptions come verbatim from SKILL.md frontmatter and may contain `backticked` terms
function renderInlineCode(text: string): React.ReactNode {
    const parts = text.split(/`([^`]+)`/)
    if (parts.length === 1) return text
    return parts.map((part, i) => (i % 2 === 1 ? <code key={i}>{part}</code> : part))
}

export default function AgentSkillsList({ product, exclude = [] }: AgentSkillsListProps): JSX.Element {
    const skills = useAgentSkills()
        .filter((skill) => skill.product === product && !exclude.includes(skill.name))
        .sort((a, b) => a.name.localeCompare(b.name))

    if (skills.length === 0) {
        // Local builds can run without the monorepo clone – point at the source instead of rendering nothing
        return (
            <p>
                Browse the skills in the{' '}
                <Link to={`${MONOREPO_BASE}/products/${product}/skills`} external>
                    PostHog repo
                </Link>
                .
            </p>
        )
    }

    return (
        <div className="grid gap-4 mb-6">
            {skills.map((skill) => (
                <div key={skill.name} className="border border-primary rounded-md p-4 bg-accent">
                    <div className="flex items-baseline justify-between gap-2 flex-wrap">
                        <h3 className="!my-0 text-lg font-code">{skill.name}</h3>
                        <Link
                            to={`${MONOREPO_BASE}/${skill.sourcePath}`}
                            external
                            className="text-sm whitespace-nowrap"
                        >
                            View source
                        </Link>
                    </div>
                    <p className="!mb-0 mt-2 text-[15px]">{renderInlineCode(skill.description)}</p>
                    {skill.mcpTools.length > 0 && (
                        <ul className="list-none !p-0 !m-0 mt-3 flex flex-wrap gap-1.5">
                            {skill.mcpTools.map((tool) => (
                                <li
                                    key={tool}
                                    className="!m-0 font-code text-xs border border-primary rounded-sm px-1.5 py-0.5 text-muted"
                                >
                                    {tool}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    )
}
