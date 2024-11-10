import Layout from 'components/Layout'
import { graphql } from 'gatsby'
import React from 'react'
import SEO from 'components/seo'
import { companyMenu } from '../navs'
import Team from 'components/Team'
import useTeam from 'hooks/useTeam'

export default function TeamPage({
    data: {
        mdx: { body },
        team: { name, roadmaps, ...other },
        objectives,
    },
}) {
    const { team, addTeamMember, removeTeamMember, handleTeamLead, updateDescription, updateTeam } = useTeam({
        teamName: name,
    })
    return (
        <Layout
            parent={companyMenu}
            activeInternalMenu={companyMenu.children.find((menu) => menu.name.toLowerCase() === 'teams')}
        >
            <SEO
                title={`${name} - PostHog`}
                description="We're organized into multi-disciplinary small teams."
                image={`/images/small-teams.png`}
            />
            <Team
                body={body}
                name={name}
                roadmaps={roadmaps}
                objectives={objectives}
                emojis={other.emojis}
                addTeamMember={addTeamMember}
                removeTeamMember={removeTeamMember}
                handleTeamLead={handleTeamLead}
                updateDescription={updateDescription}
                updateTeam={updateTeam}
                {...(team?.attributes || {})}
            />
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
            emojis {
                name
                localFile {
                    publicURL
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
        objectives: mdx(fields: { slug: { eq: $objectives } }) {
            body
        }
    }
`
