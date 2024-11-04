import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Link from 'components/Link'
import PostLayout from 'components/PostLayout'
import Tooltip from 'components/Tooltip'
import { graphql, useStaticQuery } from 'gatsby'
import slugify from 'slugify'
import TeamPatch from 'components/TeamPatch'

const Teams: React.FC = () => {
    const { allTeams } = useStaticQuery(graphql`
        {
            allTeams: allSqueakTeam(filter: { name: { ne: "Hedgehogs" }, crest: { publicId: { ne: null } } }) {
                nodes {
                    id
                    name
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
                        color
                        textColor
                        textShadow
                        frame
                        plaque
                        imageXOffset
                        imageYOffset
                        imageScale
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
                                    .map(({ id, name, profiles, crest, crestOptions, leadProfiles }) => (
                                        <Link
                                            to={`/teams/${slugify(name.toLowerCase().replace('ops', ''), {
                                                remove: /and/,
                                            })}`}
                                            key={id}
                                            className="group relative mt-20 mb-12"
                                        >
                                            <div className="hover:scale-[1.01] active:scale-[1] relative hover:top-[-.5px] active:top-px">
                                                <TeamPatch
                                                    name={name}
                                                    imageUrl={crest?.data?.attributes?.url}
                                                    {...crestOptions}
                                                />
                                            </div>

                                            <div className="absolute top-[calc(100%+1rem)] left-0 right-0 justify-center -mr-3 transform group-hover:scale-125 transition-all duration-100">
                                                <div className="flex flex-wrap justify-center" dir="rtl">
                                                    {profiles.data
                                                        .slice()
                                                        .sort((a, b) => {
                                                            const aIsLead = leadProfiles.data.some(
                                                                ({ id: leadID }) => leadID === a.id
                                                            )
                                                            const bIsLead = leadProfiles.data.some(
                                                                ({ id: leadID }) => leadID === b.id
                                                            )
                                                            return aIsLead === bIsLead ? 0 : aIsLead ? -1 : 1
                                                        })
                                                        .reverse()
                                                        .map(
                                                            (
                                                                {
                                                                    id,
                                                                    attributes: { firstName, lastName, avatar, color },
                                                                },
                                                                index
                                                            ) => {
                                                                const name = [firstName, lastName]
                                                                    .filter(Boolean)
                                                                    .join(' ')
                                                                const isTeamLead = leadProfiles.data.some(
                                                                    ({ id: leadID }) => leadID === id
                                                                )
                                                                return (
                                                                    <span
                                                                        key={`${name}-${index}`}
                                                                        className="cursor-default -ml-3 relative hover:z-10 rounded-full border-1 border-accent dark:border-accent-dark"
                                                                    >
                                                                        <Tooltip
                                                                            content={`${name} ${
                                                                                isTeamLead ? '(Team lead)' : ''
                                                                            }`}
                                                                            placement="top"
                                                                        >
                                                                            <img
                                                                                src={avatar?.data?.attributes?.url}
                                                                                className={`size-10 rounded-full bg-${
                                                                                    color ?? 'white dark:bg-accent-dark'
                                                                                } border border-light dark:border-dark`}
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
                            </div>
                        </div>
                    </div>
                </section>
            </PostLayout>
        </Layout>
    )
}

export default Teams
