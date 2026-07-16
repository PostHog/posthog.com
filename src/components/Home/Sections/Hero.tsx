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
import { RollingWords, rollingWordsDuration, type RollingWordStep } from './RollingWords'

// Cycling verbs for the hero headline. The suite runs twice — readable at the start, blurring
// faster as it goes — so it feels like the product does even more, before settling on "code".
// Holds follow an ease-in curve (HERO_ACCEL > 1): the first round stays slow and readable, then
// the speed-up builds gradually so it eases into the second round instead of lurching into it.
const HERO_WORDS = ['analyze', 'diagnose', 'debug', 'test', 'instrument', 'experiment', 'query', 'flag', 'ship']
const HERO_PASSES = 2
const HERO_START_HOLD = 700 // ms for the first word
const HERO_END_HOLD = 110 // ms for the last verb before "code"
const HERO_ACCEL = 1.25 // >1 eases into the acceleration (stay slow early, build speed later)

const HERO_STEP_COUNT = HERO_WORDS.length * HERO_PASSES
const HERO_CYCLE: RollingWordStep[] = Array.from({ length: HERO_STEP_COUNT }, (_, i) => {
    const progress = Math.pow(i / (HERO_STEP_COUNT - 1), HERO_ACCEL)
    return {
        word: HERO_WORDS[i % HERO_WORDS.length],
        hold: Math.round(HERO_START_HOLD * Math.pow(HERO_END_HOLD / HERO_START_HOLD, progress)),
    }
})

const HERO_VERBS: RollingWordStep[] = [...HERO_CYCLE, { word: 'code', hold: 0 }]

// Hold the hero carousel's auto-advance until the rolling verbs have settled on "code", so the
// page isn't animating in two places at once on load.
const HERO_CAROUSEL_DELAY = rollingWordsDuration(HERO_VERBS)

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
            <div className="text-primary text-left mb-12 not-prose leading-normal">
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/lazy_a2afd552f7.png"
                    className="w-64 @xl:!hidden -scale-x-100"
                />

                <h1 className="text-4xl pt-2 mb-8 tracking-tight leading-[3rem]">
                    Let{' '}
                    <Logo
                        className="inline-block h-10 w-auto align-baseline relative ml-1.5 mr-1 relative top-2"
                        variant={siteSettings.theme === 'dark' ? 'mono' : 'gradient'}
                        color={siteSettings.theme === 'dark' ? 'white' : undefined}
                    />{' '}
                    <span className="inline-block">
                        <RollingWords steps={HERO_VERBS} className="text-primary font-bold" />
                    </span>
                </h1>

                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/lazy_a2afd552f7.png"
                    className="hidden @xl:!inline-block @xl:w-48 @xl:float-right @xl:ml-8 @2xl:w-56 @3xl:w-60 @4xl:w-64 @2xl:float-right -scale-x-100 @2xl:-mt-4 @3xl:-mt-16 @4xl:-mt-24 transition-all"
                />

                <p className="@5xl:text-balance">PostHog is the customer context platform for AI agents.</p>

                <p className="@5xl:text-balance">
                    Other AI code editors know your codebase. Only PostHog knows your code{' '}
                    <strong className="underline">and</strong> your customers.
                </p>

                <div className="pt-2">
                    <CTAs />
                </div>
            </div>
            <div className="@container">
                <TabbedCarousel variant="hero" tabs={heroTabs} autoplayStartDelay={HERO_CAROUSEL_DELAY} />
            </div>
        </>
    )
}

export default Hero
