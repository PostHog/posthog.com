import React from 'react'
import { Text } from 'components/UI/Typography'
import { cn } from '../../utils'

export function DemoLabel({ children, className }: { children: React.ReactNode; className?: string }): JSX.Element {
    return (
        <Text as="span" size="caption" color="secondary" className={cn('whitespace-nowrap', className)}>
            {children}
        </Text>
    )
}

export function DemoRows({ children, className }: { children: React.ReactNode; className?: string }): JSX.Element {
    return (
        <div className={cn('grid gap-x-6 gap-y-4 @md:grid-cols-[8rem_minmax(0,1fr)] @md:items-center', className)}>
            {children}
        </div>
    )
}

export function DemoRow({
    label,
    fill = false,
    children,
}: {
    label: React.ReactNode
    fill?: boolean
    children: React.ReactNode
}): JSX.Element {
    return (
        <>
            <DemoLabel>{label}</DemoLabel>
            <div className={cn('-mt-3 min-w-0 @md:mt-0', fill ? 'w-full' : 'flex flex-wrap items-center gap-3')}>
                {children}
            </div>
        </>
    )
}

export function DemoColumns({ children, className }: { children: React.ReactNode; className?: string }): JSX.Element {
    return <div className={cn('grid gap-8 @md:grid-cols-2', className)}>{children}</div>
}

export function DemoColumn({ label, children }: { label: React.ReactNode; children: React.ReactNode }): JSX.Element {
    return (
        <div className="flex min-w-0 flex-col gap-4">
            <DemoLabel className="border-b border-[rgb(var(--text-primary)/0.1)] pb-2">{label}</DemoLabel>
            {children}
        </div>
    )
}
