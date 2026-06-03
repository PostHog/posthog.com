import React from 'react'
import List from 'components/List'
import usePlatformList from 'hooks/docs/usePlatformList'

interface RetrieveDataPlatformsProps {
    columns?: 2 | 3 | 4
}

const RetrieveDataPlatforms = ({ columns = 3 }: RetrieveDataPlatformsProps) => {
    const columnClassMap = {
        2: '@md:grid-cols-2',
        3: '@md:grid-cols-3',
        4: '@md:grid-cols-4',
    }

    const platforms = usePlatformList('docs/endpoints/start-here/retrieve-data')

    // Strip the "Retrieve data from your endpoint with " prefix for display
    const platformsWithShortLabels = platforms.map((platform) => ({
        ...platform,
        label: platform.label.replace(/^Retrieve data from your endpoint with (an? )?/i, ''),
    }))

    return (
        <List
            className={`grid gap-4 grid-cols-2 ${columnClassMap[columns]} not-prose`}
            items={platformsWithShortLabels}
        />
    )
}
export default RetrieveDataPlatforms
