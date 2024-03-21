import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { CallToAction } from 'components/CallToAction'
import { IconRewindPlay, IconTrends } from '@posthog/icons'

interface HeroProps {
    icon: string
    beta?: boolean
    product: string
    title: string
    description: string
    image: any
}

export const Hero = ({ color, icon, beta, product, title, description }: HeroProps): JSX.Element => {
    return (
        <section>
            <div className="flex gap-1.5 justify-center items-center mb-3">
                <span className={`w-6 h-6 text-${color}`}>{icon}</span>
                <span className="text-[15px] font-semibold text-opacity-60">{product}</span>
                {beta && (
                    <span className="text-xs font-semibold text-opacity-60 bg-yellow px-1 py-0.5 rounded-sm uppercase">
                        Beta
                    </span>
                )}
            </div>
            <h1 className="text-5xl md:text-6xl text-center mb-4 md:mb-2" dangerouslySetInnerHTML={{ __html: title }} />
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
