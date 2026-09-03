import { MutableRefObject, useCallback, useEffect, useMemo, useState } from 'react'
import { Annotation } from './types'

export interface MarkerPosition {
    annotation: Annotation
    /** Position within the measured container, in CSS pixels. */
    x: number
    y: number
    /** The target element's box, for drawing the selection outline. */
    box: { left: number; top: number; width: number; height: number }
}

interface AnnotationPositions {
    /** Targets inside the scrolling site content, which scroll with the page. */
    content: MarkerPosition[]
    /** Targets pinned to the browser frame rather than the scrolling page (the sticky nav, the popover survey). */
    frame: MarkerPosition[]
}

const EMPTY: AnnotationPositions = { content: [], frame: [] }

/** True when the element (or an ancestor up to `root`) is sticky or fixed. */
const isStuck = (el: HTMLElement, root: HTMLElement): boolean => {
    let node: HTMLElement | null = el
    while (node && node !== root) {
        const { position } = getComputedStyle(node)
        if (position === 'sticky' || position === 'fixed') return true
        node = node.parentElement
    }
    return false
}

/**
 * Measures where each annotation's marker belongs, once per layout change.
 *
 * Markers are rendered *inside* the container they were measured against, so
 * scrolling moves them with their target for free: no per-frame tracking, and
 * nothing can drift out of sync. Positions are relative to the container's
 * padding box, and re-measured when the layout can have changed: annotations
 * swap (page switch), either container resizes, or the reader interacts with
 * the demo (opening an FAQ row, retrying the coverage map).
 */
export default function useAnnotationPositions(
    annotations: Annotation[],
    contentRef: MutableRefObject<HTMLElement | null>,
    frameRef: MutableRefObject<HTMLElement | null>,
    /** Bump to force a re-measure after something off-layout changes (a widget opening). */
    revision = 0
): AnnotationPositions {
    const [positions, setPositions] = useState<AnnotationPositions>(EMPTY)

    const measure = useCallback(() => {
        const content = contentRef.current
        const frame = frameRef.current
        if (!content || !frame) {
            setPositions(EMPTY)
            return
        }
        const contentRect = content.getBoundingClientRect()
        const frameRect = frame.getBoundingClientRect()
        const next: AnnotationPositions = { content: [], frame: [] }

        annotations.forEach((annotation) => {
            const el = frame.querySelector<HTMLElement>(`[data-unter-id="${annotation.target}"]`)
            if (!el) return
            const r = el.getBoundingClientRect()
            if (r.width === 0 && r.height === 0) return
            // Floating widgets (chat, survey) sit outside the scrolling content, and
            // sticky elements (the demo's nav) hold their screen position while it
            // scrolls, so both are measured against the frame instead.
            const inContent = content.contains(el) && !isStuck(el, content)
            const origin = inContent ? contentRect : frameRect
            const left = r.left - origin.left
            const top = r.top - origin.top
            ;(inContent ? next.content : next.frame).push({
                annotation,
                x: left + r.width * annotation.dx,
                y: top + r.height * annotation.dy,
                box: { left, top, width: r.width, height: r.height },
            })
        })

        setPositions(next)
    }, [annotations, contentRef, frameRef])

    useEffect(() => {
        const content = contentRef.current
        const frame = frameRef.current
        if (!content || !frame) return

        let raf: number | null = null
        const schedule = () => {
            if (raf !== null) cancelAnimationFrame(raf)
            // One frame late, so measurement runs after layout settles.
            raf = requestAnimationFrame(() => {
                raf = null
                measure()
            })
        }

        schedule()

        const observer = new ResizeObserver(schedule)
        observer.observe(content)
        observer.observe(frame)

        // Anything the reader clicks inside the demo can change its layout.
        frame.addEventListener('click', schedule, true)
        window.addEventListener('resize', schedule)

        return () => {
            if (raf !== null) cancelAnimationFrame(raf)
            observer.disconnect()
            frame.removeEventListener('click', schedule, true)
            window.removeEventListener('resize', schedule)
        }
    }, [measure, contentRef, frameRef, revision])

    // Measurement lands a frame late, so for one paint after a page switch `positions`
    // still describes the previous page. The caller's marker numbers have already
    // changed, so those markers would render as empty circles at stale coordinates.
    // Dropping anything not in the current set is what keeps the two in step.
    return useMemo(
        () => ({
            content: positions.content.filter((p) => annotations.includes(p.annotation)),
            frame: positions.frame.filter((p) => annotations.includes(p.annotation)),
        }),
        [positions, annotations]
    )
}
