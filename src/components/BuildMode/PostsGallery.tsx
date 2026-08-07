import React from 'react'
import { IconSearch } from '@posthog/icons'
import GalleryCard from './GalleryCard'
import TagFilter from './TagFilter'
import { BuildModePost } from './types'
import { usePostFilters } from './usePostFilters'

/** Searchable, tag-filterable grid of every post. */
export default function PostsGallery({ posts }: { posts: BuildModePost[] }): JSX.Element {
    const { query, setQuery, activeTag, setActiveTag, tags, filteredPosts, isFiltered, clear } = usePostFilters(posts)

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
                <div className="grid grid-cols-1 gap-6 @lg:grid-cols-2 @3xl:grid-cols-3">
                    {filteredPosts.map((post) => (
                        <GalleryCard key={post.id} post={post} />
                    ))}
                </div>
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
