const { replacePath, flattenMenu } = require('./utils')
const path = require('path')
const slugify = require('slugify')
const Slugger = require('github-slugger')
const { default: fetch } = require('node-fetch')

module.exports = exports.createPages = async ({ actions: { createPage }, graphql }) => {
    const HandbookTemplate = path.resolve(`src/templates/Handbook.tsx`)
    const BlogPostTemplate = path.resolve(`src/templates/BlogPost.js`)
    const PlainTemplate = path.resolve(`src/templates/Plain.js`)
    const BlogCategoryTemplate = path.resolve(`src/templates/BlogCategory.js`)
    const CustomerTemplate = path.resolve(`src/templates/Customer.js`)
    const PluginTemplate = path.resolve(`src/templates/Plugin.js`)
    const AppTemplate = path.resolve(`src/templates/App.js`)
    const TutorialTemplate = path.resolve(`src/templates/Tutorial.js`)
    const ProductTemplate = path.resolve(`src/templates/Product.js`)
    const ApiEndpoint = path.resolve(`src/templates/ApiEndpoint.js`)
    const TutorialsCategoryTemplate = path.resolve(`src/templates/TutorialsCategory.js`)
    const TutorialsAuthorTemplate = path.resolve(`src/templates/TutorialsAuthor.js`)
    const HostHogTemplate = path.resolve(`src/templates/HostHog.js`)
    const Question = path.resolve(`src/templates/Question.js`)
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
                categories: group(field: frontmatter___topics) {
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
                    fields {
                        slug
                    }
                }
            }
            blogPosts: allMdx(filter: { isFuture: { eq: false }, fields: { slug: { regex: "/^/blog/" } } }) {
                nodes {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        categories
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
            categories: allMdx(limit: 1000) {
                group(field: frontmatter___categories) {
                    category: fieldValue
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
            questions: allQuestion {
                nodes {
                    id
                }
            }
        }
    `)

    if (result.errors) {
        return Promise.reject(mdPagesResult.errors)
    }

    function formatToc(headings) {
        const slugger = new Slugger()
        return headings.map((heading) => {
            return {
                ...heading,
                depth: heading.depth - 2,
                url: slugger.slug(heading.value),
            }
        })
    }

    const handbookMenu = result.data.sidebars.childSidebarsJson.handbook
    const handbookMenuFlattened = flattenMenu(handbookMenu)
    const docsMenu = result.data.sidebars.childSidebarsJson.docs
    const docsMenuFlattened = flattenMenu(docsMenu)
    const categories = {}
    result.data.categories.group.forEach(({ category }) => {
        const slug = slugify(category, { lower: true })
        const url = `/blog/categories/${slug}`
        categories[category] = {
            slug,
            url,
        }
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

    result.data.handbook.nodes.forEach((node) => {
        const { slug } = node.fields
        let next = null
        let previous = null
        let breadcrumb = null
        const tableOfContents = formatToc(node.headings)
        handbookMenuFlattened.some((item, index) => {
            if (item.url === slug) {
                next = handbookMenuFlattened[index + 1]
                previous = handbookMenuFlattened[index - 1]
                breadcrumb = item.breadcrumb
                return true
            }
        })

        createPage({
            path: replacePath(node.fields.slug),
            component: HandbookTemplate,
            context: {
                id: node.id,
                next,
                previous,
                menu: handbookMenu,
                breadcrumb,
                breadcrumbBase: { name: 'Handbook', url: '/handbook' },
                tableOfContents: [...tableOfContents, { depth: 0, url: 'squeak-questions', value: 'Questions?' }],
                slug,
            },
        })
    })

    result.data.docs.nodes.forEach((node) => {
        const { slug } = node.fields
        let next = null
        let previous = null
        let breadcrumb = null
        const tableOfContents = formatToc(node.headings)
        docsMenuFlattened.some((item, index) => {
            if (item.url === slug) {
                next = docsMenuFlattened[index + 1]
                previous = docsMenuFlattened[index - 1]
                breadcrumb = item.breadcrumb
                return true
            }
        })

        createPage({
            path: replacePath(node.fields.slug),
            component: HandbookTemplate,
            context: {
                id: node.id,
                next,
                previous,
                menu: docsMenu,
                breadcrumb,
                breadcrumbBase: { name: 'Docs', url: '/docs' },
                tableOfContents: [...tableOfContents, { depth: 0, url: 'squeak-questions', value: 'Questions?' }],
                slug,
            },
        })
    })

    result.data.apidocs.nodes.forEach((node) => {
        const slug = replacePath(node.url)
        let next = null
        let previous = null
        let breadcrumb = null
        docsMenuFlattened.some((item, index) => {
            if (item.url === slug) {
                next = docsMenuFlattened[index + 1]
                previous = docsMenuFlattened[index - 1]
                breadcrumb = item.breadcrumb
                return true
            }
        })

        createPage({
            path: slug,
            component: ApiEndpoint,
            context: {
                id: node.id,
                slug,
                menu: docsMenu,
                next,
                previous,
                // menu: docsMenu,
                breadcrumb,
                breadcrumbBase: { name: 'Docs', url: '/docs' },
                // tableOfContents,
                // slug,
            },
        })
    })

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
        const postCategories = node.frontmatter.categories || []
        createPage({
            path: replacePath(slug),
            component: BlogPostTemplate,
            context: {
                id: node.id,
                categories: postCategories.map((category) => ({ title: category, url: categories[category].url })),
                slug,
            },
        })
    })

    Object.keys(categories).forEach((category) => {
        const { url, slug } = categories[category]
        createPage({
            path: url,
            component: BlogCategoryTemplate,
            context: {
                title: category,
                category,
                slug,
                crumbs: [{ title: 'Blog', url: '/blog' }, { title: category }],
            },
        })
    })

    result.data.customers.nodes.forEach((node) => {
        const { slug } = node.fields
        createPage({
            path: slug,
            component: CustomerTemplate,
            context: {
                id: node.id,
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
    result.data.questions.nodes.forEach((node) => {
        const { id } = node
        createPage({
            path: `questions/${id}`,
            component: Question,
            context: {
                id,
            },
        })
    })

    const LibraryTemplate = path.resolve(`src/templates/Library.tsx`)
    const libraries = await graphql(`
        {
            allMdx(
                filter: {
                    fields: { slug: { regex: "/^/docs/integrate/(client|server)/(?!.*snippets/).*/" } }
                    frontmatter: { title: { ne: "" } }
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

    libraries.data.allMdx.nodes.forEach((node) => {
        const { slug } = node.fields
        let next = null
        let previous = null
        let breadcrumb = null
        const tableOfContents = formatToc(node.headings)
        docsMenuFlattened.some((item, index) => {
            if (item.url === slug) {
                next = docsMenuFlattened[index + 1]
                previous = docsMenuFlattened[index - 1]
                breadcrumb = item.breadcrumb
                return true
            }
        })

        createPage({
            path: replacePath(node.fields.slug),
            component: LibraryTemplate,
            context: {
                id: node.id,
                next,
                previous,
                menu: docsMenu,
                breadcrumb,
                breadcrumbBase: { name: 'Docs', url: '/docs' },
                tableOfContents: [...tableOfContents, { depth: 0, url: 'squeak-questions', value: 'Questions?' }],
                slug,
            },
        })
    })
}
