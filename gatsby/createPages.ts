import { GatsbyNode } from 'gatsby'
import fetch from 'node-fetch'
import path from 'path'
import slugify from 'slugify'
import { node } from 'webpack'
import menu from '../src/navs/index'
import type { GatsbyContentResponse, MetaobjectsCollection } from '../src/templates/merch/types'
import { flattenMenu, replacePath } from './utils'
const Slugger = require('github-slugger')
const markdownLinkExtractor = require('markdown-link-extractor')

export const createPages: GatsbyNode['createPages'] = async ({ actions: { createPage }, graphql }) => {
    const BlogPostTemplate = path.resolve(`src/templates/BlogPost.js`)
    const PlainTemplate = path.resolve(`src/templates/Plain.js`)
    const BlogCategoryTemplate = path.resolve(`src/templates/BlogCategory.tsx`)
    const BlogTagTemplate = path.resolve(`src/templates/BlogTag.tsx`)
    const BlogTemplate = path.resolve(`src/templates/Blog.tsx`)
    const CustomerTemplate = path.resolve(`src/templates/Customer.js`)
    const PluginTemplate = path.resolve(`src/templates/Plugin.js`)
    const AppTemplate = path.resolve(`src/templates/App.js`)
    const PipelineTemplate = path.resolve(`src/templates/Pipeline.js`)
    const DashboardTemplate = path.resolve(`src/templates/Template.js`)
    const HostHogTemplate = path.resolve(`src/templates/HostHog.js`)
    const Job = path.resolve(`src/templates/Job.tsx`)
    const ChangelogTemplate = path.resolve(`src/templates/Changelog.tsx`)
    const PostListingTemplate = path.resolve(`src/templates/PostListing.tsx`)
    const PaginationTemplate = path.resolve(`src/templates/Pagination.tsx`)

    // Tutorials
    const TutorialsTemplate = path.resolve(`src/templates/tutorials/index.tsx`)
    const TutorialTemplate = path.resolve(`src/templates/tutorials/Tutorial.tsx`)
    const TutorialsCategoryTemplate = path.resolve(`src/templates/tutorials/TutorialsCategory.tsx`)

    // Docs
    const ApiEndpoint = path.resolve(`src/templates/ApiEndpoint.tsx`)
    const HandbookTemplate = path.resolve(`src/templates/Handbook.tsx`)

    const result = (await graphql(`
        {
            allMdx(
                filter: {
                    fileAbsolutePath: { regex: "/^((?!contents/team/).)*$/" }
                    frontmatter: { title: { ne: "" } }
                }
                limit: 1000
            ) {
                nodes {
                    id
                    slug
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
                    fields: { slug: { regex: "/^/library|^/founders|^/product-engineers|^/features/" } }
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
            postCategories: allPostCategory(filter: { attributes: { folder: { ne: null } } }) {
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
            plugins: allPlugin(filter: { url: { regex: "/github.com/" } }) {
                nodes {
                    id
                    slug
                }
            }
            hostHog: allMdx(filter: { fields: { slug: { regex: "/^/hosthog/" } } }) {
                nodes {
                    id
                    slug
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
            allShopifyProduct(limit: 1000) {
                nodes {
                    handle
                }
            }
            allShopifyCollection {
                nodes {
                    handle
                    products {
                        description
                        featuredMedia {
                            preview {
                                image {
                                    localFile {
                                        childImageSharp {
                                            gatsbyImageData
                                        }
                                    }
                                }
                            }
                        }
                        handle
                        id
                        metafields {
                            value
                            key
                        }
                        options {
                            shopifyId
                            name
                            values
                        }
                        priceRangeV2 {
                            maxVariantPrice {
                                amount
                            }
                            minVariantPrice {
                                amount
                            }
                        }
                        shopifyId
                        status
                        title
                        tags
                        totalInventory
                        variants {
                            availableForSale
                            media {
                                preview {
                                    image {
                                        localFile {
                                            childImageSharp {
                                                gatsbyImageData
                                            }
                                        }
                                    }
                                }
                            }
                            price
                            product {
                                title
                                featuredMedia {
                                    preview {
                                        image {
                                            localFile {
                                                childImageSharp {
                                                    gatsbyImageData
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            selectedOptions {
                                name
                                value
                            }
                            shopifyId
                            sku
                            title
                        }
                    }
                }
            }
            allMerchNavigation {
                nodes {
                    title
                    handle
                }
            }
        }
    `)) as GatsbyContentResponse

    if (result.error) {
        return Promise.reject(result.error)
    }

    /**
     * Merch
     */

    const merchNav = result.data.allMerchNavigation.nodes?.map((item: MetaobjectsCollection) => {
        return {
            url: item.handle === 'all-products' ? '/merch' : `/merch/${item.handle}`,
            handle: item.handle,
            title: item.title,
        }
    })

    /**
     * Collection pages. Slightly abusing context here and sending all products
     * per paginated collection page. Gatsby doesn't let you both filter your
     * Graphql query at collections and then again for the products inside.
     */
    const productsPerPage = 50
    result.data.allShopifyCollection.nodes.forEach((collection) => {
        const { handle, products } = collection
        const merchBasePath = '/merch'
        const collectionPath = handle === 'all-products' ? '' : `/${handle}`
        const collectionProductsCount = products.length
        const numPages = Math.ceil(collectionProductsCount / productsPerPage)

        Array.from({
            length: numPages,
        }).forEach((_, i) => {
            const currentPage = i + 1
            const startIndex = (currentPage - 1) * productsPerPage
            const endIndex = startIndex + productsPerPage
            const productsForCurrentPage = products.slice(startIndex, endIndex)

            createPage({
                path: i === 0 ? `${merchBasePath}${collectionPath}` : `${merchBasePath}${collectionPath}/${i + 1}`,
                component: path.resolve('./src/templates/merch/Collection.tsx'),
                context: {
                    merchNav,
                    handle,
                    limit: productsPerPage,
                    skip: i * productsPerPage,
                    numPages,
                    currentPage: i + 1,
                    productsForCurrentPage,
                },
            })
        })
    })

    result.data.allShopifyProduct.nodes.forEach((node) => {
        createPage({
            path: `/merch/products/${node.handle}/`,
            component: path.resolve(`./src/templates/merch/Product.tsx`),
            context: {
                handle: node.handle,
            },
        })
    })

    const menuFlattened = flattenMenu(menu)

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
                    next = menuFlattened[index + 1]
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
            return {
                ...heading,
                depth: heading.depth - 2,
                url: slugger.slug(heading.value),
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

    result.data.allMdx.nodes.forEach((node) => {
        createPage({
            path: replacePath(node.slug),
            component: PlainTemplate,
            context: {
                id: node.id,
            },
        })
    })

    const createTeamContext = (node) => ({
        mission: `${node.fields?.slug || node.url}/mission`,
        objectives: `${node.fields?.slug || node.url}/objectives`,
    })

    createPosts(
        result.data.handbook.nodes,
        'handbook',
        HandbookTemplate,
        { name: 'Handbook', url: '/handbook' },
        createTeamContext
    )
    createPosts(result.data.docs.nodes, 'docs', HandbookTemplate, { name: 'Docs', url: '/docs' })
    createPosts(result.data.apidocs.nodes, 'docs', ApiEndpoint, { name: 'Docs', url: '/docs' })
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
            },
        })
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

    result.data.postCategories.nodes.forEach(
        ({ attributes: { folder: categoryFolder, label: categoryLabel, post_tags } }) => {
            createPage({
                path: `/${categoryFolder}`,
                component: PostListingTemplate,
                context: {
                    post: true,
                    title: categoryLabel,
                    article: false,
                },
            })

            post_tags?.data?.forEach(({ attributes: { label: tagLabel } }) => {
                createPage({
                    path: `/${categoryFolder}/${slugify(tagLabel, { lower: true, strict: true })}`,
                    component: PostListingTemplate,
                    context: {
                        selectedTag: tagLabel,
                        post: true,
                        title: tagLabel,
                        article: false,
                    },
                })
            })
        }
    )

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
    result.data.plugins.nodes.forEach((node) => {
        const { id, slug } = node
        if (slug) {
            createPage({
                path: slug,
                component: PluginTemplate,
                context: {
                    id,
                },
            })
        }
    })
    result.data.hostHog.nodes.forEach((node) => {
        const { id, slug } = node
        if (slug) {
            createPage({
                path: slug,
                component: HostHogTemplate,
                context: {
                    id,
                },
            })
        }
    })

    if (process.env.ASHBY_API_KEY && process.env.GITHUB_API_KEY) {
        for (node of result.data.jobs.nodes) {
            const { id, parent } = node
            const slug = node.fields.slug
            const team = parent?.customFields?.find(({ title, value }) => title === 'Team')?.value
            const issues = parent?.customFields?.find(({ title, value }) => title === 'Issues')?.value?.split(',')
            const repo = parent?.customFields?.find(({ title, value }) => title === 'Repo')?.value
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
                    teamName: team,
                    teamNameInfo: `${team} Team`,
                    objectives: `/handbook/small-teams/${slugify(team, { lower: true })}/objectives`,
                    mission: `/handbook/small-teams/${slugify(team, { lower: true })}/mission`,
                    gitHubIssues,
                },
            })
        }
    }

    result.data.roadmapYears.group.forEach(({ fieldValue: year }) => {
        createPage({
            path: `/changelog/${year}`,
            component: ChangelogTemplate,
            context: {
                year: Number(year),
            },
        })
    })
}
