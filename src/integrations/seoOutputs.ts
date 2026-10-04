// Writes the SEO and agent outputs after `astro build`, next to the built pages in dist/:
//
// - a `.md` sibling of every docs, handbook, blog, newsletter, changelog, pocket guide, and pricing page
//   (converted from its built HTML), plus /llms.txt and /llms-full.txt
// - /openapi.json and /docs/open-api-spec/<operationId>.md, SDK reference .md files
// - /pricing.md, /platform.md, product page .md files, /changelog.md and /changelog/<year>.md
// - /post-build-data.json (read by the OG image and Strapi sync workflows)
// - the sitemap, the Algolia index (when its keys are set), and the Standard.site sync (when enabled)
//
// The RSS feeds are endpoints in src/pages. Each step logs its own failure and the others still run.
// MINIMAL_BUILD=true (preview deploys) skips everything.
import type { AstroIntegration, AstroIntegrationLogger } from 'astro'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { MARKDOWN_CONTENT_PATHS } from '../constants'
import { nodes } from '../data-layer'
import { excerpt, getContent } from '../data-layer/content'
import { env, MINIMAL_BUILD } from '../data-layer/env'
import { fetchJson } from '../data-layer/http'
import type {
    ChangelogVideoNode,
    PageViewsNode,
    ProductDataNode,
    RoadmapNode,
    SqueakTeamNode,
    ToolNode,
} from '../data-layer/types'
import { algoliaRecords, uploadAlgoliaRecords } from '../lib/seo/algolia'
import {
    type ChangelogRoadmapNode,
    type OpenApiDocument,
    generateApiSpecMarkdown,
    generateChangelogMd,
    generateLlmsFullTxt,
    generateLlmsTxt,
    generateOpenApiSpec,
    generatePlatformMd,
    generatePricingMd,
    generateProductPagesMarkdown,
    generateRawMarkdownPages,
    generateSdkReferencesMarkdown,
    generateSdkTypeMarkdown,
} from '../lib/seo/markdown'
import { postBuildData } from '../lib/seo/postBuildData'
import { builtPages, writeSitemap } from '../lib/seo/sitemap'
import { syncStandardSiteDocuments } from '../lib/seo/standardSite'
import type { SdkReferenceData } from '../templates/sdk/SdkReference'

// A path that starts with a section name. There is no boundary after the name.
const MARKDOWN_PATHS = new RegExp(`^/(${MARKDOWN_CONTENT_PATHS.map((p) => p.replace('/', '')).join('|')})`)

const byDateDesc =
    <T>(date: (item: T) => string | null | undefined) =>
    (a: T, b: T) =>
        new Date(date(b) ?? 0).getTime() - new Date(date(a) ?? 0).getTime()

/** The view modules in src/views by URL, as src/lib/routes/views.ts maps them, for search records. */
function viewModules(): Map<string, string> {
    const root = path.join(process.cwd(), 'src', 'views')
    const modules = new Map<string, string>()
    if (!fs.existsSync(root)) return modules
    const files = (fs.readdirSync(root, { recursive: true }) as string[])
        .filter((file) => /\.(tsx|jsx|ts|js)$/.test(file) && !file.includes('{'))
        .map((file) => `/src/views/${file.split(path.sep).join('/')}`)
        .sort()
    for (const module of files) {
        const urlPath =
            module
                .replace(/^\/src\/views/, '')
                .replace(/\.(tsx|jsx|ts|js)$/, '')
                .replace(/\/index$/, '') || '/'
        if (modules.has(urlPath) && !/\/index\.(tsx|jsx)$/.test(module)) continue
        modules.set(urlPath, module)
    }
    return modules
}

/** Writes every output into `outDir`. Exported so the outputs can be regenerated without a full build. */
export async function writeSeoOutputs(outDir: string, logger: AstroIntegrationLogger) {
    const step = async (name: string, run: () => unknown) => {
        const started = Date.now()
        try {
            await run()
            logger.info(`${name} done in ${Date.now() - started}ms`)
        } catch (error) {
            logger.error(`${name} failed: ${(error as Error).stack ?? error}`)
        }
    }

    await step('openapi', async () => {
        const url = env('POSTHOG_OPEN_API_SPEC_URL') || 'https://app.posthog.com/api/schema/'
        const spec = await fetchJson<OpenApiDocument>(url, { headers: { Accept: 'application/json' } })
        generateOpenApiSpec(spec, outDir)
        generateApiSpecMarkdown(spec, outDir)
    })

    await step('sdk references', () => {
        for (const reference of nodes<SdkReferenceData>('SdkReferences')) {
            generateSdkReferencesMarkdown(reference, outDir)
            generateSdkTypeMarkdown(reference, outDir)
        }
    })

    await step('pricing.md', () => {
        const products = nodes<ProductDataNode>('ProductData')[0]?.products ?? []
        // Without the billing service the data layer has fake products, which must not be published.
        if (!env('BILLING_SERVICE_URL') || products.length === 0) {
            logger.warn('pricing.md skipped: no billing data (BILLING_SERVICE_URL)')
            return
        }
        generatePricingMd(products, outDir)
    })

    await step('page .md files, llms.txt, llms-full.txt', () => {
        const sources = getContent()
            .filter((node) => MARKDOWN_PATHS.test(node.fields.slug))
            // contents/ wins over the posthog/posthog clone when both have a page at the same path.
            .sort(
                (a, b) =>
                    Number(b.parent.sourceInstanceName === 'contents') -
                    Number(a.parent.sourceInstanceName === 'contents')
            )
            .map((node) => ({
                fields: node.fields,
                frontmatter: { title: node.frontmatter.title as string | undefined },
            }))
        const pages = generateRawMarkdownPages(sources, outDir)
        generateLlmsTxt(pages, outDir)
        generateLlmsFullTxt(pages, outDir)
    })

    await step('platform.md and product .md files', () => {
        generatePlatformMd(outDir)
        generateProductPagesMarkdown(outDir)
    })

    // The /changelog page renders a virtualized list, so its HTML cannot be converted.
    await step('changelog.md', () => {
        const roadmaps = nodes<RoadmapNode>('Roadmap')
            .filter((node): node is RoadmapNode & { date: string } => node.complete === true && !!node.date)
            .sort(byDateDesc((node) => node.date))
            .map((node): ChangelogRoadmapNode => ({
                strapiID: node.strapiID,
                title: node.title,
                description: node.description,
                date: node.date,
                cta: node.cta,
                teams: node.teams,
                topic: node.topic,
            }))
        const videos = [...nodes<ChangelogVideoNode>('ChangelogVideo')].sort(byDateDesc((video) => video.publishedAt))
        generateChangelogMd(roadmaps, videos, outDir)
    })

    // Self-gates on STANDARD_SITE_SYNC and BSKY_APP_PASSWORD; a no-op otherwise.
    await step('standard.site sync', () =>
        syncStandardSiteDocuments(
            getContent()
                .filter((node) => /^\/blog\//.test(node.fields.slug) && !node.isFuture && node.frontmatter.date)
                .map((node) => ({
                    fields: { slug: node.fields.slug },
                    excerpt: excerpt(node, 250),
                    text: node.text,
                    frontmatter: {
                        title: node.frontmatter.title,
                        date: node.frontmatter.date,
                        tags: node.frontmatter.tags,
                        seo: node.frontmatter.seo,
                    },
                })),
            outDir
        )
    )

    await step('post-build-data.json', () => {
        fs.writeFileSync(path.join(outDir, 'post-build-data.json'), JSON.stringify(postBuildData()))
    })

    const pages = builtPages(outDir)

    await step('sitemap', () => writeSitemap(pages, outDir, env('PUBLIC_SQUEAK_API_HOST')))

    const appId = env('PUBLIC_ALGOLIA_APP_ID')
    const apiKey = env('ALGOLIA_API_KEY')
    const indexName = env('PUBLIC_ALGOLIA_INDEX_NAME')
    if (appId && apiKey && indexName) {
        await step('algolia', async () => {
            const views = viewModules()
            const records = algoliaRecords({
                pages: pages.map(({ path: pagePath }) => ({ path: pagePath, component: views.get(pagePath) })),
                content: getContent(),
                tools: nodes<ToolNode>('Tool'),
                teams: nodes<SqueakTeamNode>('SqueakTeam'),
                pageViews: nodes<PageViewsNode>('PageViews'),
            })
            await uploadAlgoliaRecords(records, { appId, apiKey, indexName })
            logger.info(`algolia: indexed ${records.length} records`)
        })
    } else {
        logger.warn('No Algolia keys present in environment, skipping sending information to algolia')
    }
}

export default function seoOutputs(): AstroIntegration {
    return {
        name: 'posthog:seo-outputs',
        hooks: {
            'astro:build:done': async ({ dir, logger }) => {
                if (MINIMAL_BUILD()) {
                    logger.info('MINIMAL_BUILD is set: skipping SEO outputs')
                    return
                }
                await writeSeoOutputs(fileURLToPath(dir), logger)
            },
        },
    }
}
