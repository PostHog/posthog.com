import * as React from 'react'
import { Tooltip as RadixTooltip } from 'radix-ui'

export interface TooltipProps {
    trigger: React.ReactNode
    children: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

const Tooltip = ({ trigger, children, open, onOpenChange }: TooltipProps) => {
    return (
        <RadixTooltip.Provider delayDuration={0}>
            <RadixTooltip.Root open={open} onOpenChange={onOpenChange}>
                <RadixTooltip.Trigger asChild>
                    <span>{trigger}</span>
                </RadixTooltip.Trigger>
                <RadixTooltip.Portal>
                    <RadixTooltip.Content
                        className="select-none rounded bg-white px-[15px] py-2.5 text-[15px] leading-none text-violet11 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] min-w-0 min-h-0 max-w-full max-h-full transition-all will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade"
                        sideOffset={5}
                    >
                        {children}
                        <RadixTooltip.Arrow className="fill-white" />
                    </RadixTooltip.Content>
                </RadixTooltip.Portal>
            </RadixTooltip.Root>
        </RadixTooltip.Provider>
    )
}

export default Tooltip
