import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import { SectionComponentProps } from '../types'
import { CTAs } from 'components/CTAs'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import { PRODUCT_SURFACE_H1 } from '../helpers'
import Label from 'components/Label'

const Overview = ({ id, productData, showStatusLabel }: SectionComponentProps & { showStatusLabel?: boolean }) => {
    const { name, overview, screenshots, hogs, status } = productData ?? {}
    // Sized by height, not width: the art ranges from wide to tall portraits, and
    // a fixed width makes the tall ones swamp the screenshot. It grows with the
    // screenshot's side column at `@3xl` and `@6xl`.
    const hog = hogs?.mobileHog
    const HogComponent = hog?.Component
    const hogSizeClasses = hog?.className || 'h-32 @3xl/reader-content:h-44 @6xl/reader-content:h-52'

    return (
        <section id={id} className="scroll-mt-20 not-prose flex flex-col gap-12 w-full">
            {/* <DebugContainerQuery name="reader-content" /> */}
            <header>
                {screenshots?.home?.src && (
                    <div className="relative mb-8 w-full transition-all duration-300 @xl/reader-content:float-right @xl/reader-content:ml-8 @xl/reader-content:w-1/2 @xl/reader-content:max-w-md @6xl/reader-content:max-w-xl">
                        <CloudinaryImage
                            src={screenshots.home.src as `https://res.cloudinary.com/${string}`}
                            alt={screenshots.home.alt || name}
                            className={`w-full${screenshots.home.srcDark ? ' dark:hidden' : ''}`}
                            imgClassName="h-auto rounded-lg border border-primary transition-all duration-300 w-full"
                        />
                        {screenshots.home.srcDark && (
                            <CloudinaryImage
                                src={screenshots.home.srcDark as `https://res.cloudinary.com/${string}`}
                                alt={screenshots.home.alt || name}
                                className="w-full hidden dark:block"
                                imgClassName="h-auto rounded-lg border border-primary transition-all duration-300 w-full"
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
                    </div>
                )}
                {!screenshots?.home?.src && (HogComponent || hog?.src) && (
                    <div
                        className={`mx-auto mb-8 w-fit @xl/reader-content:float-right @xl/reader-content:mx-0 @xl/reader-content:ml-8 ${hogSizeClasses}`}
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

                <div className="space-y-4">
                    <div>
                        {showStatusLabel && status === 'beta' && <Label text="Beta" className="uppercase mb-2" />}
                        <h1 className={PRODUCT_SURFACE_H1}>{overview?.title || name}</h1>
                        {overview?.description && <p className="leading-relaxed">{overview.description}</p>}
                    </div>
                    <div>
                        <CTAs
                            wizardCommand={productData?.wizardCommand}
                            links={productData?.ctaLinks}
                            buttons={productData?.ctaButtons}
                        />
                    </div>
                </div>
            </header>
        </section>
    )
}

export default Overview
