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
import { productDescriptions } from '../../hooks/featureDefinitions/products'

interface RowConfig {
    // Shorthand: e.g., "error_tracking.core" or "platform.deployment.self_host" or "product_analytics"
    path?: string
    // Type is inferred automatically, but can be explicitly set if needed
    type?: 'feature' | 'header' | 'platform' | 'product'
    product?: string
    featureSet?: string
    feature?: string
    label?: string
    description?: string
    exclude?: string[]
    // For product-level comparisons, can specify beta status or custom value
    customValue?: string | boolean
}

interface ProductComparisonTableProps {
    competitors: string[]
    rows: RowConfig[]
    width?: 'auto' | 'full'
}

export default function ProductComparisonTable({ competitors, rows, width = 'auto' }: ProductComparisonTableProps) {
    // Parse shorthand notation (e.g., "error_tracking.core" or "platform.deployment.self_host")
    const parseRowConfig = (row: RowConfig): RowConfig => {
        if (row.path) {
            const parts = row.path.split('.')
            if (parts.length === 1) {
                // "error_tracking" - entire product or platform or product-level comparison
                if (parts[0] === 'platform') {
                    return { ...row, type: 'platform', path: undefined }
                }
                // Check if this is a product reference for product-level comparison
                const productDesc = productDescriptions[parts[0] as keyof typeof productDescriptions]
                if (productDesc) {
                    return { ...row, type: 'product', product: parts[0], path: undefined }
                }
                return { ...row, type: 'feature', product: parts[0], path: undefined }
            } else if (parts.length === 2) {
                // "error_tracking.core" or "platform.deployment"
                if (parts[0] === 'platform') {
                    return { ...row, type: 'platform', featureSet: parts[1], path: undefined }
                }
                // Check if this is a product reference (e.g., "product_analytics")
                const productDesc = productDescriptions[parts[0] as keyof typeof productDescriptions]
                if (productDesc) {
                    return { ...row, type: 'product', product: parts[0], path: undefined }
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

    // Infer type from row configuration if not explicitly set
    const inferType = (row: RowConfig): RowConfig => {
        // If type is already set, use it (backward compatibility)
        if (row.type) {
            return row
        }

        // Headers: label set without product or feature
        if (row.label && !row.product && !row.feature) {
            return { ...row, type: 'header' }
        }

        // Platform features: feature set without product, or path starts with 'platform'
        if (row.path?.startsWith('platform') || (row.feature && !row.product && !row.label)) {
            // Check if feature exists in platform definitions
            const platformDefs: any = platformFeatures
            let isPlatformFeature = false
            if (platformDefs && row.feature) {
                for (const featureSet in platformDefs) {
                    if (platformDefs[featureSet]?.[row.feature]) {
                        isPlatformFeature = true
                        break
                    }
                }
            }
            if (isPlatformFeature || row.path?.startsWith('platform')) {
                return { ...row, type: 'platform' }
            }
        }

        // Product-level comparison: product set but no featureSet or feature
        if (row.product && !row.featureSet && !row.feature) {
            return { ...row, type: 'product' }
        }

        // Feature-level: product and (featureSet or feature) are set
        if (row.product && (row.featureSet || row.feature)) {
            return { ...row, type: 'feature' }
        }

        // Default fallback (shouldn't reach here, but keep for safety)
        return row
    }

    // Parse all rows to support shorthand notation and infer types
    const parsedRows = rows.map((row) => inferType(parseRowConfig(row)))

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

        if (row.type === 'product' && row.product) {
            // Product-level comparison: check if product is available
            const productData = competitor.products?.[row.product]
            if (!productData) return false

            // Check for beta status
            if (productData.beta === true && row.customValue === undefined) {
                return 'Beta'
            }

            // Check for custom value override
            if (row.customValue !== undefined) {
                return row.customValue
            }

            return productData.available || false
        }

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

        // Handle platform features - search through all featureSets if no featureSet specified
        if (row.type === 'platform' && row.feature) {
            const platformDefs = featureDefs.platform
            if (platformDefs) {
                // If featureSet is specified, use it directly
                if (row.featureSet) {
                    const set = platformDefs[row.featureSet]
                    const feat = set?.[row.feature]
                    if (feat) {
                        return {
                            name: feat.name || row.feature,
                            description: row.description || feat.description,
                        }
                    }
                } else {
                    // Search through all featureSets for this platform feature
                    for (const featureSet in platformDefs) {
                        const feat = platformDefs[featureSet]?.[row.feature]
                        if (feat) {
                            return {
                                name: feat.name || row.feature,
                                description: row.description || feat.description,
                            }
                        }
                    }
                }
            }
        }

        // Get from feature definition if available (non-platform features)
        if (row.feature && row.featureSet) {
            const defs = featureDefs[row.product || '']
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

        // Handle product-level comparisons
        if (row.type === 'product' && row.product) {
            const productDesc = productDescriptions[row.product as keyof typeof productDescriptions]
            if (productDesc) {
                return {
                    name: row.label || productDesc.name,
                    description: row.description || productDesc.description,
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
                        <Logo className="h-5 mx-auto w-auto max-w-full" />
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
            width: 'minmax(100px, 1fr)',
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
                        className: 'col-span-full border-b-2 border-primary bg-accent pb-2',
                    },
                ],
            }
        }

        const featureInfo = getFeatureInfo(row)
        const cells = [
            {
                content: (
                    <div className="leading-tight min-w-48">
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

    return <OSTable columns={columns} rows={tableRows} width={width} />
}
