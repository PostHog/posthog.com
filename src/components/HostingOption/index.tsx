import React from 'react'
import hostingSprite from './images/sprite-hosting.svg'
import { Link } from 'gatsby'

interface HostingOptionProps {
    handle: string
    name: string
    url: string
}

export const HostingOption = ({ handle, name, url }: HostingOptionProps) => {
    return (
        <li className="mr-1 mb-2">
            <Link
                to={url}
                className="flex items-center flex-row py-2 px-3 rounded-full whitespace-nowrap border-black/10 border-2 border-solid text-black hover:text-black hover:border-black/20"
            >
                <svg
                    className="icon width-[18px] height-[18px] mr-1 fill-current"
                    style={{ width: '18px', height: '18px' }}
                >
                    <use xlinkHref={`#${handle}`} />
                </svg>
                <span className="text-black text-sm text-opacity-70 leading-tight">{name}</span>
            </Link>
        </li>
    )
}
