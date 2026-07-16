import React, { useEffect, useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import SEO from 'components/seo'
import HeaderBar from 'components/OSChrome/HeaderBar'
import SkillsColumnView from 'components/Skills/SkillsColumnView'
import { BrowseMode } from 'components/Skills/types'
import { Skill, skillSearchBlob, skills, useSkills } from 'hooks/skills'
import useProduct from 'hooks/useProduct'
import { useLocation } from '@reach/router'
import { navigate } from 'gatsby'

/** Prefer a common getting-started skill over alphabetical first (e.g. billing). */
const DEFAULT_SKILL_ID = 'make-a-first-dashboard-for-a-new-product'

function getDefaultSkill(): Skill | null {
    return skills.find((s) => s.id === DEFAULT_SKILL_ID) ?? null
}

export default function SkillsPage(): JSX.Element {
    const allSkills = useSkills()
    const allProducts = useProduct() as Parameters<typeof skillSearchBlob>[1]
    const location = useLocation()

    const [searchQuery, setSearchQuery] = useState('')
    const [browseMode, setBrowseMode] = useState<BrowseMode>('role')
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(getDefaultSkill)

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
                keys: ['name', 'description', 'stage', 'tags', 'searchText'],
                threshold: 0.35,
            }),
        [searchableSkills]
    )

    const isSearchMode = searchQuery.trim() !== ''

    // Search ignores the Role/Product columns — it collapses to a single flat
    // list of matches. Clearing the query restores the column browse.
    const filteredSkills = useMemo(
        () => (isSearchMode ? fuse.search(searchQuery.trim()).map((r) => r.item) : []),
        [isSearchMode, fuse, searchQuery]
    )

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const skillId = params.get('skill')
        if (skillId) {
            const found = allSkills.find((s) => s.id === skillId)
            if (found) setSelectedSkill(found)
            return
        }
        const fallback = getDefaultSkill()
        if (fallback) {
            navigate(`/skills?skill=${fallback.id}`, { replace: true })
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
                <HeaderBar bookmark={{ title: 'Agent skills', description: '' }} />
                <div className="flex flex-1 min-h-0">
                    <SkillsColumnView
                        skills={allSkills}
                        selectedSkill={selectedSkill}
                        onSelectSkill={handleSelectSkill}
                        browseMode={browseMode}
                        onBrowseModeChange={setBrowseMode}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        filteredSkills={filteredSkills}
                    />
                </div>
            </div>
        </>
    )
}
