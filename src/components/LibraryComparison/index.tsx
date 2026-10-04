import React from 'react'
import CheckIcon from '../../images/check.svg?url'
import XIcon from '../../images/x.svg?url'
import Link from '../Link'
import OSTable from '../OSTable'
import libraryFeaturesJson from '@data/content-library-features.json'
import type { LibraryFeatures } from '~/data-layer/queries/content'

const libraries = libraryFeaturesJson as LibraryFeatures

export const LibraryComparison = (): JSX.Element => {
    const renderAvailability = (isAvailable?: boolean) => {
        if (isAvailable == null) {
            return null
        }
        return isAvailable ? <img className="w-4 h-4" src={CheckIcon} /> : <img className="w-4 h-4" src={XIcon} />
    }

    const columns = [
        { name: 'Library', width: 'auto', align: 'left' as const },
        { name: 'Event capture', width: '1fr', align: 'center' as const },
        { name: 'User identification', width: '1fr', align: 'center' as const },
        { name: 'Autocapture', width: '1fr', align: 'center' as const },
        { name: 'Session recording', width: '1fr', align: 'center' as const },
        { name: 'Feature flags', width: '1fr', align: 'center' as const },
        { name: 'Group analytics', width: '1fr', align: 'center' as const },
        { name: 'Error tracking', width: '1fr', align: 'center' as const },
        { name: 'Logs', width: '1fr', align: 'center' as const },
        { name: 'Tracing', width: '1fr', align: 'center' as const },
    ]

    const rows = libraries.map((lib) => ({
        key: lib.slug,
        cells: [
            {
                content: (
                    <Link to={lib.slug} state={{ newWindow: true }}>
                        {lib.title}
                    </Link>
                ),
            },
            {
                content: renderAvailability(lib.features.eventCapture),
            },
            {
                content: renderAvailability(lib.features.userIdentification),
            },
            {
                content: renderAvailability(lib.features.autoCapture),
            },
            {
                content: renderAvailability(lib.features.sessionRecording),
            },
            {
                content: renderAvailability(lib.features.featureFlags),
            },
            {
                content: renderAvailability(lib.features.groupAnalytics),
            },
            {
                content: renderAvailability(lib.features.errorTracking),
            },
            {
                content: renderAvailability(lib.features.logs),
            },
            {
                content: renderAvailability(lib.features.tracing),
            },
        ],
    }))

    return <OSTable columns={columns} rows={rows} />
}

export default LibraryComparison
