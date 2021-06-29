import React from 'react'
import hostingSprite from './images/sprite-hosting.svg'

interface HostingOptionProps {
    handle: string
    name: string
    url: string
}

export const HostingOption = ({ handle, name, url }: HostingOptionProps) => {
    return (
        <li className="mr-1 mb-1">
            <a
                href={`${url}`}
                className="flex items-center flex-row p-2 rounded-full whitespace-nowrap border-white border-2 border-solid border-opacity-10 hover:border-opacity-20"
            >
                <svg className="icon width-[18px] height-[18px] mr-2" style={{ width: '18px', height: '18px' }}>
                    <use href={hostingSprite + '#hosting-' + `${handle}`} />
                </svg>
                <span className="text-white text-xs text-opacity-70 leading-tight">{name}</span>
            </a>
        </li>
    )
}
