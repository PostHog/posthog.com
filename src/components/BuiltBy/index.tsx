import { TeamMemberLink } from 'components/TeamMember'
import React from 'react'

export default function BuiltBy({ people }: { people?: string[] }) {
    if (!people || !people.length) return null

    return (
        <div className="float-right mb-4 ml-4 flex flex-col gap-1 border-l border-primary pl-4 pb-0.5">
            <span className="text-[13px] md:text-sm opacity-70 flex md:mb-1">Built by:</span>
            <ul className="list-none !m-0 p-0 space-y-1.5">
                {people.map((name) => (
                    <li key={name}>
                        <TeamMemberLink name={name} photo />
                    </li>
                ))}
            </ul>
        </div>
    )
}
