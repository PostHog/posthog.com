import { useEffect, useState } from 'react'
import type { RefObject } from 'react'
import { usePageVisible, usePrefersReducedMotion } from '../utils'

export function useMotionActivity(ref: RefObject<HTMLElement>): { active: boolean; reducedMotion: boolean } {
    const [visible, setVisible] = useState(false)
    const pageVisible = usePageVisible()
    const reducedMotion = usePrefersReducedMotion()

    useEffect(() => {
        const element = ref.current
        if (!element || typeof IntersectionObserver === 'undefined') return
        const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
        observer.observe(element)
        return () => observer.disconnect()
    }, [ref])

    return { active: visible && pageVisible && !reducedMotion, reducedMotion }
}
