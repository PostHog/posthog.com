import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

const STATUS_SITE = 'https://www.posthogstatus.com'
const EDGE_CACHE = 'public, s-maxage=60, stale-while-revalidate=300'
const STATUS_TIMEOUT_MS = 8000
const CALENDAR_MONTHS = 4
const DOWNTIME_DAYS = 90
const LATEST_INCIDENTS = 7
const MINUTE_MS = 60_000
const DAY_MS = 86_400_000

export type DayLevel = 'reported' | 'partial' | 'full'

export interface StatusIncidentLink {
    name: string
    url: string
}

export interface ScaleStatus {
    generatedAt: string
    active: (StatusIncidentLink & { status: string; impact: string })[]
    calendarStart: string
    days: Record<string, { level: DayLevel; incidents: StatusIncidentLink[] }>
    downtime: { name: string; us: number; eu: number }[]
    incidents: (StatusIncidentLink & { status: string; publishedAt: string; components: string[] })[]
}

type Impact = { incident_id: string; incident_name: string; status: string; start_at: string; end_at: string | null }
type Incident = {
    id: string
    name: string
    status: string
    published_at: string
    affected_components: { component_name: string; status: string }[]
}
type StatusResponse = {
    generated_at: string
    component_groups: { name: string; components: { id: string; name: string }[] }[]
    active_incidents: Incident[]
    active_maintenances: Incident[]
    recent_incidents: Incident[]
    component_impacts: Record<string, Impact[]>
}

const dayRank: DayLevel[] = ['reported', 'partial', 'full']

const dayLevels: Record<string, DayLevel> = {
    degraded_performance: 'partial',
    partial_outage: 'partial',
    full_outage: 'full',
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
    const today = new Date(now)
    const calendarStart = Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - (CALENDAR_MONTHS - 1), 1)
    const downtimeStart = now - DOWNTIME_DAYS * DAY_MS

    const components = new Map(
        status.component_groups.flatMap((group) =>
            group.components.map((component) => [
                component.id,
                { name: component.name, region: group.name.startsWith('US') ? 'us' : 'eu' },
            ])
        )
    )

    const days = new Map<string, { level: DayLevel; incidents: Map<string, StatusIncidentLink> }>()
    const markDay = (date: string, level: DayLevel, incidentId: string, incidentName: string) => {
        const entry = days.get(date) ?? { level, incidents: new Map() }
        if (dayRank.indexOf(level) > dayRank.indexOf(entry.level)) entry.level = level
        entry.incidents.set(incidentId, { name: incidentName, url: incidentUrl(incidentId) })
        days.set(date, entry)
    }
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
            const level = dayLevels[impact.status]
            if (level && end >= calendarStart) {
                const lastMoment = Math.max(end, start + 1)
                for (let day = Date.parse(utcDay(Math.max(start, calendarStart))); day < lastMoment; day += DAY_MS) {
                    markDay(utcDay(day), level, impact.incident_id, impact.incident_name)
                }
            }
            if (downtimeStatuses.has(impact.status) && end > downtimeStart) {
                downtimeWindows
                    .get(component.name)
                    ?.[component.region as 'us' | 'eu'].push([Math.max(start, downtimeStart), Math.min(end, now)])
            }
        }
    }

    for (const incident of [...status.active_incidents, ...status.recent_incidents]) {
        const published = Date.parse(incident.published_at)
        if (incident.affected_components.length === 0 && published >= calendarStart) {
            markDay(utcDay(published), 'reported', incident.id, incident.name)
        }
    }

    const toIncident = (incident: Incident) => ({
        name: incident.name,
        url: incidentUrl(incident.id),
        status: incident.status,
        publishedAt: incident.published_at,
        components: Array.from(new Set(incident.affected_components.map((component) => component.component_name))),
    })

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
        calendarStart: utcDay(calendarStart),
        days: Object.fromEntries(
            Array.from(days, ([date, { level, incidents }]) => [
                date,
                { level, incidents: Array.from(incidents.values()) },
            ])
        ),
        downtime: Array.from(downtimeWindows, ([name, { us, eu }]) => ({
            name,
            us: unionMinutes(us),
            eu: unionMinutes(eu),
        })),
        incidents: [...status.active_incidents, ...status.recent_incidents]
            .sort((a, b) => b.published_at.localeCompare(a.published_at))
            .slice(0, LATEST_INCIDENTS)
            .map(toIncident),
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
