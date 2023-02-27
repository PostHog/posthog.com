import PostLayout from 'components/PostLayout'
import { graphql } from 'gatsby'
import React, { useEffect, useState } from 'react'
import { SEO } from 'components/seo'
import Layout from 'components/Layout'
import { Posts, PostToggle } from 'components/Blog'
import Pagination from 'components/Pagination'
import { NewsletterForm } from 'components/NewsletterForm'
import blog from 'sidebars/blog.json'
import CommunityCTA from 'components/CommunityCTA'
const BlogCategory = ({
    data: {
        allPostsRecent: { edges: allPostsRecent },
    },
    pageContext: { category, numPages, currentPage, base },
}) => {
    const [allPostsFilter, setAllPostsFilter] = useState<'latest' | 'popular'>('latest')
    const handleToggleChange = (checked: boolean) => {
        const postsFilter = checked ? 'popular' : 'latest'
        localStorage.setItem('postsFilter', postsFilter)
        setAllPostsFilter(postsFilter)
    }

    useEffect(() => {
        setAllPostsFilter(localStorage.getItem('postsFilter') || 'latest')
    }, [])

    const posts = allPostsRecent

    return (
        <Layout>
            <SEO title={`${category} - PostHog`} />

            <PostLayout article={false} title="Blog" menu={blog} hideSidebar hideSurvey>
                <Posts
                    titleBorder
                    title={category}
                    posts={posts.slice(0, 4)}
                    action={
                        <p className="m-0 leading-none font-semibold text-sm opacity-50">
                            Page {currentPage} of {numPages}
                        </p>
                    }
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

export const pageQuery = graphql`
    query ($skip: Int!, $limit: Int!, $category: String) {
        allPostsRecent: allMdx(
            limit: $limit
            skip: $skip
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { isFuture: { eq: false }, frontmatter: { category: { eq: $category }, date: { ne: null } } }
        ) {
            totalCount
            edges {
                node {
                    ...BlogFragment
                }
            }
        }
    }
`
