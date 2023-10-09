import PostLayout from 'components/PostLayout'
import { graphql } from 'gatsby'
import React from 'react'
import { SEO } from 'components/seo'
import Layout from 'components/Layout'
import { Posts } from 'components/Blog'
import PaginationContainer from 'components/Pagination'
import { NewsletterForm } from 'components/NewsletterForm'
import CommunityCTA from 'components/CommunityCTA'
import { communityMenu } from '../navs'
import { postsMenu as menu } from '../navs/posts'

const Pagination = ({
    data: {
        allPostsRecent: { edges: allPostsRecent },
    },
    pageContext: { numPages, currentPage, base, title },
}) => {
    return (
        <Layout parent={communityMenu} activeInternalMenu={communityMenu.children[0]}>
            <SEO title={`All ${title} posts - PostHog`} />

            <PostLayout article={false} title={title} hideSidebar hideSurvey menu={menu}>
                <Posts
                    title="All posts"
                    action={
                        <p className="m-0 leading-none font-semibold text-sm opacity-50">
                            Page {currentPage} of {numPages}
                        </p>
                    }
                    posts={allPostsRecent.slice(0, 4)}
                />
                <NewsletterForm />
                <Posts posts={allPostsRecent.slice(4, 12)} />
                {allPostsRecent.length > 12 && (
                    <>
                        <CommunityCTA />
                        <Posts posts={allPostsRecent.slice(12)} />
                    </>
                )}
                <PaginationContainer currentPage={currentPage} numPages={numPages} base={base} />
            </PostLayout>
        </Layout>
    )
}

export default Pagination

export const pageQuery = graphql`
    query ($skip: Int!, $limit: Int!, $regex: String!) {
        allPostsRecent: allMdx(
            limit: $limit
            skip: $skip
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { isFuture: { ne: true }, frontmatter: { date: { ne: null } }, fields: { slug: { regex: $regex } } }
        ) {
            edges {
                node {
                    ...BlogFragment
                }
            }
        }
    }
`
