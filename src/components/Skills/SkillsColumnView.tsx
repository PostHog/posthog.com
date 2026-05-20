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
}: {
    skills: Skill[]
    selectedSkill: Skill | null
    onSelectSkill: (skill: Skill) => void
    browseMode: BrowseMode
    onBrowseModeChange: (mode: BrowseMode) => void
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
            .sort((a, b) => a.name.localeCompare(b.name))
    }, [productTree, allProducts])

    const selectedProduct = productEntries.find((p) => p.id === selectedProductHandle) ?? null
    const productSkills = selectedProduct?.skills ?? []

    const browseHeader = <SkillsBrowseHeader browseMode={browseMode} onBrowseModeChange={onBrowseModeChange} />

    useEffect(() => {
        if (selectedSkill && browseMode === 'task') {
            setSelectedDepartmentId(slugifySkillName(selectedSkill.department))
        }
        if (selectedSkill && browseMode === 'product') {
            const handle = selectedSkill.resources[0]?.handle
            if (handle) setSelectedProductHandle(handle)
        }
    }, [selectedSkill?.id, browseMode])

    useEffect(() => {
        if (browseMode === 'task' && !selectedDepartmentId && departments.length > 0) {
            setSelectedDepartmentId(departments[0].id)
        }
    }, [browseMode, departments, selectedDepartmentId])

    useEffect(() => {
        if (browseMode === 'product' && !selectedProductHandle && productEntries.length > 0) {
            setSelectedProductHandle(productEntries[0].id)
        }
    }, [browseMode, productEntries, selectedProductHandle])

    useEffect(() => {
        if (browseMode === 'task' && departmentSkills.length > 0) {
            if (!selectedSkill || !departmentSkills.some((s) => s.id === selectedSkill.id)) {
                onSelectSkill(departmentSkills[0])
            }
        }
    }, [browseMode, selectedDepartmentId, departmentSkills])

    useEffect(() => {
        if (browseMode === 'product' && productSkills.length > 0) {
            if (!selectedSkill || !productSkills.some((s) => s.id === selectedSkill.id)) {
                onSelectSkill(productSkills[0])
            }
        }
    }, [browseMode, selectedProductHandle, productSkills])

    return (
        <div
            data-scheme="primary"
            className="flex h-full min-h-0 flex-1 items-stretch border border-primary rounded-md overflow-hidden bg-primary text-primary"
        >
            {browseMode === 'task' ? (
                <>
                    <SkillsFinderColumn
                        items={departments}
                        selectedId={selectedDepartmentId}
                        onSelect={(d) => setSelectedDepartmentId(d.id)}
                        header={browseHeader}
                    />
                    {categories.length > 0 && (
                        <SkillsOutcomeSkillsColumn
                            categories={categories}
                            selectedSkillId={selectedSkill?.id ?? null}
                            onSelectSkill={onSelectSkill}
                        />
                    )}
                </>
            ) : (
                <>
                    <SkillsFinderColumn
                        items={productEntries}
                        selectedId={selectedProductHandle}
                        onSelect={(p) => setSelectedProductHandle(p.id)}
                        getIcon={(p) => {
                            const Icon = p.Icon
                            if (!Icon) return undefined
                            return <Icon className={`size-4 flex-shrink-0 text-${p.color}`} />
                        }}
                        header={browseHeader}
                    />
                    {productSkills.length > 0 && (
                        <SkillsFinderColumn
                            items={productSkills.map((s) => ({ id: s.id, name: s.name }))}
                            selectedId={selectedSkill?.id ?? null}
                            onSelect={(item) => {
                                const skill = productSkills.find((s) => s.id === item.id)
                                if (skill) onSelectSkill(skill)
                            }}
                            isFolder={() => false}
                            wrapLabels
                            widthClassName="w-64 @md:w-72 @xl:w-80"
                        />
                    )}
                </>
            )}
            <SkillDetailPane skill={selectedSkill} allSkills={skills} onSelectSkill={onSelectSkill} />
        </div>
    )
}
