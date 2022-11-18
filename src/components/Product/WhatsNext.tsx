import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'
import React from 'react'
import { FeatureWrapperRow } from './FeatureWrapper'
import { StaticImage } from 'gatsby-plugin-image'

export default function WhatsNext() {
    return (
        <FeatureWrapperRow
            id="roadmap"
            title="What's next?"
            description={
                <>
                    <figure className="w-52 mx-auto md:w-auto md:mx-0 float-right -mt-8 md:-mt-24 pl-8 md:pb-8">
                        <StaticImage
                            width={367}
                            height={348}
                            imgClassName=""
                            placeholder="blurred"
                            alt={`Here's what's cookin', good lookin'`}
                            src="./images/experiment-hog.png"
                        />
                    </figure>

                    <p>We build features based on community input.</p>
                    <p>
                        Our product roadmap is public. It's where you can share your thoughts on what we're thinking
                        about building, and get early access on new features.
                    </p>

                    <p>We'd love to get your feedback!</p>

                    <CallToAction type="secondary" size="sm" to="/roadmap" className="mb-6 md:mb-12">
                        Visit our product roadmap
                    </CallToAction>
                </>
            }
        />
    )
}
