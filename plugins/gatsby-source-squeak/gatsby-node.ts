import { GatsbyNode } from 'gatsby'

import qs from 'qs'
import pLimit from 'p-limit'
import authors from '../../src/data/authors.json'

const authorProfileIds = authors.filter((a) => a.profile_id).map((a) => a.profile_id)

export const sourceNodes: GatsbyNode['sourceNodes'] = async (
    { actions, createContentDigest, createNodeId, cache },
    pluginOptions
) => {
    const { apiHost } = pluginOptions
    const { createNode } = actions

    // Fetch all profiles (active team members + any author with a profile_id)
    let page = 1
    while (true) {
        let profileQuery = qs.stringify(
            {
                filters: {
                    $or: [
                        {
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
                        {
                            id: {
                                $in: authorProfileIds,
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
                tagline: true,
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

    // Roadmap vote counts come from GitHub issues. Fetch them with batched GraphQL queries: one
    // REST call per issue was ~950 calls per build, most of the token's hourly limit, and one
    // dropped connection put null in the non-nullable githubPages and failed the build.
    const isGitHubUrl = (url: string) => new URL(url).hostname === 'github.com'
    const fetchGitHubPages = async (urls: string[]) => {
        const byRepo = new Map<string, { url: string; number: string }[]>()
        for (const url of new Set(urls)) {
            const [owner, repo, , segment] = url.split('/').slice(3)
            // Some URLs carry a #comment anchor or a comma-joined list; REST read the leading number
            const number = segment?.match(/^\d+/)?.[0]
            if (!number) continue
            byRepo.set(`${owner}/${repo}`, [...(byRepo.get(`${owner}/${repo}`) || []), { url, number }])
        }

        const chunks = [...byRepo].flatMap(([repo, issues]) =>
            Array.from({ length: Math.ceil(issues.length / 50) }, (_, i) => ({
                repo,
                issues: issues.slice(i * 50, i * 50 + 50),
            }))
        )
        const fields = 'title url number closedAt reactionGroups { content reactors { totalCount } }'
        const pages = new Map<string, Record<string, any>>()
        const limit = pLimit(4)

        await Promise.all(
            chunks.map(({ repo, issues }) =>
                limit(async () => {
                    const [owner, name] = repo.split('/')
                    const selections = issues
                        .map(
                            ({ number }, i) =>
                                `i${i}: issueOrPullRequest(number: ${number}) { ... on Issue { ${fields} } ... on PullRequest { ${fields} } }`
                        )
                        .join('\n')
                    const query = `query { repository(owner: ${JSON.stringify(owner)}, name: ${JSON.stringify(
                        name
                    )}) { ${selections} } }`

                    for (let attempt = 1; ; attempt++) {
                        try {
                            const response = await fetch('https://api.github.com/graphql', {
                                method: 'POST',
                                headers: {
                                    Authorization: `Bearer ${process.env.GITHUB_API_KEY}`,
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ query }),
                            })
                            if (!response.ok) throw new Error(`GitHub GraphQL responded ${response.status}`)
                            // Issues that no longer exist come back as null with a NOT_FOUND error
                            const { data } = await response.json()
                            if (!data) throw new Error('GitHub GraphQL returned no data')

                            issues.forEach(({ url }, i) => {
                                const issue = data.repository?.[`i${i}`]
                                if (!issue) return
                                const count = (content: string) =>
                                    issue.reactionGroups.find((group) => group.content === content)?.reactors
                                        .totalCount || 0
                                pages.set(url, {
                                    title: issue.title,
                                    html_url: issue.url,
                                    number: issue.number,
                                    closed_at: issue.closedAt,
                                    reactions: {
                                        total_count: issue.reactionGroups.reduce(
                                            (sum, group) => sum + group.reactors.totalCount,
                                            0
                                        ),
                                        plus1: count('THUMBS_UP'),
                                        minus1: count('THUMBS_DOWN'),
                                        hooray: count('HOORAY'),
                                        heart: count('HEART'),
                                        eyes: count('EYES'),
                                    },
                                })
                            })
                            return
                        } catch (error) {
                            if (attempt >= 3) {
                                console.warn(`Failed to fetch GitHub issues for ${repo}: ${error.message}`)
                                return
                            }
                            await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000 * 2 ** attempt))
                        }
                    }
                })
            )
        )

        return pages
    }

    // Fetch all roadmaps
    const roadmaps = []
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

        const response = await fetch(`${apiHost}/api/roadmaps?${roadmapQuery}`).then((res) => res.json())
        roadmaps.push(...response.data)

        if (response.meta.pagination.page < response.meta.pagination.pageCount) {
            await fetchRoadmaps(page + 1)
        }
    }

    await fetchRoadmaps()

    const githubPages =
        process.env.GITHUB_API_KEY && process.env.GATSBY_MINIMAL !== 'true'
            ? await fetchGitHubPages(
                  roadmaps.flatMap((roadmap) => (roadmap.attributes.githubUrls || []).filter(isGitHubUrl))
              )
            : null

    for (const roadmap of roadmaps) {
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
            // A missing or failed issue keeps an empty slot, as a 404 did before
            githubPages: githubPages
                ? (githubUrls || []).filter(isGitHubUrl).map((url) => githubPages.get(url) || {})
                : [],
        }

        createNode(node)
    }
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = async ({ actions }) => {
    const { createTypes } = actions

    createTypes(`
        type StrapiImage implements Node {
            id: ID!
            url: String!
        }

        type SqueakProfileAvatarFormats {
            thumbnail: SqueakProfileAvatarFormat
            small: SqueakProfileAvatarFormat
            medium: SqueakProfileAvatarFormat
            large: SqueakProfileAvatarFormat
        }

        type SqueakProfileAvatarFormat {
            url: String
            width: Int
            height: Int
        }

        type SqueakProfileAvatar {
            url: String
            formats: SqueakProfileAvatarFormats
            alternativeText: String
            caption: String
            width: Int
            height: Int
            mime: String
        }

        type SqueakProfile implements Node {
            id: ID!
            squeakId: Int!
            firstName: String
            lastName: String
            color: String
            avatar: SqueakProfileAvatar
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

        type SqueakTeamCrestDataAttributes {
            url: String
            width: Int
            height: Int
            mime: String
            alternativeText: String
        }

        type SqueakTeamCrestData {
            id: ID
            attributes: SqueakTeamCrestDataAttributes
        }

        type SqueakTeamCrest {
            cloudName: String
            publicId: String
            originalHeight: Int
            originalWidth: Int
            originalFormat: String
            url: String
            data: SqueakTeamCrestData
        }

        type SqueakTeamMiniCrestDataAttributes {
            url: String
            width: Int
            height: Int
            mime: String
            alternativeText: String
        }

        type SqueakTeamMiniCrestData {
            id: ID
            attributes: SqueakTeamMiniCrestDataAttributes
        }

        type SqueakTeamMiniCrest {
            cloudName: String
            publicId: String
            originalHeight: Int
            originalWidth: Int
            originalFormat: String
            url: String
            data: SqueakTeamMiniCrestData
        }

        type SqueakTeamImageDataAttributes {
            url: String
            width: Int
            height: Int
            mime: String
            alternativeText: String
        }

        type SqueakTeamImageData {
            id: ID
            attributes: SqueakTeamImageDataAttributes
        }

        type SqueakTeamImage {
            cloudName: String
            publicId: String
            originalHeight: Int
            originalWidth: Int
            originalFormat: String
            url: String
            data: SqueakTeamImageData
        }

        type SqueakTeamProfilesDataAttributesAvatarDataAttributes {
            url: String
            width: Int
            height: Int
            mime: String
            alternativeText: String
        }

        type SqueakTeamProfilesDataAttributesAvatarData {
            id: ID
            attributes: SqueakTeamProfilesDataAttributesAvatarDataAttributes
        }

        type SqueakTeamProfilesDataAttributesAvatar {
            data: SqueakTeamProfilesDataAttributesAvatarData
        }

        type SqueakTeamProfilesDataAttributesLeadTeamsDataAttributes {
            name: String
        }

        type SqueakTeamProfilesDataAttributesLeadTeamsData {
            id: ID
            attributes: SqueakTeamProfilesDataAttributesLeadTeamsDataAttributes
        }

        type SqueakTeamProfilesDataAttributesLeadTeams {
            data: [SqueakTeamProfilesDataAttributesLeadTeamsData]
        }

        type SqueakTeamProfilesDataAttributes {
            firstName: String
            lastName: String
            companyRole: String
            country: String
            location: String
            startDate: Date @dateformat
            pineappleOnPizza: Boolean
            avatar: SqueakTeamProfilesDataAttributesAvatar
            leadTeams: SqueakTeamProfilesDataAttributesLeadTeams
            color: String
        }

        type SqueakTeamProfilesData {
            id: ID
            attributes: SqueakTeamProfilesDataAttributes
        }

        type SqueakTeamProfiles {
            data: [SqueakTeamProfilesData]
        }

        type SqueakTeam implements Node {
            id: ID!
            squeakId: Int!
            name: String!
            roadmaps: [SqueakRoadmap!] @link(by: "id", from: "roadmaps.id")
            emojis: [SlackEmoji] @link(by: "name", from: "emojis")
            crestOptions: SqueakCrestOption
            crest: SqueakTeamCrest
            miniCrest: SqueakTeamMiniCrest
            teamImage: SqueakTeamImage
            profiles: SqueakTeamProfiles
        }

        type SqueakRoadmapMediaDataAttributes {
            url: String
            width: Int
            height: Int
            mime: String
            alternativeText: String
        }

        type SqueakRoadmapMediaData {
            id: ID
            attributes: SqueakRoadmapMediaDataAttributes
        }

        type SqueakRoadmapMedia {
            cloudName: String
            publicId: String
            originalHeight: Int
            originalWidth: Int
            originalFormat: String
            mime: String
            url: String
            data: SqueakRoadmapMediaData
        }

        type RoadmapProfilesDataAttributesAvatarDataAttributes {
            url: String
            width: Int
            height: Int
            mime: String
            alternativeText: String
        }

        type RoadmapProfilesDataAttributesAvatarData {
            id: ID
            attributes: RoadmapProfilesDataAttributesAvatarDataAttributes
        }

        type RoadmapProfilesDataAttributesAvatar {
            data: RoadmapProfilesDataAttributesAvatarData
        }

        type RoadmapProfilesDataAttributesTeamsDataAttributesMiniCrestDataAttributes {
            url: String
            width: Int
            height: Int
            mime: String
            alternativeText: String
        }

        type RoadmapProfilesDataAttributesTeamsDataAttributesMiniCrestData {
            id: ID
            attributes: RoadmapProfilesDataAttributesTeamsDataAttributesMiniCrestDataAttributes
        }

        type RoadmapProfilesDataAttributesTeamsDataAttributesMiniCrest {
            data: RoadmapProfilesDataAttributesTeamsDataAttributesMiniCrestData
        }

        type RoadmapProfilesDataAttributesTeamsDataAttributes {
            name: String
            miniCrest: RoadmapProfilesDataAttributesTeamsDataAttributesMiniCrest
        }

        type RoadmapProfilesDataAttributesTeamsData {
            id: ID
            attributes: RoadmapProfilesDataAttributesTeamsDataAttributes
        }

        type RoadmapProfilesDataAttributesTeams {
            data: [RoadmapProfilesDataAttributesTeamsData]
        }

        type RoadmapProfilesDataAttributes {
            firstName: String
            lastName: String
            avatar: RoadmapProfilesDataAttributesAvatar
            color: String
            teams: RoadmapProfilesDataAttributesTeams
        }

        type RoadmapProfilesData {
            id: ID
            attributes: RoadmapProfilesDataAttributes
        }

        type RoadmapProfiles {
            data: [RoadmapProfilesData]
        }

        type RoadmapTeamsDataAttributesMiniCrestDataAttributes {
            url: String
            width: Int
            height: Int
            mime: String
            alternativeText: String
        }

        type RoadmapTeamsDataAttributesMiniCrestData {
            id: ID
            attributes: RoadmapTeamsDataAttributesMiniCrestDataAttributes
        }

        type RoadmapTeamsDataAttributesMiniCrest {
            data: RoadmapTeamsDataAttributesMiniCrestData
        }

        type RoadmapTeamsDataAttributes {
            name: String
            miniCrest: RoadmapTeamsDataAttributesMiniCrest
        }

        type RoadmapTeamsData {
            id: ID
            attributes: RoadmapTeamsDataAttributes
        }

        type RoadmapTeams {
            data: [RoadmapTeamsData]
        }

        type EmojiReactionProfilesData {
            id: ID
        }

        type EmojiReactionProfiles {
            data: [EmojiReactionProfilesData]
        }

        type EmojiReaction {
            emoji: String
            profiles: EmojiReactionProfiles
        }

        type SqueakRoadmap implements Node {
            id: ID!
            squeakId: Int!
            title: String!
            description: String!
            image: StrapiImage
            media: SqueakRoadmapMedia
            tagline: String!
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
            profiles: RoadmapProfiles
            emojiReactions: [EmojiReaction]
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
