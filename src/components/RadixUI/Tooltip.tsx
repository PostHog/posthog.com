import * as React from 'react'
import { Tooltip as RadixTooltip } from 'radix-ui'

export interface TooltipProps {
    trigger: React.ReactNode
    children: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
    delay?: number
}

const Tooltip = ({ trigger, children, open, onOpenChange, delay = 500 }: TooltipProps) => {
    return (
        <RadixTooltip.Provider delayDuration={delay}>
            <RadixTooltip.Root open={open} onOpenChange={onOpenChange}>
                <RadixTooltip.Trigger asChild>
                    <span>{trigger}</span>
                </RadixTooltip.Trigger>
                <RadixTooltip.Portal>
                    <RadixTooltip.Content
                        data-scheme="secondary"
                        className="select-none rounded bg-primary border border-primary text-primary text-sm px-3 py-2.5 text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] min-w-0 min-h-0 max-w-full max-h-full transition-all will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade"
                        sideOffset={0}
                    >
                        {children}
                        <RadixTooltip.Arrow asChild>
                            <div className="w-5 h-2.5 overflow-hidden">
                                <div className="w-3 h-3 border-r border-b border-primary bg-primary rotate-45 rounded-xs relative left-[3px] top-[-7px]" />
                            </div>
                        </RadixTooltip.Arrow>
                    </RadixTooltip.Content>
                </RadixTooltip.Portal>
            </RadixTooltip.Root>
        </RadixTooltip.Provider>
    )
}

export default Tooltip
