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
import { capitalize } from 'instantsearch.js/es/lib/utils'

const BlogTag = ({
    data: {
        allPostsRecent: { edges: allPostsRecent },
        allPostsPopular: { edges: allPostsPopular },
    },
    pageContext: { tag, numPages, currentPage, base },
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

    const posts = allPostsFilter === 'popular' ? allPostsPopular : allPostsRecent

    return (
        <Layout>
            <SEO title={`${tag} - PostHog`} />

            <PostLayout article={false} title="Blog" menu={blog} hideSidebar hideSurvey>
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

export const pageQuery = graphql`
    query ($skip: Int!, $limit: Int!, $tag: String) {
        allPostsRecent: allMdx(
            limit: $limit
            skip: $skip
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { isFuture: { eq: false }, frontmatter: { tags: { in: [$tag] }, date: { ne: null } } }
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
            filter: { isFuture: { eq: false }, frontmatter: { tags: { in: [$tag] }, date: { ne: null } } }
        ) {
            edges {
                node {
                    ...BlogFragment
                }
            }
        }
    }
`
