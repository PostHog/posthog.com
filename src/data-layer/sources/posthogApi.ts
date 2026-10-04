// Data from PostHog's own services.
import slugify from 'slugify'
import type { Source } from '../index'
import { env } from '../env'
import { fetchJson, fetchText, mapLimit } from '../http'
import type {
    BillingProduct,
    EarlyAccessFeatureNode,
    HogFlowTemplate,
    HogFunctionTemplate,
    McpToolNode,
    PageViewsNode,
    PipelineType,
    PostHogPipelineNode,
    PostHogWorkflowTemplateNode,
    ProductDataNode,
    ProductUsageStatsNode,
} from '../types'

/* API responses */

/** services/mcp/schema/tool-definitions-all.json, keyed by tool name. */
export interface McpToolDefinition {
    title?: string
    summary?: string
    description?: string
    category?: string
    feature?: string
    required_scopes?: string[]
    [key: string]: unknown
}

export interface ProductsResponse {
    products: BillingProduct[]
}

/** A PostHog endpoint run or HogQL query: rows of values in `columns` order. */
export interface QueryResponse {
    columns?: string[]
    results?: unknown[][]
}

export interface PaginatedResponse<T> {
    results: T[]
}

export interface EarlyAccessFeature {
    id: string
    name: string
    description: string
    stage: string
    documentationUrl: string | null
    flagKey: string | null
    payload?: Record<string, unknown> | null
    assignee?: { type: string; name: string } | null
}

export interface Survey {
    id: string
    type: string
    linked_flag_key?: string | null
    start_date?: string | null
    end_date?: string | null
    questions?: { id?: string }[]
}

export interface TrendResponse {
    result: { breakdown_value: string; count: number }[]
}

/** Canonical MCP tool definitions from the PostHog monorepo, rendered on docs pages. */
export const mcpToolSource: Source = {
    name: 'mcp-tools',
    types: ['McpTool'],
    async fetch() {
        const branch = env('POSTHOG_BRANCH') ?? 'master'
        const tools = await fetchJson<Record<string, McpToolDefinition | null>>(
            `https://raw.githubusercontent.com/PostHog/posthog/${branch}/services/mcp/schema/tool-definitions-all.json`
        )
        const nodes: McpToolNode[] = Object.entries(tools).map(([name, tool]) => ({
            id: `mcp-tool-${name}`,
            name,
            title: tool?.title || name,
            summary: tool?.summary || '',
            category: tool?.category || '',
            feature: tool?.feature || '',
        }))
        return { McpTool: nodes }
    },
}

/** Billing products and plans for the pricing pages: a single node. */
export const productDataSource: Source = {
    name: 'product-data',
    types: ['ProductData'],
    requires: ['BILLING_SERVICE_URL'],
    async fetch() {
        const { products } = await fetchJson<ProductsResponse>(
            `${env('BILLING_SERVICE_URL')}/api/products-v2?display_friendly=true`,
            { headers: { 'Content-Type': 'application/json' } }
        )
        const node: ProductDataNode = { id: 'product-data', products }
        return { ProductData: [node] }
    },
}

export const productUsageStatsSource: Source = {
    name: 'product-usage-stats',
    types: ['ProductUsageStats'],
    requires: ['POSTHOG_APP_API_KEY'],
    async fetch() {
        const body = await fetchJson<QueryResponse>(
            'https://us.posthog.com/api/environments/2/endpoints/product_active_usage_30d/run',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env('POSTHOG_APP_API_KEY')}` },
                body: JSON.stringify({}),
            }
        )
        const columns = body.columns ?? []
        const [product, users, orgs] = ['product', 'unique_users', 'unique_orgs'].map((name) => columns.indexOf(name))
        const count = (value: unknown) => (typeof value === 'number' ? value : null)
        const nodes: ProductUsageStatsNode[] = (body.results ?? []).flatMap((row) =>
            typeof row[product] === 'string' && row[product]
                ? [
                      {
                          id: `product-usage-stats-30d-${row[product]}`,
                          product: row[product] as string,
                          unique_users: count(row[users]),
                          unique_orgs: count(row[orgs]),
                      },
                  ]
                : []
        )
        return { ProductUsageStats: nodes }
    },
}

// Segment's destination docs, rebranded, give the intro and installation sections of segment-* pipelines
function cleanSegmentMarkdown(markdown: string) {
    return markdown
        .replaceAll(/^---[\s\S]*?---/g, '') // Remove frontmatter
        .replaceAll(/{%\s*.*?\s*%}/g, '') // Remove {% ... %}
        .replaceAll(/{:.*?}/g, '') // Remove {: ... }
        .replaceAll(/{{.*?}}/g, '') // Remove {{ ... }}
        .replaceAll('Segment', 'PostHog')
        .replaceAll('Connections > Catalog', 'Data pipelines')
        .replaceAll('Catalog', 'Data pipelines')
        .replaceAll(' (Actions)', '')
        .replaceAll('segmentio', 'posthog')
        .replaceAll(/\[([^\]]+)\]\(https?:\/\/[^/]*segment\.com[^)]*\)(\s*\{:.*?\})?/g, '$1') // Keep only the text of segment.com links
        .replaceAll(/> \w+ ""/g, '')
        .replaceAll(/^.*Both of these destinations receive data from PostHog.*$/gm, '') // The Actions-framework banner
        .replaceAll(/^.*(?:maintains this destination|maintained by|contact.*support|support.*team).*$/gm, '') // Lines about other maintainers or support
        .trim()
}

function introSection(markdown: string) {
    const heading = markdown.match(/^#{1,2}\s+/m)
    return heading ? markdown.substring(0, markdown.indexOf(heading[0])).trim() : markdown
}

function gettingStartedSection(markdown: string) {
    const heading = markdown.match(/^#{1,2}\s+Getting started\s*$/im)
    if (!heading) return ''
    const after = markdown.substring(markdown.indexOf(heading[0]) + heading[0].length)
    const next = after.match(/^#+\s+/m)
    return '## Installation\n\n' + (next ? after.substring(0, after.indexOf(next[0])) : after).trim()
}

const PIPELINE_SLUGS: Record<PipelineType, (id: string) => string> = {
    transformation: (id) => id.replace('plugin-', ''),
    destination: (id) => id.replace('template-', ''),
    source_webhook: (id) => id.replace('template-', ''),
}

/**
 * Data pipeline templates. Both APIs are public, so this runs without GITHUB_API_KEY and sends the
 * token, when there is one, for the Segment docs.
 * The Mdx page of a pipeline is the content node whose `frontmatter.templateId` is `pipelineId`.
 */
export const pipelineSource: Source = {
    name: 'posthog-pipelines',
    types: ['PostHogPipeline'],
    async fetch() {
        const token = env('GITHUB_API_KEY')
        const headers: Record<string, string> = token ? { Authorization: `token ${token}` } : {}
        const types = Object.keys(PIPELINE_SLUGS) as PipelineType[]
        const byType = await Promise.all(
            types.map(async (type) => {
                const { results } = await fetchJson<PaginatedResponse<HogFunctionTemplate>>(
                    `https://us.posthog.com/api/public_hog_function_templates?type=${type}&limit=350`
                )
                return mapLimit(results, 10, async (pipeline): Promise<PostHogPipelineNode> => {
                    let snippets = {}
                    if (pipeline.id.startsWith('segment-')) {
                        const url = `https://raw.githubusercontent.com/posthog/segment-docs/refs/heads/develop/src/connections/destinations/catalog/${pipeline.id.replace(
                            'segment-',
                            ''
                        )}/index.md`
                        const markdown = cleanSegmentMarkdown(await fetchText(url, { headers }).catch(() => ''))
                        snippets = {
                            introSnippet: introSection(markdown),
                            installationSnippet: gettingStartedSection(markdown),
                        }
                    }
                    return {
                        pipelineId: pipeline.id,
                        slug: PIPELINE_SLUGS[type](pipeline.id),
                        ...pipeline,
                        type,
                        ...snippets,
                        id: `posthog-pipeline-${pipeline.id}`,
                    }
                })
            })
        )
        return { PostHogPipeline: byType.flat() }
    },
}

export const workflowTemplateSource: Source = {
    name: 'posthog-workflow-templates',
    types: ['PostHogWorkflowTemplate'],
    async fetch() {
        const { results } = await fetchJson<PaginatedResponse<HogFlowTemplate>>(
            'https://us.posthog.com/api/public_hog_flow_templates?limit=350'
        )
        const nodes: PostHogWorkflowTemplateNode[] = results.map((template) => ({
            templateId: template.id,
            ...template,
            fields: { slug: slugify(template.name, { lower: true, strict: true }) },
            id: `posthog-workflow-template-${template.id}`,
        }))
        return { PostHogWorkflowTemplate: nodes }
    },
}

// Waitlist signups per survey, for the roadmap's "Popular" ranking. Needs a personal API key, and
// fails soft: without the key or on any error, no counts attach and the ranking is hidden.
async function waitlistCounts(): Promise<Record<string, number>> {
    const key = env('POSTHOG_ROADMAP_API_KEY')
    if (!key) return {}
    try {
        const { results } = await fetchJson<QueryResponse>('https://us.posthog.com/api/projects/2/query/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
            body: JSON.stringify({
                query: {
                    kind: 'HogQLQuery',
                    query: "SELECT properties.$survey_id AS survey_id, count() AS signups FROM events WHERE event = 'survey sent' AND timestamp >= now() - INTERVAL 24 MONTH GROUP BY survey_id",
                },
            }),
        })
        const counts: Record<string, number> = {}
        for (const [surveyId, signups] of results ?? []) {
            if (typeof surveyId === 'string' && surveyId && typeof signups === 'number') counts[surveyId] = signups
        }
        return counts
    } catch (error) {
        console.warn(`[data-layer] waitlist counts failed: ${(error as Error).message}`)
        return {}
    }
}

/**
 * Early access features (concept, alpha, beta) for /roadmap. Each feature's waitlist survey is joined
 * from the public surveys endpoint by the survey's linked_flag_key.
 */
export const earlyAccessFeatureSource: Source = {
    name: 'early-access-features',
    types: ['EarlyAccessFeature'],
    requires: ['PUBLIC_POSTHOG_API_KEY'],
    async fetch() {
        const token = env('PUBLIC_POSTHOG_API_KEY')
        const host = env('PUBLIC_POSTHOG_API_HOST') ?? 'https://us.i.posthog.com'
        const [{ earlyAccessFeatures }, { surveys }, counts] = await Promise.all([
            fetchJson<{ earlyAccessFeatures?: EarlyAccessFeature[] }>(
                `${host}/api/early_access_features/?token=${token}&stage=concept&stage=alpha&stage=beta`
            ),
            fetchJson<{ surveys?: Survey[] }>(`${host}/api/surveys/?token=${token}`).catch((error: Error) => {
                console.warn(`[data-layer] surveys for the waitlist join failed: ${error.message}`)
                return { surveys: undefined }
            }),
            waitlistCounts(),
        ])
        if (!Array.isArray(earlyAccessFeatures)) throw new Error('no earlyAccessFeatures in the response')

        // Launched `api` surveys linked to a flag are the waitlist surveys of Coming Soon features
        const waitlistSurveys: Record<string, { survey_id: string; survey_question_id?: string }> = {}
        for (const survey of surveys ?? []) {
            if (survey.type === 'api' && survey.linked_flag_key && survey.start_date && !survey.end_date) {
                waitlistSurveys[survey.linked_flag_key] = {
                    survey_id: survey.id,
                    survey_question_id: survey.questions?.[0]?.id,
                }
            }
        }

        const nodes: EarlyAccessFeatureNode[] = earlyAccessFeatures.flatMap((feature) => {
            const flagKey = feature.flagKey
            if (!flagKey) return []
            // The feature's own payload wins over the flag-key join
            const payload: EarlyAccessFeatureNode['payload'] = {
                ...waitlistSurveys[flagKey],
                ...(feature.payload ?? {}),
            }
            const surveyId = typeof payload.survey_id === 'string' ? payload.survey_id : undefined
            return [
                {
                    id: `early-access-feature-${flagKey}`,
                    name: feature.name,
                    description: feature.description,
                    stage: feature.stage,
                    documentationUrl: feature.documentationUrl,
                    flagKey,
                    featureId: feature.id,
                    waitlistCount: surveyId !== undefined ? (counts[surveyId] ?? null) : null,
                    payload,
                    assignee: feature.assignee || null,
                },
            ]
        })
        return { EarlyAccessFeature: nodes }
    },
}

/** $pageview counts per normalized pathname over the last 30 days. Content nodes read `fields.pageViews` from it. */
export const pageViewsSource: Source = {
    name: 'pageviews',
    types: ['PageViews'],
    requires: ['POSTHOG_APP_API_KEY'],
    async fetch() {
        const params = new URLSearchParams({
            events: `[{"id":"$pageview","name":"$pageview","type":"events","order":0,"properties":[{"key":"$host","type":"event","value":["posthog.com"],"operator":"exact"}]}]`,
            date_from: '-30d',
            breakdown: '$pathname',
            filter_test_accounts: 'false',
            breakdown_normalize_url: 'true',
            breakdown_limit: '2000',
            offset: '0',
        })
        const data = await fetchJson<TrendResponse>(`https://app.posthog.com/api/projects/2/insights/trend?${params}`, {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env('POSTHOG_APP_API_KEY')}` },
        })
        const counts = new Map(data.result.map((result) => [result.breakdown_value, result.count]))
        const nodes: PageViewsNode[] = [...counts].map(([pathname, count]) => ({
            id: `pageviews-${pathname}`,
            pathname,
            count,
        }))
        return { PageViews: nodes }
    },
}

export const posthogApiSources: Source[] = [
    mcpToolSource,
    productDataSource,
    productUsageStatsSource,
    pipelineSource,
    workflowTemplateSource,
    earlyAccessFeatureSource,
    pageViewsSource,
]
