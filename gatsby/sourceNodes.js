const fetch = require('node-fetch')
const uniqBy = require('lodash.uniqby')
const { MenuBuilder } = require('redoc')

module.exports = exports.sourceNodes = async ({ actions, createContentDigest, createNodeId }) => {
    const { createNode } = actions

    const api_endpoints = await fetch('https://app.posthog.com/api/schema/', {
        headers: {
            Authorization: `Bearer ${process.env.POSTHOG_APP_API_KEY}`,
            accept: 'application/json',
        },
    }).then((res) => res.json())
    console.log(api_endpoints)
    const menu = MenuBuilder.buildStructure({ spec: api_endpoints }, {})
    const all_endpoints = menu[menu.length - 1]['items'] // all grouped endpoints

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
            url: '/docs/api/' + endpoint.name,
            name: endpoint.name,
        }
        console.log(node)
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

    if (process.env.WORKABLE_API_KEY) {
        const { jobs } = await fetch('https://posthog.workable.com/spi/v3/jobs?state=published', {
            headers: { Authorization: `Bearer ${process.env.WORKABLE_API_KEY}` },
        }).then((res) => res.json())

        uniqBy(jobs, (job) => job.title).forEach((job) => {
            const node = {
                parent: null,
                children: [],
                internal: {
                    type: `Jobs`,
                    contentDigest: createContentDigest(job),
                },
                ...job,
            }
            createNode(node)
        })
    }

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

    const questions = await fetch(
        `https://slack.com/api/conversations.history?channel=${process.env.SLACK_QUESTION_CHANNEL}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.SLACK_API_KEY}`,
                'Content-Type': 'application/json',
            },
        }
    ).then((res) => res.json())
    questions &&
        questions.messages &&
        questions.messages.forEach(async (message, index) => {
            const { blocks } = message

            if (!blocks || blocks.length <= 0 || !blocks.some((block) => block.block_id === 'published')) return

            const question = { replies: [] }
            const blockIds = {
                name_and_slug: (block) => {
                    const split = block.text.text.split(' on ')
                    question.name = split[0]
                    question.slug = split[1].split(',').map((slug) => slug.trim())
                },
                question: (block) => {
                    question.body = block.text.text
                    if (block.accessory) {
                        question.avatar = block.accessory.image_url
                    }
                },
            }

            blocks.forEach((block) => {
                const blockId = block.block_id
                if (blockIds[blockId] && block.text) {
                    blockIds[blockId](block)
                }
            })

            if (Object.keys(question).length > 0) {
                const replies =
                    message.thread_ts &&
                    (
                        await fetch(
                            `https://slack.com/api/conversations.replies?ts=${message.thread_ts}&channel=${process.env.SLACK_QUESTION_CHANNEL}`,
                            {
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${process.env.SLACK_API_KEY}`,
                                },
                            }
                        ).then((res) => res.json())
                    ).messages
                if (replies) {
                    question.replies = await Promise.all(
                        replies.slice(1).map((reply) => {
                            return fetch(`https://slack.com/api/users.info?user=${reply.user}`, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${process.env.SLACK_API_KEY}`,
                                },
                            })
                                .then((res) => res.json())
                                .then((user) => {
                                    return {
                                        name: user.user.name,
                                        body: reply.text,
                                        avatar: user.user.profile.image_72,
                                    }
                                })
                        })
                    )
                }

                const node = {
                    id: createNodeId(`question-${index}`),
                    parent: null,
                    children: [],
                    internal: {
                        type: `Question`,
                        contentDigest: createContentDigest(question),
                    },
                    ...question,
                }
                createNode(node)
            }
        })
}
