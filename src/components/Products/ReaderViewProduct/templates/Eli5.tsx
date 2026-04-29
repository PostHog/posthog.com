import React from 'react'
import { SectionComponentProps } from '../types'
import CloudinaryImage from 'components/CloudinaryImage'
import { DebugContainerQuery } from 'components/DebugContainerQuery'

const Eli5 = ({ id, productData }: SectionComponentProps) => {
    const eli5 = productData?.overview?.eli5

    if (!eli5) return null

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="mb-8">What does it do?</h2>
            <div className="float-right ml-4 @2xl/reader-content:ml-8 @5xl/reader-content:-mt-8 w-48 @lg/reader-content:w-64 @2xl/reader-content:w-80 max-w-full">
                <CloudinaryImage src={productData?.hogs?.mobileHog?.src} alt="Mobile hog" className="w-full" />
            </div>
            <p>{eli5}</p>
        </section>
    )
}

export default Eli5
