import React, { useRef } from 'react'
import { Popover as RadixPopover } from 'radix-ui'
import { IconX } from '@posthog/icons'
import OSButton from 'components/OSButton'
import { IconTextWidthFixed, IconTableOfContents, IconClockRewind } from 'components/OSIcons'

interface PopoverProps {
    trigger: React.ReactNode
    title?: string
    children: React.ReactNode
    dataScheme: string
    className?: string
    contentClassName?: string
    sideOffset?: number
}

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
    ({ trigger, title, children, dataScheme, className = '', contentClassName = '', sideOffset = 5 }, ref) => {
        return (
            <RadixPopover.Root>
                <RadixPopover.Trigger asChild className={className}>
                    {trigger}
                </RadixPopover.Trigger>
                <RadixPopover.Portal>
                    <RadixPopover.Content
                        ref={ref}
                        data-scheme={dataScheme}
                        className={`rounded p-3 bg-primary shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade ${contentClassName}`}
                        sideOffset={sideOffset}
                        align="start"
                        side="bottom"
                    >
                        <div className="flex flex-col gap-2.5">
                            <div className="flex justify-between items-center">
                                {title && <strong>{title}</strong>}
                                <div className="flex items-center">
                                    <RadixPopover.Close
                                        className="inline-flex size-[25px] cursor-default items-center justify-center rounded-full text-violet11 outline-none hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7"
                                        aria-label="Close"
                                    >
                                        <IconX />
                                    </RadixPopover.Close>
                                </div>
                            </div>
                            {children}
                        </div>
                        <RadixPopover.Arrow className="fill-white" />
                    </RadixPopover.Content>
                </RadixPopover.Portal>
            </RadixPopover.Root>
        )
    }
)

Popover.displayName = 'Popover'
