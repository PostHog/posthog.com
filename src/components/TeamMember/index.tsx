import { graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

export const TeamMemberLink = (person) => {
    const { firstName, lastName, squeakId, avatar, photo = false } = person ?? {}
    return (
        <a href={person && `/community/profiles/${squeakId}`}>
            <span className="inline-flex items-center gap-1 p-1 border border-light hover:border-bg-dark/50 dark:border-dark dark:hover:border-bg-light/50 rounded-full">
                {photo && (
                    <div className="h-6 md:h-8 shrink-0 rounded-full overflow-hidden">
                        {person ? (
                            <img src={avatar?.formats?.thumbnail?.url} alt="" className="w-6 md:w-8 bg-red" />
                        ) : (
                            <StaticImage
                                alt=""
                                width={40}
                                src="../../pages-content/images/hog-9.png"
                                className="w-6 md:w-8 bg-red"
                            />
                        )}
                    </div>
                )}
                <span className="!text-sm text-red dark:text-yellow font-semibold inline-flex px-1">
                    {person ? [firstName, lastName].filter(Boolean).join(' ') : name}
                </span>
            </span>
        </a>
    )
}

export default function TeamMember({ name, photo }) {
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

    const person = nodes.find(
        ({ firstName, lastName }) => `${firstName} ${lastName}`.toLowerCase() === name.toLowerCase()
    )

    return person ? <TeamMemberLink {...person} photo={photo} /> : null
}
