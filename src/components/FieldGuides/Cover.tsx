import Link from 'components/Link'
import React from 'react'

import { HedgehogXRay } from '@posthog/brand/hoggies'

import { FieldGuideVolume } from '../../constants/fieldGuides'

/** Cover art per volume, so a new volume picks an existing hoggie instead of commissioning one. */
const VOLUME_ART: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    'self-driving': HedgehogXRay,
}

interface CoverProps {
    volume: FieldGuideVolume
    /** Guides inside it, printed on the cover the way a series prints its plate count. */
    count: number
}

/** The series frame – the thing that makes twelve volumes read as one set. */
function Frame({ token, children }: { token: string; children: React.ReactNode }): JSX.Element {
    return (
        <article
            className={`flex aspect-[3/4] flex-col overflow-hidden rounded border-2 border-b-8 bg-primary border-${token}`}
        >
            {children}
        </article>
    )
}

/** The wordmark every volume carries, so the series is legible before the title is read. */
function SeriesBand({ token }: { token: string }): JSX.Element {
    return (
        <p className={`m-0 px-3 py-1.5 font-squeak text-[11px] uppercase tracking-wider text-white bg-${token}`}>
            PostHog field guides
        </p>
    )
}

export default function Cover({ volume, count }: CoverProps): JSX.Element {
    const Art = VOLUME_ART[volume.id]

    return (
        <Link to={`/field-guides/${volume.id}`} state={{ newWindow: true }} className="block no-underline">
            <Frame token={volume.token}>
                <SeriesBand token={volume.token} />
                <div className="flex flex-1 flex-col p-3">
                    <h3 className="m-0 text-lg font-bold leading-tight text-primary @[220px]:text-xl">
                        {volume.title}
                    </h3>
                    <p className="mt-1 mb-0 text-[13px] leading-snug text-secondary">{volume.description}</p>
                    {Art && (
                        <div aria-hidden="true" className="mt-auto flex justify-center pt-2">
                            <Art size={110} />
                        </div>
                    )}
                </div>
                {/* Volume number and count, the two things a series prints on every spine. */}
                <p className="m-0 flex items-baseline justify-between border-t border-light px-3 py-1.5 text-[11px] uppercase tracking-wide text-secondary dark:border-dark">
                    <span>Vol. {volume.volume}</span>
                    <span className="tabular-nums">
                        {count} {count === 1 ? 'guide' : 'guides'}
                    </span>
                </p>
            </Frame>
        </Link>
    )
}

/** An empty slot, so a shelf of one reads as a series that's started rather than one that's short. */
export function InvitationCover(): JSX.Element {
    return (
        <Link
            to="/docs/self-driving"
            state={{ newWindow: true }}
            className="block no-underline"
            aria-label="Add a field guide for your team"
        >
            <article className="flex aspect-[3/4] flex-col items-center justify-center rounded border-2 border-dashed border-primary p-4 text-center">
                <p className="m-0 font-squeak text-[11px] uppercase tracking-wider text-secondary">Vol. 2</p>
                <p className="mt-2 mb-0 text-base font-bold text-primary">Yours?</p>
                <p className="mt-1 mb-0 text-[13px] leading-snug text-secondary">
                    Any team can publish a volume. Copy the starter and write one.
                </p>
            </article>
        </Link>
    )
}
