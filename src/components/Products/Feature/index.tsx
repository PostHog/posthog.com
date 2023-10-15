import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

interface FeatureProps {
    name: string
    description: string
    image: string
}

export const Feature = ({ name, description }: FeatureProps): JSX.Element => {
    return (
        <li className="text-center">
            <div className="mb-2">
                <StaticImage src="../images/products/session-replay-timeline.png" className="max-w-[421px]" />
            </div>
            <h4 className="mb-0 text-lg">{name}</h4>
            <p className="text-[15px]">{description}</p>
        </li>
    )
}
