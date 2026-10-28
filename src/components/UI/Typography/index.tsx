import React from 'react'
import { cn } from '../../../utils'

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
export type HeadingSize = 'display' | 'title' | 'lg' | 'md' | 'sm'

export type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
    level?: HeadingLevel
    size?: HeadingSize
}

const headingSizes: Record<HeadingSize, string> = {
    display: 'text-display',
    title: 'text-title',
    lg: 'text-heading-lg',
    md: 'text-heading-md',
    sm: 'text-heading-sm',
}

const defaultHeadingSize: Record<HeadingLevel, HeadingSize> = {
    1: 'title',
    2: 'lg',
    3: 'md',
    4: 'sm',
    5: 'sm',
    6: 'sm',
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
    { level = 2, size, className, ...props },
    ref
) {
    const Element = `h${level}` as const
    return (
        <Element
            ref={ref}
            className={cn(
                'm-0 text-balance font-heading text-primary',
                headingSizes[size ?? defaultHeadingSize[level]],
                className
            )}
            {...props}
        />
    )
})

export type TextSize = 'lg' | 'md' | 'sm' | 'caption' | 'caption-sm'
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold'
export type TextColor = 'primary' | 'secondary' | 'muted'

export type TextProps = React.HTMLAttributes<HTMLElement> & {
    as?: 'p' | 'span' | 'div'
    size?: TextSize
    weight?: TextWeight
    color?: TextColor
}

const textSizes: Record<TextSize, string> = {
    lg: 'text-body-lg',
    md: 'text-body',
    sm: 'text-body-sm',
    caption: 'text-caption',
    'caption-sm': 'text-caption-sm',
}

const textWeights: Record<TextWeight, string> = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
}

const textColors: Record<TextColor, string> = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    muted: 'text-muted',
}

export const Text = React.forwardRef<HTMLElement, TextProps>(function Text(
    { as: Element = 'p', size = 'md', weight = 'medium', color = 'primary', className, ...props },
    ref
) {
    return (
        <Element
            ref={ref as React.Ref<never>}
            className={cn('m-0 font-body', textSizes[size], textWeights[weight], textColors[color], className)}
            {...props}
        />
    )
})
