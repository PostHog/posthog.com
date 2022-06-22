import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { CallToAction } from '../CallToAction'
import { heading, section } from './classes'
import Icon from './Icon'

export const FeatureStrip = ({ className = '' }) => {
    return (
        <div className="text-center mt-0 mb-4 border-gray-accent-light border-dashed border-t border-b">
            <ul
                className={`list-none m-0 p-0 inline-grid mx-auto grid-cols-3 md:grid-cols-7 justify-start gap-y-0 md:gap-y-4 ${className}`}
            >
                <Feature icon="analytics" title="Product analytics" url="/product/#product-analytics" />
                <Feature icon="session-recording" title="Session recording" url="/product/session-recording" />
                <Feature icon="feature-flags" title="Feature flags" url="/product/feature-flags" />
                <Feature icon="experiments" title="A/B testing" url="/product/experimentation-suite" />
                <Feature icon="heatmaps" title="Event pipelines" url="/product/heatmaps" />
                <Feature icon="heatmaps" title="Data warehouse" url="/product/heatmaps" />
                <Feature icon="heatmaps" title="Self-hosting" url="/product/heatmaps" />
            </ul>
        </div>
    )
}

const Feature = ({ title, icon, url }) => {
    return (
        <li className="w-40 border-dashed border-gray-accent-light p-1 h-24 border-l last:border-r">
            <a
                href={url}
                className="flex flex-col py-4 px-2 h-full space-y-1 font-semibold items-center justify-center text-black hover:text-black rounded hover:bg-gray-accent-light"
            >
                <Icon className="w-5 h-5 mr-1 md:mr-0" name={icon} />
                <div className="text-[14px] lg:text-[15px] mt-2 leading-tight">{title}</div>
            </a>
        </li>
    )
}

export default function Hero() {
    return (
        <section className="flex border-dashed flex-col justify-center items-center">
            <div className="relative w-full z-10">
                <div className={section('z-10 relative !mb-12')}>
                    <h1 className={heading()}>
                        The <span className="text-red">open source</span> ProductOps platform
                    </h1>
                    <h2
                        className={heading('subtitle', 'primary', 'my-6 max-w-2xl mx-auto text-primary text-gray-dark')}
                    >
                        All the tools you need. With the modern data stack you want.
                    </h2>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-2 xl:gap-4">
                        <CallToAction type="primary" to="/signup" className="drop-shadow-mega">
                            Get started
                        </CallToAction>
                        <CallToAction type="outline" to="/book-a-demo" className="drop-shadow-mega">
                            Schedule a demo
                        </CallToAction>
                    </div>
                </div>
            </div>

            <div className="relative w-full">
                <FeatureStrip />
            </div>
        </section>
    )
}
