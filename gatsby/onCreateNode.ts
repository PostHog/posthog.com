import { replacePath } from './utils'
import { createFilePath, createRemoteFileNode } from 'gatsby-source-filesystem'
import fetch from 'node-fetch'
import GitUrlParse from 'git-url-parse'
import slugify from 'slugify'
import { JSDOM } from 'jsdom'
import { GatsbyNode } from 'gatsby'
import { PAGEVIEW_CACHE_KEY } from './onPreBootstrap'

require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
})

// const popularity = {}

// exports.onPreBuild = async () => {}

export const onCreateNode: GatsbyNode['onCreateNode'] = async ({
    node,
    getNode,
    actions,
    store,
    cache,
    createNodeId,
}) => {
    const { createNodeField, createNode } = actions

    if (node.internal.type === `MarkdownRemark` || node.internal.type === 'Mdx') {
        const parent = getNode(node.parent)
        if (
            parent?.internal.type === 'SqueakReply' ||
            parent?.internal.type === 'PostHogPull' ||
            parent?.internal.type === 'PostHogIssue'
        )
            return
        const featuredImage = node.frontmatter?.featuredImage
        if (featuredImage && featuredImage.includes('res.cloudinary.com')) {
            node.frontmatter.featuredImage = {
                publicURL: featuredImage,
                childImageSharp: {
                    cloudName: process.env.GATSBY_CLOUDINARY_CLOUD_NAME,
                    publicId: `posthog.com/contents${featuredImage.split('posthog.com/contents')[1]}`,
                    originalFormat: featuredImage.split('.')[featuredImage.split('.').length - 1],
                },
            }
        }
        const thumbnail = node.frontmatter?.thumbnail
        if (thumbnail && thumbnail.includes('res.cloudinary.com')) {
            node.frontmatter.thumbnail = {
                publicURL: thumbnail,
                childImageSharp: {
                    cloudName: process.env.GATSBY_CLOUDINARY_CLOUD_NAME,
                    publicId: `posthog.com/contents${thumbnail.split('posthog.com/contents')[1]}`,
                    originalFormat: thumbnail.split('.')[thumbnail.split('.').length - 1],
                },
            }
        }
        const logo = node.frontmatter?.logo
        if (logo && logo.includes('res.cloudinary.com')) {
            node.frontmatter.logo = {
                publicURL: logo,
                childImageSharp: {
                    cloudName: process.env.GATSBY_CLOUDINARY_CLOUD_NAME,
                    publicId: `posthog.com/contents${logo.split('posthog.com/contents')[1]}`,
                    originalFormat: logo.split('.')[logo.split('.').length - 1],
                },
            }
        }
        const logoDark = node.frontmatter?.logoDark
        if (logoDark && logoDark.includes('res.cloudinary.com')) {
            node.frontmatter.logoDark = {
                publicURL: logoDark,
                childImageSharp: {
                    cloudName: process.env.GATSBY_CLOUDINARY_CLOUD_NAME,
                    publicId: `posthog.com/contents${logoDark.split('posthog.com/contents')[1]}`,
                    originalFormat: logoDark.split('.')[logoDark.split('.').length - 1],
                },
            }
        }
        const icon = node.frontmatter?.icon
        if (icon && icon.includes('res.cloudinary.com')) {
            node.frontmatter.icon = {
                publicURL: icon,
                childImageSharp: {
                    cloudName: process.env.GATSBY_CLOUDINARY_CLOUD_NAME,
                    publicId: `posthog.com/contents${icon.split('posthog.com/contents')[1]}`,
                    originalFormat: icon.split('.')[icon.split('.').length - 1],
                },
            }
        }
        const images = node.frontmatter?.images
        if (images?.length > 0) {
            node.frontmatter.images = images.map((image) => {
                return {
                    publicURL: image,
                    childImageSharp: {
                        cloudName: process.env.GATSBY_CLOUDINARY_CLOUD_NAME,
                        publicId: `posthog.com/contents${image.split('posthog.com/contents')[1]}`,
                        originalFormat: image.split('.')[image.split('.').length - 1],
                    },
                }
            })
        }

        const slug = createFilePath({ node, getNode, basePath: `pages` })

        createNodeField({
            node,
            name: `slug`,
            value: replacePath(slug),
        })

        if (slug) {
            const pageViews = await cache.get(PAGEVIEW_CACHE_KEY)

            if (pageViews && slug.slice(0, -1) in pageViews) {
                createNodeField({
                    node,
                    name: `pageViews`,
                    value: pageViews[slug.slice(0, -1)],
                })
            } else {
                createNodeField({
                    node,
                    name: `pageViews`,
                    value: 0,
                })
            }
        }

        if (/^\/docs\/(apps|cdp)/.test(slug) && node?.frontmatter?.github && process.env.GITHUB_API_KEY) {
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

    if (node.internal.type === 'Plugin' && node.url.includes('github.com') && process.env.GITHUB_API_KEY) {
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

    if (node.internal.type === 'AshbyJobPosting') {
        const title = node.title.replace(' (Remote)', '')
        const slug = `/careers/${slugify(title, { lower: true })}`
        createNodeField({
            node,
            name: `title`,
            value: title,
        })
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
        if (node.info.descriptionHtml) {
            let html = node.info.descriptionHtml
            const tableOfContents = []
            if (html.includes('<h2>')) {
                const dom = JSDOM.fragment(
                    `<section><details open><summary><h2>${html
                        .split('<h2>')
                        .slice(1)
                        .join('</details><details open><summary><h2>')
                        .split('</h2>')
                        .join('</h2></summary>')}</summary></details></section>`
                )
                const details = dom.querySelectorAll('details')
                for (let i = 0; i < details.length; i++) {
                    const node = details[i]
                    const heading = node.querySelector('h2')
                    if (heading.textContent.toLowerCase() === 'benefits') {
                        node.remove()
                    } else {
                        const textContent = heading.textContent
                        const id = slugify(textContent, { lower: true })
                        tableOfContents.push({ value: textContent, url: id, depth: 0 })
                        heading.id = id
                    }
                }
                html = dom.firstChild.outerHTML
            }
            createNodeField({
                node,
                name: `tableOfContents`,
                value: tableOfContents,
            })
            createNodeField({
                node,
                name: `html`,
                value: html,
            })
        }
    }
}
