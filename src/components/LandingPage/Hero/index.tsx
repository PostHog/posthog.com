import React from 'react'
import { ProductFeatureIcons } from '../ProductFeatureIcons'
import { SocialProof } from '../SocialProof'
import { LandingPageCallToAction } from '../LandingPageCallToAction'

export const Hero = () => {
    return (
        <div className="hero py-12 md:py-24">
            <div className="w-11/12 mx-auto md:text-center relative z-10 rounded flex flex-col">
                <div className="max-w-full mx-auto hero-headline mt-4 mb-12 sm: mt-0 sm:mb-0">
                    <h1 className="text-white mb-0 pb-0 leading-tight text-center">
                        The <span className="relative open-source">platform</span> for
                        <br />
                        <span className="text-orange">building better products</span>
                    </h1>
                </div>

                <div className="max-w-4xl text-center hero-icons -mx-4 md:mx-auto">
                    <ProductFeatureIcons />
                </div>

                <p className="hero-more-features text-white text-center sm:mt-4 max-w-xl mx-auto text-xs md:mb-12">
                    <span className="opacity-70">+ Heatmaps, Session Browsing, Autocapture &amp; more</span>
                </p>

                <LandingPageCallToAction />

                <SocialProof />
            </div>
        </div>
    )
}
