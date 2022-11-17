const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const fetch = require('node-fetch')
const slugify = require('slugify')

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId, cache, store }, pluginOptions) => {
    const { apiHost, organizationId } = pluginOptions
    const { createNode, createParentChildLink } = actions

    const getQuestions = async () => {
        const response = await fetch(`${apiHost}/api/questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                organizationId,
                perPage: 1000,
                published: true,
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
            const { body, profile: user, id, subject, created_at } = reply
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
                subject,
                created_at: new Date(created_at),
            }
            createNode(replyNode)
            createParentChildLink({ parent: node, child: replyNode })
        }
    }

    const questions = await getQuestions()

    questions.forEach(({ question: { slug, id, subject, replies, published, resolved, profile_id } }) => {
        const question = {
            slug,
            replies,
            published,
            resolved,
            subject,
            profileId: profile_id,
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
        const { title, github_urls, image } = roadmapItem

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

        if (image) {
            const url = `https://res.cloudinary.com/${image.cloud_name}/v${image.version}/${image.publicId}.${image.format}`

            const fileNode = await createRemoteFileNode({
                url,
                parentNodeId: node.id,
                createNode,
                createNodeId,
                cache,
                store,
            })
            node.thumbnail___NODE = fileNode?.id
        }

        const otherLinks = github_urls.filter((url) => !url.includes('github.com'))
        node.otherLinks = otherLinks
        if (github_urls.length > 0 && process.env.GITHUB_API_KEY) {
            node.githubPages = await Promise.all(
                github_urls
                    .filter((url) => url.includes('github.com'))
                    .map((url) => {
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
                            .then((res) => res.json())
                            .then((data) => {
                                if (data.reactions) {
                                    data.reactions.plus1 = data.reactions['+1']
                                    data.reactions.minus1 = data.reactions['-1']
                                }

                                return data
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

exports.createSchemaCustomization = async ({ actions }) => {
    const { createTypes } = actions

    createTypes(`
        type Question implements Node {
            subject: String
            slug: [String]
            imageURL: String
            replies: [Reply]
            avatar: File @link(from: "avatar___NODE")
        }

        type Reply implements Node {
            avatar: File @link(from: "avatar___NODE")
            fullName: String
            subject: String
        }

        type SqueakTeam {
            name: String,
        }

        type SqueakGitHubReactions {
          hooray: Int,
          heart: Int,
          eyes: Int,
          _1: Int,
          plus1: Int,
          minus1: Int
        }

        type SqueakGitHubPage {
            title: String,
            html_url: String,
            number: Int,
            closed_at: Date,
            reactions: SqueakGitHubReactions,
        }

        type SqueakRoadmap implements Node {
          title: String,
          category: String
          beta_available: Boolean,
          complete: Boolean,
          description: String,
          team: SqueakTeam,
          otherLinks: [String],
          githubPages: [SqueakGitHubPage],
          milestone: Boolean,
          thumbnail: File @link(from: "thumbnail___NODE")
        }
    `)
}
