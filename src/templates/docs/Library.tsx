import React from 'react'
import { SEO } from 'components/seo'
import { graphql } from 'gatsby'
import DocsLayout from 'components/Docs/Layout'
import LibraryFeatures from 'components/LibraryFeatures'
import Link from 'components/Link'
import { GitHub } from 'components/Icons/Icons'

export default function Library({
    data: { post },
    pageContext: { menu, next, previous, breadcrumb = [], breadcrumbBase, tableOfContents },
}) {
    const {
        body,
        frontmatter,
        contributors,
        fields: { slug },
    } = post
    const { title, github, features, description } = frontmatter
    const { parent, excerpt } = post
    const lastUpdated = parent?.fields?.gitLogLatestDate
    const filePath = `/${parent?.relativePath}`

    return (
        <DocsLayout
            title={title}
            titleElement={
                <div className="flex items-center justify-between mb-2">
                    <h1 className="mb-0">{title}</h1>
                    <Link to={github}>
                        <GitHub className="w-8 h-8 text-black/80 hover:text-black/60 dark:text-white/80 hover:dark:text-white/60 transition-colors" />
                    </Link>
                </div>
            }
            filePath={filePath}
            slug={slug}
            menu={menu}
            lastUpdated={lastUpdated}
            hideAnchor={false}
            tableOfContents={tableOfContents}
            breadcrumb={breadcrumb}
            breadcrumbBase={breadcrumbBase}
            body={body}
            next={next}
            previous={previous}
            hideLastUpdated={false}
            contributors={contributors}
        >
            <SEO
                title={`${title} - PostHog ${breadcrumbBase.name}`}
                description={description || excerpt}
                article
                image={`/og-images/${slug.replace(/\//g, '')}.jpeg`}
            />
            <LibraryFeatures availability={features} />
        </DocsLayout>
    )
}

export const query = graphql`
    query LibraryQuery($id: String!) {
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
                        gatsbyImageData(width: 37)
                    }
                }
            }
            frontmatter {
                title
                description
                github
                features {
                    eventCapture
                    userIdentification
                    autoCapture
                    sessionRecording
                    featureFlags
                }
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
