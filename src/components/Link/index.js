import React from 'react'
import { Link as GatsbyLink } from 'gatsby'

export default function Link({ to, children, className = '', onClick, ...other }) {
    const internal = /^\/(?!\/)/.test(to)
    return onClick ? (
        <button onClick={onClick} className={className}>
            {children}
        </button>
    ) : internal ? (
        <GatsbyLink {...other} to={to} className={className}>
            {children}
        </GatsbyLink>
    ) : (
        <a {...other} href={to} className={className}>
            {children}
        </a>
    )
}
