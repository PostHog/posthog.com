import Link from 'components/Link'
import React from 'react'

import { HedgehogDataThief, HedgehogImTheDriver, HedgehogWorkflows } from '@posthog/brand/hoggies'
import { Logo } from '@posthog/brand/logo'

import { FieldGuideVolume } from '../../constants/fieldGuides'

/** Cover art per volume, so a new volume picks an existing hoggie instead of commissioning one. */
const VOLUME_ART: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    'self-driving': HedgehogImTheDriver,
    'data-warehouse': HedgehogDataThief,
    workflows: HedgehogWorkflows,
}

interface CoverProps {
    volume: FieldGuideVolume
    /** Guides inside it, printed the way a series prints its contents count. */
    count: number
}

/**
 * The series frame, borrowing the three devices that make a Peterson cover recognisable: a
 * coloured spine down the left edge, the series name set larger than the subject, and the
 * specimen floating on an empty ground. No body copy – covers don't have paragraphs.
 */
function Frame({ token, children }: { token: string; children: React.ReactNode }): JSX.Element {
    return (
        <article className="relative flex aspect-[3/4] overflow-hidden rounded-sm border border-light bg-white shadow-lg dark:border-dark">
            <span aria-hidden="true" className={`w-3 shrink-0 bg-${token}`} />
            <div className="flex min-w-0 flex-1 flex-col px-4 py-3">{children}</div>
        </article>
    )
}

function Masthead({ title }: { title: string }): JSX.Element {
    return (
        <header>
            {/* Wordmark only – the logomark is a second illustration competing with the specimen.
                Pinned black: the cover is white stock in both themes, like printed stock. */}
            <Logo.Wordmark color="black" className="h-5 w-auto @[240px]:h-6" />
            <p className="m-0 mt-1.5 text-[11px] uppercase tracking-[0.14em] text-gray">Field guide to</p>
            <h3 className="m-0 mt-1.5 text-2xl font-bold leading-tight text-black @[240px]:text-3xl">{title}</h3>
        </header>
    )
}

/** Slapped across the corner, the way a sticker goes on a book that isn't out yet. */
function ComingSoonSash(): JSX.Element {
    return (
        <span
            aria-hidden="true"
            className="absolute -right-9 top-5 w-36 rotate-45 bg-primary py-1 text-center text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm"
        >
            Coming soon
        </span>
    )
}

function CoverBody({ volume, count }: CoverProps): JSX.Element {
    const Art = VOLUME_ART[volume.id]
    return (
        <Frame token={volume.token}>
            {volume.comingSoon && <ComingSoonSash />}
            <Masthead title={volume.title} />
            {Art && (
                <div
                    aria-hidden="true"
                    className={`flex flex-1 items-center justify-center py-2 ${
                        volume.comingSoon ? 'opacity-40 grayscale' : ''
                    }`}
                >
                    <Art size={190} />
                </div>
            )}
            <footer className="flex items-baseline justify-between gap-2 text-[11px] uppercase tracking-wider text-gray">
                <span>Vol. {volume.volume}</span>
                {volume.comingSoon ? (
                    <span>{volume.owner} team</span>
                ) : (
                    <span className="tabular-nums">
                        {count} {count === 1 ? 'guide' : 'guides'}
                    </span>
                )}
            </footer>
        </Frame>
    )
}

export default function Cover({ volume, count }: CoverProps): JSX.Element {
    // Unwritten volumes aren't links – there's nothing behind them yet.
    if (volume.comingSoon) {
        return <CoverBody volume={volume} count={count} />
    }

    return (
        <Link
            to={`/field-guides/${volume.id}`}
            state={{ newWindow: true }}
            className="block no-underline transition-transform hover:-translate-y-1"
        >
            <CoverBody volume={volume} count={count} />
        </Link>
    )
}
