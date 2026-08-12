import path from 'path'
import fs from 'fs'

import { GatsbyNode } from 'gatsby'
import pLimit from 'p-limit'
import qs from 'qs'
import dayjs from 'dayjs'
import slugify from 'slugify'
import {
    generateRawMarkdownPages,
    generateApiSpecMarkdown,
    generateChangelogMd,
    generateLlmsTxt,
    generateSdkReferencesMarkdown,
    generatePricingMd,
    generatePlatformMd,
    generateProductPagesMarkdown,
} from './rawMarkdownUtils'
import { MARKDOWN_CONTENT_PATHS } from '../src/constants'
import { SdkReferenceData } from '../src/templates/sdk/SdkReference.js'
import { syncStandardSiteDocuments } from './standardSite'

const limit = pLimit(10)

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

    // Generate pricing.md from billing API data
    try {
        const billingUrl = `${process.env.BILLING_SERVICE_URL}/api/products-v2?display_friendly=true`
        const billingData = await fetch(billingUrl, {
            headers: { 'Content-Type': 'application/json' },
        }).then((res) => res.json())
        generatePricingMd(billingData.products)
    } catch (error) {
        console.error('Failed to generate pricing.md:', error)
    }

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

    // Generate the self-driving platform overview + per-product markdown for LLMs/agents
    generatePlatformMd()
    generateProductPagesMarkdown()

    // Generate changelog.md (+ per-year archives) from build-time Roadmap nodes for LLMs/agents.
    // The /changelog page renders a virtualized UI, so the HTML-scrape path can't cover it.
    try {
        const changelogQuery = (await graphql(`
            query {
                allRoadmap(
                    filter: { complete: { eq: true }, date: { ne: null } }
                    sort: { fields: date, order: DESC }
                ) {
                    nodes {
                        strapiID
                        title
                        description
                        date
                        cta {
                            label
                            url
                        }
                        teams {
                            data {
                                attributes {
                                    name
                                }
                            }
                        }
                        topic {
                            data {
                                attributes {
                                    label
                                }
                            }
                        }
                    }
                }
                allChangelogVideo(sort: { fields: publishedAt, order: DESC }) {
                    nodes {
                        videoId
                        publishedAt
                        title
                    }
                }
            }
        `)) as {
            data?: {
                allRoadmap?: { nodes: any[] }
                allChangelogVideo?: { nodes: any[] }
            }
        }
        generateChangelogMd(
            changelogQuery.data?.allRoadmap?.nodes || [],
            changelogQuery.data?.allChangelogVideo?.nodes || []
        )
    } catch (error) {
        console.error('Failed to generate changelog markdown:', error)
    }

    // Publish/update Standard.site document records for blog posts.
    // Self-gates on env (AWS_CODEPIPELINE / STANDARD_SITE_SYNC) and BSKY_APP_PASSWORD; safe no-op otherwise.
    // Placed before the prod-only return so STANDARD_SITE_SYNC=true can drive a local/dry run.
    await syncStandardSiteDocuments(graphql)

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
        }
    `)

    await createOrUpdateStrapiPosts(data.allMDXPosts.nodes, data.allRoadmap.nodes)
}
