import PostLayout from 'components/PostLayout'
import { graphql } from 'gatsby'
import React, { useState } from 'react'
import { SEO } from 'components/seo'
import blogMenu from 'components/Blog/blogMenu'
import Layout from 'components/Layout'
import { Posts, PostToggle } from 'components/Blog'
import Pagination from 'components/Pagination'
import { NewsletterForm } from 'components/NewsletterForm'

const BlogCategory = ({
    data: {
        allPostsRecent: { edges: allPostsRecent },
        allPostsPopular: { edges: allPostsPopular },
    },
    pageContext: { category, numPages, currentPage, base },
}) => {
    const [allPostsFilter, setAllPostsFilter] = useState<'recent' | 'popular'>(
        localStorage.getItem('postsFilter') || 'recent'
    )
    const handleToggleChange = (checked: boolean) => {
        const postsFilter = checked ? 'popular' : 'recent'
        localStorage.setItem('postsFilter', postsFilter)
        setAllPostsFilter(postsFilter)
    }

    const posts = allPostsFilter === 'popular' ? allPostsPopular : allPostsRecent

    return (
        <Layout>
            <SEO title={`${category} - PostHog`} />

            <PostLayout
                breadcrumb={[{ name: 'Blog', url: '/blog' }, { name: category }]}
                article={false}
                title="Blog"
                menu={blogMenu()}
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
            filter: { isFuture: { eq: false }, frontmatter: { categories: { in: [$category] } } }
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
            filter: { isFuture: { eq: false }, frontmatter: { categories: { in: [$category] } } }
        ) {
            edges {
                node {
                    ...BlogFragment
                }
            }
        }
    }
`
