import React from 'react'
import { cn } from '../../../utils'

export type MiddleTruncateProps = Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> & {
    children: string
    endChars?: number
}

export const MiddleTruncate = React.forwardRef<HTMLSpanElement, MiddleTruncateProps>(function MiddleTruncate(
    { children, endChars = 16, className, onCopy, title = children, ...props },
    ref
) {
    const characters = Array.from(children)
    const suffixLength = Number.isFinite(endChars) ? Math.max(1, Math.floor(endChars)) : 16
    const split = Math.max(0, characters.length - suffixLength)

    return (
        <span
            {...props}
            ref={ref}
            title={title}
            className={cn('relative inline-flex min-w-0 max-w-full align-bottom', className)}
            onCopy={(event) => {
                onCopy?.(event)
                if (!event.defaultPrevented) {
                    event.clipboardData.setData('text/plain', children)
                    event.preventDefault()
                }
            }}
        >
            <span className="sr-only select-none">{children}</span>
            <span aria-hidden="true" className="min-w-0 truncate [unicode-bidi:isolate]" dir="ltr">
                {characters.slice(0, split).join('')}
            </span>
            <span
                aria-hidden="true"
                className="max-w-[50%] shrink-0 overflow-hidden whitespace-nowrap text-left [unicode-bidi:isolate]"
                dir="rtl"
                style={split === 0 ? { maxWidth: '100%' } : undefined}
            >
                <span dir="ltr">{characters.slice(split).join('')}</span>
            </span>
        </span>
    )
})
