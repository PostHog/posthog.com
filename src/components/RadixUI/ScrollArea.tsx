import * as React from 'react'
import { ScrollArea as ScrollAreaPrimitive } from 'radix-ui'

interface ScrollAreaProps {
    children: React.ReactNode
    className?: string
}

const ScrollArea = ({ children, className }: ScrollAreaProps) => (
    <ScrollAreaPrimitive.Root className={`overflow-hidden h-full ${className}`}>
        <ScrollAreaPrimitive.Viewport className="size-full">{children}</ScrollAreaPrimitive.Viewport>
        <ScrollAreaPrimitive.Scrollbar
            className="flex touch-none select-none bg-light dark:bg-dark p-0.5 transition-colors duration-[160ms] ease-out hover:bg-accent-2 dark:hover:bg-accent-dark data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
            orientation="vertical"
        >
            <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-[10px] bg-black/25 hover:bg-black/50 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
        </ScrollAreaPrimitive.Scrollbar>
        <ScrollAreaPrimitive.Scrollbar
            className="flex touch-none select-none bg-light dark:bg-dark p-0.5 transition-colors duration-[160ms] ease-out hover:bg-accent-2 dark:hover:bg-accent-dark data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
            orientation="horizontal"
        >
            <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-[10px] bg-black/25 hover:bg-black/50 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-[44px] before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2" />
        </ScrollAreaPrimitive.Scrollbar>
        <ScrollAreaPrimitive.Corner className="bg-black/25" />
    </ScrollAreaPrimitive.Root>
)

export default ScrollArea
