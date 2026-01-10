import React from 'react'

interface PixelBorderProps {
    children: React.ReactNode
    className?: string
    borderColor?: string
    backgroundColor?: string
    as?: 'div' | 'button' | 'a'
    onClick?: () => void
    href?: string
    inline?: boolean
}

// Base step size for pixel corners
const STEP = 3
const STEP2 = STEP * 2

// 2 stepped notches at each corner
const CLIP_PATH = `polygon(
    /* top-left corner - 2 steps */
    0 ${STEP2}px,
    ${STEP}px ${STEP2}px,
    ${STEP}px ${STEP}px,
    ${STEP2}px ${STEP}px,
    ${STEP2}px 0,
    /* top edge to top-right corner */
    calc(100% - ${STEP2}px) 0,
    calc(100% - ${STEP2}px) ${STEP}px,
    calc(100% - ${STEP}px) ${STEP}px,
    calc(100% - ${STEP}px) ${STEP2}px,
    100% ${STEP2}px,
    /* right edge to bottom-right corner */
    100% calc(100% - ${STEP2}px),
    calc(100% - ${STEP}px) calc(100% - ${STEP2}px),
    calc(100% - ${STEP}px) calc(100% - ${STEP}px),
    calc(100% - ${STEP2}px) calc(100% - ${STEP}px),
    calc(100% - ${STEP2}px) 100%,
    /* bottom edge to bottom-left corner */
    ${STEP2}px 100%,
    ${STEP2}px calc(100% - ${STEP}px),
    ${STEP}px calc(100% - ${STEP}px),
    ${STEP}px calc(100% - ${STEP2}px),
    0 calc(100% - ${STEP2}px)
)`

export default function PixelBorder({
    children,
    className = '',
    borderColor = '#1d1d1d',
    backgroundColor = 'white',
    as = 'div',
    onClick,
    href,
    inline = false,
}: PixelBorderProps): JSX.Element {
    const Component = as

    const wrapperStyle: React.CSSProperties = {
        padding: '2px',
        background: borderColor,
        clipPath: CLIP_PATH,
    }

    const innerStyle: React.CSSProperties = {
        background: backgroundColor,
        clipPath: CLIP_PATH,
    }

    if (as === 'a' && href) {
        return (
            <div style={wrapperStyle} className="inline-block">
                <a href={href} style={innerStyle} className={`block ${className}`}>
                    {children}
                </a>
            </div>
        )
    }

    if (as === 'button') {
        return (
            <div style={wrapperStyle} className="inline-block">
                <button onClick={onClick} style={innerStyle} className={`block w-full text-left ${className}`}>
                    {children}
                </button>
            </div>
        )
    }

    const hasHeightClass = className.includes('h-full') || className.includes('h-')

    return (
        <div style={wrapperStyle} className={`${inline ? 'inline-block' : ''} ${hasHeightClass ? 'h-full' : ''}`}>
            <div style={innerStyle} className={`${inline ? 'inline-block' : ''} ${className}`}>
                {children}
            </div>
        </div>
    )
}
