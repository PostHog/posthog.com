import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

export function useMotionActivity(ref: RefObject<HTMLElement>): { active: boolean; reducedMotion: boolean } {
    const [visible, setVisible] = useState(false)
    const [pageVisible, setPageVisible] = useState(false)
    const [reducedMotion, setReducedMotion] = useState(true)

    useEffect(() => {
        const element = ref.current
        if (!element) return
        const media = window.matchMedia('(prefers-reduced-motion: reduce)')
        const updateMotion = () => setReducedMotion(media.matches)
        const updateVisibility = () => setPageVisible(document.visibilityState === 'visible')
        updateMotion()
        updateVisibility()
        media.addEventListener('change', updateMotion)
        document.addEventListener('visibilitychange', updateVisibility)
        const observer =
            typeof IntersectionObserver === 'undefined'
                ? null
                : new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
        observer?.observe(element)
        return () => {
            observer?.disconnect()
            media.removeEventListener('change', updateMotion)
            document.removeEventListener('visibilitychange', updateVisibility)
        }
    }, [ref])

    return { active: visible && pageVisible && !reducedMotion, reducedMotion }
}
