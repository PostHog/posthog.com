import PostLayout from 'components/PostLayout'
import React from 'react'
import { SEO } from 'components/seo'
import Layout from 'components/Layout'
import { Posts } from 'components/Blog'
import PaginationContainer from 'components/Pagination'
import { NewsletterForm } from 'components/NewsletterForm'
import CommunityCTA from 'components/CommunityCTA'
import { communityMenu } from '../navs'
import { postsMenu as menu } from '../navs/posts'
import type { PageInfo, PostCard } from '../lib/content/posts'

export interface PaginationProps extends PageInfo {
    /** The section name, e.g. "Blog". */
    title: string
    posts: PostCard[]
}

const Pagination = ({ numPages, currentPage, base, title, posts }: PaginationProps) => {
    return (
        <Layout parent={communityMenu} activeInternalMenu={communityMenu.children[0]}>
            <SEO title={`All ${title} posts - PostHog`} />

            <PostLayout article={false} title={title} hideSidebar hideSurvey menu={menu}>
                <h1 className="sr-only">{title}</h1>
                <Posts
                    title="All posts"
                    action={
                        <p className="m-0 leading-none font-semibold text-sm opacity-50">
                            Page {currentPage} of {numPages}
                        </p>
                    }
                    posts={posts.slice(0, 4)}
                />
                <NewsletterForm className="-mt-6" />
                <Posts posts={posts.slice(4, 12)} />
                {posts.length > 12 && (
                    <>
                        <CommunityCTA />
                        <Posts posts={posts.slice(12)} />
                    </>
                )}
                <PaginationContainer currentPage={currentPage} numPages={numPages} base={base} />
            </PostLayout>
        </Layout>
    )
}

export default Pagination
