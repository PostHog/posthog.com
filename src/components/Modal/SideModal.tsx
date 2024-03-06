import React, { Dispatch, SetStateAction } from 'react'
import { motion } from 'framer-motion'
import { IconX } from '@posthog/icons'
import Modal from '.'

export default function SideModal({
    children,
    title,
    open,
    setOpen,
}: {
    children: React.ReactNode
    title?: string
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}): JSX.Element {
    return (
        <Modal open={open} setOpen={setOpen}>
            <div className="overflow-hidden">
                <motion.div
                    transition={{ type: 'tween' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white dark:bg-dark z-10 absolute right-0 top-0 border-l border-border dark:border-dark h-full max-w-[500px] w-full p-5 flex flex-col overflow-auto"
                >
                    <div
                        className={`flex items-center ${title ? 'border-b mb-4 pb-4 justify-between' : 'justify-end'
                            } border-border dark:border-dark -mx-5 px-5`}
                    >
                        {title && <h2 className="m-0">{title}</h2>}
                        <button onClick={() => setOpen(false)}>
                            <IconX className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity" />
                        </button>
                    </div>
                    <div>{children}</div>
                </motion.div>
            </div>
        </Modal>
    )
}
