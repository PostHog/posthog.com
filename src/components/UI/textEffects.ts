import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { usePageVisible, usePrefersReducedMotion } from './utils'

export function useTextAnimation(enabled: boolean): { ref: RefObject<HTMLSpanElement>; active: boolean } {
    const ref = useRef<HTMLSpanElement>(null)
    const [visible, setVisible] = useState(false)
    const pageVisible = usePageVisible()
    const reducedMotion = usePrefersReducedMotion()

    useEffect(() => {
        if (!enabled || !ref.current) return
        if (typeof IntersectionObserver === 'undefined') {
            setVisible(true)
            return
        }
        const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [enabled])

    return { ref, active: enabled && visible && pageVisible && !reducedMotion }
}
