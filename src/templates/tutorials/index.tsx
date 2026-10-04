import PostLayout from 'components/PostLayout'
import React from 'react'
import { SEO } from 'components/seo'
import Layout from 'components/Layout'
import { Posts } from 'components/Blog'
import Pagination from 'components/Pagination'
import { NewsletterForm } from 'components/NewsletterForm'
import { communityMenu } from '../../navs'
import type { PageInfo, PostCard } from '../../lib/content/posts'

export interface TutorialsProps extends PageInfo {
    posts: PostCard[]
}

const Tutorials = ({ numPages, currentPage, base, posts }: TutorialsProps) => {
    return (
        <Layout parent={communityMenu} activeInternalMenu={communityMenu.children[2]}>
            <SEO title={`All tutorials - PostHog`} />

            <PostLayout
                breadcrumb={[{ name: 'Tutorials', url: '/tutorials' }, { name: 'All' }]}
                article={false}
                title="Tutorials"
                hideSidebar
                hideSurvey
            >
                <Posts
                    title="All tutorials"
                    action={
                        <p className="m-0 leading-none font-semibold">
                            Page {currentPage} of {numPages}
                        </p>
                    }
                    posts={posts.slice(0, 4)}
                />
                <NewsletterForm />
                <Posts posts={posts.slice(4)} />
                <Pagination currentPage={currentPage} numPages={numPages} base={base} />
            </PostLayout>
        </Layout>
    )
}

export default Tutorials
