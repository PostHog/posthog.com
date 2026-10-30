import React from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { IconDocument } from '@posthog/icons'
import { Skill, OutcomeTreeNode } from 'hooks/skills'
import SkillsColumnShell from './SkillsColumnShell'
import SkillsMobileNav from './SkillsMobileNav'
import { SkillsMobileNavProps } from './types'

export default function SkillsOutcomeSkillsColumn({
    categories,
    selectedSkillId,
    onSelectSkill,
    mobileNav,
    widthClassName = 'w-64 @md:w-72 @xl:w-80',
    showBorder = true,
}: {
    categories: OutcomeTreeNode[]
    selectedSkillId: string | null
    onSelectSkill: (skill: Skill) => void
    mobileNav?: SkillsMobileNavProps
    widthClassName?: string
    showBorder?: boolean
}) {
    return (
        <SkillsColumnShell widthClassName={widthClassName} showBorder={showBorder}>
            {mobileNav ? <SkillsMobileNav {...mobileNav} /> : null}
            <ScrollArea.Root className="flex-1 min-h-0 overflow-hidden">
                <ScrollArea.Viewport className="h-full w-full p-1">
                    <RadioGroup.Root
                        value={selectedSkillId ?? ''}
                        onValueChange={(value) => {
                            for (const category of categories) {
                                const skillNode = category.children?.find(
                                    (n) => n.type === 'skill' && n.id === value && n.skill
                                )
                                if (skillNode?.skill) {
                                    onSelectSkill(skillNode.skill)
                                    return
                                }
                            }
                        }}
                        className="flex flex-col text-left w-full items-stretch"
                    >
                        {categories.map((category, categoryIndex) => {
                            const categorySkills = (category.children ?? []).filter(
                                (n): n is OutcomeTreeNode & { skill: Skill } => n.type === 'skill' && Boolean(n.skill)
                            )

                            if (categorySkills.length === 0) return null

                            return (
                                <div
                                    key={category.id}
                                    className={`w-full text-left ${categoryIndex > 0 ? 'mt-2' : ''}`}
                                >
                                    <div className="px-2 py-1 text-xs text-secondary font-medium select-none text-left">
                                        {category.name}
                                    </div>
                                    <div className="flex flex-col gap-px w-full">
                                        {categorySkills.map((node) => (
                                            <RadioGroup.Item
                                                key={node.id}
                                                value={node.id}
                                                className="group relative flex w-full select-none text-left items-start justify-start gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-[state=checked]:bg-accent hover:bg-accent/50"
                                            >
                                                <IconDocument className="size-4 text-secondary flex-shrink-0 mt-0.5" />
                                                <span className="break-words leading-snug min-w-0 flex-1 text-left">
                                                    {node.name}
                                                </span>
                                            </RadioGroup.Item>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </RadioGroup.Root>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                    className="flex select-none touch-none p-0.5 data-[orientation=vertical]:w-2"
                    orientation="vertical"
                >
                    <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-border dark:bg-border-dark" />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
        </SkillsColumnShell>
    )
}
