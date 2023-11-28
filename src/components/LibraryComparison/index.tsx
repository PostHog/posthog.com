import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import CheckIcon from '../../images/check.svg'
import XIcon from '../../images/x.svg'

type LibraryNode = {
    fields: {
        slug: string
    }
    frontmatter: {
        title: string
        features: LibraryFeatures | null
    }
}

type LibraryFeatures = {
    eventCapture: boolean
    autoCapture: boolean
    featureFlags: boolean
    groupAnalytics: boolean
    sessionRecording: boolean
    userIdentification: boolean
}

export const LibraryComparison = () => {
    const {
        sdks,
    }: {
        sdks: {
            nodes: LibraryNode[]
        }
    } = useStaticQuery(graphql`
        {
            sdks: allMdx(filter: { slug: { glob: "docs/libraries/*" } }) {
                nodes {
                    ...Library
                }
            }
        }

        fragment Library on Mdx {
            fields {
                slug
            }
            frontmatter {
                title
                features {
                    eventCapture
                    userIdentification
                    autoCapture
                    sessionRecording
                    featureFlags
                    groupAnalytics
                }
            }
        }
    `)

    const renderAvailability = (isAvailable?: boolean) => {
        return isAvailable ? <img className="w-4 h-4" src={CheckIcon} /> : <img className="w-4 h-4" src={XIcon} />
    }

    return (
        <div className="overflow-x-scroll mb-4">
            <table>
                <thead>
                    <tr>
                        <th className="w-48">Library</th>
                        <th>Event capture</th>
                        <th>User identification</th>
                        <th>Autocapture</th>
                        <th>Session recording</th>
                        <th>Feature flags</th>
                        <th>Group analytics</th>
                    </tr>
                </thead>
                <tbody>
                    {sdks.nodes
                        .filter((lib) => lib.frontmatter.features)
                        .map((lib) => (
                            <tr key={lib.fields.slug}>
                                <td>
                                    <a href={lib.fields.slug}>{lib.frontmatter.title}</a>
                                </td>
                                <td>{renderAvailability(lib.frontmatter.features?.eventCapture)}</td>
                                <td>{renderAvailability(lib.frontmatter.features?.userIdentification)}</td>
                                <td>{renderAvailability(lib.frontmatter.features?.autoCapture)}</td>
                                <td>{renderAvailability(lib.frontmatter.features?.sessionRecording)}</td>
                                <td>{renderAvailability(lib.frontmatter.features?.featureFlags)}</td>
                                <td>{renderAvailability(lib.frontmatter.features?.groupAnalytics)}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default LibraryComparison
