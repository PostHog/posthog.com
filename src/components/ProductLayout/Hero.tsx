import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image'
import React from 'react'

export default function Hero({
    title,
    subtitle,
    image,
    mainCTA,
    pricingCTA,
    customers,
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
    customers: any
}) {
    console.log(customers)
    const gatsbyImage = image?.image && getImage(image?.image)
    const imageStyles = { maxWidth: image?.width || '56rem', maxHeight: image?.height || 'auto' }
    return (
        <div className="mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <h1 id="overview" className="text-red text-5xl lg:text-6xl 2xl:text-7xl my-2 md:mt-0">
                        {title}
                    </h1>
                    <h2>PostHog does that.</h2>
                    <p
                        className="text-lg font-semibold text-black/70 mt-4"
                        dangerouslySetInnerHTML={{ __html: subtitle }}
                    />
                    {pricingCTA && mainCTA && (
                        <div className="flex space-x-4 items-center">
                            <CallToAction to={mainCTA.url} size="sm" className="">
                                {mainCTA.title}
                            </CallToAction>
                            <CallToAction type="secondary" to={pricingCTA.url} size="sm" className="">
                                {pricingCTA.title}
                            </CallToAction>
                        </div>
                    )}
                    {customers && customers.nodes.length > 0 && (
                        <ul className="m-0 p-0 list-none mt-12 flex lg:space-x-4 lg:items-center items-start lg:flex-row flex-col space-y-6 lg:space-y-0">
                            {customers.nodes.map(
                                ({
                                    fields: { slug },
                                    frontmatter: {
                                        customer,
                                        logo: { publicURL },
                                    },
                                }) => {
                                    return (
                                        <li key={slug}>
                                            <Link to={slug}>
                                                <img alt={customer} src={publicURL} className="max-w-[180px]" />
                                            </Link>
                                        </li>
                                    )
                                }
                            )}
                        </ul>
                    )}
                </div>

                {gatsbyImage && (
                    <div
                        style={imageStyles}
                        className="
                            leading-0
                            relative !max-w-xl xl:!max-w-none after:absolute after:bottom-0 after:left-0 after:w-full after:content-[''] after:h-36 after:bg-gradient-to-b after:from-tan/0 after:via-tan/60 after:to-tan/100
                            md:after:hidden
                            md:-mr-16 xl:-mr-32"
                    >
                        <GatsbyImage alt={title} image={gatsbyImage} objectFit="contain" className="w-full" />
                    </div>
                )}
            </div>
        </div>
    )
}
