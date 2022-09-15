import { CallToAction } from 'components/CallToAction'
import { ZoomImage } from 'components/ZoomImage'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import Section from './Section'

export default function Heatmaps() {
    return (
        <Section id="heatmaps" style={{ marginBottom: '3rem' }}>
            <div className="md:w-2/5">
                <h3>Heatmaps</h3>
                <p>
                    See what’s clicking with users. Heatmaps show what captures users’ attention by overlaying
                    click-counts in your product.
                </p>
                <CallToAction
                    type="outline"
                    size="md"
                    className="text-red hover:text-red dark:text-red dark:hover:text-red font-bold text-lg"
                    to="/product/heatmaps"
                >
                    Learn more about Heatmaps
                </CallToAction>
            </div>
            <div className="md:w-3/5 flex justify-center">
                <ZoomImage>
                    <StaticImage width={517} src="./images/heatmaps.png" />
                </ZoomImage>
            </div>
        </Section>
    )
}
