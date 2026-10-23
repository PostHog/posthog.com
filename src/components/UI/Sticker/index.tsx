import React from 'react'
import type { ComponentType, CSSProperties, HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils'
import './styles.css'
import { useId } from '../utils'

export type StickerProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
    sticker?: ComponentType<{ className?: string }>
    children?: ReactNode
    size?: 'sm' | 'md' | 'lg'
    tilt?: number
    popIn?: boolean
    outline?: boolean
    label?: string
}

const sizes = {
    sm: 'size-[1em] [--ui-sticker-content-size:1em]',
    md: 'my-[-0.125em] size-[1.25em] [--ui-sticker-content-size:1.25em]',
    lg: 'my-[-0.3em] size-[1.75em] [--ui-sticker-content-size:1.75em]',
}

export const Sticker = React.forwardRef<HTMLSpanElement, StickerProps>(function Sticker(
    { sticker: Art, children, size = 'md', tilt = 0, popIn = false, outline = !Art, label, className, style, ...props },
    ref
) {
    const filterId = `sticker-${useId().replace(/:/g, '')}`
    return (
        <span
            ref={ref}
            {...props}
            role={label ? 'img' : undefined}
            aria-label={label}
            aria-hidden={label ? undefined : true}
            className={cn('inline-block shrink-0 align-middle leading-none', sizes[size], className)}
            style={{ ...style, '--ui-sticker-tilt': `${tilt}deg` } as CSSProperties}
        >
            {outline && (
                <svg aria-hidden className="absolute size-0" focusable="false">
                    <defs>
                        <filter
                            id={filterId}
                            x="-50%"
                            y="-50%"
                            width="200%"
                            height="200%"
                            colorInterpolationFilters="sRGB"
                        >
                            <feMorphology in="SourceAlpha" operator="dilate" radius="2" result="edge" />
                            <feFlood floodColor="white" />
                            <feComposite in2="edge" operator="in" result="outline" />
                            <feDropShadow in="outline" dx="0" dy="2" stdDeviation="1.5" floodOpacity="0.22" />
                            <feComposite in="SourceGraphic" />
                        </filter>
                    </defs>
                </svg>
            )}
            <span
                className={cn('ui-sticker-art flex size-full items-center justify-center', popIn && 'ui-sticker-pop')}
            >
                <span
                    className="flex size-full items-center justify-center text-[length:var(--ui-sticker-content-size)] [&>svg]:size-full [&>img]:size-full [&>img]:object-contain"
                    style={outline ? { filter: `url(#${filterId})` } : undefined}
                >
                    {Art ? <Art className="size-full" /> : children}
                </span>
            </span>
        </span>
    )
})
