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
    actionAsIcon,
    className = '',
    duration,
    image,
    verticalAlign = 'items-center',
    onClose,
}: {
    title?: string
    description: string | React.ReactNode
    onUndo?: () => void
    onAction?: () => void
    actionLabel?: string | React.ReactNode
    actionAsIcon?: React.ReactNode
    className?: string
    duration?: number
    image?: React.ReactNode
    verticalAlign?: string
    onClose?: () => void
}): JSX.Element => {
    const [open, setOpen] = React.useState(true)

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen)
        if (!isOpen && onClose) {
            // Small delay to allow the closing animation to complete
            setTimeout(() => {
                onClose()
            }, 100)
        }
    }

    const handleAction = () => {
        if (onUndo) {
            onUndo()
        } else if (onAction) {
            onAction()
        }
        handleOpenChange(false)
    }

    return (
        <RadixToast.Root
            data-scheme="primary"
            className={`ToastRoot grid grid-cols-[auto_max-content] gap-x-[15px] rounded-md bg-light dark:bg-dark border border-primary text-primary prose dark:prose-invert p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-swipeOut data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out] relative ${verticalAlign ? verticalAlign : 'items-center'} ${className}`}
            open={open}
            onOpenChange={handleOpenChange}
            duration={duration || 3000}
        >
            <div className="not-prose">
                {title && (
                    <RadixToast.Title className="text-[15px] font-semibold text-primary leading-tight [grid-area:_title]">
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
                    onClick={handleAction}
                    className="[grid-area:_action]"
                    asChild
                    altText={actionLabel}
                >
                    <OSButton size="sm" hover="background" icon={onUndo ? <IconUndo /> : undefined}>
                        {actionAsIcon ? actionAsIcon : actionLabel}
                    </OSButton>
                </RadixToast.Action>
            )}
        </RadixToast.Root>
    )
}

export default Toast
