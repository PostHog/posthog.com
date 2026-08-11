import React, { useEffect, useState } from 'react'
import { IconSearch } from '@posthog/icons'
import OSButton from 'components/OSButton'
import GalleryCard from './GalleryCard'
import TagFilter from './TagFilter'
import { BuildModePost } from './types'
import { usePostFilters } from './usePostFilters'

/** 4 rows of the 3-column grid. */
const POSTS_PER_PAGE = 12

/** Searchable, tag-filterable, paginated grid of every post. */
export default function PostsGallery({ posts }: { posts: BuildModePost[] }): JSX.Element {
    const { query, setQuery, activeTag, setActiveTag, tags, filteredPosts, isFiltered, clear } = usePostFilters(posts)
    const [page, setPage] = useState(1)

    // Changing the search or tag re-filters the list — jump back to the first page
    useEffect(() => {
        setPage(1)
    }, [query, activeTag])

    const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE))
    const currentPage = Math.min(page, totalPages)
    const visiblePosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)

    return (
        <section>
            <div className="flex flex-col justify-between gap-3 @2xl:flex-row @2xl:items-center">
                <h2 className="m-0 text-lg font-bold">
                    All posts{' '}
                    <span className="text-sm font-medium text-muted">
                        ({filteredPosts.length}
                        {isFiltered ? ` of ${posts.length}` : ''})
                    </span>
                </h2>
                <div className="relative @2xl:w-72">
                    <IconSearch className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search posts"
                        className="w-full rounded border border-input bg-primary py-1.5 pl-8 pr-3 text-sm text-primary placeholder:text-muted focus:border-primary focus:outline-none"
                    />
                </div>
            </div>
            <TagFilter tags={tags} activeTag={activeTag} onChange={setActiveTag} />
            {filteredPosts.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 gap-6 @lg:grid-cols-2 @3xl:grid-cols-3">
                        {visiblePosts.map((post) => (
                            <GalleryCard key={post.id} post={post} />
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <div className="mt-8 flex items-center justify-center gap-4">
                            <OSButton size="sm" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>
                                ← Previous
                            </OSButton>
                            <span className="text-sm text-secondary">
                                Page {currentPage} of {totalPages}
                            </span>
                            <OSButton
                                size="sm"
                                disabled={currentPage === totalPages}
                                onClick={() => setPage(currentPage + 1)}
                            >
                                Next →
                            </OSButton>
                        </div>
                    )}
                </>
            ) : (
                <div className="rounded border border-dashed border-input p-8 text-center text-secondary">
                    <p className="m-0">No posts match your search.</p>
                    <button onClick={clear} className="mt-2 text-sm font-semibold text-red dark:text-yellow">
                        Clear filters
                    </button>
                </div>
            )}
        </section>
    )
}
