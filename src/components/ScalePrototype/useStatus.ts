import { useEffect, useState } from 'react'
import { products } from './data'
import { incidentSnapshot } from './incidents'
import type { ProductKey } from './data'

export type Incident = { title: string; url: string; date: number; resolved: boolean }

export type StatusData = {
    live: boolean
    ongoing: { name: string; url: string; components: string[] }[]
    incidents: Incident[]
    since: number
    lastByProduct: Record<ProductKey, Incident | undefined>
}

const snapshot: Incident[] = incidentSnapshot
    .filter(([title]) => !/^maintenance/i.test(title))
    .map(([title, url, date, resolved]) => ({
        title,
        url,
        date: Date.parse(date),
        resolved,
    }))

const FEED_START = Date.parse('2026-08-17T00:00:00Z')

function byProduct(incidents: Incident[]): StatusData['lastByProduct'] {
    const result = {} as StatusData['lastByProduct']
    for (const product of products) {
        result[product.key] = incidents.find((incident) => product.match.test(incident.title))
    }
    return result
}

function build(incidents: Incident[], ongoing: StatusData['ongoing'], live: boolean): StatusData {
    const sorted = [...incidents].sort((a, b) => b.date - a.date)
    const oldest = sorted.length ? sorted[sorted.length - 1].date : FEED_START
    return { live, ongoing, incidents: sorted, since: Math.min(oldest, FEED_START), lastByProduct: byProduct(sorted) }
}

export function useStatus(): StatusData {
    const [data, setData] = useState<StatusData>(() => build(snapshot, [], false))

    useEffect(() => {
        let cancelled = false
        fetch('https://www.posthogstatus.com/api/v1/summary')
            .then((response) => response.json())
            .then((summary) => {
                if (cancelled) {
                    return
                }
                const ongoing: StatusData['ongoing'] = (summary.ongoing_incidents ?? []).map(
                    (incident: { name: string; url: string; affected_components?: { name: string }[] }) => ({
                        name: incident.name,
                        url: incident.url.replace('.com//', '.com/'),
                        components: Array.from(
                            new Set((incident.affected_components ?? []).map((component) => component.name))
                        ),
                    })
                )
                const open = new Set(ongoing.map((incident) => incident.name))
                const known = new Set(snapshot.map((incident) => incident.title))
                const incidents = [
                    ...ongoing
                        .filter((incident) => !known.has(incident.name))
                        .map((incident) => ({
                            title: incident.name,
                            url: incident.url,
                            date: Date.now(),
                            resolved: false,
                        })),
                    ...snapshot.map((incident) => ({ ...incident, resolved: !open.has(incident.title) })),
                ]
                setData(build(incidents, ongoing, true))
            })
            .catch(() => undefined)
        return () => {
            cancelled = true
        }
    }, [])

    return data
}

export function useSecondsToday(): number | null {
    const [seconds, setSeconds] = useState<number | null>(null)
    useEffect(() => {
        const read = () => {
            const now = new Date()
            setSeconds(now.getUTCHours() * 3600 + now.getUTCMinutes() * 60 + now.getUTCSeconds())
        }
        read()
        const timer = window.setInterval(read, 1000)
        return () => window.clearInterval(timer)
    }, [])
    return seconds
}

export function daysSince(date: number, now: number): number {
    return Math.max(0, Math.floor((now - date) / 86_400_000))
}
