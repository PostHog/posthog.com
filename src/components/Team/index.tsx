import { MDXProvider } from '@mdx-js/react'
import { GithubIcon } from 'components/GithubIcon'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
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
                    frontmatter: { headshot, jobTitle, name, country, github },
                } = teamMember
                const title = `${name}, ${jobTitle}`
                const image = getImage(headshot)
                return (
                    <li key={id}>
                        <div className="team-row">
                            <div className="team-left-text">
                                <h3>{title}</h3>
                                <GithubIcon username={github} />
                                <div className="team-left-bio">
                                    <MDXProvider components={shortcodes}>
                                        <MDXRenderer>{body}</MDXRenderer>
                                    </MDXProvider>
                                </div>
                            </div>

                            <div className="team-center-space"></div>

                            <div className="team-right-image relative">
                                <GatsbyImage image={image} alt={title} title={title} />
                                <span className="absolute mt-8 top-2 right-2 text-4xl sm:text-4xl">{country}</span>
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
                    country
                    github
                }
            }
        }
    }
`
