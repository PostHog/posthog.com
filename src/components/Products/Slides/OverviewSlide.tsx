import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'

interface OverviewSlideProps {
    productName: string
    overview?: {
        title?: string
        description?: string
        textColor?: string
    }
    screenshots?: Array<{
        src: string
        alt: string
        classes?: string
    }>
    color: string
    Icon?: React.ComponentType<any>
    hog?: {
        src: string
        alt: string
        classes?: string
    }
}

export default function OverviewSlide({ productName, overview, screenshots, color, Icon, hog }: OverviewSlideProps) {
    return (
        <div className={`h-full p-12 flex flex-col relative bg-${color} text-white`}>
            {screenshots?.[0] && (
                <CloudinaryImage
                    src={screenshots[0].src as any}
                    alt={screenshots[0].alt}
                    imgClassName={screenshots[0].classes}
                />
            )}
            {hog?.src && (
                <CloudinaryImage
                    src={hog.src as `https://res.cloudinary.com/${string}`}
                    alt={hog.alt}
                    imgClassName={hog.classes}
                />
            )}
            <div className="pt-12 pr-12 pb-1/2 pl-1/2">
                <div className="inline-flex items-center gap-3 text-primary mb-4">
                    {Icon && <Icon className={`size-7 ${overview?.textColor || 'text-black'}`} />}
                    <span className={`text-xl font-bold ${overview?.textColor || 'text-black'}`}>{productName}</span>
                </div>
                <h1 className={`text-5xl font-bold mb-4 leading-tight ${overview?.textColor || 'text-black'}`}>
                    {overview?.title}
                </h1>
                <p className={`text-xl mb-8 leading-relaxed ${overview?.textColor || 'text-black'}`}>
                    {overview?.description}
                </p>
            </div>
        </div>
    )
}
