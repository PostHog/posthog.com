import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { IconX } from '@posthog/icons'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'

const FloatingModal = ({ children }: { children: React.ReactNode }): JSX.Element | null => {
    const [open, setOpen] = useState(true)
    const { appWindow } = useWindow()
    const { closeWindow } = useApp()

    useEffect(() => {
        if (!open && appWindow) {
            closeWindow(appWindow)
        }
    }, [open])

    if (!open || typeof document === 'undefined') return null

    return createPortal(
        <div
            role="dialog"
            aria-modal="false"
            aria-label="Floating window"
            className="fixed bottom-0 right-6 z-[9999]"
            style={{
                width: 380,
                height: 500,
            }}
        >
            <div
                data-scheme="primary"
                className="bg-primary text-primary rounded rounded-br-none rounded-bl-none shadow-2xl border border-primary overflow-hidden size-full flex flex-col"
            >
                <div className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 z-50">
                    <button
                        onClick={() => setOpen(false)}
                        className="inline-flex size-7 items-center justify-center rounded-full bg-accent border border-primary"
                        aria-label="Close"
                    >
                        <IconX className="size-3.5" />
                    </button>
                </div>
                <div className="size-full overflow-auto">{children}</div>
            </div>
        </div>,
        document.body
    )
}

export default FloatingModal
