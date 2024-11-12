import Team from 'components/Team'
import { companyMenu } from '../../navs'
import Layout from 'components/Layout'
import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

type TeamPageProps = {
    params: {
        slug: string
    }
}

export default function TeamPage(props: TeamPageProps) {
    const { slug } = props?.params || {}
    const data = useStaticQuery(graphql`
        {
            allTeams: allMdx(filter: { fields: { slug: { regex: "/^/teams/[^/]+$/" } } }) {
                nodes {
                    fields {
                        slug
                    }
                    body
                }
            }
            allObjectives: allMdx(filter: { fields: { slug: { regex: "/^/teams/[^/]+/objectives$/" } } }) {
                nodes {
                    fields {
                        slug
                    }
                    body
                }
            }
            allSqueakTeam {
                nodes {
                    slug
                    emojis {
                        name
                        localFile {
                            publicURL
                        }
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
                }
            }
        }
    `)
    const body = data?.allTeams?.nodes?.find((node) => node?.fields?.slug === `/teams/${slug}`)?.body
    const objectives = data?.allObjectives?.nodes?.find(
        (node) => node?.fields?.slug === `/teams/${slug}/objectives`
    )?.body
    const team = data?.allSqueakTeam?.nodes?.find((node) => node?.slug === slug)
    return (
        <Layout
            parent={companyMenu}
            activeInternalMenu={companyMenu.children.find((menu) => menu.name.toLowerCase() === 'teams')}
        >
            <Team
                emojis={team?.emojis}
                roadmaps={team?.roadmaps}
                objectives={objectives}
                body={body}
                slug={slug?.split('/').pop() || ''}
            />
        </Layout>
    )
}
