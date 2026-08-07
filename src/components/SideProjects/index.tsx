import { Logo } from '@posthog/brand/logo'
import CloudinaryImage from 'components/CloudinaryImage'
import ImageDrop, { type Image as UploadImage } from 'components/ImageDrop'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import { OSInput } from 'components/OSForm'
import uploadImage from 'components/Squeak/util/uploadImage'
import { PROFILE_COLORS } from 'constants/profileColors'
import { graphql, useStaticQuery } from 'gatsby'
import { useUser } from 'hooks/useUser'
import React, { useCallback, useEffect, useState } from 'react'
import { useToast } from '../../context/Toast'
import seedSideProjects from '../../data/sideProjects.json'

const API_HOST = process.env.GATSBY_SQUEAK_API_HOST

export type CreatorProfile = {
    squeakId: string
    firstName?: string
    lastName?: string
    companyRole?: string
    github?: string
    color?: string
    avatar?: { url?: string; formats?: { thumbnail?: { url?: string } } }
    teams?: { data?: { id: number }[] }
}

export type SideProject = {
    // Strapi entry id; seed/fallback entries don't have one until they're migrated
    id?: number
    title: string
    description?: string
    date?: string
    createdAt?: string
    projectThumbnail?: string
    projectAuthor?: string
    authorGitHub?: string
    alumni?: boolean
    teamLink?: string
    githubUrl?: string
    liveUrl?: string
    tags?: string[]
}

// Tag aliases fold near-duplicate and one-off tags into a smaller canonical set,
// so the filter bar stays scannable without editing every entry's frontmatter.
const TAG_ALIASES: Record<string, string> = {
    'ai-coding': 'ai',
    'anomaly-detection': 'ai',
    langgraph: 'ai',
    llm: 'ai',
    'openai-agents': 'ai',
    rag: 'ai',
    analytics: 'data',
    airflow: 'data',
    clickhouse: 'data',
    dagster: 'data',
    'data-engineering': 'data',
    'data-viz': 'data',
    dbt: 'data',
    visualization: 'data',
    aws: 'infrastructure',
    devops: 'infrastructure',
    dns: 'infrastructure',
    monitoring: 'infrastructure',
    networking: 'infrastructure',
    pagerduty: 'infrastructure',
    terraform: 'infrastructure',
    git: 'developer-tools',
    github: 'developer-tools',
    terminal: 'developer-tools',
    vscode: 'developer-tools',
    esp32: 'hardware',
    firmware: 'hardware',
    'raspberry-pi': 'hardware',
    documentation: 'content',
    writing: 'content',
    desktop: 'desktop-app',
    electron: 'desktop-app',
    authentication: 'security',
    node: 'javascript',
    nextjs: 'react',
    django: 'python',
    flask: 'python',
    'static-site': 'web-app',
    wordpress: 'web-app',
}

// Normalize a project's tags through the alias map, deduped and order-preserving
export const normalizeTags = (tags?: string[]): string[] => {
    const seen = new Set<string>()
    const normalized: string[] = []
    tags?.forEach((tag) => {
        const canonical = TAG_ALIASES[tag] || tag
        if (!seen.has(canonical)) {
            seen.add(canonical)
            normalized.push(canonical)
        }
    })
    return normalized
}

// Current team members belong to at least one small team; alumni profiles stick around but lose theirs
export const isCurrentTeamMember = (profile?: CreatorProfile): boolean =>
    Boolean(profile?.teams?.data && profile.teams.data.length > 0)

// The frontmatter `alumni` flag wins; otherwise fall back to the profile's team membership
export const isAlumniProject = (
    profiles: CreatorProfile[],
    frontmatter: Pick<SideProject, 'projectAuthor' | 'authorGitHub' | 'alumni'>
): boolean => {
    if (typeof frontmatter.alumni === 'boolean') {
        return frontmatter.alumni
    }
    return !isCurrentTeamMember(findCreatorProfile(profiles, frontmatter))
}

export const useCreatorProfiles = (): CreatorProfile[] => {
    const {
        profiles: { nodes },
    } = useStaticQuery(graphql`
        {
            profiles: allSqueakProfile {
                nodes {
                    squeakId
                    firstName
                    lastName
                    companyRole
                    github
                    color
                    avatar {
                        url
                        formats {
                            thumbnail {
                                url
                            }
                        }
                    }
                    teams {
                        data {
                            id
                        }
                    }
                }
            }
        }
    `)
    return nodes
}

const normalizeGitHub = (github?: string): string | undefined =>
    github
        ?.replace(/^https?:\/\/github\.com\//, '')
        .replace(/\/$/, '')
        .toLowerCase()

// Match a project's creator to a community profile by GitHub username first, then by full name
export const findCreatorProfile = (
    profiles: CreatorProfile[],
    { projectAuthor, authorGitHub }: Pick<SideProject, 'projectAuthor' | 'authorGitHub'>
): CreatorProfile | undefined => {
    const github = normalizeGitHub(authorGitHub)
    const byGitHub = github && profiles.find((profile) => normalizeGitHub(profile.github) === github)
    if (byGitHub) {
        return byGitHub
    }
    if (projectAuthor) {
        return profiles.find(
            (profile) =>
                `${profile.firstName || ''} ${profile.lastName || ''}`.trim().toLowerCase() ===
                projectAuthor.trim().toLowerCase()
        )
    }
    return undefined
}

export const getCreatorUrl = (
    profile: CreatorProfile | undefined,
    { authorGitHub, teamLink }: Pick<SideProject, 'authorGitHub' | 'teamLink'>
): string | undefined => {
    if (profile) {
        return `/community/profiles/${profile.squeakId}`
    }
    if (teamLink) {
        return teamLink
    }
    return authorGitHub ? `https://github.com/${authorGitHub}` : undefined
}

const CreatorAvatar = ({
    profile,
    authorGitHub,
    projectAuthor,
    sizeClasses,
}: {
    profile?: CreatorProfile
    authorGitHub?: string
    projectAuthor?: string
    sizeClasses: string
}) => {
    const avatarUrl = profile?.avatar?.formats?.thumbnail?.url
    return (
        <span
            className={`${sizeClasses} shrink-0 rounded-full overflow-hidden border border-primary bg-${
                profile?.color || 'accent'
            }`}
        >
            {avatarUrl ? (
                <img src={avatarUrl} alt="" className="size-full object-cover" />
            ) : authorGitHub ? (
                <img
                    src={`https://github.com/${authorGitHub}.png?size=64`}
                    alt=""
                    loading="lazy"
                    className="size-full object-cover"
                />
            ) : (
                <CloudinaryImage
                    alt=""
                    width={64}
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/pages-content/images/hog-9.png"
                    className="size-full"
                    imgClassName="size-full object-cover"
                />
            )}
            <span className="sr-only">{projectAuthor}</span>
        </span>
    )
}

// The creator byline: avatar + name (+ role when we can match a community profile)
export const Creator = ({
    projectAuthor,
    authorGitHub,
    teamLink,
    profiles,
    size = 'sm',
    showRole = true,
}: Pick<SideProject, 'projectAuthor' | 'authorGitHub' | 'teamLink'> & {
    profiles: CreatorProfile[]
    size?: 'sm' | 'lg'
    showRole?: boolean
}): JSX.Element | null => {
    if (!projectAuthor) {
        return null
    }

    const profile = findCreatorProfile(profiles, { projectAuthor, authorGitHub })
    const url = getCreatorUrl(profile, { authorGitHub, teamLink })
    const isLarge = size === 'lg'

    const content = (
        <>
            <CreatorAvatar
                profile={profile}
                authorGitHub={authorGitHub}
                projectAuthor={projectAuthor}
                sizeClasses={isLarge ? 'size-10' : 'size-6'}
            />
            <span className="min-w-0">
                <span
                    className={`block truncate font-semibold text-primary group-hover/creator:underline ${
                        isLarge ? 'text-base' : 'text-sm'
                    }`}
                >
                    {projectAuthor}
                </span>
                {showRole && profile?.companyRole && (
                    <span className={`block truncate text-secondary ${isLarge ? 'text-sm' : 'text-[13px]'}`}>
                        {profile.companyRole}
                    </span>
                )}
            </span>
        </>
    )

    const classes = `group/creator inline-flex items-center min-w-0 ${isLarge ? 'gap-3' : 'gap-2'}`

    return url ? (
        <Link
            to={url}
            state={url.startsWith('/') ? { newWindow: true } : undefined}
            externalNoIcon={!url.startsWith('/')}
            className={classes}
        >
            {content}
        </Link>
    ) : (
        <span className={classes}>{content}</span>
    )
}

// Profile colors light enough to need dark text – the rest get white (mirrors EventGraphic)
const LIGHT_BACKGROUNDS = ['lime-green', 'teal', 'yellow', 'orange']

// Fallback artwork for creators without an avatar
const DEFAULT_HEDGEHOG = 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/hogzilla_73b822a689.png'

// Generated card art for projects without a featured image, adapted from EventGraphic:
// deterministic background color from the title, project name in display type, and the
// creator's avatar breaking out of a circle.
export const SideProjectGraphic = ({
    title,
    creatorName,
    creatorRole,
    avatarUrl,
    color,
    className = '',
}: {
    title: string
    creatorName?: string
    creatorRole?: string
    avatarUrl?: string
    color?: string
    className?: string
}): JSX.Element => {
    const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const background = color && PROFILE_COLORS.includes(color) ? color : PROFILE_COLORS[hash % PROFILE_COLORS.length]
    const darkText = LIGHT_BACKGROUNDS.includes(background)

    return (
        <div className={`@container overflow-hidden ${className}`}>
            <div
                className={`relative aspect-video w-full overflow-hidden bg-${background} ${
                    darkText ? 'text-black' : 'text-white'
                }`}
            >
                <div className="absolute right-[5%] top-[30%] aspect-square w-[26%]">
                    <div className="absolute inset-0 rounded-full border-[0.5cqw] border-white bg-tan shadow-xl" />
                    {/* Clip only below the circle's midline so the avatar breaks out of the top instead of being cropped */}
                    <div className="absolute inset-x-0 -top-[18%] bottom-0 overflow-hidden rounded-b-full">
                        <img
                            src={avatarUrl || DEFAULT_HEDGEHOG}
                            alt=""
                            loading="lazy"
                            className="absolute bottom-0 left-1/2 w-[108%] max-w-none -translate-x-1/2"
                        />
                    </div>
                </div>
                <div className="absolute inset-0 flex flex-col p-[5%]">
                    <div
                        aria-hidden="true"
                        className={`m-0 w-[68%] break-words font-squeak font-bold uppercase leading-[0.95] ${
                            title.length > 24 ? 'text-[6.5cqw]' : title.length > 13 ? 'text-[8cqw]' : 'text-[10cqw]'
                        }`}
                    >
                        {title}
                    </div>
                    {creatorName && (
                        <div className="mt-auto w-[68%]">
                            <div className="break-words font-squeak text-[4.5cqw] font-bold uppercase leading-none">
                                {creatorName}
                            </div>
                            {creatorRole && (
                                <div className="mt-[1%] font-rounded text-[2.5cqw] font-semibold uppercase leading-none">
                                    {creatorRole}
                                </div>
                            )}
                        </div>
                    )}
                    <div
                        className={`mt-[2.5%] flex items-center justify-center rounded-[1.5cqw] bg-white px-[4%] py-[1.5%] text-black ${
                            creatorName ? '' : 'mt-auto'
                        }`}
                    >
                        <Logo className="h-[3.5cqw] w-auto shrink-0" width="auto" />
                    </div>
                </div>
            </div>
        </div>
    )
}

type StrapiEntry = { id: number; attributes: Record<string, unknown> }

const transformStrapiSideProject = (entry: StrapiEntry): SideProject => ({
    id: entry.id,
    ...(entry.attributes as Omit<SideProject, 'id'>),
    tags: (entry.attributes.tags as string[]) || [],
})

// Side projects live in Strapi (like events) so team members can add and edit them in the
// site. The bundled seed data renders immediately and stays up if the API is unreachable.
export const useSideProjects = (): {
    projects: SideProject[]
    usingFallback: boolean
    refreshProjects: () => void
    deleteProject: (projectId: number) => void
} => {
    const { getJwt } = useUser()
    const { addToast } = useToast()
    const [projects, setProjects] = useState<SideProject[]>(seedSideProjects as SideProject[])
    const [usingFallback, setUsingFallback] = useState(true)

    const fetchProjects = useCallback(async () => {
        try {
            const collected: SideProject[] = []
            let page = 1
            let pageCount = 1
            while (page <= pageCount) {
                const response = await fetch(
                    `${API_HOST}/api/side-projects?pagination%5Bpage%5D=${page}&pagination%5BpageSize%5D=100`
                )
                if (!response.ok) {
                    throw new Error(`Failed to fetch side projects: ${response.statusText}`)
                }
                const { data, meta } = await response.json()
                collected.push(...(data || []).map(transformStrapiSideProject))
                pageCount = meta?.pagination?.pageCount || 1
                page += 1
            }
            if (collected.length > 0) {
                // Strapi entries win; bundled entries not yet migrated stay visible under them
                const apiTitles = new Set(collected.map((project) => project.title.trim().toLowerCase()))
                const unmigrated = (seedSideProjects as SideProject[]).filter(
                    (project) => !apiTitles.has(project.title.trim().toLowerCase())
                )
                setProjects([...collected, ...unmigrated])
                setUsingFallback(false)
            }
        } catch (error) {
            // Collection not deployed yet, or transient API failure: the seed data stays up
            console.warn('Falling back to bundled side projects:', error)
        }
    }, [])

    useEffect(() => {
        fetchProjects()
    }, [fetchProjects])

    const deleteProject = async (projectId: number) => {
        if (!confirm('Are you sure you want to delete this project?')) {
            return
        }
        try {
            const response = await fetch(`${API_HOST}/api/side-projects/${projectId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${await getJwt()}`,
                },
            })
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            addToast({ title: 'Project deleted', description: 'The project was deleted successfully.' })
            fetchProjects()
        } catch (error) {
            addToast({
                title: 'Failed to delete project',
                description: error instanceof Error ? error.message : 'An unexpected error occurred.',
                error: true,
            })
        }
    }

    return { projects, usingFallback, refreshProjects: fetchProjects, deleteProject }
}

type SideProjectFormValues = {
    title: string
    description: string
    projectAuthor: string
    authorGitHub: string
    githubUrl: string
    liveUrl: string
    tags: string
    alumni: boolean
}

const toFormValues = (project?: SideProject): SideProjectFormValues => ({
    title: project?.title || '',
    description: project?.description || '',
    projectAuthor: project?.projectAuthor || '',
    authorGitHub: project?.authorGitHub || '',
    githubUrl: project?.githubUrl || '',
    liveUrl: project?.liveUrl || '',
    tags: (project?.tags || []).join(', '),
    alumni: Boolean(project?.alumni),
})

// Add/edit form for logged-in PostHog team members, writing straight to the Strapi
// collection the gallery reads from (the same pattern as the events page).
export const SideProjectForm = ({
    project,
    existingTags,
    onSuccess,
    onCancel,
}: {
    project?: SideProject
    existingTags: string[]
    onSuccess: () => void
    onCancel: () => void
}): JSX.Element => {
    const { getJwt } = useUser()
    const { addToast } = useToast()
    const [values, setValues] = useState<SideProjectFormValues>(toFormValues(project))
    const [featuredImage, setFeaturedImage] = useState<UploadImage | { id: number; url: string } | undefined>(
        project?.projectThumbnail ? { id: 0, url: project.projectThumbnail } : undefined
    )
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const setValue = (key: keyof SideProjectFormValues) => (event: React.ChangeEvent<HTMLInputElement>) =>
        setValues((prev) => ({ ...prev, [key]: event.target.value }))

    // Absolute http(s) URLs or site-relative paths like /deskhog (per the internal-link convention)
    const isValidProjectUrl = (value: string): boolean => /^(https?:\/\/|\/)/.test(value)

    const githubUrl = values.githubUrl.trim()
    const liveUrl = values.liveUrl.trim()
    // A card links to liveUrl || githubUrl, so a project without either would be unclickable
    const canSubmit =
        Boolean(
            values.title.trim() &&
                values.description.trim() &&
                values.projectAuthor.trim() &&
                (githubUrl || liveUrl) &&
                (!githubUrl || isValidProjectUrl(githubUrl)) &&
                (!liveUrl || isValidProjectUrl(liveUrl))
        ) && !submitting

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        if (!canSubmit) {
            return
        }
        setSubmitting(true)
        setError(null)
        try {
            const jwt = await getJwt()
            if (!jwt) {
                throw new Error('Sign in to your community profile first')
            }
            let thumbnailUrl = project?.projectThumbnail || ''
            if (featuredImage && 'file' in featuredImage && featuredImage.file) {
                const uploaded = await uploadImage(featuredImage.file, jwt)
                thumbnailUrl = uploaded?.url || thumbnailUrl
            } else if (!featuredImage) {
                thumbnailUrl = ''
            }
            const tags = values.tags
                .split(',')
                .map((tag) => tag.trim().toLowerCase().replace(/\s+/g, '-'))
                .filter(Boolean)
            const body = {
                data: {
                    title: values.title.trim(),
                    description: values.description.trim(),
                    // The added date drives "newest first" ordering; keep it stable on edits
                    date: project?.date || new Date().toISOString().slice(0, 10),
                    projectAuthor: values.projectAuthor.trim(),
                    authorGitHub: values.authorGitHub.trim() || null,
                    alumni: values.alumni,
                    githubUrl: githubUrl || null,
                    liveUrl: liveUrl || null,
                    projectThumbnail: thumbnailUrl || null,
                    tags,
                },
            }
            const response = await fetch(
                project?.id ? `${API_HOST}/api/side-projects/${project.id}` : `${API_HOST}/api/side-projects`,
                {
                    method: project?.id ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`,
                    },
                    body: JSON.stringify(body),
                }
            )
            if (!response.ok) {
                const data = await response.json().catch(() => null)
                throw new Error(data?.error?.message || response.statusText)
            }
            addToast({
                title: project?.id ? 'Project updated' : 'Project added',
                description: values.title.trim(),
            })
            onSuccess()
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : 'Something went wrong. Try again.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
            <OSInput
                label="Project name"
                name="title"
                direction="column"
                required
                value={values.title}
                onChange={setValue('title')}
            />
            <OSInput
                label="One-line description"
                name="description"
                direction="column"
                required
                description="Shown on the gallery card"
                value={values.description}
                onChange={setValue('description')}
            />
            <OSInput
                label="Creator's name"
                name="projectAuthor"
                direction="column"
                required
                description="Use the same name as their community profile so we can link and show their avatar"
                value={values.projectAuthor}
                onChange={setValue('projectAuthor')}
            />
            <OSInput
                label="Creator's GitHub username"
                name="authorGitHub"
                direction="column"
                value={values.authorGitHub}
                onChange={setValue('authorGitHub')}
            />
            <OSInput
                label="GitHub repo URL"
                name="githubUrl"
                direction="column"
                description="Give at least one of the repo or live URL – it's what the gallery card links to"
                value={values.githubUrl}
                onChange={setValue('githubUrl')}
            />
            <OSInput
                label="Live URL"
                name="liveUrl"
                direction="column"
                description="Where people can try it – use a relative path like /max for pages on posthog.com"
                value={values.liveUrl}
                onChange={setValue('liveUrl')}
            />
            <div>
                <label className="text-[15px] font-semibold">Featured image</label>
                <p className="m-0 mb-2 text-sm text-secondary">
                    Optional – a screenshot or artwork for the gallery card. Leave it out and we generate one for you.
                </p>
                <ImageDrop
                    image={featuredImage}
                    onDrop={(image) => setFeaturedImage(image)}
                    onRemove={() => setFeaturedImage(undefined)}
                    className="h-32"
                />
            </div>
            <OSInput
                label="Tags"
                name="tags"
                direction="column"
                description={`Comma-separated. Reuse existing tags where you can: ${existingTags
                    .slice(0, 10)
                    .join(', ')}`}
                placeholder="open-source, typescript, ai"
                value={values.tags}
                onChange={setValue('tags')}
            />
            <label className="flex items-center gap-2 text-[15px]">
                <input
                    type="checkbox"
                    checked={values.alumni}
                    onChange={(event) => setValues((prev) => ({ ...prev, alumni: event.target.checked }))}
                />
                <span>
                    List under PostHog Alums <span className="text-secondary">(the creator has left PostHog)</span>
                </span>
            </label>
            <div className="flex items-center gap-2">
                <OSButton type="submit" variant="primary" size="md" disabled={!canSubmit}>
                    {submitting ? 'Saving…' : project?.id ? 'Save changes' : 'Add project'}
                </OSButton>
                <OSButton type="button" size="md" onClick={onCancel}>
                    Cancel
                </OSButton>
            </div>
            {error && <p className="text-sm text-red m-0">{error}</p>}
        </form>
    )
}
