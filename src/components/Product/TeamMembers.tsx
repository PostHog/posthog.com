import { TeamMember, teamQuery } from 'components/Team'
import { useStaticQuery } from 'gatsby'
import React from 'react'

export default function TeamMembers({ teamName }) {
    const { team } = useStaticQuery(teamQuery)

    const teamMembers = team.teamMembers.filter((teamMember) =>
        teamMember.teams.data.some(({ attributes: { name } }) => name === teamName)
    )
    const teamLength = teamMembers.length

    const pineapplePercentage =
        teamLength &&
        teamLength > 0 &&
        Math.round((teamMembers.filter(({ pineappleOnPizza }) => pineappleOnPizza).length / teamLength) * 100)

    return (
        <>
            {pineapplePercentage < 50 && (
                <p className="text-center text-sm">(Shockingly, this team prefers their pizza without pineapple.)</p>
            )}
            <ul className="list-none m-0 p-0 grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-20">
                {teamMembers.map((teamMember, index) => {
                    return <TeamMember key={index} {...teamMember} />
                })}
            </ul>
        </>
    )
}
