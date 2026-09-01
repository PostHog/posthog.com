import { GatsbyNode } from 'gatsby'

import path from 'path'
import slugify from 'slugify'
import menu from '../src/navs/index'
import type { GatsbyContentResponse, MetaobjectsCollection } from '../src/templates/merch/types'
import { flattenMenu, replacePath } from './utils'
import { isLatestVersion, typeHasPage } from '../src/components/SdkReferences/utils'
const Slugger = require('github-slugger')
const markdownLinkExtractor = require('markdown-link-extractor')

const isMinimalBuild = process.env.GATSBY_MINIMAL === 'true'

// GraphQL selection shared by the full and minimal builds so the fields
// createSdkReferencePages() reads stay in sync across both query sites. Interpolated into the
// runtime graphql() template literals below (not a statically extracted page query).
const SDK_REFERENCE_QUERY_FIELDS = `
    allSdkReferences {
        nodes {
            info {
                description
                id
                specUrl
                slugPrefix
                title
                version
            }
            referenceId
            hogRef
            id
            categories
            classes {
                description
                functions {
                    category
                    description
                    details
                    examples {
                        code
                        name
                        id
                    }
                    id
                    params {
                        description
                        isOptional
                        name
                        type
                    }
                    path
                    releaseTag
                    showDocs
                    returnType {
                        id
                        name
                    }
                    title
                }
                id
                title
            }
            version
        }
    }
    allSdkTypes: allSdkReferences {
        nodes {
            id
            version
            referenceId
            info {
                description
                id
                slugPrefix
                specUrl
                title
                version
            }
            hogRef
            categories
            types {
                example
                id
                name
                path
                properties {
                    description
                    name
                    type
                }
            }
        }
    }
`

export const createPages: GatsbyNode['createPages'] = async ({ actions: { createPage }, graphql }) => {
    if (isMinimalBuild) {
        return createMinimalPages({ createPage, graphql })
    }

    const BlogPostTemplate = path.resolve(`src/templates/BlogPost.tsx`)
    const PlainTemplate = path.resolve(`src/templates/Plain.js`)
    const BlogCategoryTemplate = path.resolve(`src/templates/BlogCategory.tsx`)
    const BlogTagTemplate = path.resolve(`src/templates/BlogTag.tsx`)
    const BlogTemplate = path.resolve(`src/templates/Blog.tsx`)
    const CustomerTemplate = path.resolve(`src/templates/Customer.js`)
    const AppTemplate = path.resolve(`src/templates/App.js`)
    const PipelineTemplate = path.resolve(`src/templates/Pipeline.js`)
    const DashboardTemplate = path.resolve(`src/templates/Template.tsx`)
    const WorkflowTemplate = path.resolve(`src/templates/WorkflowTemplate.tsx`)
    const Job = path.resolve(`src/templates/Job.tsx`)
    const EventTemplate = path.resolve(`src/templates/Event.tsx`)
    const PostListingTemplate = path.resolve(`src/templates/PostListing.tsx`)
    const PaginationTemplate = path.resolve(`src/templates/Pagination.tsx`)
    const HubTagTemplate = path.resolve(`src/templates/Hub/Tag.tsx`)
    // Tutorials
    const TutorialsTemplate = path.resolve(`src/templates/tutorials/index.tsx`)
    const TutorialTemplate = path.resolve(`src/templates/tutorials/Tutorial.tsx`)
    const TutorialsCategoryTemplate = path.resolve(`src/templates/tutorials/TutorialsCategory.tsx`)

    // Docs
    const ApiEndpoint = path.resolve(`src/templates/ApiEndpoint.tsx`)
    const HandbookTemplate = path.resolve(`src/templates/Handbook.tsx`)

    const DataPipeline = path.resolve(`src/templates/DataPipeline.tsx`)
    const DataWarehouseSource = path.resolve(`src/templates/DataWarehouseSource.tsx`)

    const result = (await graphql(`
        {
            allMdx(
                filter: {
                    fileAbsolutePath: {
                        regex: "/^((?!contents/teams/|contents/about.mdx|contents/media-contents.mdx).)*$/"
                    }
                    frontmatter: { title: { nin: [""] }, template: { nin: ["custom"] } }
                }
            ) {
                nodes {
                    id
                    slug
                    frontmatter {
                        template
                    }
                    parent {
                        ... on File {
                            sourceInstanceName
                        }
                    }
                }
            }
            handbook: allMdx(
                filter: { fields: { slug: { regex: "/^/handbook/" } }, frontmatter: { title: { ne: "" } } }
            ) {
                nodes {
                    id
                    headings {
                        depth
                        value
                    }
                    fields {
                        slug
                    }
                    parent {
                        ... on File {
                            sourceInstanceName
                        }
                    }
                    rawBody
                }
            }
            productEngineerHandbook: allMdx(
                filter: { fields: { slug: { regex: "/^/product-engineer/" } }, frontmatter: { title: { ne: "" } } }
            ) {
                nodes {
                    id
                    headings {
                        depth
                        value
                    }
                    fields {
                        slug
                    }
                    parent {
                        ... on File {
                            sourceInstanceName
                        }
                    }
                    rawBody
                }
            }
            apidocs: allApiEndpoint {
                nodes {
                    id
                    name
                    url
                }
            }
            docs: allMdx(filter: { fields: { slug: { regex: "/^/docs/" } }, frontmatter: { title: { ne: "" } } }) {
                nodes {
                    id
                    headings {
                        depth
                        value
                    }
                    fields {
                        slug
                    }
                    rawBody
                }
            }
            manual: allMdx(filter: { fields: { slug: { regex: "/^/manual/" } }, frontmatter: { title: { ne: "" } } }) {
                nodes {
                    id
                    headings {
                        depth
                        value
                    }
                    fields {
                        slug
                    }
                    rawBody
                }
            }
            tutorials: allMdx(filter: { fields: { slug: { regex: "/^/tutorials/" } } }) {
                totalCount
                nodes {
                    id
                    headings {
                        depth
                        value
                    }
                    fields {
                        slug
                    }
                }
                categories: group(field: frontmatter___tags) {
                    totalCount
                    category: fieldValue
                }
                contributors: group(field: frontmatter___authorData___name) {
                    fieldValue
                }
            }
            apps: allMdx(filter: { fields: { slug: { regex: "/^/apps/" } } }) {
                nodes {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        documentation
                    }
                }
            }
            cdp: allMdx(filter: { fields: { slug: { regex: "/^/cdp/" } } }) {
                nodes {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        documentation
                    }
                }
            }
            templates: allMdx(filter: { fields: { slug: { regex: "/^/(templates|pocket-guides)//" } } }) {
                nodes {
                    id
                    fields {
                        slug
                    }
                }
            }
            workflowTemplates: allPostHogWorkflowTemplate {
                nodes {
                    templateId
                    fields {
                        slug
                    }
                }
            }
            customers: allMdx(filter: { fields: { slug: { regex: "/^/customers/" } } }) {
                nodes {
                    id
                    headings {
                        depth
                        value
                    }
                    fields {
                        slug
                    }
                }
            }
            blogPosts: allMdx(
                filter: {
                    isFuture: { eq: false }
                    frontmatter: { date: { ne: null } }
                    fields: { slug: { regex: "/^/blog/" } }
                }
            ) {
                totalCount
                nodes {
                    id
                    headings {
                        depth
                        value
                    }
                    fields {
                        slug
                    }
                    frontmatter {
                        category
                        tags
                    }
                }
            }
            libraryArticles: allMdx(
                filter: {
                    isFuture: { eq: false }
                    frontmatter: { date: { ne: null } }
                    fields: { slug: { regex: "/^/library|^/founders|^/product-engineers|^/features|^/newsletter/" } }
                }
            ) {
                totalCount
                nodes {
                    id
                    headings {
                        depth
                        value
                    }
                    fields {
                        slug
                    }
                    frontmatter {
                        category
                        tags
                    }
                }
            }
            localizedNewsletter: allMdx(
                filter: { frontmatter: { date: { ne: null } }, fields: { slug: { regex: "/^/ko/newsletter/" } } }
            ) {
                nodes {
                    id
                    headings {
                        depth
                        value
                    }
                    fields {
                        slug
                    }
                    frontmatter {
                        translationOf
                    }
                }
            }
            library: allMdx(
                filter: {
                    isFuture: { eq: false }
                    frontmatter: { date: { ne: null } }
                    fields: { slug: { regex: "/^/library/" } }
                }
            ) {
                totalCount
            }
            founders: allMdx(
                filter: {
                    isFuture: { eq: false }
                    frontmatter: { date: { ne: null } }
                    fields: { slug: { regex: "/^/founders/" } }
                }
            ) {
                totalCount
            }
            productEngineers: allMdx(
                filter: {
                    isFuture: { eq: false }
                    frontmatter: { date: { ne: null } }
                    fields: { slug: { regex: "/^/product-engineers/" } }
                }
            ) {
                totalCount
            }
            features: allMdx(
                filter: {
                    isFuture: { eq: false }
                    frontmatter: { date: { ne: null } }
                    fields: { slug: { regex: "/^/features/" } }
                }
            ) {
                totalCount
            }
            spotlights: allMdx(
                filter: {
                    isFuture: { eq: false }
                    frontmatter: { date: { ne: null } }
                    fields: { slug: { regex: "/^/spotlight/" } }
                }
            ) {
                totalCount
                nodes {
                    id
                    headings {
                        depth
                        value
                    }
                    fields {
                        slug
                    }
                    frontmatter {
                        category
                        tags
                    }
                }
            }
            categories: allMdx(
                sort: { order: DESC, fields: [frontmatter___date] }
                filter: {
                    isFuture: { eq: false }
                    fields: { slug: { regex: "/^/blog/" } }
                    frontmatter: { date: { ne: null } }
                }
            ) {
                categories: group(field: frontmatter___category) {
                    category: fieldValue
                    totalCount
                }
                tags: group(field: frontmatter___tags) {
                    tag: fieldValue
                    totalCount
                }
            }
            postCategories: allPostCategory(
                filter: {
                    attributes: { folder: { nin: [null, "customers", "changelog"] }, label: { ne: "Customers" } }
                }
            ) {
                nodes {
                    attributes {
                        label
                        folder
                        post_tags {
                            data {
                                attributes {
                                    label
                                    folder
                                }
                            }
                        }
                    }
                }
            }
            jobs: allAshbyJobPosting {
                nodes {
                    id
                    title
                    fields {
                        slug
                    }
                    parent {
                        ... on AshbyJob {
                            customFields {
                                value
                                title
                            }
                        }
                    }
                }
            }
            roadmapYears: allRoadmap {
                group(field: year) {
                    fieldValue
                }
            }
            postHogPipelines: allPostHogPipeline(filter: { mdx: { id: { eq: null } } }) {
                nodes {
                    id
                    name
                    slug
                    type
                }
            }
            postHogSources: allPostHogSource(filter: { mdx: { id: { eq: null } }, unreleased: { ne: true } }) {
                nodes {
                    id
                    name
                    slug
                }
            }
            postHogSourcesWithDocs: allPostHogSource(filter: { mdx: { id: { ne: null } }, unreleased: { ne: true } }) {
                nodes {
                    id
                    slug
                    mdx {
                        id
                        fields {
                            slug
                        }
                    }
                }
            }
            selfHostedSources: allMdx(
                filter: {
                    fields: { slug: { regex: "/^/docs/cdp/sources/(s3|azure-blob|r2|gcs)$/" } }
                    frontmatter: { title: { ne: "" } }
                }
            ) {
                nodes {
                    id
                    fields {
                        slug
                    }
                }
            }
            ${SDK_REFERENCE_QUERY_FIELDS}
        }
    `)) as GatsbyContentResponse

    if (result.error) {
        return Promise.reject(result.error)
    }

    const eventsResult = (await graphql(`
        {
            allEvent {
                nodes {
                    id
                    strapiID
                }
            }
        }
    `)) as any

    if (eventsResult.error) {
        return Promise.reject(eventsResult.error)
    }

    const menuFlattened = flattenMenu(menu)
    const localizedNewsletterNodes = result.data.localizedNewsletter.nodes
    const englishNewsletterSlugs = new Set<string>(
        result.data.libraryArticles.nodes
            .map((node: any) => replacePath(node.fields.slug))
            .filter((slug: string) => slug.startsWith('/newsletter/'))
    )
    localizedNewsletterNodes.forEach((node) => {
        const translationOf = node.frontmatter?.translationOf
        if (!translationOf) return
        const normalized = replacePath(translationOf)
        if (!englishNewsletterSlugs.has(normalized)) {
            console.warn(
                `[i18n] Korean translation ${node.fields.slug} references missing English slug: ${translationOf}`
            )
        }
    })
    const indexableNewsletterTranslations = localizedNewsletterNodes.filter(
        (node) =>
            node.frontmatter?.translationOf && englishNewsletterSlugs.has(replacePath(node.frontmatter.translationOf))
    )
    const koreanByEnglishSlug = indexableNewsletterTranslations.reduce<Record<string, string>>((acc, node) => {
        acc[replacePath(node.frontmatter.translationOf)] = replacePath(node.fields.slug)
        return acc
    }, {})

    const getNewsletterLanguageAlternates = (slug: string, translationOf?: string) => {
        const currentSlug = replacePath(slug)
        const englishSlug = translationOf ? replacePath(translationOf) : currentSlug
        const koreanSlug = translationOf ? currentSlug : koreanByEnglishSlug[englishSlug]

        if (!koreanSlug) return undefined

        return [
            { hrefLang: 'en', href: englishSlug },
            { hrefLang: 'ko', href: koreanSlug },
            { hrefLang: 'x-default', href: englishSlug },
        ]
    }

    const findNext = (menu, currentURL) => {
        for (let i = 0; i < menu.length; i++) {
            if (menu[i].url !== currentURL) {
                return menu[i]
            }
        }
    }

    function createPosts(data, menu, template, breadcrumbBase, context) {
        data.forEach((node) => {
            const links =
                node?.rawBody &&
                markdownLinkExtractor(node?.rawBody)?.map((url) => url.replace(/https:\/\/posthog.com|#.*/gi, ''))
            const slug = node.fields?.slug || node.url
            let next = null
            let previous = null
            let breadcrumb = null
            let nextURL = ''
            const tableOfContents = node.headings && formatToc(node.headings)
            menuFlattened.some((item, index) => {
                if (item.url === slug) {
                    next = findNext(menuFlattened.slice(index), slug)
                    nextURL = next && next.url ? next.url : ''
                    previous = menuFlattened[index - 1]
                    breadcrumb = [...item.breadcrumb]
                    return true
                }
            })

            createPage({
                path: replacePath(slug),
                component: template,
                context: {
                    id: node.id,
                    nextURL,
                    next,
                    previous,
                    breadcrumb,
                    breadcrumbBase: breadcrumbBase || menuFlattened[0],
                    tableOfContents,
                    slug,
                    links,
                    searchFilter: menu,
                    ...(context ? context(node) : {}),
                },
            })
        })
    }

    function formatToc(headings) {
        // need to use slugger for header links to match
        const slugger = new Slugger()
        return headings.map((heading) => {
            // Strip HTML tags from heading value
            // Useful if we wanna add a beta label to a header
            const cleanValue = heading.value.replace(/\s*<([a-z]+).+?>.+?<\/\1>/g, '')

            return {
                ...heading,
                depth: heading.depth - 2,
                url: slugger.slug(cleanValue),
                value: cleanValue,
            }
        })
    }

    const createPaginatedPages = ({ postsPerPage = 20, totalCount, base, template, extraContext = {} }) => {
        const numPages = Math.ceil(totalCount / postsPerPage)
        Array.from({ length: numPages }).forEach((_, i) => {
            const context = {
                ...extraContext,
                limit: postsPerPage,
                skip: i * postsPerPage,
                numPages,
                currentPage: i + 1,
                base,
            }
            createPage({
                path: i === 0 ? base : `${base}/${i + 1}`,
                component: template,
                context,
            })
        })
    }

    result.data.allMdx.nodes.forEach((node) => {
        if (node.parent?.sourceInstanceName === 'posthog-main-repo') return
        const plainSlug = node.fields?.slug || node.slug
        if (plainSlug?.startsWith('/ko/newsletter/') || plainSlug?.startsWith('ko/newsletter/')) return
        // `_`-prefixed template directories are starters to copy from, not pages. They carry a
        // title (a starter has to model a real template), so the `title: { nin: [""] }` filter
        // above doesn't exclude them the way it excludes sibling SKILL.md files.
        if (/(^|\/)_/.test(plainSlug ?? '') && /(templates|pocket-guides)/.test(plainSlug ?? '')) return
        createPage({
            path: replacePath(node.slug),
            component: PlainTemplate,
            context: {
                id: node.id,
            },
        })
    })

    const categories = {}
    result.data.categories.categories.forEach(({ category, totalCount }) => {
        const slug = slugify(category, { lower: true })
        const base = `/blog/categories/${slug}`
        categories[category] = {
            slug,
            url: base,
        }

        createPaginatedPages({ totalCount, base, template: BlogCategoryTemplate, extraContext: { category, slug } })
    })

    result.data.categories.tags.forEach(({ tag, totalCount }) => {
        const slug = slugify(tag, { lower: true })
        const base = `/blog/tags/${slug}`

        createPaginatedPages({
            totalCount,
            base,
            template: BlogTagTemplate,
            extraContext: { tag, slug },
        })
    })

    createPaginatedPages({
        totalCount: result.data.blogPosts.totalCount,
        base: '/blog/all',
        template: PaginationTemplate,
        extraContext: {
            regex: '/^/blog/',
            title: 'Blog',
        },
    })

    createPaginatedPages({
        totalCount: result.data.library.totalCount,
        base: '/library/all',
        template: PaginationTemplate,
        extraContext: {
            regex: '/^/library/',
            title: 'Library',
        },
    })

    createPaginatedPages({
        totalCount: result.data.founders.totalCount,
        base: '/founders/all',
        template: PaginationTemplate,
        extraContext: {
            regex: '/^/founders/',
            title: 'Founders',
        },
    })

    createPaginatedPages({
        totalCount: result.data.productEngineers.totalCount,
        base: '/product-engineers/all',
        template: PaginationTemplate,
        extraContext: {
            regex: '/^/product-engineers/',
            title: 'Product engineers',
        },
    })

    createPaginatedPages({
        totalCount: result.data.features.totalCount,
        base: '/features/all',
        template: PaginationTemplate,
        extraContext: {
            regex: '/^/features/',
            title: 'Features',
        },
    })

    result.data.tutorials.categories.forEach(({ category, totalCount }) => {
        const slug = slugify(category, { lower: true })
        const base = `/tutorials/categories/${slug}`

        createPaginatedPages({
            totalCount,
            base,
            template: TutorialsCategoryTemplate,
            extraContext: { activeFilter: category, slug },
        })
    })

    createPaginatedPages({
        totalCount: result.data.tutorials.totalCount,
        base: '/tutorials/all',
        template: TutorialsTemplate,
    })

    result.data.postCategories.nodes.forEach(
        ({ attributes: { folder: categoryFolder, label: categoryLabel, post_tags } }) => {
            const isHub = categoryFolder === 'founders' || categoryFolder === 'product-engineers'
            // Folders with hand-written index pages in src/pages/ are excluded here
            if (!isHub && categoryFolder !== 'newsletter' && categoryFolder !== 'blog') {
                createPage({
                    path: `/${categoryFolder}`,
                    component: PostListingTemplate,
                    context: {
                        post: true,
                        title: categoryLabel,
                        article: false,
                        root: categoryFolder,
                    },
                })
            }

            post_tags?.data?.forEach(({ attributes: { label: tagLabel } }) => {
                createPage({
                    path: `/${categoryFolder}/${slugify(tagLabel, { lower: true, strict: true })}`,
                    component: isHub ? HubTagTemplate : PostListingTemplate,
                    context: {
                        selectedTag: tagLabel,
                        post: true,
                        title: tagLabel,
                        article: false,
                        root: categoryFolder,
                    },
                })
            })
        }
    )
    const { localHandbook, engineeringHandbook } = result.data.handbook.nodes.reduce(
        (acc, node) => {
            if (node.parent?.sourceInstanceName === 'posthog-main-repo') {
                acc.engineeringHandbook.push(node)
            } else {
                acc.localHandbook.push(node)
            }
            return acc
        },
        { localHandbook: [], engineeringHandbook: [] }
    )
    createPosts(engineeringHandbook, 'handbook', HandbookTemplate, { name: 'Handbook', url: '/handbook' })
    createPosts(localHandbook, 'handbook', HandbookTemplate, { name: 'Handbook', url: '/handbook' })
    createPosts(result.data.productEngineerHandbook.nodes, 'product-engineer', HandbookTemplate, {
        name: 'Product Engineer Handbook',
        url: '/product-engineer',
    })
    createPosts(result.data.docs.nodes, 'docs', HandbookTemplate, { name: 'Docs', url: '/docs' })
    createPosts(result.data.apidocs.nodes, 'docs', ApiEndpoint, { name: 'Docs', url: '/docs' }, (node) => ({
        regex: `$${node.url}/`,
    }))
    createPosts(result.data.manual.nodes, 'docs', HandbookTemplate, { name: 'Using PostHog', url: '/using-posthog' })

    result.data.tutorials.nodes.forEach((node) => {
        const { slug } = node.fields
        const tableOfContents = node.headings && formatToc(node.headings)
        createPage({
            path: replacePath(slug),
            component: BlogPostTemplate,
            context: {
                id: node.id,
                tableOfContents,
                slug,
                post: true,
                article: true,
                askMax: true,
            },
        })
    })

    result.data.blogPosts.nodes.forEach((node) => {
        const { slug } = node.fields
        const tableOfContents = node.headings && formatToc(node.headings)
        createPage({
            path: replacePath(slug),
            component: BlogPostTemplate,
            context: {
                id: node.id,
                tableOfContents,
                slug,
                post: true,
                article: true,
            },
        })
    })

    result.data.libraryArticles.nodes.forEach((node) => {
        const { slug } = node.fields
        const tableOfContents = node.headings && formatToc(node.headings)
        const isEnglishNewsletter = replacePath(slug).startsWith('/newsletter/')
        createPage({
            path: replacePath(slug),
            component: BlogPostTemplate,
            context: {
                id: node.id,
                tableOfContents,
                slug,
                post: true,
                article: true,
                languageAlternates: isEnglishNewsletter ? getNewsletterLanguageAlternates(slug) : undefined,
            },
        })
    })

    result.data.localizedNewsletter.nodes.forEach((node) => {
        const { slug } = node.fields
        const { translationOf } = node.frontmatter || {}
        const isIndexableTranslation = translationOf && englishNewsletterSlugs.has(replacePath(translationOf))
        const tableOfContents = node.headings && formatToc(node.headings)

        createPage({
            path: replacePath(slug),
            component: BlogPostTemplate,
            context: {
                id: node.id,
                tableOfContents,
                slug,
                post: true,
                article: true,
                localizedRoot: 'newsletter',
                languageAlternates: isIndexableTranslation
                    ? getNewsletterLanguageAlternates(slug, translationOf)
                    : undefined,
            },
        })
    })

    createPage({
        path: `/posts`,
        component: PostListingTemplate,
        context: {
            post: true,
            title: 'Posts',
            article: false,
        },
    })

    eventsResult.data.allEvent.nodes.forEach((node) => {
        if (!node?.strapiID) return
        createPage({
            path: `/events/${node.strapiID}`,
            component: EventTemplate,
            context: {
                id: node.id,
                strapiID: node.strapiID,
            },
        })
    })

    result.data.spotlights.nodes.forEach((node) => {
        const { slug } = node.fields
        const tableOfContents = node.headings && formatToc(node.headings)
        createPage({
            path: replacePath(slug),
            component: BlogPostTemplate,
            context: {
                id: node.id,
                tableOfContents,
                slug,
                post: true,
                article: true,
            },
        })
    })

    result.data.customers.nodes.forEach((node) => {
        const { slug } = node.fields
        const tableOfContents = node.headings && formatToc(node.headings)
        createPage({
            path: replacePath(slug),
            component: BlogPostTemplate,
            context: {
                id: node.id,
                tableOfContents,
                slug,
                post: true,
                article: true,
            },
        })
    })

    result.data.apps.nodes.forEach((node) => {
        const { slug } = node.fields
        const { documentation } = node.frontmatter
        createPage({
            path: slug,
            component: AppTemplate,
            context: {
                id: node.id,
                documentation: documentation || '',
            },
        })
    })

    result.data.cdp.nodes.forEach((node) => {
        const { slug } = node.fields
        const { documentation } = node.frontmatter
        createPage({
            path: slug,
            component: PipelineTemplate,
            context: {
                id: node.id,
                documentation: documentation || '',
            },
        })
    })

    result.data.templates.nodes.forEach((node) => {
        const { slug } = node.fields
        // A pocket guide's sibling SKILL.md and `_`-prefixed starter directories are files to
        // copy, not pages – the query filters on slug prefix alone, so skip them here.
        if (slug.endsWith('/SKILL') || /\/_/.test(slug)) {
            return
        }
        createPage({
            path: slug,
            component: DashboardTemplate,
            context: {
                id: node.id,
            },
        })
    })

    // Create workflow template pages
    result.data.workflowTemplates.nodes.forEach((node) => {
        createPage({
            path: `/templates/workflow/${node.fields.slug}`,
            component: WorkflowTemplate,
            context: {
                slug: node.fields.slug,
            },
        })
    })

    if (process.env.ASHBY_API_KEY && process.env.GITHUB_API_KEY) {
        for (node of result.data.jobs.nodes) {
            const { id, parent } = node
            const slug = node.fields.slug
            const issues = parent?.customFields?.find(({ title }) => title === 'Issues')?.value?.split(',')
            const repo = parent?.customFields?.find(({ title }) => title === 'Repo')?.value
            const teams = JSON.parse(parent?.customFields?.find(({ title }) => title === 'Teams')?.value || '[]')
            let gitHubIssues = []
            if (issues) {
                gitHubIssues = await Promise.all(
                    issues
                        .filter((issue) => issue)
                        .map((issue) =>
                            fetch(`https://api.github.com/repos/${repo}/issues/${issue.trim()}`, {
                                headers: {
                                    Authorization: `token ${process.env.GITHUB_API_KEY}`,
                                },
                            })
                                .then((res) => res.json())
                                .then(({ html_url, number, title, labels }) => ({
                                    url: html_url,
                                    number,
                                    title,
                                    labels,
                                }))
                        )
                )
            }
            createPage({
                path: slug,
                component: Job,
                context: {
                    id,
                    slug,
                    objectives: `/teams/${slugify(teams[0] || '', { lower: true })}/objectives`,
                    mission: `/teams/${slugify(teams[0] || '', { lower: true })}/mission`,
                    gitHubIssues,
                    teams,
                },
            })
        }
    }

    result.data.postHogPipelines.nodes.forEach((node) => {
        createPage({
            path: `/docs/cdp/${node.type}s/${node.slug}`,
            component: DataPipeline,
            context: { id: node.id, ignoreWrapper: true },
        })
    })

    // Sources WITHOUT hand-written docs: create API-generated pages at both paths
    result.data.postHogSources.nodes.forEach((node) => {
        createPage({
            path: `/docs/data-warehouse/sources/${node.slug}`,
            component: DataWarehouseSource,
            context: { id: node.id, ignoreWrapper: true },
        })
        createPage({
            path: `/docs/cdp/sources/${node.slug}`,
            component: DataWarehouseSource,
            context: { id: node.id, ignoreWrapper: true },
        })
    })

    // Sources WITH hand-written docs: create data-warehouse page from the MDX content
    // (cdp page is already created by Gatsby's MDX processing from contents/docs/cdp/sources/)
    result.data.postHogSourcesWithDocs.nodes.forEach((node) => {
        if (node.mdx?.id) {
            createPage({
                path: `/docs/data-warehouse/sources/${node.slug}`,
                component: HandbookTemplate,
                context: {
                    id: node.mdx.id,
                    links: [],
                    nextURL: '',
                    searchFilter: 'Docs',
                    breadcrumbBase: { name: 'Docs', url: '/docs' },
                },
            })
        }
    })

    // Self-hosted sources: not in the API, but have MDX files at cdp/sources/
    // Create data-warehouse alias pages for them
    result.data.selfHostedSources.nodes.forEach((node) => {
        const slug = node.fields.slug.replace('/docs/cdp/sources/', '')
        createPage({
            path: `/docs/data-warehouse/sources/${slug}`,
            component: HandbookTemplate,
            context: {
                id: node.id,
                links: [],
                nextURL: '',
                searchFilter: 'Docs',
                breadcrumbBase: { name: 'Docs', url: '/docs' },
            },
        })
    })

    // Build every SDK reference page (latest + versioned) from the sourced nodes.
    createSdkReferencePages({
        createPage,
        referenceNodes: result.data.allSdkReferences.nodes,
        typeNodes: result.data.allSdkTypes.nodes,
    })
}

// Create SDK reference pages and their type sub-pages from already-sourced `SdkReferences`
// nodes. Shared by the full build and the minimal (preview) build. `latestOnly` restricts
// output to the `latest` rows, keeping the minimal preview deploy small (Cloudflare Pages caps
// deployments at 20k files) while still rendering /docs/references/* for review.
function createSdkReferencePages({
    createPage,
    referenceNodes,
    typeNodes,
    latestOnly = false,
}: {
    createPage: Parameters<GatsbyNode['createPages']>[0]['actions']['createPage']
    referenceNodes: any[]
    typeNodes: any[]
    latestOnly?: boolean
}) {
    const SdkReferenceTemplate = path.resolve(`src/templates/sdk/SdkReference.tsx`)
    const SdkTypeTemplate = path.resolve(`src/templates/sdk/SdkType.tsx`)

    // The `latest` row is served unversioned; every other row keeps its `<sdk>-<version>` id.
    const slugPrefixFor = (node: { version: string; referenceId: string; id: string }) =>
        isLatestVersion(node.version) ? node.referenceId : node.id

    // Each row crosslinks against its own types, so a versioned page describes that version.
    const typesByRow = typeNodes.reduce(
        (acc, node) => {
            acc[node.id] = (node.types ?? [])
                .filter(typeHasPage)
                .map(({ name }: { name: string }) => name)
                // A type with no usable name can't be linked to, so keep it out of the allowlist.
                .filter((name: string) => name && name !== 'null')
            return acc
        },
        {} as Record<string, string[]>
    )

    // Latest-only builds leave the version picker pointing at pages that don't exist — see the
    // note above `sdkVersions` in src/templates/sdk/SdkReference.tsx.
    referenceNodes.forEach((node) => {
        if (latestOnly && !isLatestVersion(node.version)) {
            return
        }
        const slugPrefix = slugPrefixFor(node)
        const pagePath = `/docs/references/${slugPrefix}`

        createPage({
            path: pagePath,
            component: SdkReferenceTemplate,
            context: {
                name: node.info.title,
                description: node.info.description,
                fullReference: node,
                regex: pagePath,
                // Must match the type page paths created below.
                slugPrefix,
                // Null checks, only affects type crosslinking, won't break build
                types: typesByRow[node.id] ?? [],
            },
        })
    })

    typeNodes.forEach((node) => {
        if (latestOnly && !isLatestVersion(node.version)) {
            return
        }
        const slugPrefix = slugPrefixFor(node)

        node.types?.forEach((type: any) => {
            if (typeHasPage(type)) {
                createPage({
                    path: `/docs/references/${slugPrefix}/types/${type.id}`,
                    component: SdkTypeTemplate,
                    context: {
                        typeData: type,
                        version: node.version,
                        referenceId: node.referenceId,
                        slugPrefix,
                        types: typesByRow[node.id] ?? [],
                    },
                })
            }
        })
    })
}

async function createMinimalPages({
    createPage,
    graphql,
}: {
    createPage: Parameters<GatsbyNode['createPages']>[0]['actions']['createPage']
    graphql: Parameters<GatsbyNode['createPages']>[0]['graphql']
}) {
    const HandbookTemplate = path.resolve(`src/templates/Handbook.tsx`)
    const BlogPostTemplate = path.resolve(`src/templates/BlogPost.tsx`)
    const DashboardTemplate = path.resolve(`src/templates/Template.tsx`)
    const Slugger = require('github-slugger')

    const result = await graphql(`
        {
            docs: allMdx(filter: { fields: { slug: { regex: "/^/docs/" } }, frontmatter: { title: { ne: "" } } }) {
                nodes {
                    id
                    headings {
                        depth
                        value
                    }
                    fields {
                        slug
                    }
                }
            }
            handbook: allMdx(
                filter: { fields: { slug: { regex: "/^/handbook/" } }, frontmatter: { title: { ne: "" } } }
            ) {
                nodes {
                    id
                    headings {
                        depth
                        value
                    }
                    fields {
                        slug
                    }
                }
            }
            productEngineerHandbook: allMdx(
                filter: { fields: { slug: { regex: "/^/product-engineer/" } }, frontmatter: { title: { ne: "" } } }
            ) {
                nodes {
                    id
                    headings {
                        depth
                        value
                    }
                    fields {
                        slug
                    }
                }
            }
            posts: allMdx(
                filter: {
                    isFuture: { eq: false }
                    frontmatter: { date: { ne: null } }
                    fields: {
                        slug: {
                            regex: "/^/(blog|library|founders|product-engineers|features|newsletter|spotlight|customers|tutorials)/"
                        }
                    }
                }
            ) {
                nodes {
                    id
                    headings {
                        depth
                        value
                    }
                    fields {
                        slug
                    }
                }
            }
            localizedNewsletter: allMdx(
                filter: { frontmatter: { date: { ne: null } }, fields: { slug: { regex: "/^/ko/newsletter/" } } }
            ) {
                nodes {
                    id
                    headings {
                        depth
                        value
                    }
                    fields {
                        slug
                    }
                }
            }
            ${SDK_REFERENCE_QUERY_FIELDS}
            pocketGuides: allMdx(filter: { fields: { slug: { regex: "/^/pocket-guides//" } } }) {
                nodes {
                    id
                    fields {
                        slug
                    }
                }
            }
        }
    `)

    if (result.errors) {
        console.error('Error in content preview GraphQL query:', result.errors)
        return Promise.reject(result.errors)
    }

    const menuFlattened = flattenMenu(menu)

    function formatToc(headings: Array<{ depth: number; value: string }>) {
        const slugger = new Slugger()
        return headings.map((heading) => {
            const cleanValue = heading.value.replace(/\s*<([a-z]+).+?>.+?<\/\1>/g, '')
            return {
                ...heading,
                depth: heading.depth - 2,
                url: slugger.slug(cleanValue),
                value: cleanValue,
            }
        })
    }

    function createHandbookPreviewPosts(data: any[], menuName: string, breadcrumbBase: { name: string; url: string }) {
        data.forEach((node) => {
            const slug = node.fields?.slug
            if (!slug) return

            const tableOfContents = node.headings && formatToc(node.headings)
            let breadcrumb = null

            menuFlattened.some((item) => {
                if (item.url === slug) {
                    breadcrumb = [...item.breadcrumb]
                    return true
                }
                return false
            })

            createPage({
                path: replacePath(slug),
                component: HandbookTemplate,
                context: {
                    id: node.id,
                    breadcrumb,
                    breadcrumbBase,
                    tableOfContents,
                    slug,
                    searchFilter: menuName,
                    links: [],
                    nextURL: '',
                },
            })
        })
    }

    function createBlogPreviewPosts(data: any[], askMax: boolean = false) {
        data.forEach((node) => {
            const slug = node.fields?.slug
            if (!slug) return

            const tableOfContents = node.headings && formatToc(node.headings)

            createPage({
                path: replacePath(slug),
                component: BlogPostTemplate,
                context: {
                    id: node.id,
                    tableOfContents,
                    slug,
                    post: true,
                    article: true,
                    ...(askMax ? { askMax: true } : {}),
                },
            })
        })
    }

    const data = result.data as {
        docs: { nodes: any[] }
        handbook: { nodes: any[] }
        productEngineerHandbook: { nodes: any[] }
        posts: { nodes: any[] }
        localizedNewsletter: { nodes: any[] }
        allSdkReferences: { nodes: any[] }
        allSdkTypes: { nodes: any[] }
        pocketGuides: { nodes: any[] }
    }

    // Pocket guides render in preview builds too - reviewers need to click through the book.
    // Same skip rule as the full build: SKILL.md siblings and _starter directories aren't pages.
    data.pocketGuides.nodes.forEach((node) => {
        const slug = node.fields?.slug
        if (!slug || slug.endsWith('/SKILL') || /\/_/.test(slug)) return
        createPage({
            path: slug,
            component: DashboardTemplate,
            context: {
                id: node.id,
            },
        })
    })

    createHandbookPreviewPosts(data.docs.nodes, 'docs', { name: 'Docs', url: '/docs' })

    createHandbookPreviewPosts(data.handbook.nodes, 'handbook', { name: 'Handbook', url: '/handbook' })
    createHandbookPreviewPosts(data.productEngineerHandbook.nodes, 'product-engineer', {
        name: 'Product Engineer Handbook',
        url: '/product-engineer',
    })
    createBlogPreviewPosts(data.posts.nodes)
    data.localizedNewsletter.nodes.forEach((node) => {
        const slug = node.fields?.slug
        if (!slug) return
        const tableOfContents = node.headings && formatToc(node.headings)
        createPage({
            path: replacePath(slug),
            component: BlogPostTemplate,
            context: {
                id: node.id,
                tableOfContents,
                slug,
                post: true,
                article: true,
                localizedRoot: 'newsletter',
            },
        })
    })

    // Render SDK reference pages (latest only) so /docs/references/* is reviewable in previews
    // without the full site's file count exceeding Cloudflare Pages' 20k-file deploy limit.
    createSdkReferencePages({
        createPage,
        referenceNodes: data.allSdkReferences.nodes,
        typeNodes: data.allSdkTypes.nodes,
        latestOnly: true,
    })
}
