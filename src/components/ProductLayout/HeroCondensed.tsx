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
        <div
            className={`hidden sm:-mt-4 lg:-mt-12 xl:-mt-12 pt-3 pb-3 mb-8 -mx-5 lg:-mx-6 px-5 lg:px-6 xl:-mx-12 xl:px-12 bg-accent/50 dark:bg-accent-dark/50 border-b border-light dark:border-dark backdrop-blur ${
                sticky ? 'sticky top-0 bg-tan py-2 z-20' : ''
            }`}
        >
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 sm:items-center w-full">
                <div className="flex-1">
                    <h1 id="overview" className="text-primary dark:text-primary-dark text-lg mt-2 mb-0 md:my-0">
                        {title}
                    </h1>
                    {/* <p className="font-medium text-black/70 m-0 mt-1 p-0" dangerouslySetInnerHTML={{ __html: subtitle }} /> */}
                </div>

                <div className="flex-[0_0_auto] flex space-x-4 items-center">
                    {mainCTA && (
                        <CallToAction to={mainCTA.url} size="sm" className="">
                            {mainCTA.title}
                        </CallToAction>
                    )}
                    {pricingCTA && (
                        <CallToAction type="secondary" to={pricingCTA.url} size="sm" className="">
                            {pricingCTA.title}
                        </CallToAction>
                    )}
                </div>
            </div>
        </div>
    )
}
