import React from 'react'
import { IconLock } from '@posthog/icons'
import Tooltip from 'components/RadixUI/Tooltip'
import Link from 'components/Link'

export const PrivateLink = ({ url, children }) => {
    return (
        <Tooltip
            trigger={
                <span className="relative top-1 inline-flex mx-0.5 px-1.5 py-0.5 text-sm rounded-full border border-primary bg-accent">
                    <IconLock className="inline-block w-4 mr-1" />
                    <Link to={url} externalNoIcon className="text-red dark:text-yellow !no-underline">
                        {children}
                    </Link>
                </span>
            }
            delay={0}
        >
            This link is only accessible to PostHog org members
        </Tooltip>
    )
}
