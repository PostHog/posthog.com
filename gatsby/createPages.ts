import { replacePath, flattenMenu } from './utils'
import { GatsbyNode } from 'gatsby'
import path from 'path'
import slugify from 'slugify'
import fetch from 'node-fetch'
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
    const ProductTemplate = path.resolve(`src/templates/Product.js`)
    const HostHogTemplate = path.resolve(`src/templates/HostHog.js`)
    const Job = path.resolve(`src/templates/Job.tsx`)

    // Tutorials
    const TutorialTemplate = path.resolve(`src/templates/tutorials/Tutorial.tsx`)
    const TutorialsCategoryTemplate = path.resolve(`src/templates/tutorials/TutorialsCategory.tsx`)
    const TutorialsAuthorTemplate = path.resolve(`src/templates/tutorials/TutorialsAuthor.tsx`)

    // Docs
    const ApiEndpoint = path.resolve(`src/templates/ApiEndpoint.tsx`)
    const HandbookTemplate = path.resolve(`src/templates/Handbook.tsx`)

    const result = await graphql(`
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
                    fieldValue
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
            blogPosts: allMdx(filter: { isFuture: { eq: false }, fields: { slug: { regex: "/^/blog/" } } }) {
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
            sidebars: file(absolutePath: { regex: "//sidebars/sidebars.json$/" }) {
                childSidebarsJson {
                    handbook {
                        children {
                            children {
                                children {
                                    children {
                                        children {
                                            name
                                            url
                                        }
                                        name
                                        url
                                    }
                                    name
                                    url
                                }
                                name
                                url
                            }
                            name
                            url
                        }
                        name
                        url
                    }
                    docs {
                        children {
                            children {
                                children {
                                    children {
                                        children {
                                            name
                                            url
                                        }
                                        name
                                        url
                                    }
                                    name
                                    url
                                }
                                name
                                url
                            }
                            name
                            url
                        }
                        name
                        url
                    }
                    apps {
                        name
                        url
                    }
                    product {
                        name
                        url
                    }
                }
            }
            categories: allMdx(
                sort: { order: DESC, fields: [frontmatter___date] }
                filter: { isFuture: { eq: false }, frontmatter: { rootPage: { eq: "/blog" }, date: { ne: null } } }
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
        }
    `)

    if (result.errors) {
        return Promise.reject(result.errors)
    }

    function createPosts(data, menu, template, breadcrumbBase, context) {
        const menuFlattened = flattenMenu(result.data.sidebars.childSidebarsJson[menu])
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
                    menu: result.data.sidebars.childSidebarsJson[menu],
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

    const createPaginatedPages = ({ postsPerPage = 10, totalCount, base, template, extraContext = {} }) => {
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

    createPaginatedPages({ totalCount: result.data.blogPosts.totalCount, base: '/blog/all', template: BlogTemplate })

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

    const tutorialsPageViewExport = await fetch(
        'https://app.posthog.com/shared/4lYoM6fa3Sa8KgmljIIHbVG042Bd7Q.json'
    ).then((res) => res.json())

    result.data.tutorials.nodes.forEach((node) => {
        const tableOfContents = formatToc(node.headings)
        const { slug } = node.fields
        let pageViews
        tutorialsPageViewExport.dashboard.items[0].result.some((insight) => {
            if (insight.breakdown_value.includes(slug)) {
                pageViews = insight.aggregated_value
                return true
            }
        })

        createPage({
            path: replacePath(node.fields.slug),
            component: TutorialTemplate,
            context: {
                id: node.id,
                tableOfContents,
                menu: result.data.sidebars.childSidebarsJson.docs,
                pageViews,
                slug,
            },
        })
    })

    result.data.tutorials.categories.forEach(({ fieldValue }) => {
        const slug = `/tutorials/categories/${slugify(fieldValue, { lower: true })}`
        createPage({
            path: slug,
            component: TutorialsCategoryTemplate,
            context: {
                activeFilter: fieldValue,
            },
        })
    })

    result.data.tutorials.contributors.forEach(({ fieldValue }) => {
        const slug = `/tutorials/contributors/${slugify(fieldValue, { lower: true })}`
        createPage({
            path: slug,
            component: TutorialsAuthorTemplate,
            context: {
                activeFilter: fieldValue,
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
            },
        })
    })

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

    result.data.apps.nodes.forEach((node) => {
        const { slug } = node.fields
        const { documentation } = node.frontmatter
        let next = null
        let previous = null
        const sidebar = result.data.sidebars.childSidebarsJson.apps
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
    result.data.product.nodes.forEach((node) => {
        const { slug } = node.fields
        const { documentation } = node.frontmatter
        let next = null
        let previous = null
        const sidebar = result.data.sidebars.childSidebarsJson.product
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
