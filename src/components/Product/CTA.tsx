import { CallToAction } from 'components/CallToAction'
import Logo from 'components/Logo'
import React from 'react'

export default function CTA({ className = '' }) {
    return (
        <div className={`bg-black px-8 md:px-16 py-12 -mb-8 text-white ${className}`}>
            <h4 className="text-4xl leading-tight mb-8 md:mb-4">
                Where else can you get <span className="inline-block text-yellow">self-hostable</span>{' '}
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
                    <span className="h-[30px] relative top-1 mr-1">
                        <Logo color="white" />
                    </span>
                    <p className="text-xl opacity-70 font-semibold mb-0">.</p>
                </span>
            </div>

            <div className="space-y-4 md:space-y-0 md:space-x-4">
                <CallToAction type="primary" className="!w-full md:!w-auto" to="https://app.posthog.com/signup">
                    Try PostHog Cloud - free
                </CallToAction>
                <CallToAction type="secondary" width="56" className="!w-full md:!w-auto" to="/book-a-demo">
                    Book a demo
                </CallToAction>
            </div>
        </div>
    )
}
