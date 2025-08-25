import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import { OverviewSlideProps } from './types'

export default function OverviewSlideOverlay({
    productName,
    overview,
    screenshots,
    color,
    Icon,
    hog,
}: OverviewSlideProps) {
    return (
        <div
            className={`h-full p-12 flex flex-col items-center justify-center text-center relative bg-${color} text-white`}
        >
            {/* Background images */}
            {screenshots?.overview && (
                <div className="absolute inset-0 opacity-10">
                    <CloudinaryImage
                        src={screenshots.overview.src as any}
                        alt={screenshots.overview.alt}
                        imgClassName="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Main content */}
            <div className="relative z-10 max-w-4xl">
                {/* Icon and product name */}
                <div className="flex flex-col items-center gap-4 mb-8">
                    {Icon && <Icon className={`size-16 ${overview?.textColor || 'text-black'}`} />}
                    <span className={`text-2xl font-bold ${overview?.textColor || 'text-black'}`}>{productName}</span>
                </div>

                {/* Title */}
                <h1 className={`text-6xl font-bold mb-6 leading-tight ${overview?.textColor || 'text-black'}`}>
                    {overview?.title}
                </h1>

                {/* Description */}
                <p className={`text-2xl leading-relaxed ${overview?.textColor || 'text-black'} max-w-3xl mx-auto`}>
                    {overview?.description}
                </p>
            </div>

            {/* Hog decoration */}
            {hog?.src && (
                <div className="absolute bottom-8 right-8">
                    <CloudinaryImage
                        src={hog.src as `https://res.cloudinary.com/${string}`}
                        alt={hog.alt}
                        imgClassName={hog.classes || 'w-32 h-32 opacity-80'}
                    />
                </div>
            )}
        </div>
    )
}
