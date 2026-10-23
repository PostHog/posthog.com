import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import type { Tone } from './styles'

export const textEffectColor: Record<Tone | 'yellow', string> = {
    neutral: '[--effect-color:rgb(var(--text-primary)/0.08)] dark:[--effect-color:rgb(var(--text-primary)/0.14)]',
    info: '[--effect-color:theme(colors.blue/0.1)] dark:[--effect-color:theme(colors.blue/0.22)]',
    success: '[--effect-color:theme(colors.green/0.16)] dark:[--effect-color:theme(colors.green/0.22)]',
    warning: '[--effect-color:theme(colors.yellow/0.15)] dark:[--effect-color:theme(colors.yellow/0.18)]',
    error: '[--effect-color:theme(colors.salmon/0.14)] dark:[--effect-color:theme(colors.salmon/0.22)]',
    brand: '[--effect-color:theme(colors.red/0.12)] dark:[--effect-color:theme(colors.red/0.24)]',
    yellow: '[--effect-color:theme(colors.yellow/0.15)] dark:[--effect-color:theme(colors.yellow/0.15)]',
}

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
