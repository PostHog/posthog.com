// App pages (/apps/<slug>): contents/apps.
import type { CollectionEntry } from 'astro:content'
import { contentById, contentBySlug, excerpt } from '../../data-layer/content'
import { entryPath } from '../routes/views'

export type AppEntry = CollectionEntry<'apps'>

export interface AppProps {
    /** Content module key for MDXRenderer. */
    body: string
    slug: string
    title: string
    description: string
    thumbnail?: string
    filters: { type?: string[]; maintainer?: string }
    /** The docs page the app links to, with its headings for the `<Documentation />` shortcode. */
    documentation: { slug: string; headings: { value: string }[] } | null
    /** Every app, for the sidebar menu. */
    apps: { title: string; slug: string }[]
}

interface AppData {
    title?: string
    description?: string | null
    thumbnail?: string
    documentation?: string
    filters?: AppProps['filters']
}

export function appPage(entry: AppEntry, entries: AppEntry[]): AppProps {
    const data = entry.data as AppData
    const body = `/${entry.filePath}`
    const node = contentById(body)
    const documentation = data.documentation ? contentBySlug(data.documentation) : undefined
    return {
        body,
        slug: entryPath('/apps', entry.id),
        title: data.title ?? '',
        description: data.description || (node ? excerpt(node, 150) : ''),
        thumbnail: data.thumbnail,
        filters: data.filters ?? {},
        documentation: documentation
            ? { slug: documentation.fields.slug, headings: documentation.headings.map(({ value }) => ({ value })) }
            : null,
        apps: entries.map((app) => ({ title: (app.data as AppData).title ?? '', slug: entryPath('/apps', app.id) })),
    }
}
