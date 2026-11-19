import React, { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { cn } from '../../../utils'
import { focusRing } from '../styles'
import { useMotionActivity } from './useMotionActivity'
import './styles.css'

export type MarqueeProps = {
    children: ReactNode
    label: string
    direction?: 'left' | 'right'
    speed?: number
    gap?: number
    edgeFade?: boolean
    pauseOnHover?: boolean
    secondRow?: ReactNode
    className?: string
}

type RowProps = Omit<MarqueeProps, 'secondRow'> & {
    focused: boolean
}

function Row({ children, label, direction, speed, gap, edgeFade, pauseOnHover, focused }: RowProps): JSX.Element {
    const ref = useRef<HTMLDivElement>(null)
    const groupRef = useRef<HTMLDivElement>(null)
    const { active, reducedMotion } = useMotionActivity(ref)
    const [width, setWidth] = useState(0)
    const [viewportWidth, setViewportWidth] = useState(0)
    const [hasContent, setHasContent] = useState(false)
    const [hovered, setHovered] = useState(false)
    const safeGap = Number.isFinite(gap) ? Math.max(0, gap as number) : 32
    const safeSpeed = Number.isFinite(speed) ? Math.max(0, speed as number) : 40

    useEffect(() => {
        const group = groupRef.current
        const viewport = ref.current
        if (!group || !viewport) return
        const measure = () => {
            setWidth(group.getBoundingClientRect().width)
            setViewportWidth(viewport.clientWidth)
            setHasContent(group.childNodes.length > 0)
        }
        measure()
        const observer = new ResizeObserver(measure)
        observer.observe(group)
        observer.observe(viewport)
        return () => observer.disconnect()
    }, [children])

    const animated = !reducedMotion && hasContent && safeSpeed > 0 && width > 0
    const duplicateCount = animated ? Math.ceil(viewportWidth / width) : 0
    const running = animated && active && !focused && !(pauseOnHover && hovered)
    const style = {
        '--ui-marquee-gap': `${safeGap}px`,
        '--ui-marquee-distance': `${-width}px`,
        animationDuration: `${width / (safeSpeed || 1)}s`,
        animationDirection: direction === 'right' ? 'reverse' : 'normal',
        animationPlayState: running ? 'running' : 'paused',
        willChange: running ? 'transform' : undefined,
    } as CSSProperties

    return (
        <div
            ref={ref}
            role="region"
            aria-label={label}
            tabIndex={0}
            data-animated={animated || undefined}
            data-fade={(edgeFade && animated) || undefined}
            className={cn('ui-marquee-viewport rounded-sm', focusRing)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="ui-marquee-strip" style={style}>
                <div ref={groupRef} className="ui-marquee-group">
                    {children}
                </div>
                {Array.from({ length: duplicateCount }, (_, index) => (
                    <div key={index} aria-hidden="true" {...{ inert: '' }} className="ui-marquee-group">
                        {children}
                    </div>
                ))}
            </div>
        </div>
    )
}

export function Marquee({
    secondRow,
    className,
    direction = 'left',
    speed = 40,
    gap = 32,
    edgeFade = true,
    pauseOnHover = true,
    ...props
}: MarqueeProps): JSX.Element {
    const [focused, setFocused] = useState(false)
    const rowProps = { ...props, direction, speed, gap, edgeFade, pauseOnHover }
    return (
        <div
            className={cn('not-prose space-y-4', className)}
            onFocus={() => setFocused(true)}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false)
            }}
        >
            <Row {...rowProps} focused={focused} />
            {secondRow && (
                <Row
                    {...rowProps}
                    label={`${props.label}, second row`}
                    direction={direction === 'left' ? 'right' : 'left'}
                    focused={focused}
                >
                    {secondRow}
                </Row>
            )}
        </div>
    )
}
