import { CallToAction } from 'components/CallToAction'
import { ZoomImage } from 'components/ZoomImage'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import Section from './Section'

export default function FeatureFlags() {
    return (
        <Section id="feature-flags">
            <div className="md:w-2/5">
                <h3>Feature Flags</h3>
                <p>
                    Roll out features safely. Toggle features for cohorts or individuals to test the impact before
                    rolling out to everyone.
                </p>
                <CallToAction
                    type="outline"
                    size="md"
                    className="text-red hover:text-red dark:text-red dark:hover:text-red font-bold text-base"
                    to="/product/feature-flags"
                >
                    Learn more about Feature Flags
                </CallToAction>
            </div>
            <div className="md:w-3/5 flex justify-center">
                <ZoomImage>
                    <StaticImage width={320} src="./images/feature-flags.png" />
                </ZoomImage>
            </div>
        </Section>
    )
}
