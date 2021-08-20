import React from 'react'
import { SocialProof } from '../SocialProof'
import { LandingPageCallToAction } from '../LandingPageCallToAction'
import { StaticImage } from 'gatsby-plugin-image'

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
                .bg-purple-gradient, .header-wrapper, body.dark .header-wrapper{\
                    background: none;\
                    }\
                '
                    }
                </style>
            </div>
            <div className="flex justify-center w-11/12 mx-auto mb-8 pt-12 flex-col relative z-10">
                <div className="max-w-full hero-headline mt-4">
                    <h1 className="text-white leading-none mb-4 text-5xl">
                        Host your own
                        <br />
                        product analytics suite
                    </h1>
                    <p className="text-baby-blue text-base">
                        Enable your entire company to analyze user behavior.
                        <br />
                        Eliminate repetitive SQL requests.
                    </p>
                </div>

                <LandingPageCallToAction />

                <div className="p-4 mt-10 md:mt-20 relative z-20">
                    <div className="md:hidden">
                        <StaticImage
                            placeholder="tracedSVG"
                            loading="eager"
                            src="../images/sequence-mobile@2x.png"
                            alt="Ingest data with Event Pipelines. Discover insights with Analytics Suite. Test &amp; iterate with Feature Flags. Observe adoption with Session Recordings. Export to Data Lakes."
                            width={339}
                            height={580}
                            imgClassName="mx-auto"
                        />
                    </div>
                    <div className="hidden md:block">
                        <StaticImage
                            placeholder="tracedSVG"
                            loading="eager"
                            src="../images/sequence@2x.png"
                            alt="Ingest data with Event Pipelines. Discover insights with Analytics Suite. Test &amp; iterate with Feature Flags. Observe adoption with Session Recordings. Export to Data Lakes."
                            width={1020}
                            height={177}
                            className="mx-auto"
                        />
                    </div>
                </div>
            </div>

            <SocialProof />
        </div>
    )
}
