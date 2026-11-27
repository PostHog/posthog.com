import React from 'react'
import { CallToAction } from '../CallToAction'
import CloudinaryImage, { isCloudinaryImage } from '../CloudinaryImage'
import HoggieImage from '../HoggieImage'

export default function Intro({
    subheader,
    title,
    description,
    buttonText,
    buttonLink,
    secondaryButtonLink,
    secondaryButtonText,
    secondaryExternalNoIcon,
    imageColumnClasses,
    imageUrl,
    imageCrop,
    imageClasses,
}) {
    return (
        <div className="bg-accent border border-primary rounded flex flex-col items-center md:flex-row md:gap-4 mb-8">
            <div className="p-4 pb-0 md:p-8 flex-1 w-full">
                <p className="text-[15px] text-secondary mb-1">{subheader}</p>
                <h1 className="text-3xl md:text-4xl mt-0 mb-1 md:mb-2">{title}</h1>
                <h3 className="text-base md:text-lg font-semibold text-secondary !leading-tight my-4">
                    {' '}
                    {description}
                </h3>
                <div className="flex gap-2">
                    <CallToAction to={buttonLink}>{buttonText}</CallToAction>
                    {secondaryButtonLink && secondaryButtonText && (
                        <CallToAction
                            externalNoIcon={secondaryExternalNoIcon ?? false}
                            type="secondary"
                            to={secondaryButtonLink}
                        >
                            {secondaryButtonText}
                        </CallToAction>
                    )}
                </div>
            </div>

            {imageUrl && (
                <figure className="m-0 mt-auto px-4 pb-4 md:px-8 md:pb-6 flex items-end justify-center">
                    {isCloudinaryImage(imageUrl) ? (
                        <CloudinaryImage
                            alt=""
                            placeholder="none"
                            quality={100}
                            className={imageColumnClasses}
                            imgClassName={imageClasses ?? 'max-h-40 md:max-h-52'}
                            src={imageUrl}
                        />
                    ) : imageCrop ? (
                        // A crop box has no size of its own, so it gets the height that `max-h` gives the full image
                        <HoggieImage alt="" src={imageUrl} crop={imageCrop} className="h-40 md:h-52" />
                    ) : (
                        <HoggieImage
                            alt=""
                            className={imageColumnClasses}
                            imgClassName={imageClasses ?? 'max-h-40 md:max-h-52'}
                            src={imageUrl}
                        />
                    )}
                </figure>
            )}
        </div>
    )
}
