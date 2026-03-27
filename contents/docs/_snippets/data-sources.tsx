import React from 'react'
import List from 'components/List'
import useSourcePlatforms from 'hooks/useSourcePlatforms'
import { getLogo } from 'constants/logos'

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
    const managed = useSourcePlatforms()
    const selfHosted = SELF_HOSTED_SOURCES.map((s) => ({
        label: s.label,
        url: s.url,
        image: getLogo(s.logo),
    }))
    const platforms = [...managed, ...selfHosted].sort((a, b) => a.label.localeCompare(b.label))
    return <List className="grid @2xl:grid-cols-2 @3xl:grid-cols-3 mb-4" items={platforms} />
}
