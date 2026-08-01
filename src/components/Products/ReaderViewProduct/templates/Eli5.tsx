import React from 'react'
import { SectionComponentProps } from '../types'
import CloudinaryImage from 'components/CloudinaryImage'
import { DebugContainerQuery } from 'components/DebugContainerQuery'

const Eli5 = ({ id, productData }: SectionComponentProps) => {
    const eli5 = productData?.overview?.eli5
    const mobileHog = productData?.hogs?.mobileHog
    const defaultHog = productData?.hogs?.default
    const HogComponent = mobileHog?.Component || defaultHog?.Component
    const hogSrc = mobileHog?.src || defaultHog?.src
    const hogAlt = mobileHog?.alt || defaultHog?.alt || 'Mobile hog'
    // Optional per-product size override (e.g. surveys sets a slightly larger hog).
    const hogSizeClasses = mobileHog?.className || 'w-36 @lg/reader-content:w-48 @2xl/reader-content:w-56'

    if (!eli5) return null

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="mb-8">What does it do?</h2>
            {(HogComponent || hogSrc) && (
                <div
                    className={`float-right ml-4 @2xl/reader-content:ml-8 @5xl/reader-content:-mt-8 max-w-full ${hogSizeClasses}`}
                >
                    {HogComponent ? (
                        <HogComponent className="w-full h-auto" title={hogAlt} />
                    ) : (
                        <CloudinaryImage src={hogSrc} alt={hogAlt} className="w-full" />
                    )}
                </div>
            )}
            {typeof eli5 === 'string' ? <p>{eli5}</p> : eli5}
        </section>
    )
}

export default Eli5
