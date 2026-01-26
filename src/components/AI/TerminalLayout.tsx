import React, { ReactNode } from 'react'
import ScrollArea from 'components/RadixUI/ScrollArea'

interface TerminalLayoutProps {
    children: ReactNode
}

export default function TerminalLayout({ children }: TerminalLayoutProps): JSX.Element {
    return (
        <div
            data-scheme="primary"
            className="relative size-full bg-[#151515] text-light-2/90 font-code text-[14px] overflow-hidden leading-[1.4]"
        >
            {/* Scanlines overlay */}
            <div className="absolute inset-0 pointer-events-none z-[1] bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.05)_0px,transparent_1px,transparent_2px,rgba(0,0,0,0.05)_3px)] bg-[length:100%_3px]" />

            {/* Content */}
            <div className="relative z-0 h-full">
                <ScrollArea className="h-full">
                    <div className="p-8">{children}</div>
                </ScrollArea>
            </div>
        </div>
    )
}
