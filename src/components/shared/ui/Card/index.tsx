import { Link } from 'gatsby'
import React from 'react'

export default function Card({
    children,
    url,
    className = '',
}: {
    children: JSX.Element[]
    url: string
    className?: string
}): JSX.Element {
    const internal = /^\/(?!\/)/.test(url)
    const classes = `group bg-white rounded-[10px] overflow-hidden hover:shadow-xl hover:translate-y-[-2px] ${className}`
    return internal ? (
        <Link to={url} className={classes}>
            {children}
        </Link>
    ) : (
        <a href={url} target="_blank" rel="noreferrer noopener" className={classes}>
            {children}
        </a>
    )
}
