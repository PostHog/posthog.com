import React, { useEffect, useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import SEO from 'components/seo'
import HeaderBar from 'components/OSChrome/HeaderBar'
import { Select } from 'components/RadixUI/Select'
import SkillsColumnView from 'components/Skills/SkillsColumnView'
import { BrowseMode } from 'components/Skills/types'
import SkillsSearchList from 'components/Skills/SkillsSearchList'
import { Skill, skillSearchBlob, useSkills } from 'hooks/skills'
import useProduct from 'hooks/useProduct'
import { useLocation } from '@reach/router'
import { navigate } from 'gatsby'

type SortValue = 'name' | 'department' | 'category'

export default function SkillsPage(): JSX.Element {
    const allSkills = useSkills()
    const allProducts = useProduct() as Parameters<typeof skillSearchBlob>[1]
    const location = useLocation()

    const [searchQuery, setSearchQuery] = useState('')
    const [browseMode, setBrowseMode] = useState<BrowseMode>('task')
    const [departmentFilter, setDepartmentFilter] = useState<string>('all')
    const [categoryFilter, setCategoryFilter] = useState<string>('all')
    const [tagFilter, setTagFilter] = useState<string>('all')
    const [sort, setSort] = useState<SortValue>('name')
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)

    const departments = useMemo(
        () => ['all', ...Array.from(new Set(allSkills.map((s) => s.department))).sort()],
        [allSkills]
    )
    const categories = useMemo(() => {
        const pool = departmentFilter === 'all' ? allSkills : allSkills.filter((s) => s.department === departmentFilter)
        return ['all', ...Array.from(new Set(pool.map((s) => s.category))).sort()]
    }, [allSkills, departmentFilter])
    const tags = useMemo(() => ['all', ...Array.from(new Set(allSkills.flatMap((s) => s.tags))).sort()], [allSkills])

    const searchableSkills = useMemo(
        () =>
            allSkills.map((skill) => ({
                ...skill,
                searchText: skillSearchBlob(skill, allProducts),
            })),
        [allSkills, allProducts]
    )

    const fuse = useMemo(
        () =>
            new Fuse(searchableSkills, {
                keys: ['name', 'description', 'department', 'category', 'tags', 'searchText'],
                threshold: 0.35,
            }),
        [searchableSkills]
    )

    const filteredSkills = useMemo(() => {
        let result = allSkills

        if (searchQuery.trim()) {
            result = fuse.search(searchQuery.trim()).map((r) => r.item)
        }

        if (departmentFilter !== 'all') {
            result = result.filter((s) => s.department === departmentFilter)
        }
        if (categoryFilter !== 'all') {
            result = result.filter((s) => s.category === categoryFilter)
        }
        if (tagFilter !== 'all') {
            result = result.filter((s) => s.tags.includes(tagFilter))
        }

        const sorted = [...result]
        if (sort === 'name') {
            sorted.sort((a, b) => a.name.localeCompare(b.name))
        } else if (sort === 'department') {
            sorted.sort((a, b) => a.department.localeCompare(b.department) || a.name.localeCompare(b.name))
        } else if (sort === 'category') {
            sorted.sort(
                (a, b) =>
                    a.category.localeCompare(b.category) ||
                    a.department.localeCompare(b.department) ||
                    a.name.localeCompare(b.name)
            )
        }
        return sorted
    }, [allSkills, fuse, searchQuery, departmentFilter, categoryFilter, tagFilter, sort])

    const isSearchMode =
        searchQuery.trim() !== '' || departmentFilter !== 'all' || categoryFilter !== 'all' || tagFilter !== 'all'

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const skillId = params.get('skill')
        if (skillId) {
            const found = allSkills.find((s) => s.id === skillId)
            if (found) setSelectedSkill(found)
        }
    }, [location.search, allSkills])

    useEffect(() => {
        if (isSearchMode && filteredSkills.length > 0) {
            if (!selectedSkill || !filteredSkills.some((s) => s.id === selectedSkill.id)) {
                setSelectedSkill(filteredSkills[0])
            }
        }
    }, [isSearchMode, filteredSkills, selectedSkill])

    const handleSelectSkill = (skill: Skill) => {
        setSelectedSkill(skill)
        navigate(`/skills?skill=${skill.id}`, { replace: true })
    }

    return (
        <>
            <SEO
                title="Agent skills - PostHog"
                description="Explore agent-oriented workflows across PostHog products — what to do, which tools to use, and how they fit together."
                image="/images/og/default.png"
            />
            <div data-scheme="primary" className="@container flex flex-col h-full bg-primary text-primary">
                <HeaderBar showSearch onSearch={setSearchQuery} bookmark={{ title: 'Agent skills', description: '' }} />
                <div className="flex flex-wrap items-center gap-2 px-2 py-2 border-b border-primary">
                    <Select
                        className="min-w-[140px]"
                        placeholder="Department"
                        value={departmentFilter}
                        onValueChange={setDepartmentFilter}
                        groups={[
                            {
                                label: 'Department',
                                items: departments.map((d) => ({
                                    value: d,
                                    label: d === 'all' ? 'All departments' : d,
                                })),
                            },
                        ]}
                    />
                    <Select
                        className="min-w-[140px]"
                        placeholder="Category"
                        value={categoryFilter}
                        onValueChange={setCategoryFilter}
                        groups={[
                            {
                                label: 'Category',
                                items: categories.map((c) => ({
                                    value: c,
                                    label: c === 'all' ? 'All categories' : c,
                                })),
                            },
                        ]}
                    />
                    <Select
                        className="min-w-[120px]"
                        placeholder="Tag"
                        value={tagFilter}
                        onValueChange={setTagFilter}
                        groups={[
                            {
                                label: 'Tag',
                                items: tags.map((t) => ({
                                    value: t,
                                    label: t === 'all' ? 'All tags' : t,
                                })),
                            },
                        ]}
                    />
                    <Select
                        className="min-w-[120px]"
                        placeholder="Sort"
                        value={sort}
                        onValueChange={(v) => setSort(v as SortValue)}
                        groups={[
                            {
                                label: 'Sort',
                                items: [
                                    { value: 'name', label: 'Name' },
                                    { value: 'department', label: 'Department' },
                                    { value: 'category', label: 'Category' },
                                ],
                            },
                        ]}
                    />
                    {isSearchMode && (
                        <span className="text-xs text-secondary ml-auto">
                            {filteredSkills.length} of {allSkills.length} skills
                        </span>
                    )}
                </div>
                <div className="flex flex-1 min-h-0 flex-col p-2">
                    {isSearchMode ? (
                        <SkillsSearchList
                            skills={allSkills}
                            filteredSkills={filteredSkills}
                            selectedSkill={selectedSkill}
                            onSelectSkill={handleSelectSkill}
                            browseMode={browseMode}
                            onBrowseModeChange={setBrowseMode}
                        />
                    ) : (
                        <SkillsColumnView
                            skills={allSkills}
                            selectedSkill={selectedSkill}
                            onSelectSkill={handleSelectSkill}
                            browseMode={browseMode}
                            onBrowseModeChange={setBrowseMode}
                        />
                    )}
                </div>
            </div>
        </>
    )
}
