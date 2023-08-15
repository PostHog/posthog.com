import PostLayout from 'components/PostLayout'
import { graphql } from 'gatsby'
import React, { useEffect, useState } from 'react'
import { SEO } from 'components/seo'
import Layout from 'components/Layout'
import { Posts, PostToggle } from 'components/Blog'
import Pagination from 'components/Pagination'
import { NewsletterForm } from 'components/NewsletterForm'
import { capitalize } from 'instantsearch.js/es/lib/utils'

const TutorialsCategory = ({
    data: {
        allPostsRecent: { edges: allPostsRecent },
        allPostsPopular: { edges: allPostsPopular },
    },
    pageContext: { activeFilter, numPages, currentPage, base },
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

export const pageQuery = graphql`
    query ($skip: Int!, $limit: Int!, $activeFilter: String) {
        allPostsRecent: allMdx(
            limit: $limit
            skip: $skip
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { tags: { in: [$activeFilter] } }, fields: { slug: { regex: "/^/tutorials/" } } }
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
            filter: { frontmatter: { tags: { in: [$activeFilter] } }, fields: { slug: { regex: "/^/tutorials/" } } }
        ) {
            edges {
                node {
                    ...BlogFragment
                }
            }
        }
    }
`
