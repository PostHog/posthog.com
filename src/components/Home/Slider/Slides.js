import {
    Android,
    DiagonalArrow,
    Experimentation,
    Funnels,
    Ios,
    JS,
    Lifecycle,
    NodeJS,
    PathAnalysis,
    ReactIcon,
    Retention,
    RightArrow,
    Ruby,
    Stickiness,
    Trends,
} from 'components/Icons/Icons'
import Link from 'components/Link'
import { motion } from 'framer-motion'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

const Title = ({ title }) => {
    return <h3 className="text-2xl mt-5 mb-0">{title}</h3>
}

const Subtitle = ({ subtitle }) => {
    return <h4 className="text-[18px] opacity-70 m-0 font-semibold">{subtitle}</h4>
}

const CTA = ({ url, title }) => {
    return (
        <Link className="text-[15px] flex space-x-1 items-center font-bold mt-4" to={url}>
            <span>{title}</span>
            <span className="text-gray-accent-light">
                <RightArrow className="w-[20px]" />
            </span>
        </Link>
    )
}

export const ProductAnalytics = () => {
    const features = [
        { title: 'Funnels', Icon: Funnels },
        { title: 'User paths', Icon: PathAnalysis },
        { title: 'Lifecycle', Icon: Lifecycle },
        { title: 'Trends', Icon: Trends },
        { title: 'Stickiness', Icon: Stickiness },
        { title: 'Retention', Icon: Retention },
    ]
    return (
        <div className="grid grid-cols-5 gap-7 pt-5">
            <div className="col-span-3 h-[400px]">
                <motion.div
                    transition={{ delay: 0.4 }}
                    className="h-full"
                    initial={{ translateY: '100%' }}
                    animate={{ translateY: 0 }}
                >
                    <StaticImage
                        placeholder="none"
                        quality={100}
                        objectFit="contain"
                        className="w-full h-full"
                        src="./images/product-analytics.png"
                    />
                </motion.div>
            </div>
            <div className="col-span-2 relative flex flex-col">
                <div className="max-w-sm">
                    <Title title={'Product analytics'} />
                    <ul className="list-none m-0 p-0 grid grid-cols-3 home-product-analytics-features mt-5">
                        {features.map(({ title, Icon }) => {
                            return (
                                <li key={title}>
                                    <Link className="text-black hover:text-black flex items-center space-x-2 text-[14px] py-3 px-4">
                                        <span>
                                            <Icon className="w-[20px]" />
                                        </span>
                                        <span className="opacity-70">{title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                    <CTA url="/product" title="Explore" />
                </div>
                <div className="flex items-end mt-auto">
                    <div className="mb-3">
                        <hr className="w-[20px] h-[3px] rounded-full" />
                        <Link to="/blog/categories/comparisons" className="text-primary text-[12px]">
                            Compare to Amplitude, Heap, Mixpanel
                        </Link>
                    </div>
                    <div className="relative">
                        <StaticImage
                            placeholder="none"
                            quality={100}
                            className="max-w-[360px] w-full flex-shrink-0"
                            src="./images/product-analytics-hog.png"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export const SessionRecording = () => {
    return (
        <div className="grid grid-cols-2 gap-7 pt-5">
            <div className="h-[400px]">
                <motion.div
                    transition={{ delay: 0.4 }}
                    className="h-full"
                    initial={{ translateY: '100%' }}
                    animate={{ translateY: 0 }}
                >
                    <StaticImage
                        placeholder="none"
                        quality={100}
                        objectFit="contain"
                        className="w-full h-full"
                        src="./images/session-recording.png"
                    />
                </motion.div>
            </div>
            <div className="relative flex flex-col">
                <div className="max-w-[420px]">
                    <Title title={'Session recording'} />
                    <Subtitle subtitle="with console logs. Watch a group of sessions for users in a cohort." />

                    <CTA url="/product/session-recording" title="Explore" />
                </div>
                <div className="flex items-end mt-auto w-full">
                    <div className="mb-3 flex-grow">
                        <hr className="w-[20px] h-[3px] rounded-full" />
                        <Link to="/blog/categories/comparisons" className="text-primary text-[12px]">
                            Compare to Hotjar, Logrocket, Matomo
                        </Link>
                    </div>
                    <div className="relative w-3/4">
                        <StaticImage
                            placeholder="none"
                            quality={100}
                            className="w-full"
                            src="./images/session-recording-hog.png"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export const FeatureFlags = () => {
    return (
        <div className="grid grid-cols-2 gap-7 pt-5">
            <div className="h-[400px] relative overflow-hidden">
                <motion.div
                    transition={{ delay: 0.4 }}
                    className="absolute left-0 bottom-0 w-3/4"
                    initial={{ translateY: '100%' }}
                    animate={{ translateY: 0 }}
                >
                    <StaticImage
                        placeholder="none"
                        quality={100}
                        className="w-full"
                        src="./images/feature-flags-2.png"
                    />
                </motion.div>
                <motion.div
                    transition={{ delay: 0.4 }}
                    className="absolute right-0 top-0 w-3/4"
                    initial={{ translateY: '100%' }}
                    animate={{ translateY: 0 }}
                >
                    <StaticImage
                        placeholder="none"
                        quality={100}
                        className="w-full"
                        src="./images/feature-flags-1.png"
                    />
                </motion.div>
            </div>
            <div className="relative flex flex-col">
                <div className="max-w-[420px]">
                    <Title title={'Feature flags'} />
                    <Subtitle subtitle="with multivariate testing. Roll out features to groups or specific users." />

                    <CTA url="/product/feature-flags" title="See how it works" />
                </div>
                <div className="flex items-end mt-auto w-full">
                    <div className="mb-3 flex-grow">
                        <hr className="w-[20px] h-[3px] rounded-full" />
                        <Link to="/blog/categories/comparisons" className="text-primary text-[12px]">
                            Compare to LaunchDarkly
                        </Link>
                    </div>
                    <div className="relative w-3/4">
                        <div className="absolute bottom-0 right-0">
                            <StaticImage
                                placeholder="none"
                                quality={100}
                                className="w-full max-w-[480px]"
                                src="./images/feature-flags-hog.png"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const ABTesting = () => {
    const features = [
        { title: 'Experimentation Suite', Icon: Experimentation },
        { title: 'Correlation Analysis', Icon: DiagonalArrow },
    ]

    return (
        <div className="grid grid-cols-2 gap-7 pt-5">
            <div className="h-[400px] relative overflow-hidden">
                <motion.div
                    transition={{ delay: 0.4 }}
                    className="absolute left-0 top-5 w-11/12"
                    initial={{ translateY: '100%' }}
                    animate={{ translateY: 0 }}
                >
                    <StaticImage placeholder="none" quality={100} className="w-full" src="./images/ab-testing-2.png" />
                </motion.div>
                <motion.div
                    transition={{ delay: 0.4 }}
                    className="absolute right-5 top-0 w-3/4"
                    initial={{ translateY: '100%' }}
                    animate={{ translateY: 0 }}
                >
                    <StaticImage placeholder="none" quality={100} className="w-full" src="./images/ab-testing-1.png" />
                </motion.div>
            </div>
            <div className="relative flex flex-col">
                <div className="max-w-[420px]">
                    <Title title={'A/B testing'} />
                    <Subtitle subtitle="with multivariate testing" />
                    <ul className="list-none m-0 p-0 mt-5 inline-block">
                        {features.map(({ title, Icon }) => {
                            return (
                                <li className="odd:border-b border-gray-accent-light border-dashed" key={title}>
                                    <Link className="text-black hover:text-black flex items-center space-x-2 text-[14px] py-3">
                                        <span>
                                            <Icon className="w-[20px]" />
                                        </span>
                                        <span className="opacity-70">{title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                    <CTA url="/product/ab-testing" title="See how it works" />
                </div>
                <div className="flex items-end mt-auto w-full">
                    <div className="mb-3 flex-grow">
                        <hr className="w-[20px] h-[3px] rounded-full" />
                        <Link to="/blog/categories/comparisons" className="text-primary text-[12px]">
                            Compare to LaunchDarkly
                        </Link>
                    </div>
                    <div className="relative w-3/4">
                        <div className="absolute bottom-0 right-0">
                            <StaticImage
                                placeholder="none"
                                quality={100}
                                className="w-full max-w-[480px]"
                                src="./images/ab-testing-hog.png"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const EventPipelines = () => {
    const data = [
        { Icon: JS, url: '' },
        { Icon: ReactIcon, url: '' },
        { Icon: NodeJS, url: '' },
        { Icon: Ruby, url: '' },
        { Icon: Ios, url: '' },
        { Icon: Android, url: '' },
    ]

    return (
        <div className="grid grid-cols-2 gap-7 pt-5">
            <div className="h-[400px] relative">
                <motion.div
                    transition={{ delay: 0.4 }}
                    className="h-full"
                    initial={{ translateY: '100%' }}
                    animate={{ translateY: 0 }}
                >
                    <StaticImage
                        placeholder="none"
                        quality={100}
                        objectFit="contain"
                        className="w-full h-full"
                        src="./images/event-pipelines.png"
                    />
                </motion.div>
            </div>
            <div className="relative flex flex-col">
                <div className="max-w-[420px]">
                    <Title title={'Event pipelines'} />
                    <Subtitle subtitle="Enrich customer profiles in sales and marketing clouds with event data you send to PostHog." />
                    <ul className="list-none m-0 p-0 mt-5 flex space-x-2 items-center">
                        {data.map(({ Icon, url }, index) => {
                            return (
                                <li key={index}>
                                    <Link className="text-primary hover:text-primary" to={url}>
                                        <Icon className="w-[22px]" />
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                    <CTA url="/docs/integrate" title="Browse all libraries" />
                </div>
                <div className="flex items-end mt-auto w-full">
                    <div className="mb-3 flex-grow">
                        <hr className="w-[20px] h-[3px] rounded-full" />
                        <p className="text-[14px] m-0">Use another service?</p>
                        <Link className="text-[14px]" to="/docs/apps/build">
                            Build an app connector
                        </Link>
                    </div>
                    <div className="relative w-3/4">
                        <div className="absolute bottom-0 right-0">
                            <StaticImage
                                placeholder="none"
                                quality={100}
                                className="w-full max-w-[480px]"
                                src="./images/event-pipelines-hog.png"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const DataWarehouse = () => {
    return (
        <div className="grid grid-cols-2 gap-7 pt-5">
            <div className="h-[400px] relative">
                <motion.div
                    transition={{ delay: 0.4 }}
                    className="h-full"
                    initial={{ translateY: '100%' }}
                    animate={{ translateY: 0 }}
                >
                    <StaticImage
                        placeholder="none"
                        quality={100}
                        objectFit="contain"
                        className="w-full h-full"
                        src="./images/data-warehouse.png"
                    />
                </motion.div>
            </div>
            <div className="relative flex flex-col">
                <div className="max-w-[420px]">
                    <Title title={'Data warehouse'} />
                    <Subtitle subtitle="Sync with your warehouse. Or keep customer data in-house by self-hosting and using PostHog’s built-in data warehouse." />

                    <CTA url="/docs/api" title="Explore what you can do" />
                </div>
                <div className="mt-auto w-full">
                    <div className="w-full">
                        <StaticImage
                            placeholder="none"
                            quality={100}
                            className="w-full"
                            src="./images/data-warehouse-hog.png"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export const SelfHosting = () => {
    return (
        <div className="grid grid-cols-2 gap-7 pt-5">
            <div className="h-[400px] relative">
                <motion.div
                    transition={{ delay: 0.4 }}
                    className="h-full"
                    initial={{ translateY: '100%' }}
                    animate={{ translateY: 0 }}
                >
                    <StaticImage
                        placeholder="none"
                        quality={100}
                        objectFit="contain"
                        className="w-full h-full"
                        src="./images/self-hosting.png"
                    />
                </motion.div>
            </div>
            <div className="relative flex flex-col">
                <div className="max-w-[420px]">
                    <Title title={'Self hosting'} />
                    <Subtitle subtitle="Host on-prem so customer data never leaves your infrastructure. Plus get full SQL access." />

                    <CTA url="/docs/self-host" title="Learn more" />
                </div>
                <div className="mt-auto w-full">
                    <div className="w-full">
                        <StaticImage
                            placeholder="none"
                            quality={100}
                            className="w-full max-w-[225px]"
                            src="./images/self-hosting-hog.png"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
