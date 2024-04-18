import Link from 'components/Link'
import React from 'react'

export default function PersonCard({ name, stat, image, url }) {
    return (
        <li className="flex items-center gap-2">
            {image}
            <div>
                <p className="m-0 leading-tight">
                    <Link to={url}>{name}</Link>
                </p>
                <p className="text-[13px] leading-tight opacity-75 m-0">{stat}</p>
            </div>
        </li>
    )
}
