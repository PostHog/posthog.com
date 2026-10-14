import React from 'react'
import Link from 'components/Link'
import { useAgentSkills } from '../../hooks/skills'

type AgentSkillsListProps = {
    /** Monorepo product folder to list skills for, e.g. "ai_observability" */
    product: string
    /** Skill names (SKILL.md frontmatter `name`) to hide from the list */
    exclude?: string[]
}

const MONOREPO_BASE = 'https://github.com/PostHog/posthog/tree/master'

// Descriptions come verbatim from SKILL.md frontmatter and may contain `backticked` terms
function renderInlineCode(text: string): React.ReactNode {
    const parts = text.split(/`([^`]+)`/)
    if (parts.length === 1) return text
    return parts.map((part, i) => (i % 2 === 1 ? <code key={i}>{part}</code> : part))
}

/**
 * SKILL.md descriptions open with a human-readable summary sentence, then continue with
 * agent-trigger phrasing ("Use when the user asks..."). Only the first sentence is worth
 * showing to people – the full text is one click away via the source link.
 */
function firstSentence(text: string): string {
    // ponytail: sentence split on ". " skipping "e.g."/"i.e."; revisit if a skill description breaks it
    const match = text.match(/^(?:.*?(?<!\be\.g|\bi\.e))\.(?=\s|$)/)
    return match ? match[0] : text
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
                    <p className="!mb-0 mt-2 text-[15px]">{renderInlineCode(firstSentence(skill.description))}</p>
                    {skill.mcpTools.length > 0 && (
                        <ul className="list-none !p-0 !m-0 mt-3 flex flex-wrap gap-1.5">
                            {skill.mcpTools.map((tool) => (
                                <li
                                    key={tool}
                                    className="!m-0 font-code font-medium text-[13px] border border-primary rounded-sm px-1.5 py-0.5 bg-primary"
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
