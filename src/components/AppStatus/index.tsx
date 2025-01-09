import Link from 'components/Link'
import { getStatusColor, getStatusDescription, useAppStatus } from 'hooks/useAppStatus'
import React from 'react'

export default function AppStatus() {
    const { loading, status: appStatus } = useAppStatus()

    return loading ? null : (
        <Link
            className="flex gap-1 items-center justify-end text-inherit hover:text-red dark:hover:text-yellow"
            to="https://status.posthog.com"
            externalNoIcon
        >
            <span className={`text-2xl -mt-1 ${getStatusColor(appStatus)}`}>&bull;</span>
            <span className="text-sm">{getStatusDescription(appStatus)}</span>
        </Link>
    )
}
