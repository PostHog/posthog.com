import React from 'react'
import List from 'components/List'
import usePlatformList from 'hooks/docs/usePlatformList'

const LinkReleasesPlatforms = () => {
    const platforms = usePlatformList('docs/error-tracking/link-releases')

    return <List className="grid gap-4 grid-cols-2 @md:grid-cols-3 not-prose" items={platforms} />
}
export default LinkReleasesPlatforms
