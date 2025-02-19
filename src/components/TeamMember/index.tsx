import CloudinaryImage from 'components/CloudinaryImage'
import Tooltip from 'components/Tooltip'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import ReactCountryFlag from 'react-country-flag'

export const TeamMemberLink = ({
    firstName,
    lastName,
    squeakId,
    avatar,
    companyRole,
    location,
    country,
    color,
    className,
    photo = false,
    showOnlyFirstName = false,
}): JSX.Element => {
    const displayName = showOnlyFirstName ? firstName : [firstName, lastName].filter(Boolean).join(' ')
    const avatarUrl = avatar?.formats?.thumbnail?.url

    return (
        <span className="relative inline-block">
            <a href={squeakId && `/community/profiles/${squeakId}`}>
                {photo && (
                    <span
                        className={`invisible max-h-4 inline-flex items-center ${
                            photo
                                ? 'gap-1.5 p-0.5 pr-1.5 border border-light hover:border-bg-dark/50 dark:border-dark dark:hover:border-bg-light/50 rounded-full'
                                : 'border-b border-light dark:border-dark border-dashed hover:border-bg-dark/50 dark:hover:border-bg-light/50'
                        }`}
                    >
                        <span className="h-6 shrink-0 rounded-full overflow-hidden">
                            {avatarUrl ? (
                                <img src={avatarUrl} alt="" className={`w-6 bg-${color ? color : 'red'}`} />
                            ) : (
                                <CloudinaryImage
                                    alt=""
                                    width={40}
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/pages-content/images/hog-9.png"
                                    className="w-6 bg-red"
                                />
                            )}
                        </span>
                        <span className="!text-sm text-red dark:text-yellow font-semibold inline-flex">
                            {displayName}
                        </span>
                    </span>
                )}
                <span
                    className={`inline-flex items-center ${
                        photo
                            ? 'absolute top-0 left-0 whitespace-nowrap gap-1.5 p-0.5 pr-1.5 border border-light hover:border-bg-dark/50 dark:border-dark dark:hover:border-bg-light/50 rounded-full'
                            : 'border-b border-light dark:border-dark border-dashed hover:border-bg-dark/50 dark:hover:border-bg-light/50'
                    } ${className}`}
                >
                    {photo ? (
                        <>
                            <span className="h-6 shrink-0 rounded-full overflow-hidden">
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt="" className={`w-6 bg-${color ? color : 'red'}`} />
                                ) : (
                                    <CloudinaryImage
                                        alt=""
                                        width={40}
                                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/pages-content/images/hog-9.png"
                                        className="w-6 bg-red"
                                    />
                                )}
                            </span>
                            <span className="!text-sm text-red dark:text-yellow font-semibold inline-flex">
                                {displayName}
                            </span>
                        </>
                    ) : (
                        <Tooltip
                            content={() => (
                                <div className="text-center max-w-xs flex flex-col items-center">
                                    {avatarUrl ? (
                                        <div className="inline-block size-24 rounded-full p-[2px] bg-white dark:bg-accent-dark border border-light dark:border-dark">
                                            <div
                                                className={`bg-${
                                                    color ? color : 'red'
                                                }r} rounded-full overflow-hidden w-full aspect-square`}
                                            >
                                                <img
                                                    src={avatarUrl}
                                                    alt={displayName}
                                                    className="w-full aspect-square"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="inline-block size-24 bg-yellow rounded-full overflow-hidden p-1 border-light dark:border-dark">
                                            <CloudinaryImage
                                                alt=""
                                                width={100}
                                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/pages-content/images/hog-9.png"
                                                className="w-24"
                                            />
                                        </div>
                                    )}
                                    <strong className="text-[15px] mt-1">{displayName}</strong>
                                    <div className="opacity-75">{companyRole}</div>
                                    <span className="text-sm mt-0.5 flex gap-1 items-center text-primary/75 dark:text-primary-dark/75">
                                        {country === 'world' ? '🌎' : <ReactCountryFlag svg countryCode={country} />}
                                        {country === 'world' ? 'Planet Earth' : location || country}
                                    </span>
                                </div>
                            )}
                            placement="top"
                        >
                            <span className=" text-red dark:text-yellow font-semibold inline-flex">{displayName}</span>
                        </Tooltip>
                    )}
                </span>
            </a>
        </span>
    )
}

export const FutureTeamMember = (): JSX.Element => (
    <a href="/careers">
        <TeamMemberLink firstName="You?" photo showOnlyFirstName />
    </a>
)

export default function TeamMember({ name, photo, className, showOnlyFirstName = false }) {
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
                    color
                }
            }
        }
    `)

    const person = nodes.find(
        ({ firstName, lastName }) => `${firstName} ${lastName}`.toLowerCase() === name.toLowerCase()
    )

    return person ? (
        <TeamMemberLink {...person} photo={photo} className={className} showOnlyFirstName={showOnlyFirstName} />
    ) : null
}
