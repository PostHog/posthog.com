import React, { useMemo, useState, useEffect } from 'react'
import useProduct from 'hooks/useProduct'
import { Skill, buildOutcomeTree, buildProductTree, slugifySkillName } from 'hooks/skills'
import { resolveSkillResource } from 'hooks/skillsResourceRegistry'
import { useWindow } from '../../context/Window'
import SkillsMobileColumnView from './SkillsMobileColumnView'
import SkillsWideColumnView from './SkillsWideColumnView'
import { BrowseMode } from './types'

export type { BrowseMode } from './types'

/** Below this window width, switch from multi-column to drill-down panels */
const SKILLS_NARROW_BREAKPOINT = 640

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
    const { appWindow } = useWindow()
    const isNarrow = Boolean(appWindow?.size?.width && appWindow.size.width < SKILLS_NARROW_BREAKPOINT)
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

    const navigateToDepartment = (tag: string) => {
        onSearchChange('')
        onBrowseModeChange('role')
        setSelectedDepartmentId(slugifySkillName(tag))
    }

    useEffect(() => {
        if (isSearchMode) return
        if (selectedSkill && browseMode === 'role') {
            const departmentIds = selectedSkill.tags.map(slugifySkillName)
            setSelectedDepartmentId((current) =>
                current && departmentIds.includes(current) ? current : departmentIds[0] ?? current
            )
        }
        if (selectedSkill && browseMode === 'product') {
            const handles = selectedSkill.resources.map((r) => r.handle)
            setSelectedProductHandle((current) =>
                current && handles.includes(current) ? current : handles[0] ?? current
            )
        }
    }, [selectedSkill?.id, browseMode, isSearchMode])

    // Only pick an alphabetical first department when nothing is selected yet.
    // If a skill is already chosen (deep link or page default), the effect above
    // syncs the department from that skill's tags instead.
    useEffect(() => {
        if (browseMode === 'role' && !selectedDepartmentId && !selectedSkill && departments.length > 0) {
            setSelectedDepartmentId(departments[0].id)
        }
    }, [browseMode, departments, selectedDepartmentId, selectedSkill])

    useEffect(() => {
        if (browseMode === 'product' && productEntries.length > 0) {
            if (!selectedProductHandle || !productEntries.some((p) => p.id === selectedProductHandle)) {
                setSelectedProductHandle(productEntries[0].id)
            }
        }
    }, [browseMode, productEntries, selectedProductHandle])

    // Auto-select first skill only on wide layouts (detail pane is always visible).
    useEffect(() => {
        if (isNarrow || isSearchMode) return
        if (browseMode === 'role' && departmentSkills.length > 0) {
            if (!selectedSkill || !departmentSkills.some((s) => s.id === selectedSkill.id)) {
                onSelectSkill(departmentSkills[0])
            }
        }
    }, [browseMode, selectedDepartmentId, departmentSkills, isSearchMode, isNarrow])

    useEffect(() => {
        if (isNarrow || isSearchMode) return
        if (browseMode === 'product' && productSkills.length > 0) {
            if (!selectedSkill || !productSkills.some((s) => s.id === selectedSkill.id)) {
                onSelectSkill(productSkills[0])
            }
        }
    }, [browseMode, selectedProductHandle, productSkills, isSearchMode, isNarrow])

    return (
        <div
            data-scheme="primary"
            className="flex h-full min-h-0 flex-1 items-stretch overflow-hidden bg-primary text-primary"
        >
            {isNarrow ? (
                <SkillsMobileColumnView
                    skills={skills}
                    browseMode={browseMode}
                    isSearchMode={isSearchMode}
                    searchQuery={searchQuery}
                    onBrowseModeChange={onBrowseModeChange}
                    onSearchChange={onSearchChange}
                    departments={departments}
                    productEntries={productEntries}
                    categories={categories}
                    productSkills={productSkills}
                    filteredSkills={filteredSkills}
                    selectedSkill={selectedSkill}
                    selectedDepartment={selectedDepartment}
                    selectedProduct={selectedProduct}
                    selectedDepartmentId={selectedDepartmentId}
                    selectedProductHandle={selectedProductHandle}
                    onSelectDepartment={setSelectedDepartmentId}
                    onSelectProduct={setSelectedProductHandle}
                    onSelectSkill={onSelectSkill}
                    onNavigateToDepartment={navigateToDepartment}
                />
            ) : (
                <SkillsWideColumnView
                    skills={skills}
                    browseMode={browseMode}
                    isSearchMode={isSearchMode}
                    searchQuery={searchQuery}
                    onBrowseModeChange={onBrowseModeChange}
                    onSearchChange={onSearchChange}
                    departments={departments}
                    productEntries={productEntries}
                    categories={categories}
                    productSkills={productSkills}
                    filteredSkills={filteredSkills}
                    selectedSkill={selectedSkill}
                    selectedDepartmentId={selectedDepartmentId}
                    selectedProductHandle={selectedProductHandle}
                    onSelectDepartment={setSelectedDepartmentId}
                    onSelectProduct={setSelectedProductHandle}
                    onSelectSkill={onSelectSkill}
                    onNavigateToDepartment={navigateToDepartment}
                />
            )}
        </div>
    )
}
