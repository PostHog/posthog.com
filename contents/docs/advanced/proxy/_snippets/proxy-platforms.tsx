import React from 'react'
import List from 'components/List'
import usePlatformList from 'hooks/docs/usePlatformList'

interface ProxyPlatformsProps {
    columns?: 2 | 3 | 4
}

const ProxyPlatforms = ({ columns = 2 }: ProxyPlatformsProps) => {
    const columnClassMap = {
        2: '@md:grid-cols-2',
        3: '@md:grid-cols-3',
        4: '@md:grid-cols-4',
    }

    const platforms = usePlatformList('docs/advanced/proxy', 'reverse proxy').filter(
        (platform: { url: string }) =>
            !platform.url.includes('managed-reverse-proxy') &&
            !platform.url.includes('troubleshooting') &&
            !platform.url.includes('proxy-reference')
    )

    return <List className={`grid gap-4 grid-cols-2 ${columnClassMap[columns]} not-prose`} items={platforms} />
}
export default ProxyPlatforms
