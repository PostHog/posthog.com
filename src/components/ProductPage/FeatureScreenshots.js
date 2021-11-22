import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

export default function FeatureScreenshots() {
    return (
        <section className="flex justify-between px-5 images-slider">
            <div>
                <StaticImage objectFit="top" src="./images/showcase-1.png" />
            </div>
            <div>
                <StaticImage objectFit="top" src="./images/showcase-2.png" />
            </div>
            <div>
                <StaticImage objectFit="top" src="./images/showcase-3.png" />
            </div>
            <div>
                <StaticImage objectFit="top" src="./images/showcase-4.png" />
            </div>
            <div>
                <StaticImage objectFit="top" src="./images/showcase-5.png" />
            </div>
        </section>
    )
}
