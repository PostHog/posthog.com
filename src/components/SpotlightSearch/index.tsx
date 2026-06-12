import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navigate } from 'gatsby'
import {
    IconApps,
    IconBook,
    IconBrackets,
    IconChat,
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
import { useSemanticSearchEnabled } from 'components/Search/useSemanticSearchEnabled'
import usePostHog from 'hooks/usePostHog'
import { capitalizeFirstLetter } from '../../utils'
import { useApp } from '../../context/App'

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

const QUESTION_WORDS = /^(how|why|what|when|where|who|which|can|could|does|do|is|are|should|will|did)\b/i

type NavItem = { kind: 'ask-ai' } | { kind: 'filter'; type: string } | { kind: 'result'; result: HybridSearchResult }

const SkeletonRow = () => (
    <li aria-hidden className="flex items-center gap-3 rounded-lg px-2.5 py-2">
        <div className="size-8 shrink-0 animate-pulse rounded-md bg-border/50" />
        <div className="min-w-0 flex-1 space-y-1.5">
            <div className="h-3.5 w-1/3 animate-pulse rounded bg-border/50" />
            <div className="h-3 w-2/3 animate-pulse rounded bg-border/50" />
        </div>
    </li>
)

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
    const inputRef = useRef<HTMLInputElement>(null)
    const itemRefs = useRef<(HTMLLIElement | null)[]>([])

    const semanticEnabled = useSemanticSearchEnabled()

    // 1–2 word queries are navigational keyword lookups — Algolia alone is
    // instant and better at them, so semantic search only engages at 3+ words
    // or when the query reads as a question (leading question word with at
    // least one more word, or a trailing "?"). Question-led queries skip
    // keyword search entirely: their results come from semantic alone.
    const trimmedQuery = query.trim()
    const queryWordCount = trimmedQuery.split(/\s+/).filter(Boolean).length
    const startsWithQuestionWord = queryWordCount >= 2 && QUESTION_WORDS.test(trimmedQuery)
    const questionSignal = startsWithQuestionWord || trimmedQuery.endsWith('?')
    const semantic = semanticEnabled && (queryWordCount >= 3 || questionSignal)
    const keyword = !(semantic && startsWithQuestionWord)

    const { results, loading } = useHybridSearch(query, { semantic, keyword })

    const suggestedFilter = useMemo(() => (activeFilter ? null : matchCategory(query)), [query, activeFilter])

    // Grouped by category in typeOrder (unknown types last); rank order is
    // preserved within each group
    const groups = useMemo(() => {
        const scoped = activeFilter ? results.filter((result) => result.type === activeFilter) : results
        const byType = new Map<string, HybridSearchResult[]>()
        for (const result of scoped) {
            byType.set(result.type, [...(byType.get(result.type) || []), result])
        }
        const orderedTypes = [
            ...typeOrder.filter((type) => byType.has(type)),
            ...Array.from(byType.keys()).filter((type) => !typeOrder.includes(type)),
        ]
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

    // Flat list in rendered order (suggestion rows first), for keyboard navigation
    const navItems = useMemo<NavItem[]>(
        () => [
            ...(suggestAskAI ? [{ kind: 'ask-ai' as const }] : []),
            ...(suggestedFilter ? [{ kind: 'filter' as const, type: suggestedFilter }] : []),
            ...groups.flatMap((group) => group.results.map((result) => ({ kind: 'result' as const, result }))),
        ],
        [suggestAskAI, suggestedFilter, groups]
    )

    const close = () => {
        setQuery('')
        setActiveFilter(null)
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

    const askAI = () => {
        if (!query) return
        openNewChat({ path: 'ask-max', initialQuestion: query })
        close()
    }

    const selectItem = (item: NavItem) => {
        if (item.kind === 'ask-ai') {
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
        }
    }, [open, initialFilter])

    useEffect(() => {
        setSelectedIndex(0)
    }, [query, activeFilter])

    useEffect(() => {
        itemRefs.current[selectedIndex]?.scrollIntoView({ block: 'nearest' })
    }, [selectedIndex])

    useEffect(() => {
        if (!open) return
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault()
                if (query) {
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
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [open, query, activeFilter])

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

    const expanded = Boolean(query || activeFilter)
    const filterRowIndex = suggestAskAI ? 1 : 0
    const resultIndexOffset = (suggestAskAI ? 1 : 0) + (suggestedFilter ? 1 : 0)
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
                        <div className="flex h-14 shrink-0 items-center gap-3 px-4">
                            {loading && query ? (
                                <Spinner className="!h-5 !w-5 shrink-0 !text-muted" />
                            ) : (
                                <IconSearch className="size-5 shrink-0 text-muted" />
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
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleInputKeyDown}
                                placeholder={
                                    activeFilter
                                        ? `Search ${configForType(activeFilter).label.toLowerCase()}...`
                                        : 'Search PostHog.com...'
                                }
                                autoFocus
                                spellCheck={false}
                                autoComplete="off"
                                className="w-full border-0 bg-transparent p-0 text-lg text-primary outline-none placeholder:text-muted focus:ring-0"
                            />
                            {!query && <KeyboardShortcut text="esc" size="xs" className="shrink-0" />}
                        </div>

                        {expanded && (
                            <>
                                <div className="max-h-[min(480px,50vh)] overflow-y-auto border-t border-primary p-2">
                                    {suggestAskAI && (
                                        <ul className="m-0 list-none p-0">
                                            <li
                                                ref={(el) => (itemRefs.current[0] = el)}
                                                onMouseMove={() => setSelectedIndex(0)}
                                                onClick={askAI}
                                                className={`flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 ${
                                                    selectedIndex === 0
                                                        ? 'bg-accent/60 ring-1 ring-inset ring-border/40'
                                                        : ''
                                                }`}
                                            >
                                                <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-primary bg-primary/50 text-secondary [&_svg]:size-4">
                                                    <IconSparkles />
                                                </div>
                                                <p className="m-0 min-w-0 truncate text-[15px] text-primary">
                                                    Ask AI: <span className="font-semibold">&ldquo;{query}&rdquo;</span>
                                                </p>
                                                <span className="ml-auto hidden shrink-0 text-xs text-muted @md:block">
                                                    <KeyboardShortcut text="↵" size="xs" /> to ask
                                                </span>
                                            </li>
                                        </ul>
                                    )}
                                    {suggestedFilter && (
                                        <ul className="m-0 list-none p-0">
                                            <li
                                                ref={(el) => (itemRefs.current[filterRowIndex] = el)}
                                                onMouseMove={() => setSelectedIndex(filterRowIndex)}
                                                onClick={() => applyFilter(suggestedFilter)}
                                                className={`flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 ${
                                                    selectedIndex === filterRowIndex
                                                        ? 'bg-accent/60 ring-1 ring-inset ring-border/40'
                                                        : ''
                                                }`}
                                            >
                                                <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-primary bg-primary/50 text-secondary [&_svg]:size-4">
                                                    <IconFilter />
                                                </div>
                                                <p className="m-0 flex items-center gap-1.5 text-[15px] text-primary">
                                                    Filter by category:
                                                    <span className="flex items-center gap-1 rounded-md border border-primary bg-accent/80 px-1.5 py-0.5 text-sm font-semibold text-secondary [&_svg]:size-3.5">
                                                        {configForType(suggestedFilter).icon}
                                                        {configForType(suggestedFilter).label}
                                                    </span>
                                                </p>
                                                <span className="ml-auto hidden shrink-0 text-xs text-muted @md:block">
                                                    <KeyboardShortcut text="↵" size="xs" /> to filter
                                                </span>
                                            </li>
                                        </ul>
                                    )}
                                    {loading && query ? (
                                        <ul className="m-0 list-none p-0">
                                            <SkeletonRow />
                                            <SkeletonRow />
                                            <SkeletonRow />
                                        </ul>
                                    ) : hasResults ? (
                                        groups.map((group) => (
                                            <div key={group.type}>
                                                {!activeFilter && (
                                                    <h5 className="m-0 px-2.5 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-muted">
                                                        <button
                                                            onClick={() => applyFilter(group.type, { keepQuery: true })}
                                                            title={`Only show ${configForType(
                                                                group.type
                                                            ).label.toLowerCase()}`}
                                                            className="uppercase tracking-wide hover:text-primary"
                                                        >
                                                            {configForType(group.type).label}
                                                        </button>
                                                    </h5>
                                                )}
                                                <ul className="m-0 list-none p-0">
                                                    {group.results.map((result) => {
                                                        flatIndex++
                                                        const index = flatIndex
                                                        const selected = index === selectedIndex
                                                        return (
                                                            <li
                                                                key={resultURL(result)}
                                                                ref={(el) => (itemRefs.current[index] = el)}
                                                                onMouseMove={() => setSelectedIndex(index)}
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
                                                                    <p className="m-0 truncate text-sm text-secondary">
                                                                        {result.excerpt}
                                                                    </p>
                                                                </div>
                                                                <span className="ml-auto hidden shrink-0 text-xs text-muted @md:block">
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
                                            <p className="m-0 px-2.5 py-4 text-center text-sm text-muted">
                                                Type to search {configForType(activeFilter).label.toLowerCase()}...
                                            </p>
                                        )
                                    )}
                                </div>

                                <div className="flex shrink-0 items-center justify-between border-t border-primary px-4 py-2 text-xs text-muted">
                                    <div className="flex items-center gap-3">
                                        <span>
                                            <KeyboardShortcut text="↑" size="xs" />
                                            <KeyboardShortcut text="↓" size="xs" /> navigate
                                        </span>
                                        <span>
                                            <KeyboardShortcut text="↵" size="xs" /> open
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
                                </div>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
