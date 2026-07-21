import type React from 'react'
import { OutcomeTreeNode, Skill } from 'hooks/skills'

export type BrowseMode = 'role' | 'product'

export type MobilePanel = 'primary' | 'secondary' | 'detail'

export type ProductBrowseEntry = {
    id: string
    handle: string
    name: string
    skills: Skill[]
    Icon?: React.ComponentType<{ className?: string }>
    color?: string
}

/** Props for SkillsBrowseHeader */
export type SkillsBrowseHeaderProps = {
    browseMode: BrowseMode
    onBrowseModeChange: (mode: BrowseMode) => void
    searchQuery: string
    onSearchChange: (value: string) => void
}

/** Props for SkillsMobileNav back bar */
export type SkillsMobileNavProps = {
    title: string
    onBack: () => void
}

/** Shared browse column props for wide and mobile layouts */
export type SkillsBrowseColumnsProps = SkillsBrowseHeaderProps & {
    isSearchMode: boolean
    departments: OutcomeTreeNode[]
    productEntries: ProductBrowseEntry[]
    categories: OutcomeTreeNode[]
    productSkills: Skill[]
    filteredSkills: Skill[]
    selectedSkill: Skill | null
    selectedDepartmentId: string | null
    selectedProductHandle: string | null
    onSelectDepartment: (id: string) => void
    onSelectProduct: (id: string) => void
    onSelectSkill: (skill: Skill) => void
}

/** Shared detail pane props */
export type SkillsDetailPaneProps = {
    skills: Skill[]
    selectedSkill: Skill | null
    onSelectSkill: (skill: Skill) => void
    onNavigateToDepartment: (tag: string) => void
}
