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
}

export default function TeamMembers({ teamSlug = 'sales-product-led', salesRep }: TeamMembersProps) {
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
            <div className="border border-primary p-4 rounded bg-primary mb-4">
                <h3 className="text-sm mb-0.5">Your helpful PostHog person</h3>
                <p className="text-xs mb-3">This friendly face would love to chat with you.</p>

                <div className="flex items-center gap-3">
                    <CloudinaryImage
                        src={salesRep.photo as `https://res.cloudinary.com/${string}`}
                        alt={salesRep.name}
                        className={`size-16 rounded-full overflow-hidden border-2 border-${salesRep.color} p-[1.5px]`}
                        imgClassName={`object-cover rounded-full bg-${salesRep.color}`}
                        width={80}
                    />
                    <div className="text-left">
                        <div className="text-base font-semibold @2xl:leading-tight">{salesRep.name}</div>
                        <div className="text-[13px] text-secondary @2xl:leading-tight">{salesRep.title}</div>
                        <a
                            href={`mailto:${salesRep.email}`}
                            className="block pt-0.5 text-sm underline font-semibold @2xl:leading-tight"
                        >
                            {salesRep.email}
                        </a>
                    </div>
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
    const sortedProfiles = profiles.slice().sort((a: any, b: any) => {
        const aIsLead = leadProfiles.some(({ id: leadID }: { id: string }) => leadID === a.id)
        const bIsLead = leadProfiles.some(({ id: leadID }: { id: string }) => leadID === b.id)
        return aIsLead === bIsLead ? 0 : aIsLead ? -1 : 1
    })

    return (
        <div>
            <div
                data-scheme="primary"
                className="relative justify-center transform transition-all duration-100 border border-primary bg-primary rounded p-4 mb-4"
            >
                <h3 className="text-sm mb-1">Our {team.name} Team</h3>
                <p className="text-sm mb-3">One of these friendly faces would love to chat with you.</p>
                <div className="flex flex-wrap justify-end ml-3" dir="rtl">
                    {profiles.length > 8 && (
                        <span className="visible cursor-default -ml-3 relative hover:z-10 rounded-full border-1 border-primary">
                            <Tooltip
                                trigger={
                                    <div className="size-10 rounded-full bg-accent border border-light dark:border-dark flex items-center justify-center text-sm font-semibold transform scale-100 hover:scale-125 transition-all">
                                        {profiles.length - 7}+
                                    </div>
                                }
                                side="bottom"
                            >
                                {profiles.length - 7} more
                            </Tooltip>
                        </span>
                    )}
                    {sortedProfiles
                        .slice(0, profiles.length > 8 ? 7 : undefined)
                        .reverse()
                        .map(({ id, attributes: { firstName, lastName, avatar, color } }: any, index: number) => {
                            const name = [firstName, lastName].filter(Boolean).join(' ')
                            const isTeamLead = leadProfiles.some(({ id: leadID }: { id: string }) => leadID === id)

                            return (
                                <span
                                    key={`${name}-${index}`}
                                    className={`visible cursor-default -ml-3 relative hover:z-10 transform scale-100 hover:scale-125 transition-all rounded-full border-1 ${
                                        isTeamLead ? 'border-yellow dark:border-yellow' : 'border-primary'
                                    }`}
                                >
                                    <Tooltip
                                        trigger={
                                            <img
                                                src={avatar?.data?.attributes?.url}
                                                className={`size-10 rounded-full bg-${
                                                    color ?? 'accent'
                                                } border border-light dark:border-dark`}
                                                alt={name}
                                            />
                                        }
                                        side="bottom"
                                        delay={0}
                                    >
                                        {name} {isTeamLead ? '(Team lead)' : ''}
                                    </Tooltip>
                                </span>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}
