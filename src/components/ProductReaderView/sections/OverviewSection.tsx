import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import { CallToAction } from 'components/CallToAction'
import { ProductScreenshot } from 'components/ProductScreenshot'

interface OverviewSectionProps {
    productData: any
}

export default function OverviewSection({ productData }: OverviewSectionProps): JSX.Element {
    const { overview, screenshots, hog, description, status, Icon, color, name } = productData

    return (
        <section id="overview" className="mb-12">
            {/* Hero header with optional hog illustration */}
            {hog?.src && (
                <div className="mb-6 text-center">
                    <CloudinaryImage
                        src={hog.src as `https://res.cloudinary.com/${string}`}
                        alt={hog.alt || `${name} illustration`}
                        className={hog.classes || 'max-w-xs mx-auto'}
                    />
                </div>
            )}

            {/* Title and description */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                    {Icon && <Icon className={`size-8 text-${color || 'gray'}`} />}
                    <h2 className="text-3xl font-bold m-0">
                        {overview?.title || name}
                        {status === 'beta' && (
                            <span className="ml-3 text-sm font-bold uppercase border-2 border-current px-2 py-0.5 rounded-md align-middle">
                                Beta
                            </span>
                        )}
                    </h2>
                </div>
                <p className="text-xl text-secondary leading-relaxed">{overview?.description || description}</p>
            </div>

            {/* CTA */}
            <div className="mb-8">
                <CallToAction to="https://app.posthog.com/signup" size="sm">
                    Get started - free
                </CallToAction>
            </div>

            {/* Screenshot */}
            {screenshots?.overview && (
                <ProductScreenshot
                    imageLight={screenshots.overview.src}
                    imageDark={screenshots.overview.srcDark || screenshots.overview.src}
                    alt={screenshots.overview.alt || `${name} screenshot`}
                    classes="rounded"
                    zoom={true}
                />
            )}

            {/* Home screenshot (alternative) */}
            {!screenshots?.overview && screenshots?.home && (
                <ProductScreenshot
                    imageLight={screenshots.home.src}
                    imageDark={screenshots.home.srcDark || screenshots.home.src}
                    alt={screenshots.home.alt || `${name} screenshot`}
                    classes="rounded"
                    zoom={true}
                />
            )}
        </section>
    )
}
