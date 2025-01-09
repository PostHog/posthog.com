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
                    $and: [
                        {
                            startDate: {
                                $notNull: true,
                            },
                        },
                        {
                            startDate: {
                                $lte: new Date(),
                            },
                        },
                    ],
                },
                pagination: {
                    page,
                    pageSize: 100,
                },
                populate: ['avatar', 'teams', 'leadTeams', 'quotes', 'color'],
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
                profiles: {
                    filters: {
                        $and: [
                            {
                                startDate: {
                                    $notNull: true,
                                },
                            },
                            {
                                startDate: {
                                    $lte: new Date(),
                                },
                            },
                        ],
                    },
                    populate: '*',
                },
                leadProfiles: {
                    filters: {
                        $and: [
                            {
                                startDate: {
                                    $notNull: true,
                                },
                            },
                            {
                                startDate: {
                                    $lte: new Date(),
                                },
                            },
                        ],
                    },
                    fields: 'id',
                },
                crest: true,
                crestOptions: true,
                miniCrest: true,
                teamImage: {
                    populate: {
                        image: true,
                    },
                },
            },
        },
        {
            encodeValuesOnly: true, // prettify URL
        }
    )

    const teams = await fetch(`${apiHost}/api/teams?${teamQuery}`).then((res) => res.json())

    for (const team of teams.data) {
        const { roadmaps, crest, miniCrest, teamImage, ...rest } = team.attributes

        const cloudinaryTeamImage = {
            ...teamImage,
            cloudName: process.env.GATSBY_CLOUDINARY_CLOUD_NAME,
            publicId: teamImage?.image?.data?.attributes?.provider_metadata?.public_id,
            originalHeight: teamImage?.image?.data?.attributes?.height,
            originalWidth: teamImage?.image?.data?.attributes?.width,
            originalFormat: (teamImage?.image?.data?.attributes?.ext || '').replace('.', ''),
        }

        const cloudinaryCrest = {
            ...crest,
            cloudName: process.env.GATSBY_CLOUDINARY_CLOUD_NAME,
            publicId: crest?.data?.attributes?.provider_metadata?.public_id,
            originalHeight: crest?.data?.attributes?.height,
            originalWidth: crest?.data?.attributes?.width,
            originalFormat: (crest?.data?.attributes?.ext || '').replace('.', ''),
        }

        const cloudinaryMiniCrest = {
            ...miniCrest,
            cloudName: process.env.GATSBY_CLOUDINARY_CLOUD_NAME,
            publicId: miniCrest?.data?.attributes?.provider_metadata?.public_id,
            originalHeight: miniCrest?.data?.attributes?.height,
            originalWidth: miniCrest?.data?.attributes?.width,
            originalFormat: (miniCrest?.data?.attributes?.ext || '').replace('.', ''),
        }

        const node = {
            id: createNodeId(`squeak-team-${team.id}`),
            squeakId: team.id,
            internal: {
                type: `SqueakTeam`,
                contentDigest: createContentDigest(team),
            },
            teamImage: cloudinaryTeamImage,
            crest: cloudinaryCrest,
            miniCrest: cloudinaryMiniCrest,
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
                    fields: '*',
                },
                likes: true,
                cta: true,
            },
        })

        const roadmaps = await fetch(`${apiHost}/api/roadmaps?${roadmapQuery}`).then((res) => res.json())

        for (const roadmap of roadmaps.data) {
            const { teams, githubUrls, image, ...rest } = roadmap.attributes

            const cloudinaryMedia = {
                ...image,
                cloudName: process.env.GATSBY_CLOUDINARY_CLOUD_NAME,
                publicId: image?.data?.attributes?.provider_metadata?.public_id,
                originalHeight: image?.data?.attributes?.height,
                originalWidth: image?.data?.attributes?.width,
                originalFormat: (image?.data?.attributes?.ext || '').replace('.', ''),
            }

            const node = {
                squeakId: roadmap.id,
                internal: {
                    type: `SqueakRoadmap`,
                    contentDigest: createContentDigest(roadmap.attributes),
                },
                ...rest,
                media: cloudinaryMedia,
                ...(image.data && {
                    id: createNodeId(`squeak-image-${image.data.id}`),
                    url: image.data.attributes.url,
                }),
                teams: roadmap.attributes.teams.data.map((team) => ({
                    id: createNodeId(`squeak-team-${team.id}`),
                })),
                id: createNodeId(`squeak-roadmap-${roadmap.id}`),
            }

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
            color: String
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
        type SqueakCrestOption {
            textColor: String
            textShadow: String
            fontSize: String
            frame: String
            frameColor: String
            plaque: String
            plaqueColor: String
            imageScale: Int
            imageXOffset: Int
            imageYOffset: Int
        }
        type SqueakTeam implements Node {
            id: ID!
            squeakId: Int!
            name: String!
            roadmaps: [SqueakRoadmap!] @link(by: "id", from: "roadmaps.id")
            emojis: [SlackEmoji] @link(by: "name", from: "emojis")
            crestOptions: SqueakCrestOption
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
            total_count: Int
        }

    `)
}
