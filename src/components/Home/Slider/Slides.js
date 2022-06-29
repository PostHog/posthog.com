import { Funnels, Lifecycle, PathAnalysis, Retention, RightArrow, Stickiness, Trends } from 'components/Icons/Icons'
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
            <div className="col-span-3 max-h-[400px]">
                <motion.div initial={{ translateY: '100%' }} animate={{ translateY: 0 }}>
                    <StaticImage className="w-full" src="./images/product-analytics.png" />
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
            <div className="max-h-[400px]">
                <motion.div initial={{ translateY: '100%' }} animate={{ translateY: 0 }}>
                    <StaticImage className="w-full" src="./images/session-recording.png" />
                </motion.div>
            </div>
            <div className="relative flex flex-col">
                <div>
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
                        <StaticImage className="w-full" src="./images/session-recording-hog.png" />
                    </div>
                </div>
            </div>
        </div>
    )
}
