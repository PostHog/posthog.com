import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

export default function OnePlatform() {
    return (
        <section className="max-w-7xl mx-auto px-5 pb-8 md:pb-16">
            <h2 className="text-center text-5xl lg:text-6xl xl:text-6xl">
                One platform, <span className="text-blue dark:text-yellow">thousands of use cases</span>
            </h2>
            <p className="text-center text-xl opacity-70 font-semibold mb-12">
                PostHog grows with you – from startups to growth stage and beyond.
            </p>
            <ul className="p-0 grid md:grid-cols-3 gap-6 md:gap-12">
                <li className="list-none">
                    <StaticImage src="./images/mds.png" alt="Drake Hog" className="max-w-[179px] h-[200px]" />
                    <h3 className="text-xl pt-4 mb-2 text-red">Replaces the modern data stack</h3>
                    <p>
                        With 7+ products on one platform, you'll spend less time engineering your data integrations and
                        more time building your product.
                    </p>
                </li>
                <li className="list-none">
                    <StaticImage
                        src="./images/tutorials-tutorials-tutorials.png"
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
                    <StaticImage
                        src="./images/hockeystick-growth.png"
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
