import React from 'react'
import ProductImage, { Image } from './Image'

interface Feature {
    title: string
    description: string
    icon?: React.ReactNode
}

interface FeaturesGridProps {
    headline: string
    description?: string
    icon?: React.ReactNode
    features?: Feature[]
    skills?: Array<{ name: string; description?: string; sticker?: React.ReactNode; percent?: number } | string>
    images?: Image[]
    children?: React.ReactNode
    bgColor?: string
    textColor?: string
    layout?: string
}

// Function to determine optimal column count based on feature count
const getColumnCount = (featureCount: number): number => {
    switch (featureCount) {
        case 2:
            return 2
        case 3:
            return 3
        case 4:
            return 4
        case 5:
            return 3 // 3 cols and wrap
        case 6:
            return 3
        case 7:
            return 4
        case 8:
            return 4
        default:
            return 4 // fallback for edge cases
    }
}

export default function FeaturesGrid({
    headline,
    description,
    icon,
    features,
    skills,
    images,
    children,
    bgColor,
    textColor,
    layout,
}: FeaturesGridProps) {
    // Determine column count based on features length
    const columnCount = features ? getColumnCount(features.length) : 4
    const gridColsClass = `grid-cols-${columnCount}`

    // AI Layout - completely different structure
    if (layout === 'ai') {
        return (
            <div className={`h-full bg-${bgColor} ${textColor} overflow-auto`}>
                {/* Images - float right */}
                {images && images.length > 0 && (
                    <div className="max-w-xl mx-auto @2xl:float-right @2xl:ml-4 mb-4">
                        <ProductImage images={images} />
                    </div>
                )}

                <div className="pt-12 px-4 pb-8">
                    <h2 className="text-5xl mb-0">{headline}</h2>
                    {description && (
                        <p
                            className="mt-4 text-xl [&_code]:text-xl"
                            {...(typeof description === 'string'
                                // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml - CMS content, not user input
                                ? { dangerouslySetInnerHTML: { __html: description } }
                                : { children: description })}
                        />
                    )}
                </div>

                <div className="px-4">
                    {/* Features section */}
                    {features && features.length > 0 && (
                        <div className="mb-6">
                            {features.map((feature: Feature, featureIndex: number) => (
                                <div key={featureIndex} className="mb-6">
                                    <h3 className="text-2xl mb-1">{feature.title}</h3>
                                    <p className="text-lg">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Skills section */}
                    {skills && skills.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-2xl mb-4">Skills</h3>
                            <div className="grid @2xl:grid-cols-2 gap-x-8 gap-y-4">
                                {skills.map((skill: any, skillIndex: number) => {
                                    if (typeof skill === 'string') {
                                        return (
                                            <div key={skillIndex} className="text-xl">
                                                {skill}
                                            </div>
                                        )
                                    }
                                    return (
                                        <div key={skillIndex}>
                                            <div className="flex items-center gap-2 mb-2">
                                                {skill.sticker && <div className="shrink-0">{skill.sticker}</div>}
                                                <div className="text-lg font-medium">{skill.name}</div>
                                            </div>
                                            {skill.description && (
                                                <p className="text-base text-secondary mb-2">{skill.description}</p>
                                            )}
                                            {skill.percent !== undefined && (
                                                <div className="w-full h-2 bg-input rounded-full">
                                                    <div
                                                        className="h-2 rounded-full bg-red dark:bg-yellow"
                                                        style={{ width: `${skill.percent}%` }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {children && <div className="mt-8">{children}</div>}
                </div>
            </div>
        )
    }

    // Default grid layout
    return (
        <div className={`h-full bg-${bgColor} ${textColor}`}>
            <div className="pt-12 px-4 pb-8">
                <h2 className="text-5xl mb-0 text-center">{headline}</h2>
                {description && (
                    <p
                        className="mt-4 text-xl text-center [&_code]:text-xl"
                        {...(typeof description === 'string'
                            // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml - CMS content, not user input
                            ? { dangerouslySetInnerHTML: { __html: description } }
                            : { children: description })}
                    />
                )}
                {icon && (
                    <div className="flex justify-center mt-6">
                        <div className="bg-accent rounded-full p-4">
                            <div className="size-8">{icon}</div>
                        </div>
                    </div>
                )}
            </div>

            {features && features.length > 0 && (
                <div className={`grid @2xl:${gridColsClass} gap-x-4 gap-y-8 px-8 @2xl:px-4 mb-8`}>
                    {features.map((feature: Feature, index: number) => (
                        <div key={index} className="@2xl:text-center">
                            {feature.icon && (
                                <div className="flex justify-center mb-3">
                                    <div className="bg-accent rounded-full p-4">
                                        <div className={`size-8 text-black fill-black`}>{feature.icon}</div>
                                    </div>
                                </div>
                            )}
                            <h3 className="text-2xl mb-1">{feature.title}</h3>
                            <p className="text-lg">{feature.description}</p>
                        </div>
                    ))}
                </div>
            )}

            {images && images.length > 0 && (
                <div className="max-w-3xl mx-auto px-4">
                    <ProductImage images={images} />
                </div>
            )}

            {children && <div className="px-4 mt-8">{children}</div>}
        </div>
    )
}
