import chromium from 'chrome-aws-lambda'
import path from 'path'
import fs from 'fs'
import fetch from 'node-fetch'
import { GatsbyNode } from 'gatsby'
import pLimit from 'p-limit'
import qs from 'qs'
import dayjs from 'dayjs'
import slugify from 'slugify'
import { docsMenu, handbookSidebar } from '../src/navs/index.js'
import {
    generateRawMarkdownPages,
    generateApiSpecMarkdown,
    generateLlmsTxt,
    generateSdkReferencesMarkdown,
} from './rawMarkdownUtils'
import { MARKDOWN_CONTENT_PATHS } from '../src/constants'
import { SdkReferenceData } from '../src/templates/sdk/SdkReference.js'
import blogTemplate from '../src/templates/OG/blog.js'
import docsHandbookTemplate from '../src/templates/OG/docs-handbook.js'
import customerTemplate from '../src/templates/OG/customer.js'
import jobTemplate from '../src/templates/OG/job.js'
import { flattenMenu } from './utils'

const limit = pLimit(10)

const createCareersOG = async () => {
    const dir = path.resolve(__dirname, '../public/og-images')
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

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

    const publicDir = path.resolve(__dirname, '../public')
    await page.setRequestInterception(true)

    page.on('request', (request) => {
        const url = request.url()
        if (url.startsWith('file:///') && !url.includes(publicDir)) {
            const pathname = url.replace('file:///', '')
            const newUrl = `file://${publicDir}/${pathname}`
            request.continue({ url: newUrl })
        } else {
            request.continue()
        }
    })

    async function createOG({ slug }) {
        const htmlFilePath = path.resolve(__dirname, `../public/${slug}/index.html`)
        console.log(`Creating OG image for: ${htmlFilePath}`)

        await page.goto(`file://${htmlFilePath}`, {
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
            path: `${dir}/${slug.replace(/\//g, '')}.jpeg`,
            quality: 100,
        })
    }

    await createOG({ slug: 'careers-og' })

    await browser.close()
}

const createOGImages = async (data) => {
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
            waitUntil: ['domcontentloaded', 'networkidle0'],
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
        await createOG({
            html: blogTemplate({ title, authorData: author, image, font }),
            slug: post.fields.slug,
        })
    }

    const docsHandbookMenus = flattenMenu([...handbookSidebar, ...docsMenu.children])

    // Docs and Handbook OG
    for (const post of [...data.docsHandbook.nodes, ...data.tutorials.nodes]) {
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
    }

    // Customers OG
    for (const post of data.customers.nodes) {
        const { frontmatter } = post
        const featuredImage = frontmatter.featuredImage?.publicURL
        const logo = frontmatter.logo?.publicURL
        await createOG({
            html: customerTemplate({
                title: frontmatter.title,
                featuredImage,
                logo,
                font,
            }),
            slug: post.fields.slug,
        })
    }

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

const createOrUpdateStrapiPosts = async (posts, roadmaps) => {
    const apiHost = process.env.GATSBY_SQUEAK_API_HOST

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

    await getAllStrapiPosts()
    await getAllStrapiPostCategories()
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
        const existingPost = allExistingStrapiPosts.find((post) => post?.attributes?.path === path)
        const category =
            allStrapiPostCategories.find((category) => category?.attributes?.folder === path.split('/')[0]) ||
            (await createCategory(path.split('/')[0]))

        let tags = []
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
            ...(crosspost?.length > 0
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

    for (const { data, existingPostId } of postsToCreateOrUpdate) {
        await createOrUpdateStrapiPost(data, existingPostId)
    }

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

export const onPostBuild: GatsbyNode['onPostBuild'] = async ({ graphql, reporter }) => {
    if (process.env.GATSBY_MINIMAL === 'true') return
    // Generate API spec markdown files first
    try {
        const openApiSpecUrl = process.env.POSTHOG_OPEN_API_SPEC_URL || 'https://app.posthog.com/api/schema/'
        const spec = await fetch(openApiSpecUrl, {
            headers: {
                Accept: 'application/json',
            },
        }).then((res) => res.json())

        generateApiSpecMarkdown(spec)
    } catch (error) {
        console.error('Failed to generate API spec markdown:', error)
    }

    // Generate SDK references markdown files

    const sdkReferencesQuery = (await graphql(`
        query {
            allSdkReferences {
                nodes {
                    info {
                        description
                        id
                        specUrl
                        slugPrefix
                        title
                        version
                    }
                    referenceId
                    hogRef
                    id
                    categories
                    classes {
                        description
                        functions {
                            category
                            description
                            details
                            examples {
                                code
                                name
                                id
                            }
                            id
                            params {
                                description
                                isOptional
                                name
                                type
                            }
                            path
                            releaseTag
                            showDocs
                            returnType {
                                id
                                name
                            }
                            title
                        }
                        id
                        title
                    }
                    version
                }
            }
        }
    `)) as { data: { allSdkReferences: { nodes: SdkReferenceData[] } } }

    sdkReferencesQuery.data.allSdkReferences.nodes.forEach((node) => {
        generateSdkReferencesMarkdown(node)
    })

    // Generate markdown files for llms.txt file and LLM ingestion (after pages are built)
    // Convert HTML files to markdown using turndown
    // Build regex from MARKDOWN_CONTENT_PATHS constant (e.g., "/^/(docs|handbook)/")
    const markdownPathsRegex = `/^/(${MARKDOWN_CONTENT_PATHS.map((p) => p.replace('/', '')).join('|')})/`
    const docsQuery = (await graphql(`
        query {
            allMdx(filter: { fields: { slug: { regex: "${markdownPathsRegex}" } } }) {
                nodes {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                    }
                }
            }
        }
    `)) as { data: { allMdx: { nodes: Array<{ fields: { slug: string }; frontmatter: { title: string } }> } } }

    const filteredPages = await generateRawMarkdownPages(docsQuery.data.allMdx.nodes)
    // Only include docs pages in llms.txt (not handbook)
    const docsPages = filteredPages.filter((page) => page.fields.slug.startsWith('/docs'))
    generateLlmsTxt(docsPages)

    if (process.env.AWS_CODEPIPELINE !== 'true') {
        console.log('Skipping onPostBuild tasks')
        return
    }

    console.log('Running onPostBuild tasks')

    const { data } = await graphql(`
        query {
            allRoadmap(filter: { complete: { ne: false } }) {
                nodes {
                    title
                    description
                    date
                    cta {
                        url
                        label
                    }
                    media {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                }
            }
            allMDXPosts: allMdx(
                filter: {
                    fields: {
                        slug: {
                            regex: "/^/blog|^/tutorials|^/customers|^/spotlight|^/founders|^/product-engineers|^/features|^/newsletter/"
                        }
                    }
                    frontmatter: { date: { ne: null } }
                }
            ) {
                nodes {
                    parent {
                        ... on File {
                            relativePath
                        }
                    }
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        date
                        category
                        tags
                        authorData {
                            name
                        }
                        featuredImage {
                            publicURL
                            childImageSharp {
                                gatsbyImageData(width: 650, height: 350)
                            }
                        }
                        authorData {
                            profile_id
                        }
                        crosspost
                        hideFromIndex
                    }
                    excerpt(pruneLength: 250)
                }
            }
            blog: allMdx(
                filter: { fields: { slug: { regex: "/^/blog|^/spotlight|^/founders|^/product-engineers/" } } }
            ) {
                nodes {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        featuredImage {
                            publicURL
                        }
                        authorData {
                            name
                            role
                            profile {
                                avatar {
                                    url
                                }
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
                            avatar
                        }
                    }
                    frontmatter {
                        title
                        description
                        showTitle
                        hideAnchor
                        hideLastUpdated
                        availability {
                            free
                            selfServe
                            enterprise
                        }
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
                            publicURL
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
                            publicURL
                        }
                        logo {
                            publicURL
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

    console.log('Creating OG images')
    await createCareersOG()
    await createOGImages(data)
    console.log('Finished creating OG images')

    await createOrUpdateStrapiPosts(data.allMDXPosts.nodes, data.allRoadmap.nodes)
}
