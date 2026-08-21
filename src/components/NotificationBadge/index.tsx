import React from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

export type NotificationBadgeColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'teal' | 'salmon'

/**
 * Background + text pairs, written as whole class names. Tailwind scans source for
 * literal classes, so a built-up `bg-${color}` would never be generated. Light
 * swatches take dark text; the rest take white.
 */
const COLORS: Record<NotificationBadgeColor, string> = {
    red: 'bg-red text-white',
    orange: 'bg-orange text-dark',
    yellow: 'bg-yellow text-dark',
    green: 'bg-green text-white',
    blue: 'bg-blue text-white',
    purple: 'bg-purple text-white',
    teal: 'bg-teal text-dark',
    salmon: 'bg-salmon text-white',
}

const BADGE_OUTLINE_PX = 1.5

export interface NotificationBadgeProps {
    /**
     * Unread count. Omit it for a plain badge with no number. A count of 0 or
     * less hides the badge (with its exit animation) instead of rendering it.
     */
    count?: number
    /** Highest number shown before the badge switches to `{max}+`. Default 99. */
    max?: number
    /** Background color, from the project's color tokens. Default `red`. */
    color?: NotificationBadgeColor
    className?: string
}

/**
 * iOS-style unread badge — a small colored mark pinned to the top-right corner of
 * an icon.
 *
 * `count` is optional: with it you get a number, without it you get an empty
 * badge. Both are the same size — the badge is a 12px circle that only grows
 * wider for a 2+ digit number, so adding or dropping the count never moves the
 * badge or changes its footprint.
 *
 * Positioning is absolute, so the nearest positioned ancestor has to match the
 * icon's box, not the icon + its label. `AppLink` handles that by making its icon
 * wrapper `inline-flex` whenever a badge is present (an inline wrapper would
 * anchor the badge to the text line box instead of the 36px glyph).
 */
export default function NotificationBadge({ count, max = 99, color = 'red', className = '' }: NotificationBadgeProps) {
    const shouldReduceMotion = useReducedMotion()

    const hasCount = count !== undefined && count !== null
    const visible = !hasCount || count >= 1
    const display = hasCount ? (count > max ? `${max}+` : `${count}`) : null

    // Pops in off a spring, leaves quickly and without the overshoot — an arrival
    // is worth noticing, a dismissal is not. Reduced motion drops the scale and
    // fades instead, so nothing moves.
    const variants = shouldReduceMotion
        ? {
              hidden: { opacity: 0, transition: { duration: 0.12 } },
              shown: { opacity: 1, transition: { duration: 0.12 } },
          }
        : {
              hidden: { opacity: 0, scale: 0.4, transition: { duration: 0.12, ease: 'easeIn' } },
              shown: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 600, damping: 22, mass: 0.6 } },
          }

    // AnimatePresence lives inside the component so the exit plays whenever `count`
    // drops to 0. It cannot help if a parent stops rendering the badge altogether —
    // that unmounts the element outright. See `useDesktopBadges`, which keeps the
    // Store badge mounted at `count={0}` for exactly this reason.
    return (
        <AnimatePresence>
            {visible && (
                <motion.span
                    key="badge"
                    variants={variants}
                    initial="hidden"
                    animate="shown"
                    exit="hidden"
                    className={`absolute -top-[3.5px] -right-[3.5px] z-10 inline-flex items-center justify-center rounded-full bg-white ${className}`}
                    style={{
                        padding: BADGE_OUTLINE_PX,
                    }}
                >
                    <span
                        className={`flex min-w-[12px] h-[12px] items-center justify-center rounded-full px-[2px] text-[8px] font-bold leading-none tabular-nums ${COLORS[color]}`}
                    >
                        {display && <span aria-hidden="true">{display}</span>}
                    </span>
                    <span className="sr-only">{display ? `${display} unread` : 'unread'}</span>
                </motion.span>
            )}
        </AnimatePresence>
    )
}
