import React from 'react'
import { CallToAction, TrackedCTA } from '../CallToAction'
import { Link } from 'gatsby'
import { heading, section } from './classes'
import Icon from './Icon'
import Slider from './Slider'
import { SignupCTA } from 'components/SignupCTA'
import Accordion from './Accordion'

export const FeatureStrip = ({ className = '' }) => {
    return (
        <div className="text-center mt-0 mb-4">
            <ul
                className={`list-none m-0 p-0 pb-2 inline-grid mx-auto grid-cols-3 md:grid-cols-5 justify-start gap-y-0 md:gap-y-4 md:gap-x-1 ${className}`}
            >
                <Feature icon="analytics" title="Product analytics" url="/product/#product-analytics" />
                <Feature icon="session-recording" title="Session recording" url="/product/session-recording" />
                <Feature icon="feature-flags" title="Feature flags" url="/product/feature-flags" />
                <Feature icon="heatmaps" title="Heatmaps" url="/product/heatmaps" />
                <Feature icon="experiments" title="Experiments" url="/product/experimentation-suite" />
            </ul>
            <p className="mt-4 text-sm">
                Plus 50-ish apps available in the <a href="/apps">PostHog App Store</a>
            </p>
        </div>
    )
}

const Feature = ({ title, icon, url }) => {
    return (
        <li className="w-24">
            <a
                href={url}
                className="flex flex-col py-4 px-6 h-full space-y-1 font-semibold items-center justify-start text-black hover:text-black rounded hover:bg-gray-accent-light"
            >
                <Icon className="w-5 h-5 mr-1 md:mr-0" name={icon} />
                <div className="text-[14px] lg:text-[15px] mt-2 leading-tight">{title}</div>
            </a>
        </li>
    )
}

export default function Hero() {
    return (
        <section className="flex flex-col justify-center items-center">
            <div className="relative w-full z-10">
                <div className={section('z-10 relative md:!mb-8')}>
                    <h1 className={heading()}>
                        How engineers{' '}
                        <span className="text-red dark:text-yellow inline-block">build better products</span>
                    </h1>
                    <h2 className={heading('subtitle', 'primary', 'my-6')}>
                        The single platform to analyze, test, observe, and deploy new features
                    </h2>

                    <div className="flex justify-center items-center gap-2">
                        <SignupCTA className="" />

                        <TrackedCTA
                            event={{ name: `clicked Get a demo` }}
                            href="/book-a-demo"
                            type="secondary"
                            size="lg"
                        >
                            Get a demo
                        </TrackedCTA>
                    </div>
                </div>
                <Slider />
                <Accordion />
            </div>
        </section>
    )
}
