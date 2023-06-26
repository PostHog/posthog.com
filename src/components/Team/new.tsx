import { MDXProvider } from '@mdx-js/react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { kebabCase } from 'lib/utils'
import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import { shortcodes } from '../../mdxGlobalComponents'
import Link from 'components/Link'
import Layout from 'components/Layout'

export default function TeamNew() {
    const {
        team: { teamMembers },
    } = useStaticQuery(query)
    return (
        <Layout>
            <ul className="list-none py-8 m-0 flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-10 max-w-screen-2xl mx-auto px-8 2xl:px-4 3xl:p-0">
                {teamMembers.map((teamMember) => {
                    const {
                        avatar: { url: avatar },
                        lastName,
                        firstName,
                        companyRole,
                        country,
                        pronouns,
                    } = teamMember
                    const name = [firstName, lastName].filter(Boolean).join(' ')
                    const nameAndPronouns = pronouns ? `${name} (${pronouns})` : name
                    const title = `${nameAndPronouns}, ${companyRole}`
                    return (
                        <li
                            key={name}
                            className="bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded"
                        >
                            <Link
                                to="#"
                                className="flex justify-between h-full text-primary dark:text-primary-dark hover:text-primary dark:hover:text-primary-dark"
                            >
                                <div className="flex flex-col justify-between px-6 py-4">
                                    <div>
                                        <div className="flex">
                                            <h3
                                                className="mb-0 text-lg"
                                                id={kebabCase(name) + '-' + kebabCase(companyRole)}
                                            >
                                                {name}
                                            </h3>
                                        </div>
                                        <p className="text-primary/50 text-sm dark:text-primary-dark/50">
                                            {companyRole}
                                        </p>
                                    </div>

                                    <span className="flex items-center gap-2">
                                        {country === 'world' ? '🌎' : <ReactCountryFlag svg countryCode={country} />}
                                        {country === 'world' ? 'Planet earth' : <span>{country}</span>}
                                    </span>
                                </div>

                                <figure className="m-0 -mt-8 p-0">
                                    <img src={avatar} className="w-[200px]" />
                                </figure>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </Layout>
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
                lastName
                firstName
                companyRole
                country
                pronouns
            }
        }
    }
`
