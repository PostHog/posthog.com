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
            className={`px-4 py-8 ${layout} ${classes}`}
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
            <div className="flex flex-col">
                {/* only render if featureName exists */}
                {featureName && (
                    <div className="feature-name text-black text-opacity-40 flex items-start gap-2 border-primary border-dashed border-l-0 border-r-0 border-t-0 border-b pb-2 mb-4 flex items-center">
                        {featureIcon && (
                            // Uncomment this piece of code to use svg sprite file
                            <svg className="fill-current opacity-50">
                                <use href={`${spritedIcons}#${featureIcon}`} />
                            </svg>

                            // <img src={`${featureIcon}`} alt={`${featureName} icon`} />
                        )}
                        <div className="font-semibold text-lg">{featureName}</div>
                    </div>
                )}

                <h3 className="mb-2 text-2xl">{title}</h3>
                <p className="max-w-md">{description}</p>

                {/* only render if {docsUrl} exists */}
                {docsUrl && (
                    <Link
                        to={docsUrl}
                        className="p-1 -ml-1 text-opacity-75 hover:text-opacity-100 text-sm whitespace-nowrap"
                    >
                        Docs <span className="text-gray">&rarr;</span>
                    </Link>
                )}

                {/* only render if {image} exists */}
                {image && (
                    <figure className={`mt-8 ${figureClasses}`}>
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
            </div>
        </div>
    )
}
