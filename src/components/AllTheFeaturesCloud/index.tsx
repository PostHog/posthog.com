import React from 'react'
import { CallToAction } from '../CallToAction'

import graphicAnalytics from '../LandingPage/images/analytics@2x.png'
import graphicInsights from '../LandingPage/images/insights@2x.png'
import graphicPlatform from '../LandingPage/images/platform@2x.png'

export const AllTheFeaturesCloud = () => {
    return (
        <div className="w-11/12 max-w-4xl mx-auto text-center">
            <h3 className="mb-2 text-white">What's in PostHog Cloud?</h3>
            <p className="text-white text-opacity-75">(Everything. You literally get it all.)</p>
            <div className="platform-columns grid grid-flow-row auto-rows-max md:grid-flow-col md:auto-cols-max justify-center text-white">
                <div className="">
                    <figure className="my-0">
                        <img src={graphicAnalytics} alt="Analytics" width="296" height="296" className="mx-auto my-0" />
                    </figure>
                    <div className="mb-8 lg:mb-0">
                        <h4 className="font-osiris font-normal lowercase">Analytics</h4>
                    </div>
                </div>
                <div className="insights-column">
                    <figure className="my-0">
                        <img src={graphicInsights} alt="Insights" width="296" height="296" className="mx-auto my-0" />
                    </figure>
                    <div className="mb-8 lg:mb-0">
                        <h4 className="font-osiris font-normal lowercase">Insights</h4>
                    </div>
                </div>
                <div className="">
                    <figure className="my-0">
                        <img src={graphicPlatform} alt="Platform" width="296" height="296" className="mx-auto my-0" />
                    </figure>
                    <div className="mb-8 lg:mb-0">
                        <h4 className="font-osiris font-normal lowercase">Platform</h4>
                    </div>
                </div>
            </div>

            <div className="bg-deep-blue bg-opacity-20 border border-white border-opacity-10 p-4 px-4 md:px-10 -mx-3 md:mx-auto mt-4 mb-10 max-w-4xl flex flex-col md:flex-row rounded-lg items-center md:items-baseline backdrop-filter backdrop-blur-sm">
                <p className="flex-0 md:flex-1 text-center md:text-left text-white mb-0">
                    PostHog Cloud comes with all product features and platform benefits.
                </p>
                <aside className="flex-0">
                    <CallToAction icon="none" type="secondary" href="#" className="my-4">
                        Take the product tour
                    </CallToAction>
                </aside>
            </div>
        </div>
    )
}
