import Breadcrumbs from 'components/Breadcrumbs'
import Avatar from 'components/CommunityQuestions/Avatar'
import Link from 'components/Link'
import PostLayout from 'components/PostLayout'
import Toggle from 'components/Toggle'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { useState } from 'react'
import { SEO } from 'components/seo'
import slugify from 'slugify'
import blogMenu from 'components/Blog/blogMenu'
import Layout from 'components/Layout'
import { Posts, PostToggle } from 'components/Blog'

const BlogCategory = ({
    data: {
        allPostsRecent: { edges: allPostsRecent },
        allPostsPopular: { edges: allPostsPopular },
    },
    pageContext: { category },
}) => {
    const [allPostsFilter, setAllPostsFilter] = useState<'recent' | 'popular'>('recent')

    const handleToggleChange = (checked: boolean) => {
        setAllPostsFilter(checked ? 'popular' : 'recent')
    }

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
                <div className="mt-6">
                    <Posts
                        title={category}
                        posts={allPostsFilter === 'popular' ? allPostsPopular : allPostsRecent}
                        action={<PostToggle checked={allPostsFilter === 'popular'} onChange={handleToggleChange} />}
                    />
                </div>
            </PostLayout>
        </Layout>
    )
}

export default BlogCategory

export const pageQuery = graphql`
    query ($category: String) {
        allPostsRecent: allMdx(
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
