import { CallToAction } from 'components/CallToAction'
import { motion, useAnimation } from 'framer-motion'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { item } from './AnimateIntoView'
import FeatureScreenshots from './FeatureScreenshots'

const features = [
    {
        title: 'Funnels',
        description: `Analyze users across a series of actions. See how many people start or finish a sequence — and where they drop off.`,
        cta: {
            title: 'Learn more about Funnels',
            url: '/product/funnels',
        },
    },
    {
        title: 'Trends',
        description: `Answer any ad-hoc product usage question. Instantly.`,
        cta: {
            title: 'Learn more about Trends',
            url: '/product/trends',
        },
    },
    {
        title: 'Visualize traffic with User Paths',
        description: `Explore popular ways users complete a series of steps - like navigating your site or progressing through a funnel.`,
        cta: {
            title: 'Learn more about User Paths',
            url: '/product/user-paths',
        },
    },
    {
        title: 'Diagnose causes with Correlation Analysis',
        description: `Correlation Analysis automatically suggests which events or user properties lead to success or failure using transparent, testable, statistical models.`,
        cta: {
            title: 'Learn more about Correlation Analysis',
            url: '/product/correlation-analysis',
        },
    },
    {
        title: 'Experimentation suite',
        description: `Test changes in production with a suite that makes it easy to get the results you want.`,
        cta: {
            title: 'Learn more about Experimentation',
            url: '/product/experimentation-suite',
        },
    },
    {
        title: 'Collaboration',
        description: `Make sense of insights your team has created, using tools designed to help share knowledge.`,
        cta: {
            title: 'Learn more about Collaboration',
            url: '/product/collaboration',
        },
    },
]

export default function ProductAnalytics({ children, className = '' }) {
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
        <section id="product-analytics" className="px-5">
            <FeatureScreenshots />
            <div className="max-w-[960px] mx-auto">
                <motion.ul
                    className="list-none grid md:grid-cols-2 m-0 p-0"
                    ref={ref}
                    initial="hidden"
                    animate={controls}
                    variants={container}
                >
                    {features.map(({ title, description, cta }) => {
                        return (
                            <motion.li
                                key={title}
                                variants={item}
                                className="px-0 py-12 md:px-12 md:odd:border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark odd:border-b md:odd:border-b-0 even:border-b md:last:!border-b-0 first:!border-b first:border-t md:first:border-t-0"
                            >
                                <h3>{title}</h3>
                                <p>{description}</p>
                                <CallToAction
                                    type="outline"
                                    size="md"
                                    className="text-red hover:text-red dark:text-red dark:hover:text-red"
                                    to={cta.url}
                                >
                                    {cta.title}
                                </CallToAction>
                            </motion.li>
                        )
                    })}
                </motion.ul>
            </div>
        </section>
    )
}
