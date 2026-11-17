import React from 'react'
import { IconSpinner } from '@posthog/icons'
import { cn } from '../../../utils'
import { iconSizes } from '../styles'

export type SpinnerProps = Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> & {
    size?: 'sm' | 'md' | 'lg'
    label?: string
}

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
    { size = 'md', label = 'Loading', className, ...props },
    ref
) {
    return (
        <span {...props} ref={ref} role="status" className={cn('inline-flex shrink-0', iconSizes[size], className)}>
            <IconSpinner aria-hidden className="size-full animate-spin motion-reduce:[animation-duration:2.5s]" />
            <span className="sr-only">{label}</span>
        </span>
    )
})
