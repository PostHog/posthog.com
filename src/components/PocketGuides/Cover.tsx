import Link from 'components/Link'
import React from 'react'

import usePostHog from '../../hooks/usePostHog'

import { Logo } from '@posthog/brand/logo'

import { PocketGuideVolume } from '../../constants/pocketGuides'

import { volumeArt } from './volumeArt'

interface CoverProps {
    volume: PocketGuideVolume
    /** Guides inside it (the 101 isn't counted), printed the way a series prints its contents. */
    count: number
    /** Which surface this cover sits on. Required so every open is attributable. */
    placement: 'shelf' | 'self_driving_page' | 'product_docs'
}

/** The series frame: colored spine, series name above the subject, specimen on empty ground. */
function Frame({ token, children }: { token: string; children: React.ReactNode }): JSX.Element {
    return (
        <article className="relative flex aspect-[3/4] overflow-hidden rounded-sm border border-light bg-white shadow-lg dark:border-dark">
            <span aria-hidden="true" className={`w-3 shrink-0 bg-${token}`} />
            <div className="flex min-w-0 flex-1 flex-col px-4 py-3">{children}</div>
        </article>
    )
}

function Masthead({ title }: { title: string }): JSX.Element {
    // A long word can't wrap, so it breaks mid-word at the display size. Step the scale down
    // instead – the cover is only ~230px wide and "AI Observability" is one 13-letter word.
    const long = title.length > 12
    return (
        <header>
            {/* Wordmark only, pinned black: the cover is white stock in both themes. */}
            <Logo.Wordmark color="black" className="h-5 w-auto @[240px]:h-6" />
            <p className="m-0 mt-1.5 text-[11px] uppercase tracking-[0.14em] text-gray">Pocket guide to</p>
            <h3
                className={`m-0 mt-1.5 font-bold leading-tight text-black ${
                    long ? 'text-xl @[240px]:text-2xl' : 'text-2xl @[240px]:text-3xl'
                }`}
            >
                {title}
            </h3>
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

function CoverBody({ volume, count }: Omit<CoverProps, 'placement'>): JSX.Element {
    const Art = volumeArt(volume.id)
    return (
        <Frame token={volume.token}>
            {volume.comingSoon && <ComingSoonSash />}
            <Masthead title={volume.title} />
            {Art && (
                // min-h-0 lets the art shrink when a long title wraps, instead of clipping the footer.
                <div
                    aria-hidden="true"
                    className={`flex min-h-0 flex-1 items-center justify-center py-2 ${
                        volume.comingSoon ? 'opacity-40 grayscale' : ''
                    }`}
                >
                    <Art size={140} className="h-full max-h-[140px] w-auto max-w-full" />
                </div>
            )}
            <footer className="flex shrink-0 items-baseline justify-between gap-2 text-[11px] uppercase tracking-wider text-gray">
                <span>Vol. {volume.volume}</span>
                {!volume.comingSoon && (
                    <span className="tabular-nums">
                        {count} {count === 1 ? 'guide' : 'guides'}
                    </span>
                )}
            </footer>
        </Frame>
    )
}

export default function Cover({ volume, count, placement }: CoverProps): JSX.Element {
    const posthog = usePostHog()

    // Unwritten volumes aren't links – there's nothing behind them yet.
    if (volume.comingSoon) {
        return <CoverBody volume={volume} count={count} />
    }

    const trackCoverClick = () =>
        posthog?.capture('pocket_guide_interaction', {
            kind: 'cover_click',
            volume: volume.id,
            placement,
        })

    return (
        <Link
            to={`/pocket-guides/${volume.id}`}
            state={{ newWindow: true }}
            onClick={trackCoverClick}
            // Perspective lives on the link so the hover tilt reads as picking the book up.
            className="group block no-underline [perspective:1200px]"
        >
            {/* Hinged at the spine: the fore-edge lifts toward you like a cover opening, and the
                spine edge stays planted instead of foreshortening away. */}
            <div className="transition-transform duration-300 ease-out [transform-origin:left_center] [transform-style:preserve-3d] motion-safe:group-hover:[transform:rotateY(-9deg)_translateY(-4px)] motion-safe:group-hover:drop-shadow-2xl">
                <CoverBody volume={volume} count={count} />
            </div>
        </Link>
    )
}
