import { Dialog } from '@headlessui/react'
import React from 'react'

export default function Modal({ open, setOpen, children }) {
    return (
        <Dialog as="div" open={open} onClose={() => setOpen(false)} className="fixed z-[99999] inset-0 overflow-y-auto">
            <Dialog.Overlay className="fixed inset-0 bg-tan bg-opacity-90" />
            {children}
        </Dialog>
    )
}
