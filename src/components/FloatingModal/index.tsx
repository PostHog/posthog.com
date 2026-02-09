import React, { useState, useEffect } from 'react'
import { Dialog as RadixDialog } from 'radix-ui'
import { IconX } from '@posthog/icons'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'
import OSButton from 'components/OSButton'

const FloatingModal = ({ children }: { children: React.ReactNode }): JSX.Element | null => {
    const [open, setOpen] = useState(true)
    const { appWindow } = useWindow()
    const { closeWindow } = useApp()
    const title = appWindow?.meta?.title

    useEffect(() => {
        if (!open && appWindow) {
            closeWindow(appWindow)
        }
    }, [open])

    return (
        <RadixDialog.Root open={open} onOpenChange={setOpen} modal={false}>
            <RadixDialog.Portal>
                <RadixDialog.Content
                    aria-label="Floating window"
                    className="data-[state=open]:animate-contentShow data-[state=closed]:animate-contentHide fixed bottom-0 right-6 z-[9999] w-[380px] h-[500px]"
                    onInteractOutside={(e) => e.preventDefault()}
                >
                    <div
                        data-scheme="primary"
                        className="bg-primary text-primary rounded rounded-br-none rounded-bl-none shadow-2xl overflow-hidden size-full flex flex-col"
                    >
                        <div className="rounded border border-primary overflow-hidden size-full">
                            <div className="bg-accent flex items-center justify-between p-1 border-b border-primary">
                                {title && (
                                    <p className="text-primary text-left text-sm font-semibold ml-2 my-0">{title}</p>
                                )}
                                <RadixDialog.Close asChild>
                                    <OSButton icon={<IconX />} size="md" />
                                </RadixDialog.Close>
                            </div>
                            <div className="overflow-hidden size-full">{children}</div>
                        </div>
                    </div>
                </RadixDialog.Content>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    )
}

export default FloatingModal
