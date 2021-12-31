const chromium = require('chrome-aws-lambda')
const path = require('path')
const fs = require('fs')
const blogTemplate = require('../src/templates/OG/blog.js')

async function createOG({ html, slug }) {
    const dir = path.resolve(__dirname, '../public/og-images')
    if (!fs.existsSync(dir)) fs.mkdirSync(dir)
    const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        executablePath: process.env.NETLIFY_DEV ? undefined : await chromium.executablePath,
        headless: chromium.headless,
    })

    const page = await browser.newPage()

    await page.setContent(html, {
        waitUntil: ['domcontentloaded'],
    })

    await page.evaluateHandle('document.fonts.ready')

    await page.setViewport({
        width: 1200,
        height: 630,
    })

    await page.screenshot({
        type: 'jpeg',
        path: `${dir}/${slug.replace(/\//g, '')}.jpeg`,
        quality: 100,
    })

    await browser.close()
}

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
        }
    `)

    await Promise.all(
        data.blog.nodes.map((post) => {
            const { title, authorData, featuredImage } = post.frontmatter
            const image = fs.readFileSync(path.resolve(__dirname, featuredImage.absolutePath), {
                encoding: 'base64',
            })
            return createOG({
                html: blogTemplate({ title, authorData: authorData && authorData[0], image }),
                slug: post.fields.slug,
            })
        })
    )
}
