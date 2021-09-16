import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

export default function Team() {
    return (
        <div className="relative my-4 max-w-max w-full after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-l after:from-white dark:after:from-gray-accent-dark">
            <StaticImage
                className="pointer-events-none"
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
