// import { replacePath } from './utils'
const replacePath = require('./utils')
const { createFilePath } = require(`gatsby-source-filesystem`)
const fetch = require('node-fetch')
const uniqBy = require('lodash.uniqby')

module.exports = exports.onCreateNode = async ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `MarkdownRemark` || node.internal.type === 'Mdx') {
        const slug = createFilePath({ node, getNode, basePath: `pages` })
        createNodeField({
            node,
            name: `slug`,
            value: replacePath(slug),
        })
        // Create GitHub contributor nodes for handbook
        if (slug.startsWith('/handbook/')) {
            const url = `https://api.github.com/repos/posthog/posthog.com/commits?path=/contents${slug.replace(
                /\/$/,
                ''
            )}.md`
            const contributors = await fetch(url, {
                headers: {
                    Authorization: `token ${process.env.GITHUB_API_KEY}`,
                },
            }).then((res) => res.json())

            createNodeField({
                node,
                name: `contributors`,
                value: uniqBy(contributors, (contributor) => contributor.author.login),
            })
        }
    }
}
