import Layout from 'components/Layout'
import Link from 'components/Link'
import { SEO } from 'components/seo'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

function SideProjectsPage() {
    const {
        sideProjects: { nodes },
    } = useStaticQuery(query)

    return (
        <Layout>
            <SEO
                title="PostHog Side Projects"
                description="Fun and interesting side projects from the PostHog team"
                image="/images/side-projects-og.png"
            />
            <header className="py-12 px-5">
                <h1 className="m-0 text-center text-4xl md:text-5xl lg:text-6xl text-primary dark:text-primary-dark">
                    Side Projects
                </h1>
                <p className="my-4 mx-auto text-center text-lg md:text-xl font-semibold text-primary/75 dark:text-primary-dark/75 max-w-2xl">
                    Fun and interesting projects from the PostHog team. Demos, experiments, tools, and more.
                </p>
                <p className="text-center">
                    <Link to="/side-projects/guide" className="text-red dark:text-yellow hover:underline text-sm">
                        Want to add your project? &rarr;
                    </Link>
                </p>
            </header>

            <div className="max-w-6xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {nodes.map(
                        ({ id, fields: { slug }, frontmatter: { projectThumbnail, title, description, liveUrl } }) => {
                            return (
                                <Link
                                    key={id}
                                    to={slug}
                                    className="group block bg-accent dark:bg-accent-dark rounded-lg overflow-hidden border border-light dark:border-dark hover:border-primary/25 dark:hover:border-primary-dark/25 hover:scale-[1.02] transition-all duration-200"
                                >
                                    {projectThumbnail && (
                                        <div className="aspect-video bg-light dark:bg-dark overflow-hidden">
                                            <img
                                                src={projectThumbnail}
                                                alt={title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                            />
                                        </div>
                                    )}
                                    <div className="p-4">
                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="m-0 text-lg font-bold text-primary dark:text-primary-dark group-hover:text-red dark:group-hover:text-yellow transition-colors">
                                                {title}
                                            </h3>
                                            {liveUrl && (
                                                <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green/10 text-green dark:bg-green/20">
                                                    Live
                                                </span>
                                            )}
                                        </div>
                                        {description && (
                                            <p className="m-0 mt-2 text-sm text-primary/70 dark:text-primary-dark/70 line-clamp-2">
                                                {description}
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            )
                        }
                    )}
                </div>
            </div>
        </Layout>
    )
}

const query = graphql`
    query {
        sideProjects: allMdx(
            filter: { fields: { slug: { regex: "/^/side-projects/(?!_)/" } } }
            sort: { fields: frontmatter___title, order: ASC }
        ) {
            nodes {
                id
                fields {
                    slug
                }
                frontmatter {
                    projectThumbnail
                    title
                    description
                    liveUrl
                }
            }
        }
    }
`

export default SideProjectsPage
