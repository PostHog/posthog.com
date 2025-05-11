import Team from 'components/Team'
import { companyMenu } from '../../navs'
import Layout from 'components/Layout'
import React from 'react'
import { graphql, navigate, useStaticQuery } from 'gatsby'
import HeaderBar from 'components/OSChrome/HeaderBar'
import { Select } from 'components/RadixUI/Select'
import { useNavigate, useLocation } from '@gatsbyjs/reach-router'

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
        <div className="h-full flex flex-col">
            <div className="flex-shrink-0">
                <HeaderBar showHome showBack showForward showSearch />
            </div>
            <div data-scheme="secondary" className="bg-primary px-2">
            <Select
                groups={selectOptions}
                placeholder="Select a page"
                ariaLabel="Select a page"
                defaultValue={currentPath}
                onValueChange={(value) => navigate(`/${value}`)}
                className="w-full"
                dataScheme="primary"
            />
            </div>
            <div data-scheme="secondary" className="bg-primary flex-grow min-h-0">
                <Team
                    emojis={team?.emojis}
                    roadmaps={team?.roadmaps}
                    objectives={objectives}
                    body={body}
                    slug={slug?.split('/').pop() || ''}
                />
            </div>
        </div>
    )
}
