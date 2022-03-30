import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { CallToAction } from '../CallToAction'
import Link from '../Link'
import { heading, section } from './classes'
import Icon from './Icon'

export const FeatureStrip = ({ className = '' }) => {
    return (
        <div className="text-center my-4">
            <ul
                className={`list-none m-0 p-0 pb-2 inline-grid mx-auto grid-cols-3 md:grid-cols-5 justify-start gap-y-2 md:gap-y-4 md:gap-x-4 items-start ${className}`}
            >
                <Feature icon="analytics" title="Product analytics" url="/product/#product-analytics" />
                <Feature icon="session-recording" title="Session recording" url="/product/session-recording" />
                <Feature icon="feature-flags" title="Feature flags" url="/product/feature-flags" />
                <Feature icon="heatmaps" title="Heatmaps" url="/product/heatmaps" />
                <Feature icon="experiments" title="Experiments" url="/product/experimentation-suite" />
            </ul>
            <p className="mt-4 text-xs">
                40+ apps available in the <a href="/apps">PostHog App Store</a>
            </p>
        </div>
    )
}

const Feature = ({ title, icon, url }) => {
    return (
        <li className="w-20">
            <a
                href={url}
                className="flex flex-col px-2 py-1 space-y-2 font-semibold items-start items-center justify-center text-black hover:text-black"
            >
                <Icon className="w-5 h-5 mr-1 md:mr-0" name={icon} />
                <span className="text-[14px] lg:text-[15px]  leading-tight">{title}</span>
            </a>
        </li>
    )
}

export default function Hero() {
    return (
        <section className="flex flex-col justify-center items-center">
            <div className="relative w-full z-10">
                <div className={section('z-10 relative')}>
                    <h1 className={heading()}>
                        The product analytics suite
                        <br /> <span className="text-red">you can host yourself</span>
                    </h1>
                    <h2
                        className={heading('subtitle', 'primary', 'my-6 max-w-2xl mx-auto text-primary text-gray-dark')}
                    >
                        PostHog is the <span className="text-blue">open source</span> platform for your product data,{' '}
                        <br className="hidden md:block" />
                        complete with a{' '}
                        <a
                            href="/docs/integrate/ingest-live-data"
                            className="text-[#333] border-b border-dashed border-gray-primary font-semibold"
                        >
                            data pipeline
                        </a>
                        ,{' '}
                        <a
                            href="/docs/self-host/runbook/clickhouse"
                            className="text-[#333] border-b border-dashed border-gray-primary font-semibold"
                        >
                            data warehouse
                        </a>
                        , and{' '}
                        <a
                            href="/docs/api"
                            className="text-[#333] border-b border-dashed border-gray-primary font-semibold"
                        >
                            API
                        </a>
                        .
                    </h2>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-2 xl:gap-4">
                        <CallToAction type="primary" width="56" to="/signup">
                            Get started
                        </CallToAction>
                        <CallToAction type="outline" width="56" to="/book-a-demo">
                            Schedule a demo
                        </CallToAction>
                    </div>

                    <h3 className="text-center text-base opacity-60 mt-16 mb-6 p-0">Built-in apps:</h3>

                    <FeatureStrip />
                </div>
            </div>
            <div className="w-full mt-8 md:mt-20 xl:mt-0 sm:mt-auto py-6 sm:py-10 bg-gradient-to-t from-tan to-[#E4E5DF]">
                <div className="max-w-screen-2xl mx-auto w-full relative mt-12 md:mt-0">
                    <span className="absolute bottom-0 xl:-bottom-16 right-0 overflow-x-hidden 2xl:overflow-x-visible">
                        <StaticImage
                            objectPosition="bottom"
                            loading="eager"
                            placeholder="none"
                            width={400}
                            imgClassName="h-auto"
                            className="h-full max-w-[200px] md:max-w-[300px] xl:max-w-none mr-0 md:mr-0"
                            objectFit="contain"
                            src="./images/hero-right.png"
                        />
                    </span>
                </div>
            </div>
        </section>
    )
}
