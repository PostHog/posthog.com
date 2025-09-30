import React from 'react'
import { Dialog as RadixDialog } from 'radix-ui'
import { IconX } from '@posthog/icons'

interface ModalProps {
    trigger?: React.ReactNode
    title?: string
    description?: string
    children: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
    className?: string
    contentClassName?: string
    showCloseButton?: boolean
}

const Modal = ({
    trigger,
    children,
    open,
    onOpenChange,
    className = '',
    contentClassName = '',
    showCloseButton = true,
}: ModalProps): JSX.Element => {
    return (
        <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
            {trigger && (
                <RadixDialog.Trigger asChild className={className}>
                    {trigger}
                </RadixDialog.Trigger>
            )}
            <RadixDialog.Portal>
                <RadixDialog.Overlay className="bg-black/50 data-[state=open]:animate-fadeIn data-[state=closed]:animate-fadeOut fixed inset-0 z-50" />
                <RadixDialog.Content
                    className={`data-[state=open]:animate-contentShow data-[state=closed]:animate-contentHide fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded bg-primary text-primary z-50 ${contentClassName}`}
                >
                    <div data-scheme="primary">
                        {showCloseButton && (
                            <div className="flex items-center justify-between absolute right-0 top-0 translate-x-1/2 -translate-y-1/2">
                                <RadixDialog.Close asChild>
                                    <button
                                        className="inline-flex size-8 items-center justify-center rounded-full bg-accent border border-primary"
                                        aria-label="Close"
                                    >
                                        <IconX className="size-4" />
                                    </button>
                                </RadixDialog.Close>
                            </div>
                        )}
                        <div className="rounded overflow-hidden border border-primary">{children}</div>
                    </div>
                </RadixDialog.Content>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    )
}

export default Modal
