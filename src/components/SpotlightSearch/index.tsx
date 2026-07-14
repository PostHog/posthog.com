import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Dialog as RadixDialog } from 'radix-ui'
import { navigate } from 'gatsby'
import { InstantSearch, useConfigure, useHits, useInstantSearch, useSearchBox } from 'react-instantsearch-hooks-web'
import usePostHog from 'hooks/usePostHog'
import { algoliaIndexName, algoliaSearchClient } from 'lib/algoliaSearch'
import { useApp } from '../../context/App'
import { useSpotlightActions } from './actions'
import type { SpotlightAction } from './actions'
import { configForType, filterOptions, matchCategory } from './categories'
import FilterMenu from './FilterMenu'
import ResultList from './ResultList'
import SearchFooter from './SearchFooter'
import SearchInput from './SearchInput'
import { spotlightOptionId } from './SpotlightRow'
import SuggestionList from './SuggestionList'
import type { AlgoliaRecord, NavItem, SpotlightSearchResult, SuggestionItem } from './types'

// Actions only make sense for short trigger-word queries ("dark mode",
// "wallpaper") — long or question-shaped queries never surface them
const matchActions = (query: string, actions: SpotlightAction[]): SpotlightAction[] => {
    const q = query.trim().toLowerCase()
    const wordCount = q.split(/\s+/).filter(Boolean).length
    if (q.length < 3 || wordCount > 3) return []
    return actions
        .filter((action) =>
            action.keywords.some(
                (keyword) => keyword.startsWith(q) || (q.length >= 4 && keyword.includes(q)) || q.includes(keyword)
            )
        )
        .slice(0, 2)
}

// Note: this component uses text-secondary where opaque surfaces would use
// text-muted — dark mode's muted (rgb(98 102 116)) was tuned for the solid
// window background and vanishes against the translucent glass panel.
function SpotlightSearchContent({
    open,
    onClose,
    initialFilter,
}: {
    open: boolean
    onClose: () => void
    initialFilter?: string
}): JSX.Element {
    const { openNewChat } = useApp()
    const posthog = usePostHog()
    const [query, setQuery] = useState('')
    const [activeFilter, setActiveFilter] = useState<string | null>(null)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [filterMenuOpen, setFilterMenuOpen] = useState(false)
    const [filterMenuIndex, setFilterMenuIndex] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)
    const itemRefs = useRef<(HTMLLIElement | null)[]>([])
    const filterMenuItemRefs = useRef<(HTMLLIElement | null)[]>([])
    // The search query is parked here while the filter picker is open (the
    // input is repurposed for typing against category names) and restored on exit
    const savedQueryRef = useRef('')

    // Measured height of the expanding section's content — the wrapper below
    // animates to it, so expand/collapse and content-size changes (skeletons →
    // results, picker open, result counts) slide instead of jumping
    const [contentHeight, setContentHeight] = useState(0)
    const contentObserverRef = useRef<ResizeObserver | null>(null)
    const measureContent = useCallback((el: HTMLDivElement | null) => {
        contentObserverRef.current?.disconnect()
        contentObserverRef.current = null
        if (el) {
            setContentHeight(el.offsetHeight)
            const observer = new ResizeObserver(() => setContentHeight(el.offsetHeight))
            observer.observe(el)
            contentObserverRef.current = observer
        }
    }, [])

    const trimmedQuery = query.trim()
    const queryWordCount = trimmedQuery.split(/\s+/).filter(Boolean).length
    const { refine } = useSearchBox()
    const { hits } = useHits<AlgoliaRecord>()
    const { status } = useInstantSearch()
    const loading = status === 'loading' || status === 'stalled'
    useConfigure({ facetFilters: activeFilter ? [`type:${activeFilter}`] : [] })
    const results = useMemo(
        () =>
            hits.map((hit) => ({
                excerpt: hit.excerpt || '',
                title: hit.title,
                type: hit.type,
                url: hit.fields?.slug || `/${hit.slug}`,
            })),
        [hits]
    )

    // The filter picker borrows the input for filtering category names, so
    // suspend the real search until the saved query is restored.
    useEffect(() => {
        refine(filterMenuOpen ? '' : query)
    }, [filterMenuOpen, query, refine])

    const actions = useSpotlightActions()
    const matchedActions = matchActions(query, actions)

    const suggestedFilter = useMemo(() => (activeFilter ? null : matchCategory(query)), [query, activeFilter])

    // Type-to-filter for the picker: typed text narrows the category list by
    // label or alias match
    const visibleFilterOptions = useMemo(() => {
        const q = trimmedQuery.toLowerCase()
        if (!filterMenuOpen || !q) return filterOptions
        return filterOptions.filter((type) =>
            type
                ? configForType(type).label.toLowerCase().includes(q) ||
                  configForType(type).aliases.some((alias) => alias.includes(q))
                : 'all categories'.includes(q)
        )
    }, [filterMenuOpen, trimmedQuery])

    // Group by category while preserving Algolia's ranked order. A category's
    // first hit determines where that category appears.
    const groups = useMemo(() => {
        const byType = new Map<string, SpotlightSearchResult[]>()
        for (const result of results) {
            const group = byType.get(result.type)
            if (group) {
                group.push(result)
            } else {
                byType.set(result.type, [result])
            }
        }
        return Array.from(byType.entries()).map(([type, items]) => {
            // Cap per-category rows when browsing all categories; a filter shows everything
            return { type, results: activeFilter ? items : items.slice(0, 5) }
        })
    }, [results, activeFilter])

    const hasResults = groups.length > 0

    // 4+ word queries read like questions, and zero-result queries have nowhere
    // else to go — both offer Ask AI as the top result
    const suggestAskAI = queryWordCount >= 4 || (queryWordCount > 0 && !loading && !hasResults)

    // Flat list in rendered order (suggestion rows first), for keyboard
    // navigation: actions → ask AI → filter → results
    const navItems: NavItem[] = [
        ...matchedActions.map((action) => ({ kind: 'action' as const, action })),
        ...(suggestAskAI ? [{ kind: 'ask-ai' as const }] : []),
        ...(suggestedFilter ? [{ kind: 'filter' as const, type: suggestedFilter }] : []),
        ...(loading
            ? []
            : groups.flatMap((group) => group.results.map((result) => ({ kind: 'result' as const, result })))),
    ]

    const suggestionRows = navItems.filter((item): item is SuggestionItem => item.kind !== 'result')

    const close = () => {
        setQuery('')
        setActiveFilter(null)
        setFilterMenuOpen(false)
        onClose()
    }

    const openResult = (result: SpotlightSearchResult) => {
        posthog?.capture('web search result clicked', {
            title: result.title,
            slug: result.url.slice(1),
            category: activeFilter || 'all',
            query,
            type: result.type,
        })
        close()
        navigate(result.url, { state: { newWindow: true } })
    }

    const applyFilter = (type: string, { keepQuery = false }: { keepQuery?: boolean } = {}) => {
        setActiveFilter(type)
        if (!keepQuery) {
            setQuery('')
        }
        inputRef.current?.focus()
    }

    const removeFilter = () => {
        setActiveFilter(null)
        inputRef.current?.focus()
    }

    const openFilterMenu = () => {
        // Park the search query: the input becomes a type-to-filter box for
        // category names until the picker closes
        savedQueryRef.current = query
        setQuery('')
        setFilterMenuIndex(activeFilter ? filterOptions.indexOf(activeFilter) : 0)
        setFilterMenuOpen(true)
        inputRef.current?.focus()
    }

    const closeFilterMenu = () => {
        setFilterMenuOpen(false)
        setQuery(savedQueryRef.current)
        inputRef.current?.focus()
    }

    const selectFilterOption = (type: string | null) => {
        setFilterMenuOpen(false)
        setQuery(savedQueryRef.current)
        setActiveFilter(type)
        inputRef.current?.focus()
    }

    const askAI = () => {
        if (!query) return
        openNewChat({ path: 'ask-max', initialQuestion: query })
        close()
    }

    const runAction = (action: SpotlightAction) => {
        posthog?.capture('spotlight action used', { action: action.id, query })
        action.perform()
        if (action.keepOpen) {
            inputRef.current?.focus()
        } else {
            close()
        }
    }

    const selectItem = (item: NavItem) => {
        if (item.kind === 'action') {
            runAction(item.action)
        } else if (item.kind === 'ask-ai') {
            askAI()
        } else if (item.kind === 'filter') {
            applyFilter(item.type)
        } else {
            openResult(item.result)
        }
    }

    useEffect(() => {
        if (open) {
            setActiveFilter(initialFilter ?? null)
            setFilterMenuOpen(false)
        }
    }, [open, initialFilter])

    useEffect(() => {
        setSelectedIndex(0)
    }, [query, activeFilter])

    useEffect(() => {
        itemRefs.current[selectedIndex]?.scrollIntoView({ block: 'nearest' })
    }, [selectedIndex])

    useEffect(() => {
        if (filterMenuOpen) {
            filterMenuItemRefs.current[filterMenuIndex]?.scrollIntoView({ block: 'nearest' })
        }
    }, [filterMenuOpen, filterMenuIndex])

    useEffect(() => {
        if (!open) return
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault()
                if (filterMenuOpen) {
                    closeFilterMenu()
                } else if (query) {
                    setQuery('')
                } else if (activeFilter) {
                    setActiveFilter(null)
                } else {
                    close()
                }
            }
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                close()
            }
            // ⌘F/Ctrl+F toggles the category filter picker (find-in-page is
            // useless while the overlay is up anyway)
            if (e.key === 'f' && (e.metaKey || e.ctrlKey) && !e.shiftKey && !e.altKey) {
                e.preventDefault()
                filterMenuOpen ? closeFilterMenu() : openFilterMenu()
            }
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [open, query, activeFilter, filterMenuOpen])

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // While the filter picker is open the input keeps focus, but arrows and
        // enter drive the picker instead of the result list
        if (filterMenuOpen) {
            if (e.key === 'ArrowDown') {
                e.preventDefault()
                setFilterMenuIndex((index) =>
                    visibleFilterOptions.length ? (index + 1) % visibleFilterOptions.length : 0
                )
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault()
                setFilterMenuIndex((index) =>
                    visibleFilterOptions.length
                        ? (index - 1 + visibleFilterOptions.length) % visibleFilterOptions.length
                        : 0
                )
            }
            if (e.key === 'Enter') {
                e.preventDefault()
                if (filterMenuIndex < visibleFilterOptions.length) {
                    selectFilterOption(visibleFilterOptions[filterMenuIndex])
                }
            }
            // Backspace on empty filter text backs out of the picker — and out
            // of the active filter too, if there is one — returning to search
            if (e.key === 'Backspace' && !query) {
                e.preventDefault()
                setActiveFilter(null)
                closeFilterMenu()
            }
            return
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setSelectedIndex((index) => (navItems.length ? (index + 1) % navItems.length : 0))
        }
        if (e.key === 'ArrowUp') {
            e.preventDefault()
            setSelectedIndex((index) => (navItems.length ? (index - 1 + navItems.length) % navItems.length : 0))
        }
        if (e.key === 'Enter') {
            e.preventDefault()
            if (e.shiftKey) {
                askAI()
            } else if (navItems[selectedIndex]) {
                selectItem(navItems[selectedIndex])
            }
        }
        if (e.key === 'Backspace' && activeFilter) {
            const input = e.currentTarget
            if (input.selectionStart === 0 && input.selectionEnd === 0) {
                e.preventDefault()
                removeFilter()
            }
        }
    }

    const expanded = Boolean(query || activeFilter || filterMenuOpen)
    const resultIndexOffset = suggestionRows.length

    return (
        <RadixDialog.Root open={open} onOpenChange={(nextOpen) => !nextOpen && close()}>
            <RadixDialog.Portal forceMount>
                <AnimatePresence>
                    {open && (
                        <RadixDialog.Content
                            asChild
                            aria-describedby={undefined}
                            onEscapeKeyDown={(event) => event.preventDefault()}
                            onOpenAutoFocus={(event) => {
                                event.preventDefault()
                                inputRef.current?.focus()
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.1 }}
                                className="fixed inset-0 z-[999998] flex justify-center px-4 pt-[18vh]"
                                onMouseDown={close}
                            >
                                <motion.div
                                    data-scheme="primary"
                                    initial={{ scale: 0.97, y: -8 }}
                                    animate={{ scale: 1, y: 0 }}
                                    exit={{ scale: 0.97, y: -8 }}
                                    transition={{ duration: 0.12, ease: [0.2, 0.2, 0.8, 1] }}
                                    className="@container flex h-fit w-full max-w-[680px] flex-col overflow-hidden rounded-2xl border border-primary bg-primary/60 shadow-2xl ring-1 ring-inset ring-border/10 backdrop-blur-2xl"
                                    onMouseDown={(e) => e.stopPropagation()}
                                >
                                    <RadixDialog.Title className="sr-only">Search PostHog.com</RadixDialog.Title>
                                    <SearchInput
                                        inputRef={inputRef}
                                        loading={loading}
                                        query={query}
                                        activeFilter={activeFilter}
                                        filterMenuOpen={filterMenuOpen}
                                        onQueryChange={(nextQuery) => {
                                            setQuery(nextQuery)
                                            if (filterMenuOpen) {
                                                // Typing narrows the picker; keep the selection on the first match
                                                setFilterMenuIndex(0)
                                            }
                                        }}
                                        onKeyDown={handleInputKeyDown}
                                        onRemoveFilter={removeFilter}
                                        onToggleFilterMenu={() =>
                                            filterMenuOpen ? closeFilterMenu() : openFilterMenu()
                                        }
                                        activeOptionId={
                                            expanded
                                                ? filterMenuOpen
                                                    ? visibleFilterOptions.length
                                                        ? spotlightOptionId('filter', filterMenuIndex)
                                                        : undefined
                                                    : navItems[selectedIndex]
                                                    ? spotlightOptionId('result', selectedIndex)
                                                    : undefined
                                                : undefined
                                        }
                                        controlsId={
                                            filterMenuOpen ? 'spotlight-filter-options' : 'spotlight-search-options'
                                        }
                                    />

                                    <AnimatePresence initial={false}>
                                        {expanded && (
                                            <motion.div
                                                key="panel"
                                                initial={{ height: 0 }}
                                                animate={{ height: contentHeight }}
                                                exit={{ height: 0 }}
                                                transition={{ duration: 0.18, ease: [0.2, 0.2, 0.8, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <div ref={measureContent}>
                                                    <div
                                                        id={
                                                            filterMenuOpen
                                                                ? 'spotlight-filter-options'
                                                                : 'spotlight-search-options'
                                                        }
                                                        role="listbox"
                                                        aria-label={
                                                            filterMenuOpen ? 'Search categories' : 'Search results'
                                                        }
                                                        className="max-h-[min(480px,50vh)] overflow-y-auto border-t border-primary p-2"
                                                    >
                                                        {filterMenuOpen ? (
                                                            <FilterMenu
                                                                options={visibleFilterOptions}
                                                                activeFilter={activeFilter}
                                                                selectedIndex={filterMenuIndex}
                                                                itemRefs={filterMenuItemRefs}
                                                                onSelectIndex={setFilterMenuIndex}
                                                                onSelect={selectFilterOption}
                                                            />
                                                        ) : (
                                                            <>
                                                                <SuggestionList
                                                                    items={suggestionRows}
                                                                    query={query}
                                                                    selectedIndex={selectedIndex}
                                                                    itemRefs={itemRefs}
                                                                    onSelectIndex={setSelectedIndex}
                                                                    onRunAction={runAction}
                                                                    onAskAI={askAI}
                                                                    onApplyFilter={applyFilter}
                                                                />
                                                                <ResultList
                                                                    loading={loading}
                                                                    query={query}
                                                                    groups={groups}
                                                                    activeFilter={activeFilter}
                                                                    selectedIndex={selectedIndex}
                                                                    indexOffset={resultIndexOffset}
                                                                    itemRefs={itemRefs}
                                                                    onSelectIndex={setSelectedIndex}
                                                                    onApplyFilter={applyFilter}
                                                                    onOpenResult={openResult}
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                    <SearchFooter
                                                        filterMenuOpen={filterMenuOpen}
                                                        activeFilter={activeFilter}
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </motion.div>
                        </RadixDialog.Content>
                    )}
                </AnimatePresence>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    )
}

export default function SpotlightSearch(props: {
    open: boolean
    onClose: () => void
    initialFilter?: string
}): JSX.Element {
    return (
        <InstantSearch searchClient={algoliaSearchClient} indexName={algoliaIndexName} stalledSearchDelay={750}>
            <SpotlightSearchContent {...props} />
        </InstantSearch>
    )
}
