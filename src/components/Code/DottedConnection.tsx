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
 * Hidden on narrow containers (below @2xl breakpoint — handled by parent).
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

        // Source: bottom-center of the "signals" word
        const sx = sourceRect.left + sourceRect.width / 2 - containerRect.left
        const sy = sourceRect.bottom - containerRect.top + 4

        // Target: left-center of the callout box
        const tx = targetRect.left - containerRect.left - 4
        const ty = targetRect.top + targetRect.height * 0.3 - containerRect.top

        // Cubic bezier curve
        const cx1 = sx
        const cy1 = sy + (ty - sy) * 0.5
        const cx2 = tx - (tx - sx) * 0.3
        const cy2 = ty

        const d = `M ${sx} ${sy} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${tx} ${ty}`
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
