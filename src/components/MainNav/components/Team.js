import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

export default function Team() {
    return (
        <div className="relative my-4 w-[calc(100vw-2rem)] lg:w-full">
            <StaticImage
                className="after:absolute after:top-0 after:right-0 after:w-3/5 after:h-full after:bg-gradient-to-l after:from-white dark:after:from-gray-accent-dark"
                placeholder="none"
                alt="PostHog Team"
                layout="fixed"
                objectPosition="left"
                quality={100}
                height={60}
                src="./images/team.png"
            />
        </div>
    )
}
