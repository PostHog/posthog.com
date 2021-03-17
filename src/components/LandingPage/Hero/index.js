import React from 'react'
import { ProductFeatureIcons } from '../ProductFeatureIcons'
import { SocialProof } from '../SocialProof'
import { LandingPageCallToAction } from '../LandingPageCallToAction'

export const Hero = () => {
    return (
        <div className="hero py-12 sm:py-24">
            <div className="w-11/12 mx-auto text-center relative z-10 rounded">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-white mb-0 pb-0">More than product analytics</h1>
                    <p className="text-white mt-4 max-w-xl mx-auto">
                        <span className="opacity-70">PostHog is an</span>{' '}
                        <a
                            href="https://github.com/PostHog/"
                            target="_blank"
                            rel="noreferrer"
                            className="text-orange opacity-90 hover:opacity-100 hover:text-orange"
                        >
                            open source platform
                        </a>{' '}
                        <span className="opacity-70">
                            designed to help you understand customers, quantify value, and ship new features faster.
                        </span>
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <ProductFeatureIcons />
                </div>
                <LandingPageCallToAction />
                <SocialProof />
            </div>
        </div>
    )
}
