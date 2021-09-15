import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

export default function Founders() {
    return (
        <div className="self-center flex-shrink-0">
            <StaticImage
                placeholder="none"
                alt="Tim and James"
                quality={100}
                width={150}
                className="mb-4 md:mb-0 pointer-events-none"
                src="./images/founders.png"
            />
        </div>
    )
}
