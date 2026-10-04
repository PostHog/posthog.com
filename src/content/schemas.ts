// Collection definitions as plain data (folder, file patterns, schema), shared by
// src/content.config.ts and scripts/check-content.ts, which validates every entry in one pass.
import { z } from 'astro/zod'

export const POSTHOG_REPO = './.cache/posthog-main-repo'

// Underscore folders and files (`_snippets`, `_examples`, starter templates) are imported by other
// files, not pages.
export const PAGES = ['**/*.mdx', '!**/_*/**', '!**/_*.mdx']

export const generateId = ({ entry }: { entry: string }) =>
    entry.replace(/\.mdx?$/, '').replace(/(^|\/)index$/, '') || 'index'

const seo = z
    .object({
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
    })
    .optional()

const authors = z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((value) => (value === undefined ? [] : Array.isArray(value) ? value : [value]))

/** Fields any page may set. */
const base = {
    title: z.string(),
    description: z.string().nullish(),
    showTitle: z.boolean().optional(),
    hideAnchor: z.boolean().optional(),
    sidebar: z.string().optional(),
    tableOfContents: z.array(z.unknown()).optional(),
    seo,
    noindex: z.boolean().optional(),
    featureFlag: z.string().optional(),
    hideFromIndex: z.boolean().optional(),
}

/** Docs pages. A file without a title is a fragment, not a page; routes skip it. */
const docsPage = z.looseObject({
    ...base,
    title: z.string().optional(),
    sidebarTitle: z.string().optional(),
    availability: z
        .object({
            free: z.enum(['full', 'partial', 'none']).optional(),
            selfServe: z.enum(['full', 'partial', 'none']).optional(),
            teams: z.enum(['full', 'partial', 'none']).optional(),
            enterprise: z.enum(['full', 'partial', 'none']).optional(),
        })
        .nullish(),
    platformLogo: z.string().optional(),
    platformLabel: z.string().optional(),
    platformIconName: z.string().optional(),
    showStepsToc: z.boolean().optional(),
    hideRightSidebar: z.boolean().optional(),
    contentMaxWidthClass: z.string().optional(),
    /** Links the page to a data warehouse source (PostHogSource.sourceId). */
    sourceId: z.string().optional(),
    /** Links the page to destination or transformation templates (PostHogPipeline.pipelineId). */
    templateId: z.union([z.string(), z.array(z.string())]).optional(),
})

/** Handbook pages (company handbook, engineering handbook, product engineer handbook). */
const handbookPage = z.looseObject({
    ...base,
    title: z.string().optional(),
    /** Show authors, date, and tags under the title. */
    showByline: z.boolean().optional(),
    author: authors,
    date: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    hideRightSidebar: z.boolean().optional(),
    hideLastUpdated: z.boolean().optional(),
    contentMaxWidthClass: z.string().optional(),
})

/** Dated posts: blog, newsletter, comparisons, tutorials, customer stories, and the hubs. */
const post = z.looseObject({
    ...base,
    date: z.coerce.date(),
    author: authors,
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    featuredImage: z.string().nullable().optional(),
    featuredImageCaption: z.string().optional(),
    featuredImageType: z.enum(['full', 'standard']).optional(),
    featuredVideo: z.string().optional(),
    featuredTutorial: z.boolean().optional(),
    rootPage: z.string().optional(),
    crosspost: z.unknown().optional(),
    excerpt: z.string().optional(),
})

const customerStory = post.extend({
    customer: z.string().optional(),
    logo: z.string().optional(),
    logoDark: z.string().optional(),
    industries: z.array(z.string()).optional(),
    users: z.array(z.string()).optional(),
    toolsUsed: z.array(z.string()).optional(),
})

const pocketGuide = z.looseObject({
    ...base,
    // SKILL files and section index pages carry a name instead of a title.
    title: z.string().optional(),
    name: z.string().optional(),
    shortTitle: z.string().optional(),
    subtitle: z.string().optional(),
    pocketGuideOrder: z.number().optional(),
    section: z.string().optional(),
    isPrimer: z.boolean().optional(),
})

const template = z.looseObject({
    ...base,
    subtitle: z.string().optional(),
    thumbnail: z.string().optional(),
    featuredImage: z.string().optional(),
    filters: z.looseObject({ type: z.array(z.string()).optional() }).optional(),
})

const hogpediaArticle = z.looseObject({
    ...base,
    description: z.string(),
    hogpedia: z.looseObject({
        tagline: z.string().optional(),
        aliases: z.array(z.string()).optional(),
        categories: z.array(z.string()).optional(),
        /** Maintenance banners (components/Hogpedia/MaintenanceBanner.tsx). */
        notices: z.array(z.string()).optional(),
        featured: z.boolean().optional(),
        /** On a talk page: the article it discusses. */
        talkFor: z.string().optional(),
        infobox: z
            .object({
                title: z.string().optional(),
                hog: z.string().optional(),
                caption: z.string().optional(),
                rows: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
            })
            .optional(),
        /** `Label|path` entries. */
        seeAlso: z.array(z.string()).optional(),
        references: z.array(z.object({ id: z.coerce.string(), text: z.string(), url: z.string() })).optional(),
        external: z.array(z.object({ title: z.string(), url: z.string() })).optional(),
    }),
})

/** Loose pages (src/templates/Plain.tsx), team pages, and app pages. */
const plainPage = z.looseObject({
    ...base,
    title: z.string().optional(),
    /** `custom`: a page component renders this file, so no Plain page is built for it. */
    template: z.string().optional(),
    featuredImage: z.string().nullable().optional(),
    /** Cloudinary URLs the MDX reads as `props.images`. */
    images: z.array(z.string()).optional(),
    /** Shown inside another page's frame, so not indexed. */
    isInFrame: z.boolean().optional(),
})

export interface CollectionDefinition {
    base: string
    pattern: string[]
    schema: z.ZodType
}

export const definitions = {
    docs: { base: './contents/docs', pattern: PAGES, schema: docsPage },
    // Docs published from the posthog/posthog repo (docs/published/docs).
    posthogDocs: { base: `${POSTHOG_REPO}/docs/published/docs`, pattern: ['**/*.{md,mdx}'], schema: docsPage },
    handbook: { base: './contents/handbook', pattern: PAGES, schema: handbookPage },
    // Handbook pages published from the posthog/posthog repo (docs/published/handbook).
    posthogHandbook: {
        base: `${POSTHOG_REPO}/docs/published/handbook`,
        pattern: ['**/*.{md,mdx}'],
        schema: handbookPage,
    },
    productEngineerHandbook: { base: './contents/product-engineer', pattern: PAGES, schema: handbookPage },
    blog: { base: './contents/blog', pattern: PAGES, schema: post },
    newsletter: { base: './contents/newsletter', pattern: PAGES, schema: post },
    compare: { base: './contents/compare', pattern: PAGES, schema: post },
    founders: { base: './contents/founders', pattern: PAGES, schema: post },
    productEngineers: { base: './contents/product-engineers', pattern: PAGES, schema: post },
    spotlight: { base: './contents/spotlight', pattern: PAGES, schema: post },
    library: { base: './contents/library', pattern: PAGES, schema: post },
    tutorials: { base: './contents/tutorials', pattern: PAGES, schema: post },
    customers: { base: './contents/customers', pattern: PAGES, schema: customerStory },
    pocketGuides: { base: './contents/pocket-guides', pattern: PAGES, schema: pocketGuide },
    templates: { base: './contents/templates', pattern: PAGES, schema: template },
    hogpedia: { base: './contents/hogpedia', pattern: PAGES, schema: hogpediaArticle },
    // Team pages (mission, objectives) rendered inside /teams/[slug].
    teams: { base: './contents/teams', pattern: PAGES, schema: plainPage },
    apps: { base: './contents/apps', pattern: PAGES, schema: plainPage },
    // Loose pages at the top of contents/ (about, faq, wizard, ...) and small one-off folders.
    pages: {
        base: './contents',
        pattern: ['*.mdx', 'pricing/**/*.mdx', 'notes/**/*.mdx', 'hosthog/**/*.mdx'],
        schema: plainPage,
    },
} satisfies Record<string, CollectionDefinition>
