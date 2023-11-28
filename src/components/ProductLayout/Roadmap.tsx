import { CallToAction } from 'components/CallToAction'
import { pineappleText } from 'components/Job/Sidebar'
import { ContributorImageSmall } from 'components/PostLayout/Contributors'
import TeamRoadmap from 'components/TeamRoadmap'
import { graphql, useStaticQuery } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import slugify from 'slugify'
import { SectionWrapper } from './Section'
import { IRoadmap } from './types'

export default function Roadmap({ subtitle, team }: IRoadmap) {
    const {
        team: { nodes },
    } = useStaticQuery(graphql`
        query {
            team: allSqueakProfile(
                filter: { teams: { data: { elemMatch: { id: { ne: null } } } } }
                sort: { fields: startDate, order: ASC }
            ) {
                nodes {
                    avatar {
                        url
                    }
                    teams {
                        data {
                            attributes {
                                name
                            }
                        }
                    }
                    companyRole
                    firstName
                    lastName
                    country
                    github
                    leadTeams {
                        data {
                            attributes {
                                name
                            }
                        }
                    }
                    pineappleOnPizza
                }
            }
        }
    `)
    const teamMembers = nodes
        .filter((node) => node?.teams?.data?.some(({ attributes: { name: teamName } }) => teamName === team))
        .sort((l, r) =>
            l.leadTeams?.data?.some(({ attributes: { name: teamName } }) => teamName === team)
                ? -1
                : r.leadTeams?.data?.some(({ attributes: { name: teamName } }) => teamName === team)
                ? 1
                : 0
        )
    const teamLength = teamMembers?.length
    if (!teamMembers || !teamLength) return null
    const pineapplePercentage =
        teamLength &&
        teamLength > 0 &&
        Math.round((teamMembers.filter(({ pineappleOnPizza }: any) => pineappleOnPizza).length / teamLength) * 100)
    const teamURL = `/handbook/small-teams/${slugify(team, { lower: true })}`
    return (
        <div id="roadmap">
            <SectionWrapper>
                <div className="flex items-start md:space-y-0 space-y-4 md:space-x-8 md:flex-row flex-col">
                    <div className="flex-1">
                        <h3 className="m-0">Roadmap</h3>
                        <p className="">{subtitle}</p>
                        <TeamRoadmap team={team} />
                    </div>
                    <div className="basis-[350px]">
                        <h4 className="m-0">The {team.toLowerCase()} team</h4>

                        <p className="text-sm mb-2">Here are the people bringing you {team.toLowerCase()}. </p>

                        <p className="text-xs mb-4 opacity-75">{pineappleText(pineapplePercentage)}</p>
                        <ul className="list-none m-0 mb-4 p-0 space-y-2 md:space-y-0">
                            {teamMembers.map((member: any) => {
                                const {
                                    firstName,
                                    lastName,
                                    avatar: { url: avatar },
                                    companyRole,
                                    leadTeams,
                                    country,
                                } = member
                                const name = [firstName, lastName].filter(Boolean).join(' ')
                                return (
                                    <li className="flex space-x-2 items-center py-1" key={name}>
                                        <figure className="mb-0">
                                            <ContributorImageSmall className="w-[45px] h-[45px]" image={avatar} />
                                        </figure>
                                        <div>
                                            <span className="flex items-center md:flex-row space-x-2">
                                                <p className="text-base font-bold !m-0 leading-none">{name}</p>
                                                {country && (
                                                    <span className="!leading-none">
                                                        {country === 'world' ? (
                                                            '🌎'
                                                        ) : (
                                                            <ReactCountryFlag svg countryCode={country} />
                                                        )}
                                                    </span>
                                                )}
                                                {leadTeams?.data?.some(
                                                    ({ attributes: { name: teamName } }) => teamName === team
                                                ) && (
                                                    <span className="inline-block border-2 border-red/50 rounded-sm text-[12px] px-2 py-1 !leading-none font-semibold text-red bg-white">
                                                        Team lead
                                                    </span>
                                                )}
                                            </span>
                                            <p className="!text-sm !mb-0 opacity-50 !leading-none">{companyRole}</p>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>

                        <CallToAction size="sm" to={teamURL} type="outline">
                            Learn more about this team
                        </CallToAction>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    )
}
