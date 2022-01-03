const chromium = require('chrome-aws-lambda')
const path = require('path')
const fs = require('fs')
const blogTemplate = require('../src/templates/OG/blog.js')
const docsHandbookTemplate = require('../src/templates/OG/docs-handbook.js')
const { flattenMenu } = require('./utils')

module.exports = exports.onPostBuild = async ({ graphql }) => {
    const { data } = await graphql(`
        query {
            blog: allMdx(
                filter: { fields: { slug: { regex: "/^/blog/" } }, frontmatter: { featuredImageType: { eq: "full" } } }
            ) {
                nodes {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        featuredImage {
                            absolutePath
                        }
                        authorData {
                            name
                            role
                            image
                        }
                    }
                }
            }
            handbook: allMarkdownRemark(filter: { fields: { slug: { regex: "/^/handbook/" } } }) {
                nodes {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                    }
                    parent {
                        ... on File {
                            fields {
                                lastUpdated: gitLogLatestDate(formatString: "MMM D, YYYY")
                            }
                        }
                    }
                    timeToRead
                    html
                    contributors {
                        username
                        avatar {
                            absolutePath
                        }
                    }
                }
            }
            docs: allMarkdownRemark(filter: { fields: { slug: { regex: "/^/docs/" } } }) {
                nodes {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                    }
                    parent {
                        ... on File {
                            fields {
                                lastUpdated: gitLogLatestDate(formatString: "MMM D, YYYY")
                            }
                        }
                    }
                    timeToRead
                    html
                    contributors {
                        username
                        avatar {
                            absolutePath
                        }
                    }
                }
            }
            sidebars: file(absolutePath: { regex: "//sidebars/sidebars.json$/" }) {
                childSidebarsJson {
                    handbook {
                        children {
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
                        name
                        url
                    }
                    docs {
                        children {
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
                        name
                        url
                    }
                    product {
                        name
                        url
                    }
                }
            }
        }
    `)

    const dir = path.resolve(__dirname, '../public/og-images')
    if (!fs.existsSync(dir)) fs.mkdirSync(dir)
    const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        executablePath: process.env.NETLIFY_DEV ? undefined : await chromium.executablePath,
        headless: chromium.headless,
    })
    const page = await browser.newPage()
    await page.setViewport({
        width: 1200,
        height: 630,
    })

    async function createOG({ html, slug }) {
        await page.setContent(html, {
            waitUntil: ['domcontentloaded'],
        })

        await page.evaluateHandle('document.fonts.ready')

        await page.screenshot({
            type: 'jpeg',
            path: `${dir}/${slug.replace(/\//g, '')}.jpeg`,
            quality: 100,
        })
    }

    // Blog post OG
    for (const post of data.blog.nodes) {
        const { title, authorData, featuredImage } = post.frontmatter
        const image = fs.readFileSync(path.resolve(__dirname, featuredImage.absolutePath), {
            encoding: 'base64',
        })
        await createOG({
            html: blogTemplate({ title, authorData: authorData && authorData[0], image }),
            slug: post.fields.slug,
        })
    }

    const handbookMenu = data.sidebars.childSidebarsJson.handbook
    const handbookMenuFlattened = flattenMenu(handbookMenu)
    const docsMenu = data.sidebars.childSidebarsJson.docs
    const docsMenuFlattened = flattenMenu(docsMenu)

    // Handbook OG
    for (const post of data.handbook.nodes) {
        const { title } = post.frontmatter
        const {
            timeToRead,
            html,
            fields,
            parent: {
                fields: { lastUpdated },
            },
        } = post
        const contributors = post.contributors.map((contributor) => {
            const { avatar, username } = contributor
            return {
                username,
                avatar:
                    avatar.absolutePath &&
                    fs.readFileSync(path.resolve(__dirname, avatar.absolutePath), {
                        encoding: 'base64',
                    }),
            }
        })
        let breadcrumbs = null
        handbookMenuFlattened.some((item) => {
            if (item.url === fields.slug) {
                breadcrumbs = item.breadcrumb
                return true
            }
        })
        await createOG({
            html: docsHandbookTemplate({
                title,
                timeToRead,
                html,
                lastUpdated,
                contributors,
                breadcrumbs: [{ name: 'Handbook' }, ...(breadcrumbs || [])],
            }),
            slug: fields.slug,
        })
    }

    // Docs OG
    for (const post of data.docs.nodes) {
        const { title } = post.frontmatter
        const {
            timeToRead,
            html,
            fields,
            parent: {
                fields: { lastUpdated },
            },
        } = post
        const contributors = post.contributors.map((contributor) => {
            const { avatar, username } = contributor
            return {
                username,
                avatar:
                    avatar.absolutePath &&
                    fs.readFileSync(path.resolve(__dirname, avatar.absolutePath), {
                        encoding: 'base64',
                    }),
            }
        })
        let breadcrumbs = null
        docsMenuFlattened.some((item) => {
            if (item.url === fields.slug) {
                breadcrumbs = item.breadcrumb
                return true
            }
        })
        await createOG({
            html: docsHandbookTemplate({
                title,
                timeToRead,
                html,
                lastUpdated,
                contributors,
                breadcrumbs: [{ name: 'Docs' }, ...(breadcrumbs || [])],
            }),
            slug: fields.slug,
        })
    }

    await browser.close()
}
