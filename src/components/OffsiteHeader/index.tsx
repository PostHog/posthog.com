import React from 'react'

export function OffsiteHeader({
    badge,
    location,
    date,
    team,
}: {
    badge?: string
    location: string
    date: string
    team?: string
}): JSX.Element {
    return (
        <header className="text-center pb-12">
            {badge && (
                <figure>
                    <img className="mx-auto w-[175px]" alt={`${date} offsite to ${location}`} src={badge} />
                </figure>
            )}

            <h1 className="text-5xl">{location}</h1>
            <div className="opacity-70">
                {date} {team && <> &bull; {team}</>}
            </div>
        </header>
    )
}
