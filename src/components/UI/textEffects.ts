import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

export function useTextAnimation(enabled: boolean): { ref: RefObject<HTMLSpanElement>; active: boolean } {
    const ref = useRef<HTMLSpanElement>(null)
    const [active, setActive] = useState(false)

    useEffect(() => {
        if (!enabled || !ref.current) {
            setActive(false)
            return
        }
        const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
        let visible = typeof IntersectionObserver === 'undefined'
        const update = () => setActive(visible && !document.hidden && !motion.matches)
        const observer =
            typeof IntersectionObserver === 'undefined'
                ? undefined
                : new IntersectionObserver(([entry]) => {
                      visible = entry.isIntersecting
                      update()
                  })
        observer?.observe(ref.current)
        motion.addEventListener('change', update)
        document.addEventListener('visibilitychange', update)
        update()
        return () => {
            observer?.disconnect()
            motion.removeEventListener('change', update)
            document.removeEventListener('visibilitychange', update)
        }
    }, [enabled])

    return { ref, active: enabled && active }
}
