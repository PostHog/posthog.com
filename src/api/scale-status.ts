import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

const STATUS_SITE = 'https://www.posthogstatus.com'
const EDGE_CACHE = 'public, s-maxage=60, stale-while-revalidate=300'
const STATUS_TIMEOUT_MS = 8000
const UPTIME_DAYS = 90
const LATEST_INCIDENTS = 10
const MINUTE_MS = 60_000
const DAY_MS = 86_400_000

interface StatusIncidentLink {
    name: string
    url: string
}

export interface ScaleStatus {
    generatedAt: string
    active: (StatusIncidentLink & { status: string; impact: string })[]
    uptimeSince: string
    uptime: { name: string; us: number; eu: number }[]
    incidents: (StatusIncidentLink & { status: string; publishedAt: string })[]
}

type Impact = { incident_id: string; incident_name: string; status: string; start_at: string; end_at: string | null }
type Incident = {
    id: string
    name: string
    status: string
    published_at: string
    affected_components: { status: string }[]
}
type StatusResponse = {
    generated_at: string
    component_groups: { name: string; components: { id: string; name: string }[] }[]
    active_incidents: Incident[]
    active_maintenances: Incident[]
    recent_incidents: Incident[]
    component_impacts: Record<string, Impact[]>
}

const downtimeStatuses = new Set(['partial_outage', 'full_outage'])

const impactRank = ['degraded_performance', 'partial_outage', 'full_outage']

const incidentUrl = (id: string): string => `${STATUS_SITE}/incidents/${id}`

const utcDay = (time: number): string => new Date(time).toISOString().slice(0, 10)

function worstImpact(incident: Incident): string {
    return incident.affected_components
        .map((component) => component.status)
        .reduce((worst, status) => (impactRank.indexOf(status) > impactRank.indexOf(worst) ? status : worst), '')
}

function unionMinutes(windows: [number, number][]): number {
    const sorted = [...windows].sort((a, b) => a[0] - b[0])
    let total = 0
    let [start, end] = sorted[0] ?? [0, 0]
    for (const [nextStart, nextEnd] of sorted.slice(1)) {
        if (nextStart > end) {
            total += end - start
            ;[start, end] = [nextStart, nextEnd]
        } else {
            end = Math.max(end, nextEnd)
        }
    }
    return Math.round((total + end - start) / MINUTE_MS)
}

export function summarizeStatus(status: StatusResponse, now: number): ScaleStatus {
    const uptimeStart = now - UPTIME_DAYS * DAY_MS

    const components = new Map(
        status.component_groups.flatMap((group) =>
            group.components.map((component) => [
                component.id,
                { name: component.name, region: group.name.startsWith('US') ? 'us' : 'eu' },
            ])
        )
    )

    const downtimeWindows = new Map<string, { us: [number, number][]; eu: [number, number][] }>()
    for (const { name } of Array.from(components.values())) {
        downtimeWindows.set(name, { us: [], eu: [] })
    }

    for (const [componentId, impacts] of Object.entries(status.component_impacts)) {
        const component = components.get(componentId)
        if (!component) continue
        for (const impact of impacts) {
            const start = Date.parse(impact.start_at)
            const end = impact.end_at ? Date.parse(impact.end_at) : now
            if (downtimeStatuses.has(impact.status) && end > uptimeStart) {
                downtimeWindows
                    .get(component.name)
                    ?.[component.region as 'us' | 'eu'].push([Math.max(start, uptimeStart), Math.min(end, now)])
            }
        }
    }

    const uptimePercent = (windows: [number, number][]) =>
        100 - (unionMinutes(windows) * MINUTE_MS * 100) / (UPTIME_DAYS * DAY_MS)

    return {
        generatedAt: status.generated_at,
        active: [...status.active_incidents, ...status.active_maintenances]
            .map((incident) => ({
                name: incident.name,
                url: incidentUrl(incident.id),
                status: incident.status,
                impact: worstImpact(incident) || 'under_maintenance',
            }))
            .sort((a, b) => impactRank.indexOf(b.impact) - impactRank.indexOf(a.impact)),
        uptimeSince: utcDay(uptimeStart),
        uptime: Array.from(downtimeWindows, ([name, { us, eu }]) => ({
            name,
            us: uptimePercent(us),
            eu: uptimePercent(eu),
        })),
        incidents: [...status.active_incidents, ...status.recent_incidents]
            .sort((a, b) => b.published_at.localeCompare(a.published_at))
            .slice(0, LATEST_INCIDENTS)
            .map((incident) => ({
                name: incident.name,
                url: incidentUrl(incident.id),
                status: incident.status,
                publishedAt: incident.published_at,
            })),
    }
}

const handler = async (_req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
    try {
        const response = await fetch(`${STATUS_SITE}/api/status`, {
            signal: AbortSignal.timeout(STATUS_TIMEOUT_MS),
        })
        if (!response.ok) {
            throw new Error(`Status page returned ${response.status}`)
        }
        const summary = summarizeStatus(await response.json(), Date.now())
        res.setHeader('Cache-Control', EDGE_CACHE)
        return res.status(200).json(summary)
    } catch (error) {
        console.error('Failed to load the PostHog status page:', error)
        return res.status(502).json({ error: 'Status page unavailable' })
    }
}

export default handler
