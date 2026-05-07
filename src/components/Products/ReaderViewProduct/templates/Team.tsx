import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'
import TeamPatch from 'components/TeamPatch'
import { TeamMember } from 'components/People'
import {
    StickerPineappleYes,
    StickerPineappleNo,
    StickerPineappleUnknown,
    StickerPineapple,
} from 'components/Stickers/Index'
import { IconArrowRight } from '@posthog/icons'
import { SectionComponentProps } from '../types'

interface ProfileNode {
    id: string | number
    squeakId: number
    firstName?: string
    lastName?: string
    companyRole?: string
    country?: string
    location?: string
    color?: string
    biography?: string
    pineappleOnPizza?: boolean | null
    startDate?: string | null
    avatar?: { url?: string; formats?: { thumbnail?: { url?: string } } }
    teams?: {
        data?: Array<{
            id?: string | number
            attributes?: { name?: string; slug?: string }
        }>
    }
}

const PineappleVerdict = ({ profiles }: { profiles: ProfileNode[] }) => {
    const known = profiles.filter((p) => p.pineappleOnPizza === true || p.pineappleOnPizza === false)
    if (!known.length) {
        return (
            <div className="flex items-center gap-3">
                <StickerPineappleUnknown className="size-10 shrink-0" />
                <div>
                    <p className="text-sm text-secondary mb-0">Does pineapple belong on pizza?</p>
                    <p className="text-[15px] m-0">No data available.</p>
                </div>
            </div>
        )
    }
    const yes = known.filter((p) => p.pineappleOnPizza === true).length
    const percent = Math.round((yes / known.length) * 100)
    const Sticker = percent > 50 ? StickerPineappleYes : percent === 50 ? StickerPineapple : StickerPineappleNo
    return (
        <div className="flex items-center gap-3">
            <Sticker className="size-10 shrink-0" />
            <div>
                <p className="text-sm text-secondary mb-0">Does pineapple belong on pizza?</p>
                <p className="text-[15px] m-0">
                    {percent > 50 ? (
                        <>
                            <strong>{percent}%</strong> of this team say <strong className="text-green">yes</strong>!
                        </>
                    ) : percent === 50 ? (
                        <>This team is evenly split.</>
                    ) : (
                        <>
                            Shockingly, <strong>{100 - percent}%</strong> of this team say{' '}
                            <strong className="text-red">no</strong>!
                        </>
                    )}
                </p>
            </div>
        </div>
    )
}

const Team = ({ id, productData }: SectionComponentProps) => {
    const teamSlug = (productData as any)?.teamSlug
    if (!teamSlug) return null

    const { allSqueakTeam, allSqueakProfile } = useStaticQuery(graphql`
        query ProductTeamSectionQuery {
            allSqueakTeam {
                nodes {
                    id
                    name
                    slug
                    tagline
                    description
                    crest {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                    crestOptions {
                        textColor
                        textShadow
                        fontSize
                        frame
                        frameColor
                        plaque
                        plaqueColor
                        imageScale
                        imageXOffset
                        imageYOffset
                    }
                    teamImage {
                        caption
                        image {
                            data {
                                attributes {
                                    url
                                }
                            }
                        }
                    }
                    leadProfiles {
                        data {
                            id
                        }
                    }
                }
            }
            allSqueakProfile(filter: { teams: { data: { elemMatch: { id: { ne: null } } } } }) {
                nodes {
                    id
                    squeakId
                    firstName
                    lastName
                    companyRole
                    country
                    location
                    color
                    biography
                    pineappleOnPizza
                    startDate
                    avatar {
                        url
                        formats {
                            thumbnail {
                                url
                            }
                        }
                    }
                    teams {
                        data {
                            id
                            attributes {
                                name
                                slug
                            }
                        }
                    }
                }
            }
        }
    `)

    const team = allSqueakTeam.nodes.find((t: any) => t.slug === teamSlug)
    if (!team) return null

    const leadIds = new Set<string | number>(
        (team.leadProfiles?.data ?? []).map((l: { id: string | number }) => String(l.id))
    )

    const profiles: ProfileNode[] = (allSqueakProfile.nodes as ProfileNode[]).filter((p) =>
        p.teams?.data?.some((t) => t.attributes?.slug === teamSlug)
    )

    const crestImageUrl = team.crest?.data?.attributes?.url
    const heroUrl = team.teamImage?.image?.data?.attributes?.url
    const heroCaption = team.teamImage?.caption

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <header className="grid grid-cols-1 @2xl/reader-content:grid-cols-[1fr_2fr_2fr] gap-6 @2xl/reader-content:gap-8 items-center mb-20">
                {team.crestOptions && (
                    <div className="flex justify-center @2xl/reader-content:justify-start">
                        <TeamPatch
                            name={team.name}
                            imageUrl={crestImageUrl}
                            className="h-32 @2xl/reader-content:h-auto @2xl/reader-content:w-full"
                            {...team.crestOptions}
                        />
                    </div>
                )}
                <div className="min-w-0 text-center @2xl/reader-content:text-left">
                    <h2 className="text-3xl font-bold text-primary m-0 leading-tight">{team.name} Team</h2>
                    {team.tagline && <p className="text-base italic text-secondary m-0 mt-1">{team.tagline}</p>}
                    {team.description && (
                        <p className="text-base text-secondary leading-relaxed m-0 mt-3">{team.description}</p>
                    )}
                    <div className="mt-4 flex justify-center @2xl/reader-content:justify-start">
                        <PineappleVerdict profiles={profiles} />
                    </div>
                </div>
                {heroUrl && (
                    <figure className="rotate-2 w-full max-w-md mx-auto @2xl/reader-content:mx-0 m-0 flex flex-col gap-2">
                        <div className="bg-accent flex justify-center items-center shadow-xl border-8 border-white rounded-md overflow-hidden">
                            <CloudinaryImage src={heroUrl} alt={`${team.name} team`} />
                        </div>
                        {heroCaption && (
                            <figcaption className="text-right text-[12px] mr-2 text-secondary leading-tight">
                                {heroCaption}
                            </figcaption>
                        )}
                    </figure>
                )}
            </header>

            {profiles.length > 0 && (
                <ul className="list-none m-0 p-0 grid grid-cols-1 @sm/reader-content:grid-cols-2 @2xl/reader-content:grid-cols-3 @4xl/reader-content:grid-cols-4 gap-4">
                    {profiles.map((profile) => (
                        <li key={profile.id} className="m-0">
                            <TeamMember
                                avatar={{
                                    url: profile.avatar?.formats?.thumbnail?.url || profile.avatar?.url,
                                }}
                                firstName={profile.firstName}
                                lastName={profile.lastName}
                                companyRole={profile.companyRole}
                                country={profile.country}
                                location={profile.location}
                                squeakId={profile.squeakId}
                                color={profile.color || 'yellow'}
                                biography={profile.biography || ''}
                                pineappleOnPizza={profile.pineappleOnPizza}
                                startDate={profile.startDate}
                                isTeamLead={leadIds.has(String(profile.id))}
                                teams={profile.teams}
                                viewingOwnTeam={true}
                            />
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-6">
                <Link
                    to={`/teams/${team.slug}`}
                    state={{ newWindow: true }}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-red dark:text-yellow hover:underline"
                >
                    Visit team page
                    <IconArrowRight className="size-4" />
                </Link>
            </div>
        </section>
    )
}

export default Team
