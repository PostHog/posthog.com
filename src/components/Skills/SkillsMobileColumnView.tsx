import React, { useCallback, useEffect, useRef, useState } from 'react'
import { OutcomeTreeNode, Skill } from 'hooks/skills'
import SkillsFinderColumn from './SkillsFinderColumn'
import SkillsOutcomeSkillsColumn from './SkillsOutcomeSkillsColumn'
import SkillDetailPane from './SkillDetailPane'
import SkillsMobileNav from './SkillsMobileNav'
import { MobilePanel, ProductBrowseEntry, SkillsBrowseColumnsProps, SkillsDetailPaneProps } from './types'

const MOBILE_WIDTH = 'w-full flex-1 min-w-0'

type SkillsMobileColumnViewProps = SkillsBrowseColumnsProps &
    SkillsDetailPaneProps & {
        selectedDepartment: OutcomeTreeNode | null
        selectedProduct: ProductBrowseEntry | null
    }

export default function SkillsMobileColumnView({
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
    selectedDepartment,
    selectedProduct,
    selectedDepartmentId,
    selectedProductHandle,
    onSelectDepartment,
    onSelectProduct,
    onSelectSkill,
    skills,
    onNavigateToDepartment,
}: SkillsMobileColumnViewProps) {
    const [mobilePanel, setMobilePanel] = useState<MobilePanel>('primary')
    const mobilePanelInitialized = useRef(false)

    const selectSkill = useCallback(
        (skill: Skill) => {
            onSelectSkill(skill)
            setMobilePanel('detail')
        },
        [onSelectSkill]
    )

    const selectDepartment = useCallback(
        (id: string) => {
            onSelectDepartment(id)
            setMobilePanel('secondary')
        },
        [onSelectDepartment]
    )

    const selectProduct = useCallback(
        (id: string) => {
            onSelectProduct(id)
            setMobilePanel('secondary')
        },
        [onSelectProduct]
    )

    const handleMobileBack = useCallback(() => {
        if (mobilePanel === 'detail') {
            setMobilePanel(isSearchMode ? 'primary' : 'secondary')
            return
        }
        if (mobilePanel === 'secondary') {
            setMobilePanel('primary')
        }
    }, [mobilePanel, isSearchMode])

    const navigateToDepartmentFromDetail = useCallback(
        (tag: string) => {
            onNavigateToDepartment(tag)
            setMobilePanel('secondary')
        },
        [onNavigateToDepartment]
    )

    useEffect(() => {
        if (mobilePanelInitialized.current) return
        const skillId = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('skill') : null
        if (skillId && selectedSkill) {
            setMobilePanel('detail')
            mobilePanelInitialized.current = true
        }
    }, [selectedSkill])

    useEffect(() => {
        setMobilePanel('primary')
    }, [browseMode])

    useEffect(() => {
        if (isSearchMode) setMobilePanel('primary')
    }, [isSearchMode])

    const detailBackTitle = isSearchMode
        ? 'Search results'
        : browseMode === 'role'
        ? selectedDepartment?.name ?? 'Skills'
        : selectedProduct?.name ?? 'Skills'

    const secondaryBackTitle = browseMode === 'role' ? 'Roles' : 'Tools'

    if (mobilePanel === 'detail') {
        return (
            <div className="flex flex-col w-full flex-1 min-h-0 min-w-0 self-stretch">
                <SkillsMobileNav title={detailBackTitle} onBack={handleMobileBack} />
                <SkillDetailPane
                    skill={selectedSkill}
                    allSkills={skills}
                    onSelectSkill={selectSkill}
                    onNavigateToDepartment={navigateToDepartmentFromDetail}
                />
            </div>
        )
    }

    if (isSearchMode) {
        return (
            <SkillsFinderColumn
                key="mobile-search"
                browseHeader={{ browseMode, onBrowseModeChange, searchQuery, onSearchChange }}
                items={filteredSkills.map((s) => ({ id: s.id, name: s.name }))}
                selectedId={selectedSkill?.id ?? null}
                onSelect={(item) => {
                    const skill = filteredSkills.find((s) => s.id === item.id)
                    if (skill) selectSkill(skill)
                }}
                isFolder={() => false}
                wrapLabels
                emptyLabel="No skills match your search."
                widthClassName={MOBILE_WIDTH}
                showBorder={false}
            />
        )
    }

    if (mobilePanel === 'secondary') {
        if (browseMode === 'role' && categories.length > 0) {
            return (
                <SkillsOutcomeSkillsColumn
                    categories={categories}
                    selectedSkillId={selectedSkill?.id ?? null}
                    onSelectSkill={selectSkill}
                    mobileNav={{ title: secondaryBackTitle, onBack: handleMobileBack }}
                    widthClassName={MOBILE_WIDTH}
                    showBorder={false}
                />
            )
        }

        if (browseMode === 'product' && productSkills.length > 0) {
            return (
                <SkillsFinderColumn
                    mobileNav={{ title: secondaryBackTitle, onBack: handleMobileBack }}
                    items={productSkills.map((s) => ({ id: s.id, name: s.name }))}
                    selectedId={selectedSkill?.id ?? null}
                    onSelect={(item) => {
                        const skill = productSkills.find((s) => s.id === item.id)
                        if (skill) selectSkill(skill)
                    }}
                    isFolder={() => false}
                    wrapLabels
                    widthClassName={MOBILE_WIDTH}
                    showBorder={false}
                />
            )
        }
    }

    if (browseMode === 'role') {
        return (
            <SkillsFinderColumn
                key="mobile-role"
                browseHeader={{ browseMode, onBrowseModeChange, searchQuery, onSearchChange }}
                items={departments}
                selectedId={selectedDepartmentId}
                onSelect={(d) => selectDepartment(d.id)}
                widthClassName={MOBILE_WIDTH}
                showBorder={false}
            />
        )
    }

    return (
        <SkillsFinderColumn
            key="mobile-product"
            browseHeader={{ browseMode, onBrowseModeChange, searchQuery, onSearchChange }}
            items={productEntries}
            selectedId={selectedProductHandle}
            onSelect={(p) => selectProduct(p.id)}
            getIcon={(p) => {
                const Icon = p.Icon
                if (!Icon) return undefined
                return <Icon className={`size-4 flex-shrink-0 text-${p.color}`} />
            }}
            widthClassName={MOBILE_WIDTH}
            showBorder={false}
        />
    )
}
