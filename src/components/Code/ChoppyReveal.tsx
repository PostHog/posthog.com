import React, { useState, useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

interface ChoppyRevealProps {
    children: React.ReactNode
    /** Delay between each word appearing (ms) */
    wordDelay?: number
    /** Delay before starting animation (ms) */
    initialDelay?: number
    /** Additional CSS classes */
    className?: string
    /** Callback when animation completes */
    onComplete?: () => void
    /** IntersectionObserver threshold */
    threshold?: number
}

/**
 * Reveals text content word-by-word with a choppy/blocky fade effect.
 * Supports inline children (text + icons + annotations) — splits on
 * text nodes while preserving React elements inline in sequence.
 */
export function ChoppyReveal({
    children,
    wordDelay = 50,
    initialDelay = 0,
    className,
    onComplete,
    threshold = 0.3,
}: ChoppyRevealProps) {
    const prefersReducedMotion = usePrefersReducedMotion()
    const containerRef = useRef<HTMLSpanElement>(null)
    const [isInView, setIsInView] = useState(false)
    const [started, setStarted] = useState(false)
    const [visibleCount, setVisibleCount] = useState(0)
    const onCompleteRef = useRef(onComplete)
    onCompleteRef.current = onComplete
    const hasCalledComplete = useRef(false)

    // Flatten children into a sequence of "tokens" — either words (strings) or React elements
    const tokens = React.useMemo(() => {
        const result: Array<{ type: 'word'; value: string } | { type: 'element'; value: React.ReactNode }> = []

        const flatten = (node: React.ReactNode) => {
            if (typeof node === 'string') {
                node.split(/(\s+)/).forEach((part) => {
                    if (part.length > 0) {
                        result.push({ type: 'word', value: part })
                    }
                })
            } else if (Array.isArray(node)) {
                node.forEach(flatten)
            } else if (React.isValidElement(node)) {
                result.push({ type: 'element', value: node })
            }
        }
        flatten(children)
        return result
    }, [children])

    // Intersection observer
    useEffect(() => {
        if (prefersReducedMotion) return
        const el = containerRef.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true)
                    observer.disconnect()
                }
            },
            { threshold, rootMargin: '-10% 0px -10% 0px' }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [prefersReducedMotion, threshold])

    // Start after delay once in view
    useEffect(() => {
        if (prefersReducedMotion || started || !isInView) return
        const timeout = setTimeout(() => setStarted(true), initialDelay)
        return () => clearTimeout(timeout)
    }, [prefersReducedMotion, initialDelay, started, isInView])

    // Reveal tokens one at a time
    useEffect(() => {
        if (!started || visibleCount >= tokens.length) {
            if (started && visibleCount >= tokens.length && !hasCalledComplete.current) {
                hasCalledComplete.current = true
                onCompleteRef.current?.()
            }
            return
        }
        const timeout = setTimeout(() => setVisibleCount((c) => c + 1), wordDelay)
        return () => clearTimeout(timeout)
    }, [started, visibleCount, tokens.length, wordDelay])

    // Reduced motion: show everything immediately
    if (prefersReducedMotion) {
        return <span className={className}>{children}</span>
    }

    return (
        <span ref={containerRef} className={className}>
            {tokens.map((token, i) => {
                const isVisible = i < visibleCount
                const isElement = token.type === 'element'
                const isWhitespace = token.type === 'word' && /^\s+$/.test(token.value)

                return (
                    <span
                        key={i}
                        className={isElement ? 'inline' : undefined}
                        style={{
                            opacity: isVisible || isWhitespace ? 1 : 0,
                            transform: isVisible || isWhitespace ? 'translateY(0)' : 'translateY(4px)',
                            transition:
                                isVisible && !isWhitespace
                                    ? 'opacity 0.08s steps(3, end), transform 0.08s steps(3, end)'
                                    : 'none',
                        }}
                    >
                        {token.value}
                    </span>
                )
            })}
        </span>
    )
}
