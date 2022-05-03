const fetch = require('node-fetch')
const uniqBy = require('lodash.uniqby')
const { MenuBuilder } = require('redoc')
const { createClient } = require('@supabase/supabase-js')
const xss = require('xss')

module.exports = exports.sourceNodes = async ({ actions, createContentDigest, createNodeId }) => {
    const { createNode, createParentChildLink } = actions

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
    if (process.env.SLACK_API_KEY && process.env.SLACK_QUESTION_CHANNEL) {
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
                const question = {}
                const reply = { ts: message.ts }
                const blockIds = {
                    name_and_slug: (block) => {
                        const split = block.text.text.split(' on ')
                        reply.name = split[0]
                        question.slug = split[1].split(',').map((slug) => slug.trim())
                    },
                    question: (block) => {
                        reply.rawBody = block.text.text
                        if (block.accessory) {
                            reply.imageURL = block.accessory.image_url
                        }
                    },
                    subject: (block) => {
                        reply.subject = block.text.text
                    },
                }

                blocks.forEach((block) => {
                    const blockId = block.block_id
                    if (blockIds[blockId] && block.text) {
                        blockIds[blockId](block)
                    }
                })

                if (Object.keys(question).length > 0) {
                    const replies = await getReplies(
                        message.thread_ts,
                        process.env.SLACK_QUESTION_CHANNEL,
                        process.env.SLACK_API_KEY,
                        false
                    )
                    question.replies = [reply, ...(replies || [])?.slice(1)]
                    const node = {
                        id: createNodeId(`question-${message.thread_ts}`),
                        parent: null,
                        children: [],
                        internal: {
                            type: `Question`,
                            contentDigest: createContentDigest(question),
                        },
                        ...question,
                    }
                    createNode(node)
                    createReplies(node, question.replies)
                }
            })
    } else {
        const ts = new Date()
        const questionNode = {
            id: createNodeId(`question-${ts}`),
            parent: null,
            children: [],
            internal: {
                type: `Question`,
                contentDigest: createContentDigest(ts + ''),
            },
            ts,
        }
        createNode(questionNode)
        const replyNode = {
            id: createNodeId(`reply-${ts}`),
            parent: null,
            children: [],
            internal: {
                type: `Reply`,
                contentDigest: createContentDigest(ts + ''),
                content: ts + '',
                mediaType: 'text/markdown',
            },
            ts,
        }
        createNode(replyNode)
        createParentChildLink({ parent: questionNode, child: replyNode })
    }

    if (process.env.SUPABASE_API_KEY && process.env.SUPABASE_URL) {
        const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY)
        const { data, error } = await supabase.from('Messages').select('slack_timestamp, slug, slack_channel')
        if (data && data.length > 0) {
            const messages = await Promise.all(
                data
                    .filter(({ slug }) => slug)
                    .map(({ slug, slack_timestamp, slack_channel }) => {
                        return getReplies(slack_timestamp, slack_channel, process.env.SLACK_USERS_API_KEY, true).then(
                            (replies) => ({
                                slug: slug.split(',').map((slug) => slug.trim()),
                                replies,
                                slack_timestamp,
                            })
                        )
                    })
            )
            messages.length > 0 &&
                messages.forEach(({ slug, replies, slack_timestamp }) => {
                    const question = {
                        slug,
                        replies,
                    }
                    const node = {
                        id: createNodeId(`question-${slack_timestamp}`),
                        parent: null,
                        children: [],
                        internal: {
                            type: `Question`,
                            contentDigest: createContentDigest(question),
                        },
                        ...question,
                    }
                    createNode(node)
                    replies && createReplies(node, replies)
                })
        }
    }

    function createReplies(node, replies) {
        for (reply of replies) {
            const { rawBody, name, imageURL, ts, fullName, subject } = reply
            const replyId = createNodeId(`reply-${ts}`)
            const replyNode = {
                id: replyId,
                parent: null,
                children: [],
                internal: {
                    type: `Reply`,
                    contentDigest: createContentDigest(rawBody),
                    content: rawBody,
                    mediaType: 'text/markdown',
                },
                name,
                imageURL,
                fullName,
                subject,
                ts: new Date(ts * 1000),
            }
            createNode(replyNode)
            createParentChildLink({ parent: node, child: replyNode })
        }
    }

    async function getReplies(ts, channel, apiKey, format) {
        const replies =
            ts &&
            (
                await fetch(`https://slack.com/api/conversations.replies?ts=${ts}&channel=${channel}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${apiKey}`,
                    },
                }).then((res) => res.json())
            ).messages
        if (replies) {
            return await Promise.all(
                replies.map((reply) => {
                    return fetch(`https://slack.com/api/users.info?user=${reply.user}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${apiKey}`,
                        },
                    })
                        .then((res) => res.json())
                        .then(async (user) => {
                            const rawBody =
                                format && reply.blocks
                                    ? await formatSlackElements(reply.blocks[0].elements, apiKey)
                                    : reply.text
                            return {
                                name: user?.user?.profile?.first_name || user?.user?.name,
                                rawBody,
                                imageURL: user?.user?.profile?.image_72,
                                ts: reply.ts,
                                fullName: user?.user?.profile?.real_name,
                            }
                        })
                })
            )
        }
    }
}

async function formatSlackElements(elements, apiKey) {
    const types = {
        text: (el) => {
            return el.style?.code ? '`' + el.text + '`' : el.text
        },
        user: async (el) => {
            const user = await fetch(`https://slack.com/api/users.info?user=${el.user_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
            }).then((res) => res.json())
            return user?.user?.profile?.first_name || user?.user?.name
        },
        link: (el) => {
            return `[${el.text || el.url}](${el.url})`
        },
        emoji: (el) => {
            return ''
        },
    }
    const message = []
    for (el of elements) {
        if (el.type === 'rich_text_preformatted') {
            el.elements.forEach((el) => {
                message.push('```shell\n' + el.text + '\n```')
            })
        } else if (el.type === 'rich_text_list') {
            const { style } = el
            el.elements.forEach((el, index) => {
                message.push(`${style === 'ordered' ? index + 1 + '.' : '-'} ${el.elements[0].text}\n`)
            })
        } else {
            for (el of el.elements) {
                const formatted = await types[el.type](el)
                message.push(formatted)
            }
        }
    }
    const options = {
        whiteList: {},
        stripIgnoreTag: true,
    }
    return xss(message.join(''), options)
}
