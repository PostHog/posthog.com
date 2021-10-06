import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { ExternalLink } from 'components/Icons/Icons'

export default function Link({
    to,
    children,
    className = '',
    onClick,
    disablePrefetch,
    external,
    iconClasses = '',
    state = {},
    ...other
}) {
    const internal = !disablePrefetch && /^\/(?!\/)/.test(to)
    return onClick && !to ? (
        <button onClick={onClick} className={className}>
            {children}
        </button>
    ) : internal ? (
        <GatsbyLink {...other} to={to} className={className} state={state} onClick={onClick}>
            {children}
        </GatsbyLink>
    ) : (
        <a target={external ? '_blank' : ''} rel="noopener noreferrer" {...other} href={to} className={className}>
            {external ? (
                <span className="inline-flex justify-center items-center space-x-1">
                    <span>{children}</span>
                    <ExternalLink className={iconClasses} />
                </span>
            ) : (
                children
            )}
        </a>
    )
}
