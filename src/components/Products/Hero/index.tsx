import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { CallToAction } from 'components/CallToAction'
import { IconRewindPlay, IconTrends } from '@posthog/icons'

interface HeroProps {
    icon: string
    product: string
    title: string
    description: string
    image: any
}

export const Hero = ({ icon, product, title, description }: HeroProps): JSX.Element => {
    return (
        <section>
            <div className="flex gap-1 justify-center items-center mb-3">
                <span className="w-6 h-6 text-yellow">{icon}</span>
                <span className="text-[15px] font-semibold text-opacity-60">{product}</span>
            </div>
            <h1 className="text-6xl text-center mb-2">{title}</h1>
            <p
                className="text-lg font-semibold text-center text-opacity-75 mb-5"
                dangerouslySetInnerHTML={{ __html: description }}
            />
            <div className="flex justify-center gap-2 mb-12">
                <CallToAction href="https://app.posthog.com/signup" type="primary">
                    Get started - free
                </CallToAction>
                <CallToAction href="/contact-sales" type="secondary">
                    Book a demo
                </CallToAction>
            </div>
        </section>
    )
}
