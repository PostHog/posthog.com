import PostLayout from 'components/PostLayout'
import { graphql } from 'gatsby'
import React, { useEffect, useState } from 'react'
import { SEO } from 'components/seo'
import Layout from 'components/Layout'
import { Posts, PostToggle } from 'components/Blog'
import Pagination from 'components/Pagination'
import { NewsletterForm } from 'components/NewsletterForm'
import { blog } from '../sidebars/sidebars.json'

const BlogCategory = ({
    data: {
        allPostsRecent: { edges: allPostsRecent },
        allPostsPopular: { edges: allPostsPopular },
    },
    pageContext: { category, numPages, currentPage, base },
}) => {
    const [allPostsFilter, setAllPostsFilter] = useState<'recent' | 'popular'>('recent')
    const handleToggleChange = (checked: boolean) => {
        const postsFilter = checked ? 'popular' : 'recent'
        localStorage.setItem('postsFilter', postsFilter)
        setAllPostsFilter(postsFilter)
    }

    useEffect(() => {
        setAllPostsFilter(localStorage.getItem('postsFilter') || 'recent')
    }, [])

    const posts = allPostsFilter === 'popular' ? allPostsPopular : allPostsRecent

    return (
        <Layout>
            <SEO title={`${category} - PostHog`} />

            <PostLayout
                breadcrumb={[{ name: 'Blog', url: '/blog' }, { name: category }]}
                article={false}
                title="Blog"
                menu={blog}
                hideSidebar
                hideSurvey
            >
                <div className="mt-6 mb-12">
                    <Posts
                        title={category}
                        posts={posts.slice(0, 4)}
                        action={<PostToggle checked={allPostsFilter === 'popular'} onChange={handleToggleChange} />}
                    />
                    <NewsletterForm />
                    <Posts posts={posts.slice(4)} />
                    <Pagination currentPage={currentPage} numPages={numPages} base={base} />
                </div>
            </PostLayout>
        </Layout>
    )
}

export default BlogCategory

export const pageQuery = graphql`
    query ($skip: Int!, $limit: Int!, $category: String) {
        allPostsRecent: allMdx(
            limit: $limit
            skip: $skip
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { isFuture: { eq: false }, frontmatter: { category: { eq: $category } } }
        ) {
            edges {
                node {
                    ...BlogFragment
                }
            }
        }
        allPostsPopular: allMdx(
            limit: $limit
            skip: $skip
            sort: { order: DESC, fields: [fields___pageViews] }
            filter: { isFuture: { eq: false }, frontmatter: { category: { eq: $category } } }
        ) {
            edges {
                node {
                    ...BlogFragment
                }
            }
        }
    }
`
