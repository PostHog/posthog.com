import React from 'react'
import { motion } from 'framer-motion'
export default function HugHog({ onClick, className, active }) {
    return (
        <button className={className} onClick={onClick}>
            <div className="flex items-center">
                <motion.img
                    className="max-w-[300px]"
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/max_hug_2139d9320c.png"
                    animate={{ translateX: active ? 120 : 0 }}
                    initial={{ x: -60, y: 0 }}
                    transition={{ type: 'spring', duration: 0.5, bounce: 0.7 }}
                />
                <motion.img
                    className="max-w-[300px]"
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/max_hug_2139d9320c.png"
                    animate={{ translateX: active ? -120 : 0 }}
                    initial={{ x: 60, y: 0, scaleX: -1 }}
                    transition={{ type: 'spring', duration: 0.5, bounce: 0.7 }}
                />
            </div>
        </button>
    )
}
