import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { type ReactNode } from 'react'
import React from 'react'

interface Props {
    title: string
    children: ReactNode
}

const Tooltip = ({ title, children }: Props): React.ReactElement => {
    return (
        <TooltipPrimitive.Provider delayDuration={0} disableHoverableContent>
            <TooltipPrimitive.Root>
                <TooltipPrimitive.Trigger asChild>
                    <div className="group radix-state-delayed-open:bg-[#f9fafb] radix-state-instant-open:bg-[#f9fafb] radix-state-on:bg-[#111827] radix-state-open:bg-[#111827]">
                        {children}
                    </div>
                </TooltipPrimitive.Trigger>
                <TooltipPrimitive.Content
                    sideOffset={4}
                    className={
                        'radix-side-top:animate-slide-down-fade radix-side-right:animate-slide-left-fade radix-side-bottom:animate-slide-up-fade radix-side-left:animate-slide-right-fade inline-flex items-center rounded-md bg-[#1f2937] px-4 py-2.5'
                    }
                >
                    <TooltipPrimitive.Arrow className="fill-current text-[#1f2937]" />
                    <span className="block text-xs leading-none text-[#f3f4f6]">{title}</span>
                </TooltipPrimitive.Content>
            </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
    )
}

export default Tooltip
