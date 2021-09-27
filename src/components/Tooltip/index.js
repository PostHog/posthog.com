import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TooltipTitle = ({ title, visible, className }) => {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className={className}
                    initial={{ position: 'absolute', translateY: 0, opacity: 0 }}
                    animate={{ translateY: '-150%', opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {title}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default function Tooltip({ title = '', visible, children, className = '' }) {
    return (
        <div className="relative">
            <TooltipTitle className={className} visible={visible} title={title} />
            {children}
        </div>
    )
}
