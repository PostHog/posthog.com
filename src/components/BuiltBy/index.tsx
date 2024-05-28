import { graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
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
            <ul className="list-none m-0 p-0">
                {people.map((name) => {
                    const person = nodes.find(
                        ({ firstName, lastName }) => `${firstName} ${lastName}`.toLowerCase() === name.toLowerCase()
                    )
                    const { firstName, lastName, squeakId, avatar } = person ?? {}
                    return (
                        <li key={name}>
                            <a href={person && `/community/profiles/${squeakId}`}>
                                <span className="inline-flex items-center gap-1 p-1 border border-light hover:border-bg-dark/50 dark:border-dark dark:hover:border-bg-light/50 rounded-full">
                                    <div className="h-6 md:h-8 shrink-0 rounded-full overflow-hidden">
                                        {person ? (
                                            <img
                                                src={avatar?.formats?.thumbnail?.url}
                                                alt=""
                                                className="w-6 md:w-8 bg-yellow"
                                            />
                                        ) : (
                                            <StaticImage
                                                alt=""
                                                width={40}
                                                src="../../pages-content/images/hog-9.png"
                                                className="w-6 md:w-8 bg-yellow"
                                            />
                                        )}
                                    </div>
                                    <span className="text-sm md:text-base text-red dark:text-yellow font-semibold inline-flex px-1">
                                        {person ? [firstName, lastName].filter(Boolean).join(' ') : name}
                                    </span>
                                </span>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
