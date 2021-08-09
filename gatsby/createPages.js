const replacePath = require('./utils')
const path = require('path')

module.exports = exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions
    const TemplateMdx = path.resolve(`src/templates/TemplateMdx.tsx`)
    const HandbookTemplate = path.resolve(`src/templates/HandbookTemplate.js`)
    const result = await graphql(`
        {
            allMdx(filter: { fields: { slug: { regex: "/(^/docs|^/blog)/" } } }, limit: 1000) {
                nodes {
                    id
                    slug
                }
            }
            handbook: allMdx(filter: { fields: { slug: { regex: "/^/handbook/" } } }) {
                nodes {
                    id
                    fields {
                        slug
                    }
                }
            }
            sidebars: file(absolutePath: { regex: "//sidebars/sidebars-new.json$/" }) {
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
                acc.push(...flattenMenu(item.children, [...breadcrumb, item.name]))
            }
            return acc
        }, [])
    }

    const handbookMenu = result.data.sidebars.childSidebarsJson.handbook
    const handbookMenuFlattened = flattenMenu(handbookMenu)

    result.data.allMdx.nodes.forEach((node) => {
        createPage({
            path: replacePath(node.slug),
            component: TemplateMdx,
            context: {
                id: node.id,
            },
        })
    })

    result.data.handbook.nodes.forEach((node) => {
        const { slug } = node.fields
        let next = null
        let breadcrumb = null
        handbookMenuFlattened.some((item, index) => {
            if (item.url === slug) {
                next = handbookMenuFlattened[index + 1]
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
                menu: handbookMenu,
                breadcrumb,
            },
        })
    })
}
