import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { transform } from './timeline'

const CURSOR_LEAD_MS = 900
const PRESS_HOLD_MS = 160
const CURSOR_LINGER_MS = 600
const CURSOR_ARRIVES_BEFORE_MS = 250
const DEFAULT_APPROACH = { x: 60, y: 48 }

export const pressCursorBoundaries = (pressAt: number): number[] => [
    pressAt - CURSOR_LEAD_MS,
    pressAt - CURSOR_ARRIVES_BEFORE_MS,
    pressAt,
    pressAt + PRESS_HOLD_MS,
    pressAt + CURSOR_LINGER_MS,
]

export const PressCursor = ({
    elapsed,
    pressAt,
    from = DEFAULT_APPROACH,
    children,
}: {
    elapsed: number
    pressAt: number
    from?: { x: number; y: number }
    children: React.ReactNode
}) => {
    const visible = elapsed >= pressAt - CURSOR_LEAD_MS && elapsed < pressAt + CURSOR_LINGER_MS
    const arrived = elapsed >= pressAt - CURSOR_ARRIVES_BEFORE_MS
    const pressing = elapsed >= pressAt && elapsed < pressAt + PRESS_HOLD_MS
    return (
        <div className="relative">
            <motion.div
                initial={false}
                animate={{ transform: transform({ scale: pressing ? 0.95 : 1 }) }}
                transition={
                    pressing ? { duration: 0.12, ease: 'easeOut' } : { type: 'spring', stiffness: 500, damping: 14 }
                }
            >
                {children}
            </motion.div>
            <AnimatePresence>
                {visible && (
                    <motion.div
                        key="cursor"
                        className="pointer-events-none absolute left-1/2 top-1/2 h-5 w-4 drop-shadow"
                        initial={{ opacity: 0, transform: transform(from) }}
                        animate={{
                            opacity: 1,
                            transform: transform({
                                x: arrived ? 0 : from.x,
                                y: arrived ? 0 : from.y,
                                scale: pressing ? 0.85 : 1,
                            }),
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 110, damping: 18 }}
                    >
                        <svg viewBox="0 0 16 20" className="block size-full">
                            <path
                                d="M1 1 L1 16 L5 12 L8 19 L11 18 L8 11 L14 11 Z"
                                fill="black"
                                stroke="white"
                                strokeWidth="1.4"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
