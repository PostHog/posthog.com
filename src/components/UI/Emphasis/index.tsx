import React from 'react'
import type { HTMLAttributes } from 'react'
import type { Tone } from '../styles'
import { toneFill } from '../styles'
import { cn } from '../../../utils'

export type EmphasisProps = HTMLAttributes<HTMLSpanElement> & { tone?: Tone }
const darkFill: Record<Tone, string> = {
    neutral: 'dark:bg-[rgb(var(--text-primary)/0.1)]',
    info: 'dark:bg-blue/20',
    success: 'dark:bg-green/20',
    warning: 'dark:bg-yellow/20',
    error: 'dark:bg-salmon/20',
    brand: 'dark:bg-yellow/20',
}
const emphasisFill: Record<Tone, string> = { ...toneFill, brand: 'bg-red/10' }
const emphasisText: Record<Tone, string> = {
    neutral: 'text-primary',
    info: 'text-blue',
    success: 'text-[color:color-mix(in_srgb,theme(colors.green)_80%,black)] dark:text-green',
    warning: 'text-[color:color-mix(in_srgb,theme(colors.yellow)_62%,black)] dark:text-yellow',
    error: 'text-[color:color-mix(in_srgb,theme(colors.salmon)_85%,black)] dark:text-salmon',
    brand: 'text-red dark:text-yellow',
}

export const Emphasis = React.forwardRef<HTMLSpanElement, EmphasisProps>(function Emphasis(
    { tone = 'info', className, ...props },
    ref
) {
    return (
        <span
            ref={ref}
            {...props}
            className={cn(
                'inline box-decoration-clone rounded-[0.15em] px-[0.12em] [-webkit-box-decoration-break:clone]',
                emphasisFill[tone],
                darkFill[tone],
                emphasisText[tone],
                className
            )}
        />
    )
})
