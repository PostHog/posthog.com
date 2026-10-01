import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import { SectionComponentProps } from '../types'
import Glow from 'components/Glow'
import { CTAs } from 'components/CTAs'
import { DebugContainerQuery } from 'components/DebugContainerQuery'

const Overview = ({ id, productData }: SectionComponentProps) => {
    const { name, overview, screenshots, hogs } = productData ?? {}
    // Sized by height, not width: the art ranges from wide to tall portraits, and
    // a fixed width makes the tall ones swamp the screenshot. It dips at `@3xl`
    // while the screenshot is a floated side column, then grows again at `@6xl`
    // when that screenshot spans the stacked column.
    const hog = hogs?.mobileHog
    const HogComponent = hog?.Component
    const hogSizeClasses =
        hog?.className || 'h-32 @2xl/reader-content:h-52 @3xl/reader-content:h-44 @6xl/reader-content:h-64'

    return (
        <section id={id} className="scroll-mt-20 not-prose flex flex-col gap-12 max-w-7xl w-full">
            {/* <DebugContainerQuery name="reader-content" /> */}
            <header className="@6xl/reader-content:flex @6xl/reader-content:flex-col @6xl/reader-content:gap-8">
                {screenshots?.home?.src && (
                    <Glow
                        color={productData?.color}
                        className="relative mb-8 w-full transition-all duration-300 @3xl/reader-content:float-right @3xl/reader-content:ml-8 @3xl/reader-content:max-w-md @6xl/reader-content:order-2 @6xl/reader-content:float-none @6xl/reader-content:ml-0 @6xl/reader-content:mb-0 @6xl/reader-content:max-w-none"
                    >
                        <CloudinaryImage
                            src={screenshots.home.src as `https://res.cloudinary.com/${string}`}
                            alt={screenshots.home.alt || name}
                            className={`w-full${screenshots.home.srcDark ? ' dark:hidden' : ''}`}
                            imgClassName="h-auto rounded-lg transition-all duration-300 w-full"
                        />
                        {screenshots.home.srcDark && (
                            <CloudinaryImage
                                src={screenshots.home.srcDark as `https://res.cloudinary.com/${string}`}
                                alt={screenshots.home.alt || name}
                                className="w-full hidden dark:block"
                                imgClassName="h-auto rounded-lg transition-all duration-300 w-full"
                            />
                        )}
                        {(HogComponent || hog?.src) && (
                            <div className={`absolute -bottom-3 -right-6 ${hogSizeClasses}`}>
                                {HogComponent ? (
                                    <HogComponent className="h-full w-auto" title={hog.alt || name} />
                                ) : (
                                    <CloudinaryImage
                                        src={hog.src as `https://res.cloudinary.com/${string}`}
                                        alt={hog.alt || `${name} hedgehog`}
                                        className="h-full"
                                        imgClassName="h-full w-auto"
                                    />
                                )}
                            </div>
                        )}
                    </Glow>
                )}
                {!screenshots?.home?.src && (HogComponent || hog?.src) && (
                    <div
                        className={`mx-auto mb-8 w-fit @3xl/reader-content:float-right @3xl/reader-content:mx-0 @3xl/reader-content:ml-8 @6xl/reader-content:order-2 @6xl/reader-content:float-none @6xl/reader-content:ml-0 @6xl/reader-content:mb-0 ${hogSizeClasses}`}
                    >
                        {HogComponent ? (
                            <HogComponent className="h-full w-auto" title={hog.alt || name} />
                        ) : (
                            <CloudinaryImage
                                src={hog.src as `https://res.cloudinary.com/${string}`}
                                alt={hog.alt || `${name} hedgehog`}
                                className="h-full"
                                imgClassName="h-full w-auto"
                            />
                        )}
                    </div>
                )}

                <div className="space-y-4 @6xl/reader-content:order-1">
                    <div>
                        <h1 className="!text-4xl font-bold !leading-tight">{overview?.title || name}</h1>
                        {overview?.description && <p className="leading-relaxed">{overview.description}</p>}
                    </div>
                    <div>
                        <CTAs wizardCommand={productData?.wizardCommand} links={productData?.ctaLinks} />
                    </div>
                </div>
            </header>
        </section>
    )
}

export default Overview
