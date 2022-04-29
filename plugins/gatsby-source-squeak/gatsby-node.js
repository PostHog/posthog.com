const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const fetch = require('node-fetch')

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId }, pluginOptions) => {
    const { apiHost, organizationId } = pluginOptions
    const { createNode, createParentChildLink } = actions
    const getQuestions = async () => {
        const response = await fetch(`${apiHost}/api/questions`, {
            method: 'POST',
            body: JSON.stringify({
                organizationId,
                slug: null,
                published: true,
                perPage: 1000,
            }),
        })

        if (response.status !== 200) {
            return []
        }

        const { questions } = await response.json()

        return questions
    }
    const createReplies = (node, replies) => {
        for (const reply of replies) {
            const { body, profile: user, id, created_at } = reply
            const replyId = createNodeId(`reply-${id}`)
            const replyNode = {
                id: replyId,
                parent: null,
                children: [],
                internal: {
                    type: `Reply`,
                    contentDigest: createContentDigest(body),
                    content: body,
                    mediaType: 'text/markdown',
                },
                name: user?.first_name || 'Anonymous',
                imageURL: user?.avatar,
                created_at: new Date(created_at),
            }
            createNode(replyNode)
            createParentChildLink({ parent: node, child: replyNode })
        }
    }
    const questions = await getQuestions()
    questions.forEach(({ question: { slug, id }, replies }) => {
        const question = {
            slug,
            replies,
        }
        const node = {
            id: createNodeId(`question-${id}`),
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

exports.onCreateNode = async ({ node, actions, store, cache, createNodeId }) => {
    const { createNode } = actions
    if (node.internal.type === 'Reply') {
        async function createImageNode(imageURL) {
            return createRemoteFileNode({
                url: imageURL,
                parentNodeId: node.id,
                createNode,
                createNodeId,
                cache,
                store,
            }).catch((e) => console.error(e))
        }
        if (node.imageURL) {
            const imageNode = await createImageNode(node.imageURL)
            node.avatar___NODE = imageNode && imageNode.id
        }
    }
}
