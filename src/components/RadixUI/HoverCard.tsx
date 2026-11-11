import React, { useRef, useState } from 'react'
import { HoverCard as RadixHoverCard } from 'radix-ui'
import { cn } from '../../utils'

interface HoverCardProps {
    trigger: React.ReactNode
    children: React.ReactNode
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
    openDelay?: number
    closeDelay?: number
    triggerClassName?: string
    contentClassName?: string
}

export default function HoverCard({
    trigger,
    children,
    side = 'bottom',
    align = 'start',
    openDelay = 400,
    closeDelay = 150,
    triggerClassName = '',
    contentClassName = '',
}: HoverCardProps) {
    const [open, setOpen] = useState(false)
    const suppressed = useRef(false)

    return (
        <RadixHoverCard.Root
            open={open}
            onOpenChange={(next) => {
                if (next && suppressed.current) return
                setOpen(next)
            }}
            openDelay={openDelay}
            closeDelay={closeDelay}
        >
            <RadixHoverCard.Trigger asChild>
                <span
                    className={triggerClassName}
                    onContextMenu={() => {
                        suppressed.current = true
                        setOpen(false)
                    }}
                    onPointerEnter={() => {
                        suppressed.current = false
                    }}
                >
                    {trigger}
                </span>
            </RadixHoverCard.Trigger>
            <RadixHoverCard.Portal>
                <RadixHoverCard.Content
                    data-scheme="primary"
                    side={side}
                    align={align}
                    sideOffset={6}
                    collisionPadding={8}
                    className={cn(
                        'z-[51] max-w-[calc(100vw-1rem)] rounded-md border border-primary bg-primary p-3 text-primary shadow-xl motion-safe:data-[state=open]:animate-[hide_150ms_ease-in_reverse] motion-safe:data-[state=closed]:animate-hide',
                        contentClassName
                    )}
                >
                    {children}
                </RadixHoverCard.Content>
            </RadixHoverCard.Portal>
        </RadixHoverCard.Root>
    )
}
