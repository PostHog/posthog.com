import { motion, useAnimation } from 'framer-motion'
import { StaticImage } from 'gatsby-plugin-image'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export default function Hero() {
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
        hidden: { translateX: '100%', opacity: 0, scale: 0 },
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
        <section className="overflow-hidden">
            <div className="my-12 max-w-screen-2xl mx-auto lg:my-0 grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-14 items-center">
                <div className="lg:max-w-[480px] justify-self-end px-5 box-content">
                    <h1 className="text-primary dark:text-white opacity-50 text-[20px] mb-2">What is PostHog?</h1>
                    <h2 className="text-[48px] mt-0 font-bold">
                        An ever-expanding suite of tools to <span className="text-red">build better products</span>
                    </h2>
                    <ul className="text-[20px] font-semibold">
                        <li className="text-[20px]">Measure performance</li>
                        <li className="text-[20px]">Diagnose & build context</li>
                        <li className="text-[20px]">Test & roll out improvements</li>
                    </ul>
                    <p>PostHog is an open-source analytics platform that offers a radically different approach to building
                    better products.</p>
                    <p>
                        Host on your own infrastructure and capture up to 30% more events, compared to cloud-based
                        analytics tools.
                    </p>
                </div>
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={controls}
                    variants={container}
                    className="justify-self-end relative flex-col hidden lg:flex"
                >
                    <motion.div variants={item}>
                        <StaticImage loading="eager" quality={100} src="./images/hero-1.png" />
                    </motion.div>
                    <motion.div variants={item} className="justify-self-end self-end w-[80%] mt-[-30%] mr-[-10%]">
                        <StaticImage
                            loading="eager"
                            objectPosition="top"
                            className="w-full"
                            quality={100}
                            src="./images/hero-2.png"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
