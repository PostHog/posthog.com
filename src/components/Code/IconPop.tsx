import React, { useRef, useState, useEffect } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

interface IconPopProps {
    children: React.ReactNode
    /** Delay before animation (ms) */
    delay?: number
    /** Whether to trigger on scroll */
    animateOnScroll?: boolean
    /** Controlled show state */
    show?: boolean
    /** Additional classes */
    className?: string
}

/**
 * Wraps an icon with an elastic scale + slight rotation pop animation
 * when it enters the viewport. Designed to sit inline within text.
 */
export function IconPop({ children, delay = 0, animateOnScroll = true, show, className = '' }: IconPopProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const [isVisible, setIsVisible] = useState(false)
    const prefersReducedMotion = usePrefersReducedMotion()

    useEffect(() => {
        if (!animateOnScroll || show !== undefined) return
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.5 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [animateOnScroll, show])

    const shouldShow = show ?? isVisible

    if (prefersReducedMotion) {
        return <span className={`inline-flex items-center align-middle ${className}`}>{children}</span>
    }

    return (
        <span
            ref={ref}
            className={`inline-flex items-center align-middle ${className}`}
            style={{
                transform: shouldShow ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-15deg)',
                opacity: shouldShow ? 1 : 0,
                transition: `transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms, opacity 0.3s ease ${delay}ms`,
            }}
        >
            {children}
        </span>
    )
}
