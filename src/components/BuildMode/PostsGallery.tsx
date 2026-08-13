import React, { useEffect, useRef, useState } from 'react'
import { IconSearch, IconSort } from '@posthog/icons'
import OSButton from 'components/OSButton'
import { OSInput } from 'components/OSForm'
import MenuBar from 'components/RadixUI/MenuBar'
import { Select } from 'components/RadixUI/Select'
import GalleryCard from './GalleryCard'
import TagFilter from './TagFilter'
import { BuildModePost } from './types'
import { PostSort, usePostFilters } from './usePostFilters'

/** 4 rows of the 3-column grid. */
const POSTS_PER_PAGE = 12

function SortSelect({ sort, setSort }: { sort: PostSort; setSort: (sort: PostSort) => void }): JSX.Element {
    return (
        <Select
            className="!border-transparent !bg-transparent !px-0 !text-secondary transition-colors hover:!text-primary [&_svg]:!size-4"
            ariaLabel="Sort by"
            prefix="Sort"
            value={sort}
            onValueChange={(value) => setSort(value as PostSort)}
            groups={[
                {
                    label: 'Sort',
                    items: [
                        { value: 'newest', label: 'Recent' },
                        { value: 'popular', label: 'Popular' },
                    ],
                },
            ]}
        />
    )
}

function SortMenu({ sort, setSort }: { sort: PostSort; setSort: (sort: PostSort) => void }): JSX.Element {
    return (
        <MenuBar
            menus={[
                {
                    trigger: <IconSort className="size-4" />,
                    hideChevron: true,
                    items: [
                        { type: 'item', label: 'Recent', onClick: () => setSort('newest'), active: sort === 'newest' },
                        {
                            type: 'item',
                            label: 'Popular',
                            onClick: () => setSort('popular'),
                            active: sort === 'popular',
                        },
                    ],
                },
            ]}
        />
    )
}

function SearchField({
    query,
    setQuery,
    onBlur,
    onKeyDown,
    placeholder = 'Search posts',
    tabIndex,
}: {
    query: string
    setQuery: (query: string) => void
    onBlur?: () => void
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    placeholder?: string
    tabIndex?: number
}): JSX.Element {
    return (
        <div className="relative h-8">
            <IconSearch className="pointer-events-none absolute left-2 top-1/2 z-10 size-4 -translate-y-1/2 text-secondary" />
            <OSInput
                label="Search posts"
                showLabel={false}
                type="search"
                name="build-mode-search"
                placeholder={placeholder}
                value={query}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                onClear={() => setQuery('')}
                showClearButton
                size="sm"
                width="full"
                tabIndex={tabIndex}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                className="!box-border !h-8 !bg-primary !py-0 pl-7 focus:!outline-none focus:!ring-0"
                containerClassName="h-8"
            />
        </div>
    )
}

function ExpandingSearch({ query, setQuery }: { query: string; setQuery: (query: string) => void }): JSX.Element {
    const [open, setOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const expanded = open || query.length > 0

    useEffect(() => {
        if (expanded) containerRef.current?.querySelector('input')?.focus()
    }, [expanded])

    return (
        <div
            ref={containerRef}
            className={`relative flex h-8 items-center transition-[width,margin] duration-200 ease-out ${
                expanded ? 'ml-2 w-56 @2xl:w-72' : 'w-8'
            }`}
        >
            <div
                className={`flex size-8 shrink-0 items-center justify-center transition-opacity duration-150 ${
                    expanded ? 'pointer-events-none absolute opacity-0' : 'opacity-100'
                }`}
            >
                <OSButton
                    size="md"
                    icon={<IconSearch />}
                    zoomHover={false}
                    aria-label="Search posts"
                    tooltip="Search posts"
                    onClick={() => setOpen(true)}
                    className="!size-8 !p-0 !text-secondary hover:!text-primary"
                />
            </div>
            <div
                className={`h-8 w-full min-w-0 transition-opacity duration-150 ${
                    expanded ? 'opacity-100 delay-75' : 'pointer-events-none absolute opacity-0'
                }`}
            >
                <SearchField
                    query={query}
                    setQuery={setQuery}
                    placeholder={expanded ? 'Search posts' : ''}
                    tabIndex={expanded ? undefined : -1}
                    onBlur={() => {
                        if (!query) setOpen(false)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                            setQuery('')
                            setOpen(false)
                            e.currentTarget.blur()
                        }
                    }}
                />
            </div>
        </div>
    )
}

/** Searchable, tag-filterable, paginated grid of posts. */
export default function PostsGallery({ posts }: { posts: BuildModePost[] }): JSX.Element {
    const { query, setQuery, activeTag, setActiveTag, sort, setSort, tags, filteredPosts, isFiltered, clear } =
        usePostFilters(posts)
    const [page, setPage] = useState(1)

    // Changing the search, tag, or sort re-filters the list — jump back to the first page
    useEffect(() => {
        setPage(1)
    }, [query, activeTag, sort])

    const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE))
    const currentPage = Math.min(page, totalPages)
    const visiblePosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)

    return (
        <section>
            <div className="flex items-center justify-between gap-2">
                <h2 className="m-0 min-w-0 shrink truncate text-lg font-bold">
                    All posts{' '}
                    <span className="text-sm font-medium text-muted">
                        ({filteredPosts.length}
                        {isFiltered ? ` of ${posts.length}` : ''})
                    </span>
                </h2>
                <div className="flex shrink-0 items-center">
                    <div className="@md:hidden">
                        <SortMenu sort={sort} setSort={setSort} />
                    </div>
                    <div className="hidden @md:block">
                        <SortSelect sort={sort} setSort={setSort} />
                    </div>
                    <ExpandingSearch query={query} setQuery={setQuery} />
                </div>
            </div>
            <TagFilter tags={tags} activeTag={activeTag} onChange={setActiveTag} />
            {filteredPosts.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 gap-x-4 gap-y-8 @lg:grid-cols-2 @lg:gap-x-6 @lg:gap-y-10 @3xl:grid-cols-3">
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
