import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import Lottie from 'react-lottie'
import AboutHog1 from '../../../lotties/about-hog-1.json'
import AboutHog2 from '../../../lotties/about-hog-2.json'
import AboutHog3 from '../../../lotties/about-hog-3.json'
import AboutHog4 from '../../../lotties/about-hog-4.json'

export const AboutHero = () => {
    return (
        <>
            <header id="our-story" className="pb-4 md:pb-8 px-4 md:px-12">
                <h1 className="text-4xl md:text-6xl text-center mb-4 leading-none">
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
                <div className="flex justify-between items-center">
                    <div className="">
                        <Lottie
                            options={{
                                loop: true,
                                autoplay: true,
                                animationData: AboutHog1,
                            }}
                        />
                    </div>
                    <div className="">
                        <Lottie
                            options={{
                                loop: true,
                                autoplay: true,
                                animationData: AboutHog2,
                            }}
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="">
                        <Lottie
                            options={{
                                loop: true,
                                autoplay: true,
                                animationData: AboutHog3,
                            }}
                        />
                    </div>
                    <div className="">
                        <Lottie
                            options={{
                                loop: true,
                                autoplay: true,
                                animationData: AboutHog4,
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
