import React from 'react'
import { CallToAction } from '../CallToAction'
import CloudinaryImage from '../CloudinaryImage'

export default function Intro({
    subheader,
    title,
    description,
    buttonText,
    buttonLink,
    imageColumnClasses,
    imageUrl,
    imageClasses,
}) {
    return (
        <div className="bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded flex flex-col items-center md:flex-row md:gap-4 mb-8">
            <div className="p-4 pb-0 md:p-8 flex-1 w-full">
                <p className="text-[15px] text-primary/60 dark:text-primary-dark/75 mb-1">{subheader}</p>
                <h1 className="text-3xl md:text-4xl mt-0 mb-1 md:mb-2">{title}</h1>
                <h3 className="text-base md:text-lg font-semibold text-primary/60 dark:text-primary-dark/75 !leading-tight">
                    {' '}
                    {description}
                </h3>
                <CallToAction to={buttonLink}>{buttonText}</CallToAction>
            </div>

            {imageUrl && (
                <figure className="m-0 mt-auto p-0 md:pr-8 flex items-end">
                    <CloudinaryImage
                        alt=""
                        placeholder="none"
                        quality={100}
                        className={imageColumnClasses}
                        imgClassName={imageClasses}
                        src={imageUrl}
                    />
                </figure>
            )}
        </div>
    )
}
