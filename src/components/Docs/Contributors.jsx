import React from 'react'
import { ResponsiveImage, getImage } from 'components/Image'

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
                                <ResponsiveImage
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
