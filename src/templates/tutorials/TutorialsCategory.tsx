import PostLayout from 'components/PostLayout'
import React, { useEffect, useState } from 'react'
import { SEO } from 'components/seo'
import Layout from 'components/Layout'
import { Posts, PostToggle } from 'components/Blog'
import Pagination from 'components/Pagination'
import { NewsletterForm } from 'components/NewsletterForm'
import { capitalize } from 'instantsearch.js/es/lib/utils'
import type { PageInfo, PostCard } from '../../lib/content/posts'

export interface TutorialsCategoryProps extends PageInfo {
    /** The tutorial tag. */
    activeFilter: string
    recent: PostCard[]
    popular: PostCard[]
}

const TutorialsCategory = ({ activeFilter, numPages, currentPage, base, recent, popular }: TutorialsCategoryProps) => {
    const [allPostsFilter, setAllPostsFilter] = useState<'recent' | 'popular'>('recent')
    const handleToggleChange = (checked: boolean) => {
        const postsFilter = checked ? 'popular' : 'recent'
        localStorage.setItem('postsFilter', postsFilter)
        setAllPostsFilter(postsFilter)
    }

    useEffect(() => {
        setAllPostsFilter(localStorage.getItem('postsFilter') === 'popular' ? 'popular' : 'recent')
    }, [])

    const posts = allPostsFilter === 'popular' ? popular : recent

    return (
        <Layout>
            <SEO title={`Tutorials - ${capitalize(activeFilter)} - PostHog`} />

            <PostLayout
                breadcrumb={[{ name: 'Tutorials', url: '/tutorials' }, { name: capitalize(activeFilter) }]}
                article={false}
                title="Tutorials"
                hideSidebar
                hideSurvey
            >
                <Posts
                    title={capitalize(activeFilter)}
                    posts={posts.slice(0, 4)}
                    action={<PostToggle checked={allPostsFilter === 'popular'} onChange={handleToggleChange} />}
                />
                <NewsletterForm />
                <Posts posts={posts.slice(4)} />
                <Pagination currentPage={currentPage} numPages={numPages} base={base} />
            </PostLayout>
        </Layout>
    )
}

export default TutorialsCategory
