import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { motion } from 'framer-motion'

export default function Modal({ open, setOpen, children }) {
    return (
        <Transition
            show={open}
            enter="transition-opacity duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            as={Fragment}
        >
            <Dialog
                as="div"
                open={open}
                onClose={() => setOpen(false)}
                className="fixed z-[99999] inset-0 overflow-y-auto"
            >
                <Dialog.Overlay className="fixed inset-0 bg-tan/90" />
                {children}
            </Dialog>
        </Transition>
    )
}
