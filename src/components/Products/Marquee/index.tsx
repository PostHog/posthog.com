import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

export const Marquee = ({ product, children, shortFade }) => {
    return (
        <section className="bg-accent dark:bg-accent-dark">
            <div className="max-w-7xl mx-auto px-5 py-20">
                <div className="md:grid md:grid-cols-12 md:gap-12">
                    <div className="col-span-5">
                        <h3 className="text-4xl md:text-5xl text-blue leading-tight">
                            Answer all of these questions (and more) with PostHog {product}.
                        </h3>
                    </div>
                    <div
                        className={`col-span-7 relative max-h-96 overflow-hidden after:absolute after:bg-gradient-to-b after:from-accent/0 after:to-accent/100 dark:after:from-accent-dark/0 dark:after:to-accent-dark/100 after:h-40 after:bottom-0 after:left-0 after:w-full after:content-[''] after:z-10 ${
                            shortFade ? 'after:h-28' : 'after:h-40'
                        }`}
                    >
                        <ul className="list-none p-0">{children}</ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
