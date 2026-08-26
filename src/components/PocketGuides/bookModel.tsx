import { useCallback, useEffect, useMemo, useState } from 'react'
import { graphql, navigate, useStaticQuery } from 'gatsby'

import { BookTab } from 'components/PocketGuides/BookReader'
import { useSelfDrivingTemplates } from 'components/SelfDrivingInbox'
import { InboxTemplate } from 'components/SelfDrivingInbox/types'

export const SHELF = { url: '/pocket-guides', label: 'Return to bookshelf' }

/** Trailing slashes come and go between Gatsby's slugs and `location.pathname`. */
export function normalizeUrl(url: string): string {
    return url.replace(/\/$/, '')
}

/** `/pocket-guides/<volume>/<page>` – the id that makes one reader serve every volume. */
export function volumeIdFromUrl(url: string): string {
    return normalizeUrl(url).split('/')[2] ?? ''
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
    /** Groups the Contents list into named sections. Undefined pages print in one flat list. */
    section?: string
    /** Rich use case data (report, scout, watches), when this page is a use case. */
    template?: InboxTemplate
    /** The page's one action, when it isn't a scout – see bookPieces' `<Action />`. */
    cta?: BookPageCta
}

/** A non-scout chapter's CTA, authored in `pocketGuideCta:` frontmatter so the pinned bar can read it too. */
export interface BookPageCta {
    /** `prompt` hands the reader a PostHog AI prompt; `link` sends them somewhere. */
    kind?: 'prompt' | 'link'
    label?: string
    /** The prompt itself, for `kind: prompt`. */
    prompt?: string
    /** Where the button goes. Defaults to PostHog AI for prompts. */
    href?: string
    /** One line under the button: what happens when they act. */
    note?: string
    /** What has to be true first, printed under the button with the setup command. */
    requires?: { label: string }
}

/** The book in reading order, built from content – folios, tabs, and turns all derive from it. */
export function useBookPages(volumeId: string): BookPageEntry[] {
    // Every volume in one query, filtered to this one below: `useStaticQuery` can't take a
    // variable, and the whole shelf is a few dozen pages.
    const data = useStaticQuery(graphql`
        query PocketGuideBookPagesQuery {
            # No trailing slash after the volume: its own index page is /pocket-guides/<volume>
            # exactly, and it belongs in the book.
            pages: allMdx(filter: { fields: { slug: { regex: "/^/pocket-guides//" } } }) {
                nodes {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        shortTitle
                        pocketGuideOrder
                        section
                        pocketGuideCta {
                            kind
                            label
                            prompt
                            href
                            note
                            requires {
                                label
                            }
                        }
                    }
                }
            }
        }
    `)

    const templates = useSelfDrivingTemplates()

    return useMemo(() => {
        const byUrl = new Map(templates.map((template) => [normalizeUrl(template.url), template]))

        const pages = (data?.pages?.nodes || [])
            // This volume only. SKILL files and `_` starters aren't pages; no `pocketGuideOrder` keeps
            // a draft unlisted.
            .filter(
                (node: any) =>
                    volumeIdFromUrl(node.fields.slug) === volumeId &&
                    !node.fields.slug.endsWith('/SKILL') &&
                    !/\/_/.test(node.fields.slug) &&
                    typeof node.frontmatter?.pocketGuideOrder === 'number'
            )
            .map((node: any) => {
                const url = normalizeUrl(node.fields.slug)
                const order = node.frontmatter.pocketGuideOrder
                return {
                    url,
                    title: node.frontmatter.title,
                    shortTitle: node.frontmatter.shortTitle || node.frontmatter.title,
                    order,
                    isFrontMatter: order === 0,
                    section: node.frontmatter.section || undefined,
                    template: byUrl.get(url),
                    cta: node.frontmatter.pocketGuideCta || undefined,
                }
            })
            .sort((a: BookPageEntry, b: BookPageEntry) => a.order - b.order)

        // Numbering runs after the front matter, so inserting a chapter renumbers the rest.
        let page = 0
        return pages.map((entry: BookPageEntry) => (entry.isFrontMatter ? entry : { ...entry, page: ++page }))
    }, [data, templates, volumeId])
}

/** How a page is named when you're turning toward it: the short name, same as the contents
 * tabs, so the foot nav fits on a phone instead of truncating mid-title. */
export function turnLabel(entry: BookPageEntry): string {
    return entry.shortTitle
}

/** The last numbered page, for `p. N / M` folios. */
export function pageCount(pages: BookPageEntry[]): number {
    return pages.reduce((max, entry) => Math.max(max, entry.page ?? 0), 0)
}

/** One tab per page in the book, the current one marked. */
export function bookTabs(pages: BookPageEntry[], activeUrl: string): BookTab[] {
    return pages.map((entry) => ({
        /* The full title, not `shortTitle`. This panel is a contents list rather than a row of
           tabs: it has the width for a real chapter name, and the short forms ("The number",
           "The cost") only make sense to someone who has already read the chapter they name. */
        label: entry.title,
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
