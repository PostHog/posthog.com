import React from 'react'
import { cn } from '../../../utils'
import { colorSoft, colorSolid } from '../colors'
import type { ColorName } from '../colors'

type BadgeSize = 'sm' | 'md'

export type BadgeColor = ColorName

export type BadgeProps = Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> & {
    color?: BadgeColor
    appearance?: 'soft' | 'solid'
    size?: BadgeSize
    icon?: React.ReactNode
}

const badgeSizes: Record<BadgeSize, string> = {
    sm: 'h-5 gap-1 px-1.5 text-[11px]',
    md: 'h-6 gap-1 px-2 text-xs',
}

const iconSizes: Record<BadgeSize, string> = {
    sm: '-ml-0.5 size-3',
    md: '-ml-0.5 size-3.5',
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
    { color = 'gray', appearance = 'solid', size = 'sm', icon, children, className, ...props },
    ref
) {
    return (
        <span
            ref={ref}
            className={cn(
                'inline-flex max-w-full items-center whitespace-nowrap rounded-[4px] border align-middle font-semibold',
                badgeSizes[size],
                appearance === 'soft' ? colorSoft[color] : cn('border-transparent', colorSolid[color]),
                className
            )}
            {...props}
        >
            {icon && (
                <span aria-hidden className={cn('flex shrink-0 items-center [&>svg]:size-full', iconSizes[size])}>
                    {icon}
                </span>
            )}
            <span className="min-w-0 truncate leading-4">{children}</span>
        </span>
    )
})
