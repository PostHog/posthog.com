import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import OSButton from 'components/OSButton'
import { IconX } from '@posthog/icons'

interface MobileDrawerProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
    className?: string
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose, title, children, className = '' }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.div
                        className={`fixed bottom-0 left-0 right-0 z-50 bg-primary border border-primary rounded-t-md max-h-[80vh] flex flex-col mx-1 ${className}`}
                        data-scheme="secondary"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    >
                        <div className="flex items-center justify-between px-4 py-2 border-b border-primary flex-shrink-0">
                            <h3 className="text-lg font-semibold text-primary">{title}</h3>
                            <OSButton icon={<IconX />} onClick={onClose} />
                        </div>
                        <div className="flex-1 min-h-0 overflow-auto">{children}</div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default MobileDrawer
