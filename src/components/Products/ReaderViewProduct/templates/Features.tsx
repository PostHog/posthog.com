import React from 'react'
import { SectionComponentProps } from '../types'

interface FeatureImage {
    src: string
    alt?: string
    stylize?: boolean
    shadow?: boolean
}

interface SubFeature {
    title: string
    description?: string
}

interface Feature {
    title?: string
    headline?: string
    description?: React.ReactNode
    images?: FeatureImage[]
    children?: React.ReactNode
    features?: SubFeature[]
    label?: string
}

const FeatureBlock = ({ feature }: { feature: Feature }) => {
    const heading = feature.headline || feature.title

    return (
        <article className="border border-primary rounded bg-primary p-5">
            {heading && <h3 className="text-xl font-bold text-primary mt-0 mb-2">{heading}</h3>}
            {feature.description && (
                <div className="text-base text-secondary leading-relaxed">{feature.description}</div>
            )}
            {feature.images && feature.images.length > 0 && (
                <div className="mt-4 grid grid-cols-1 gap-3">
                    {feature.images.map((image, index) => (
                        <img
                            key={index}
                            src={image.src}
                            alt={image.alt || heading || ''}
                            className={`w-full h-auto rounded ${image.shadow ? 'shadow-lg' : ''}`}
                        />
                    ))}
                </div>
            )}
            {feature.children && <div className="mt-4">{feature.children}</div>}
            {feature.features && feature.features.length > 0 && (
                <ul className="mt-4 grid grid-cols-1 @lg:grid-cols-2 gap-3 list-none m-0 p-0">
                    {feature.features.map((subFeature) => (
                        <li key={subFeature.title} className="m-0 p-3 bg-accent rounded border border-primary text-sm">
                            <strong className="block text-primary mb-1">{subFeature.title}</strong>
                            {subFeature.description && <span className="text-secondary">{subFeature.description}</span>}
                        </li>
                    ))}
                </ul>
            )}
        </article>
    )
}

const Features = ({ id, productData }: SectionComponentProps) => {
    const features: Feature[] = productData?.features || []

    if (!features.length) return null

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="text-3xl font-bold text-primary mt-0 mb-6">Features</h2>
            <div className="flex flex-col gap-4">
                {features.map((feature, index) => {
                    if (feature.label) {
                        return (
                            <h3
                                key={`label-${index}`}
                                className="text-sm font-semibold uppercase tracking-wider text-secondary mt-4 mb-0"
                            >
                                {feature.label}
                            </h3>
                        )
                    }
                    return <FeatureBlock key={feature.title || `feature-${index}`} feature={feature} />
                })}
            </div>
        </section>
    )
}

export default Features
