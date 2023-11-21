import React from 'react'
import { CallToAction, TrackedCTA } from '../CallToAction'
import { Link } from 'gatsby'
import { heading, section } from './classes'
import Icon from './Icon'
import Slider from './Slider'
import { SignupCTA } from 'components/SignupCTA'
import Accordion from './Accordion'
import { motion } from 'framer-motion'
import './hero.scss'

const heroTitle = 'How engineers build better products'
const ctaVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    },
}

export default function Hero() {
    return (
        <section className="flex flex-col justify-center items-center">
            <div className="relative w-full z-10">
                <div className={section('z-10 relative md:!mb-8')}>
                    <h1 className={`${heading()} overflow-hidden pb-1 home-hero-title`}>
                        {heroTitle.split(' ').map((word, index) => (
                            <span
                                key={word}
                                className={`${
                                    index > 1 ? 'text-red dark:text-yellow' : ''
                                } ml-4 first:ml-0 inline-block`}
                            >
                                {word}
                            </span>
                        ))}
                    </h1>
                    <motion.h2
                        transition={{ delay: 0.8, duration: 1.5 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={heading('subtitle', 'primary', 'mt-0 mb-6')}
                    >
                        The single platform to analyze, test, observe, and deploy new features
                    </motion.h2>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {
                                opacity: 0,
                            },
                            visible: {
                                opacity: 1,
                            },
                        }}
                        transition={{ delay: 1.5, staggerChildren: 2 }}
                        className="flex justify-center items-center gap-2"
                    >
                        <motion.div variants={ctaVariants} transition={{ duration: 3 }}>
                            <SignupCTA className="" />
                        </motion.div>
                        <motion.div variants={ctaVariants} transition={{ duration: 2 }}>
                            <TrackedCTA
                                event={{ name: `clicked Get a demo` }}
                                href="/book-a-demo"
                                type="secondary"
                                size="lg"
                            >
                                Get a demo
                            </TrackedCTA>
                        </motion.div>
                    </motion.div>
                </div>
                <Slider />
                <Accordion />
            </div>
        </section>
    )
}
