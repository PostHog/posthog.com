import React from 'react'
import { IconSearch, IconX } from '@posthog/icons'
import { ToggleGroup, ToggleOption } from 'components/RadixUI/ToggleGroup'
import { BrowseMode, SkillsBrowseHeaderProps } from './types'

const browseModeOptions: ToggleOption[] = [
    { label: 'Role', value: 'role' },
    { label: 'Tools', value: 'product' },
]

/**
 * Top of the left column: a persistent search box above the Role/Product
 * toggle. Searching the sidebar collapses the columns into a single results
 * list (handled by SkillsColumnView); the toggle hides while searching since
 * search ignores it.
 */
export default function SkillsBrowseHeader({
    browseMode,
    onBrowseModeChange,
    searchQuery,
    onSearchChange,
}: SkillsBrowseHeaderProps) {
    const isSearchMode = searchQuery.trim() !== ''

    return (
        <div data-scheme="primary" className="flex-shrink-0 border-b border-primary p-2 space-y-2 bg-primary">
            <div className="relative">
                <IconSearch className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search skills..."
                    aria-label="Search skills"
                    className="w-full rounded-md border border-primary bg-primary pl-8 pr-8 py-1.5 text-sm outline-none focus:border-secondary"
                />
                {isSearchMode && (
                    <button
                        type="button"
                        aria-label="Clear search"
                        onClick={() => onSearchChange('')}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 p-0.5 rounded-sm text-secondary hover:text-primary"
                    >
                        <IconX className="size-4" />
                    </button>
                )}
            </div>
            {!isSearchMode && (
                <ToggleGroup
                    title="Browse by"
                    hideTitle
                    options={browseModeOptions}
                    value={browseMode}
                    onValueChange={(v) => onBrowseModeChange(v as BrowseMode)}
                    className="w-full"
                />
            )}
        </div>
    )
}
