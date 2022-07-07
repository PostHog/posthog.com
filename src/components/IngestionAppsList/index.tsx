import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'

export const IngestionAppsList = () => {
    const {
        apps: { nodes: apps },
    } = useStaticQuery<QueryResult>(query)

    return (
        <ul className="grid grid-cols-1 lg:grid-cols-2 list-none p-0 border-t border-l border-dashed border-gray-accent-light dark:border-gray-accent-dark">
            {apps.map((app) => {
                return (
                    <li
                        key={app.id}
                        style={{ margin: 0 }}
                        className="border-r border-b border-dashed border-gray-accent-light dark:border-gray-accent-dark hover:bg-gray-accent-light dark:hover:bg-gray-accent-dark"
                    >
                        <Link
                            style={{ background: 'none' }}
                            to={app.frontmatter.documentation}
                            className="h-full flex lg:flex-col lg:items-center p-2"
                        >
                            <img className="icon w-12 h-12 p-2 rounded-sm" src={app.frontmatter.thumbnail.publicURL} />

                            <div className="ml-2 lg:ml-0 mt-2 lg:text-center">
                                <span className="text-black dark:text-white">{app.frontmatter.title}</span>
                                <p className="mt-0.5 text-black dark:text-white font-normal text-xs text-gray-accent-dark">
                                    {app.frontmatter.description}
                                </p>
                            </div>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

type QueryResult = {
    apps: {
        nodes: {
            id: string
            frontmatter: {
                title: string
                description: string | null
                documentation: string
                thumbnail: {
                    thumbnail: string
                    publicURL: string
                }
            }
        }[]
    }
}

const query = graphql`
    query {
        apps: allMdx(
            filter: {
                fields: { slug: { regex: "/^/apps/(?!.*/docs).*/" } }
                frontmatter: { filters: { type: { regex: "/data-in/" } } }
            }
        ) {
            nodes {
                id
                frontmatter {
                    title
                    description
                    documentation
                    thumbnail {
                        id
                        publicURL
                    }
                }
            }
        }
    }
`

export default IngestionAppsList
