import React from 'react'
import { IconSparkles } from '@posthog/icons'

interface FeaturesSlideAIProps {
    productName: string
    features?: Array<{
        title?: string
        headline?: string
        description?: string
        features?: Array<{
            title?: string
            headline?: string
            icon?: any
            children?: React.ReactNode | string
            items?: string[]
        }>
    }>
    overview?: any
    screenshots?: any
    color?: string
    Icon?: any
    hog?: any
}

export default function FeaturesSlideAI({
    productName,
    features = [],
    overview,
    screenshots,
    color,
    Icon,
    hog,
}: FeaturesSlideAIProps) {
    return (
        <div className={`h-full relative text-primary py-8 px-4`}>
            <h2 className="text-5xl text-center mb-4">
                {productName} <span className="text-red dark:text-yellow">{features[0]?.headline}</span>
            </h2>
            <p className="text-2xl text-center text-balance font-normal">{features[0]?.description || ''}</p>

            <div className="grid @2xl:grid-cols-2 gap-x-8 gap-y-4">
                {features.map((featureGroup, groupIndex: number) =>
                    featureGroup.features?.map((feature: any, featureIndex: number) => {
                        const FeatureIcon = feature.icon || IconSparkles
                        return (
                            <div key={`${groupIndex}-${featureIndex}`} className="p-4">
                                <div className="flex items-start gap-3">
                                    <FeatureIcon className="size-10 text-muted" />
                                    <h3 className="text-2xl font-bold mb-0">{feature.title || feature.headline}</h3>
                                </div>
                                <div className="text-[17px] pl-12 ml-1">
                                    {feature.items ? (
                                        <ul className="divide-y divide-y-secondary">
                                            {feature.items.map((item: string, itemIndex: number) => (
                                                <li
                                                    key={itemIndex}
                                                    className="text-2xl py-4 first:pt-0 last:pb-0"
                                                    dangerouslySetInnerHTML={{ __html: item }}
                                                />
                                            ))}
                                        </ul>
                                    ) : typeof feature.children === 'string' ? (
                                        <div dangerouslySetInnerHTML={{ __html: feature.children }} />
                                    ) : (
                                        feature.children
                                    )}
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}
