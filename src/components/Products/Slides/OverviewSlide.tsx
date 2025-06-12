import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'

interface OverviewSlideProps {
    productName: string
    productTitle?: string
    productDescription: string
    color: string
    Icon?: React.ComponentType<any>
    screenshotSrc?: string
    screenshotAlt?: string
    hogSrc?: string
    hogAlt?: string
}

export default function OverviewSlide({
    productName,
    productTitle,
    productDescription,
    color,
    Icon,
    screenshotSrc,
    screenshotAlt,
    hogSrc,
    hogAlt,
}: OverviewSlideProps) {
    const screenshotClasses = 'absolute bottom-0 left-0 max-w-[525px] rounded-tr-md overflow-hidden shadow-2xl'
    const hogClasses = 'absolute bottom-0 right-0 max-w-[698px]'

    return (
        <div className={`h-full p-12 flex flex-col relative bg-${color} text-white`}>
            {screenshotSrc && (
                <CloudinaryImage
                    src={screenshotSrc as `https://res.cloudinary.com/${string}`}
                    alt={screenshotAlt || 'Product screenshot'}
                    className={screenshotClasses}
                />
            )}
            {hogSrc && (
                <CloudinaryImage
                    src={hogSrc as `https://res.cloudinary.com/${string}`}
                    alt={hogAlt || 'Hedgehog'}
                    className={hogClasses}
                />
            )}
            <div className="pt-12 pr-12 pb-1/2 pl-1/2">
                <div className="inline-flex items-center gap-3 text-primary mb-4">
                    {Icon && <Icon className="size-7 text-black" />}
                    <span className="text-xl font-bold text-black">{productName}</span>
                </div>
                <h1 className="text-5xl font-bold text-black mb-4 leading-tight">{productTitle || productName}</h1>
                <p className="text-xl text-black mb-8 leading-relaxed">{productDescription}</p>
            </div>
        </div>
    )
}
