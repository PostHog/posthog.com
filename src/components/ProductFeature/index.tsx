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
    imageClasses?: string
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
    imageClasses,
    bgImage,
    bgColor = 'navy',
}: ProductFeatureProps) => {
    // const backgroundColorClass = `bg-${bgColor}`
    return (
        <div className={`py-12 px-8 ${layout}`} style={{ backgroundImage: '' }}>
            {/* only render if {image} exists */}
            <figure className="flex justify-center items-center md:h-48">
                <img src={`${image}`} className={imageClasses} style={{ height: 'max-content' }} />
            </figure>

            <div>
                {/* only render if featureName exists */}
                <div className="feature-name flex justify-center items-center gap-2 mb-2">
                    <img src={`${featureIcon}`} alt={`${featureName} icon`} />
                    <div className="font-bold text-pink">{featureName}</div>
                </div>

                <h3 className="mb-2 font-osiris font-normal text-2xl lowercase">{title}</h3>
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
