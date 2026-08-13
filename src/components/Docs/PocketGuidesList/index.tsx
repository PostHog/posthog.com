import React from 'react'
import Link from 'components/Link'
import usePocketGuides from '../../../hooks/usePocketGuides'

interface PocketGuidesListProps {
    /** Rows shown per volume before the "all N" link takes over. */
    perVolume?: number
    className?: string
}

// Pocket guide use cases grouped by volume. See README.md for the editorial rules and gotchas.
export const PocketGuidesList = ({ perVolume = 3, className = '' }: PocketGuidesListProps): JSX.Element | null => {
    // Filtering on count rather than `comingSoon` turns a volume's row on when its first guide merges.
    const volumes = usePocketGuides().filter((volume) => volume.count > 0)

    if (volumes.length === 0) {
        return null
    }

    return (
        <div data-scheme="primary" className={`flex flex-col gap-5 ${className}`}>
            {volumes.map((volume) => (
                <div key={volume.id}>
                    <div className="flex items-baseline justify-between gap-4 mb-1">
                        {/* Neutral, not the volume token – that colour reads badly on the frosted background at this size. */}
                        <Link
                            to={volume.url}
                            state={{ newWindow: true }}
                            className="text-xs font-semibold uppercase tracking-wide text-secondary hover:underline"
                        >
                            {volume.title}
                        </Link>
                        {/* Only once there's more than we show – "All 3 →" above three rows is noise. */}
                        {volume.count > perVolume && (
                            <Link
                                to={volume.url}
                                state={{ newWindow: true }}
                                className="shrink-0 text-xs text-secondary hover:underline"
                            >
                                All {volume.count} &rarr;
                            </Link>
                        )}
                    </div>
                    {/* auto-fill: widening adds a column instead of stretching each card. */}
                    <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-3 p-0">
                        {volume.guides.slice(0, perVolume).map((guide) => (
                            <li key={guide.url} className="m-0">
                                {/* border-l-4 sets width only, so the safelisted `border-<token>` supplies the colour. */}
                                <Link
                                    to={guide.url}
                                    state={{ newWindow: true }}
                                    className={`group block h-full rounded border-l-4 border-${volume.token} bg-accent p-3 transition-colors hover:bg-primary`}
                                >
                                    <span className="block text-sm font-semibold leading-tight text-primary group-hover:underline">
                                        {guide.title}
                                    </span>
                                    {guide.subtitle && (
                                        <span className="mt-1 block text-sm leading-tight text-secondary">
                                            {guide.subtitle}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default PocketGuidesList
