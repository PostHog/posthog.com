import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { CardContainer, IRoadmap } from 'components/Roadmap'
import { InProgress } from 'components/Roadmap/InProgress'
import { OrgProvider, UserProvider } from 'squeak-react'
import Link from 'components/Link'

export default function TeamRoadmap({ team }: { team?: string }) {
    const {
        allSqueakRoadmap: { nodes },
    } = useStaticQuery(query)

    const roadmap = team ? nodes.filter((node: IRoadmap) => node?.team?.name === team) : nodes
    return (
        <OrgProvider
            value={{ organizationId: 'a898bcf2-c5b9-4039-82a0-a00220a8c626', apiHost: 'https://squeak.cloud' }}
        >
            <UserProvider>
                {roadmap?.length <= 0 ? (
                    <p className="!m-0 py-4 px-6 border border-dashed border-gray-accent-light dark:border-gray-accent-dark rounded-md">
                        Check out the <Link to="/roadmap">company roadmap</Link> to see what we're working on next!
                    </p>
                ) : (
                    <CardContainer>
                        {roadmap?.map((node: IRoadmap) => {
                            return (
                                <InProgress
                                    more
                                    className="bg-opacity-0 shadow-none border border-dashed border-gray-accent-light dark:border-gray-accent-dark rounded-md !border-t !mb-4"
                                    key={node.title}
                                    {...node}
                                />
                            )
                        })}
                    </CardContainer>
                )}
            </UserProvider>
        </OrgProvider>
    )
}

const query = graphql`
    {
        allSqueakRoadmap(filter: { complete: { ne: true }, projected_completion_date: { ne: null } }) {
            nodes {
                beta_available
                complete
                date_completed
                title
                description
                team {
                    name
                }
                thumbnail {
                    childImageSharp {
                        gatsbyImageData(width: 200, placeholder: NONE, quality: 100)
                    }
                }
                otherLinks
                githubPages {
                    title
                    html_url
                    number
                    closed_at
                    reactions {
                        hooray
                        heart
                        eyes
                        _1
                    }
                }
                projected_completion_date
            }
        }
    }
`
