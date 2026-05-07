import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Link from 'components/Link'
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
    avatar?: { data?: { attributes?: { url?: string } } }
    teams?: {
        data?: Array<{
            id?: string | number
            attributes?: {
                name?: string
                slug?: string
                miniCrest?: { data?: { attributes?: { url?: string } } }
            }
        }>
    }
}

const PineappleVerdict = ({ profiles }: { profiles: ProfileNode[] }) => {
    const known = profiles.filter((p) => p.pineappleOnPizza === true || p.pineappleOnPizza === false)
    if (!known.length) {
        return (
            <div className="bg-yellow/10 border border-yellow/40 rounded p-5 flex items-center gap-4">
                <StickerPineappleUnknown className="size-12 shrink-0" />
                <div>
                    <p className="text-sm text-secondary m-0">Does pineapple belong on pizza?</p>
                    <p className="text-2xl font-bold m-0 text-primary">The team is undecided</p>
                </div>
            </div>
        )
    }
    const yes = known.filter((p) => p.pineappleOnPizza === true).length
    const percent = Math.round((yes / known.length) * 100)
    const Sticker = percent > 50 ? StickerPineappleYes : percent === 50 ? StickerPineapple : StickerPineappleNo
    const verdict =
        percent > 66
            ? 'are firmly pro-pineapple'
            : percent > 50
            ? 'lean pro-pineapple'
            : percent === 50
            ? 'are evenly split'
            : percent > 33
            ? 'lean anti-pineapple'
            : 'are firmly anti-pineapple'
    return (
        <div className="bg-yellow/10 border border-yellow/40 rounded p-5 flex items-center gap-4">
            <Sticker className="size-12 shrink-0" />
            <div>
                <p className="text-sm text-secondary m-0">Does pineapple belong on pizza?</p>
                <p className="text-2xl font-bold m-0 text-primary">
                    <span className="text-red dark:text-yellow">{percent}%</span> {verdict}
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
                    miniCrest {
                        gatsbyImageData(width: 80, height: 80)
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
                        data {
                            attributes {
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
                                miniCrest {
                                    data {
                                        attributes {
                                            url
                                        }
                                    }
                                }
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

    const miniCrestImage = team.miniCrest ? getImage(team.miniCrest) : null
    const heroUrl = team.teamImage?.image?.data?.attributes?.url
    const heroCaption = team.teamImage?.caption

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <div className="flex flex-col @2xl/reader-content:flex-row @2xl/reader-content:items-start gap-6 mb-8">
                <div className="flex items-center gap-4 @2xl/reader-content:flex-col @2xl/reader-content:items-start @2xl/reader-content:w-56 @2xl/reader-content:shrink-0">
                    {miniCrestImage && (
                        <GatsbyImage
                            image={miniCrestImage}
                            alt={`${team.name} crest`}
                            className="size-16 @2xl/reader-content:size-20 shrink-0"
                        />
                    )}
                    <div>
                        <h2 className="text-3xl font-bold text-primary m-0 leading-tight">{team.name} Team</h2>
                        {team.tagline && <p className="text-base italic text-secondary m-0 mt-1">{team.tagline}</p>}
                    </div>
                </div>
                {team.description && (
                    <div className="flex-1 min-w-0">
                        <p className="text-base text-secondary leading-relaxed m-0">{team.description}</p>
                    </div>
                )}
            </div>

            {heroUrl && (
                <figure className="m-0 mb-8">
                    <img
                        src={heroUrl}
                        alt={`${team.name} team`}
                        className="w-full rounded shadow-2xl border border-primary"
                    />
                    {heroCaption && (
                        <figcaption className="text-xs italic text-secondary text-center mt-2">
                            {heroCaption}
                        </figcaption>
                    )}
                </figure>
            )}

            <div className="mb-8">
                <PineappleVerdict profiles={profiles} />
            </div>

            {profiles.length > 0 && (
                <ul className="list-none m-0 p-0 grid grid-cols-1 @sm/reader-content:grid-cols-2 @2xl/reader-content:grid-cols-3 @4xl/reader-content:grid-cols-4 gap-4">
                    {profiles.map((profile) => (
                        <li key={profile.id} className="m-0">
                            <TeamMember
                                avatar={{ url: profile.avatar?.data?.attributes?.url }}
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
