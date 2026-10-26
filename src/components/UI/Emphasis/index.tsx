import React from 'react'
import type { HTMLAttributes } from 'react'
import { cn } from '../../../utils'

export type EmphasisColor = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'gray'

export type EmphasisProps = Omit<HTMLAttributes<HTMLSpanElement>, 'color'> & { color?: EmphasisColor }

const emphasisColors: Record<EmphasisColor, string> = {
    red: 'bg-red/10 text-red dark:bg-yellow/20 dark:text-yellow',
    blue: 'bg-blue/10 text-blue dark:bg-blue/20',
    green: 'bg-green/25 text-green-dark dark:text-lime-green',
    yellow: 'bg-yellow/15 text-yellow dark:bg-yellow/20',
    purple: 'bg-purple/10 text-purple dark:bg-purple/20',
    gray: 'bg-[rgb(var(--text-primary)/0.06)] text-primary dark:bg-[rgb(var(--text-primary)/0.1)]',
}

export const Emphasis = React.forwardRef<HTMLSpanElement, EmphasisProps>(function Emphasis(
    { color = 'blue', className, ...props },
    ref
) {
    return (
        <span
            ref={ref}
            {...props}
            className={cn(
                'inline box-decoration-clone rounded-[0.15em] px-[0.12em] [-webkit-box-decoration-break:clone]',
                emphasisColors[color],
                className
            )}
        />
    )
})
