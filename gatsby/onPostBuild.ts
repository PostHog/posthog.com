import chromium from 'chrome-aws-lambda'
import path from 'path'
import fs from 'fs'
import blogTemplate from '../src/templates/OG/blog.js'
import docsHandbookTemplate from '../src/templates/OG/docs-handbook.js'
import customerTemplate from '../src/templates/OG/customer.js'
import careersTemplate from '../src/templates/OG/careers.js'
import tutorialTemplate from '../src/templates/OG/tutorial.js'
import jobTemplate from '../src/templates/OG/job.js'
import { flattenMenu } from './utils'
import fetch from 'node-fetch'
import { GatsbyNode } from 'gatsby'
import sidebars from '../src/sidebars/index'

export const onPostBuild: GatsbyNode['onPostBuild'] = async ({ graphql }) => {
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
                            image {
                                absolutePath
                            }
                        }
                    }
                }
            }
            docsHandbook: allMdx(filter: { fields: { slug: { regex: "/^/handbook|^/docs/" } } }) {
                nodes {
                    fields {
                        slug
                        contributors {
                            username
                            avatar {
                                absolutePath
                            }
                        }
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
                    excerpt(pruneLength: 500)
                }
            }
            tutorials: allMdx(filter: { fields: { slug: { regex: "/^/tutorials/" } } }) {
                nodes {
                    fields {
                        slug
                    }
                    frontmatter {
                        featuredImage {
                            absolutePath
                        }
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
            careers: allAshbyJobPosting {
                nodes {
                    title
                    fields {
                        slug
                    }
                    parent {
                        ... on AshbyJob {
                            id
                            customFields {
                                title
                                value
                            }
                        }
                    }
                }
            }
        }
    `)

    const dir = path.resolve(__dirname, '../public/og-images')
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
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

    const browserFetcher = chromium.puppeteer.createBrowserFetcher()
    const revisionInfo = await browserFetcher.download('982053')

    const browser = await chromium.puppeteer.launch({
        args: await chromium.args,
        executablePath: revisionInfo.executablePath || process.env.PUPPETEER_EXECUTABLE_PATH,
        headless: true,
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
        const image = fs.readFileSync(featuredImage.absolutePath, {
            encoding: 'base64',
        })
        const author =
            authorData &&
            authorData.map((author) => {
                const image = fs.readFileSync(author.image.absolutePath, {
                    encoding: 'base64',
                })
                return {
                    ...author,
                    image,
                }
            })[0]
        await createOG({
            html: blogTemplate({ title, authorData: author, image, font }),
            slug: post.fields.slug,
        })
    }

    const handbookMenu = sidebars.handbook
    const docsMenu = sidebars.docs
    const docsHandbookMenus = flattenMenu([...handbookMenu, ...docsMenu])

    // Docs and Handbook OG
    for (const post of data.docsHandbook.nodes) {
        const { title } = post.frontmatter
        const { timeToRead, excerpt, fields, parent } = post
        const lastUpdated = parent && parent.fields && parent.fields.lastUpdated
        if (!title || !timeToRead || !excerpt || !lastUpdated || !fields?.contributors) continue
        const contributors = fields?.contributors.map((contributor) => {
            const { avatar, username } = contributor
            return {
                username,
                avatar:
                    avatar?.absolutePath &&
                    fs.readFileSync(avatar.absolutePath, {
                        encoding: 'base64',
                    }),
            }
        })
        let breadcrumbs = null
        docsHandbookMenus.some((item) => {
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
                excerpt,
                lastUpdated,
                contributors,
                breadcrumbs: [{ name: fields.slug.startsWith('/docs') ? 'Docs' : 'Handbook' }, ...(breadcrumbs || [])],
            }),
            slug: fields.slug,
        })
    }

    // Customers OG
    for (const post of data.customers.nodes) {
        const { frontmatter } = post
        const logoType = frontmatter.logo.absolutePath.includes('.svg') ? 'svg+xml' : 'image/jpeg'
        const featuredImageType = frontmatter.featuredImage.absolutePath.includes('.svg') ? 'svg+xml' : 'image/jpeg'
        const featuredImage = fs.readFileSync(frontmatter.featuredImage.absolutePath, {
            encoding: 'base64',
        })
        const logo = fs.readFileSync(frontmatter.logo.absolutePath, {
            encoding: 'base64',
        })
        await createOG({
            html: customerTemplate({
                title: frontmatter.title,
                featuredImage,
                featuredImageType,
                logo,
                logoType,
                font,
            }),
            slug: post.fields.slug,
        })
    }

    // Careers OG
    await createOG({
        html: careersTemplate({ jobs: (data.careers && data.careers.nodes) || [], font }),
        slug: 'careers',
    })

    for (const job of data.careers.nodes) {
        const {
            title,
            parent,
            fields: { slug },
        } = job
        const timezone = parent?.customFields?.find(({ title }) => title === 'Timezone(s)')?.value
        await createOG({
            html: jobTemplate({ role: title, font, timezone }),
            slug,
        })
    }

    // Tutorials OG
    for (const post of data.tutorials.nodes) {
        const { featuredImage } = post.frontmatter
        const image = fs.readFileSync(featuredImage.absolutePath, {
            encoding: 'base64',
        })
        await createOG({
            html: tutorialTemplate({ image }),
            slug: post.fields.slug,
        })
    }

    await browser.close()
}
