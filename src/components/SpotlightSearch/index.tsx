import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navigate } from 'gatsby'
import {
    IconBook,
    IconChat,
    IconCompass,
    IconGraduationCap,
    IconNewspaper,
    IconSearch,
    IconSparkles,
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

const filterResults = (query: string): SearchResult[] => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
    if (terms.length === 0) return []
    return mockResults.filter((result) => {
        const haystack = `${result.title} ${result.excerpt} ${result.url}`.toLowerCase()
        return terms.every((term) => haystack.includes(term))
    })
}

export default function SpotlightSearch({ open, onClose }: { open: boolean; onClose: () => void }): JSX.Element {
    const { openNewChat } = useApp()
    const [query, setQuery] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const itemRefs = useRef<(HTMLLIElement | null)[]>([])

    const results = useMemo(() => filterResults(query), [query])

    const groups = useMemo(
        () =>
            typeOrder
                .map((type) => ({ type, results: results.filter((result) => result.type === type) }))
                .filter((group) => group.results.length > 0),
        [results]
    )

    // Flat list in rendered order, for keyboard navigation across groups
    const flatResults = useMemo(() => groups.flatMap((group) => group.results), [groups])

    const close = () => {
        setQuery('')
        onClose()
    }

    const openResult = (result: SearchResult) => {
        close()
        navigate(result.url, { state: { newWindow: true } })
    }

    const askAI = () => {
        if (!query) return
        openNewChat({ path: 'ask-max', initialQuestion: query })
        close()
    }

    useEffect(() => {
        setSelectedIndex(0)
    }, [query])

    useEffect(() => {
        itemRefs.current[selectedIndex]?.scrollIntoView({ block: 'nearest' })
    }, [selectedIndex])

    useEffect(() => {
        if (!open) return
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault()
                query ? setQuery('') : close()
            }
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                close()
            }
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [open, query])

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setSelectedIndex((index) => (flatResults.length ? (index + 1) % flatResults.length : 0))
        }
        if (e.key === 'ArrowUp') {
            e.preventDefault()
            setSelectedIndex((index) =>
                flatResults.length ? (index - 1 + flatResults.length) % flatResults.length : 0
            )
        }
        if (e.key === 'Enter') {
            e.preventDefault()
            if (e.shiftKey) {
                askAI()
            } else if (flatResults[selectedIndex]) {
                openResult(flatResults[selectedIndex])
            }
        }
    }

    let flatIndex = -1

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
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleInputKeyDown}
                                placeholder="Search PostHog.com..."
                                autoFocus
                                spellCheck={false}
                                autoComplete="off"
                                className="w-full border-0 bg-transparent p-0 text-lg text-primary outline-none placeholder:text-muted focus:ring-0"
                            />
                            {query ? (
                                <button
                                    onClick={askAI}
                                    className="flex shrink-0 items-center gap-1 rounded-md border border-primary px-2 py-1 text-sm font-semibold text-secondary hover:bg-accent/60 hover:text-primary"
                                >
                                    <IconSparkles className="size-4" />
                                    Ask AI
                                </button>
                            ) : (
                                <KeyboardShortcut text="esc" size="xs" className="shrink-0" />
                            )}
                        </div>

                        {query && (
                            <>
                                {flatResults.length > 0 ? (
                                    <div className="max-h-[min(480px,50vh)] overflow-y-auto border-t border-primary p-2">
                                        {groups.map((group) => (
                                            <div key={group.type}>
                                                <h5 className="m-0 px-2.5 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-muted">
                                                    {typeConfig[group.type].label}
                                                </h5>
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
                                    </div>
                                    <span>
                                        <KeyboardShortcut text="⇧" size="xs" />
                                        <KeyboardShortcut text="↵" size="xs" /> ask AI
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
