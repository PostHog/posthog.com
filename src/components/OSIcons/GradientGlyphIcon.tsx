import React, { useId, useRef } from 'react'

export interface GradientStop {
    offset: string
    color: string
}

export interface GradientGlyphIconProps {
    /** SVG path `d` attribute for the glyph shape */
    path: string
    /** SVG viewBox (defaults to "0 0 24 24") */
    viewBox?: string
    /** Gradient color stops — must form a loop (first and last colors should match for seamless animation) */
    stops?: GradientStop[]
    /** Glow color (CSS color string) */
    glowColor?: string
    /** Glow blur radius in SVG units (Figma blur ÷ 2) */
    glowRadius?: number
    /** Stroke color for the border */
    strokeColor?: string
    /** Stroke width */
    strokeWidth?: number
    /** Animation duration in seconds */
    animationDuration?: number
    /** Additional className for the root SVG */
    className?: string
}

const DEFAULT_STOPS: GradientStop[] = [
    { offset: '0%', color: '#FFF8E6' },
    { offset: '26%', color: '#DDFFBD' },
    { offset: '57%', color: '#19FFBE' },
    { offset: '79%', color: '#DDFFBD' },
    { offset: '100%', color: '#FFF8E6' },
]

export default function GradientGlyphIcon({
    path,
    viewBox = '0 0 24 24',
    stops = DEFAULT_STOPS,
    glowColor = '#53FFCB',
    glowRadius = 1.5,
    animationDuration = 0.5,
    className,
}: GradientGlyphIconProps) {
    const svgRef = useRef<SVGSVGElement>(null)
    const id = useId().replace(/:/g, '')

    const gradId = `${id}-grad`
    const glowId = `${id}-glow`

    const handleMouseEnter = () => {
        const anim = svgRef.current?.querySelector('animateTransform') as SVGAnimationElement | null
        anim?.beginElement()
    }

    return (
        <svg
            ref={svgRef}
            viewBox={viewBox}
            className={`inline-block size-8 ${className || ''}`}
            onMouseEnter={handleMouseEnter}
        >
            <defs>
                <linearGradient
                    id={gradId}
                    gradientUnits="userSpaceOnUse"
                    spreadMethod="repeat"
                    x1="0"
                    y1="0"
                    x2="36"
                    y2="36"
                >
                    {stops.map((stop, i) => (
                        <stop key={i} offset={stop.offset} stopColor={stop.color} />
                    ))}
                    <animateTransform
                        attributeName="gradientTransform"
                        type="translate"
                        from="0 0"
                        to="-36 -36"
                        dur={`${animationDuration}s`}
                        begin="indefinite"
                        fill="remove"
                    />
                </linearGradient>
                <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation={glowRadius} result="blur" />
                    <feFlood floodColor={glowColor} floodOpacity="0.8" result="color" />
                    <feComposite in="color" in2="blur" operator="in" result="glow" />
                    <feMerge>
                        <feMergeNode in="glow" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <g filter={`url(#${glowId})`}>
                <path d={path} fill={`url(#${gradId})`} />
            </g>
        </svg>
    )
}
