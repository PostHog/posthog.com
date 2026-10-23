import React from 'react'
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
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="size-full animate-spin motion-reduce:[animation-duration:2.5s]"
            >
                <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="42 15"
                />
            </svg>
            <span className="sr-only">{label}</span>
        </span>
    )
})
