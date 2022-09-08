import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import CallToAction from 'components/MainNav/Submenus/CallToAction'

export const AboutTransparency = () => {
    return (
        <section className="bg-black pt-8 relative">
            <div className="max-w-5xl mx-auto text-white">
                <h3>Why we're different</h3>
                <h4 className="text-bold opacity-70">Being open source, we operate in public as much as we can.</h4>
            </div>
        </section>
    )
}
