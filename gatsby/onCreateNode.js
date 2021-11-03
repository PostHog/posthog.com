// import { replacePath } from './utils'
const replacePath = require('./utils')
const { createFilePath, createRemoteFileNode } = require(`gatsby-source-filesystem`)
const fetch = require('node-fetch')
const uniqBy = require('lodash.uniqby')
require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
})
const GitUrlParse = require('git-url-parse')

module.exports = exports.onCreateNode = async ({ node, getNode, actions, store, cache, createNodeId }) => {
    const { createNodeField, createNode } = actions
    if (node.internal.type === `MarkdownRemark` || node.internal.type === 'Mdx') {
        const parent = getNode(node.parent)
        const slug = createFilePath({ node, getNode, basePath: `pages` })
        createNodeField({
            node,
            name: `slug`,
            value: replacePath(slug),
        })
        // Create GitHub contributor nodes for handbook & docs
        if (/^\/handbook|^\/docs/.test(slug) && process.env.GITHUB_API_KEY) {
            const url = `https://api.github.com/repos/posthog/posthog.com/commits?path=/contents/${parent.relativePath}`
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
            node.contributors = contributorsNode
        }
    }
    if (node.internal.type === 'Plugin' && node.url.includes('github.com')) {
        const { name, owner } = GitUrlParse(node.url)
        const { download_url } = await fetch(`https://api.github.com/repos/${owner}/${name}/readme`, {
            headers: {
                Authorization: `token ${process.env.GITHUB_API_KEY}`,
            },
        }).then((res) => res.json())

        let fileNode =
            download_url &&
            (await createRemoteFileNode({
                url: download_url,
                parentNodeId: node.id,
                createNode,
                createNodeId,
                cache,
                store,
            }))
        if (fileNode) {
            node.markdown___NODE = fileNode.id
        }
    }
}
