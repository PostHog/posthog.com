import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'

export const IngestionPipelinesList = () => {
    const {
        pipelines: { nodes: pipelines },
    } = useStaticQuery<QueryResult>(query)

    return (
        <ul className="list-none p-0 border-t border-l border-dashed border-gray-accent-light dark:border-gray-accent-dark">
            {pipelines.map((pipeline) => {
                return (
                    <li
                        key={pipeline.id}
                        style={{ margin: 0 }}
                        className="border-r border-b border-dashed border-gray-accent-light dark:border-gray-accent-dark hover:bg-gray-accent-light dark:hover:bg-gray-accent-dark"
                    >
                        <Link to={pipeline.frontmatter.documentation} className="flex p-2 !bg-none">
                            <div className="shrink-0 grow-0 basis-[84px] flex justify-center pt-1">
                                <img className="icon w-8 h-8" src={pipeline.frontmatter.thumbnail.publicURL} />
                            </div>

                            <div className="flex-1">
                                <div className="text-black dark:text-white leading-none pt-2">
                                    {pipeline.frontmatter.title}
                                </div>
                                <p className="text-black/60 dark:text-white/60 font-normal mt-0.5 !text-[15px] !mb-2">
                                    {pipeline.frontmatter.description}
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
    pipelines: {
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
        pipelines: allMdx(
            filter: {
                fields: { slug: { regex: "/^/cdp/(?!.*/docs).*/" } }
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

export default IngestionPipelinesList
