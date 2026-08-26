import Link from 'components/Link'
import React from 'react'

import { PocketGuideVolume } from '../../constants/pocketGuides'
import usePostHog from '../../hooks/usePostHog'

interface BookProps {
    volume: PocketGuideVolume
    /** Guides inside it (the 101 isn't counted), printed the way a series prints its contents. */
    count: number
}

/** One volume as a spine. Fixed height across the series – the count is printed, not implied by size. */
function Spine({ volume, count }: BookProps): JSX.Element {
    // Title on its own line – sharing a row with the meta left it ~70px, which clipped every title.
    return (
        <article className="relative flex flex-col gap-0.5 overflow-hidden rounded-sm border border-primary bg-primary py-3 pl-5 pr-4 shadow-sm">
            <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-1.5 bg-${volume.token}`} />
            <h3 className="m-0 truncate text-sm font-bold leading-tight text-primary">{volume.title}</h3>
            <p className="m-0 flex items-baseline gap-2 text-[10px] uppercase tracking-[0.16em] text-secondary tabular-nums">
                <span>Vol. {volume.volume}</span>
                <span aria-hidden="true">&middot;</span>
                <span>{volume.comingSoon ? 'Soon' : `${count} ${count === 1 ? 'guide' : 'guides'}`}</span>
            </p>
        </article>
    )
}

export default function Book(props: BookProps): JSX.Element {
    const posthog = usePostHog()

    // Unwritten volumes aren't links – there's nothing behind them yet.
    if (props.volume.comingSoon) {
        return (
            <li className="opacity-60">
                <Spine {...props} />
            </li>
        )
    }

    return (
        <li>
            <Link
                to={`/pocket-guides/${props.volume.id}`}
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
                    <Spine {...props} />
                </div>
            </Link>
        </li>
    )
}

/** The shelf. The width cap stops volumes stretching into slivers when the index stacks. */
export function BookShelf({ children }: { children: React.ReactNode }): JSX.Element {
    return <ul className="m-0 flex w-full max-w-[420px] list-none flex-col gap-2 p-0">{children}</ul>
}
