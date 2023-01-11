import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { usePopper } from 'react-popper'
import type { Placement } from '@popperjs/core'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { HTMLProps } from 'html'

export function Wrapper({
    className = '',
    children,
    placement = 'bottom-start',
    referenceElement,
    borderRadius = '0.375rem',
}: {
    className?: string
    children: React.ReactNode
    placement: Placement
    referenceElement: HTMLDivElement
    borderRadius?: string | number
}) {
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
    const breakpoints = useBreakpoint()
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement,
    })
    const variants = {
        hidden: { height: 0 },
        shown: { height: 'auto' },
    }
    return (
        <div
            className={className}
            ref={setPopperElement}
            style={!breakpoints.md ? styles.popper : {}}
            {...attributes.popper}
        >
            <div className="z-10 lg:block text-almost-black relative top-0">
                <motion.div
                    style={{ borderRadius }}
                    className="lg:bg-white lg:shadow-lg lg:dark:bg-gray-accent-dark overflow-hidden lg:my-0 md:mt-6"
                    variants={variants}
                    initial="hidden"
                    animate="shown"
                >
                    {children}
                </motion.div>
            </div>
        </div>
    )
}
