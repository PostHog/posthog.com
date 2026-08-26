import { HedgehogCodingGroup } from '@posthog/brand/hoggies'
import { IconArrowUpRight, IconChevronDown, IconPencil, IconSearch, IconSpinner, IconTrash } from '@posthog/icons'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import Editor from 'components/Editor'
import Link from 'components/Link'
import OSButton from 'components/OSButton'
import { OSInput, OSSelect } from 'components/OSForm'
import SEO from 'components/seo'
import {
    SideProjectForm,
    SideProjectGraphic,
    SideProjectThumbnail,
    findCreatorProfile,
    isAlumniProject,
    normalizeTags,
    useCreatorProfiles,
    useSideProjects,
    type CreatorProfile,
    type SideProject,
} from 'components/SideProjects'
import { navigate } from 'gatsby'
import { useUser } from 'hooks/useUser'
import React, { useEffect, useMemo, useState } from 'react'
import { useApp } from '../context/App'
import { useWindow } from '../context/Window'

const VISIBLE_TAG_COUNT = 10

const formatPrettyUrl = (url: string): string => {
    // A malformed stored URL must degrade to its raw text, not crash every visitor's gallery
    try {
        const { hostname, pathname } = new URL(url, 'https://posthog.com')
        return `${hostname}${pathname === '/' ? '' : pathname}`.replace(/\/$/, '')
    } catch {
        return url
    }
}

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
                ? 'border-primary bg-accent font-semibold text-primary'
                : 'border-primary bg-primary text-secondary hover:text-primary'
        }`}
    >
        {label}
        {count !== undefined && <span className="ml-1 opacity-60">{count}</span>}
    </button>
)

const ProjectCard = ({
    project,
    profiles,
    canEdit,
    onEdit,
    onDelete,
    showRole = true,
}: {
    project: SideProject
    profiles: CreatorProfile[]
    canEdit: boolean
    onEdit: (project: SideProject) => void
    onDelete: (projectId: number) => void
    showRole?: boolean
}) => {
    const { title, description, projectAuthor, authorGitHub, githubUrl, liveUrl, projectThumbnail } = project
    // Cards link straight to the project itself; prefer the live app over the repo
    const projectUrl = liveUrl || githubUrl
    const profile = findCreatorProfile(profiles, { projectAuthor, authorGitHub })
    const tags = normalizeTags(project.tags)
    const identityProps = {
        title,
        creatorName: projectAuthor,
        creatorRole: showRole ? profile?.companyRole : undefined,
        avatarUrl:
            profile?.avatar?.formats?.thumbnail?.url ||
            profile?.avatar?.url ||
            (authorGitHub ? `https://github.com/${authorGitHub}.png?size=256` : undefined),
    }

    return (
        <article
            data-scheme="secondary"
            className="group relative flex h-full flex-col overflow-hidden rounded-md border border-primary bg-primary transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg"
        >
            {canEdit && (
                <div className="absolute right-2 top-2 z-10 flex gap-1 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
                    <button
                        type="button"
                        onClick={() => onEdit(project)}
                        className="rounded-md border border-primary bg-primary p-1.5 text-secondary hover:text-primary"
                        aria-label={`Edit ${title}`}
                    >
                        <IconPencil className="size-4" />
                    </button>
                    {project.id && (
                        <button
                            type="button"
                            onClick={() => onDelete(project.id as number)}
                            className="rounded-md border border-primary bg-primary p-1.5 text-secondary hover:text-primary"
                            aria-label={`Delete ${title}`}
                        >
                            <IconTrash className="size-4" />
                        </button>
                    )}
                </div>
            )}
            <Link
                to={projectUrl || '/'}
                externalNoIcon
                state={projectUrl?.startsWith('/') ? { newWindow: true } : undefined}
                className="flex h-full min-h-0 flex-1 flex-col"
                wrapperClassName="flex h-full min-h-0 flex-1 flex-col"
            >
                <div className="border-b border-primary">
                    {projectThumbnail ? (
                        <SideProjectThumbnail src={projectThumbnail} {...identityProps} />
                    ) : (
                        <SideProjectGraphic {...identityProps} color={profile?.color} />
                    )}
                </div>
                <div className="p-3 pb-3">
                    {description && (
                        <p className="m-0 text-sm leading-relaxed text-secondary line-clamp-2 font-bold">
                            {description}
                        </p>
                    )}
                </div>
                <div className="mt-auto p-3 pt-0">
                    {tags.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-1">
                            {tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full border border-primary px-2 py-0.5 text-xs text-secondary"
                                >
                                    {tag}
                                </span>
                            ))}
                            {tags.length > 3 && (
                                <span className="px-1 py-0.5 text-xs text-secondary">+{tags.length - 3}</span>
                            )}
                        </div>
                    )}
                    {projectUrl && (
                        <div className="flex items-center justify-between gap-2 border-t border-primary pt-3 text-muted">
                            <span className="truncate text-xs font-semibold">{formatPrettyUrl(projectUrl)}</span>
                            {!projectUrl.startsWith('/') && <IconArrowUpRight className="size-4 shrink-0" />}
                        </div>
                    )}
                </div>
            </Link>
        </article>
    )
}

// A plain rolling hash keeps near-identical inputs (sequential ids, one-day-apart seeds) in
// nearly identical order, which defeats a shuffle – the murmur3 finalizer scrambles them apart
const hashString = (value: string): number => {
    let hash = 0
    for (let i = 0; i < value.length; i++) {
        hash = Math.imul(hash, 31) + value.charCodeAt(i)
    }
    hash ^= hash >>> 16
    hash = Math.imul(hash, 0x85ebca6b)
    hash ^= hash >>> 13
    hash = Math.imul(hash, 0xc2b2ae35)
    hash ^= hash >>> 16
    return hash
}

// Shuffle that reseeds daily, keyed on each project's identity (Strapi id, or title for
// entries not yet migrated) plus today's date: deterministic within a day (stable across
// re-renders and identical for every visitor) but different tomorrow, so the same cards
// aren't permanently at the top of the gallery.
const byDailyRotation = (projects: SideProject[]): SideProject[] => {
    const daySeed = new Date().toISOString().slice(0, 10)
    const rotationKey = (project: SideProject) => hashString(daySeed + String(project.id ?? project.title))
    return [...projects].sort((a, b) => rotationKey(a) - rotationKey(b) || a.title.localeCompare(b.title))
}

function SideProjectsPage({ location }: { location: { search: string } }): JSX.Element {
    const { projects, loading, error, refreshProjects, deleteProject } = useSideProjects()
    const profiles = useCreatorProfiles()
    const { isModerator } = useUser()
    const canEdit = isModerator

    const [searchQuery, setSearchQuery] = useState('')
    const [tagFilter, setTagFilter] = useState<string | null>(null)
    const [creatorFilter, setCreatorFilter] = useState<string | null>(null)
    const [showAllTags, setShowAllTags] = useState(false)
    const [alumniExpanded, setAlumniExpanded] = useState(false)
    const { addWindow } = useApp()

    // Sync filters with the URL on mount and on navigation. The app window's location is the
    // source of truth: when an existing /side-projects window is re-navigated (e.g. a docs link
    // with ?tag=...), only appWindow.location updates – the page's location prop stays stale.
    const { appWindow } = useWindow()
    const windowSearch = appWindow?.location?.search
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(windowSearch ?? window.location.search)
            setTagFilter(params.get('tag'))
            setCreatorFilter(params.get('creator'))
        }
    }, [location?.search, windowSearch])

    // Update URL when filters change. Go through the router (not history.replaceState) so the
    // app shell's stored window location stays in sync – refocusing the window re-navigates
    // using appWindow.location.search, which would otherwise restore the stale query.
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
        navigate(search ? `${window.location.pathname}?${search}` : window.location.pathname, { replace: true })
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

    const openForm = (project?: SideProject) => {
        addWindow(
            (
                <SideProjectForm
                    // The key must match the appSettings entry exactly or the window system
                    // won't apply the fixed-modal config; the form itself re-seeds its state
                    // when the target project changes, since React reuses the instance
                    key="side-project-form"
                    location={{
                        pathname: project ? `side-project-form-${project.id ?? project.title}` : 'side-project-form',
                    }}
                    newWindow
                    project={project}
                    existingTags={rankedTags.map(({ tag }) => tag)}
                    onSuccess={refreshProjects}
                />
            ) as Parameters<typeof addWindow>[0]
        )
    }

    // Split into current team members' projects and the alumni section
    const { currentProjects, alumniProjects } = useMemo(() => {
        const current: SideProject[] = []
        const alumni: SideProject[] = []
        projects.forEach((project) => {
            if (isAlumniProject(profiles, project)) {
                alumni.push(project)
            } else {
                current.push(project)
            }
        })
        return { currentProjects: byDailyRotation(current), alumniProjects: byDailyRotation(alumni) }
    }, [projects, profiles])

    // Tags ranked by how many projects use them; one-off tags stay searchable but don't clutter the bar
    const rankedTags = useMemo(() => {
        // Map instead of a plain object so tags named like Object.prototype members count correctly
        const counts = new Map<string, number>()
        projects.forEach((project) => {
            normalizeTags(project.tags).forEach((tag) => {
                counts.set(tag, (counts.get(tag) || 0) + 1)
            })
        })
        return Array.from(counts.entries())
            .filter(([, count]) => count >= 2)
            .sort(([tagA, countA], [tagB, countB]) => countB - countA || tagA.localeCompare(tagB))
            .map(([tag, count]) => ({ tag, count }))
    }, [projects])

    // Only current team members appear in the creator filter
    const allCreators = useMemo(() => {
        const creators = new Set<string>()
        currentProjects.forEach((project) => {
            if (project.projectAuthor) {
                creators.add(project.projectAuthor)
            }
        })
        return Array.from(creators).sort()
    }, [currentProjects])

    const applyFilters = (projectList: SideProject[]): SideProject[] => {
        const search = searchQuery.trim().toLowerCase()
        return projectList.filter((project) => {
            const { title, description, projectAuthor } = project
            const rawTags = project.tags || []
            const tags = normalizeTags(rawTags)
            if (tagFilter && !tags.includes(tagFilter)) {
                return false
            }
            if (creatorFilter && projectAuthor !== creatorFilter) {
                return false
            }
            if (search) {
                // Search both canonical and raw tags so aliased one-offs (e.g. dagster -> data) stay findable
                const haystack = [title, description, projectAuthor, ...tags, ...rawTags]
                    .filter(Boolean)
                    .join(' ')
                    .toLowerCase()
                return haystack.includes(search)
            }
            return true
        })
    }

    const filteredCurrent = useMemo(
        () => applyFilters(currentProjects),
        [currentProjects, searchQuery, tagFilter, creatorFilter]
    )
    const filteredAlumni = useMemo(
        () => applyFilters(alumniProjects),
        [alumniProjects, searchQuery, tagFilter, creatorFilter]
    )

    const hasActiveFilters = Boolean(searchQuery.trim() || tagFilter || creatorFilter)
    const visibleTags = showAllTags ? rankedTags : rankedTags.slice(0, VISIBLE_TAG_COUNT)

    // Auto-expand the alumni section when filters activate so matches aren't hidden,
    // while keeping the toggle functional – the user can still collapse it explicitly
    useEffect(() => {
        if (hasActiveFilters) {
            setAlumniExpanded(true)
        }
    }, [hasActiveFilters])
    const showAlumni = alumniExpanded

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
                    className="@container not-prose flex min-h-full flex-col gap-6 bg-transparent p-4 text-primary @xl:p-6 max-w-7xl mx-auto"
                >
                    <header className="grid gap-4 px-2 @3xl:grid-cols-[minmax(0,1fr)_minmax(18rem,26rem)] @3xl:items-center @3xl:gap-8">
                        <div className="min-w-0">
                            {/* show is set explicitly because the scroll trigger's rootMargin never
                                fires for a heading this close to the top of the pane */}
                            <h1 className="m-0 text-2xl @xl:text-3xl">
                                We make{' '}
                                <RoughAnnotation
                                    type="highlight"
                                    color="rgba(48, 164, 108, 0.2)"
                                    strokeWidth={1}
                                    padding={2}
                                    delay={300}
                                    show
                                >
                                    cool side projects
                                </RoughAnnotation>{' '}
                                too
                            </h1>
                            <p className="mb-0 mt-2 max-w-3xl text-base leading-relaxed text-secondary">
                                People at PostHog love building things. Sometimes they're small things that just help us
                                learn. Sometimes they're cute little games or tools we use everyday. Sometimes they can
                                grow into larger side hustles or even startups of their own. Regardless, we like them
                                and we collect them here.
                            </p>
                            <p className="mb-0 mt-3 max-w-3xl text-base leading-relaxed text-secondary">
                                If building things like this sounds like your idea of a good time, we actively encourage
                                it. Read our{' '}
                                <Link
                                    to="/handbook/people/side-gigs"
                                    state={{ newWindow: true }}
                                    className="font-semibold underline"
                                >
                                    side gigs policy
                                </Link>
                                , then{' '}
                                <Link to="/careers" state={{ newWindow: true }} className="font-semibold underline">
                                    come work with us
                                </Link>
                                .
                            </p>
                            <p className="mb-0 mt-4 max-w-3xl border-l-2 border-primary pl-3 text-xs italic leading-relaxed text-secondary opacity-80">
                                Boring small print: these are not PostHog products. If one bricks your computer, that's
                                between you and its creator.
                            </p>
                        </div>
                        <HedgehogCodingGroup className="w-full max-w-[22rem] justify-self-end" />
                    </header>

                    <div className="px-2">
                        {/* Filter toolbar */}
                        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                            <div className="flex min-w-0 items-center gap-2">
                                <div className="relative w-64 min-w-0 @xl:w-80">
                                    <IconSearch className="pointer-events-none absolute left-2 top-1/2 z-10 size-4 -translate-y-1/2 text-secondary" />
                                    <OSInput
                                        label="Search projects"
                                        showLabel={false}
                                        name="search"
                                        size="sm"
                                        placeholder="Search projects, tags, people"
                                        value={searchQuery}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                            setSearchQuery(event.target.value)
                                        }
                                        showClearButton
                                        onClear={() => setSearchQuery('')}
                                        className="h-8 pl-7"
                                        containerClassName="h-8"
                                    />
                                </div>
                                <div className="w-40 shrink-0">
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
                                        className="h-8 !py-0"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-secondary">
                                <span>
                                    {loading
                                        ? 'Loading…'
                                        : hasActiveFilters
                                        ? `${filteredCurrent.length + filteredAlumni.length} of ${
                                              projects.length
                                          } projects`
                                        : `${projects.length} projects`}
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
                            {canEdit && (
                                <OSButton
                                    variant="primary"
                                    size="sm"
                                    className="ml-auto"
                                    onClick={() => openForm(undefined)}
                                >
                                    Add a project
                                </OSButton>
                            )}
                        </div>

                        {/* Tag pills, most-used first */}
                        <div className="mb-6 flex flex-wrap items-center gap-1.5">
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
                                    {showAllTags ? 'Fewer tags' : `${rankedTags.length - VISIBLE_TAG_COUNT} more tags`}
                                </button>
                            )}
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-16">
                                <IconSpinner className="size-8 animate-spin opacity-50" />
                            </div>
                        ) : (
                            <>
                                {/* Project grid */}
                                <div className="grid grid-cols-1 gap-6 @xl:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4">
                                    {filteredCurrent.map((project) => (
                                        <ProjectCard
                                            key={project.id ?? project.title}
                                            project={project}
                                            profiles={profiles}
                                            canEdit={canEdit}
                                            onEdit={openForm}
                                            onDelete={deleteProject}
                                        />
                                    ))}
                                </div>

                                {/* No results message – a failed fetch shouldn't masquerade as an empty gallery */}
                                {filteredCurrent.length === 0 &&
                                    filteredAlumni.length === 0 &&
                                    (error && projects.length === 0 ? (
                                        <div className="py-12 text-center">
                                            <p className="m-0 text-secondary">
                                                Couldn't load projects – check your connection and try again.
                                            </p>
                                            <OSButton size="md" className="mt-2" onClick={refreshProjects}>
                                                Try again
                                            </OSButton>
                                        </div>
                                    ) : (
                                        <div className="py-12 text-center">
                                            <p className="m-0 text-secondary">No projects match the current filters.</p>
                                            <OSButton size="md" className="mt-2" onClick={clearFilters}>
                                                Clear filters
                                            </OSButton>
                                        </div>
                                    ))}

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
                                                {filteredAlumni.length} project
                                                {filteredAlumni.length === 1 ? '' : 's'}
                                            </span>
                                        </button>
                                        {showAlumni && (
                                            <>
                                                <p className="mb-6 mt-3 max-w-3xl text-base leading-relaxed text-secondary">
                                                    The number one reason people leave PostHog is to launch their own
                                                    start-ups or projects. We think that's great. Spend two years at
                                                    PostHog and we're even ready to{' '}
                                                    <Link
                                                        to="/handbook/people/benefits#well-be-your-first-investor"
                                                        state={{ newWindow: true }}
                                                        className="font-semibold underline"
                                                    >
                                                        be your first investor
                                                    </Link>
                                                    ! Here are some projects from PostHog alumni that we especially
                                                    like...
                                                </p>
                                                <div className="grid grid-cols-1 gap-6 @xl:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4">
                                                    {filteredAlumni.map((project) => (
                                                        <ProjectCard
                                                            key={project.id ?? project.title}
                                                            project={project}
                                                            profiles={profiles}
                                                            canEdit={canEdit}
                                                            onEdit={openForm}
                                                            onDelete={deleteProject}
                                                            showRole={false}
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
                            </>
                        )}
                    </div>
                </div>
            </Editor>
        </>
    )
}

export default SideProjectsPage
