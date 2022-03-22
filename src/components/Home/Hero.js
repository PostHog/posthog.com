import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { CallToAction } from '../CallToAction'
import Link from '../Link'
import { heading, section } from './classes'
import Icon from './Icon'

export const FeatureStrip = ({ className = '' }) => {
    return (
        <div className="text-center my-4 md:my-10">
            <ul
                className={`list-none m-0 p-0 inline-grid mx-auto grid-cols-2 md:grid-cols-4 justify-start gap-y-2 md:gap-y-4 items-start ${className}`}
            >
                <Feature icon="event-pipelines" title="Event pipelines" url="/docs/integrate/ingest-live-data" />
                <Feature icon="analytics" title="Product analytics" url="/product/#product-analytics" />
                <Feature icon="session-recording" title="Session recording" url="/product/session-recording" />
                <Feature icon="feature-flags" title="Feature flags" url="/product/feature-flags" />
                <Feature icon="heatmaps" title="Heatmaps" url="/product/heatmaps" />
                <Feature icon="experiments" title="Experiments" url="/product/experimentation-suite" />
                <Feature icon="api" title="API" url="/api" />
                <Feature icon="data-warehouse" title="Export to data warehouse" url="/docs/plugins" />
            </ul>
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
                <span className="text-[14px] text-left leading-tight">{title}</span>
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
                    <h2 className={heading('sm', 'primary', 'my-6', 'max-w-xl', 'mx-auto')}>
                        With our open source platform, customer data never has to leave your infrastructure
                    </h2>

                    <FeatureStrip />

                    <div className="flex flex-col md:flex-row justify-center items-center gap-2 xl:gap-4">
                        <CallToAction type="primary" width="56" to="/signup">
                            Get started
                        </CallToAction>
                        <CallToAction type="outline" width="56" to="/book-a-demo">
                            Schedule a demo
                        </CallToAction>
                    </div>
                </div>
            </div>
            <div className="w-full mt-20 sm:mt-auto py-6 sm:py-10 bg-gradient-to-t from-tan to-[#E4E5DF]">
                <p className="px-4 font-semibold text-center z-10 relative mb-0 text-sm md:text-base">
                    Don't need to self host? Try <Link to="//app.posthog.com/signup">PostHog Cloud</Link>
                </p>
                <div className="max-w-screen-2xl mx-auto w-full relative">
                    <span className="absolute bottom-1 md:-bottom-8 xl:-bottom-16 right-0 overflow-x-hidden 2xl:overflow-x-visible">
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
