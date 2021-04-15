import React from 'react'
import { NewsletterForm } from '../NewsletterForm'
import { Structure } from '../Structure'
import { PostCard } from '../PostCard'
import { BlogPosts } from '../Blog/BlogPosts'
import './style.scss'

export function BlogFooter() {
    return (
        <Structure.Section width="4xl">
            <NewsletterForm compact={true} bgColor="#FFFFFF" />

            <BlogPosts
                render={(posts) => {
                    const postCards = posts
                        .slice(0, 2)
                        .map((post) => <PostCard key={post.node.id} post={post.node} featured={false} />)

                    return (
                        <Structure.Section width="xl" className="my-36">
                            <header className="text-xs text-gray-400 uppercase mb-4">More Posts</header>
                            {postCards}
                        </Structure.Section>
                    )
                }}
            />
        </Structure.Section>
    )
}
