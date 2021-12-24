const fetch = require('node-fetch')

module.exports = exports.sourceNodes = async ({ actions, createContentDigest, createNodeId }) => {
    const { createNode } = actions

    if (process.env.WORKABLE_API_KEY) {
        const { jobs } = await fetch('https://posthog.workable.com/spi/v3/jobs?state=published', {
            headers: { Authorization: `Bearer ${process.env.WORKABLE_API_KEY}` },
        }).then((res) => res.json())

        jobs.forEach((job) => {
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
        questions.messages.forEach((message, index) => {
            const { blocks } = message
            const blockIds = [
                'question_author',
                'question_avatar',
                'question_slug',
                'question_body',
                'answer_author',
                'answer_body',
            ]
            const question = {}
            blocks.forEach((block) => {
                if (blockIds.includes(block.block_id) && block.text) {
                    question[block.block_id] =
                        block.text.type === 'mrkdwn' ? block.text.text : block.text.text.split(': ')[1]
                }
            })
            if (Object.keys(question).length > 0 && blockIds.every((id) => question[id])) {
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
