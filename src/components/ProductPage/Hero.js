import { motion, useAnimation } from 'framer-motion'
import { StaticImage } from 'gatsby-plugin-image'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { OpenSource, Pipelines, Warehouse } from '../Icons/Icons'

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
                    <p className="text-[17px]">
                        PostHog ships with{' '}
                        <a
                            href="/docs/integrate/ingest-live-data"
                            className="text-[#333] border-b border-dashed border-gray-primary font-semibold"
                        >
                            event pipelines
                        </a>
                        ,{' '}
                        <a
                            href="/docs/self-host/runbook/clickhouse"
                            className="text-[#333] border-b border-dashed border-gray-primary font-semibold"
                        >
                            a data warehouse
                        </a>
                        , an{' '}
                        <a
                            href="/docs/api"
                            className="text-[#333] border-b border-dashed border-gray-primary font-semibold"
                        >
                            API
                        </a>
                        , and <strong>10+ products</strong> we've built to make product analytics and experimentation
                        easier - all inside one platform.
                    </p>
                    <p className="text-[17px]">
                        Extend functionality further with <strong>50-ish more apps</strong> in the{' '}
                        <a
                            href="/apps"
                            className="border-dashed border-2 border-l-0 border-t-0 border-r-0 border-gray-accent-light dark:border-opacity-50 dark:hover:border-opacity-75 text-primary dark:text-white font-medium"
                        >
                            PostHog App Store
                        </a>
                        .
                    </p>
                    <p>
                        <a
                            href="/docs/self-host"
                            className="border-dashed border-2 border-l-0 border-t-0 border-r-0 border-gray-accent-light dark:border-opacity-50 dark:hover:border-opacity-75 text-primary dark:text-white font-medium"
                        >
                            Host on your own infrastructure
                        </a>{' '}
                        and capture up to 30% more events, compared to cloud-based analytics tools.
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

            <div className="grid divide-dashed divide-gray-accent-light template-section-content gap-4 md:gap-0 px-5 mt-16 mb-8 max-w-6xl mx-auto grid-cols-1 md:grid-cols-3 md:divide-x w-full">
                <div>
                    <Pipelines />
                    <h4 className="pt-4">Event pipelines</h4>
                    <p>
                        Reliably ingest data at any scale, parsing and filtering to build a holistic view of your
                        customers.
                    </p>
                </div>
                <div>
                    <Warehouse />
                    <h4 className="pt-4">Data warehouse</h4>
                    <p>
                        Normalize and store data in PostHog built-in data warehouse - or sync it with BigQuery, S3,
                        Snowflake, or Redshift.
                    </p>
                </div>
                <div>
                    <OpenSource />
                    <h4 className="pt-4">Open source</h4>
                    <p>Browse our source code, influence the roadmap, or get involved with the product directly</p>
                </div>
            </div>
        </section>
    )
}
