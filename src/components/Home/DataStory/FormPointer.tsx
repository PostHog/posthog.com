import React from 'react'
import { motion, useReducedMotion, Variants } from 'framer-motion'

const DRAW_VIEWPORT = { once: true, amount: 0.8 }

const shaft: Variants = {
    hidden: { pathLength: 0 },
    drawn: { pathLength: 1, transition: { duration: 0.6, ease: 'easeOut', delay: 0.7 } },
}

const head: Variants = {
    hidden: { pathLength: 0 },
    drawn: { pathLength: 1, transition: { duration: 0.25, ease: 'easeOut', delay: 1.3 } },
}

const Arrow = ({
    viewBox,
    shaftPath,
    headPath,
    className,
}: {
    viewBox: string
    shaftPath: string
    headPath: string
    className: string
}): JSX.Element => {
    const shouldReduceMotion = useReducedMotion()

    return (
        <motion.svg
            viewBox={viewBox}
            fill="none"
            className={className}
            initial={shouldReduceMotion ? 'drawn' : 'hidden'}
            whileInView="drawn"
            viewport={DRAW_VIEWPORT}
        >
            <motion.path d={shaftPath} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" variants={shaft} />
            <motion.path
                d={headPath}
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={head}
            />
        </motion.svg>
    )
}

export default function FormPointer(): JSX.Element {
    return (
        <div aria-hidden="true" className="flex justify-center text-purple @2xl:justify-end">
            <div className="flex flex-col items-start">
                <span className="-rotate-3 text-lg font-bold italic">Yes, this one</span>
                <Arrow
                    viewBox="0 0 96 48"
                    shaftPath="M4 4 C 8 34, 52 46, 88 22"
                    headPath="M76 24 L88 22 L83 33"
                    className="hidden @2xl:block -mt-1 ml-14 w-20 shrink-0"
                />
                <Arrow
                    viewBox="0 0 48 64"
                    shaftPath="M8 4 C 4 28, 24 40, 26 60"
                    headPath="M18 52 L26 60 L33 51"
                    className="@2xl:hidden ml-16 w-10 shrink-0"
                />
            </div>
        </div>
    )
}
