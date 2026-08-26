import React, { useCallback, useEffect, useRef, useState } from 'react'

import BrowserFrame from 'components/Instrumentation/BrowserFrame'
import UnterSite from 'components/Instrumentation/Unter'
import type { UnterPageId } from 'components/Instrumentation/overlay/types'
import 'components/Instrumentation/unter.css'

/**
 * Width the site is laid out at before being scaled down. Unter's container queries resolve
 * against this, so the thumbnail shows the desktop layout rather than the one-column layout
 * a 200px-wide render would produce.
 */
const LAYOUT_WIDTH = 1024

/** Rendered width of the thumbnail. Narrow on purpose: an Unter page is roughly twice as
 *  tall as it is wide, so every extra pixel of width costs two of height. */
const PANEL_WIDTH = 150

/**
 * The thumbnail, memoized on the page alone, so lighting a different region never re-renders
 * the site underneath it.
 */
const ScaledSite = React.memo(function ScaledSite({
    page,
    scale,
    frameRef,
    siteRef,
}: {
    page: UnterPageId
    scale: number
    frameRef: React.MutableRefObject<HTMLDivElement | null>
    siteRef: React.MutableRefObject<HTMLDivElement | null>
}): JSX.Element {
    return (
        <div
            style={{
                width: LAYOUT_WIDTH,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                pointerEvents: 'none',
            }}
        >
            <BrowserFrame bodyRef={frameRef} chrome={false}>
                <div className="unter-root un-site" ref={siteRef}>
                    <UnterSite page={page} onNavigate={() => undefined} onToggleSurvey={() => undefined} />
                </div>
            </BrowserFrame>
        </div>
    )
})

/**
 * The chapter's whole Unter page as a thumbnail, with the region a figure crops picked out.
 *
 * Figures are crops descending one page, which tells the reader what a touchpoint is but not
 * where on the page it lives. This is the missing half, and it renders as the body of a hover
 * tooltip: it only exists while the cursor is on the figure, so it costs no layout at all.
 *
 * It measures its own DOM rather than taking coordinates from the figure. The figure renders
 * the site at reading-column width and this renders it at desktop width, so the same element
 * sits at different offsets in the two, and only a local measurement can be right.
 */
export default function UnterMinimap({ page, focus }: { page: UnterPageId; focus: string }): JSX.Element {
    const frameRef = useRef<HTMLDivElement | null>(null)
    const siteRef = useRef<HTMLDivElement | null>(null)
    const [box, setBox] = useState<{ top: number; height: number } | null>(null)
    const [siteHeight, setSiteHeight] = useState(0)

    /* Everything here is measured after the transform, because getBoundingClientRect on a
       scaled element already reports visual pixels. Mixing a layout `scrollHeight` for the
       frame with a visual rect for the box put the highlight at a fifth of its real offset. */
    const measure = useCallback(() => {
        const site = siteRef.current
        if (!site) return
        const sb = site.getBoundingClientRect()
        setSiteHeight((prev) => (Math.abs(prev - sb.height) < 0.5 ? prev : sb.height))
        const el = site.querySelector<HTMLElement>(`[data-unter-id="${focus}"]`)
        if (!el) {
            setBox((prev) => (prev === null ? prev : null))
            return
        }
        const r = el.getBoundingClientRect()
        const next = { top: r.top - sb.top, height: r.height }
        setBox((prev) =>
            prev && Math.abs(prev.top - next.top) < 0.5 && Math.abs(prev.height - next.height) < 0.5 ? prev : next
        )
    }, [focus])

    useEffect(() => {
        measure()
        const site = siteRef.current
        if (!site) return
        const observer = new ResizeObserver(measure)
        observer.observe(site)
        return () => observer.disconnect()
    }, [measure, page])

    const scale = PANEL_WIDTH / LAYOUT_WIDTH

    return (
        <span className="block" style={{ width: PANEL_WIDTH }}>
            <span
                className="relative block overflow-hidden rounded border border-primary bg-primary"
                style={{ height: siteHeight || 280 }}
            >
                <ScaledSite page={page} scale={scale} frameRef={frameRef} siteRef={siteRef} />
                {/* Everything outside the region dims, so the eye goes to the lit part the way
                    the Android crop UI works. */}
                {box && (
                    <>
                        <span
                            className="absolute inset-x-0 top-0 block bg-primary/70"
                            style={{ height: Math.max(0, box.top) }}
                        />
                        <span
                            className="absolute inset-x-0 bottom-0 block bg-primary/70"
                            style={{ top: box.top + box.height }}
                        />
                        <span
                            className="absolute inset-x-0 block border-y-2 border-orange"
                            style={{ top: box.top, height: box.height }}
                        />
                    </>
                )}
            </span>
        </span>
    )
}
