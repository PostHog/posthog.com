import React from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import FeaturedPost from 'components/PostsIndex/FeaturedPost'
import Hero, { HeroHeader } from 'components/BuildMode/Hero'
import PostsGallery from 'components/PostsIndex/PostsGallery'
import { PostSummary } from 'components/PostsIndex/types'

export default function NewsletterPage({ data }: { data: { posts: PostSummary[] } }): JSX.Element {
    const posts = data.posts.filter((post) => post.frontmatter?.title)
    const featured = posts[0]

    return (
        <>
            <SEO
                title="build mode – PostHog"
                description="Tools, tactics, and taste for product builders. Advice on building great products, lessons (and mistakes) from building PostHog, and deep dives into the strategies of top startups."
            />
            <ReaderView
                hideLeftSidebar
                hideRightSidebar
                showQuestions={false}
                hideMobileTableOfContents
                hideMarkdownActions
            >
                <div className="@container not-prose text-pretty text-primary">
                    <div className="relative mx-auto w-full max-w-6xl px-4 pb-12 @2xl:pb-20 @xl:px-8">
                        <HeroHeader />
                        <Hero className="mt-2 @2xl:mt-4" placement="build-mode-header" />
                        {featured && (
                            <header className="mt-8 @2xl:mt-16">
                                <FeaturedPost post={featured} />
                            </header>
                        )}
                        <div className="mt-8 @2xl:mt-16">
                            <PostsGallery posts={posts.slice(1)} searchName="build-mode-search" />
                        </div>
                        <hr className="my-10 h-px border-none bg-red/40 @2xl:my-16" />
                        <HeroHeader placement="build-mode-footer" />
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
