import PostLayout from 'components/PostLayout'
import React, { useEffect, useState } from 'react'
import { SEO } from 'components/seo'
import Layout from 'components/Layout'
import { Posts, PostToggle } from 'components/Blog'
import Pagination from 'components/Pagination'
import { NewsletterForm } from 'components/NewsletterForm'
import CommunityCTA from 'components/CommunityCTA'
import { companyMenu } from '../navs'
import type { PageInfo, PostCard } from '../lib/content/posts'

export interface BlogTagProps extends PageInfo {
    tag: string
    recent: PostCard[]
    popular: PostCard[]
}

const BlogTag = ({ tag, numPages, currentPage, base, recent, popular }: BlogTagProps) => {
    const [allPostsFilter, setAllPostsFilter] = useState<'latest' | 'popular'>('latest')
    const handleToggleChange = (checked: boolean) => {
        const postsFilter = checked ? 'popular' : 'latest'
        localStorage.setItem('postsFilter', postsFilter)
        setAllPostsFilter(postsFilter)
    }

    useEffect(() => {
        setAllPostsFilter(localStorage.getItem('postsFilter') === 'popular' ? 'popular' : 'latest')
    }, [])

    const posts = allPostsFilter === 'popular' ? popular : recent

    return (
        <Layout parent={companyMenu} activeInternalMenu={companyMenu.children[5]}>
            <SEO title={`${tag} - PostHog`} />

            <PostLayout article={false} title="Blog" hideSidebar hideSurvey>
                <Posts
                    titleBorder
                    title={tag}
                    posts={posts.slice(0, 4)}
                    action={<PostToggle checked={allPostsFilter === 'popular'} onChange={handleToggleChange} />}
                />
                <NewsletterForm />
                <Posts posts={posts.slice(4, 12)} />
                {posts.length > 12 && (
                    <>
                        <CommunityCTA />
                        <Posts posts={posts.slice(12)} />
                    </>
                )}
                <Pagination currentPage={currentPage} numPages={numPages} base={base} />
            </PostLayout>
        </Layout>
    )
}

export default BlogTag
