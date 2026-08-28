import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { graphql, useStaticQuery } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import { EntryProvider, bookMdxComponents } from './bookComponents'
import { BookPageEntry, FONT_SIZES, normalizeUrl, useBookPages } from './bookModel'

/** `BookReader`'s starting size, read from the book's own scale so the two cannot drift. */
const BOOK_BASE_FONT_SIZE = FONT_SIZES[0]

/** The anchor a Learn menu item scrolls to. Front matter is `overview`, which `ProductNav` pins to the top. */
export function learnSectionId(entry: BookPageEntry): string {
    return entry.order === 0 ? 'overview' : normalizeUrl(entry.url).split('/').pop() || 'overview'
}

interface LearnBodyNode {
    body: string
    fields: { slug: string }
}

/** Every guide body by url. `useStaticQuery` takes no variables, so read the shelf and filter below. */
function useBookBodies(): Map<string, string> {
    const data = useStaticQuery(graphql`
        query PocketGuideLearnBodiesQuery {
            pages: allMdx(filter: { fields: { slug: { regex: "/^/pocket-guides//" } } }) {
                nodes {
                    body
                    fields {
                        slug
                    }
                }
            }
        }
    `)
    return React.useMemo(() => {
        const map = new Map<string, string>()
        ;(data?.pages?.nodes ?? []).forEach((node: LearnBodyNode) => {
            if (node?.fields?.slug) {
                map.set(normalizeUrl(node.fields.slug), node.body)
            }
        })
        return map
    }, [data])
}

/** A volume rendered in the docs reader. `ReaderWrapper` already emits one reflowing column, so it just fits. */
export default function LearnSurface({ volumeId }: { volumeId: string }): JSX.Element | null {
    const pages = useBookPages(volumeId)
    const bodies = useBookBodies()

    if (pages.length === 0) {
        return null
    }

    return (
        // `not-prose`: the book styles its own prose. The pinned size keeps its em and rem spacing in step.
        <div className="not-prose @container" style={{ fontSize: BOOK_BASE_FONT_SIZE }}>
            {pages.map((entry, index) => {
                const body = bodies.get(normalizeUrl(entry.url))
                if (!body) {
                    return null
                }
                return (
                    <section
                        key={entry.url}
                        id={learnSectionId(entry)}
                        // Undo per-page framing here, not in `ReaderWrapper`, which the book still needs:
                        // `> div` is its page container (80px of stacked padding), `aside` is SeeAlso's
                        // `mt-12` (what made boundaries uneven), and `mt-16` is the one deliberate gap.
                        className={`scroll-mt-20 [&>div]:!p-0 [&>div>aside]:!mt-8 ${index === 0 ? '' : 'mt-16'}`}
                    >
                        <EntryProvider value={{ entry, pages }}>
                            <MDXProvider components={bookMdxComponents}>
                                <MDXRenderer>{body}</MDXRenderer>
                            </MDXProvider>
                        </EntryProvider>
                    </section>
                )
            })}
        </div>
    )
}
