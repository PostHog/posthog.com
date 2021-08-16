// import { replacePath } from './utils'
const replacePath = require('./utils')
const { createFilePath, createRemoteFileNode } = require(`gatsby-source-filesystem`)
const fetch = require('node-fetch')
const uniqBy = require('lodash.uniqby')

module.exports = exports.onCreateNode = async ({ node, getNode, actions, store, cache, createNodeId }) => {
    const { createNodeField, createNode } = actions
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
            const contributorsNode = await Promise.all(
                uniqBy(contributors, (contributor) => contributor.author.login).map(async (contributor) => {
                    const { author } = contributor
                    const imageUrl = author && author.avatar_url
                    let fileNode =
                        imageUrl &&
                        (await createRemoteFileNode({
                            url: imageUrl,
                            parentNodeId: node.id,
                            createNode,
                            createNodeId,
                            cache,
                            store,
                        }))
                    return {
                        avatar___NODE: fileNode && fileNode.id,
                        url: author && author.html_url,
                        username: author && author.login,
                    }
                })
            )
            createNodeField({
                node,
                name: `contributors`,
                value: contributorsNode,
            })
        }
    }
}
