// Build-time data for views that need page-specific data:
// /changelog, /self-driving, /merch, /research, and /wip. Each function returns the `data` prop
// its view reads; src/lib/routes/viewData.ts maps the view modules to them.
import { nodes } from '../../data-layer'
import { getContent, contentBySlug, excerpt } from '../../data-layer/content'
import { imageData, imageNode, isCloudinaryUrl } from '../../data-layer/images'
import type {
    AshbyJobPostingNode,
    AuthorsJsonNode,
    ChangelogVideoNode,
    RoadmapNode,
    SelfDrivingPullRequestNode,
    ShopifyCollectionNode,
    ShopifyProductNode,
    SqueakProfileNode,
    SqueakTeamNode,
} from '../../data-layer/types'

type Media = { data?: { attributes?: { url?: string } } | null } | null | undefined
type Relation<T> = { data?: T[] | null } | null | undefined

const urlOnly = (media: Media) => ({ data: { attributes: { url: media?.data?.attributes?.url } } })

const byKey =
    <T>(key: (item: T) => string | null | undefined, direction: 1 | -1 = 1) =>
    (a: T, b: T) => {
        const x = key(a) ?? ''
        const y = key(b) ?? ''
        return (x < y ? -1 : x > y ? 1 : 0) * direction
    }

/* /changelog */

const team = ({ attributes }: { attributes: Record<string, any> }) => ({
    attributes: { name: attributes.name, miniCrest: urlOnly(attributes.miniCrest) },
})

export function changelogData() {
    const changes = nodes<RoadmapNode>('Roadmap')
        .filter((change) => change.complete === true && change.date != null)
        .sort(byKey((change) => change.date))
        .map((change) => {
            const profiles = change.profiles as Relation<{ id: number; attributes: Record<string, any> }>
            const teams = change.teams as Relation<{ attributes: Record<string, any> }>
            const topic = change.topic as { data?: { attributes: { label: string; slug: string } } | null } | null
            const cta = change.cta as { label?: string; url?: string } | null
            return {
                id: change.strapiID,
                date: change.date,
                title: change.title,
                description: change.description,
                cta: cta ? { label: cta.label, url: cta.url } : null,
                media: change.media ? { gatsbyImageData: change.media.gatsbyImageData } : null,
                profiles: {
                    data: (profiles?.data ?? []).map(({ id, attributes }) => ({
                        id,
                        attributes: {
                            firstName: attributes.firstName,
                            lastName: attributes.lastName,
                            avatar: urlOnly(attributes.avatar),
                            color: attributes.color,
                            teams: { data: (attributes.teams?.data ?? []).map(team) },
                        },
                    })),
                },
                teams: { data: (teams?.data ?? []).map(team) },
                topic: topic?.data
                    ? { data: { attributes: { label: topic.data.attributes.label, slug: topic.data.attributes.slug } } }
                    : null,
                githubUrls: change.githubUrls,
                githubPRMetadata: change.githubPRMetadata ?? null,
            }
        })
    const videos = [...nodes<ChangelogVideoNode>('ChangelogVideo')].sort(byKey((video) => video.publishedAt, -1))
    return {
        allRoadmap: { nodes: changes },
        allChangelogVideo: {
            nodes: videos.map(({ id, videoId, publishedAt, title }) => ({ id, videoId, publishedAt, title })),
        },
    }
}

/* /self-driving */

export function selfDrivingData() {
    const pullRequests = nodes<SelfDrivingPullRequestNode>('SelfDrivingPullRequest')
        .filter((pr) => pr.state === 'merged')
        .sort(byKey((pr) => pr.mergedAt, -1))
        .slice(0, 24)
        .map(({ prNumber, summary, type, scope, url, mergedAt }) => ({ prNumber, summary, type, scope, url, mergedAt }))
    return { allSelfDrivingPullRequest: { nodes: pullRequests } }
}

/* /merch */

function merchCollection(handle: string, products: Map<string, ShopifyProductNode>) {
    const collection = nodes<ShopifyCollectionNode>('ShopifyCollection').find((node) => node.handle === handle)
    if (!collection) return null
    return {
        handle,
        products: collection.products.flatMap(({ shopifyId }) => {
            const product = products.get(shopifyId)
            if (!product) return []
            const { createdAt, category, featuredImage, ...fields } = product
            // The `image_products` metafield lists the products shown in this product's images.
            const imageProducts = product.metafields
                .filter((metafield) => metafield.key === 'image_products')
                .flatMap((metafield) => JSON.parse(metafield.value) as string[])
                .flatMap((id) => {
                    const imageProduct = products.get(id)
                    return imageProduct
                        ? [{ handle: imageProduct.handle, featuredImage: imageProduct.featuredImage }]
                        : []
                })
            return [{ ...fields, imageProducts }]
        }),
    }
}

export function merchData() {
    const products = new Map(nodes<ShopifyProductNode>('ShopifyProduct').map((product) => [product.shopifyId, product]))
    return { main: merchCollection('frontpage', products), kits: merchCollection('kits', products) }
}

/* /research */

const AI_RESEARCH = 'ai-research'

const teamsOf = (profile: { teams?: Relation<{ id: number; attributes: Record<string, any> }> }) => ({
    data: (profile.teams?.data ?? []).map(({ id, attributes }) => ({
        id,
        attributes: { name: attributes.name, slug: attributes.slug },
    })),
})

const leadTeamsOf = (profile: { leadTeams?: Relation<{ attributes: Record<string, any> }> }) => ({
    data: (profile.leadTeams?.data ?? []).map(({ attributes }) => ({ attributes: { name: attributes.name } })),
})

const researchProfile = (profile: SqueakProfileNode) => ({
    squeakId: profile.squeakId,
    avatar: profile.avatar?.url ? { url: profile.avatar.url } : null,
    firstName: profile.firstName,
    lastName: profile.lastName,
    companyRole: profile.companyRole,
    country: profile.country,
    color: profile.color,
    location: profile.location,
    biography: profile.biography,
    pineappleOnPizza: profile.pineappleOnPizza,
    startDate: profile.startDate,
    teams: teamsOf(profile as any),
    leadTeams: leadTeamsOf(profile as any),
})

const shortDate = (date: unknown) =>
    new Date(String(date)).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
    })

const cardImage = (url: unknown) => {
    if (typeof url !== 'string') return null
    if (!isCloudinaryUrl(url)) return { publicURL: url }
    const { childImageSharp } = imageNode(url)
    return {
        publicURL: url,
        childImageSharp: { gatsbyImageData: imageData(childImageSharp, { width: 480, height: 270 }) },
    }
}

export function researchData() {
    const profiles = nodes<SqueakProfileNode>('SqueakProfile')
    const profilesById = new Map(profiles.map((profile) => [profile.squeakId, profile]))
    const authors = new Map(nodes<AuthorsJsonNode>('AuthorsJson').map((author) => [author.handle, author]))

    const researchPosts = getContent()
        .filter(
            (node) =>
                !node.isFuture &&
                node.frontmatter.date &&
                Array.isArray(node.frontmatter.tags) &&
                node.frontmatter.tags.includes('Research')
        )
        .sort(byKey((node) => new Date(node.frontmatter.date).toISOString(), -1))
        .map((node) => {
            const { title, rootPage, category, featuredImage, date } = node.frontmatter
            const handles: string[] = [node.frontmatter.author ?? []].flat()
            return {
                id: node.id,
                fields: { slug: node.fields.slug },
                excerpt: excerpt(node, 250),
                frontmatter: {
                    date: shortDate(date),
                    title,
                    rootPage,
                    category,
                    featuredImage: cardImage(featuredImage?.publicURL ?? featuredImage),
                    authors: handles.flatMap((handle) => {
                        const author = authors.get(handle)
                        if (!author) return []
                        const profile = author.profile_id ? profilesById.get(author.profile_id) : undefined
                        const { id, ...fields } = author
                        return [{ ...fields, profile: profile ? researchProfile(profile) : null }]
                    }),
                },
            }
        })

    const aiResearchTeam = nodes<SqueakTeamNode>('SqueakTeam').find((team) => team.slug === AI_RESEARCH)
    const researchTeamMembers = profiles
        .filter((profile) => (profile.teams as any)?.data?.some((team: any) => team.attributes?.slug === AI_RESEARCH))
        .sort(byKey((profile) => profile.startDate))
        .map(researchProfile)
    // This compares the posting's slug with a bare "ai-research-engineer", but slugs start with
    // /careers/, so it never matches. Kept as it was; see the migration report.
    const aiResearchRole = nodes<AshbyJobPostingNode>('AshbyJobPosting')
        .filter((posting) => posting.fields.slug === 'ai-research-engineer')
        .map(({ fields, parent }) => ({
            fields: { title: fields.title, slug: fields.slug, locations: fields.locations },
            parent: parent ? { customFields: parent.customFields.map(({ title, value }) => ({ title, value })) } : null,
        }))

    return {
        researchPosts: { nodes: researchPosts },
        aiResearchTeam: aiResearchTeam ? { crest: urlOnly(aiResearchTeam.crest) } : null,
        researchTeamMembers: { nodes: researchTeamMembers },
        aiResearchRole: { nodes: aiResearchRole },
    }
}

/* /wip */

export function wipData() {
    const teams = nodes<SqueakTeamNode>('SqueakTeam')
        .filter((team) => team.name !== 'Hedgehogs' && team.crest?.publicId)
        .map(({ id, name, slug, crest }) => {
            const objectives = contentBySlug(`/teams/${slug}/objectives`)
            return {
                id,
                name,
                slug,
                crest: urlOnly(crest),
                objectives: objectives ? { body: objectives.body, excerpt: excerpt(objectives, 250) } : null,
            }
        })
    return { allSqueakTeam: { nodes: teams } }
}
