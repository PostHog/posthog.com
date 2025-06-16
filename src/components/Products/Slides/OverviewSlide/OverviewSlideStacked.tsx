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
        <div className={`h-full p-12 flex flex-col items-center relative bg-${color} text-white`}>
            {/* Left side - Content */}
            <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                    {Icon && <Icon className={`size-12 ${overview?.textColor || 'text-black'}`} />}
                    <div>
                        <span className={`text-lg font-medium ${overview?.textColor || 'text-black'} opacity-80`}>
                            {productName}
                        </span>
                        <h1 className={`text-4xl font-bold leading-tight ${overview?.textColor || 'text-black'}`}>
                            {overview?.title}
                        </h1>
                    </div>
                </div>
                <p className={`text-lg leading-relaxed ${overview?.textColor || 'text-black'} max-w-2xl`}>
                    {overview?.description}
                </p>
            </div>

            {/* Right side - Images */}
            <div className="relative flex-1">
                {screenshots?.[0] && (
                    <CloudinaryImage
                        src={screenshots[0].src as any}
                        alt={screenshots[0].alt}
                        imgClassName={screenshots[0].classes}
                    />
                )}
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
        </div>
    )
}
