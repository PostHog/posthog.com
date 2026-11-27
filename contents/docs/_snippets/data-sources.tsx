import React from 'react'
import List from 'components/List'
import Link from 'components/Link'
import useSourcePlatforms from 'hooks/useSourcePlatforms'
import { getLogo } from 'constants/logos'
import { EXTRA_SOURCES } from 'constants/sources'
import { useWindow } from '~/context/Window'

const DOCS_URL = '/docs/data-pipelines/sources'

const extraPlatforms = EXTRA_SOURCES.map((s) => ({
    label: s.name,
    url: `/docs/data-pipelines/sources/${s.slug}`,
    image: getLogo(s.logo),
    category: null as string | null,
}))

export const ManagedSources = () => {
    const managed = useSourcePlatforms()
    const { appWindow } = useWindow()
    const requested = (appWindow?.location as { state?: { category?: unknown } } | undefined)?.state?.category
    const category = managed.some((platform) => platform.category === requested) ? (requested as string) : null
    const platforms = [...managed, ...extraPlatforms]
        .filter((platform) => !category || platform.category === category)
        .sort((a, b) => a.label.localeCompare(b.label))
    return (
        <>
            {category && (
                <div className="not-prose mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-md border border-primary bg-accent px-3 py-2">
                    <p className="m-0 text-sm text-primary">
                        Showing <span className="font-bold">{platforms.length.toLocaleString()}</span>{' '}
                        {platforms.length === 1 ? 'source' : 'sources'} in <span className="font-bold">{category}</span>
                    </p>
                    <Link
                        to={DOCS_URL}
                        state={{ newWindow: true }}
                        className="shrink-0 text-sm font-semibold text-red underline"
                    >
                        See all sources
                    </Link>
                </div>
            )}
            <List className="grid gap-4 grid-cols-2 @md:grid-cols-3 not-prose" items={platforms} />
        </>
    )
}

export const AllSources = () => {
    const managed = useSourcePlatforms()
    const platforms = [...managed, ...extraPlatforms].sort((a, b) => a.label.localeCompare(b.label))
    return <List className="grid @2xl:grid-cols-2 @3xl:grid-cols-3 mb-4" items={platforms} />
}
