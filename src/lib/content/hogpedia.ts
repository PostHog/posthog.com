// Hogpedia (/hogpedia/*): one page per article and talk page, plus one page per category the
// articles declare. The Main Page and the meta pages are views in src/views/hogpedia.
import type { CollectionEntry } from 'astro:content'
import { buildSectionSources, primarySource } from '../../components/Hogpedia/context'
import { HOGPEDIA_RESERVED, categorySlug } from '../../components/Hogpedia/categories'
import { contentById, excerpt } from '../../data-layer/content'
import { gitHistory } from './people'
import { tableOfContents, type TocItem } from './readerPage'

export type HogpediaEntry = CollectionEntry<'hogpedia'>
type HogpediaMeta = HogpediaEntry['data']['hogpedia']

export interface HogpediaArticleProps {
    /** Content module key for MDXRenderer. */
    body: string
    /** URL path, e.g. /hogpedia/posthog or /hogpedia/talk/posthog. */
    slug: string
    title: string
    /** The description, else the start of the text. */
    summary: string
    /** The file path under contents/, for the GitHub links. */
    filePath: string
    meta: Pick<HogpediaMeta, 'notices' | 'categories' | 'seeAlso' | 'infobox' | 'references' | 'external'>
    tableOfContents: TocItem[]
    hasTalkPage: boolean
    /** Heading anchor → the first-party page that section cites (see `buildSectionSources`). */
    sectionSources: Record<string, string>
    primarySource?: string
    /** The date of the last commit. Unset without git metadata: never fall back to the build date. */
    lastModified?: string
}

export interface HogpediaCategoryProps {
    category: string
    articles: { slug: string; title: string; description?: string | null }[]
}

export const hogpediaPath = (entry: HogpediaEntry) => `/hogpedia/${entry.id}`

/** Throws when an article would shadow a meta page in src/views/hogpedia. */
export function assertNotReserved(entry: HogpediaEntry): void {
    if (HOGPEDIA_RESERVED.some((reserved) => entry.id === reserved)) {
        throw new Error(
            `${entry.filePath} collides with a Hogpedia meta page. Reserved names: ${HOGPEDIA_RESERVED.join(', ')}`
        )
    }
}

const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

export function hogpediaArticle(entry: HogpediaEntry, ids: Set<string>): HogpediaArticleProps {
    const filePath = entry.filePath ?? ''
    const node = contentById(`/${filePath}`)
    const { notices, categories, seeAlso, infobox, references, external } = entry.data.hogpedia
    const lastCommit = gitHistory(filePath).commits[0]
    return {
        body: `/${filePath}`,
        slug: hogpediaPath(entry),
        title: entry.data.title,
        summary: entry.data.description || (node ? excerpt(node, 165) : ''),
        filePath: filePath.replace(/^contents\//, ''),
        meta: { notices, categories, seeAlso, infobox, references, external },
        tableOfContents: tableOfContents(entry),
        hasTalkPage: entry.id.startsWith('talk/') || ids.has(`talk/${entry.id}`),
        sectionSources: buildSectionSources(node?.rawBody, references),
        primarySource: primarySource(references),
        lastModified: lastCommit?.date ? formatDate(lastCommit.date) : undefined,
    }
}

/** Every category the articles declare, with its articles (talk pages left out) sorted by title. */
export function hogpediaCategories(entries: HogpediaEntry[]): { slug: string; props: HogpediaCategoryProps }[] {
    const byCategory = new Map<string, HogpediaEntry[]>()
    for (const entry of entries) {
        for (const category of entry.data.hogpedia.categories ?? []) {
            byCategory.set(category, [...(byCategory.get(category) ?? []), entry])
        }
    }
    return [...byCategory].map(([category, members]) => ({
        slug: categorySlug(category),
        props: {
            category,
            articles: members
                .filter((entry) => !entry.id.startsWith('talk/'))
                .sort((a, b) => (a.data.title < b.data.title ? -1 : a.data.title > b.data.title ? 1 : 0))
                .map((entry) => ({
                    slug: hogpediaPath(entry),
                    title: entry.data.title,
                    description: entry.data.description,
                })),
        },
    }))
}
