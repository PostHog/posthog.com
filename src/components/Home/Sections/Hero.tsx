import React, { useState } from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import TabbedCarousel, { type TabbedCarouselTab } from 'components/TabbedCarousel'
import {
    OnePlaceSlide,
    UnderstandUsageSlide,
    DebugFixSlide,
    TestRolloutSlide,
} from 'components/Home/HeroCarousel/slides'
import Logo from 'components/Logo'
import { useApp } from '../../../context/App'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import { CTAs } from 'components/CTAs'

const heroTabs: TabbedCarouselTab[] = [
    {
        value: 'understand-usage',
        label: 'Understand product usage',
        content: <UnderstandUsageSlide />,
        color: 'bg-blue',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
    },
    {
        value: 'one-place',
        label: 'One place for product data',
        content: <OnePlaceSlide />,
        color: 'bg-teal',
        activeText: 'text-black',
        progressBar: 'bg-black/70 shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
    },
    {
        value: 'debug-fix',
        label: 'Debug & fix issues',
        content: <DebugFixSlide />,
        color: 'bg-salmon',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
    },
    {
        value: 'test-rollout',
        label: 'Test & roll out changes',
        content: <TestRolloutSlide />,
        color: 'bg-purple',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
    },
]

export const Hero = () => {
    const { siteSettings } = useApp()
    const [showIntegrationPrompt, setShowIntegrationPrompt] = useState(false)

    return (
        <>
            <div className="text-center @xl:text-left mb-12">
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/lazy_a2afd552f7.png"
                    className="w-64 @xl:w-48 @xl:float-right @xl:ml-8 @2xl:w-56 @3xl:w-64 @2xl:float-right -scale-x-100 @xl:mt-16 @3xl:mt-8"
                />
                <h1 className="[&_p]:m-0 flex gap-1 flex-wrap justify-center @xl:justify-start !text-2xl mb-8 pt-2">
                    <Logo className="inline-block h-9" fill={siteSettings.theme === 'dark' ? 'white' : undefined} />{' '}
                </h1>

                <h1 className="!text-2xl pt-4">The new way to build products</h1>
                <p className="text-balance @xl:text-wrap @5xl:text-balance">
                    Product development used to mean manually writing code, running analysis, diagnosing bugs, and
                    rolling out changes using dozens of tools.
                </p>

                <p className="text-balance @xl:text-wrap @5xl:text-balance">
                    PostHog is the only platform that acts like a co-pilot for you (and your AI agents) to do it all –{' '}
                    <em>autonomously</em>.
                </p>

                <div>
                    <CTAs />
                </div>
            </div>
            <div className="@container">
                <TabbedCarousel variant="hero" tabs={heroTabs} />
            </div>
        </>
    )
}

export default Hero
