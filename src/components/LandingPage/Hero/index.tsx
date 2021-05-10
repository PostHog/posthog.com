import React from 'react'
import { ProductFeatureIcons } from '../ProductFeatureIcons'
import { SocialProof } from '../SocialProof'
import { LandingPageCallToAction } from '../LandingPageCallToAction'

import heroGraphic from '../images/hero@2x.png'
import sequenceGraphic from '../images/sequence@2x.png'
import sequenceMobileGraphic from '../images/sequence-mobile@2x.png'

export const Hero = () => {
    return (
        <div className="hero py-6 text-center">
            <div>
                <style>
                    {
                        '\
                body{\
                background: #220f3f;\
                }\
                .bg-purple-gradient{\
                    background: none;\
                    }\
                '
                    }
                </style>
            </div>
            <div className="flex justify-center w-11/12 mx-auto mb-8 pt-12 flex-col relative z-10">
                <div className="max-w-full hero-headline mt-4">
                    <h1 className="text-white leading-tight mb-4">
                        The <span className="relative open-source">platform</span> for
                        <br />
                        <span className="text-5xl">building better products</span>
                    </h1>
                    <p className="text-baby-blue text-base">
                        Analytics with autocapture, session recordings, feature flags, heatmaps and more.
                        <br />
                        In a single product you can host yourself.
                    </p>
                </div>

                <LandingPageCallToAction />

                <div className="p-4 mt-10 md:mt-20 relative z-20">
                    <div className="md:hidden">
                        <img
                            src={sequenceMobileGraphic}
                            alt="Ingest data with Event Pipelines. Discover insights with Analytics Suite. Test &amp; iterate with Feature Flags. Observe adoption with Session Recordings. Export to Data Lakes."
                            width="339"
                            height="580"
                            className="mx-auto"
                        />
                    </div>
                    <div className="hidden md:block">
                        <img
                            src={sequenceGraphic}
                            alt="Ingest data with Event Pipelines. Discover insights with Analytics Suite. Test &amp; iterate with Feature Flags. Observe adoption with Session Recordings. Export to Data Lakes."
                            width="1020"
                            height="177"
                            className="mx-auto"
                        />
                    </div>
                </div>
            </div>

            <SocialProof />
        </div>
    )
}
