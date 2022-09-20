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
        clientLibs,
        serverLibs,
    }: {
        clientLibs: {
            nodes: LibraryNode[]
        }
        serverLibs: {
            nodes: LibraryNode[]
        }
    } = useStaticQuery(graphql`
        {
            clientLibs: allMdx(filter: { slug: { glob: "docs/integrate/client/*" } }) {
                nodes {
                    ...Library
                }
            }
            serverLibs: allMdx(filter: { slug: { glob: "docs/integrate/server/*" } }) {
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
        <>
            <h2>Client libraries</h2>

            <div className="overflow-x-scroll">
                <table>
                    <thead>
                        <tr>
                            <th className="w-48">Library</th>
                            <th>Event Capture</th>
                            <th>User Identification</th>
                            <th>Autocapture</th>
                            <th>Session recording</th>
                            <th>Feature Flags</th>
                            <th>Group Analytics</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientLibs.nodes
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

            <h2>Server libraries</h2>

            <div className="overflow-x-scroll mb-4">
                <table>
                    <thead>
                        <tr>
                            <th className="w-24">Library</th>
                            <th>Event Capture</th>
                            <th>User Identification</th>
                            <th>Feature Flags</th>
                            <th>Group Analytics</th>
                        </tr>
                    </thead>
                    <tbody>
                        {serverLibs.nodes
                            .filter((lib) => lib.frontmatter.features)
                            .map((lib) => (
                                <tr key={lib.fields.slug}>
                                    <td>
                                        <a href={lib.fields.slug}>{lib.frontmatter.title}</a>
                                    </td>
                                    <td>{renderAvailability(lib.frontmatter.features?.eventCapture)}</td>
                                    <td>{renderAvailability(lib.frontmatter.features?.userIdentification)}</td>
                                    <td>{renderAvailability(lib.frontmatter.features?.featureFlags)}</td>
                                    <td>{renderAvailability(lib.frontmatter.features?.groupAnalytics)}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default LibraryComparison
