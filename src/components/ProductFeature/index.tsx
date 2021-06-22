import React from 'react'

interface ProductFeatureProps {
    orientation?: string
    name: string
    description: string
    docsUrl: string
    image?: string
    width?: string
}

export const ProductFeature = ({
    orientation,
    name,
    description,
    docsUrl,
    image,
    width,
    bgColor = 'navy',
}: ProductFeatureProps) => {
    // const backgroundColorClass = `bg-${bgColor}`
    return (
        <div className={`productFeature text-white text-center py-6 px-4 flex-${width} ${orientation}`}>
            type
            <br />
            <h3 className="mb-2">{name}</h3>
            <p>{description}</p>
            <a href="{docsUrl}" className="p-2 bg-white bg-opacity-10 rounded text-white">
                Docs
            </a>
        </div>
    )
}
