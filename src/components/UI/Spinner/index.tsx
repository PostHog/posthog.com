import React from 'react'
import { IconSpinner } from '@posthog/icons'
import { cn } from '../../../utils'

export type SpinnerProps = Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> & {
    size?: 'sm' | 'md' | 'lg'
    label?: string
}

const sizes = { sm: 'size-3.5', md: 'size-4', lg: 'size-5' }

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
    { size = 'md', label = 'Loading', className, ...props },
    ref
) {
    return (
        <span {...props} ref={ref} role="status" className={cn('inline-flex shrink-0', sizes[size], className)}>
            <IconSpinner aria-hidden className="size-full animate-spin motion-reduce:[animation-duration:2.5s]" />
            <span className="sr-only">{label}</span>
        </span>
    )
})
