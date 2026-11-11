import React from 'react'
import { IconX } from '@posthog/icons'
import { TruncatedText } from '../truncation'
import { cn } from '../../../utils'
import { chipBase, chipIcon, chipImage, chipImageBorder, chipRemove } from '../styles'
import { TagShell, tagSurface } from '../tag'
import type { TagAppearance, TagColor, TagLabelProps, TagLinkProps } from '../tag'

export type ChipSize = 'md' | 'inline'

export type ChipAppearance = TagAppearance

export type ChipColor = TagColor

type ChipLookProps = {
    children: React.ReactNode
    icon?: React.ReactNode
    image?: string
    size?: ChipSize
    color?: ChipColor
    appearance?: ChipAppearance
    className?: string
}

type ChipRemoveProps =
    | { size?: 'md'; onRemove?: () => void; removeLabel?: string; preview?: never }
    | { size?: ChipSize; onRemove?: never; removeLabel?: never; preview?: React.ReactNode }

type ChipLabelProps = ChipLookProps & TagLabelProps & ChipRemoveProps

type ChipLinkProps = ChipLookProps & TagLinkProps & { onRemove?: never; removeLabel?: never }

export type ChipProps = ChipLabelProps | ChipLinkProps

const inlineChipBase =
    'not-prose inline whitespace-nowrap rounded-full border px-[0.55em] py-px text-[0.9em] font-medium no-underline'

const inlineChipWithImage = 'pl-px'

const inlineChipImage = `mr-[0.25em] inline-block size-[1.25em] rounded-full align-[-0.26em] ${chipImageBorder}`

const inlineChipIcon = 'mr-[0.25em] inline-block size-[1em] align-[-0.125em] text-secondary [&>svg]:size-full'

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(function Chip(
    {
        children,
        icon,
        image,
        size = 'md',
        color = 'white',
        appearance = 'solid',
        className,
        onRemove,
        removeLabel,
        ...ownProps
    },
    ref
) {
    const isInline = size === 'inline'
    const tinted = color !== 'white'
    const label = typeof children === 'string' ? children : undefined

    return (
        <TagShell
            ref={ref}
            {...ownProps}
            color={color}
            inline={isInline}
            className={cn(
                isInline ? cn(inlineChipBase, image && inlineChipWithImage) : chipBase,
                tagSurface(color, appearance),
                className
            )}
        >
            {image ? (
                <img src={image} alt="" loading="lazy" className={isInline ? inlineChipImage : chipImage} />
            ) : (
                icon && (
                    <span aria-hidden className={cn(isInline ? inlineChipIcon : chipIcon, tinted && 'text-current')}>
                        {icon}
                    </span>
                )
            )}
            {isInline ? children : <TruncatedText>{children}</TruncatedText>}
            {onRemove && (
                <button
                    type="button"
                    aria-label={removeLabel ?? (label ? `Remove ${label}` : 'Remove')}
                    onClick={onRemove}
                    className={cn(chipRemove, tinted && 'text-current hover:text-current')}
                >
                    <IconX className="size-3" />
                </button>
            )}
        </TagShell>
    )
})
