import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navigate } from 'gatsby'
import {
    IconBook,
    IconChat,
    IconCompass,
    IconFilter,
    IconGraduationCap,
    IconNewspaper,
    IconSearch,
    IconSparkles,
    IconX,
} from '@posthog/icons'
import KeyboardShortcut from 'components/KeyboardShortcut'
import { useApp } from '../../context/App'

type ResultType = 'docs' | 'handbook' | 'blog' | 'tutorial' | 'community'

type SearchResult = {
    type: ResultType
    title: string
    url: string
    excerpt: string
}

const typeConfig: Record<ResultType, { label: string; icon: React.ReactNode }> = {
    docs: { label: 'Docs', icon: <IconBook /> },
    handbook: { label: 'Handbook', icon: <IconCompass /> },
    blog: { label: 'Blog', icon: <IconNewspaper /> },
    tutorial: { label: 'Tutorials', icon: <IconGraduationCap /> },
    community: { label: 'Community', icon: <IconChat /> },
}

const typeOrder: ResultType[] = ['docs', 'handbook', 'blog', 'tutorial', 'community']

// Stand-in for semantic matching: each category's label plus words users are
// likely to type when they mean that category
const categoryAliases: Record<ResultType, string[]> = {
    docs: ['docs', 'documentation', 'reference', 'manual'],
    handbook: ['handbook', 'company', 'culture', 'teams'],
    blog: ['blog', 'posts', 'articles', 'news'],
    tutorial: ['tutorials', 'guides', 'how-to', 'walkthrough'],
    community: ['community', 'questions', 'forum', 'answers'],
}

const matchCategory = (query: string): ResultType | null => {
    const q = query.trim().toLowerCase()
    if (q.length < 3) return null
    for (const type of typeOrder) {
        if (categoryAliases[type].some((alias) => alias.startsWith(q) || (q.length >= 4 && alias.includes(q)))) {
            return type
        }
    }
    return null
}

// Placeholder results while the design is being iterated on — swap for
// useHybridSearch (components/Search/useHybridSearch.ts) when wiring up.
const mockResults: SearchResult[] = [
    {
        type: 'docs',
        title: 'Feature flags',
        url: '/docs/feature-flags',
        excerpt: 'Safely roll out features to specific users or groups with feature flags.',
    },
    {
        type: 'docs',
        title: 'Session replay',
        url: '/docs/session-replay',
        excerpt: 'Watch recordings of visitors using your product or website.',
    },
    {
        type: 'docs',
        title: 'Funnels',
        url: '/docs/product-analytics/funnels',
        excerpt: 'Understand where users drop off in multi-step flows.',
    },
    {
        type: 'docs',
        title: 'SQL access',
        url: '/docs/product-analytics/sql',
        excerpt: 'Directly query your data with SQL insights.',
    },
    {
        type: 'docs',
        title: 'Experiments',
        url: '/docs/experiments',
        excerpt: 'Test changes to your product with A/B tests and measure their impact.',
    },
    {
        type: 'handbook',
        title: 'Why small teams?',
        url: '/handbook/company/small-teams',
        excerpt: 'PostHog is organized into small teams that operate like startups.',
    },
    {
        type: 'handbook',
        title: 'Communication',
        url: '/handbook/company/communication',
        excerpt: 'How we communicate asynchronously across timezones.',
    },
    {
        type: 'handbook',
        title: 'Writing for PostHog',
        url: '/handbook/content/writing-for-posthog',
        excerpt: 'Our approach to writing content that developers actually want to read.',
    },
    {
        type: 'blog',
        title: 'How PostHog uses PostHog',
        url: '/blog/posthog-on-posthog',
        excerpt: 'A look at how our own teams use product analytics, replay, and flags.',
    },
    {
        type: 'blog',
        title: 'The 80/20 of early-stage startup analytics',
        url: '/blog/early-stage-analytics',
        excerpt: 'The handful of metrics that actually matter before product-market fit.',
    },
    {
        type: 'tutorial',
        title: 'How to set up A/B tests',
        url: '/tutorials/abtests',
        excerpt: 'Step-by-step guide to running your first experiment.',
    },
    {
        type: 'tutorial',
        title: 'Filtering out internal users',
        url: '/tutorials/filter-internal-users',
        excerpt: 'Keep your own team from polluting your product data.',
    },
    {
        type: 'community',
        title: 'How do I capture pageviews in Next.js?',
        url: '/questions/capture-pageviews-nextjs',
        excerpt: 'App router pageviews need a manual capture call — here is the pattern.',
    },
    {
        type: 'community',
        title: 'Can I use feature flags with the API?',
        url: '/questions/feature-flags-api',
        excerpt: 'Evaluating flags server-side with the decide endpoint.',
    },
]

const filterResults = (query: string, activeFilter: ResultType | null): SearchResult[] => {
    const scoped = activeFilter ? mockResults.filter((result) => result.type === activeFilter) : mockResults
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
    // With a filter applied, an empty query browses the whole category
    if (terms.length === 0) return activeFilter ? scoped : []
    return scoped.filter((result) => {
        const haystack = `${result.title} ${result.excerpt} ${result.url}`.toLowerCase()
        return terms.every((term) => haystack.includes(term))
    })
}

type NavItem = { kind: 'ask-ai' } | { kind: 'filter'; type: ResultType } | { kind: 'result'; result: SearchResult }

export default function SpotlightSearch({ open, onClose }: { open: boolean; onClose: () => void }): JSX.Element {
    const { openNewChat } = useApp()
    const [query, setQuery] = useState('')
    const [activeFilter, setActiveFilter] = useState<ResultType | null>(null)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)
    const itemRefs = useRef<(HTMLLIElement | null)[]>([])

    const results = useMemo(() => filterResults(query, activeFilter), [query, activeFilter])

    const suggestedFilter = useMemo(() => (activeFilter ? null : matchCategory(query)), [query, activeFilter])

    // 4+ word queries read like questions, and zero-result queries have nowhere
    // else to go — both offer Ask AI as the top result
    const queryWordCount = query.trim().split(/\s+/).filter(Boolean).length
    const suggestAskAI = queryWordCount >= 4 || (queryWordCount > 0 && results.length === 0)

    const groups = useMemo(
        () =>
            typeOrder
                .map((type) => ({ type, results: results.filter((result) => result.type === type) }))
                .filter((group) => group.results.length > 0),
        [results]
    )

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

    const openResult = (result: SearchResult) => {
        close()
        navigate(result.url, { state: { newWindow: true } })
    }

    const applyFilter = (type: ResultType, { keepQuery = false }: { keepQuery?: boolean } = {}) => {
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

    const selectItem = (item: NavItem) => {
        if (item.kind === 'ask-ai') {
            askAI()
        } else if (item.kind === 'filter') {
            applyFilter(item.type)
        } else {
            openResult(item.result)
        }
    }

    const askAI = () => {
        if (!query) return
        openNewChat({ path: 'ask-max', initialQuestion: query })
        close()
    }

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
                            <IconSearch className="size-5 shrink-0 text-muted" />
                            {activeFilter && (
                                <button
                                    onClick={removeFilter}
                                    title="Remove filter"
                                    className="group flex shrink-0 items-center gap-1 rounded-md border border-primary bg-accent/80 px-1.5 py-1 text-sm font-semibold text-secondary hover:text-primary [&_svg]:size-3.5"
                                >
                                    {typeConfig[activeFilter].icon}
                                    {typeConfig[activeFilter].label}
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
                                        ? `Search ${typeConfig[activeFilter].label.toLowerCase()}...`
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
                                {navItems.length > 0 ? (
                                    <div className="max-h-[min(480px,50vh)] overflow-y-auto border-t border-primary p-2">
                                        {suggestAskAI && (
                                            <ul className="m-0 list-none p-0">
                                                <li
                                                    ref={(el) => (itemRefs.current[0] = el)}
                                                    onMouseMove={() => setSelectedIndex(0)}
                                                    onClick={askAI}
                                                    className={`flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 ${
                                                        selectedIndex === 0 ? 'bg-accent/80' : ''
                                                    }`}
                                                >
                                                    <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-primary bg-primary/50 text-secondary [&_svg]:size-4">
                                                        <IconSparkles />
                                                    </div>
                                                    <p className="m-0 min-w-0 truncate text-[15px] text-primary">
                                                        Ask AI:{' '}
                                                        <span className="font-semibold">&ldquo;{query}&rdquo;</span>
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
                                                        selectedIndex === filterRowIndex ? 'bg-accent/80' : ''
                                                    }`}
                                                >
                                                    <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-primary bg-primary/50 text-secondary [&_svg]:size-4">
                                                        <IconFilter />
                                                    </div>
                                                    <p className="m-0 flex items-center gap-1.5 text-[15px] text-primary">
                                                        Filter by category:
                                                        <span className="flex items-center gap-1 rounded-md border border-primary bg-accent/80 px-1.5 py-0.5 text-sm font-semibold text-secondary [&_svg]:size-3.5">
                                                            {typeConfig[suggestedFilter].icon}
                                                            {typeConfig[suggestedFilter].label}
                                                        </span>
                                                    </p>
                                                    <span className="ml-auto hidden shrink-0 text-xs text-muted @md:block">
                                                        <KeyboardShortcut text="↵" size="xs" /> to filter
                                                    </span>
                                                </li>
                                            </ul>
                                        )}
                                        {groups.map((group) => (
                                            <div key={group.type}>
                                                {!activeFilter && (
                                                    <h5 className="m-0 px-2.5 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-muted">
                                                        <button
                                                            onClick={() => applyFilter(group.type, { keepQuery: true })}
                                                            title={`Only show ${typeConfig[
                                                                group.type
                                                            ].label.toLowerCase()}`}
                                                            className="uppercase tracking-wide hover:text-primary"
                                                        >
                                                            {typeConfig[group.type].label}
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
                                                                key={result.url}
                                                                ref={(el) => (itemRefs.current[index] = el)}
                                                                onMouseMove={() => setSelectedIndex(index)}
                                                                onClick={() => openResult(result)}
                                                                className={`flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 ${
                                                                    selected ? 'bg-accent/80' : ''
                                                                }`}
                                                            >
                                                                <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-primary bg-primary/50 text-secondary [&_svg]:size-4">
                                                                    {typeConfig[result.type].icon}
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
                                        ))}
                                    </div>
                                ) : (
                                    <div className="border-t border-primary px-4 py-8 text-center">
                                        <p className="m-0 text-[15px] text-secondary">
                                            No results for &ldquo;{query}&rdquo;
                                            {activeFilter ? ` in ${typeConfig[activeFilter].label.toLowerCase()}` : ''}
                                        </p>
                                        <p className="m-0 mt-1 text-sm text-muted">
                                            Try different keywords, or ask AI instead
                                        </p>
                                    </div>
                                )}

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
