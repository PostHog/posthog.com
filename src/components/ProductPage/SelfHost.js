import { CallToAction } from 'components/CallToAction'
import { ZoomImage } from 'components/ZoomImage'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import Section from './Section'

export default function SelfHost() {
    return (
        <Section id="self-host">
            <div className="md:w-2/5">
                <h3>Self-host your analytics</h3>
                <p>
                    Host your own analytics to keep user data private and avoid relying on third-parties or their
                    cookies.
                </p>
                <CallToAction
                    type="outline"
                    size="md"
                    className="text-red hover:text-red dark:text-red dark:hover:text-red font-bold text-base"
                    to="/product/selfhost"
                >
                    Learn more about self-hosting
                </CallToAction>
            </div>
            <div className="md:w-3/5 flex justify-center">
                <ZoomImage>
                    <StaticImage width={320} src="./images/self-host.png" />
                </ZoomImage>
            </div>
        </Section>
    )
}
