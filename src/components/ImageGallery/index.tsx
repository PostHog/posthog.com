import React from 'react'
import { ZoomImage } from 'components/ZoomImage'

export type ImageGalleryImage = {
    light: string
    dark?: string
    alt: string
    caption?: React.ReactNode
}

// Two column counts cover every use so far. The classes are written out because Tailwind
// cannot see a class name that is built at runtime.
const columnClasses = {
    2: '@md:grid-cols-2',
    3: '@md:grid-cols-2 @3xl:grid-cols-3',
}

/**
 * A grid of screenshots, each with an optional caption and an optional dark mode pair.
 * Use it when the point is the range of options, not one specific image – `ImageSlider`
 * shows one image at a time, and `ProductScreenshot` shows exactly one.
 */
export default function ImageGallery({
    images,
    columns = 2,
    className = '',
}: {
    images: ImageGalleryImage[]
    columns?: 2 | 3
    className?: string
}): JSX.Element {
    return (
        <div className={`@container mb-4 ${className}`}>
            <ul className={`m-0 grid list-none grid-cols-1 gap-4 p-0 ${columnClasses[columns] ?? columnClasses[2]}`}>
                {images.map(({ light, dark, alt, caption }) => (
                    <li key={light} className="m-0">
                        <figure className="m-0 flex h-full flex-col">
                            <div className="rounded border border-primary bg-accent p-2 leading-[0]">
                                <ZoomImage>
                                    <img
                                        src={light}
                                        alt={alt}
                                        className={`w-full rounded-sm ${dark ? 'dark:hidden' : ''}`}
                                    />
                                    {dark && (
                                        <img src={dark} alt={alt} className="hidden w-full rounded-sm dark:block" />
                                    )}
                                </ZoomImage>
                            </div>
                            {caption && (
                                <figcaption className="mt-1.5 text-center text-sm text-secondary">{caption}</figcaption>
                            )}
                        </figure>
                    </li>
                ))}
            </ul>
        </div>
    )
}
