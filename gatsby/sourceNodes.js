const fetch = require('node-fetch')
const uniqBy = require('lodash.uniqby')
const { createClient } = require('@supabase/supabase-js')

module.exports = exports.sourceNodes = async ({ actions, createContentDigest, createNodeId }) => {
    const { createNode } = actions

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
                        question.imageURL = block.accessory.image_url
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
                const replies = await getReplies(message.thread_ts, process.env.SLACK_QUESTION_CHANNEL)
                question.replies = replies.slice(1)
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

    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY)
    const { data, error } = await supabase.from('Messages').select('slack_timestamp, slug, slack_channel')
    if (data && data.length > 0) {
        const messages = await Promise.all(
            data
                .filter(({ slug }) => slug)
                .map(({ slug, slack_timestamp, slack_channel }) => {
                    return getReplies(slack_timestamp, slack_channel).then((replies) => ({
                        slug: slug.split(',').map((slug) => slug.trim()),
                        replies,
                    }))
                })
        )
        messages.length > 0 &&
            messages.forEach(({ slug, replies }, index) => {
                if (!replies) return
                const question = {
                    ...replies[0],
                    slug,
                    replies: replies[1] && replies.slice(1),
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
            })
    }

    async function getReplies(ts, channel) {
        const replies =
            ts &&
            (
                await fetch(`https://slack.com/api/conversations.replies?ts=${ts}&channel=${channel}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.SLACK_API_KEY}`,
                    },
                }).then((res) => res.json())
            ).messages
        if (replies) {
            return await Promise.all(
                replies.map((reply) => {
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
                                imageURL: user.user.profile.image_72,
                            }
                        })
                })
            )
        }
    }
}
