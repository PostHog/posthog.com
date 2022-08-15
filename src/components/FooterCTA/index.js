import AnimateIntoView from 'components/AnimateIntoView'
import { CallToAction } from 'components/CallToAction'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import blurb from './images/blurb.svg'

export default function FooterCTA() {
    return (
        <div className="flex flex-col lg:flex-row justify-between py-12 px-6 sm:px-12 bg-primary dark:bg-gray-accent-dark items-center dark rounded-[10px] mt-12">
            <div>
                <h2 className="text-white text-5xl">Try it free.</h2>
                <p className="text-white w-">
                    Try PostHog Cloud in under 5 minutes, or choose to self-host on your own infrastructure or private
                    cloud.
                </p>
                <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                    <CallToAction to="/signup" className="w-full sm:w-48">
                        Get started - free
                    </CallToAction>
                    <CallToAction to="/book-a-demo" type="secondary" className="w-full sm:w-48 ">
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
