import { CallToAction } from 'components/CallToAction'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import Section from './Section'

export default function SessionRecordings() {
    return (
        <Section id="session-recordings">
            <div className="md:w-2/5">
                <h3>Session recordings</h3>
                <p>
                    Grab the popcorn: Play back individual user sessions to watch how users interact with your product.
                </p>
                <CallToAction
                    type="outline"
                    size="md"
                    className="text-red hover:text-red dark:text-red dark:hover:text-red font-bold text-base"
                    to="/product/session-recordings"
                >
                    Learn more about session recordings
                </CallToAction>
            </div>
            <div className="md:w-3/5 flex justify-center">
                <StaticImage width={624} src="./images/session-recordings.png" />
            </div>
        </Section>
    )
}
