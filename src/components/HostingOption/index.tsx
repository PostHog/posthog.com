import React from 'react'
import { Link } from 'gatsby'

interface HostingOptionProps {
    handle: string
    name: string
    url: string
}

export const HostingOption = ({ handle, name, url }: HostingOptionProps): JSX.Element => {
    return (
        <li className="mr-1 mb-2">
            <Link
                to={url}
                className="flex items-center flex-row py-2 px-3 rounded-full whitespace-nowrap border-black border-2 border-solid border-opacity-10 text-black hover:text-black hover:border-opacity-20 hover:border-black"
            >
                <svg
                    className="icon width-[18px] height-[18px] mr-1 fill-current"
                    style={{ width: '18px', height: '18px' }}
                >
                    <use xlinkHref={`#${handle}`} />
                </svg>
                <span className="text-black text-xs text-opacity-70 leading-tight">{name}</span>
            </Link>
        </li>
    )
}
