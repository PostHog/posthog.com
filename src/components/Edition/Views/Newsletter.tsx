import React, { useContext } from 'react'
import { PostsContext } from '../Posts'
import FeaturedPost from '../FeaturedPost'
import PostsGrid from '../PostsGrid'
import LandingPageNotice from '../LandingPageNotice'
import SEO from 'components/seo'
import { NewsletterForm } from 'components/NewsletterForm'

export default function Newsletter() {
    const { posts, isLoading } = useContext(PostsContext)
    const [featuredPost, ...rest] = posts || []

    return (
        <div className="mx-auto max-w-screen-xl">
            <SEO title="Newsletter - PostHog" />
            <LandingPageNotice title="Newsletter" />
            <FeaturedPost {...featuredPost?.attributes} />
            <NewsletterForm placement="blog-index" />
            <PostsGrid posts={rest} />
        </div>
    )
}
