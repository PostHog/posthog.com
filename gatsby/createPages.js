const replacePath = require('./utils')
const path = require('path')
const slugify = require('slugify')

module.exports = exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions
    const HandbookTemplate = path.resolve(`src/templates/Handbook/index.js`)
    const BlogPostTemplate = path.resolve(`src/templates/BlogPost.js`)
    const PlainTemplate = path.resolve(`src/templates/Plain.js`)
    const BlogCategoryTemplate = path.resolve(`src/templates/BlogCategory.js`)
    const CustomerTemplate = path.resolve(`src/templates/Customer.js`)
    const result = await graphql(`
        {
            allMdx(limit: 1000) {
                nodes {
                    id
                    slug
                }
            }
            handbook: allMdx(filter: { fields: { slug: { regex: "/^/handbook/" } } }) {
                nodes {
                    id
                    tableOfContents
                    fields {
                        slug
                    }
                }
            }
            docs: allMdx(filter: { fields: { slug: { regex: "/^/docs/" } } }) {
                nodes {
                    id
                    tableOfContents
                    fields {
                        slug
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
            blogPosts: allMdx(filter: { fields: { slug: { regex: "/^/blog/" } } }) {
                nodes {
                    id
                    fields {
                        slug
                    }
                }
            }
            sidebars: file(absolutePath: { regex: "//sidebars/sidebars.json$/" }) {
                childSidebarsJson {
                    handbook {
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
                    docs {
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
                }
            }
            categories: allMdx(limit: 1000) {
                group(field: frontmatter___categories) {
                    category: fieldValue
                }
            }
        }
    `)

    if (result.errors) {
        return Promise.reject(mdPagesResult.errors)
    }

    function flattenMenu(items, breadcrumb = []) {
        return items.reduce((acc, item) => {
            if (item.url) {
                acc.push({ url: item.url, name: item.name, breadcrumb })
            }
            if (item.children) {
                acc.push(
                    ...flattenMenu(item.children, [
                        ...breadcrumb,
                        { name: item.name, url: item.url || item.children[0].url },
                    ])
                )
            }
            return acc
        }, [])
    }

    function flattenToc(items) {
        return items.reduce((acc, item) => {
            if (item.url) {
                acc.push({ url: item.url.slice(1), name: item.title })
            }
            if (item.items) {
                acc.push(...flattenToc(item.items))
            }
            return acc
        }, [])
    }

    const handbookMenu = result.data.sidebars.childSidebarsJson.handbook
    const handbookMenuFlattened = flattenMenu(handbookMenu)
    const docsMenu = result.data.sidebars.childSidebarsJson.docs
    const docsMenuFlattened = flattenMenu(docsMenu)

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
        const tableOfContents = node.tableOfContents.items && flattenToc(node.tableOfContents.items)
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
                tableOfContents,
            },
        })
    })

    result.data.docs.nodes.forEach((node) => {
        const { slug } = node.fields
        let next = null
        let previous = null
        let breadcrumb = null
        const tableOfContents = node.tableOfContents.items && flattenToc(node.tableOfContents.items)
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
                tableOfContents,
            },
        })
    })

    result.data.blogPosts.nodes.forEach((node) => {
        const { slug } = node.fields
        createPage({
            path: replacePath(slug),
            component: BlogPostTemplate,
            context: {
                id: node.id,
            },
        })
    })

    result.data.categories.group.forEach(({ category: category }) => {
        const slug = slugify(category, { lower: true })
        const path = `/blog/categories/${slug}`
        createPage({
            path,
            component: BlogCategoryTemplate,
            context: {
                title: `Blog: ${category}`,
                category,
                slug,
            },
        })
    })

    result.data.customers.nodes.forEach((node) => {
        const { slug } = node.fields
        createPage({
            path: replacePath(slug),
            component: CustomerTemplate,
            context: {
                id: node.id,
            },
        })
    })
}
