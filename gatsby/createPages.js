const replacePath = require('./utils')
const path = require('path')

module.exports = exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions

    const postTemplate = path.resolve(`src/templates/postTemplate.js`)
    const TemplateMdx = path.resolve(`src/templates/TemplateMdx.tsx`)

    const result = await graphql(`
        {
            allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
            allMdx(limit: 1000) {
                edges {
                    node {
                        id
                        slug
                    }
                }
            }
        }
    `)

    if (result.errors) {
        return Promise.reject(mdPagesResult.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: replacePath(node.fields.slug),
            component: postTemplate,
            context: {},
        })
    })

    result.data.allMdx.edges.forEach(({ node }) => {
        createPage({
            path: replacePath(node.slug),
            component: TemplateMdx,
            context: {
                id: node.id,
            },
        })
    })
}
