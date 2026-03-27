import React from 'react'
import List from 'components/List'
import useSourcePlatforms from 'hooks/useSourcePlatforms'
import { getLogo } from 'constants/logos'

const SELF_HOSTED_SOURCES = [
    { label: 'S3', url: '/docs/data-warehouse/sources/s3', image: getLogo('s3') },
    { label: 'Google Cloud Storage', url: '/docs/data-warehouse/sources/gcs', image: getLogo('googleCloud') },
    { label: 'Cloudflare R2', url: '/docs/data-warehouse/sources/r2', image: getLogo('cloudflareR2') },
    { label: 'Azure Blob', url: '/docs/data-warehouse/sources/azure-blob', image: getLogo('azureBlob') },
]

interface DWInstallationPlatformsProps {
    showFiltering?: boolean
    maxItems?: number
}

const DWInstallationPlatforms = ({ showFiltering = false, maxItems }: DWInstallationPlatformsProps) => {
    const managedPlatforms = useSourcePlatforms()
    const platforms = [...managedPlatforms, ...SELF_HOSTED_SOURCES].sort((a, b) => a.label.localeCompare(b.label))

    const displayedPlatforms = maxItems ? platforms.slice(0, maxItems) : platforms
    const remainingCount = maxItems && platforms.length > maxItems ? platforms.length - maxItems : 0

    return (
        <>
            <List className="grid @2xl:grid-cols-2 @3xl:grid-cols-3 mb-4" items={displayedPlatforms} />
            {remainingCount > 0 && <p className="text-sm font-bold ml-6">+ {remainingCount} more!</p>}
        </>
    )
}
export default DWInstallationPlatforms
