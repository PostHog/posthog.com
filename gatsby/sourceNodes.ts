import { GatsbyNode } from 'gatsby'
import fetch from 'node-fetch'
import parseLinkHeader from 'parse-link-header'
import qs from 'qs'
import { MenuBuilder } from 'redoc'
import type {
    MetaobjectsCollection,
    MetaobjectsReferencesEdge,
    MetaobjectsResponseData,
} from '../src/templates/merch/types'

export const sourceNodes: GatsbyNode['sourceNodes'] = async ({ actions, createContentDigest, createNodeId }) => {
    const { createNode } = actions

    const openApiSpecUrl = process.env.POSTHOG_OPEN_API_SPEC_URL || 'https://app.posthog.com/api/schema/'
    const api_endpoints = await fetch(openApiSpecUrl, {
        headers: {
            'Accept': 'application/json',
        }
    }).then((res) => res.json())

    console.log(api_endpoints)
    const menu = MenuBuilder.buildStructure({ spec: api_endpoints }, {})
    let all_endpoints = menu[menu.length - 1]['items'] // all grouped endpoints
    all_endpoints.forEach((endpoint) => {
        const node = {
            id: createNodeId(`api_endpoint-${endpoint.name}`),
            internal: {
                type: `api_endpoint`,
                contentDigest: createContentDigest({
                    items: endpoint.items,
                }),
            },
            items: JSON.stringify(
                endpoint.items.map((item) => ({ ...item, operationSpec: item.operationSpec, parent: null }))
            ),
            schema: endpoint.items.map((item) => ({ ...item, operationSpec: item.operationSpec, parent: null })),
            url: '/docs/api/' + endpoint.name.replace('_', '-'),
            name: endpoint.name,
        }
        createNode(node)
    })
    createNode({
        id: createNodeId(`api_endpoint-components`),
        internal: {
            type: `ApiComponents`,
            contentDigest: createContentDigest({
                components: api_endpoints.components,
            }),
        },
        components: JSON.stringify(api_endpoints.components),
    })

    const postHogIssues = await fetch(
        'https://api.github.com/repos/posthog/posthog/issues?sort=comments&per_page=5'
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
        'https://api.github.com/repos/posthog/posthog/pulls?sort=popularity&per_page=5'
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
        const repoStats = await fetch(`https://api.github.com/repos/${owner}/${repo}`).then((res) => res.json())
        const contributors = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors?per_page=1`).then(
            (res) => {
                const link = parseLinkHeader(res.headers.get('link'))
                const number = link?.last?.page
                return number && Number(number)
            }
        )
        const commits = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`).then((res) => {
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

    const integrations = await fetch(
        'https://raw.githubusercontent.com/PostHog/integrations-repository/main/integrations.json'
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

    const createRoadmapItems = async (page = 1) => {
        const roadmapQuery = qs.stringify(
            {
                pagination: {
                    page,
                    pageSize: 100,
                },
                populate: ['image', 'teams', 'topic', 'cta'],
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

            const data = {
                date,
                media: image,
                type: category,
                year: date && new Date(date)?.getFullYear(),
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
                    a.handle === 'all-products' ? -1 : b.handle === 'all-products' ? 1 : 0
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
    }
}
