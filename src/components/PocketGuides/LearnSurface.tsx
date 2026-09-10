import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { graphql, useStaticQuery } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import { EntryProvider, bookMdxComponents } from './bookComponents'
import { FONT_SIZES, learnChapterSlug, normalizeUrl, useBookPages } from './bookModel'

/** `BookReader`'s starting size, from the book's own scale so they cannot drift. */
const BOOK_BASE_FONT_SIZE = FONT_SIZES[0]

interface LearnBodyNode {
    body: string
    fields: { slug: string }
}

/** Every guide body by url; `useStaticQuery` takes no variables, so read the whole shelf. */
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

interface LearnSurfaceProps {
    volumeId: string
    /** Empty or unknown falls back to the front matter. */
    chapter?: string
    /** This surface's route root, so in-page links stay in the Learn tab. */
    basePath: string
}

/** One chapter of a volume, rendered in the docs reader. */
export default function LearnSurface({ volumeId, chapter, basePath }: LearnSurfaceProps): JSX.Element | null {
    const pages = useBookPages(volumeId)
    const bodies = useBookBodies()

    const entry = React.useMemo(() => {
        if (pages.length === 0) {
            return undefined
        }
        // A wrong url costs a click, not a dead end.
        return (chapter && pages.find((p) => learnChapterSlug(p) === chapter)) || pages[0]
    }, [pages, chapter])

    const body = entry && bodies.get(normalizeUrl(entry.url))
    if (!entry || !body) {
        return null
    }

    return (
        // `not-prose`: the book styles its own. `!p-0`: the docs column already pads.
        <div className="not-prose @container [&>div]:!p-0" style={{ fontSize: BOOK_BASE_FONT_SIZE }}>
            <EntryProvider value={{ entry, pages, basePath }}>
                <MDXProvider components={bookMdxComponents}>
                    <MDXRenderer>{body}</MDXRenderer>
                </MDXProvider>
            </EntryProvider>
        </div>
    )
}
