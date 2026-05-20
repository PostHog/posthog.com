import React from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { Skill } from 'hooks/skills'
import SkillsColumnRow from './SkillsColumnRow'
import SkillDetailPane from './SkillDetailPane'
import SkillsColumnShell from './SkillsColumnShell'
import SkillsBrowseHeader from './SkillsBrowseHeader'
import { BrowseMode } from './types'

export default function SkillsSearchList({
    skills,
    filteredSkills,
    selectedSkill,
    onSelectSkill,
    browseMode,
    onBrowseModeChange,
}: {
    skills: Skill[]
    filteredSkills: Skill[]
    selectedSkill: Skill | null
    onSelectSkill: (skill: Skill) => void
    browseMode: BrowseMode
    onBrowseModeChange: (mode: BrowseMode) => void
}) {
    return (
        <div
            data-scheme="primary"
            className="flex h-full min-h-0 flex-1 items-stretch border border-primary rounded-md overflow-hidden bg-primary text-primary"
        >
            <SkillsColumnShell widthClassName="w-64 @md:w-72 @xl:w-80">
                <SkillsBrowseHeader browseMode={browseMode} onBrowseModeChange={onBrowseModeChange} />
                <ScrollArea className="flex-1 min-h-0" dataScheme="primary">
                    <div className="p-1">
                        {filteredSkills.length === 0 ? (
                            <p className="text-sm text-secondary px-2 py-4 m-0">No skills match your search.</p>
                        ) : (
                            <RadioGroup.Root
                                value={selectedSkill?.id ?? ''}
                                onValueChange={(value) => {
                                    const skill = filteredSkills.find((s) => s.id === value)
                                    if (skill) onSelectSkill(skill)
                                }}
                                className="flex flex-col gap-px text-left w-full"
                            >
                                {filteredSkills.map((skill) => (
                                    <SkillsColumnRow
                                        key={skill.id}
                                        name={skill.name}
                                        value={skill.id}
                                        isFolder={false}
                                        wrapLabel
                                        reserveIconSpace
                                    />
                                ))}
                            </RadioGroup.Root>
                        )}
                    </div>
                </ScrollArea>
            </SkillsColumnShell>
            <SkillDetailPane skill={selectedSkill} allSkills={skills} onSelectSkill={onSelectSkill} />
        </div>
    )
}
