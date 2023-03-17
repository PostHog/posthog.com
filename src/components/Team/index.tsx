import { MDXProvider } from '@mdx-js/react'
import { GithubIcon } from 'components/GithubIcon'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { kebabCase } from 'lib/utils'
import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import { shortcodes } from '../../mdxGlobalComponents'

export default function Team() {
    const {
        team: { teamMembers },
    } = useStaticQuery(query)
    return (
        <ul className="list-none p-0 m-0">
            {teamMembers.map((teamMember) => {
                const {
                    id,
                    body,
                    frontmatter: { headshot, jobTitle, name, pronouns, country, github },
                } = teamMember
                const nameAndPronouns = pronouns ? `${name} (${pronouns})` : name
                const title = `${nameAndPronouns}, ${jobTitle}`
                const image = getImage(headshot)
                return (
                    <li key={id}>
                        <div className="team-row">
                            <div className="team-left-text">
                                <h3 id={kebabCase(name) + '-' + kebabCase(jobTitle)}>{title}</h3>
                                <GithubIcon username={github} />
                                <div className="team-left-bio">
                                    <MDXProvider components={shortcodes}>
                                        <MDXRenderer>{body}</MDXRenderer>
                                    </MDXProvider>
                                </div>
                            </div>

                            <div className="team-center-space"></div>

                            <div className="team-right-image relative">
                                <GatsbyImage
                                    objectFit="contain"
                                    className="w-full"
                                    image={image}
                                    alt={title}
                                    title={title}
                                />
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
        team: allMdx(filter: { fields: { slug: { regex: "/^/team/" } } }, sort: { fields: frontmatter___startDate }) {
            teamMembers: nodes {
                id
                body
                frontmatter {
                    headshot {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                    jobTitle
                    name
                    pronouns
                    country
                    github
                }
            }
        }
    }
`
