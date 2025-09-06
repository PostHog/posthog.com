import * as React from 'react'
import { ScrollArea as ScrollAreaPrimitive } from 'radix-ui'

interface ScrollAreaProps {
    children: React.ReactNode
    className?: string
    dataScheme?: string
    fadeOverflow?: boolean
    style?: React.CSSProperties
    fullWidth?: boolean
}

const ScrollArea = ({ children, className = '', dataScheme, fadeOverflow = false, style, fullWidth = false }: ScrollAreaProps) => (
    <ScrollAreaPrimitive.Root
        data-scheme={dataScheme}
        className={`relative overflow-hidden h-full ${fullWidth ? 'max-w-screen' : ''} ${className}`}
        style={style}
    >
        <ScrollAreaPrimitive.Viewport className="size-full">{fullWidth ? <div className="px-4 @xl:px-8">{children}</div> : children}</ScrollAreaPrimitive.Viewport>
        <ScrollAreaPrimitive.Scrollbar
            className="flex touch-none select-none p-0.5 transition-colors duration-[160ms] ease-out hover:bg-accent-2 dark:hover:bg-accent-dark data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
            orientation="vertical"
        >
            <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-[10px] bg-black/25 hover:bg-black/50 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
        </ScrollAreaPrimitive.Scrollbar>
        <ScrollAreaPrimitive.Scrollbar
            className="flex touch-none select-none p-0.5 transition-colors duration-[160ms] ease-out hover:bg-accent-2 dark:hover:bg-accent-dark data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
            orientation="horizontal"
        >
            <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-[10px] bg-black/25 hover:bg-black/50 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-[44px] before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2" />
        </ScrollAreaPrimitive.Scrollbar>
        <ScrollAreaPrimitive.Corner className="bg-black/25" />
        {fadeOverflow && (
            <>
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-b from-[color-mix(in_srgb,var(--bg)_0%,transparent)] to-[var(--bg)]" />
            </>
        )}
    </ScrollAreaPrimitive.Root>
)

export default ScrollArea
