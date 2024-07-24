import Tooltip from 'components/Tooltip'
import { graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import ReactCountryFlag from 'react-country-flag'

export const TeamMemberLink = (person) => {
    const { firstName, lastName, squeakId, avatar, companyRole, location, country, photo = false } = person ?? {}
    return (
        <span className="relative inline-block">
            <a href={person && `/community/profiles/${squeakId}`}>
                {photo && (
                    <>
                        <span
                            className={`invisible max-h-4 inline-flex items-center ${
                                photo
                                    ? 'gap-1.5 p-0.5 pr-1.5 border border-light hover:border-bg-dark/50 dark:border-dark dark:hover:border-bg-light/50 rounded-full'
                                    : 'border-b border-light dark:border-dark border-dashed hover:border-bg-dark/50 dark:hover:border-bg-light/50'
                            }`}
                        >
                            {photo ? (
                                <>
                                    <div className="h-6 shrink-0 rounded-full overflow-hidden">
                                        {person ? (
                                            <img src={avatar?.formats?.thumbnail?.url} alt="" className="w-6 bg-red" />
                                        ) : (
                                            <StaticImage
                                                alt=""
                                                width={40}
                                                src="../../pages-content/images/hog-9.png"
                                                className="w-6 bg-red"
                                            />
                                        )}
                                    </div>
                                    <span className="!text-sm text-red dark:text-yellow font-semibold inline-flex">
                                        {person ? [firstName, lastName].filter(Boolean).join(' ') : name}
                                    </span>
                                </>
                            ) : (
                                <Tooltip
                                    content={() => (
                                        <div className="text-center max-w-xs flex flex-col items-center">
                                            {person ? (
                                                <div className="inline-block size-24 rounded-full p-[2px] bg-white dark:bg-accent-dark border border-light dark:border-dark">
                                                    <div className="bg-red rounded-full overflow-hidden w-full aspect-square">
                                                        <img
                                                            src={avatar?.formats?.thumbnail?.url}
                                                            alt={
                                                                person
                                                                    ? [firstName, lastName].filter(Boolean).join(' ')
                                                                    : name
                                                            }
                                                            className="w-full aspect-square"
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="inline-block size-24 bg-yellow rounded-full overflow-hidden p-1 border-light dark:border-dark">
                                                    <StaticImage
                                                        alt=""
                                                        width={100}
                                                        src="../../pages-content/images/hog-9.png"
                                                        className="w-24"
                                                    />
                                                </div>
                                            )}
                                            <strong className="text-[15px] mt-1">
                                                {person ? [firstName, lastName].filter(Boolean).join(' ') : name}
                                            </strong>
                                            <div className="opacity-75">{person ? companyRole : null}</div>
                                            <span className="text-sm mt-0.5 flex gap-1 items-center text-primary/75 dark:text-primary-dark/75">
                                                {country === 'world' ? (
                                                    '🌎'
                                                ) : (
                                                    <ReactCountryFlag svg countryCode={country} />
                                                )}

                                                {country === 'world' ? 'Planet Earth' : location || country}
                                            </span>
                                        </div>
                                    )}
                                    placement="top"
                                >
                                    <span className=" text-red dark:text-yellow font-semibold inline-flex">
                                        {person ? [firstName, lastName].filter(Boolean).join(' ') : name}
                                    </span>
                                </Tooltip>
                            )}
                        </span>
                    </>
                )}
                <span
                    className={`inline-flex items-center ${
                        photo
                            ? 'absolute top-0 left-0 whitespace-nowrap gap-1.5 p-0.5 pr-1.5 border border-light hover:border-bg-dark/50 dark:border-dark dark:hover:border-bg-light/50 rounded-full'
                            : 'border-b border-light dark:border-dark border-dashed hover:border-bg-dark/50 dark:hover:border-bg-light/50'
                    }`}
                >
                    {photo ? (
                        <>
                            <div className="h-6 shrink-0 rounded-full overflow-hidden">
                                {person ? (
                                    <img src={avatar?.formats?.thumbnail?.url} alt="" className="w-6 bg-red" />
                                ) : (
                                    <StaticImage
                                        alt=""
                                        width={40}
                                        src="../../pages-content/images/hog-9.png"
                                        className="w-6 bg-red"
                                    />
                                )}
                            </div>
                            <span className="!text-sm text-red dark:text-yellow font-semibold inline-flex">
                                {person ? [firstName, lastName].filter(Boolean).join(' ') : name}
                            </span>
                        </>
                    ) : (
                        <Tooltip
                            content={() => (
                                <div className="text-center max-w-xs flex flex-col items-center">
                                    {person ? (
                                        <div className="inline-block size-24 rounded-full p-[2px] bg-white dark:bg-accent-dark border border-light dark:border-dark">
                                            <div className="bg-red rounded-full overflow-hidden w-full aspect-square">
                                                <img
                                                    src={avatar?.formats?.thumbnail?.url}
                                                    alt={
                                                        person ? [firstName, lastName].filter(Boolean).join(' ') : name
                                                    }
                                                    className="w-full aspect-square"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="inline-block size-24 bg-yellow rounded-full overflow-hidden p-1 border-light dark:border-dark">
                                            <StaticImage
                                                alt=""
                                                width={100}
                                                src="../../pages-content/images/hog-9.png"
                                                className="w-24"
                                            />
                                        </div>
                                    )}
                                    <strong className="text-[15px] mt-1">
                                        {person ? [firstName, lastName].filter(Boolean).join(' ') : name}
                                    </strong>
                                    <div className="opacity-75">{person ? companyRole : null}</div>
                                    <span className="text-sm mt-0.5 flex gap-1 items-center text-primary/75 dark:text-primary-dark/75">
                                        {country === 'world' ? '🌎' : <ReactCountryFlag svg countryCode={country} />}

                                        {country === 'world' ? 'Planet Earth' : location || country}
                                    </span>
                                </div>
                            )}
                            placement="top"
                        >
                            <span className=" text-red dark:text-yellow font-semibold inline-flex">
                                {person ? [firstName, lastName].filter(Boolean).join(' ') : name}
                            </span>
                        </Tooltip>
                    )}
                </span>
            </a>
        </span>
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
                    companyRole
                    location
                    country
                }
            }
        }
    `)

    const person = nodes.find(
        ({ firstName, lastName }) => `${firstName} ${lastName}`.toLowerCase() === name.toLowerCase()
    )

    return person ? <TeamMemberLink {...person} photo={photo} /> : null
}
