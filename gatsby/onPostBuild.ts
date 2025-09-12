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
import { SdkReferenceData } from '../src/templates/sdk/SdkReference.js'

const limit = pLimit(10)

const createOGImages = async () => {
    console.log('Creating OG images')

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

    console.log('Finished creating OG images')

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

export const onPostBuild: GatsbyNode['onPostBuild'] = async ({ graphql }) => {
    // Generate API spec markdown files first
    try {
        const openApiSpecUrl = process.env.POSTHOG_OPEN_API_SPEC_URL || 'https://us.posthog.com/api/schema/'
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
            allSdkReferencesJson {
                edges {
                    node {
                        id
                        hogRef
                        info {
                            version
                            description
                            id
                            slugPrefix
                            specUrl
                            title
                        }
                        classes {
                            description
                            id
                            title
                            functions {
                                category
                                description
                                details
                                id
                                showDocs
                                title
                                releaseTag
                                examples {
                                    code
                                    id
                                    name
                                }
                                params {
                                    description
                                    isOptional
                                    type
                                    name
                                }
                                returnType {
                                    id
                                    name
                                }
                            }
                        }
                        categories
                    }
                }
            }
        }
    `)) as { data: { allSdkReferencesJson: { edges: { node: SdkReferenceData }[] } } }

    sdkReferencesQuery.data.allSdkReferencesJson.edges.forEach(({ node }) => {
        generateSdkReferencesMarkdown(node)
    })

    // Generate markdown files for llms.txt file and LLM ingestion (after API spec files exist)
    const markdownQuery = await graphql(`
        query pagesForMarkdown {
            allMdx {
                nodes {
                    frontmatter {
                        title
                        date
                    }
                    rawBody
                    fields {
                        slug
                        contentWithSnippets
                    }
                }
            }
        }
    `)

    const filteredPages = await generateRawMarkdownPages(markdownQuery.data.allMdx.nodes)
    generateLlmsTxt(filteredPages)

    if (process.env.AWS_CODEPIPELINE !== 'true') {
        console.log('Skipping onPostBuild tasks')
        return
    }

    console.log('Running onPostBuild tasks')

    await createOGImages()

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
                    rawBody
                    body
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

    await createOrUpdateStrapiPosts(data.allMDXPosts.nodes, data.allRoadmap.nodes)
}
