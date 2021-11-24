import { ZoomImage } from 'components/ZoomImage'
import { motion, useAnimation } from 'framer-motion'
import { StaticImage } from 'gatsby-plugin-image'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export default function FeatureScreenshots() {
    const controls = useAnimation()
    const [ref, inView] = useInView({ threshold: 0.5 })

    const container = {
        hidden: {
            opacity: 0,
        },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
    }

    const item = {
        hidden: { translateX: '-100vw', opacity: 0, scale: 0 },
        show: {
            translateX: 0,
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, type: 'spring' },
        },
    }

    useEffect(() => {
        if (inView) {
            controls.start('show')
        }
    }, [controls, inView])

    return (
        <motion.ul
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={container}
            className="p-0 m-0 list-none flex justify-between images-slider my-12"
        >
            <motion.li variants={item}>
                <ZoomImage>
                    <StaticImage objectFit="top" src="./images/showcase-1.png" />
                </ZoomImage>
            </motion.li>
            <motion.li variants={item}>
                <ZoomImage>
                    <StaticImage objectFit="top" src="./images/showcase-2.png" />
                </ZoomImage>
            </motion.li>
            <motion.li variants={item}>
                <ZoomImage>
                    <StaticImage objectFit="top" src="./images/showcase-3.png" />
                </ZoomImage>
            </motion.li>
            <motion.li variants={item}>
                <ZoomImage>
                    <StaticImage objectFit="top" src="./images/showcase-4.png" />
                </ZoomImage>
            </motion.li>
            <motion.li variants={item}>
                <ZoomImage>
                    <StaticImage objectFit="top" src="./images/showcase-5.png" />
                </ZoomImage>
            </motion.li>
        </motion.ul>
    )
}
