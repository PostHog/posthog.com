import { MDXProvider } from '@mdx-js/react'
import { GithubIcon } from 'components/GithubIcon'
import { countryCodeEmoji } from 'country-code-emoji'
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
        <ul className="list-none p-0 m-0 flex flex-col space-y-12 max-w-[1100px]">
            {teamMembers.map((teamMember) => {
                const {
                    id,
                    body,
                    frontmatter: { headshot, jobTitle, name, country, github },
                } = teamMember
                const title = `${name}, ${jobTitle}`
                const image = getImage(headshot)
                return (
                    <li
                        className="flex lg:flex-row flex-col-reverse lg:space-x-12 space-y-2 lg:space-y-0 space-y-reverse items-center"
                        key={id}
                    >
                        <div>
                            <h3>
                                {title}{' '}
                                <span className="ml-2">{country === 'world' ? '🌎' : countryCodeEmoji(country)}</span>
                            </h3>
                            <GithubIcon username={github} />
                            <div className="h-[350px] overflow-y-scroll">
                                <MDXProvider components={shortcodes}>
                                    <MDXRenderer>{body}</MDXRenderer>
                                </MDXProvider>
                            </div>
                        </div>
                        <div className="relative w-[250px] h-[250px] xl:w-[400px] xl:h-[400px] overflow-hidden rounded-full flex-shrink-0 bg-gray-accent-light dark:bg-gray-accent-dark">
                            <GatsbyImage
                                objectFit="contain"
                                objectPosition="top"
                                className="w-full"
                                image={image}
                                alt={title}
                                title={title}
                            />
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
                            gatsbyImageData(width: 400)
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
