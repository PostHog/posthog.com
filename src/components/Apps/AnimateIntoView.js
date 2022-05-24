import { motion, useAnimation } from 'framer-motion'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export const item = {
    hidden: { translateY: '25%', opacity: 0 },
    show: {
        translateY: 0,
        opacity: 1,
        transition: { duration: 1, type: 'spring' },
    },
}

export default function AnimateIntoView({ children }) {
    const controls = useAnimation()
    const [ref, inView] = useInView({ threshold: 0.5 })

    useEffect(() => {
        if (inView) {
            controls.start('show')
        }
    }, [controls, inView])
    return (
        <motion.div ref={ref} initial="hidden" animate={controls} variants={item}>
            {children}
        </motion.div>
    )
}
