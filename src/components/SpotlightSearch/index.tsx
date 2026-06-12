import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navigate } from 'gatsby'
import {
    IconApps,
    IconBook,
    IconBrackets,
    IconChat,
    IconCheck,
    IconCompass,
    IconCopy,
    IconFilter,
    IconGraduationCap,
    IconHeart,
    IconNewspaper,
    IconNotebook,
    IconPeople,
    IconPlug,
    IconPuzzle,
    IconSearch,
    IconSparkles,
    IconX,
} from '@posthog/icons'
import KeyboardShortcut from 'components/KeyboardShortcut'
import Spinner from 'components/Spinner'
import { useHybridSearch, HybridSearchResult } from 'components/Search/useHybridSearch'
import { useSearchMode } from 'components/Search/useSearchMode'
import { useSemanticSearchEnabled } from 'components/Search/useSemanticSearchEnabled'
import usePostHog from 'hooks/usePostHog'
import { capitalizeFirstLetter } from '../../utils'
import { useApp } from '../../context/App'
import { useSpotlightActions, SpotlightAction } from './actions'

// The typeForPath.ts taxonomy (shared by both search engines), with labels
// mirroring the categories export in components/Search/SearchResults.tsx
const typeConfig: Record<string, { label: string; icon: React.ReactNode }> = {
    product: { label: 'Products', icon: <IconApps /> },
    docs: { label: 'Docs', icon: <IconBook /> },
    api: { label: 'API', icon: <IconBrackets /> },
    pipelines: { label: 'Pipelines', icon: <IconPlug /> },
    apps: { label: 'Apps', icon: <IconPuzzle /> },
    tutorial: { label: 'Tutorials', icon: <IconGraduationCap /> },
    blog: { label: 'Blog', icon: <IconNewspaper /> },
    post: { label: 'Posts', icon: <IconNotebook /> },
    handbook: { label: 'Handbook', icon: <IconCompass /> },
    customers: { label: 'Customers', icon: <IconHeart /> },
    templates: { label: 'Templates', icon: <IconCopy /> },
    question: { label: 'Questions', icon: <IconChat /> },
    team: { label: 'Teams', icon: <IconPeople /> },
}

const typeOrder = Object.keys(typeConfig)

const configForType = (type: string): { label: string; icon: React.ReactNode } =>
    typeConfig[type] ?? { label: capitalizeFirstLetter(type), icon: <IconBook /> }

// Stand-in for semantic matching: each category's label plus words users are
// likely to type when they mean that category
const categoryAliases: Record<string, string[]> = {
    product: ['products', 'features', 'pricing'],
    docs: ['docs', 'documentation', 'reference', 'manual'],
    api: ['api'],
    pipelines: ['pipelines', 'cdp', 'destinations'],
    apps: ['apps'],
    tutorial: ['tutorials', 'guides', 'how-to', 'walkthrough'],
    blog: ['blog', 'articles', 'news'],
    post: ['posts'],
    handbook: ['handbook', 'company', 'culture'],
    customers: ['customers'],
    templates: ['templates'],
    question: ['questions', 'community', 'forum', 'answers'],
    team: ['teams', 'people'],
}

const matchCategory = (query: string): string | null => {
    const q = query.trim().toLowerCase()
    if (q.length < 3) return null
    for (const type of typeOrder) {
        if (categoryAliases[type]?.some((alias) => alias.startsWith(q) || (q.length >= 4 && alias.includes(q)))) {
            return type
        }
    }
    return null
}

const resultURL = (result: HybridSearchResult): string => result.url + (result.fragment ? `#${result.fragment}` : '')

// The filter picker's options: null is "All categories" (clears the filter)
const filterOptions: (string | null)[] = [null, ...typeOrder]

type NavItem =
    | { kind: 'action'; action: SpotlightAction }
    | { kind: 'ask-ai' }
    | { kind: 'filter'; type: string }
    | { kind: 'result'; result: HybridSearchResult }

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

const SkeletonRow = () => (
    <li aria-hidden className="flex items-center gap-3 rounded-lg px-2.5 py-2">
        <div className="rounded-md animate-pulse size-8 shrink-0 bg-border/50" />
        <div className="min-w-0 flex-1 space-y-1.5">
            <div className="h-3.5 w-1/3 animate-pulse rounded bg-border/50" />
            <div className="w-2/3 h-3 rounded animate-pulse bg-border/50" />
        </div>
    </li>
)

// Note: this component uses text-secondary where opaque surfaces would use
// text-muted — dark mode's muted (rgb(98 102 116)) was tuned for the solid
// window background and vanishes against the translucent glass panel.
export default function SpotlightSearch({
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

    const semanticEnabled = useSemanticSearchEnabled()
    const [searchMode] = useSearchMode()

    // Semantic-only is the default; the "switch to keyword search" action
    // (actions.tsx) flips to Algolia-only. The website-semantic-search flag is
    // a hard gate — with it off, keyword is the only engine available.
    const trimmedQuery = query.trim()
    const queryWordCount = trimmedQuery.split(/\s+/).filter(Boolean).length
    const semantic = semanticEnabled && searchMode === 'semantic'
    const keyword = !semantic

    // While the filter picker is open the input holds filter text, not a search
    // query — don't fire searches against it
    const { results, loading } = useHybridSearch(filterMenuOpen ? '' : query, { semantic, keyword })

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
                  (categoryAliases[type] ?? []).some((alias) => alias.includes(q))
                : 'all categories'.includes(q)
        )
    }, [filterMenuOpen, trimmedQuery])

    // Grouped by category, rank order preserved within each group. Products
    // always lead when present; the rest are ordered by their best member's
    // RRF score, so the strongest match's group sits highest (typeOrder
    // breaks ties and pushes unknown types last).
    const groups = useMemo(() => {
        const scoped = activeFilter ? results.filter((result) => result.type === activeFilter) : results
        const byType = new Map<string, HybridSearchResult[]>()
        for (const result of scoped) {
            byType.set(result.type, [...(byType.get(result.type) || []), result])
        }
        // Results arrive sorted by score, so a group's first member is its best
        const bestScore = (type: string) => (byType.get(type) as HybridSearchResult[])[0]?.score ?? 0
        const typeRank = (type: string) => {
            const index = typeOrder.indexOf(type)
            return index === -1 ? typeOrder.length : index
        }
        const orderedTypes = Array.from(byType.keys()).sort((a, b) => {
            if (a === 'product') return -1
            if (b === 'product') return 1
            return bestScore(b) - bestScore(a) || typeRank(a) - typeRank(b)
        })
        return orderedTypes.map((type) => {
            const items = byType.get(type) as HybridSearchResult[]
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
        ...groups.flatMap((group) => group.results.map((result) => ({ kind: 'result' as const, result }))),
    ]

    const suggestionRows = navItems.filter((item) => item.kind !== 'result')

    const close = () => {
        setQuery('')
        setActiveFilter(null)
        setFilterMenuOpen(false)
        onClose()
    }

    const openResult = (result: HybridSearchResult) => {
        posthog?.capture('web search result clicked', {
            title: result.title,
            slug: result.url.slice(1),
            category: activeFilter || 'all',
            query,
            type: result.type,
            searchEngine: semantic && !keyword ? 'semantic' : semantic ? 'hybrid' : 'algolia',
            searchSources: result.sources,
        })
        close()
        navigate(resultURL(result), { state: { newWindow: true } })
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
            // Keep the query too, so Enter re-runs the toggle — unless the
            // action asked for a clean slate
            if (action.clearQuery) {
                setQuery('')
            }
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
    let flatIndex = resultIndexOffset - 1

    return (
        <AnimatePresence>
            {open && (
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
                        className="@container flex h-fit w-full max-w-[680px] flex-col overflow-hidden rounded-2xl border border-primary bg-primary/60 shadow-2xl ring-1 ring-inset ring-white/10 backdrop-blur-2xl"
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <div className="flex gap-3 items-center px-4 h-14 shrink-0">
                            {loading && query ? (
                                <Spinner className="!h-5 !w-5 shrink-0 !text-secondary" />
                            ) : (
                                <IconSearch className="size-5 shrink-0 text-secondary" />
                            )}
                            {activeFilter && (
                                <button
                                    onClick={removeFilter}
                                    title="Remove filter"
                                    className="group flex shrink-0 items-center gap-1 rounded-md border border-primary bg-accent/80 px-1.5 py-1 text-sm font-semibold text-secondary hover:text-primary [&_svg]:size-3.5"
                                >
                                    {configForType(activeFilter).icon}
                                    {configForType(activeFilter).label}
                                    <IconX className="opacity-50 group-hover:opacity-100" />
                                </button>
                            )}
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value)
                                    if (filterMenuOpen) {
                                        // Typing narrows the picker; keep the selection on the first match
                                        setFilterMenuIndex(0)
                                    }
                                }}
                                onKeyDown={handleInputKeyDown}
                                placeholder={
                                    filterMenuOpen
                                        ? 'Filter by category...'
                                        : activeFilter
                                        ? `Search ${configForType(activeFilter).label.toLowerCase()}...`
                                        : 'Search PostHog.com...'
                                }
                                autoFocus
                                spellCheck={false}
                                autoComplete="off"
                                className="p-0 w-full text-lg bg-transparent border-0 outline-none text-primary placeholder:text-secondary focus:ring-0"
                            />
                            {!query && !filterMenuOpen ? (
                                <KeyboardShortcut text="esc" size="xs" className="shrink-0" />
                            ) : (
                                <button
                                    onClick={() => (filterMenuOpen ? closeFilterMenu() : openFilterMenu())}
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
                                        <div className="max-h-[min(480px,50vh)] overflow-y-auto border-t border-primary p-2">
                                            {filterMenuOpen ? (
                                                <ul className="p-0 m-0 list-none">
                                                    {visibleFilterOptions.length === 0 && (
                                                        <li className="px-2.5 py-4 text-center text-sm text-secondary">
                                                            No matching categories
                                                        </li>
                                                    )}
                                                    {visibleFilterOptions.map((type, index) => {
                                                        const config = type
                                                            ? configForType(type)
                                                            : { label: 'All categories', icon: <IconSearch /> }
                                                        return (
                                                            <li
                                                                key={type ?? 'all'}
                                                                ref={(el) => (filterMenuItemRefs.current[index] = el)}
                                                                onMouseMove={() => setFilterMenuIndex(index)}
                                                                onClick={() => selectFilterOption(type)}
                                                                className={`flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 ${
                                                                    index === filterMenuIndex
                                                                        ? 'bg-accent/60 ring-1 ring-inset ring-border/40'
                                                                        : ''
                                                                }`}
                                                            >
                                                                <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-primary bg-primary/50 text-secondary [&_svg]:size-4">
                                                                    {config.icon}
                                                                </div>
                                                                <p className="m-0 text-[15px] text-primary">
                                                                    {config.label}
                                                                </p>
                                                                {type === activeFilter && (
                                                                    <IconCheck className="ml-auto size-4 shrink-0 text-secondary" />
                                                                )}
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            ) : (
                                                <>
                                                    {suggestionRows.length > 0 && (
                                                        <ul className="p-0 m-0 list-none">
                                                            {suggestionRows.map((item, index) => {
                                                                const rowProps = {
                                                                    ref: (el: HTMLLIElement | null) =>
                                                                        (itemRefs.current[index] = el),
                                                                    onMouseMove: () => setSelectedIndex(index),
                                                                    className: `flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 ${
                                                                        selectedIndex === index
                                                                            ? 'bg-accent/60 ring-1 ring-inset ring-border/40'
                                                                            : ''
                                                                    }`,
                                                                }
                                                                const iconBoxClass =
                                                                    'flex size-8 shrink-0 items-center justify-center rounded-md border border-primary bg-primary/50 text-secondary [&_svg]:size-4'
                                                                const hintClass =
                                                                    'ml-auto hidden shrink-0 text-xs text-secondary @md:block'
                                                                if (item.kind === 'action') {
                                                                    return (
                                                                        <li
                                                                            key={item.action.id}
                                                                            {...rowProps}
                                                                            onClick={() => runAction(item.action)}
                                                                        >
                                                                            <div className={iconBoxClass}>
                                                                                {item.action.icon}
                                                                            </div>
                                                                            <p className="m-0 min-w-0 truncate text-[15px] text-primary">
                                                                                {item.action.label}
                                                                            </p>
                                                                            <span className={hintClass}>
                                                                                <KeyboardShortcut text="↵" size="xs" />{' '}
                                                                                to run
                                                                            </span>
                                                                        </li>
                                                                    )
                                                                }
                                                                if (item.kind === 'ask-ai') {
                                                                    return (
                                                                        <li key="ask-ai" {...rowProps} onClick={askAI}>
                                                                            <div className={iconBoxClass}>
                                                                                <IconSparkles />
                                                                            </div>
                                                                            <p className="m-0 min-w-0 truncate text-[15px] text-primary">
                                                                                Ask AI:{' '}
                                                                                <span className="font-semibold">
                                                                                    &ldquo;{query}&rdquo;
                                                                                </span>
                                                                            </p>
                                                                            <span className={hintClass}>
                                                                                <KeyboardShortcut text="↵" size="xs" />{' '}
                                                                                to ask
                                                                            </span>
                                                                        </li>
                                                                    )
                                                                }
                                                                return (
                                                                    <li
                                                                        key="filter"
                                                                        {...rowProps}
                                                                        onClick={() => applyFilter(item.type)}
                                                                    >
                                                                        <div className={iconBoxClass}>
                                                                            <IconFilter />
                                                                        </div>
                                                                        <p className="m-0 flex items-center gap-1.5 text-[15px] text-primary">
                                                                            Filter by category:
                                                                            <span className="flex items-center gap-1 rounded-md border border-primary bg-accent/80 px-1.5 py-0.5 text-sm font-semibold text-secondary [&_svg]:size-3.5">
                                                                                {configForType(item.type).icon}
                                                                                {configForType(item.type).label}
                                                                            </span>
                                                                        </p>
                                                                        <span className={hintClass}>
                                                                            <KeyboardShortcut text="↵" size="xs" /> to
                                                                            filter
                                                                        </span>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    )}
                                                    {loading && query ? (
                                                        <ul className="p-0 m-0 list-none">
                                                            <SkeletonRow />
                                                            <SkeletonRow />
                                                            <SkeletonRow />
                                                        </ul>
                                                    ) : hasResults ? (
                                                        groups.map((group) => (
                                                            <div key={group.type}>
                                                                {!activeFilter && (
                                                                    <h5 className="m-0 px-2.5 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-secondary">
                                                                        <button
                                                                            onClick={() =>
                                                                                applyFilter(group.type, {
                                                                                    keepQuery: true,
                                                                                })
                                                                            }
                                                                            title={`Only show ${configForType(
                                                                                group.type
                                                                            ).label.toLowerCase()}`}
                                                                            className="tracking-wide uppercase hover:text-primary"
                                                                        >
                                                                            {configForType(group.type).label}
                                                                        </button>
                                                                    </h5>
                                                                )}
                                                                <ul className="p-0 m-0 list-none">
                                                                    {group.results.map((result) => {
                                                                        flatIndex++
                                                                        const index = flatIndex
                                                                        const selected = index === selectedIndex
                                                                        return (
                                                                            <li
                                                                                key={resultURL(result)}
                                                                                ref={(el) =>
                                                                                    (itemRefs.current[index] = el)
                                                                                }
                                                                                onMouseMove={() =>
                                                                                    setSelectedIndex(index)
                                                                                }
                                                                                onClick={() => openResult(result)}
                                                                                className={`flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 ${
                                                                                    selected
                                                                                        ? 'bg-accent/60 ring-1 ring-inset ring-border/40'
                                                                                        : ''
                                                                                }`}
                                                                            >
                                                                                <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-primary bg-primary/50 text-secondary [&_svg]:size-4">
                                                                                    {configForType(result.type).icon}
                                                                                </div>
                                                                                <div className="min-w-0">
                                                                                    <p className="m-0 truncate text-[15px] font-semibold text-primary">
                                                                                        {result.title}
                                                                                    </p>
                                                                                    <p className="m-0 text-sm truncate text-secondary">
                                                                                        {result.excerpt}
                                                                                    </p>
                                                                                </div>
                                                                                <span className="ml-auto hidden shrink-0 text-xs text-secondary @md:block">
                                                                                    {result.url}
                                                                                </span>
                                                                            </li>
                                                                        )
                                                                    })}
                                                                </ul>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        !query &&
                                                        activeFilter && (
                                                            <p className="m-0 px-2.5 py-4 text-center text-sm text-secondary">
                                                                Type to search{' '}
                                                                {configForType(activeFilter).label.toLowerCase()}
                                                                ...
                                                            </p>
                                                        )
                                                    )}
                                                </>
                                            )}
                                        </div>

                                        <div className="flex justify-between items-center px-4 py-2 text-xs border-t shrink-0 border-primary text-secondary">
                                            {filterMenuOpen ? (
                                                <>
                                                    <div className="flex gap-3 items-center">
                                                        <span>
                                                            <KeyboardShortcut text="↑" size="xs" />
                                                            <KeyboardShortcut text="↓" size="xs" /> navigate
                                                        </span>
                                                        <span>
                                                            <KeyboardShortcut text="↵" size="xs" /> apply filter
                                                        </span>
                                                    </div>
                                                    <span>
                                                        <KeyboardShortcut text="esc" size="xs" /> close
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="flex gap-3 items-center">
                                                        <span>
                                                            <KeyboardShortcut text="↑" size="xs" />
                                                            <KeyboardShortcut text="↓" size="xs" /> navigate
                                                        </span>
                                                        <span>
                                                            <KeyboardShortcut text="↵" size="xs" /> open
                                                        </span>
                                                        <span className="hidden @md:inline">
                                                            <KeyboardShortcut text="⌘F" size="xs" /> filter
                                                        </span>
                                                        {activeFilter && (
                                                            <span>
                                                                <KeyboardShortcut text="⌫" size="xs" /> remove filter
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span>
                                                        <KeyboardShortcut text="⇧" size="xs" />
                                                        <KeyboardShortcut text="↵" size="xs" /> talk to a robot
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
