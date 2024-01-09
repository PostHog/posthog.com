import React from 'react'
import { IconLock } from '@posthog/icons'
import Tooltip from 'components/Tooltip'
import Link from 'components/Link'

export const PrivateLink = ({ url, label }) => {
    return (
        <Tooltip content="This link is only accessible to PostHog org members">
            <span className="relative top-1 inline-flex mx-0.5 px-1.5 py-0.5 text-sm rounded-full border border-light dark:border-dark bg-accent dark:bg-accent-dark">
                <IconLock className="inline-block w-4 mr-1" />
                <Link to={url} externalNoIcon>
                    {label}
                </Link>
            </span>
        </Tooltip>
    )
}
