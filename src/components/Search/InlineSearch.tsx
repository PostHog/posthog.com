import React, { useState, useEffect, useCallback, useRef } from 'react'
import { IconSearch, IconX } from '@posthog/icons'
import OSButton from 'components/OSButton'
import Link from 'components/Link'
import { useSearch } from 'components/Editor/SearchProvider'
import Mark from 'mark.js'
import debounce from 'lodash/debounce'
import { algoliaIndexName, algoliaSearchClient } from 'lib/algoliaSearch'

export const InlineSearch = ({
    contentRef,
    onSearch,
    placeholder = 'Search this page...',
    className,
    clearable = true,
    autoFocus = false,
    icon = true,
}: {
    contentRef?: React.RefObject<HTMLElement>
    onSearch?: (search: string) => void
    placeholder?: string
    className?: string
    clearable?: boolean
    autoFocus?: boolean
    icon?: boolean
}) => {
    const { searchQuery, setSearchQuery } = useSearch()
    const [inputValue, setInputValue] = useState(searchQuery)
    const markedRef = useRef<any>(null)

    useEffect(() => {
        setInputValue(searchQuery)
    }, [searchQuery])

    useEffect(() => {
        if (!contentRef?.current) return
        if (!markedRef.current) {
            markedRef.current = new Mark(contentRef.current)
        }
        markedRef.current.unmark()
        if (inputValue) {
            markedRef.current.mark(inputValue, { separateWordSearch: false })
        }
    }, [inputValue])

    useEffect(() => {
        return () => {
            markedRef.current?.unmark()
            markedRef.current = null
        }
    }, [])

    const debouncedSetSearchQuery = useCallback(
        debounce((value: string) => {
            setSearchQuery(value)
        }, 200),
        []
    )

    useEffect(() => {
        debouncedSetSearchQuery(inputValue)
    }, [inputValue, debouncedSetSearchQuery])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setInputValue(value)
        onSearch?.(value)
    }

    const handleClear = () => {
        onSearch?.('')
        setSearchQuery('')
        setInputValue('')
    }

    return (
        <div className={`flex items-center gap-1 ${className || ''}`}>
            <div className="relative flex-1 min-w-0">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-secondary inline-flex">
                    {icon && <IconSearch className="size-4" />}
                </span>
                <input
                    type="text"
                    placeholder={placeholder}
                    className={`w-full pr-2 py-1 rounded border-input border-input text-primary text-sm bg-light dark:bg-dark focus:outline-none focus:ring-0 focus:border-primary ${
                        icon ? 'pl-7' : ''
                    }`}
                    value={inputValue}
                    onChange={handleInputChange}
                    autoFocus={autoFocus}
                />
            </div>
            {clearable && inputValue && (
                <OSButton
                    size="xs"
                    icon={<IconX />}
                    onClick={(event) => {
                        handleClear()
                        event.currentTarget.blur()
                    }}
                    className="rounded-full !p-1.5"
                    data-sidebar-label
                />
            )}
        </div>
    )
}

export const AlgoliaSearchResults = ({
    currentPath,
    facetFilters,
}: {
    currentPath?: string
    facetFilters?: string | string[] | string[][]
}) => {
    const { searchQuery } = useSearch()
    const [hits, setHits] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!searchQuery || searchQuery.length < 2) {
            setHits([])
            setLoading(false)
            return
        }

        let cancelled = false
        setLoading(true)

        const doSearch = async () => {
            try {
                const index = algoliaSearchClient.initIndex(algoliaIndexName)
                const { hits } = await index.search(searchQuery, {
                    hitsPerPage: 8,
                    ...(facetFilters ? { facetFilters } : {}),
                })
                if (!cancelled) {
                    const filtered = currentPath
                        ? hits.filter((h: any) => {
                              const slug = h.fields?.slug || `/${h.slug}`
                              return slug !== currentPath
                          })
                        : hits
                    setHits(filtered)
                    setLoading(false)
                }
            } catch (err) {
                console.error('[AlgoliaSearchResults]', err)
                if (!cancelled) setLoading(false)
            }
        }

        doSearch()
        return () => {
            cancelled = true
        }
    }, [searchQuery, currentPath, facetFilters])

    if (!searchQuery || searchQuery.length < 2) return null

    return (
        <div className="text-sm" data-sidebar-label>
            {loading ? (
                <div className="px-2 py-3 space-y-2">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="space-y-1">
                            <div className="h-3.5 bg-accent rounded animate-pulse w-3/4" />
                            <div className="h-3 bg-accent rounded animate-pulse w-1/2" />
                        </div>
                    ))}
                </div>
            ) : hits.length > 0 ? (
                <ul className="list-none m-0 p-0">
                    {hits.map((hit: any) => (
                        <li key={hit.objectID}>
                            <Link
                                to={hit.fields?.slug || `/${hit.slug}`}
                                state={{ newWindow: true }}
                                className="block px-2 py-1.5 rounded hover:bg-accent transition-colors group"
                            >
                                <span className="block text-[13px] font-medium text-primary truncate">{hit.title}</span>
                                <span className="block text-[11px] text-muted truncate">
                                    posthog.com{hit.fields?.slug || `/${hit.slug}`}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="px-2 py-1 text-xs text-muted m-0">No results</p>
            )}
        </div>
    )
}
