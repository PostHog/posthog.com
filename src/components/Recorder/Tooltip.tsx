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
                    <div className="group radix-state-delayed-open:bg-gray-50 radix-state-instant-open:bg-gray-50 radix-state-on:bg-gray-900 radix-state-open:bg-gray-900">
                        {children}
                    </div>
                </TooltipPrimitive.Trigger>
                <TooltipPrimitive.Content
                    sideOffset={4}
                    className={
                        'radix-side-top:animate-slide-down-fade radix-side-right:animate-slide-left-fade radix-side-bottom:animate-slide-up-fade radix-side-left:animate-slide-right-fade inline-flex items-center rounded-md bg-gray-800 px-4 py-2.5'
                    }
                >
                    <TooltipPrimitive.Arrow className="fill-current text-gray-800" />
                    <span className="block text-xs leading-none text-gray-100">{title}</span>
                </TooltipPrimitive.Content>
            </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
    )
}

export default Tooltip
