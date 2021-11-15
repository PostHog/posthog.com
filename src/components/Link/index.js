import React, { useEffect, useState } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { ExternalLink } from 'components/Icons/Icons'
import { useValues } from 'kea'
import { posthogAnalyticsLogic } from 'logic/posthogAnalyticsLogic'
import { appendGclid } from 'lib/utils'

export default function Link({
    to,
    children,
    className = '',
    onClick = undefined,
    disablePrefetch = false,
    external = false,
    iconClasses = '',
    state = {},
    href = '',
    addGclid = false,
    ...other
}) {
    const { gclid } = useValues(posthogAnalyticsLogic)
    const [url, setUrl] = useState(to || href)
    useEffect(() => {
        // Run in an effect because gclid is not available in SSR
        if (addGclid && gclid) {
            setUrl(appendGclid(url, gclid))
        }
    }, [gclid])
    const internal = !disablePrefetch && /^\/(?!\/)/.test(url)
    return onClick && !url ? (
        <button onClick={onClick} className={className}>
            {children}
        </button>
    ) : internal ? (
        <GatsbyLink {...other} to={url} className={className} state={state} onClick={onClick}>
            {children}
        </GatsbyLink>
    ) : (
        <a target={external ? '_blank' : ''} rel="noopener noreferrer" {...other} href={url} className={className}>
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
