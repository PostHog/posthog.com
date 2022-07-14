import { ExternalLink } from 'components/Icons/Icons'
import { Link as GatsbyLink } from 'gatsby'
import { useValues } from 'kea'
import React from 'react'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'
import type { GatsbyLinkProps } from 'gatsby'

interface Props {
    to: string
    children: React.ReactNode
    className?: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>) => void
    disablePrefetch?: boolean
    external?: boolean
    iconClasses?: string
    state?: any
    event?: string
    href?: string
}

export default function Link({
    to,
    children,
    className = '',
    onClick,
    disablePrefetch,
    external,
    iconClasses = '',
    state = {},
    event = '',
    href,
    ...other
}: Props) {
    const { posthog } = useValues(posthogAnalyticsLogic)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>) => {
        if (event && posthog) {
            posthog.capture(event)
        }
        onClick && onClick(e)
    }
    const url = to || href
    const internal = !disablePrefetch && url && /^\/(?!\/)/.test(url)
    return onClick && !url ? (
        <button onClick={handleClick} className={className}>
            {children}
        </button>
    ) : internal ? (
        <GatsbyLink {...other} to={url} className={className} state={state} onClick={handleClick}>
            {children}
        </GatsbyLink>
    ) : (
        <a
            target={external ? '_blank' : ''}
            rel="noopener noreferrer"
            onClick={handleClick}
            {...other}
            href={url}
            className={className}
        >
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
