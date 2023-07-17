import React from 'react'

interface OffsiteHackathonsItemProps {
    name: string
    url?: string
}

export const OffsiteHackathonsItem = ({ name, url }: OffsiteHackathonsItemProps) => {
    return (
        <>
            {url ? (
                <a
                    href={url}
                    className="block relative px-2 !py-2 rounded hover:!bg-gray-accent-light hover:scale-[1.01] hover:top-[-.5px] active:scale-[1] active:top-[.5px] !bg-none"
                >
                    {name}
                </a>
            ) : (
                <>{name}</>
            )}
        </>
    )
}
