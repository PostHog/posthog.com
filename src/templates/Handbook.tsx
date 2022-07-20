import React from 'react'
import { SEO } from 'components/seo'
import { graphql } from 'gatsby'
import DocsLayout from 'components/Docs/Layout'

export default function Handbook({
    data: { post },
    pageContext: { menu, next, previous, breadcrumb = [], breadcrumbBase, tableOfContents },
}) {
    const {
        body,
        frontmatter,
        contributors,
        fields: { slug },
    } = post
    const { title, hideAnchor, description, hideLastUpdated } = frontmatter
    const { parent, excerpt } = post
    const lastUpdated = parent?.fields?.gitLogLatestDate
    const filePath = `/${parent?.relativePath}`

    return (
        <DocsLayout
            {...{
                filePath,
                title,
                lastUpdated,
                menu,
                slug,
                breadcrumb,
                breadcrumbBase,
                hideAnchor,
                tableOfContents,
                body,
                next,
                previous,
                hideLastUpdated,
                contributors,
            }}
        >
            <SEO
                title={`${title} - PostHog ${breadcrumbBase.name}`}
                description={description || excerpt}
                article
                image={`/og-images/${slug.replace(/\//g, '')}.jpeg`}
            />
        </DocsLayout>
    )
}

export const query = graphql`
    query HandbookQuery($id: String!) {
        post: mdx(id: { eq: $id }) {
            id
            body
            excerpt(pruneLength: 150)
            fields {
                slug
            }
            contributors {
                url
                username
                avatar {
                    childImageSharp {
                        gatsbyImageData(width: 37, placeholder: BLURRED)
                    }
                }
            }
            frontmatter {
                title
                hideAnchor
                description
                hideLastUpdated
                featuredImage {
                    publicURL
                }
            }
            parent {
                ... on File {
                    relativePath
                    fields {
                        gitLogLatestDate(formatString: "MMM D, YYYY")
                    }
                }
            }
        }
    }
`
