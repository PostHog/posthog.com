import { MutableRefObject, useEffect } from 'react'
import { PRODUCTS } from './products'
import { Annotation } from './types'

export interface AnnotationNodes {
    dot: HTMLElement | null
    chip: HTMLElement | null
}

interface AnchorTrackingOptions {
    enabled: boolean
    annotations: Annotation[]
    /** Coordinate origin and query root: the browser-frame body. Never scrolls. */
    stageRef: MutableRefObject<HTMLElement | null>
    nodesRef: MutableRefObject<Map<string, AnnotationNodes>>
    legendRef: MutableRefObject<HTMLElement | null>
    outlineRef: MutableRefObject<HTMLElement | null>
    popoverRef: MutableRefObject<HTMLElement | null>
    hoverRef: MutableRefObject<Annotation | null>
    openRef: MutableRefObject<Annotation | null>
}

interface Box {
    x: number
    y: number
    w: number
    h: number
}

const rectsTouch = (x: number, y: number, w: number, h: number, q: Box, pad: number): boolean =>
    x < q.x + q.w + pad && x + w > q.x - pad && y < q.y + q.h + pad && y + h > q.y - pad

// Height of the sticky Snuffl topnav — anchors that scroll behind it hide.
const NAV_EDGE = 76
const EDGE_PAD = 8

/**
 * One requestAnimationFrame pass per frame keeps dots, chips, the target
 * outline, and the open popover glued to their anchor elements through
 * scrolling, window drags/resizes, and reflows. Both the stage rect and the
 * target rects are read in viewport space, so subtracting them cancels every
 * offset — no scroll or resize listeners needed.
 *
 * Positions are written straight to the DOM nodes (no React state): the loop
 * costs ~24 getBoundingClientRect calls per frame and only runs while the
 * overlay is on.
 */
export default function useAnchorTracking({
    enabled,
    annotations,
    stageRef,
    nodesRef,
    legendRef,
    outlineRef,
    popoverRef,
    hoverRef,
    openRef,
}: AnchorTrackingOptions): void {
    useEffect(() => {
        if (!enabled) return

        const targetCache = new Map<string, HTMLElement>()
        const resolveTarget = (root: HTMLElement, targetId: string): HTMLElement | null => {
            const cached = targetCache.get(targetId)
            if (cached && cached.isConnected) return cached
            const el = root.querySelector<HTMLElement>(`[data-snuffl-id="${targetId}"]`)
            if (el) targetCache.set(targetId, el)
            else targetCache.delete(targetId)
            return el
        }

        let rafId: number | null = null

        const track = () => {
            rafId = requestAnimationFrame(track)
            const stage = stageRef.current
            if (!stage) return
            const stageRect = stage.getBoundingClientRect()
            const sw = stageRect.width
            const sh = stageRect.height

            let legendBox: Box | null = null
            const legendEl = legendRef.current
            if (legendEl) {
                const lr = legendEl.getBoundingClientRect()
                legendBox = { x: lr.left - stageRect.left, y: lr.top - stageRect.top, w: lr.width, h: lr.height }
            }

            const anchors = new Map<string, { x: number; y: number }>()
            const pending: {
                annotation: Annotation
                chip: HTMLElement
                cx: number
                cy: number
                cw: number
                ch: number
            }[] = []

            annotations.forEach((annotation) => {
                const nodes = nodesRef.current.get(annotation.id)
                if (!nodes?.dot || !nodes?.chip) return
                const el = resolveTarget(stage, annotation.target)
                let x = 0
                let y = 0
                let gone = !el
                if (el) {
                    const r = el.getBoundingClientRect()
                    gone = r.width === 0 && r.height === 0
                    if (!gone) {
                        x = r.left - stageRect.left + r.width * annotation.dx
                        y = r.top - stageRect.top + r.height * annotation.dy
                        // Anchors scrolled behind the sticky nav (or off the stage) hide.
                        const topEdge = annotation.target === 'topnav' ? EDGE_PAD : NAV_EDGE
                        if (y < topEdge || y > sh - EDGE_PAD || x < EDGE_PAD || x > sw - EDGE_PAD) gone = true
                    }
                }
                if (gone) {
                    nodes.dot.style.display = 'none'
                    nodes.chip.style.display = 'none'
                    if (hoverRef.current === annotation) hoverRef.current = null
                    return
                }
                anchors.set(annotation.id, { x, y })
                nodes.dot.style.display = 'block'
                nodes.dot.style.transform = `translate(${x - 6}px, ${y - 6}px)`
                if (openRef.current === annotation) {
                    // The open annotation's chip yields to the popover.
                    nodes.chip.style.display = 'none'
                    return
                }
                nodes.chip.style.display = 'flex'
                const cw = nodes.chip.offsetWidth
                const ch = nodes.chip.offsetHeight
                let cx = x + 14 // default: right of the dot
                if (cx + cw > sw - 10) cx = x - 14 - cw // flip left near the right edge
                pending.push({ annotation, chip: nodes.chip, cx, cy: y - ch / 2, cw, ch })
            })

            // Chips slide out from under the legend…
            if (legendBox) {
                pending.forEach((p) => {
                    if (rectsTouch(p.cx, p.cy, p.cw, p.ch, legendBox as Box, 8)) {
                        const leftOf = (legendBox as Box).x - p.cw - 12
                        if (leftOf >= EDGE_PAD) p.cx = leftOf
                        else p.cy = (legendBox as Box).y + (legendBox as Box).h + 10
                    }
                })
            }

            // …and avoid each other: stable order, later ones step down.
            pending.sort((m, n) => m.cy - n.cy || m.cx - n.cx)
            const placed: Box[] = []
            pending.forEach((p) => {
                let guard = 0
                let moved = true
                while (moved && guard++ < 24) {
                    moved = false
                    for (const q of placed) {
                        if (rectsTouch(p.cx, p.cy, p.cw, p.ch, q, 5)) {
                            p.cy = q.y + q.h + 6
                            moved = true
                        }
                    }
                }
                p.cy = Math.min(Math.max(p.cy, EDGE_PAD), sh - p.ch - EDGE_PAD)
                placed.push({ x: p.cx, y: p.cy, w: p.cw, h: p.ch })
                p.chip.style.transform = `translate(${p.cx}px, ${p.cy}px)`
            })

            // Outline hugs the hovered or open annotation's element.
            const focus = openRef.current ?? hoverRef.current
            const outline = outlineRef.current
            if (outline) {
                const el = focus ? resolveTarget(stage, focus.target) : null
                if (focus && el) {
                    const r = el.getBoundingClientRect()
                    outline.style.transform = `translate(${r.left - stageRect.left - 5}px, ${
                        r.top - stageRect.top - 5
                    }px)`
                    outline.style.width = `${r.width + 10}px`
                    outline.style.height = `${r.height + 10}px`
                    outline.style.borderColor = PRODUCTS[focus.product].color
                    outline.style.opacity = '1'
                } else {
                    outline.style.opacity = '0'
                }
            }

            // The popover follows its anchor but stays readable within the stage.
            const open = openRef.current
            const pop = popoverRef.current
            if (open && pop) {
                const anchor = anchors.get(open.id)
                if (anchor) {
                    const pw = pop.offsetWidth
                    const ph = pop.offsetHeight
                    let px = anchor.x + 16
                    if (px + pw > sw - 12) px = anchor.x - 16 - pw
                    px = Math.min(Math.max(px, 12), Math.max(12, sw - pw - 12))
                    let py = anchor.y + 14
                    if (py + ph > sh - 12) py = anchor.y - ph - 14
                    py = Math.min(Math.max(py, 12), Math.max(12, sh - ph - 12))
                    pop.style.transform = `translate(${px}px, ${py}px)`
                    pop.style.visibility = 'visible'
                } else {
                    // Anchor scrolled away — keep the popover where it was.
                }
            }
        }

        const onVisibilityChange = () => {
            if (document.hidden) {
                if (rafId !== null) cancelAnimationFrame(rafId)
                rafId = null
            } else if (rafId === null) {
                rafId = requestAnimationFrame(track)
            }
        }

        rafId = requestAnimationFrame(track)
        document.addEventListener('visibilitychange', onVisibilityChange)
        return () => {
            if (rafId !== null) cancelAnimationFrame(rafId)
            document.removeEventListener('visibilitychange', onVisibilityChange)
        }
    }, [enabled, annotations])
}
