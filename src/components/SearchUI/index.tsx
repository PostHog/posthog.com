import React, { useState, useEffect, useRef } from 'react'
import { useWindow } from '../../context/Window'
import { useApp } from '../../context/App'
import { InstantSearch, useRefinementList } from 'react-instantsearch-hooks-web'
import { useSearchBox, useHits } from 'react-instantsearch-hooks-web'
import { Combobox } from '@headlessui/react'
import { navigate } from 'gatsby'
import { IconSparkles } from '@posthog/icons'
import { capitalizeFirstLetter } from '../../utils'
import { Hit } from 'instantsearch.js'
import OSButton from 'components/OSButton'
import Input from 'components/OSForm/input'
import SpotlightSearch from 'components/SpotlightSearch'
import { algoliaIndexName, algoliaSearchClient } from 'lib/algoliaSearch'

const Filters = ({ isRefinedClassName = 'bg-primary' }: { isRefinedClassName?: string }) => {
    const { refine, items } = useRefinementList({ attribute: 'type', sortBy: ['name:asc'] })
    return (
        <ul className="list-none m-0 p-0 flex space-x-2 snap-x snap-mandatory overflow-x-auto mt-2">
            {items.map((item) => (
                <li className="snap-center" key={item.value}>
                    <button
                        data-scheme="secondary"
                        onClick={() => {
                            refine(item.value)
                        }}
                        className={`text-sm text-primary border border-primary rounded px-1 flex space-x-1 items-center whitespace-nowrap ${
                            item.isRefined ? isRefinedClassName : ''
                        }`}
                    >
                        <span className="text-sm">{capitalizeFirstLetter(item.label.replace(/-/g, ' '))}</span>{' '}
                        <span className="text-xs opacity-60 font-semibold">({item.count})</span>
                    </button>
                </li>
            ))}
        </ul>
    )
}

const Search = ({
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
}) => {
    const [query, setQuery] = useState('')
    const containerRef = useRef<HTMLDivElement>(null)
    const { openNewChat, setSearchOpen } = useApp()
    const { dragControls, appWindow } = useWindow()
    const { refine } = useSearchBox()
    const { hits } = useHits()
    const { refine: filterRefine } = useRefinementList({ attribute: 'type', sortBy: ['name:asc'] })

    const openChat = () => {
        if (query) {
            openNewChat({ path: `ask-max-${appWindow?.path}`, initialQuestion: query })
        }
    }

    const handleChange = (hit: Hit) => {
        if (!hit) return
        setSearchOpen(false)
        onChange?.()
        setTimeout(() => {
            navigate(`${hit.fields?.slug || `/${hit.slug}`}`, { state: { newWindow: true } })
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
        dragControls?.start(e)
    }

    useEffect(() => {
        refine(query)
    }, [query])

    useEffect(() => {
        if (initialFilter) {
            filterRefine(initialFilter)
        }
    }, [initialFilter])

    return (
        <div ref={containerRef} className={`flex flex-col ${className}`} onMouseDown={handleMouseDown}>
            <Combobox value={null} onChange={handleChange} nullable>
                <div className="relative">
                    <div className="relative">
                        <Combobox.Input
                            as={Input}
                            label=""
                            showLabel={false}
                            className="w-full text-primary border border-primary bg-transparent focus:ring-0"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={`Search ${initialFilter ? 'the ' + initialFilter : 'PostHog.com'}...`}
                            autoFocus={autoFocus}
                            value={query}
                            containerClassName="m-0"
                        />

                        <div
                            data-scheme="primary"
                            className="absolute right-1 top-1/2 -translate-y-1/2"
                            onMouseDown={(e) => e.stopPropagation()}
                        >
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
                                className="font-semibold underline bg-accent disabled:bg-transparent border border-primary text-primary disabled:border-transparent"
                            >
                                Ask AI
                            </OSButton>
                        </div>
                    </div>
                    {!hideFilters && hits.length > 0 && query && <Filters isRefinedClassName={isRefinedClassName} />}

                    {hits.length > 0 && query && (
                        <Combobox.Options
                            static
                            hold
                            className="w-full border-primary list-none m-0 p-0 overflow-auto z-10 max-h-[calc(80vh_-_100px)] h-full bg-primary shadow-2xl mt-2 rounded-md border"
                            onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                            {hits.length === 0 && query !== '' ? (
                                <div className="py-2 px-4 text-secondary">No results found</div>
                            ) : (
                                hits.map((hit) => (
                                    <Combobox.Option key={hit.objectID} value={hit} as={React.Fragment}>
                                        {({ active }) => (
                                            <li
                                                data-scheme="secondary"
                                                className={`cursor-pointer text-primary ${
                                                    active ? 'bg-accent' : 'bg-primary'
                                                }`}
                                            >
                                                <div className="py-2 px-4 block">
                                                    <p className="text-[13px] text-red dark:text-yellow font-medium m-0">
                                                        {hit.fields?.slug || `/${hit.slug}`}
                                                    </p>
                                                    <h5 className="text-[15px] m-0 font-bold line-clamp-1">
                                                        {hit.title}
                                                    </h5>
                                                    <p className="text-sm text-secondary m-0 my-1">{hit.excerpt}</p>
                                                </div>
                                            </li>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    )}
                </div>
            </Combobox>
        </div>
    )
}

export const SearchUI = ({
    initialFilter = '',
    className = '',
    isRefinedClassName = 'bg-primary',
    hideFilters = false,
    autoFocus = true,
    onChange,
    onEscape,
}: {
    initialFilter?: string
    className?: string
    isRefinedClassName?: string
    hideFilters?: boolean
    autoFocus?: boolean
    onChange?: () => void
    onEscape?: () => void
}) => {
    return (
        <InstantSearch searchClient={algoliaSearchClient} indexName={algoliaIndexName} stalledSearchDelay={750}>
            <Search
                initialFilter={initialFilter}
                className={className}
                isRefinedClassName={isRefinedClassName}
                hideFilters={hideFilters}
                autoFocus={autoFocus}
                onChange={onChange}
                onEscape={onEscape}
            />
        </InstantSearch>
    )
}

// Global search overlay. Rendered once (in the desktop wrapper) and toggled via
// the app-level `searchOpen` flag instead of being managed as a draggable window.
export const SearchOverlay = () => {
    const { searchOpen, setSearchOpen, searchInitialFilter } = useApp()

    const close = () => setSearchOpen(false)

    return <SpotlightSearch open={searchOpen} onClose={close} initialFilter={searchInitialFilter || undefined} />
}
