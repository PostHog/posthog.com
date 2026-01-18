import { MDXProvider } from '@mdx-js/react'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { SEO } from 'components/seo'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql } from 'gatsby'
import React from 'react'
import { shortcodes } from '../mdxGlobalComponents'
import { IconGithub, IconExternal } from '@posthog/icons'

export default function SideProject({ data }) {
    const { pageData } = data
    const {
        body,
        excerpt,
        fields: { slug },
    } = pageData
    const { title, description, featuredImage, projectAuthor, authorGitHub, teamLink, githubUrl, liveUrl, filters } =
        pageData?.frontmatter

    const tags = filters?.tags || []

    return (
        <Layout>
            <SEO
                image={featuredImage?.publicURL}
                title={`${title} - PostHog Side Projects`}
                description={description || excerpt}
            />
            <div className="max-w-4xl mx-auto px-5 py-12">
                <div className="mb-8">
                    <Link to="/side-projects" className="text-red dark:text-yellow hover:underline text-sm">
                        &larr; Back to Side Projects
                    </Link>
                </div>

                <header className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold m-0 mb-4">{title}</h1>
                    {description && (
                        <p className="text-xl text-primary/75 dark:text-primary-dark/75 m-0 mb-4">{description}</p>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-sm">
                        {projectAuthor && (
                            <div className="flex items-center gap-2">
                                {authorGitHub && (
                                    <img
                                        src={`https://github.com/${authorGitHub}.png?size=32`}
                                        alt={projectAuthor}
                                        className="w-6 h-6 rounded-full"
                                    />
                                )}
                                <span className="text-primary/75 dark:text-primary-dark/75">
                                    by{' '}
                                    {teamLink ? (
                                        <Link to={teamLink} className="text-red dark:text-yellow hover:underline">
                                            {projectAuthor}
                                        </Link>
                                    ) : (
                                        projectAuthor
                                    )}
                                </span>
                            </div>
                        )}

                        {githubUrl && (
                            <Link
                                to={githubUrl}
                                className="inline-flex items-center gap-1.5 text-primary/75 dark:text-primary-dark/75 hover:text-red dark:hover:text-yellow"
                                externalNoIcon
                            >
                                <IconGithub className="w-4 h-4" />
                                <span>View on GitHub</span>
                            </Link>
                        )}

                        {liveUrl && (
                            <Link
                                to={liveUrl}
                                className="inline-flex items-center gap-1.5 text-primary/75 dark:text-primary-dark/75 hover:text-red dark:hover:text-yellow"
                                externalNoIcon
                            >
                                <IconExternal className="w-4 h-4" />
                                <span>Live Demo</span>
                            </Link>
                        )}
                    </div>

                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {tags.map((tag) => (
                                <Link
                                    key={tag}
                                    to={`/side-projects?filter=tags&value=${tag.toLowerCase()}`}
                                    className="inline-block px-2 py-1 text-xs font-medium rounded bg-accent dark:bg-accent-dark text-primary/75 dark:text-primary-dark/75 hover:text-red dark:hover:text-yellow"
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    )}
                </header>

                {featuredImage && (
                    <div className="mb-8 rounded-lg overflow-hidden border border-light dark:border-dark">
                        <GatsbyImage image={getImage(featuredImage)} alt={title} />
                    </div>
                )}

                <article className="article-content">
                    <MDXProvider components={shortcodes}>
                        <MDXRenderer>{body}</MDXRenderer>
                    </MDXProvider>
                </article>

                <footer className="mt-12 pt-8 border-t border-light dark:border-dark">
                    <div className="flex flex-wrap gap-4">
                        {githubUrl && (
                            <Link
                                to={githubUrl}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent dark:bg-accent-dark hover:bg-light dark:hover:bg-dark font-medium"
                                externalNoIcon
                            >
                                <IconGithub className="w-5 h-5" />
                                <span>View Source Code</span>
                            </Link>
                        )}
                        {liveUrl && (
                            <Link
                                to={liveUrl}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-red dark:bg-yellow text-white dark:text-primary font-medium hover:opacity-90"
                                externalNoIcon
                            >
                                <IconExternal className="w-5 h-5" />
                                <span>Try Live Demo</span>
                            </Link>
                        )}
                    </div>
                </footer>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query SideProject($id: String!) {
        pageData: mdx(id: { eq: $id }) {
            body
            excerpt(pruneLength: 150)
            fields {
                slug
            }
            frontmatter {
                title
                description
                projectAuthor
                authorGitHub
                teamLink
                githubUrl
                liveUrl
                filters {
                    tags
                }
                featuredImage {
                    publicURL
                    childImageSharp {
                        gatsbyImageData
                    }
                }
            }
        }
    }
`
