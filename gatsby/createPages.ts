import { GatsbyNode } from 'gatsby'
import fetch from 'node-fetch'
import path from 'path'
import slugify from 'slugify'
import menu from '../src/navs/index'
import type { GatsbyContentResponse, MetaobjectsCollection } from '../src/templates/merch/types'
import { flattenMenu, replacePath } from './utils'
const Slugger = require('github-slugger')
const markdownLinkExtractor = require('markdown-link-extractor')

const isMinimalBuild = process.env.GATSBY_MINIMAL === 'true'

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
    const SdkReferenceTemplate = path.resolve(`src/templates/sdk/SdkReference.tsx`)
    const SdkTypeTemplate = path.resolve(`src/templates/sdk/SdkType.tsx`)

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
            templates: allMdx(filter: { fields: { slug: { regex: "/^/templates/" } } }) {
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
        }
    `)) as GatsbyContentResponse

    if (result.error) {
        return Promise.reject(result.error)
    }

    const menuFlattened = flattenMenu(menu)

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
            if (!isHub) {
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

    createPage({
        path: `/posts`,
        component: PostListingTemplate,
        context: {
            post: true,
            title: 'Posts',
            article: false,
        },
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
                for (const issue of issues) {
                    if (!issue) continue
                    const { html_url, number, title, labels } = await fetch(
                        `https://api.github.com/repos/${repo}/issues/${issue.trim()}`,
                        {
                            headers: {
                                Authorization: `token ${process.env.GITHUB_API_KEY}`,
                            },
                        }
                    ).then((res) => res.json())
                    gitHubIssues.push({
                        url: html_url,
                        number,
                        title,
                        labels,
                    })
                }
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

    // Grab types available for each SDK and version
    const sdkTypesByReference = result.data.allSdkTypes.nodes.reduce((acc, node) => {
        const { referenceId, version, ...types } = node

        if (!acc[referenceId]) {
            acc[referenceId] = {}
        }

        acc[referenceId][version] = types.types.map(({ name }) => name)

        return acc
    }, {} as Record<string, Record<string, any>>)

    result.data.allSdkReferences.nodes.forEach((node) => {
        if (node.version.includes('latest')) {
            createPage({
                path: `/docs/references/${node.referenceId}`,
                component: SdkReferenceTemplate,
                context: {
                    name: node.info.title,
                    description: node.info.description,
                    fullReference: node,
                    regex: `/docs/references/${node.referenceId}`,
                    types: sdkTypesByReference?.[node.referenceId]?.[node.version] ?? [],
                },
            })
        } else {
            createPage({
                path: `/docs/references/${node.id}`,
                component: SdkReferenceTemplate,
                context: {
                    name: node.info.title,
                    description: node.info.description,
                    fullReference: node,
                    regex: `/docs/references/${node.id}`,
                    // Null checks, only affects type crosslinking, won't break build
                    types: sdkTypesByReference?.[node.referenceId]?.[node.version] ?? [],
                },
            })
        }
    })

    result.data.allSdkTypes.nodes.forEach((node) => {
        node.types?.forEach((type) => {
            if (type.id && (type.properties || type.example)) {
                if (node.version.includes('latest')) {
                    createPage({
                        path: `/docs/references/${node.referenceId}/types/${type.id}`,
                        component: SdkTypeTemplate,
                        context: {
                            typeData: type,
                            version: node.version,
                            id: node.id,
                            types: sdkTypesByReference?.[node.referenceId]?.[node.version] ?? [],
                            slugPrefix: node.referenceId,
                        },
                    })
                } else {
                    createPage({
                        path: `/docs/references/${node.id}/types/${type.id}`,
                        component: SdkTypeTemplate,
                        context: {
                            typeData: type,
                            version: node.version,
                            id: node.id,
                            types: sdkTypesByReference?.[node.referenceId]?.[node.version] ?? [],
                            slugPrefix: node.id,
                        },
                    })
                }
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
        posts: { nodes: any[] }
    }

    createHandbookPreviewPosts(data.docs.nodes, 'docs', { name: 'Docs', url: '/docs' })
    createHandbookPreviewPosts(data.handbook.nodes, 'handbook', { name: 'Handbook', url: '/handbook' })
    createBlogPreviewPosts(data.posts.nodes)
}
