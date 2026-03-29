import React, { useRef, useState, useEffect, useCallback } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

interface DottedConnectionProps {
    /** Ref to the source element (e.g., the "signals" word) */
    sourceRef: React.RefObject<HTMLElement>
    /** Ref to the target element (e.g., the SignalsCallout box) */
    targetRef: React.RefObject<HTMLElement>
    /** Parent container ref for dimensions and resize observation */
    containerRef: React.RefObject<HTMLElement>
    /** Hide on mobile (when target is not to the right of source) */
    desktopOnly?: boolean
    /** Horizontal offset (px) for the target anchor from its left edge. If set, overrides center alignment. */
    targetOffsetX?: number
    /** Additional CSS classes for the SVG container */
    className?: string
}

/**
 * Draws an animated dotted curved line between two elements.
 * On desktop: goes up from source, across, then down to top-center of target.
 * On mobile: goes down from source to top-center of target (straight vertical).
 *
 * The SVG is always rendered so we can use its own bounding rect as the
 * coordinate origin. This avoids misalignment when containerRef differs
 * from the SVG's nearest positioned ancestor.
 */
export function DottedConnection({
    sourceRef,
    targetRef,
    containerRef,
    desktopOnly = false,
    targetOffsetX,
    className = '',
}: DottedConnectionProps) {
    const svgRef = useRef<SVGSVGElement>(null)
    const [path, setPath] = useState('')
    const [pathLength, setPathLength] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const prefersReducedMotion = usePrefersReducedMotion()
    const pathRef = useRef<SVGPathElement>(null)

    const calculatePath = useCallback(() => {
        const source = sourceRef.current
        const target = targetRef.current
        const container = containerRef.current
        const svg = svgRef.current
        if (!source || !target || !container || !svg) return

        // Use the SVG's own bounding rect as the coordinate origin.
        // The SVG is positioned absolute top-0 left-0, so its top-left
        // corner matches its nearest positioned ancestor — the actual
        // element it draws relative to.
        const originRect = svg.getBoundingClientRect()
        const sourceRect = source.getBoundingClientRect()
        const targetRect = target.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()

        // Check if target is to the right (desktop / @2xl side-by-side layout)
        const isDesktop = targetRect.left > sourceRect.right

        // Source anchor: top on desktop, bottom on mobile
        const sx = sourceRect.left + sourceRect.width / 2 - originRect.left
        const sy = isDesktop ? sourceRect.top - originRect.top : sourceRect.bottom - originRect.top

        // Target: top of the callout box — use targetOffsetX from left if set, otherwise center
        const tx =
            targetOffsetX !== undefined
                ? targetRect.left + targetOffsetX - originRect.left
                : targetRect.left + targetRect.width / 2 - originRect.left
        const ty = targetRect.top - originRect.top

        const cornerR = 8

        // Hide on mobile if desktopOnly
        if (!isDesktop && desktopOnly) {
            setPath('')
            return
        }

        if (!isDesktop) {
            // Mobile: down from source bottom to top of target
            const mobileD =
                Math.abs(sx - tx) < 4
                    ? `M ${sx} ${sy} L ${tx} ${ty}`
                    : `M ${sx} ${sy} C ${sx} ${(sy + ty) / 2}, ${tx} ${(sy + ty) / 2}, ${tx} ${ty}`

            setPath(mobileD)
            setDimensions({
                width: containerRect.width,
                height: containerRect.height,
            })
            return
        }

        // Desktop: up from source top, across, down to top of target
        const topY = Math.min(sy, ty) - 14
        const d = [
            `M ${sx} ${sy}`,
            `L ${sx} ${topY + cornerR}`,
            `Q ${sx} ${topY}, ${sx + cornerR} ${topY}`,
            `L ${tx - cornerR} ${topY}`,
            `Q ${tx} ${topY}, ${tx} ${topY + cornerR}`,
            `L ${tx} ${ty}`,
        ].join(' ')

        setPath(d)
        setDimensions({
            width: containerRect.width,
            height: containerRect.height,
        })
    }, [sourceRef, targetRef, containerRef])

    // Calculate path and set up resize observer
    useEffect(() => {
        calculatePath()
        const container = containerRef.current
        if (!container) return

        const resizeObserver = new ResizeObserver(() => calculatePath())
        resizeObserver.observe(container)
        return () => resizeObserver.disconnect()
    }, [calculatePath, containerRef])

    // Recalculate when the PostHog window is resized (matches RoughAnnotation pattern)
    useEffect(() => {
        const main = containerRef.current?.closest('main')
        if (!main) return

        let timeout: ReturnType<typeof setTimeout>
        const observer = new ResizeObserver(() => {
            clearTimeout(timeout)
            timeout = setTimeout(() => calculatePath(), 150)
        })
        observer.observe(main)
        return () => {
            clearTimeout(timeout)
            observer.disconnect()
        }
    }, [calculatePath, containerRef])

    // Get path length for animation
    useEffect(() => {
        if (pathRef.current && path) {
            setPathLength(pathRef.current.getTotalLength())
        }
    }, [path])

    // Intersection observer for animation trigger
    useEffect(() => {
        const el = sourceRef.current
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
    }, [sourceRef])

    return (
        <svg
            ref={svgRef}
            className={`absolute top-0 left-0 pointer-events-none ${className}`}
            width={dimensions.width || 0}
            height={dimensions.height || 0}
            style={{ overflow: 'visible' }}
        >
            {path && (
                <path
                    ref={pathRef}
                    d={path}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    className="text-secondary"
                    style={{
                        strokeDashoffset: prefersReducedMotion || isVisible ? 0 : pathLength,
                        transition: prefersReducedMotion ? 'none' : `stroke-dashoffset 1s ease-in-out 0.3s`,
                    }}
                />
            )}
        </svg>
    )
}
