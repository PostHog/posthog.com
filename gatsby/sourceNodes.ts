import { GatsbyNode } from 'gatsby'
import fetch from 'node-fetch'
import parseLinkHeader from 'parse-link-header'
import qs from 'qs'
import { ApiInfoModel, MenuBuilder, OpenAPIParser } from 'redoc'
import type {
    MetaobjectsCollection,
    MetaobjectsReferencesEdge,
    MetaobjectsResponseData,
} from '../src/templates/merch/types'
import dayjs from 'dayjs'

const DEFAULT_CHANGELOG_PLAYLIST_ID = 'PLnOY1RYHjDfxcuWI_L1xwuhoXAsxR59VL'

type ChangelogPlaylistVideo = {
    videoId: string
    publishedAt: string
    title: string
}

const fetchChangelogPlaylistVideos = async (): Promise<ChangelogPlaylistVideo[]> => {
    const apiKey = process.env.YOUTUBE_API_KEY_CHANGELOG
    if (!apiKey) {
        console.warn('YOUTUBE_API_KEY_CHANGELOG not set. Skipping changelog playlist ingestion.')
        return []
    }

    const playlistId = process.env.CHANGELOG_YOUTUBE_PLAYLIST_ID || DEFAULT_CHANGELOG_PLAYLIST_ID
    if (!playlistId) {
        console.warn('No playlist ID provided for changelog videos. Set CHANGELOG_YOUTUBE_PLAYLIST_ID.')
        return []
    }

    try {
        const playlistItems: Array<{ videoId: string; position: number }> = []
        let nextPageToken: string | undefined

        do {
            const params = new URLSearchParams({
                part: 'snippet,contentDetails',
                playlistId,
                maxResults: '50',
                key: apiKey,
            })
            if (nextPageToken) {
                params.set('pageToken', nextPageToken)
            }

            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/playlistItems?${params.toString()}`
            ).then((res) => res.json())

            if (!response.items) {
                console.warn('Unexpected response while fetching changelog playlist items', response)
                break
            }

            response.items.forEach((item: any) => {
                const videoId = item?.contentDetails?.videoId || item?.snippet?.resourceId?.videoId
                if (videoId) {
                    playlistItems.push({
                        videoId,
                        position: typeof item?.snippet?.position === 'number' ? item.snippet.position : 0,
                    })
                }
            })

            nextPageToken = response.nextPageToken
        } while (nextPageToken)

        if (playlistItems.length === 0) {
            return []
        }

        const videoDetailsMap: Record<string, ChangelogPlaylistVideo> = {}
        const chunkSize = 50
        for (let i = 0; i < playlistItems.length; i += chunkSize) {
            const chunk = playlistItems.slice(i, i + chunkSize)
            const idsParam = chunk.map((item) => item.videoId).join(',')
            const params = new URLSearchParams({
                part: 'snippet',
                id: idsParam,
                key: apiKey,
                maxResults: '50',
            })
            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?${params.toString()}`).then(
                (res) => res.json()
            )

            if (!response.items) {
                continue
            }

            response.items.forEach((item: any) => {
                const videoId = item?.id
                if (!videoId) return
                const snippet = item?.snippet
                if (!snippet?.publishedAt) return
                videoDetailsMap[videoId] = {
                    videoId,
                    publishedAt: snippet.publishedAt,
                    title: snippet.title,
                }
            })
        }

        return Object.values(videoDetailsMap).sort(
            (a, b) => dayjs(b.publishedAt).valueOf() - dayjs(a.publishedAt).valueOf()
        )
    } catch (error) {
        console.warn('Failed to fetch changelog playlist videos', error)
        return []
    }
}

/**
 * Find all $ref references in an object recursively
 */
const findSchemaRefs = (obj: any, refs: Set<string>) => {
    if (typeof obj === 'object' && obj !== null) {
        if (obj['$ref'] && typeof obj['$ref'] === 'string') {
            const ref = obj['$ref']
            if (ref.startsWith('#/components/schemas/')) {
                refs.add(ref.replace('#/components/schemas/', ''))
            }
        }
        Object.values(obj).forEach((val) => findSchemaRefs(val, refs))
    }
}

/**
 * Recursively find all schema references including nested ones
 */
const findAllReferencedSchemas = (items: any[], allSchemas: Record<string, any>): Record<string, any> => {
    const referencedNames = new Set<string>()

    // Find direct refs from all items
    items.forEach((item) => {
        findSchemaRefs(item.operationSpec, referencedNames)
    })

    // Recursively find nested refs
    const findNestedRefs = (schemaName: string, visited: Set<string>) => {
        if (visited.has(schemaName) || !allSchemas[schemaName]) {
            return
        }
        visited.add(schemaName)

        const beforeSize = referencedNames.size
        findSchemaRefs(allSchemas[schemaName], referencedNames)

        // Process any newly added refs
        if (referencedNames.size > beforeSize) {
            Array.from(referencedNames)
                .filter((ref) => !visited.has(ref))
                .forEach((ref) => findNestedRefs(ref, visited))
        }
    }

    const visited = new Set<string>()
    Array.from(referencedNames).forEach((ref) => findNestedRefs(ref, visited))

    // Build the components object with only referenced schemas
    const schemas: Record<string, any> = {}
    referencedNames.forEach((name) => {
        if (allSchemas[name]) {
            schemas[name] = allSchemas[name]
        }
    })

    return { schemas }
}

export const sourceNodes: GatsbyNode['sourceNodes'] = async ({ actions, createContentDigest, createNodeId }) => {
    const { createNode } = actions

    const openApiSpecUrl = process.env.POSTHOG_OPEN_API_SPEC_URL || 'https://app.posthog.com/api/schema/'
    const spec = await fetch(openApiSpecUrl, {
        headers: {
            Accept: 'application/json',
        },
    }).then((res) => res.json())

    const parser = new OpenAPIParser(spec)
    const menu = MenuBuilder.buildStructure(parser, {} as any)

    const allSchemas = spec.components?.schemas || {}

    let all_endpoints = menu[menu.length - 1]['items'] // all grouped endpoints
    const maxEndpointItems = 20
    all_endpoints = all_endpoints.flatMap((endpoint) => {
        if (endpoint.items.length > maxEndpointItems) {
            const chunks = []
            for (let i = 0; i < endpoint.items.length; i += maxEndpointItems) {
                const next =
                    i + maxEndpointItems < endpoint.items.length &&
                    `${endpoint.name}-${Math.floor(i / maxEndpointItems) + 2}`
                const name = i === 0 ? endpoint.name : `${endpoint.name}-${Math.floor(i / maxEndpointItems) + 1}`
                const chunk = {
                    ...endpoint,
                    name,
                    items: endpoint.items.slice(i, i + maxEndpointItems),
                    next,
                }
                chunks.push(chunk)
            }
            return chunks
        }
        return endpoint
    })
    all_endpoints.forEach((endpoint) => {
        // Compute only the schemas referenced by this endpoint's items
        const components = findAllReferencedSchemas(endpoint.items, allSchemas)

        const node = {
            id: createNodeId(`api_endpoint-${endpoint.name}`),
            internal: {
                type: `api_endpoint`,
                contentDigest: createContentDigest({
                    items: endpoint.items,
                }),
            },
            items: JSON.stringify(endpoint.items.map((item) => item.operationSpec)),
            components: JSON.stringify(components),
            url: '/docs/api/' + endpoint.name.replace(/_/g, '-'),
            name: endpoint.name,
            nextURL: endpoint.next ? '/docs/api/' + endpoint.next.replace(/_/g, '-') : null,
        }
        createNode(node)
    })

    const createProductDataNode = async () => {
        const url = `${process.env.BILLING_SERVICE_URL + '/api/products-v2'}`
        const headers = {
            'Content-Type': 'application/json',
        }
        const productData = await fetch(url, {
            method: 'GET',
            headers: headers,
        }).then((res) => res.json())
        const { products } = productData

        const data = {
            products,
        }

        const node = {
            id: createNodeId(`posting-product-data`),
            parent: null,
            children: [],
            internal: {
                type: `ProductData`,
                contentDigest: createContentDigest(data),
            },
            ...data,
        }
        createNode(node)
    }
    await createProductDataNode()

    const createRoadmapItems = async (page = 1) => {
        const roadmapQuery = qs.stringify(
            {
                pagination: {
                    page,
                    pageSize: 100,
                },
                populate: {
                    image: true,
                    teams: {
                        populate: {
                            miniCrest: true,
                        },
                    },
                    topic: true,
                    cta: true,
                    profiles: {
                        populate: {
                            avatar: true,
                            teams: {
                                populate: {
                                    miniCrest: true,
                                },
                            },
                        },
                    },
                    githubUrls: true,
                    githubPRMetadata: true,
                },
            },
            {
                encodeValuesOnly: true,
            }
        )
        const roadmapsURL = `${process.env.GATSBY_SQUEAK_API_HOST}/api/roadmaps?${roadmapQuery}`
        const { data: roadmaps, meta } = await fetch(roadmapsURL).then((res) => res.json())
        roadmaps.forEach((roadmap) => {
            const {
                id,
                attributes: { image, projectedCompletion, dateCompleted, category, ...other },
            } = roadmap

            const date = dateCompleted || projectedCompletion
            const year = date && Number(dayjs(date).format('YYYY'))

            const cloudinaryMedia = {
                ...image,
                cloudName: process.env.GATSBY_CLOUDINARY_CLOUD_NAME,
                publicId: image?.data?.attributes?.provider_metadata?.public_id,
                originalHeight: image?.data?.attributes?.height,
                originalWidth: image?.data?.attributes?.width,
                originalFormat: (image?.data?.attributes?.ext || '').replace('.', ''),
            }

            const data = {
                strapiID: id,
                date,
                media: cloudinaryMedia,
                type: category,
                year,
                projectedCompletion,
                dateCompleted,
                ...other,
            }
            const roadmapNode = {
                id: createNodeId(`roadmap-${id}`),
                parent: null,
                children: [],
                internal: {
                    type: `Roadmap`,
                    contentDigest: createContentDigest(data),
                },
                ...data,
            }
            createNode(roadmapNode)
        })
        if (meta?.pagination?.pageCount > meta?.pagination?.page) await createRoadmapItems(page + 1)
    }
    await createRoadmapItems()

    const changelogPlaylistVideos = await fetchChangelogPlaylistVideos()
    changelogPlaylistVideos.forEach((video) => {
        const nodeData = {
            videoId: video.videoId,
            publishedAt: video.publishedAt,
            title: video.title,
        }
        const node = {
            id: createNodeId(`changelog-video-${video.videoId}`),
            parent: null,
            children: [],
            internal: {
                type: `ChangelogVideo`,
                contentDigest: createContentDigest(nodeData),
            },
            ...nodeData,
        }
        createNode(node)
    })

    const postCategories = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/post-categories?populate=*`).then(
        (res) => res.json()
    )

    postCategories.data.forEach(({ id, ...other }) => {
        const node = {
            id: createNodeId(`post-category-${id}`),
            internal: {
                type: `PostCategory`,
                contentDigest: createContentDigest(other),
            },
            ...other,
        }
        createNode(node)
    })

    /**
     * Source a list of metaobjects from shopify representing the nav list of collections
     * and create new Gatsby nodes
     */
    const shopifyURL = process.env.GATSBY_MYSHOPIFY_URL
    const shopifyAdminAPIVersion = process.env.GATSBY_SHOPIFY_ADMIN_API_VERSION
    const shopifyAdminAPIAPIPassword = process.env.SHOPIFY_APP_PASSWORD

    if (shopifyURL && shopifyAdminAPIVersion && shopifyAdminAPIAPIPassword) {
        let responseData: MetaobjectsResponseData | undefined

        try {
            const response = await fetch(`https://${shopifyURL}/admin/api/${shopifyAdminAPIVersion}/graphql.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': shopifyAdminAPIAPIPassword!,
                },
                body: JSON.stringify({
                    query: `
                    {
                        metaobjects(type: "merch_navigation", first: 100) {
                            edges {
                              node {
                                fields {
                                  references(first: 5) {
                                    edges {
                                        node {
                                            __typename
                                            ...on Collection {
                                              title
                                              handle
                                              id
                                            }    
                                        }
                                    }
                                  }
                                }
                              }
                            }
                          }
                      }
                      
                  `,
                }),
            })

            responseData = (await response.json()) as MetaobjectsResponseData
        } catch (error) {
            throw new Error(error)
        }

        // we want the collection "All Products" to always be at the top of the list
        const collections: MetaobjectsCollection[] =
            responseData.data.metaobjects.edges[0].node.fields[0].references.edges
                .map((item: MetaobjectsReferencesEdge) => ({
                    title: item.node.title,
                    handle: item.node.handle,
                }))
                .sort((a: MetaobjectsCollection, b: MetaobjectsCollection) =>
                    a.handle === 'frontpage' ? -1 : b.handle === 'frontpage' ? 1 : 0
                )

        collections.forEach((collection, i) => {
            const node = {
                url: `/merch/${collection.handle}`,
                title: collection.title,
                handle: collection.handle,
                id: createNodeId(`MerchNavigation-${i}`),
                parent: null,
                children: [],
                internal: {
                    type: `MerchNavigation`,
                    contentDigest: createContentDigest(collection),
                },
            }

            createNode(node)
        })

        const getCollectionByHandle = async (handle: string) => {
            const collection = await fetch(`https://${shopifyURL}/admin/api/${shopifyAdminAPIVersion}/graphql.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': shopifyAdminAPIAPIPassword!,
                },
                body: JSON.stringify({
                    query: ` {
                collectionByHandle(handle: "${handle}") {
                  handle
                  products(first: 250) {
                    nodes {
                      description
                      descriptionHtml
                      featuredMedia {
                        preview {
                          image {
                            width
                            height
                            originalSrc
                          }
                        }
                      }
                      handle
                      id
                      media(first: 250) {
                        nodes {
                          mediaContentType
                          preview {
                            image {
                              width
                              height
                              originalSrc
                            }
                          }
                        }
                      }
                      metafields(first: 250) {
                        nodes {
                          value
                          key
                          namespace
                        }
                      }
                      options {
                        shopifyId: id
                        name
                        values
                      }
                      priceRangeV2 {
                        maxVariantPrice {
                          amount
                        }
                        minVariantPrice {
                          amount
                        }
                      }
                      shopifyId: id
                      status
                      title
                      tags
                      totalInventory
                      createdAt
                      category {
                        id
                        name
                        level
                        parentId
                      }
                    }
                  }
                }
              } 
                  `,
                }),
            }).then((res) => res.json())
            return collection
        }

        const getAllVariants = async () => {
            let allVariants = []
            let hasNextPage = true
            let cursor = null

            while (hasNextPage) {
                const response = await fetch(`https://${shopifyURL}/admin/api/${shopifyAdminAPIVersion}/graphql.json`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Shopify-Access-Token': shopifyAdminAPIAPIPassword!,
                    },
                    body: JSON.stringify({
                        query: `{
                            productVariants(first: 250${cursor ? `, after: "${cursor}"` : ''}) {
                                pageInfo {
                                    hasNextPage
                                    endCursor
                                }
                                nodes {
                                    inventoryPolicy
                                    availableForSale
                                    media(first: 250) {
                                        nodes {
                                            preview {
                                                image {
                                                    width
                                                    height
                                                    originalSrc
                                                }
                                            }
                                        }
                                    }
                                    price
                                    product {
                                        shopifyId: id
                                        title
                                        featuredMedia {
                                            preview {
                                                image {
                                                    width
                                                    height
                                                    originalSrc
                                                }
                                            }
                                        }
                                    }
                                    selectedOptions {
                                        name
                                        value
                                    }
                                    shopifyId: id
                                    sku
                                    title
                                }
                            }
                        }`,
                    }),
                }).then((res) => res.json())

                const { nodes, pageInfo } = response.data.productVariants
                allVariants = [...allVariants, ...nodes]
                hasNextPage = pageInfo.hasNextPage
                cursor = pageInfo.endCursor
            }

            return { data: { productVariants: { nodes: allVariants } } }
        }

        const variants = await getAllVariants()

        const createShopifyNodesByCollectionHandle = async (handle: string) => {
            const collection = await getCollectionByHandle(handle)

            const moveNodesToParent = (obj) => {
                if (Array.isArray(obj)) {
                    return obj.map(moveNodesToParent)
                } else if (obj && typeof obj === 'object') {
                    if (obj.nodes) {
                        return moveNodesToParent(obj.nodes)
                    }
                    return Object.fromEntries(
                        Object.entries(obj).map(([key, value]) => [key, moveNodesToParent(value)])
                    )
                }
                return obj
            }

            const products = moveNodesToParent(collection.data.collectionByHandle.products.nodes).filter(
                (product) => product.status === 'ACTIVE'
            )
            products.forEach((product) => {
                product.variants = moveNodesToParent(
                    variants.data.productVariants.nodes.filter(
                        (variant) => variant.product.shopifyId === product.shopifyId
                    )
                )
                const node = {
                    id: createNodeId(`shopify-product-${product.shopifyId}`),
                    internal: {
                        type: 'ShopifyProduct',
                        contentDigest: createContentDigest(product),
                    },
                    ...product,
                }
                createNode(node)
            })
            const data = {
                handle: collection.data.collectionByHandle.handle,
                products: products.map((product) => ({ shopifyId: product.shopifyId })),
            }
            const node = {
                id: createNodeId(`shopify-collection-${handle}`),
                internal: {
                    type: 'ShopifyCollection',
                    contentDigest: createContentDigest(data),
                },
                ...data,
            }
            createNode(node)
        }

        await createShopifyNodesByCollectionHandle('frontpage')
        await createShopifyNodesByCollectionHandle('kits')
    }

    const fetchSlackEmojis = async () => {
        const slackToken = process.env.SLACK_API_KEY
        const { emoji } = await fetch('https://slack.com/api/emoji.list', {
            headers: {
                Authorization: `Bearer ${slackToken}`,
            },
        }).then((res) => res.json())
        Object.entries(emoji).forEach(([name, url]) => {
            const node = {
                id: createNodeId(`slack-emoji-${name}`),
                internal: {
                    type: 'SlackEmoji',
                    contentDigest: createContentDigest(url),
                },
                name,
                url,
            }
            createNode(node)
        })
    }
    if (process.env.SLACK_API_KEY) {
        await fetchSlackEmojis()
    }
    const fetchG2Reviews = async (url) => {
        const g2Token = process.env.G2_API_KEY
        const { data, links } = await fetch(url, {
            headers: {
                Authorization: `Token ${g2Token}`,
            },
        }).then((res) => res.json())
        if (data?.length > 0) {
            data.forEach((review) => {
                const node = {
                    id: createNodeId(`g2-review-${review.id}`),
                    internal: {
                        type: 'G2Review',
                        contentDigest: createContentDigest(review),
                    },
                    ...review,
                }
                createNode(node)
            })
        }
        if (links?.next) {
            await fetchG2Reviews(links.next)
        }
    }
    if (process.env.G2_API_KEY) {
        await fetchG2Reviews('https://data.g2.com/api/v1/survey-responses?page[size]=100')
    }
    if (
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET &&
        process.env.GATSBY_CLOUDINARY_CLOUD_NAME
    ) {
        const { resources } = await fetch(
            `https://${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}@api.cloudinary.com/v1_1/${process.env.GATSBY_CLOUDINARY_CLOUD_NAME}/resources/image?prefix=hogs&type=upload&max_results=500`
        ).then((res) => res.json())
        resources.forEach((resource) => {
            const node = {
                id: createNodeId(`cloudinary-image-${resource.public_id}`),
                internal: {
                    type: 'CloudinaryImage',
                    contentDigest: createContentDigest(resource),
                },
                ...resource,
            }
            createNode(node)
        })
    }

    async function sourceGithubNodes() {
        if (!process.env.GITHUB_API_KEY) return

        const githubHeaders: HeadersInit = { Authorization: `token ${process.env.GITHUB_API_KEY}` }

        const postHogIssues = await fetch(
            'https://api.github.com/repos/posthog/posthog/issues?sort=comments&per_page=5',
            {
                headers: githubHeaders,
            }
        ).then((res) => res.json())
        postHogIssues.forEach((issue) => {
            const { html_url, title, number, user, comments, reactions, labels, body, updated_at } = issue
            const data = {
                url: html_url,
                title,
                number,
                comments,
                user: {
                    username: user?.login,
                    avatar: user?.avatar_url,
                    url: user?.html_url,
                },
                reactions,
                labels,
                body,
                updated_at,
            }
            if (data.reactions) {
                data.reactions.plus1 = data.reactions['+1']
                data.reactions.minus1 = data.reactions['-1']
            }
            const node = {
                id: createNodeId(`posthog-issue-${title}`),
                parent: null,
                children: [],
                internal: {
                    type: `PostHogIssue`,
                    contentDigest: createContentDigest(data),
                },
                ...data,
            }
            createNode(node)
        })

        const postHogPulls = await fetch(
            'https://api.github.com/repos/posthog/posthog/pulls?sort=popularity&per_page=5',
            {
                headers: githubHeaders,
            }
        ).then((res) => res.json())
        postHogPulls.forEach((issue) => {
            const { html_url, title, number, user, labels, body, updated_at } = issue
            const data = {
                url: html_url,
                title,
                number,
                user: {
                    username: user?.login,
                    avatar: user?.avatar_url,
                    url: user?.html_url,
                },
                labels,
                body,
                updated_at,
            }

            const node = {
                id: createNodeId(`posthog-pull-${title}`),
                parent: null,
                children: [],
                internal: {
                    type: `PostHogPull`,
                    contentDigest: createContentDigest(data),
                },
                ...data,
            }
            createNode(node)
        })

        const createGitHubStatsNode = async (owner, repo) => {
            const repoStats = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
                headers: githubHeaders,
            }).then((res) => res.json())
            const contributors = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors?per_page=1`, {
                headers: githubHeaders,
            }).then((res) => {
                const link = parseLinkHeader(res.headers.get('link'))
                const number = link?.last?.page
                return number && Number(number)
            })
            const commits = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`, {
                headers: githubHeaders,
            }).then((res) => {
                const link = parseLinkHeader(res.headers.get('link'))
                const number = link?.last?.page
                return number && Number(number)
            })
            const { stargazers_count, forks_count } = repoStats

            const data = {
                owner,
                repo,
                stars: stargazers_count,
                forks: forks_count,
                commits,
                contributors,
            }

            const node = {
                id: createNodeId(`github-stats-${repo}`),
                parent: null,
                children: [],
                internal: {
                    type: `GitHubStats`,
                    contentDigest: createContentDigest(data),
                },
                ...data,
            }
            createNode(node)
        }

        await createGitHubStatsNode('posthog', 'posthog')
        await createGitHubStatsNode('posthog', 'posthog.com')

        const integrations = await fetch(
            'https://raw.githubusercontent.com/PostHog/integrations-repository/main/integrations.json',
            { headers: githubHeaders }
        ).then((res) => res.json())
        integrations.forEach((integration) => {
            const { name, url, ...other } = integration
            const node = {
                id: createNodeId(`integration-${name}`),
                parent: null,
                children: [],
                internal: {
                    type: `Integration`,
                    contentDigest: createContentDigest(integration),
                },
                url: url.replace('https://posthog.com', ''),
                name,
                ...other,
            }
            createNode(node)
        })

        const extractIntroSection = (markdown: string): string => {
            const headingMatch = markdown.match(/^#{1,2}\s+/m)

            if (headingMatch) {
                const headingIndex = markdown.indexOf(headingMatch[0])
                return markdown.substring(0, headingIndex).trim()
            }

            return markdown
        }

        const extractGettingStartedSection = (markdown: string): string => {
            const gettingStartedMatch = markdown.match(/^#{1,2}\s+Getting started\s*$/im)

            if (gettingStartedMatch) {
                const startIndex = markdown.indexOf(gettingStartedMatch[0])
                const afterHeading = markdown.substring(startIndex + gettingStartedMatch[0].length)

                const nextHeadingMatch = afterHeading.match(/^#+\s+/m)

                if (nextHeadingMatch) {
                    const endIndex = afterHeading.indexOf(nextHeadingMatch[0])
                    return '## Installation\n\n' + afterHeading.substring(0, endIndex).trim()
                }

                return '## Installation\n\n' + afterHeading.trim()
            }

            return ''
        }

        const fetchPostHogPipelines = async (
            type: 'transformation' | 'destination' | 'source_webhook',
            generateSlug: (pipeline: any) => string
        ) => {
            const { results } = await fetch(
                `https://us.posthog.com/api/public_hog_function_templates?type=${type}&limit=350`
            ).then((res) => res.json())
            await Promise.all(
                results.map(async (pipeline) => {
                    let additionalData = {}

                    if (pipeline.id.startsWith('segment-')) {
                        const cleanMarkdown = (markdown: string) => {
                            return markdown
                                .replaceAll(/^---[\s\S]*?---/g, '') // Remove frontmatter
                                .replaceAll(/{%\s*.*?\s*%}/g, '') // Remove {% ... %}
                                .replaceAll(/{:.*?}/g, '') // Remove {: ... }
                                .replaceAll(/{{.*?}}/g, '') // Remove {{ ... }}
                                .replaceAll('Segment', 'PostHog')
                                .replaceAll('Connections > Catalog', 'Data pipelines')
                                .replaceAll('Catalog', 'Data pipelines')
                                .replaceAll(' (Actions)', '')
                                .replaceAll('segmentio', 'posthog')
                                .replaceAll(/\[([^\]]+)\]\(https?:\/\/[^\/]*segment\.com[^)]*\)(\s*\{:.*?\})?/g, '$1') // Remove segment.com links completely, keeping only the link text
                                .replaceAll(/> \w+ ""/g, '')
                                .replaceAll(/^.*Both of these destinations receive data from PostHog.*$/gm, '') // Remove banner regarding the Actions-framework
                                .replaceAll(
                                    /^.*(?:maintains this destination|maintained by|contact.*support|support.*team).*$/gm,
                                    ''
                                ) // Remove lines about other companies maintaining destinations or contact support
                                .trim()
                        }

                        const response = await fetch(
                            `https://raw.githubusercontent.com/posthog/segment-docs/refs/heads/develop/src/connections/destinations/catalog/${pipeline.id.replace(
                                'segment-',
                                ''
                            )}/index.md`,
                            { headers: githubHeaders }
                        )
                        let markdown = await response.text()
                        if (response.status !== 200) markdown = ''
                        markdown = cleanMarkdown(markdown)

                        additionalData = {
                            introSnippet: extractIntroSection(markdown),
                            installationSnippet: extractGettingStartedSection(markdown),
                        }
                    }

                    const slug = generateSlug(pipeline)
                    const node = {
                        id: createNodeId(`posthog-pipeline-${pipeline.id}`),
                        internal: {
                            type: 'PostHogPipeline',
                            contentDigest: createContentDigest({ pipeline }),
                        },
                        pipelineId: pipeline.id,
                        slug,
                        type,
                        ...pipeline,
                        ...additionalData,
                    }
                    createNode(node)
                })
            )
        }

        await fetchPostHogPipelines('transformation', (pipeline) => pipeline.id.replace('plugin-', ''))
        await fetchPostHogPipelines('destination', (pipeline) => pipeline.id.replace('template-', ''))
        await fetchPostHogPipelines('source_webhook', (pipeline) => pipeline.id.replace('template-', ''))
    }

    await sourceGithubNodes()

    const fetchWorkflowTemplates = async () => {
        const data = await fetch('https://us.posthog.com/api/public_hog_flow_templates?limit=350').then((res) =>
            res.json()
        )
        data.results.forEach((template) => {
            const node = {
                id: createNodeId(`posthog-workflow-template-${template.id}`),
                internal: {
                    type: 'PostHogWorkflowTemplate',
                    contentDigest: createContentDigest({ template }),
                },
                templateId: template.id,
                ...template,
            }
            createNode(node)
        })
    }

    await fetchWorkflowTemplates()

    const fetchReferences = async (page = 1) => {
        const referenceQuery = qs.stringify(
            {
                pagination: {
                    page,
                    pageSize: 100,
                },
            },
            {
                encodeValuesOnly: true,
            }
        )
        const referencesURL = `${process.env.GATSBY_SQUEAK_API_HOST}/api/sdk-references?${referenceQuery}`
        const { data, meta } = await fetch(referencesURL).then((res) => res.json())
        for (const reference of data) {
            const data = reference?.attributes?.data
            if (!data) continue
            const versionNode = {
                parent: null,
                children: [],
                internal: {
                    type: `SdkReferences`,
                    contentDigest: createContentDigest(data),
                },
                ...data,
            }
            createNode(versionNode)
        }
        if (meta?.pagination?.pageCount > meta?.pagination?.page) await fetchReferences(page + 1)
    }

    await fetchReferences()

    const fetchEvents = async (page = 1) => {
        const eventsQuery = qs.stringify(
            {
                pagination: {
                    page,
                    pageSize: 100,
                },
                sort: ['date:desc'],
                populate: {
                    location: {
                        populate: ['venue'],
                    },
                    photos: true,
                    speakers: true,
                    partners: true,
                },
            },
            { encodeValuesOnly: true }
        )
        const eventsUrl = `${process.env.GATSBY_SQUEAK_API_HOST}/api/events?${eventsQuery}`
        const { data: events, meta } = await fetch(eventsUrl).then((res) => res.json())
        events.forEach((event) => {
            const node = {
                ...event,
                id: createNodeId(`event-${event.id}`),
                internal: {
                    type: 'Event',
                    contentDigest: createContentDigest(event),
                },
            }
            createNode(node)
        })
        if (meta?.pagination?.pageCount > meta?.pagination?.page) await fetchEvents(page + 1)
    }
    await fetchEvents()

    const fetchAchievements = async () => {
        const query = qs.stringify({
            populate: ['icon', 'achievement_group.achievements.icon'],
        })
        const { data } = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/achievements?${query}`).then((res) =>
            res.json()
        )
        data.forEach((achievement) => {
            const node = {
                id: createNodeId(`achievement-${achievement.id}`),
                internal: {
                    type: 'Achievement',
                    contentDigest: createContentDigest(achievement),
                },
                strapiID: achievement.id,
                ...achievement?.attributes,
            }
            createNode(node)
        })
    }

    const fetchAchievementGroups = async () => {
        const query = qs.stringify({
            populate: ['achievements.icon'],
        })
        const { data } = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/achievement-groups?${query}`).then(
            (res) => res.json()
        )
        data.forEach((achievement) => {
            const node = {
                id: createNodeId(`achievement-group-${achievement.id}`),
                internal: {
                    type: 'AchievementGroup',
                    contentDigest: createContentDigest(achievement),
                },
                strapiID: achievement.id,
                ...achievement?.attributes,
            }
            createNode(node)
        })
    }

    const fetchRewards = async () => {
        const { data } = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/points/rewards`).then((res) =>
            res.json()
        )
        data.forEach((reward) => {
            const node = {
                id: createNodeId(`reward-${reward.handle}`),
                internal: {
                    type: 'Reward',
                    contentDigest: createContentDigest(reward),
                },
                ...reward,
            }
            createNode(node)
        })
    }

    await fetchAchievements()
    await fetchAchievementGroups()
    await fetchRewards()
}
