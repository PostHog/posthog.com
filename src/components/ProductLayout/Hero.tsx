import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image'
import React from 'react'
import { useLocation } from '@reach/router'
import { useValues } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'

export default function Hero({
    title,
    subtitle,
    postHogDoesThat,
    image,
    mainCTA,
    pricingCTA,
    customers,
}: {
    title: string
    subtitle: string
    postHogDoesThat: boolean
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
    const { websiteTheme } = useValues(layoutLogic)
    const { pathname } = useLocation()
    const gatsbyImage = image?.image && getImage(image?.image)
    const imageStyles = { maxWidth: image?.width || '56rem', maxHeight: image?.height || 'auto' }
    return (
        <div className="mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <h1 id="overview" className="text-5xl lg:text-6xl 2xl:text-7xl my-2 md:mt-0">
                        {title}
                    </h1>
                    {postHogDoesThat && <h2 className="opacity-75">PostHog does that.</h2>}
                    <p
                        className="text-lg font-semibold opacity-70 mt-4"
                        dangerouslySetInnerHTML={{ __html: subtitle }}
                    />
                    <div className="flex space-x-3 items-center">
                        <CallToAction to={mainCTA.url} size="md" className="">
                            {mainCTA.title}
                        </CallToAction>
                        {pricingCTA && (
                            <CallToAction type="secondary" to={pricingCTA.url} size="md" className="">
                                {pricingCTA.title}
                            </CallToAction>
                        )}
                    </div>
                    {customers && customers.nodes.length > 0 && (
                        <ul className="m-0 p-0 list-none mt-16 flex flex-wrap items-center">
                            {customers.nodes.map(({ fields: { slug }, frontmatter: { customer, logo, logoDark } }) => {
                                const logoToShow = websiteTheme === 'dark' ? logoDark || logo : logo
                                return (
                                    <li key={slug} className="mb-2 mr-2 lg:mr-4 last:mr-0">
                                        <Link
                                            state={{ customer }}
                                            to={`/${pathname.split('/')[1]}/customers`}
                                            className="inline-block hover:bg-accent dark:hover:bg-accent-dark rounded-sm p-1 cursor-pointer relative hover:scale-[1.01] hover:top-[-.5px] active:scale-[1] active:top-[.5px]"
                                        >
                                            <img
                                                alt={customer}
                                                src={logoToShow?.publicURL}
                                                className="max-h-[30px] w-full"
                                            />
                                        </Link>
                                    </li>
                                )
                            })}
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
