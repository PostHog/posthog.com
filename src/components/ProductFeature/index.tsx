import React from 'react'

interface ProductFeatureProps {
    layout?: string
    featureName: string
    featureIcon: string
    title: string
    description: string
    docsUrl: string
    image?: string
    bgImage?: string
}

export const ProductFeature = ({
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
        <div className={`productFeature text-white text-center mb-4 ${layout}`}>
            <div className="py-6 px-4 ">
                {/* only render if {image} exists */}
                <figure className="flex items-center">
                    <img src="{image}" />
                </figure>

                <div>
                    {featureIcon}
                    {featureName}
                    <br />
                    <h3 className="mb-2 font-osiris font-normal">{title}</h3>
                    <p>{description}</p>

                    {/* only render if {docsUrl} exists */}
                    <a href="{docsUrl}" className="p-2 bg-white bg-opacity-10 rounded text-white">
                        Docs &rarr;
                    </a>
                </div>
            </div>
        </div>
    )
}
