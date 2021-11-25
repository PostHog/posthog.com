import AnimateIntoView from 'components/AnimateIntoView'
import { CallToAction } from 'components/CallToAction'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import blurb from './images/blurb.svg'

export default function FooterCTA() {
    return (
        <div className="flex flex-col lg:flex-row justify-between py-12 px-6 sm:px-12 bg-primary dark:bg-gray-accent-dark items-center dark rounded-[10px] mt-12">
            <div>
                <h2 className="text-white">Try it free.</h2>
                <p className="text-white w-">
                    Install on your own server or Cloud hosting account, or just try PostHog Cloud and start tracking
                    data in under 5 minutes.
                </p>
                <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                    <CallToAction to="/signup" className="!bg-red !border-red !text-white w-full sm:w-44">
                        Get started
                    </CallToAction>
                    <CallToAction to="/book-a-demo" type="outline" className="w-full sm:w-44 !bg-transparent">
                        Schedule a demo
                    </CallToAction>
                </div>
            </div>
            <div className="flex-shrink-0 self-end relative ml-12 -mb-12 -mr-10 mt-16 lg:mt-0">
                <AnimateIntoView className="absolute -left-20">
                    <img src={blurb} />
                </AnimateIntoView>
                <StaticImage width={252} src="./images/surprised-hog.png" />
            </div>
        </div>
    )
}
