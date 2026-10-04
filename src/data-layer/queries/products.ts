// Product data: billing products (pricing pages, product pages, calculators), data pipelines and sources,
// MCP tools, agent skills, templates, testimonials, merch inventory, and the self-driving PR feed.
import { getContent, type ContentNode } from '../content'
import { nodes } from '../index'
import type {
    AgentSkillNode,
    BillingFeature,
    BillingPlan,
    BillingProduct,
    BillingTier,
    CloudinaryImageNode,
    McpToolNode,
    PostHogPipelineNode,
    PostHogSourceNode,
    PostHogWorkflowTemplateNode,
    SelfDrivingPullRequestNode,
    ShopifyProductNode,
    TestimonialsJsonNode,
} from '../types'
import type { QueryResult } from './index'

/** Optional fields become `T | null`, as GraphQL returned them. */
type Picked<T, K extends keyof T> = { [P in K]: undefined extends T[P] ? Exclude<T[P], undefined> | null : T[P] }

/** The listed fields of an object, with missing values as null. */
function pick<T, K extends keyof T>(item: T, keys: readonly K[]): Picked<T, K> {
    return Object.fromEntries(keys.map((key) => [key, item[key] ?? null])) as Picked<T, K>
}

/* Billing */

const FEATURE_FIELDS = [
    'key',
    'name',
    'description',
    'category',
    'limit',
    'note',
    'entitlement_only',
    'is_plan_default',
    'unit',
] as const satisfies readonly (keyof BillingFeature)[]

const TIER_FIELDS = [
    'current_amount_usd',
    'current_usage',
    'flat_amount_usd',
    'unit_amount_usd',
    'up_to',
] as const satisfies readonly (keyof BillingTier)[]

const PLAN_FIELDS = [
    'name',
    'description',
    'docs_url',
    'image_url',
    'plan_key',
    'product_key',
    'unit',
    'unit_amount_usd',
    'free_allocation',
    'included_if',
    'contact_support',
] as const satisfies readonly (keyof BillingPlan)[]

const PRODUCT_FIELDS = [
    'name',
    'type',
    'description',
    'docs_url',
    'image_url',
    'icon_key',
    'unit',
    'inclusion_only',
    'contact_support',
    'legacy_product',
] as const satisfies readonly (keyof BillingProduct)[]

const feature = (item: BillingFeature) => pick(item, FEATURE_FIELDS)

const plan = (item: BillingPlan, addon: boolean) => ({
    ...pick(item, PLAN_FIELDS),
    // Only add-on plans were queried with flat_rate.
    ...(addon ? { flat_rate: item.flat_rate ?? null } : {}),
    features: (item.features ?? []).map(feature),
    tiers: item.tiers?.map((tier) => pick(tier, TIER_FIELDS)) ?? null,
})

const addon = (item: BillingProduct) => ({
    ...pick(item, PRODUCT_FIELDS),
    features: item.features?.map(feature) ?? null,
    plans: item.plans.map((addonPlan) => plan(addonPlan, true)),
})

export const queries = {
    // Every billing product with its plans, tiers, features, and add-ons. Pricing pages and calculators,
    // useProducts (product pages), and the product slides read it.
    'products-billing': () =>
        nodes<{ products: BillingProduct[] }>('ProductData')
            .flatMap((node) => node.products)
            .map((product) => ({
                ...pick(product, PRODUCT_FIELDS),
                usage_key: product.usage_key ?? null,
                plans: product.plans.map((productPlan) => plan(productPlan, false)),
                addons: product.addons?.map(addon) ?? null,
            })),

    /* Data pipelines and sources */

    // Released managed sources, A to Z, as the home page and the data warehouse pages list them.
    'products-source-platforms': () =>
        nodes<PostHogSourceNode>('PostHogSource')
            .filter((source) => source.unreleased !== true)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((source) => ({
                label: source.name,
                url: `/docs/data-warehouse/sources/${source.slug}`,
                image: source.icon_url ?? '',
            })),

    // The destination count and a few featured destinations for the home page hero.
    'products-hero-destinations': () => {
        const destinations = pipelines('destination').filter((pipeline) => pipeline.status !== 'coming_soon')
        return {
            count: destinations.length,
            featured: HERO_DESTINATIONS.map((slug) => destinations.find((pipeline) => pipeline.slug === slug))
                .filter((pipeline) => pipeline !== undefined)
                .map((pipeline) => ({
                    name: pipeline.name,
                    url: docFor(pipeline)?.fields.slug || `/docs/cdp/destinations/${pipeline.slug}`,
                    icon_url: pipeline.icon_url,
                })),
        }
    },

    // Sources, destinations, and transformations for the integrations library table.
    'products-integrations': () => {
        const listed = (type: 'destination' | 'transformation') =>
            pipelines(type).map((pipeline) => ({
                ...pick(pipeline, ['id', 'slug', 'name', 'category', 'description', 'icon_url', 'type', 'status']),
                docsSlug: docFor(pipeline)?.fields.slug ?? null,
            }))
        return {
            sources: nodes<PostHogSourceNode>('PostHogSource').map((source) =>
                pick(source, ['name', 'slug', 'icon_url', 'unreleased'])
            ),
            destinations: listed('destination'),
            transformations: listed('transformation'),
        }
    },

    // Pipelines with their inputs and doc page, for the data pipelines product page.
    'products-pipelines': () => {
        // Only destination inputs were queried with `secret`.
        const withDocs = (type: PostHogPipelineNode['type'], secret = false) =>
            pipelines(type).map((pipeline) => {
                const doc = docFor(pipeline)
                return {
                    ...pick(pipeline, ['id', 'slug', 'name', 'category', 'description', 'icon_url', 'type', 'status']),
                    docsSlug: doc?.fields.slug ?? null,
                    /** The doc page's content key, for MDXRenderer. */
                    docsBody: doc?.body ?? null,
                    inputs_schema:
                        pipeline.inputs_schema?.map((input) => ({
                            ...pick(input, ['key', 'type', 'label', 'required', 'description']),
                            ...(secret ? { secret: input.secret ?? null } : {}),
                        })) ?? null,
                }
            })
        return {
            destinations: withDocs('destination', true),
            transformations: withDocs('transformation'),
            sourceWebhooks: withDocs('source_webhook'),
        }
    },

    /* Other product data */

    // Recently merged self-driving PRs, newest first, for the self-driving loop.
    'products-self-driving-prs': () =>
        nodes<SelfDrivingPullRequestNode>('SelfDrivingPullRequest')
            .filter((pr) => pr.state === 'merged')
            .sort((a, b) => new Date(b.mergedAt || 0).getTime() - new Date(a.mergedAt || 0).getTime())
            .slice(0, 8)
            .map((pr) => pick(pr, ['prNumber', 'summary', 'type', 'scope', 'url', 'state', 'openedAt', 'mergedAt'])),

    // MCP tools, A to Z by name. McpToolsList filters them by feature.
    'products-mcp-tools': () =>
        nodes<McpToolNode>('McpTool')
            .map((tool) => pick(tool, ['name', 'title', 'summary', 'feature']))
            .sort((a, b) => (a.name ?? '').localeCompare(b.name ?? '')),

    // Agent skills from the monorepo, for the skills pages.
    'products-agent-skills': () =>
        nodes<AgentSkillNode>('AgentSkill').map((skill) =>
            pick(skill, ['product', 'name', 'description', 'sourcePath', 'mcpTools'])
        ),

    // Hedgehog images (Cloudinary folder "hogs") for the roadmap form's image picker.
    'products-hog-images': () =>
        nodes<CloudinaryImageNode>('CloudinaryImage')
            .filter((image) => image.folder === 'hogs')
            .map(({ secure_url, public_id }) => ({ secure_url, public_id })),

    // Customer testimonials, for TestimonialsTable.
    'products-testimonials': () =>
        nodes<TestimonialsJsonNode>('TestimonialsJson').map(({ featuresUsed, quote, author }) => ({
            featuresUsed,
            quote,
            author,
        })),

    // Dashboard and survey templates (content under /templates, except docs) and workflow templates.
    'products-templates': () => ({
        mdxTemplates: getContent()
            .filter((node) => /^\/templates\/(?!.*\/docs).*/.test(node.fields.slug))
            .map((node) => {
                const { title, subtitle, badge, thumbnail, filters } = node.frontmatter
                return {
                    id: node.id,
                    url: node.fields.slug,
                    title: title as string,
                    subtitle: (subtitle as string | undefined) ?? null,
                    badge: (badge as string | undefined) ?? null,
                    thumbnailUrl: ((typeof thumbnail === 'string' ? thumbnail : thumbnail?.publicURL) ?? null) as
                        string | null,
                    /** The first `filters.type`: dashboard or survey. */
                    type: (filters?.type?.[0] ?? null) as 'dashboard' | 'survey' | null,
                    maintainer: (filters?.maintainer as string | undefined) ?? null,
                }
            }),
        workflowTemplates: nodes<PostHogWorkflowTemplateNode>('PostHogWorkflowTemplate').map((template) => ({
            templateId: template.templateId,
            slug: template.fields.slug,
            name: template.name,
            description: template.description,
            image_url: template.image_url,
            created_at: template.created_at,
            created_by: template.created_by
                ? { first_name: template.created_by.first_name, last_name: template.created_by.last_name }
                : null,
        })),
    }),

    // Shopify variant ids that sell when out of stock (inventory policy "continue"), for the merch cart.
    'products-merch-continue-selling': () =>
        nodes<ShopifyProductNode>('ShopifyProduct')
            .flatMap((product) => product.variants)
            .filter((variant) => variant.inventoryPolicy.toLowerCase() === 'continue')
            .map((variant) => variant.shopifyId),
}

const HERO_DESTINATIONS = ['zapier', 'hubspot', 'salesforce', 'intercom', 'customerio', 'zendesk', 'webhook']

const pipelines = (type: PostHogPipelineNode['type']) =>
    nodes<PostHogPipelineNode>('PostHogPipeline').filter((pipeline) => pipeline.type === type)

let docsByTemplateId: Map<string, ContentNode> | undefined

/** A pipeline's doc page: the first content node whose `frontmatter.templateId` includes its `pipelineId`. */
function docFor(pipeline: PostHogPipelineNode): ContentNode | undefined {
    if (!docsByTemplateId) {
        docsByTemplateId = new Map()
        for (const node of getContent()) {
            for (const id of [node.frontmatter.templateId].flat()) {
                if (typeof id === 'string' && !docsByTemplateId.has(id)) docsByTemplateId.set(id, node)
            }
        }
    }
    return docsByTemplateId.get(pipeline.pipelineId)
}

export type BillingProducts = QueryResult<typeof queries, 'products-billing'>
export type BillingProductData = BillingProducts[number]
export type SourcePlatforms = QueryResult<typeof queries, 'products-source-platforms'>
export type HeroDestinations = QueryResult<typeof queries, 'products-hero-destinations'>
export type Integrations = QueryResult<typeof queries, 'products-integrations'>
export type Pipelines = QueryResult<typeof queries, 'products-pipelines'>
export type SelfDrivingPRs = QueryResult<typeof queries, 'products-self-driving-prs'>
export type McpTools = QueryResult<typeof queries, 'products-mcp-tools'>
export type AgentSkills = QueryResult<typeof queries, 'products-agent-skills'>
export type HogImages = QueryResult<typeof queries, 'products-hog-images'>
export type Testimonials = QueryResult<typeof queries, 'products-testimonials'>
export type Templates = QueryResult<typeof queries, 'products-templates'>
export type MerchContinueSelling = QueryResult<typeof queries, 'products-merch-continue-selling'>
