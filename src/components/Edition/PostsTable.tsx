import React from 'react'
import Post from './Post'
import { Skeleton } from './Views/Default'
import Spinner from 'components/Spinner'
import { child, container } from 'components/CallToAction'

export default function PostsTable({ posts, isLoading, hasMore, isValidating, fetchMore, articleView }) {
    return (
        <>
            {posts.map(({ id, attributes }, index) => {
                return <Post articleView={articleView} key={id} {...attributes} id={id} />
            })}
            {isLoading && <Skeleton />}
            {hasMore && (
                <li className="mt-4 md:mb-24 px-4">
                    <button
                        onClick={fetchMore}
                        disabled={isLoading || isValidating}
                        className={`${container()} w-full`}
                    >
                        <span className={`${child()}`}>
                            {isLoading || isValidating ? (
                                <Spinner className="!w-6 !h-6 mx-auto text-white" />
                            ) : (
                                'Load more'
                            )}
                        </span>
                    </button>
                </li>
            )}
        </>
    )
}
