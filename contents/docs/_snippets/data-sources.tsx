import React from 'react'
import List from 'components/List'
import usePlatformList from 'hooks/docs/usePlatformList'
import { getLogo } from 'constants/logos'

export const ManagedSources = () => {
    const platforms = usePlatformList('docs/data-warehouse/sources', 'as a source', {
        platformSourceType: 'managed',
    })

    // Add Supabase link to tutorial
    const supabase = {
        label: 'Supabase',
        url: '/tutorials/supabase-query',
        image: getLogo('supabase'),
    }

    return <List className="grid gap-4 grid-cols-2 @md:grid-cols-3 not-prose" items={[...platforms, supabase]} />
}

export const SelfHostedSources = () => {
    const platforms = usePlatformList('docs/data-warehouse/sources', 'as a source', {
        platformSourceType: 'self-hosted',
    })

    return <List className="grid gap-4 grid-cols-2 @md:grid-cols-3 not-prose" items={platforms} />
}

export const AllSources = () => {
    const platforms = usePlatformList('docs/data-warehouse/sources', 'as a source')

    // Add Supabase link to tutorial
    const supabase = {
        label: 'Supabase',
        url: '/tutorials/supabase-query',
        image: getLogo('supabase'),
    }

    return <List className="grid @2xl:grid-cols-2 @3xl:grid-cols-3 mb-4" items={[...platforms, supabase]} />
}
