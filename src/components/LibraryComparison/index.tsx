import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import CheckIcon from '../../images/check.svg'
import XIcon from '../../images/x.svg'
import Link from '../Link'
import OSTable from '../OSTable'

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
    autoCapture?: boolean
    featureFlags: boolean
    groupAnalytics: boolean
    sessionRecording?: boolean
    userIdentification: boolean
    surveys?: boolean
    aiObservability?: boolean
    errorTracking?: boolean
    logs?: boolean
    tracing?: boolean
}

// These SDKs' docs are their generated references, which carry no frontmatter, so their features live here.
const referenceSdk = (sdk: string, title: string, features: LibraryFeatures): LibraryNode => ({
    fields: { slug: `/docs/libraries/${sdk}/reference` },
    frontmatter: { title, features },
})
const server = {
    eventCapture: true,
    userIdentification: true,
    featureFlags: true,
    groupAnalytics: true,
    errorTracking: true,
}
const client = { ...server, autoCapture: true, sessionRecording: true, logs: true }
const REFERENCE_SDKS: LibraryNode[] = [
    referenceSdk('js', 'JavaScript web', client),
    referenceSdk('node', 'Node.js', { ...server, tracing: true }),
    referenceSdk('python', 'Python', { ...server, tracing: true }),
    referenceSdk('go', 'Go', server),
    referenceSdk('rust', 'Rust', server),
]

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
                    errorTracking
                    logs
                }
            }
        }
    `)

    const renderAvailability = (isAvailable?: boolean) => {
        if (isAvailable == null) {
            return null
        }
        return isAvailable ? <img className="w-4 h-4" src={CheckIcon} /> : <img className="w-4 h-4" src={XIcon} />
    }

    const columns = [
        { name: 'Library', width: 'auto', align: 'left' as const },
        { name: 'Event capture', width: '1fr', align: 'center' as const },
        { name: 'User identification', width: '1fr', align: 'center' as const },
        { name: 'Autocapture', width: '1fr', align: 'center' as const },
        { name: 'Session recording', width: '1fr', align: 'center' as const },
        { name: 'Feature flags', width: '1fr', align: 'center' as const },
        { name: 'Group analytics', width: '1fr', align: 'center' as const },
        { name: 'Error tracking', width: '1fr', align: 'center' as const },
        { name: 'Logs', width: '1fr', align: 'center' as const },
        { name: 'Tracing', width: '1fr', align: 'center' as const },
    ]

    const rows = [...sdks.nodes, ...REFERENCE_SDKS]
        .filter((lib) => lib.frontmatter.features)
        .sort((a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title))
        .map((lib) => ({
            key: lib.fields.slug,
            cells: [
                {
                    content: (
                        <Link to={lib.fields.slug} state={{ newWindow: true }}>
                            {lib.frontmatter.title}
                        </Link>
                    ),
                },
                {
                    content: renderAvailability(lib.frontmatter.features?.eventCapture),
                },
                {
                    content: renderAvailability(lib.frontmatter.features?.userIdentification),
                },
                {
                    content: renderAvailability(lib.frontmatter.features?.autoCapture),
                },
                {
                    content: renderAvailability(lib.frontmatter.features?.sessionRecording),
                },
                {
                    content: renderAvailability(lib.frontmatter.features?.featureFlags),
                },
                {
                    content: renderAvailability(lib.frontmatter.features?.groupAnalytics),
                },
                {
                    content: renderAvailability(lib.frontmatter.features?.errorTracking),
                },
                {
                    content: renderAvailability(lib.frontmatter.features?.logs),
                },
                {
                    content: renderAvailability(lib.frontmatter.features?.tracing),
                },
            ],
        }))

    return <OSTable columns={columns} rows={rows} />
}

export default LibraryComparison
