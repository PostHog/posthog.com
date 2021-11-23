import { CallToAction } from 'components/CallToAction'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import Section from './Section'

export default function Heatmaps() {
    return (
        <Section id="heatmaps">
            <div className="md:w-2/5">
                <h3>Heatmaps</h3>
                <p>
                    See what’s clicking with users. Heatmaps show what’s capturing users’ attention by overlaying
                    click-counts in your product.
                </p>
                <CallToAction
                    type="outline"
                    size="md"
                    className="text-red hover:text-red dark:text-red dark:hover:text-red font-bold text-base"
                    to="/product/heatmaps"
                >
                    Learn more about heatmaps
                </CallToAction>
            </div>
            <div className="md:w-3/5 flex justify-center">
                <StaticImage width={517} src="./images/heatmaps.png" />
            </div>
        </Section>
    )
}
