import { graphql, useStaticQuery } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import { ContributorImage } from 'components/PostLayout/Contributors'

export default function TeamMembers({ team }: { team: string }) {
    const {
        team: { nodes },
    } = useStaticQuery(query)
    const teamMembers = nodes
        .filter((node) => node?.teams?.data?.some(({ attributes: { name: teamName } }) => teamName === team))
        .sort((l, r) =>
            l.leadTeams?.data?.some(({ attributes: { name: teamName } }) => teamName === team)
                ? -1
                : r.leadTeams?.data?.some(({ attributes: { name: teamName } }) => teamName === team)
                ? 1
                : 0
        )
    if (!teamMembers || teamMembers.length <= 0) return null

    return (
        <>
            <h4>Team members</h4>
            <ul className="list-none m-0 p-0 grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {teamMembers.map((member) => {
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
                        <li className="!m-0 flex space-x-4 items-center py-4" key={name}>
                            <figure className="mb-0">
                                <ContributorImage image={avatar} />
                            </figure>
                            <div>
                                <span className="flex items-center md:flex-row space-x-2">
                                    <p className="!text-lg !font-bold !m-0 !leading-none">{name}</p>
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
                                <p className="!text-sm !mb-0 opacity-50 !leading-none !mt-1">{companyRole}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

const query = graphql`
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
            }
        }
    }
`
