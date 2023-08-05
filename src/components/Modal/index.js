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
                className="fixed z-[99999999999] inset-0 overflow-y-auto box-border"
            >
                <Dialog.Overlay className="fixed inset-0 bg-accent/60 dark:bg-accent-dark/60" />
                {children}
            </Dialog>
        </Transition>
    )
}
