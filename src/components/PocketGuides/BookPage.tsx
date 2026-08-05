import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Explorer from 'components/Explorer'
import Link from 'components/Link'

import { EnableScoutBar } from 'components/SelfDrivingInbox/EnableScout'

import BookSpread from './BookSpread'
import { EntryProvider, bookMdxComponents, singleModeComponents } from './bookComponents'
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
    useTurnDirection,
} from './bookModel'
import { volumeById } from '../../constants/pocketGuides'

/** The page body, rendered once; `single` swaps in the figure-interleaving wrapper. */
function MdxBody({
    body,
    entry,
    pages,
    turn,
    single,
}: {
    body: string
    entry: BookPageEntry
    pages: BookPageEntry[]
    turn: 'forward' | 'backward'
    single: boolean
}): JSX.Element {
    return (
        <EntryProvider value={{ entry, pages, turn }}>
            <MDXProvider components={single ? singleModeComponents : bookMdxComponents}>
                <MDXRenderer>{body}</MDXRenderer>
            </MDXProvider>
        </EntryProvider>
    )
}

// Single-page mode below this container width: the @4xl gate (896) plus desk padding, so the
// JS switch fires before CSS could ever stack the spread figure-first.
const SINGLE_BELOW = 944

// Module scope: carries the mode across page turns so a phone never flashes the spread.
let lastKnownSingle = false

function useSinglePage(): { containerRef: (element: HTMLDivElement | null) => void; single: boolean } {
    const [single, setSingleState] = useState(lastKnownSingle)
    const setSingle = (value: boolean) => {
        lastKnownSingle = value
        setSingleState(value)
    }
    const observerRef = useRef<ResizeObserver | null>(null)

    // Callback ref: the page can render null for a frame mid-navigation, which an effect would miss.
    const containerRef = useCallback((element: HTMLDivElement | null) => {
        observerRef.current?.disconnect()
        observerRef.current = null
        if (!element || typeof ResizeObserver === 'undefined') {
            return
        }
        const observer = new ResizeObserver(([observed]) => setSingle(observed.contentRect.width < SINGLE_BELOW))
        observer.observe(element)
        observerRef.current = observer
    }, [])

    useEffect(() => () => observerRef.current?.disconnect(), [])

    return { containerRef, single }
}

interface BookPageProps {
    /** The page's slug, e.g. `/pocket-guides/self-driving/flag-debt`. */
    slug: string
    /** Compiled MDX body from the page query. */
    body: string
}

/** Any page of a pocket guide: the layout is fixed, every word comes from the MDX. */
export default function BookPage({ slug, body }: BookPageProps): JSX.Element | null {
    const volume = volumeById('self-driving')
    const pages = useBookPages()
    const { fontSize, stepFontSize } = useBookFontSize()

    const url = normalizeUrl(slug)
    const index = pages.findIndex((page) => page.url === url)
    const entry = pages[index]
    const previous = pages[index - 1]
    const next = pages[index + 1]
    const total = pageCount(pages)

    usePageTurnKeys(previous ? previous.url : SHELF.url, next?.url)
    const turnDirection = useTurnDirection(index)
    const { containerRef, single } = useSinglePage()

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
            headerBarOptions={['showBack', 'showForward']}
            // fullScreen: the book fits the window and its pages own their scroll.
            fullScreen
            // Explorer's main hardcodes bg-primary; the viewport selector re-pins the height fullScreen drops.
            className="[&_main]:bg-accent dark:[&_main]:bg-accent-dark [&_.app-scroll-viewport>div>div]:h-full"
        >
            <div ref={containerRef} className="not-prose @container h-full min-h-0 p-2 @xl:p-6">
                <BookSpread
                    single={single}
                    token={volume?.token ?? 'orange'}
                    prev={prevTurn}
                    next={nextTurn}
                    tabs={bookTabs(pages, url)}
                    shelf={SHELF}
                    fontSize={fontSize}
                    onFontSize={stepFontSize}
                    fontSizes={FONT_SIZES}
                    heads={{
                        left: (
                            <>
                                <span className="truncate">Pocket guide to self-driving</span>
                                <span className="shrink-0">Vol. {volume?.volume ?? 1}</span>
                            </>
                        ),
                        right: (
                            <>
                                <span className="truncate">{entry.title}</span>
                                {entry.page && <span className="shrink-0 tabular-nums">p. {entry.page}</span>}
                            </>
                        ),
                    }}
                    folios={{
                        left: (
                            <>
                                <Link to={prevTurn.url} className="min-w-0 truncate text-secondary hover:text-primary">
                                    ‹ {prevTurn.label}
                                </Link>
                                <span className="shrink-0">PostHog</span>
                            </>
                        ),
                        right: (
                            <>
                                {entry.page ? (
                                    <span className="shrink-0 tabular-nums">
                                        p. {entry.page} / {total}
                                    </span>
                                ) : (
                                    <span />
                                )}
                                {nextTurn && (
                                    <Link
                                        to={nextTurn.url}
                                        className="min-w-0 truncate text-right text-secondary hover:text-primary"
                                    >
                                        {nextTurn.label} ›
                                    </Link>
                                )}
                            </>
                        ),
                    }}
                    // Pinned, so a reader convinced early can act without scrolling to the end.
                    actionBar={
                        entry.template?.scout ? (
                            <EnableScoutBar scout={entry.template.scout} templateTitle={entry.template.templateTitle} />
                        ) : undefined
                    }
                >
                    <MdxBody body={body} entry={entry} pages={pages} turn={turnDirection} single={single} />
                </BookSpread>
            </div>
        </Explorer>
    )
}
