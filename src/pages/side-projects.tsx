import Layout from 'components/Layout'
import Link from 'components/Link'
import { SEO } from 'components/seo'
import { graphql, useStaticQuery } from 'gatsby'
import React, { useState, useEffect, useMemo } from 'react'
import { IconX, IconChevronDown } from '@posthog/icons'

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
const getGitHubOGImage = (githubUrl: string): string | null => {
    try {
        const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/)
        if (match) {
            const [, owner, repo] = match
            return `https://opengraph.githubassets.com/1/${owner}/${repo}`
        }
    } catch {
        // Fall through to return null
    }
    return null
}

interface FilterChipProps {
    label: string
    onRemove: () => void
}

const FilterChip: React.FC<FilterChipProps> = ({ label, onRemove }) => (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-sm bg-accent dark:bg-accent-dark border border-light dark:border-dark">
        {label}
        <button
            onClick={(e) => {
                e.preventDefault()
                onRemove()
            }}
            className="hover:text-red dark:hover:text-yellow"
        >
            <IconX className="w-4 h-4" />
        </button>
    </span>
)

function SideProjectsPage() {
    const {
        sideProjects: { nodes },
        profiles: { nodes: profileNodes },
    } = useStaticQuery(query)

    // Create a lookup map from GitHub username to community profile ID
    const githubToProfile = useMemo(() => {
        const map: Record<string, string> = {}
        profileNodes.forEach((profile: { github?: string; squeakId: string }) => {
            if (profile.github) {
                // Handle both full URLs and usernames
                const username = profile.github.replace(/^https?:\/\/github\.com\//, '').replace(/\/$/, '')
                map[username.toLowerCase()] = profile.squeakId
            }
        })
        return map
    }, [profileNodes])

    const [tagFilter, setTagFilter] = useState<string | null>(null)
    const [authorFilter, setAuthorFilter] = useState<string | null>(null)
    const [filtersExpanded, setFiltersExpanded] = useState(false)

    // Read filters from URL on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search)
            // Support both ?tag= and ?filter=tags&value= formats
            const tag = params.get('tag') || (params.get('filter') === 'tags' ? params.get('value') : null)
            const author = params.get('author')
            if (tag) {
                setTagFilter(tag)
                setFiltersExpanded(true)
            }
            if (author) {
                setAuthorFilter(author)
                setFiltersExpanded(true)
            }
        }
    }, [])

    // Update URL when filters change
    const updateURL = (tag: string | null, author: string | null) => {
        if (typeof window === 'undefined') return
        const params = new URLSearchParams()
        if (tag) params.set('tag', tag)
        if (author) params.set('author', author)
        const newURL = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname
        window.history.replaceState({}, '', newURL)
    }

    const handleTagChange = (tag: string | null) => {
        setTagFilter(tag)
        updateURL(tag, authorFilter)
    }

    const handleAuthorChange = (author: string | null) => {
        setAuthorFilter(author)
        updateURL(tagFilter, author)
    }

    const clearFilters = () => {
        setTagFilter(null)
        setAuthorFilter(null)
        updateURL(null, null)
    }

    // Extract unique tags from all projects
    const allTags = useMemo(() => {
        const tags = new Set<string>()
        nodes.forEach((node: any) => {
            node.frontmatter.filters?.tags?.forEach((tag: string) => tags.add(tag))
        })
        return Array.from(tags).sort()
    }, [nodes])

    // Extract unique authors from all projects
    const allAuthors = useMemo(() => {
        const authors = new Set<string>()
        nodes.forEach((node: any) => {
            if (node.frontmatter.projectAuthor) {
                authors.add(node.frontmatter.projectAuthor)
            }
        })
        return Array.from(authors).sort()
    }, [nodes])

    // Filter projects based on active filters
    const filteredProjects = useMemo(() => {
        let filtered = nodes

        if (tagFilter) {
            filtered = filtered.filter((project: any) => project.frontmatter.filters?.tags?.includes(tagFilter))
        }

        if (authorFilter) {
            filtered = filtered.filter((project: any) => project.frontmatter.projectAuthor === authorFilter)
        }

        return filtered
    }, [nodes, tagFilter, authorFilter])

    const hasActiveFilters = tagFilter || authorFilter

    return (
        <Layout>
            <SEO
                title="PostHog Side Projects"
                description="Side projects let us express ourselves and make us better at our jobs. A collection of projects folks at PostHog have worked on."
                image="/images/side-projects-og.png"
            />
            <header className="py-12 px-5">
                <h1 className="m-0 text-center text-4xl md:text-5xl lg:text-6xl text-primary dark:text-primary-dark">
                    Side Projects
                </h1>
                <p className="my-4 mx-auto text-center text-lg md:text-xl font-semibold text-primary/75 dark:text-primary-dark/75 max-w-2xl">
                    Side projects let us express ourselves and make us better at our jobs. Here's a collection of
                    projects folks at PostHog have worked on.
                </p>
            </header>

            <div className="max-w-6xl mx-auto px-4 pb-12">
                {/* Filter bar */}
                <div className="mb-6">
                    <button
                        onClick={() => setFiltersExpanded(!filtersExpanded)}
                        className="flex items-center gap-2 text-sm font-medium text-primary/75 dark:text-primary-dark/75 hover:text-primary dark:hover:text-primary-dark"
                    >
                        <IconChevronDown
                            className={`w-5 h-5 transition-transform ${filtersExpanded ? 'rotate-180' : ''}`}
                        />
                        <span>Filters</span>
                        {hasActiveFilters && <span className="w-2 h-2 bg-red dark:bg-yellow rounded-full" />}
                    </button>

                    {/* Collapsible filter panel */}
                    {filtersExpanded && (
                        <div className="mt-3 p-4 bg-accent dark:bg-accent-dark rounded-lg border border-light dark:border-dark">
                            <div className="flex flex-wrap gap-4 items-end">
                                {/* Tag filter */}
                                <div className="flex-1 min-w-[150px] max-w-[200px]">
                                    <label className="block text-sm font-medium text-primary/75 dark:text-primary-dark/75 mb-1">
                                        Tag
                                    </label>
                                    <select
                                        value={tagFilter || ''}
                                        onChange={(e) => handleTagChange(e.target.value || null)}
                                        className="w-full px-3 py-2 rounded-md border border-light dark:border-dark bg-white dark:bg-dark text-primary dark:text-primary-dark text-sm"
                                    >
                                        <option value="">All tags</option>
                                        {allTags.map((tag) => (
                                            <option key={tag} value={tag}>
                                                {tag}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Author filter */}
                                <div className="flex-1 min-w-[150px] max-w-[200px]">
                                    <label className="block text-sm font-medium text-primary/75 dark:text-primary-dark/75 mb-1">
                                        Author
                                    </label>
                                    <select
                                        value={authorFilter || ''}
                                        onChange={(e) => handleAuthorChange(e.target.value || null)}
                                        className="w-full px-3 py-2 rounded-md border border-light dark:border-dark bg-white dark:bg-dark text-primary dark:text-primary-dark text-sm"
                                    >
                                        <option value="">All authors</option>
                                        {allAuthors.map((author) => (
                                            <option key={author} value={author}>
                                                {author}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Clear filters button */}
                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="px-3 py-2 text-sm font-medium text-red dark:text-yellow hover:underline"
                                    >
                                        Clear filters
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Active filters and results count */}
                <div className="mb-4 flex flex-wrap items-center gap-2">
                    {hasActiveFilters && (
                        <>
                            {tagFilter && (
                                <FilterChip label={`Tag: ${tagFilter}`} onRemove={() => handleTagChange(null)} />
                            )}
                            {authorFilter && (
                                <FilterChip
                                    label={`Author: ${authorFilter}`}
                                    onRemove={() => handleAuthorChange(null)}
                                />
                            )}
                        </>
                    )}
                    <span className="text-sm text-primary/60 dark:text-primary-dark/60">
                        {hasActiveFilters
                            ? `Showing ${filteredProjects.length} of ${nodes.length} projects`
                            : `${nodes.length} projects`}
                    </span>
                </div>

                {/* Project grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map(
                        ({
                            id,
                            fields: { slug },
                            frontmatter: {
                                projectThumbnail,
                                title,
                                description,
                                liveUrl,
                                githubUrl,
                                projectAuthor,
                                authorGitHub,
                            },
                        }: any) => {
                            const thumbnailSrc = projectThumbnail || getGitHubOGImage(githubUrl)
                            const profileId = authorGitHub && githubToProfile[authorGitHub.toLowerCase()]
                            const authorUrl = profileId
                                ? `/community/profiles/${profileId}`
                                : authorGitHub
                                ? `https://github.com/${authorGitHub}`
                                : null
                            return (
                                <div
                                    key={id}
                                    className="group bg-accent dark:bg-accent-dark rounded-lg overflow-hidden border border-light dark:border-dark hover:border-primary/25 dark:hover:border-primary-dark/25 hover:scale-[1.02] transition-all duration-200"
                                >
                                    <Link to={slug} className="block">
                                        <div className="aspect-video bg-light dark:bg-dark overflow-hidden flex items-center justify-center">
                                            {thumbnailSrc ? (
                                                <img
                                                    src={thumbnailSrc}
                                                    alt={title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                                />
                                            ) : (
                                                <img
                                                    src={getPlaceholderHog(title)}
                                                    alt={title}
                                                    className="w-auto h-3/4 object-contain group-hover:scale-110 transition-transform duration-200"
                                                />
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className="m-0 text-lg font-bold text-primary dark:text-primary-dark group-hover:text-red dark:group-hover:text-yellow transition-colors">
                                                    {title}
                                                </h3>
                                                {liveUrl && (
                                                    <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green/10 text-green dark:bg-green/20">
                                                        Live
                                                    </span>
                                                )}
                                            </div>
                                            {description && (
                                                <p className="m-0 mt-2 text-sm text-primary/70 dark:text-primary-dark/70 line-clamp-2">
                                                    {description}
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                    {projectAuthor && (
                                        <div className="px-4 pb-4 -mt-2">
                                            {authorUrl ? (
                                                <Link
                                                    to={authorUrl}
                                                    className="inline-flex items-center gap-1.5 text-xs text-primary/60 dark:text-primary-dark/60 hover:text-red dark:hover:text-yellow"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    {authorGitHub && (
                                                        <img
                                                            src={`https://github.com/${authorGitHub}.png?size=32`}
                                                            alt={projectAuthor}
                                                            className="w-4 h-4 rounded-full"
                                                        />
                                                    )}
                                                    <span>{projectAuthor}</span>
                                                </Link>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 text-xs text-primary/60 dark:text-primary-dark/60">
                                                    <span>{projectAuthor}</span>
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )
                        }
                    )}
                </div>

                {/* No results message */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-primary/60 dark:text-primary-dark/60">
                            No projects match the current filters.
                        </p>
                        <button
                            onClick={clearFilters}
                            className="mt-2 text-red dark:text-yellow font-medium hover:underline"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    )
}

const query = graphql`
    query {
        sideProjects: allMdx(
            filter: { fields: { slug: { regex: "/^/side-projects/(?!_)/" } }, frontmatter: { githubUrl: { ne: null } } }
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
                    filters {
                        tags
                    }
                }
            }
        }
        profiles: allSqueakProfile {
            nodes {
                squeakId
                github
            }
        }
    }
`

export default SideProjectsPage
