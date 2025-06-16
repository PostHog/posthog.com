import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import { OverviewSlideProps } from './types'

export default function OverviewSlideStacked({
    productName,
    overview,
    screenshots,
    color,
    Icon,
    hog,
}: OverviewSlideProps) {
    return (
        <div
            className={`h-full p-12 flex flex-col items-center relative bg-${color} ${
                overview?.textColor || 'text-white'
            }`}
        >
            <div className="mb-4 w-full flex flex-col">
                <div className="flex justify-center items-center gap-2 mb-2">
                    {Icon && <Icon className={`size-12 drop-shadow-xl ${overview?.textColor}`} />}
                    <span className={`text-xl font-medium drop-shadow-xl opacity-80`}>{productName}</span>
                </div>
                <div>
                    <h1 className={`text-5xl font-bold text-center leading-tight drop-shadow-2xl`}>
                        {overview?.title}
                    </h1>
                </div>
                <p className={`text-xl text-center leading-snug drop-shadow max-w-2xl mx-auto`}>
                    {overview?.description}
                </p>
            </div>

            <div className="relative flex-1">
                {screenshots?.[0] && (
                    <CloudinaryImage
                        src={screenshots[0].src as any}
                        alt={screenshots[0].alt}
                        imgClassName={screenshots[0].classes}
                    />
                )}
            </div>
            {hog?.src && (
                <div className="absolute -bottom-4 -right-4">
                    <CloudinaryImage
                        src={hog.src as `https://res.cloudinary.com/${string}`}
                        alt={hog.alt}
                        imgClassName={hog.classes || 'w-24 h-24'}
                    />
                </div>
            )}
        </div>
    )
}
