import { TeamMemberLink } from 'components/TeamMember'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

export default function BuiltBy({ people }) {
    const {
        profiles: { nodes },
    } = useStaticQuery(graphql`
        {
            profiles: allSqueakProfile {
                nodes {
                    avatar {
                        formats {
                            thumbnail {
                                url
                            }
                        }
                    }
                    firstName
                    lastName
                    squeakId
                }
            }
        }
    `)

    return (
        <div className="float-right mb-4 ml-4 flex flex-col gap-1 border-l border-light dark:border-dark pl-4 pb-0.5">
            <span className="text-[13px] md:text-sm opacity-70 flex md:mb-1">Built by:</span>
            <ul className="list-none !m-0 p-0 [&_li:nth-child(2)_img]:bg-blue [&_li:nth-child(3)_img]:bg-yellow [&_li:nth-child(4)_img]:bg-teal space-y-1.5">
                {people.map((name) => {
                    const person = nodes.find(
                        ({ firstName, lastName }) => `${firstName} ${lastName}`.toLowerCase() === name.toLowerCase()
                    )
                    if (!person) return null
                    return (
                        <li key={name}>
                            <TeamMemberLink {...person} photo />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
