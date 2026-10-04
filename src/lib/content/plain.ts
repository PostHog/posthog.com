// Plain pages (src/templates/Plain.tsx): the loose pages in the `pages` collection, such as /faq and
// /pricing/agent-estimates, at their own URL.
import { type CollectionEntry, getCollection } from 'astro:content'
import { contentById, excerpt } from '../../data-layer/content'
import { imageNode } from '../../data-layer/images'
import { entryPath, isViewPath } from '../routes/views'

export type PlainEntry = CollectionEntry<'pages'>

export interface PlainPage {
    /** Content module key for MDXRenderer. */
    body: string
    title: string
    excerpt: string
    showTitle: boolean
    seo?: { metaTitle?: string; metaDescription?: string }
    featuredImage: string | null
    noindex: boolean
    /** Frontmatter `images`, in the shape the MDX reads (`getImage(props.images[0])`). */
    images: ReturnType<typeof imageNode>[]
}

// Files that a view renders itself (src/views/about.tsx, src/views/media.tsx).
const RENDERED_BY_VIEWS = ['about', 'media-contents']

/** The entries that get a Plain page: titled, not rendered by a page component, and not at a view's URL. */
export async function plainEntries(): Promise<PlainEntry[]> {
    return (await getCollection('pages')).filter(
        (entry) =>
            entry.data.title &&
            entry.data.template !== 'custom' &&
            !RENDERED_BY_VIEWS.includes(entry.id) &&
            !isViewPath(entryPath('', entry.id))
    )
}

export function plainPage(entry: PlainEntry): PlainPage {
    const { data } = entry
    const body = `/${entry.filePath}`
    const node = contentById(body)
    return {
        body,
        title: data.title ?? '',
        excerpt: node ? excerpt(node, 150) : '',
        showTitle: !!data.showTitle,
        seo: data.seo,
        featuredImage: data.featuredImage ?? null,
        noindex: !!(data.isInFrame || data.noindex),
        images: (data.images ?? []).map(imageNode),
    }
}
