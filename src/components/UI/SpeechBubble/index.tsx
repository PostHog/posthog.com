import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import type { HTMLAttributes } from 'react'
import { cn } from '../../../utils'

export type SpeechBubbleTail = 'bottom' | 'top' | 'left' | 'right'
export type SpeechBubbleTailAlign = 'start' | 'center' | 'end'
export type SpeechBubbleProps = HTMLAttributes<HTMLDivElement> & {
    tail?: SpeechBubbleTail
    tailAlign?: SpeechBubbleTailAlign
    size?: 'sm' | 'md' | 'lg'
}

const sizes = { sm: 'px-3 py-2 text-sm', md: 'px-4 py-3 text-base', lg: 'px-5 py-4 text-lg' }
const serverBounds = { width: 240, height: 80 }
const cornerRadius = 8
const tailHalfWidth = 8
const tailLength = 10
const cornerGap = 4

function bubblePath(width: number, height: number, tail: SpeechBubbleTail, align: SpeechBubbleTailAlign): string {
    const radius = Math.min(cornerRadius, width / 4, height / 4)
    const horizontalTail = tail === 'top' || tail === 'bottom'
    const edgeLength = horizontalTail ? width : height
    const halfWidth = Math.min(tailHalfWidth, Math.max(0, (edgeLength - radius * 2) / 4))
    const margin = Math.min(edgeLength / 2, radius + halfWidth + cornerGap)
    const anchor = align === 'start' ? margin : align === 'end' ? edgeLength - margin : edgeLength / 2
    const top = tail === 'top' ? `L${anchor - halfWidth} 0 L${anchor} ${-tailLength} L${anchor + halfWidth} 0` : ''
    const right =
        tail === 'right'
            ? `L${width} ${anchor - halfWidth} L${width + tailLength} ${anchor} L${width} ${anchor + halfWidth}`
            : ''
    const bottom =
        tail === 'bottom'
            ? `L${anchor + halfWidth} ${height} L${anchor} ${height + tailLength} L${anchor - halfWidth} ${height}`
            : ''
    const left = tail === 'left' ? `L0 ${anchor + halfWidth} L${-tailLength} ${anchor} L0 ${anchor - halfWidth}` : ''

    return `M${radius} 0 ${top} L${width - radius} 0 Q${width} 0 ${width} ${radius} ${right} L${width} ${
        height - radius
    } Q${width} ${height} ${width - radius} ${height} ${bottom} L${radius} ${height} Q0 ${height} 0 ${
        height - radius
    } ${left} L0 ${radius} Q0 0 ${radius} 0 Z`
}

export const SpeechBubble = React.forwardRef<HTMLDivElement, SpeechBubbleProps>(function SpeechBubble(
    { tail = 'bottom', tailAlign = 'center', size = 'md', className, children, ...props },
    ref
) {
    const bubbleRef = useRef<HTMLDivElement>(null)
    const [bounds, setBounds] = useState(serverBounds)
    useImperativeHandle(ref, () => bubbleRef.current as HTMLDivElement)

    useEffect(() => {
        const element = bubbleRef.current
        if (!element) return
        const measure = () => {
            const width = element.offsetWidth
            const height = element.offsetHeight
            if (!width || !height) return
            setBounds((previous) =>
                previous.width === width && previous.height === height ? previous : { width, height }
            )
        }
        measure()
        if (typeof ResizeObserver === 'undefined') return
        const observer = new ResizeObserver(measure)
        observer.observe(element, { box: 'border-box' })
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={bubbleRef}
            {...props}
            className={cn('relative isolate min-w-0 text-primary [overflow-wrap:anywhere]', sizes[size], className)}
        >
            <svg
                aria-hidden
                focusable="false"
                viewBox={`0 0 ${bounds.width} ${bounds.height}`}
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 -z-10 size-full overflow-visible drop-shadow-[0_2px_3px_rgb(0_0_0/0.12)] dark:drop-shadow-[0_2px_3px_rgb(0_0_0/0.35)]"
            >
                <path
                    d={bubblePath(bounds.width, bounds.height, tail, tailAlign)}
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    strokeLinejoin="round"
                    className="fill-white/60 stroke-[rgb(var(--text-primary)/0.13)] dark:fill-white/[0.06] dark:stroke-[rgb(var(--text-primary)/0.12)]"
                />
            </svg>
            {children}
        </div>
    )
})
