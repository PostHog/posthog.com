import React from 'react'
import { IconFilter, IconSearch, IconX } from '@posthog/icons'
import KeyboardShortcut from 'components/KeyboardShortcut'
import Spinner from 'components/Spinner'
import { configForType } from './categories'

type SearchInputProps = {
    inputRef: React.RefObject<HTMLInputElement>
    loading: boolean
    value: string
    activeFilter: string | null
    filterMenuOpen: boolean
    onValueChange: (value: string) => void
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
    onRemoveFilter: () => void
    onToggleFilterMenu: () => void
    activeOptionId?: string
    controlsId: string
}

export default function SearchInput({
    inputRef,
    loading,
    value,
    activeFilter,
    filterMenuOpen,
    onValueChange,
    onKeyDown,
    onRemoveFilter,
    onToggleFilterMenu,
    activeOptionId,
    controlsId,
}: SearchInputProps): JSX.Element {
    const activeConfig = activeFilter ? configForType(activeFilter) : null

    return (
        <div className="flex gap-3 items-center px-4 h-14 shrink-0 bg-primary">
            {loading && value ? (
                <Spinner className="!h-5 !w-5 shrink-0 !text-secondary" />
            ) : (
                <IconSearch className="size-5 shrink-0 text-secondary" />
            )}
            {activeConfig && (
                <button
                    onClick={onRemoveFilter}
                    title="Remove filter"
                    className="group flex shrink-0 items-center gap-1 rounded-md border border-primary bg-accent px-1.5 py-1 text-sm font-semibold text-secondary hover:text-primary [&_svg]:size-3.5"
                >
                    {activeConfig.icon}
                    {activeConfig.label}
                    <IconX className="opacity-50 group-hover:opacity-100" />
                </button>
            )}
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(event) => onValueChange(event.target.value)}
                onKeyDown={onKeyDown}
                placeholder={
                    filterMenuOpen
                        ? 'Filter by category...'
                        : activeConfig
                        ? `Search ${activeConfig.label.toLowerCase()}...`
                        : 'Search PostHog.com...'
                }
                spellCheck={false}
                autoComplete="off"
                role="combobox"
                aria-label="Search PostHog.com"
                aria-autocomplete="list"
                aria-expanded={Boolean(value || activeFilter || filterMenuOpen)}
                aria-controls={controlsId}
                aria-activedescendant={activeOptionId}
                className="p-0 w-full text-lg bg-primary border-0 outline-none text-primary placeholder:text-secondary focus:ring-0"
            />
            {!value && !filterMenuOpen ? (
                <KeyboardShortcut text="esc" size="xs" className="hidden shrink-0 @sm:inline" />
            ) : (
                <button
                    onClick={onToggleFilterMenu}
                    title="Filter by category (⌘F)"
                    aria-label="Filter by category"
                    aria-expanded={filterMenuOpen}
                    className={`-m-1 shrink-0 rounded-md p-1 ${
                        filterMenuOpen ? 'text-primary' : 'text-secondary hover:text-primary'
                    }`}
                >
                    <IconFilter className="size-5" />
                </button>
            )}
        </div>
    )
}
