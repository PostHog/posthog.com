import React from 'react'
import { ProductFeatureIcons } from '../ProductFeatureIcons'
import { SocialProof } from '../SocialProof'
import { LandingPageCallToAction } from '../LandingPageCallToAction'

export const Hero = () => {
    return (
        <div className="hero py-12 sm:py-24">
            <div className="w-11/12 mx-auto text-center relative z-10 rounded">
                <div className="max-w-full mx-auto">
                    <h1 className="text-white mb-0 pb-0 leading-tight">
                        The <span className="relative open-source">platform</span> for{' '}
                        <span className="text-orange">building better products</span>
                    </h1>
                </div>

                <div className="max-w-4xl mx-auto">
                    <ProductFeatureIcons />
                </div>

                <p className="text-white mt-4 max-w-xl mx-auto">
                    <span className="opacity-70">+ Heatmaps, Session Browsing, Autocapture &amp; more</span>
                </p>

                <LandingPageCallToAction />

                <SocialProof />
            </div>
        </div>
    )
}
