// Build-time data for the page components in src/views that need page-specific data. Keyed by
// module path; each function returns the `data` prop the view reads.
import { getEntry } from 'astro:content'
import { blogIndexData, hogbookData, onlyHogsData, sectionIndexData } from '../content/posts'
import { changelogData, merchData, researchData, selfDrivingData, wipData } from '../content/viewQueries'

type ViewDataLoader = () => unknown | Promise<unknown>

/** `{ body }` for a view that renders one entry of the `pages` collection. */
const pageBody = (id: string) => async () => {
    const entry = await getEntry('pages', id)
    if (!entry?.filePath) throw new Error(`viewData: no pages entry "${id}"`)
    return { body: `/${entry.filePath}` }
}

const loaders: Record<string, ViewDataLoader> = {
    '/src/views/changelog/index.tsx': changelogData,
    '/src/views/self-driving/index.tsx': selfDrivingData,
    '/src/views/merch.tsx': merchData,
    '/src/views/research.tsx': researchData,
    '/src/views/wip.tsx': wipData,
    '/src/views/about.tsx': pageBody('about'),
    '/src/views/media.tsx': pageBody('media-contents'),
    '/src/views/blog.tsx': blogIndexData,
    '/src/views/compare.tsx': () => sectionIndexData('compare'),
    '/src/views/newsletter.tsx': () => sectionIndexData('newsletter'),
    '/src/views/sparks-joy/onlyhogs/index.tsx': onlyHogsData,
    '/src/views/hogbook.tsx': hogbookData,
}

export async function viewData(module: string): Promise<unknown> {
    return (await loaders[module]?.()) ?? {}
}
