import React from 'react'
import { cn } from '../../../../utils'

export default function BoardWindow({
    title,
    aside,
    className,
    children,
}: {
    title: React.ReactNode
    aside?: React.ReactNode
    className?: string
    children: React.ReactNode
}): JSX.Element {
    return (
        <section
            className={cn(
                'flex flex-col overflow-hidden rounded-md border border-primary bg-primary text-primary shadow-2xl',
                className
            )}
        >
            <header className="flex items-center gap-2 border-b border-primary bg-accent px-3 py-1.5 text-sm font-semibold">
                {title}
                <span className="ml-auto flex items-center gap-1.5 font-mono text-[11px] font-normal text-muted">
                    {aside}
                </span>
            </header>
            {children}
        </section>
    )
}
