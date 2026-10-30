import React from 'react'
import SkillsFinderColumn from './SkillsFinderColumn'
import SkillsOutcomeSkillsColumn from './SkillsOutcomeSkillsColumn'
import SkillDetailPane from './SkillDetailPane'
import { SkillsBrowseColumnsProps, SkillsDetailPaneProps } from './types'

const COLUMN_WIDTH = 'w-64 @md:w-72 @xl:w-80'

export default function SkillsWideColumnView({
    browseMode,
    isSearchMode,
    searchQuery,
    onBrowseModeChange,
    onSearchChange,
    departments,
    productEntries,
    categories,
    productSkills,
    filteredSkills,
    selectedSkill,
    selectedDepartmentId,
    selectedProductHandle,
    onSelectDepartment,
    onSelectProduct,
    onSelectSkill,
    skills,
    onNavigateToDepartment,
}: SkillsBrowseColumnsProps & SkillsDetailPaneProps) {
    return (
        <>
            {isSearchMode ? (
                <SkillsFinderColumn
                    key="primary"
                    browseHeader={{ browseMode, onBrowseModeChange, searchQuery, onSearchChange }}
                    items={filteredSkills.map((s) => ({ id: s.id, name: s.name }))}
                    selectedId={selectedSkill?.id ?? null}
                    onSelect={(item) => {
                        const skill = filteredSkills.find((s) => s.id === item.id)
                        if (skill) onSelectSkill(skill)
                    }}
                    isFolder={() => false}
                    wrapLabels
                    emptyLabel="No skills match your search."
                    widthClassName={COLUMN_WIDTH}
                />
            ) : browseMode === 'role' ? (
                <SkillsFinderColumn
                    key="primary"
                    browseHeader={{ browseMode, onBrowseModeChange, searchQuery, onSearchChange }}
                    items={departments}
                    selectedId={selectedDepartmentId}
                    onSelect={(d) => onSelectDepartment(d.id)}
                    widthClassName={COLUMN_WIDTH}
                />
            ) : (
                <SkillsFinderColumn
                    key="primary"
                    browseHeader={{ browseMode, onBrowseModeChange, searchQuery, onSearchChange }}
                    items={productEntries}
                    selectedId={selectedProductHandle}
                    onSelect={(p) => onSelectProduct(p.id)}
                    getIcon={(p) => {
                        const Icon = p.Icon
                        if (!Icon) return undefined
                        return <Icon className={`size-4 flex-shrink-0 text-${p.color}`} />
                    }}
                    widthClassName={COLUMN_WIDTH}
                />
            )}

            {!isSearchMode && browseMode === 'role' && categories.length > 0 && (
                <SkillsOutcomeSkillsColumn
                    categories={categories}
                    selectedSkillId={selectedSkill?.id ?? null}
                    onSelectSkill={onSelectSkill}
                />
            )}
            {!isSearchMode && browseMode === 'product' && productSkills.length > 0 && (
                <SkillsFinderColumn
                    items={productSkills.map((s) => ({ id: s.id, name: s.name }))}
                    selectedId={selectedSkill?.id ?? null}
                    onSelect={(item) => {
                        const skill = productSkills.find((s) => s.id === item.id)
                        if (skill) onSelectSkill(skill)
                    }}
                    isFolder={() => false}
                    wrapLabels
                    widthClassName={COLUMN_WIDTH}
                />
            )}

            <SkillDetailPane
                skill={selectedSkill}
                allSkills={skills}
                onSelectSkill={onSelectSkill}
                onNavigateToDepartment={onNavigateToDepartment}
            />
        </>
    )
}
