import React from 'react'
import { motion } from 'framer-motion'

const HugHogImage = () => {
    return <img src="https://res.cloudinary.com/dmukukwp6/image/upload/max_hug_2139d9320c.png" />
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
