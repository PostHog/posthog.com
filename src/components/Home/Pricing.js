import Link from 'components/Link'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

export default function Pricing() {
    return (
        <section className="mb-16 mt-16 lg:mt-32 px-5 max-w-screen-2xl mx-auto">
            <div className="flex lg:flex-row flex-col items-center">
                <div className="lg:max-w-[700px] lg:flex-shrink-0">
                    <h2 className="text-[9vw] md:text-7xl m-0 relative after:absolute after:w-full after:h-full after:bg-no-repeat after:bg-[url(/images/lil-squiggle.svg)] after:left-0 after:top-0 after:bg-center inline-block">
                        “Let’s jump on a call”
                        <span className={``} />
                    </h2>
                    <h3 className="text-xl sm:text-2xl m-0 my-2 sm:my-4">
                        Honest, transparent pricing that doesn’t force you to talk to a human (unless you want to)
                    </h3>
                    <p className="sm:text-lg m-0">
                        Watch a <Link to="">recorded demo</Link> at your own pace, or{' '}
                        <Link to="">request a personalized demo</Link> if your business has bespoke needs.
                    </p>
                </div>
                <div className="lg:ml-2 lg:mt-0 mt-8">
                    <StaticImage src="./images/busy-hog.png" />
                </div>
            </div>
        </section>
    )
}
