import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import Link from 'components/Link'
import PostLayout from 'components/PostLayout'
import Tooltip from 'components/Tooltip'
import { graphql, navigate, useStaticQuery } from 'gatsby'
import slugify from 'slugify'
import TeamPatch from 'components/TeamPatch'
import { CallToAction } from 'components/CallToAction'
import { useUser } from 'hooks/useUser'
import HeaderBar from 'components/OSChrome/HeaderBar'
import { Select } from 'components/RadixUI/Select'
import { productMenu, companyMenu } from '../navs'
import { useNavigate, useLocation } from '@gatsbyjs/reach-router'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import { DebugContainerQuery } from 'components/DebugContainerQuery'

const Teams: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const currentPath = location.pathname.replace('/', '')

    const selectOptions = [
        {
            label: 'Company',
            items: [
                { value: 'company', label: 'Company', icon: companyMenu.icon },
                ...companyMenu.children.map((item) => ({
                    value: item.url?.replace('/', '') || item.name.toLowerCase(),
                    label: item.name,
                    icon: item.icon,
                    color: item.color || undefined,
                })),
            ],
        },
    ]

    const { isModerator } = useUser()
    const { allTeams } = useStaticQuery(graphql`
        {
            allTeams: allSqueakTeam(filter: { name: { ne: "Hedgehogs" }, crest: { publicId: { ne: null } } }) {
                nodes {
                    id
                    name
                    slug
                    createdAt
                    tagline
                    description
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
                }
            }
        }
    `)
    return (
        <ReaderView
            leftSidebar={<TreeMenu items={companyMenu.children.map((child) => ({ ...child, children: [] }))} />}
        >
            <SEO
                title="Teams - PostHog"
                description="We're organized into multi-disciplinary small teams."
                image={`/images/small-teams.png`}
            />
            <section data-scheme="primary" className="bg-primary">
                <DebugContainerQuery />
                <div className="flex flex-col md:items-center md:justify-end md:flex-row-reverse gap-8 md:gap-2">
                    <div className="md:flex-1">
                        <h1 className="font-bold text-3xl md:text-4xl mb-2">Small teams</h1>
                        <p className="text-secondary">
                            We've organized the company into{' '}
                            <Link
                                to="/handbook/company/small-teams"
                                state={{ newWindow: true }}
                                className="font-semibold underline"
                            >
                                small teams
                            </Link>{' '}
                            that are multi-disciplinary and as self-sufficient as possible.
                        </p>

                        <div className="grid @xl:grid-cols-2 @7xl:grid-cols-3 gap-4">
                            {allTeams.nodes
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map(
                                    ({
                                        id,
                                        name,
                                        slug,
                                        createdAt,
                                        tagline,
                                        description,
                                        profiles,
                                        crest,
                                        crestOptions,
                                        leadProfiles,
                                    }) => (
                                        <Link
                                            to={`/teams/${slug}`}
                                            key={id}
                                            className="group relative mb-6 hover:scale-[1.01] active:scale-[1] hover:top-[-.5px] active:top-px flex"
                                        >
                                            <div className="w-48">
                                                <TeamPatch
                                                    name={name}
                                                    imageUrl={crest?.data?.attributes?.url}
                                                    {...crestOptions}
                                                    className="w-full"
                                                    fontSize="xl"
                                                />
                                            </div>

                                            <div className="flex-1 pt-8">
                                                <h2 className="text-xl mb-1">{name}</h2>

                                                {(tagline || description) && (
                                                    <p className="text-sm opacity-80 mb-1 line-clamp-3">
                                                        {tagline || description}
                                                    </p>
                                                )}

                                                {createdAt && (
                                                    <p className="text-sm text-secondary opacity-70 mb-2">
                                                        Est.{' '}
                                                        {new Date(createdAt).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            year: 'numeric',
                                                        })}
                                                    </p>
                                                )}

                                                <div className="flex flex-wrap justify-end pl-3" dir="rtl">
                                                    {profiles.data.length > 6 && (
                                                        <span
                                                            className={`cursor-default -ml-3 relative hover:z-10 rounded-full border-1 border-accent`}
                                                        >
                                                            <Tooltip
                                                                content={`${profiles.data.length - 5} more`}
                                                                placement="bottom"
                                                            >
                                                                <div className="size-10 rounded-full bg-accent dark:bg-accent-dark border border-light dark:border-dark flex items-center justify-center text-sm font-semibold transform scale-100 hover:scale-125 transition-all">
                                                                    {profiles.data.length - 5}+
                                                                </div>
                                                            </Tooltip>
                                                        </span>
                                                    )}
                                                    {profiles.data
                                                        .slice()
                                                        .sort((a: any, b: any) => {
                                                            const aIsLead = leadProfiles.data.some(
                                                                ({ id: leadID }: { id: string }) => leadID === a.id
                                                            )
                                                            const bIsLead = leadProfiles.data.some(
                                                                ({ id: leadID }: { id: string }) => leadID === b.id
                                                            )
                                                            return aIsLead === bIsLead ? 0 : aIsLead ? -1 : 1
                                                        })
                                                        .slice(0, profiles.data.length > 6 ? 5 : undefined)
                                                        .reverse()
                                                        .map(
                                                            (
                                                                {
                                                                    id,
                                                                    attributes: { firstName, lastName, avatar, color },
                                                                },
                                                                index: number
                                                            ) => {
                                                                const name = [firstName, lastName]
                                                                    .filter(Boolean)
                                                                    .join(' ')
                                                                const isTeamLead = leadProfiles.data.some(
                                                                    ({ id: leadID }: { id: string }) => leadID === id
                                                                )
                                                                return (
                                                                    <span
                                                                        key={`${name}-${index}`}
                                                                        className={`cursor-default -ml-3 relative hover:z-10 rounded-full border-1 border-accent`}
                                                                    >
                                                                        <Tooltip
                                                                            content={`${name} ${
                                                                                isTeamLead ? '(Team lead)' : ''
                                                                            }`}
                                                                            placement="bottom"
                                                                        >
                                                                            <img
                                                                                src={avatar?.data?.attributes?.url}
                                                                                className={`size-10 rounded-full bg-${
                                                                                    color ??
                                                                                    'accent dark:bg-accent-dark'
                                                                                } border border-light dark:border-dark transform scale-100 hover:scale-125 transition-all`}
                                                                                alt={name}
                                                                            />
                                                                        </Tooltip>
                                                                    </span>
                                                                )
                                                            }
                                                        )}
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                )}
                            {isModerator && (
                                <div className="flex justify-center items-center">
                                    <CallToAction to="/teams/new" size="md">
                                        New team
                                    </CallToAction>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </ReaderView>
    )
}

export default Teams
