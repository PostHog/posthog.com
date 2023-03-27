import { CallToAction } from 'components/CallToAction'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import { SectionWrapper } from './Section'
import { ICTA } from './types'

export default function CTA({ title, subtitle, image }: ICTA) {
    const gatsbyImage = image && getImage(image)
    return (
        <SectionWrapper>
            <div className="flex md:space-y-0 space-y-4 md:flex-row flex-col md:space-x-4 justify-between p-12 bg-gray-accent-light rounded-lg md:items-center">
                <div>
                    <h2 className="m-0">{title}</h2>
                    <p className="m-0 mb-6">{subtitle}</p>
                    <CallToAction to="https://app.posthog.com/signup">Get started - free</CallToAction>
                </div>
                {gatsbyImage && (
                    <div className="md:max-w-[400px]">
                        <GatsbyImage alt={title} image={gatsbyImage} />
                    </div>
                )}
            </div>
        </SectionWrapper>
    )
}
