import PostLayout from 'components/PostLayout'
import React, { useEffect, useState } from 'react'
import { SEO } from 'components/seo'
import Layout from 'components/Layout'
import { Posts, PostToggle } from 'components/Blog'
import Pagination from 'components/Pagination'
import { NewsletterForm } from 'components/NewsletterForm'
import CommunityCTA from 'components/CommunityCTA'
import StartupsCTA from 'components/StartupsCTA'
import { companyMenu } from '../navs'
import type { PageInfo, PostCard } from '../lib/content/posts'

export interface BlogCategoryProps extends PageInfo {
    category: string
    slug: string
    recent: PostCard[]
    popular: PostCard[]
}

const BlogCategory = ({ category, slug, numPages, currentPage, base, recent, popular }: BlogCategoryProps) => {
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
            <SEO title={`${category} - PostHog`} />

            <PostLayout article={false} title="Blog" hideSidebar hideSurvey>
                {slug === 'startups' && <StartupsCTA />}
                <Posts
                    titleBorder
                    title={category}
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

export default BlogCategory
