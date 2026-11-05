import { Link } from 'gatsby'
import React from 'react'

export default function Card({
    children,
    url,
    className = '',
    hoverEffect = true,
}: {
    children: JSX.Element[]
    url?: string
    className?: string
    hoverEffect?: boolean
}): JSX.Element {
    const hoverClasses = hoverEffect ? 'hover:shadow-xl hover:translate-y-[-2px]' : ''
    const classes = `group bg-white rounded-[10px] overflow-hidden ${hoverClasses} ${className}`
    if (!url) {
        return <div className={classes}>{children}</div>
    }

    const internal = /^\/(?!\/)/.test(url)
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
