import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

import { Structure } from '../../Structure'

export const Quote = ({ className = '' }) => {
    return (
        <section className={`${className} max-w-screen-lg mx-auto text-almost-black font-bold`}>
            <blockquote className="text-xl md:text-[32px] md:leading-[48px]">
                Posthog is the first analytics platform where{' '}
                <span className="text-red">I can be 100% confident in the data.</span> I've finally got the data insight
                platform I've always wanted as a Product person.
                <footer className="flex space-x-8 items-center mt-9">
                    <StaticImage
                        width={100}
                        height={100}
                        alt="Jonathan Hyde - Former Head of Product, Legl"
                        src="../../../images/jonathan-hyde-plain.png"
                    />
                    <span className="flex flex-col">
                        <cite className="not-italic text-base md:text-xl leading-normal">Jonathan Hyde</cite>
                        <cite className="not-italic text-base md:text-lg opacity-50 leading-normal">
                            Former Head of Product, Legl
                        </cite>
                    </span>
                </footer>
            </blockquote>
        </section>
    )
}
