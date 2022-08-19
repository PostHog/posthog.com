// import { replacePath } from './utils'
const { replacePath } = require('./utils')
const { createFilePath, createRemoteFileNode } = require(`gatsby-source-filesystem`)
const fetch = require('node-fetch')
const uniqBy = require('lodash.uniqby')
require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
})
const GitUrlParse = require('git-url-parse')
const slugify = require('slugify')

module.exports = exports.onCreateNode = async ({
    node,
    getNode,
    actions,
    store,
    cache,
    createNodeId,
    createContentDigest,
}) => {
    const { createNodeField, createNode, createParentChildLink } = actions

    if (node.internal.type === `MarkdownRemark` || node.internal.type === 'Mdx') {
        const parent = getNode(node.parent)
        if (parent.internal.type === 'Reply') return
        const slug = createFilePath({ node, getNode, basePath: `pages` })

        createNodeField({
            node,
            name: `slug`,
            value: replacePath(slug),
        })

        // Create GitHub contributor nodes for handbook & docs
        if (/^\/handbook|^\/docs/.test(slug) && process.env.GITHUB_API_KEY) {
            const url = `https://api.github.com/repos/posthog/posthog.com/commits?path=/contents/${parent.relativePath}`
            let contributors = await fetch(url, {
                headers: {
                    Authorization: `token ${process.env.GITHUB_API_KEY}`,
                },
            }).then((res) => res.json())

            contributors = contributors.filter(
                (contributor) => contributor && contributor.author && contributor.author.login
            )

            const contributorsNode = await Promise.all(
                uniqBy(contributors, (contributor) => contributor.author.login).map(async (contributor) => {
                    const { author } = contributor
                    const imageUrl = author && author.avatar_url
                    const fileNode =
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

        if (/^\/docs\/apps/.test(slug) && node?.frontmatter?.github && process.env.GITHUB_API_KEY) {
            const { name, owner } = GitUrlParse(node.frontmatter.github)

            try {
                if (name && owner) {
                    const repo = await fetch(`https://api.github.com/repos/${owner}/${name}`, {
                        headers: {
                            Authorization: `token ${process.env.GITHUB_API_KEY}`,
                        },
                    })

                    if (repo.status !== 200) {
                        throw `Got status code ${repo.status}`
                    }

                    const { default_branch } = await repo.json()

                    const res = await fetch(
                        `https://raw.githubusercontent.com/${owner}/${name}/${default_branch}/plugin.json`,
                        {
                            headers: {
                                Authorization: `token ${process.env.GITHUB_API_KEY}`,
                            },
                        }
                    )

                    if (res.status !== 200) {
                        throw `Got status code ${res.status}`
                    }

                    const body = await res.text()
                    const { config } = JSON.parse(body)

                    if (config) {
                        createNodeField({
                            node,
                            name: `appConfig`,
                            value: config,
                        })
                    }
                }
            } catch (error) {
                console.error(`Error fetching plugin.json from ${owner}/${name}: ${error}`)
            }
        }
    }

    if (node.internal.type === 'Plugin' && node.url.includes('github.com')) {
        const { name, owner } = GitUrlParse(node.url)
        const { download_url } = await fetch(`https://api.github.com/repos/${owner}/${name}/readme`, {
            headers: {
                Authorization: `token ${process.env.GITHUB_API_KEY}`,
            },
        }).then((res) => res.json())

        const markdown =
            download_url &&
            (await createRemoteFileNode({
                url: download_url,
                parentNodeId: node.id,
                createNode,
                createNodeId,
                cache,
                store,
            }))

        if (markdown) {
            node.markdown___NODE = markdown.id
            node.slug = `/integrations/${slugify(node.name, { lower: true })}`
        }

        const { default_branch } = await fetch(`https://api.github.com/repos/${owner}/${name}`, {
            headers: {
                Authorization: `token ${process.env.GITHUB_API_KEY}`,
            },
        }).then((res) => res.json())

        const imageURL = `https://raw.githubusercontent.com/${owner}/${name}/${default_branch}/logo.png`
        let image
        try {
            image = await createRemoteFileNode({
                url: imageURL,
                parentNodeId: node.id,
                createNode,
                createNodeId,
                cache,
                store,
            })
        } catch (e) {
            // Ignore
        }

        if (image) {
            node.logo___NODE = image && image.id
        }
    }
}
