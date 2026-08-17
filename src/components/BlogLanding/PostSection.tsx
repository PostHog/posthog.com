import React from 'react'
import PostCard, { Skeleton } from 'components/Edition/PostCard'

interface PostSectionProps {
    title: string
    posts: any[]
    isLoading?: boolean
    /** Optional action rendered on the right of the heading (e.g. a Recent/Popular toggle). */
    action?: React.ReactNode
}

const SKELETON_COUNT = 6

/**
 * A labeled grid of post cards, with a loading skeleton and an empty state. The grid reflows via
 * `@container` queries so it stays correct inside resizable app windows.
 */
export default function PostSection({ title, posts, isLoading = false, action }: PostSectionProps) {
    return (
        <section className="@container">
            <div className="flex items-center justify-between gap-4 mb-4">
                <h2 className="m-0">{title}</h2>
                {action}
            </div>

            {!isLoading && posts.length === 0 ? (
                <div className="border border-dashed border-primary rounded-md py-12 text-center text-secondary">
                    No posts here yet.
                </div>
            ) : (
                <ul className="list-none m-0 p-0 grid grid-cols-1 @md:grid-cols-2 @3xl:grid-cols-3 gap-4">
                    {isLoading
                        ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                              <li key={i}>
                                  <Skeleton />
                              </li>
                          ))
                        : posts.map((post) => (
                              <li key={post.id}>
                                  <PostCard {...post.attributes} />
                              </li>
                          ))}
                </ul>
            )}
        </section>
    )
}
