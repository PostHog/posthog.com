import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import Tooltip from 'components/Tooltip'
import { graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import ReactCountryFlag from 'react-country-flag'
import Stickers from 'components/ProfileStickers'
import useTeam from 'hooks/useTeam'
import { IconCake } from '@posthog/icons'
import dayjs from 'dayjs'
import slugify from 'slugify'
import Link from 'components/Link'

const TeamMemberLink = (person) => {
    const { firstName, lastName, country, startDate, pineappleOnPizza, squeakId, avatar, teams, leadTeams, color } =
        person ?? {}

    const teamName = teams?.data?.[0]?.attributes?.name
    const isTeamLead = leadTeams.data.length > 0
    const teamURL = `/teams/${slugify(teamName, { lower: true })}`

    return (
        <div className="relative inline-block border-t md:border-t-0 md:border-r border-light dark:border-dark px-4 md:pr-12 pt-8 lg:pt-0">
            <a href={person && `/community/profiles/${squeakId}`} className="flex flex-col gap-2 items-center">
                <div className="border-2 border-light dark:border-dark p-0.5 bg-white dark:bg-dark rounded-full">
                    <div className={`size-24 rounded-full overflow-hidden mx-auto ${color ? `bg-${color}` : 'bg-orange'}`}>
                        {person ? (
                            <img
                                src={avatar?.formats?.thumbnail?.url}
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
                <span>{person ? [firstName, lastName].filter(Boolean).join(' ') : name}</span>
            </a>

            <div className="text-sm">
                <div>{person.companyRole && `${person.companyRole}`}</div>
                <div className="text-[13px]">
                    <span className="opacity-75">{isTeamLead ? 'Team lead, ' : ''}</span>
                    <Link to={teamURL}>{teamName} Team</Link>
                </div>
            </div>

            <div className="mt-2 flex space-x-1 justify-center">
                <Stickers
                    country={country}
                    location={person.location}
                    isTeamLead={isTeamLead}
                    pineappleOnPizza={pineappleOnPizza}
                />
            </div>
            <div>
                <p className="m-0 flex justify-center items-end space-x-1 mt-2 opacity-60">
                    <IconCake className="w-4" />
                    <span className="text-xs leading-none">Joined in {dayjs(startDate).format(`MMMM YYYY`)}</span>
                </p>
            </div>
        </div>
    )
}

const TeamMember: React.FC<{ name: string }> = ({ name }) => {
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
        ({ firstName, lastName }) => `${firstName} ${lastName}`.toLowerCase() === name.toLowerCase()
    )

    return person ? <TeamMemberLink {...person} /> : null
}

const MegaQuote: React.FC = () => {
    return (
        <div className="px-4 xl:px-8 mb-8">
            <h2 className="text-3xl md:text-4xl text-center mb-1">A really long quote</h2>
            <p className="text-center text-lg">(It was so good we just couldn't cut it down.)</p>
            <div className="max-w-7xl mx-auto flex flex-col-reverse gap-8 md:gap-12 items-center md:flex-row p-6 md:p-8 bg-white dark:bg-accent-dark rounded shadow-lg dark:border dark:border-dark">
                <aside className="w-full md:w-auto min-w-48 max-w-full text-center">
                    <TeamMember name="Raquel Smith" />
                </aside>
                <div className="flex-1 [&_p]:text-lg [&_p]:mb-3 [&_p:last-child]:mb-0 md:columns-2 gap-8">
                    <p>
                        At PostHog I'm given the trust to work on things that I think matter for the business and our
                        customers.
                    </p>
                    <p>
                        There are <strong>no politics, no micromanaging,</strong> and{' '}
                        <strong>pretty extreme amounts of autonomy</strong> for every employee.
                    </p>
                    <p>
                        I've never worked at a company that can ship so well and so fast. The people here are of
                        incredible caliber, and management just gets out of the way (while also being helpful) so
                        everyone can just can do their job in the best way possible.
                    </p>
                    <p>
                        <strong>Basically everything you hate</strong> about your job{' '}
                        <strong>
                            is the exact opposite here at PostHog. It's the weirdest, coolest place I've ever worked.
                        </strong>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MegaQuote
