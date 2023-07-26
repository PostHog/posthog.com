import React, { useState } from 'react'
import { StaticImage } from 'gatsby-plugin-image'

export default function AllInOne() {
    return (
        <section className="relative mb-12">
            <div className="md:absolute top-0 left-0 lg:top-40 xl:top-48 lg:left-0 xl:left-8 max-w-md mx-auto lg:mx-0 mt-12 lg:mt-0 lg:max-w-2xl">
                <h2 className="m-0 text-4xl px-4 md:text-6xl text-center md:text-left leading-tight md:leading-none">
                    PostHog is 7+ tools <br className="xl:hidden" />
                    in one
                </h2>
                <p className="text-center md:text-left px-4 m-0 mt-1 font-semibold text-primary/75 dark:text-primary-dark/75 text-base sm:text-lg">
                    Product engineering has never been so lit.
                </p>
            </div>
            <div className="md:hidden w-full">
                <StaticImage src="./images/godzilla-mobile.png" />
            </div>
            <div className="hidden md:block w-full">
                <StaticImage src="./images/godzilla.png" />
            </div>
        </section>
    )
}
