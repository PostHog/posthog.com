import { CallToAction } from 'components/CallToAction'
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image'
import React from 'react'

export default function HeroCondensed({
    title,
    subtitle,
    image,
    mainCTA,
    pricingCTA,
    sticky = true,
}: {
    sticky?: boolean
    title: string
    subtitle: string
    image: {
        image: ImageDataLike
        width: number | string
        height: number | string
    }
    mainCTA: {
        title: string
        url: string
    }
    pricingCTA: {
        title: string
        url: string
    }
}) {
    const gatsbyImage = image?.image && getImage(image?.image)
    const imageStyles = { maxWidth: image?.width || '56rem', maxHeight: image?.height || 'auto' }
    return (
        <div className={`mb-12 ${sticky ? 'sticky top-0 bg-tan py-2 z-20' : ''}`}>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 sm:items-center w-full">
                <div className="flex-1">
                    <h1 id="overview" className="text-red text-2xl sm:text-xl xl:text-2xl my-2 mb-1 md:mt-0">
                        {title} by PostHog
                    </h1>
                    <p className="font-medium text-black/70 m-0 p-0" dangerouslySetInnerHTML={{ __html: subtitle }} />
                </div>

                {pricingCTA && mainCTA && (
                    <div className="flex-[0_0_auto] flex space-x-4 items-center">
                        <CallToAction to={mainCTA.url} size="sm" className="">
                            {mainCTA.title}
                        </CallToAction>
                        <CallToAction type="secondary" to={pricingCTA.url} size="sm" className="">
                            {pricingCTA.title}
                        </CallToAction>
                    </div>
                )}
            </div>
        </div>
    )
}
