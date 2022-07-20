import React from 'react'
import { SEO } from 'components/seo'
import { graphql } from 'gatsby'
import DocsLayout from 'components/Docs/Layout'
import Link from 'components/Link'
import { GitHub } from 'components/Icons/Icons'
import { CallToAction } from 'components/CallToAction'
import { getCookie } from '../../lib/utils'

export const AppTemplate = ({
    data: { post },
    pageContext: { menu, next, previous, breadcrumb = [], breadcrumbBase, tableOfContents },
}) => {
    const [showCTA, setShowCTA] = React.useState<boolean>(
        typeof window !== 'undefined' ? Boolean(getCookie('ph_current_project_token')) : false
    )

    const {
        body,
        frontmatter,
        contributors,
        fields: { slug },
    } = post
    const { title, github, thumbnail, installUrl, description } = frontmatter
    const { parent, excerpt } = post
    const lastUpdated = parent?.fields?.gitLogLatestDate
    const filePath = `/${parent?.relativePath}`

    return (
        <DocsLayout
            title={title}
            titleElement={
                <div className="flex items-center mb-2 space-x-4 lg:space-x-6">
                    <h1 className="block mb-0 mr-auto">{title}</h1>

                    <div className="shrink-0 flex flex-col items-end space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                        {github && (
                            <Link to={github}>
                                <GitHub className="w-7 h-7 text-black/80 hover:text-black/60 dark:text-white/80 hover:dark:text-white/60 transition-colors" />
                            </Link>
                        )}

                        {installUrl && showCTA && (
                            <CallToAction type="outline" className="bg-white/40" to={installUrl}>
                                <div className="flex items-center space-x-2">
                                    <span>Install</span>
                                    {thumbnail?.publicURL && (
                                        <img
                                            src={thumbnail.publicURL}
                                            alt="app icon"
                                            className="hidden md:block w-5 h-5 object-scale-down"
                                        />
                                    )}
                                </div>
                            </CallToAction>
                        )}
                    </div>
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
        </DocsLayout>
    )
}

export const query = graphql`
    query AppQuery($id: String!) {
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
                installUrl
                thumbnail {
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

export default AppTemplate
