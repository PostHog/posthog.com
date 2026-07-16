import React from 'react'
import { Dialog as RadixDialog } from 'radix-ui'
import { IconX } from '@posthog/icons'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'
import OSButton from 'components/OSButton'

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
    const { appWindow, activeInternalMenu } = useWindow()
    const title = appWindow?.meta?.title || activeInternalMenu?.name
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
                        <div className="rounded border border-primary overflow-hidden size-full flex flex-col">
                            <div className="bg-accent flex items-center justify-between p-1 border-b border-primary">
                                <p className="text-primary text-left text-sm font-semibold ml-2 my-0">{title}</p>
                                {showCloseButton && (
                                    <RadixDialog.Close asChild>
                                        <OSButton icon={<IconX />} size="md" />
                                    </RadixDialog.Close>
                                )}
                            </div>

                            <div className="overflow-hidden size-full">{children}</div>
                        </div>
                    </div>
                </RadixDialog.Content>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    )
}

export default Modal
