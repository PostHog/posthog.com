import React, { useState, useEffect, useRef } from 'react'
import { useWindow } from '../../context/Window'
import { useApp } from '../../context/App'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, useRefinementList } from 'react-instantsearch-hooks-web'
import { useSearchBox, useHits } from 'react-instantsearch-hooks-web'
import { Combobox } from '@headlessui/react'
import { navigate } from 'gatsby'
import { IconSparkles } from '@posthog/icons'
import { capitalizeFirstLetter } from '../../utils'
import { Hit } from 'instantsearch.js'
import OSButton from 'components/OSButton'
import Input from 'components/OSForm/input'

const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID as string,
    process.env.GATSBY_ALGOLIA_SEARCH_API_KEY as string
)

const Filters = ({ isRefinedClassName = 'bg-primary' }: { isRefinedClassName?: string }) => {
    const { websiteMode } = useApp()
    const { refine, items } = useRefinementList({ attribute: 'type', sortBy: ['name:asc'] })
    return (
        <ul
            className={`list-none m-0 p-0 flex space-x-2 snap-x snap-mandatory overflow-x-auto ${
                websiteMode ? 'mb-2 px-2 border-t border-primary pt-2' : 'mt-2'
            }`}
        >
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
    const [isFocused, setIsFocused] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const { openNewChat, websiteMode, setSearchOpen } = useApp()
    const { dragControls, appWindow } = useWindow()
    const { refine } = useSearchBox()
    const { hits } = useHits()
    const { refine: filterRefine } = useRefinementList({ attribute: 'type', sortBy: ['name:asc'] })

    const openChat = () => {
        if (query) {
            openNewChat({ path: `ask-max${websiteMode ? '' : `-${appWindow?.path}`}`, initialQuestion: query })
        }
    }

    const handleChange = (hit: Hit) => {
        if (!hit) return
        setSearchOpen(false)
        navigate(`${hit.fields?.slug || `/${hit.slug}`}`, { state: { newWindow: true } })
        onChange?.()
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
        refine(query)
    }, [query])

    useEffect(() => {
        if (initialFilter) {
            filterRefine(initialFilter)
        }
    }, [initialFilter])

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
                                className="font-semibold underline bg-accent disabled:bg-transparent border border-primary text-primary disabled:border-transparent"
                            >
                                Ask AI
                            </OSButton>
                        </div>
                    </div>
                    {!hideFilters && hits.length > 0 && query && (!websiteMode || isFocused) && (
                        <Filters isRefinedClassName={isRefinedClassName} />
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

export const WindowSearchUI = ({ initialFilter }: { initialFilter?: string }) => {
    const { setWindowTitle, closeWindow } = useApp()
    const { appWindow } = useWindow()
    const ref = useRef<HTMLDivElement>(null)

    const close = () => {
        if (appWindow) {
            closeWindow(appWindow)
        }
    }

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'Search')
        }
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node) && appWindow) {
                close()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [closeWindow])

    return (
        <InstantSearch
            searchClient={searchClient}
            indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME as string}
            stalledSearchDelay={750}
        >
            <div ref={ref}>
                <Search
                    initialFilter={initialFilter}
                    className="cursor-grab active:cursor-grabbing p-2 rounded bg-white/25 backdrop-blur shadow-2xl border border-primary"
                    onChange={close}
                    onEscape={close}
                />
            </div>
        </InstantSearch>
    )
}

export const SearchUI = ({
    initialFilter = '',
    className = '',
    isRefinedClassName = 'bg-primary',
    hideFilters = false,
    autoFocus = true,
}: {
    initialFilter?: string
    className?: string
    isRefinedClassName?: string
    hideFilters?: boolean
    autoFocus?: boolean
}) => {
    return (
        <InstantSearch
            searchClient={searchClient}
            indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME as string}
            stalledSearchDelay={750}
        >
            <Search
                initialFilter={initialFilter}
                className={className}
                isRefinedClassName={isRefinedClassName}
                hideFilters={hideFilters}
                autoFocus={autoFocus}
            />
        </InstantSearch>
    )
}
