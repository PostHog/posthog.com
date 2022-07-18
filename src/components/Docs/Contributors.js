import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

export default function Contributors({ contributors, className }) {
    return (
        <ul className={className}>
            {contributors &&
                contributors.map((contributor, index) => {
                    const { avatar, url, username } = contributor
                    const image = getImage(avatar)
                    return (
                        <li key={index}>
                            <a href={url}>
                                <GatsbyImage
                                    imgClassName="rounded-full max-w-[37px]"
                                    image={image}
                                    alt={username}
                                    title={username}
                                />
                            </a>
                        </li>
                    )
                })}
        </ul>
    )
}
