import React from 'react'
import { NewsletterForm } from '../NewsletterForm'
import { Structure } from '../Structure'
import { PostCard } from '../PostCard'
import { BlogPosts } from '../Blog/BlogPosts'
import './style.scss'
import { PostType } from '../PostCard/PostCard'

export interface BlogFooterProps {
    blogArticleSlug: string
}

export function BlogFooter({ blogArticleSlug }: BlogFooterProps): JSX.Element {
    return (
        <Structure.Section width="4xl">
            <NewsletterForm
                compact
                className="bg-offwhite-purple dark:bg-darkmode-purple text-gray-900 dark:text-white"
            />

            <BlogPosts
                render={(posts: { node: PostType }[]) => {
                    const postCards = posts
                        .filter((post) => post.node.fields.slug !== blogArticleSlug)
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
