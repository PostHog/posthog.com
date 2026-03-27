import React from 'react'
import List from 'components/List'
import useSourcePlatforms from 'hooks/useSourcePlatforms'

interface DWInstallationPlatformsProps {
    showFiltering?: boolean
    maxItems?: number
}

const DWInstallationPlatforms = ({ showFiltering = false, maxItems }: DWInstallationPlatformsProps) => {
    const platforms = useSourcePlatforms()

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
