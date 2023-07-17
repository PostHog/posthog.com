import React from 'react'

interface OffsiteHackathonsProps {
    children: JSX.Element[]
}

export const OffsiteHackathons = ({ children }: OffsiteHackathonsProps) => {
    return (
        <>
            <h3 className="max-w-4xl text-center mx-auto">Hackathon projects</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 text-center items-center max-w-4xl mx-auto gap-1 pb-8">
                {children}
            </div>
        </>
    )
}
