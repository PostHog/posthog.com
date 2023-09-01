import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

export default function OnePlatform() {
    return (
        <section className="max-w-7xl mx-auto px-5 pb-8 md:pb-16">
            <h2 className="text-center text-5xl lg:text-6xl xl:text-6xl">
                One platform, <span className="text-blue dark:text-yellow">thousands of use cases</span>
            </h2>
            <p className="text-center text-xl opacity-70 font-semibold mb-12">
                With 7+ products on one platform, you'll spend less time engineering your data and more time building
                your product
            </p>
            <ul className="p-0 grid md:grid-cols-3 gap-6 md:gap-12">
                <li className="list-none">
                    <StaticImage src="./images/mds.png" alt="Drake Hog" className="max-w-[179px] h-[200px]" />
                    <h3 className="text-xl pt-4 mb-2 text-red">Create your ideal customer persona</h3>
                    <p>
                        Identify power users with analytics, research them with session replays, then sort it all into
                        cohorts. Voila. You just found your ICP.
                    </p>
                </li>
                <li className="list-none">
                    <StaticImage
                        src="./images/tutorials-tutorials-tutorials.png"
                        alt="Balmer Hog"
                        className="max-w-[213px] h-[200px]"
                    />
                    <h3 className="text-xl pt-4 mb-2 text-seagreen dark:text-teal">
                        Manage betas and feature rollouts
                    </h3>
                    <p>
                        Use feature flags and early access management to customize who has access to what, when. Collect
                        feedback with user surveys as you go!
                    </p>
                </li>
                <li className="list-none">
                    <StaticImage
                        src="./images/hockeystick-growth.png"
                        alt="Graduate Hog"
                        className="max-w-[170px] h-[200px]"
                    />
                    <h3 className="text-xl pt-4 mb-2 text-yellow">Scale from MVP to monopoly</h3>
                    <p>
                        At the early stage you can pipe data wherever you'd like and rely on basic analytics. As you
                        mature you'll grow into HogQL insights and our data warehouse.
                    </p>
                </li>
            </ul>
        </section>
    )
}
