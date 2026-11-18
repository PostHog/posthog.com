import React from 'react'
import { TruncatedText } from '../truncation'
import { cn } from '../../../utils'
import { TagShell, tagSurface } from '../tag'
import type { TagAppearance, TagColor, TagLabelProps, TagLinkProps } from '../tag'

type BadgeSize = 'sm' | 'md' | 'inline'

export type BadgeAppearance = TagAppearance

export type BadgeColor = TagColor

type BadgeLookProps = {
    color?: BadgeColor
    appearance?: BadgeAppearance
    size?: BadgeSize
    icon?: React.ReactNode
    children?: React.ReactNode
    className?: string
}

export type BadgeProps = BadgeLookProps & (TagLabelProps | TagLinkProps)

const badgeSizes: Record<BadgeSize, string> = {
    sm: 'inline-flex h-5 max-w-full items-center gap-1 px-1.5 text-11',
    md: 'inline-flex h-6 max-w-full items-center gap-1 px-2 text-xs',
    inline: 'not-prose inline px-[0.4em] py-[0.1em] align-[0.08em] text-[0.8em] leading-none',
}

const iconSizes: Record<BadgeSize, string> = {
    sm: 'flex shrink-0 items-center -ml-0.5 size-3 [&>svg]:size-full',
    md: 'flex shrink-0 items-center -ml-0.5 size-3.5 [&>svg]:size-full',
    inline: 'mr-[0.3em] inline-block size-[1em] align-[-0.125em] [&>svg]:size-full',
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
    { color = 'white', appearance = 'solid', size = 'sm', icon, children, className, ...ownProps },
    ref
) {
    return (
        <TagShell
            ref={ref}
            {...ownProps}
            color={color}
            inline={size === 'inline'}
            className={cn(
                'whitespace-nowrap rounded-[4px] border align-middle font-semibold',
                badgeSizes[size],
                tagSurface(color, appearance),
                className
            )}
        >
            {icon && (
                <span aria-hidden className={iconSizes[size]}>
                    {icon}
                </span>
            )}
            {size === 'inline' ? children : <TruncatedText className="leading-4">{children}</TruncatedText>}
        </TagShell>
    )
})
