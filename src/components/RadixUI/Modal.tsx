import React from 'react'
import { Dialog as RadixDialog } from 'radix-ui'
import { IconX } from '@posthog/icons'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'

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
    maxWidth?: number
    autoHeight?: boolean
}

const Modal = ({
    trigger,
    maxWidth,
    children,
    open,
    onOpenChange,
    className = '',
    contentClassName = '',
    showCloseButton = true,
    autoHeight = false,
}: ModalProps): JSX.Element => {
    const { websiteMode } = useApp()
    const { appWindow } = useWindow()
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
                    <div
                        data-scheme="primary"
                        style={
                            websiteMode
                                ? {
                                      maxWidth: maxWidth || appWindow?.size?.width || '100%',
                                      maxHeight:
                                          autoHeight || appWindow?.appSettings?.size?.autoHeight
                                              ? '100%'
                                              : appWindow?.size?.height || '100%',
                                      width: '100vw',
                                      height: autoHeight || appWindow?.appSettings?.size?.autoHeight ? '100%' : '100vh',
                                  }
                                : {}
                        }
                    >
                        {showCloseButton && (
                            <div className="flex items-center justify-between absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 z-50">
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
                        <div className="rounded overflow-hidden border border-primary size-full">{children}</div>
                    </div>
                </RadixDialog.Content>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    )
}

export default Modal
