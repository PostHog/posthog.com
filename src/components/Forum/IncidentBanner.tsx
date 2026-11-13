import React from 'react'
import Link from 'components/Link'
import { NormalizedStatus, useAppStatus } from 'hooks/useAppStatus'

const incidentStatuses: NormalizedStatus[] = ['degradedPerformance', 'partialOutage', 'majorOutage']

export default function IncidentBanner({ className = '' }: { className?: string }) {
    const { status } = useAppStatus()

    if (!status || !incidentStatuses.includes(status)) return null

    return (
        <div data-scheme="secondary" className={`p-4 bg-primary border border-primary rounded ${className}`}>
            <h5 className="m-0">Heads up!</h5>
            <p className="m-0 text-sm">
                We're currently experiencing an incident. Check{' '}
                <Link className="text-red dark:text-yellow font-bold" to="https://www.posthogstatus.com" externalNoIcon>
                    here
                </Link>{' '}
                for the latest info.
            </p>
        </div>
    )
}
