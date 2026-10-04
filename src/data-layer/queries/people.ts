// People data: team members, small teams, open roles, and the content that sits next to them.
import { contentMatching, excerpt, getContent } from '../content'
import { imageData, type CloudinaryAsset } from '../images'
import { nodes } from '../index'
import type {
    AshbyJobPostingNode,
    AuthorsJsonNode,
    CloudinaryMedia,
    EventNode,
    SlackEmojiNode,
    SqueakCrestOptions,
    SqueakProfileAttributes,
    SqueakProfileNode,
    SqueakRoadmapNode,
    SqueakTeamNode,
    StrapiMedia,
} from '../types'
import type { QueryResult } from './index'

const HEDGEHOGS = 'Hedgehogs'
// Left out of the team member lists.
const EXCLUDED_PROFILE = 28378

const profiles = () => nodes<SqueakProfileNode>('SqueakProfile')
const teams = () => nodes<SqueakTeamNode>('SqueakTeam')
const listedJobs = () => nodes<AshbyJobPostingNode>('AshbyJobPosting').filter((job) => job.isListed)

const onATeam = (profile: SqueakProfileNode) => (profile.teams?.data?.length ?? 0) > 0
const teamMembers = () => profiles().filter((profile) => onATeam(profile) && profile.squeakId !== EXCLUDED_PROFILE)
const crestedTeams = () => teams().filter((team) => team.name !== HEDGEHOGS && team.crest?.publicId)
const mediaUrl = (media?: StrapiMedia | null) => media?.data?.attributes?.url ?? null
/** A Strapi image field as a Cloudinary asset, for `imageData`. */
const asset = (media: CloudinaryMedia | null) => (media?.publicId ? (media as CloudinaryAsset) : null)

/** GraphQL's sort order: plain comparison, with missing values last. */
const compareBy =
    <T>(key: (item: T) => string | null | undefined) =>
    (a: T, b: T) => {
        const [x, y] = [key(a), key(b)]
        if (x == null) return y == null ? 0 : 1
        if (y == null) return -1
        return x < y ? -1 : x > y ? 1 : 0
    }

const distinct = (values: (string | null | undefined)[]) => [...new Set(values.filter(Boolean) as string[])].sort()

const CREST_OPTION_KEYS = [
    'textColor',
    'textShadow',
    'fontSize',
    'frame',
    'frameColor',
    'plaque',
    'plaqueColor',
    'imageScale',
    'imageXOffset',
    'imageYOffset',
] as const

const crestOptions = (options: SqueakCrestOptions | null) =>
    options
        ? (Object.fromEntries(CREST_OPTION_KEYS.map((key) => [key, options[key] ?? null])) as Pick<
              SqueakCrestOptions,
              (typeof CREST_OPTION_KEYS)[number]
          >)
        : null

/** A team's member as the team pages and pickers read it: the Strapi relation entry, trimmed. */
const rosterProfile = ({ id, attributes }: { id: number; attributes: SqueakProfileAttributes }) => ({
    id,
    attributes: {
        color: attributes.color,
        firstName: attributes.firstName,
        lastName: attributes.lastName,
        avatar: attributes.avatar?.data
            ? { data: { attributes: { url: attributes.avatar.data.attributes.url } } }
            : null,
    },
})

const leadProfiles = (team: SqueakTeamNode) => ({ data: team.leadProfiles.data.map(({ id }) => ({ id })) })

const job = (posting: AshbyJobPostingNode) => ({
    title: posting.fields.title,
    slug: posting.fields.slug,
    locations: posting.fields.locations,
    departmentName: posting.departmentName,
    customFields: (posting.parent?.customFields ?? []).map(({ title, value }) => ({ title, value })),
})

const shortDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })

/** Published posts under a path, newest first, as the hoglr feed reads them. */
const feedPosts = (pattern: RegExp, limit: number) =>
    getContent()
        .filter((node) => pattern.test(node.fields.slug) && !node.isFuture && node.frontmatter.date)
        .sort((a, b) => Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date))
        .slice(0, limit)

/**
 * The roadmaps a team page can show: those in progress, and the latest shipped one (the page shows it when it
 * shipped in the last 15 days). The page shows no "under consideration" list, so the rest stay out of the bundle.
 */
const pageRoadmaps = (roadmaps: SqueakRoadmapNode[]) => {
    const latestShipped = roadmaps
        .filter((roadmap) => roadmap.complete && roadmap.dateCompleted)
        .reduce<string | null>(
            (latest, { dateCompleted }) => (!latest || dateCompleted! > latest ? dateCompleted : latest),
            null
        )
    return roadmaps.filter(
        (roadmap) =>
            (!roadmap.complete && roadmap.projectedCompletion) ||
            (roadmap.complete && latestShipped && roadmap.dateCompleted === latestShipped)
    )
}

export const queries = {
    // Every profile, for components that look a person up by name: PostQuote, MegaQuote, TeamQuotes, BuiltBy,
    // TeamMember, and the videos slide.
    'people-profiles': () =>
        profiles()
            .filter((profile) => profile.firstName)
            .map((profile) => ({
                squeakId: profile.squeakId,
                firstName: profile.firstName,
                lastName: profile.lastName,
                avatar: profile.avatar?.formats?.thumbnail?.url ?? null,
                companyRole: profile.companyRole,
                location: profile.location,
                country: profile.country,
                startDate: profile.startDate,
                color: profile.color,
                pineappleOnPizza: profile.pineappleOnPizza ?? null,
                teamName: profile.teams?.data?.[0]?.attributes?.name ?? null,
                teamSlug: profile.teams?.data?.[0]?.attributes?.slug ?? null,
                isTeamLead: (profile.leadTeams?.data?.length ?? 0) > 0,
                quotes: (profile.quotes ?? []).map(({ id, quote }) => ({ id, quote })),
            })),

    // Every profile, to match a side project to its creator (SideProjects, the side projects page).
    'people-creator-profiles': () =>
        profiles().map((profile) => ({
            squeakId: profile.squeakId,
            firstName: profile.firstName ?? undefined,
            lastName: profile.lastName ?? undefined,
            companyRole: profile.companyRole ?? undefined,
            github: profile.github ?? undefined,
            color: profile.color ?? undefined,
            avatar: profile.avatar
                ? { url: profile.avatar.url, formats: { thumbnail: { url: profile.avatar.formats?.thumbnail?.url } } }
                : undefined,
            teams: { data: (profile.teams?.data ?? []).map(({ id }) => ({ id })) },
        })),

    // Current team members, longest-serving first (People, Product/TeamMembers).
    'people-team-members': () =>
        teamMembers()
            .sort(compareBy((profile) => profile.startDate))
            .map((profile) => ({
                squeakId: profile.squeakId,
                avatar: profile.avatar ? { url: profile.avatar.url } : null,
                biography: profile.biography ?? null,
                lastName: profile.lastName,
                firstName: profile.firstName,
                companyRole: profile.companyRole,
                country: profile.country,
                color: profile.color,
                location: profile.location,
                pronouns: profile.pronouns ?? null,
                pineappleOnPizza: profile.pineappleOnPizza ?? null,
                startDate: profile.startDate,
                teams: {
                    data: (profile.teams?.data ?? []).map(({ id, attributes }) => ({
                        id,
                        attributes: { name: attributes.name, slug: attributes.slug },
                    })),
                },
                leadTeams: {
                    data: (profile.leadTeams?.data ?? []).map(({ attributes }) => ({
                        attributes: { name: attributes.name },
                    })),
                },
            })),

    // Team members for the friends lists of the parody pages (hogreads, hogspace, hoglr).
    'people-friends': () =>
        teamMembers().map(({ squeakId, firstName, lastName, avatar }) => ({
            squeakId,
            firstName,
            lastName,
            avatar: avatar?.url ?? null,
        })),

    // Profiles whose first name is Ben, for the Team Ben page.
    'people-bens': () =>
        profiles()
            .filter(
                (profile) =>
                    /^Ben\b/i.test(profile.firstName?.trim() ?? '') ||
                    /^Benjamin\b/i.test(profile.firstName?.trim() ?? '')
            )
            .sort(compareBy((profile) => profile.startDate))
            .map((profile) => ({
                id: profile.id,
                squeakId: profile.squeakId,
                firstName: profile.firstName,
                lastName: profile.lastName,
                companyRole: profile.companyRole,
                country: profile.country,
                location: profile.location,
                color: profile.color,
                biography: profile.biography ?? null,
                pineappleOnPizza: profile.pineappleOnPizza ?? null,
                startDate: profile.startDate,
                avatar: profile.avatar ? { url: profile.avatar.url } : null,
                teams: {
                    data: (profile.teams?.data ?? []).map(({ id, attributes }) => ({
                        id,
                        attributes: { name: attributes.name, slug: attributes.slug },
                    })),
                },
            })),

    // Team name -> crest URL (useTeamCrestMap, People, Team, the team page).
    'people-team-crests': () =>
        Object.fromEntries(
            crestedTeams()
                .map((team) => [team.name, mediaUrl(team.crest)])
                .filter(([, url]) => url)
        ) as Record<string, string>,

    // Team name -> mini crest URL, for the badges on the people map.
    'people-team-mini-crests': () =>
        Object.fromEntries(
            teams()
                .filter((team) => team.name !== HEDGEHOGS && team.miniCrest?.publicId)
                .map((team) => [team.name, mediaUrl(team.miniCrest)])
                .filter(([, url]) => url)
        ) as Record<string, string>,

    // Every team's name and slug (Team, the team pages, careers-og).
    'people-teams': () => teams().map(({ name, slug }) => ({ name, slug })),

    // Every team, for the SmallTeam pill and crest.
    'people-small-teams': () =>
        teams().map((team) => ({
            name: team.name,
            tagline: team.tagline,
            slug: team.slug,
            miniCrest: imageData(asset(team.miniCrest), { width: 20, height: 20 }),
            crestUrl: mediaUrl(team.crest),
        })),

    // Teams with a crest and the number of people on a team (Careers/SmallTeams).
    'people-careers-small-teams': () => ({
        teams: crestedTeams().map((team) => ({
            id: team.id,
            name: team.name,
            slug: team.slug,
            miniCrest: imageData(asset(team.miniCrest), { width: 64, height: 64 }),
        })),
        memberCount: profiles().filter(onATeam).length,
    }),

    // Each team's share of pineapple-on-pizza believers (Careers/Pizza).
    'people-pizza-teams': () =>
        teams()
            .filter((team) => team.name !== HEDGEHOGS && team.miniCrest?.publicId)
            .map((team) => {
                const members = team.profiles?.data ?? []
                const lovers = members.filter(({ attributes }) => attributes.pineappleOnPizza).length
                return {
                    name: team.name,
                    slug: team.slug,
                    miniCrest: imageData(asset(team.miniCrest), { width: 80, height: 80 }),
                    pineapplePercentage: (members.length > 0 ? (lovers / members.length) * 100 : 0).toFixed(1),
                }
            }),

    // Teams with a crest, for the teams directory and the small teams table (teams, teams/index, small-teams).
    'people-teams-directory': () =>
        crestedTeams().map((team) => ({
            id: team.id,
            name: team.name,
            slug: team.slug,
            createdAt: team.createdAt,
            tagline: team.tagline,
            description: team.description,
            profiles: { data: team.profiles.data.map(rosterProfile) },
            leadProfiles: leadProfiles(team),
            // Every team here has a crest.
            crestUrl: mediaUrl(team.crest) ?? '',
            miniCrestUrl: mediaUrl(team.miniCrest),
            crestOptions: crestOptions(team.crestOptions),
        })),

    // Every team's members and leads (Presentation/Utilities/TeamMembers, ProfessionalServices).
    'people-team-rosters': () =>
        teams().map((team) => ({
            name: team.name,
            slug: team.slug,
            profiles: { data: team.profiles.data.map(rosterProfile) },
            leadProfiles: leadProfiles(team),
        })),

    // Teams with a crest, by name, with their members' squeakIds, for the team member picker demo (components).
    'people-member-picker-teams': () =>
        crestedTeams()
            .sort(compareBy((team) => team.name))
            .map((team) => ({
                id: team.id,
                name: team.name,
                slug: team.slug,
                miniCrest: team.miniCrest?.data ? { data: { attributes: { url: mediaUrl(team.miniCrest) } } } : null,
                profiles: {
                    data: team.profiles.data.map((profile) => {
                        const { id, attributes } = rosterProfile(profile)
                        return { id, attributes: { ...attributes, squeakId: id } }
                    }),
                },
            })),

    // Teams and the people on them, for the roadmap's early access features (Roadmap/EarlyAccessFeaturesSection).
    'people-roadmap-teams': () => {
        const teamInfoBySlug: Record<string, { name: string; miniCrest: ReturnType<typeof imageData> }> = {}
        const peopleByTeamSlug: Record<string, { id?: string; name: string; role?: string; avatar?: string }[]> = {}
        for (const team of teams()) {
            teamInfoBySlug[team.slug] = {
                name: team.name,
                miniCrest: imageData(asset(team.miniCrest), { width: 40, height: 40 }),
            }
            peopleByTeamSlug[team.slug] = (team.profiles?.data ?? []).map(({ id, attributes }) => ({
                id: id ? String(id) : undefined,
                name: [attributes?.firstName, attributes?.lastName].filter(Boolean).join(' '),
                role: attributes?.companyRole || undefined,
                avatar: mediaUrl(attributes?.avatar) || undefined,
            }))
        }
        return { teamInfoBySlug, peopleByTeamSlug }
    },

    // What a team page renders from the build: emojis, roadmaps, and the handbook and goals content by team slug.
    'people-team-pages': () => {
        const emojis = new Map(nodes<SlackEmojiNode>('SlackEmoji').map((emoji) => [emoji.name, emoji]))
        const roadmaps = new Map(nodes<SqueakRoadmapNode>('SqueakRoadmap').map((roadmap) => [roadmap.id, roadmap]))
        // Keyed by the team slug: /teams/<slug> and /teams/<slug>/objectives.
        const bySlug = (pattern: RegExp) =>
            Object.fromEntries(
                contentMatching(pattern).map((node) => [node.fields.slug.split('/')[2], node.id])
            ) as Record<string, string>
        return {
            teams: teams()
                .filter((team) => team.name !== HEDGEHOGS)
                .map((team) => ({
                    name: team.name,
                    slug: team.slug,
                    emojis: (team.emojis ?? [])
                        .map((name) => ({ name, url: emojis.get(name)?.localFile?.publicURL }))
                        .filter((emoji): emoji is { name: string; url: string } => !!emoji.url),
                    roadmaps: pageRoadmaps(
                        team.roadmaps
                            .map(({ id }) => roadmaps.get(id))
                            .filter((roadmap): roadmap is SqueakRoadmapNode => !!roadmap)
                    ).map((roadmap) => ({
                        squeakId: roadmap.squeakId,
                        betaAvailable: roadmap.betaAvailable,
                        complete: roadmap.complete,
                        dateCompleted: roadmap.dateCompleted,
                        title: roadmap.title,
                        description: roadmap.description,
                        media: roadmap.media?.data
                            ? {
                                  publicId: roadmap.media.publicId ?? null,
                                  data: { attributes: { mime: roadmap.media.data.attributes.mime } },
                              }
                            : null,
                        githubPages: roadmap.githubPages.map((page) =>
                            'title' in page
                                ? {
                                      title: page.title,
                                      html_url: page.html_url,
                                      number: page.number,
                                      closed_at: page.closed_at,
                                      reactions: {
                                          hooray: page.reactions.hooray,
                                          heart: page.reactions.heart,
                                          eyes: page.reactions.eyes,
                                          plus1: page.reactions.plus1,
                                      },
                                  }
                                : {}
                        ),
                        projectedCompletion: roadmap.projectedCompletion,
                        cta: roadmap.cta ? { label: roadmap.cta.label, url: roadmap.cta.url } : null,
                    })),
                })),
            bodies: bySlug(/^\/teams\/[^/]+$/),
            objectives: bySlug(/^\/teams\/[^/]+\/objectives$/),
        }
    },

    // Listed open roles (AshbyOpenRoles, CareersHero, Team, the team page, careers-og).
    'people-jobs': () => listedJobs().map(job),

    // Listed open roles with their description, for the careers job listings.
    'people-job-listings': () => listedJobs().map((posting) => ({ ...job(posting), html: posting.fields.html ?? '' })),

    // The departments with a listed open role, sorted (AshbyOpenRoles).
    'people-job-departments': () => distinct(listedJobs().map((posting) => posting.departmentName)),

    // When the newest role was published, to bust the careers OG image cache.
    'people-latest-job-date': () =>
        nodes<AshbyJobPostingNode>('AshbyJobPosting')
            .map((posting) => posting.publishedDate)
            .sort()
            .pop() ?? null,

    // Every team with the members the job sidebar shows (Careers/JobListings).
    'people-job-teams': () =>
        teams().map((team) => ({
            id: team.id,
            name: team.name,
            slug: team.slug,
            description: team.description,
            crest: { data: { attributes: { url: mediaUrl(team.crest) } } },
            crestOptions: crestOptions(team.crestOptions),
            leadProfiles: leadProfiles(team),
            profiles: {
                data: team.profiles.data.map(({ id, attributes }) => ({
                    id,
                    attributes: {
                        country: attributes.country,
                        firstName: attributes.firstName,
                        lastName: attributes.lastName,
                        companyRole: attributes.companyRole,
                        location: attributes.location,
                        startDate: attributes.startDate,
                        pineappleOnPizza: attributes.pineappleOnPizza ?? null,
                        leadTeams: {
                            data: (attributes.leadTeams?.data ?? []).map(({ attributes }) => ({
                                attributes: { name: attributes.name },
                            })),
                        },
                        avatar: attributes.avatar?.data
                            ? { data: { attributes: { url: attributes.avatar.data.attributes.url } } }
                            : null,
                        color: attributes.color,
                    },
                })),
            },
        })),

    // The event form's select options: formats and audiences in use, and the team members who can speak.
    'people-event-options': () => {
        const events = nodes<EventNode>('Event')
        const values = (field: 'format' | 'audience') =>
            distinct(events.flatMap((event) => [event.attributes[field] ?? []].flat() as string[]))
        return {
            formats: values('format'),
            audiences: values('audience'),
            speakers: profiles()
                .filter((profile) => profile.firstName !== '' && onATeam(profile))
                .sort(compareBy((profile) => profile.firstName))
                .map(({ squeakId, firstName, lastName, companyRole, color, avatar }) => ({
                    squeakId,
                    firstName,
                    lastName,
                    companyRole,
                    color,
                    avatar: avatar?.url ?? null,
                })),
        }
    },

    // The newest blog posts and newsletters, for the hoglr feed.
    'people-hoglr-feed': () => {
        const authors = new Map(nodes<AuthorsJsonNode>('AuthorsJson').map((author) => [author.handle, author]))
        const avatars = new Map(profiles().map((profile) => [profile.squeakId, profile.avatar?.url]))
        return {
            blog: feedPosts(/^\/blog\//, 20).map((node) => {
                const image = node.frontmatter.featuredImage
                return {
                    title: node.frontmatter.title as string,
                    url: node.fields.slug,
                    snippet: excerpt(node, 150),
                    date: shortDate(node.frontmatter.date),
                    authors: [node.frontmatter.author ?? []]
                        .flat()
                        .map((handle: string) => authors.get(handle))
                        .filter((author): author is AuthorsJsonNode => !!author)
                        .map(({ handle, name, profile_id }) => ({
                            handle,
                            name,
                            profile_id: profile_id ?? null,
                            avatar: (profile_id && avatars.get(profile_id)) || null,
                        })),
                    image: image?.childImageSharp
                        ? imageData(image.childImageSharp, { width: 480, height: 270 })
                        : null,
                    imageUrl: ((typeof image === 'string' ? image : image?.publicURL) ?? null) as string | null,
                }
            }),
            newsletter: feedPosts(/^\/newsletter\//, 2).map((node) => ({
                title: node.frontmatter.title as string,
                url: node.fields.slug,
                snippet: excerpt(node, 170),
                date: shortDate(node.frontmatter.date),
            })),
        }
    },
}

export type Profiles = QueryResult<typeof queries, 'people-profiles'>
export type Profile = Profiles[number]
export type CreatorProfiles = QueryResult<typeof queries, 'people-creator-profiles'>
export type TeamMembers = QueryResult<typeof queries, 'people-team-members'>
export type Friends = QueryResult<typeof queries, 'people-friends'>
export type Bens = QueryResult<typeof queries, 'people-bens'>
export type TeamCrests = QueryResult<typeof queries, 'people-team-crests'>
export type TeamMiniCrests = QueryResult<typeof queries, 'people-team-mini-crests'>
export type Teams = QueryResult<typeof queries, 'people-teams'>
export type SmallTeams = QueryResult<typeof queries, 'people-small-teams'>
export type CareersSmallTeams = QueryResult<typeof queries, 'people-careers-small-teams'>
export type PizzaTeams = QueryResult<typeof queries, 'people-pizza-teams'>
export type TeamsDirectory = QueryResult<typeof queries, 'people-teams-directory'>
export type TeamRosters = QueryResult<typeof queries, 'people-team-rosters'>
export type MemberPickerTeams = QueryResult<typeof queries, 'people-member-picker-teams'>
export type RoadmapTeams = QueryResult<typeof queries, 'people-roadmap-teams'>
export type TeamPages = QueryResult<typeof queries, 'people-team-pages'>
export type Jobs = QueryResult<typeof queries, 'people-jobs'>
export type Job = Jobs[number]
export type JobListings = QueryResult<typeof queries, 'people-job-listings'>
export type JobDepartments = QueryResult<typeof queries, 'people-job-departments'>
export type LatestJobDate = QueryResult<typeof queries, 'people-latest-job-date'>
export type JobTeams = QueryResult<typeof queries, 'people-job-teams'>
export type EventOptions = QueryResult<typeof queries, 'people-event-options'>
export type HoglrFeed = QueryResult<typeof queries, 'people-hoglr-feed'>
