import React from 'react'
import { useId } from '../utils'
import type { CSSProperties, HTMLAttributes } from 'react'
import { useTextAnimation } from '../textEffects'
import { focusRing } from '../styles'
import { cn } from '../../../utils'
import './styles.css'

export type RollingTextProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
    words: readonly string[]
    staticText?: string
    interval?: number
    animate?: boolean
}

export function RollingText({
    words,
    staticText,
    interval = 2400,
    animate = true,
    className,
    style,
    ...props
}: RollingTextProps): JSX.Element {
    const options = words.filter((word) => word.trim().length > 0)
    const fallback = options[0] ?? staticText ?? ''
    const accessibleText = options.length > 0 ? `${staticText ? `${staticText}: ` : ''}${options.join(', ')}` : fallback
    const enabled = animate && options.length > 1
    const { ref, active } = useTextAnimation(enabled)
    const animationName = `ui-rolling-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
    const frames = options
        .map((_, index) => {
            const position = -(index * 100) / (options.length + 1)
            const start = (index * 100) / options.length
            const hold = ((index + 0.8) * 100) / options.length
            return `${start}%,${hold}%{transform:translateY(${position}%)}`
        })
        .join('')
    return (
        <span
            ref={ref}
            {...props}
            data-active={active || undefined}
            tabIndex={props.tabIndex ?? (enabled ? 0 : undefined)}
            className={cn(
                'ui-rolling-text relative inline-grid max-w-full overflow-hidden align-baseline',
                enabled && focusRing,
                className
            )}
            style={
                { '--rolling-duration': `${Math.max(1200, interval) * options.length}ms`, ...style } as CSSProperties
            }
        >
            <span className="sr-only">{accessibleText}</span>
            <span aria-hidden="true" className="ui-rolling-static [grid-area:1/1] whitespace-nowrap leading-[1.3em]">
                {fallback}
            </span>
            {options.map((word, index) => (
                <span
                    key={index}
                    aria-hidden="true"
                    className="invisible [grid-area:1/1] whitespace-nowrap leading-[1.3em]"
                >
                    {word}
                </span>
            ))}
            {enabled && (
                <>
                    <style>{`@keyframes ${animationName}{${frames}100%{transform:translateY(${
                        -(options.length * 100) / (options.length + 1)
                    }%)}}`}</style>
                    <span
                        aria-hidden="true"
                        className="ui-rolling-viewport pointer-events-none absolute inset-0 overflow-hidden"
                    >
                        <span className="ui-rolling-reel block" style={{ animationName }}>
                            {[...options, options[0]].map((word, index) => (
                                <span key={index} className="block h-[1.3em] whitespace-nowrap leading-[1.3em]">
                                    {word}
                                </span>
                            ))}
                        </span>
                    </span>
                </>
            )}
        </span>
    )
}
