import React from 'react'
import { ProductFeatureIcons } from '../ProductFeatureIcons'
import { SocialProof } from '../SocialProof'
import { PrimaryCta } from '../Buttons/PrimaryCta'
import { SecondaryCta } from '../Buttons/SecondaryCta'

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

                <PrimaryCta>Get Started</PrimaryCta>
                <SecondaryCta>Book a demo</SecondaryCta>

                <SocialProof />
            </div>
        </div>
    )
}
