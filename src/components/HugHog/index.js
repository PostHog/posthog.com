import React from 'react'
import { motion } from 'framer-motion'
export default function HugHog({ onClick, className, active }) {
    return (
        <button className={className} onClick={onClick}>
            <svg
                className="!overflow-visible"
                width="200"
                height="200"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <motion.path
                    transition={{ type: 'spring', duration: 0.5, bounce: 0.7 }}
                    animate={{ translateX: active ? 100 : 0 }}
                    d="M 20, 100 m 75, 0 a 75,75 0 1,0 -150,0 a 75,75 0 1,0  150,0"
                    fill="red"
                />
                <motion.path
                    transition={{ type: 'spring', duration: 0.5, bounce: 0.7 }}
                    animate={{ translateX: active ? -100 : 0 }}
                    d="M 180, 100 m 75, 0 a 75,75 0 1,0 -150,0 a 75,75 0 1,0  150,0"
                    fill="blue"
                />
            </svg>
        </button>
    )
}
