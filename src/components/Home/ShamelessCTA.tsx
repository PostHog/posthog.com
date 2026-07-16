import React from 'react'
import CTA from 'components/Home/CTA'
import CloudinaryImage from 'components/CloudinaryImage'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export const ShamelessCTA = () => {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

    return (
        <>
            <p className="-mt-2 mb-12 @md:mb-12 @md:mr-[245px]">
                If nothing else has sold you on PostHog, hopefully these classic marketing tactics will.
            </p>
            <div className="relative" ref={ref}>
                <div className="absolute top-0 -translate-y-[40%] @md:-translate-y-[60%] right-4 @md:right-12 max-w-[120px] @md:max-w-[185px] -z-10">
                    <motion.div
                        initial={{ opacity: 0, y: '100%' }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: '100%' }}
                        transition={{ delay: 0.2 }}
                    >
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/haha_bizzniss_5bc44659ec.svg"
                            className="w-full"
                        />
                    </motion.div>
                </div>
                <CTA headline={false} card />
            </div>
        </>
    )
}

export default ShamelessCTA
