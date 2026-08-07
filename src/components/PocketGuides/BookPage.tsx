import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Explorer from 'components/Explorer'

import { EnableScoutBar } from 'components/SelfDrivingInbox/EnableScout'

import BookReader from './BookReader'
import { EntryProvider, bookMdxComponents } from './bookComponents'
import {
    BookPageEntry,
    FONT_SIZES,
    SHELF,
    bookTabs,
    normalizeUrl,
    pageCount,
    turnLabel,
    useBookFontSize,
    useBookPages,
    usePageTurnKeys,
} from './bookModel'

/** The page body: the reader's wrapper interleaves each figure after the block citing it. */
function MdxBody({ body, entry, pages }: { body: string; entry: BookPageEntry; pages: BookPageEntry[] }): JSX.Element {
    return (
        <EntryProvider value={{ entry, pages }}>
            <MDXProvider components={bookMdxComponents}>
                <MDXRenderer>{body}</MDXRenderer>
            </MDXProvider>
        </EntryProvider>
    )
}

interface BookPageProps {
    /** The page's slug, e.g. `/pocket-guides/self-driving/flag-debt`. */
    slug: string
    /** Compiled MDX body from the page query. */
    body: string
}

/** Any page of a pocket guide: the layout is fixed, every word comes from the MDX. */
export default function BookPage({ slug, body }: BookPageProps): JSX.Element | null {
    // slug is `/pocket-guides/<volumeId>/...` – the second segment names the volume.
    const volumeId = slug.split('/')[2]
    const pages = useBookPages(volumeId)
    const { fontSize, stepFontSize } = useBookFontSize()

    const url = normalizeUrl(slug)
    const index = pages.findIndex((page) => page.url === url)
    const entry = pages[index]
    const previous = pages[index - 1]
    const next = pages[index + 1]
    const total = pageCount(pages)

    usePageTurnKeys(previous ? previous.url : SHELF.url, next?.url)

    if (!entry) {
        return null
    }

    const prevTurn = previous
        ? { url: previous.url, label: turnLabel(previous) }
        : { url: SHELF.url, label: SHELF.label }
    const nextTurn = next ? { url: next.url, label: turnLabel(next) } : undefined

    return (
        <Explorer
            template="generic"
            slug={url.replace(/^\//, '')}
            title={entry.title}
            showTitle={false}
            showAddressBar={false}
            // No header bar: like the docs reader, the page is the whole window and the OS
            // window buttons float over it. Empty options keep HeaderBar from rendering.
            headerBarOptions={[]}
            // fullScreen: the book fits the window and its page owns its scroll.
            fullScreen
            // The window itself is the page – no desk. The viewport selector re-pins the height fullScreen drops.
            className="[&_.app-scroll-viewport>div>div]:h-full"
        >
            <div className="not-prose @container h-full min-h-0">
                <BookReader
                    prev={prevTurn}
                    next={nextTurn}
                    tabs={bookTabs(pages, url)}
                    shelf={SHELF}
                    position={{ page: entry.page, total }}
                    fontSize={fontSize}
                    onFontSize={stepFontSize}
                    fontSizes={FONT_SIZES}
                    // Pinned, so a reader convinced early can act without scrolling to the end.
                    actionBar={
                        entry.template?.scout ? (
                            <EnableScoutBar scout={entry.template.scout} templateTitle={entry.template.templateTitle} />
                        ) : undefined
                    }
                >
                    <MdxBody body={body} entry={entry} pages={pages} />
                </BookReader>
            </div>
        </Explorer>
    )
}
