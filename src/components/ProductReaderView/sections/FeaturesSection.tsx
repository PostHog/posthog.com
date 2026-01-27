import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import { ProductScreenshot } from 'components/ProductScreenshot'

interface Feature {
    title: string
    description: string
}

interface Skill {
    name: string
    description?: string
    percent?: number
}

interface FeatureItem {
    title?: string
    headline?: string
    description?: string
    icon?: React.ReactNode
    color?: string
    label?: string
    features?: Feature[]
    skills?: (Skill | string)[]
    images?: Array<{
        src: string
        srcDark?: string
        alt?: string
        className?: string
    }>
}

interface FeaturesSectionProps {
    productData: any
}

export default function FeaturesSection({ productData }: FeaturesSectionProps): JSX.Element {
    const features: FeatureItem[] = productData?.features || []

    // Filter out label items (section dividers) and get actual feature items
    const featureItems = features.filter((item) => !item.label)
    const labels = features.filter((item) => item.label)

    return (
        <section id="features" className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Features</h2>

            {featureItems.map((item, index) => {
                // Find the category label for this feature (based on position in original array)
                const itemIndex = features.indexOf(item)
                let categoryLabel: string | undefined
                for (let i = itemIndex - 1; i >= 0; i--) {
                    if (features[i].label) {
                        categoryLabel = features[i].label
                        break
                    }
                }

                return (
                    <div key={index} className="mb-8 pb-8 border-b border-primary last:border-b-0">
                        {/* Category label (if different from previous) */}
                        {(categoryLabel && index === 0) ||
                            (index > 0 &&
                                (() => {
                                    const prevItem = featureItems[index - 1]
                                    const prevItemIndex = features.indexOf(prevItem)
                                    let prevCategoryLabel: string | undefined
                                    for (let i = prevItemIndex - 1; i >= 0; i--) {
                                        if (features[i].label) {
                                            prevCategoryLabel = features[i].label
                                            break
                                        }
                                    }
                                    return categoryLabel !== prevCategoryLabel
                                })() && (
                                    <p className="text-sm font-semibold text-muted uppercase tracking-wide mb-4">
                                        {categoryLabel}
                                    </p>
                                ))}

                        {/* Feature header */}
                        <div className="flex items-start gap-3 mb-4">
                            {item.icon && (
                                <div className={`size-6 shrink-0 mt-1 text-${item.color || 'gray'}`}>{item.icon}</div>
                            )}
                            <div>
                                <h3 className="text-xl font-bold m-0">{item.headline || item.title}</h3>
                            </div>
                        </div>

                        {/* Description */}
                        {item.description && (
                            <div
                                className="text-secondary mb-4 [&_a]:underline [&_a]:font-semibold"
                                dangerouslySetInnerHTML={{ __html: item.description }}
                            />
                        )}

                        {/* Images */}
                        {item.images && item.images.length > 0 && (
                            <div className="mb-4">
                                {item.images.map((image, imgIndex) => (
                                    <ProductScreenshot
                                        key={imgIndex}
                                        imageLight={image.src}
                                        imageDark={image.srcDark || image.src}
                                        alt={image.alt || `${item.title} screenshot`}
                                        classes={`rounded ${image.className || ''}`}
                                        zoom={true}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Sub-features */}
                        {item.features && item.features.length > 0 && (
                            <div className="mt-4">
                                <ul className="list-none pl-0 space-y-3">
                                    {item.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="pl-4 border-l-2 border-primary">
                                            <strong className="text-primary">{feature.title}</strong>
                                            {feature.description && (
                                                <p className="text-secondary text-sm mt-1 mb-0">
                                                    {feature.description}
                                                </p>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Skills (for AI features) */}
                        {item.skills && item.skills.length > 0 && (
                            <div className="mt-4">
                                <h4 className="text-lg font-semibold mb-3">AI Skills</h4>
                                <div className="grid @md:grid-cols-2 gap-4">
                                    {item.skills.map((skill, skillIndex) => {
                                        if (typeof skill === 'string') {
                                            return (
                                                <div key={skillIndex} className="text-secondary">
                                                    {skill}
                                                </div>
                                            )
                                        }
                                        return (
                                            <div key={skillIndex} className="p-3 bg-accent rounded">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <strong className="text-primary">{skill.name}</strong>
                                                    {skill.percent === 0 && (
                                                        <span className="text-xs bg-primary px-1.5 py-0.5 rounded text-secondary">
                                                            Roadmap
                                                        </span>
                                                    )}
                                                </div>
                                                {skill.percent !== undefined && skill.percent > 0 && (
                                                    <div className="w-full h-1.5 bg-input rounded-full mb-2">
                                                        <div
                                                            className={`h-1.5 rounded-full bg-${item.color || 'blue'}`}
                                                            style={{ width: `${skill.percent}%` }}
                                                        />
                                                    </div>
                                                )}
                                                {skill.description && (
                                                    <p className="text-sm text-secondary m-0">{skill.description}</p>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
        </section>
    )
}
