import { useMemo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { useSelfDrivingTemplates } from 'components/SelfDrivingInbox'
import {
    pocketGuideDestination,
    pocketGuideSourceVolume,
    POCKET_GUIDE_VOLUMES,
    pocketGuideUrl,
} from '../../constants/pocketGuides'
import { InboxTemplate } from 'components/SelfDrivingInbox/types'

/** Trailing slashes come and go between Gatsby's slugs and `location.pathname`. */
export function normalizeUrl(url: string): string {
    return url.replace(/\/$/, '')
}

/** Resolve either an authored source identity or a public reader URL to its volume. */
export function volumeIdFromUrl(url: string): string {
    const sourceVolume = pocketGuideSourceVolume(url)
    if (sourceVolume) return sourceVolume.id
    const path = normalizeUrl(url).split(/[?#]/)[0]
    return (
        POCKET_GUIDE_VOLUMES.find(
            (volume) => path === pocketGuideUrl(volume) || path.startsWith(`${pocketGuideUrl(volume)}/`)
        )?.id ?? ''
    )
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
    /** Contents heading this page sits under, from `section:` frontmatter. */
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
            # Include the source index as well as chapters; public routes are mapped below.
            pages: allMdx(filter: { fields: { slug: { regex: "/^/learn/[^/]+/pocket-guide/" } } }) {
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
                const url = normalizeUrl(pocketGuideDestination(node.fields.slug))
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

/** A chapter's url segment. The front matter has none: it is the index. */
export function learnChapterSlug(entry: BookPageEntry): string {
    return entry.order === 0 ? '' : normalizeUrl(entry.url).split('/').pop() || ''
}

/** The pages of one `section:`, for a Learn tab that teaches only part of a book. */
export function sectionPages(pages: BookPageEntry[], section?: string): BookPageEntry[] {
    return section ? pages.filter((page) => page.section === section) : pages
}

export function learnChapterPath(basePath: string, entry: BookPageEntry): string {
    const slug = learnChapterSlug(entry)
    return slug ? `${basePath}/${slug}` : basePath
}
