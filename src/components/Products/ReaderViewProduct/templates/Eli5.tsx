import React from 'react'
import { SectionComponentProps } from '../types'
import CloudinaryImage from 'components/CloudinaryImage'
import { DebugContainerQuery } from 'components/DebugContainerQuery'

const Eli5 = ({ id, productData }: SectionComponentProps) => {
    const eli5 = productData?.overview?.eli5
    const mobileHog = productData?.hogs?.mobileHog
    const hogSrc = mobileHog?.src || productData?.hogs?.default?.src
    const hogAlt = mobileHog?.alt || productData?.hogs?.default?.alt || 'Mobile hog'
    // Optional per-product size override (e.g. surveys sets a slightly larger hog).
    const hogSizeClasses = mobileHog?.className || 'w-36 @lg/reader-content:w-48 @2xl/reader-content:w-56'

    if (!eli5) return null

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="mb-8">What does it do?</h2>
            {hogSrc && (
                <div
                    className={`float-right ml-4 @2xl/reader-content:ml-8 @5xl/reader-content:-mt-8 max-w-full ${hogSizeClasses}`}
                >
                    <CloudinaryImage src={hogSrc} alt={hogAlt} className="w-full" />
                </div>
            )}
            <p>{eli5}</p>
        </section>
    )
}

export default Eli5
