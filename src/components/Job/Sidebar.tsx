import React from 'react'
import Tooltip from 'components/Tooltip'
import { kebabCase } from 'lib/utils'
import Link from 'components/Link'
import ReactCountryFlag from 'react-country-flag'
import { ContributorImageSmall } from 'components/PostLayout/Contributors'
import SidebarSection from 'components/PostLayout/SidebarSection'

import { IconPineapple, IconPizza, IconThumbsDown, IconThumbsUp } from '@posthog/icons'

interface ITeam {
    frontmatter: {
        headshot: string
        name: string
        country: string
        jobTitle: string
        pineappleOnPizza: boolean
    }
}

interface ISidebarProps {
    team?: ITeam[]
    teamLead?: ITeam
    teamName?: string
    teamSlug: string
}

export const pineappleText = (percentage: number) => {
    if (percentage === 50) return 'This team is evenly split on whether pineapple belongs on pizza'
    if (percentage < 50) return 'Shockingly, this team prefers their pizza without pineapple'
    return (
        <>
            <strong>{percentage}%</strong> of this team prefer pineapple on pizza
        </>
    )
}

export default function Sidebar({ team, teamLead, teamName, teamSlug }: ISidebarProps) {
    const teamLength = team?.length
    if (!team || !teamLength) return null
    const pineapplePercentage =
        teamLength &&
        teamLength > 0 &&
        Math.round((team.filter(({ pineappleOnPizza }) => pineappleOnPizza).length / teamLength) * 100)
    const teamLeadName = teamLead && [teamLead.firstName, teamLead.lastName].filter(Boolean).join(' ')
    return (
        <>
            <SidebarSection title="Meet your team" className="-mt-2">
                <h3 className="font-semibold text-sm m-0 mb-2">
                    <Link
                        to={teamSlug}
                        className="flex w-full justify-between items-center group leading-none rounded p-2 -mx-2 -my-1 hover:bg-gray-accent/50 
                    relative
                    active:top-[0.5px]
                    active:scale-[.98]"
                    >
                        <span>Team {teamName}</span>
                        <span className="opacity-0 group-hover:opacity-100 text-black/30 dark:text-white text-lg leading-none">
                            &rarr;
                        </span>
                    </Link>
                </h3>
                <ul className="list-none m-0 p-0 flex flex-wrap">
                    {team.map(({ avatar: { url: avatar }, firstName, lastName, country, companyRole, squeakId }) => {
                        const name = [firstName, lastName].filter(Boolean).join(' ')
                        return (
                            <li
                                key={name}
                                className="first:-ml-0 -ml-2 transition-all relative hover:scale-[1.2] active:scale-[1.15] active:top-[.5px] mb-1 hover:z-20 rounded-full 
                                [&:nth-child(4n+1)]:bg-orange
                                [&:nth-child(4n+2)]:bg-blue 
                                [&:nth-child(4n+3)]:bg-red 
                                [&:nth-child(4n+4)]:bg-yellow 
                                "
                            >
                                <Link to={`/community/profiles/${squeakId}`}>
                                    <Tooltip
                                        placement="top"
                                        className="whitespace-nowrap"
                                        content={() => (
                                            <div className="flex space-x-1 items-center">
                                                <span className="text-xs">{name}</span>
                                                <span className="w-[14px] flex">
                                                    <ReactCountryFlag width={14} svg countryCode={country} />
                                                </span>
                                            </div>
                                        )}
                                    >
                                        <span className="relative">
                                            <ContributorImageSmall
                                                name={name}
                                                image={avatar}
                                                className="!w-10 !h-10 border-[2.5px] border-solid border-white dark:border-primary"
                                                imgClassName=""
                                            />
                                        </span>
                                    </Tooltip>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </SidebarSection>

            {teamLead && (
                <SidebarSection title="Team lead" className="-mt-2">
                    <Link
                        to={`/community/profiles/${teamLead?.squeakId}`}
                        className="flex space-x-2 items-center rounded p-1 -mx-1 -mt-1 hover:bg-gray-accent/50 
                    relative
                    active:top-[0.5px]
                    active:scale-[.98]"
                    >
                        <ContributorImageSmall
                            className="w-[40px] h-[40px] bg-orange border-2 border-white dark:border-primary border-solid"
                            image={teamLead?.avatar?.url}
                            name={teamLeadName}
                        />
                        <p className="author text-base font-semibold m-0 text-[15px]">{teamLeadName}</p>
                        <ReactCountryFlag svg countryCode={teamLead?.country} />
                    </Link>
                </SidebarSection>
            )}

            <SidebarSection title="Pineapple on pizza?" className="-mt-2">
                <div className="space-x-2 flex items-center mb-4 text-lg font-semibold">
                    <span className="w-8 h-8 relative top-[-1px] -mr-1">
                        <IconPineapple />
                    </span>
                    <span>+</span>
                    <span className="w-7 h-7 relative top-[1px]">
                        <IconPizza />
                    </span>
                    <span>=</span>
                    {pineapplePercentage >= 50 ? (
                        <IconThumbsUp className="w-8 h-8 fill-green" />
                    ) : (
                        <IconThumbsDown className="w-8 h-8 fill-red" />
                    )}
                </div>
                <p className="text-sm -mt-1 opacity-70 leading-tight mb-3">{pineappleText(pineapplePercentage)}</p>
                <div className="h-2 w-full bg-white dark:bg-gray-accent-dark rounded-md relative overflow-hidden">
                    <div
                        style={{ width: `${pineapplePercentage}%` }}
                        className={`${pineapplePercentage >= 50 ? 'bg-[#6AA84F]' : 'bg-red'} absolute inset-0 h-full`}
                    />
                </div>
            </SidebarSection>
        </>
    )
}
