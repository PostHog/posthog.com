import React, { useState, useEffect } from 'react'
import { ZoomImage } from 'components/ZoomImage'
import CloudinaryImage from "components/CloudinaryImage"

interface Image {
    src: string
    srcDark: string
    alt: string
    stylize: boolean
    shadow: boolean
    className: string
}

interface ProductImageProps {
    images: Image[]
    className?: string
}

export default function ProductImage({ images, className = '' }: ProductImageProps): JSX.Element {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isDark, setIsDark] = useState(false)

    // Check theme from body class
    useEffect(() => {
        const checkTheme = () => {
            const bodyClass = document.body.className
            const bodyIsDark = bodyClass.includes('dark')
            setIsDark(bodyIsDark)
            console.log('Theme check:', {
                bodyClass,
                bodyIsDark,
                currentImage: images[currentIndex]?.src,
                currentImageDark: images[currentIndex]?.srcDark
            })
        }

        checkTheme()

        // Listen for theme changes
        const observer = new MutationObserver(checkTheme)
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })

        return () => observer.disconnect()
    }, [currentIndex, images])

    if (!images || images.length === 0) {
        return <div>No images available</div>
    }

    const currentImage = images[currentIndex]
    const hasMultipleImages = images.length > 1

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    }

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }

    // Use srcDark if it exists AND theme is dark, otherwise use src
    const imageSrc = (currentImage.srcDark && isDark) ? currentImage.srcDark : currentImage.src

    console.log('Image selection:', {
        isDark,
        hasSrcDark: !!currentImage.srcDark,
        selectedSrc: imageSrc,
        originalSrc: currentImage.src,
        darkSrc: currentImage.srcDark
    })

    const content = (
        <CloudinaryImage
            key={`${imageSrc}-${isDark ? 'dark' : 'light'}`} // Force re-render when theme changes
            src={imageSrc as `https://res.cloudinary.com/${string}`}
            alt={currentImage.alt}
            className={`w-full h-full object-contain ${currentImage.stylize ? 'bg-accent p-4 rounded border border-primary' : ''
                } ${currentImage.shadow ? 'shadow-xl' : ''} || ''}`}
            imgClassName={currentImage.className || ''}
        />
    )

    return (
        <div className={`relative rounded ${className}`}>
            <button className="flex items-center justify-center w-full">
                <ZoomImage>{content}</ZoomImage>
            </button>

            {hasMultipleImages && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute -left-12 top-1/2 -translate-y-1/2 text-primary p-2 transition-colors"
                        aria-label="Previous image"
                    >
                        <svg width="36" height="36" viewBox="0 0 16 16" fill="none" className="text-primary">
                            <path
                                d="M10 4L6 8L10 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute -right-12 top-1/2 -translate-y-1/2 text-primary p-2 transition-colors"
                        aria-label="Next image"
                    >
                        <svg width="36" height="36" viewBox="0 0 16 16" fill="none" className="text-primary">
                            <path
                                d="M6 4L10 8L6 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-primary' : 'bg-primary/40 hover:bg-primary/60'
                                    }`}
                                aria-label={`Go to image ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
