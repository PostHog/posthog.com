import React from 'react'
import { SectionComponentProps } from '../types'

interface FeatureImage {
    src: string
    alt?: string
    stylize?: boolean
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
        <div>
            {heading && <h3>{heading}</h3>}
            {feature.description && <div className="leading-relaxed">{feature.description}</div>}
            {feature.images && feature.images.length > 0 && (
                <div className="mt-4 grid grid-cols-1 gap-3">
                    {feature.images.map((image, index) => (
                        <img
                            key={index}
                            src={image.src}
                            alt={image.alt || heading || ''}
                            className={`w-full h-auto rounded`}
                        />
                    ))}
                </div>
            )}
            {feature.children && <div className="mt-4">{feature.children}</div>}
            {feature.features && feature.features.length > 0 && (
                <ul className="mt-4 gap-3 m-0 pl-4">
                    {feature.features.map((subFeature) => (
                        <li key={subFeature.title} className=" list-disc">
                            <strong className="block text-primary mb-1 text-lg">{subFeature.title}</strong>
                            {subFeature.description && <span className="">{subFeature.description}</span>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

const Features = ({ id, productData }: SectionComponentProps) => {
    const rawFeatures = productData?.features
    const features: Feature[] = Array.isArray(rawFeatures) ? rawFeatures : Object.values(rawFeatures || {})

    if (!features.length) return null

    return (
        <section id={id} className="scroll-mt-20 not-prose opacity-50">
            <h2>OLD</h2>
            <div className="grid @2xl/reader-content-container:grid-cols-2 gap-8">
                {features.map((feature, index) => {
                    if (feature.label) {
                        return (
                            <h3 key={`label-${index}`} className="text-base font-semibold uppercase tracking-wider">
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
