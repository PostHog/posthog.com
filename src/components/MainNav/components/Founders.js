import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

export default function Founders() {
    return (
        <div className="self-center flex-shrink-0">
            <figure>
                <StaticImage
                    placeholder="none"
                    alt="Tim and James"
                    quality={100}
                    width={150}
                    className="mb-4 md:mb-0 pointer-events-none"
                    src="./images/founders.png"
                />
                <figcaption className="leading-none text-primary dark:text-white">
                    <strong className="text-[15px]">Tim & James</strong>
                    <br />
                    <span className="text-[13px]">Co-founders</span>
                </figcaption>
            </figure>
        </div>
    )
}
