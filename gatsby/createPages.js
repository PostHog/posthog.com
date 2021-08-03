const replacePath = require('./utils')
const path = require('path')

module.exports = exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions
    const TemplateMdx = path.resolve(`src/templates/TemplateMdx.tsx`)
    const result = await graphql(`
        {
            allMdx(limit: 1000) {
                nodes {
                    id
                    slug
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
}
