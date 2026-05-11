import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
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
import OSButton2 from 'components/OSButton/OSButton2'

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
            <div className="">
                <StickerPineappleUnknown className="size-10 shrink-0 inline-block" />
                <p className="text-[15px] m-0 inline-block ml-1 leading-tight">
                    This team hasn't weighed in on pineapple pizza.
                </p>
            </div>
        )
    }
    const yes = known.filter((p) => p.pineappleOnPizza === true).length
    const percent = Math.round((yes / known.length) * 100)
    const Sticker = percent > 50 ? StickerPineappleYes : percent === 50 ? StickerPineapple : StickerPineappleNo
    return (
        <div className="flex items-center gap-1">
            <Sticker className="size-10 shrink-0" />
            <p className="text-[15px] m-0">
                {percent > 50 ? (
                    <>
                        This team is <strong className="text-green">{percent}% pro-pineapple</strong> on pizza.
                    </>
                ) : percent === 50 ? (
                    <>This team is evenly split about pineapple on pizza.</>
                ) : (
                    <>
                        This team is <strong className="text-red">{100 - percent}% against</strong> pineapple on pizza.
                    </>
                )}
            </p>
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

    const leadIds = new Set<string>((team.leadProfiles?.data ?? []).map((l: { id: string | number }) => String(l.id)))

    const isLead = (p: ProfileNode) => leadIds.has(String(p.squeakId))

    const profiles: ProfileNode[] = (allSqueakProfile.nodes as ProfileNode[])
        .filter((p) => p.teams?.data?.some((t) => t.attributes?.slug === teamSlug))
        .sort((a, b) => Number(isLead(b)) - Number(isLead(a)))

    const crestImageUrl = team.crest?.data?.attributes?.url
    const heroUrl = team.teamImage?.image?.data?.attributes?.url
    const heroCaption = team.teamImage?.caption

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <header className="flex flex-col @xl/reader-content:flex-row @xl/reader-content:flex-wrap gap-6 @xl/reader-content:gap-8 mb-20">
                {team.crestOptions && (
                    <div className="flex justify-start @xl/reader-content:flex-none">
                        <TeamPatch
                            name={team.name}
                            imageUrl={crestImageUrl}
                            className="h-48 @xl/reader-content:h-auto @xl/reader-content:w-52"
                            {...team.crestOptions}
                        />
                    </div>
                )}
                <div className="min-w-0 flex flex-col justify-center @xl/reader-content:flex-1 pb-4 @xl/reader-content:pb-0">
                    <h2 className="text-3xl font-bold text-primary m-0 leading-tight">{team.name} Team</h2>
                    {team.tagline && <p className="text-base italic text-secondary m-0">{team.tagline}</p>}
                    <div className="flex justify-start mt-2">
                        <PineappleVerdict profiles={profiles} />
                    </div>
                </div>
                <div className="@xl/reader-content:basis-full flex flex-col @xl/reader-content:flex-row gap-6 @xl/reader-content:gap-8 items-start @xl/reader-content:items-center">
                    {team.description && (
                        <div className="@xl/reader-content:flex-1">
                            <h3 className="text-sm font-semibold m-0 mb-2">What we do</h3>
                            <p className="text-base text-secondary leading-relaxed m-0">{team.description}</p>
                        </div>
                    )}
                    {heroUrl && (
                        <figure className="rotate-2 w-full max-w-md @xl/reader-content:mx-0 @xl/reader-content:w-[48%] @xl/reader-content:max-w-none m-0 flex flex-col gap-2">
                            <div className="bg-accent flex justify-center items-center shadow-xl border-[5px] border-white rounded-md overflow-hidden">
                                <CloudinaryImage src={heroUrl} alt={`${team.name} team`} />
                            </div>
                            {heroCaption && (
                                <figcaption className="text-right text-[12px] mr-2 text-secondary leading-tight">
                                    {heroCaption}
                                </figcaption>
                            )}
                        </figure>
                    )}
                </div>
            </header>

            {profiles.length > 0 && (
                <ul className="list-none m-0 p-0 grid grid-cols-1 @sm/reader-content:grid-cols-2 @xl/reader-content:grid-cols-3 @4xl/reader-content:grid-cols-4 gap-x-4 gap-y-16">
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
                                isTeamLead={isLead(profile)}
                                teams={profile.teams}
                                viewingOwnTeam={true}
                            />
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-6">
                <OSButton2 to={`/teams/${team.slug}`} state={{ newWindow: true }}>
                    Visit team page
                    <IconArrowRight className="size-4" />
                </OSButton2>
            </div>
        </section>
    )
}

export default Team
