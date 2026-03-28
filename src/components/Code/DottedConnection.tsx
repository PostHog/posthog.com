import React, { useRef, useState, useEffect, useCallback } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

interface DottedConnectionProps {
    /** Ref to the source element (e.g., the "signals" word) */
    sourceRef: React.RefObject<HTMLElement>
    /** Ref to the target element (e.g., the SignalsCallout box) */
    targetRef: React.RefObject<HTMLElement>
    /** Parent container ref to calculate relative positions */
    containerRef: React.RefObject<HTMLElement>
    /** Additional CSS classes for the SVG container */
    className?: string
}

/**
 * Draws an animated dotted curved line between two elements.
 * On desktop: goes up from source, across, then down to top-center of target.
 * On mobile: goes down from source to top-center of target (straight vertical).
 */
export function DottedConnection({ sourceRef, targetRef, containerRef, className = '' }: DottedConnectionProps) {
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
        if (!source || !target || !container) return

        const containerRect = container.getBoundingClientRect()
        const sourceRect = source.getBoundingClientRect()
        const targetRect = target.getBoundingClientRect()

        // Source: bottom-center of the word
        const sx = sourceRect.left + sourceRect.width / 2 - containerRect.left
        const sy = sourceRect.bottom - containerRect.top + 2

        // Target: top-center of the callout box
        const tx = targetRect.left + targetRect.width / 2 - containerRect.left
        const ty = targetRect.top - containerRect.top - 2

        const cornerR = 8

        let d: string

        // Check if target is to the right (desktop side-by-side layout)
        const isDesktop = targetRect.left > sourceRect.right

        if (isDesktop) {
            // Desktop: up from source, across, down to top-center of target
            const topY = Math.min(sy, ty) - 30
            d = [
                `M ${sx} ${sy}`,
                `L ${sx} ${topY + cornerR}`,
                `Q ${sx} ${topY}, ${sx + cornerR} ${topY}`,
                `L ${tx - cornerR} ${topY}`,
                `Q ${tx} ${topY}, ${tx} ${topY + cornerR}`,
                `L ${tx} ${ty}`,
            ].join(' ')
        } else {
            // Mobile: straight down from source to top-center of target
            if (Math.abs(sx - tx) < 4) {
                // Nearly aligned — just a vertical line
                d = `M ${sx} ${sy} L ${tx} ${ty}`
            } else {
                // Slight horizontal offset — use a smooth S-curve
                const midY = (sy + ty) / 2
                d = `M ${sx} ${sy} C ${sx} ${midY}, ${tx} ${midY}, ${tx} ${ty}`
            }
        }

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

    if (!path || dimensions.width === 0) return null

    return (
        <svg
            ref={svgRef}
            className={`absolute top-0 left-0 pointer-events-none ${className}`}
            width={dimensions.width}
            height={dimensions.height}
            style={{ overflow: 'visible' }}
        >
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
        </svg>
    )
}
