import { RefObject, useEffect, useState } from 'react'

/**
 * Tracks whether a horizontally scrollable element has content off either edge,
 * and exposes a page-by-page scroll helper. Used to fade the row's edges and
 * show/hide its arrow buttons.
 */
export function useScrollEdges(ref: RefObject<HTMLElement>): {
    canScroll: { left: boolean; right: boolean }
    scrollByPage: (direction: -1 | 1) => void
} {
    const [canScroll, setCanScroll] = useState({ left: false, right: false })

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const update = () => {
            const left = el.scrollLeft > 8
            const right = el.scrollLeft < el.scrollWidth - el.clientWidth - 8
            setCanScroll((prev) => (prev.left === left && prev.right === right ? prev : { left, right }))
        }

        // Scroll snap can nudge the row off zero on mount, clipping the first card
        el.scrollTo({ left: 0 })
        update()

        const resizeObserver = new ResizeObserver(update)
        resizeObserver.observe(el)
        el.addEventListener('scroll', update, { passive: true })

        return () => {
            el.removeEventListener('scroll', update)
            resizeObserver.disconnect()
        }
    }, [ref])

    const scrollByPage = (direction: -1 | 1) => {
        const el = ref.current
        if (!el) return
        el.scrollBy({ left: direction * el.clientWidth * 0.75, behavior: 'smooth' })
    }

    return { canScroll, scrollByPage }
}
