import React from 'react'
import ReaderView from 'components/ReaderView'
import { graphql } from 'gatsby'

export default function Handbook({ data: { post } }) {
    const {
        body,
        frontmatter: { title },
    } = post
    return <ReaderView body={{ type: 'mdx', content: body }} title={title} />
}

export const query = graphql`
    query HandbookQuery($id: String!, $nextURL: String!, $links: [String!]!) {
        glossary: allMdx(filter: { fields: { slug: { in: $links } } }) {
            nodes {
                fields {
                    slug
                }
                frontmatter {
                    title
                    featuredVideo
                }
                excerpt(pruneLength: 300)
            }
        }
        nextPost: mdx(fields: { slug: { eq: $nextURL } }) {
            excerpt(pruneLength: 500)
            frontmatter {
                title
            }
            fields {
                slug
            }
        }
        post: mdx(id: { eq: $id }) {
            id
            body
            excerpt(pruneLength: 150)
            fields {
                slug
                appConfig {
                    key
                    name
                    required
                    type
                    hint
                    description
                }
                contributors {
                    url
                    username
                    teamData {
                        name
                    }
                    avatar
                    profile {
                        squeakId
                        firstName
                        lastName
                        companyRole
                        avatar {
                            url
                        }
                    }
                }
            }
            frontmatter {
                title
                description
                showTitle
                hideAnchor
                hideLastUpdated
                github
                isArticle
                features {
                    eventCapture
                    userIdentification
                    autoCapture
                    sessionRecording
                    featureFlags
                    groupAnalytics
                    surveys
                    llmObservability
                    errorTracking
                }
                availability {
                    free
                    selfServe
                    enterprise
                }
                thumbnail {
                    childImageSharp {
                        gatsbyImageData(placeholder: NONE, width: 36)
                    }
                }
                related {
                    childMdx {
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                        }
                    }
                }
                installUrl
                featuredImage {
                    publicURL
                }
                seo {
                    ...SEOFragment
                }
            }
            parent {
                ... on File {
                    relativePath
                    fields {
                        gitLogLatestDate(formatString: "MMM DD, YYYY")
                    }
                }
            }
        }
    }
`
