import React from 'react'
import { cn } from '../../../utils'
import { Section } from '../Section'
import { wrapText } from '../truncation'

export type EmptyStateRootProps = React.HTMLAttributes<HTMLDivElement> & {
    size?: 'sm' | 'md'
    outlined?: boolean
}

const Root = React.forwardRef<HTMLDivElement, EmptyStateRootProps>(function EmptyStateRoot(
    { size = 'md', outlined = false, className, ...props },
    ref
) {
    const Component = outlined ? Section.Root : 'div'
    return (
        <Component
            ref={ref}
            data-size={size}
            className={cn(
                'group/empty flex flex-col items-center text-center text-primary',
                size === 'sm' ? 'gap-2 p-4' : 'gap-3 p-8',
                className
            )}
            {...props}
        />
    )
})

const Icon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function EmptyStateIcon(
    { className, ...props },
    ref
) {
    return (
        <div
            ref={ref}
            aria-hidden="true"
            className={cn(
                'flex size-12 items-center justify-center rounded-full bg-[rgb(var(--text-primary)/0.07)] text-secondary group-data-[size=sm]/empty:size-9 [&_svg]:size-6 group-data-[size=sm]/empty:[&_svg]:size-5',
                className
            )}
            {...props}
        />
    )
})

const Title = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(function EmptyStateTitle(
    { className, ...props },
    ref
) {
    return (
        <h3
            ref={ref}
            className={cn(
                'm-0 max-w-prose text-lg font-semibold group-data-[size=sm]/empty:text-base',
                wrapText,
                className
            )}
            {...props}
        />
    )
})

const Description = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    function EmptyStateDescription({ className, ...props }, ref) {
        return <p ref={ref} className={cn('m-0 max-w-[48ch] text-sm text-secondary', wrapText, className)} {...props} />
    }
)

const Actions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function EmptyStateActions(
    { className, ...props },
    ref
) {
    return (
        <div ref={ref} className={cn('mt-1 flex flex-wrap items-center justify-center gap-2', className)} {...props} />
    )
})

export const EmptyState = { Root, Icon, Title, Description, Actions }
