import { CallToAction } from 'components/CallToAction'
import Logo from 'components/Logo'
import React from 'react'
import { PricingCTA } from 'components/PricingCTA'
import { SignupCTA } from 'components/SignupCTA'

export default function CTA({ className = '' }) {
    return (
        <div className={`bg-black px-8 md:px-16 pt-12 pb-16 text-white ${className}`}>
            <h4 className="text-4xl leading-tight mb-8 md:mb-4">
                Where else can you get <span className="inline-block text-yellow">open source</span>{' '}
                <span className="inline-block text-red">product analytics,</span>{' '}
                <span className="inline-block text-blue">session recording,</span>{' '}
                <span className="inline-block text-yellow">feature flags,</span>{' '}
                <span className="inline-block text-red">A/B testing, </span>{' '}
                <span className="inline-block text-blue">heatmaps,</span>{' '}
                <span className="inline-block">a library of</span>{' '}
                <span className="inline-block text-yellow">50+ apps,</span>{' '}
                <span className="inline-block text-red">event pipelines,</span>{' '}
                <span className="inline-block">a data warehouse,</span> and an{' '}
                <span className="inline-block text-yellow">API...</span> all in one place?
            </h4>
            <div className="md:space-x-2 mb-8">
                <p className="inline text-xl opacity-70 font-semibold mb-0">
                    For all the tools you need with the modern data stack you want, just use
                </p>
                <span className="inline-flex items-baseline">
                    <span className="h-[30px] relative top-1 mx-1">
                        <Logo color="white" />
                    </span>
                    <p className="text-xl opacity-70 font-semibold mb-0">.</p>
                </span>
            </div>

            <div className="space-y-4 md:space-y-0 md:space-x-4 flex items-center md:flex-row flex-col">
                <SignupCTA className="!w-full md:!w-auto" text="Try PostHog Cloud - free" />
                <div className="inline-flex items-center space-x-4">
                    <span>or</span>
                    <PricingCTA dark />
                </div>
            </div>
        </div>
    )
}
