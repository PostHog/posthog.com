import React from 'react'
import spritedIcons from './images/icons/sprited-icons.svg'
import ProductImage from './ProductImage'
import { Link } from 'gatsby'

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
    id?: 'analytics' | 'insights' | 'plugins' | undefined
    staticImage?: any
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
    id,
    staticImage,
}: ProductFeatureProps) => {
    // const backgroundColorClass = `bg-${bgColor}`
    return (
        <div
            id={id} // ID applied to navigate using navbar (must be passed only for starting elements)
            className={`py-6 px-4 sm:py-12 sm:px-8 ${layout} ${classes}`}
            // Not being used
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
                    <ProductImage
                        imageName={image}
                        className={imageClasses}
                        width={imageWidth}
                        height={imageHeight}
                        style={{ height: 'max-content' }}
                    />
                </figure>
            )}
            {staticImage}
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
                        <div className="font-bold">{featureName}</div>
                    </div>
                )}

                <h3 className="mb-2 text-2xl">{title}</h3>
                <p className="max-w-md mx-auto">{description}</p>

                {/* only render if {docsUrl} exists */}
                {docsUrl && (
                    <Link
                        to={docsUrl}
                        className="px-2 py-1 text-opacity-75 hover:text-opacity-100 text-xs rounded-full whitespace-nowrap bg-white border-gray border-2 border-solid border-opacity-10"
                    >
                        Docs &rarr;
                    </Link>
                )}
            </div>
        </div>
    )
}
