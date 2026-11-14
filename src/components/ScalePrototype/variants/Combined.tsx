import React from 'react'
import { Source, StatusBadge } from '../parts'
import Hero from '../Hero'
import { IncidentTimeline, LastIncidents, UptimeCard } from '../sections'
import { useStatus } from '../useStatus'

export default function Combined(): JSX.Element {
    const status = useStatus()
    return (
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
            <Hero />

            <div className="mt-6 flex flex-col gap-6">
                <header className="flex flex-col gap-3 border-t border-primary pt-10">
                    <h2 className="m-0 text-[length:clamp(1.75rem,6.5cqw,3rem)] font-bold leading-[1.15]">
                        All while keeping the lights on.
                    </h2>
                    <div className="flex flex-wrap items-center gap-3">
                        <StatusBadge status={status} />
                        <p className="m-0 text-lg text-secondary">Mostly. Here’s the uptime for the last 90 days.</p>
                    </div>
                </header>
                <div className="grid items-start gap-6 @4xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
                    <UptimeCard />
                    <IncidentTimeline status={status} count={10} />
                </div>
            </div>

            <LastIncidents status={status} />

            <Source />
        </div>
    )
}
