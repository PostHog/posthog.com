import React from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import { graphql, useStaticQuery } from 'gatsby'
import Link from 'components/Link'
import slugify from 'slugify'

interface PostQuoteProps {
    title?: string
    subtitle?: string
    quote: string
    authorName: string
}

const PostQuote: React.FC<PostQuoteProps> = ({
    title = 'A word from your instructor',
    subtitle = 'Marius is really passionate about Post-its.',
    quote,
    authorName,
}) => {
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
                    companyRole
                    location
                    country
                    startDate
                    color
                    leadTeams {
                        data {
                            id
                        }
                    }
                    teams {
                        data {
                            attributes {
                                name
                            }
                        }
                    }
                }
            }
        }
    `)

    const person = nodes.find(
        ({ firstName, lastName }: { firstName: string; lastName: string }) =>
            `${firstName} ${lastName}`.toLowerCase() === authorName.toLowerCase()
    )

    if (!person) {
        return null
    }

    const { firstName, lastName, country, startDate, squeakId, avatar, teams, leadTeams, color } = person
    const teamName = teams?.data?.[0]?.attributes?.name
    const isTeamLead = leadTeams.data.length > 0
    const teamURL = `/teams/${slugify(teamName, { lower: true })}`

    return (
        <div className="px-4 xl:px-8 mb-8">
            <h2 className="text-3xl md:text-4xl text-center mb-1">{title}</h2>
            <p className="text-center text-lg">{subtitle}</p>
            <div className="max-w-7xl mx-auto flex flex-col-reverse gap-8 md:gap-12 items-center md:flex-row p-6 md:p-8 bg-white dark:bg-accent-dark rounded shadow-lg dark:border dark:border-dark">
                <aside className="w-full md:w-auto min-w-48 max-w-full text-center">
                    <div className="relative inline-block border-t md:border-t-0 md:border-r border-light dark:border-dark px-4 md:pr-12 pt-8 lg:pt-0">
                        <a href={`/community/profiles/${squeakId}`} className="flex flex-col gap-2 items-center">
                            <div className="border-2 border-light dark:border-dark p-0.5 bg-white dark:bg-dark rounded-full">
                                <div
                                    className={`size-24 rounded-full overflow-hidden mx-auto ${
                                        color ? `bg-${color}` : 'bg-orange'
                                    }`}
                                >
                                    {avatar?.formats?.thumbnail?.url ? (
                                        <img
                                            src={avatar.formats.thumbnail.url}
                                            alt={`${firstName} ${lastName}`}
                                            className="size-24"
                                        />
                                    ) : (
                                        <CloudinaryImage
                                            alt=""
                                            width={24}
                                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/pages-content/images/hog-9.png"
                                            className="size-24"
                                        />
                                    )}
                                </div>
                            </div>
                            <span className="font-semibold">{[firstName, lastName].filter(Boolean).join(' ')}</span>
                        </a>

                        <div className="text-sm">
                            <div>{person.companyRole && `${person.companyRole}`}</div>
                            <div className="text-[13px]">
                                <span className="opacity-75">{isTeamLead ? 'Team lead, ' : ''}</span>
                                <Link to={teamURL}>{teamName} Team</Link>
                            </div>
                        </div>

                        <div>
                            <p className="m-0 flex justify-center items-end space-x-1 mt-2 opacity-60">
                                <span className="text-xs leading-none">
                                    Joined in{' '}
                                    {new Date(startDate).toLocaleDateString('en-US', {
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </span>
                            </p>
                        </div>
                    </div>
                </aside>
                <div className="flex-1 [&_p]:text-lg [&_p]:mb-3 [&_p:last-child]:mb-0 md:columns-2 gap-8">
                    {quote.split('\n\n').map((paragraph, index) => (
                        <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PostQuote
