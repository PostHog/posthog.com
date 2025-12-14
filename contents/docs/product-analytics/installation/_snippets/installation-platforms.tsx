import React from 'react'
import List from 'components/List'
import usePlatformList from 'hooks/docs/usePlatformList'

interface InstallationPlatformsProps {
    columns?: 2 | 3 | 4
}

const ProductAnalyticsInstallationPlatforms = ({ columns = 3 }: InstallationPlatformsProps) => {
    const columnClassMap = {
        2: '@md:grid-cols-2',
        3: '@md:grid-cols-3',
        4: '@md:grid-cols-4',
    }

    const platforms = usePlatformList('docs/product-analytics/installation', 'product analytics installation')
    const filteredPlatforms = platforms.filter((platform) => !platform.url.includes('ai-wizard'))

    return <List className={`grid gap-4 grid-cols-2 ${columnClassMap[columns]} not-prose`} items={filteredPlatforms} />
}
export default ProductAnalyticsInstallationPlatforms
