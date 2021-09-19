import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, useAnimation } from 'framer-motion'

export default function AnimateIntoView({ children, className }) {
    const controls = useAnimation()
    const [ref, inView] = useInView({ threshold: 1 })
    const variants = {
        hidden: { top: -100, opacity: 0 },
        shown: { top: -40, opacity: 1, transition: { duration: 0.5, type: 'spring', delay: 0.3 } },
    }

    useEffect(() => {
        if (inView) {
            controls.start('shown')
        }
    }, [controls, inView])

    return (
        <motion.span className={className} ref={ref} animate={controls} initial="hidden" variants={variants}>
            {children}
        </motion.span>
    )
}
