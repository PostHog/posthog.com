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

    const handbookMenu = result.data.sidebars.childSidebarsJson.handbook

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
        const findNext = (menu, previousNext) => {
            for (let [index, item] of menu.entries()) {
                const { url } = item
                const nextIndex = menu[index + 1]
                const nextItem = nextIndex?.url ? nextIndex : nextIndex?.children[0]
                if (url === slug) {
                    next = nextItem || previousNext
                    break
                }
                if (item.children) {
                    findNext(item.children, nextItem)
                }
            }
        }
        findNext(handbookMenu)

        createPage({
            path: replacePath(node.fields.slug),
            component: HandbookTemplate,
            context: {
                id: node.id,
                next,
                menu: handbookMenu,
            },
        })
    })
}
