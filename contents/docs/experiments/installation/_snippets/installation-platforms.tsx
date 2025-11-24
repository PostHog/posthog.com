import React from 'react'
import List from 'components/List'
import useInstallationPlatforms from '../../../../../src/navs/useInstallationPlatforms'

interface InstallationPlatformsProps {
    urlFragment?: string
}

const InstallationPlatforms = ({ urlFragment = '' }: InstallationPlatformsProps) => {
    let platforms = useInstallationPlatforms('docs/experiments/installation', 'experiments installation')

    if (urlFragment) {
        platforms = platforms.map((platform) => ({
            ...platform,
            url: `${platform.url}${urlFragment}`,
        }))
    }

    return <List className="grid gap-4 grid-cols-2 sm:grid-cols-2 mb-4 not-prose" items={platforms} />
}
export default InstallationPlatforms
