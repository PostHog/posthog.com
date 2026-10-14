import { useEffect, useLayoutEffect, useState } from 'react'
import type { RefObject } from 'react'

export interface Size {
    width: number
    height: number
}

export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function useElementSize(ref: RefObject<HTMLElement>): Size | null {
    const [size, setSize] = useState<Size | null>(null)

    useIsomorphicLayoutEffect(() => {
        const element = ref.current
        if (!element) {
            return
        }
        const update = () => {
            const width = Math.round(element.offsetWidth)
            const height = Math.round(element.offsetHeight)
            setSize((current) =>
                current && current.width === width && current.height === height ? current : { width, height }
            )
        }
        update()
        const observer = new ResizeObserver(update)
        observer.observe(element)
        return () => observer.disconnect()
    }, [ref])

    return size
}

export function useInView(ref: RefObject<HTMLElement>, threshold: number): boolean {
    const [inView, setInView] = useState(false)

    useEffect(() => {
        const element = ref.current
        if (!element) {
            return
        }
        const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold })
        observer.observe(element)
        return () => observer.disconnect()
    }, [ref, threshold])

    return inView
}

export function useHasBeenSeen(ref: RefObject<HTMLElement>, threshold: number): boolean {
    const inView = useInView(ref, threshold)
    const [hasBeenSeen, setHasBeenSeen] = useState(false)

    useEffect(() => {
        if (inView) {
            setHasBeenSeen(true)
        }
    }, [inView])

    return hasBeenSeen
}
