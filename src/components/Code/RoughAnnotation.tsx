import React, { useCallback, useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export type AnnotationType = 'underline' | 'box' | 'circle' | 'highlight' | 'strike-through' | 'crossed-off' | 'bracket'

interface RoughAnnotationProps {
    children: React.ReactNode
    type: AnnotationType
    /** Color of the annotation */
    color?: string
    /** Width of the annotation stroke */
    strokeWidth?: number
    /** Animation duration in ms */
    animationDuration?: number
    /** Padding around the element */
    padding?: number | [number, number] | [number, number, number, number]
    /** Whether to animate on scroll into view */
    animateOnScroll?: boolean
    /** Delay before animation starts (ms) */
    delay?: number
    /** Whether annotation is shown (controlled mode) */
    show?: boolean
    /** For brackets: which sides */
    brackets?: ('left' | 'right' | 'top' | 'bottom')[]
    /** Number of iterations for the annotation (more = rougher) */
    iterations?: number
    /** Support multiline text */
    multiline?: boolean
    /** Custom class for the wrapper span */
    className?: string
    /** Callback when animation completes */
    onComplete?: () => void
}

export function RoughAnnotation({
    children,
    type,
    color = 'currentColor',
    strokeWidth = 2,
    animationDuration = 800,
    padding = 0,
    animateOnScroll = true,
    delay = 0,
    show,
    brackets,
    iterations = 2,
    multiline = false,
    className = '',
    onComplete,
}: RoughAnnotationProps) {
    const elementRef = useRef<HTMLSpanElement>(null)
    const annotationRef = useRef<any>(null)
    const [isVisible, setIsVisible] = useState(false)
    const prefersReducedMotion = usePrefersReducedMotion()

    // Scroll-triggered visibility
    useEffect(() => {
        if (!animateOnScroll || show !== undefined) return
        const element = elementRef.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.8, rootMargin: '-15% 0px -15% 0px' }
        )
        observer.observe(element)
        return () => observer.disconnect()
    }, [animateOnScroll, show])

    // Create and manage the annotation
    useEffect(() => {
        const element = elementRef.current
        if (!element) return

        const shouldShow = show ?? isVisible

        // Dynamic import to avoid SSR issues — rough-notation accesses DOM directly
        let cancelled = false
        import('rough-notation').then(({ annotate }) => {
            if (cancelled) return

            // Clean up previous annotation
            if (annotationRef.current) {
                annotationRef.current.remove()
                annotationRef.current = null
            }

            annotationRef.current = annotate(element, {
                type,
                color,
                strokeWidth,
                animationDuration: prefersReducedMotion ? 0 : animationDuration,
                padding,
                brackets,
                iterations,
                multiline,
            })

            if (shouldShow && !annotationRef.current.isShowing()) {
                const timeoutId = setTimeout(
                    () => {
                        annotationRef.current?.show()
                        if (onComplete) {
                            setTimeout(onComplete, prefersReducedMotion ? 0 : animationDuration)
                        }
                    },
                    prefersReducedMotion ? 0 : delay
                )
                return () => clearTimeout(timeoutId)
            }
        })

        return () => {
            cancelled = true
            if (annotationRef.current) {
                annotationRef.current.remove()
                annotationRef.current = null
            }
        }
    }, [
        type,
        color,
        strokeWidth,
        animationDuration,
        padding,
        brackets,
        iterations,
        multiline,
        isVisible,
        show,
        delay,
        prefersReducedMotion,
        onComplete,
    ])

    // Recalculate position (without animation) when the container resizes.
    // rough-notation's built-in ResizeObserver only watches the element itself,
    // which doesn't fire when the PostHog internal window is resized.
    useEffect(() => {
        const main = elementRef.current?.closest('main')
        if (!main) return

        let timeout: ReturnType<typeof setTimeout>
        const observer = new ResizeObserver(() => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                if (annotationRef.current?.isShowing()) {
                    annotationRef.current.show()
                }
            }, 150)
        })
        observer.observe(main)
        return () => {
            clearTimeout(timeout)
            observer.disconnect()
        }
    }, [])

    // Recalculate when sibling styles change (e.g. ChoppyReveal progressively
    // revealing text by toggling opacity/transform on sibling spans — the parent
    // doesn't resize, but the annotated element can shift position).
    useEffect(() => {
        const el = elementRef.current
        if (!el) return
        // Watch the nearest block-level ancestor (the <p>) for subtree style mutations
        const container = el.closest('p, div, section') || el.parentElement
        if (!container) return

        let timeout: ReturnType<typeof setTimeout>
        let lastRect = ''
        const recheck = () => {
            const rect = el.getBoundingClientRect()
            const key = `${rect.top},${rect.left},${rect.width},${rect.height}`
            if (key !== lastRect) {
                lastRect = key
                if (annotationRef.current?.isShowing()) {
                    annotationRef.current.show()
                }
            }
        }
        const observer = new MutationObserver(() => {
            clearTimeout(timeout)
            timeout = setTimeout(recheck, 30)
        })
        observer.observe(container, { attributes: true, subtree: true, attributeFilter: ['style'] })
        return () => {
            clearTimeout(timeout)
            observer.disconnect()
        }
    }, [])

    return (
        <span ref={elementRef} className={`inline ${className}`}>
            {children}
        </span>
    )
}
