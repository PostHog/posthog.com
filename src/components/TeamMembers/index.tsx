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
        .filter((node) => node?.frontmatter?.team?.some((teamName) => teamName === team))
        .sort((l, r) => (l.frontmatter.teamLead ? -1 : r.frontmatter.teamLead ? 1 : 0))
    if (!teamMembers || teamMembers.length <= 0) return null

    return (
        <>
            <h4>Team members</h4>
            <ul className="list-none m-0 p-0 grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {teamMembers.map((member) => {
                    const { name, headshot, jobTitle, teamLead, country } = member?.frontmatter
                    return (
                        <li className="!m-0 flex space-x-4 items-center py-4" key={name}>
                            <figure className="mb-0">
                                <ContributorImage image={getImage(headshot)} />
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
                                    {teamLead && (
                                        <span className="inline-block border-2 border-red/50 rounded-sm text-[12px] px-2 py-1 !leading-none font-semibold text-red bg-white">
                                            Team lead
                                        </span>
                                    )}
                                </span>
                                <p className="!text-sm !mb-0 opacity-50 !leading-none !mt-1">{jobTitle}</p>
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
        team: allMdx(filter: { fields: { slug: { regex: "/^/team/" } } }, sort: { fields: frontmatter___startDate }) {
            nodes {
                frontmatter {
                    headshot {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                    team
                    jobTitle
                    name
                    country
                    github
                    teamLead
                }
            }
        }
    }
`
