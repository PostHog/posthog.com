import React, { useContext } from 'react'
import PostCard, { Skeleton } from './PostCard'
import { PostsContext } from './Posts'

export default function PostsGrid({ posts }) {
    const { isLoading } = useContext(PostsContext)
    return (
        <ul className="list-none m-0 p-0 grid sm:grid-cols-2 md:grid-cols-3 gap-2 mt-12">
            {isLoading
                ? Array.from(Array(9)).map((_, i) => <Skeleton key={i} />)
                : posts.map(({ id, attributes }) => {
                      return (
                          <li key={id}>
                              <PostCard {...attributes} />
                          </li>
                      )
                  })}
        </ul>
    )
}
