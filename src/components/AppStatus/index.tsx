import Link from 'components/Link'
import React, { useEffect, useState } from 'react'

const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
        case 'none':
            return 'text-green'
        case 'minor':
            return 'text-yellow'
        case 'major':
            return 'text-red'
        case 'critical':
            return 'text-red'
        default:
            return 'text-gray'
    }
}

const getStatusDescription = (status?: string) => {
    switch (status?.toLowerCase()) {
        case 'none':
            return 'All systems operational'
        case 'minor':
            return 'Minor issues'
        case 'major':
            return 'Major issues'
        case 'critical':
            return 'Critical issues'
        default:
            return 'Unknown'
    }
}

export default function AppStatus() {
    const [appStatus, setAppStatus] = useState<string>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const appStatus = async () =>
            fetch('https://status.posthog.com/api/v2/status.json')
                .then((res) => res.json())
                .then((data) => data?.status?.indicator)
        const appIncidents = async () =>
            fetch('https://status.posthog.com/api/v2/incidents/unresolved.json')
                .then((res) => res.json())
                .then((data) => data?.incidents)
        const getAppStatus = async () => {
            try {
                const incidents = await appIncidents()
                if (incidents?.length > 0) {
                    const major = incidents.some((incident) => incident?.impact === 'major')
                    const critical = incidents.some((incident) => incident?.impact === 'critical')
                    return setAppStatus(critical ? 'critical' : major ? 'major' : 'minor')
                }
                const status = await appStatus()
                return setAppStatus(status)
            } catch (error) {
                setAppStatus('unknown')
            }
        }
        getAppStatus().then(() => setLoading(false))
    }, [])

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
