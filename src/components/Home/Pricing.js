import Link from 'components/Link'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
        const delay = 1 + i * 0.5
        return {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay, type: 'spring', duration: 1.5, bounce: 0 },
                opacity: { delay, duration: 0.01 },
            },
        }
    },
}

const Squiggle = () => {
    return (
        <motion.svg
            initial="hidden"
            animate="visible"
            width="683"
            height="24"
            viewBox="0 0 683 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <motion.path
                variants={draw}
                d="M2 3L28.74 16.4685C34.3992 19.3189 41.0745 19.3189 46.7337 16.4685L64.4768 7.53155C70.1361 4.68109 76.8113 4.68109 82.4705 7.53155L100.214 16.4685C105.873 19.3189 112.548 19.3189 118.207 16.4685L135.951 7.53155C141.61 4.68109 148.285 4.6811 153.944 7.53155L171.687 16.4685C177.347 19.3189 184.022 19.3189 189.681 16.4685L207.424 7.53155C213.083 4.68109 219.759 4.68109 225.418 7.53155L243.161 16.4685C248.82 19.3189 255.496 19.3189 261.155 16.4685L278.898 7.53155C284.557 4.68109 291.232 4.68109 296.892 7.53155L314.635 16.4685C320.294 19.3189 326.969 19.3189 332.628 16.4684L350.372 7.53155C356.031 4.68109 362.706 4.6811 368.365 7.53155L386.108 16.4685C391.768 19.3189 398.443 19.3189 404.102 16.4685L421.845 7.53155C427.504 4.68109 434.18 4.68109 439.839 7.53155L457.582 16.4685C463.241 19.3189 469.917 19.3189 475.576 16.4685L493.319 7.53155C498.978 4.68109 505.653 4.6811 511.313 7.53155L529.056 16.4685C534.715 19.3189 541.39 19.3189 547.049 16.4685L564.793 7.53155C570.452 4.6811 577.127 4.6811 582.786 7.53155L600.529 16.4685C606.189 19.3189 612.864 19.3189 618.523 16.4685L636.266 7.53155C641.926 4.6811 648.601 4.6811 654.26 7.53155L681 21"
                stroke="#F54E00"
                strokeWidth="5"
            />
        </motion.svg>
    )
}

export default function Pricing() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 1 })
    return (
        <section className="mb-16 mt-16 lg:mt-32 px-5 max-w-screen-2xl mx-auto">
            <div className="flex lg:flex-row flex-col items-center">
                <div className="lg:max-w-[700px] lg:flex-shrink-0">
                    <h2 ref={ref} className="text-[9vw] md:text-7xl m-0 relative  inline-block">
                        “Let’s jump on a call”
                        {inView && (
                            <div className="absolute w-full h-full flex items-center justify-center inset-0">
                                <Squiggle />
                            </div>
                        )}
                    </h2>
                    <h3 className="text-xl sm:text-2xl m-0 my-2 sm:my-4">
                        Honest, transparent pricing that doesn’t force you to talk to a human (unless you want to)
                    </h3>
                    <p className="sm:text-lg m-0">
                        Watch a <Link to="/book-a-demo">recorded demo</Link> at your own pace, or{' '}
                        <Link to="/book-a-demo#contact">request a personalized demo</Link> if your business has bespoke
                        needs.
                    </p>
                </div>
                <div className="lg:ml-2 lg:mt-0 mt-8">
                    <StaticImage src="./images/busy-hog.png" />
                </div>
            </div>
        </section>
    )
}
