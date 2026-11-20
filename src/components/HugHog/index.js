import React from 'react'
import { motion } from 'framer-motion'
import hedgehogHeartPng from 'brand-hoggie-pngs/heart.png'

const HugHogImage = () => {
    return <img src={hedgehogHeartPng} />
}

export default function HugHog({ onClick, className, active }) {
    return (
        <button className={className} onClick={onClick}>
            <div className="grid grid-cols-2 items-center">
                <motion.div
                    animate={{ translateX: active ? '35%' : 0 }}
                    transition={{ type: 'spring', duration: 0.5, bounce: 0.7 }}
                >
                    <HugHogImage />
                </motion.div>
                <motion.div
                    animate={{ translateX: active ? '-35%' : 0 }}
                    initial={{ scaleX: -1 }}
                    transition={{ type: 'spring', duration: 0.5, bounce: 0.7 }}
                >
                    <HugHogImage />
                </motion.div>
            </div>
        </button>
    )
}
