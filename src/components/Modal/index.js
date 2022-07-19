import { Dialog } from '@headlessui/react'
import React from 'react'
import { motion } from 'framer-motion'

export default function Modal({ open, setOpen, children }) {
    return (
        <Dialog as="div" open={open} onClose={() => setOpen(false)} className="fixed z-[99999] inset-0 overflow-y-auto">
            {open && (
                <motion.div
                    className="h-full"
                    transition={{ duration: 0.15 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <Dialog.Overlay className="fixed inset-0 bg-tan/90" />
                    {children}
                </motion.div>
            )}
        </Dialog>
    )
}
