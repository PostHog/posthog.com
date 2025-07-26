import * as React from 'react'
import { Toast as RadixToast } from 'radix-ui'
import OSButton from 'components/OSButton'
import { IconUndo } from '@posthog/icons'
import './css/toast.css'

const Toast = ({
    title,
    description,
    onUndo,
    onAction,
    actionLabel = 'Undo',
    className = '',
    duration,
    image,
}: {
    title?: string
    description: string | React.ReactNode
    onUndo?: () => void
    onAction?: () => void
    actionLabel?: string
    className?: string
    duration?: number
    image?: React.ReactNode
}): JSX.Element => {
    const [open, setOpen] = React.useState(true)

    return (
        <RadixToast.Provider swipeDirection="right">
            <RadixToast.Root
                data-scheme="primary"
                className={`ToastRoot grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md bg-light dark:bg-dark border border-primary text-primary p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-swipeOut data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out] ${className}`}
                open={open}
                onOpenChange={setOpen}
                duration={duration || 3000}
            >
                <div className="not-prose relative">
                    {title && (
                        <RadixToast.Title className="text-[15px] font-semibold text-primary [grid-area:_title]">
                            {title}
                        </RadixToast.Title>
                    )}
                    <RadixToast.Description className="text-sm !my-0 text-secondary">
                        {description}
                    </RadixToast.Description>
                    {image && image}
                </div>
                {(onUndo || onAction) && (
                    <RadixToast.Action
                        onClick={onUndo || onAction}
                        className="[grid-area:_action]"
                        asChild
                        altText={actionLabel}
                    >
                        <OSButton size="sm" icon={onUndo ? <IconUndo /> : undefined}>
                            {actionLabel}
                        </OSButton>
                    </RadixToast.Action>
                )}
            </RadixToast.Root>

            <RadixToast.Viewport
                className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-[390px] max-w-[100vw] m-0 list-none outline-none"
                data-radix-toast-viewport
            />
        </RadixToast.Provider>
    )
}

export default Toast
