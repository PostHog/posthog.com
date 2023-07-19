import React, { useState } from 'react'
import { StaticImage } from 'gatsby-plugin-image'

export default function AllInOne() {
    return (
        <section className="relative mb-12">
            <div className="md:absolute left-8 top-48">
                <h2 className="m-0 text-4xl px-4 md:text-6xl text-center md:text-left leading-tight md:leading-none">
                    Product engineering <br className="hidden md:block" />
                    has never been so lit
                </h2>
                <p className="text-center md:text-left px-4 m-0 mt-1 font-semibold text-primary/75 dark:text-primary-dark/75 text-base sm:text-lg">
                    With PostHog's all-in-one suite, everyone else is feeling the burn.
                </p>
            </div>
            <StaticImage src="./images/godzilla-mobile.png" className="md:hidden w-full" />
            <StaticImage src="./images/godzilla.png" className="hidden md:block w-full" />
        </section>
    )
}
