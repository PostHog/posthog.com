import React, { Dispatch, SetStateAction } from 'react'
import { motion } from 'framer-motion'
import { IconX } from '@posthog/icons'
import Modal from '.'

export default function SideModal({
    children,
    title,
    open,
    setOpen,
    className = '',
}: {
    children: React.ReactNode
    title?: string
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    className?: string
}): JSX.Element {
    return (
        <Modal open={open} setOpen={setOpen}>
            <div className="overflow-hidden">
                <motion.div
                    transition={{ type: 'tween' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`side-modal bg-white dark:bg-dark z-10 absolute left-4 right-4 md:right-0 md:left-auto top-4 md:top-0 bottom-0 border border-border dark:border-dark md:border-t-0 md:border-r-0 md:border-b-0 h-full max-w-[500px] p-5 flex flex-col overflow-auto rounded-tl-md rounded-tr-md md:rounded-none shadow-xl ${className}`}
                >
                    <div className="relative">
                        <div
                            className={`flex items-center px-4 ${title ? 'border-b mb-4 pb-4 justify-between' : 'justify-end'
                                } border-border dark:border-dark -mx-5 px-5`}
                        >
                            {title && <h2 className="m-0">{title}</h2>}
                            <button onClick={() => setOpen(false)}>
                                <IconX className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity" />
                            </button>
                        </div>
                        <div>{children}</div>
                    </div>
                </motion.div>
            </div>
        </Modal>
    )
}
