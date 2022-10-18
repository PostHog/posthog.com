const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const fetch = require('node-fetch')
const slugify = require('slugify')

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
    questions.forEach(({ question: { slug, id, replies } }) => {
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

    const topics = await fetch(`https://squeak.cloud/api/topics?organizationId=${organizationId}`).then((res) =>
        res.json()
    )

    topics.forEach((topic) => {
        const { label, id } = topic
        const node = {
            id: createNodeId(`squeak-topic-${label}`),
            parent: null,
            children: [],
            internal: {
                type: `SqueakTopic`,
                contentDigest: createContentDigest(topic),
            },
            label: label,
            topicId: id,
            slug: slugify(label, { lower: true }),
        }
        createNode(node)
    })

    const topicGroups = await fetch(`https://squeak.cloud/api/topic-groups?organizationId=${organizationId}`).then(
        (res) => res.json()
    )

    topicGroups.forEach((topicGroup) => {
        const { label, id, topic } = topicGroup

        const node = {
            id: createNodeId(`squeak-topic-group-${label}`),
            parent: null,
            children: [],
            internal: {
                type: `SqueakTopicGroup`,
                contentDigest: createContentDigest(topicGroup),
            },
            label: label,
            topicId: id,
            topics: topic,
            slug: slugify(label, { lower: true }),
        }
        createNode(node)
    })

    const roadmap = await fetch(`https://squeak.cloud/api/roadmap?organizationId=${organizationId}`).then((res) =>
        res.json()
    )

    for (const roadmapItem of roadmap) {
        const { title, github_urls } = roadmapItem
        const node = {
            ...roadmapItem,
            id: createNodeId(`squeak-roadmap-${title}`),
            parent: null,
            children: [],
            internal: {
                type: `SqueakRoadmap`,
                contentDigest: createContentDigest(roadmapItem),
            },
        }
        if (github_urls.length > 0) {
            node.githubPages = await Promise.all(
                github_urls.map((url) => {
                    const split = url.split('/')
                    const type = split[5]
                    const number = split[6]
                    const org = split[3]
                    const repo = split[4]
                    const ghURL = `https://api.github.com/repos/${org}/${repo}/issues/${number}`
                    return fetch(ghURL, {
                        headers: {
                            Authorization: `token ${process.env.GITHUB_API_KEY}`,
                        },
                    })
                        .then((res) => {
                            return res.json()
                        })
                        .catch((err) => console.log(err))
                })
            )
        }
        createNode(node)
    }
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
