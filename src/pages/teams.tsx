import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Link from 'components/Link'
import PostLayout from 'components/PostLayout'
import Tooltip from 'components/Tooltip'
import { graphql, useStaticQuery } from 'gatsby'
import slugify from 'slugify'

const Teams: React.FC = () => {
    const { allTeams } = useStaticQuery(graphql`
        {
            allTeams: allSqueakTeam(filter: { name: { ne: "Hedgehogs" } }) {
                nodes {
                    id
                    name
                    profiles {
                        data {
                            id
                            attributes {
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
                        gatsbyImageData(width: 200, height: 200, placeholder: BLURRED)
                    }
                }
            }
        }
    `)
    return (
        <Layout>
            <SEO title="Teams - PostHog" />

            <PostLayout article={false} title={'Handbook'} hideSidebar hideSurvey>
                <section className="mx-auto">
                    <div className="flex flex-col md:items-center md:justify-end md:flex-row-reverse gap-8 md:gap-2">
                        <div className="md:flex-1">
                            <h1 className="font-bold text-5xl mb-6">Small teams</h1>
                            <p className="opacity-60 ">
                                We've organized the team into small teams that are multi-disciplinary and as
                                self-sufficient as possible.
                            </p>
                            <p className="">
                                <Link to="/handbook/company/small-teams">Learn more about why we have small teams</Link>
                            </p>

                            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 xl:gap-5 text-center">
                                {allTeams.nodes.map(({ id, name, profiles, crest, leadProfiles }) => (
                                    <Link
                                        to={`/handbook/small-teams/${slugify(name.toLowerCase().replace('ops', ''), {
                                            remove: /and/,
                                        })}`}
                                        key={id}
                                        className="border border-light dark:border-dark bg-accent dark:bg-accent-dark rounded p-2 md:p-4 hover:scale-[1.01] active:scale-[1] relative hover:top-[-.5px] active:top-px"
                                    >
                                        <GatsbyImage image={getImage(crest)} alt={`${name} Team`} />
                                        <h3 className="text-base my-2">{name} Team</h3>
                                        <div className="flex justify-center -mr-3">
                                            {profiles.data.map(
                                                ({ id, attributes: { firstName, lastName, avatar } }, index) => {
                                                    const name = [firstName, lastName].filter(Boolean).join(' ')
                                                    const isTeamLead = leadProfiles.data.some(
                                                        ({ id: leadID }) => leadID === id
                                                    )
                                                    return (
                                                        <Link
                                                            key={`${name}-${index}`}
                                                            to={`/community/profiles/${id}`}
                                                            className="-ml-3 relative hover:z-10 rounded-full border-1 border-accent dark:border-accent-dark"
                                                        >
                                                            <Tooltip
                                                                content={`${name} ${isTeamLead ? '(Team lead)' : ''}`}
                                                                placement="top"
                                                            >
                                                                <img
                                                                    src={avatar?.data?.attributes?.url}
                                                                    className="w-10 h-10 rounded-full bg-white dark:bg-accent-dark border border-light dark:border-dark"
                                                                    alt={name}
                                                                />
                                                            </Tooltip>
                                                        </Link>
                                                    )
                                                }
                                            )}
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
