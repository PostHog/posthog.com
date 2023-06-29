import { CallToAction } from 'components/CallToAction'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'
import { SectionWrapper } from './Section'
import { ICTA } from './types'

export default function CTA({ title, subtitle, image, mainCTA, pricingCTA }: ICTA) {
    const gatsbyImage = image && getImage(image)
    return (
        <SectionWrapper>
            <div className="flex mt-8 md:space-y-0 space-y-4 md:flex-row flex-col md:space-x-4 justify-between py-4 px-6 bg-accent dark:bg-accent-dark rounded md:items-center">
                <div>
                    <h2 className="m-0 text-2xl">{title}</h2>
                    <p className="m-0 mb-3 text-[15px] opacity-75">{subtitle}</p>
                    <div className="flex space-x-2 items-center">
                        <CallToAction to={mainCTA.url} size="sm">
                            {mainCTA.title}
                        </CallToAction>
                        {pricingCTA && (
                            <CallToAction type="secondary" to={pricingCTA.url} size="sm">
                                {pricingCTA.title}
                            </CallToAction>
                        )}
                    </div>
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
