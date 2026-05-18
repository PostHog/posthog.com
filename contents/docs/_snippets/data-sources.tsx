import React from 'react'
import List from 'components/List'
import useSourcePlatforms from 'hooks/useSourcePlatforms'
import { getLogo } from 'constants/logos'
import { SELF_HOSTED_SOURCES } from 'constants/sources'

const selfHostedPlatforms = SELF_HOSTED_SOURCES.map((s) => ({
    label: s.name,
    url: `/docs/data-warehouse/sources/${s.slug}`,
    image: getLogo(s.logo),
}))

export const ManagedSources = () => {
    const platforms = useSourcePlatforms()
    return <List className="grid gap-4 grid-cols-2 @md:grid-cols-3 not-prose" items={platforms} />
}

export const SelfHostedSources = () => {
    return <List className="grid gap-4 grid-cols-2 @md:grid-cols-3 not-prose" items={selfHostedPlatforms} />
}

export const AllSources = () => {
    const managed = useSourcePlatforms()
    const platforms = [...managed, ...selfHostedPlatforms].sort((a, b) => a.label.localeCompare(b.label))
    return <List className="grid @2xl:grid-cols-2 @3xl:grid-cols-3 mb-4" items={platforms} />
}
