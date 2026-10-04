// OG images and the Strapi sync. GitHub Actions run these after a production deploy, through
// scripts/run-post-build-tasks.ts, with the data from /post-build-data.json (src/lib/seo/postBuildData.ts).
import chromium from 'chrome-aws-lambda'
import path from 'path'
import fs from 'fs'
import nodeFetch from 'node-fetch'

import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import pLimit from 'p-limit'
import qs from 'qs'
import dayjs from 'dayjs'
import slugify from 'slugify'
import { docsMenu, handbookSidebar } from '../../src/navs/index.js'
import { flattenMenu, type FlatMenuItem } from '../../src/data-layer/utils'
import type { PostBuildData } from '../../src/lib/seo/postBuildData'

// The repository root: the workflows run these tasks from there.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

type OgTemplate = (props: Record<string, unknown>) => string

// The OG templates are CommonJS (`.cjs`) Node scripts.
const require = createRequire(import.meta.url)
const loadTemplate = (name: string): OgTemplate => require(path.join(root, 'src', 'templates', 'OG', `${name}.cjs`))

const blogTemplate = loadTemplate('blog')
const docsHandbookTemplate = loadTemplate('docs-handbook')
const customerTemplate = loadTemplate('customer')
const jobTemplate = loadTemplate('job')

const limit = pLimit(10)
const ogLimit = pLimit(20)
const ogImagesDir = path.join(root, 'og-images')

export const createCareersOG = async () => {
    if (!fs.existsSync(ogImagesDir)) fs.mkdirSync(ogImagesDir, { recursive: true })

    const browserFetcher = chromium.puppeteer.createBrowserFetcher()
    const revisionInfo = await browserFetcher.download('982053')

    const browser = await chromium.puppeteer.launch({
        args: await chromium.args,
        executablePath: revisionInfo.executablePath || process.env.PUPPETEER_EXECUTABLE_PATH,
        headless: true,
        defaultViewport: {
            width: 1200,
            height: 630,
        },
    })
    const page = await browser.newPage()
    await page.setViewport({
        width: 1200,
        height: 630,
    })

    const url = 'https://posthog.com/careers-og/'
    console.log(`Creating OG image for: ${url}`)

    await page.goto(url, {
        waitUntil: ['domcontentloaded', 'networkidle0'],
    })

    await page.waitForTimeout(1000)

    await page.addStyleTag({
        content: `
            body {
                width: 1200px;
                height: 630px;
            }
            .ToastRoot {
                display: none;
            }
            `,
    })

    await page.screenshot({
        type: 'jpeg',
        path: `${ogImagesDir}/careers-og.jpeg`,
        quality: 100,
    })

    await browser.close()
}

export const createOGImages = async (data: PostBuildData) => {
    if (!fs.existsSync(ogImagesDir)) fs.mkdirSync(ogImagesDir, { recursive: true })
    const fontDir = path.join(root, 'fonts')
    if (!fs.existsSync(fontDir)) fs.mkdirSync(fontDir)
    const res = await nodeFetch(process.env.CLOUDFRONT_FONT_URL, {
        headers: {
            Origin: 'https://posthog.com',
        },
    })
    await new Promise((resolve, reject) => {
        const fileStream = fs.createWriteStream(path.join(fontDir, 'matter.woff'))
        res.body.pipe(fileStream)
        res.body.on('error', (err) => {
            reject(err)
        })
        fileStream.on('finish', function () {
            resolve()
        })
    })

    const font = fs.readFileSync(path.join(fontDir, 'matter.woff'), {
        encoding: 'base64',
    })

    const browserFetcher = chromium.puppeteer.createBrowserFetcher()
    const revisionInfo = await browserFetcher.download('982053')

    const browser = await chromium.puppeteer.launch({
        args: await chromium.args,
        executablePath: revisionInfo.executablePath || process.env.PUPPETEER_EXECUTABLE_PATH,
        headless: true,
    })
    async function createOG({ html, slug }: { html: string; slug: string }) {
        const page = await browser.newPage()
        try {
            await page.setViewport({
                width: 1200,
                height: 630,
            })
            await page.setContent(html, {
                waitUntil: ['domcontentloaded', 'networkidle0'],
            })

            await page.evaluateHandle('document.fonts.ready')

            const imagePath = `${ogImagesDir}/${slug.replace(/\//g, '')}.jpeg`
            await page.screenshot({
                type: 'jpeg',
                path: imagePath,
                quality: 100,
            })
            console.log(`Created OG image: ${path.basename(imagePath)}`)
        } finally {
            await page.close()
        }
    }

    const jobs: Promise<void>[] = []

    // Blog post OG
    for (const post of data.blog.nodes) {
        const { title, authorData, featuredImage } = post.frontmatter
        const image = featuredImage?.publicURL
        const author =
            authorData &&
            authorData.map((author) => {
                const image =
                    author.profile?.avatar?.url ||
                    `https://res.cloudinary.com/dmukukwp6/image/upload/contributor_posthog_e8c595ea3d.png`
                return {
                    ...author,
                    image,
                }
            })[0]
        jobs.push(
            ogLimit(() =>
                createOG({
                    html: blogTemplate({ title, authorData: author, image, font }),
                    slug: post.fields.slug,
                })
            )
        )
    }

    const docsHandbookMenus = flattenMenu([...handbookSidebar, ...docsMenu.children])

    // Docs and Handbook OG. Tutorial nodes carry no title or excerpt, so they never made an image here.
    for (const post of data.docsHandbook.nodes) {
        const { title } = post.frontmatter
        const { timeToRead, excerpt, fields, parent } = post
        const lastUpdated = parent && parent.fields && parent.fields.lastUpdated
        if (!title || !timeToRead || !excerpt || !lastUpdated || !fields?.contributors) continue
        const contributors = fields?.contributors.map((contributor) => {
            const { avatar, username } = contributor
            return {
                username,
                avatar,
            }
        })
        let breadcrumbs: FlatMenuItem['breadcrumb'] | null = null
        docsHandbookMenus.some((item) => {
            if (item.url === fields.slug) {
                breadcrumbs = item.breadcrumb
                return true
            }
        })
        jobs.push(
            ogLimit(() =>
                createOG({
                    html: docsHandbookTemplate({
                        font,
                        title,
                        timeToRead,
                        excerpt,
                        lastUpdated,
                        contributors,
                        breadcrumbs: [
                            {
                                name: fields.slug.startsWith('/docs')
                                    ? 'Docs'
                                    : fields.slug.startsWith('/tutorials')
                                      ? 'Tutorials'
                                      : 'Handbook',
                            },
                            ...(breadcrumbs || []),
                        ],
                    }),
                    slug: fields.slug,
                })
            )
        )
    }

    // Customers OG
    for (const post of data.customers.nodes) {
        const { frontmatter } = post
        const featuredImage = frontmatter.featuredImage?.publicURL
        const logo = frontmatter.logo?.publicURL
        jobs.push(
            ogLimit(() =>
                createOG({
                    html: customerTemplate({
                        title: frontmatter.title,
                        featuredImage,
                        logo,
                        font,
                    }),
                    slug: post.fields.slug,
                })
            )
        )
    }

    for (const job of data.careers.nodes) {
        const {
            title,
            parent,
            fields: { slug },
        } = job
        const timezone = parent?.customFields?.find(({ title }) => title === 'Timezone(s)')?.value
        jobs.push(
            ogLimit(() =>
                createOG({
                    html: jobTemplate({ role: title, font, timezone }),
                    slug,
                })
            )
        )
    }

    await Promise.all(jobs)

    // Tutorials OG
    // for (const post of data.tutorials.nodes) {
    //     const { featuredImage } = post.frontmatter
    //     const image = fs.readFileSync(featuredImage.absolutePath, {
    //         encoding: 'base64',
    //     })
    //     await createOG({
    //         html: tutorialTemplate({ image }),
    //         slug: post.fields.slug,
    //     })
    // }

    await browser.close()
}

export const createOrUpdateStrapiPosts = async (
    posts: PostBuildData['allMDXPosts']['nodes'],
    roadmaps: PostBuildData['allRoadmap']['nodes']
) => {
    const apiHost = process.env.STRAPI_API_HOST

    let allExistingStrapiPosts = []
    let allStrapiPostCategories = []

    const getAllStrapiPosts = async (page = 1) => {
        const query = qs.stringify({
            pagination: {
                page,
                pageSize: 100,
            },
            fields: ['id', 'path'],
        })

        const posts = await fetch(`${apiHost}/api/posts?${query}`).then((res) => res.json())
        if (posts.data) {
            allExistingStrapiPosts = [...allExistingStrapiPosts, ...posts.data]
        }
        if (posts?.meta?.pagination.page < posts?.meta?.pagination.pageCount) {
            await getAllStrapiPosts(page + 1)
        }
    }

    const getAllStrapiPostCategories = async (page = 1) => {
        const query = qs.stringify({
            pagination: {
                page,
                pageSize: 100,
            },
            populate: ['post_tags'],
        })

        const categories = await fetch(`${apiHost}/api/post-categories?${query}`).then((res) => res.json())
        if (categories.data) {
            allStrapiPostCategories = [...allStrapiPostCategories, ...categories.data]
        }
        if (categories?.meta?.pagination.page < categories?.meta?.pagination.pageCount) {
            await getAllStrapiPostCategories(page + 1)
        }
    }

    const createOrUpdateStrapiPost = async (data, id) => {
        const body = JSON.stringify({ data })
        return fetch(`${apiHost}/api/posts${id ? `/${id}` : ''}`, {
            method: id ? 'PUT' : 'POST',
            body,
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
                'content-type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then(({ error }) => {
                if (error) {
                    console.error(error, data?.path)
                }
            })
            .catch((err) => console.error(err))
    }

    const createTag = async (tag, category) => {
        const label = tag.charAt(0).toUpperCase() + tag.slice(1)
        console.log(`creating tag: ${label}`)
        const body = JSON.stringify({
            data: {
                label,
                post_category: {
                    connect: [category?.id],
                },
            },
        })
        const { data } = await fetch(`${apiHost}/api/post-tags`, {
            method: 'POST',
            body,
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
                'content-type': 'application/json',
            },
        })
            .then((res) => res.json())
            .catch((err) => console.error(err))
        category?.attributes?.post_tags?.data?.push(data)

        return data
    }

    const createCategory = async (folder) => {
        const label = (folder.charAt(0).toUpperCase() + folder.slice(1)).replaceAll('-', ' ')
        console.log(`creating category: ${label}`)
        const body = JSON.stringify({
            data: {
                label,
                folder,
            },
        })
        const { data } = await fetch(`${apiHost}/api/post-categories?populate=*`, {
            method: 'POST',
            body,
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
                'content-type': 'application/json',
            },
        })
            .then((res) => res.json())
            .catch((err) => console.error(err))
        allStrapiPostCategories.push(data)
        return allStrapiPostCategories.find((category) => category === data)
    }

    await Promise.all([getAllStrapiPosts(), getAllStrapiPostCategories()])
    const postsToCreateOrUpdate: any = []
    for (const {
        frontmatter: {
            title,
            date,
            featuredImage,
            authorData,
            category: postTag,
            tags: postTags,
            crosspost,
            hideFromIndex,
        },
        fields: { slug },
        parent: { relativePath: path },
        excerpt,
    } of posts) {
        // Content files moved from .md to .mdx. A post synced before that has the .md path, and
        // updating it records the new path.
        const legacyPath = path.replace(/\.mdx$/, '.md')
        const existingPost =
            allExistingStrapiPosts.find((post) => post?.attributes?.path === path) ||
            allExistingStrapiPosts.find((post) => post?.attributes?.path === legacyPath)
        const category =
            allStrapiPostCategories.find((category) => category?.attributes?.folder === path.split('/')[0]) ||
            (await createCategory(path.split('/')[0]))

        const tags = []
        for (const tagLabel of postTags || []) {
            let tag = category?.attributes?.post_tags?.data?.find(
                (tag) => tag?.attributes?.label?.toLowerCase() === tagLabel?.toLowerCase()
            )
            if (!tag) {
                tag = await createTag(tagLabel, category)
            }
            tags.push(tag)
        }
        const authorIDs = authorData?.map(({ profile_id }) => profile_id)?.filter((id) => id) || []
        const data = {
            slug,
            path,
            title,
            date,
            featuredImage: {
                url: featuredImage?.publicURL,
            },
            excerpt,
            authors: {
                connect: authorIDs,
            },
            hideFromIndex,
            ...(category
                ? {
                      post_category: {
                          connect: [category.id],
                      },
                  }
                : null),
            ...(tags?.length > 0
                ? {
                      post_tags: {
                          connect: tags.map((tag) => tag.id),
                      },
                  }
                : null),
            ...(crosspost && crosspost.length > 0
                ? {
                      crosspost_categories: {
                          connect: crosspost.map(
                              (crosspostCategory) =>
                                  allStrapiPostCategories.find(
                                      (category) => category?.attributes?.label === crosspostCategory
                                  )?.id
                          ),
                      },
                  }
                : null),
        }
        postsToCreateOrUpdate.push({ data, existingPostId: existingPost?.id })
    }

    await Promise.all(
        postsToCreateOrUpdate.map(({ data, existingPostId }) =>
            limit(() => createOrUpdateStrapiPost(data, existingPostId))
        )
    )

    await Promise.all(
        roadmaps.map(({ title, date: roadmapDate, media, description, cta }) => {
            const slug = slugify(title, { lower: true })
            const date = dayjs(roadmapDate)
            const year = date.format('YYYY')
            const path = `changelog/${year}/${slug}.mdx`
            const existingPost = allExistingStrapiPosts.find((post) => post?.attributes?.path === path)
            const category = allStrapiPostCategories.find((category) => category?.attributes?.folder === 'changelog')
            const data = {
                slug: `/changelog/${year}/${slug}`,
                path,
                title,
                date: date.toISOString(),
                featuredImage: {
                    url: media?.data?.attributes?.url,
                },
                body: description,
                CTA: {
                    label: cta?.label,
                    url: cta?.url,
                },
                ...(category
                    ? {
                          post_category: {
                              connect: [category.id],
                          },
                      }
                    : null),
            }

            return limit(() => createOrUpdateStrapiPost(data, existingPost?.id))
        })
    )
}
