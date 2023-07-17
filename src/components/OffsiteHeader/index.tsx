import React from 'react'

interface OffsiteHeaderProps {
    badge?: string
    location: string
    date: string
    team?: string
}

export const OffsiteHeader = ({ badge, location, date, team }: OffsiteHeaderProps) => {
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
