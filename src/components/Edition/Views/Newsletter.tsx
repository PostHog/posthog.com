import React, { useContext } from 'react'
import { PostsContext } from '../Posts'
import FeaturedPost from '../FeaturedPost'
import PostsGrid from '../PostsGrid'
import Breadcrumb from '../Breadcrumb'

export default function Newsletter() {
    const { posts, isLoading } = useContext(PostsContext)
    const [featuredPost, ...rest] = posts.slice(0, 10)

    return (
        <div className="mx-auto max-w-screen-xl">
            <Breadcrumb title="Newsletter" />
            <FeaturedPost {...featuredPost?.attributes} />
            <PostsGrid posts={rest} />
        </div>
    )
}
