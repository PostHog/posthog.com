import React, { useEffect, useRef, useState } from 'react'

/**
 * useMarqueeSelection
 *
 * Rubber-band ("marquee") selection for the desktop icons, like dragging a
 * rectangle on a real OS desktop. Visual-only: selection highlights icons and
 * persists until dismissed; it doesn't (yet) enable dragging or opening them.
 *
 * - A drag starting on empty desktop space (primary button, mouse/pen only)
 *   draws a rectangle once it passes a small movement threshold; below the
 *   threshold it's treated as a plain click, which clears the selection.
 * - Icons whose bounding boxes intersect the rectangle are selected live.
 * - Shift held at drag start adds to the existing selection instead of
 *   replacing it.
 * - Selection clears on: click on empty desktop, Escape, or pointerdown on an
 *   icon (the icon's own click still opens its app as usual).
 *
 * Wiring (see Desktop/index.tsx):
 * - `onDesktopPointerDown` goes on the desktop container; it receives bubbled
 *   pointerdowns from both the transparent capture layer and empty space
 *   inside the pointer-events-auto icon lists.
 * - `marqueeRef` goes on an always-mounted, `hidden` rectangle div. Its
 *   geometry is written imperatively so mousemove never re-renders React;
 *   only selection membership changes trigger a render.
 */

const DRAG_THRESHOLD_PX = 4
const EMPTY_SET: ReadonlySet<string> = new Set()

interface DragState {
    originX: number
    originY: number
    /** True once the pointer has moved past DRAG_THRESHOLD_PX */
    active: boolean
    /** Selection to union with (existing selection when shift-dragging) */
    shiftBase: ReadonlySet<string>
    container: HTMLElement
    /** Icon label → bounding rect, snapshotted once per drag */
    iconRects: Map<string, DOMRect>
}

const setsEqual = (a: ReadonlySet<string>, b: ReadonlySet<string>): boolean => {
    if (a.size !== b.size) return false
    for (const item of a) {
        if (!b.has(item)) return false
    }
    return true
}

/**
 * All drag logic lives in a closure created once per hook instance so the
 * window-level listeners keep stable identities: they're added at drag start
 * and removed at drag end, while React re-renders (from selection changes)
 * happen in between.
 */
const createMarqueeController = (
    marqueeRef: React.RefObject<HTMLDivElement>,
    setSelectedLabels: (next: ReadonlySet<string>) => void
) => {
    let selected: ReadonlySet<string> = EMPTY_SET
    let drag: DragState | null = null

    const applySelection = (next: ReadonlySet<string>) => {
        if (setsEqual(next, selected)) return
        selected = next
        setSelectedLabels(next)
    }

    const clearSelection = () => applySelection(EMPTY_SET)

    const handlePointerMove = (e: PointerEvent) => {
        if (!drag) return
        // Button was released outside the viewport and we missed pointerup
        if (e.buttons === 0) {
            endDrag()
            return
        }
        const dx = e.clientX - drag.originX
        const dy = e.clientY - drag.originY
        if (!drag.active) {
            if (Math.hypot(dx, dy) < DRAG_THRESHOLD_PX) return
            drag.active = true
            // Snapshot icon rects once per drag (the desktop never scrolls).
            // Zero-size rects are the display:none duplicate mobile icon list —
            // without this filter they'd all sit at (0,0) and false-select on
            // any marquee touching the top-left corner.
            drag.container.querySelectorAll<HTMLElement>('li[data-icon-label]').forEach((el) => {
                const label = el.dataset.iconLabel
                const rect = el.getBoundingClientRect()
                if (label && rect.width > 0 && rect.height > 0) {
                    drag?.iconRects.set(label, rect)
                }
            })
            // Inline display overrides the `hidden` class while dragging
            if (marqueeRef.current) marqueeRef.current.style.display = 'block'
        }
        const left = Math.min(drag.originX, e.clientX)
        const top = Math.min(drag.originY, e.clientY)
        const width = Math.abs(dx)
        const height = Math.abs(dy)
        const marquee = marqueeRef.current
        if (marquee) {
            marquee.style.left = `${left}px`
            marquee.style.top = `${top}px`
            marquee.style.width = `${width}px`
            marquee.style.height = `${height}px`
        }
        const next = new Set(drag.shiftBase)
        drag.iconRects.forEach((rect, label) => {
            if (rect.left <= left + width && rect.right >= left && rect.top <= top + height && rect.bottom >= top) {
                next.add(label)
            }
        })
        applySelection(next)
    }

    const handlePointerUp = (e: PointerEvent) => {
        if (!drag || e.button !== 0) return
        const wasActive = drag.active
        endDrag()
        // A sub-threshold press-and-release is a plain click on empty desktop
        if (!wasActive) clearSelection()
    }

    // OS-level interruptions (pointercancel, cmd-tab away): end the drag but
    // keep whatever was selected so far, mirroring pointerup.
    const handlePointerCancel = () => endDrag()
    const handleWindowBlur = () => endDrag()

    const handleDragKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            endDrag()
            clearSelection()
        }
    }

    // Capture phase so the drag survives content that stops propagation as the
    // pointer sweeps over open windows or the taskbar.
    const attachDragListeners = () => {
        window.addEventListener('pointermove', handlePointerMove, true)
        window.addEventListener('pointerup', handlePointerUp, true)
        window.addEventListener('pointercancel', handlePointerCancel, true)
        window.addEventListener('keydown', handleDragKeyDown, true)
        window.addEventListener('blur', handleWindowBlur)
    }

    const detachDragListeners = () => {
        window.removeEventListener('pointermove', handlePointerMove, true)
        window.removeEventListener('pointerup', handlePointerUp, true)
        window.removeEventListener('pointercancel', handlePointerCancel, true)
        window.removeEventListener('keydown', handleDragKeyDown, true)
        window.removeEventListener('blur', handleWindowBlur)
    }

    const endDrag = () => {
        if (!drag) return
        drag = null
        // Clearing the inline display lets the `hidden` class reapply
        if (marqueeRef.current) marqueeRef.current.style.display = ''
        detachDragListeners()
    }

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        // Touch gets the mobile layout and native scrolling; right/middle
        // click must stay free for the context menu. No preventDefault here —
        // it would interfere with Radix's contextmenu handling.
        if (e.button !== 0 || e.pointerType === 'touch' || drag) return
        if ((e.target as Element).closest('[data-icon-label]')) {
            // Pressing an icon clears the selection; the icon's own click
            // proceeds and opens its app as usual
            clearSelection()
            return
        }
        drag = {
            originX: e.clientX,
            originY: e.clientY,
            active: false,
            shiftBase: e.shiftKey ? selected : EMPTY_SET,
            container: e.currentTarget,
            iconRects: new Map(),
        }
        attachDragListeners()
    }

    return { onPointerDown, clearSelection, destroy: endDrag }
}

export default function useMarqueeSelection(): {
    selectedLabels: ReadonlySet<string>
    marqueeRef: React.RefObject<HTMLDivElement>
    onDesktopPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void
} {
    const [selectedLabels, setSelectedLabels] = useState<ReadonlySet<string>>(EMPTY_SET)
    const marqueeRef = useRef<HTMLDivElement>(null)

    const controllerRef = useRef<ReturnType<typeof createMarqueeController> | null>(null)
    if (!controllerRef.current) {
        controllerRef.current = createMarqueeController(marqueeRef, setSelectedLabels)
    }
    const controller = controllerRef.current

    // Escape clears a persisted selection. Only listens while one exists, in
    // the bubble phase with a defaultPrevented guard so an Escape consumed
    // elsewhere (e.g. Radix closing the context menu) doesn't double-act.
    const hasSelection = selectedLabels.size > 0
    useEffect(() => {
        if (!hasSelection) return
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && !e.defaultPrevented) controller.clearSelection()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [hasSelection])

    // Detach any in-flight drag listeners if the desktop ever unmounts
    useEffect(() => () => controller.destroy(), [])

    return { selectedLabels, marqueeRef, onDesktopPointerDown: controller.onPointerDown }
}
