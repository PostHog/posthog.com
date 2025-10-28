import React from 'react'
import OSTable from 'components/OSTable'
import Logo from 'components/Logo'
import Link from 'components/Link'
import { IconArrowUpRight } from '@posthog/icons'

// Competitor data imports
import { posthog } from '../../hooks/competitorData/posthog'
import { sentry } from '../../hooks/competitorData/sentry'
import { logrocket } from '../../hooks/competitorData/logrocket'
import { bugsnag } from '../../hooks/competitorData/bugsnag'
import { datadog } from '../../hooks/competitorData/datadog'
import { fullstory } from '../../hooks/competitorData/fullstory'
import { hotjar } from '../../hooks/competitorData/hotjar'
import { matomo } from '../../hooks/competitorData/matomo'
import { clarity } from '../../hooks/competitorData/clarity'
import { rollbar } from '../../hooks/competitorData/rollbar'
import { glitchtip } from '../../hooks/competitorData/glitchtip'
import { signoz } from '../../hooks/competitorData/signoz'
import { optimizely } from '../../hooks/competitorData/optimizely'
import { launchdarkly } from '../../hooks/competitorData/launchdarkly'
import { flagsmith } from '../../hooks/competitorData/flagsmith'
import { growthbook } from '../../hooks/competitorData/growthbook'
import { amplitude } from '../../hooks/competitorData/amplitude'
import { mixpanel } from '../../hooks/competitorData/mixpanel'
import { heap } from '../../hooks/competitorData/heap'
import { pendo } from '../../hooks/competitorData/pendo'
import { ga4 } from '../../hooks/competitorData/ga4'
import { vwo } from '../../hooks/competitorData/vwo'
import { sprig } from '../../hooks/competitorData/sprig'
import { segment } from '../../hooks/competitorData/segment'
import { mparticle } from '../../hooks/competitorData/mparticle'
import { rudderstack } from '../../hooks/competitorData/rudderstack'
import { fivetran } from '../../hooks/competitorData/fivetran'
import { baremetrics } from '../../hooks/competitorData/baremetrics'
import { chartmogul } from '../../hooks/competitorData/chartmogul'
import { stripe } from '../../hooks/competitorData/stripe'

// Feature definition imports
import { errorTrackingFeatures } from '../../hooks/featureDefinitions/error_tracking'
import { sessionReplayFeatures } from '../../hooks/featureDefinitions/session_replay'
import { platformFeatures } from '../../hooks/featureDefinitions/platform'

interface RowConfig {
    // Shorthand: e.g., "error_tracking.core" or "platform.deployment.self_host"
    path?: string
    // Detailed format (legacy support)
    type?: 'feature' | 'header' | 'platform'
    product?: string
    featureSet?: string
    feature?: string
    label?: string
    description?: string
    exclude?: string[]
}

interface ProductComparisonTableProps {
    competitors: string[]
    rows: RowConfig[]
}

export default function ProductComparisonTable({ competitors, rows }: ProductComparisonTableProps) {
    // Parse shorthand notation (e.g., "error_tracking.core" or "platform.deployment.self_host")
    const parseRowConfig = (row: RowConfig): RowConfig => {
        if (row.path) {
            const parts = row.path.split('.')
            if (parts.length === 1) {
                // "error_tracking" - entire product or platform
                if (parts[0] === 'platform') {
                    return { ...row, type: 'platform', path: undefined }
                }
                return { ...row, type: 'feature', product: parts[0], path: undefined }
            } else if (parts.length === 2) {
                // "error_tracking.core" or "platform.deployment"
                if (parts[0] === 'platform') {
                    return { ...row, type: 'platform', featureSet: parts[1], path: undefined }
                }
                return { ...row, type: 'feature', product: parts[0], featureSet: parts[1], path: undefined }
            } else if (parts.length === 3) {
                // "error_tracking.core.exception_capture" or "platform.deployment.self_host"
                if (parts[0] === 'platform') {
                    return { ...row, type: 'platform', featureSet: parts[1], feature: parts[2], path: undefined }
                }
                return {
                    ...row,
                    type: 'feature',
                    product: parts[0],
                    featureSet: parts[1],
                    feature: parts[2],
                    path: undefined,
                }
            }
        }
        return row
    }

    // Parse all rows to support shorthand notation
    const parsedRows = rows.map(parseRowConfig)

    // Competitor data
    const competitorData: Record<string, any> = {
        posthog,
        sentry,
        logrocket,
        bugsnag,
        datadog,
        fullstory,
        hotjar,
        matomo,
        clarity,
        rollbar,
        glitchtip,
        signoz,
        optimizely,
        launchdarkly,
        flagsmith,
        growthbook,
        amplitude,
        mixpanel,
        heap,
        pendo,
        ga4,
        vwo,
        sprig,
        segment,
        mparticle,
        rudderstack,
        fivetran,
        baremetrics,
        chartmogul,
        stripe,
    }

    // Feature definitions
    const featureDefs: Record<string, any> = {
        error_tracking: errorTrackingFeatures,
        session_replay: sessionReplayFeatures,
        platform: platformFeatures,
    }

    // Helper to get feature value from competitor data
    const getFeatureValue = (competitorKey: string, row: RowConfig): boolean | string => {
        const competitor = competitorData[competitorKey]
        if (!competitor) return false

        if (row.type === 'header') return ''

        if (row.type === 'platform') {
            const platformFeatures = competitor.platform || {}
            const featureKey = row.feature || ''
            return platformFeatures[featureKey] || false
        }

        if (row.type === 'feature' && row.product) {
            const productData = competitor.products?.[row.product]
            if (!productData || !productData.available) return false

            const featureKey = row.feature || ''
            if (row.featureSet === 'integrations') {
                return productData.integrations?.[featureKey] || false
            }
            return productData.features?.[featureKey] || false
        }

        return false
    }

    // Helper to get feature name and description
    const getFeatureInfo = (row: RowConfig): { name: string; description?: string } => {
        if (row.type === 'header') return { name: row.label || '' }

        // If label is explicitly provided, use it
        if (row.label) {
            return { name: row.label, description: row.description }
        }

        // Get from feature definition if available
        if (row.feature && row.featureSet) {
            const defs = row.type === 'platform' ? featureDefs.platform : featureDefs[row.product || '']
            const set = defs?.[row.featureSet]
            const feat = set?.[row.feature]

            return {
                name: feat?.name || row.feature,
                description: row.description || feat?.description,
            }
        }

        // Try to find feature in any featureSet (for flat structures like session_replay)
        if (row.feature && row.product) {
            const defs = featureDefs[row.product]
            if (defs) {
                // Search through all featureSets for this feature
                for (const featureSet in defs) {
                    const feat = defs[featureSet]?.[row.feature]
                    if (feat) {
                        return {
                            name: feat.name || row.feature,
                            description: row.description || feat.description,
                        }
                    }
                }
            }
        }

        return { name: row.label || row.feature || '', description: row.description }
    }

    // Render competitor cell
    const renderCell = (competitorKey: string, row: RowConfig): React.ReactNode => {
        if (row.type === 'header') {
            return <strong>{row.label}</strong>
        }

        const value = getFeatureValue(competitorKey, row)

        if (typeof value === 'boolean') {
            return value ? (
                <span className="text-green font-bold">✓</span>
            ) : (
                <span className="text-red font-bold">✗</span>
            )
        }

        if (typeof value === 'string') {
            return <span>{value}</span>
        }

        return <span className="text-red font-bold">✗</span>
    }

    // Build columns
    const columns = [
        { name: 'Feature', width: 'auto', align: 'left' as const },
        ...competitors.map((key) => ({
            name: (
                <>
                    {key === 'posthog' ? (
                        <Logo className="h-5 mx-auto" />
                    ) : competitorData[key]?.name ? (
                        competitorData[key].name
                    ) : (
                        key
                    )}
                    {competitorData[key]?.assets?.comparisonArticle && (
                        <>
                            <br />
                            <Link
                                to={competitorData[key].assets.comparisonArticle}
                                className="underline text-[13px] opacity-75 hover:opacity-100 ml-3"
                                state={{ newWindow: true }}
                            >
                                compare
                                <IconArrowUpRight className="inline-block size-3" />
                            </Link>
                        </>
                    )}
                </>
            ),
            width: 'auto',
            align: 'center' as const,
        })),
    ]

    // Build rows
    const tableRows = parsedRows.map((row, index) => {
        // Handle header rows - span across all columns
        if (row.type === 'header') {
            return {
                key: `row-${index}`,
                cells: [
                    {
                        content: <div className="font-semibold text-lg">{row.label || ''}</div>,
                        className: 'col-span-full border-b-2 border-primary pb-2 mb-2',
                    },
                ],
            }
        }

        const featureInfo = getFeatureInfo(row)
        const cells = [
            {
                content: (
                    <div>
                        <strong>{featureInfo.name}</strong>
                        {featureInfo.description && (
                            <div className="text-sm text-secondary mt-1">{featureInfo.description}</div>
                        )}
                    </div>
                ),
            },
            ...competitors.map((key) => ({
                content: renderCell(key, row),
            })),
        ]

        return {
            key: `row-${index}`,
            cells,
        }
    })

    return <OSTable columns={columns} rows={tableRows} />
}
