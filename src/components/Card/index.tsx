import React from 'react'
import Link from 'components/Link'

export default function Card({
    children,
    url,
    className = '',
}: {
    children: JSX.Element[]
    url: string
    className?: string
}): JSX.Element {
    return (
        <Link
            to={url}
            className={`group bg-white rounded-[10px] overflow-hidden hover:shadow-xl hover:translate-y-[-2px] ${className}`}
        >
            {children}
        </Link>
    )
}
