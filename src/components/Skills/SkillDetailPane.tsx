import React from 'react'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { Skill, getRelatedSkills, useResolveSkillResources } from 'hooks/skills'
import ProductResourceChip from './ProductResourceChip'

export default function SkillDetailPane({
    skill,
    allSkills,
    onSelectSkill,
}: {
    skill: Skill | null
    allSkills: Skill[]
    onSelectSkill: (skill: Skill) => void
}) {
    const resources = useResolveSkillResources(skill?.resources ?? [])
    const related = skill ? getRelatedSkills(skill, allSkills) : []

    if (!skill) {
        return (
            <div
                data-scheme="primary"
                className="flex flex-1 min-h-0 self-stretch items-center justify-center p-8 text-secondary text-sm"
            >
                Select a skill to see the workflow and products involved.
            </div>
        )
    }

    return (
        <ScrollArea
            dataScheme="primary"
            className="flex flex-1 min-h-0 min-w-0 self-stretch h-full"
            viewportClasses="p-4 @md:p-6"
        >
            <div className="max-w-2xl space-y-5">
                <div>
                    <p className="text-xs text-secondary m-0 mb-1">
                        {skill.department} · {skill.category}
                    </p>
                    <h2 className="text-xl font-bold m-0 mb-2">{skill.name}</h2>
                    <p className="text-sm m-0 leading-relaxed">{skill.description}</p>
                    {skill.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                            {skill.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs rounded-sm border border-primary px-1.5 py-0.5 text-secondary"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <h3 className="text-sm font-semibold m-0 mb-2">Products & tools</h3>
                    <div className="flex flex-wrap gap-1.5">
                        {resources.map((resource) => (
                            <ProductResourceChip key={`${resource.handle}-${resource.name}`} resource={resource} />
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-semibold m-0 mb-2">Workflow</h3>
                    <ol className="list-decimal pl-5 m-0 space-y-1.5 text-sm leading-relaxed">
                        {skill.flow.map((step, i) => (
                            <li key={i}>{step}</li>
                        ))}
                    </ol>
                </div>

                <div>
                    <h3 className="text-sm font-semibold m-0 mb-2">Example prompts</h3>
                    <ul className="list-none m-0 p-0 space-y-1.5">
                        {skill.example_prompts.map((prompt, i) => (
                            <li
                                key={i}
                                className="text-sm font-mono bg-accent/40 dark:bg-accent-dark/40 border border-primary rounded-sm px-2 py-1.5"
                            >
                                {prompt}
                            </li>
                        ))}
                    </ul>
                </div>

                {related.length > 0 && (
                    <div>
                        <h3 className="text-sm font-semibold m-0 mb-2">Related skills</h3>
                        <ul className="list-none m-0 p-0 space-y-1">
                            {related.map((relatedSkill) => (
                                <li key={relatedSkill.id}>
                                    <button
                                        type="button"
                                        onClick={() => onSelectSkill(relatedSkill)}
                                        className="text-sm text-left text-red dark:text-yellow hover:underline"
                                    >
                                        {relatedSkill.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </ScrollArea>
    )
}
