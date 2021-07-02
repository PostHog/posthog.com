import React from 'react'
import spritedIcons from './images/icons/sprited-icons.svg'

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
            className={`py-6 px-4 md:py-12 md:px-8 ${layout} ${classes}`}
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
                    <div className="feature-name flex justify-center items-start gap-2 -mx-8 mb-2">
                        {featureIcon && (
                            // Uncomment this peice of code to use svg sprite file
                            <svg>
                                <use href={`${spritedIcons}#${featureIcon}`} />
                            </svg>

                            // <img src={`${featureIcon}`} alt={`${featureName} icon`} />
                        )}
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
                        __html: description?.includes('<p class="max-w-md mx-auto">')
                            ? description
                            : `<p class="max-w-md mx-auto">${description}</p>`,
                    }}
                />

                {/* only render if {docsUrl} exists */}
                {docsUrl && (
                    <a
                        href={docsUrl}
                        className="px-2 py-1 text-white hover:text-white text-opacity-75 hover:text-opacity-100 text-xs rounded-full whitespace-nowrap border-white border-2 border-solid border-opacity-10 hover:border-opacity-20"
                    >
                        Docs &rarr;
                    </a>
                )}
            </div>
        </div>
    )
}
