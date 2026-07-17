import React from 'react'
import { IconCopy /* , IconExternal */ } from '@posthog/icons'
import ScrollArea from 'components/RadixUI/ScrollArea'
import Tooltip from 'components/RadixUI/Tooltip'
import { useToast } from '../../context/Toast'
import { Skill, getRelatedSkills } from 'hooks/skills'

// const POSTHOG_APP_URL = 'https://app.posthog.com'

/** Opens PostHog and pre-fills the prompt into Max (the AI) via the side-panel hash. */
// function openInPostHogUrl(prompt: string): string {
//     return `${POSTHOG_APP_URL}/#panel=max:${encodeURIComponent(prompt)}`
// }

function PromptActions({ prompt }: { prompt: string }) {
    const { addToast } = useToast()

    const copy = () => {
        navigator.clipboard?.writeText(prompt)
        addToast({ description: 'Prompt copied to clipboard' })
    }

    const actionClasses = 'inline-flex p-1 rounded-sm text-secondary hover:text-primary hover:bg-accent'

    return (
        <div className="flex items-center gap-0.5 flex-shrink-0">
            <Tooltip
                delay={200}
                trigger={
                    <button type="button" aria-label="Copy prompt" onClick={copy} className={actionClasses}>
                        <IconCopy className="size-4" />
                    </button>
                }
            >
                Copy prompt
            </Tooltip>
            {/* <Tooltip
                delay={200}
                trigger={
                    <a
                        href={openInPostHogUrl(prompt)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open in PostHog"
                        className={actionClasses}
                    >
                        <IconExternal className="size-4" />
                    </a>
                }
            >
                Open in PostHog
            </Tooltip> */}
        </div>
    )
}

function TagChip({ tag, onClick }: { tag: string; onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="text-xs rounded-sm border border-primary px-1.5 py-0.5 text-secondary hover:text-primary hover:border-secondary"
        >
            {tag}
        </button>
    )
}

export default function SkillDetailPane({
    skill,
    allSkills,
    onSelectSkill,
    onNavigateToDepartment,
}: {
    skill: Skill | null
    allSkills: Skill[]
    onSelectSkill: (skill: Skill) => void
    onNavigateToDepartment: (tag: string) => void
}) {
    const related = skill ? getRelatedSkills(skill, allSkills) : []

    if (!skill) {
        return (
            <div
                data-scheme="primary"
                className="flex flex-1 min-h-0 self-stretch items-center justify-center p-8 text-secondary text-sm"
            >
                Select a skill to see details.
            </div>
        )
    }

    return (
        <ScrollArea
            dataScheme="primary"
            className="flex flex-1 min-h-0 min-w-0 self-stretch h-full"
            viewportClasses="p-4 @md:p-6"
        >
            <div className="@container max-w-2xl space-y-5">
                <div>
                    <h2 className="text-xl font-bold m-0 mb-2">{skill.name}</h2>
                    <p className="text-sm m-0 leading-relaxed">{skill.description}</p>
                    {skill.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                            {skill.tags.map((tag) => (
                                <TagChip key={tag} tag={tag} onClick={() => onNavigateToDepartment(tag)} />
                            ))}
                        </div>
                    )}
                </div>

                {skill.example_prompts && skill.example_prompts.length > 0 && (
                    <div>
                        <h3 className="text-sm font-semibold m-0 mb-2">Input</h3>
                        <ul className="list-none m-0 p-0 space-y-1.5">
                            {skill.example_prompts.map((prompt, i) => (
                                <li
                                    key={i}
                                    className="flex items-start gap-2 bg-accent/40 border border-primary rounded-md px-2.5 py-2"
                                >
                                    <span className="flex-1 min-w-0 text-sm leading-relaxed">{prompt}</span>
                                    <PromptActions prompt={prompt} />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {related.length > 0 && (
                    <div>
                        <h3 className="text-sm font-semibold m-0 mb-2">Related skills</h3>
                        <ul className="list-none m-0 p-0 space-y-2">
                            {related.map((relatedSkill) => (
                                <li key={relatedSkill.id} className="text-sm leading-relaxed">
                                    <button
                                        type="button"
                                        onClick={() => onSelectSkill(relatedSkill)}
                                        className="align-middle text-red dark:text-yellow font-semibold hover:underline"
                                    >
                                        {relatedSkill.name}
                                    </button>{' '}
                                    {relatedSkill.tags.length > 0 && (
                                        <span className="inline-block align-middle whitespace-nowrap">
                                            {relatedSkill.tags.map((tag) => (
                                                <span key={tag} className="ml-1">
                                                    <TagChip tag={tag} onClick={() => onNavigateToDepartment(tag)} />
                                                </span>
                                            ))}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </ScrollArea>
    )
}
