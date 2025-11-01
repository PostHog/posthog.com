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
    llmAnalytics?: boolean
    errorTracking?: boolean
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
                    errorTracking
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
    ]

    const rows = sdks.nodes
        .filter((lib) => lib.frontmatter.features)
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
            ],
        }))

    return <OSTable columns={columns} rows={rows} />
}

export default LibraryComparison
