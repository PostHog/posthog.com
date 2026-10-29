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

const solidEdges: Record<BadgeColor, string> = {
    gray: 'border-b-[color:color-mix(in_srgb,rgb(var(--text-primary))_70%,white)] dark:border-b-[color:color-mix(in_srgb,rgb(var(--text-primary))_74%,black)]',
    brand: 'border-b-[color:color-mix(in_srgb,theme(colors.orange)_68%,black)] dark:border-b-[color:color-mix(in_srgb,theme(colors.orange)_60%,white)]',
    blue: 'border-b-[color:color-mix(in_srgb,theme(colors.brand.blue.DEFAULT)_70%,black)] dark:border-b-[color:color-mix(in_srgb,theme(colors.brand.blue.DEFAULT)_62%,white)]',
    cobalt: 'border-b-[color:color-mix(in_srgb,theme(colors.brand.cobalt.DEFAULT)_72%,black)] dark:border-b-[color:color-mix(in_srgb,theme(colors.brand.cobalt.DEFAULT)_64%,white)]',
    coral: 'border-b-[color:color-mix(in_srgb,theme(colors.brand.coral.DEFAULT)_70%,black)] dark:border-b-[color:color-mix(in_srgb,theme(colors.brand.coral.DEFAULT)_62%,white)]',
    'corn-blue':
        'border-b-[color:color-mix(in_srgb,theme(colors.brand.corn-blue.DEFAULT)_68%,black)] dark:border-b-[color:color-mix(in_srgb,theme(colors.brand.corn-blue.DEFAULT)_58%,white)]',
    green: 'border-b-[color:color-mix(in_srgb,theme(colors.brand.green.DEFAULT)_66%,black)] dark:border-b-[color:color-mix(in_srgb,theme(colors.brand.green.DEFAULT)_58%,white)]',
    lemon: 'border-b-[color:color-mix(in_srgb,theme(colors.brand.lemon.DEFAULT)_62%,black)] dark:border-b-[color:color-mix(in_srgb,theme(colors.brand.lemon.DEFAULT)_55%,white)]',
    lime: 'border-b-[color:color-mix(in_srgb,theme(colors.brand.lime.DEFAULT)_64%,black)] dark:border-b-[color:color-mix(in_srgb,theme(colors.brand.lime.DEFAULT)_55%,white)]',
    purple: 'border-b-[color:color-mix(in_srgb,theme(colors.brand.purple.DEFAULT)_72%,black)] dark:border-b-[color:color-mix(in_srgb,theme(colors.brand.purple.DEFAULT)_64%,white)]',
    tangerine:
        'border-b-[color:color-mix(in_srgb,theme(colors.brand.tangerine.DEFAULT)_70%,black)] dark:border-b-[color:color-mix(in_srgb,theme(colors.brand.tangerine.DEFAULT)_62%,white)]',
    teal: 'border-b-[color:color-mix(in_srgb,theme(colors.brand.teal.DEFAULT)_64%,black)] dark:border-b-[color:color-mix(in_srgb,theme(colors.brand.teal.DEFAULT)_55%,white)]',
    violet: 'border-b-[color:color-mix(in_srgb,theme(colors.brand.violet.DEFAULT)_72%,black)] dark:border-b-[color:color-mix(in_srgb,theme(colors.brand.violet.DEFAULT)_64%,white)]',
    yellow: 'border-b-[color:color-mix(in_srgb,theme(colors.brand.yellow.DEFAULT)_64%,black)] dark:border-b-[color:color-mix(in_srgb,theme(colors.brand.yellow.DEFAULT)_55%,white)]',
}

const softEdges: Record<BadgeColor, string> = {
    gray: 'border-b-[rgb(var(--text-primary)/0.16)] dark:border-b-[rgb(var(--text-primary)/0.24)]',
    brand: 'border-b-[color:color-mix(in_srgb,theme(colors.orange)_42%,transparent)] dark:border-b-[color:color-mix(in_srgb,theme(colors.orange)_62%,transparent)]',
    blue: 'border-b-[color:color-mix(in_srgb,theme(colors.brand.blue.DEFAULT)_40%,transparent)] dark:border-b-[color:color-mix(in_srgb,theme(colors.brand.blue.DEFAULT)_60%,transparent)]',
    cobalt: 'border-b-[color:color-mix(in_srgb,theme(colors.brand.cobalt.DEFAULT)_36%,transparent)] dark:border-b-[color:color-mix(in_srgb,theme(colors.brand.cobalt.DEFAULT)_58%,transparent)]',
    coral: 'border-b-[color:color-mix(in_srgb,theme(colors.brand.coral.DEFAULT)_40%,transparent)] dark:border-b-[color:color-mix(in_srgb,theme(colors.brand.coral.DEFAULT)_60%,transparent)]',
    'corn-blue':
        'border-b-[color:color-mix(in_srgb,theme(colors.brand.corn-blue.DEFAULT)_44%,transparent)] dark:border-b-[color:color-mix(in_srgb,theme(colors.brand.corn-blue.DEFAULT)_62%,transparent)]',
    green: 'border-b-[color:color-mix(in_srgb,theme(colors.brand.green.DEFAULT)_44%,transparent)] dark:border-b-[color:color-mix(in_srgb,theme(colors.brand.green.DEFAULT)_62%,transparent)]',
    lemon: 'border-b-[color:color-mix(in_srgb,theme(colors.brand.lemon.DEFAULT)_56%,transparent)] dark:border-b-[color:color-mix(in_srgb,theme(colors.brand.lemon.DEFAULT)_66%,transparent)]',
    lime: 'border-b-[color:color-mix(in_srgb,theme(colors.brand.lime.DEFAULT)_50%,transparent)] dark:border-b-[color:color-mix(in_srgb,theme(colors.brand.lime.DEFAULT)_64%,transparent)]',
    purple: 'border-b-[color:color-mix(in_srgb,theme(colors.brand.purple.DEFAULT)_36%,transparent)] dark:border-b-[color:color-mix(in_srgb,theme(colors.brand.purple.DEFAULT)_58%,transparent)]',
    tangerine:
        'border-b-[color:color-mix(in_srgb,theme(colors.brand.tangerine.DEFAULT)_40%,transparent)] dark:border-b-[color:color-mix(in_srgb,theme(colors.brand.tangerine.DEFAULT)_60%,transparent)]',
    teal: 'border-b-[color:color-mix(in_srgb,theme(colors.brand.teal.DEFAULT)_50%,transparent)] dark:border-b-[color:color-mix(in_srgb,theme(colors.brand.teal.DEFAULT)_64%,transparent)]',
    violet: 'border-b-[color:color-mix(in_srgb,theme(colors.brand.violet.DEFAULT)_36%,transparent)] dark:border-b-[color:color-mix(in_srgb,theme(colors.brand.violet.DEFAULT)_58%,transparent)]',
    yellow: 'border-b-[color:color-mix(in_srgb,theme(colors.brand.yellow.DEFAULT)_50%,transparent)] dark:border-b-[color:color-mix(in_srgb,theme(colors.brand.yellow.DEFAULT)_64%,transparent)]',
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
                'inline-flex max-w-full items-center whitespace-nowrap rounded-[4px] border border-transparent align-middle font-semibold',
                badgeSizes[size],
                appearance === 'soft'
                    ? cn(colorSoft[color], softEdges[color])
                    : cn(colorSolid[color], solidEdges[color]),
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
