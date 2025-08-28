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
    const textColor = overview?.textColor || 'text-white'

    return (
        <div className={`h-full p-4 @2xl:p-12 flex flex-col items-center relative bg-${color} ${textColor}`}>
            <div className="mb-4 w-full flex flex-col">
                <div className="flex justify-center items-center gap-2 mb-2">
                    {Icon && <Icon className={`size-8 drop-shadow-xl ${textColor}`} />}
                    <span className={`text-xl font-semibold drop-shadow-xl opacity-80 ${textColor}`}>
                        {productName}
                    </span>
                </div>
                <div>
                    <h1
                        className={`text-6xl @2xl:text-5xl mb-4 font-bold text-center leading-tight drop-shadow-2xl ${textColor}`}
                    >
                        {overview?.title}
                    </h1>
                </div>
                <p
                    className={`text-3xl @2xl:text-xl text-center leading-snug drop-shadow max-w-4xl text-balance mx-auto ${textColor}`}
                >
                    {overview?.description}
                </p>
            </div>

            <div className="relative flex-1">
                {screenshots?.overview && (
                    <CloudinaryImage
                        src={screenshots.overview.src as any}
                        alt={screenshots.overview.alt}
                        imgClassName={screenshots.overview.classes}
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
