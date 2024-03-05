import { CallToAction } from 'components/CallToAction'
import { PineappleText } from 'components/Job/Sidebar'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { InProgress } from 'components/Roadmap/InProgress'
import { Question } from 'components/Squeak'
import useTeamUpdates from 'hooks/useTeamUpdates'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { kebabCase } from 'lib/utils'
import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import {
    StickerMayor,
    StickerFlagAT,
    StickerFlagBE,
    StickerFlagCA,
    StickerFlagCO,
    StickerFlagDE,
    StickerFlagFR,
    StickerFlagGB,
    StickerFlagNL,
    StickerFlagPL,
    StickerFlagUnknown,
    StickerFlagUS,
    StickerPineapple,
    StickerPineappleYes,
    StickerPineappleNo,
    StickerPineappleUnknown,
    StickerThumbsUp,
} from 'components/Stickers/Index'
import { UnderConsideration } from 'components/Roadmap/UnderConsideration'
import { Change } from './Changelog'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { SmoothScroll } from 'components/Products/SmoothScroll'
import Tooltip from 'components/Tooltip'
import SEO from 'components/seo'

const SidebarSection = ({ title, children }) => {
    return (
        <div>
            <h5 className="m-0 text-[15px] opacity-50 mb-2">{title}</h5>
            <div>{children}</div>
        </div>
    )
}

const Section = ({ children, cta, title, id = '' }) => {
    return (
        <section id={id} className="max-w-screen-xl mx-auto px-5 my-12">
            {title && (
                <div className="flex justify-between items-baseline w-full mb-4 relative after:h-px after:bg-border dark:after:bg-border-dark after:absolute after:top-1/2 after:left-0 after:w-full">
                    <h4 className="m-0 bg-light dark:bg-dark relative z-10 pr-2">{title}</h4>
                    {cta && <aside className="bg-light dark:bg-dark relative z-10 pl-2 -top-1">{cta}</aside>}
                </div>
            )}
            <div>{children}</div>
        </section>
    )
}

export default function Team({
    data: {
        mdx: { body },
        team: { crest, name, description, profiles, roadmaps, teamImage, leadProfiles },
        objectives,
    },
    pageContext,
}) {
    const teamName = `${name} Team`
    const teamLength = profiles?.data?.length
    const pineapplePercentage =
        teamLength &&
        teamLength > 0 &&
        Math.round(
            (profiles?.data?.filter(({ attributes: { pineappleOnPizza } }) => pineappleOnPizza).length / teamLength) *
                100
        )

    const underConsideration = roadmaps.filter(
        (roadmap) =>
            !roadmap.dateCompleted &&
            !roadmap.projectedCompletion &&
            roadmap.githubPages &&
            roadmap.githubPages.length > 0
    )

    const inProgress = roadmaps.filter((roadmap) => !roadmap.complete && roadmap.projectedCompletion)

    const [recentlyShipped] = roadmaps
        .filter((roadmap) => roadmap.complete)
        .sort((a, b) => (new Date(a.dateCompleted).getTime() > new Date(b.dateCompleted).getTime() ? -1 : 1))

    const { updates } = useTeamUpdates({
        teamName: name,
        filters: {
            roadmap: {
                id: {
                    $null: true,
                },
            },
        },
    })

    function isTeamLead(id) {
        return leadProfiles.data.some(({ id: leadID }) => leadID === id)
    }

    const hasUnderConsideration = underConsideration.length > 0
    const hasInProgress = inProgress.length > 0
    const hasBody = !['/handbook/small-teams/exec', '/handbook/small-teams/data-warehouse'].includes(pageContext.slug)

    return (
        <Layout>
            <SEO title={`${teamName} - PostHog`} />
            <Section>
                <div className="flex flex-col md:flex-row space-x-4 items-center">
                    <GatsbyImage image={getImage(crest)} alt={teamName} />
                    <div className="max-w-xl">
                        <h1 className="m-0">{teamName}</h1>
                        <p className="my-4 text-[15px]" dangerouslySetInnerHTML={{ __html: description }} />

                        {hasInProgress && (
                            <CallToAction type="secondary" size="md" to="#in-progress">
                                See what we're building
                            </CallToAction>
                        )}
                    </div>
                    {teamImage?.caption && (
                        <figure className="rotate-2 max-w-sm flex flex-col gap-2 mt-8 md:mt-0">
                            <div className="bg-accent aspect-video rounded-md flex justify-center items-center shadow-xl">
                                <GatsbyImage image={getImage(teamImage)} className="border-8 border-white rounded-md" />
                            </div>
                            <div className="text-right text-[13px] mr-2">{teamImage.caption}</div>
                        </figure>
                    )}
                </div>
            </Section>
            <SmoothScroll
                menuItems={[
                    {
                        label: 'People',
                        id: 'people',
                    },
                    ...(hasInProgress
                        ? [
                              {
                                  label: "What we're building",
                                  id: 'in-progress',
                              },
                          ]
                        : []),
                    ...(hasUnderConsideration || !!recentlyShipped
                        ? [
                              {
                                  label: 'Roadmap & recently shipped',
                                  id: 'roadmap',
                              },
                          ]
                        : []),
                    ...(objectives?.body
                        ? [
                              {
                                  label: 'Goals',
                                  id: 'goals',
                              },
                          ]
                        : []),
                    ...(hasBody
                        ? [
                              {
                                  label: 'Handbook',
                                  id: 'handbook',
                              },
                          ]
                        : []),
                ]}
            />
            <Section
                title="People"
                cta={<span className="text-sm">{PineappleText(pineapplePercentage)}</span>}
                id="people"
            >
                {/*
                <StickerPineapple className="w-8 h-8" />
                <StickerThumbsUp className="w-8 h-8" />
                */}
                <div className="flex space-x-12">
                    <ul className="flex-1 list-none p-0 m-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4">
                        {[...profiles.data]
                            .sort((a, b) => isTeamLead(b.id) - isTeamLead(a.id))
                            .map(
                                ({
                                    id,
                                    attributes: { avatar, firstName, lastName, country, companyRole, pineappleOnPizza },
                                }) => {
                                    const name = [firstName, lastName].filter(Boolean).join(' ')
                                    return (
                                        <li key={id} className="bg-border dark:bg-border-dark rounded-md">
                                            <Link
                                                to={`/community/profiles/${id}`}
                                                className="border border-border dark:border-border-dark rounded-md h-full bg-accent dark:bg-accent-dark flex flex-col p-4 relative hover:-top-0.5 active:top-[.5px] hover:transition-all z-10 overflow-hidden max-h-64"
                                            >
                                                <div className="mb-auto">
                                                    <h3
                                                        className="mb-0 text-base leading-tight"
                                                        id={kebabCase(name) + '-' + kebabCase(companyRole)}
                                                    >
                                                        {name}
                                                    </h3>
                                                    <p className="text-primary/50 text-sm dark:text-primary-dark/50 m-0">
                                                        {companyRole}
                                                    </p>

                                                    <div className="mt-1 flex space-x-1 items-center">
                                                        <span>
                                                            {country === 'BE' ? (
                                                                <StickerFlagBE className="w-8 h-8" />
                                                            ) : country === 'US' ? (
                                                                <StickerFlagUS className="w-8 h-8" />
                                                            ) : country === 'GB' ? (
                                                                <StickerFlagGB className="w-8 h-8" />
                                                            ) : country === 'DE' ? (
                                                                <StickerFlagDE className="w-8 h-8" />
                                                            ) : country === 'FR' ? (
                                                                <StickerFlagFR className="w-8 h-8" />
                                                            ) : country === 'NL' ? (
                                                                <StickerFlagNL className="w-8 h-8" />
                                                            ) : country === 'AT' ? (
                                                                <StickerFlagAT className="w-8 h-8" />
                                                            ) : country === 'CA' ? (
                                                                <StickerFlagCA className="w-8 h-8" />
                                                            ) : country === 'CO' ? (
                                                                <StickerFlagCO className="w-8 h-8" />
                                                            ) : country === 'PL' ? (
                                                                <StickerFlagPL className="w-8 h-8" />
                                                            ) : (
                                                                <StickerFlagUnknown className="w-8 h-8" />
                                                            )}
                                                        </span>
                                                        <span>
                                                            {pineappleOnPizza === null ? (
                                                                <Tooltip content="We're not sure if they like pineapple on pizza (yet)!">
                                                                    <StickerPineappleUnknown className="w-8 h-8" />
                                                                </Tooltip>
                                                            ) : pineappleOnPizza ? (
                                                                <Tooltip content="Prefers pineapple on pizza!">
                                                                    <StickerPineappleYes className="w-8 h-8" />
                                                                </Tooltip>
                                                            ) : (
                                                                <Tooltip content="Does not believe pineapple belongs on pizza">
                                                                    <StickerPineappleNo className="w-8 h-8" />
                                                                </Tooltip>
                                                            )}
                                                        </span>
                                                        {isTeamLead(id) ? (
                                                            <span>
                                                                <Tooltip content="Team lead">
                                                                    <span>
                                                                        <StickerMayor className="w-8 h-8" />
                                                                    </span>
                                                                </Tooltip>
                                                            </span>
                                                        ) : (
                                                            ''
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="ml-auto -mb-4 -mr-4 mt-2">
                                                    <img
                                                        src={
                                                            avatar?.data?.attributes?.url ||
                                                            'https://res.cloudinary.com/dmukukwp6/image/upload/v1698231117/max_6942263bd1.png'
                                                        }
                                                        className="w-[165px]"
                                                    />
                                                </div>
                                            </Link>
                                        </li>
                                    )
                                }
                            )}
                    </ul>
                    <div className="hidden w-full md:max-w-sm shrink-1 basis-sm">
                        <SidebarSection title="Small team FAQ">
                            <p className="font-bold m-0">Q: Does pineapple belong on pizza?</p>
                            <p className="font-bold m-0 mt-2">{PineappleText(pineapplePercentage)}</p>
                        </SidebarSection>

                        <div className="flex gap-1 flex-wrap">
                            <StickerFlagAT className="w-7 h-7" />
                            <StickerFlagBE className="w-7 h-7" />
                            <StickerFlagCA className="w-7 h-7" />
                            <StickerFlagCO className="w-7 h-7" />
                            <StickerFlagDE className="w-7 h-7" />
                            <StickerFlagFR className="w-7 h-7" />
                            <StickerFlagNL className="w-7 h-7" />
                            <StickerFlagPL className="w-7 h-7" />
                            <StickerFlagUnknown className="w-7 h-7" />
                            <StickerFlagUS className="w-7 h-7" />
                        </div>
                    </div>
                </div>
            </Section>
            {hasInProgress && (
                <Section title="What we're building" id="in-progress">
                    <div className="flex space-x-12 items-start">
                        <ul className="list-none m-0 p-0 grid md:grid-cols-2 gap-4">
                            {inProgress.map((roadmap) => (
                                <InProgress key={roadmap.squeakId} {...roadmap} />
                            ))}
                        </ul>
                        {updates.length > 0 && (
                            <div className="max-w-[340px] w-full flex-shrink-0">
                                <SidebarSection title="Latest update">
                                    <Question key={updates[0].question} id={updates[0].question} />
                                </SidebarSection>
                            </div>
                        )}
                    </div>
                </Section>
            )}
            <div id="roadmap">
                {hasUnderConsideration && (
                    <Section title="Roadmap">
                        <p className="-mt-2">
                            Here’s what we’re considering building next. Vote for your favorites or share a new idea on{' '}
                            <Link to="https://github.com/PostHog/posthog">GitHub</Link>.
                        </p>
                        <div>
                            <ul className="list-none m-0 p-0 space-y-4">
                                {underConsideration.map((roadmap) => (
                                    <UnderConsideration key={roadmap.squeakId} {...roadmap} />
                                ))}
                            </ul>
                        </div>
                    </Section>
                )}
                {recentlyShipped && (
                    <Section title="Recently shipped">
                        <div className="max-w-2xl team-page-content">
                            <div className="border border-light dark:border-dark rounded bg-white dark:bg-accent-dark p-6">
                                <Change {...recentlyShipped} />
                            </div>
                        </div>
                    </Section>
                )}
            </div>
            {objectives?.body && (
                <Section title="Goals" id="goals">
                    <div className="article-content max-w-2xl team-page-content">
                        <MDXProvider components={{}}>
                            <MDXRenderer>{objectives?.body}</MDXRenderer>
                        </MDXProvider>
                    </div>
                </Section>
            )}
            {hasBody && (
                <Section title="Handbook" id="handbook">
                    <div className="article-content max-w-2xl team-page-content">
                        <MDXProvider components={{}}>
                            <MDXRenderer>{body}</MDXRenderer>
                        </MDXProvider>
                    </div>
                </Section>
            )}
        </Layout>
    )
}

export const query = graphql`
    query TeamTemplateQuery($id: String!, $teamName: String!, $objectives: String) {
        mdx: mdx(id: { eq: $id }) {
            frontmatter {
                title
            }
            body
        }
        team: squeakTeam(name: { eq: $teamName }) {
            name
            description
            teamImage {
                caption
                gatsbyImageData(width: 380)
            }
            crest {
                gatsbyImageData(width: 227)
            }
            roadmaps {
                squeakId
                betaAvailable
                complete
                dateCompleted
                title
                description
                media {
                    gatsbyImageData
                    publicId
                    data {
                        attributes {
                            mime
                        }
                    }
                }
                githubPages {
                    title
                    html_url
                    number
                    closed_at
                    reactions {
                        hooray
                        heart
                        eyes
                        plus1
                    }
                }
                projectedCompletion
                cta {
                    label
                    url
                }
            }
            profiles {
                data {
                    id
                    attributes {
                        avatar {
                            data {
                                attributes {
                                    url
                                }
                            }
                        }
                        lastName
                        firstName
                        companyRole
                        country
                        location
                        pineappleOnPizza
                    }
                }
            }
            leadProfiles {
                data {
                    id
                }
            }
        }
        objectives: mdx(fields: { slug: { eq: $objectives } }) {
            body
        }
    }
`
