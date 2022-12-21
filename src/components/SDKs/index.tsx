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

type LibraryData = {
    clientLibs: {
        nodes: LibraryNode[]
    }
    serverLibs: {
        nodes: LibraryNode[]
    }
}

export const Client = () => {
    const { clientLibs } = useStaticQuery<LibraryData>(query)

    const renderAvailability = (isAvailable?: boolean) => {
        return isAvailable ? <img className="w-4 h-4" src={CheckIcon} /> : <img className="w-4 h-4" src={XIcon} />
    }

    return (
        <div className="overflow-x-scroll grid grid-cols-3 gap-6">
            {clientLibs.nodes.map((node) => (
                <div className="p-2 border border-gray-200 rounded-sm shadow-sm">
                    <p className="text-lg font-bold">{node.frontmatter.title}</p>
                </div>
            ))}
        </div>
    )
}

export const Server = () => {
    const { serverLibs } = useStaticQuery<LibraryData>(query)

    return (
        <div className="overflow-x-scroll grid grid-cols-3 gap-6">
            {serverLibs.nodes.map((node) => (
                <div className="p-2 border border-gray-200 rounded-sm shadow-sm">
                    <p className="text-lg font-bold">{node.frontmatter.title}</p>
                </div>
            ))}
        </div>
    )
}

const query = graphql`
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
`

export const SDKs = {
    Client,
    Server,
}
