import { replacePath, flattenMenu } from './utils'
import { GatsbyNode } from 'gatsby'
import path from 'path'
import slugify from 'slugify'
import fetch from 'node-fetch'
import sidebars from '../src/sidebars/index'
const Slugger = require('github-slugger')
const markdownLinkExtractor = require('markdown-link-extractor')

const PlainTemplate = path.resolve(`src/templates/Plain.js`)

const CustomerTemplate = path.resolve(`src/templates/Customer.js`)
const PluginTemplate = path.resolve(`src/templates/Plugin.js`)
const AppTemplate = path.resolve(`src/templates/App.js`)
const ProductTemplate = path.resolve(`src/templates/Product.js`)
const HostHogTemplate = path.resolve(`src/templates/HostHog.js`)
const Job = path.resolve(`src/templates/Job.tsx`)

// Blog
const BlogPostTemplate = path.resolve(`src/templates/BlogPost.js`)
const BlogCategoryTemplate = path.resolve(`src/templates/BlogCategory.tsx`)
const BlogTagTemplate = path.resolve(`src/templates/BlogTag.tsx`)
const BlogTemplate = path.resolve(`src/templates/Blog.tsx`)

// Tutorials
const TutorialsTemplate = path.resolve(`src/templates/tutorials/index.tsx`)
const TutorialTemplate = path.resolve(`src/templates/tutorials/Tutorial.tsx`)
const TutorialsCategoryTemplate = path.resolve(`src/templates/tutorials/TutorialsCategory.tsx`)

// Docs
const ApiEndpoint = path.resolve(`src/templates/ApiEndpoint.tsx`)
const HandbookTemplate = path.resolve(`src/templates/Handbook.tsx`)

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

export const createPages: GatsbyNode['createPages'] = async ({ actions: { createPage }, graphql }) => {
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

    function createPosts(data, menu, template, breadcrumbBase, context) {
        const menuFlattened = flattenMenu(sidebars[menu])

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
                    menu: sidebars[menu],
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

    async function createHandbookPages() {
        const result = await graphql(`
            {
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
            }
        `)

        createPosts(
            result.data.handbook.nodes,
            'handbook',
            HandbookTemplate,
            { name: 'Handbook', url: '/handbook' },
            createTeamContext
        )
    }

    async function createBlogPages() {
        const result = await graphql(`
            {
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
            }
        `)

        // Do we need both of these?

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
            template: BlogTemplate,
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
                },
            })
        })
    }

    async function createPlainPages() {
        const result = await graphql(`
            {
                allMdx(
                    filter: {
                        slug: { regex: "/^(?!(docs|tutorials|product|manual|handbook|blog|customers|apps)/.*).*/" }
                        frontmatter: { title: { ne: "" } }
                    }
                    limit: 1000
                ) {
                    nodes {
                        id
                        fileAbsolutePath
                        slug
                    }
                }
            }
        `)

        result.data.allMdx.nodes.forEach((node) => {
            createPage({
                path: replacePath(node.slug),
                component: PlainTemplate,
                context: {
                    id: node.id,
                },
            })
        })
    }

    const createTeamContext = (node) => ({
        mission: `${node.fields?.slug || node.url}/mission`,
        objectives: `${node.fields?.slug || node.url}/objectives`,
    })

    const createDocsPages = async () => {
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
                        rawBody
                    }
                }
            }
        `)

        createPosts(result.data.docs.nodes, 'docs', HandbookTemplate, { name: 'Docs', url: '/docs' })
    }

    const createApiPages = async () => {
        const result = await graphql(`
            {
                apidocs: allApiEndpoint {
                    nodes {
                        id
                        name
                        url
                    }
                }
            }
        `)

        createPosts(result.data.apidocs.nodes, 'docs', ApiEndpoint, { name: 'Docs', url: '/docs' })
    }

    async function createManualPages() {
        const result = await graphql(`
            {
                manual: allMdx(
                    filter: { fields: { slug: { regex: "/^/manual/" } }, frontmatter: { title: { ne: "" } } }
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
            }
        `)

        createPosts(result.data.manual.nodes, 'docs', HandbookTemplate, {
            name: 'Using PostHog',
            url: '/using-posthog',
        })
    }

    async function createTutorials() {
        const result = await graphql(`
            {
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
            }
        `)

        result.data.tutorials.nodes.forEach((node) => {
            const tableOfContents = formatToc(node.headings)
            const { slug } = node.fields

            createPage({
                path: replacePath(node.fields.slug),
                component: TutorialTemplate,
                context: {
                    id: node.id,
                    tableOfContents,
                    menu: sidebars.docs,
                    slug,
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
    }

    async function createCustomers() {
        const result = await graphql(`
            {
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
            }
        `)

        result.data.customers.nodes.forEach((node) => {
            const { slug } = node.fields
            const tableOfContents = node.headings && formatToc(node.headings)
            createPage({
                path: slug,
                component: CustomerTemplate,
                context: {
                    id: node.id,
                    tableOfContents,
                },
            })
        })
    }

    async function createApps() {
        const result = await graphql(`
            {
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
            }
        `)

        result.data.apps.nodes.forEach((node) => {
            const { slug } = node.fields
            const { documentation } = node.frontmatter
            let next = null
            let previous = null
            const sidebar = sidebars.apps
            sidebar.some((item, index) => {
                if (item.url === slug) {
                    next = sidebar[index + 1]
                    previous = sidebar[index - 1]
                    return true
                }
            })
            createPage({
                path: slug,
                component: AppTemplate,
                context: {
                    id: node.id,
                    documentation: documentation || '',
                    next,
                    previous,
                },
            })
        })
    }

    async function createProducts() {
        const result = await graphql(`
            {
                product: allMdx(filter: { fields: { slug: { regex: "/^/product/" } } }) {
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
            }
        `)

        result.data.product.nodes.forEach((node) => {
            const { slug } = node.fields
            const { documentation } = node.frontmatter
            let next = null
            let previous = null
            const sidebar = sidebars.product
            sidebar.some((item, index) => {
                if (item.url === slug) {
                    next = sidebar[index + 1]
                    previous = sidebar[index - 1]
                    return true
                }
            })
            createPage({
                path: slug,
                component: ProductTemplate,
                context: {
                    id: node.id,
                    documentation: documentation || '',
                    next,
                    previous,
                },
            })
        })
    }

    async function createPlugins() {
        const result = await graphql(`
            {
                plugins: allPlugin(filter: { url: { regex: "/github.com/" } }) {
                    nodes {
                        id
                        slug
                    }
                }
            }
        `)

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
    }

    async function createHostHogPages() {
        const result = await graphql(`
            {
                hostHog: allMdx(filter: { fields: { slug: { regex: "/^/hosthog/" } } }) {
                    nodes {
                        id
                        slug
                    }
                }
            }
        `)

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
    }

    async function createJobs() {
        const result = await graphql(`
            {
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
            }
        `)

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
    }

    await Promise.all(
        [
            createBlogPages,
            createDocsPages,
            createHandbookPages,
            createCustomers,
            createApps,
            createProducts,
            createPlugins,
            createHostHogPages,
            createJobs,
            createTutorials,
            createApiPages,
            createPlainPages,
            createManualPages,
        ].map(async (func, index) => {
            console.time(index.toString())
            return func().then(() => console.timeEnd(index.toString()))
        })
    )
}
