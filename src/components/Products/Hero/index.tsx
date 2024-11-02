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
    className?: string
}

export const Hero = ({ color, icon, beta, product, title, description, className }: HeroProps): JSX.Element => {
    return (
        <section>
            <div className={`flex gap-1.5 items-center mb-3 py-2 border-b border-light dark:border-dark px-4`}>
                <span className={`w-6 h-6 text-${color}`}>{icon}</span>
                <span className="text-[15px] font-semibold text-opacity-60">{product}</span>
                {beta && (
                    <span className="text-xs font-semibold text-opacity-60 bg-yellow px-1 py-0.5 rounded-sm uppercase text-primary">
                        Beta
                    </span>
                )}
            </div>
            <h1 className={`text-3xl md:text-4xl mb-1 px-4 ${className}`} dangerouslySetInnerHTML={{ __html: title }} />
            <p
                className={`font-semibold text-primary/75 dark:text-primary-dark/75 mb-3 px-4 ${className}`}
                dangerouslySetInnerHTML={{ __html: description }}
            />
            <div className={`flex gap-2 mb-8 px-4 ${className}`}>
                <CallToAction href="https://app.posthog.com/signup" type="primary" size="sm">
                    Get started - free
                </CallToAction>
                <CallToAction href="/talk-to-a-human" type="secondary" size="sm">
                    Talk to a human
                </CallToAction>
            </div>
        </section>
    )
}
