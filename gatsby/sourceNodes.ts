import fetch from 'node-fetch'
import { MenuBuilder } from 'redoc'
import { GatsbyNode } from 'gatsby'
import parseLinkHeader from 'parse-link-header'

export const sourceNodes: GatsbyNode['sourceNodes'] = async ({ actions, createContentDigest, createNodeId }) => {
    const { createNode } = actions

    if (process.env.POSTHOG_APP_API_KEY) {
        try {
            const endpointsResponse = await fetch('https://app.posthog.com/api/schema/', {
                headers: {
                    Authorization: `Bearer ${process.env.POSTHOG_APP_API_KEY}`,
                    accept: 'application/json',
                },
            })

            if (!endpointsResponse.ok) {
                throw new Error(`Failed to fetch endpoints: ${endpointsResponse.statusText}`)
            }

            const endpoints = await endpointsResponse.json()

            const menu = MenuBuilder.buildStructure({ spec: endpoints }, {})
            let all_endpoints = menu[menu.length - 1]['items'] // all grouped endpoints
            all_endpoints?.forEach((endpoint) => {
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
                    schema: endpoint.items.map((item) => ({
                        ...item,
                        operationSpec: item.operationSpec,
                        parent: null,
                    })),
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
                        components: endpoints.components,
                    }),
                },
                components: JSON.stringify(endpoints.components),
            })
        } catch (error) {
            console.error(error)
        }
    }

    try {
        const issuesResponse = await fetch(
            'https://api.github.com/repos/posthog/posthog/issues?sort=comments&per_page=5'
        )

        if (!issuesResponse.ok) {
            throw new Error(`Failed to fetch issues from the posthog/posthog repo: ${issuesResponse.statusText}`)
        }

        const issues = await issuesResponse.json()
        issues.forEach((issue) => {
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
    } catch (error) {
        console.error(error)
    }

    try {
        const pullsResponse = await fetch(
            'https://api.github.com/repos/posthog/posthog/pulls?sort=popularity&per_page=5'
        )

        if (!pullsResponse.ok) {
            throw new Error(`Failed to fetch pulls from the posthog/posthog repo: ${pullsResponse.statusText}`)
        }

        const pulls = await pullsResponse.json()

        pulls.forEach((issue) => {
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
    } catch (error) {
        console.error(error)
    }

    const createGitHubStatsNode = async (owner: string, repo: string) => {
        try {
            const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`)

            if (!repoResponse.ok) {
                throw new Error(`Failed to fetch data for the ${owner}/${repo} repo: ${repoResponse.statusText}`)
            }

            const contributorsResponse = await fetch(
                `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=1`
            )

            if (!contributorsResponse.ok) {
                throw new Error(
                    `Failed to fetch contributors for the ${owner}/${repo} repo: ${contributorsResponse.statusText}`
                )
            }

            const contributorsLink = parseLinkHeader(contributorsResponse.headers.get('link'))
            const numContributors = parseInt(contributorsLink?.last?.page)

            const commitsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`)

            if (!commitsResponse.ok) {
                throw new Error(`Failed to fetch commits for the ${owner}/${repo} repo: ${commitsResponse.statusText}`)
            }

            const commitsLink = parseLinkHeader(commitsResponse.headers.get('link'))
            const numCommits = parseInt(commitsLink?.last?.page)

            const repoData = await repoResponse.json()

            const { stargazers_count, forks_count } = repoData

            const data = {
                owner,
                repo,
                stars: stargazers_count,
                forks: forks_count,
                commits: numCommits,
                contributors: numContributors,
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
        } catch (error) {
            console.error(error)
        }
    }

    await createGitHubStatsNode('posthog', 'posthog')
    await createGitHubStatsNode('posthog', 'posthog.com')

    try {
        const integrationsResponse = await fetch(
            'https://raw.githubusercontent.com/PostHog/integrations-repository/main/integrations.json'
        )

        if (!integrationsResponse.ok) {
            throw new Error(`Failed to fetch integrations: ${integrationsResponse.statusText}`)
        }

        const integrations = await integrationsResponse.json()

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
    } catch (error) {
        console.error(error)
    }

    try {
        const pluginsResponse = await fetch(
            'https://raw.githubusercontent.com/PostHog/integrations-repository/main/plugins.json'
        )

        if (!pluginsResponse.ok) {
            throw new Error(`Failed to fetch plugins: ${pluginsResponse.statusText}`)
        }

        const plugins = await pluginsResponse.json()

        plugins.forEach((plugin) => {
            const { displayOnWebsiteLib, name, ...other } = plugin
            if (displayOnWebsiteLib) {
                const node = {
                    id: createNodeId(`plugin-${name}`),
                    parent: null,
                    children: [],
                    internal: {
                        type: `Plugin`,
                        contentDigest: createContentDigest(plugin),
                    },
                    name,
                    ...other,
                }
                createNode(node)
            }
        })
    } catch (error) {
        console.error(error)
    }
}
