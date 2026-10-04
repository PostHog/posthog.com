// PostHogSource: data warehouse source configs from PostHog's public API.
import type { Source } from '../index'
import { fetchJson } from '../http'
import type { PostHogSourceNode } from '../types'

/** A source config from /api/public_source_configs. */
export interface SourceConfig {
    name: string
    label?: string
    iconPath?: string
    docsUrl?: string
    unreleasedSource?: boolean
    betaSource?: boolean
    featured?: boolean
    caption?: string
    fields?: unknown[]
    tables?: unknown[]
    permissionsCaption?: string
    featureFlag?: string
}

/** A list or a map of configs, or an error body. */
type SourceConfigsResponse =
    SourceConfig[] | Record<string, SourceConfig> | { type?: string; code?: string; detail?: string }

const isError = (data: SourceConfigsResponse): data is { type?: string; code?: string; detail?: string } =>
    !Array.isArray(data) && (data.type === 'invalid_request' || data.code === 'not_found')

export const posthogSources: Source = {
    name: 'posthog-sources',
    types: ['PostHogSource'],
    async fetch() {
        const data = await fetchJson<SourceConfigsResponse>('https://us.posthog.com/api/public_source_configs')
        if (isError(data)) throw new Error(data.detail || 'invalid response')
        const configs: SourceConfig[] = Array.isArray(data) ? data : Object.values(data as Record<string, SourceConfig>)
        const nodes: PostHogSourceNode[] = configs.flatMap((config) => {
            const displayName = config.label || config.name
            if (!displayName) return []
            // Prefer the slug from the source's own posthog.com docsUrl so the listing link always
            // matches the committed doc file (e.g. `active-campaign`, not the label-derived
            // `activecampaign`). Fall back to the label for sources without a posthog docs URL.
            const docsSlug = config.docsUrl?.match(/\/docs\/cdp\/sources\/([^/?#]+)/)?.[1]
            const labelSlug = displayName
                .toLowerCase()
                .replace(/\./g, '')
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, '')
            return [
                {
                    id: `posthog-source-${config.name}`,
                    sourceId: config.name,
                    slug: docsSlug || labelSlug,
                    name: displayName,
                    icon_url: config.iconPath ? `https://us.posthog.com${config.iconPath}` : null,
                    docsUrl: config.docsUrl || null,
                    unreleased: config.unreleasedSource || false,
                    beta: config.betaSource || false,
                    featured: config.featured || false,
                    caption: config.caption || null,
                    sourceFields: config.fields || [],
                    tables: config.tables || [],
                    permissionsCaption: config.permissionsCaption || null,
                    featureFlag: config.featureFlag || null,
                },
            ]
        })
        return { PostHogSource: nodes }
    },
}
