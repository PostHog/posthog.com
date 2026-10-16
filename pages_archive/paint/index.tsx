import React from 'react'
import Explorer from 'components/Explorer'
import { Link } from 'gatsby'
import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'
import SEO from 'components/seo'
import { IconDice, IconDictator } from 'components/OSIcons/Icons'
import { Accordion } from 'components/RadixUI/Accordion'
import MSPaint from 'components/MSPaint'
import GodzillaOutline from './hogzilla-outline.png'

export default function Paint({ initialState }: { initialState: any }): JSX.Element {
    const coloringPageImage = GodzillaOutline

    return (
        <>
            <SEO title="HogPaint - PostHog" description="Draw your best hedgehog." image={`/images/og/default.png`} />
            <Explorer
                template="generic"
                slug="paint"
                title="HogPaint"
                // options below only needed to override matching the slug
                // teamName="product-analytics"
                // roadmapCategory="product-analytics"
                // changelogCategory="product-analytics"

                fullScreen
            >
                <div className="@container flex flex-col h-full">
                    <MSPaint
                        // Pass the image URL to preload it as line art
                        initialImage={coloringPageImage}
                        threshold={128} // Adjust for your image (0-255)
                        canvasSize={{ width: 800, height: 770 }}
                        initialState={initialState}
                    />
                </div>
            </Explorer>
        </>
    )
}
