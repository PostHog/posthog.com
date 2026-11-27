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

/** One volume as its cover seen edge-on: white stock and the cover's spine color, so the row matches the book it opens. */
function SpineCard({ volume, count }: BookProps): JSX.Element {
    const Art = volumeArt(volume.id)
    const chapterCount = volume.comingSoon ? 'Soon' : `${count} ${count === 1 ? 'chapter' : 'chapters'}`
    return (
        <article className="flex items-stretch overflow-hidden rounded-sm border border-light bg-white shadow-md dark:border-dark">
            <span aria-hidden="true" className={`w-2.5 shrink-0 bg-${volume.token}`} />
            <div className="flex min-w-0 flex-1 items-center gap-3 py-1.5 pl-3 pr-3">
                <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center">
                    {Art ? <Art size={40} /> : null}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <h3 className="m-0 truncate text-[15px] font-bold leading-tight text-black">{volume.title}</h3>
                    <p className="m-0 text-[10px] uppercase tracking-wider text-black/60 tabular-nums">
                        {chapterCount}
                    </p>
                </div>
            </div>
        </article>
    )
}

export default function Book(props: BookProps): JSX.Element {
    const posthog = usePostHog()

    // Unwritten volumes aren't links – there's nothing behind them yet.
    if (props.volume.comingSoon) {
        return (
            <li className="opacity-60">
                <SpineCard {...props} />
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
                    <SpineCard {...props} />
                </div>
            </Link>
        </li>
    )
}

export function BookShelf({ children }: { children: React.ReactNode }): JSX.Element {
    return <ul className="m-0 flex w-full list-none flex-col gap-2 p-0">{children}</ul>
}
