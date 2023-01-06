import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Link from 'components/Link'
import CheckIcon from '../../images/check.svg'
import XIcon from '../../images/x.svg'

type LibraryNode = {
    fields: {
        slug: string
    }
    frontmatter: {
        title: string
        icon: {
            publicURL: string
        }
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

const SDK = (props: LibraryNode) => (
    <Link
        to={props.fields.slug}
        className="px-3 !py-2 border-none shadow-none rounded-sm shadow-sm flex items-center space-x-3 text-gray"
    >
        <img src={props.frontmatter.icon?.publicURL} className="w-8 h-8" />
        <p className="text-lg font-bold !mb-0">{props.frontmatter.title}</p>
    </Link>
)

export const Client = () => {
    const { clientLibs } = useStaticQuery<LibraryData>(query)

    return (
        <div className="overflow-x-scroll grid grid-cols-3 gap-6">
            {clientLibs.nodes.map((node) => (
                <SDK {...node} />
            ))}
        </div>
    )
}

export const Server = () => {
    const { serverLibs } = useStaticQuery<LibraryData>(query)

    return (
        <div className="overflow-x-scroll grid grid-cols-3 gap-6">
            {serverLibs.nodes.map((node) => (
                <SDK {...node} />
            ))}
        </div>
    )
}

const query = graphql`
    {
        clientLibs: allMdx(filter: { slug: { glob: "docs/integrate/client/*" } }) {
            nodes {
                ...SDK
            }
        }
        serverLibs: allMdx(filter: { slug: { glob: "docs/integrate/server/*" } }) {
            nodes {
                ...SDK
            }
        }
    }

    fragment SDK on Mdx {
        fields {
            slug
        }
        frontmatter {
            title
            icon {
                publicURL
            }
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
