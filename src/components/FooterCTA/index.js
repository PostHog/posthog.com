import AnimateIntoView from 'components/AnimateIntoView'
import { CallToAction } from 'components/CallToAction'
import { SignupCTA } from 'components/SignupCTA'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import blurb from './images/blurb.svg'

export default function FooterCTA() {
    return (
        <div className="flex pt-16 pb-12 px-6 sm:px-12 md:pr-24 lg:pr-6 xl:pr-24 text-primary dark:text-primary-dark bg-accent dark:bg-accent-dark border border-light dark:border-dark items-center dark rounded-[10px] mt-6 md:mt-12 relative">
            <div className="w-full text-center sm:text-left">
                <h2 className="text-5xl">Try it free.</h2>
                <p className="w-">It takes less than 5 minutes.</p>
                <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 items-center">
                    <SignupCTA className="w-full sm:w-48" size="md" />
                    <CallToAction to="/book-a-demo" type="secondary" size="md">
                        Schedule a demo
                    </CallToAction>
                </div>
            </div>
            <div className="absolute hidden sm:block lg:hidden xl:block bottom-0 -right-12 mt-16 lg:mt-0">
                <AnimateIntoView className="absolute -left-20">
                    <img src={blurb} />
                </AnimateIntoView>
                <StaticImage width={252} src="./images/surprised-hog.png" />
            </div>
        </div>
    )
}
