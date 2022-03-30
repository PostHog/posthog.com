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
                className={`list-none m-0 p-0 pb-2 inline-grid mx-auto grid-cols-2 md:grid-cols-4 justify-start gap-y-2 md:gap-y-4 md:gap-x-6 xl:gap-x-8 items-start ${className}`}
            >
                <Feature icon="event-pipelines" title="Event pipelines" url="/docs/integrate/ingest-live-data" />
                <Feature icon="analytics" title="Product analytics" url="/product/#product-analytics" />
                <Feature icon="session-recording" title="Session recording" url="/product/session-recording" />
                <Feature icon="feature-flags" title="Feature flags" url="/product/feature-flags" />
                <Feature icon="heatmaps" title="Heatmaps" url="/product/heatmaps" />
                <Feature icon="experiments" title="Experiments" url="/product/experimentation-suite" />
                <Feature icon="api" title="API" url="/docs/api" />
                <Feature icon="data-warehouse" title="Data warehouse" url="/docs/self-host/runbook/clickhouse" />
            </ul>
            <p className="mt-4 text-xs">
                (Plus endless possibilities with the <a href="/apps">PostHog App Store</a>)
            </p>
        </div>
    )
}

const Feature = ({ title, icon, url }) => {
    return (
        <li>
            <a
                href={url}
                className="flex px-2 py-1 space-x-2 font-semibold items-start md:items-center justify-start text-black hover:text-black"
            >
                <Icon className="w-5 h-5 mr-1 md:mr-0" name={icon} />
                <span className="text-[14px] lg:text-[15px]  text-left leading-tight">{title}</span>
            </a>
        </li>
    )
}

export default function Hero() {
    return (
        <section className="flex flex-col justify-center items-center">
            <div className="relative w-full z-10 pb-16">
                <div className={section('z-10 relative')}>
                    <h1 className={heading()}>
                        The platform for
                        <br /> <span className="text-red">building great products</span>
                    </h1>
                    <h2
                        className={heading('subtitle', 'primary', 'my-6 max-w-2xl mx-auto text-primary text-gray-dark')}
                    >
                        PostHog is the only <span className="text-blue">open source</span> platform for{' '}
                        <a href="#" className="text-[#333] border-b border-dashed border-gray-primary font-semibold ">
                            data ingestion
                        </a>
                        ,{' '}
                        <a href="#" className="text-[#333] border-b border-dashed border-gray-primary font-semibold ">
                            product analytics
                        </a>
                        ,{' '}
                        <a href="#" className="text-[#333] border-b border-dashed border-gray-primary font-semibold ">
                            experimentation
                        </a>
                        . And when you host PostHog on-prem,{' '}
                        <span className="text-blue">customer data never has to leave your infrastructure</span>.
                    </h2>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-2 xl:gap-4">
                        <CallToAction type="primary" width="56" to="/signup">
                            Get started
                        </CallToAction>
                        <CallToAction type="outline" width="56" to="/book-a-demo">
                            Schedule a demo
                        </CallToAction>
                    </div>

                    <hr className="hidden md:block max-w-xl border-0 border-t border-dashed border-gray-primary mx-auto mt-12 opacity-50" />

                    <h3 className="text-center text-base opacity-60 my-8 p-0">Built-in apps &amp; features</h3>

                    <FeatureStrip />
                </div>
            </div>
            <div className="w-full mt-8 md:mt-20 sm:mt-auto py-6 sm:py-10 bg-gradient-to-t from-tan to-[#E4E5DF]">
                <div className="max-w-screen-2xl mx-auto w-full relative">
                    <span className="absolute bottom-0 xl:-bottom-16 right-[25%] md:right-0 overflow-x-hidden 2xl:overflow-x-visible">
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
