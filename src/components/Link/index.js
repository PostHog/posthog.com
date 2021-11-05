import { ExternalLink } from 'components/Icons/Icons'
import { Link as GatsbyLink } from 'gatsby'
import { useValues } from 'kea'
import React from 'react'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'

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
    ...other
}) {
    const { posthog } = useValues(posthogAnalyticsLogic)

    const handleClick = () => {
        if (event && posthog) {
            posthog.capture(event)
        }
        onClick && onClick()
    }

    const internal = !disablePrefetch && /^\/(?!\/)/.test(to)
    return onClick && !to ? (
        <button onClick={handleClick} className={className}>
            {children}
        </button>
    ) : internal ? (
        <GatsbyLink {...other} to={to} className={className} state={state} onClick={handleClick}>
            {children}
        </GatsbyLink>
    ) : (
        <a
            target={external ? '_blank' : ''}
            rel="noopener noreferrer"
            onClick={handleClick}
            {...other}
            href={to}
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
