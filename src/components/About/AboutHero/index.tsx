import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

export const AboutHero = () => {
    return (
        <>
            <header id="overview" className="pb-4 md:pb-8 px-4 md:px-12">
                <h1 className="text-4xl md:text-6xl text-center mb-4">
                    We're a little hog-wild about <br className="hidden xl:block" />{' '}
                    <span className="text-red">helping you build successful products.</span>
                </h1>
                <h3 className="text-center opacity-60 font-semibold">
                    <p className="pb-0 mb-0 text-xl">
                        PostHog started as open source product analytics. <br className="hidden md:block" />
                        We've grown into a product &amp; data toolkit, used by 10,000+ customers.
                    </p>
                </h3>
            </header>
            <div className="flex flex-col md:flex-row justify-center items-center max-w-screen-xl mx-auto gap-4 md:gap-16 px-4 md:px-8 pb-12">
                <div className="flex justify-between items-center gap-12">
                    <StaticImage
                        src="./images/about-hog-1.png"
                        width={227}
                        height={243}
                        alt="Hog looking at a computer"
                        objectFit="contain"
                    />
                    <StaticImage
                        src="./images/about-hog-2.png"
                        width={175}
                        height={253}
                        alt="Hog behind a computer but with a plant"
                        objectFit="contain"
                    />
                </div>
                <div className="flex justify-between items-center gap-12">
                    <StaticImage
                        src="./images/about-hog-3.png"
                        width={216}
                        height={230}
                        alt="Hog who thinks he's using a touchscreen"
                        objectFit="contain"
                    />
                    <StaticImage
                        src="./images/about-hog-4.png"
                        width={242}
                        height={261}
                        alt="Hog drinking coffee and contemplating life"
                        objectFit="contain"
                    />
                </div>
            </div>
        </>
    )
}
