import Explorer from 'components/Explorer'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import { OSInput, OSSelect } from 'components/OSForm'
import ScrollArea from 'components/RadixUI/ScrollArea'
import SEO from 'components/seo'
import { Creator, SideProjectForm, useCreatorProfiles, type SideProjectFrontmatter } from 'components/SideProjects'
import { graphql, useStaticQuery } from 'gatsby'
import { useUser } from 'hooks/useUser'
import React, { useEffect, useMemo, useState } from 'react'

// Hedgehog placeholder images for projects without thumbnails
const PLACEHOLDER_HOGS = [
    'https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/media/social-media-headers/hogs/builder_hog.png',
    'https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/media/social-media-headers/hogs/professor_hog.png',
    'https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/media/social-media-headers/hogs/detective_hog.png',
    'https://res.cloudinary.com/dmukukwp6/image/upload/v1/posthog.com/src/components/Product/hogs/product-analytics-hog.png',
    'https://res.cloudinary.com/dmukukwp6/image/upload/v1/posthog.com/src/components/Product/hogs/feature-flags-hog.png',
    'https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/hogs/ab-testing-hog.png',
]

// Get a deterministic placeholder based on title (same project always gets same hog)
const getPlaceholderHog = (title: string) => {
    const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return PLACEHOLDER_HOGS[hash % PLACEHOLDER_HOGS.length]
}

// Extract owner/repo from GitHub URL and return OpenGraph image URL
const getGitHubOGImage = (githubUrl?: string): string | null => {
    const match = githubUrl?.match(/github\.com\/([^/]+)\/([^/]+)/)
    if (match) {
        const [, owner, repo] = match
        return `https://opengraph.githubassets.com/1/${owner}/${repo}`
    }
    return null
}

type ProjectNode = {
    id: string
    fields: { slug: string }
    frontmatter: SideProjectFrontmatter
}

const VISIBLE_TAG_COUNT = 12

const TagPill = ({
    label,
    count,
    active,
    onClick,
}: {
    label: string
    count?: number
    active: boolean
    onClick: () => void
}) => (
    <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`rounded-full border px-2.5 py-0.5 text-[13px] transition-colors ${
            active
                ? 'border-orange bg-orange/10 font-semibold text-primary'
                : 'border-primary bg-primary text-secondary hover:text-primary'
        }`}
    >
        {label}
        {count !== undefined && <span className="ml-1 opacity-60">{count}</span>}
    </button>
)

function SideProjectsPage({ location }: { location: { search: string } }): JSX.Element {
    const {
        sideProjects: { nodes },
    } = useStaticQuery(query)
    const profiles = useCreatorProfiles()
    const { isModerator } = useUser()

    const [searchQuery, setSearchQuery] = useState('')
    const [tagFilter, setTagFilter] = useState<string | null>(null)
    const [creatorFilter, setCreatorFilter] = useState<string | null>(null)
    const [showAllTags, setShowAllTags] = useState(false)
    const [addingProject, setAddingProject] = useState(false)

    // Sync filters with the URL on mount and on router navigation (e.g. back/forward,
    // or clicking a link to /side-projects while already on a filtered view)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search)
            // Support legacy ?filter=tags&value= and ?author= formats too
            const tag = params.get('tag') || (params.get('filter') === 'tags' ? params.get('value') : null)
            const creator = params.get('creator') || params.get('author')
            setTagFilter(tag)
            setCreatorFilter(creator)
        }
    }, [location?.search])

    // Update URL when filters change
    const updateURL = (tag: string | null, creator: string | null) => {
        if (typeof window === 'undefined') {
            return
        }
        const params = new URLSearchParams()
        if (tag) {
            params.set('tag', tag)
        }
        if (creator) {
            params.set('creator', creator)
        }
        const search = params.toString()
        window.history.replaceState({}, '', search ? `${window.location.pathname}?${search}` : window.location.pathname)
    }

    const handleTagChange = (tag: string | null) => {
        setTagFilter(tag)
        updateURL(tag, creatorFilter)
    }

    const handleCreatorChange = (creator: string | null) => {
        setCreatorFilter(creator)
        updateURL(tagFilter, creator)
    }

    const clearFilters = () => {
        setSearchQuery('')
        setTagFilter(null)
        setCreatorFilter(null)
        updateURL(null, null)
    }

    // Tags ranked by how many projects use them, so the most useful filters come first
    const rankedTags = useMemo(() => {
        const counts: Record<string, number> = {}
        nodes.forEach((node: ProjectNode) => {
            node.frontmatter.filters?.tags?.forEach((tag) => {
                counts[tag] = (counts[tag] || 0) + 1
            })
        })
        return Object.entries(counts)
            .sort(([tagA, countA], [tagB, countB]) => countB - countA || tagA.localeCompare(tagB))
            .map(([tag, count]) => ({ tag, count }))
    }, [nodes])

    const allCreators = useMemo(() => {
        const creators = new Set<string>()
        nodes.forEach((node: ProjectNode) => {
            if (node.frontmatter.projectAuthor) {
                creators.add(node.frontmatter.projectAuthor)
            }
        })
        return Array.from(creators).sort()
    }, [nodes])

    const filteredProjects = useMemo(() => {
        const search = searchQuery.trim().toLowerCase()
        return nodes.filter((project: ProjectNode) => {
            const { title, description, projectAuthor, filters } = project.frontmatter
            if (tagFilter && !filters?.tags?.includes(tagFilter)) {
                return false
            }
            if (creatorFilter && projectAuthor !== creatorFilter) {
                return false
            }
            if (search) {
                const haystack = [title, description, projectAuthor, ...(filters?.tags || [])]
                    .filter(Boolean)
                    .join(' ')
                    .toLowerCase()
                return haystack.includes(search)
            }
            return true
        })
    }, [nodes, searchQuery, tagFilter, creatorFilter])

    const hasActiveFilters = Boolean(searchQuery.trim() || tagFilter || creatorFilter)
    const visibleTags = showAllTags ? rankedTags : rankedTags.slice(0, VISIBLE_TAG_COUNT)

    return (
        <>
            <SEO
                title="Side projects - PostHog"
                description="Side projects are awesome, help us learn, and make us better at building stuff. A collection of things the PostHog team has built."
                image="/images/og/default.png"
            />
            <Explorer template="generic" slug="side-projects" title="Side projects" fullScreen>
                <ScrollArea className="min-h-0 h-full">
                    <div data-scheme="primary" className="@container bg-primary text-primary px-4 pb-12 @2xl:px-8">
                        <header className="py-8 text-center">
                            <h1 className="m-0 text-3xl @2xl:text-4xl">Side projects</h1>
                            <p className="mt-3 mb-0 mx-auto max-w-2xl text-secondary text-base @2xl:text-lg">
                                Side projects are awesome, help us learn, and make us better at building stuff. Here's a
                                collection of things the PostHog team has built.
                            </p>
                        </header>

                        {addingProject && isModerator ? (
                            <div data-scheme="secondary" className="rounded border border-primary bg-primary p-4 mb-8">
                                <h2 className="mt-0 mb-4 text-xl">Add a project</h2>
                                <SideProjectForm
                                    existingTags={rankedTags.map(({ tag }) => tag)}
                                    onCancel={() => setAddingProject(false)}
                                />
                            </div>
                        ) : (
                            <>
                                {/* Filter toolbar */}
                                <div className="mb-3 flex flex-col gap-2 @xl:flex-row @xl:items-center">
                                    <div className="@xl:max-w-xs w-full">
                                        <OSInput
                                            label="Search projects"
                                            showLabel={false}
                                            name="search"
                                            size="sm"
                                            placeholder="Search projects, tags, and creators…"
                                            value={searchQuery}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                setSearchQuery(event.target.value)
                                            }
                                            showClearButton
                                            onClear={() => setSearchQuery('')}
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 @xl:ml-auto">
                                        <div className="w-48">
                                            <OSSelect
                                                label="Creator"
                                                showLabel={false}
                                                size="sm"
                                                placeholder="Filter by creator…"
                                                value={creatorFilter || ''}
                                                onChange={(value: string) => handleCreatorChange(value || null)}
                                                options={[
                                                    { label: 'Everyone', value: '' },
                                                    ...allCreators.map((creator) => ({
                                                        label: creator,
                                                        value: creator,
                                                    })),
                                                ]}
                                            />
                                        </div>
                                        {isModerator && (
                                            <OSButton
                                                variant="primary"
                                                size="sm"
                                                onClick={() => setAddingProject(true)}
                                            >
                                                Add a project
                                            </OSButton>
                                        )}
                                    </div>
                                </div>

                                {/* Tag pills, most-used first */}
                                <div className="mb-4 flex flex-wrap items-center gap-1.5">
                                    <TagPill label="All" active={!tagFilter} onClick={() => handleTagChange(null)} />
                                    {visibleTags.map(({ tag, count }) => (
                                        <TagPill
                                            key={tag}
                                            label={tag}
                                            count={count}
                                            active={tagFilter === tag}
                                            onClick={() => handleTagChange(tagFilter === tag ? null : tag)}
                                        />
                                    ))}
                                    {tagFilter && !visibleTags.some(({ tag }) => tag === tagFilter) && (
                                        <TagPill label={tagFilter} active onClick={() => handleTagChange(null)} />
                                    )}
                                    {rankedTags.length > VISIBLE_TAG_COUNT && (
                                        <button
                                            type="button"
                                            onClick={() => setShowAllTags(!showAllTags)}
                                            className="px-2 py-0.5 text-[13px] font-semibold text-secondary underline hover:text-primary"
                                        >
                                            {showAllTags
                                                ? 'Fewer tags'
                                                : `${rankedTags.length - VISIBLE_TAG_COUNT} more tags`}
                                        </button>
                                    )}
                                </div>

                                {/* Results count */}
                                <div className="mb-4 flex items-center gap-2 text-sm text-secondary">
                                    <span>
                                        {hasActiveFilters
                                            ? `Showing ${filteredProjects.length} of ${nodes.length} projects`
                                            : `${nodes.length} projects`}
                                    </span>
                                    {hasActiveFilters && (
                                        <button
                                            type="button"
                                            onClick={clearFilters}
                                            className="font-semibold underline hover:text-primary"
                                        >
                                            Clear filters
                                        </button>
                                    )}
                                </div>

                                {/* Project grid */}
                                <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @4xl:grid-cols-3">
                                    {filteredProjects.map(({ id, fields: { slug }, frontmatter }: ProjectNode) => {
                                        const {
                                            projectThumbnail,
                                            title,
                                            description,
                                            liveUrl,
                                            githubUrl,
                                            projectAuthor,
                                            authorGitHub,
                                            teamLink,
                                            filters,
                                        } = frontmatter
                                        const thumbnailSrc = projectThumbnail || getGitHubOGImage(githubUrl)
                                        return (
                                            <article
                                                key={id}
                                                data-scheme="secondary"
                                                className="group flex flex-col overflow-hidden rounded border border-primary bg-primary transition-transform duration-200 hover:-translate-y-0.5"
                                            >
                                                <Link to={slug} state={{ newWindow: true }} className="block">
                                                    <div className="flex aspect-video items-center justify-center overflow-hidden bg-accent border-b border-primary">
                                                        <img
                                                            src={thumbnailSrc || getPlaceholderHog(title)}
                                                            alt={title}
                                                            loading="lazy"
                                                            className={
                                                                thumbnailSrc
                                                                    ? 'size-full object-cover transition-transform duration-200 group-hover:scale-105'
                                                                    : 'h-3/4 w-auto object-contain transition-transform duration-200 group-hover:scale-110'
                                                            }
                                                        />
                                                    </div>
                                                    <div className="p-4 pb-2">
                                                        <div className="flex items-start justify-between gap-2">
                                                            <h3 className="m-0 text-lg group-hover:underline">
                                                                {title}
                                                            </h3>
                                                            {liveUrl && (
                                                                <span className="mt-1 shrink-0 rounded-full border border-green/50 bg-green/10 px-2 py-0.5 text-xs font-semibold text-green">
                                                                    Live
                                                                </span>
                                                            )}
                                                        </div>
                                                        {description && (
                                                            <p className="m-0 mt-1.5 text-sm text-secondary line-clamp-2">
                                                                {description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </Link>
                                                <div className="mt-auto p-4 pt-2">
                                                    {filters?.tags && filters.tags.length > 0 && (
                                                        <div className="mb-3 flex flex-wrap gap-1">
                                                            {filters.tags.slice(0, 3).map((tag) => (
                                                                <button
                                                                    key={tag}
                                                                    type="button"
                                                                    onClick={() => handleTagChange(tag)}
                                                                    className="rounded-full border border-primary px-2 py-0.5 text-xs text-secondary hover:text-primary"
                                                                >
                                                                    {tag}
                                                                </button>
                                                            ))}
                                                            {filters.tags.length > 3 && (
                                                                <span className="px-1 py-0.5 text-xs text-secondary">
                                                                    +{filters.tags.length - 3}
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                    <div className="border-t border-primary pt-3">
                                                        <Creator
                                                            projectAuthor={projectAuthor}
                                                            authorGitHub={authorGitHub}
                                                            teamLink={teamLink}
                                                            profiles={profiles}
                                                        />
                                                    </div>
                                                </div>
                                            </article>
                                        )
                                    })}
                                </div>

                                {/* No results message */}
                                {filteredProjects.length === 0 && (
                                    <div className="py-12 text-center">
                                        <p className="m-0 text-secondary">No projects match the current filters.</p>
                                        <OSButton size="md" className="mt-2" onClick={clearFilters}>
                                            Clear filters
                                        </OSButton>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </ScrollArea>
            </Explorer>
        </>
    )
}

const query = graphql`
    query {
        sideProjects: allMdx(
            filter: {
                fields: { slug: { regex: "/^/side-projects/(?!_)/" } }
                frontmatter: { projectAuthor: { ne: null } }
            }
            sort: { fields: frontmatter___title, order: ASC }
        ) {
            nodes {
                id
                fields {
                    slug
                }
                frontmatter {
                    projectThumbnail
                    title
                    description
                    liveUrl
                    githubUrl
                    projectAuthor
                    authorGitHub
                    teamLink
                    filters {
                        tags
                    }
                }
            }
        }
    }
`

export default SideProjectsPage
