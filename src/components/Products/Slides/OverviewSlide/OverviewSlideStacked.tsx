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
    status,
}: OverviewSlideProps) {
    const textColor = overview?.textColor || 'text-primary'

    return (
        <div className={`h-full flex flex-col items-center relative bg-${color} ${textColor}`}>
            <div className="pt-8 px-4 @2xl:pt-12 @2xl:px-8 mb-4 w-full flex flex-col">
                <div className="flex justify-center items-center gap-2 mb-4">
                    {Icon && <Icon className={`size-16 @2xl:size-10 drop-shadow-xl opacity-80 ${textColor}`} />}
                    <span className={`text-3xl @2xl:text-2xl font-semibold drop-shadow-xl opacity-80 ${textColor}`}>
                        {productName}
                    </span>
                    {status === 'beta' && (
                        <span
                            className={`font-bold uppercase border-2 border-white px-1 rounded-md text-lg ${
                                overview?.textColor || 'text-primary'
                            }`}
                        >
                            Beta
                        </span>
                    )}
                </div>
                <h1
                    className={`text-6xl mb-4 @2xl:mb-2 font-bold text-center leading-tight drop-shadow-2xl text-balance ${textColor}`}
                >
                    {overview?.title}
                </h1>
                <p className={`text-3xl text-center leading-snug drop-shadow text-balance mx-auto ${textColor}`}>
                    {overview?.description}
                </p>
            </div>

            <div className="relative flex-1">
                {screenshots?.overview?.srcMobile ? (
                    <>
                        {/* Show mobile version until @2xl */}
                        <CloudinaryImage
                            src={screenshots.overview.srcMobile as any}
                            alt={screenshots.overview.alt}
                            className={`@2xl:hidden ${screenshots.overview.classes}`}
                            imgClassName={screenshots.overview.imgClasses}
                        />
                        {/* Show desktop version from @2xl onwards */}
                        <CloudinaryImage
                            src={screenshots.overview.src as any}
                            alt={screenshots.overview.alt}
                            className={`hidden @2xl:block ${screenshots.overview.classes}`}
                            imgClassName={screenshots.overview.imgClasses}
                        />
                    </>
                ) : (
                    screenshots?.overview && (
                        /* Show desktop version on all screen sizes when no mobile version exists */
                        <CloudinaryImage
                            src={screenshots.overview.src as any}
                            alt={screenshots.overview.alt}
                            className={screenshots.overview.classes}
                            imgClassName={screenshots.overview.imgClasses}
                        />
                    )
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
