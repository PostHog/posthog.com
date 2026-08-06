import { Logo } from '@posthog/brand/logo'
import CloudinaryImage from 'components/CloudinaryImage'
import ImageDrop, { type Image as UploadImage } from 'components/ImageDrop'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import { OSInput, OSTextarea } from 'components/OSForm'
import uploadImage from 'components/Squeak/util/uploadImage'
import { PROFILE_COLORS } from 'constants/profileColors'
import { graphql, useStaticQuery } from 'gatsby'
import { useUser } from 'hooks/useUser'
import React, { useState } from 'react'

const REPO_BASE_URL = 'https://github.com/PostHog/posthog.com'
const CONTENT_DIR = 'contents/side-projects'

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

export type SideProjectFrontmatter = {
    title: string
    description?: string
    date?: string
    projectThumbnail?: string
    projectAuthor?: string
    authorGitHub?: string
    alumni?: boolean
    teamLink?: string
    githubUrl?: string
    liveUrl?: string
    filters?: { tags?: string[] }
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
    frontmatter: Pick<SideProjectFrontmatter, 'projectAuthor' | 'authorGitHub' | 'alumni'>
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
    { projectAuthor, authorGitHub }: Pick<SideProjectFrontmatter, 'projectAuthor' | 'authorGitHub'>
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
    { authorGitHub, teamLink }: Pick<SideProjectFrontmatter, 'authorGitHub' | 'teamLink'>
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
}: Pick<SideProjectFrontmatter, 'projectAuthor' | 'authorGitHub' | 'teamLink'> & {
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

export type SideProjectFormValues = {
    title: string
    description: string
    projectAuthor: string
    authorGitHub: string
    githubUrl: string
    liveUrl: string
    projectThumbnail: string
    tags: string
    body: string
}

export const slugifyProjectTitle = (title: string): string =>
    title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

export const buildSideProjectMdx = (values: SideProjectFormValues): string => {
    const tags = values.tags
        .split(',')
        .map((tag) => tag.trim().toLowerCase().replace(/\s+/g, '-'))
        .filter(Boolean)

    const lines = ['---', `title: ${values.title.trim()}`]
    if (values.description.trim()) {
        lines.push(`description: ${values.description.trim()}`)
    }
    // Added date drives the "newest first" ordering in the gallery
    lines.push(`date: ${new Date().toISOString().slice(0, 10)}`)
    if (values.projectThumbnail.trim()) {
        lines.push(`projectThumbnail: ${values.projectThumbnail.trim()}`)
    }
    lines.push(`projectAuthor: ${values.projectAuthor.trim()}`)
    if (values.authorGitHub.trim()) {
        lines.push(`authorGitHub: ${values.authorGitHub.trim()}`)
    }
    if (values.githubUrl.trim()) {
        lines.push(`githubUrl: ${values.githubUrl.trim()}`)
    }
    if (values.liveUrl.trim()) {
        lines.push(`liveUrl: ${values.liveUrl.trim()}`)
    }
    if (tags.length > 0) {
        lines.push('filters:', '  tags:', ...tags.map((tag) => `    - ${tag}`))
    }
    lines.push('---', '', values.body.trim() || values.description.trim(), '')
    return lines.join('\n')
}

// Prefilled GitHub "create new file" page – committing it opens a PR against the repo
export const getNewProjectUrl = (values: SideProjectFormValues): string => {
    const slug = slugifyProjectTitle(values.title)
    const params = new URLSearchParams({
        filename: `${slug}/index.mdx`,
        value: buildSideProjectMdx(values),
    })
    return `${REPO_BASE_URL}/new/master/${CONTENT_DIR}?${params.toString()}`
}

// relativePath is relative to contents/ (e.g. side-projects/deskhog/index.mdx)
export const getEditProjectUrl = (relativePath: string): string =>
    `${REPO_BASE_URL}/edit/master/contents/${relativePath}`

// Add-a-project form for logged-in PostHog team members. Side projects live as MDX files in
// the posthog.com repo, so submitting hands off to a prefilled GitHub commit page instead of
// writing to an API – the change still ships as a normal pull request.
export const SideProjectForm = ({
    existingTags,
    onCancel,
}: {
    existingTags: string[]
    onCancel: () => void
}): JSX.Element => {
    const { getJwt } = useUser()
    const [values, setValues] = useState<SideProjectFormValues>({
        title: '',
        description: '',
        projectAuthor: '',
        authorGitHub: '',
        githubUrl: '',
        liveUrl: '',
        projectThumbnail: '',
        tags: '',
        body: '',
    })
    const [featuredImage, setFeaturedImage] = useState<UploadImage | undefined>(undefined)
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const setValue = (key: keyof SideProjectFormValues) => (event: React.ChangeEvent<HTMLInputElement>) =>
        setValues((prev) => ({ ...prev, [key]: event.target.value }))

    const canSubmit =
        Boolean(values.title.trim() && values.description.trim() && values.projectAuthor.trim()) && !submitting

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        if (!canSubmit) {
            return
        }
        setSubmitting(true)
        setError(null)
        try {
            let thumbnailUrl = values.projectThumbnail
            if (featuredImage?.file) {
                const uploaded = await uploadImage(featuredImage.file, await getJwt())
                thumbnailUrl = uploaded?.url || thumbnailUrl
            }
            window.open(getNewProjectUrl({ ...values, projectThumbnail: thumbnailUrl }), '_blank', 'noopener')
            setSubmitted(true)
        } catch (uploadError) {
            setError(
                uploadError instanceof Error
                    ? uploadError.message
                    : 'Image upload failed. Try again, or submit without an image.'
            )
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
            <p className="text-sm text-secondary m-0">
                Projects are MDX files in the posthog.com repo. Fill this out and we'll prefill the file on GitHub –
                committing it there opens the pull request.
            </p>
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
                type="url"
                value={values.githubUrl}
                onChange={setValue('githubUrl')}
            />
            <OSInput
                label="Live URL"
                name="liveUrl"
                direction="column"
                type="url"
                description="Where people can try it"
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
            <OSTextarea
                label="About the project"
                name="body"
                direction="column"
                rows={4}
                description="A paragraph or two for the project's page. Markdown works."
                value={values.body}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setValues((prev) => ({ ...prev, body: event.target.value }))
                }
            />
            <div className="flex items-center gap-2">
                <OSButton type="submit" variant="primary" size="md" disabled={!canSubmit}>
                    {submitting ? 'Uploading image…' : 'Continue on GitHub'}
                </OSButton>
                <OSButton type="button" size="md" onClick={onCancel}>
                    Cancel
                </OSButton>
            </div>
            {error && <p className="text-sm text-red m-0">{error}</p>}
            {submitted && (
                <p className="text-sm text-secondary m-0">
                    We opened GitHub in a new tab with the file prefilled. Commit it there to open your pull request –
                    the project appears here once it's merged.
                </p>
            )}
        </form>
    )
}
