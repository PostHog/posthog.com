import React, { useEffect, useRef, useState } from 'react'
import type { annotate } from 'rough-notation'
import { colorHighlight, colorStroke } from '../colors'
import type { ColorName } from '../colors'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export type AnnotationType = 'underline' | 'box' | 'circle' | 'highlight' | 'strike-through' | 'crossed-off' | 'bracket'

export interface RoughAnnotationProps {
    children: React.ReactNode
    type: AnnotationType
    color?: ColorName
    strokeWidth?: number
    animationDuration?: number
    padding?: number | [number, number] | [number, number, number, number]
    animateOnScroll?: boolean
    delay?: number
    show?: boolean
    brackets?: ('left' | 'right' | 'top' | 'bottom')[]
    iterations?: number
    multiline?: boolean
    className?: string
    onComplete?: () => void
}

const redrawDelay = 120

function blockAncestor(element: HTMLElement): HTMLElement {
    let node = element.parentElement
    while (node && getComputedStyle(node).display.startsWith('inline')) node = node.parentElement
    return node ?? element
}

function layoutKey(element: HTMLElement, block: HTMLElement): string {
    const origin = block.getBoundingClientRect()
    return Array.from(element.getClientRects())
        .map(
            (rect) =>
                `${Math.round(rect.left - origin.left)},${Math.round(rect.top - origin.top)},${Math.round(
                    rect.width
                )},${Math.round(rect.height)}`
        )
        .join(';')
}

export function RoughAnnotation({
    children,
    type,
    color = 'gray',
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
}: RoughAnnotationProps): JSX.Element {
    const elementRef = useRef<HTMLSpanElement>(null)
    const annotationRef = useRef<ReturnType<typeof annotate> | null>(null)
    const showTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const isAnimatingRef = useRef(false)
    const animationEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const [isVisible, setIsVisible] = useState(false)
    const prefersReducedMotion = usePrefersReducedMotion()

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

    useEffect(() => {
        const element = elementRef.current
        if (!element) return

        const shouldShow = show ?? isVisible

        let cancelled = false
        clearTimeout(showTimeoutRef.current ?? undefined)
        clearTimeout(animationEndTimerRef.current ?? undefined)
        import('rough-notation').then(({ annotate }) => {
            if (cancelled) return

            if (annotationRef.current) {
                annotationRef.current.remove()
                annotationRef.current = null
            }

            annotationRef.current = annotate(element, {
                type,
                color: 'currentColor',
                strokeWidth,
                animate: !prefersReducedMotion,
                animationDuration: prefersReducedMotion ? 0 : animationDuration,
                padding,
                brackets,
                iterations,
                multiline,
            })

            const svg = type === 'highlight' ? element.previousElementSibling : element.nextElementSibling
            if (svg?.matches('svg.rough-annotation')) {
                svg.classList.add(...(type === 'highlight' ? colorHighlight[color] : colorStroke[color]).split(' '))
                svg.setAttribute('aria-hidden', 'true')
                svg.setAttribute('focusable', 'false')
            }

            if (shouldShow && !annotationRef.current.isShowing()) {
                showTimeoutRef.current = setTimeout(
                    () => {
                        showTimeoutRef.current = null
                        if (!annotationRef.current) return
                        isAnimatingRef.current = true
                        annotationRef.current.show()
                        const aniDuration = prefersReducedMotion ? 0 : animationDuration
                        animationEndTimerRef.current = setTimeout(() => {
                            isAnimatingRef.current = false
                            animationEndTimerRef.current = null
                        }, aniDuration)
                        if (onComplete) {
                            setTimeout(onComplete, aniDuration)
                        }
                    },
                    prefersReducedMotion ? 0 : delay
                )
            }
        })

        return () => {
            cancelled = true
            clearTimeout(showTimeoutRef.current ?? undefined)
            showTimeoutRef.current = null
            clearTimeout(animationEndTimerRef.current ?? undefined)
            animationEndTimerRef.current = null
            isAnimatingRef.current = false
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

    useEffect(() => {
        const element = elementRef.current
        if (!element) return
        const block = blockAncestor(element)
        const watched = [block, element.offsetParent, element.closest('main')].filter(
            (node, index, list): node is Element => node instanceof Element && list.indexOf(node) === index
        )

        let timeout: ReturnType<typeof setTimeout>
        let lastLayout = layoutKey(element, block)
        const redrawIfMoved = () => {
            if (isAnimatingRef.current) {
                scheduleRedraw()
                return
            }
            const layout = layoutKey(element, block)
            if (layout === lastLayout) return
            lastLayout = layout
            if (annotationRef.current?.isShowing()) annotationRef.current.show()
        }
        const scheduleRedraw = () => {
            clearTimeout(timeout)
            timeout = setTimeout(redrawIfMoved, redrawDelay)
        }

        const resizeObserver = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(scheduleRedraw)
        watched.forEach((node) => resizeObserver?.observe(node))
        const mutationObserver = new MutationObserver(scheduleRedraw)
        mutationObserver.observe(block, { attributes: true, subtree: true, attributeFilter: ['style', 'class'] })
        document.fonts?.ready.then(scheduleRedraw)

        return () => {
            clearTimeout(timeout)
            resizeObserver?.disconnect()
            mutationObserver.disconnect()
        }
    }, [])

    return (
        <span ref={elementRef} className={`inline ${className}`}>
            {children}
        </span>
    )
}
