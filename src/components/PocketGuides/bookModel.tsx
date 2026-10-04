import { useCallback, useEffect, useMemo, useState } from 'react'
import { BookTab } from 'components/PocketGuides/BookReader'
import { useSelfDrivingTemplates } from 'components/SelfDrivingInbox'
import { InboxTemplate } from 'components/SelfDrivingInbox/types'
import { navigate } from 'lib/navigation'
import pocketGuidesJson from '@data/content-pocket-guides.json'
import type { PocketGuideCta, PocketGuidePages } from '~/data-layer/queries/content'

export const SHELF = { url: '/pocket-guides', label: 'Return to bookshelf' }

/** Trailing slashes come and go between content slugs and `location.pathname`. */
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
    /** Rich use case data (report, scout, watches), when this page is a use case. */
    template?: InboxTemplate
    /** The page's one action, when it isn't a scout – see bookPieces' `<Action />`. */
    cta?: BookPageCta
}

/** A non-scout chapter's CTA, authored in `pocketGuideCta:` frontmatter so the pinned bar can read it too. */
export type BookPageCta = PocketGuideCta

/** The book in reading order, built from content – folios, tabs, and turns all derive from it. */
export function useBookPages(volumeId: string): BookPageEntry[] {
    const templates = useSelfDrivingTemplates()

    return useMemo(() => {
        const byUrl = new Map(templates.map((template) => [normalizeUrl(template.url), template]))

        const pages = (pocketGuidesJson as PocketGuidePages)
            // This volume only. SKILL files and `_` starters aren't pages; no `pocketGuideOrder` keeps
            // a draft unlisted.
            .filter(
                (node) =>
                    volumeIdFromUrl(node.slug) === volumeId &&
                    !node.slug.endsWith('/SKILL') &&
                    !/\/_/.test(node.slug) &&
                    typeof node.pocketGuideOrder === 'number'
            )
            .map((node): BookPageEntry => {
                const url = normalizeUrl(node.slug)
                const order = node.pocketGuideOrder as number
                return {
                    url,
                    title: node.title ?? '',
                    shortTitle: node.shortTitle || node.title || '',
                    order,
                    isFrontMatter: order === 0,
                    template: byUrl.get(url),
                    cta: node.pocketGuideCta || undefined,
                }
            })
            .sort((a: BookPageEntry, b: BookPageEntry) => a.order - b.order)

        // Numbering runs after the front matter, so inserting a chapter renumbers the rest.
        let page = 0
        return pages.map((entry: BookPageEntry) => (entry.isFrontMatter ? entry : { ...entry, page: ++page }))
    }, [templates, volumeId])
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

/** A chapter's url segment. The front matter has none: it is the index. */
export function learnChapterSlug(entry: BookPageEntry): string {
    return entry.order === 0 ? '' : normalizeUrl(entry.url).split('/').pop() || ''
}

export function learnChapterPath(basePath: string, entry: BookPageEntry): string {
    const slug = learnChapterSlug(entry)
    return slug ? `${basePath}/${slug}` : basePath
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

/** Optional Aa size choices; the default is styled by the shared docs prose classes. */
export const FONT_SIZES = [15, 17, 19, 21] as const
const FONT_SIZE_KEY = 'pocket-guide-font-size'
const DEFAULT_FONT_SIZE = FONT_SIZES[0]

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
