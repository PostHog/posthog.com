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
import OSButton from 'components/OSButton'
import Input from 'components/OSForm/input'

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
                        className={`text-sm border border-primary rounded-md px-1 flex space-x-1 items-center ${
                            item.isRefined ? isRefinedClassName : ''
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
                    <div className="bg-accent rounded border !border-primary overflow-hidden relative">
                        <Input
                            label=""
                            showLabel={false}
                            className="w-full text-primary border-0 bg-transparent focus:ring-0"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={`Search ${initialFilter ? 'the ' + initialFilter : 'PostHog.com'}...`}
                            autoFocus={autoFocus}
                            value={query}
                            containerClassName="m-0"
                        />
                        {!hideFilters && (
                            <div data-scheme="secondary" className="absolute right-1 top-1/2 -translate-y-1/2">
                                <OSButton
                                    size="md"
                                    className={` ${showFilters ? 'opacity-100' : 'opacity-70'}`}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setShowFilters(!showFilters)
                                    }}
                                    icon={<IconFilter />}
                                    hover="background"
                                />
                            </div>
                        )}
                    </div>
                    {!hideFilters && showFilters && <Filters isRefinedClassName={isRefinedClassName} />}

                    {hits.length > 0 && query && (
                        <Combobox.Options
                            static
                            hold
                            className="w-full mt-2 border border-primary rounded-md list-none m-0 p-0 overflow-auto z-10 max-h-[calc(80vh_-_100px)] h-full bg-primary shadow-2xl"
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
                                                        /{hit.slug}
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
                    className="cursor-grab active:cursor-grabbing p-2 rounded bg-white/25 backdrop-blur shadow-2xl max-w-screen-md border border-primary"
                    onChange={onChange}
                    onEscape={() => {
                        if (appWindow) {
                            closeWindow(appWindow)
                        }
                    }}
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
