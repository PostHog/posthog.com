import React from 'react'
import SiteLink from 'components/Link'
import type { Props as SiteLinkProps } from 'components/Link'
import { cn } from '../../../utils'
import { colorSoft, colorSolid } from '../colors'
import type { ColorName } from '../colors'
import { focusRing } from '../styles'

type BadgeSize = 'sm' | 'md' | 'inline'

export type BadgeColor = ColorName

type BadgeLookProps = {
    color?: BadgeColor
    appearance?: 'soft' | 'solid'
    size?: BadgeSize
    icon?: React.ReactNode
    children?: React.ReactNode
    className?: string
}

type BadgeLabelProps = BadgeLookProps &
    Omit<React.HTMLAttributes<HTMLSpanElement>, 'color' | 'children' | 'className'> & {
        href?: undefined
    }

type BadgeLinkProps = BadgeLookProps &
    Omit<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        'color' | 'href' | 'target' | 'children' | 'className' | 'contextMenu' | 'onClick'
    > &
    Pick<SiteLinkProps, 'state' | 'event' | 'externalNoIcon' | 'onClick'> & {
        href: string
    }

export type BadgeProps = BadgeLabelProps | BadgeLinkProps

type BadgeLabelOwnProps = Omit<BadgeLabelProps, keyof BadgeLookProps>

type BadgeLinkOwnProps = Omit<BadgeLinkProps, keyof BadgeLookProps>

const isLinkBadge = (props: BadgeLabelOwnProps | BadgeLinkOwnProps): props is BadgeLinkOwnProps =>
    typeof props.href === 'string'

const badgeSizes: Record<BadgeSize, string> = {
    sm: 'inline-flex h-5 max-w-full items-center gap-1 px-1.5 text-[11px]',
    md: 'inline-flex h-6 max-w-full items-center gap-1 px-2 text-xs',
    inline: 'not-prose inline px-[0.4em] py-[0.1em] align-[0.08em] text-[0.8em] leading-none',
}

const badgeLink = `cursor-pointer no-underline transition-[filter] duration-150 ease-out hover:brightness-[0.94] motion-reduce:transition-none dark:hover:brightness-110 ${focusRing}`

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
    sm: 'flex shrink-0 items-center -ml-0.5 size-3 [&>svg]:size-full',
    md: 'flex shrink-0 items-center -ml-0.5 size-3.5 [&>svg]:size-full',
    inline: 'mr-[0.3em] inline-block size-[1em] align-[-0.125em] [&>svg]:size-full',
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
    { color = 'gray', appearance = 'solid', size = 'sm', icon, children, className, ...ownProps },
    ref
) {
    const badgeClassName = cn(
        'whitespace-nowrap rounded-[4px] border border-transparent align-middle font-semibold',
        badgeSizes[size],
        appearance === 'soft' ? cn(colorSoft[color], softEdges[color]) : cn(colorSolid[color], solidEdges[color]),
        className
    )
    const content = (
        <>
            {icon && (
                <span aria-hidden className={iconSizes[size]}>
                    {icon}
                </span>
            )}
            {size === 'inline' ? children : <span className="min-w-0 truncate leading-4">{children}</span>}
        </>
    )

    if (isLinkBadge(ownProps)) {
        const { href, ...linkProps } = ownProps
        return (
            <SiteLink contextMenu={false} {...linkProps} to={href} className={cn(badgeClassName, badgeLink)}>
                {content}
            </SiteLink>
        )
    }

    return (
        <span ref={ref} className={badgeClassName} {...ownProps}>
            {content}
        </span>
    )
})
