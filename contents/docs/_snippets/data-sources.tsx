import React from 'react'
import List from 'components/List'
import useSourcePlatforms from 'hooks/useSourcePlatforms'
import { getLogo } from 'constants/logos'
import { EXTRA_SOURCES } from 'constants/sources'

const extraPlatforms = EXTRA_SOURCES.map((s) => ({
    label: s.name,
    url: `/docs/data-pipelines/sources/${s.slug}`,
    image: getLogo(s.logo),
}))

export const ManagedSources = () => {
    const managed = useSourcePlatforms()
    const platforms = [...managed, ...extraPlatforms].sort((a, b) => a.label.localeCompare(b.label))
    return <List className="grid gap-4 grid-cols-2 @md:grid-cols-3 not-prose" items={platforms} />
}

export const AllSources = () => {
    const managed = useSourcePlatforms()
    const platforms = [...managed, ...extraPlatforms].sort((a, b) => a.label.localeCompare(b.label))
    return <List className="grid @2xl:grid-cols-2 @3xl:grid-cols-3 mb-4" items={platforms} />
}
