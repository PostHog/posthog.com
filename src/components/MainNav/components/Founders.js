import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

export default function Founders() {
    return (
        <StaticImage
            alt="Tim and James"
            quality={100}
            width={250}
            layout="fixed"
            className="mb-4 md:mb-0"
            src="./images/founders.png"
        />
    )
}
