import React, { useState, useEffect, useRef } from 'react'
import { useWindow } from '../../context/Window'
import { useApp } from '../../context/App'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, useRefinementList } from 'react-instantsearch-hooks-web'
import { useSearchBox, useHits } from 'react-instantsearch-hooks-web'
import { Combobox } from '@headlessui/react'
import { navigate } from 'gatsby'
import { IconFilter } from '@posthog/icons'
import { capitalizeFirstLetter } from '../../utils'
import { Hit } from 'instantsearch.js'

const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID as string,
    process.env.GATSBY_ALGOLIA_SEARCH_API_KEY as string
)

const Filters = ({ isRefinedClassName = 'bg-primary' }: { isRefinedClassName?: string }) => {
    const { refine, items } = useRefinementList({ attribute: 'type', sortBy: ['name:asc'] })
    return (
        <ul className="list-none m-0 p-0 flex space-x-2 mt-2 snap-x snap-mandatory overflow-x-auto">
            {items.map((item) => (
                <li className="snap-center" key={item.value}>
                    <button
                        data-scheme="secondary"
                        onClick={() => {
                            refine(item.value)
                        }}
                        className={`text-sm border border-primary rounded-md px-1 flex space-x-1 items-center ${item.isRefined ? isRefinedClassName : ''
                            }`}
                    >
                        <span className="text-sm">{capitalizeFirstLetter(item.label)}</span>{' '}
                        <span className="text-xs opacity-60 font-semibold">({item.count})</span>
                    </button>
                </li>
            ))}
        </ul>
    )
}

const Search = ({
    initialFilter,
    className = '',
    onChange,
    isRefinedClassName = 'bg-primary',
    hideFilters = false,
    autoFocus = true,
}: {
    initialFilter?: string
    className?: string
    onChange?: () => void
    isRefinedClassName?: string
    hideFilters?: boolean
    autoFocus?: boolean
}) => {
    const [query, setQuery] = useState('')
    const { dragControls } = useWindow()
    const { refine } = useSearchBox()
    const { hits } = useHits()
    const [showFilters, setShowFilters] = useState(!!initialFilter)
    const { refine: filterRefine } = useRefinementList({ attribute: 'type', sortBy: ['name:asc'] })

    const handleChange = (hit: Hit) => {
        if (!hit) return
        navigate(`/${hit.slug}`, { state: { newWindow: true } })
        onChange?.()
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
        <div className={`flex flex-col ${className}`} onMouseDown={(e) => dragControls.start(e)}>
            <Combobox value={null} onChange={handleChange} nullable>
                <div className="relative">
                    <div className="bg-white rounded-md border !border-primary overflow-hidden relative">
                        <Combobox.Input
                            className="w-full !border-none !text-lg !px-4 !py-2 "
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={`Search ${initialFilter && 'the ' + initialFilter}...`}
                            autoFocus={autoFocus}
                            value={query}
                        />
                        {!hideFilters && (
                            <button
                                className={`absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-100 transition-opacity ${showFilters ? 'opacity-100' : 'opacity-70'
                                    }`}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setShowFilters(!showFilters)
                                }}
                            >
                                <IconFilter className="size-4" />
                            </button>
                        )}
                    </div>
                    {!hideFilters && showFilters && <Filters isRefinedClassName={isRefinedClassName} />}

                    {hits.length > 0 && query && (
                        <Combobox.Options
                            static
                            hold
                            className="w-full mt-2 border border-primary rounded-md list-none m-0 p-0 overflow-auto z-10 max-h-60 h-full bg-white"
                        >
                            {hits.length === 0 && query !== '' ? (
                                <div className="py-2 px-4 text-secondary">No results found</div>
                            ) : (
                                hits.map((hit) => (
                                    <Combobox.Option key={hit.objectID} value={hit} as={React.Fragment}>
                                        {({ active }) => (
                                            <li
                                                data-scheme="secondary"
                                                className={`cursor-pointer ${active ? 'bg-primary' : ''}`}
                                            >
                                                <div className="py-2 px-4 block">
                                                    <h5 className="text-base m-0 font-bold line-clamp-1">
                                                        {hit.title}
                                                    </h5>
                                                    <p className="text-sm m-0 my-1">{hit.excerpt}</p>
                                                    <p className="text-sm opacity-60 font-semibold m-0">/{hit.slug}</p>
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

    const onChange = () => {
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
                closeWindow(appWindow)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <InstantSearch
            searchClient={searchClient}
            indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME as string}
            stalledSearchDelay={750}
        >
            <div ref={ref}>
                <Search
                    initialFilter={initialFilter}
                    className="p-3 rounded-md bg-white max-w-screen-md border border-primary"
                    onChange={onChange}
                />
            </div>
        </InstantSearch>
    )
}

export const SearchUI = ({
    initialFilter,
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
