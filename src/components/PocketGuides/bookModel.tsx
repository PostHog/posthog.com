import { useCallback, useEffect, useMemo, useState } from 'react'
import { graphql, navigate, useStaticQuery } from 'gatsby'

import { BookTab } from 'components/PocketGuides/BookReader'
import { useSelfDrivingTemplates } from 'components/SelfDrivingInbox'
import { InboxTemplate } from 'components/SelfDrivingInbox/types'

export const SHELF = { url: '/pocket-guides', label: 'Return to bookshelf' }
export const VOLUME_URL = '/pocket-guides/self-driving'

/** Trailing slashes come and go between Gatsby's slugs and `location.pathname`. */
export function normalizeUrl(url: string): string {
    return url.replace(/\/$/, '')
}

export interface BookPageEntry {
    url: string
    title: string
    /** Tab label – `shortTitle` when the author wrote one, else the title. */
    shortTitle: string
    /** Reading order from frontmatter. 0 is the front matter. */
    order: number
    /** Arabic page number. Front matter is unnumbered, the way print leaves it. */
    page?: number
    isFrontMatter: boolean
    /** Rich use case data (report, scout, watches), when this page is a use case. */
    template?: InboxTemplate
}

/** The book in reading order, built from content – folios, tabs, and turns all derive from it. */
export function useBookPages(): BookPageEntry[] {
    const data = useStaticQuery(graphql`
        query PocketGuideBookPagesQuery {
            # No trailing slash in the pattern: the volume's own index page is
            # /pocket-guides/self-driving exactly, and it belongs in the book.
            pages: allMdx(filter: { fields: { slug: { regex: "/^/pocket-guides/self-driving/" } } }) {
                nodes {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        shortTitle
                        bookOrder
                    }
                }
            }
        }
    `)

    const templates = useSelfDrivingTemplates()

    return useMemo(() => {
        const byUrl = new Map(templates.map((template) => [normalizeUrl(template.url), template]))

        const pages = (data?.pages?.nodes || [])
            // SKILL files and `_` starters aren't pages; no `bookOrder` keeps a draft unlisted.
            .filter(
                (node: any) =>
                    !node.fields.slug.endsWith('/SKILL') &&
                    !/\/_/.test(node.fields.slug) &&
                    typeof node.frontmatter?.bookOrder === 'number'
            )
            .map((node: any) => {
                const url = normalizeUrl(node.fields.slug)
                const order = node.frontmatter.bookOrder
                return {
                    url,
                    title: node.frontmatter.title,
                    shortTitle: node.frontmatter.shortTitle || node.frontmatter.title,
                    order,
                    isFrontMatter: order === 0,
                    template: byUrl.get(url),
                }
            })
            .sort((a: BookPageEntry, b: BookPageEntry) => a.order - b.order)

        // Numbering runs after the front matter, so inserting a chapter renumbers the rest.
        let page = 0
        return pages.map((entry: BookPageEntry) => (entry.isFrontMatter ? entry : { ...entry, page: ++page }))
    }, [data, templates])
}

/** How a page is named when you're turning toward it. Authors own the front matter's name. */
export function turnLabel(entry: BookPageEntry): string {
    return entry.isFrontMatter ? entry.shortTitle : entry.title
}

/** The last numbered page, for `p. N / M` folios. */
export function pageCount(pages: BookPageEntry[]): number {
    return pages.reduce((max, entry) => Math.max(max, entry.page ?? 0), 0)
}

/** One tab per page in the book, the current one marked. */
export function bookTabs(pages: BookPageEntry[], activeUrl: string): BookTab[] {
    return pages.map((entry) => ({
        label: entry.shortTitle,
        url: entry.url,
        number: entry.page ? String(entry.page).padStart(2, '0') : undefined,
        active: normalizeUrl(entry.url) === normalizeUrl(activeUrl),
    }))
}

/** Reading size, e-reader style: one root size scales the whole em-based page. The default
 * matches the site's body text (16px, `.article-content`'s text-base). */
export const FONT_SIZES = [16, 18, 20, 22] as const
const FONT_SIZE_KEY = 'pocket-guide-font-size'
const DEFAULT_FONT_SIZE = 16

export function useBookFontSize(): { fontSize: number; stepFontSize: (delta: number) => void } {
    // SSR the default, adopt the saved choice after mount – localStorage in render would mismatch.
    const [fontSize, setSize] = useState<number>(DEFAULT_FONT_SIZE)

    useEffect(() => {
        const saved = Number(window.localStorage.getItem(FONT_SIZE_KEY))
        if (FONT_SIZES.includes(saved as (typeof FONT_SIZES)[number])) {
            setSize(saved)
        }
    }, [])

    // Functional update: two quick clicks would otherwise read the same value and step once.
    const stepFontSize = useCallback((delta: number) => {
        setSize((current) => {
            const index = FONT_SIZES.indexOf(current as (typeof FONT_SIZES)[number])
            const next = FONT_SIZES[Math.min(Math.max(index + delta, 0), FONT_SIZES.length - 1)]
            window.localStorage.setItem(FONT_SIZE_KEY, String(next))
            return next
        })
    }, [])

    return { fontSize, stepFontSize }
}

/** Turn the page with the arrow keys, the way a reader would expect a book to behave. */
export function usePageTurnKeys(prevUrl?: string, nextUrl?: string): void {
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.metaKey || event.ctrlKey || event.altKey) return
            const target = event.target as HTMLElement | null
            if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return
            if (event.key === 'ArrowLeft' && prevUrl) navigate(prevUrl)
            if (event.key === 'ArrowRight' && nextUrl) navigate(nextUrl)
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [prevUrl, nextUrl])
}
