// Content data: lists, counts, and single pages read from the content index (contents/** and the
// posthog/posthog docs) for blog, tutorial, docs, pocket guide, Hogpedia, customer, and home components.
import fs from 'node:fs'
import path from 'node:path'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import fg from 'fast-glob'
import { excerpt, getContent, type ContentNode } from '../content'
import type { ImageData } from '../images'
import { ROOT } from '../paths'
import type { QueryResult } from './index'
import { docsMenu } from '../../navs'
import { getLogo } from '../../constants/logos'
import type { HogpediaArticleSummary } from '../../components/Hogpedia/data'
import {
    UNCATEGORIZED,
    type InboxExample,
    type Requirement,
    type SelfDrivingReport,
    type WatchedSource,
} from '../../components/SelfDrivingInbox/types'

dayjs.extend(utc)

/* Helpers */

type Frontmatter = Record<string, any>

/** The MDX `slug`: no leading slash, and a trailing slash only for index files. */
const mdxSlug = (node: ContentNode) => (node.parent.name === 'index' ? node.slug : node.slug.replace(/\/$/, ''))

const slugMatching = (pattern: RegExp) => getContent().filter((node) => pattern.test(node.fields.slug))

/** Formats in UTC, so a date never shifts to the day before. */
const formatDate = (date: unknown, format: string) => (date ? dayjs.utc(String(date)).format(format) : null)

/** Newest first. Nodes without a date go last. */
const byDateDesc = (a: ContentNode, b: ContentNode) => dateValue(b) - dateValue(a)
const dateValue = (node: ContentNode) => (node.frontmatter.date ? new Date(node.frontmatter.date).getTime() : -Infinity)

/** A frontmatter image as a plain URL: Cloudinary images carry it in `publicURL`. */
const imageUrl = (image: unknown): string | null =>
    typeof image === 'string' ? image : ((image as { publicURL?: string } | null)?.publicURL ?? null)

const imageData = (image: unknown): ImageData | null =>
    (image as { childImageSharp?: { gatsbyImageData?: ImageData | null } } | null)?.childImageSharp?.gatsbyImageData ??
    null

/** The sorted distinct values of a frontmatter field, like GraphQL's `group(field:)`. */
const distinct = (nodes: ContentNode[], field: string) =>
    [...new Set(nodes.flatMap((node) => [node.frontmatter[field]].flat().filter((value) => value != null)))]
        .map(String)
        .sort()

const compare = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0)

const page = (slug: string) => getContent().find((node) => mdxSlug(node) === slug)

const HOME_PAGE = '/contents/index.mdx'
const homePage = () => getContent().find((node) => node.id === HOME_PAGE)

const appListing = (node: ContentNode) => ({
    id: node.id,
    slug: node.fields.slug,
    title: node.frontmatter.title as string,
    badge: (node.frontmatter.badge as string | undefined) ?? null,
    price: (node.frontmatter.price as string | undefined) ?? null,
    thumbnailUrl: imageUrl(node.frontmatter.thumbnail),
    filters: (node.frontmatter.filters as { type?: string[]; maintainer?: string } | undefined) ?? null,
})

/* Docs navigation lists */

interface NavItem {
    url?: string
    children?: NavItem[]
}

/** The URLs of the direct children of the nav section at `targetUrl`. */
function navSectionChildren(sections: NavItem[], targetUrl: string): string[] {
    for (const section of sections) {
        if (section.url === targetUrl && section.children) {
            return section.children
                .filter((child) => child.url && child.url !== targetUrl)
                .map((child) => child.url as string)
        }
        if (section.children) {
            const result = navSectionChildren(section.children, targetUrl)
            if (result.length > 0) return result
        }
    }
    return []
}

/** Titled pages listed in a docs nav section, in nav order, labeled for a card grid. */
function navSectionPages(sectionUrl: string) {
    const urls = navSectionChildren((docsMenu as { children?: NavItem[] }).children ?? [], sectionUrl)
    return getContent()
        .filter((node) => node.frontmatter.title != null)
        .map((node) => ({ node, url: `/${node.slug.replace(/\/$/, '')}` }))
        .filter(({ url }) => urls.includes(url))
        .map(({ node, url }) => ({
            node,
            url,
            // Strip "How to set up X analytics with PostHog" to just "X".
            label: String(node.frontmatter.title).replace(/^How to set up (.+?) analytics with PostHog$/i, '$1'),
        }))
        .sort((a, b) => urls.indexOf(a.url) - urls.indexOf(b.url))
}

export interface DocsCard {
    url: string
    label: string
    image?: string
    icon?: string
}

export interface PlatformPage {
    /** The MDX slug, e.g. "docs/error-tracking/installation/python". */
    slug: string
    title: string
    platformLabel?: string
    platformLogo?: string
    platformIconName?: string
    platformSourceType?: string
}

/* Libraries */

export interface LibraryFeatureSupport {
    eventCapture: boolean
    autoCapture?: boolean
    featureFlags: boolean
    groupAnalytics: boolean
    sessionRecording?: boolean
    userIdentification: boolean
    surveys?: boolean
    aiObservability?: boolean
    errorTracking?: boolean
    logs?: boolean
    tracing?: boolean
}

/* Pocket guides */

/** A non-scout chapter's CTA, authored in `pocketGuideCta:` frontmatter. */
export interface PocketGuideCta {
    /** `prompt` hands the reader a PostHog AI prompt; `link` sends them somewhere. */
    kind?: 'prompt' | 'link'
    label?: string
    /** The prompt itself, for `kind: prompt`. */
    prompt?: string
    /** Where the button goes. Defaults to PostHog AI for prompts. */
    href?: string
    /** One line under the button: what happens when they act. */
    note?: string
    /** What has to be true first, printed under the button with the setup command. */
    requires?: { label: string }
}

/* Questions slide: the pages product questions link to */

const QUESTION_PAGES = /^\/(tutorials|product-engineers|founders|docs)\//

/**
 * The internal links in the `questions` lists of the product data files. The questions slide shows
 * an excerpt of the page each question links to, so only those pages are needed, not the raw body
 * of every page (over 10 MB).
 */
function productQuestionLinks(): Set<string> {
    const files = fg.sync('src/hooks/productData/**/*.{ts,tsx,js,jsx}', { cwd: ROOT })
    const links = new Set<string>()
    for (const file of files) {
        const source = fs.readFileSync(path.join(ROOT, file), 'utf8')
        for (const match of source.matchAll(/\bquestions:\s*\[/g)) {
            // The list runs to its matching bracket.
            let depth = 0
            let end = match.index + match[0].length - 1
            for (; end < source.length; end++) {
                if (source[end] === '[') depth++
                if (source[end] === ']' && --depth === 0) break
            }
            const list = source.slice(match.index, end)
            for (const [, url] of list.matchAll(/['"`](\/[^'"`#\s]+)(?:#[^'"`]*)?['"`]/g)) links.add(url)
        }
    }
    return links
}

export const queries = {
    // Number of docs pages, for the "Ask PostHog AI" callout (AskMax). The filter
    // matches "docs" anywhere in the slug.
    'content-docs-count': () => getContent().filter((node) => /docs/.test(node.slug)).length,

    // PostHog apps, for the apps page (components/Apps).
    'content-apps': () => slugMatching(/^\/apps\/(?!.*\/docs).*/).map(appListing),

    // The first 16 data pipelines, for the home page apps section (components/Home/Apps).
    'content-cdp-pipelines': () =>
        slugMatching(/^\/cdp\/(?!.*\/docs).*/)
            .slice(0, 16)
            .map(appListing),

    // Data-in pipelines (components/IngestionPipelinesList).
    'content-ingestion-pipelines': () =>
        slugMatching(/^\/cdp\/(?!.*\/docs).*/)
            .filter((node) => [node.frontmatter.filters?.type].flat().some((type) => /data-in/.test(type ?? '')))
            .map((node) => ({
                id: node.id,
                title: node.frontmatter.title as string,
                description: (node.frontmatter.description as string | undefined) ?? null,
                documentation: node.frontmatter.documentation as string,
                thumbnailUrl: imageUrl(node.frontmatter.thumbnail),
            })),

    // Blog posts, newest first (components/Blog/BlogPosts).
    'content-blog-posts': () =>
        getContent()
            .filter((node) => node.frontmatter.rootPage === '/blog' && node.frontmatter.date)
            .sort(byDateDesc)
            .map((node) => ({
                id: node.id,
                slug: node.fields.slug,
                excerpt: excerpt(node, 250),
                date: formatDate(node.frontmatter.date, 'MMMM DD, YYYY') as string,
                title: node.frontmatter.title as string,
                rootPage: node.frontmatter.rootPage as string,
                featuredImageUrl: imageUrl(node.frontmatter.featuredImage),
            })),

    // Every blog category and tag, for the handbook's style guide (components/Blog/constants/categories).
    'content-blog-taxonomy': () => {
        const posts = slugMatching(/^\/blog/).filter((node) => !node.isFuture && node.frontmatter.date)
        return { categories: distinct(posts, 'category'), tags: distinct(posts, 'tags') }
    },

    // Every tutorial tag, for the handbook (components/Tutorials/constants/tags).
    'content-tutorial-tags': () =>
        distinct(
            slugMatching(/^\/tutorials/).filter((node) => node.frontmatter.date),
            'tags'
        ),

    // Tutorials, picked by slug or tag (components/TutorialsList, components/TutorialsSlider).
    'content-tutorials': () =>
        slugMatching(/^\/tutorials/)
            .slice(0, 1000)
            .map((node) => ({
                id: node.id,
                slug: node.fields.slug,
                title: node.frontmatter.title as string,
                tags: (node.frontmatter.tags as string[] | undefined) ?? null,
            })),

    // Featured tutorials (components/Home/Tutorials).
    'content-featured-tutorials': () =>
        getContent()
            .filter((node) => node.frontmatter.featuredTutorial === true)
            .map((node) => ({
                slug: mdxSlug(node),
                title: node.frontmatter.title as string,
                image: imageData(node.frontmatter.featuredImage),
            })),

    // The home page document, for the editor that renders it (components/Home/Control).
    'content-home-page': () => {
        const node = homePage()
        return { rawBody: node?.rawBody ?? '', body: node?.id ?? null }
    },

    // The product screenshots in the home page's frontmatter (components/ProductTabs).
    'content-home-images': () =>
        ((homePage()?.frontmatter.images ?? []) as unknown[]).map((image) => ({
            url: imageUrl(image),
            image: imageData(image),
        })),

    // The wizard page document, for the editor that renders it (components/WizardPage).
    'content-wizard-page': () => {
        const node = page('wizard')
        return { rawBody: node?.rawBody ?? '', body: node?.id ?? null }
    },

    // The install snippet's content module (components/Product/Install).
    'content-install-snippet': () => page('docs/getting-started/_snippets/install')?.id ?? null,

    // The raw HTML snippet page (components/SnippetRenderer).
    'content-html-snippet': () => page('docs/integrate/snippet')?.rawBody ?? null,

    // SDK feature support, for the library comparison table (components/LibraryComparison).
    'content-library-features': () =>
        slugMatching(/^\/docs\/libraries\/[^/]+$/)
            .filter((node) => node.frontmatter.features)
            .map((node) => ({
                slug: node.fields.slug,
                title: node.frontmatter.title as string,
                features: node.frontmatter.features as LibraryFeatureSupport,
            })),

    // Library logos by library slug, and product install guide URLs, for the framework picker
    // (components/Products/InstallFrameworkGrid).
    'content-install-framework-grid': () => ({
        libraryLogos: Object.fromEntries(
            slugMatching(/^\/docs\/libraries\/[^/]+$/).flatMap((node) => {
                const logo = node.frontmatter.platformLogo
                    ? getLogo(node.frontmatter.platformLogo)
                    : imageUrl(node.frontmatter.icon)
                return logo ? [[node.fields.slug.split('/').pop() as string, logo]] : []
            })
        ) as Record<string, string>,
        productInstallUrls: slugMatching(/^\/docs\/[^/]+\/installation\/[^/]+$/).map((node) => node.fields.slug),
    }),

    // SDKs by popularity and frameworks by slug, for the docs integrate grids (components/Docs/Integrate).
    'content-integrate-libraries': () => {
        const library = (node: ContentNode) => ({
            slug: node.fields.slug,
            label: (node.frontmatter.sidebarTitle || node.frontmatter.title) as string,
            image: node.frontmatter.platformLogo
                ? (getLogo(node.frontmatter.platformLogo) ?? null)
                : imageUrl(node.frontmatter.icon),
        })
        const listed = (names: string[]) => {
            const slugs = names.map((name) => `/docs/libraries/${name}`)
            return getContent().filter((node) => slugs.includes(node.fields.slug))
        }
        return {
            sdks: listed(SDKS)
                .sort((a, b) => b.fields.pageViews - a.fields.pageViews)
                .map(library),
            frameworks: listed(FRAMEWORKS)
                .sort((a, b) => compare(a.slug, b.slug))
                .map(library),
        }
    },

    // Framework guides in the docs nav's Frameworks section, in nav order (hooks/docs/useFrameworkList).
    'content-framework-list': (): DocsCard[] =>
        navSectionPages('/docs/frameworks').map(({ node, url, label }) => {
            const { platformLogo, platformIconName } = node.frontmatter
            const logo = platformLogo ? getLogo(platformLogo) : undefined
            return {
                url,
                label,
                ...(logo ? { image: logo } : {}),
                ...(!platformLogo && platformIconName ? { icon: platformIconName as string } : {}),
            }
        }),

    // Services in the docs nav's Services section, in nav order (hooks/docs/useServicesList).
    'content-services-list': (): DocsCard[] =>
        navSectionPages('/docs/services').map(({ node, url, label }) => {
            const icon = imageUrl(node.frontmatter.icon)
            return { url, label, ...(icon ? { image: icon } : {}) }
        }),

    // Titled docs pages that are not index pages, for platform card grids (hooks/docs/usePlatformList).
    // Callers pick the pages under one path at run time.
    'content-platform-pages': (): PlatformPage[] =>
        getContent()
            .filter((node) => node.frontmatter.title != null && node.parent.name !== 'index')
            .map((node) => ({ node, slug: mdxSlug(node) }))
            .filter(({ slug }) => slug.startsWith('docs/'))
            .map(({ node, slug }) => {
                const { title, platformLabel, platformLogo, platformIconName, platformSourceType } =
                    node.frontmatter as Frontmatter
                return {
                    slug,
                    title: title as string,
                    ...(platformLabel ? { platformLabel: platformLabel as string } : {}),
                    ...(platformLogo ? { platformLogo: platformLogo as string } : {}),
                    ...(platformIconName ? { platformIconName: platformIconName as string } : {}),
                    ...(platformSourceType ? { platformSourceType: platformSourceType as string } : {}),
                }
            }),

    // Pages that product questions link to (hooks/useContentData, for the slides' questions slide).
    'content-question-pages': () => {
        const links = productQuestionLinks()
        return slugMatching(QUESTION_PAGES)
            .filter((node) => links.has(node.fields.slug))
            .map((node) => ({
                fields: { slug: node.fields.slug },
                rawBody: node.rawBody,
                frontmatter: {
                    title: node.frontmatter.title as string,
                    description: (node.frontmatter.description as string | undefined) ?? undefined,
                },
            }))
    },

    // Every pocket guide page (components/PocketGuides/bookModel, LearnSurface, hooks/usePocketGuideCounts).
    'content-pocket-guides': () =>
        slugMatching(/^\/pocket-guides\//).map((node) => ({
            id: node.id,
            slug: node.fields.slug,
            title: (node.frontmatter.title as string | undefined) ?? null,
            shortTitle: (node.frontmatter.shortTitle as string | undefined) ?? null,
            pocketGuideOrder: (node.frontmatter.pocketGuideOrder as number | undefined) ?? null,
            pocketGuideCta: (node.frontmatter.pocketGuideCta as PocketGuideCta | undefined) ?? null,
            isPrimer: (node.frontmatter.isPrimer as boolean | undefined) ?? null,
        })),

    // Every SKILL.md, keyed by the slug of the page beside it (PocketGuides/useSkillFile, SelfDrivingInbox).
    'content-skill-files': () =>
        slugMatching(/\/SKILL$/).map((node) => ({
            slug: node.fields.slug.replace(/\/SKILL$/, ''),
            name: (node.frontmatter.name as string | undefined) ?? undefined,
            description: (node.frontmatter.description as string | undefined) ?? undefined,
            raw: node.rawBody,
        })),

    // Self-driving use case guides that have a report to show (components/SelfDrivingInbox).
    'content-self-driving-guides': () =>
        slugMatching(/^\/pocket-guides\/self-driving\//)
            // `_`-prefixed directories are starter files to copy, not templates to browse.
            .filter((node) => !/\/_/.test(node.fields.slug))
            .filter(
                (node) =>
                    ((node.frontmatter.filters?.type ?? []) as string[]).some(
                        (type) => type?.toLowerCase() === 'self-driving'
                    ) && node.frontmatter.report?.title
            )
            .map((node) => {
                const frontmatter = node.frontmatter as Frontmatter
                return {
                    url: node.fields.slug,
                    title: frontmatter.title as string,
                    shortTitle: frontmatter.shortTitle as string | undefined,
                    subtitle: frontmatter.subtitle as string | undefined,
                    premise: frontmatter.premise as string | undefined,
                    tldr: frontmatter.tldr as string | undefined,
                    watches: frontmatter.watches as WatchedSource[] | undefined,
                    requires: frontmatter.requires as Requirement[] | undefined,
                    category: (frontmatter.category as string | undefined) || UNCATEGORIZED,
                    schedule: frontmatter.schedule as string | undefined,
                    appTemplate: frontmatter.appTemplate as string | undefined,
                    report: frontmatter.report as SelfDrivingReport,
                }
            }),

    // Examples for the "From our inbox" feed, newest first (components/SelfDrivingInbox/FromOurInbox).
    'content-inbox-examples': (): InboxExample[] =>
        slugMatching(/^\/docs\/self-driving\/from-our-inbox\/_examples\//)
            .filter((node) => {
                const example = node.frontmatter.inboxExample
                // An example must show its outcome: a merged pull request, or work that needed none.
                return node.frontmatter.report?.title && (example?.pullRequest?.url || example?.resolution?.label)
            })
            .map((node) => ({
                ...node.frontmatter.inboxExample,
                publishedAt: String(node.frontmatter.inboxExample.publishedAt ?? ''),
                reportId: String(node.frontmatter.inboxExample.reportId ?? ''),
                category: node.frontmatter.category || UNCATEGORIZED,
                report: node.frontmatter.report,
            }))
            // The id breaks ties between same-day entries.
            .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.reportId.localeCompare(b.reportId)),

    // Every Hogpedia article and talk page, by title (components/Hogpedia/data).
    'content-hogpedia-articles': (): HogpediaArticleSummary[] =>
        slugMatching(/^\/hogpedia\//)
            .filter((node) => node.frontmatter.title !== '')
            .sort((a, b) => compare(String(a.frontmatter.title ?? ''), String(b.frontmatter.title ?? '')))
            .map((node) => ({
                slug: node.fields.slug.replace(/\/$/, ''),
                title: node.frontmatter.title,
                description: node.frontmatter.description || excerpt(node, 180),
                aliases: node.frontmatter.hogpedia?.aliases || [],
                categories: node.frontmatter.hogpedia?.categories || [],
                isTalk: node.fields.slug.startsWith('/hogpedia/talk/'),
            })),

    // The six newest blog posts that are not comparisons (components/Hogpedia/blogPosts).
    'content-hogpedia-recent-posts': () =>
        slugMatching(/^\/blog/)
            .filter(
                (node) =>
                    !node.isFuture && node.frontmatter.date && ![node.frontmatter.tags].flat().includes('Comparisons')
            )
            .sort(byDateDesc)
            .slice(0, 6)
            .map((node) => ({
                slug: node.fields.slug,
                title: node.frontmatter.title as string,
                date: formatDate(node.frontmatter.date, 'D MMMM YYYY') as string,
            })),

    // The handbook's lore page, for Hogpedia's "Did you know" facts (components/Hogpedia/loreFacts).
    'content-hogpedia-lore': () => slugMatching(/\/handbook\/company\/lore\/?$/)[0]?.rawBody ?? '',

    // The customer slugs that have a case study (hooks/useCustomers).
    'content-customer-stories': () =>
        slugMatching(/^\/customers/).map((node) => node.fields.slug.split('/').pop() || ''),

    // The newest case study (views/customers).
    'content-latest-customer-story': () => {
        const [story] = slugMatching(/^\/customers/).sort(byDateDesc)
        return story
            ? {
                  slug: story.fields.slug,
                  title: story.frontmatter.title as string,
                  date: formatDate(story.frontmatter.date, 'MMMM D, YYYY'),
              }
            : null
    },
}

const SDKS = [
    'js',
    'android',
    'elixir',
    'flutter',
    'go',
    'ios',
    'java',
    'kmp',
    'node',
    'php',
    'python',
    'react',
    'react-native',
    'roblox',
    'ruby',
    'rust',
    'unity',
]

const FRAMEWORKS = [
    'angular',
    'astro',
    'bubble',
    'discord',
    'django',
    'docusaurus',
    'flask',
    'framer',
    'gatsby',
    'github',
    'google-tag-manager',
    'laravel',
    'next-js',
    'nuxt-js',
    'phoenix',
    'remix',
    'retool',
    'rudderstack',
    'segment',
    'slack',
    'shopify',
    'svelte',
    'vue-js',
    'webflow',
    'woocommerce',
    'wordpress',
]

type Result<Name extends keyof typeof queries> = QueryResult<typeof queries, Name>

export type DocsCount = Result<'content-docs-count'>
export type AppListings = Result<'content-apps'>
export type IngestionPipelines = Result<'content-ingestion-pipelines'>
export type BlogPostList = Result<'content-blog-posts'>
export type BlogTaxonomy = Result<'content-blog-taxonomy'>
export type TutorialTagList = Result<'content-tutorial-tags'>
export type TutorialList = Result<'content-tutorials'>
export type FeaturedTutorials = Result<'content-featured-tutorials'>
export type EditorPage = Result<'content-home-page'>
export type HomeImages = Result<'content-home-images'>
export type InstallSnippet = Result<'content-install-snippet'>
export type HtmlSnippet = Result<'content-html-snippet'>
export type LibraryFeatures = Result<'content-library-features'>
export type InstallFrameworkGridData = Result<'content-install-framework-grid'>
export type IntegrateLibraries = Result<'content-integrate-libraries'>
export type DocsCards = Result<'content-framework-list'>
export type PlatformPages = Result<'content-platform-pages'>
export type QuestionPages = Result<'content-question-pages'>
export type PocketGuidePages = Result<'content-pocket-guides'>
export type SkillFiles = Result<'content-skill-files'>
export type SelfDrivingGuides = Result<'content-self-driving-guides'>
export type InboxExamples = Result<'content-inbox-examples'>
export type HogpediaArticles = Result<'content-hogpedia-articles'>
export type RecentBlogPosts = Result<'content-hogpedia-recent-posts'>
export type HogpediaLore = Result<'content-hogpedia-lore'>
export type CustomerStories = Result<'content-customer-stories'>
export type LatestCustomerStory = Result<'content-latest-customer-story'>
