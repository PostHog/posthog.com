import React from 'react'

interface ProductFeatureProps {
    layout?: string
    classes?: string
    gridArea?: string
    featureName: string
    featureIcon?: string
    title: string
    description: string
    docsUrl?: string
    figureClasses?: string
    image?: string
    imageClasses?: string
    imageWidth?: string
    imageHeight?: string
    bgImage?: string
}

export const ProductFeature = ({
    // bgColor = 'navy',
    layout,
    classes,
    featureName,
    featureIcon,
    title,
    description,
    docsUrl,
    figureClasses,
    image,
    imageClasses,
    imageWidth,
    imageHeight,
    bgImage,
}: ProductFeatureProps) => {
    // const backgroundColorClass = `bg-${bgColor}`
    return (
        <div
            className={`py-12 px-8 ${layout} ${classes}`}
            style={
                bgImage
                    ? {
                          background: `url(${bgImage}) no-repeat`,
                          backgroundSize: 'cover',
                      }
                    : undefined
            }
        >
            {/* only render if {image} exists */}
            {image && (
                <figure className={`flex justify-center items-center ${figureClasses}`}>
                    <img
                        src={`${image}`}
                        className={imageClasses}
                        width={imageWidth}
                        height={imageHeight}
                        style={{ height: 'max-content' }}
                    />
                </figure>
            )}

            <div>
                {/* only render if featureName exists */}
                {featureName && (
                    <div className="feature-name flex justify-center items-center gap-2 mb-2">
                        {featureIcon && <img src={`${featureIcon}`} alt={`${featureName} icon`} />}
                        <div className="font-bold text-pink">{featureName}</div>
                    </div>
                )}

                <h3
                    className="mb-2 font-osiris font-normal text-2xl lowercase"
                    dangerouslySetInnerHTML={{ __html: title }}
                />
                <div
                    className="text-white text-opacity-70"
                    dangerouslySetInnerHTML={{
                        __html: description?.includes('<p>') ? description : `<p>${description}</p>`,
                    }}
                />

                {/* only render if {docsUrl} exists */}
                {docsUrl && (
                    <a href={docsUrl} className="p-2 bg-white bg-opacity-10 rounded text-white">
                        Docs &rarr;
                    </a>
                )}
            </div>
        </div>
    )
}
