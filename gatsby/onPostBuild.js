const chromium = require('chrome-aws-lambda')
const path = require('path')
const fs = require('fs')
const blogTemplate = require('../src/templates/OG/blog.js')
const docsHandbookTemplate = require('../src/templates/OG/docs-handbook.js')
const customerTemplate = require('../src/templates/OG/customer.js')
const { flattenMenu } = require('./utils')
const fetch = require('node-fetch')

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
            customers: allMdx(filter: { fields: { slug: { regex: "/^/customers/" } } }) {
                nodes {
                    fields {
                        slug
                    }
                    frontmatter {
                        featuredImage {
                            absolutePath
                        }
                        logo {
                            absolutePath
                        }
                        title
                    }
                }
            }
        }
    `)

    const dir = path.resolve(__dirname, '../public/og-images')
    if (!fs.existsSync(dir)) fs.mkdirSync(dir)
    const fontDir = path.resolve(__dirname, '../fonts')
    if (!fs.existsSync(fontDir)) fs.mkdirSync(fontDir)
    const res = await fetch('https://d27nj4tzr3d5tm.cloudfront.net/Website-Assets/Fonts/Matter/MatterSQVF.woff', {
        headers: {
            Origin: 'https://posthog.com',
        },
    })
    await new Promise((resolve, reject) => {
        const fileStream = fs.createWriteStream(path.resolve(__dirname, '../fonts/matter.woff'))
        res.body.pipe(fileStream)
        res.body.on('error', (err) => {
            reject(err)
        })
        fileStream.on('finish', function () {
            resolve()
        })
    })

    const font = fs.readFileSync(path.resolve(__dirname, '../fonts/matter.woff'), {
        encoding: 'base64',
    })

    const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath,
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
            html: blogTemplate({ title, authorData: authorData && authorData[0], image, font }),
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
                font,
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
                font,
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

    // Customers OG
    for (const post of data.customers.nodes) {
        const { frontmatter } = post
        const logoType = frontmatter.logo.absolutePath.includes('.svg') ? 'svg+xml' : 'image/jpeg'
        const featuredImage = fs.readFileSync(path.resolve(__dirname, frontmatter.featuredImage.absolutePath), {
            encoding: 'base64',
        })
        const logo = fs.readFileSync(path.resolve(__dirname, frontmatter.logo.absolutePath), {
            encoding: 'base64',
        })
        await createOG({
            html: customerTemplate({ title: frontmatter.title, featuredImage, logo, logoType, font }),
            slug: post.fields.slug,
        })
    }

    await browser.close()
}
