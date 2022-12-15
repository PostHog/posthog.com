import fetch from 'node-fetch'
import { MenuBuilder } from 'redoc'
import { GatsbyNode } from 'gatsby'
import parseLinkHeader from 'parse-link-header'

export const sourceNodes: GatsbyNode['sourceNodes'] = async ({ actions, createContentDigest, createNodeId }) => {
    const { createNode } = actions

    if (process.env.POSTHOG_APP_API_KEY) {
        const api_endpoints = await fetch('https://app.posthog.com/api/schema/', {
            headers: {
                Authorization: `Bearer ${process.env.POSTHOG_APP_API_KEY}`,
                accept: 'application/json',
            },
        }).then((res) => res.json())

        const menu = MenuBuilder.buildStructure({ spec: api_endpoints }, {})
        let all_endpoints = menu[menu.length - 1]['items'] // all grouped endpoints
        all_endpoints
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
    }

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
                content: body,
                mediaType: 'text/markdown',
            },
            ...data,
        }
        createNode(node)
    })

    const postHogPulls = await fetch(
        'https://api.github.com/repos/posthog/posthog/pulls?sort=popularity&per_page=5'
    ).then((res) => res.json())
    postHogPulls.forEach((issue) => {
        const { html_url, title, number, user, reactions, labels, body, updated_at } = issue
        const data = {
            url: html_url,
            title,
            number,
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
            id: createNodeId(`posthog-pull-${title}`),
            parent: null,
            children: [],
            internal: {
                type: `PostHogPull`,
                contentDigest: createContentDigest(data),
                content: body,
                mediaType: 'text/markdown',
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

    const plugins = await fetch(
        'https://raw.githubusercontent.com/PostHog/integrations-repository/main/plugins.json'
    ).then((res) => res.json())
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
}
