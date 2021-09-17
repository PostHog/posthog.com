import React, { MouseEventHandler } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { ExternalLink } from 'components/Icons/Icons'

interface LinkProps {
    to?: string
    children: React.ReactNode
    className?: string
    onClick?: MouseEventHandler<HTMLElement>
    disablePrefetch?: boolean
    external?: boolean
}

export default function Link({
    to,
    children,
    className = '',
    onClick,
    disablePrefetch,
    external,
    ...other
}: LinkProps): JSX.Element {
    const internal = to && !disablePrefetch && /^\/(?!\/)/.test(to)
    return onClick ? (
        <button onClick={onClick} className={className}>
            {children}
        </button>
    ) : internal ? (
        <GatsbyLink {...other} to={to} className={className}>
            {children}
        </GatsbyLink>
    ) : (
        <a target={external ? '_blank' : ''} rel="noopener noreferrer" {...other} href={to} className={className}>
            {external ? (
                <span className="flex justify-center items-center space-x-2">
                    <ExternalLink />
                    <span>{children}</span>
                </span>
            ) : (
                children
            )}
        </a>
    )
}
