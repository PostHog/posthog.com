import React, { useMemo, useState, useEffect } from 'react'
import useProduct from 'hooks/useProduct'
import { Skill, buildOutcomeTree, buildProductTree, slugifySkillName } from 'hooks/skills'
import { resolveSkillResource } from 'hooks/skillsResourceRegistry'
import SkillsFinderColumn from './SkillsFinderColumn'
import SkillsOutcomeSkillsColumn from './SkillsOutcomeSkillsColumn'
import SkillDetailPane from './SkillDetailPane'
import SkillsBrowseHeader from './SkillsBrowseHeader'
import { BrowseMode } from './types'

export type { BrowseMode } from './types'

const COLUMN_WIDTH = 'w-64 @md:w-72 @xl:w-80'

function skillsInDepartment(categories: { children?: { type: string; skill?: Skill }[] }[]): Skill[] {
    return categories.flatMap((category) =>
        (category.children ?? []).filter((n) => n.type === 'skill' && n.skill).map((n) => n.skill as Skill)
    )
}

export default function SkillsColumnView({
    skills,
    selectedSkill,
    onSelectSkill,
    browseMode,
    onBrowseModeChange,
    searchQuery,
    onSearchChange,
    filteredSkills,
}: {
    skills: Skill[]
    selectedSkill: Skill | null
    onSelectSkill: (skill: Skill) => void
    browseMode: BrowseMode
    onBrowseModeChange: (mode: BrowseMode) => void
    searchQuery: string
    onSearchChange: (value: string) => void
    filteredSkills: Skill[]
}) {
    const allProducts = useProduct() as Array<{
        handle: string
        name: string
        Icon?: React.ComponentType<{ className?: string }>
        color?: string
        slug?: string
    }>
    const outcomeTree = useMemo(() => buildOutcomeTree(skills), [skills])
    const productTree = useMemo(() => buildProductTree(skills), [skills])

    const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null)
    const [selectedProductHandle, setSelectedProductHandle] = useState<string | null>(null)

    const isSearchMode = searchQuery.trim() !== ''

    const departments = outcomeTree
    const selectedDepartment = departments.find((d) => d.id === selectedDepartmentId) ?? null
    const categories = selectedDepartment?.children ?? []
    const departmentSkills = useMemo(() => skillsInDepartment(categories), [categories])

    const productEntries = useMemo(() => {
        return productTree
            .map((entry) => {
                const resolved = resolveSkillResource({ handle: entry.handle }, allProducts)
                return {
                    id: entry.handle,
                    handle: entry.handle,
                    name: resolved?.name ?? entry.handle.replace(/_/g, ' '),
                    skills: entry.skills,
                    Icon: resolved?.Icon,
                    color: resolved?.color,
                }
            })
            .filter((entry) => entry.Icon)
            .sort((a, b) => a.name.localeCompare(b.name))
    }, [productTree, allProducts])

    const selectedProduct = productEntries.find((p) => p.id === selectedProductHandle) ?? null
    const productSkills = selectedProduct?.skills ?? []

    const browseHeader = (
        <SkillsBrowseHeader
            browseMode={browseMode}
            onBrowseModeChange={onBrowseModeChange}
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
        />
    )

    // Detail-pane links: jump the browse to a department (Role tab) or a product
    // (Product tab). Clearing search first so the columns are visible again.
    const navigateToDepartment = (tag: string) => {
        onSearchChange('')
        onBrowseModeChange('role')
        setSelectedDepartmentId(slugifySkillName(tag))
    }
    const navigateToProduct = (handle: string) => {
        onSearchChange('')
        onBrowseModeChange('product')
        setSelectedProductHandle(handle)
    }

    useEffect(() => {
        if (isSearchMode) return
        if (selectedSkill && browseMode === 'role') {
            // A skill can live under several departments (tags). Keep the current
            // department if the skill belongs to it, so navigating between
            // cross-department skills doesn't jump the user to a different section.
            const departmentIds = selectedSkill.tags.map(slugifySkillName)
            setSelectedDepartmentId((current) =>
                current && departmentIds.includes(current) ? current : departmentIds[0] ?? current
            )
        }
        if (selectedSkill && browseMode === 'product') {
            // Likewise, keep the current product if the skill uses it.
            const handles = selectedSkill.resources.map((r) => r.handle)
            setSelectedProductHandle((current) =>
                current && handles.includes(current) ? current : handles[0] ?? current
            )
        }
    }, [selectedSkill?.id, browseMode, isSearchMode])

    useEffect(() => {
        if (browseMode === 'role' && !selectedDepartmentId && departments.length > 0) {
            setSelectedDepartmentId(departments[0].id)
        }
    }, [browseMode, departments, selectedDepartmentId])

    useEffect(() => {
        if (browseMode === 'product' && productEntries.length > 0) {
            if (!selectedProductHandle || !productEntries.some((p) => p.id === selectedProductHandle)) {
                setSelectedProductHandle(productEntries[0].id)
            }
        }
    }, [browseMode, productEntries, selectedProductHandle])

    useEffect(() => {
        if (!isSearchMode && browseMode === 'role' && departmentSkills.length > 0) {
            if (!selectedSkill || !departmentSkills.some((s) => s.id === selectedSkill.id)) {
                onSelectSkill(departmentSkills[0])
            }
        }
    }, [browseMode, selectedDepartmentId, departmentSkills, isSearchMode])

    useEffect(() => {
        if (!isSearchMode && browseMode === 'product' && productSkills.length > 0) {
            if (!selectedSkill || !productSkills.some((s) => s.id === selectedSkill.id)) {
                onSelectSkill(productSkills[0])
            }
        }
    }, [browseMode, selectedProductHandle, productSkills, isSearchMode])

    return (
        <div
            data-scheme="primary"
            className="flex h-full min-h-0 flex-1 items-stretch overflow-hidden bg-primary text-primary"
        >
            {/* Primary (left) column. Always a SkillsFinderColumn so the search box in
                its header stays mounted across browse/search — focus is never lost. */}
            {isSearchMode ? (
                <SkillsFinderColumn
                    key="primary"
                    header={browseHeader}
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
                    header={browseHeader}
                    items={departments}
                    selectedId={selectedDepartmentId}
                    onSelect={(d) => setSelectedDepartmentId(d.id)}
                    widthClassName={COLUMN_WIDTH}
                />
            ) : (
                <SkillsFinderColumn
                    key="primary"
                    header={browseHeader}
                    items={productEntries}
                    selectedId={selectedProductHandle}
                    onSelect={(p) => setSelectedProductHandle(p.id)}
                    getIcon={(p) => {
                        const Icon = p.Icon
                        if (!Icon) return undefined
                        return <Icon className={`size-4 flex-shrink-0 text-${p.color}`} />
                    }}
                    widthClassName={COLUMN_WIDTH}
                />
            )}

            {/* Secondary column — only while browsing (search collapses to one list). */}
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
                onNavigateToDepartment={navigateToDepartment}
                onNavigateToProduct={navigateToProduct}
            />
        </div>
    )
}
