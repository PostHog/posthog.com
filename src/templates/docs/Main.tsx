import React from 'react'
import { graphql } from 'gatsby'
import { docs } from '../../sidebars/sidebars.json'
import { formatToc } from 'lib/utils'

import DocsLayout from 'components/Docs/Layout'
import { SEO } from 'components/seo'

export default function Docs({ data }) {
    const { post } = data

    const {
        body,
        frontmatter,
        contributors,
        headings,
        fields: { slug },
    } = post
    const { title, hideAnchor, description, hideLastUpdated } = frontmatter
    const { parent, excerpt } = post
    const lastUpdated = parent?.fields?.gitLogLatestDate
    const filePath = `/${parent?.relativePath}`

    const tableOfContents = formatToc(headings)

    return (
        <DocsLayout
            title={title}
            filePath={filePath}
            lastUpdated={lastUpdated}
            menu={docs}
            slug={slug}
            breadcrumbBase={{ name: 'Docs', url: '/docs' }}
            hideAnchor={hideAnchor}
            tableOfContents={[...tableOfContents, { depth: 0, url: 'squeak-questions', value: 'Questions?' }]}
            body={body}
            hideLastUpdated={hideLastUpdated}
            contributors={contributors}
        >
            <SEO
                title={`${title} - PostHog Docs`}
                description={description || excerpt}
                article
                image={`/og-images/${slug.replace(/\//g, '')}.jpeg`}
            />
        </DocsLayout>
    )
}

export const query = graphql`
    query DocsQuery($id: String!) {
        post: mdx(id: { eq: $id }) {
            id
            body
            excerpt(pruneLength: 150)
            fields {
                slug
            }
            headings {
                depth
                value
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
