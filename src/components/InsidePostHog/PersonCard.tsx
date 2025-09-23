import Link from 'components/Link'
import React from 'react'

export default function PersonCard({ name, stat, image, url }) {
    return (
        <li className="flex items-start gap-2">
            <div className="flex-shrink-0">{image}</div>
            <div className="flex-1">
                <p className="m-0 leading-tight">
                    <Link to={url} className="font-medium text-[15px] hover:underline" state={{ newWindow: true }}>
                        {name}
                    </Link>
                </p>
                <p className="text-[13px] leading-tight text-secondary m-0">{stat}</p>
            </div>
        </li>
    )
}
