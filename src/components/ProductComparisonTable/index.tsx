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
import { featureFlagsFeatures } from '../../hooks/featureDefinitions/feature_flags'
import { productAnalyticsFeatures } from '../../hooks/featureDefinitions/product_analytics'
import { webAnalyticsFeatures } from '../../hooks/featureDefinitions/web_analytics'
import { experimentsFeatures } from '../../hooks/featureDefinitions/experiments'
import { surveysFeatures } from '../../hooks/featureDefinitions/surveys'
import { revenueAnalyticsFeatures } from '../../hooks/featureDefinitions/revenue_analytics'
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
    rows: (RowConfig | string)[] // Accept both RowConfig objects and string paths
    width?: 'auto' | 'full'
}

export default function ProductComparisonTable({ competitors, rows, width = 'auto' }: ProductComparisonTableProps) {
    // Feature definitions (loaded before use)
    const featureDefs: Record<string, any> = {
        error_tracking: errorTrackingFeatures,
        session_replay: sessionReplayFeatures,
        feature_flags: featureFlagsFeatures,
        product_analytics: productAnalyticsFeatures,
        web_analytics: webAnalyticsFeatures,
        experiments: experimentsFeatures,
        surveys: surveysFeatures,
        revenue_analytics: revenueAnalyticsFeatures,
        platform: platformFeatures,
    }

    // Expand a section or product path into individual row configs
    const expandPath = (path: string): RowConfig[] => {
        const parts = path.split('.')
        const expanded: RowConfig[] = []

        if (parts.length === 1) {
            // "error_tracking" - expand entire product (all sections)
            const product = parts[0]
            if (product === 'platform') {
                // Expand all platform sections
                const platformDefs: any = platformFeatures
                if (platformDefs) {
                    for (const featureSet in platformDefs) {
                        const set = platformDefs[featureSet]
                        if (set) {
                            // Add header for section
                            expanded.push({ label: featureSet, type: 'header' })
                            // Add all features in this set
                            for (const feature in set) {
                                expanded.push({
                                    type: 'platform',
                                    featureSet,
                                    feature,
                                })
                            }
                        }
                    }
                }
            } else {
                // Expand all sections of a product
                const defs = featureDefs[product]
                if (defs) {
                    // Add summary if it exists
                    if (defs.summary) {
                        expanded.push({
                            type: 'product',
                            product,
                            label: defs.summary.name,
                            description: defs.summary.description,
                        })
                    }
                    // Add all sections
                    for (const featureSet in defs) {
                        if (featureSet === 'summary') continue
                        const set = defs[featureSet]
                        if (set && typeof set === 'object') {
                            // Add header for section (convert to sentence case)
                            const sectionName = featureSet
                                .split('_')
                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(' ')
                            expanded.push({ label: sectionName, type: 'header' })
                            // Add all features in this section
                            for (const feature in set) {
                                if (set[feature] && typeof set[feature] === 'object' && 'name' in set[feature]) {
                                    expanded.push({
                                        type: 'feature',
                                        product,
                                        featureSet,
                                        feature,
                                    })
                                }
                            }
                        }
                    }
                }
            }
        } else if (parts.length === 2) {
            // "error_tracking.core" - expand a section
            const [product, featureSet] = parts
            if (product === 'platform') {
                // Platform section
                const platformDefs: any = platformFeatures
                const set = platformDefs?.[featureSet]
                if (set) {
                    expanded.push({ label: featureSet, type: 'header' })
                    for (const feature in set) {
                        expanded.push({
                            type: 'platform',
                            featureSet,
                            feature,
                        })
                    }
                }
            } else {
                // Product section
                const defs = featureDefs[product]
                const set = defs?.[featureSet]
                if (set && typeof set === 'object') {
                    if (featureSet === 'summary') {
                        // Summary is a single product-level row
                        expanded.push({
                            type: 'product',
                            product,
                            label: set.name,
                            description: set.description,
                        })
                    } else {
                        // Regular section - add header and all features
                        // Convert snake_case to Title Case (e.g., "core_features" -> "Core Features")
                        const sectionName = featureSet
                            .split('_')
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')
                        expanded.push({ label: sectionName, type: 'header' })
                        for (const feature in set) {
                            if (set[feature] && typeof set[feature] === 'object' && 'name' in set[feature]) {
                                expanded.push({
                                    type: 'feature',
                                    product,
                                    featureSet,
                                    feature,
                                })
                            }
                        }
                    }
                }
            }
        }

        return expanded
    }

    // Normalize rows - convert strings to RowConfig and expand sections/products
    const normalizeRows = (rows: (RowConfig | string)[]): RowConfig[] => {
        const normalized: RowConfig[] = []

        for (const row of rows) {
            if (typeof row === 'string') {
                // String path - check if it needs expansion
                const parts = row.split('.')
                // Only expand 1 or 2 part paths (products or sections)
                // 3 part paths are individual features and don't need expansion
                if (parts.length <= 2) {
                    if (parts[0] === 'platform') {
                        // Platform expansion (e.g., "platform.deployment" or "platform")
                        if (parts.length === 1 || parts.length === 2) {
                            normalized.push(...expandPath(row))
                            continue
                        }
                    } else {
                        // Product expansion
                        const product = parts[0]
                        const defs = featureDefs[product]
                        if (defs) {
                            if (parts.length === 1 || (parts.length === 2 && parts[1] === 'summary')) {
                                // Expand entire product or summary
                                normalized.push(...expandPath(row))
                                continue
                            } else if (parts.length === 2) {
                                // Expand section
                                normalized.push(...expandPath(row))
                                continue
                            }
                        }
                    }
                }
                // Individual feature (3+ parts) - convert to RowConfig
                normalized.push({ path: row })
            } else {
                // RowConfig object - check if path needs expansion
                if (row.path) {
                    const parts = row.path.split('.')
                    if (parts.length <= 2) {
                        const product = parts[0]
                        const defs = featureDefs[product]
                        if (defs) {
                            // Expand, but apply overrides from row config
                            const expanded = expandPath(row.path)
                            if (row.label || row.description) {
                                // Apply overrides to first expanded row
                                if (expanded.length > 0 && expanded[0].type !== 'header') {
                                    expanded[0] = { ...expanded[0], ...row }
                                }
                            }
                            normalized.push(...expanded)
                            continue
                        }
                    }
                }
                // No expansion needed
                normalized.push(row)
            }
        }

        return normalized
    }

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

    // Normalize, parse, and expand rows
    const normalizedRows = normalizeRows(rows)
    const parsedRows = normalizedRows.map((row) => inferType(parseRowConfig(row)))

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

        // Handle product-level comparisons - check summary first, then fallback to productDescriptions
        if (row.type === 'product' && row.product) {
            const defs = featureDefs[row.product]
            const summary = defs?.summary
            if (summary) {
                return {
                    name: row.label || summary.name || row.product,
                    description: row.description || summary.description,
                }
            }
            // Fallback to productDescriptions for backward compatibility
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
