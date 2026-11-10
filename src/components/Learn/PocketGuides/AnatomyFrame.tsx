import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * The shell every annotated miniature shares: the `group/anatomy` hover scope FigureMarker's
 * wide-reader reveal keys off, the @container the miniature's own queries measure against, and
 * the entrance fade (skipped when the reader prefers reduced motion). `className` styles the
 * panel itself – card vs form chrome stays with the figure that owns it.
 */
export default function AnatomyFrame({
    className,
    children,
}: {
    className: string
    children: React.ReactNode
}): JSX.Element {
    const reducedMotion = useReducedMotion()
    return (
        <div className="group/anatomy relative @container">
            <motion.div
                className={className}
                initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
            >
                {children}
            </motion.div>
        </div>
    )
}
