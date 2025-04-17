import * as React from 'react'
import { Toast as RadixToast } from 'radix-ui'
import OSButton from 'components/OSButton'
import { IconCornerDownRight } from '@posthog/icons'

const Toast = ({
    title,
    description,
    onUndo,
    className = '',
}: {
    title?: string
    description: string
    onUndo?: () => void
    className?: string
}): JSX.Element => {
    const [open, setOpen] = React.useState(true)

    return (
        <RadixToast.Root
            className={`grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md bg-white p-[15px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out] ${className}`}
            open={open}
            onOpenChange={setOpen}
        >
            <div>
                {title && (
                    <RadixToast.Title className="text-[15px] font-semibold text-primary [grid-area:_title]">
                        {title}
                    </RadixToast.Title>
                )}
                <RadixToast.Description asChild>
                    <p className="text-sm mb-0 text-secondary">{description}</p>
                </RadixToast.Description>
            </div>
            {onUndo && (
                <RadixToast.Action
                    onClick={onUndo}
                    className="[grid-area:_action]"
                    asChild
                    altText="Goto schedule to undo"
                >
                    <OSButton variant="ghost" size="sm" icon={<IconCornerDownRight className="scale-x-[-1]" />}>
                        Undo
                    </OSButton>
                </RadixToast.Action>
            )}
        </RadixToast.Root>
    )
}

export default Toast
