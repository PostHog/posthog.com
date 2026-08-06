import CloudinaryImage from 'components/CloudinaryImage'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import { OSInput, OSTextarea } from 'components/OSForm'
import { graphql, useStaticQuery } from 'gatsby'
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
    avatar?: { formats?: { thumbnail?: { url?: string } } }
}

export type SideProjectFrontmatter = {
    title: string
    description?: string
    projectThumbnail?: string
    projectAuthor?: string
    authorGitHub?: string
    teamLink?: string
    githubUrl?: string
    liveUrl?: string
    filters?: { tags?: string[] }
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
                        formats {
                            thumbnail {
                                url
                            }
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
}: Pick<SideProjectFrontmatter, 'projectAuthor' | 'authorGitHub' | 'teamLink'> & {
    profiles: CreatorProfile[]
    size?: 'sm' | 'lg'
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
                {profile?.companyRole && (
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
    const [submitted, setSubmitted] = useState(false)

    const setValue = (key: keyof SideProjectFormValues) => (event: React.ChangeEvent<HTMLInputElement>) =>
        setValues((prev) => ({ ...prev, [key]: event.target.value }))

    const canSubmit = values.title.trim() && values.description.trim() && values.projectAuthor.trim()

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        if (!canSubmit) {
            return
        }
        window.open(getNewProjectUrl(values), '_blank', 'noopener')
        setSubmitted(true)
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
            <OSInput
                label="Thumbnail URL"
                name="projectThumbnail"
                direction="column"
                type="url"
                description="Optional – we fall back to the GitHub social image, then a hedgehog"
                value={values.projectThumbnail}
                onChange={setValue('projectThumbnail')}
            />
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
                    Continue on GitHub
                </OSButton>
                <OSButton type="button" size="md" onClick={onCancel}>
                    Cancel
                </OSButton>
            </div>
            {submitted && (
                <p className="text-sm text-secondary m-0">
                    We opened GitHub in a new tab with the file prefilled. Commit it there to open your pull request –
                    the project appears here once it's merged.
                </p>
            )}
        </form>
    )
}
