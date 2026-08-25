import { Logo } from '@posthog/brand/logo'
import ImageDrop, { type Image as UploadImage } from 'components/ImageDrop'
import OSButton from 'components/OSButton'
import { OSInput } from 'components/OSForm'
import uploadImage from 'components/Squeak/util/uploadImage'
import { PROFILE_COLORS } from 'constants/profileColors'
import { graphql, useStaticQuery } from 'gatsby'
import { useUser } from 'hooks/useUser'
import React, { useCallback, useEffect, useState } from 'react'
import { useApp } from '../../context/App'
import { useToast } from '../../context/Toast'
import { useWindow } from '../../context/Window'

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
        // Own-property check: a tag like "constructor" must not hit Object.prototype
        const canonical = (Object.prototype.hasOwnProperty.call(TAG_ALIASES, tag) && TAG_ALIASES[tag]) || tag
        if (!seen.has(canonical)) {
            seen.add(canonical)
            normalized.push(canonical)
        }
    })
    return normalized
}

// Current team members belong to at least one small team; alumni profiles stick around but lose theirs
const isCurrentTeamMember = (profile?: CreatorProfile): boolean =>
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

// Profile colors light enough to need dark text – the rest get white (mirrors EventGraphic)
const LIGHT_BACKGROUNDS = ['lime-green', 'teal', 'yellow', 'orange']

const getProjectColor = (title: string, color?: string): string => {
    if (color && PROFILE_COLORS.includes(color)) {
        return color
    }
    const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return PROFILE_COLORS[hash % PROFILE_COLORS.length]
}

// Fallback artwork for creators without an avatar
const DEFAULT_HEDGEHOG = 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/hogzilla_73b822a689.png'

// Card header, adapted from EventGraphic: display type, circular portrait, PostHog + role bar.
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
    const background = getProjectColor(title, color)
    const darkText = LIGHT_BACKGROUNDS.includes(background)

    return (
        <div className={`@container overflow-hidden ${className}`}>
            <div
                className={`flex aspect-video w-full flex-col overflow-hidden bg-${background} px-[4%] py-[4%] ${
                    darkText ? 'text-black' : 'text-white'
                }`}
            >
                <div className="grid min-h-0 flex-1 grid-cols-[7fr_3fr]">
                    <div className="flex min-w-0 flex-col justify-between">
                        {/* The card's only rendering of the title – it must stay in the accessibility
                            tree so the project link has an identifiable name */}
                        <div
                            className={`m-0 break-words font-squeak font-bold uppercase leading-[0.95] ${
                                title.length > 24 ? 'text-[6.5cqw]' : title.length > 13 ? 'text-[8cqw]' : 'text-[10cqw]'
                            }`}
                        >
                            {title}
                        </div>
                        {creatorName && (
                            <div className="break-words font-squeak text-[4.5cqw] font-bold uppercase leading-none">
                                {creatorName}
                            </div>
                        )}
                    </div>
                    <div className="flex items-end justify-end">
                        <div className="relative aspect-square w-full">
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
                    </div>
                </div>
                <div className="mt-[3%] flex items-center justify-between gap-[3%] rounded-[1.5cqw] bg-white px-[3.5%] py-[2%] text-black">
                    <Logo className="h-[4cqw] w-auto max-w-[55%] shrink-0" width="auto" />
                    {creatorRole && (
                        <span className="truncate font-rounded text-[2.6cqw] font-bold uppercase leading-none tracking-wide">
                            {creatorRole}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

// Card header for projects with an uploaded thumbnail: the image fills the card, with a
// compact version of the graphic's identity row (title, creator, role, portrait) overlaid
// on a bottom gradient so that info stays visible.
export const SideProjectThumbnail = ({
    src,
    title,
    creatorName,
    creatorRole,
    avatarUrl,
    className = '',
}: {
    src: string
    title: string
    creatorName?: string
    creatorRole?: string
    avatarUrl?: string
    className?: string
}): JSX.Element => (
    <div className={`@container relative overflow-hidden ${className}`}>
        <img src={src} alt="" loading="lazy" className="aspect-video w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-[3%] bg-gradient-to-t from-black/80 via-black/40 to-transparent px-[4%] pb-[3%] pt-[10%] text-white">
            <div className="min-w-0">
                {/* The card's only rendering of the title (the thumbnail's alt is empty), so it
                    must stay in the accessibility tree for the project link's accessible name */}
                <div className="break-words font-squeak text-[5cqw] font-bold uppercase leading-[0.95]">{title}</div>
                {creatorName && (
                    <div className="mt-[1.5%] truncate font-squeak text-[3cqw] font-bold uppercase leading-none">
                        {creatorName}
                    </div>
                )}
                {creatorRole && (
                    <div className="mt-[1%] truncate font-rounded text-[2.4cqw] font-bold uppercase leading-none tracking-wide opacity-90">
                        {creatorRole}
                    </div>
                )}
            </div>
            <img
                src={avatarUrl || DEFAULT_HEDGEHOG}
                alt=""
                loading="lazy"
                className="aspect-square w-[13cqw] shrink-0 rounded-full border-[0.4cqw] border-white bg-tan object-cover object-top shadow-xl"
            />
        </div>
    </div>
)

type StrapiEntry = { id: number; attributes: Record<string, unknown> }

const transformStrapiSideProject = (entry: StrapiEntry): SideProject => ({
    id: entry.id,
    ...(entry.attributes as Omit<SideProject, 'id'>),
    tags: (entry.attributes.tags as string[]) || [],
})

// Side projects live in Strapi (like events) so team members can add and edit them in the site.
export const useSideProjects = (): {
    projects: SideProject[]
    loading: boolean
    // A failed fetch, as opposed to a legitimately empty gallery – lets the page offer a retry
    error: boolean
    refreshProjects: () => void
    deleteProject: (projectId: number) => void
} => {
    const { getJwt } = useUser()
    const { addToast } = useToast()
    const [projects, setProjects] = useState<SideProject[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const fetchProjects = useCallback(async () => {
        setLoading(true)
        setError(false)
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
            setProjects(collected)
        } catch (error) {
            console.warn('Failed to fetch side projects:', error)
            setError(true)
        } finally {
            setLoading(false)
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

    return { projects, loading, error, refreshProjects: fetchProjects, deleteProject }
}

type SideProjectFormValues = {
    title: string
    description: string
    projectAuthor: string
    authorGitHub: string
    githubUrl: string
    liveUrl: string
    tags: string
    // undefined means "automatic": classification falls back to the creator's team membership.
    // Only an explicit toggle by the moderator writes a boolean override.
    alumni: boolean | undefined
}

const toFormValues = (project?: SideProject): SideProjectFormValues => ({
    title: project?.title || '',
    description: project?.description || '',
    projectAuthor: project?.projectAuthor || '',
    authorGitHub: project?.authorGitHub || '',
    githubUrl: project?.githubUrl || '',
    liveUrl: project?.liveUrl || '',
    tags: (project?.tags || []).join(', '),
    alumni: project?.alumni,
})

// Add/edit form for logged-in PostHog team members, writing straight to the Strapi
// collection the gallery reads from. Opened as a window via addWindow (same pattern
// as community sign-in). location/newWindow are consumed by the window system.
export const SideProjectForm = ({
    project,
    existingTags,
    onSuccess,
    onCancel,
}: {
    project?: SideProject
    existingTags: string[]
    onSuccess: () => void
    onCancel?: () => void
    location?: { pathname: string }
    newWindow?: boolean
}): JSX.Element => {
    const { getJwt } = useUser()
    const { addToast } = useToast()
    const { closeWindow, setWindowTitle } = useApp()
    const { appWindow } = useWindow()
    const [values, setValues] = useState<SideProjectFormValues>(toFormValues(project))
    const [featuredImage, setFeaturedImage] = useState<UploadImage | { id: number; url: string } | undefined>(
        project?.projectThumbnail ? { id: 0, url: project.projectThumbnail } : undefined
    )
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [imageError, setImageError] = useState<string | null>(null)

    // The element key must stay "side-project-form" so the window system resolves the fixed
    // modal's appSettings, which means React reuses this instance when one project's form
    // replaces another's – re-seed the state whenever the target project changes so a submit
    // can't write a stale project's values to the new record
    useEffect(() => {
        setValues(toFormValues(project))
        setFeaturedImage(project?.projectThumbnail ? { id: 0, url: project.projectThumbnail } : undefined)
        setError(null)
        setImageError(null)
        if (appWindow) {
            setWindowTitle(appWindow, project ? 'Edit project' : 'Add a project')
        }
    }, [project?.id ?? project?.title ?? ''])

    const closeForm = () => {
        onCancel?.()
        if (appWindow) {
            closeWindow(appWindow)
        }
    }

    const setValue = (key: keyof SideProjectFormValues) => (event: React.ChangeEvent<HTMLInputElement>) =>
        setValues((prev) => ({ ...prev, [key]: event.target.value }))

    // Absolute http(s) URLs or site-relative paths like /deskhog (per the internal-link convention).
    // Must actually parse: a bare "http://" would throw when the card formats it for display
    const isValidProjectUrl = (value: string): boolean => {
        if (!/^(https?:\/\/|\/)/.test(value)) {
            return false
        }
        try {
            new URL(value, 'https://posthog.com')
            return true
        } catch {
            return false
        }
    }

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
                    // The added date drives "newest first" ordering: new entries get today,
                    // edits keep the existing date – including its absence, since undated
                    // legacy entries deliberately sort last
                    date: project ? project.date || null : new Date().toISOString().slice(0, 10),
                    projectAuthor: values.projectAuthor.trim(),
                    authorGitHub: values.authorGitHub.trim() || null,
                    // null preserves automatic alumni detection; a boolean is an explicit override
                    alumni: values.alumni ?? null,
                    // Not editable in the form, but must survive an edit
                    teamLink: project?.teamLink || null,
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
            if (appWindow) {
                closeWindow(appWindow)
            }
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : 'Something went wrong. Try again.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div data-scheme="secondary" className="bg-primary p-4 text-primary">
            <form onSubmit={handleSubmit} className="space-y-4">
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
                        Optional – a screenshot or artwork for the gallery card. Leave it out and we generate one for
                        you.
                    </p>
                    <ImageDrop
                        image={featuredImage}
                        onDrop={(image) => {
                            setFeaturedImage(image)
                            setImageError(null)
                        }}
                        onRemove={() => {
                            setFeaturedImage(undefined)
                            setImageError(null)
                        }}
                        accept={{
                            'image/png': ['.png'],
                            'image/jpeg': ['.jpg', '.jpeg'],
                            'image/webp': ['.webp'],
                            'image/gif': ['.gif'],
                        }}
                        onDropRejected={() =>
                            setImageError("That file can't be used – upload a single PNG, JPG, WebP, or GIF.")
                        }
                        className="h-32"
                    />
                    {imageError && <p className="m-0 mt-2 text-sm text-red">{imageError}</p>}
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
                        checked={Boolean(values.alumni)}
                        onChange={(event) => setValues((prev) => ({ ...prev, alumni: event.target.checked }))}
                    />
                    <span>
                        List under PostHog Alums{' '}
                        <span className="text-secondary">
                            (the creator has left PostHog – detected automatically from their community profile unless
                            set here)
                        </span>
                    </span>
                </label>
                <div className="flex items-center gap-2">
                    <OSButton type="submit" variant="primary" size="md" disabled={!canSubmit}>
                        {submitting ? 'Saving…' : project?.id ? 'Save changes' : 'Add project'}
                    </OSButton>
                    <OSButton type="button" size="md" onClick={closeForm}>
                        Cancel
                    </OSButton>
                </div>
                {error && <p className="text-sm text-red m-0">{error}</p>}
            </form>
        </div>
    )
}
