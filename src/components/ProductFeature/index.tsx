import React from 'react'

interface ProductFeatureProps {
    layout?: string
    gridArea?: string
    featureName: string
    featureIcon: string
    title: string
    description: string
    docsUrl: string
    image?: string
    bgImage?: string
}

export const ProductFeature = ({
    gridArea,
    layout,
    featureName,
    featureIcon,
    title,
    description,
    docsUrl,
    image,
    bgImage,
    bgColor = 'navy',
}: ProductFeatureProps) => {
    // const backgroundColorClass = `bg-${bgColor}`
    return (
        <div className={`py-6 px-4 ${layout} ${gridArea}`}>
            {/* only render if {image} exists */}
            <figure className="flex justify-center">
                <img src="{image}" />
            </figure>

            <div>
                <div className="flex justify-center items-center gap-4 mb-2">
                    <div>{featureIcon}</div>
                    <div className="font-bold text-pink">{featureName}</div>
                </div>
                <h3 className="mb-2 font-osiris font-normal text-2xl">{title}</h3>
                <div className="text-white text-opacity-70">
                    <p>{description}</p>
                </div>

                {/* only render if {docsUrl} exists */}
                <a href="{docsUrl}" className="p-2 bg-white bg-opacity-10 rounded text-white">
                    Docs &rarr;
                </a>
            </div>
        </div>
    )
}
