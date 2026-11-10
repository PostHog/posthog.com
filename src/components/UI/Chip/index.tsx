import React from 'react'
import { IconX } from '@posthog/icons'
import SiteLink from 'components/Link'
import type { Props as SiteLinkProps } from 'components/Link'
import { Popover } from '../Popover'
import { PreviewCard } from '../PreviewCard'
import { TruncatedText } from '../truncation'
import { cn } from '../../../utils'
import { chip, chipIcon, chipImage, chipImageBorder, chipRemove, focusRing } from '../styles'

export type ChipSize = 'md' | 'inline'
export type ChipImageShape = 'circle' | 'square'

type ChipContentProps = {
    children: React.ReactNode
    icon?: React.ReactNode
    image?: string
    size?: ChipSize
    imageShape?: ChipImageShape
    className?: string
}

type ChipRemoveProps =
    | { size?: 'md'; onRemove?: () => void; removeLabel?: string; preview?: never }
    | { size?: ChipSize; onRemove?: never; removeLabel?: never; preview?: React.ReactNode }

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
        preview?: React.ReactNode
        onRemove?: never
        removeLabel?: never
    }

export type ChipProps = ChipLabelProps | ChipLinkProps

const inlineChip =
    'not-prose inline whitespace-nowrap rounded-[0.35em] border border-[rgb(var(--text-primary)/0.1)] border-b-[rgb(var(--text-primary)/0.3)] bg-white/60 px-[0.55em] py-px text-[0.9em] font-medium text-primary no-underline dark:bg-white/[0.1]'

const inlineChipWithImage = 'pl-px'

const inlineChipImage = `mr-[0.25em] inline-block size-[1.25em] rounded-full align-[-0.26em] ${chipImageBorder}`

const squareChipImage = 'rounded-[3px]'

const squareInlineChipImage = 'rounded-[0.25em]'

const inlineChipIcon = 'mr-[0.25em] inline-block size-[1em] align-[-0.125em] text-secondary [&>svg]:size-full'

const chipLink = `cursor-pointer no-underline transition-colors duration-150 ease-out hover:border-[rgb(var(--text-primary)/0.25)] hover:border-b-[rgb(var(--text-primary)/0.45)] hover:bg-white motion-reduce:transition-none dark:hover:bg-white/[0.16] ${focusRing}`

function ChipContent({ children, icon, image, imageShape = 'circle', size = 'md' }: ChipContentProps): JSX.Element {
    const isInline = size === 'inline'
    const isSquare = imageShape === 'square'
    const leading = image ? (
        <img
            src={image}
            alt=""
            loading="lazy"
            className={
                isInline
                    ? cn(inlineChipImage, isSquare && squareInlineChipImage)
                    : cn(chipImage, isSquare && squareChipImage)
            }
        />
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
            {isInline ? children : <TruncatedText>{children}</TruncatedText>}
        </>
    )
}

type ChipLabelOwnProps = Omit<ChipLabelProps, keyof ChipContentProps>

type ChipLinkOwnProps = Omit<ChipLinkProps, keyof ChipContentProps>

const isLinkChip = (props: ChipLabelOwnProps | ChipLinkOwnProps): props is ChipLinkOwnProps =>
    typeof props.href === 'string'

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(function Chip(
    { children, icon, image, imageShape, size = 'md', className, ...ownProps },
    ref
) {
    const surface = cn(size === 'inline' ? cn(inlineChip, image && inlineChipWithImage) : chip, className)
    const content = (
        <ChipContent icon={icon} image={image} imageShape={imageShape} size={size}>
            {children}
        </ChipContent>
    )

    if (isLinkChip(ownProps)) {
        const { href, preview, ...linkProps } = ownProps
        const link = (
            <SiteLink contextMenu={false} {...linkProps} to={href} className={cn(surface, chipLink)}>
                {content}
            </SiteLink>
        )
        if (!preview) return link
        return (
            <PreviewCard.Root>
                <PreviewCard.Trigger
                    appearance="none"
                    render={<span className={size === 'inline' ? 'inline' : 'inline-flex min-w-0 max-w-full'} />}
                >
                    {link}
                </PreviewCard.Trigger>
                <PreviewCard.Popup className="w-64">
                    <PreviewCard.Arrow />
                    {preview}
                </PreviewCard.Popup>
            </PreviewCard.Root>
        )
    }

    const { onRemove, removeLabel, preview, ...spanProps } = ownProps
    const label = typeof children === 'string' ? children : undefined

    if (preview) {
        return (
            <Popover.Root>
                <Popover.Trigger
                    openOnHover
                    render={
                        <button
                            {...(spanProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
                            ref={ref as React.Ref<HTMLButtonElement>}
                            type="button"
                            className={cn(surface, chipLink)}
                        />
                    }
                >
                    {content}
                </Popover.Trigger>
                <Popover.Popup className="w-64">
                    <Popover.Arrow />
                    {preview}
                </Popover.Popup>
            </Popover.Root>
        )
    }

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
