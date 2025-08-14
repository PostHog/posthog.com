import React from 'react'
import { IconSparkles } from '@posthog/icons'

interface FeaturesSlideAIProps {
    productName: string
    features?: Array<{
        title?: string
        headline?: string
        icon?: any
        children?: React.ReactNode | string
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
        <div className={`h-full relative text-primary`}>
            <h2 className="text-2xl text-center font-medium">{productName}</h2>
            <p className="text-2xl text-center font-normal">{overview?.description || ''}</p>

            <div className="grid grid-cols-2 gap-8">
                {features.map((feature, index) => {
                    const FeatureIcon = feature.icon || IconSparkles
                    return (
                        <div key={index} className="p-4">
                            <div className="flex items-start gap-3 mb-2">
                                <FeatureIcon className="size-6" />
                                <h3 className="text-2xl font-bold mb-0">{feature.title || feature.headline}</h3>
                            </div>
                            <div className="h-px bg-input my-3" />
                            <div className="text-lg">
                                {typeof feature.children === 'string' ? (
                                    <div dangerouslySetInnerHTML={{ __html: feature.children }} />
                                ) : (
                                    feature.children
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
