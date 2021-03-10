import React from 'react'
import { ProductFeatureIcons } from '../ProductFeatureIcons'
import { SocialProof } from '../SocialProof'
import { CallToAction } from '../../CallToAction'

export const Hero = () => {
    return (
        <div className="hero py-24">
            <div className="w-11/12 mx-auto text-center">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-white mb-0 pb-0">More than product analytics</h1>
                    <p className="text-white opacity-70 mt-4 max-w-xl mx-auto">
                        PostHog is an <span className="text-yellow-300 opacity-90">open source platform</span> designed
                        to help you understand customers, quantify value, and ship new features faster.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <ProductFeatureIcons />
                </div>

                <CallToAction icon="rocket" href="https://app.posthog.com/signup">
                    Get Started
                </CallToAction>
                <CallToAction icon="calendar" type="secondary" className="mt-3" to="/schedule-demo">
                    Book a demo
                </CallToAction>

                <SocialProof />
            </div>
        </div>
    )
}
