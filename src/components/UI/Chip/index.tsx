import React from 'react'
import { IconX } from '@posthog/icons'
import SiteLink from 'components/Link'
import type { Props as SiteLinkProps } from 'components/Link'
import { cn } from '../../../utils'
import { chip, chipIcon, chipImage, chipRemove, focusRing } from '../styles'

export type ChipSize = 'md' | 'inline'

type ChipContentProps = {
    children: React.ReactNode
    icon?: React.ReactNode
    image?: string
    size?: ChipSize
    className?: string
}

type ChipRemoveProps =
    | { size?: 'md'; onRemove?: () => void; removeLabel?: string }
    | { size: 'inline'; onRemove?: never; removeLabel?: never }

type ChipLabelProps = ChipContentProps &
    Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> &
    ChipRemoveProps & {
        href?: undefined
    }

type ChipLinkProps = ChipContentProps &
    Omit<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        'href' | 'target' | 'children' | 'className' | 'contextMenu' | 'onClick'
    > &
    Pick<SiteLinkProps, 'state' | 'event' | 'externalNoIcon' | 'onClick'> & {
        href: string
        onRemove?: never
        removeLabel?: never
    }

export type ChipProps = ChipLabelProps | ChipLinkProps

const inlineChip =
    'not-prose inline whitespace-nowrap rounded-full border border-[rgb(var(--text-primary)/0.1)] bg-white/60 px-[0.5em] py-px font-medium text-primary no-underline dark:bg-white/[0.1]'

const inlineChipWithImage = 'pl-px'

const inlineChipImage = 'mr-[0.25em] inline-block size-[1.25em] rounded-full object-cover align-[-0.26em]'

const inlineChipIcon = 'mr-[0.25em] inline-block size-[1em] align-[-0.125em] text-secondary [&>svg]:size-full'

const chipLink = `cursor-pointer no-underline transition-colors duration-150 ease-out hover:border-[rgb(var(--text-primary)/0.25)] hover:bg-white motion-reduce:transition-none dark:hover:bg-white/[0.16] ${focusRing}`

function ChipContent({ children, icon, image, size = 'md' }: ChipContentProps): JSX.Element {
    const isInline = size === 'inline'
    const leading = image ? (
        <img src={image} alt="" loading="lazy" className={isInline ? inlineChipImage : chipImage} />
    ) : (
        icon && (
            <span aria-hidden className={isInline ? inlineChipIcon : chipIcon}>
                {icon}
            </span>
        )
    )

    return (
        <>
            {leading}
            {isInline ? children : <span className="truncate">{children}</span>}
        </>
    )
}

type ChipLabelOwnProps = Omit<ChipLabelProps, keyof ChipContentProps>

type ChipLinkOwnProps = Omit<ChipLinkProps, keyof ChipContentProps>

const isLinkChip = (props: ChipLabelOwnProps | ChipLinkOwnProps): props is ChipLinkOwnProps =>
    typeof props.href === 'string'

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(function Chip(
    { children, icon, image, size = 'md', className, ...ownProps },
    ref
) {
    const surface = cn(size === 'inline' ? cn(inlineChip, image && inlineChipWithImage) : chip, className)
    const content = (
        <ChipContent icon={icon} image={image} size={size}>
            {children}
        </ChipContent>
    )

    if (isLinkChip(ownProps)) {
        const { href, ...linkProps } = ownProps
        return (
            <SiteLink contextMenu={false} {...linkProps} to={href} className={cn(surface, chipLink)}>
                {content}
            </SiteLink>
        )
    }

    const { onRemove, removeLabel, ...spanProps } = ownProps
    const label = typeof children === 'string' ? children : undefined

    return (
        <span ref={ref} className={surface} {...spanProps}>
            {content}
            {onRemove && (
                <button
                    type="button"
                    aria-label={removeLabel ?? (label ? `Remove ${label}` : 'Remove')}
                    onClick={onRemove}
                    className={chipRemove}
                >
                    <IconX className="size-3" />
                </button>
            )}
        </span>
    )
})
