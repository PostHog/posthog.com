import Link from 'components/Link'
import React from 'react'

import usePostHog from '../../../hooks/usePostHog'

import { Logo } from '@posthog/brand/logo'

import { PocketGuideVolume, pocketGuideUrl } from '../../../constants/pocketGuides'

import { volumeArt } from './volumeArt'
import { openPocketGuide } from './bookOpening'

interface CoverProps {
    volume: PocketGuideVolume
    /** Guides inside it (the 101 isn't counted), printed the way a series prints its contents. */
    count: number
    /** Which surface this cover sits on. Required so every open is attributable. */
    placement: 'shelf' | 'self_driving_page' | 'product_docs'
    /** Override the volume entry route when linking directly into its reader. */
    to?: string
    /** Optional extra tracking for a cover used as a Learn resource choice. */
    onOpen?: () => void
}

/** The series frame: colored spine, series name above the subject, specimen on empty ground. */
function Frame({ token, children }: { token: string; children: React.ReactNode }): JSX.Element {
    return (
        <article className="relative flex aspect-[3/4] overflow-hidden rounded-sm border border-light bg-white shadow-lg dark:border-dark">
            <span aria-hidden="true" className={`w-3 shrink-0 bg-${token}`} />
            <div className="@container flex min-w-0 flex-1 flex-col px-4 py-3">{children}</div>
        </article>
    )
}

// Bold sans averages about 0.62em per letter. The title also scales with the cover (13cqi),
// so a small cover keeps room for its art, and never exceeds 1.875rem (text-3xl).
const TITLE_EM_PER_CHAR = 0.62
const TITLE_MAX = 'min(1.875rem, 13cqi)'

function Masthead({ title }: { title: string }): JSX.Element {
    // Size the title from its longest word and the cover's width, so no word breaks mid-word
    // ("Observabili / ty") at any cover size or title length.
    const longestWord = Math.max(...title.split(/\s+/).map((word) => word.length))
    const fit = `${(100 / (longestWord * TITLE_EM_PER_CHAR)).toFixed(2)}cqi`
    return (
        <header>
            {/* Wordmark only, pinned black: the cover is white stock in both themes. */}
            <Logo.Wordmark color="black" className="h-5 w-auto @[200px]:h-6" />
            <p className="m-0 mt-1.5 whitespace-nowrap text-[11px] uppercase tracking-[0.14em] text-gray">
                Pocket guide to
            </p>
            <h3
                className="m-0 mt-1.5 font-bold leading-tight text-black [hyphens:none] [overflow-wrap:normal]"
                style={{ fontSize: `min(${TITLE_MAX}, ${fit})` }}
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
            <footer className="flex shrink-0 items-baseline justify-end gap-2 text-[11px] uppercase tracking-wider text-gray">
                {!volume.comingSoon && (
                    <span className="tabular-nums">
                        {count} {count === 1 ? 'guide' : 'guides'}
                    </span>
                )}
            </footer>
        </Frame>
    )
}

export default function Cover({ volume, count, placement, to, onOpen }: CoverProps): JSX.Element {
    const posthog = usePostHog()

    // Unwritten volumes aren't links – there's nothing behind them yet.
    if (volume.comingSoon) {
        return <CoverBody volume={volume} count={count} />
    }

    const trackCoverClick = () => {
        posthog?.capture('pocket_guide_interaction', {
            kind: 'cover_click',
            volume: volume.id,
            placement,
        })
        onOpen?.()
    }

    return (
        <Link
            to={to ?? pocketGuideUrl(volume)}
            data-pocket-guide-cover
            onClick={(event) => {
                trackCoverClick()
                void openPocketGuide(event, event.currentTarget as HTMLElement, to ?? pocketGuideUrl(volume))
            }}
            // Perspective lives on the link so the hover tilt reads as picking the book up.
            className="group relative block no-underline [perspective:1200px]"
        >
            <div aria-hidden="true" className="absolute inset-0 rounded-sm border border-light bg-white p-5 shadow-lg">
                <div className="flex h-full flex-col justify-between border-l border-gray/20 py-3 pl-4">
                    {Array.from({ length: 12 }, (_, line) => (
                        <div key={line} className="h-1 shrink-0 rounded bg-gray/20 shadow-sm last:w-2/3" />
                    ))}
                </div>
            </div>
            {/* Hinged at the spine: the fore-edge lifts toward you like a cover opening, and the
                spine edge stays planted instead of foreshortening away. */}
            <div
                data-pocket-guide-cover-face
                className="relative [transform-origin:left_center] [transform-style:preserve-3d] [backface-visibility:hidden]"
            >
                <div className="transition-transform duration-300 ease-out [transform-origin:left_center] [transform-style:preserve-3d] motion-safe:group-hover:[transform:rotateY(-9deg)_translateY(-4px)] motion-safe:group-hover:drop-shadow-2xl">
                    <CoverBody volume={volume} count={count} />
                </div>
            </div>
        </Link>
    )
}
