import React, { useState } from 'react'
import { CallToAction, TrackedCTA } from '../CallToAction'
import { heading, section } from './classes'
import Icon from './Icon'
import Slider from './Slider'
import Accordion from './Accordion'
import './hero.scss'
import { useLayoutData } from 'components/Layout/hooks'
import usePostHog from 'hooks/usePostHog'
import { SignupCTA } from 'components/SignupCTA'

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

const EnterpriseSignupCTA = () => {
    const posthog = usePostHog()
    const [confirm, setConfirm] = useState(false)

    const handleClick = () => {
        if (!confirm) {
            setConfirm(true)
            return
        }
        window.location.href = `https://${
            posthog?.isFeatureEnabled('direct-to-eu-cloud') ? 'eu' : 'app'
        }.posthog.com/signup`
    }

    return (
        <CallToAction onClick={handleClick}>
            {confirm ? `Are you sure you don’t want to book a demo?` : 'Get started - free'}
        </CallToAction>
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
    const { enterpriseMode } = useLayoutData()
    const heroTitle = enterpriseMode
        ? 'The modern digital optimization platform'
        : 'How engineers build better products'

    return (
        <section className="flex flex-col justify-center items-center">
            <div className="relative w-full z-10">
                <div className={section('z-10 relative md:!mb-8')}>
                    <h1 className={`${heading()} overflow-hidden pb-1 home-hero-title`}>
                        {heroTitle.split(' ').map((word, index) => (
                            <span
                                key={word}
                                className={`${
                                    index > 1 ? 'text-red dark:text-yellow' : ''
                                } ml-4 first:ml-0 inline-block`}
                            >
                                {word}
                            </span>
                        ))}
                    </h1>
                    <h2 className={`${heading('subtitle', 'primary', 'mt-0 mb-6')} home-hero-subtitle`}>
                        {enterpriseMode
                            ? 'Product solutions reimagined for the 21 century'
                            : 'The single platform to analyze, test, observe, and deploy new features'}
                    </h2>
                    <div className="flex justify-center items-center gap-2 home-hero-cta">
                        {enterpriseMode ? <EnterpriseSignupCTA /> : <SignupCTA />}
                        <TrackedCTA
                            key={enterpriseMode ? 'talk-to-sales' : 'get-a-demo'}
                            event={{ name: `clicked Get a demo` }}
                            href="/book-a-demo"
                            type="secondary"
                            size="lg"
                        >
                            {enterpriseMode ? 'Talk to sales' : 'Get a demo'}
                        </TrackedCTA>
                    </div>
                </div>
                <Slider />
                <Accordion />
            </div>
        </section>
    )
}
