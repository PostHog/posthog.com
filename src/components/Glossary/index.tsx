import React, { useEffect, useMemo, useRef, useState } from 'react'
import { IconSearch } from '@posthog/icons'
import Mark from 'mark.js'
import { Components } from 'react-markdown'
import { Heading } from 'components/Heading'
import Markdown from 'components/Markdown'
import { InlineCode } from 'components/InlineCode'
import { Blockquote } from 'components/BlockQuote'
import { OSInput } from '../OSForm'
import glossary from './glossary.json'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

interface GlossaryTerm {
    term: string
    slug: string
    /** Marked with a 🦔 in the page: the term is PostHog-specific. */
    posthog: boolean
    /** Markdown, rendered with the site-wide <Markdown> component. */
    definition: string
}

interface GlossaryData {
    /** Placeholder blockquotes (markdown) for letters with no terms, e.g. J. */
    letterNotes: Record<string, string>
    terms: GlossaryTerm[]
}

const { letterNotes, terms } = glossary as GlossaryData

/** Lowercased term + definition text (link URLs and markdown syntax stripped) used for matching. */
const haystack = (term: GlossaryTerm): string =>
    `${term.term} ${term.definition}`
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/[_`*]/g, '')
        .toLowerCase()

const markdownComponents: Partial<Components> = {
    code: ({ node, inline, ...props }) => <InlineCode {...props} />,
}

/**
 * The docs glossary: search box, A–Z nav, and the full list of terms, all rendered
 * from `glossary.json` (the single source of truth for the content). Because the
 * data is imported statically, everything is server-rendered – the page works
 * without JavaScript and the counts and letter nav are correct on first paint.
 * Filtering is plain React state over the data; sections stay mounted (visibility
 * is toggled with a `hidden` class) so anchor deep links and the right-hand
 * table-of-contents scrollspy keep working while a query is active.
 */
export default function Glossary(): JSX.Element {
    const contentRef = useRef<HTMLDivElement>(null)
    const markRef = useRef<Mark | null>(null)
    const [query, setQuery] = useState('')

    const indexed = useMemo(() => terms.map((term) => ({ ...term, haystack: haystack(term) })), [])
    const sections = useMemo(
        () =>
            LETTERS.map((letter) => ({
                letter,
                note: letterNotes[letter],
                terms: indexed.filter(
                    (term) =>
                        term.term
                            .replace(/[^a-zA-Z]/g, '')
                            .charAt(0)
                            .toUpperCase() === letter
                ),
            })),
        [indexed]
    )

    const q = query.trim().toLowerCase()
    const matches = useMemo(
        () => new Set(indexed.filter((t) => !q || t.haystack.includes(q)).map((t) => t.slug)),
        [indexed, q]
    )

    // Highlight matches inside the (component-owned) rendered content.
    useEffect(() => {
        markRef.current = markRef.current || (contentRef.current ? new Mark(contentRef.current) : null)
        markRef.current?.unmark()
        if (q) {
            markRef.current?.mark(query.trim(), { separateWordSearch: false, accuracy: 'partially' })
        }
    }, [q])

    return (
        <>
            <div data-scheme="primary" className="not-prose my-4">
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
                    {sections.map(({ letter, terms }) =>
                        terms.length > 0 ? (
                            <a
                                key={letter}
                                href={`#${letter.toLowerCase()}`}
                                className="rounded px-1.5 py-0.5 font-semibold text-red hover:bg-accent dark:text-yellow"
                            >
                                {letter}
                            </a>
                        ) : (
                            <span
                                key={letter}
                                className="cursor-default px-1.5 py-0.5 font-semibold opacity-30"
                                aria-disabled="true"
                            >
                                {letter}
                            </span>
                        )
                    )}
                </nav>

                <p aria-live="polite" className="mt-1 mb-0 text-sm opacity-60">
                    {q
                        ? matches.size > 0
                            ? `Showing ${matches.size} of ${indexed.length} terms`
                            : `No terms match "${query.trim()}"`
                        : `${indexed.length} terms`}
                </p>
            </div>

            <div ref={contentRef}>
                {sections.map(({ letter, note, terms }) => {
                    const sectionVisible = !q || terms.some((t) => matches.has(t.slug))
                    return (
                        <section key={letter} className={sectionVisible ? '' : 'hidden'}>
                            <Heading as="h2" id={letter.toLowerCase()} className="">
                                {letter}
                            </Heading>
                            {terms.map((term) => (
                                <div key={term.slug} className={matches.has(term.slug) ? '' : 'hidden'}>
                                    <Heading as="h4" id={term.slug} className="">
                                        {`${term.term}${term.posthog ? ' 🦔' : ''}`}
                                    </Heading>
                                    <Markdown components={markdownComponents}>{term.definition}</Markdown>
                                </div>
                            ))}
                            {/* Letter placeholder notes (e.g. "nothing starts with J") only make sense unfiltered. */}
                            {note && (
                                <div className={q ? 'hidden' : ''}>
                                    <Blockquote>
                                        <Markdown>{note}</Markdown>
                                    </Blockquote>
                                </div>
                            )}
                        </section>
                    )
                })}
            </div>
        </>
    )
}
