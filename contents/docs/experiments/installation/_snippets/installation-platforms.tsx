import React from 'react'
import List from 'components/List'
import usePlatformList from 'hooks/docs/usePlatformList'

interface InstallationPlatformsProps {
    columns?: 2 | 3 | 4
}

const InstallationPlatforms = ({ columns = 2 }: InstallationPlatformsProps) => {
    const columnClassMap = {
        2: '@md:grid-cols-2',
        3: '@md:grid-cols-3',
        4: '@md:grid-cols-4',
    }

    const platforms = usePlatformList('docs/experiments/installation', 'experiments installation')

    return <List className={`grid gap-4 grid-cols-2 ${columnClassMap[columns]} not-prose`} items={platforms} />
}
export default InstallationPlatforms
