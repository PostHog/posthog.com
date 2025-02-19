import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { PRODUCT_COUNT } from '../../constants'

export default function OnePlatform() {
    return (
        <section className="max-w-7xl mx-auto px-5 pt-8 md:pt-16 pb-8 md:pb-16">
            <h2 className="text-center text-5xl lg:text-6xl xl:text-6xl">
                One platform, <span className="text-blue dark:text-yellow">thousands of use cases</span>
            </h2>
            <p className="text-center text-xl opacity-70 font-semibold mb-12">
                PostHog grows with you – from startups to growth stage and beyond.
            </p>
            <ul className="p-0 grid md:grid-cols-3 gap-6 md:gap-12">
                <li className="list-none">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/images/mds.png"
                        alt="Drake Hog"
                        className="max-w-[179px] h-[200px]"
                    />
                    <h3 className="text-xl pt-4 mb-2 text-red">Replaces the modern data stack</h3>
                    <p>
                        With {PRODUCT_COUNT}+ products on one platform, you'll spend less time engineering your data
                        integrations and more time building your product.
                    </p>
                </li>
                <li className="list-none">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/images/tutorials-tutorials-tutorials.png"
                        alt="Ballmer Hog"
                        className="max-w-[194px] h-[200px]"
                    />
                    <h3 className="text-xl pt-4 mb-2 text-seagreen dark:text-teal">Tutorials, tutorials, tutorials!</h3>
                    <p>
                        Our community members use PostHog in ways we never imagined. (Some have even built entire
                        products on our API.) Maybe we’ll write about yours next?
                    </p>
                </li>
                <li className="list-none">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/images/hockeystick-growth.png"
                        alt="Graduate Hog"
                        className="max-w-[170px] h-[200px]"
                    />
                    <h3 className="text-xl pt-4 mb-2 text-yellow">Guides for hockey-stick growth</h3>
                    <p>We cover how products like ours went from pre-revenue to $100 million ARR - all in the open.</p>
                </li>
            </ul>
        </section>
    )
}
