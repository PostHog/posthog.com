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
                        gatsbyImageData(width: 200, height: 200)
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

                            <div className="size-72 mx-auto flex items-end justify-center">
                                <div className="relative bg-team-purple-bg w-48 h-64 shadow-xl border-4 border-team-purple-border mx-auto rounded-tl-[100px] rounded-tr-[100px] flex items-center justify-center">
                                    <div className="left-round-behind w-3 h-1 border-l-2 border-b-2 border-black bg-team-purple-bg-shadow rounded-bl-full absolute left-[calc(-1rem_-_0px)] bottom-2.5">
                                    </div>
                                    <div className="right-round-behind w-3 h-1 border-r-2 border-b-2 border-black bg-team-purple-bg-shadow rounded-br-full absolute right-[calc(-1rem_-_0px)] bottom-2.5">
                                    </div>
                                    <div className="banner-text-bg bg-white bg-opacity-80 border-2 border-black h-8 rounded-tl rounded-tr absolute bottom-4 -left-4 -right-4 z-10 flex items-center justify-center text-white uppercase font-lg font-bold"></div>
                                    <div className="banner-text-bg bg-team-purple-bg-shadow bg-opacity-80 border-2 border-black h-8 rounded-tl rounded-tr absolute bottom-4 -left-4 -right-4 z-20 flex items-center justify-center text-white uppercase text-xl font-bold font-[Squeak] [font-variant:none]">Website &amp; Vibes</div>
                                    <div className="fake-corners absolute bottom-4 -left-3.5 -right-3.5">
                                        <div className="relative mt-[-2px]">
                                            <div className="left-line bg-team-purple-bg-full dark:team-purple-bg-full-dark border-l-2 border-black w-2 h-3 absolute -left-0.5 -bottom-1 z-20"></div>
                                            <div className="left-rounded-corner bg-team-purple-bg-shadow border-l-2 border-t-2 rounded-tl-full border-black w-3 h-1 absolute -left-0.5 -bottom-1 z-20"></div>
                                            <div className="right-line bg-team-purple-bg-full dark:team-purple-bg-full-dark border-r-2 border-black w-2 h-3 absolute -right-0.5 -bottom-1 z-20"></div>
                                            <div className="right-rounded-corner bg-team-purple-bg-shadow border-r-2 border-t-2 rounded-tr-full border-black w-3 h-1 absolute -right-0.5 -bottom-1 z-20"></div>
                                        </div>
                                    </div>
                                </div>
                                <img src="https://res.cloudinary.com/dmukukwp6/image/upload/website_vibes_5853ce3aec.png" className="w-56 absolute -translate-y-2 z-10" />
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 xl:gap-5 text-center">
                                {allTeams.nodes.map(({ id, name, profiles, crest, leadProfiles }) => (
                                    <Link
                                        to={`/teams/${slugify(name.toLowerCase().replace('ops', ''), {
                                            remove: /and/,
                                        })}`}
                                        key={id}
                                        className="border border-light dark:border-dark bg-accent dark:bg-accent-dark rounded p-2 md:p-4 hover:scale-[1.01] active:scale-[1] relative hover:top-[-.5px] active:top-px"
                                    >
                                        <GatsbyImage image={getImage(crest)} alt={`${name} Team`} />
                                        <h3 className="text-base my-2 leading-snug">{name}</h3>
                                        <div className="flex justify-center -mr-3" dir="rtl">
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
                                                        { id, attributes: { firstName, lastName, avatar, color } },
                                                        index
                                                    ) => {
                                                        const name = [firstName, lastName].filter(Boolean).join(' ')
                                                        const isTeamLead = leadProfiles.data.some(
                                                            ({ id: leadID }) => leadID === id
                                                        )
                                                        return (
                                                            <span
                                                                key={`${name}-${index}`}
                                                                className="cursor-default -ml-3 relative hover:z-10 rounded-full border-1 border-accent dark:border-accent-dark"
                                                            >
                                                                <Tooltip
                                                                    content={`${name} ${isTeamLead ? '(Team lead)' : ''
                                                                        }`}
                                                                    placement="top"
                                                                >
                                                                    <img
                                                                        src={avatar?.data?.attributes?.url}
                                                                        className={`w-10 h-10 rounded-full bg-${color ?? 'white dark:bg-accent-dark'
                                                                            } border border-light dark:border-dark`}
                                                                        alt={name}
                                                                    />
                                                                </Tooltip>
                                                            </span>
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
