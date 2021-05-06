import React from 'react'
import { ProductFeatureIcons } from '../ProductFeatureIcons'
import { SocialProof } from '../SocialProof'
import { LandingPageCallToAction } from '../LandingPageCallToAction'

import heroGraphic from '../images/hero@2x.png'
import sequenceGraphic from '../images/sequence@2x.png'

const HeroGraphic = ({ url, alt }: { url: string; alt: string }) => (
    <img src={url} alt={alt} width="404" height="326" className="" />
)

const SequenceGraphic = ({ url, alt }: { url: string; alt: string }) => (
    <img src={url} alt={alt} width="1020" height="177" className="mx-auto" />
)

export const Hero = () => {
    return (
        <div className="hero py-6 text-center lg:text-left lg:py-24">
            <div className="flex w-11/12 mx-auto mb-16 flex-col lg:flex-row">
                <div className="flex-0 mx-auto lg:ml-0 lg:mr-6">
                    <HeroGraphic
                        url={heroGraphic}
                        alt="See that data, watch it move. See how it travels effortlessly from your event pipelines, through the PostHog suite, and out to your data lake. Voila!"
                    />
                </div>

                <div className="flex-1">
                    <div className="max-w-full hero-headline mt-4">
                        <h1 className="text-white leading-tight mb-4">
                            The <span className="relative open-source">platform</span> for
                            <br />
                            <span className="text-5xl">building better products</span>
                        </h1>
                        <p className="text-baby-blue text-base">
                            Analytics, session recordings, feature flags, heatmaps and more - in a single product you
                            can host yourself.
                        </p>
                    </div>

                    <LandingPageCallToAction />
                </div>
            </div>

            <div className="px-4">
                <h3 className="text-center text-baby-blue mb-12">An end-to-end data platform</h3>
                <SequenceGraphic
                    url={sequenceGraphic}
                    alt="Ingest data with Event Pipelines. Discover insights with Analytics Suite. Test &amp; iterate with Feature Flags. Observe adoption with Session Recordings. Export to Data Lakes."
                />
            </div>

            <p className="text-baby-blue text-center font-bold text-sm opacity-75">
                + Heatmaps, Session Browsing, Autocapture &amp; more
            </p>

            <SocialProof />
        </div>
    )
}
