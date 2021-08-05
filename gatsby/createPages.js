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
        }
    `)

    if (result.errors) {
        return Promise.reject(mdPagesResult.errors)
    }

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
        createPage({
            path: replacePath(node.fields.slug),
            component: HandbookTemplate,
            context: {
                id: node.id,
            },
        })
    })
}
