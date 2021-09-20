import React from 'react'
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image'

export type Contributor = {
    avatar: ImageDataLike
    url: string
    username: string
}

interface ContributorsProps {
    contributors: Contributor[]
    className?: string
}

export default function Contributors({ contributors, className }: ContributorsProps): JSX.Element {
    return (
        <ul className={className}>
            {contributors &&
                contributors.map((contributor, index) => {
                    const { avatar, url, username } = contributor
                    const image = getImage(avatar)
                    return (
                        <li key={index}>
                            <a href={url}>
                                {image && (
                                    <GatsbyImage
                                        imgClassName="rounded-full max-w-[37px]"
                                        image={image}
                                        alt={username}
                                        title={username}
                                    />
                                )}
                            </a>
                        </li>
                    )
                })}
        </ul>
    )
}
