import { GatsbyNode } from 'gatsby'
import fetch from 'node-fetch'
import qs from 'qs'

export const sourceNodes: GatsbyNode['sourceNodes'] = async (
    { actions, createContentDigest, createNodeId, cache },
    pluginOptions
) => {
    const { apiHost } = pluginOptions
    const { createNode, createParentChildLink } = actions

    // Fetch all profiles
    let page = 1
    while (true) {
        let profileQuery = qs.stringify(
            {
                pagination: {
                    page,
                    pageSize: 100,
                },
                populate: ['avatar'],
            },
            {
                encodeValuesOnly: true, // prettify URL
            }
        )

        const profiles = await fetch(`${apiHost}/api/profiles?${profileQuery}`).then((res) => res.json())

        for (const profile of profiles.data) {
            const { avatar, ...profileData } = profile.attributes

            createNode({
                type: `SqueakProfile`,
                id: createNodeId(`squeak-profile-${profile.id}`),
                squeakId: profile.id,
                internal: {
                    contentDigest: createContentDigest(profileData),
                    type: `SqueakProfile`,
                },
                avatar: avatar.data?.attributes,
                ...profileData,
            })

            /*async function createImageNode(imageURL) {
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
            }*/
        }

        if (profiles.meta.pagination.page >= profiles.meta.pagination.pageCount) {
            break
        }
        page++
    }

    // Fetch all questions
    page = 1
    while (true) {
        let questionQuery = qs.stringify({
            pagination: {
                page,
                pageSize: 100,
            },
            populate: {
                profile: {
                    fields: ['id'],
                },
                replies: {
                    populate: {
                        profile: {
                            fields: ['id'],
                        },
                    },
                },
                topics: {
                    fields: ['id'],
                },
            },
        })

        const questions = await fetch(`${apiHost}/api/questions?${questionQuery}`).then((res) => res.json())

        for (let question of questions.data) {
            const { topics, replies, profile, ...rest } = question.attributes

            createNode({
                type: `SqueakQuestion`,
                id: createNodeId(`squeak-question-${question.id}`),
                internal: {
                    contentDigest: createContentDigest(question),
                    type: `SqueakQuestion`,
                },
                squeakId: question.id,
                ...(profile.data && { profile: { id: createNodeId(`squeak-profile-${profile.data.id}`) } }),
                replies: replies.data.map((reply) => ({
                    id: createNodeId(`squeak-reply-${reply.id}`),
                })),
                topics: topics.data.map((topic) => ({
                    id: createNodeId(`squeak-topic-${topic.id}`),
                })),
                ...rest,
            })

            for (let reply of replies.data) {
                const { profile, ...replyData } = reply.attributes

                createNode({
                    type: `SqueakReply`,
                    id: createNodeId(`squeak-reply-${reply.id}`),
                    squeakId: reply.id,
                    internal: {
                        contentDigest: createContentDigest(replyData.body),
                        type: `SqueakReply`,
                        content: replyData.body,
                        mediaType: 'text/markdown',
                    },
                    ...(profile.data && { profile: { id: createNodeId(`squeak-profile-${profile.data.id}`) } }),
                    ...replyData,
                })
            }
        }

        if (questions.meta.pagination.page >= questions.meta.pagination.pageCount) {
            break
        }
        page++
    }

    // Fetch all topic groups
    let query = qs.stringify({
        populate: {
            topics: {
                fields: ['id'],
            },
        },
    })

    const topicGroups = await fetch(`${apiHost}/api/topic-groups?${query}`).then((res) => res.json())

    topicGroups.data.forEach((topicGroup) => {
        const { topics, ...rest } = topicGroup.attributes

        const node = {
            id: createNodeId(`squeak-topic-group-${topicGroup.id}`),
            internal: {
                type: `SqueakTopicGroup`,
                contentDigest: createContentDigest(topicGroup),
            },
            ...rest,
            topics: topics.data.map((topic) => ({
                id: createNodeId(`squeak-topic-${topic.id}`),
            })),
        }
        createNode(node)
    })

    // Fetch all topics
    let topicQuery = qs.stringify(
        {
            pagination: {
                page: 1,
                pageSize: 100,
            },
        },
        {
            encodeValuesOnly: true, // prettify URL
        }
    )

    const topics = await fetch(`${apiHost}/api/topics?${topicQuery}`).then((res) => res.json())

    for (const topic of topics.data) {
        createNode({
            id: createNodeId(`squeak-topic-${topic.id}`),
            squeakId: topic.id,
            internal: {
                type: `SqueakTopic`,
                contentDigest: createContentDigest(topic),
            },
            ...topic.attributes,
        })
    }

    const roadmaps = await fetch(`${apiHost}/api/roadmaps`).then((res) => res.json())

    for (const roadmap of roadmaps.data) {
        const {
            attributes: { githubUrls },
        } = roadmap

        const node = {
            id: createNodeId(`squeak-roadmap-${roadmap.id}`),
            parent: null,
            children: [],
            internal: {
                type: `SqueakRoadmap`,
                contentDigest: createContentDigest(roadmap.attributes),
            },
            ...roadmap.attributes,
        }

        /*if (image) {
            const url = `https://res.cloudinary.com/${image.cloud_name}/v${image.version}/${image.publicId}.${image.format}`

            const fileNode = await createRemoteFileNode({
                url,
                parentNodeId: node.id,
                createNode,
                createNodeId,
                cache,
            })
            node.thumbnail___NODE = fileNode?.id
        }*/

        const otherLinks = githubUrls.filter((url) => !url.includes('github.com'))
        node.otherLinks = otherLinks
        if (githubUrls.length > 0 && process.env.GITHUB_API_KEY) {
            node.githubPages = await Promise.all(
                githubUrls
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

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = async ({ actions }) => {
    const { createTypes } = actions

    createTypes(`
        type SqueakProfile implements Node {
            id: ID!
            squeakId: String!
            firstName: String
            lastName: String
        }

        type SqueakQuestion implements Node {
            id: ID!
            squeakId: String!
            body: String!
            createdAt: Date! @dateformat
            updatedAt: Date! @dateformat
            profile: SqueakProfile
            replies: [SqueakReply!] @link(by: "id", from: "replies.id")
            topics: [SqueakTopic!] @link(by: "id", from: "topics.id")
        }

        type SqueakReply implements Node {
            id: ID!
            squeakId: String!
            body: String!
            createdAt: Date! @dateformat
            updatedAt: Date! @dateformat
            profile: SqueakProfile
            question: SqueakQuestion! @link(from: "id", to: "question")
        }

        type SqueakTopicGroup implements Node {
            id: ID!
            squeakId: String!
            slug: String!
            label: String!
            topics: [SqueakTopic!] @link(by: "id", from: "topics.id")
        }

        type SqueakTopic implements Node {
            id: ID!
            squeakId: String!
            slug: String!
            label: String!
        }
    `)
}
