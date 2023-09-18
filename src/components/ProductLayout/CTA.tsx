import { CallToAction } from 'components/CallToAction'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { useEffect, useState } from 'react'
import { SectionWrapper } from './Section'
import { ICTA } from './types'
import usePostHog from 'hooks/usePostHog'
import { useLocation } from '@reach/router'

export const PricingCTA = (props: { title: string; url: string }) => {
    const [cta, setCTA] = useState({ title: props.title, url: props.url })
    const posthog = usePostHog()
    const { pathname } = useLocation()
    const experiment = /^\/feature-flags|^\/ab-testing/gi.test(pathname)

    useEffect(() => {
        posthog?.onFeatureFlags(() => {
            if (experiment) {
                const bookDemo = posthog.getFeatureFlag('product-book-a-demo') === 'book-a-demo'
                const cta = {
                    title: bookDemo ? 'Book a demo' : 'View pricing',
                    url: bookDemo ? '/book-a-demo' : '/pricing',
                }
                setCTA(cta)
            }
        })
    }, [posthog])

    return (
        <CallToAction type="secondary" to={cta.url} size="sm">
            {cta.title}
        </CallToAction>
    )
}

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
                        {pricingCTA && <PricingCTA {...pricingCTA} />}
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
