import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

import { Structure } from '../../Structure'

export const Quote = ({ quote, name, title, image, className }) => {
    return (
        <section className={`max-w-screen-lg mx-auto text-almost-black font-bold ${className}`}>
            <blockquote className="text-xl md:text-[32px] md:leading-[48px]">
                {quote}
                <footer className="flex space-x-8 items-center mt-9">
                    {image}
                    <span className="flex flex-col">
                        <cite className="not-italic text-base md:text-xl leading-normal">{name}</cite>
                        <cite className="not-italic text-base md:text-lg opacity-50 leading-normal">{title}</cite>
                    </span>
                </footer>
            </blockquote>
        </section>
    )
}
