import CloudinaryImage from 'components/CloudinaryImage'
import Tooltip from 'components/Tooltip'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import { Link } from 'gatsby'

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
    children,
}: {
    firstName: string
    lastName?: string
    squeakId?: string
    avatar?: { formats: { thumbnail: { url: string } } }
    companyRole?: string
    location?: string
    country?: string
    color?: string
    className?: string
    photo?: boolean
    showOnlyFirstName?: boolean
    children?: JSX.Element
}): JSX.Element => {
    const displayName = showOnlyFirstName ? firstName : [firstName, lastName].filter(Boolean).join(' ')
    const avatarUrl = avatar?.formats?.thumbnail?.url

    return (
        <span className="relative inline-block">
            <Link to={squeakId ? `/community/profiles/${squeakId}` : ''} state={{ newWindow: true }}>
                {photo && (
                    <span
                        className={`invisible max-h-4 inline-flex items-center ${photo
                            ? 'gap-1.5 p-0.5 pr-1.5 border border-primary rounded-full'
                            : 'border-b border-primary border-dashed'
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
                        <span className="!text-sm text-red dark:text-yellow font-semibold inline-block truncate">
                            {children ? children : displayName}
                        </span>
                    </span>
                )}
                <span
                    className={`inline-flex items-center ${photo
                        ? 'absolute top-0 left-0 whitespace-nowrap gap-1.5 p-0.5 pr-1.5 border border-primary rounded-full'
                        : 'border-b border-primary border-dashed'
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
                            <span className="!text-sm text-red dark:text-yellow font-semibold inline-block truncate">
                                {children ? children : displayName}
                            </span>
                        </>
                    ) : (
                        <Tooltip
                            content={() => (
                                <div className="text-center max-w-xs flex flex-col items-center">
                                    {avatarUrl ? (
                                        <div className="inline-block size-24 rounded-full p-[2px] bg-white dark:bg-dark border border-primary">
                                            <div
                                                className={`bg-${color ? color : 'red'
                                                    } rounded-full overflow-hidden w-full aspect-square`}
                                            >
                                                <img
                                                    src={avatarUrl}
                                                    alt={displayName}
                                                    className="w-full aspect-square"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="inline-block size-24 bg-yellow rounded-full overflow-hidden p-1 border border-primary">
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
                                    <span className="text-sm mt-0.5 flex gap-1 items-center text-secondary">
                                        {country === 'world' ? (
                                            '🌎'
                                        ) : (
                                            <ReactCountryFlag svg countryCode={country || ''} />
                                        )}
                                        {country === 'world' ? 'Planet Earth' : location || country}
                                    </span>
                                </div>
                            )}
                            placement="top"
                        >
                            <span className=" text-red dark:text-yellow font-semibold inline-flex">
                                {children ? children : displayName}
                            </span>
                        </Tooltip>
                    )}
                </span>
            </Link>
        </span>
    )
}

export const FutureTeamMember = (): JSX.Element => (
    <a href="/careers">
        <TeamMemberLink firstName="You?" photo showOnlyFirstName />
    </a>
)

export default function TeamMember({
    name,
    photo,
    className,
    showOnlyFirstName = false,
    children,
}: {
    name: string
    photo?: boolean
    className?: string
    showOnlyFirstName?: boolean
    children?: JSX.Element
}): JSX.Element | null {
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
        ({ firstName, lastName }: { firstName: string; lastName: string }) =>
            `${firstName} ${lastName}`.toLowerCase() === name.toLowerCase()
    )

    return person ? (
        <>
            {children ? (
                <TeamMemberLink {...person} photo={photo} className={className} showOnlyFirstName={showOnlyFirstName}>
                    {children}
                </TeamMemberLink>
            ) : (
                <TeamMemberLink {...person} photo={photo} className={className} showOnlyFirstName={showOnlyFirstName} />
            )}
        </>
    ) : (
        <span>{name}</span>
    )
}
