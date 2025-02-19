import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import Link from 'components/Link'
import PostLayout from 'components/PostLayout'
import Tooltip from 'components/Tooltip'
import { graphql, useStaticQuery } from 'gatsby'
import slugify from 'slugify'
import TeamPatch from 'components/TeamPatch'
import { CallToAction } from 'components/CallToAction'
import { useUser } from 'hooks/useUser'

const Teams: React.FC = () => {
    const { isModerator } = useUser()
    const { allTeams } = useStaticQuery(graphql`
        {
            allTeams: allSqueakTeam(filter: { name: { ne: "Hedgehogs" }, crest: { publicId: { ne: null } } }) {
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
        <Layout>
            <SEO
                title="Teams - PostHog"
                description="We're organized into multi-disciplinary small teams."
                image={`/images/small-teams.png`}
            />
            <PostLayout article={false} title={'Handbook'} hideSidebar hideSurvey>
                <section className="mx-auto">
                    <div className="flex flex-col md:items-center md:justify-end md:flex-row-reverse gap-8 md:gap-2">
                        <div className="md:flex-1">
                            <h1 className="font-bold text-3xl md:text-4xl mb-6">Small teams</h1>
                            <p className="opacity-60 ">
                                We've organized the company into small teams that are multi-disciplinary and as
                                self-sufficient as possible.
                            </p>
                            <p>
                                <Link to="/handbook/company/small-teams">Learn more about why we have small teams</Link>
                            </p>

                            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 xl:gap-5 text-center">
                                {allTeams.nodes
                                    .sort((a, b) => a.name.localeCompare(b.name))
                                    .map(({ id, name, slug, profiles, crest, crestOptions, leadProfiles }) => (
                                        <Link
                                            to={`/teams/${slug}`}
                                            key={id}
                                            className="group relative mb-6 hover:scale-[1.01] active:scale-[1] hover:top-[-.5px] active:top-px"
                                        >
                                            <div className="">
                                                <TeamPatch
                                                    name={name}
                                                    imageUrl={crest?.data?.attributes?.url}
                                                    {...crestOptions}
                                                    className="w-full"
                                                />
                                            </div>

                                            <div className="absolute -bottom-4 left-0 right-0 justify-center -mr-3 transform transition-all duration-100">
                                                <div className="flex flex-wrap justify-center" dir="rtl">
                                                    {profiles.data.length > 6 && (
                                                        <span
                                                            className={`invisible group-hover:visible cursor-default -ml-3 relative hover:z-10 rounded-full border-1 border-accent dark:border-accent-dark animate-jump-out transform scale-[0%] group-hover:animate-jump-in group-hover:animate-once group-hover:animate-duration-500 group-hover:animate-delay-[${
                                                                5 * 100
                                                            }ms]`}
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
                                                                        className={`invisible group-hover:visible cursor-default -ml-3 relative hover:z-10 rounded-full border-1 border-accent dark:border-accent-dark animate-jump-out transform scale-[0%] group-hover:animate-jump-in group-hover:animate-once group-hover:animate-duration-500 group-hover:animate-delay-[${
                                                                            (Math.min(
                                                                                profiles.data.length > 6
                                                                                    ? 5
                                                                                    : profiles.data.length,
                                                                                6
                                                                            ) -
                                                                                index -
                                                                                1) *
                                                                            100
                                                                        }ms]`}
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
                                    ))}
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
            </PostLayout>
        </Layout>
    )
}

export default Teams
