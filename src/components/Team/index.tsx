import { MDXProvider } from '@mdx-js/react'
import { GithubIcon } from 'components/GithubIcon'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { kebabCase } from 'lib/utils'
import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import { shortcodes } from '../../mdxGlobalComponents'
import Markdown from 'components/Squeak/components/Markdown'
import { GitHub } from 'components/Icons'
import Link from 'components/Link'

export default function Team() {
    const {
        team: { teamMembers },
    } = useStaticQuery(query)
    return (
        <ul className="list-none p-0 m-0">
            {teamMembers.map((teamMember) => {
                const {
                    avatar: { url: avatar },
                    biography,
                    lastName,
                    firstName,
                    companyRole,
                    country,
                    pronouns,
                    github,
                } = teamMember
                const name = [firstName, lastName].filter(Boolean).join(' ')
                const nameAndPronouns = pronouns ? `${name} (${pronouns})` : name
                const title = `${nameAndPronouns}, ${companyRole}`
                return (
                    <li key={name}>
                        <div className="team-row">
                            <div className="team-left-text">
                                <h3 id={kebabCase(name) + '-' + kebabCase(companyRole)}>{title}</h3>
                                <Link className="!text-black dark:!text-white opacity-70 hover:opacity-90" to={github}>
                                    <GitHub />
                                </Link>
                                <div className="team-left-bio">
                                    <Markdown>{biography}</Markdown>
                                </div>
                            </div>

                            <div className="team-center-space"></div>

                            <div className="team-right-image relative">
                                <img src={avatar} />
                                <span className="absolute mt-8 top-2 right-2 text-4xl sm:text-4xl">
                                    {country === 'world' ? '🌎' : <ReactCountryFlag svg countryCode={country} />}
                                </span>
                            </div>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

const query = graphql`
    query TeamQuery {
        team: allSqueakProfile(
            filter: { teams: { data: { elemMatch: { id: { ne: null } } } } }
            sort: { fields: startDate, order: ASC }
        ) {
            teamMembers: nodes {
                avatar {
                    url
                }
                biography
                lastName
                firstName
                companyRole
                country
                pronouns
                github
            }
        }
    }
`
