import React, { useEffect, useMemo, useRef, useState } from 'react'
import { IconSearch } from '@posthog/icons'
import Mark from 'mark.js'
import { OSInput } from '../OSForm'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

interface TermEntry {
    heading: HTMLElement
    body: HTMLElement[]
    /** Lowercased term + definition text used for matching. */
    haystack: string
}

interface LetterSection {
    letter: string
    heading: HTMLElement
    terms: TermEntry[]
    /** Non-term elements in the section, e.g. the "nothing starts with J" note. */
    notes: HTMLElement[]
}

const setHidden = (el: HTMLElement, hidden: boolean) => {
    el.style.display = hidden ? 'none' : ''
}

/**
 * Client-side, in-page search for the glossary.
 *
 * The glossary itself is authored as plain MDX (h2 per letter, h4 per term) so it
 * stays server-rendered, indexable, and deep-linkable. This component is dropped in
 * once at the top of the page and progressively enhances that static content: on
 * mount it indexes its sibling headings, then filters them live as you type. With
 * JavaScript disabled the full glossary still renders — you just don't get the box.
 */
export default function GlossarySearch(): JSX.Element {
    const rootRef = useRef<HTMLDivElement>(null)
    const sectionsRef = useRef<LetterSection[]>([])
    const markRef = useRef<Mark | null>(null)
    const [query, setQuery] = useState('')
    const [ready, setReady] = useState(false)
    const [counts, setCounts] = useState<{ visible: number; total: number }>({ visible: 0, total: 0 })

    // Index the sibling MDX content once, after it has been rendered to the DOM.
    useEffect(() => {
        const root = rootRef.current
        const container = root?.parentElement
        if (!root || !container) return

        const siblings = Array.from(container.children) as HTMLElement[]
        const start = siblings.indexOf(root)
        const sections: LetterSection[] = []
        let section: LetterSection | null = null
        let term: TermEntry | null = null

        for (const el of siblings.slice(start + 1)) {
            const tag = el.tagName.toLowerCase()
            if (tag === 'h2') {
                section = {
                    letter: (el.textContent || '').trim().charAt(0).toUpperCase(),
                    heading: el,
                    terms: [],
                    notes: [],
                }
                sections.push(section)
                term = null
            } else if (tag === 'h4') {
                term = { heading: el, body: [], haystack: (el.textContent || '').toLowerCase() }
                section?.terms.push(term)
            } else if (section) {
                if (term) {
                    term.body.push(el)
                    term.haystack += ' ' + (el.textContent || '').toLowerCase()
                } else {
                    section.notes.push(el)
                }
            }
        }

        sectionsRef.current = sections
        const total = sections.reduce((n, s) => n + s.terms.length, 0)
        markRef.current = new Mark(
            sections.flatMap((s) => [s.heading, ...s.terms.flatMap((t) => [t.heading, ...t.body])])
        )
        setCounts({ visible: total, total })
        setReady(true)

        return () => {
            markRef.current?.unmark()
            sectionsRef.current.forEach((s) => {
                setHidden(s.heading, false)
                s.notes.forEach((n) => setHidden(n, false))
                s.terms.forEach((t) => {
                    setHidden(t.heading, false)
                    t.body.forEach((b) => setHidden(b, false))
                })
            })
        }
    }, [])

    // Apply the current query to the indexed content.
    useEffect(() => {
        if (!ready) return
        const q = query.trim().toLowerCase()
        let visible = 0

        for (const section of sectionsRef.current) {
            let sectionHasMatch = false
            for (const term of section.terms) {
                const match = !q || term.haystack.includes(q)
                setHidden(term.heading, !match)
                term.body.forEach((b) => setHidden(b, !match))
                if (match) {
                    sectionHasMatch = true
                    visible++
                }
            }
            // Letter placeholder notes (e.g. "nothing starts with J") only make sense unfiltered.
            section.notes.forEach((n) => setHidden(n, !!q))
            const showSection = q ? sectionHasMatch : true
            setHidden(section.heading, !showSection)
        }

        setCounts((prev) => ({ ...prev, visible }))

        markRef.current?.unmark()
        if (q) {
            markRef.current?.mark(query.trim(), { separateWordSearch: false, accuracy: 'partially' })
        }
    }, [query, ready])

    const activeLetters = useMemo(() => {
        // On the server (and first paint) every letter that has a section is jumpable.
        const withTerms = new Set(sectionsRef.current.filter((s) => s.terms.length).map((s) => s.letter))
        return LETTERS.map((letter) => ({
            letter,
            enabled: ready ? withTerms.has(letter) : true,
        }))
    }, [ready, counts.total])

    return (
        <div ref={rootRef} data-scheme="primary" className="not-prose my-4">
            <div className="sticky top-0 z-10 bg-primary pb-2 pt-1">
                <div className="relative">
                    <IconSearch className="pointer-events-none absolute left-2.5 top-1/2 z-10 size-4 -translate-y-1/2 opacity-50" />
                    <OSInput
                        type="search"
                        name="glossary-search"
                        label="Search the glossary"
                        showLabel={false}
                        size="md"
                        width="full"
                        direction="column"
                        placeholder="Search terms and definitions…"
                        value={query}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                        onKeyDown={(e: React.KeyboardEvent) => e.key === 'Escape' && setQuery('')}
                        showClearButton={query.length > 0}
                        onClear={() => setQuery('')}
                        className="pl-9"
                    />
                </div>
            </div>

            <nav aria-label="Jump to letter" className="mt-2 flex flex-wrap gap-x-1 gap-y-1 text-sm">
                {activeLetters.map(({ letter, enabled }) =>
                    enabled ? (
                        <a
                            key={letter}
                            href={`#${letter.toLowerCase()}`}
                            className="rounded px-1.5 py-0.5 font-semibold text-red hover:bg-accent dark:text-yellow"
                        >
                            {letter}
                        </a>
                    ) : (
                        <span key={letter} className="cursor-default px-1.5 py-0.5 font-semibold opacity-30" aria-disabled="true">
                            {letter}
                        </span>
                    )
                )}
            </nav>

            <p aria-live="polite" className="mt-1 mb-0 text-sm opacity-60">
                {query.trim()
                    ? counts.visible > 0
                        ? `Showing ${counts.visible} of ${counts.total} terms`
                        : `No terms match "${query.trim()}"`
                    : `${counts.total} terms`}
            </p>
        </div>
    )
}
