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

type FrameworkNode = {
    fields: {
        slug: string
    }
    frontmatter: {
        title: string
        icon: {
            publicURL: string
        }
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
    frameworks: {
        nodes: FrameworkNode[]
    }
}

const IntegrateOption = (props: LibraryNode | FrameworkNode) => (
    <Link
        to={props.fields.slug}
        className="cta px-4 !py-3 shadow-none shadow-sm flex items-center space-x-3 text-gray border-r border-b border-dashed border-gray-accent-light hover:bg-gray-accent-light"
    >
        <div className="w-8 h-8 rounded flex items-center justify-center">
            <img src={props.frontmatter.icon?.publicURL} className="w-6 h-6" />
        </div>
        <p className="text-lg font-semibold !mb-0 whitespace-nowrap text-black">{props.frontmatter.title}</p>
    </Link>
)

export const Client = () => {
    const { clientLibs } = useStaticQuery<LibraryData>(query)

    return (
        <div className="grid grid-cols-3 border-t border-l border-dashed border-gray-accent-light">
            {clientLibs.nodes.map((node) => (
                <IntegrateOption {...node} />
            ))}
        </div>
    )
}

export const Server = () => {
    const { serverLibs } = useStaticQuery<LibraryData>(query)

    return (
        <div className="grid grid-cols-3 border-t border-l border-dashed border-gray-accent-light">
            {serverLibs.nodes.map((node) => (
                <IntegrateOption {...node} />
            ))}
        </div>
    )
}

export const Frameworks = () => {
    const { frameworks } = useStaticQuery<LibraryData>(query)

    return (
        <div className="grid grid-cols-2 border-t border-l border-dashed border-gray-accent-light">
            {frameworks.nodes.map((node) => (
                <IntegrateOption {...node} />
            ))}
        </div>
    )
}

const query = graphql`
    {
        clientLibs: allMdx(
            filter: { slug: { glob: "docs/integrate/client/*" } }
            sort: { fields: fields___pageViews, order: DESC }
        ) {
            nodes {
                ...sdk
            }
        }
        serverLibs: allMdx(
            filter: { slug: { glob: "docs/integrate/server/*" } }
            sort: { fields: fields___pageViews, order: DESC }
        ) {
            nodes {
                ...sdk
            }
        }
        frameworks: allMdx(
            filter: { slug: { glob: "docs/integrate/third-party/*" } }
            sort: { fields: fields___pageViews, order: DESC }
        ) {
            nodes {
                ...framework
            }
        }
    }

    fragment framework on Mdx {
        fields {
            slug
        }
        frontmatter {
            title
            icon {
                publicURL
            }
        }
    }

    fragment sdk on Mdx {
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
