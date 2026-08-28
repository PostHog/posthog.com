import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { graphql, useStaticQuery } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import { EntryProvider, bookMdxComponents } from './bookComponents'
import { BookPageEntry, FONT_SIZES, normalizeUrl, useBookPages } from './bookModel'

/** `BookReader`'s starting size, read from the book's own scale so the two cannot drift. */
const BOOK_BASE_FONT_SIZE = FONT_SIZES[0]

/** The url segment a chapter is reached at. The volume's front matter has none: it is the index. */
export function learnChapterSlug(entry: BookPageEntry): string {
    return entry.order === 0 ? '' : normalizeUrl(entry.url).split('/').pop() || ''
}

/** `/docs/<product>/learn` for the front matter, `/docs/<product>/learn/<chapter>` for the rest. */
export function learnChapterPath(basePath: string, entry: BookPageEntry): string {
    const slug = learnChapterSlug(entry)
    return slug ? `${basePath}/${slug}` : basePath
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

interface LearnSurfaceProps {
    volumeId: string
    /** Chapter to show. Empty or unknown falls back to the volume's front matter. */
    chapter?: string
}

/** One chapter of a volume, in the docs reader. A whole volume in one scroll is not how docs are read. */
export default function LearnSurface({ volumeId, chapter }: LearnSurfaceProps): JSX.Element | null {
    const pages = useBookPages(volumeId)
    const bodies = useBookBodies()

    const entry = React.useMemo(() => {
        if (pages.length === 0) {
            return undefined
        }
        // An unknown chapter falls back to the front matter: a wrong url costs a click, not a dead end.
        return (chapter && pages.find((p) => learnChapterSlug(p) === chapter)) || pages[0]
    }, [pages, chapter])

    const body = entry && bodies.get(normalizeUrl(entry.url))
    if (!entry || !body) {
        return null
    }

    return (
        // `not-prose` because the book styles its own; `!p-0` drops a page margin the docs column already gives.
        <div className="not-prose @container [&>div]:!p-0" style={{ fontSize: BOOK_BASE_FONT_SIZE }}>
            <EntryProvider value={{ entry, pages }}>
                <MDXProvider components={bookMdxComponents}>
                    <MDXRenderer>{body}</MDXRenderer>
                </MDXProvider>
            </EntryProvider>
        </div>
    )
}
