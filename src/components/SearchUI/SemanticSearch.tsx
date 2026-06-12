import React, { useState, useEffect, useRef } from 'react'
import { useWindow } from '../../context/Window'
import { useApp } from '../../context/App'
import { Combobox } from '@headlessui/react'
import { navigate } from 'gatsby'
import { IconSparkles } from '@posthog/icons'
import { capitalizeFirstLetter } from '../../utils'
import OSButton from 'components/OSButton'
import Input from 'components/OSForm/input'
import { SemanticSearchResult } from 'components/Search/useInkeepSearch'
import { useHybridSearch } from 'components/Search/useHybridSearch'

const resultURL = (result: SemanticSearchResult) => result.url + (result.fragment ? `#${result.fragment}` : '')

/**
 * Hybrid (Algolia + Inkeep RAG) twin of the Algolia-only `Search` component in
 * index.tsx. Same UI and behaviors; data comes from useHybridSearch (instant
 * Algolia results, reranked when semantic results arrive) and type filters are
 * computed client-side. index.tsx picks between the two based on the
 * useSearchMode preference — when one engine wins, the loser gets deleted.
 */
const SemanticSearch = ({
    initialFilter = '',
    className = '',
    onChange,
    isRefinedClassName = 'bg-primary',
    hideFilters = false,
    autoFocus = true,
    onEscape,
}: {
    initialFilter?: string
    className?: string
    onChange?: () => void
    isRefinedClassName?: string
    hideFilters?: boolean
    autoFocus?: boolean
    onEscape?: () => void
}): JSX.Element => {
    const [query, setQuery] = useState('')
    const [filter, setFilter] = useState(initialFilter)
    const [isFocused, setIsFocused] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const { openNewChat, websiteMode, setSearchOpen } = useApp()
    const { dragControls, appWindow } = useWindow()
    const { results, loading } = useHybridSearch(query)

    const countByType: Record<string, number> = {}
    results.forEach((result) => {
        countByType[result.type] = (countByType[result.type] || 0) + 1
    })
    const filterItems = Object.keys(countByType).sort()
    const hits = filter ? results.filter((result) => result.type === filter) : results

    const openChat = () => {
        if (query) {
            openNewChat({ path: `ask-max${websiteMode ? '' : `-${appWindow?.path}`}`, initialQuestion: query })
        }
    }

    const handleChange = (result: SemanticSearchResult) => {
        if (!result) return
        setSearchOpen(false)
        onChange?.()
        setTimeout(() => {
            navigate(resultURL(result), { state: { newWindow: true } })
        }, 0)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault()
            e.stopPropagation()
            openChat()
        }
        if (e.key === 'Escape') {
            if (query === '') {
                // If input is empty, close the search
                onEscape?.()
            } else {
                // If input has text, clear it
                setQuery('')
            }
        }
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (websiteMode) return
        dragControls?.start(e)
    }

    useEffect(() => {
        if (!websiteMode) return
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsFocused(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [websiteMode])

    return (
        <div
            ref={containerRef}
            onFocus={() => setIsFocused(true)}
            className={`flex flex-col ${className}`}
            onMouseDown={handleMouseDown}
        >
            <Combobox value={null} onChange={handleChange} nullable>
                <div className="relative">
                    <div
                        className={`bg-accent !border-primary overflow-hidden relative ${
                            websiteMode ? '' : 'border rounded'
                        }`}
                    >
                        <Combobox.Input
                            as={Input}
                            label=""
                            showLabel={false}
                            className={`w-full text-primary border-0 bg-transparent focus:ring-0 ${
                                websiteMode ? 'rounded-none' : ''
                            }`}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={`Search ${initialFilter ? 'the ' + initialFilter : 'PostHog.com'}...`}
                            autoFocus={autoFocus}
                            value={query}
                            containerClassName="m-0"
                        />

                        <div data-scheme="primary" className="absolute right-1 top-1/2 -translate-y-1/2">
                            <OSButton
                                disabled={!query}
                                size="md"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    openChat()
                                    setSearchOpen(false)
                                }}
                                icon={<IconSparkles />}
                                hover="border"
                                className="font-semibold underline border bg-accent disabled:bg-transparent border-primary text-primary disabled:border-transparent"
                            >
                                Ask AI
                            </OSButton>
                        </div>
                    </div>
                    {!hideFilters && hits.length > 0 && query && (!websiteMode || isFocused) && (
                        <ul
                            className={`list-none m-0 p-0 flex space-x-2 snap-x snap-mandatory overflow-x-auto ${
                                websiteMode ? 'px-2 pt-2 mb-2 border-t border-primary' : 'mt-2'
                            }`}
                        >
                            {filterItems.map((type) => (
                                <li className="snap-center" key={type}>
                                    <button
                                        data-scheme="secondary"
                                        onClick={() => {
                                            setFilter((current) => (current === type ? '' : type))
                                        }}
                                        className={`text-sm text-primary border border-primary rounded px-1 flex space-x-1 items-center whitespace-nowrap ${
                                            filter === type ? isRefinedClassName : ''
                                        }`}
                                    >
                                        <span className="text-sm">
                                            {capitalizeFirstLetter(type.replace(/-/g, ' '))}
                                        </span>{' '}
                                        <span className="text-xs font-semibold opacity-60">({countByType[type]})</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}

                    {loading && query && (!websiteMode || isFocused) && (
                        <div
                            className={`w-full border-primary z-10 bg-primary shadow-2xl py-2 px-4 text-secondary ${
                                websiteMode ? 'border-t' : 'mt-2 rounded-md border'
                            }`}
                        >
                            Searching…
                        </div>
                    )}

                    {hits.length > 0 && query && (!websiteMode || isFocused) && (
                        <Combobox.Options
                            static
                            hold
                            className={`w-full border-primary list-none m-0 p-0 overflow-auto z-10 max-h-[calc(80vh_-_100px)] h-full bg-primary shadow-2xl ${
                                websiteMode ? 'border-t' : 'mt-2 rounded-md border'
                            }`}
                            onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                            {hits.map((result) => (
                                <Combobox.Option key={resultURL(result)} value={result} as={React.Fragment}>
                                    {({ active }) => (
                                        <li
                                            data-scheme="secondary"
                                            className={`cursor-pointer text-primary ${
                                                active ? 'bg-accent' : 'bg-primary'
                                            }`}
                                        >
                                            <div className="block px-4 py-2">
                                                <p className="text-[13px] text-red dark:text-yellow font-medium m-0">
                                                    {result.url}
                                                </p>
                                                <h5 className="text-[15px] m-0 font-bold line-clamp-1">
                                                    {result.title}
                                                </h5>
                                                <p className="m-0 my-1 text-sm text-secondary">{result.excerpt}</p>
                                            </div>
                                        </li>
                                    )}
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>
                    )}
                </div>
            </Combobox>
        </div>
    )
}

export default SemanticSearch
