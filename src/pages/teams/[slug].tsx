import Team from 'components/Team'
import { companyMenu } from '../../navs'
import React from 'react'
import { graphql, navigate, useStaticQuery } from 'gatsby'
import { useNavigate, useLocation } from '@gatsbyjs/reach-router'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'

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

    return (
        <ReaderView
            leftSidebar={<TreeMenu items={companyMenu.children.map((child) => ({ ...child, children: [] }))} />}
        >
            <Team
                emojis={team?.emojis}
                roadmaps={team?.roadmaps}
                objectives={objectives}
                body={body}
                slug={slug?.split('/').pop() || ''}
            />
        </ReaderView>
    )
}
