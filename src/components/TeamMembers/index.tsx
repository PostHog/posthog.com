import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import { ContributorImage } from 'components/PostLayout/Contributors'
import Link from 'components/Link'

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
                        squeakId,
                    } = member
                    const name = [firstName, lastName].filter(Boolean).join(' ')
                    return (
                        <li className="!m-0" key={name}>
                            <Link
                                className="!text-inherit flex space-x-4 items-center py-2 relative active:top-[1px] active:scale-[.99] transition-all px-4 hover:bg-accent dark:hover:bg-accent-dark rounded h-full"
                                to={`/community/profiles/${squeakId}`}
                            >
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
                            </Link>
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
                squeakId
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
