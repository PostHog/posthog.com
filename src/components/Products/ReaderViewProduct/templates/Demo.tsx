import React from 'react'
import DemoVideo from '../DemoVideo'
import { SectionComponentProps } from '../types'

const Demo = ({ id, productData }: SectionComponentProps) => {
    const wistia = productData?.videos?.overview?.wistia
    if (!wistia) return null

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="mb-8">Demo</h2>
            <p>
                Here's a video of how PostHog uses {productData?.name} to support people who use {productData?.name}.
                Yes, it's very meta.
            </p>
            <DemoVideo
                wistia={wistia}
                highlights={productData?.videos?.overview?.highlights}
                chapters={productData?.videos?.overview?.chapters}
                className="mt-6"
            />
        </section>
    )
}

export default Demo
