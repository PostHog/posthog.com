import React from 'react'
import OSTable from 'components/OSTable'
import Logo from 'components/Logo'
import Link from 'components/Link'
import { IconArrowUpRight } from '@posthog/icons'
import { useApp } from '../../context/App'

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
import { fathom } from '../../hooks/competitorData/fathom'
import { plausible } from '../../hooks/competitorData/plausible'
import { statsig } from '../../hooks/competitorData/statsig'

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
import { dashboardsFeatures } from '../../hooks/featureDefinitions/dashboards'
import { cdpFeatures } from '../../hooks/featureDefinitions/cdp'
import { dataWarehouseFeatures } from '../../hooks/featureDefinitions/data_warehouse'
import { llmAnalyticsFeatures } from '../../hooks/featureDefinitions/llm_analytics'
import { heatmapsFeatures } from '../../hooks/featureDefinitions/heatmaps'

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
    // For custom per-competitor values (array length should match competitors array)
    values?: (string | boolean | number | undefined)[]
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
        dashboards: dashboardsFeatures,
        web_analytics: webAnalyticsFeatures,
        experiments: experimentsFeatures,
        surveys: surveysFeatures,
        revenue_analytics: revenueAnalyticsFeatures,
        platform: platformFeatures,
        cdp: cdpFeatures,
        data_warehouse: dataWarehouseFeatures,
        llm_analytics: llmAnalyticsFeatures,
        heatmaps: heatmapsFeatures,
    }

    // Resolve nested nodes by dot-path
    const getDefsNode = (root: any, path?: string) => {
        if (!path) return root
        const parts = path.split('.')
        let node = root
        for (const p of parts) {
            node = node?.[p]
            if (!node) break
        }
        return node
    }

    // Expand a section or product path into individual row configs
    const expandPath = (path: string): RowConfig[] => {
        const parts = path.split('.')
        const expanded: RowConfig[] = []

        if (parts.length === 1) {
            // "product" - show single product row (availability) or expand platform
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
                            for (const feature in set.features || {}) {
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
                // Single product-level row – let getFeatureInfo pull summary (including url/docsUrl)
                const defs = featureDefs[product]
                if (defs) {
                    expanded.push({
                        type: 'product',
                        product,
                    })
                }
            }
        } else if (parts.length >= 2) {
            // product + nested section path
            const product = parts[0]
            const featureSetPath = parts.slice(1).join('.')
            if (product === 'platform') {
                // Platform section
                const platformDefs: any = platformFeatures
                const set = getDefsNode(platformDefs, featureSetPath)
                if (set) {
                    const sectionLabel = featureSetPath.split('.').slice(-1)[0]
                    expanded.push({ label: sectionLabel, type: 'header' })
                    const featureMap: any = set?.features || set
                    for (const feature in featureMap) {
                        expanded.push({
                            type: 'platform',
                            featureSet: featureSetPath,
                            feature,
                        })
                    }
                }
            } else {
                // Product section
                const defs = featureDefs[product]
                const set = getDefsNode(defs, featureSetPath)
                if (set && typeof set === 'object') {
                    if (featureSetPath === 'summary') {
                        // Summary is a single product-level row – allow getFeatureInfo to source from summary
                        expanded.push({
                            type: 'product',
                            product,
                        })
                    } else {
                        const segs = featureSetPath.split('.')
                        const lastSegment = segs[segs.length - 1]
                        const penultimate = segs[segs.length - 2]

                        // If path points to a subproduct (not ending in "features"), render availability row only
                        if (lastSegment !== 'features') {
                            // Emit a product-level availability row for the subproduct.
                            // Leave label/description undefined so getFeatureInfo can source from section.summary
                            expanded.push({ type: 'product', product, featureSet: featureSetPath })
                            return expanded
                        }

                        // Regular section - add header and all features
                        // For "...<Section>.features", use the section name (penultimate segment) as header label
                        const sectionName = penultimate
                            ? penultimate
                                  .split('_')
                                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                  .join(' ')
                            : 'Features'
                        expanded.push({ label: sectionName, type: 'header' })
                        // Add all features in this section (support nested or flat)
                        const featureMap: any = set?.features || set
                        for (const feature in featureMap) {
                            const feat = featureMap[feature]
                            if (feat && typeof feat === 'object' && 'name' in feat) {
                                expanded.push({
                                    type: 'feature',
                                    product,
                                    featureSet: featureSetPath,
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
                } else if (parts[parts.length - 1] === 'features') {
                    // Expand section and include header + all features
                    normalized.push(...expandPath(row))
                    continue
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
                    } else if (parts[parts.length - 1] === 'features') {
                        const expanded = expandPath(row.path)
                        if (row.label || row.description) {
                            if (expanded.length > 0 && expanded[0].type !== 'header') {
                                expanded[0] = { ...expanded[0], ...row }
                            }
                        }
                        normalized.push(...expanded)
                        continue
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
                // "product.section" or "platform.section"
                if (parts[0] === 'platform') {
                    return { ...row, type: 'platform', featureSet: parts[1], path: undefined }
                }
                // Check if this is a product reference (e.g., "product_analytics")
                const productDesc = productDescriptions[parts[0] as keyof typeof productDescriptions]
                if (productDesc) {
                    return { ...row, type: 'product', product: parts[0], path: undefined }
                }
                return { ...row, type: 'feature', product: parts[0], featureSet: parts[1], path: undefined }
            } else {
                // 3+ parts: allow nested featureSet path
                if (parts[0] === 'platform') {
                    return {
                        ...row,
                        type: 'platform',
                        featureSet: parts.slice(1, -1).join('.'),
                        feature: parts[parts.length - 1],
                        path: undefined,
                    }
                }
                return {
                    ...row,
                    type: 'feature',
                    product: parts[0],
                    featureSet: parts.slice(1, -1).join('.'),
                    feature: parts[parts.length - 1],
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

        // Headers: label set without product or feature (but not if values array is present)
        if (row.label && !row.product && !row.feature && !row.values) {
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

        // Custom row with values array: treat as feature
        if (row.values) {
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
        fathom,
        plausible,
        statsig,
    }

    // Helper to get feature value from competitor data
    const getFeatureValue = (competitorKey: string, row: RowConfig): boolean | string | number | undefined => {
        const competitor = competitorData[competitorKey]
        if (!competitor) return undefined

        if (row.type === 'header') return ''

        if (row.type === 'product' && row.product) {
            // Product-level comparison: check availability, supporting nested subproducts via featureSet
            const productData = competitor.products?.[row.product]
            if (!productData) return undefined

            // Beta label takes precedence unless customValue provided
            if (productData.beta === true && row.customValue === undefined) {
                return 'Beta'
            }

            if (row.customValue !== undefined) {
                return row.customValue
            }

            if (row.featureSet) {
                const getNode = (root: any, path?: string) => {
                    if (!path) return root
                    const parts = path.split('.')
                    let node = root
                    for (const p of parts) {
                        let next = node?.[p]
                        if (typeof next === 'undefined' && node?.features && typeof node.features === 'object') {
                            next = node.features[p]
                        }
                        if (typeof next === 'undefined' && p === 'features' && node?.features) {
                            next = node.features
                        }
                        node = next
                        if (!node) break
                    }
                    return node
                }
                const node = getNode(productData, row.featureSet)
                const available = node?.available ?? productData?.available
                return available
            }

            return productData.available ?? undefined
        }

        if (row.type === 'platform') {
            const platform = competitor.platform || {}
            const featureKey = row.feature || ''
            if (row.featureSet) {
                const set = row.featureSet.split('.').reduce((acc: any, key: string) => acc?.[key], platform)
                const val = set?.features?.[featureKey] ?? set?.[featureKey]
                return val
            }
            return platform[featureKey]
        }

        if (row.type === 'feature' && row.product) {
            const productData = competitor.products?.[row.product]
            if (!productData) return undefined
            if (!productData.available) return false

            const featureKey = row.feature || ''
            if (row.featureSet === 'integrations') {
                return productData.integrations?.[featureKey]
            }
            if (row.featureSet === 'pricing') {
                return productData.pricing?.[featureKey]
            }
            // Support nested subproducts: traverse into productData by featureSet path
            const getNode = (root: any, path?: string) => {
                if (!path) return root
                const parts = path.split('.')
                let node = root
                for (const p of parts) {
                    // Try exact key first
                    let next = node?.[p]
                    // If not found, try looking under a nested "features" map
                    if (typeof next === 'undefined' && node?.features && typeof node.features === 'object') {
                        next = node.features[p]
                    }
                    // If token is literally 'features' move into the map when present
                    if (typeof next === 'undefined' && p === 'features' && node?.features) {
                        next = node.features
                    }
                    node = next
                    if (!node) break
                }
                return node
            }
            const sectionNode = getNode(productData, row.featureSet)
            if (sectionNode) {
                const direct = sectionNode.features?.[featureKey] ?? sectionNode?.[featureKey]
                if (typeof direct !== 'undefined') {
                    return direct
                }
            }
            return productData.features?.[featureKey]
        }

        // Product-level availability (supports nested subproducts via featureSet path)
        if (row.type === 'product' && row.product) {
            let productData = competitor.products?.[row.product]
            // Fallback: some vendors may nest subproducts under another product (e.g., product_analytics.dashboards)
            if (!productData && competitor.products) {
                for (const rootKey in competitor.products) {
                    const maybe = competitor.products[rootKey]?.[row.product]
                    if (maybe && typeof maybe === 'object') {
                        productData = maybe
                        break
                    }
                }
            }
            if (!productData) return undefined

            const getNode = (root: any, path?: string) => {
                if (!path) return root
                const parts = path.split('.')
                let node = root
                for (const p of parts) {
                    let next = node?.[p]
                    if (typeof next === 'undefined' && node?.features && typeof node.features === 'object') {
                        next = node.features[p]
                    }
                    if (typeof next === 'undefined' && p === 'features' && node?.features) {
                        next = node.features
                    }
                    node = next
                    if (!node) break
                }
                return node
            }
            const node = getNode(productData, row.featureSet)
            const available = node?.available ?? productData?.available
            return available
        }

        return undefined
    }

    // Helper to get feature name and description
    const getFeatureInfo = (row: RowConfig): { name: string; description?: string; url?: string; docsUrl?: string } => {
        if (row.type === 'header') return { name: row.label || '' }

        // If label is explicitly provided, use it
        if (row.label) {
            return { name: row.label, description: row.description }
        }

        // Handle platform features - nested schema: section { description?, features: { ... } }
        if (row.type === 'platform' && row.feature) {
            const platformDefs = featureDefs.platform
            if (platformDefs) {
                // If featureSet is specified, use it directly
                if (row.featureSet) {
                    const set = getDefsNode(platformDefs, row.featureSet)
                    const feat = set?.features?.[row.feature] || set?.[row.feature]
                    if (feat) {
                        return {
                            name: feat.name || row.feature,
                            description: row.description || feat.description,
                        }
                    }
                } else {
                    // Search through all featureSets for this platform feature
                    for (const featureSet in platformDefs) {
                        const feat =
                            platformDefs[featureSet]?.features?.[row.feature] || platformDefs[featureSet]?.[row.feature]
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

        // Get from feature definition if available (non-platform features with nested sections)
        if (row.feature && row.featureSet) {
            const defs = featureDefs[row.product || '']
            const set = getDefsNode(defs, row.featureSet)
            const feat = set?.features?.[row.feature] || set?.[row.feature]

            return {
                name: feat?.name || row.feature,
                description: row.description || feat?.description,
            }
        }

        // Try to find feature in any featureSet (search nested features)
        if (row.feature && row.product) {
            const defs = featureDefs[row.product]
            if (defs) {
                // Search through all featureSets for this feature
                for (const featureSet in defs) {
                    const feat = defs[featureSet]?.features?.[row.feature] || defs[featureSet]?.[row.feature]
                    if (feat) {
                        return {
                            name: feat.name || row.feature,
                            description: row.description || feat.description,
                        }
                    }
                }
            }
        }

        // Handle product-level rows (availability) for product or nested subproduct
        if (row.type === 'product' && row.product) {
            const defs = featureDefs[row.product]
            // If this targets a nested subproduct (featureSet path), use section.summary when present
            if (row.featureSet) {
                const section = getDefsNode(defs, row.featureSet)
                const sectionSummary = section?.summary
                const lastSeg = row.featureSet.split('.').slice(-1)[0]
                const fallbackName = lastSeg
                    .split('_')
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(' ')
                const name = sectionSummary?.name || fallbackName
                const description = row.description || sectionSummary?.description || section?.description
                const url = sectionSummary?.url
                const docsUrl = sectionSummary?.docsUrl
                return { name, description, url, docsUrl }
            }
            const summary = defs?.summary
            if (summary) {
                return {
                    name: row.label || summary.name || row.product,
                    description: row.description || summary.description,
                    url: summary.url,
                    docsUrl: summary.docsUrl,
                }
            }
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
    const renderCell = (competitorKey: string, row: RowConfig, competitorIndex: number): React.ReactNode => {
        if (row.type === 'header') {
            return <strong>{row.label}</strong>
        }

        // If values array is provided, use it instead of fetching from competitor data
        let value: any
        if (row.values !== undefined) {
            value = row.values[competitorIndex]
        } else {
            value = getFeatureValue(competitorKey, row)
        }

        if (typeof value === 'boolean') {
            return value ? (
                <span className="text-green font-bold">✓</span>
            ) : (
                <span className="text-red font-bold">✗</span>
            )
        }

        if (typeof value === 'string' || typeof value === 'number') {
            return <span>{value}</span>
        }

        // undefined or null → no data: render blank cell
        return null
    }

    const { siteSettings } = useApp()
    const isDark = siteSettings.theme === 'dark'

    // Build columns
    const columns = [
        { name: '', width: 'auto', align: 'left' as const },
        ...competitors.map((key) => ({
            name: (
                <>
                    {key === 'posthog' ? (
                        <Logo className="h-5 mx-auto w-auto max-w-full" fill={isDark ? 'white' : ''} />
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
            width: 'minmax(150px, 1fr)',
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
                        content: <div className="font-semibold text-base">{row.label || ''}</div>,
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
                        {featureInfo.url ? (
                            <Link to={featureInfo.url} className="group text-sm underline" state={{ newWindow: true }}>
                                <strong>{featureInfo.name}</strong>
                                <IconArrowUpRight className="invisible group-hover:visible inline-block size-4 text-secondary relative -top-px" />
                            </Link>
                        ) : (
                            <strong>{featureInfo.name}</strong>
                        )}
                        {featureInfo.description && (
                            <div className="text-sm text-secondary mt-1">{featureInfo.description}</div>
                        )}
                    </div>
                ),
            },
            ...competitors.map((key, index) => ({
                content: renderCell(key, row, index),
            })),
        ]

        return {
            key: `row-${index}`,
            cells,
        }
    })

    return <OSTable columns={columns} rows={tableRows} width={width} />
}
