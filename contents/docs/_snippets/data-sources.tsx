import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import List from 'components/List'
import { getLogo } from 'constants/logos'

const useSourcePlatforms = () => {
    const { allPostHogSource } = useStaticQuery(graphql`
        query DataSourcesList {
            allPostHogSource(filter: { unreleased: { ne: true } }, sort: { name: ASC }) {
                nodes {
                    name
                    slug
                    icon_url
                }
            }
        }
    `)

    return allPostHogSource.nodes.map((node: any) => ({
        label: node.name,
        url: `/docs/cdp/sources/${node.slug}`,
        image: node.icon_url,
    }))
}

const SELF_HOSTED_SOURCES = [
    { label: 'S3', url: '/docs/cdp/sources/s3', logo: 's3' },
    { label: 'Google Cloud Storage', url: '/docs/cdp/sources/gcs', logo: 'googleCloud' },
    { label: 'Cloudflare R2', url: '/docs/cdp/sources/r2', logo: 'cloudflareR2' },
    { label: 'Azure Blob', url: '/docs/cdp/sources/azure-blob', logo: 'azureBlob' },
]

export const ManagedSources = () => {
    const platforms = useSourcePlatforms()
    return <List className="grid gap-4 grid-cols-2 @md:grid-cols-3 not-prose" items={platforms} />
}

export const SelfHostedSources = () => {
    const platforms = SELF_HOSTED_SOURCES.map((s) => ({
        label: s.label,
        url: s.url,
        image: getLogo(s.logo),
    }))

    return <List className="grid gap-4 grid-cols-2 @md:grid-cols-3 not-prose" items={platforms} />
}

export const AllSources = () => {
    const platforms = useSourcePlatforms()
    return <List className="grid @2xl:grid-cols-2 @3xl:grid-cols-3 mb-4" items={platforms} />
}
