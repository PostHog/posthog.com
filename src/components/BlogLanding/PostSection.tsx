import React from 'react'
import PostCard, { Skeleton } from 'components/Edition/PostCard'

interface PostSectionProps {
    title: string
    posts: any[]
    isLoading?: boolean
    /** Cap how many posts render (e.g. show the top 6). Omit to show all. */
    limit?: number
    /** Number of skeleton cards to render while loading. */
    skeletonCount?: number
    /** Optional action rendered on the right of the heading (e.g. a Recent/Popular toggle). */
    action?: React.ReactNode
    headingLevel?: 'h2' | 'h3'
    emptyMessage?: string
    /** Max columns the grid grows to. Defaults to 3; use 2 in narrower layouts (e.g. sidebar). */
    columns?: 2 | 3
}

const gridColsByMax = {
    2: 'grid-cols-1 @2xl:grid-cols-2',
    3: 'grid-cols-1 @md:grid-cols-2 @3xl:grid-cols-3',
}

/**
 * A labeled grid of post cards. Reuses the shared `PostCard`, adds a heading, a loading
 * skeleton, and an empty state. The grid reflows via `@container` queries so it stays correct
 * inside resizable app windows.
 */
export default function PostSection({
    title,
    posts,
    isLoading = false,
    limit,
    skeletonCount = 6,
    action,
    headingLevel = 'h2',
    emptyMessage = 'No posts here yet.',
    columns = 3,
}: PostSectionProps) {
    const Heading = headingLevel
    const visible = typeof limit === 'number' ? posts.slice(0, limit) : posts

    return (
        <section className="@container">
            <div className="flex items-center justify-between gap-4 mb-4">
                <Heading className="m-0">{title}</Heading>
                {action}
            </div>

            {!isLoading && visible.length === 0 ? (
                <div
                    role="status"
                    className="border border-dashed border-primary rounded-md py-12 text-center text-secondary"
                >
                    {emptyMessage}
                </div>
            ) : (
                <ul className={`list-none m-0 p-0 grid ${gridColsByMax[columns]} gap-4`}>
                    {isLoading
                        ? Array.from({ length: skeletonCount }).map((_, i) => (
                              <li key={i}>
                                  <Skeleton />
                              </li>
                          ))
                        : visible.map((post) => (
                              <li key={post.id}>
                                  <PostCard {...post.attributes} />
                              </li>
                          ))}
                </ul>
            )}
        </section>
    )
}
