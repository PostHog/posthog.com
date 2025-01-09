import Layout from 'components/Layout'
import { graphql } from 'gatsby'
import React from 'react'
import SEO from 'components/seo'
import { companyMenu } from '../navs'
import Team from 'components/Team'

export default function TeamPage({
    data: {
        mdx: { body },
        team: { name, roadmaps, ...other },
        objectives,
    },
    pageContext: { slug },
}) {
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
                slug={slug.split('/').pop()}
                roadmaps={roadmaps}
                objectives={objectives}
                emojis={other.emojis}
            />
        </Layout>
    )
}

export const query = graphql`
    query TeamTemplateQuery($slug: String!, $teamName: String!, $objectives: String) {
        mdx: mdx(fields: { slug: { eq: $slug } }) {
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
