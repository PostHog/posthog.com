import React from 'react'
import { Carousel } from 'components/UI/Carousel'
import { ProductScreenshot } from 'components/ProductScreenshot'

export default function Screenshots(): JSX.Element {
    return (
        <Carousel arrows label="Explore PostHog" peek>
            <figure className="m-0">
                <ProductScreenshot
                    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2026_02_17_at_08_43_32_2x_aa22220b10.png"
                    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2026_02_17_at_08_43_06_2x_49e3ebc85d.png"
                    alt="PostHog experiment results"
                    padding={false}
                    zoom={false}
                />
                <figcaption className="mt-2 text-sm text-secondary">
                    Compare experiment variants and inspect the results.
                </figcaption>
            </figure>
            <figure className="m-0">
                <ProductScreenshot
                    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_09_09_at_17_05_35_2x_42e293fddd.png"
                    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_09_09_at_17_05_50_2x_8d74438a4a.png"
                    alt="PostHog business intelligence"
                    padding={false}
                    zoom={false}
                />
                <figcaption className="mt-2 text-sm text-secondary">Query your data in PostHog.</figcaption>
            </figure>
        </Carousel>
    )
}
