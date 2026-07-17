import React, { useEffect, useState } from 'react'
import { useLocation } from '@reach/router'
import { useSearch } from 'components/Editor/SearchProvider'
import { AlgoliaSearchResults } from 'components/Search/InlineSearch'

interface OnPageMatch {
    id: string
    element: HTMLElement
    snippet: string
    heading: string
}

// Leaf-ish text blocks we surface as individual "on this page" matches.
const BLOCK_SELECTOR = 'p, li, blockquote, td, th, dd, dt, figcaption'
const HEADING_SELECTOR = 'h1, h2, h3, h4, h5, h6'

const buildSnippet = (text: string, query: string): string => {
    const idx = text.toLowerCase().indexOf(query.toLowerCase())
    if (idx === -1) return text.slice(0, 100)
    const start = Math.max(0, idx - 40)
    const end = Math.min(text.length, idx + query.length + 60)
    return `${start > 0 ? '…' : ''}${text.slice(start, end).trim()}${end < text.length ? '…' : ''}`
}

/** Walk the article in document order, tracking the nearest preceding heading, collecting blocks that contain the query. */
const extractOnPageMatches = (container: HTMLElement, query: string): OnPageMatch[] => {
    const q = query.toLowerCase()
    if (q.length < 2) return []

    const els = Array.from(container.querySelectorAll<HTMLElement>(`${HEADING_SELECTOR}, ${BLOCK_SELECTOR}`))
    const matches: OnPageMatch[] = []
    let heading = ''
    let i = 0

    for (const el of els) {
        const text = (el.textContent || '').replace(/\s+/g, ' ').trim()
        if (/^H[1-6]$/.test(el.tagName)) {
            heading = text
            continue
        }
        if (text && text.toLowerCase().includes(q)) {
            matches.push({ id: `m${i++}`, element: el, snippet: buildSnippet(text, query), heading })
        }
    }

    // Keep only the innermost match when blocks nest (e.g. a <p> inside an <li>).
    return matches.filter((m) => !matches.some((o) => o !== m && m.element.contains(o.element)))
}

const HighlightedSnippet = ({ text, query }: { text: string; query: string }): JSX.Element => {
    const idx = text.toLowerCase().indexOf(query.toLowerCase())
    if (idx === -1) return <>{text}</>
    return (
        <>
            {text.slice(0, idx)}
            <mark className="bg-yellow/40 dark:bg-yellow/30 text-inherit rounded-sm">
                {text.slice(idx, idx + query.length)}
            </mark>
            {text.slice(idx + query.length)}
        </>
    )
}

/**
 * Search results shown in the Viewer sidebar while a query is active — "On this page" matches
 * (click to scroll the article to each) plus site-wide "Other pages" hits from the Algolia index.
 * Reads the query from `components/Editor/SearchProvider` (the same context `InlineSearch` writes).
 */
export function ViewerSearchResults({ contentRef }: { contentRef: React.RefObject<HTMLElement> }): JSX.Element | null {
    const { searchQuery } = useSearch()
    const { pathname } = useLocation()
    const [onPageMatches, setOnPageMatches] = useState<OnPageMatch[]>([])
    const query = searchQuery.trim()

    useEffect(() => {
        if (!contentRef.current || query.length < 2) {
            setOnPageMatches([])
            return
        }
        setOnPageMatches(extractOnPageMatches(contentRef.current, query).slice(0, 20))
    }, [query])

    if (query.length < 2) return null

    const scrollToMatch = (element: HTMLElement) => {
        const viewport = contentRef.current?.closest('[data-radix-scroll-area-viewport]') as HTMLElement | null
        if (!viewport) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' })
            return
        }
        const top = element.getBoundingClientRect().top - viewport.getBoundingClientRect().top + viewport.scrollTop - 80
        viewport.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
    }

    const groupedByHeading: Record<string, OnPageMatch[]> = {}
    onPageMatches.forEach((match) => {
        const key = match.heading || ''
        if (!groupedByHeading[key]) groupedByHeading[key] = []
        groupedByHeading[key].push(match)
    })

    return (
        <div className="text-sm space-y-3">
            <div>
                <h4 className="text-[11px] font-semibold text-muted uppercase tracking-wide m-0 mb-1 px-1">
                    On this page
                    {onPageMatches.length > 0 && (
                        <span className="ml-1.5 text-muted/60 font-normal normal-case tracking-normal">
                            {onPageMatches.length} {onPageMatches.length === 1 ? 'match' : 'matches'}
                        </span>
                    )}
                </h4>
                {onPageMatches.length > 0 ? (
                    <ul className="list-none m-0 p-0">
                        {Object.entries(groupedByHeading).map(([heading, matches]) => (
                            <li key={heading} className="mb-1">
                                {heading && (
                                    <span className="block text-[11px] font-medium text-muted px-2 pt-1 truncate">
                                        {heading}
                                    </span>
                                )}
                                <ul className="list-none m-0 p-0">
                                    {matches.map((match) => (
                                        <li key={match.id}>
                                            <button
                                                type="button"
                                                onClick={() => scrollToMatch(match.element)}
                                                className="w-full text-left px-2 py-1 rounded hover:bg-accent transition-colors cursor-pointer text-primary"
                                            >
                                                <HighlightedSnippet text={match.snippet} query={query} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="px-2 py-1 text-xs text-muted m-0">No matches</p>
                )}
            </div>

            <div className="border-t border-secondary pt-2">
                <h4 className="text-[11px] font-semibold text-muted uppercase tracking-wide m-0 mb-1 px-1">
                    Other pages
                </h4>
                <AlgoliaSearchResults currentPath={pathname} />
            </div>
        </div>
    )
}

export default ViewerSearchResults
