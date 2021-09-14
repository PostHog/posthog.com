import React from 'react'
import { Link } from 'react-scroll'

export default function InternalSidebarLink({ url, name, className = '', style = {} }) {
    return (
        <Link
            style={style}
            offset={-50}
            smooth
            duration={300}
            to={url}
            hashSpy
            className={`text-almost-black hover:text-orange dark:text-white dark:hover:text-orange ${className}`}
        >
            {name}
        </Link>
    )
}
