import React from 'react'
import Tooltip from 'components/Tooltip'
import { kebabCase } from 'lib/utils'
import Link from 'components/Link'
import ReactCountryFlag from 'react-country-flag'
import { ContributorImageSmall } from 'components/PostLayout/Contributors'
import SidebarSection from 'components/PostLayout/SidebarSection'

import { IconPineapple, IconPizza, IconThumbsDown, IconThumbsUp } from '@posthog/icons'
import { Accordion } from 'components/Products/Accordion'
import slugify from 'slugify'

interface ISidebarProps {
    teams: any
}

export const PineappleText = (percentage: number) => {
    if (percentage === 50) return 'This team is evenly split on whether pineapple belongs on pizza'
    if (percentage < 50) return 'Shockingly, this team prefers their pizza without pineapple'
    return (
        <>
            <strong>{percentage}%</strong> of this team (correctly) agree pineapple belongs on pizza
        </>
    )
}

const Team = ({ profiles, leadProfiles, className = '' }) => {
    const teamLength = profiles?.data?.length
    const pineapplePercentage =
        teamLength &&
        teamLength > 0 &&
        Math.round(
            (profiles?.data?.filter(({ attributes: { pineappleOnPizza } }) => pineappleOnPizza).length / teamLength) *
                100
        )
    const teamLead = profiles?.data?.find(({ id }) => leadProfiles?.data?.[0]?.id === id)
    const teamLeadName = [teamLead?.attributes.firstName, teamLead?.attributes.lastName].filter(Boolean).join(' ')
    return (
        <div className={`${className} my-4`}>
            <ul className="list-none m-0 p-0 flex flex-wrap">
                {profiles?.data?.map(
                    ({
                        attributes: {
                            avatar: {
                                data: {
                                    attributes: { url: avatar },
                                },
                            },
                            firstName,
                            lastName,
                            country,
                        },
                        id,
                    }) => {
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
                                <Link to={`/community/profiles/${id}`}>
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
                    }
                )}
            </ul>

            {teamLead && (
                <SidebarSection title="Team lead">
                    <Link
                        to={`/community/profiles/${teamLead.id}`}
                        className="flex space-x-2 items-center rounded p-1 -mx-1 -mt-1 hover:bg-gray-accent/50 
                    relative
                    active:top-[0.5px]
                    active:scale-[.98]"
                    >
                        <ContributorImageSmall
                            className="w-[40px] h-[40px] bg-orange border-2 border-white dark:border-primary border-solid"
                            image={teamLead.attributes.avatar?.data?.attributes?.url}
                            name={teamLeadName}
                        />
                        <p className="author text-base font-semibold m-0 text-[15px]">{teamLeadName}</p>
                        <ReactCountryFlag svg countryCode={teamLead.attributes.country} />
                    </Link>
                </SidebarSection>
            )}

            <SidebarSection title="Pineapple on pizza?">
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
                <p className="text-sm -mt-1 opacity-70 leading-tight mb-3">{PineappleText(pineapplePercentage)}</p>
                <div className="h-2 w-full bg-white dark:bg-gray-accent-dark rounded-md relative overflow-hidden">
                    <div
                        style={{ width: `${pineapplePercentage}%` }}
                        className={`${pineapplePercentage >= 50 ? 'bg-[#6AA84F]' : 'bg-red'} absolute inset-0 h-full`}
                    />
                </div>
            </SidebarSection>
        </div>
    )
}

export default function Sidebar({ teams }: ISidebarProps) {
    if (!teams || teams.length <= 0) return null
    const multipleTeams = teams.length > 1

    return (
        <>
            <SidebarSection title={multipleTeams ? 'Teams hiring for this role' : 'Meet your team'} className="-mt-2">
                {multipleTeams ? (
                    teams.map((team) => (
                        <Accordion key={team.id} label={team.name}>
                            <Team {...team} className="space-y-4" />
                        </Accordion>
                    ))
                ) : (
                    <>
                        <h3 className="font-semibold text-sm m-0 mb-2">
                            <Link
                                to={`/teams/${slugify(teams[0].name, { lower: true })}`}
                                className="flex w-full justify-between items-center group leading-none rounded p-2 -mx-2 -my-1 hover:bg-gray-accent/50 
                    relative
                    active:top-[0.5px]
                    active:scale-[.98] -mb-3"
                            >
                                <span>Team {teams[0].name}</span>
                                <span className="opacity-0 group-hover:opacity-100 text-black/30 dark:text-white text-lg leading-none">
                                    &rarr;
                                </span>
                            </Link>
                        </h3>
                        <Team {...teams[0]} className="space-y-8" />
                    </>
                )}
            </SidebarSection>
        </>
    )
}
