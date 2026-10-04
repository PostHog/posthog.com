import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { EntryProvider, bookMdxComponents } from './bookComponents'
import { learnChapterSlug, normalizeUrl, useBookPages } from './bookModel'
import { MDXRenderer } from 'components/MDXRenderer'
import pocketGuidesJson from '@data/content-pocket-guides.json'
import type { PocketGuidePages } from '~/data-layer/queries/content'

/** A guide's content module, by url. */
const bodyFor = (url: string): string | undefined =>
    (pocketGuidesJson as PocketGuidePages).find((page) => normalizeUrl(page.slug) === normalizeUrl(url))?.id

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

    const entry = React.useMemo(() => {
        if (pages.length === 0) {
            return undefined
        }
        // A wrong url costs a click, not a dead end.
        return (chapter && pages.find((p) => learnChapterSlug(p) === chapter)) || pages[0]
    }, [pages, chapter])

    const body = entry && bodyFor(entry.url)
    if (!entry || !body) {
        return null
    }

    return (
        // ReaderView supplies the docs prose styles and padding for this surface.
        <div className="@container [&>div]:!p-0">
            <EntryProvider value={{ entry, pages, basePath }}>
                <MDXProvider components={bookMdxComponents}>
                    <MDXRenderer>{body}</MDXRenderer>
                </MDXProvider>
            </EntryProvider>
        </div>
    )
}
