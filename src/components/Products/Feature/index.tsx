import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

interface FeatureProps {
    name: string
    description: string
    image: any
}

export const Feature = ({ title, description, image }: FeatureProps): JSX.Element => {
    return (
        <li className="text-center">
            <div className="mb-2 w-full relative after:absolute after:w-full after:h-24 after:bottom-0 after:left-0 after:bg-gradient-to-b after:from-transparent dark:after:via-dark/80 dark:after:to-dark after:via-light/80 after:to-light after:z-10">
                {image}
            </div>
            <h4 className="mb-0 text-lg">{title}</h4>
            <p className="text-[15px]">{description}</p>
        </li>
    )
}
