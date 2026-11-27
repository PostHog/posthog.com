import Link from 'components/Link'
import React from 'react'

import { PocketGuideVolume, pocketGuideUrl } from '../../../constants/pocketGuides'
import usePostHog from '../../../hooks/usePostHog'

import { volumeArt } from './volumeArt'

interface BookProps {
    volume: PocketGuideVolume
    /** Count configured for this volume, printed the way a series prints its contents. */
    count: number
}

/** One volume as a card tinted in its series color, led by the hoggie from its cover. */
function ShelfCard({ volume, count }: BookProps): JSX.Element {
    const Art = volumeArt(volume.id)
    return (
        <article className="relative flex items-center gap-3 overflow-hidden rounded-sm border border-primary bg-primary py-2 pl-2 pr-4 shadow-sm">
            <span aria-hidden="true" className={`absolute inset-0 opacity-15 bg-${volume.token}`} />
            <span aria-hidden="true" className="relative flex size-11 shrink-0 items-center justify-center">
                {Art ? <Art size={44} /> : null}
            </span>
            <div className="relative flex min-w-0 flex-1 flex-col gap-0.5">
                <h3 className="m-0 truncate text-sm font-bold leading-tight text-primary">{volume.title}</h3>
                <p className="m-0 text-[10px] uppercase tracking-[0.16em] text-secondary tabular-nums">
                    {volume.comingSoon ? 'Soon' : `${count} ${count === 1 ? 'chapter' : 'chapters'}`}
                </p>
            </div>
            <span className="relative ml-auto text-2xl font-bold leading-none text-primary/40 tabular-nums">
                <span className="sr-only">Volume </span>
                {String(volume.volume).padStart(2, '0')}
            </span>
        </article>
    )
}

export default function Book(props: BookProps): JSX.Element {
    const posthog = usePostHog()

    // Unwritten volumes aren't links – there's nothing behind them yet.
    if (props.volume.comingSoon) {
        return (
            <li className="opacity-60">
                <ShelfCard {...props} />
            </li>
        )
    }

    return (
        <li>
            <Link
                to={pocketGuideUrl(props.volume)}
                state={{ newWindow: true }}
                className="group block no-underline"
                onClick={() =>
                    posthog?.capture('pocket_guide_interaction', {
                        kind: 'cover_click',
                        volume: props.volume.id,
                        placement: 'docs_index',
                    })
                }
            >
                {/* A small lift, not the cover-opening flip the face-out shelf uses. */}
                <div className="transition-transform duration-200 ease-out motion-safe:group-hover:scale-[1.03]">
                    <ShelfCard {...props} />
                </div>
            </Link>
        </li>
    )
}

/** The shelf. The width cap stops volumes stretching into slivers when the index stacks. */
export function BookShelf({ children }: { children: React.ReactNode }): JSX.Element {
    return <ul className="m-0 flex w-full max-w-[420px] list-none flex-col gap-2 p-0">{children}</ul>
}
