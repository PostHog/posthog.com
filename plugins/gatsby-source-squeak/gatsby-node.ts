import { GatsbyNode } from 'gatsby'
import fetch from 'node-fetch'
import qs from 'qs'

export const sourceNodes: GatsbyNode['sourceNodes'] = async (
    { actions, createContentDigest, createNodeId, cache },
    pluginOptions
) => {
    const { apiHost } = pluginOptions
    const { createNode } = actions

    // Fetch all profiles
    let page = 1
    while (true) {
        let profileQuery = qs.stringify(
            {
                filters: {
                    teams: {
                        id: {
                            $notNull: true,
                        },
                    },
                },
                pagination: {
                    page,
                    pageSize: 100,
                },
                populate: ['avatar', 'teams', 'leadTeams'],
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

            if (!profile.data?.id) {
                console.warn(`Question ${question.id} has no profile`)
                continue
            }

            const filteredReplies = replies.data.filter((reply) => reply.attributes.profile.data?.id)

            createNode({
                type: `SqueakQuestion`,
                id: createNodeId(`squeak-question-${question.id}`),
                squeakId: question.id,
                internal: {
                    contentDigest: createContentDigest(question),
                    type: `SqueakQuestion`,
                },
                ...(profile.data && { profile: { id: createNodeId(`squeak-profile-${profile.data.id}`) } }),
                replies: filteredReplies.map((reply) => ({
                    id: createNodeId(`squeak-reply-${reply.id}`),
                })),
                topics: topics.data.map((topic) => ({
                    id: createNodeId(`squeak-topic-${topic.id}`),
                })),
                ...rest,
            })

            for (let reply of filteredReplies) {
                const { profile, ...replyData } = reply.attributes

                createNode({
                    type: `SqueakReply`,
                    id: createNodeId(`squeak-reply-${reply.id}`),
                    squeakId: reply.id,
                    internal: {
                        contentDigest: createContentDigest(replyData.body),
                        type: `SqueakReply`,
                        content: replyData.body,
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

    // Fetch all teams
    let teamQuery = qs.stringify(
        {
            pagination: {
                page: 1,
                pageSize: 100,
            },
            populate: {
                roadmaps: {
                    fields: ['id'],
                },
            },
        },
        {
            encodeValuesOnly: true, // prettify URL
        }
    )

    const teams = await fetch(`${apiHost}/api/teams?${teamQuery}`).then((res) => res.json())

    for (const team of teams.data) {
        const { roadmaps, ...rest } = team.attributes
        const node = {
            id: createNodeId(`squeak-team-${team.id}`),
            squeakId: team.id,
            internal: {
                type: `SqueakTeam`,
                contentDigest: createContentDigest(team),
            },
            ...rest,
            roadmaps: roadmaps.data.map((roadmap) => ({
                id: createNodeId(`squeak-roadmap-${roadmap.id}`),
            })),
        }

        createNode(node)
    }

    // Fetch all roadmaps
    const fetchRoadmaps = async (page = 1) => {
        let roadmapQuery = qs.stringify({
            pagination: {
                page,
                pageSize: 100,
            },
            populate: {
                teams: {
                    fields: ['id'],
                },
                image: {
                    fields: ['id', 'url'],
                },
                cta: true,
            },
        })

        const roadmaps = await fetch(`${apiHost}/api/roadmaps?${roadmapQuery}`).then((res) => res.json())

        for (const roadmap of roadmaps.data) {
            const { teams, githubUrls, image, ...rest } = roadmap.attributes

            const node = {
                squeakId: roadmap.id,
                internal: {
                    type: `SqueakRoadmap`,
                    contentDigest: createContentDigest(roadmap.attributes),
                },
                ...rest,
                ...(image.data && {
                    id: createNodeId(`squeak-image-${image.data.id}`),
                    url: image.data.attributes.url,
                }),
                teams: roadmap.attributes.teams.data.map((team) => ({
                    id: createNodeId(`squeak-team-${team.id}`),
                })),
                id: createNodeId(`squeak-roadmap-${roadmap.id}`),
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

            if (githubUrls?.length > 0 && process.env.GITHUB_API_KEY) {
                node.githubPages = await Promise.all(
                    githubUrls
                        .filter((url) => url.includes('github.com'))
                        .map((url) => {
                            const [owner, repo, type, issueNum] = url.split('/').slice(3)
                            const ghURL = `https://api.github.com/repos/${owner}/${repo}/issues/${issueNum}`

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
            } else {
                node.githubPages = []
            }

            createNode(node)
        }
        if (roadmaps.meta.pagination.page < roadmaps.meta.pagination.pageCount) {
            await fetchRoadmaps(page + 1)
        }
    }

    await fetchRoadmaps()
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = async ({ actions }) => {
    const { createTypes } = actions

    createTypes(`
        type StrapiImage implements Node {
            id: ID!
            url: String!
        }

        type SqueakProfile implements Node {
            id: ID!
            squeakId: Int!
            firstName: String
            lastName: String
        }

        type SqueakQuestion implements Node {
            id: ID!
            squeakId: Int!
            body: String!
            createdAt: Date! @dateformat
            profile: SqueakProfile! @link(by: "id", from: "profile.id")
            replies: [SqueakReply!] @link(by: "id", from: "replies.id")
            topics: [SqueakTopic!] @link(by: "id", from: "topics.id")
        }

        type SqueakReply implements Node {
            id: ID!
            squeakId: Int!
            body: String!
            createdAt: Date! @dateformat
            profile: SqueakProfile! @link(by: "id", from: "profile.id")
            question: SqueakQuestion! @link(from: "id", to: "question")
        }

        type SqueakTopicGroup implements Node {
            id: ID!
            squeakId: Int!
            slug: String
            label: String!
            topics: [SqueakTopic!] @link(by: "id", from: "topics.id")
        }

        type SqueakTopic implements Node {
            id: ID!
            squeakId: Int!
            slug: String!
            label: String!
        }

        type SqueakTeam implements Node {
            id: ID!
            squeakId: Int!
            name: String!
            profiles: [SqueakProfile!] @link(by: "id", from: "profiles.id")
            roadmaps: [SqueakRoadmap!] @link(by: "id", from: "roadmaps.id")
        }

        type SqueakRoadmap implements Node {
            id: ID!
            squeakId: Int!
            title: String!
            description: String!
            image: StrapiImage
            slug: String!
            dateCompleted: Date @dateformat
            projectedCompletion: Date @dateformat
            category: String!
            milestone: Boolean!
            completed: Boolean!
            betaAvailable: Boolean!
            githubUrls: [String!]!
            githubPages: [GithubPage!]!
            teams: [SqueakTeam!] @link(by: "id", from: "teams.id")
        }

        type GithubPage {
            title: String
            html_url: String
            number: String
            closed_at: String
            reactions: GithubReactions
        }

        type GithubReactions {
            hooray: Int
            heart: Int
            eyes: Int
            plus1: Int
            minus1: Int
        }

    `)
}
