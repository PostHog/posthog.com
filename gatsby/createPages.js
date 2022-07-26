const { replacePath, formatToc } = require('./utils')
const path = require('path')
const slugify = require('slugify')
const { default: fetch } = require('node-fetch')

module.exports = exports.createPages = async ({ actions: { createPage }, graphql }) => {
    const BlogPostTemplate = path.resolve(`src/templates/BlogPost.js`)
    const BlogCategoryTemplate = path.resolve(`src/templates/BlogCategory.js`)

    const PlainTemplate = path.resolve(`src/templates/Plain.js`)
    const CustomerTemplate = path.resolve(`src/templates/Customer.js`)
    const PluginTemplate = path.resolve(`src/templates/Plugin.js`)
    const AppTemplate = path.resolve(`src/templates/App.js`)
    const ProductTemplate = path.resolve(`src/templates/Product.js`)
    const HostHogTemplate = path.resolve(`src/templates/HostHog.js`)
    const Question = path.resolve(`src/templates/Question.js`)

    // Tutorials
    const TutorialTemplate = path.resolve(`src/templates/Tutorial.js`)
    const TutorialsCategoryTemplate = path.resolve(`src/templates/TutorialsCategory.js`)
    const TutorialsAuthorTemplate = path.resolve(`src/templates/TutorialsAuthor.js`)

    // Docs
    const DocsTemplate = path.resolve(`src/templates/docs/Main.tsx`)
    const ApiEndpoint = path.resolve(`src/templates/ApiEndpoint.js`)
    const HandbookTemplate = path.resolve(`src/templates/Handbook.tsx`)
    const LibraryTemplate = path.resolve(`src/templates/docs/Library.tsx`)
    const AppDocsTemplate = path.resolve(`src/templates/docs/App.tsx`)

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
                    frontmatter {
                        layout
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
            categories: allMdx(filter: { slug: { glob: "blog/*" } }) {
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
        return Promise.reject(result.errors)
    }

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

        createPage({
            path: replacePath(node.fields.slug),
            component: HandbookTemplate,
            context: {
                id: node.id,
                slug,
            },
        })
    })

    result.data.docs.nodes.forEach((node) => {
        const { slug } = node.fields
        const { layout = 'docs' } = node.frontmatter

        createPage({
            path: replacePath(node.fields.slug),
            component: layout === 'library' ? LibraryTemplate : layout === 'app' ? AppDocsTemplate : DocsTemplate,
            context: {
                id: node.id,
                slug,
            },
        })
    })

    result.data.apidocs.nodes.forEach((node) => {
        const slug = replacePath(node.url)

        createPage({
            path: slug,
            component: ApiEndpoint,
            context: {
                id: node.id,
                slug,
                breadcrumbBase: { name: 'Docs', url: '/docs' },
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

        createPage({
            path: slug,
            component: AppTemplate,
            context: {
                id: node.id,
                documentation: documentation || '',
            },
        })
    })
    result.data.product.nodes.forEach((node) => {
        const { slug } = node.fields
        const { documentation } = node.frontmatter

        createPage({
            path: slug,
            component: ProductTemplate,
            context: {
                id: node.id,
                documentation: documentation || '',
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
}
