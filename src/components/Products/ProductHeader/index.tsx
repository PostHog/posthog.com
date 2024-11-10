import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { CallToAction } from 'components/CallToAction'
import { IconRewindPlay, IconTrends } from '@posthog/icons'
import ProductCTA from '../CTA'
import ProductBar from '../ProductBar'

interface ProductHeaderProps {
    color: string
    icon: string
    beta?: boolean
    product: string
    title: string
    description: string
    image: any
    className?: string
}

export const ProductHeader = ({ color, icon, beta, product, title, description, className }: ProductHeaderProps): JSX.Element => {
    return (
        <section>
            <ProductBar
                color={color}
                icon={icon}
                beta={beta}
                product={product}
            />
            <div className="pt-6 @4xl:pt-8">
                <h1 className={`text-3xl md:text-4xl mb-1 px-4 @2xl:px-6 @4xl:px-8 ${className}`} dangerouslySetInnerHTML={{ __html: title }} />
                <p
                    className={`font-semibold text-primary/75 dark:text-primary-dark/75 mb-3 px-4 @2xl:px-6 @4xl:px-8 ${className}`}
                    dangerouslySetInnerHTML={{ __html: description }}
                />
                <ProductCTA className="px-4 @2xl:px-6 @4xl:px-8" />
            </div>
        </section>
    )
}
