import CloudinaryImage from 'components/CloudinaryImage'
import Tooltip from 'components/RadixUI/Tooltip'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

interface SalesRep {
    name: string
    title: string
    email: string
    photo: string
    color: string
}

interface TeamMembersProps {
    teamSlug?: string
    salesRep?: SalesRep | null
    maxMembers?: number
}

export default function TeamMembers({ teamSlug = 'sales-product-led', salesRep, maxMembers = 6 }: TeamMembersProps) {
    const { allTeams } = useStaticQuery(graphql`
        {
            allTeams: allSqueakTeam {
                nodes {
                    id
                    name
                    slug
                    profiles {
                        data {
                            id
                            attributes {
                                color
                                firstName
                                lastName
                                avatar {
                                    data {
                                        attributes {
                                            url
                                        }
                                    }
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
        }
    `)

    // If a specific sales rep is assigned, show only that person
    if (salesRep && salesRep.name && salesRep.photo) {
        return (
            <div className="flex items-center gap-3">
                <CloudinaryImage
                    src={salesRep.photo as `https://res.cloudinary.com/${string}`}
                    alt={salesRep.name}
                    className={`size-20 rounded-full overflow-hidden border-2 border-${salesRep.color} p-[1.5px]`}
                    imgClassName={`object-cover rounded-full bg-${salesRep.color}`}
                    width={116}
                />
                <div className="text-left">
                    <div className="text-2xl font-semibold @2xl:leading-tight">{salesRep.name}</div>
                    <div className="text-xl opacity-75 @2xl:leading-tight">{salesRep.title}</div>
                    <a
                        href={`mailto:${salesRep.email}`}
                        className="block pt-0.5 text-lg underline font-semibold @2xl:leading-tight"
                    >
                        {salesRep.email}
                    </a>
                </div>
            </div>
        )
    }

    // Find the team by slug
    const team = allTeams.nodes.find((t: any) => t.slug === teamSlug)

    if (!team || !team.profiles?.data?.length) {
        return null
    }

    const profiles = team.profiles.data
    const leadProfiles = team.leadProfiles?.data || []

    // Sort profiles to show team leads first
    const sortedProfiles = profiles
        .slice()
        .sort((a: any, b: any) => {
            const aIsLead = leadProfiles.some(({ id: leadID }: { id: string }) => leadID === a.id)
            const bIsLead = leadProfiles.some(({ id: leadID }: { id: string }) => leadID === b.id)
            return aIsLead === bIsLead ? 0 : aIsLead ? -1 : 1
        })
        .slice(0, maxMembers)

    return (
        <div>
            <div className="text-sm opacity-75 mb-3">Your sales team</div>
            <div className="relative justify-center -ml-3">
                <div className="flex flex-wrap gap-0" dir="ltr">
                    {sortedProfiles.map(({ id, attributes: { firstName, lastName, avatar, color } }: any) => {
                        const name = [firstName, lastName].filter(Boolean).join(' ')
                        const isTeamLead = leadProfiles.some(({ id: leadID }: { id: string }) => leadID === id)

                        return (
                            <span key={id} className="ml-3 relative hover:z-10 rounded-full border-1">
                                <Tooltip
                                    trigger={
                                        <img
                                            src={avatar?.data?.attributes?.url}
                                            className={`size-12 rounded-full bg-${
                                                color ?? 'accent dark:bg-accent-dark'
                                            } border-2 ${
                                                isTeamLead ? 'border-yellow' : 'border-light dark:border-dark'
                                            } transform scale-100 hover:scale-110 transition-all cursor-default`}
                                            alt={name}
                                        />
                                    }
                                    side="bottom"
                                    delay={0}
                                >
                                    <div className="text-center">
                                        <div className="font-semibold">
                                            {name} {isTeamLead ? '(Lead)' : ''}
                                        </div>
                                    </div>
                                </Tooltip>
                            </span>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
