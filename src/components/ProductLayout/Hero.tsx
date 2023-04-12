import { CallToAction } from 'components/CallToAction'
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image'
import React from 'react'

export default function Hero({
    title,
    subtitle,
    image,
    mainCTA,
    pricingCTA,
}: {
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
        <>
            <div>
                <h1 id="overview" className="text-center text-5xl lg:text-6xl 2xl:text-7xl mb-0 mt-8 md:mt-14">
                    <span className="text-red">{title}?</span> <span className="inline-block">PostHog does that.</span>
                </h1>
                <p
                    className="text-center text-lg font-semibold text-black/70 mt-4"
                    dangerouslySetInnerHTML={{ __html: subtitle }}
                />
                {pricingCTA && mainCTA && (
                    <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-4 md:items-center justify-center">
                        <CallToAction to={mainCTA.url} size="sm" className="md:min-w-[200px]">
                            {mainCTA.title}
                        </CallToAction>
                        <CallToAction type="secondary" to={pricingCTA.url} size="sm" className="md:min-w-[200px]">
                            {pricingCTA.title}
                        </CallToAction>
                    </div>
                )}
            </div>
            {gatsbyImage && (
                <div
                    style={imageStyles}
                    className="leading-0 mx-auto mt-8 -mb-12 text-center relative after:absolute after:bottom-12 after:left-0 after:w-full after:content-[''] after:h-36 after:bg-gradient-to-b after:from-tan/0 after:via-tan/60 after:to-tan/100"
                >
                    <GatsbyImage alt={title} image={gatsbyImage} className="rounded-md shadow-xl" />
                </div>
            )}
        </>
    )
}
