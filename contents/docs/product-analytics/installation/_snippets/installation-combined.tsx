import React from 'react'
import List from 'components/List'
import usePlatformList from 'hooks/docs/usePlatformList'
import useFrameworkList from 'hooks/docs/useFrameworkList'

interface InstallationCombinedProps {
    columns?: 2 | 3 | 4
}

const ProductAnalyticsInstallationCombined = ({ columns = 3 }: InstallationCombinedProps) => {
    const columnClassMap = {
        2: '@md:grid-cols-2',
        3: '@md:grid-cols-3',
        4: '@md:grid-cols-4',
    }

    const platforms = usePlatformList('docs/product-analytics/installation', 'product analytics installation')
    const filteredPlatforms = platforms.filter((platform) => !platform.url.includes('ai-wizard'))
    const frameworks = useFrameworkList()

    const PINNED_URLS = [
        '/docs/product-analytics/installation/web',
        '/docs/libraries/next-js',
        '/docs/product-analytics/installation/react-native',
        '/docs/product-analytics/installation/react',
        '/docs/product-analytics/installation/nodejs',
        '/docs/product-analytics/installation/flutter',
    ]

    const all = [...filteredPlatforms, ...frameworks]
    const pinned = PINNED_URLS.flatMap((url) => all.filter((item) => item.url === url))
    const rest = all.filter((item) => !PINNED_URLS.includes(item.url))
    const combined = [...pinned, ...rest]

    return <List className={`grid gap-4 grid-cols-2 ${columnClassMap[columns]} not-prose`} items={combined} />
}

export default ProductAnalyticsInstallationCombined
