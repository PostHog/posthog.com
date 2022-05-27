import { Annotations, Autocapture, Compliance, Dashboards, Extensibility, SelfHost } from 'components/Icons/Icons'
import { motion, useAnimation } from 'framer-motion'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import AnimateIntoView, { item } from './AnimateIntoView'

const features = [
    {
        title: 'Self-hostable',
        description: `Customer data stays on your servers. You’re in total control of your PostHog instance.`,
        icon: <SelfHost />,
    },
    {
        title: 'Autocapture',
        description: `Define any clicks or pageviews retroactively and see historical data since you installed PostHog.`,
        icon: <Autocapture />,
    },
    {
        title: 'Dashboards',
        description: `Build dashboards with everyday metrics like sign-ups, purchases and conversions.`,
        icon: <Dashboards />,
    },
    {
        title: 'Compliance-friendly',
        description: `Rely on fewer third-party subprocessors. Host in any region on the planet.`,
        icon: <Compliance />,
    },
    {
        title: 'Annotations',
        description: `Mark new releases and more in your data, so you can understand their impact later.`,
        icon: <Annotations />,
    },
    {
        title: 'Extensibility',
        description: `Extend the functionality of PostHog with our App Store, or build your own with our API.`,
        icon: <Extensibility />,
    },
]

export default function Platform() {
    const controls = useAnimation()
    const [ref, inView] = useInView({ threshold: 0.2 })

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

    useEffect(() => {
        if (inView) {
            controls.start('show')
        }
    }, [controls, inView])
    return (
        <section id="platform" className="my-12 md:my-24 px-5 max-w-[960px] mx-auto">
            <AnimateIntoView>
                <h3 className="text-center mb-12">Platform</h3>
            </AnimateIntoView>
            <motion.ul
                ref={ref}
                initial="hidden"
                animate={controls}
                variants={container}
                className="list-none m-0 p-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border-l border-t border-gray-accent-light dark:border-gray-accent-dark border-dashed"
            >
                {features.map(({ title, description, icon }) => {
                    return (
                        <motion.li
                            key={title}
                            variants={item}
                            className="border-b border-r border-gray-accent-light dark:border-gray-accent-dark border-dashed px-6 py-12 flex items-end"
                        >
                            <div>
                                <div className="mb-4 opacity-50">{icon}</div>
                                <h5>{title}</h5>
                                <p>{description}</p>
                            </div>
                        </motion.li>
                    )
                })}
            </motion.ul>
        </section>
    )
}
