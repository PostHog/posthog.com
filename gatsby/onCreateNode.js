// import { replacePath } from './utils'
const replacePath = require('./utils')
const { createFilePath } = require(`gatsby-source-filesystem`)

module.exports = exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `MarkdownRemark` || node.internal.type === 'Mdx') {
        const slug = createFilePath({ node, getNode, basePath: `pages` })
        createNodeField({
            node,
            name: `slug`,
            value: replacePath(slug),
        })
    }
}
