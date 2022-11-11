import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { CardContainer, IRoadmap } from 'components/Roadmap'
import { InProgress } from 'components/Roadmap/InProgress'
import { OrgProvider, UserProvider } from 'squeak-react'

export default function TeamRoadmap({ team }: { team?: string }) {
    const {
        allSqueakRoadmap: { nodes },
    } = useStaticQuery(query)

    const roadmap = team ? nodes.filter((node: IRoadmap) => node?.team?.name === team) : nodes
    if (!roadmap || roadmap.length <= 0) return null
    return (
        <OrgProvider
            value={{ organizationId: 'a898bcf2-c5b9-4039-82a0-a00220a8c626', apiHost: 'https://squeak.cloud' }}
        >
            <UserProvider>
                <CardContainer>
                    {roadmap?.map((node: IRoadmap) => {
                        return (
                            <InProgress
                                more
                                className="bg-opacity-0 shadow-none border border-dashed border-gray-accent-light rounded-md !border-t !mb-4"
                                key={node.title}
                                {...node}
                            />
                        )
                    })}
                </CardContainer>
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
