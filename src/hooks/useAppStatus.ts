import { useEffect, useState } from 'react'

// Status types from incident.io
type IncidentIoImpact = 'partial_outage' | 'degraded_performance' | 'full_outage'

interface IncidentIoAffectedComponent {
    id: string
    name: string
    group_name?: string
    current_status: string
}

interface IncidentIoIncident {
    id: string
    name: string
    status: string
    url: string
    last_update_at: string
    last_update_message: string
    current_worst_impact: IncidentIoImpact
    affected_components: IncidentIoAffectedComponent[]
}

interface IncidentIoMaintenance {
    id: string
    name: string
    status: string
    last_update_at: string
    last_update_message: string
    url: string
    affected_components: IncidentIoAffectedComponent[]
    started_at?: string
    scheduled_end_at?: string
    starts_at?: string
    ends_at?: string
}

interface IncidentIoSummary {
    page_title: string
    page_url: string
    ongoing_incidents: IncidentIoIncident[]
    in_progress_maintenances: IncidentIoMaintenance[]
    scheduled_maintenances: IncidentIoMaintenance[]
}

export type NormalizedStatus = 'operational' | 'degradedPerformance' | 'partialOutage' | 'majorOutage' | 'unknown'

export const getStatusColor = (status?: NormalizedStatus | string): string => {
    switch (status) {
        case 'operational':
            return 'text-green'
        case 'degradedPerformance':
            return 'text-yellow'
        case 'partialOutage':
            return 'text-yellow'
        case 'majorOutage':
            return 'text-red'
        default:
            return 'text-gray'
    }
}

export const getStatusDescription = (status?: NormalizedStatus | string): string => {
    switch (status) {
        case 'operational':
            return 'All systems operational'
        case 'degradedPerformance':
            return 'Degraded performance'
        case 'partialOutage':
            return 'Partial outage'
        case 'majorOutage':
            return 'Major outage'
        default:
            return 'Unknown'
    }
}

function getWorstStatus(summary: IncidentIoSummary): NormalizedStatus {
    const hasOngoingIncidents = summary.ongoing_incidents.length > 0
    const hasInProgressMaintenance = summary.in_progress_maintenances.length > 0

    if (!hasOngoingIncidents && !hasInProgressMaintenance) {
        return 'operational'
    }

    // Check for worst impact across ongoing incidents
    for (const incident of summary.ongoing_incidents) {
        if (incident.current_worst_impact === 'full_outage') {
            return 'majorOutage'
        }
    }

    for (const incident of summary.ongoing_incidents) {
        if (incident.current_worst_impact === 'partial_outage') {
            return 'partialOutage'
        }
    }

    for (const incident of summary.ongoing_incidents) {
        if (incident.current_worst_impact === 'degraded_performance') {
            return 'degradedPerformance'
        }
    }

    // If only maintenance is in progress, show as degraded
    if (hasInProgressMaintenance) {
        return 'degradedPerformance'
    }

    return 'operational'
}

export const useAppStatus = (): { status: NormalizedStatus | undefined; loading: boolean } => {
    const [status, setStatus] = useState<NormalizedStatus>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await fetch('https://www.posthogstatus.com/api/v1/summary')
                const data: IncidentIoSummary = await response.json()
                setStatus(getWorstStatus(data))
            } catch (error) {
                setStatus('unknown')
            } finally {
                setLoading(false)
            }
        }
        fetchStatus()
    }, [])

    return { status, loading }
}
