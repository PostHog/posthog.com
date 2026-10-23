import React from 'react'
import { IconX } from '@posthog/icons'
import { cn } from '../../../utils'
import { chip, chipIcon, chipImage, chipRemove } from '../styles'

export type ChipProps = Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> & {
    children: React.ReactNode
    icon?: React.ReactNode
    image?: string
    onRemove?: () => void
    removeLabel?: string
}

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(function Chip(
    { children, icon, image, onRemove, removeLabel, className, ...props },
    ref
) {
    const label = typeof children === 'string' ? children : undefined

    return (
        <span ref={ref} className={cn(chip, className)} {...props}>
            {image ? (
                <img src={image} alt="" className={chipImage} />
            ) : (
                icon && (
                    <span aria-hidden className={chipIcon}>
                        {icon}
                    </span>
                )
            )}
            <span className="truncate">{children}</span>
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
