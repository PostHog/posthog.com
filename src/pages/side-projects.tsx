import { HedgehogCodingGroup } from '@posthog/brand/hoggies'
import { IconChevronDown, IconPencil } from '@posthog/icons'
import Editor from 'components/Editor'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import { OSInput, OSSelect } from 'components/OSForm'
import SEO from 'components/seo'
import {
    Creator,
    SideProjectForm,
    SideProjectGraphic,
    findCreatorProfile,
    getEditProjectUrl,
    isAlumniProject,
    isNonEngineerProject,
    normalizeTags,
    useCreatorProfiles,
    type CreatorProfile,
    type SideProjectFrontmatter,
} from 'components/SideProjects'
import { graphql, useStaticQuery } from 'gatsby'
import { useUser } from 'hooks/useUser'
import React, { useEffect, useMemo, useState } from 'react'

type ProjectNode = {
    id: string
    fields: { slug: string }
    parent?: { relativePath?: string }
    frontmatter: SideProjectFrontmatter
}

const VISIBLE_TAG_COUNT = 10

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

const ProjectCard = ({
    node,
    profiles,
    canEdit,
    onTagClick,
}: {
    node: ProjectNode
    profiles: CreatorProfile[]
    canEdit: boolean
    onTagClick: (tag: string) => void
}) => {
    const {
        fields: { slug },
        frontmatter,
    } = node
    const { projectThumbnail, title, description, projectAuthor, authorGitHub, teamLink, filters } = frontmatter
    const profile = findCreatorProfile(profiles, { projectAuthor, authorGitHub })
    const tags = normalizeTags(filters?.tags)
    const nonEngineer = isNonEngineerProject(profiles, { projectAuthor, authorGitHub })
    const relativePath = node.parent?.relativePath

    return (
        <article
            data-scheme="secondary"
            className="group relative flex flex-col overflow-hidden rounded-md border border-primary bg-primary transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg"
        >
            {canEdit && relativePath && (
                <Link
                    to={getEditProjectUrl(relativePath)}
                    externalNoIcon
                    className="absolute right-2 top-2 z-10 rounded-md border border-primary bg-primary p-1.5 text-secondary opacity-0 transition-opacity hover:text-primary group-hover:opacity-100"
                    aria-label={`Edit ${title}`}
                >
                    <IconPencil className="size-4" />
                </Link>
            )}
            <Link to={slug} state={{ newWindow: true }} className="block">
                <div className="border-b border-primary">
                    {projectThumbnail ? (
                        <div className="flex aspect-video items-center justify-center overflow-hidden bg-accent">
                            <img
                                src={projectThumbnail}
                                alt={title}
                                loading="lazy"
                                className="size-full object-cover transition-transform duration-200 group-hover:scale-105"
                            />
                        </div>
                    ) : (
                        <SideProjectGraphic
                            title={title}
                            creatorName={projectAuthor}
                            creatorRole={profile?.companyRole}
                            avatarUrl={
                                profile?.avatar?.url ||
                                profile?.avatar?.formats?.thumbnail?.url ||
                                (authorGitHub ? `https://github.com/${authorGitHub}.png?size=256` : undefined)
                            }
                            color={profile?.color}
                        />
                    )}
                </div>
                <div className="p-5 pb-3">
                    <h3 className="m-0 text-lg leading-snug group-hover:underline">{title}</h3>
                    {description && (
                        <p className="m-0 mt-2 text-sm leading-relaxed text-secondary line-clamp-2">{description}</p>
                    )}
                </div>
            </Link>
            <div className="mt-auto p-5 pt-2">
                {(tags.length > 0 || nonEngineer) && (
                    <div className="mb-4 flex flex-wrap gap-1">
                        {nonEngineer && (
                            <span className="rounded-full border border-purple bg-purple/10 px-2 py-0.5 text-xs font-semibold text-purple">
                                Not made by an engineer
                            </span>
                        )}
                        {tags.slice(0, 3).map((tag) => (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => onTagClick(tag)}
                                className="rounded-full border border-primary px-2 py-0.5 text-xs text-secondary hover:text-primary"
                            >
                                {tag}
                            </button>
                        ))}
                        {tags.length > 3 && (
                            <span className="px-1 py-0.5 text-xs text-secondary">+{tags.length - 3}</span>
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
}

// Newest first: entries carry an added date in frontmatter; undated legacy entries sort last, alphabetically
const byMostRecent = (a: ProjectNode, b: ProjectNode): number => {
    const dateA = a.frontmatter.date ? new Date(a.frontmatter.date).getTime() : 0
    const dateB = b.frontmatter.date ? new Date(b.frontmatter.date).getTime() : 0
    return dateB - dateA || a.frontmatter.title.localeCompare(b.frontmatter.title)
}

function SideProjectsPage({ location }: { location: { search: string } }): JSX.Element {
    const {
        sideProjects: { nodes },
    } = useStaticQuery(query)
    const profiles = useCreatorProfiles()
    const { isModerator } = useUser()
    // Dev builds show the team-gated add/edit UI without sign-in so preview environments can exercise the flow
    const canEdit = isModerator || process.env.NODE_ENV === 'development'

    const [searchQuery, setSearchQuery] = useState('')
    const [tagFilter, setTagFilter] = useState<string | null>(null)
    const [creatorFilter, setCreatorFilter] = useState<string | null>(null)
    const [nonEngineersOnly, setNonEngineersOnly] = useState(false)
    const [showAllTags, setShowAllTags] = useState(false)
    const [addingProject, setAddingProject] = useState(false)
    const [alumniExpanded, setAlumniExpanded] = useState(false)

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
        setNonEngineersOnly(false)
        updateURL(null, null)
    }

    // Split into current team members' projects and the alumni section
    const { currentProjects, alumniProjects } = useMemo(() => {
        const current: ProjectNode[] = []
        const alumni: ProjectNode[] = []
        nodes.forEach((node: ProjectNode) => {
            if (isAlumniProject(profiles, node.frontmatter)) {
                alumni.push(node)
            } else {
                current.push(node)
            }
        })
        return { currentProjects: current.sort(byMostRecent), alumniProjects: alumni.sort(byMostRecent) }
    }, [nodes, profiles])

    // Tags ranked by how many projects use them; one-off tags stay searchable but don't clutter the bar
    const rankedTags = useMemo(() => {
        const counts: Record<string, number> = {}
        nodes.forEach((node: ProjectNode) => {
            normalizeTags(node.frontmatter.filters?.tags).forEach((tag) => {
                counts[tag] = (counts[tag] || 0) + 1
            })
        })
        return Object.entries(counts)
            .filter(([, count]) => count >= 2)
            .sort(([tagA, countA], [tagB, countB]) => countB - countA || tagA.localeCompare(tagB))
            .map(([tag, count]) => ({ tag, count }))
    }, [nodes])

    // Only current team members appear in the creator filter
    const allCreators = useMemo(() => {
        const creators = new Set<string>()
        currentProjects.forEach((node: ProjectNode) => {
            if (node.frontmatter.projectAuthor) {
                creators.add(node.frontmatter.projectAuthor)
            }
        })
        return Array.from(creators).sort()
    }, [currentProjects])

    const applyFilters = (projects: ProjectNode[]): ProjectNode[] => {
        const search = searchQuery.trim().toLowerCase()
        return projects.filter((project: ProjectNode) => {
            const { title, description, projectAuthor, authorGitHub, filters } = project.frontmatter
            const tags = normalizeTags(filters?.tags)
            if (tagFilter && !tags.includes(tagFilter)) {
                return false
            }
            if (creatorFilter && projectAuthor !== creatorFilter) {
                return false
            }
            if (nonEngineersOnly && !isNonEngineerProject(profiles, { projectAuthor, authorGitHub })) {
                return false
            }
            if (search) {
                const haystack = [title, description, projectAuthor, ...tags].filter(Boolean).join(' ').toLowerCase()
                return haystack.includes(search)
            }
            return true
        })
    }

    const filteredCurrent = useMemo(
        () => applyFilters(currentProjects),
        [currentProjects, searchQuery, tagFilter, creatorFilter, nonEngineersOnly, profiles]
    )
    const filteredAlumni = useMemo(
        () => applyFilters(alumniProjects),
        [alumniProjects, searchQuery, tagFilter, creatorFilter, nonEngineersOnly, profiles]
    )

    const hasActiveFilters = Boolean(searchQuery.trim() || tagFilter || creatorFilter || nonEngineersOnly)
    const visibleTags = showAllTags ? rankedTags : rankedTags.slice(0, VISIBLE_TAG_COUNT)
    const showAlumni = alumniExpanded || hasActiveFilters

    return (
        <>
            <SEO
                title="Side projects - PostHog"
                description="People at PostHog love building things. A collection of side projects, games, tools, and startups the PostHog team has built."
                image="/images/og/default.png"
            />
            <Editor
                hideToolbar
                hasPadding={false}
                type="side-projects"
                proseSize="base"
                maxWidth="100%"
                bookmark={{
                    title: 'Side projects',
                    description: 'A collection of things the PostHog team has built',
                }}
            >
                <div
                    data-scheme="primary"
                    className="@container not-prose flex min-h-full flex-col gap-6 bg-transparent p-4 text-primary @xl:p-6"
                >
                    <header className="grid gap-4 px-2 @3xl:grid-cols-[minmax(0,1fr)_minmax(18rem,26rem)] @3xl:items-center @3xl:gap-8">
                        <div className="min-w-0">
                            <h1 className="m-0 text-2xl @xl:text-3xl">We make cool side projects too</h1>
                            <p className="mb-0 mt-2 max-w-3xl text-base leading-relaxed text-secondary">
                                People at PostHog love building things. Sometimes they're small things that just help us
                                learn. Sometimes they're cute little games or tools we use everyday. Sometimes they can
                                grow into larger side hustles or even startups of their own. Regardless, we like them
                                and we collect them here.
                            </p>
                        </div>
                        <HedgehogCodingGroup className="w-full max-w-[22rem] justify-self-end" />
                    </header>

                    {addingProject && canEdit ? (
                        <div data-scheme="secondary" className="mx-2 rounded-md border border-primary bg-primary p-6">
                            <h2 className="mt-0 mb-4 text-xl">Add a project</h2>
                            <SideProjectForm
                                existingTags={rankedTags.map(({ tag }) => tag)}
                                onCancel={() => setAddingProject(false)}
                            />
                        </div>
                    ) : (
                        <div className="px-2">
                            {/* Filter toolbar */}
                            <div className="mb-4 flex flex-col gap-3 @xl:flex-row @xl:items-center">
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
                                    {canEdit && (
                                        <OSButton variant="primary" size="sm" onClick={() => setAddingProject(true)}>
                                            Add a project
                                        </OSButton>
                                    )}
                                </div>
                            </div>

                            {/* Tag pills, most-used first */}
                            <div className="mb-3 flex flex-wrap items-center gap-1.5">
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
                                <span className="mx-1 h-4 w-px bg-border" />
                                <button
                                    type="button"
                                    onClick={() => setNonEngineersOnly(!nonEngineersOnly)}
                                    aria-pressed={nonEngineersOnly}
                                    className={`rounded-full border px-2.5 py-0.5 text-[13px] transition-colors ${
                                        nonEngineersOnly
                                            ? 'border-purple bg-purple/10 font-semibold text-purple'
                                            : 'border-primary bg-primary text-secondary hover:text-primary'
                                    }`}
                                >
                                    Not made by engineers
                                </button>
                            </div>

                            {/* Results count */}
                            <div className="mb-6 flex items-center gap-2 text-sm text-secondary">
                                <span>
                                    {hasActiveFilters
                                        ? `Showing ${filteredCurrent.length + filteredAlumni.length} of ${
                                              nodes.length
                                          } projects`
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
                            <div className="grid grid-cols-1 gap-6 @xl:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4">
                                {filteredCurrent.map((node: ProjectNode) => (
                                    <ProjectCard
                                        key={node.id}
                                        node={node}
                                        profiles={profiles}
                                        canEdit={canEdit}
                                        onTagClick={handleTagChange}
                                    />
                                ))}
                            </div>

                            {/* No results message */}
                            {filteredCurrent.length === 0 && filteredAlumni.length === 0 && (
                                <div className="py-12 text-center">
                                    <p className="m-0 text-secondary">No projects match the current filters.</p>
                                    <OSButton size="md" className="mt-2" onClick={clearFilters}>
                                        Clear filters
                                    </OSButton>
                                </div>
                            )}

                            {/* Alumni section, collapsed by default */}
                            {alumniProjects.length > 0 && (
                                <section className="mt-12">
                                    <button
                                        type="button"
                                        onClick={() => setAlumniExpanded(!alumniExpanded)}
                                        aria-expanded={showAlumni}
                                        className="flex w-full items-center gap-2 border-t border-primary pt-6 text-left"
                                    >
                                        <IconChevronDown
                                            className={`size-5 shrink-0 text-secondary transition-transform ${
                                                showAlumni ? '' : '-rotate-90'
                                            }`}
                                        />
                                        <h2 className="m-0 text-xl">PostHog Alums...</h2>
                                        <span className="text-sm text-secondary">
                                            {filteredAlumni.length} project{filteredAlumni.length === 1 ? '' : 's'}
                                        </span>
                                    </button>
                                    {showAlumni && (
                                        <>
                                            <p className="mb-6 mt-3 max-w-3xl text-base leading-relaxed text-secondary">
                                                The number one reason people leave PostHog is to launch their own
                                                start-ups or projects. We think that's great. Spend two years at PostHog
                                                and we're even ready to{' '}
                                                <Link
                                                    to="/handbook/people/benefits#well-be-your-first-investor"
                                                    state={{ newWindow: true }}
                                                    className="font-semibold underline"
                                                >
                                                    be your first investor
                                                </Link>
                                                ! Here are some projects from PostHog alumni that we especially like...
                                            </p>
                                            <div className="grid grid-cols-1 gap-6 @xl:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4">
                                                {filteredAlumni.map((node: ProjectNode) => (
                                                    <ProjectCard
                                                        key={node.id}
                                                        node={node}
                                                        profiles={profiles}
                                                        canEdit={canEdit}
                                                        onTagClick={handleTagChange}
                                                    />
                                                ))}
                                            </div>
                                            {filteredAlumni.length === 0 && (
                                                <p className="text-sm text-secondary">
                                                    No alumni projects match the current filters.
                                                </p>
                                            )}
                                        </>
                                    )}
                                </section>
                            )}
                        </div>
                    )}
                </div>
            </Editor>
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
                parent {
                    ... on File {
                        relativePath
                    }
                }
                frontmatter {
                    projectThumbnail
                    title
                    description
                    date(formatString: "YYYY-MM-DD")
                    liveUrl
                    githubUrl
                    projectAuthor
                    authorGitHub
                    alumni
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
